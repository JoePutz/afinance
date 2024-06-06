import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import API from '../../utils/API';
import AccountsTable from './AccountsTable';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Index = () => {
    let location = useLocation();
    const [member, setMember] = useState({
        id: null,
        accounts: null,
        loading: true
    })

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const {data} = await API.Accounts.getAccountsByMemberID(location.state.memberId)
                setMember({id: location.state.memberId, accounts: data.content, loading: false})
            } catch (e) {
                console.error(e)
            }
        }

        if (location?.state?.memberId) {
            fetchAccounts();
        }
    }, [location?.state?.memberId])

    return (
        <div className='w-75 mx-auto my-2 py-3'>
            <Helmet>
                <title>Member Accounts</title>
                <meta
                    name='description'
                    content='Review Member Account'
                />
            </Helmet>
            <h1 className='display-5'>Member Accounts</h1>

            <div className='mt-4'>
                {
                    member.loading?(
                        <FontAwesomeIcon icon='spinner' pulse={true}/>
                    ):(
                        <AccountsTable data={member.accounts}/>
                    )
                }
            </div>
        </div>
    );
};

export default Index;
