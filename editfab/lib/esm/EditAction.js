import { Button, InputAdornment, Stack, TextField } from "@mui/material";
import UpdateIcon from '@mui/icons-material/Update';
import React, { useRef, useState } from "react";
import { DataFactory } from "n3";
export default function EditAction(_a) {
    var parsedTriple = _a.parsedTriple, clickHandler = _a.clickHandler;
    var btn = useRef(null);
    var _b = useState(DataFactory.namedNode("".concat(parsedTriple[0].namespace).concat(parsedTriple[0].value))), subject = _b[0], setSubject = _b[1];
    var _c = useState(DataFactory.namedNode("".concat(parsedTriple[1].namespace).concat(parsedTriple[1].value))), predicate = _c[0], setPredicate = _c[1];
    var createObject = function (val) {
        if (val.includes('#'))
            return DataFactory.namedNode(val);
        return DataFactory.literal(val);
    };
    var _d = useState(function () {
        if (parsedTriple[0].namespace)
            return DataFactory.namedNode("".concat(parsedTriple[2].namespace).concat(parsedTriple[2].value));
        return DataFactory.literal("".concat(parsedTriple[2].value));
    }), object = _d[0], setObject = _d[1];
    var _e = useState('primary'), btnState = _e[0], setBtnState = _e[1];
    var onClickHandling = function () {
        clickHandler(DataFactory.quad(subject, predicate, object)).then(function (res) {
            if (btn)
                res ? setBtnState('success') : setBtnState('error');
        });
    };
    return (React.createElement(Stack, { spacing: 2 },
        React.createElement(TextField, { id: "outlined-basic", label: "Subject", variant: "outlined", InputProps: {
                startAdornment: React.createElement(InputAdornment, { position: "start" }, parsedTriple[0].namespace),
            }, defaultValue: parsedTriple[0].value, onChange: function (e) { return setSubject(DataFactory.namedNode(e.target.value)); }, sx: { backgroundColor: 'rgb(255,250,250,0.3)', zIndex: 1 } }),
        React.createElement(TextField, { id: "outlined-basic", label: "Predicate", variant: "outlined", InputProps: {
                startAdornment: React.createElement(InputAdornment, { position: "start" }, parsedTriple[1].namespace),
            }, defaultValue: parsedTriple[1].value, onChange: function (e) { return setPredicate(DataFactory.namedNode(e.target.value)); }, sx: { backgroundColor: 'rgb(255,250,250,0.3)', zIndex: 1 } }),
        React.createElement(TextField, { id: "outlined-basic", label: "Object", variant: "outlined", InputProps: {
                startAdornment: React.createElement(InputAdornment, { position: "start" }, parsedTriple[2].namespace),
            }, defaultValue: parsedTriple[2].value, onChange: function (e) { return createObject(e.currentTarget.value); }, sx: { backgroundColor: 'rgb(255,250,250,0.3)', zIndex: 1 } }),
        React.createElement(Button, { color: btnState, onClick: function (e) { return onClickHandling(); }, variant: "contained", endIcon: React.createElement(UpdateIcon, null) }, "Update Triples")));
}
