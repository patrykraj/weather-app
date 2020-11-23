import { useEffect, useState } from 'react';

import { WEATHER_API_KEY as key } from '../assets/constants'
import { connect } from "react-redux";
import * as actions from '../store/actions'

import Form from '../components/Form'
import Loader from '../components/Loader'
import CurrentWeather from '../components/weather/CurrentWeather'
import Container from '../components/styled/Container'

function Home({ onFetchWeatherStart, coords, data, onFetchWeatherByCoords, loading, error, onFetchWeatherFailure, onResetSearchList }) {
  const [searchedQuery, setSearchedQuery] = useState('')

  useEffect(() => {
    if ("geolocation" in navigator && !coords && !data) {
      onFetchWeatherStart()

      navigator.geolocation.getCurrentPosition(function(position) {
        onFetchWeatherByCoords({
          coords: {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          },
          key
        })
      }, err => {
        onFetchWeatherFailure(err.message)
      })
    } else {
      console.log("Not Available");
    }
  }, [onFetchWeatherStart, onFetchWeatherFailure, coords, data, onFetchWeatherByCoords])

  let content;
  if(loading) content = <Loader />
  else if(!loading && !data) content = <h1>Select location</h1>
  else content = <CurrentWeather data={data} />

  return (
    <div className="App">
      <Container night={data && data.weather[0].icon.includes('n')} onClick={onResetSearchList}>
        {error ? error.msg : null}
        <Form searchedQuery={searchedQuery} setSearchedQuery={setSearchedQuery} />
        <img className='weather-icon' src={data ? `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png` : `http://openweathermap.org/img/wn/02d@4x.png`} alt="logo" />
        {content}
      </Container>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    coords: state.coords,
    data: state.weatherData,
    loading: state.loading,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchWeatherStart: () => dispatch(actions.fetchWeatherStart()),
    onFetchWeatherByCoords: (payload) => dispatch(actions.fetchWeatherByCoords(payload)),
    onFetchWeatherFailure: (payload) => dispatch(actions.fetchWeatherFailure(payload)),
    onResetSearchList: () => dispatch(actions.resetSearchList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);