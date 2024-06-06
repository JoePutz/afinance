import React, {useState} from 'react';
import {useFormContext} from 'react-hook-form';
import states from '../../utils/states';

const FormAddressInput = () => {
    const {register, formState: {errors}} = useFormContext();

    const [addressState, setAddressState] = useState({
        address: '',
        city: '',
        state: '',
        zipcode: ''
    })

    const [mailingAddressState, setMailingAddressState] = useState({
        mailingAddress: '',
        mailingCity: '',
        mailingState: '',
        mailingZipcode: ''
    })

    const [isSameAsMailing, setIsSameAsMailing] = useState(false)

    const toggleIsSameAsMailing=()=>{
        if(!isSameAsMailing){
            setMailingAddressState({
                mailingAddress: addressState.address,
                mailingCity: addressState.city,
                mailingState: addressState.state,
                mailingZipcode: addressState.zipcode
            })
        }
        setIsSameAsMailing(!isSameAsMailing)
    }
    const onChangePrimaryAddress =(e) =>{
        const targetID = e.target.id

        if(!isSameAsMailing) {
            setAddressState({...addressState, [targetID]: e.target.value})
        }
        else {
            setAddressState({...addressState, [targetID]: e.target.value})
            const name = targetID.charAt(0).toUpperCase()+targetID.slice(1)
            const objName = 'mailing'+name
            setMailingAddressState({...mailingAddressState, [objName]:e.target.value})
        }
    }

    const onChangeMailingAddress = (e) =>{
        const targetID = e.target.id
        setMailingAddressState({...mailingAddressState, [targetID]: e.target.value})
    }

    const mailingAddress = register('mailingAddress')
    const mailingCity = register('mailingCity')
    const mailingState = register('mailingState')
    const mailingZipcode = register('mailingZipcode')

    return (
        <div>
            <div>

                <div className='form-floating mt-2 mb-0'>
                    <input
                        {...register('address')}
                        id='address'
                        name='address'
                        type='text'
                        className='form-control rounded-1'
                        placeholder="Address"
                        value={addressState.address}
                        onChange={onChangePrimaryAddress}
                    />
                    <label htmlFor='address'>Address</label>
                </div>
                <p className='text-danger small mt-1 text-start'>{errors?.address?.message}</p>
            </div>
            <div className='row align-items-center'>
                <div className='col-md'>
                    <div className='form-floating mt-2 mb-0'>
                        <input
                            id='city'
                            name='city'
                            type='text'
                            className='form-control rounded-1'
                            {...register('city')}
                            placeholder="City"
                            value={addressState.city}
                            onChange={onChangePrimaryAddress}
                        />
                        <label htmlFor='city'>City</label>
                    </div>
                    <p className='text-danger small mt-1 text-start'>{errors?.city?.message}</p>
                </div>
                <div className='col-md'>
                    <div className='form-floating'>
                        <select className='form-select '
                                aria-label='state'
                                name='state'
                                id='state'{...register('state')}
                                value={addressState.state}
                                onChange={onChangePrimaryAddress}
                        >
                            <option>Select</option>
                            {states.map(state => (
                                <option value={state} key={state}>{state}</option>
                            ))}
                        </select>
                        <label htmlFor='state'>State</label>
                    </div>
                    <p className='text-danger small mt-1 text-start'>{errors?.state?.message}</p>
                </div>

                <div className='col-md'>
                    <div className='form-floating mt-2 mb-0'>
                        <input
                            id='zipcode'
                            name='zipcode'
                            type='number'
                            className='form-control rounded-1'
                            {...register('zipcode')}
                            placeholder="Zipcode"
                            value={addressState.zipcode}
                            onChange={onChangePrimaryAddress}
                        />
                        <label htmlFor='zipcode'>Zipcode</label>
                    </div>
                    <p className='text-danger small mt-1 text-start'>{errors?.zipcode?.message}</p>
                </div>
            </div>

            <div className='row'>
                <div className='mt-2 mb-3 '>
                    <input
                        className='me-1 btn-check'
                        id='isSameAsMailing'
                        name='isSameAsMailing'
                        type='checkbox'
                        autoComplete='off'
                        onClick={toggleIsSameAsMailing}
                    />
                    <label className='btn btn-outline-secondary' htmlFor='isSameAsMailing'>Same Mailing Address?</label>
                </div>
            </div>
            <div>
                <div>
                    <div className='form-floating mt-2 mb-0'>
                        <input
                            id='mailingAddress'
                            name='mailingAddress'
                            type='text'
                            className='form-control rounded-1'
                            placeholder="Mailing Address"
                            value={mailingAddressState.mailingAddress}
                            {...mailingAddress}
                            onChange={e=>{
                                mailingAddress.onChange(e);
                                onChangeMailingAddress(e);
                            }}
                            disabled={isSameAsMailing}
                        />
                        <label htmlFor='address'>Mailing Address</label>
                    </div>
                    <p className='text-danger small mt-1 text-start'>{errors?.mailingAddress?.message}</p>
                </div>
                <div className='row align-items-center'>
                    <div className='col-md'>
                        <div className='form-floating mt-2 mb-0'>
                            <input
                                id='mailingCity'
                                name='mailingCity'
                                type='text'
                                className='form-control rounded-1'
                                placeholder="Mailing City"
                                value={mailingAddressState.mailingCity}
                                {...mailingCity}
                                onChange={e=>{
                                    mailingCity.onChange(e);
                                    onChangeMailingAddress(e);
                                }}
                                disabled={isSameAsMailing}
                            />
                            <label htmlFor='mailingCity'>Mailing City</label>
                        </div>
                        <p className='text-danger small mt-1 text-start'>{errors?.mailingCity?.message}</p>
                    </div>
                    <div className='col-md'>
                        <div className='form-floating'>
                            <select className='form-select'
                                    aria-label='mailingState'
                                    name='mailingState'
                                    id='mailingState'
                                    value={mailingAddressState.mailingState}
                                    {...mailingState}
                                    onChange={e=>{
                                        mailingState.onChange(e);
                                        onChangeMailingAddress(e);
                                    }}
                                    disabled={isSameAsMailing}
                            >
                                <option>Select</option>
                                {states.map(state => (
                                    <option value={state} key={state}>{state}</option>
                                ))}
                            </select>
                            <label htmlFor='mailingState'>Mailing State</label>
                        </div>
                        <p className='text-danger small mt-1 text-start'>{errors?.mailingState?.message}</p>
                    </div>

                    <div className='col-md'>
                        <div className='form-floating mt-2 mb-0'>
                            <input
                                id='mailingZipcode'
                                name='mailingZipcode'
                                type='number'
                                className='form-control rounded-1'
                                placeholder="Mailing Zipcode"
                                value={mailingAddressState.mailingZipcode}
                                {...mailingZipcode}
                                onChange={e=>{
                                    mailingZipcode.onChange(e);
                                    onChangeMailingAddress(e);
                                }}
                                disabled={isSameAsMailing}
                            />
                            <label htmlFor='zipcode'>Mailing Zipcode</label>
                        </div>
                        <p className='text-danger small mt-1 text-start'>{errors?.mailingZipcode?.message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

FormAddressInput.propTypes = {};

export default FormAddressInput;
