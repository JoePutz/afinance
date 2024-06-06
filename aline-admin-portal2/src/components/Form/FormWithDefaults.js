import React, {useMemo} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import FormTextInput from './FormTextInput';
import FormPhoneInput from './FormPhoneInput';
import FormEmailInput from './FormEmailInput';
import FormCheckboxInput from './FormCheckboxInput';
import FormSelectInput from './FormSelectInput';
import FormSocialSecurityInput from './FormSocialSecurityInput';
import FormAddressInput from './FormAddressInput';
import FormIncomeInput from './FormIncomeInput';
import FormSectionHeader from './FormSectionHeader';
import FormUpperCaseText from './FormUpperCaseText';
import FormTitle from './FormTitle';

const FormWithDefaults = ({data, onSubmit, validationSchema, children, defaultValues}) => {
    const methods = useForm({
        resolver: yupResolver(validationSchema),
        criteriaMode: 'all',
        mode: 'all',
        reValidateMode: 'onChange',
        defaultValues: useMemo(()=>(defaultValues), [defaultValues])
    })
    return (
        <FormProvider {...methods} >
            <form onSubmit={methods.handleSubmit(onSubmit)} className='text-center mt-3 mb-5 rounded-3 p-3'
                  noValidate>
                {data.map((question, index) => {
                    switch (question.type) {
                        case 'date':
                        case 'number':
                        case 'password':
                        case 'text':
                            return <FormTextInput data={question} key={question.id}/>
                        case 'phone':
                            return <FormPhoneInput data={question} key={question.id}/>
                        case 'email':
                            return <FormEmailInput data={question} key={question.id}/>
                        case 'checkbox':
                            return <FormCheckboxInput data={question} key={question.id}/>
                        case 'select':
                            return <FormSelectInput data={question} key={question.id}/>
                        case 'ssn':
                            return <FormSocialSecurityInput data={question} key={question.id}/>
                        case 'addressWithMailingOption':
                            return <FormAddressInput data={question} key={index}/>
                        case 'income':
                            return <FormIncomeInput data={question} key={question.id}/>
                        case 'sectionHeader':
                            return <FormSectionHeader data={question} key={index}/>
                        case 'UppercaseText':
                            return <FormUpperCaseText data={question} key={question.id}/>
                        case 'title':
                            return <FormTitle data={question} key={question.id}/>
                        default:
                            return <div key={index}>Need to create type for Form component</div>
                    }
                })}
                {children}
                <div className='d-flex justify-content-evenly pt-3'>
                    <input type='submit' className='btn btn-primary text-white'/>
                    <button type='button' className='btn btn-primary text-white' onClick={()=>{methods.reset()}}>Reset</button>
                </div>
            </form>
        </FormProvider>
    );
};

FormWithDefaults.propTypes = {

};

export default FormWithDefaults;
