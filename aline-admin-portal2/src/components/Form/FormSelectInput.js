import React from 'react';
import PropTypes from 'prop-types';
import {useFormContext} from 'react-hook-form';

const FormSelectInput = ({data}) => {
    const {register, formState: {errors}} = useFormContext();
    const {
        id, label, options, disabled
    } = data
    return (
        <div className='form-floating'>
            <select className='form-select' aria-label={id} defaultValue={options[0].value} {...register(id)} disabled={disabled}>
                {
                    options.map((opt, index) =>(
                        <option key={index} value={opt.value}>{opt.name}</option>
                    ))
                }
            </select>
            <label htmlFor={id}>{label}</label>

            <p className='text-danger small mt-1 text-start'>{errors[id]?.message}</p>
        </div>
    );
};

FormSelectInput.propTypes = {
    data: PropTypes.object
};

export default FormSelectInput;
