import React from 'react';
// @ts-ignore
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import wkt from "terraformer-wkt-parser";
// @ts-ignore
import {key} from "./api.js"

export default function WeatherAction({location}:{location:string}){
    console.log(`key:${key}`)
    var pt = wkt.parse(location.replace('<http://www.opengis.net/def/crs/OGC/1.3/CRS84> Point', 'POINT')) as GeoJSON.Point
    const { data, isLoading, errorMessage } = useOpenWeather({
        key: key,
        lat: pt.coordinates[0],
        lon: pt.coordinates[1],
        lang: 'en',
        unit: 'metric', // values are (metric, standard, imperial)
      });
      return (
        <ReactWeather
          isLoading={isLoading}
          errorMessage={errorMessage}
          data={data}
          lang="en"
          locationLabel="Geneva"
          unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
          showForecast
        />
      );
}