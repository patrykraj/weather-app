import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

import * as actions from '../store/actions'
import { connect } from "react-redux";

import { FORECAST_API_KEY as key } from '../assets/constants'

import Form from '../components/Form'
import Day from '../components/forecast/Day'
import Loader from '../components/Loader'

function Forecast(props) {
    const [searchedQuery, setSearchedQuery] = useState('')
    
    const { onFetchForecastAuto, loading, data, error } = props
    const name = props.match.params.id

    useEffect(() => {
        onFetchForecastAuto(name, key)
    }, [name, onFetchForecastAuto])

    let content;
    if(loading) content = <Loader />
    else if(!data && !loading) content = <h1>Forecast</h1>
    else content = <>
        <h1>{data.city_name}, {data.country_code}:</h1>
        <ul className='day-list'>
            {data.data.map(day => <Day key={day.datetime} weather={day.weather.icon} date={day.datetime.slice(-5,day.datetime.length)} max_temp={day.max_temp} low_temp={day.min_temp} pop={day.pop} />)}
        </ul>
    </>

    return (
        <div className='Forecast'>
            <h1 className='title'>
                <Link to='/'>Weather Forecast</Link>
            </h1>
            <Form forecast searchedQuery={searchedQuery} setSearchedQuery={setSearchedQuery} />
            {content}
            {error ? <p>{error.msg}</p> : null}
        </div>
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