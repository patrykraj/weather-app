import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

import { convertDate } from '../../assets/utils';

function Hours({ data }) {
  return (
        <List>
            {data && data.hourly.map((hour) => {
              const date = convertDate(hour.dt, data.timezone_offset, false, true);

              return (
                <ListItem key={hour.dt}>
                    <span className='date'>
                        <p className='date-hour'>
                            {date.getUTCHours()}
                        </p>
                        <p className='date-day'>
                            {date.getUTCDate()}.{date.getUTCMonth() + 1}
                        </p>
                    </span>
                    <WeatherIcon src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@4x.png`} alt='weather_icon'/>
                    <span>{Number(hour.temp.toFixed()) === 0 ? 0 : hour.temp.toFixed()}&deg;C</span>
                    <span>Clouds: {hour.clouds}%</span>
                    <span>POP: {(hour.pop * 100).toFixed()}%</span>
                </ListItem>
              );
            })}
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

const ListItem = styled.li`
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
            font-size: .85rem;
            color: #eee;
        }
    }
`;
const WeatherIcon = styled.img`
    width: 11%;
    min-width: 66px;
`;

Hours.propTypes = {
  data: propTypes.object,
};
