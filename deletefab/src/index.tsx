import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Button, ButtonTypeMap, ExtendButtonBase, Stack, TextField, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Quad, Quad_Object, Store } from "n3";
import React from "react";
import { useRef, useState } from "react";
import SparqlClient from "sparql-http-client";



export const semanticQuery = async (endpointUrl:string, store:Store, quad:Quad)=>{
    // just doublechecks if the object is in the store.
    // should match every time
     return true
}



export default function DeleteFab(endpointUrl:string, store:Store, triple:Quad,actionCB:(jsxEl:JSX.Element)=>void){
    const btn = useRef<ExtendButtonBase<ButtonTypeMap<{color?:string}, "button">>>(null);
    const [btnState,setBtnState] = useState<'primary'|'success' | 'error'>('primary')

    const updateDb = async (q:Quad)=>{
        const client = new SparqlClient( {endpointUrl} )
        const updateQuery = `DELETE DATA{${triple.subject.value} ${triple.predicate.value} ${triple.object.value}} INSERT {${q.subject.value} ${q.predicate.value} ${q.object.value}}`
        const response = await client.query.update(updateQuery) as unknown as boolean
        console.log(`Response on delete ${console.dir(response)}`)
        if(btn) response ? setBtnState('success') : setBtnState('error')
    }

    const DeleteAction = 
<Stack spacing={2}>
    <h3>Would you like to DELETE this triple?</h3>
    <TextField
        id="outlined-basic" label="Subject" variant="outlined" value={triple.subject.value}
        sx={{backgroundColor:'rgb(255,250,250,0.3)', zIndex:1}} 
    />
    <TextField
        id="outlined-basic" label="Subject" variant="outlined" value={triple.predicate.value}
        sx={{backgroundColor:'rgb(255,250,250,0.3)', zIndex:1}} 
    />
    <TextField
        id="outlined-basic" label="Subject" variant="outlined" value={triple.object.value}
        sx={{backgroundColor:'rgb(255,250,250,0.3)', zIndex:1}} 
    />
    <Button color={btnState} onClick={(e)=> updateDb(triple)} variant="contained" endIcon={<DeleteIcon />}>
        Delete Triples
    </Button>
</Stack>

    const handleClicked = ()=> {
        actionCB(DeleteAction)
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