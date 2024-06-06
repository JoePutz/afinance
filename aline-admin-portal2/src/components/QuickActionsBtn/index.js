import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Redirect} from 'react-router-dom';

const Index = ({data}) => {
    const [redirectStatus, setRedirectStatus] = useState({
        to: {},
        isRedirect: false
    })

    useEffect(() => {
        if (data.forwardState) {
            setRedirectStatus({
                to: {
                    pathname: data.link,
                    state: {...data.state}
                },
                isRedirect: false
            })
        } else {
            setRedirectStatus({
                to: {
                    pathname: data.link
                },
                isRedirect: false
            })
        }
    }, [data])

    const onActionClick = (e) => {
        e.preventDefault();
        const currentRecent = [];
        if('RecentActions' in localStorage){
            currentRecent.push(...JSON.parse(localStorage.getItem('RecentActions')))
        }

        currentRecent.unshift(data)
        if(currentRecent.length>5) currentRecent.length=5
        localStorage.setItem('RecentActions', JSON.stringify(currentRecent))


        setRedirectStatus({...redirectStatus, isRedirect: true})
    }

    return (
        <div className='col-12 col-md-2 action-card text-center text-center  '>
            {
                redirectStatus.isRedirect ?
                    <Redirect push to={redirectStatus.to}/> :
                    (
                        <button className='btn btn-primary rounded-full text-white action-btn mx-auto' onClick={onActionClick}>
                            <FontAwesomeIcon icon={data.icon} size='lg'/>
                        </button>

                    )
            }
            <div className='action-content text-center fs-5 '>
                {data.displayName}
            </div>
        </div>
    );
};

Index.propTypes = {
    data: PropTypes.object
};

export default Index;
