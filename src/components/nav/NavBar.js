import { Link } from 'react-router-dom'
import styled from 'styled-components'

function NavBar({ city }) {
    return (
        <Nav>
            <ul>
                <li>
                    <Link to='/'>Today</Link>
                </li>
                <li>
                    <Link to={city ? `/week/${city}` : '/'}>Week</Link>
                </li>
                <li>
                    <Link to={city ? `/month/${city}` : '/'}>Month</Link>
                </li>
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
            color: #eee;
            text-decoration: none;
        }
    }
`