import { useEffect, useState } from 'react'

import { WEATHER_API_KEY as w_key } from '../assets/constants'
import { FORECAST_API_KEY as f_key } from '../assets/constants'

import axios from 'axios'
import { connect } from "react-redux";
import * as actions from '../store/actions'

import NavBar from '../components/nav/NavBar'
import Container from '../components/styled/Container'
import Hours from '../components/forecast/Hours'

function Hourly(props) {
    const [hourData, setHourData] = useState(null)
    const {data} = props
    const name = props.match.params.id

    useEffect(() => {
        axios
            .get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${name}&key=${f_key}`)
            .then(res => {

                axios
                    .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${res.data.lat}&lon=${res.data.lon}&exclude=current,minutely,daily&appid=${w_key}&units=metric`)
                    .then(data => {
                        setHourData(data)
                    })
            })
            .catch(err => {
                console.log(err, 'ERROR')
            })
    }, [name])

    return (
        <Container>
            <NavBar city={data && data.name} />
            <h1>HOURLY</h1>
            <h2>forecast for {name}</h2>
            <Hours data={hourData} />
        </Container>
    )
}

const mapStateToProps = state => {
    return {
      data: state.weatherData,
    }
  }
  

const mapDispatchToProps = dispatch => {
    return {
        onFetchWeatherByName: (forecast, url) => dispatch(actions.fetchWeatherByName(forecast, url)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hourly)