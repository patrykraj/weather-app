import { ConvertUnit, ConvertDate } from '../../assets/conversion'

import LinkButton from '../LinkButton'

function CurrentWeather({ data }) {
    return (
        <>
            <h2>{data.name}, {data.sys.country}</h2>
            <LinkButton to={`/week/${data.name}`} >Check 7 day forecast</LinkButton>
            <h1>{ConvertUnit(data.main.temp)}&deg;C</h1>
            <div>
                <p>{data.weather[0].main}</p>
                <p>
                    <span>Max:</span><span>{ConvertUnit(data.main.temp_max)}&deg;</span>
                    <span>Min:</span><span>{ConvertUnit(data.main.temp_min)}&deg;</span>
                </p>
                <p>
                    <span>Feels like: {ConvertUnit(data.main.feels_like)}&deg;</span>
                    <span>Pressure: {data.main.pressure}hPa</span>
                    <span>Humidity: {data.main.humidity}%</span>
                    <span>Wind: {data.wind.speed}m/s</span>
                </p>
                <p>
                    <span>
                    Sunrise: {ConvertDate(data.sys.sunrise, data.timezone)}:{ConvertDate(data.sys.sunrise, data.timezone, true)}
                    </span>
                    <span>
                    Sunset: {ConvertDate(data.sys.sunset, data.timezone)}:{ConvertDate(data.sys.sunset, data.timezone, true)}  
                    </span>
                </p>
            </div>
        </>
    )
}

export default CurrentWeather