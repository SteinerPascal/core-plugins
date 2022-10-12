import ShortcutIcon from '@mui/icons-material/ShortcutOutlined';
import { Tooltip } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import { Quad, Store } from 'n3';
import React from 'react';



export const semanticQuery = async (endpointUrl:string,store:Store,quad:Quad)=>{
    // It doesn't make sense to jump to literals, variables, or to BlankNodes
   if(quad.object.termType === "NamedNode") return true

   return false
}


export default function ForwardFab(endpointUrl:string, store:Store, quad:Quad,actionCB:(jsxEl:JSX.Element)=>void){
    const handleClicked = ()=> {
        window.history.pushState({ subject: quad.object.value }, '', `/twin/${getNamespaceObject(quad.object.value).value}`)
    }
    const getNamespaceObject = (q:string)=>{
        if(q.includes('#')){
            return {
                namespace: `${q.split('#').at(0)}#`,
                value: `${q.split('#').at(1)}`
            }
        } else {
            return {
                namespace:`${(q.split('/').slice(0, -1)).join('/')}`,
                value:`${q.split('/').pop()}`
            }
        }
      }

    return(
        <Tooltip title="Jump to entity"  placement="top">
                <IconButton onClick={() => { handleClicked() }} aria-label="delete" sx={{backgroundColor:'#870058', "&:hover": {
                    backgroundColor: "#870058",
                    cursor: "default",
                    transform: "scale(1.2)"
                    }}}>
                <ShortcutIcon sx={{color:"white"}} />
            </IconButton> 
        </Tooltip>
    )
}