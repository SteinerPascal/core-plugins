import { Tooltip } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import { Literal, NamedNode, OTerm, Quad, Store } from 'n3';
import React from 'react';
import SparqlClient from "sparql-http-client"
import { SELECT } from '@tpluscode/sparql-builder'
import WotAction from './action/WotAction';
import constructQuery from './constructQuery';
import namespace from '@rdfjs/namespace';
import DescriptionIcon from '@mui/icons-material/Description';


export const semanticQuery = async (endpointUrl:string, store:Store,quad:Quad)=>{   
    if(quad.object.termType !== "NamedNode") return false //if var or literal it's not applicable

    const ex = namespace('http://twin-example/geneva#')
    if(quad.predicate.value != ex.hasThingDescription.value ) return false
    let client = new SparqlClient( {endpointUrl} )

    let tdRepo: Literal | null = null //TDs are located on a different Repo
    // Check if the object has a TD and whe it is located
    const getTD = new Promise((resolve,reject)=>{
        const query = SELECT.ALL.WHERE`${quad.object} ${ex.locatedIn} ?endpoint`.build();
        client.query.select(query).then((bindingsStream)=>{
            // check if this entity has a property assertion to a rdfs:comment
            bindingsStream.on('data', row => {
                if(row['endpoint']){
                    tdRepo = row['endpoint']
                    const q = new Quad(
                        quad.object,
                        new NamedNode(ex.locatedOn.value),
                        row['endpoint'],
                        undefined
                    )

                    store.add(q)
                    resolve(true) 
                }
                reject(false)
            });

            bindingsStream.on('error', (err) => {
                console.error(err)
                reject(false)
            });
        })
    })

    const td = await getTD as boolean


    const getTdAffordances = new Promise(function(resolve,reject){
        if(tdRepo) client = new SparqlClient({endpointUrl: tdRepo.value})
        
        const query = constructQuery(quad.object)
        client.query.construct(query).then((bindingsStream)=>{
            // check if this entity has a property assertion to a rdfs:comment
            bindingsStream.on('data', (binding:Quad) => {
                binding = new Quad(binding.subject,binding.predicate,binding.object,new NamedNode(`${quad.object.id}-wotfab/`))
                store.add(binding)
                resolve(true)
            });

            bindingsStream.on('error', (err) => {
                console.error(err)
                reject(false)
            });
        })
    })

    const hasAffordances = await getTdAffordances as boolean
    if(td && hasAffordances) return true
   return false
}

export default function WotFab(endpointUrl:string, store:Store, quad:Quad,actionCB:(jsxEl:JSX.Element)=>void){
   console.log('IN WOTFAB')
    const handleClicked = ()=> {
        // the comments array could be sent whole and if multiple comments are in the dataset, then all would be rendered
        actionCB(<WotAction endpointUrl={endpointUrl} quad={quad} store={store}/>)
    }
    return(
        <Tooltip title="Show more information"  placement="top">
            <IconButton onClick={() => { handleClicked() }} aria-label="delete" sx={{backgroundColor:'#870058', "&:hover": {
            backgroundColor: "#870058",
            cursor: "default",
            transform: "scale(1.2)"
            }}}>
                <DescriptionIcon sx={{color:"white"}} />
            </IconButton> 
        </Tooltip>
    )
}