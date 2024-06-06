import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const AccountMask = ({number}) => {
    const [view, setView] = useState({mask:true})

    const values = {
        original: number,
        mask: '**********'
    }

    const changeView = (e) =>{
        e.preventDefault()
        setView({mask: !view.mask})
    }

    return (
        <div className='d-flex align-items-center justify-content-evenly'>
            {
                !view.mask? values.original: (
                    <div>{values.mask}</div>
                )
            }
            {/*Toggle mask view icon*/}
            <div className='text-primary'>
                {
                    view.mask?
                        <FontAwesomeIcon icon='eye' onClick={changeView}/>
                        :
                        <FontAwesomeIcon icon='eye-slash' onClick={changeView}/>

                }
            </div>

        </div>
    );
};

AccountMask.propTypes = {
    number: PropTypes.string
};

export default AccountMask;
