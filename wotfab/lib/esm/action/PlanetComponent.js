import { IconButton } from "@mui/material";
import React from "react";
import { Planet } from "react-planet";
export default function PlanetComponent(_a) {
    var affTitle = _a.affTitle, affDesc = _a.affDesc, clickHandler = _a.clickHandler, icon = _a.icon;
    var iconBtn = React.createElement(IconButton, { "aria-label": "custombtn", sx: { backgroundColor: '#6A802E', "&:hover": {
                backgroundColor: "#6A802E",
                cursor: "default",
                transform: "scale(1.2)"
            } } }, icon);
    return (React.createElement("div", null,
        React.createElement("p", { style: { color: "black", width: 'max-content' } }, affTitle),
        React.createElement(Planet, { centerContent: iconBtn, hideOrbit: true, autoClose: true, orbitRadius: 60, bounceOnClose: true, rotation: 105, 
            // the bounce direction is minimal visible
            // but on close it seems the button wobbling a bit to the bottom
            bounceDirection: "BOTTOM" },
            React.createElement("div", null),
            React.createElement("div", null))));
}
