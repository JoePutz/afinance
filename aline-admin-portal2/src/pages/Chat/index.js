import React, {useEffect, useRef, useState} from 'react';
import {Helmet} from 'react-helmet';
import StompContextProvider from '../../utils/StompContext';
import ChatArea from './ChatArea';

const Index = () => {
    const [status, setStatus] = useState(false);
    const circleRef = useRef();

    useEffect(()=>{
        const circleEl = circleRef.current
        if(status){
            circleEl.classList.remove('bg-danger');
            circleEl.classList.add('bg-success')
        } else{
            circleEl.classList.remove('bg-success');
            circleEl.classList.add('bg-danger')
        }
    },[status])

    const changeStatus = () =>{
        setStatus(!status)
    }

    return (
        <div className='w-75 mx-auto my-2 py-3'>
            <Helmet>
                <title>Chat</title>
                <meta
                    name='description'
                    content='Chat'
                />
            </Helmet>
            <div className='display-5 position-relative'>Chat
                <span ref={circleRef} className='position-absolute top-50
                 translate-middle p-2 ms-3 mt-1 bg-danger border border-light rounded-circle'>
                    <span className='visually-hidden'>chat status</span>
                </span>
            </div>
            
            <StompContextProvider>
                <ChatArea changeStatus={changeStatus}/>
            </StompContextProvider>
        </div>
    );
};


export default Index;
