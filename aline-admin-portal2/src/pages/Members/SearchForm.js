import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../components/Form'
import validationSchema from '../../utils/Validation/SearchForm'

const SearchForm = ({onSubmit}) => {
    const searchCriteria= [
        {
            id: 'searchName',
            type: 'text',
            label: 'First/Middle/Last name'
        },
        {
            id: 'searchId',
            type: 'number',
            label: 'Membership/Applicant Id'
        },
        {
            id:'floorAmount',
            type: 'number',
            label: 'Accounts with at least'
        },
        {
            id:'ceilingAmount',
            type: 'number',
            label: 'Accounts with at most'
        },
        {
            id: 'hasChecking',
            type: 'checkbox',
            label: 'Members with Checking Accounts'
        },
        {
            id: 'hasSavings',
            type: 'checkbox',
            label: 'Members with Savings Accounts'
        },
        {
            id: 'isPrimary',
            type: 'checkbox',
            label: 'Primary Account Holders'
        },
        {
            id: 'accountStatus',
            type: 'select',
            label: 'Account Status',
            options: [
                {value: '', name: 'Any'},
                {value: 'active', name: 'Active'},
                {value: 'pending', name: 'Pending'},
                {value: 'denied', name: 'Denied'}
            ]
        }

    ]

    return (
        <Form data={searchCriteria} onSubmit={onSubmit} validationSchema={validationSchema}/>
    );
};

SearchForm.propTypes = {
    onSubmit: PropTypes.func
};

export default SearchForm;
