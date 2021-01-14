import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function ErrorNotification({ err }) {
  return (
        <ErrorElement>{err}</ErrorElement>
  );
}

export default ErrorNotification;

const ErrorElement = styled.p`
    color: #ec544c;
    font-size: 24px;
`;

ErrorNotification.propTypes = {
  err: PropTypes.string,
};

ErrorNotification.defaultProps = {
  err: null,
};
