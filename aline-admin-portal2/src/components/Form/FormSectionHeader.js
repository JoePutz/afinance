import React from 'react';
import PropTypes from 'prop-types';

const FormSectionHeader = ({data}) => {
    return (
        <h3 className='text-md-start my-4 text-decoration-underline'>
            {data.label}
        </h3>
    );
};

FormSectionHeader.propTypes = {
    data: PropTypes.object
};

export default FormSectionHeader;
