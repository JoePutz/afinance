import React, {useState} from 'react';
import API from '../../utils/API';
import {Redirect} from 'react-router-dom';
import TextInput from '../../components/TextInput';
import './login.css'
import {Helmet} from 'react-helmet';

const Index = () => {
    const [userDetails, setUserDetails] = useState({username: '', password: ''})
    const [onError, setOnError] = useState({visibility: 'hidden', msg: ''})
    const [onSuccess, setOnSuccess] = useState({Redirect: null})


    const onChange = (e) => {
        setUserDetails({...userDetails, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault(); //prevents username & pwd to appear in url when submitting

        if (userDetails.username === '' || userDetails.password === '') {
            setOnError({visibility: '', msg: 'Please enter credentials.'})
            return;
        }

        try {
            const res = await API.User.login(userDetails);
            if (res.status === 200) setOnSuccess({Redirect: '/'})
            else setOnError({visibility: '', msg: res.message})

        } catch (error) {
            setOnError({visibility: '', msg: 'Oops, there seems to be an error!'})
        }

    }

    return (
        <div className=' login '>
            <Helmet>
                <title>Login | Aline Financial</title>
                <meta
                    name='description'
                    content='Login page for Aline Financial'
                />
            </Helmet>
            {
                onSuccess.Redirect ? <Redirect to={onSuccess.Redirect}/> :

                    <div
                        className='loginCard min-vh-100 d-flex justify-content-center align-items-center '>
                        <div className='w-75 bg-white rounded-3 mx-auto p-3'>
                            <h2 className='text-center pt-2'>Login</h2>
                            <div className='text-center'>
                                <svg xmlns="http://www.w3.org/2000/svg"  className='my-2' height='40' width='40' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <form className='text-center' onSubmit={onSubmit}>
                                <div id='LoginError'
                                     data-testid='loginError'
                                     className={`text-danger py-1 ${onError.visibility}`}>{onError.msg}</div>

                                <TextInput id='username' value={userDetails.username} onChange={onChange} label='Username' />

                                <TextInput id='password' value={userDetails.password} onChange={onChange} label='Password' type='password'/>

                                <input type='submit' value='Sign in' data-testid='loginSubmit' className='btn btn-primary mt-3'/>
                            </form>
                        </div>
                    </div>
            }
        </div>

    );
};

Index.propTypes = {};

export default Index;
