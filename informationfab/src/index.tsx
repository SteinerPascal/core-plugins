import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import { Tooltip } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import { Quad, Quad_Object, Store } from 'n3';
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
    if(!objects) return false
    if(quad.object.termType !== "NamedNode") return false
    const client = new SparqlClient( {endpointUrl} )
    const query = SELECT.ALL. WHERE`${quad.object} ?p ?o`.build()
    console.log(`query:${query}`)
    const bindingsStream = await client.query.select(query)
    
    // check if this entity has a property assertion to a rdfs:comment
    bindingsStream.on('data', row => {
        Object.entries(row).forEach(([key, value]) => {
            if(key === 'p'){
                if((value as {value:string})?.value === `http://www.w3.org/2000/01/rdf-schema#comment` ) {
                    console.log(`${quad.object.id} has comment`) 
                    return true
                }
            }
        })
    });
    
    bindingsStream.on('error', (err) => {
        console.error(err)
    });

   return false
}

export default function InformationFab(endpointUrl:string, store:Store, quad:Quad,actionCB:(jsxEl:JSX.Element)=>void){

    const handleClicked = ()=> {
        actionCB(<InformationAction endpointUrl={endpointUrl} quad={quad}/>)
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