import React, { useState } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

import { convertDate } from '../../assets/utils';

function Hours({ hour, timezone }) {
  const [open, setOpen] = useState(false);
  const date = convertDate(hour.dt, timezone, false, true);

  return (
        <ListItem onClick={() => setOpen(!open)}>
            <ItemInfo key={hour.dt} open={open}>
                <span className="date">
                    <p className="date-hour">
                        {date.getUTCHours()}
                    </p>
                    <p className="date-day">
                        {date.getUTCDate()}.{date.getUTCMonth() + 1}
                    </p>
                </span>
                <WeatherIcon src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@4x.png`} alt="weather_icon"/>
                <span>{Number(hour.temp.toFixed()) === 0 ? 0 : hour.temp.toFixed()}&deg;C</span>
                <span>Clouds: {hour.clouds}%</span>
                <span>POP: {(hour.pop * 100).toFixed()}%</span>
                <span className="arrow-pointer">❯</span>
            </ItemInfo>
            <ItemAdditional className={open ? 'open' : null}>
                <span>Humidity: {hour.humidity}%</span>
                <span>Wind: {hour.wind_speed} m/s</span>
                <span>UV: {hour.uvi}</span>
            </ItemAdditional>
        </ListItem>
  );
}

export default Hours;

const ListItem = styled.li`
    border-bottom: 1px solid rgba(0, 0, 0, .4);
    cursor: pointer;

    &:last-child {
        border-bottom: none;
    }
`;

const ItemInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: rgba(255, 255, 255, .2);

    .date {
        text-align: right;

        p {
            margin: 0;
        }

        .date-day {
            font-size: 14px;
            color: #eee;
        }
    }

    .arrow-pointer {
        transform: ${(props) => (props.open ? 'rotate(-90deg)' : 'rotate(90deg)')};
    }
`;

const WeatherIcon = styled.img`
    width: 11%;
    min-width: 66px;
`;

const ItemAdditional = styled.div`
    display: none;
    background: rgba(255, 255, 255, .2);
    padding: 0 5% 10px;

    &.open {
        display: flex;
        justify-content: space-between;
    }
`;

Hours.propTypes = {
  hour: propTypes.object,
  timezone: propTypes.number,
};
