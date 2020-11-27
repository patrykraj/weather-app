import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

import { connect } from 'react-redux';
import { WEATHER_API_KEY as key } from '../assets/constants';
import * as actions from '../store/actions';

import Form from '../components/Form';
import Loader from '../components/Loader';
import CurrentWeather from '../components/current/CurrentWeather';
import Container from '../components/styled/Container';
import NavBar from '../components/nav/NavBar';
import Error from '../components/Error';

function Home({
  onFetchWeatherStart,
  coords,
  data,
  onFetchWeatherByCoords,
  loading,
  error,
  onFetchWeatherFailure,
  onResetSearchList,
}) {
  const [searchedQuery, setSearchedQuery] = useState('');

  useEffect(() => {
    if ('geolocation' in navigator && !coords && !data) {
      onFetchWeatherStart();

      navigator.geolocation.getCurrentPosition((position) => {
        onFetchWeatherByCoords({
          coords: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          key,
        });
      }, (err) => {
        onFetchWeatherFailure(err.message);
      });
    }
  }, [onFetchWeatherStart, onFetchWeatherFailure, coords, data, onFetchWeatherByCoords]);

  let content;
  if (loading) content = <Loader />;
  else if (!loading && !data) content = <h1>Select location</h1>;
  else content = <CurrentWeather data={data} />;

  return (
    <div className="App">
      <Container night={data && data.weather[0].icon.includes('n')} onClick={onResetSearchList}>
        <NavBar city={data && data.name} />
        {error ? <Error err={error.msg} /> : null}
        <Form searchedQuery={searchedQuery} setSearchedQuery={setSearchedQuery} />
        <WeatherIcon src={data ? `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png` : 'http://openweathermap.org/img/wn/02d@4x.png'} alt="weather-icon" />
        {content}
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => ({
  coords: state.coords,
  data: state.weatherData,
  loading: state.loading,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchWeatherStart: () => dispatch(actions.fetchWeatherStart()),
  onFetchWeatherByCoords: (payload) => dispatch(actions.fetchWeatherByCoords(payload)),
  onFetchWeatherFailure: (payload) => dispatch(actions.fetchWeatherFailure(payload)),
  onResetSearchList: () => dispatch(actions.resetSearchList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const WeatherIcon = styled.img`
  margin: 10px 0;
  transform: scale(1) translate(-15px, -15px);
  animation: move 30s infinite linear;
  max-width: 70%;

  @keyframes move {
    0% {
      transform: scale(1) translate(0, -15px);
    }

    25% {
      transform: scale(1.25) translate(15px, 0);
    }

    50% {
      transform: scale(1.5) translate(0, 15px);
    }
    
    75% {
      transform: scale(1.25) translate(-15px, 0);
    }

    100% {
      transform: scale(1) translate(0, -15px);
    }
  }
`;

Home.propTypes = {
  loading: propTypes.bool,
  coords: propTypes.object,
  data: propTypes.object,
  error: propTypes.object,
  onFetchWeatherStart: propTypes.func,
  onFetchWeatherByCoords: propTypes.func,
  onFetchWeatherFailure: propTypes.func,
  onResetSearchList: propTypes.func,
};
