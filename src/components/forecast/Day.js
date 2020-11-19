import styled from 'styled-components'

function Day({ date, weather, max_temp, low_temp, pop }) {
    return (
        <DayContainer>
            <h4>{date}</h4>
            <img className='day-weather-icon' src={`https://www.weatherbit.io/static/img/icons/${weather}.png`} alt='weather-icon' />
            <div className='day-temp'>
                <h4>{Math.round(max_temp)}&deg;</h4><h4>/</h4><h4>{Math.round(low_temp)}&deg;</h4>
            </div>
            <p>Pop: {pop}%</p>
        </DayContainer>
    )
}

export default Day

const DayContainer = styled.li`
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
        max-height: 80px;
    }
`