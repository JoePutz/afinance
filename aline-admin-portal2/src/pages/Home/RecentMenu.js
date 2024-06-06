import React, {useEffect, useRef, useState} from 'react';
import allActionsMenu from '../../utils/Actions.js';
import QuickActionsBtn from '../../components/QuickActionsBtn'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const RecentMenu = () => {
    const [actionItems, setActionItems] = useState([])
    const dropdownRef = useRef();

    const onDowntownRotate = () => {
        dropdownRef.current.classList.toggle('rotate-180')
    }

    useEffect(() => {
        if ('RecentActions' in localStorage) {
            setActionItems(JSON.parse(localStorage.getItem('RecentActions')))
        } else {
            setActionItems(allActionsMenu.slice(0,5))
        }
    }, [])

    return (
        <div className=' p-4 container rounded-3'>
            <div className='d-flex justify-content-between'>
                <div>
                    <h2 className='fs-3 fw-normal'>Recently Used</h2>
                </div>
                <button type='button' className='btn btn-primary rounded-circle rotate'
                        data-bs-toggle="collapse"
                        data-bs-target="#recentActionsMenu"
                        aria-expanded='false'
                        aria-controls='recentActionsMenu'
                        ref={dropdownRef}
                        onClick={onDowntownRotate}
                >
                    <FontAwesomeIcon icon='chevron-up'/>
                </button>
            </div>
            <div className='collapse show pt-2 mb-3' id='recentActionsMenu'>
                <div className='row gap-4 gap-md-0 justify-content-between  action-container'>
                    {actionItems.map((action, index) => {
                        return <QuickActionsBtn data={action} key={index}/>
                    })}

                </div>
            </div>

        </div>
    );
};

RecentMenu.propTypes = {};

export default RecentMenu;
