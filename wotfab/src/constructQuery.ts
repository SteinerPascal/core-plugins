import namespace from "@rdfjs/namespace";
import { CONSTRUCT } from "@tpluscode/sparql-builder";
import { Quad_Object } from "n3";

export default (iri:Quad_Object)=>{
    const td = namespace('https://www.w3.org/2019/wot/td#')
    const query = 
    CONSTRUCT`	
    ${iri} ${td.hasEventAffordance} ?eventAff.
    ?eventAff ?eventP ?eventO.
    ?eventAff ${td.hasForm} ?eventForm.
    ?eventForm ?eFp ?eFo.
    
    ${iri} ${td.hasPropertyAffordance} ?propAf.
    ?propAf	?propP ?propO.
    ?propAf ${td.hasForm} ?propForm.
    ?propForm ?pFp ?pFo.
    
    ${iri} ${td.hasActionAffordance} ?actionAff.
    ?actAff ?actP ?actO.
    ?actAff ${td.hasForm} ?actForm.
    ?actForm ?aFp ?aFo
   `.WHERE`
   OPTIONAL{
        ${iri} ${td.hasEventAffordance} ?eventAff.
        ?eventAff ?eventP ?eventO.
        ?eventAff ${td.hasForm} ?eventForm.
        ?eventForm ?eFp ?eFo.
   }

   OPTIONAL {
        ${iri} ${td.hasPropertyAffordance} ?propAf.
        ?propAf	?propP ?propO.
        ?propAf ${td.hasForm} ?propForm.
        ?propForm ?pFp ?pFo.
   }

   OPTIONAL{
        ${iri} ${td.hasActionAffordance} ?actionAff.
        ?actAff ?actP ?actO.
        ?actAff ${td.hasForm} ?actForm.
        ?actForm ?aFp ?aFo
   }`.LIMIT(10000).build()
   return query
}

       