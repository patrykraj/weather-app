import logo from '../logo.svg';
import { useEffect, useState } from 'react';

import { WEATHER_API_KEY as key } from '../assets/constants'
import { connect } from "react-redux";
import * as actions from '../store/actions'

import Form from '../components/Form'
import Loader from '../components/Loader'
import CurrentWeather from '../components/weather/CurrentWeather'

function Home({ onFetchWeatherStart, coords, onSetCoords, data, onSetData, onFetchWeatherByCoords, loading, onSetLoading, error, onSetError }) {
  const [searchedQuery, setSearchedQuery] = useState('')

  useEffect(() => {
    if ("geolocation" in navigator && !coords) {
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
        onSetError({
          msg: err.message
        })
      })
    } else {
      console.log("Not Available");
    }
  }, [onSetCoords, onFetchWeatherStart, onSetError, coords, onFetchWeatherByCoords])

  let content;
  if(loading) content = <Loader />
  else if(!loading && !data) content = <h1>Select location</h1>
  else content = <CurrentWeather data={data} />

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {error ? error.msg : null}
        <Form searchedQuery={searchedQuery} setSearchedQuery={setSearchedQuery} setError={onSetError} setLoading={onSetLoading} setData={onSetData} />
        {content}
      </header>
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
    onSetLoading: (payload) => dispatch(actions.setLoading(payload)),
    onSetData: (payload) => dispatch(actions.setData(payload)),
    onFetchWeatherStart: () => dispatch(actions.fetchWeatherStart()),
    onSetCoords: (payload) => dispatch(actions.setCoords(payload)),
    onFetchWeatherByCoords: (payload) => dispatch(actions.fetchWeatherByCoords(payload)),
    onSetError: (payload) => dispatch(actions.setError(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);