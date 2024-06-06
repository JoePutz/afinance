import React from 'react';
import PropTypes from 'prop-types';
import {useFormContext} from 'react-hook-form';

const FormUpperCaseText = ({data}) => {
    const {register, formState: {errors}} = useFormContext();

    const {
        id, label, type,
    } = data;

    return (
        <div>
            <div className='form-floating mt-2 mb-0'
            >
                <input
                    id={id}
                    name={id}
                    type={type}
                    className='form-control rounded-1 text-uppercase'
                    {...register(id)}
                    placeholder={label}
                />
                <label htmlFor={id}>{label}</label>
            </div>
            <p className='text-danger small mt-1 text-start'>{errors[id]?.message}</p>

        </div>
    );
};

FormUpperCaseText.propTypes = {
    question: PropTypes.object,
    error: PropTypes.object
};

export default FormUpperCaseText;
