import { Tooltip } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import {  Literal, NamedNode, Quad, Store } from 'n3';
import React from 'react';
import { SELECT } from '@tpluscode/sparql-builder';
import SparqlClient from "sparql-http-client"
import namespace from '@rdfjs/namespace';
import WeatherAction from './weatheraction';
import WbSunnyIcon from '@mui/icons-material/WbSunny';


export const semanticQuery = async (endpointUrl:string, store:Store,quad:Quad)=>{   
    if(quad.object.termType !== "NamedNode") return false
    //only things with a location can get the weather
    if(quad.predicate.value !== "http://www.opengis.net/ont/geosparql#hasLocation") return false
    const geo = namespace('http://www.opengis.net/ont/geosparql#')
    let client = new SparqlClient( {endpointUrl} )
    //const query = SELECT.ALL.WHERE`${quad.object} ${geo.asWKT} ?wkt`.build();

    const getLocation = new Promise((resolve,reject)=>{
        const query = SELECT.ALL.WHERE`${quad.object} ${geo.asWKT} ?wkt`.build();
        client.query.select(query).then((bindingsStream)=>{
            bindingsStream.on('data', row => {
                const wkt = row['wkt'] as Literal
                console.log(wkt)
                if(wkt && wkt.value.includes("Point")){
                    const q = new Quad(
                        quad.object,
                        new NamedNode(geo.asWKT.value),
                        wkt,
                        new NamedNode("WeatherFab")
                    )
                    store.add(q)
                    resolve(true) 
                }
                reject(false)
            });
    
            bindingsStream.on('error', (err) => {
                console.error(err)
                reject(false)
            })
    
        })
    })

    const location = await getLocation as Boolean
    console.log(`WEATHERFAB: location${location}`)
    return location
    
}

export default function WotFab(endpointUrl:string, store:Store, quad:Quad,actionCB:(jsxEl:JSX.Element)=>void){
   console.log('IN WOTFAB')
   const geo = namespace('http://www.opengis.net/ont/geosparql#')
    const handleClicked = ()=> {
        
        const objList = store.getObjects(quad.object,new NamedNode(geo.asWKT.value),new NamedNode("WeatherFab"))
        console.dir(objList)
        const locations = objList.filter((o)=>{
            if(o.termType == "Literal" && o.value.includes("http://www.opengis.net/def/crs/OGC/1.3/CRS84")) return o
            return false
        })
        if( locations.length > 1) console.warn(`WEATHERFAB: Multiple Locations found for ${quad.object.value} `)
        // the comments array could be sent whole and if multiple comments are in the dataset, then all would be rendered
        actionCB(<WeatherAction location={locations[0].value}/>)
    }
    return(
        <Tooltip title="Show more information"  placement="top">
            <IconButton onClick={() => { handleClicked() }} aria-label="delete" sx={{backgroundColor:'#870058', "&:hover": {
            backgroundColor: "#870058",
            cursor: "default",
            transform: "scale(1.2)"
            }}}>
                <WbSunnyIcon sx={{color:"white"}} />
            </IconButton> 
        </Tooltip>
    )
}