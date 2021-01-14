import React, { useState } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

function Day({ day }) {
  const [open, setOpen] = useState(false);

  return (
            <li key={day.datetime} onClick={() => setOpen(!open)}>
                <DayElement open={open}>
                    <h4>{day.datetime.slice(-5, day.datetime.length)}</h4>
                    <img className="day-weather-icon" src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`} alt='weather-icon' />
                    <div className="day-temp">
                        <h4>{Math.round(day.max_temp)}&deg;/</h4>
                        <h4>{Math.round(day.low_temp)}&deg;</h4>
                    </div>
                    <p>Pop: {day.pop}%</p>
                    <span className="arrow-pointer">❯</span>
                </DayElement>
                <InfoElement className={open ? 'open' : null}>
                    <div className="day-info">
                        <span>
                            {day.weather.description}
                        </span>
                        <span>
                            humid: {day.rh}
                        </span>
                        <span>
                            {day.wind_spd.toFixed(1)} m/s {day.wind_cdir}
                        </span>
                    </div>
                </InfoElement>
            </li>
  );
}

export default Day;

const DayElement = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: rgba(255,255,255,.2);
    margin: 10px 0;
    padding: 0 1rem;
    font-size: calc(8px + 2vmin);
    cursor: pointer;
  
    .day-temp {
        display: flex;
    }
    
    .day-weather-icon {
        width: 16%;
        min-width: 56px;
    }

    .arrow-pointer {
        transform: ${(props) => (props.open ? 'rotate(-90deg)' : 'rotate(90deg)')};
    }
`;

const InfoElement = styled.div`
    display: none;
    background: rgba(255,255,255,.2);
    margin-top: -10px;
    padding: 5px;
    font-size: calc(8px + 2vmin);

    &.open {
        display: block;
    }

    .day-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid rgba(0,0,0,.3);
        border-radius: 10px;
        padding: 5px 2%;

        span {
            margin: 0;
            flex: 1;
        }
    }
`;

Day.propTypes = {
  day: propTypes.object,
};
