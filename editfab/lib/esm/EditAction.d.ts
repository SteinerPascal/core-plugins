/// <reference types="react" />
import { Quad } from "n3";
export default function EditAction({ parsedTriple, clickHandler }: {
    parsedTriple: Array<{
        namespace: string | null;
        value: string;
    }>;
    clickHandler: (q: Quad) => Promise<boolean>;
}): JSX.Element;
