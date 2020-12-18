import React from 'react';
import { NavLink } from 'react-router-dom';
import propTypes from 'prop-types';
import styled from 'styled-components';

function NavBar({ city }) {
  const links = [
    {
      name: 'today',
      to: '/',
    },
    {
      name: 'hourly',
      to: city ? `/hourly/${city}` : '/',
    },
    {
      name: 'forecast',
      to: city ? `/forecast/${city}` : '/',
    },
  ];

  return (
        <Nav>
            <ul>
                {links.map((link) => <li key={link.name}>
                        <NavLink exact activeClassName="active" to={link.to}>
                            {link.name}
                        </NavLink>
                    </li>)}
            </ul>
        </Nav>
  );
}

export default NavBar;

const Nav = styled.nav`
    background: rgba(255, 255, 255, .1);
    width: 80%;
    max-width: 1024px;
    position: fixed;
    z-index: 100;
    top: 0;
    padding: 5px 0;
    border-radius: 0 0 15px 15px;
    transition: all .3s;

    &.shade {
        background: rgba(36, 59, 85, .8);
    }

    ul {
        display: flex;
        align-items: center;
        justify-content: space-around;
        list-style: none;
        margin: 0;
        padding: 0;

        li {
          display: flex;
          align-items: center;
        }

        a {
            color: #ccc;
            text-decoration: none;
            text-transform: capitalize;
            transition: all .2s;
            padding: 2px 15px;
            border-radius: 15px;
            font-size: 1.7rem;

            &:hover {
                color: #fff;
            }

            &.active {
                color: #fff;
                background-color: rgba(255, 255, 255, .2);
            }
        }
    }
`;

NavBar.propTypes = {
  city: propTypes.string,
};
