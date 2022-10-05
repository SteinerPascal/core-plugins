/// <reference types="react" />
import { Quad } from "n3";
export default function EditAction({ endpointUrl, parsedTriple, quad }: {
    endpointUrl: string;
    parsedTriple: Array<{
        namespace: string | null;
        value: string;
    }>;
    quad: Quad;
}): JSX.Element;
