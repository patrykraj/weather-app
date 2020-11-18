import { WEATHER_API_KEY as w_key } from '../assets/constants'
import { FORECAST_API_KEY as f_key } from '../assets/constants'

import { connect } from "react-redux";
import * as actions from '../store/actions'

function Form({ searchedQuery, setSearchedQuery, onSetError, forecast, onFetchWeatherByName }) {

    const handleSetQuery = (e) => {
        if (!/^[a-zA-Z\s]*$/g.test(e.target.value)) return;
        setSearchedQuery(e.target.value);
    }

    const handleSearchQuery = (e) => {
        e.preventDefault();
        const url = forecast ? `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchedQuery}&key=${f_key}` : `https://api.openweathermap.org/data/2.5/weather?q=${searchedQuery}&appid=${w_key}&units=metric`

        if(searchedQuery.trim().length > 2) {
            onFetchWeatherByName(forecast, url)
        } else {
            onSetError({
                msg: 'Min. 3 characters'
            })
        }
    }
 
    return (
        <form onSubmit={handleSearchQuery}>  
            <input type='text' value={searchedQuery} placeholder='City' onInput={handleSetQuery} pattern="[A-Za-z\s]+" title="Please use only letters"/>
            <button type='submit'>Submit</button>
        </form>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchWeatherByName: (forecast, url) => dispatch(actions.fetchWeatherByName(forecast, url)),
        onSetError: (payload) => dispatch(actions.setError(payload))
    }
}

export default connect(null, mapDispatchToProps)(Form)