import { Button, Stack } from "@mui/material";
import React from "react";
import { Quad } from "n3";
import ShortcutIcon from '@mui/icons-material/Shortcut';
import { Link } from 'react-router-dom';


export default function ForwardAction({quad}:{quad:Quad}){

    return(
        <Stack spacing={2}>
           <Button component={Link} to={'/twin'} state={{ subject: quad.object.value }} variant="contained" endIcon={<ShortcutIcon />}>Jump to entity {quad.object.id}</Button>
        </Stack>
    )
}