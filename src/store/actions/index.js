import * as actions from '../constants'

export const startLoading = () => {
    return {
        type: actions.FETCH_WEATHER_START
    }
}