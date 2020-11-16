import { useEffect, useState } from "react"
import axios from 'axios'

import { FORECAST_API_KEY as key } from '../assets/constants'
import { ConvertUnit } from '../assets/conversion'

import Form from '../components/Form'

function Forecast(props) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [searchedQuery, setSearchedQuery] = useState('')
    const [error, setError] = useState(null)

    useEffect(() => {   
        const id = props.match.params.id
        setLoading(true)
        
        axios
            .get(`https://api.weatherbit.io/v2.0/forecast/daily?&city_id=${id}&key=${key}`)
            .then(res => {
                setLoading(false)
                setData(res.data)
            })
    }, [props])

    let content;
    if(loading) content = <h1>Loading</h1>
    else if(!data && !loading) content = <h1>Forecast</h1>
    else content = <>
        <h1>Weather forecast for {data.city_name}, {data.country_code}:</h1>
        {data.data.map(day => <p key={day.datetime}>{day.datetime.slice(-5,day.datetime.length)} - max: {ConvertUnit(day.max_temp)}&deg;C min: {ConvertUnit(day.min_temp)}&deg;C</p>)}
    </>

    return (
        <>
            <Form forecast setData={setData} searchedQuery={searchedQuery} setSearchedQuery={setSearchedQuery} setError={setError} setLoading={setLoading} />
            <h1>FORECAST</h1>
            {content}
        </>
    )
}

export default Forecast