/// <reference types="react" />
import { Quad, Store } from 'n3';
export declare const semanticQuery: (endpointUrl: string, store: Store, quad: Quad) => Promise<boolean>;
export default function WebFab(endpointUrl: string, store: Store, quad: Quad, actionCB: (jsxEl: JSX.Element) => void): JSX.Element;
