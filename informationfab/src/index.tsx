import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import { Tooltip } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import { NamedNode, Quad, Quad_Object, Store } from 'n3';
import React from 'react';
import SparqlClient from "sparql-http-client"
import { SELECT } from '@tpluscode/sparql-builder'
import InformationAction from './InformationAction';


export const semanticQuery = async (endpointUrl:string, store:Store,quad:Quad)=>{
    // just doublechecks if the object is in the store.
    // should match every time
    const objects = (store:Store,object:Quad_Object)=>{
        return store.getQuads(null, null, object,null)
    }

    const waitForStream = new Promise(function(resolve,reject){
        const client = new SparqlClient( {endpointUrl} )
        // Query for rdfs:comment
        const query = SELECT.ALL. WHERE`${quad.object} rdfs:comment ?o`.build()
        client.query.select(query).then((bindingsStream)=>{
            // check if this entity has a property assertion to a rdfs:comment
            bindingsStream.on('data', row => {
                const q = new Quad(
                    quad.object,
                    new NamedNode("http://www.w3.org/2000/01/rdf-schema#comment"),
                    row['o'],
                    new NamedNode("http://informationfab/")
                )
                store.add(q)
                resolve(true)
            });

            bindingsStream.on('error', (err) => {
                console.error(err)
                reject(false)
            });
        })
    })

    if(!objects) return false
    if(quad.object.termType !== "NamedNode") return false
    const applicable = await waitForStream
    if(applicable) return true
   return false
}

export default function InformationFab(endpointUrl:string, store:Store, quad:Quad,actionCB:(jsxEl:JSX.Element)=>void){
    const comments = store.getQuads(quad.object,new NamedNode("http://www.w3.org/2000/01/rdf-schema#comment"),null,new NamedNode("http://informationfab/"))
    const handleClicked = ()=> {
        // the comments array could be sent whole and if multiple comments are in the dataset, then all would be rendered
        actionCB(<InformationAction endpointUrl={endpointUrl} quad={comments[0]}/>)
    }
    return(
        <Tooltip title="Show more information"  placement="top">
            <IconButton onClick={() => { handleClicked() }} aria-label="delete" sx={{backgroundColor:'#870058', "&:hover": {
            backgroundColor: "#870058",
            cursor: "default",
            transform: "scale(1.2)"
            }}}>
                <TipsAndUpdatesOutlinedIcon sx={{color:"white"}} />
            </IconButton> 
        </Tooltip>
        
    )
}