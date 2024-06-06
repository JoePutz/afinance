import React from 'react';
import PropTypes from 'prop-types';
import {useFormContext} from 'react-hook-form';

const FormTextInput = ({data}) => {
    const {register, formState: {errors}} = useFormContext();

    const {
        id, label, type, disabled
    } = data;

    return (
        <div>
            <div className='form-floating mt-2 mb-0'>
                <input
                    id={id}
                    name={id}
                    type={type}
                    className='form-control rounded-1'
                    {...register(id)}
                    placeholder={label}
                    disabled={disabled}
                />
                <label htmlFor={id}>{label}</label>
            </div>
            <p className='text-danger small mt-1 text-start'>{errors[id]?.message}</p>

        </div>
    );
};

FormTextInput.propTypes = {
    question: PropTypes.object,
    error: PropTypes.object
};

export default FormTextInput;
