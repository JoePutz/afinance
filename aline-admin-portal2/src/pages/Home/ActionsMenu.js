import React, {useRef} from 'react';
import {Link} from 'react-router-dom';
import actionsMenu from '../../utils/Actions.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const ActionsMenu = () => {
    const dropdownRef = useRef();

    const onDowntownRotate = () => {
        dropdownRef.current.classList.toggle('rotate-180')
    }

    const onLinkClick = (e) => {
        const actionIndex = e.target.getAttribute('data-value')
        const actionObject = actionsMenu[actionIndex]
        const currentRecent = [];
        if ('RecentActions' in localStorage) {
            currentRecent.push(...JSON.parse(localStorage.getItem('RecentActions')))
        }

        const isInArr = currentRecent.filter(action => action.name === actionObject.name)

        if (isInArr.length === 0) currentRecent.unshift(actionObject)

        if (currentRecent.length > 5) currentRecent.length = 5
        localStorage.setItem('RecentActions', JSON.stringify(currentRecent))

    }

    return (
        <div className='p-4 container rounded-3'>
            <div className='d-flex justify-content-between'>
                <div>
                    <h2 className='fs-3 fw-normal'>All Tasks</h2>
                </div>
                <button type='button' className='btn btn-primary rounded-circle rotate'
                        data-bs-toggle="collapse"
                        data-bs-target="#allActionsMenu"
                        aria-expanded='false'
                        aria-controls='allActionsMenu'
                        ref={dropdownRef}
                        onClick={onDowntownRotate}
                >
                    <FontAwesomeIcon icon='chevron-up' rotation={180}/>
                </button>
            </div>

            <div className='collapse pt-2' id='allActionsMenu'>
                <div className='row'>
                    {actionsMenu.map((action, index) => {
                        return <Link
                            className='col-12 col-md-6'
                            key={index}
                            data-value={index}
                            to={{
                                pathname: action.link,
                                state: action?.state
                            }}
                            onClick={onLinkClick}
                        >{action.displayName}</Link>
                    })}
                </div>
            </div>
        </div>
    );
};

ActionsMenu.propTypes = {};

export default ActionsMenu;
