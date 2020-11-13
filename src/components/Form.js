import axios from "axios";

import { API_KEY as key } from '../assets/constants'

function Form({ setData, searchedQuery, setSearchedQuery, setError, setLoading }) {

    const handleSetQuery = (e) => {
        if (!/^[a-zA-Z\s]*$/g.test(e.target.value)) return;
        setSearchedQuery(e.target.value);
    }

    const handleSearchQuery = (e) => {
        e.preventDefault();

        if(searchedQuery.trim().length > 2) {
            setLoading(true)

            axios
                .get(`https://api.openweathermap.org/data/2.5/weather?q=${searchedQuery}&appid=${key}`)
                .then(city => {
                    setSearchedQuery('')
                    setData(city.data)
                    setError(null)
                    setLoading(false)
                })
                .catch(err => {
                    setError({ 
                        msg: err.response ? err.response.data.message : err.message, 
                        query: searchedQuery
                    })
                    setLoading(false)
                })
        }
    }
 
    return (
        <form onSubmit={handleSearchQuery}>  
            <input type='text' value={searchedQuery} placeholder='City' onInput={handleSetQuery} pattern="[A-Za-z\s]+" title="Please use only letters"/>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default Form