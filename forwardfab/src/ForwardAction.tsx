import { Button, Stack } from "@mui/material";
import React from "react";
import { Quad } from "n3";
import ShortcutIcon from '@mui/icons-material/Shortcut';
import { BrowserRouter, Link } from "react-router-dom";


export default function ForwardAction({quad}:{quad:Quad}){
    const linkTarget = {
        pathname: "/twin",
        key: quad.object.value, // we could use Math.random, but that's not guaranteed unique.
        state: {
          applied: true
        }
      };
    return(
        <Stack spacing={2}>
            <BrowserRouter >
                <Button component={Link} to={linkTarget} state={{ subject: quad.object.value }} variant="contained" endIcon={<ShortcutIcon />}>Jump to entity {quad.object.id}</Button>
            </BrowserRouter>
        </Stack>
    )
}