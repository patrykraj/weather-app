import { Link } from 'react-router-dom'
import { ConvertUnit, ConvertDate } from '../../assets/conversion'

function CurrentWeather({ data }) {
    return (
        <>
            <h2>{data.name}, {data.sys.country}</h2>
            <Link to={`/forecast/${data.name}`} className='forecast-link'>Check 16 day forecast</Link>
            <h1>{ConvertUnit(data.main.temp)}&deg;C</h1>
            <div>
                <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt='weather-icon' />
                <p>{data.weather[0].description}</p>
                <p>
                    <span>Max:</span><span>{ConvertUnit(data.main.temp_max)}&deg;</span>
                    <span>Min:</span><span>{ConvertUnit(data.main.temp_min)}&deg;</span>
                </p>
                <p>
                    <span>Feels like: {ConvertUnit(data.main.feels_like)}&deg;</span>
                    <span>Pressure: {data.main.pressure}hPa</span>
                    <span>Humidity: {data.main.humidity}%</span>
                    <span>Wind: {data.wind.speed}mph</span>
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