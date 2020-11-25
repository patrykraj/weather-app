export function ConvertUnit(val, unit = {from: 0, to: 1}) {
    return (Math.round(val)).toFixed()
}

export function ConvertDate(date, timezone, minutes = false, number = false) {
    let newDate = new Date((date + timezone) * 1000)

    if(minutes) newDate = newDate.getUTCMinutes()
    else if(number) return newDate
    else newDate = newDate.getUTCHours()

    return newDate < 10 ? `0${newDate}` : newDate;
}