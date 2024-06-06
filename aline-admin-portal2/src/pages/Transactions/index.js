import React from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';

const Index = () => {
    return (
        <div className='w-75 mx-auto my-2 py-3'>
            <Helmet>
                <title>Transaction Management</title>
                <meta
                    name='description'
                    content='Transaction management for Aline Financial'
                />
            </Helmet>
            <h1 className='display-5'>Transactions Management</h1>
            <Link className='btn btn-primary' to={{pathname: '/transaction/create'}}>Add Transaction</Link>
        </div>
    );
};

Index.propTypes = {};

export default Index;
