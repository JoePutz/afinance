import React from 'react';
import Form from '../../components/Form'
import schema from '../../utils/Validation/TransactionForm'
import API from '../../utils/API';
import {Helmet} from 'react-helmet';


const Index = () => {

    const onSubmit = async (data) => {
        console.log(data)
        const newTransaction = {
            ...data,
            amount: data.amount*100,
        }

        try{
            const res = await API.Transaction.create(newTransaction);
            console.log(res)
        }catch (e) {
            console.error(e.message())
        }
    }

    const formData = [
        {
            id: 'type',
            type: 'select',
            label: 'Transaction Type',
            options: [
                {value: 'PURCHASE', name: 'Purchase'},
                {value: 'PAYMENT', name: 'Payment'},
                {value: 'DEPOSIT', name: 'Deposit'},
                {value: 'REFUND', name: 'Refund'},
                {value: 'VOID', name: 'Void'},
            ]
        },
        {
            id: 'method',
            type: 'text',
            label: 'Transaction Method'
        },
        {
            id: 'amount',
            type: 'number',
            label: 'Amount'
        },
        {
            id: 'merchantCode',
            type: 'UppercaseText',
            label: 'Merchant Code',
        },
        {
            id: 'merchantName',
            type: 'text',
            label: 'Merchant Name'
        },
        {
            id: 'accountNumber',
            type: 'text',
            label: 'Account number'
        },
        {
            id:'description',
            type: 'text',
            label: 'Transaction Description'
        }

    ]

    return (
        <div className='w-75 mx-auto'>
            <Helmet>
                <title>Post Transaction</title>
                <meta
                    name='description'
                    content='Post Transaction for Aline Financial'
                />
            </Helmet>
            <h1 className='display-5 mb-3 mt-5'>Post Transaction</h1>
            <hr className='mb-5'/>
            <Form data={formData} onSubmit={onSubmit} validationSchema={schema}/>
        </div>
    );
};

Index.propTypes = {};

export default Index;
