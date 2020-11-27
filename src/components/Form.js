import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import propTypes from 'prop-types';

import { WEATHER_API_KEY as wkey, FORECAST_API_KEY as fkey } from '../assets/constants';
import Glass from '../assets/img/loupe.ico';
import SearchList from './SearchList';

import * as actions from '../store/actions';

function Form({
  searchedQuery,
  setSearchedQuery,
  onSetError,
  forecast,
  hourly,
  onFetchWeatherByName,
  onFetchHourlyByName,
  list,
  loading,
  onFetchSearchList,
}) {
  const handleSetQuery = (e) => {
    if (!/^[a-zA-Z\s]*$/g.test(e.target.value)) return;
    setSearchedQuery(e.target.value);

    onFetchSearchList(e.target.value);
  };

  const handleSearchQuery = (e) => {
    e.preventDefault();
    const url = forecast ? `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchedQuery}&key=${fkey}` : `https://api.openweathermap.org/data/2.5/weather?q=${searchedQuery}&appid=${wkey}&units=metric`;

    if (searchedQuery.trim().length > 2) {
      if (hourly) {
        onFetchHourlyByName(searchedQuery, fkey, wkey);
      } else {
        onFetchWeatherByName(forecast, url);
      }

      setSearchedQuery('');
    } else {
      onSetError({
        msg: 'Min. 3 characters',
      });
    }
  };

  const handleSearchQueryFromList = (query) => {
    const url = forecast ? `https://api.weatherbit.io/v2.0/forecast/daily?city=${query}&key=${fkey}` : `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${wkey}&units=metric`;

    if (searchedQuery.trim().length > 2) {
      if (hourly) {
        onFetchHourlyByName(query, fkey, wkey);
      } else {
        onFetchWeatherByName(forecast, url);
      }

      setSearchedQuery('');
    }
  };

  return (
        <FormContainer onSubmit={handleSearchQuery}>
            <Input type='text' value={searchedQuery} placeholder='City' onInput={handleSetQuery} pattern="[A-Za-z\s]+" title="Please use only letters"/>
            <Submit type='submit'>
                <img src={Glass} alt='glass' />
            </Submit>
            {list
              ? <SearchList items={list}
              handleSearchQueryFromList={handleSearchQueryFromList}
              loading={loading} />
              : null
            }
        </FormContainer>
  );
}

const mapStateToProps = (state) => ({
  list: state.searchListData,
  loading: state.searchListLoading,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchWeatherByName: (forecast, url) => dispatch(actions.fetchWeatherByName(forecast, url)),
  onFetchHourlyByName: (name, fKey, wKey) => dispatch(actions.fetchHourlyByName(name, fKey, wKey)),
  onSetError: (payload) => dispatch(actions.setError(payload)),
  onFetchSearchList: (query) => dispatch(actions.fetchSearchList(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

const FormContainer = styled.form`
    position: relative;
    max-width: 70%;
`;

const Input = styled.input`
    max-width: 100%;
    background: none;
    font-size: 1.5rem;
    border: none;
    border-bottom: 2px solid #eee;
    padding: 5px 2px;
    margin: 2px 5px;
    color: white;
    transition: all .3s;

    &:focus {
        outline: none;
        border-bottom: 2px solid #eee;
    }

    &::placeholder {
        color: #eee;
    }

    @media(max-width: 300px) {
        font-size: 20px;
    }
`;

const Submit = styled.button`
    position: absolute;
    right: 10px;
    top: 9px;
    font-size: 1.4rem;
    color: #eee;
    background: transparent;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all .3s;
    padding: 0;
    max-width: 20px;

    img {
        max-width: 100%;
    }

    @media(max-width: 300px) {
        max-width: 15px;
        right: 0;
        top: 5px;
    }
`;

Form.propTypes = {
  searchedQuery: propTypes.string,
  forecast: propTypes.bool,
  loading: propTypes.bool,
  hourly: propTypes.bool,
  onFetchWeatherByName: propTypes.func,
  onFetchHourlyByName: propTypes.func,
  onFetchSearchList: propTypes.func,
  onSetError: propTypes.func,
  setSearchedQuery: propTypes.func,
  list: propTypes.array,
};
