import { Button, ButtonTypeMap, ExtendButtonBase, Stack, TextField } from "@mui/material";
import { Quad } from "n3";
import React from "react";
import { useRef, useState } from "react";
import SparqlClient from "sparql-http-client";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

export default function DeleteAction({endpointUrl,quad}:{endpointUrl:string,quad:Quad}) {
    const btn = useRef<ExtendButtonBase<ButtonTypeMap<{color?:string}, "button">>>(null);
    const [btnState,setBtnState] = useState<'primary'|'success' | 'error'>('primary')

    const updateDb = async (q:Quad)=>{
        const client = new SparqlClient( {endpointUrl} )
        const updateQuery = `DELETE DATA{${quad.subject.value} ${quad.predicate.value} ${quad.object.value}} INSERT {${q.subject.value} ${q.predicate.value} ${q.object.value}}`
        const response = await client.query.update(updateQuery) as unknown as boolean
        if(btn) response ? setBtnState('success') : setBtnState('error')
    }

    return(    
        <Stack spacing={2}>
            <h3>Would you like to DELETE this triple?</h3>
            <TextField
                id="outlined-basic" label="Subject" variant="outlined" value={quad.subject.value}
                sx={{backgroundColor:'rgb(255,250,250,0.3)', zIndex:1}} 
            />
            <TextField
                id="outlined-basic" label="Subject" variant="outlined" value={quad.predicate.value}
                sx={{backgroundColor:'rgb(255,250,250,0.3)', zIndex:1}} 
            />
            <TextField
                id="outlined-basic" label="Subject" variant="outlined" value={quad.object.value}
                sx={{backgroundColor:'rgb(255,250,250,0.3)', zIndex:1}} 
            />
            <Button color={btnState} onClick={(e)=> updateDb(quad)} variant="contained" endIcon={<DeleteIcon />}>
                Delete Triples
            </Button>
        </Stack>
    )

}