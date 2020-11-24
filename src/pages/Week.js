import { useEffect, useState } from "react"
import styled from 'styled-components'

import * as actions from '../store/actions'
import { connect } from "react-redux";

import { FORECAST_API_KEY as key } from '../assets/constants'

import Form from '../components/Form'
import Day from '../components/forecast/Day'
import Loader from '../components/Loader'
import Container from '../components/styled/Container'
import NavBar from '../components/nav/NavBar'

function Week(props) {
    const [ searchedQuery, setSearchedQuery ] = useState('')
    
    const { onFetchForecastAuto, onResetSearchList,loading, data, error } = props
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
            {data.data.slice(0,7).map(day => <Day key={day.datetime} weather={day.weather.icon} date={day.datetime.slice(-5,day.datetime.length)} max_temp={day.max_temp} low_temp={day.min_temp} pop={day.pop} />)}
        </DayList>
    </>

    return (
        <Container onClick={onResetSearchList}>
            <NavBar city={name} />
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
        onFetchForecastAuto: (name, key) => dispatch(actions.fetchForecastAuto(name, key)),
        onResetSearchList: () => dispatch(actions.resetSearchList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Week)

const DayList = styled.ul`
    padding: 0;
    margin: 0;
    width: 80%;
    max-width: 768px;
`