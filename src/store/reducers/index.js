import * as actions from '../constants'

const initialState = {
    loading: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.FETCH_WEATHER_START:
            return {
                ...state,
                loading: true,
            }

        default: {
            return {
                ...state
            }
        }
    }
}

export default reducer