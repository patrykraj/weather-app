import * as actions from '../constants'

const initialState = {
    loading: false,
    coords: null,
    weatherData: null,
    forecastData: null,
    error: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.FETCH_WEATHER_START:
            return {
                ...state,
                loading: true,
            }

        case actions.FETCH_WEATHER_SUCCESS:
            return {
                ...state,
                loading: false,
                coords: action.payload.coords,
                weatherData: action.payload.data
            }

        case actions.FETCH_WEATHER_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    msg: action.payload
                }
            }

        case actions.FETCH_FORECAST_SUCCESS:
            return {
                ...state,
                loading: false,
                forecastData: action.payload
            }

        case actions.FETCH_FORECAST_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    msg: action.payload
                }
            }

        case actions.SET_COORDS:
            return {
                ...state,
                coords: {
                    lat: action.payload.lat,
                    lon: action.payload.lon
                }
            }

        case actions.SET_ERROR:
            return {
                ...state,
                error: action.payload
            }
            
        case actions.SET_DATA:
            return {
                ...state,
                weatherData: action.payload
            }

        case actions.SET_FORECAST_DATA:
            return {
                ...state,
                forecastData: action.payload
            }

        case actions.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }

        default: {
            return {
                ...state
            }
        }
    }
}

export default reducer