import EditIcon from "@mui/icons-material/EditOutlined";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Quad, Quad_Object, Store } from "n3";
import React, { useEffect, useState } from "react";
import EditAction from "./EditAction";


export const semanticQuery = async (endpointUrl:string,store:Store,quad:Quad)=>{
    // just doublechecks if the object is in the store.
    // should match every time
    const objects = (store:Store,quad:Quad)=>{
        return store.getQuads(null, null, quad.object,null)
    }

   if(quad.object) return true

   return false
}

// EditButton is used to Edit the triple
// It shows the triples associated with this Semantic Node
// This is first of all the relationship between digital entity and the information node
export default function EditFab(endpointUrl:string, store:Store, triple:Quad,actionCB:(jsxEl:JSX.Element)=>void){

    const createParsedTriple = ()=>{
        const getNamespaceObject = (q:Quad_Object)=>{
            if(q.value.includes('#')){
                return {
                    namespace: `${q.value.split('#').at(0)}#`,
                    value: `${q.value.split('#').at(1)}`
                }
            } else {
                if(q.termType === "NamedNode"){
                    return {
                        namespace:`${(q.value.split('/').slice(0, -1)).join('/')}`,
                        value:`${q.value.split('/').pop()}`
                    }
                }
                // is a literal without namespace
                return {
                    namespace:null,
                    value:`${q.value}`
                }
            }
        }
        const list:Array<{namespace:string | null, value:string}> = []
        list.push(getNamespaceObject(triple.subject))
        list.push(getNamespaceObject(triple.predicate))
        list.push(getNamespaceObject(triple.object))
        return list
    }


    const handleClicked = ()=> {  
        const parsedTriple = createParsedTriple()
        actionCB(<EditAction endpointUrl={endpointUrl} parsedTriple={parsedTriple} quad={triple}></EditAction>)
    }

    return(
        <React.Fragment>
            <Tooltip title="Edit triples"  placement="top">
                <IconButton onClick={() => { handleClicked() }} aria-label="delete" sx={{backgroundColor:'#EB9E3B', "&:hover": {
                    backgroundColor: "#EB9E3B",
                    cursor: "default",
                    transform: "scale(1.2)"
                    }}}>
                    <EditIcon sx={{color:"white"}} />
                </IconButton> 
            </Tooltip>
        </React.Fragment>
    )
}