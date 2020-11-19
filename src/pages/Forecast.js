import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import * as actions from '../store/actions'
import { connect } from "react-redux";

import { FORECAST_API_KEY as key } from '../assets/constants'

import Form from '../components/Form'
import Day from '../components/forecast/Day'
import Loader from '../components/Loader'
import Container from '../components/styled/Container'

function Forecast(props) {
    const [searchedQuery, setSearchedQuery] = useState('')
    
    const { onFetchForecastAuto, loading, data, error } = props
    const name = props.match.params.id

    useEffect(() => {
        onFetchForecastAuto(name, key)
    }, [name, onFetchForecastAuto])

    let content;
    if(loading) content = <Loader />
    else if(!data && !loading) content = <h1>Select location</h1>
    else content = <>
        <h1>{data.city_name}, {data.country_code}:</h1>
        <DayList>
            {data.data.map(day => <Day key={day.datetime} weather={day.weather.icon} date={day.datetime.slice(-5,day.datetime.length)} max_temp={day.max_temp} low_temp={day.min_temp} pop={day.pop} />)}
        </DayList>
    </>

    return (
        <Container >
            <PageHeader>
                <Link to='/'>Weather Forecast</Link>
            </PageHeader>
            {error ? <p>{error.msg}</p> : null}
            <Form forecast searchedQuery={searchedQuery} setSearchedQuery={setSearchedQuery} />
            {content}
        </Container>
    )
}

const mapStateToProps = state => {
    return {
      data: state.forecastData,
      loading: state.loading,
      error: state.error
    }
  }
  

const mapDispatchToProps = dispatch => {
    return {
        onFetchForecastAuto: (name, key) => dispatch(actions.fetchForecastAuto(name, key))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Forecast)

const DayList = styled.ul`
    padding: 0;
    margin: 0;
    width: 80%;
    max-width: 768px;
`
const PageHeader = styled.header`
    font-size: 3rem;
    font-weight: bold;
    text-transform: uppercase;
    margin: 2rem 0;

    a {
        text-transform: uppercase;
        color: white;
        background-color: rgba(255,255,255, .3);
        padding: 5px 15px;
        border-radius: 5px;
  }
`