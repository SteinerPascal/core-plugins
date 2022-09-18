import ShortcutIcon from '@mui/icons-material/ShortcutOutlined';
import { Tooltip } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import { Quad, Quad_Object, Store, Triple } from 'n3';
import React from 'react';



export const semanticQuery = async (endpointUrl:string,store:Store,quad:Quad)=>{
    // just doublechecks if the object is in the store.
    // should match every time
    const objects = (store:Store,triple:Triple)=>{
        return store.getQuads(null, null, quad.object,null)
    }

   if(quad.object) return true

   return false
}

export default function ForwardFab(endpointUrl:string, store:Store, triple:Quad,actionCB:(jsxEl:JSX.Element)=>void){
    return(
        <Tooltip title="Jump to entity"  placement="top">
                <IconButton aria-label="delete" sx={{backgroundColor:'#870058', "&:hover": {
                    backgroundColor: "#870058",
                    cursor: "default",
                    transform: "scale(1.2)"
                    }}}>
                <ShortcutIcon sx={{color:"white"}} />
            </IconButton> 
        </Tooltip>

    )
}