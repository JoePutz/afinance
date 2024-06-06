import React from 'react';
import PropTypes from 'prop-types';

/**
 * React Text Input component which has standard styling already applied.
 * Id is shared between the Label and Input to link them together.
 * label is displayed text which users can see.
 */
const TextInput = ({id, label, value, onChange, type})=> {
    return (
        <div className='form-floating'>
            <input type={!type? 'text': type}
                   name={id}
                   className='form-control rounded-1'
                   placeholder={label}
                   id={id}
                   value={value}
                   onChange={onChange}
                   data-testid={id}
            />
            <label htmlFor={id}>
                {label}
            </label>
        </div>
    );
};

TextInput.propTypes = {
    /** Required for screen readers */
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    /** Attributes for input field     */
    inputProps: PropTypes.any,
    /** State to sture and use input value     */
    value: PropTypes.string
}


export default TextInput;
