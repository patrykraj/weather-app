import axios from "axios";

import { WEATHER_API_KEY as w_key } from '../assets/constants'
import { FORECAST_API_KEY as f_key } from '../assets/constants'

function Form({ setData, searchedQuery, setSearchedQuery, setError, setLoading, forecast, history }) {

    console.log(history)

    const handleSetQuery = (e) => {
        if (!/^[a-zA-Z\s]*$/g.test(e.target.value)) return;
        setSearchedQuery(e.target.value);
    }

    const handleSearchQuery = (e) => {
        e.preventDefault();
        const url = forecast ? `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchedQuery}&key=${f_key}` : `https://api.openweathermap.org/data/2.5/weather?q=${searchedQuery}&appid=${w_key}`

        if(searchedQuery.trim().length > 2) {
            setLoading(true)

            axios
                .get(url)
                .then(city => {
                    console.log(city)
                    setSearchedQuery('')
                    setData(city.data)
                    setError(null)
                    setLoading(false)
                })
                .catch(err => {
                    setError({ 
                        msg: err.response ? err.response.data.message : err.message, 
                        query: searchedQuery
                    })
                    setLoading(false)
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

export default Form