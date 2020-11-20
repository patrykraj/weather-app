import { WEATHER_API_KEY as w_key } from '../assets/constants'
import { FORECAST_API_KEY as f_key } from '../assets/constants'

import { connect } from "react-redux";
import * as actions from '../store/actions'

import styled from 'styled-components'

import SearchList from '../components/SearchList'


import { useState } from 'react';
import axios from 'axios'

function Form({ searchedQuery, setSearchedQuery, onSetError, forecast, onFetchWeatherByName }) {
    const [list, setList] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSetQuery = (e) => {
        if (!/^[a-zA-Z\s]*$/g.test(e.target.value)) return;
        setSearchedQuery(e.target.value);

        searchListHint(e.target.value)
    }

    const searchListHint = (query) => {
        console.log(query, 'QUERY')
        if(query.trim().length > 2) {

            setLoading(true)

            axios
            .get(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=worldcitiespop&q=${query}&rows=5&sort=population`)
            .then(res => {
                console.log(res.data)
                setList(res.data.records)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                setList(null)
            })

            // axios
            //     .get(`http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=5&offset=0&namePrefix=${query}&minPopulation=40000&sort=-population`)
            //     .then(res => {
            //         // console.log(res.data)
            //         setList(res.data.data)
            //     })
            //     .catch(err => setList(null))
        } else setList(null)
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
        setList(null)

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
            {/* {list ? <ul>{list.map(city => <li key={Math.random()} onClick={() => handleSearchQueryFromList(`${city.city}, ${city.countryCode}`)}>{city.city}, {city.regionCode}, {city.countryCode}</li>)}</ul> : null} */}
            {list ? <SearchList items={list} handleSearchQueryFromList={handleSearchQueryFromList} loading={loading} /> : null}
        </FormContainer>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchWeatherByName: (forecast, url) => dispatch(actions.fetchWeatherByName(forecast, url)),
        onSetError: (payload) => dispatch(actions.setError(payload))
    }
}

export default connect(null, mapDispatchToProps)(Form)

const FormContainer = styled.form`
    position: relative;
`

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