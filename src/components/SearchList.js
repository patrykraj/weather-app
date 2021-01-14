import React, { useEffect } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

function SearchList({
  items,
  activeSearchListElement,
  onSetActiveSearchListElement,
  onSetActiveSearchListElementByMouseover,
  setSelectedCity,
  handleSearchQueryFromList,
  loading,
  formComponent,
}) {
  const handleKeyDown = (e) => {
    e.stopImmediatePropagation();

    const enterKeyUp = 38;
    const enterKeyDown = 40;

    if (e.keyCode === enterKeyUp && activeSearchListElement > 0) {
      e.preventDefault();
      onSetActiveSearchListElement(-1);
    } else if (e.keyCode === enterKeyDown && activeSearchListElement < items.length - 1) {
      onSetActiveSearchListElement(1);
    }
  };

  const handleMouseOverListElement = (hoveredCity) => {
    items.map((city, id) => (hoveredCity.recordid === city.recordid
      ? onSetActiveSearchListElementByMouseover(id)
      : null));
  };

  useEffect(() => {
    items.map((city, id) => (id === activeSearchListElement ? setSelectedCity(city) : null));

    formComponent.addEventListener('keydown', handleKeyDown);

    return () => {
      formComponent.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeSearchListElement, items]);

  return (
        <List>
            {loading ? <ListItem className="disabled">Searching...</ListItem> : items.map((city, id) => (
                <ListItem className={id === activeSearchListElement ? 'active' : null}
                key={city.recordid}
                onMouseOver={() => handleMouseOverListElement(city)}
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
    font-size: 16px;
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
        background: #597696;
        color: #eee;
    }

    &:last-child {
        border-bottom: none;
    }

    &.disabled {
        cursor: default;
    }
`;

SearchList.propTypes = {
  items: propTypes.array,
  loading: propTypes.bool,
  activeSearchListElement: propTypes.number,
  onSetActiveSearchListElementByMouseover: propTypes.func,
  onSetActiveSearchListElement: propTypes.func,
  handleSearchQueryFromList: propTypes.func,
  setSelectedCity: propTypes.func,
  formComponent: propTypes.object,
};
