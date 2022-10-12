import {Quad, Store } from 'n3';
import React from 'react';
import { Tooltip } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import DataObjectIcon from '@mui/icons-material/DataObject';
import namespace from '@rdfjs/namespace';

export const semanticQuery = async (endpointUrl:string, store:Store,quad:Quad)=>{   
    if(quad.object.termType !== "NamedNode") return false ;
    const ex = namespace('http://twin-example/geneva#');
    if(quad.predicate.value != ex.hasThingDescription.value ) return false;
    return true

}

export default function TdEditorFab(endpointUrl:string, store:Store, quad:Quad,actionCB:(jsxEl:JSX.Element)=>void){
    const handleClicked = ()=> {
        // the comments array could be sent whole and if multiple comments are in the dataset, then all would be rendered
        window.history.pushState({ subject: quad.object.value }, '', `/tdeditor/${quad.object.value}`)
    }
    return(
        <Tooltip title="Show more information"  placement="top">
            <IconButton onClick={() => { handleClicked() }} aria-label="delete" sx={{backgroundColor:'#870058', "&:hover": {
            backgroundColor: "#870058",
            cursor: "default",
            transform: "scale(1.2)"
            }}}>
                <DataObjectIcon sx={{color:"white"}} />
            </IconButton> 
        </Tooltip>
    )
}