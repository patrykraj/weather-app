import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function ErrorEl({ err }) {
  return (
        <ErrorElement>{err}</ErrorElement>
  );
}

export default ErrorEl;

const ErrorElement = styled.p`
    color: #ec544c;
    font-size: 1.5rem;
`;

ErrorEl.propTypes = {
  err: PropTypes.string,
};

ErrorEl.defaultProps = {
  err: null,
};
