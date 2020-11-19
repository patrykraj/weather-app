import * as actions from '../constants'
import axios from 'axios'

export const fetchWeatherStart = () => {
    return {
        type: actions.FETCH_WEATHER_START
    }
}

export const fetchWeatherSuccess = (data) => {
    return {
        type: actions.FETCH_WEATHER_SUCCESS,
        payload: data
    }
}

export const fetchWeatherFailure = (err) => {
    return {
        type: actions.FETCH_WEATHER_FAILURE,
        payload: err
    }
}

export const fetchCoordsSuccess = (data, coords) => {
    return {
        type: actions.FETCH_COORDS_SUCCESS,
        payload: {
            data,
            coords
        }
    }
}

export const setError = (err) => {
    return {
        type: actions.SET_ERROR,
        payload: err
    }
}

export const fetchForecastSuccess = (data) => {
    return {
        type: actions.FETCH_FORECAST_SUCCESS,
        payload: data
    }
}

export const fetchForecastFailure = (err) => {
    return {
        type: actions.FETCH_WEATHER_FAILURE,
        payload: err
    }
}

export const fetchWeatherByCoords = ({ coords, key }) => {
    return async (dispatch) => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${key}&units=metric`)
            .then(res => {
                dispatch(fetchCoordsSuccess(res.data, coords))
            })
            .catch(err => {
                dispatch(fetchWeatherFailure(err.response ? err.response.data.message : err.message))
            })
    }
}

export const fetchForecast = ({ name, key }) => {
    return async dispatch => {
        dispatch(fetchWeatherStart())
        
        axios
            .get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${name}&key=${key}`)
            .then(res => {
                dispatch(fetchForecastSuccess(res.data))
            })
            .catch(err => {
                dispatch(fetchForecastFailure(err.response ? err.response.data.message : err.message))
            })
    }
}

export const fetchWeatherByName = (forecast, url) => {
    return async dispatch => {
        dispatch(fetchWeatherStart())

        axios
            .get(url)
            .then(city => {
                if(forecast) {
                    dispatch(fetchForecastSuccess(city.data))
                    
                    var newurl = window.location.protocol + "//" + window.location.host + '/forecast/' + city.data.city_name;
                    window.history.pushState({path:newurl},'',newurl);
                } else {
                    dispatch(fetchWeatherSuccess(city.data))
                }
            })
            .catch(err => {
                dispatch(fetchWeatherFailure(err.response ? err.response.data.message : err.message))
            })
    }
}

export const fetchForecastAuto = (name, key) => {
    return async dispatch => {
        dispatch(fetchWeatherStart())

        axios
            .get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${name}&key=${key}`)
            .then(res => {
                dispatch(fetchForecastSuccess(res.data))
            })
            .catch(err => {
                dispatch(fetchForecastFailure({
                    msg: err.response ? err.response.data.message : err.message
                }))
            })
    }
}