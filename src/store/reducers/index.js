import * as actions from '../constants'

const initialState = {
    loading: false,
    coords: null,
    weatherData: null,
    forecastData: null,
    hourlyData: null,
    error: null,
    searchListData: null,
    searchListLoading: false,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.FETCH_WEATHER_START:
            return {
                ...state,
                loading: true,
                error: null
            }

        case actions.FETCH_WEATHER_SUCCESS:
            return {
                ...state,
                loading: false,
                weatherData: action.payload,
                searchListData: null
            }

        case actions.FETCH_WEATHER_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    msg: action.payload
                },
                searchListData: null
            }

        case actions.FETCH_COORDS_SUCCESS:
            return {
                ...state,
                loading: false,
                coords: action.payload.coords,
                weatherData: action.payload.data
            }

        case actions.FETCH_FORECAST_SUCCESS:
            return {
                ...state,
                loading: false,
                forecastData: action.payload,
                searchListData: null
            }

        case actions.FETCH_FORECAST_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    msg: action.payload
                },
                searchListData: null
            }

        case actions.SET_ERROR:
            return {
                ...state,
                error: action.payload
            }

        case actions.FETCH_SEARCH_LIST_START:
            return {
                ...state,
                searchListLoading: true,
            }

        case actions.FETCH_SEARCH_LIST_SUCCESS:
            return {
                ...state,
                searchListLoading: false,
                searchListData: action.payload
            }

        case actions.FETCH_SEARCH_LIST_FAILURE:
            return {
                ...state,
                searchListLoading: false,
                searchListData: null
            }

        case actions.FETCH_HOURLY_BY_NAME_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                hourlyData: action.payload
            }

        case actions.FETCH_HOURLY_BY_NAME_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default: {
            return {
                ...state
            }
        }
    }
}

export default reducer