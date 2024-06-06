import React from 'react';
import PropTypes from 'prop-types';

const FormTitle = ({data}) => {
    const {label} = data
    return (
        <div>
            <h1 className='display-5 '>{label}</h1>
            <hr className = 'mb-5'/>
        </div>
    );
};

FormTitle.propTypes = {
    data: PropTypes.object
};

export default FormTitle;
