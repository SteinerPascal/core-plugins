var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import { Tooltip } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import { NamedNode, Quad } from 'n3';
import React from 'react';
import SparqlClient from "sparql-http-client";
import { SELECT } from '@tpluscode/sparql-builder';
import WotAction from './action/WotAction';
import constructQuery from './constructQuery';
import namespace from '@rdfjs/namespace';
import DescriptionIcon from '@mui/icons-material/Description';
export var semanticQuery = function (endpointUrl, store, quad) { return __awaiter(void 0, void 0, void 0, function () {
    var ex, client, tdRepo, getTD, td, getTdAffordances, hasAffordances;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (quad.object.termType !== "NamedNode")
                    return [2 /*return*/, false]; //if var or literal it's not applicable
                ex = namespace('http://twin-example/geneva#');
                if (quad.predicate.value != ex.hasThingDescription.value)
                    return [2 /*return*/, false];
                client = new SparqlClient({ endpointUrl: endpointUrl });
                tdRepo = null //TDs are located on a different Repo
                ;
                getTD = new Promise(function (resolve, reject) {
                    var query = SELECT.ALL.WHERE(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", " ", " ?endpoint"], ["", " ", " ?endpoint"])), quad.object, ex.locatedIn).build();
                    client.query.select(query).then(function (bindingsStream) {
                        // check if this entity has a property assertion to a rdfs:comment
                        bindingsStream.on('data', function (row) {
                            if (row['endpoint']) {
                                tdRepo = row['endpoint'];
                                var q = new Quad(quad.object, new NamedNode(ex.locatedOn.value), row['endpoint'], undefined);
                                store.add(q);
                                resolve(true);
                            }
                            reject(false);
                        });
                        bindingsStream.on('error', function (err) {
                            console.error(err);
                            reject(false);
                        });
                    });
                });
                return [4 /*yield*/, getTD];
            case 1:
                td = _a.sent();
                getTdAffordances = new Promise(function (resolve, reject) {
                    if (tdRepo)
                        client = new SparqlClient({ endpointUrl: tdRepo.value });
                    var query = constructQuery(quad.object);
                    client.query.construct(query).then(function (bindingsStream) {
                        // check if this entity has a property assertion to a rdfs:comment
                        bindingsStream.on('data', function (binding) {
                            binding = new Quad(binding.subject, binding.predicate, binding.object, new NamedNode("".concat(quad.object.id, "-wotfab/")));
                            store.add(binding);
                            resolve(true);
                        });
                        bindingsStream.on('error', function (err) {
                            console.error(err);
                            reject(false);
                        });
                    });
                });
                return [4 /*yield*/, getTdAffordances];
            case 2:
                hasAffordances = _a.sent();
                if (td && hasAffordances)
                    return [2 /*return*/, true];
                return [2 /*return*/, false];
        }
    });
}); };
export default function WotFab(endpointUrl, store, quad, actionCB) {
    console.log('IN WOTFAB');
    var handleClicked = function () {
        // the comments array could be sent whole and if multiple comments are in the dataset, then all would be rendered
        actionCB(React.createElement(WotAction, { endpointUrl: endpointUrl, quad: quad, store: store }));
    };
    return (React.createElement(Tooltip, { title: "Show more information", placement: "top" },
        React.createElement(IconButton, { onClick: function () { handleClicked(); }, "aria-label": "delete", sx: { backgroundColor: '#870058', "&:hover": {
                    backgroundColor: "#870058",
                    cursor: "default",
                    transform: "scale(1.2)"
                } } },
            React.createElement(DescriptionIcon, { sx: { color: "white" } }))));
}
var templateObject_1;
