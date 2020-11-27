import React from 'react';
import propTypes from 'prop-types';

import { convertUnit, convertDate } from '../../assets/utils';
import LinkButton from '../LinkButton';

function CurrentWeather({ data }) {
  return (
        <>
            <h2>{data.name}, {data.sys.country}</h2>
            <LinkButton to={`/forecast/${data.name}`} >Check 16 day forecast</LinkButton>
            <h1>{convertUnit(data.main.temp)}&deg;C</h1>
            <div>
                <p>{data.weather[0].main}</p>
                <p>
                    <span>Max:</span><span>{convertUnit(data.main.temp_max)}&deg;</span>
                    <span>Min:</span><span>{convertUnit(data.main.temp_min)}&deg;</span>
                </p>
                <p>
                    <span>Feels like: {convertUnit(data.main.feels_like)}&deg;</span>
                    <span>Pressure: {data.main.pressure}hPa</span>
                    <span>Humidity: {data.main.humidity}%</span>
                    <span>Wind: {data.wind.speed}m/s</span>
                </p>
                <p>
                    <span>
                    Sunrise: { convertDate(
                      data.sys.sunrise,
                      data.timezone,
                    )}:{ convertDate(
                      data.sys.sunrise,
                      data.timezone,
                      true,
                    ) }
                    </span>
                    <span>
                    Sunset: {convertDate(
                      data.sys.sunset,
                      data.timezone,
                    )}:{convertDate(
                      data.sys.sunset,
                      data.timezone,
                      true,
                    )}
                    </span>
                </p>
            </div>
        </>
  );
}

export default CurrentWeather;

CurrentWeather.propTypes = {
  data: propTypes.object,
};
