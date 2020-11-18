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

export const fetchWeatherByCoords = ({ coords, key }) => {
    return async (dispatch) => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${key}&units=metric`)
            .then(res => {
                dispatch(fetchWeatherSuccess(res.data))
            })
            .catch(err => {
                dispatch(fetchWeatherFailure(err.response ? err.response.data.message : err.message))
            })
    }
}

export const setCoords = (coords) => {
    return {
        type: actions.SET_COORDS,
        payload: coords
    }
}

export const setData = (data) => {
    return {
        type: actions.SET_DATA,
        payload: data
    }
}

export const setLoading = (loading) => {
    return {
        type: actions.SET_LOADING,
        payload: loading
    }
}