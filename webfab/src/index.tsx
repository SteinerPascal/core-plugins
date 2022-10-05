import LanguageIconOutlined from '@mui/icons-material/Language';
import { Tooltip } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import { Quad, Store } from 'n3';
import React from 'react';
import WebAction from './WebAction';


export const semanticQuery = async (endpointUrl:string,store:Store,quad:Quad)=>{
    const validUrl = (url:string)=> {
        try {
            return new URL(url.trim()) // eslint-disable-line no-new
        } catch (_e) {
            return null
        }
    }

    const sendNoCorsReq = async (url:URL) => {
        try {
            const response = await fetch(url,{
                method: 'GET',
                mode:'no-cors',
                headers: {
                  'Content-Type': 'text/plain'
                }
              });
            return response
        } catch (e:any) {
            //console.warn(`couldn't fetch: ${url}`)
            return null
        }
    }

    const url = validUrl(quad.object.value)
    if(!url) return false
    const response = await sendNoCorsReq(url)
    console.dir(response)
    if(!response) return false
    return true
    
}

export default function WebFab(endpointUrl:string, store:Store, quad:Quad,actionCB:(jsxEl:JSX.Element)=>void){
    const handleClicked = ()=> {
        actionCB(<WebAction quad={quad}/>)
    }
    return(
        <Tooltip title="Jump to website"  placement="top">
                <IconButton onClick={() => { handleClicked() }} aria-label="delete" sx={{backgroundColor:'#870058', "&:hover": {
                    backgroundColor: "#870058",
                    cursor: "default",
                    transform: "scale(1.2)"
                    }}}>
                <LanguageIconOutlined sx={{color:"white"}} />
            </IconButton> 
        </Tooltip>
    )
}