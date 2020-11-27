import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

function LinkButton({ to, children }) {
  return (
        <LinkContainer>
            <Link to={to}>{children}</Link>
        </LinkContainer>
  );
}

export default LinkButton;

const LinkContainer = styled.div`
    display: block;

    a {
        color: white;
        background-color: rgba(255,255,255, .3);
        padding: 5px 15px;
        border-radius: 5px;
    }
`;

LinkButton.propTypes = {
  to: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
};
