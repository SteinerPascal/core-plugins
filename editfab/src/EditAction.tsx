import { Button, ButtonTypeMap, ExtendButtonBase, InputAdornment, Stack, TextField } from "@mui/material";
import UpdateIcon from '@mui/icons-material/Update';
import React, { useRef, useState } from "react";
import { DataFactory, Quad } from "n3";
import SparqlClient from "sparql-http-client";


export default function EditAction({endpointUrl,parsedTriple,quad}:{endpointUrl:string,parsedTriple:Array<{namespace:string | null, value:string}>,quad:Quad}){
    const btn = useRef<ExtendButtonBase<ButtonTypeMap<{color?:string}, "button">>>(null);
    const [subject, setSubject] = useState(DataFactory.namedNode(`${parsedTriple[0].namespace}${parsedTriple[0].value}`));
    const [predicate, setPredicate] = useState( DataFactory.namedNode(`${parsedTriple[1].namespace}${parsedTriple[1].value}`));
    const createObject = (val:string)=>{
        if(val.includes('#')) return DataFactory.namedNode(val) 
            return DataFactory.literal(val)
    }
    const [object, setObject] = useState(()=>{
        if(parsedTriple[0].namespace) return DataFactory.namedNode(`${parsedTriple[2].namespace}${parsedTriple[2].value}`) 
            return DataFactory.literal(`${parsedTriple[2].value}`) 
    });
    const [btnState,setBtnState] = useState<'primary'|'success' | 'error'>('primary')

    const onClickHandling = () => {
        updateDb(DataFactory.quad(subject,predicate,object)).then(res=>{
            if(btn) res ? setBtnState('success') : setBtnState('error')
        })
    }

    const updateDb = async (q:Quad)=>{
        const client = new SparqlClient( {endpointUrl} )
        const updateQuery = `DELETE DATA{${quad.value} ${quad.predicate.value} ${quad.object.value}} INSERT {${q.subject.value} ${q.predicate.value} ${q.object.value}}`
        const response = await (client.query.update(updateQuery) as unknown as Promise<Response>) //TODO: check what the response object looks like. is it Really a 'Response'?
        if(response) return true
        return false
    }
    return(
   
        <Stack spacing={2}>
            <TextField
            id="outlined-basic" label="Subject" variant="outlined"     
            InputProps={{
                startAdornment: <InputAdornment position="start">{parsedTriple[0].namespace}</InputAdornment>,
            }}
            defaultValue={parsedTriple[0].value}
            onChange={(e) => setSubject(DataFactory.namedNode(e.target.value))}
            sx={{backgroundColor:'rgb(255,250,250,0.3)', zIndex:1}} />
            <TextField
            id="outlined-basic" label="Predicate" variant="outlined"     
            InputProps={{
                startAdornment: <InputAdornment position="start">{parsedTriple[1].namespace}</InputAdornment>,
            }}
            defaultValue={parsedTriple[1].value}
            onChange={(e) => setPredicate(DataFactory.namedNode(e.target.value))}
            sx={{backgroundColor:'rgb(255,250,250,0.3)', zIndex:1}} />
            <TextField
            id="outlined-basic" label="Object" variant="outlined"     
            InputProps={{
                startAdornment: <InputAdornment position="start">{parsedTriple[2].namespace}</InputAdornment>,
            }}
            defaultValue={parsedTriple[2].value}
            onChange={(e) => createObject(e.currentTarget.value)}
            sx={{backgroundColor:'rgb(255,250,250,0.3)', zIndex:1}} />
            <Button color={btnState} onClick={(e)=> onClickHandling()} variant="contained" endIcon={<UpdateIcon />}>
                Update Triples
            </Button>
        </Stack>
    )
}