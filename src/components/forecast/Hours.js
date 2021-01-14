import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

import Hour from './Hour';

function Hours({ data }) {
  return (
        <List>
            {data && data.hourly.map((hour) => (
            <Hour key={hour.dt} hour={hour} timezone={data.timezone_offset} />
            ))}
        </List>
  );
}

export default Hours;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    width: 80%;
    max-width: 1024px;
    border-radius: 15px;
    overflow: hidden;

    @media(max-width: 600px) {
        width: 95%;
    }
`;

Hours.propTypes = {
  data: propTypes.object,
};
