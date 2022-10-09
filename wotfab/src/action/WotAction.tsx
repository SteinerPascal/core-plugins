import React from "react";
import { Quad, Store } from "n3";
import WotCircular from "./WotCircular";


export default function WotAction({endpointUrl,quad,store}:{endpointUrl:string,quad:Quad,store:Store}) {

    const clickHandler = ()=>{

    }

    return(
        <WotCircular endpointUrl={endpointUrl} quad={quad} store={store} clickHandler={clickHandler}/>
    )
}