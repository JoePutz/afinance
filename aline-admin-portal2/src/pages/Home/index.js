import React from 'react';
import {UseUserSession} from '../../utils/UserContext';
import RecentMenu from './RecentMenu';
import ActionsMenu from './ActionsMenu';
import {Helmet} from 'react-helmet';

const Index = () => {
    const {user} = UseUserSession();
    return (
        <div data-testid='homepage' className='w-100'>
            <Helmet>
                <title>Dashboard | Aline Financial</title>
                <meta
                    name='description'
                    content='Dashboard for Aline Financial'
                />
            </Helmet>
            <div className='w-75 mx-auto'>
                <h1 className='fw-normal fs-2 mt-5 '>Welcome back {user}! </h1>
                {/*<hr className='bg-dark'/>*/}
                <div>
                    <RecentMenu/>
                    <hr className='bg-dark mt-2'/>
                    <ActionsMenu/>
                </div>
            </div>
        </div>
    );
};



export default Index;
