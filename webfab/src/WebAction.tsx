import LanguageIcon from '@mui/icons-material/Language';
import { Button, Stack } from "@mui/material";
import React from "react";
import { Quad } from "n3";


export default function WebAction({quad}:{quad:Quad}){

    const openInNewTab = (url:string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return(
        <Stack spacing={2}>
           <Button onClick={() => { openInNewTab(quad.object.value) }} endIcon={<LanguageIcon />}>Search: {quad.object.id} in the browser</Button>
        </Stack>
    )
}