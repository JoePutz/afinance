import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './QuickMenu.scss'
import AllActions from '../../utils/Actions'
import {Link} from 'react-router-dom';

const Index = () => {
    const [recentActions, setRecentActions] = useState([])

    useEffect(() => {
        if ('RecentActions' in localStorage) {
            const recentArr = JSON.parse(localStorage.getItem('RecentActions'))
            recentArr.length = 2
            setRecentActions([...recentArr])
        } else {
            setRecentActions([AllActions[0], AllActions[1]])
        }
    }, [])

    return (
        <footer className='quick-menu d-flex flex-column-reverse'>
            <button className='btn btn-outline-dark rounded-circle quick-menu-more'
            >
                <FontAwesomeIcon icon='ellipsis-v'/>
            </button>
            <div className='quick-menu-items d-flex flex-column-reverse'>
                <Link className='btn btn-outline-dark rounded-circle mb-2'
                      to={{
                          pathname: '/'
                      }}
                >
                    <FontAwesomeIcon icon='home'/>
                </Link>
                {
                    recentActions.map((act, index) => (
                        <Link className='btn btn-outline-dark rounded-circle mb-2'
                              to={{
                                  pathname: act.link,
                                  state: act?.state
                              }}
                              key={index}
                        >
                            <FontAwesomeIcon icon={act.icon}/>
                        </Link>
                    ))
                }
            </div>
        </footer>
    );
};

Index.propTypes = {};

export default Index;
