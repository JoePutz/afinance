import React from 'react';
import {Helmet} from 'react-helmet';

const NotFound = () => {
    return (
        <div className='bg-body'>
            <Helmet>
                <title>Page Not Found</title>
                <meta
                    name='description'
                    content='Page not found'
                />
            </Helmet>
            <h1 className='text-center mt-5'>Not Found</h1>
        </div>
    );
};

NotFound.propTypes = {

};

export default NotFound;
