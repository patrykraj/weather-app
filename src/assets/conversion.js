export function ConvertUnit(val, unit = {from: 0, to: 1}) {
    // if(unit.from === 0) val = val - 273.15
    // else return val

    return (Math.round(val)).toFixed()
}

export function ConvertDate(date, timezone, minutes = false) {
    let newDate = new Date((date + timezone) * 1000)

    if(minutes) newDate = newDate.getUTCMinutes()
    else newDate = newDate.getUTCHours()

    return newDate < 10 ? `0${newDate}` : newDate;
}