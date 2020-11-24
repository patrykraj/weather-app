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
    const {data, loading, error, hourlyData, onFetchHourlyByName} = props
    const name = props.match.params.id

    useEffect(() => {
        onFetchHourlyByName(name, f_key, w_key)
    }, [onFetchHourlyByName, name])

    let content;
    if(loading) content = <Loader />
    else if (error) content = <p>{error}</p>
    else content = <>
                    <p>Hourly forecast for</p>
                    <h2>{name}</h2>
                    <Hours data={hourlyData} />
                </>

    return (
        <Container>
            <NavBar city={data && data.name} />
            {content}
        </Container>
    )
}

const mapStateToProps = state => {
    return {
      data: state.weatherData,
      hourlyData: state.hourlyData,
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