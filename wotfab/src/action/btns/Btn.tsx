import DataObjectIcon from '@mui/icons-material/DataObject';
import IconButton from "@mui/material/IconButton";
import React from 'react';

export default function DescriptionBtn(){

    return(
        <IconButton aria-label="custombtn"  sx={{backgroundColor:'#6A802E', "&:hover": {
            backgroundColor: "#6A802E",
            cursor: "default",
            transform: "scale(1.2)"
            }}}>
        <DataObjectIcon sx={{fontSize: 50,color:"white"}} />
      </IconButton> 
    )
}