import { Button, Stack } from "@mui/material";
import React from "react";
import ShortcutIcon from '@mui/icons-material/Shortcut';
import { Link } from 'react-router-dom';
export default function ForwardAction(_a) {
    var quad = _a.quad;
    return (React.createElement(Stack, { spacing: 2 },
        React.createElement(Button, { component: Link, to: '/twin', state: { subject: quad.object.value }, variant: "contained", endIcon: React.createElement(ShortcutIcon, null) },
            "Jump to entity ",
            quad.object.id)));
}
