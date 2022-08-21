var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import EditIcon from "@mui/icons-material/EditOutlined";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import EditAction from "./EditAction";
import SparqlClient from "sparql-http-client";
export var semanticQuery = function (endpointUrl, store, object) { return __awaiter(void 0, void 0, void 0, function () {
    var objects;
    return __generator(this, function (_a) {
        objects = function (store, object) {
            return store.getQuads(null, null, object, null);
        };
        if (object)
            return [2 /*return*/, true];
        return [2 /*return*/, false];
    });
}); };
// EditButton is used to Edit the triple
// It shows the triples associated with this Semantic Node
// This is first of all the relationship between digital entity and the information node
export default function EditFab(endpointUrl, store, triple, actionCB) {
    var _this = this;
    var _a = useState(false), clicked = _a[0], onBtnClicked = _a[1];
    var _b = useState(function () {
        var getNamespaceObject = function (q) {
            if (q.value.includes('#')) {
                return {
                    namespace: "".concat(q.value.split('#').at(0), "#"),
                    value: "".concat(q.value.split('#').at(1))
                };
            }
            else {
                if (q.termType === "NamedNode") {
                    return {
                        namespace: "".concat((q.value.split('/').slice(0, -1)).join('/')),
                        value: "".concat(q.value.split('/').pop())
                    };
                }
                // is a literal without namespace
                return {
                    namespace: null,
                    value: "".concat(q.value)
                };
            }
        };
        var list = [];
        list.push(getNamespaceObject(triple.subject));
        list.push(getNamespaceObject(triple.predicate));
        list.push(getNamespaceObject(triple.object));
        return list;
    }), parsedTriple = _b[0], addParsedTriple = _b[1];
    var updateDb = function (q) { return __awaiter(_this, void 0, void 0, function () {
        var client, updateQuery, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new SparqlClient({ endpointUrl: endpointUrl });
                    updateQuery = "DELETE DATA{".concat(triple.subject.value, " ").concat(triple.predicate.value, " ").concat(triple.object.value, "} INSERT {").concat(q.subject.value, " ").concat(q.predicate.value, " ").concat(q.object.value, "}");
                    return [4 /*yield*/, client.query.update(updateQuery)];
                case 1:
                    response = _a.sent();
                    console.log("Response on upate ".concat(console.dir(response)));
                    return [2 /*return*/, true];
            }
        });
    }); };
    var handleClicked = function () {
        actionCB(React.createElement(EditAction, { parsedTriple: parsedTriple, clickHandler: updateDb }));
        onBtnClicked(!clicked);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { title: "Edit triples", placement: "top" },
            React.createElement(IconButton, { onClick: function () { handleClicked(); }, "aria-label": "delete", sx: { backgroundColor: '#EB9E3B', "&:hover": {
                        backgroundColor: "#EB9E3B",
                        cursor: "default",
                        transform: "scale(1.2)"
                    } } },
                React.createElement(EditIcon, { sx: { color: "white" } })))));
}
