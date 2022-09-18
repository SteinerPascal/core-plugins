import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import { Tooltip } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import { Quad, Quad_Object, Store } from 'n3';
import React from 'react';



export const semanticQuery = async (endpointUrl:string, store:Store,quad:Quad)=>{
    // just doublechecks if the object is in the store.
    // should match every time
    const objects = (store:Store,object:Quad_Object)=>{
        return store.getQuads(null, null, object,null)
    }


   if(objects.length > 0) return true

   return false
}

export default function InformationFab(endpointUrl:string, store:Store, triple:Quad,actionCB:(jsxEl:JSX.Element)=>void){

    return(
        <Tooltip title="Show more information"  placement="top">
            <IconButton aria-label="delete" sx={{backgroundColor:'#870058', "&:hover": {
            backgroundColor: "#870058",
            cursor: "default",
            transform: "scale(1.2)"
            }}}>
                <TipsAndUpdatesOutlinedIcon sx={{color:"white"}} />
            </IconButton> 
        </Tooltip>
        
    )
}