import React from 'react';
import {useFormContext} from 'react-hook-form';

const FormCheckboxInput = ({data}) => {

    const {register, formState: {errors}} = useFormContext();
    const {
        id, label
    } = data
    return (
        <div>
            <div className='mt-2 mb-0 '>
                <input
                    className='me-1 btn-check'
                    id={id}
                    name={id}
                    type='checkbox'
                    autoComplete='off'
                    {...register(id)}
                />
                <label className='btn btn-outline-primary' htmlFor={id}>{label}</label>
            </div>
            <p className='text-danger small mt-1 text-start'>{errors[id]?.message}</p>
        </div>
    );
};

FormCheckboxInput.propTypes = {};

export default FormCheckboxInput;
