/// <reference types="react" />
import { Quad, Quad_Object, Store } from "n3";
export declare const semanticQuery: (endpointUrl: string, store: Store, object: Quad_Object) => Promise<boolean>;
export default function EditFab(endpointUrl: string, store: Store, triple: Quad, actionCB: (jsxEl: JSX.Element) => void): JSX.Element;
