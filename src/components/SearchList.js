import styled from 'styled-components'

function SearchList({ items, handleSearchQueryFromList, loading }) {
    return (
        <List>
            {loading ? <ListItem className='disabled'>Searching...</ListItem> : items.map(city => city.fields.population ? <ListItem key={Math.random()} onClick={() => handleSearchQueryFromList(`${city.fields.accentcity}, ${city.fields.country}`)}>{city.fields.accentcity}, {city.fields.country.toUpperCase()}</ListItem> : null)}
        </List>
    )
}

export default SearchList

const List = styled.ul`
    position: absolute;
    width: 100%;
    z-index: 1;
    font-size: 1rem;
    list-style: none;
    margin: 0;
    padding: 0;
    background: #eee;
    color: #111;
    border-radius: 10px;
    text-align: left;
    overflow: hidden;
`

const ListItem = styled.li`
    border-bottom: 1px solid #111;
    padding: 10px;
    cursor: pointer;
    overflow: hidden;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background: #243b55;
        color: #eee;
    }

    &.disabled {
        cursor: default;
    }

    &.disabled:hover {
        background: #eee;
        color: #111;
    }
`