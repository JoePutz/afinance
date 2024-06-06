import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import AdminForm from './AdminForm';
import {Helmet} from 'react-helmet';

const Index = () => {
    const [formType, setFormType] = useState()
    let location = useLocation();

    useEffect(() => {
        if(location?.state?.userType) {
            switch (location.state.userType) {
                case 'admin':
                    setFormType(<AdminForm/>)
                    break;
                case 'employee':
                    break;
                case 'member':
                    break;
                default:
                    break;
            }
        }
        else{
            setFormType(<div className='display-4 mt-4'>Unable to create user please go to the Users page</div>)
        }

    }, [location])

    return (
        <div className='w-75 mx-auto'>
            <Helmet>
                <title>Add User</title>
                <meta
                    name='description'
                    content='Create user'
                />
            </Helmet>
            {formType}
        </div>
    );
};

export default Index;
