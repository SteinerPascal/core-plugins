import React from 'react';
// @ts-ignore
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import wkt from "terraformer-wkt-parser";
// @ts-ignore
import { key } from "./api.js";
export default function WeatherAction(_a) {
    var location = _a.location;
    console.log("key:".concat(key));
    var pt = wkt.parse(location.replace('<http://www.opengis.net/def/crs/OGC/1.3/CRS84> Point', 'POINT'));
    var _b = useOpenWeather({
        key: key,
        lat: pt.coordinates[0],
        lon: pt.coordinates[1],
        lang: 'en',
        unit: 'metric', // values are (metric, standard, imperial)
    }), data = _b.data, isLoading = _b.isLoading, errorMessage = _b.errorMessage;
    return (React.createElement(ReactWeather, { isLoading: isLoading, errorMessage: errorMessage, data: data, lang: "en", locationLabel: "Geneva", unitsLabels: { temperature: 'C', windSpeed: 'Km/h' }, showForecast: true }));
}
