import React, { useEffect } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

function SearchList({
  items,
  activeSearchListElement,
  onSetActiveSearchListElement,
  handleSearchQueryFromList,
  loading,
}) {
  const form = document.querySelector('div #form');

  const handleKeyDown = (e) => {
    e.stopImmediatePropagation();

    if (e.keyCode === 38 && activeSearchListElement > 0) {
      e.preventDefault();
      onSetActiveSearchListElement(-1);
    } else if (e.keyCode === 40 && activeSearchListElement < items.length - 1) {
      onSetActiveSearchListElement(1);
    }
  };

  useEffect(() => {
    form.addEventListener('keydown', handleKeyDown);

    return () => {
      form.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeSearchListElement, items]);

  return (
        <List>
            {loading ? <ListItem className='disabled'>Searching...</ListItem> : items.map((city, id) => (
                <ListItem className={id === activeSearchListElement ? 'active' : null}
                key={city.recordid}
                onClick={() => handleSearchQueryFromList(`${city.fields.accentcity}, ${city.fields.country}`)}>
                    {city.fields.accentcity}, {city.fields.country.toUpperCase()}
                </ListItem>))}
        </List>
  );
}

export default SearchList;

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
`;

const ListItem = styled.li`
    border-bottom: 1px solid #111;
    padding: 10px;
    cursor: pointer;
    overflow: hidden;

    &.active {
        background: #243b55;
        color: #eee;
    }

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
`;

SearchList.propTypes = {
  items: propTypes.array,
  loading: propTypes.bool,
  activeSearchListElement: propTypes.number,
  onSetActiveSearchListElement: propTypes.func,
  handleSearchQueryFromList: propTypes.func,
};
