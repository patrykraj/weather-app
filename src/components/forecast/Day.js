function Day({ date, weather, max_temp, low_temp, pop }) {
    return (
        <li className='day'>
            <h4>{date}</h4>
            <img className='day-weather-icon' src={`https://www.weatherbit.io/static/img/icons/${weather}.png`} alt='weather-icon' />
            <div className='day-temp'>
                <h4>{Math.round(max_temp)}&deg;</h4><h4>/</h4><h4>{Math.round(low_temp)}&deg;</h4>
            </div>
            <p>Pop: {pop}%</p>
        </li>
    )
}

export default Day