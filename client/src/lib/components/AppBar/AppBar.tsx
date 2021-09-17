import React from 'react'
import logo from '../../../assets/marvel-logo.png'
import { useLocation, NavLink } from "react-router-dom";

export const AppBar = () => {
    const location = useLocation()
    const pathname = location?.pathname;

    return (
        <header>
            <nav>
                <ul className="header">
                    <li>
                        <NavLink to='/'>
                            <img src={logo} alt='logo' className='header_logo' />
                        </NavLink>
                    </li>
                    {pathname !== '/superhero' ? (
                        <li className='header_navlink'>
                            <NavLink to='/superhero'>Create New Superhero</NavLink>
                        </li>
                    ) : null}
                </ul>
            </nav>
        </header>
    )
}