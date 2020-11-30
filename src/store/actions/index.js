import axios from 'axios';
import * as actions from '../constants';

export const fetchWeatherStart = () => ({
  type: actions.FETCH_WEATHER_START,
});

export const fetchWeatherSuccess = (data) => ({
  type: actions.FETCH_WEATHER_SUCCESS,
  payload: data,
});

export const fetchWeatherFailure = (err) => ({
  type: actions.FETCH_WEATHER_FAILURE,
  payload: err,
});

export const fetchCoordsSuccess = (data, coords) => ({
  type: actions.FETCH_COORDS_SUCCESS,
  payload: {
    data,
    coords,
  },
});

export const setError = (err) => ({
  type: actions.SET_ERROR,
  payload: err,
});

export const fetchForecastSuccess = (data) => ({
  type: actions.FETCH_FORECAST_SUCCESS,
  payload: data,
});

export const fetchForecastFailure = (err) => ({
  type: actions.FETCH_WEATHER_FAILURE,
  payload: err,
});

export const fetchWeatherByCoords = ({ coords, key }) => async (dispatch) => {
  axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${key}&units=metric`)
    .then((res) => {
      dispatch(fetchCoordsSuccess(res.data, coords));
    })
    .catch((err) => {
      dispatch(fetchWeatherFailure(err.response ? err.response.data.message : err.message));
    });
};

export const fetchForecast = ({ name, key }) => async (dispatch) => {
  dispatch(fetchWeatherStart());

  axios
    .get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${name}&key=${key}`)
    .then((res) => {
      dispatch(fetchForecastSuccess(res.data));
    })
    .catch((err) => {
      dispatch(fetchForecastFailure(err.response ? err.response.data.message : err.message));
    });
};

export const fetchWeatherByName = (forecast, url) => async (dispatch) => {
  dispatch(fetchWeatherStart());

  axios
    .get(url)
    .then((city) => {
      if (city.statusText !== 'No Content') {
        if (forecast) {
          dispatch(fetchForecastSuccess(city.data));

          const newurl = `${window.location.protocol}//${window.location.host}/forecast/${city.data.city_name}`;
          window.history.pushState({ path: newurl }, '', newurl);
        } else {
          dispatch(fetchWeatherSuccess(city.data));
        }
      } else {
        dispatch(fetchWeatherFailure('City not found'));
      }
    })
    .catch((err) => {
      dispatch(fetchWeatherFailure(err.response ? err.response.data.message : err.message));
    });
};

export const fetchForecastAuto = (name, key) => async (dispatch) => {
  dispatch(fetchWeatherStart());

  axios
    .get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${name}&key=${key}`)
    .then((res) => {
      dispatch(fetchForecastSuccess(res.data));
    })
    .catch((err) => {
      dispatch(fetchForecastFailure({
        msg: err.response ? err.response.data.message : err.message,
      }));
    });
};

export const fetchSearchListStart = () => ({
  type: actions.FETCH_SEARCH_LIST_START,
});

export const fetchSearchListSuccess = (data) => ({
  type: actions.FETCH_SEARCH_LIST_SUCCESS,
  payload: data,
});

export const fetchSearchListFailure = () => ({
  type: actions.FETCH_SEARCH_LIST_FAILURE,
});

export const resetSearchList = () => ({
  type: actions.FETCH_SEARCH_LIST_FAILURE,
});

export const fetchSearchList = (query) => async (dispatch) => {
  if (query.trim().length > 2) {
    dispatch(fetchSearchListStart());

    axios
      .get(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=worldcitiespop&q=${query}&rows=5&sort=population`)
      .then((res) => {
        const list = [];

        for (let i = 0; i < res.data.records.length; i += 1) {
          if (res.data.records[i].fields.population) list.push(res.data.records[i]);
        }

        dispatch(fetchSearchListSuccess(list));
      })
      .catch(() => {
        dispatch(fetchSearchListFailure());
      });
  } else dispatch(fetchSearchListFailure());
};

export const fetchHourlyByNameSuccess = (data) => ({
  type: actions.FETCH_HOURLY_BY_NAME_SUCCESS,
  payload: data,
});

export const fetchHourlyByNameFailure = (err) => ({
  type: actions.FETCH_HOURLY_BY_NAME_FAILURE,
  payload: err,
});

export const fetchHourlyByName = (name, fKey, wKey) => async (dispatch) => {
  dispatch(fetchWeatherStart());

  axios
    .get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${name}&key=${fKey}`)
    .then((res) => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${res.data.lat}&lon=${res.data.lon}&exclude=current,minutely,daily&appid=${wKey}&units=metric`)
        .then((data) => {
          let result = data.data;

          result = {
            ...result,
            city_name: res.data.city_name,
            country_code: res.data.country_code,
          };

          dispatch(fetchHourlyByNameSuccess(result));
        })
        .catch(() => {
          dispatch(fetchHourlyByNameFailure('City not found'));
        });
    })
    .catch((err) => {
      dispatch(fetchHourlyByNameFailure(err.response ? err.response.data.message : err.message));
    });
};

export const setActiveSearchListElement = (val) => ({
  type: actions.SET_ACTIVE_SEARCH_LIST_ELEMENT,
  payload: val,
});
