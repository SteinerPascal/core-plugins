import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from "@mui/material/IconButton";
import React from 'react';
export default function CustomBtn() {
    return (React.createElement(IconButton, { "aria-label": "custombtn", sx: { backgroundColor: '#6A802E', "&:hover": {
                backgroundColor: "#6A802E",
                cursor: "default",
                transform: "scale(1.2)"
            } } },
        React.createElement(LightModeIcon, { sx: { fontSize: 50, color: "white" } })));
}
