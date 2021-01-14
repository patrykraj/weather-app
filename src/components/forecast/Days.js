import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

import Day from './Day';

function Days({ data }) {
  return (
        <DayList>
            {data.map((day) => (
                <Day key={day.datetime} day={day} />
            ))}
        </DayList>
  );
}

export default Days;

const DayList = styled.ul`
    padding: 0;
    margin: 0;
    width: 80%;
    max-width: 768px;
    list-style: none;
`;

Days.propTypes = {
  data: propTypes.array,
};
