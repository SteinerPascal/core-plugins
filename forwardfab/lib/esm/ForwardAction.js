import { Button, Stack } from "@mui/material";
import React from "react";
import ShortcutIcon from '@mui/icons-material/Shortcut';
import { BrowserRouter, Link } from "react-router-dom";
export default function ForwardAction(_a) {
    var quad = _a.quad;
    var linkTarget = {
        pathname: "/twin",
        key: quad.object.value,
        state: {
            applied: true
        }
    };
    return (React.createElement(Stack, { spacing: 2 },
        React.createElement(BrowserRouter, null,
            React.createElement(Button, { component: Link, to: linkTarget, state: { subject: quad.object.value }, variant: "contained", endIcon: React.createElement(ShortcutIcon, null) },
                "Jump to entity ",
                quad.object.id))));
}
