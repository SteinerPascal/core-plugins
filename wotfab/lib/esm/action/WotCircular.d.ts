import { Quad, Store } from "n3";
export default function WotCircular({ endpointUrl, quad, store, clickHandler }: {
    endpointUrl: string;
    quad: Quad;
    store: Store;
    clickHandler: () => void;
}): JSX.Element;
