import { WEATHER_API_KEY as w_key } from '../assets/constants'
import { FORECAST_API_KEY as f_key } from '../assets/constants'

import { connect } from "react-redux";
import * as actions from '../store/actions'

import styled from 'styled-components'

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
            setSearchedQuery('')
        } else {
            onSetError({
                msg: 'Min. 3 characters'
            })
        }
    }
 
    return (
        <form onSubmit={handleSearchQuery}>  
            <Input type='text' value={searchedQuery} placeholder='City' onInput={handleSetQuery} pattern="[A-Za-z\s]+" title="Please use only letters"/>
            <Submit type='submit'>Search</Submit>
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

const Input = styled.input`
    background: none;
    font-size: 1.5rem;
    border: none;
    border-bottom: 2px solid #777;
    padding: 5px 2px;
    margin: 2px 5px;
    color: white;
    transition: all .3s;

    &:focus {
        outline: none;
        border-bottom: 2px solid #eee;
    }
`

const Submit = styled.button`
    font-size: 1.4rem;
    background: rgba(0,0,0,.1);
    border: none;
    border-radius: 10px;
    color: #777;
    cursor: pointer;
    transition: all .3s;

    &:hover {
        color: #eee;
    }
`