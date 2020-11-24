import { useEffect } from 'react'

import { WEATHER_API_KEY as w_key } from '../assets/constants'
import { FORECAST_API_KEY as f_key } from '../assets/constants'

import { connect } from "react-redux";
import * as actions from '../store/actions'

import NavBar from '../components/nav/NavBar'
import Container from '../components/styled/Container'
import Hours from '../components/forecast/Hours'
import Loader from '../components/Loader'

function Hourly(props) {
    const {loading, error, data, onFetchHourlyByName} = props
    const name = props.match.params.id

    useEffect(() => {
        onFetchHourlyByName(name, f_key, w_key)
    }, [onFetchHourlyByName, name])

    let content;
    if(loading) content = <Loader />
    else if (!loading && !data) content = <h1>Select location</h1>
    else content = <>
                    <p>Hourly forecast for</p>
                    <h2>{data.city_name}, {data.country_code}</h2>
                    <Hours data={data} />
                </>

    return (
        <Container>
            <NavBar city={name} />
            {error ? <p>{error.msg}</p> : null}
            {content}
        </Container>
    )
}

const mapStateToProps = state => {
    return {
      data: state.hourlyData,
      loading: state.loading,
      error: state.error
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        onFetchHourlyByName: (name, f_key, w_key) => dispatch(actions.fetchHourlyByName(name, f_key, w_key))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hourly)