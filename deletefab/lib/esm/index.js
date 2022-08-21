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
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Button, Stack, TextField, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React from "react";
import { useRef, useState } from "react";
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
export default function DeleteFab(endpointUrl, store, triple, actionCB) {
    var _this = this;
    var btn = useRef(null);
    var _a = useState('primary'), btnState = _a[0], setBtnState = _a[1];
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
                    console.log("Response on delete ".concat(console.dir(response)));
                    if (btn)
                        response ? setBtnState('success') : setBtnState('error');
                    return [2 /*return*/];
            }
        });
    }); };
    var DeleteAction = React.createElement(Stack, { spacing: 2 },
        React.createElement("h3", null, "Would you like to delete this triple?"),
        React.createElement(TextField, { id: "outlined-basic", label: "Subject", variant: "outlined", value: triple.subject.value, sx: { backgroundColor: 'rgb(255,250,250,0.3)', zIndex: 1 } }),
        React.createElement(TextField, { id: "outlined-basic", label: "Subject", variant: "outlined", value: triple.predicate.value, sx: { backgroundColor: 'rgb(255,250,250,0.3)', zIndex: 1 } }),
        React.createElement(TextField, { id: "outlined-basic", label: "Subject", variant: "outlined", value: triple.object.value, sx: { backgroundColor: 'rgb(255,250,250,0.3)', zIndex: 1 } }),
        React.createElement(Button, { color: btnState, onClick: function (e) { return updateDb(triple); }, variant: "contained", endIcon: React.createElement(DeleteIcon, null) }, "Update Triples"));
    var handleClicked = function () {
        actionCB(DeleteAction);
    };
    return (React.createElement(Tooltip, { title: "Delete this triple", placement: "top" },
        React.createElement(IconButton, { onClick: function () { handleClicked(); }, "aria-label": "delete", sx: { backgroundColor: '#004E64', "&:hover": {
                    backgroundColor: "#004E64",
                    cursor: "default",
                    transform: "scale(1.2)"
                } } },
            React.createElement(DeleteIcon, { sx: { color: "white" } }))));
}
