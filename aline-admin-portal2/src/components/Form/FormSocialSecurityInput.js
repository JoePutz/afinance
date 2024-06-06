import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useFormContext} from 'react-hook-form';

const FormSocialSecurityInput = ({data}) => {
    const {register, formState: {errors}} = useFormContext();
    const {
        id, label
    } = data;

    const [inputValue, setInputValue] = useState('');

    const formatPhoneNumber = (phone) => {
        if (!phone) return phone;

        const phoneNumber = phone.replace(/[^\d]/g, '')
        const phoneLength = phoneNumber.length

        if (phoneLength < 4) return phoneNumber;

        if (phoneLength < 5) {
            return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`
        }

        return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 5)}-${phoneNumber.slice(5, 9)}`
    }

    const handleInput=(e)=>{
        const formattedNumber = formatPhoneNumber(e.target.value);
        setInputValue(formattedNumber);
    }

    return (
        <div>
            <div className='form-floating mt-2 mb-0'>
                <input
                    {...register(id, {required:true})}
                    id={id}
                    name={id}
                    type='tel'
                    className='form-control rounded-1'
                    placeholder={label}
                    onChange={handleInput}
                    value={inputValue}
                />
                <label htmlFor={id}>{label}</label>
                <p className='text-danger small mt-1 text-start'>{errors[id]?.message}</p>
            </div>

        </div>
    );
};

FormSocialSecurityInput.propTypes = {
    data: PropTypes.object,
    error: PropTypes.object
};

export default FormSocialSecurityInput;
