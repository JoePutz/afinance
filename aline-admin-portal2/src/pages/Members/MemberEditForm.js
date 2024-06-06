import React from 'react';
import PropTypes from 'prop-types';
import FormWithDefaults from '../../components/Form/FormWithDefaults';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import schema from '../../utils/Validation/MemberForm'
import API from '../../utils/API';

const MemberEditForm = ({memberData, loading, membershipId}) => {

    const onSubmit = async (data) => {
        console.log('Membership ID from edit form: ', membershipId)
        const update = {
            membershipId: membershipId,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            middleName: data.lastName,
            phone: data.phone,
            driversLicense: data.driversLicense,
            income: data.income,
            address: data.address,
            city: data.city,
            state: data.state,
            zipcode: data.zipcode,
            mailingAddress: data.mailingAddress,
            mailingCity: data.mailingCity,
            mailingState: data.mailingState,
            mailingZipcode: data.mailingZipcode
        }


        try {
            await API.Bank.updateMember(update)
        }catch (e) {
            console.error('errrrrorrrrr')
        }

        window.location.reload();
    }

    const dataFields = [
        {
            id: 'firstName',
            type: 'text',
            label: 'First Name'
        },
        {
            id: 'middleName',
            type: 'text',
            label: 'Middle Name'
        },
        {
            id: 'lastName',
            type: 'text',
            label: 'Last Name'
        },
        {
            id: 'income',
            type: 'income',
            label: 'Income'
        },
        {
            id: 'phone',
            type: 'phone',
            label: 'phone'
        },
        {
            id: 'email',
            type: 'email',
            label: 'Email'
        },
        {
            id: 'address',
            type: 'addressWithMailingOption',
            label: 'Address'
        }
    ]


    return (
        <div>
            {
                !loading? (
                    <FormWithDefaults data={dataFields}
                                      defaultValues={memberData}
                                      validationSchema={schema}
                                      onSubmit={onSubmit}/>
                ):
                    <FontAwesomeIcon icon='spinner' pulse={true}/>
            }
        </div>
    );
};

MemberEditForm.propTypes = {
    memberData: PropTypes.object,
    loading: PropTypes.bool,
    membershipId: PropTypes.string
};

export default MemberEditForm;
