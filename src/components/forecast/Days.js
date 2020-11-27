import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

function Day({ data }) {
  return (
        <DayList>
            {data.map((day) => (
                <DayElement key={day.datetime}>
                    <h4>{day.datetime.slice(-5, day.datetime.length)}</h4>
                    <img className='day-weather-icon' src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`} alt='weather-icon' />
                    <div className='day-temp'>
                        <h4>{Math.round(day.max_temp)}&deg;/</h4>
                        <h4>{Math.round(day.low_temp)}&deg;</h4>
                    </div>
                    <p>Pop: {day.pop}%</p>
                </DayElement>
            ))}
        </DayList>
  );
}

export default Day;

const DayList = styled.ul`
    padding: 0;
    margin: 0;
    width: 80%;
    max-width: 768px;
`;

const DayElement = styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: rgba(255,255,255,.2);
    margin: 10px 0;
    padding: 0 1rem;
  
    .day-temp {
        display: flex;
    }
    
    .day-weather-icon {
        width: 16%;
        min-width: 56px;
    }
`;

Day.propTypes = {
  data: propTypes.array,
};
