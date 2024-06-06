import React from 'react';
import PropTypes from 'prop-types';
import FormWithDefaults from '../../components/Form/FormWithDefaults';
import userFormDefaults from '../../utils/Validation/userFormDefaults';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const UserEditForm = ({userData, loading}) => {
    const onSubmit = (data) => {
        console.log(data)
    }

    const dataFields = [
        {
            id: 'id',
            type: 'text',
            label: 'User Id',
            disabled: true
        },
        {
            id: 'email',
            type: 'email',
            label: 'Email'
        },
        {
            id: 'firstName',
            type: 'text',
            label: 'First Name'
        },
        {
            id: 'lastName',
            type: 'text',
            label: 'Last Name'
        },
        {
            id: 'role',
            type: 'select',
            label: 'Role',
            options: [
                {value: 'ADMINISTRATOR', name: 'Admin'},
                {value: 'MEMBER', name: 'Member'},
                {value: 'EMPLOYEE', name: 'Employee'}
            ],
            disabled: true
        },
        {
            id: 'username',
            type: 'text',
            label: 'Username'
        }
    ]

    return (
        <div>
            {
                !loading ? (
                        <FormWithDefaults data={dataFields}
                                          defaultValues={userData}
                                          validationSchema={userFormDefaults}
                                          onSubmit={onSubmit}/>
                    ) :
                    <FontAwesomeIcon icon='spinner' pulse={true}/>
            }

        </div>
    );
};

UserEditForm.propTypes = {
    userData: PropTypes.object,
    loading: PropTypes.bool
};

export default UserEditForm;
