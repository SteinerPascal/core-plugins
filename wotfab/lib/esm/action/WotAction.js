import React from "react";
import WotCircular from "./WotCircular";
export default function WotAction(_a) {
    var endpointUrl = _a.endpointUrl, quad = _a.quad, store = _a.store;
    var clickHandler = function () {
    };
    return (React.createElement(WotCircular, { endpointUrl: endpointUrl, quad: quad, store: store, clickHandler: clickHandler }));
}
