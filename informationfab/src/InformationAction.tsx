import { Button, ButtonTypeMap, ExtendButtonBase, Stack, TextField } from "@mui/material";
import UpdateIcon from '@mui/icons-material/Update';
import React, { useRef, useState } from "react";
import { DataFactory, Quad } from "n3";
import SparqlClient from "sparql-http-client";


export default function InformationAction({endpointUrl,quad}:{endpointUrl:string,quad:Quad,}) {
    const btn = useRef<ExtendButtonBase<ButtonTypeMap<{color?:string}, "button">>>(null);
    const [comment, setComment] = useState(quad.object);
    const [btnState,setBtnState] = useState<'primary'|'success' | 'error'>('primary')

    const onClickHandling = async () => {
        const client = new SparqlClient( {endpointUrl} )
        const updateQuery = `DELETE DATA{${quad.subject.value} ${quad.predicate.value} ${quad.object.value}} INSERT {${quad.subject.value} ${quad.predicate.value} ${comment}}`
        const response = await client.query.update(updateQuery) as unknown as boolean
        if(btn) response ? setBtnState('success') : setBtnState('error')
    }


    return(
        <Stack spacing={2}>
            <TextField
            multiline={true}
            id="outlined-basic" label="Comment" variant="outlined"     
            defaultValue={quad.object.value}
            onChange={(e) => setComment(DataFactory.namedNode(e.target.value))}
            sx={{backgroundColor:'rgb(255,250,250,0.3)', zIndex:1, minWidth:'400px'}} />
            
            <Button color={btnState} onClick={(e)=> onClickHandling()} variant="contained" endIcon={<UpdateIcon />}>
                Update Comment section
            </Button>
        </Stack>
    )
}