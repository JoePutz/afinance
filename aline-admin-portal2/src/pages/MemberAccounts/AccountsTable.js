import React, {useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import Table from '../../components/Table'
import AccountMask from './AccountMask';
import API from '../../utils/API';
import AccountCard from './AccountCard';

const AccountsTable = ({data}) => {
    const [accountDetails, setAccountDetails] = useState({
        view: false,
        account: null,
        error: false
    })


    const columns = useMemo(() => {

        const onView = async (e) => {
            e.preventDefault();
            setAccountDetails({...accountDetails, view:false, error:false})
            const accountId = e.target.getAttribute('data-id');
            try {
                const {data} = await API.Accounts.getAccountById(accountId);
                setAccountDetails({account: data, view:true, error: false})
                console.log(data)
            }catch (e) {
                setAccountDetails({...accountDetails, view: false, error:true})
                console.error(e)
            }
            console.log('accountId: ', accountId)
        }

        return [
            {
                Header: 'Account Number',
                accessor: 'accountNumber',
                Cell: ({cell}) => {
                    const {value} = cell;
                    return <AccountMask number={value}/>
                }
            },
            {
                Header: 'Type',
                accessor: 'type'
            },
            {
                Header: 'Balance',
                accessor: 'balance'
            },
            {
                Header: 'Status',
                accessor: 'status'
            },
            {
                Header: 'View',
                Cell: ({cell}) => {
                    const {row: original} = cell;
                    const cellVal = original.original;
                    return <button className='btn btn-outline-primary'
                                   data-id={cellVal.id}
                                   onClick={onView}
                            >View</button>
                }
            }
        ]
    }, [accountDetails])

    return (
        <div>
            <Table data={data} columns={columns}/>
            {
                accountDetails.view ?
                    <AccountCard account={accountDetails.account} error={accountDetails.error}/>:
                    <div className='lead fs-3 fw-normal'>Please select Account to view</div>
            }
        </div>
    );
};

AccountsTable.propTypes = {
    data: PropTypes.array
};

export default AccountsTable;
