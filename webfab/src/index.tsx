import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/ShortcutOutlined';
import { Tooltip } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import { Quad, Quad_Object, Store } from 'n3';
import React from 'react';



export const semanticQuery = async (endpointUrl:string,store:Store,quad:Quad)=>{
    const isValidUrl = (urlString: string | URL) => {
        try { 
            return Boolean(new URL(urlString)); 
        }
        catch(e){ 
            return false; 
        }
    }
    const objects = (store:Store,object:Quad_Object)=>{
        return store.getQuads(null, null, object,null)
    }
    
    console.warn('semantic btn')
    if (isValidUrl(quad.object.value)){

        console.warn(`objectval: ${quad.object.value}`)
        const response = window.open(new URL(quad.object.value));
        if(response){
            console.log(`OK: ${quad.object.value}`)
            return true
        } 
    }   
    return false
}

export default function WebFab(endpointUrl:string, store:Store, triple:Quad,actionCB:(jsxEl:JSX.Element)=>void){
    return(
        <Tooltip title="Jump to website"  placement="top">
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