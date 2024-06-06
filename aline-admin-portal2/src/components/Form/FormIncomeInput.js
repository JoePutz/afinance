import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useFormContext} from 'react-hook-form';

const FormIncomeInput = ({data}) => {
    const {register} = useFormContext();
    const [incomeVal, setIncomeVal] = useState(0);

    const {
        id, label
    } = data;

    const formatIncome = (val) =>{
        if(!val.includes('.')){
            return Number(val);
        }

        const decimal = val.substring(val.indexOf('.')+1)
        console.log(decimal)
        if(val.includes('.') && decimal.length===1 ){
            return Number(val).toFixed(2)
        }

        if(val.includes('.') && decimal.length>1){
            return Number(val).toFixed(2)
        }
    }

    const handleInput= (e)=>{
        const value = e.target.value
        const myVal =  formatIncome(value)

        setIncomeVal(myVal)
    }

    return (
        <div className='input-group w-100'>
            <span className='input-group-text mt-2'>$</span>
            <div className='form-floating mt-2 mb-0 flex-grow-1 '>
                <input
                    id={id}
                    name={id}
                    type='number'
                    className='form-control rounded-1'
                    {...register(id)}
                    placeholder={label}
                    onChange={handleInput}
                    value={incomeVal}
                />
                <label htmlFor={id}>{label}</label>
            </div>

        </div>
    );
};

FormIncomeInput.propTypes = {
    question: PropTypes.object,
    error: PropTypes.object
};

export default FormIncomeInput;
