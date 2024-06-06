import React, {createRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import './sidebar.css';
import Navigation from './Navigation';
import UseWindowSize from '../../utils/useWindowSize';
import QuickMenu from'../QuickMenu'
import {UseUserSession} from '../../utils/UserContext';

/**
 * Sidebar navigation for application uses standard styling
 *
 * @param children
 * @returns {JSX.Element}
 */
const Index = ({children}) => {
    const wrapperRef = createRef();
    const windowSizes = UseWindowSize();
    const OPEN_NAV_CLASS = 'is-nav-open';
    const footerRef = createRef();
    const contentRef = createRef();
    const {logoutMethod} = UseUserSession();

    const handleToggle = () => {
        const wrapper = wrapperRef.current;
        wrapper.classList.toggle(OPEN_NAV_CLASS);
    }

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const content = contentRef.current;
        const FOOTER_CLASS = ['position-absolute', 'bottom-0', 'start-50', 'translate-middle'];

        if (windowSizes.width >= 768 && !wrapper.classList.contains(OPEN_NAV_CLASS)) {
            wrapper.classList.add(OPEN_NAV_CLASS)
            content.classList.add(OPEN_NAV_CLASS)
        }
        if (windowSizes.width < 768 && wrapper.classList.contains(OPEN_NAV_CLASS)) {
            wrapper.classList.remove(OPEN_NAV_CLASS);
            content.classList.remove(OPEN_NAV_CLASS);
        }

        if (windowSizes.height > 400) footerRef.current.classList.add(...FOOTER_CLASS)
        else footerRef.current.classList.remove(...FOOTER_CLASS)

    }, [windowSizes, wrapperRef, footerRef, contentRef])

    return (
        <div className='d-flex flex-md-row flex-column position-relative min-vh-100'>
            {/*Mobile*/}
            <nav className='d-flex navbar w-100 navbar-dark bg-dark d-md-none ' data-testid='mobileMenu'>
                <div className='container-fluid'>
                    <a href='/' className='navbar-brand'>Aline</a>
                    <button className='navbar-toggler'
                            onClick={handleToggle}
                            data-testid='mobileToggle'
                    >
                        <span className='navbar-toggler-icon'/>
                    </button>
                </div>

            </nav>

            {/*Sidebar*/}
            <div
                ref={wrapperRef}
                className='d-flex min-vh-100 position-absolute position-fixed flex-column p-3 text-white bg-dark px-2 sidebar is-nav-open'
                id='SidebarContent'
            >
                <a href='/'
                   className='align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none'>
                    <span className='fs-4'>Aline Financial</span>
                </a>
                <hr/>
                <div className='nav nav-pills flex-column overflow-auto'>
                    <Navigation/>
                </div>


                <div ref={footerRef}
                     className="dropdown ">
                    <hr className='w-100'/>
                    <a href="/"
                       className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                       id="navProfileDropdown" data-bs-toggle="dropdown" aria-expanded="false" role='button'>

                        <span>
                            <svg xmlns='http://www.w3.org/2000/svg' height='16' width='16' fill='currentColor'
                                 className='bi me-1'>
                            <path
                                d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                            <path
                                d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                            </svg>
                        </span>

                        <strong>Settings</strong>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-start text-small shadow"
                        aria-labelledby="navProfileDropdown">
                        <li><a className="dropdown-item" href="/">Profile</a></li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li><button className="dropdown-item" onClick={logoutMethod}>Sign out</button></li>
                    </ul>
                </div>

            </div>

            <div ref={contentRef} className='flex-grow-1 content is-nav-open'>
                {children}
            </div>

            <QuickMenu/>
        </div>

    );
};

Index.propTypes = {
    children: PropTypes.element
}

export default Index;
