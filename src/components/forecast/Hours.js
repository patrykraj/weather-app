import styled from 'styled-components'

function Hour({ data }) {
    console.log(data, 'DATA HOUR')
    return (
        <List>
            {data && data.hourly.map(hour => 
                <ListItem key={hour.dt}>
                    <span className='date'>
                        <p className='date-hour'>{new Date(hour.dt * 1000).getHours()}</p>
                        <p className='date-day'>{new Date(hour.dt * 1000).getDate()}.{new Date(hour.dt * 1000).getMonth()}</p>
                    </span> 
                    <WeatherIcon src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@4x.png`} alt='weather_icon'/> 
                    <span>{hour.temp.toFixed()}&deg;C</span> 
                    <span>Clouds: {hour.clouds}%</span> 
                    <span>POP: {hour.pop}%</span>
                </ListItem>)}
        </List>
    )
}

export default Hour

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    width: 80%;
    max-width: 1024px;
    border-radius: 15px;
    overflow: hidden;
`

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
`
const WeatherIcon = styled.img`
    width: 11%;
`