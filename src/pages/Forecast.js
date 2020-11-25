import { useEffect, useState } from "react"

import * as actions from '../store/actions'
import { connect } from "react-redux"

import { FORECAST_API_KEY as key } from '../assets/constants'

import Form from '../components/Form'
import Days from '../components/forecast/Days'
import Loader from '../components/Loader'
import Container from '../components/styled/Container'
import NavBar from '../components/nav/NavBar'
import Error from '../components/Error'

function Forecast(props) {
    const [searchedQuery, setSearchedQuery] = useState('')
    
    const { onFetchForecastAuto, onResetSearchList,loading, data, error } = props
    const name = props.match.params.id

    useEffect(() => {
        onFetchForecastAuto(name, key)
    }, [name, onFetchForecastAuto])

    let content;
    if(loading) content = <Loader />
    else if(!data && !loading) content = <h1>Select location</h1>
    else content = (
        <>
            <h1>{data.city_name}, {data.country_code}:</h1>
            <Days data={data.data} />
        </>
    )

    return (
        <Container onClick={onResetSearchList}>
            <NavBar city={name} />
            {error ? <Error err={error.msg} /> : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(Forecast)