import React, {useState} from 'react';
import PropTypes from 'prop-types';
import TransactionstTable from './TransactionsTable';

const AccountCard = ({account, error}) => {

    return (
        <div className='card'>
            {
                error?
                    <div className='card-subtitle lead fw-normal'>Error retrieving account</div>:
                    (
                        <div className='card-body'>
                            <h5 className='card-title display-6 lead'>{account?.type}</h5>
                            <hr/>
                            <h6 className='card-subtitle lead fw-normal'>Account Number: {account?.accountNumber}</h6>
                            <h6 className='card-subtitle lead fw-normal'>Status: <span
                                className='text-capitalize'>{account?.status.toString().toLowerCase()}</span></h6>
                            <br/>
                            <div>Balance: {account?.balance}</div>
                            {
                                account?.type === 'CHECKING' ?
                                    <div>Available Balance: {account.availableBalance}</div> :
                                    <div>APY: {account.apy}</div>
                            }
                            <br/>
                            <TransactionstTable accountId={account.id}/>
                        </div>
                    )
            }

        </div>
    );
};

AccountCard.propTypes = {
    account: PropTypes.object,
    error: PropTypes.bool
};

export default AccountCard;
