import { WEATHER_API_KEY as w_key } from '../assets/constants'
import { FORECAST_API_KEY as f_key } from '../assets/constants'

import { connect } from "react-redux";
import * as actions from '../store/actions'

import styled from 'styled-components'

import SearchList from '../components/SearchList'

function Form({ searchedQuery, setSearchedQuery, onSetError, forecast, onFetchWeatherByName, list, loading, onFetchSearchList }) {
    
    const handleSetQuery = (e) => {
        if (!/^[a-zA-Z\s]*$/g.test(e.target.value)) return;
        setSearchedQuery(e.target.value);

        onFetchSearchList(e.target.value)
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

    const handleSearchQueryFromList = (query) => {
        const url = forecast ? `https://api.weatherbit.io/v2.0/forecast/daily?city=${query}&key=${f_key}` : `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${w_key}&units=metric`

        if(searchedQuery.trim().length > 2) {
            onFetchWeatherByName(forecast, url)
            setSearchedQuery('')
        }
    }
 
    return (
        <FormContainer onSubmit={handleSearchQuery}>  
            <Input type='text' value={searchedQuery} placeholder='City' onInput={handleSetQuery} pattern="[A-Za-z\s]+" title="Please use only letters"/>
            <Submit type='submit'>Search</Submit>
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
        onSetError: (payload) => dispatch(actions.setError(payload)),
        onFetchSearchList: (query) => dispatch(actions.fetchSearchList(query))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)

const FormContainer = styled.form`
    position: relative;
`

const Input = styled.input`
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
`

const Submit = styled.button`
    font-size: 1.4rem;
    color: #eee;
    background: rgba(0,0,0,.1);
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all .3s;
`