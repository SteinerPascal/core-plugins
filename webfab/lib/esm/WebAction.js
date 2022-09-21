import LanguageIcon from '@mui/icons-material/Language';
import { Button, Stack } from "@mui/material";
import React from "react";
export default function WebAction(_a) {
    var quad = _a.quad;
    var openInNewTab = function (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
    };
    return (React.createElement(Stack, { spacing: 2 },
        React.createElement(Button, { onClick: function () { openInNewTab(quad.object.value); }, endIcon: React.createElement(LanguageIcon, null) },
            "Search: ",
            quad.object.id,
            " in the browser")));
}
