import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

function NavBar({ city }) {
    const links = [
        {
            name: 'today',
            to: '/'
        },
        {
            name: 'hourly',
            to: `/hourly/${city}`
        },
        {
            name: 'forecast',
            to: `/forecast/${city}`
        }
    ]

    return (
        <Nav>
            <ul>
                {links.map(link => 
                    <li key={link.name}>
                        <NavLink exact activeClassName='active' to={link.to}>
                            {link.name}
                        </NavLink>
                    </li>)}
            </ul>
        </Nav>
    )
}

export default NavBar

const Nav = styled.nav`
    background: rgba(255, 255, 255, .2);
    width: 80%;
    max-width: 1024px;
    position: fixed;
    z-index: 100;
    top: 0;
    padding: 5px 0;
    border-radius: 0 0 15px 15px;

    ul {
        display: flex;
        justify-content: space-around;
        list-style: none;
        margin: 0;
        padding: 0;

        a {
            color: #ccc;
            text-decoration: none;
            text-transform: capitalize;
            transition: all .2s;

            &:hover {
                color: #fff;
            }

            &.active {
                color: #fff;
            }
        }
    }
`