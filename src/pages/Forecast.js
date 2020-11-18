import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from 'react-router-dom'

import { FORECAST_API_KEY as key } from '../assets/constants'

import Form from '../components/Form'
import Day from '../components/forecast/Day'
import Loader from '../components/Loader'

function Forecast(props) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [searchedQuery, setSearchedQuery] = useState('')
    const [error, setError] = useState(null)
    
    const name = props.match.params.id

    useEffect(() => {
        setLoading(true)
        setError(null)
        
        axios
            .get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${name}&key=${key}`)
            .then(res => {
                setLoading(false)
                setData(res.data)
            })
            .catch(err => {
                setError({
                    msg: err.message
                })
                setLoading(false)
            })
    }, [name])

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
            <Form forecast setData={setData} searchedQuery={searchedQuery} setSearchedQuery={setSearchedQuery} setError={setError} setLoading={setLoading} />
            {content}
            {error ? <p>{error.msg}</p> : null}
        </div>
    )
}

export default Forecast