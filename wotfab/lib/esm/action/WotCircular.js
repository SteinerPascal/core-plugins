import { NamedNode } from "n3";
import { useEffect, useRef, useState } from "react";
import React from 'react';
import PlanetComponent from "./PlanetComponent";
import namespace from "@rdfjs/namespace";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
export default function WotCircular(_a) {
    var endpointUrl = _a.endpointUrl, quad = _a.quad, store = _a.store, clickHandler = _a.clickHandler;
    var graph = useRef(null);
    var _b = useState(null), affordancePlanets = _b[0], setPlanets = _b[1];
    var td = namespace('https://www.w3.org/2019/wot/td#');
    var affordancesNamespaces = [
        td.hasEventAffordance.value,
        td.hasPropertyAffordance.value,
        td.hasActionAffordance.value
    ];
    // Get all the information about the TD
    var affordances = store.getQuads(quad.object, null, null, new NamedNode("".concat(quad.object.id, "-wotfab/"))).filter(function (q) { return affordancesNamespaces.includes(q.predicate.value); });
    if (!affordances[0])
        throw Error("No TD found for ".concat(quad.object.value));
    if (affordances.length === 0)
        console.warn("NO AFFORDANCES FOR ".concat(quad.object));
    //Utility function to set the right css to the htmldiv elements
    var styleChildren = function (cyclegraph, planets) {
        var angle = 360 - 90;
        var dangle = 360 / planets.length;
        var circleElements = planets.map(function (el) {
            angle += dangle;
            var style = {
                transform: "rotate(".concat(angle, "deg) translate(").concat(cyclegraph.clientWidth /
                    1.9, "px) rotate(-").concat(angle, "deg)")
            };
            return React.createElement("div", { key: "affordance-".concat(angle), style: style, className: 'circle' }, el);
        });
        return circleElements;
    };
    var getAffordanceTitle = function (q) {
        var affordanceTitle = store.getQuads(q.object, new NamedNode("https://www.w3.org/2019/wot/td#title"), null, new NamedNode("".concat(quad.object.id, "-wotfab/")));
        if (affordanceTitle.length > 1)
            console.warn("The affordance ".concat(q.object, " has more than one title. Taking the first val: ").concat(affordanceTitle[0].value));
        if (!affordanceTitle[0])
            return "NO title defined";
        return affordanceTitle[0].value;
    };
    var getAffordanceDescription = function (q) {
        var _a;
        var affordanceDesc = store.getQuads(q.object, new NamedNode("https://www.w3.org/2019/wot/td#description"), null, new NamedNode("".concat(quad.object.id, "-wotfab/")));
        if (affordanceDesc.length > 1)
            console.warn("The affordance ".concat(q.object, " has more than one description. Taking the first val: ").concat(affordanceDesc[0].value));
        return (_a = affordanceDesc[0]) === null || _a === void 0 ? void 0 : _a.value;
    };
    var getIcon = function (affPredicate) {
        var i = affordancesNamespaces.indexOf(affPredicate);
        switch (i) {
            case 0: return React.createElement(EventRepeatIcon, null);
            case 1: return React.createElement(FindInPageIcon, null);
            case 2: return React.createElement(PrecisionManufacturingIcon, null);
            default: throw Error("No icon found for ".concat(affPredicate));
        }
    };
    // Here we need to load all the fabs e.g plugins
    // After they are loaded we call their utility function 'semanticQuery'. 
    // This query decides then if that fab is applicable for this data.
    useEffect(function () {
        var createAffordances = function () {
            var elements = affordances.
                map(function (q) {
                //only affordances should be displayed as planets
                return React.createElement(PlanetComponent, { key: q.subject.value, affTitle: getAffordanceTitle(q), affDesc: getAffordanceDescription(q), clickHandler: clickHandler, icon: getIcon(q.predicate.value) });
            });
            setPlanets(elements);
        };
        createAffordances();
    }, []);
    // this method takes all the fabs. styles them and gives it back as a list
    var renderAffordances = function () {
        if (affordancePlanets && graph.current) {
            return styleChildren(graph.current, affordancePlanets);
        }
        else {
            return React.createElement("div", null, "Loading Fabholders");
        }
    };
    return (React.createElement("div", { className: "cyclegraph", style: { margin: "50px" }, ref: graph }, renderAffordances()));
}
