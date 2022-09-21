import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Quad, Quad_Object, Store } from "n3";
import React from "react";
import DeleteAction from "./DeleteAction";




export const semanticQuery = async (endpointUrl:string, store:Store, quad:Quad)=>{
    // just doublechecks if the object is in the store.
    // should match every time
     return true
}



export default function DeleteFab(endpointUrl:string, store:Store, quad:Quad,actionCB:(jsxEl:JSX.Element)=>void){
   

    const handleClicked = ()=> {
        actionCB(<DeleteAction endpointUrl={endpointUrl} quad={quad}/>)
    }

    return(
        <Tooltip title="Delete this triple"  placement="top">
            <IconButton onClick={() => { handleClicked() }} aria-label="delete" sx={{backgroundColor:'#004E64', "&:hover": {
                backgroundColor: "#004E64",
                cursor: "default",
                transform: "scale(1.2)"
                }}}>
            <DeleteIcon sx={{color:"white"}} />
            </IconButton> 
        </Tooltip>

    )
}