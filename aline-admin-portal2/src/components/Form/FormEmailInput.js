import React from 'react';
import PropTypes from 'prop-types';
import {useFormContext} from 'react-hook-form';

const FormEmailInput = ({ data}) => {

    const {register, formState: {errors}} = useFormContext();
    const {
        id, label
    } = data;

    return (
        <div>
            <div className='form-floating mt-2 mb-0'>
                <input
                    id={id}
                    name={id}
                    type='email'
                    {...register(id)}
                    placeholder={label}
                    className='form-control rounded-1 bg-white'
                />
                <label htmlFor={id}>{label}</label>
            </div>
            <p className='text-danger small mt-1 text-start'>{errors[id]?.message}</p>
        </div>

    );
};

FormEmailInput.propTypes = {
    data: PropTypes.object,
};

export default FormEmailInput;
