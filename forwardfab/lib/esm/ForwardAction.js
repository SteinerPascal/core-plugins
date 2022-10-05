import { Button, Stack } from "@mui/material";
import React from "react";
export default function ForwardAction(_a) {
    var quad = _a.quad;
    var getNamespaceObject = function (q) {
        if (q.includes('#')) {
            return {
                namespace: "".concat(q.split('#').at(0), "#"),
                value: "".concat(q.split('#').at(1))
            };
        }
        else {
            return {
                namespace: "".concat((q.split('/').slice(0, -1)).join('/')),
                value: "".concat(q.split('/').pop())
            };
        }
    };
    var linkTarget = {
        pathname: "/twin/".concat(getNamespaceObject(quad.object.value).value),
        key: quad.object.value,
        state: {
            applied: true
        }
    };
    return (React.createElement(Stack, { spacing: 2 },
        React.createElement(Button, { onClick: function () { window.history.pushState({ subject: quad.object.value }, '', "/twin/".concat(getNamespaceObject(quad.object.value).value)); } },
            "Jump to entity ",
            quad.object.id)));
}
