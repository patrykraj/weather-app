export function ConvertUnit(val, unit = {from: 0, to: 1}) {
    if(unit.from === 0) val = val - 273.15
    else return val

    return (Math.round(val)).toFixed()
}

export function ConvertDate(date, minutes = false) {
    if(minutes) date = new Date(date * 1000).getMinutes()
    else date = new Date(date * 1000).getHours()

    return date
}