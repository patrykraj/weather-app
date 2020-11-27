import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import { connect } from 'react-redux';
import * as actions from '../store/actions';

import { FORECAST_API_KEY as key } from '../assets/constants';

import Form from '../components/Form';
import Days from '../components/forecast/Days';
import Loader from '../components/Loader';
import Container from '../components/styled/Container';
import NavBar from '../components/nav/NavBar';
import Error from '../components/Error';

function Forecast(props) {
  const [searchedQuery, setSearchedQuery] = useState('');

  const {
    onFetchForecastAuto, onResetSearchList, loading, data, error,
  } = props;
  const name = props.match.params.id;

  useEffect(() => {
    onFetchForecastAuto(name, key);
  }, [name, onFetchForecastAuto]);

  let content;
  if (loading) content = <Loader />;
  else if (!data && !loading) content = <h1>Select location</h1>;
  else {
    content = (
        <>
            <h1>{data.city_name}, {data.country_code}:</h1>
            <Days data={data.data} />
        </>
    );
  }

  return (
        <Container onClick={onResetSearchList}>
            <NavBar city={name} />
            {error ? <Error err={error.msg} /> : null}
            <Form forecast searchedQuery={searchedQuery} setSearchedQuery={setSearchedQuery} />
            {content}
        </Container>
  );
}

const mapStateToProps = (state) => ({
  data: state.forecastData,
  loading: state.loading,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchForecastAuto: (name, fKey) => dispatch(actions.fetchForecastAuto(name, fKey)),
  onResetSearchList: () => dispatch(actions.resetSearchList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Forecast);

Forecast.propTypes = {
  onFetchForecastAuto: propTypes.func,
  onResetSearchList: propTypes.func,
  loading: propTypes.bool,
  data: propTypes.oneOfType([
    propTypes.object,
    propTypes.string,
  ]),
  error: propTypes.object,
  match: propTypes.object,
};
