import { WEATHER_API_KEY as w_key } from '../assets/constants'
import { FORECAST_API_KEY as f_key } from '../assets/constants'
import Glass from '../assets/img/loupe.ico'

import { connect } from "react-redux";
import * as actions from '../store/actions'

import styled from 'styled-components'

import SearchList from '../components/SearchList'

function Form({ searchedQuery, setSearchedQuery, onSetError, forecast, hourly, onFetchWeatherByName, onFetchHourlyByName, list, loading, onFetchSearchList }) {
    
    const handleSetQuery = (e) => {
        if (!/^[a-zA-Z\s]*$/g.test(e.target.value)) return;
        setSearchedQuery(e.target.value);

        onFetchSearchList(e.target.value)
    }

    const handleSearchQuery = (e) => {
        e.preventDefault();
        const url = forecast ? `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchedQuery}&key=${f_key}` : `https://api.openweathermap.org/data/2.5/weather?q=${searchedQuery}&appid=${w_key}&units=metric`

        if(searchedQuery.trim().length > 2) {
            if(hourly) {
                onFetchHourlyByName(searchedQuery, f_key, w_key)
            } else {
                onFetchWeatherByName(forecast, url)
            }

            setSearchedQuery('')
        } else {
            onSetError({
                msg: 'Min. 3 characters'
            })
        }
    }

    const handleSearchQueryFromList = (query) => {
        const url = forecast ? `https://api.weatherbit.io/v2.0/forecast/daily?city=${query}&key=${f_key}` :  `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${w_key}&units=metric`

        if(searchedQuery.trim().length > 2) {
            if(hourly) {
                onFetchHourlyByName(query, f_key, w_key)
            } else {
                onFetchWeatherByName(forecast, url)
            }

            setSearchedQuery('')
        }
    }
 
    return (
        <FormContainer onSubmit={handleSearchQuery}>  
            <Input type='text' value={searchedQuery} placeholder='City' onInput={handleSetQuery} pattern="[A-Za-z\s]+" title="Please use only letters"/>
            <Submit type='submit'>
                <img src={Glass} alt='glass' />
            </Submit>
            {list ? <SearchList items={list} handleSearchQueryFromList={handleSearchQueryFromList} loading={loading} /> : null}
        </FormContainer>
    )
}

const mapStateToProps = state => {
    return {
        list: state.searchListData,
        loading: state.searchListLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchWeatherByName: (forecast, url) => dispatch(actions.fetchWeatherByName(forecast, url)),
        onFetchHourlyByName: (name, f_key, w_key) => dispatch(actions.fetchHourlyByName(name, f_key, w_key)),
        onSetError: (payload) => dispatch(actions.setError(payload)),
        onFetchSearchList: (query) => dispatch(actions.fetchSearchList(query))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)

const FormContainer = styled.form`
    position: relative;
    max-width: 70%;
`

const Input = styled.input`
    max-width: 100%;
    background: none;
    font-size: 1.5rem;
    border: none;
    border-bottom: 2px solid #eee;
    padding: 5px 2px;
    margin: 2px 5px;
    color: white;
    transition: all .3s;

    &:focus {
        outline: none;
        border-bottom: 2px solid #eee;
    }

    &::placeholder {
        color: #eee;
    }

    @media(max-width: 300px) {
        font-size: 20px;
    }
`

const Submit = styled.button`
    position: absolute;
    right: 10px;
    top: 9px;
    font-size: 1.4rem;
    color: #eee;
    background: transparent;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all .3s;
    padding: 0;
    max-width: 20px;

    img {
        max-width: 100%;
    }

    @media(max-width: 300px) {
        max-width: 15px;
        right: 0;
        top: 5px;
    }
`