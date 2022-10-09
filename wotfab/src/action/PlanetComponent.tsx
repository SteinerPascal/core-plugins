
import { IconButton } from "@mui/material";
import React from "react";
import { Planet } from "react-planet";


export default function PlanetComponent({affTitle,affDesc,clickHandler,icon}:{affTitle:string,affDesc:string,clickHandler:()=>void,icon:JSX.Element | undefined}){
	const iconBtn = 
	<IconButton aria-label="custombtn"  sx={{backgroundColor:'#6A802E', "&:hover": {
		backgroundColor: "#6A802E",
		cursor: "default",
		transform: "scale(1.2)"
		}}}>
	{icon}
  </IconButton> 

    return (
        <div>
            <p style={{color:"black", width:'max-content'}}>{affTitle}</p>
			<Planet
                centerContent={iconBtn}
                hideOrbit
                autoClose={true}
                orbitRadius={60}
                bounceOnClose
                rotation={105}
                // the bounce direction is minimal visible
                // but on close it seems the button wobbling a bit to the bottom
                bounceDirection="BOTTOM"
                >                    
                <div />
                <div />
            </Planet>
        </div>
    )
}