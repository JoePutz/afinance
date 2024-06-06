import React from 'react';
import {NavLink} from 'react-router-dom';

/**
 * Navigation menu options for Sidebar
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Navigation = () => {

    const menu = [
        {
            link: '/user',
            display: 'Users'
        },
        {
            link: '/member',
            display: 'Members'
        },
        {
            link: '/transaction',
            display: 'Transactions'
        },
        {
            link: '/account',
            display: 'Accounts'
        },
        {
            link: '/chat',
            display: 'Chat'
        }
    ]

    return (
        <nav>
            <NavLink exact to='/' activeClassName='font-bold' className='text-white nav-link mb-auto'>Home</NavLink>
            {menu.map(nav => {
                return (
                    <NavLink key={nav.link} to={nav.link} activeClassName='font-bold'
                             className='nav-link text-white '>
                        {nav.display}
                    </NavLink>
                )
            })}
        </nav>
    );
};

export default Navigation;
