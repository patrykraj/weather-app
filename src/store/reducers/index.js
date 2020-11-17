import * as actions from '../constants'

const initialState = {
    loading: false,
    coords: null,
    weatherData: null,
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
                weatherData: action.payload
            }

        case actions.FETCH_WEATHER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case actions.SET_COORDS:
            return {
                ...state,
                coords: {
                    lat: action.payload.lat,
                    lon: action.payload.lon
                }
            }

        default: {
            return {
                ...state
            }
        }
    }
}

export default reducer