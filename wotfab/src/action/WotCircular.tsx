import { NamedNode, Quad, Store } from "n3";
import { useEffect, useRef, useState } from "react";
import React from 'react';
import PlanetComponent from "./PlanetComponent";
import namespace from "@rdfjs/namespace";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

export default function WotCircular({endpointUrl,quad,store,clickHandler}:{endpointUrl:string,quad:Quad,store:Store,clickHandler:()=>void}) {
  const graph = useRef<HTMLDivElement>(null);
  const [affordancePlanets, setPlanets] = useState<null | JSX.Element[]>(null)
  const td = namespace('https://www.w3.org/2019/wot/td#')
  const affordancesNamespaces = [
    td.hasEventAffordance.value,
    td.hasPropertyAffordance.value,
    td.hasActionAffordance.value
  ]
  // Get all the information about the TD
  const affordances = store.getQuads(quad.object,null,null, new NamedNode(`${quad.object.id}-wotfab/`)).filter((q)=>{return affordancesNamespaces.includes(q.predicate.value)})
  if(!affordances[0]) throw Error(`No TD found for ${quad.object.value}`)

  if(affordances.length === 0) console.warn(`NO AFFORDANCES FOR ${quad.object}`)

  //Utility function to set the right css to the htmldiv elements
  const styleChildren = (cyclegraph:HTMLDivElement,planets:JSX.Element[])=>{
    let angle = 360 - 90;
    let dangle = 360 / planets.length;

    const circleElements = planets.map(el=>{
      angle += dangle;
      const style = {
        transform:`rotate(${angle}deg) translate(${cyclegraph.clientWidth /
        1.9}px) rotate(-${angle}deg)`
      }
      return <div key={`affordance-${angle}`} style={style} className='circle' >{el}</div>
    })
    return circleElements
  }

  const getAffordanceTitle = (q:Quad)=>{
    const affordanceTitle = store.getQuads(q.object,new NamedNode("https://www.w3.org/2019/wot/td#title"),null,new NamedNode(`${quad.object.id}-wotfab/`))
    if(affordanceTitle.length > 1) console.warn(`The affordance ${q.object} has more than one title. Taking the first val: ${affordanceTitle[0].value}`)
    if(!affordanceTitle[0]) return "NO title defined"
    return affordanceTitle[0].value
  }
  const getAffordanceDescription = (q:Quad)=>{
    const affordanceDesc = store.getQuads(q.object,new NamedNode("https://www.w3.org/2019/wot/td#description"),null,new NamedNode(`${quad.object.id}-wotfab/`))
    if(affordanceDesc.length > 1) console.warn(`The affordance ${q.object} has more than one description. Taking the first val: ${affordanceDesc[0].value}`)
    return affordanceDesc[0]?.value
  }

  const getIcon = (affPredicate:string)=>{
    const i = affordancesNamespaces.indexOf(affPredicate)
    switch(i){
      case 0: return <EventRepeatIcon/>
      case 1: return <FindInPageIcon/>
      case 2: return <PrecisionManufacturingIcon/>
      default: throw Error(`No icon found for ${affPredicate}`)
    }
  }


  // Here we need to load all the fabs e.g plugins
  // After they are loaded we call their utility function 'semanticQuery'. 
  // This query decides then if that fab is applicable for this data.
  useEffect(() => {
    const createAffordances = ()=>{
      const elements:Array<JSX.Element> = affordances.
      map((q:Quad)=>{
       
        //only affordances should be displayed as planets
        return <PlanetComponent key={q.subject.value} affTitle={getAffordanceTitle(q)} affDesc={getAffordanceDescription(q)} clickHandler={clickHandler} icon={getIcon(q.predicate.value)}/>
      });
      setPlanets(elements)
    }
    createAffordances()

  }, []);
  // this method takes all the fabs. styles them and gives it back as a list
  const renderAffordances = ()=>{
    if(affordancePlanets && graph.current){
      return styleChildren(graph.current,affordancePlanets)
    } else {
      return <div>Loading Fabholders</div>
    }
  }

    return(
        <div className="cyclegraph" style={{margin:"50px"}} ref={graph}>
            {renderAffordances()}
        </div>
    )
}