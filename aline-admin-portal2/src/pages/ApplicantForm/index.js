import React from 'react';
import Form from '../../components/Form'
import schema from '../../utils/Validation/ApplicantForm'
import API from '../../utils/API';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {Helmet} from 'react-helmet';

const Index = () => {
    const MySwal = withReactContent(Swal);

    const onSubmit = async (data) => {
        const dob = data.dateOfBirth
        const formattedDate = dob.toISOString().slice(0, 10)
        const mailing = {
            mailingAddress: data.mailingAddress === '' ? data.address : data.mailingAddress,
            mailingCity: data.mailingCity ?? data.city,
            mailingState: data.mailingState === 'Select' ? data.state : data.mailingState,
            mailingZipcode: data.mailingZipcode ?? data.zipcode,
        }
        const intIncome = data.income * 100;

        const applicationRequest = {
            applicationType: data.applicationType,
            applicants: [{
                ...data,
                income: intIncome,
                dateOfBirth: formattedDate,
                ...mailing
            }]
        }
        delete applicationRequest.applicants[0]?.applicationType;
        try {

            console.log('applicant Request: ', applicationRequest)
            const res = await API.Application.newApplicant(applicationRequest)
            if (res.status === 201) {
                await MySwal.fire({
                    title: <strong>Success</strong>,
                    html: <p>Applicant approved</p>,
                    icon: 'success',
                })
            } else {
                await MySwal.fire({
                    title: <strong>Denied</strong>,
                    html: <p>{res.message || 'We\'re checking out what went wrong'}</p>,
                    icon: 'error',
                })
            }

        } catch (e) {
            await MySwal.fire({
                title: <strong>Oops!</strong>,
                html: <p>Please check your network</p>,
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            })
        }

    }


    const form = [
        {
            id: 'ApplicantForm',
            type: 'title',
            label: 'Applicant Form'
        },
        {
            id: 'applicationType',
            type: 'select',
            label: 'Application Type',
            options: [
                {value: 'CHECKING_AND_SAVINGS', name: 'Checking & Savings'},
                {value: 'CHECKING', name: 'Checking'},
                {value: 'SAVINGS', name: 'Savings'}
            ]
        },
        {
            id: 'personalSection',
            type: 'sectionHeader',
            label: 'Personal Information'
        },
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
            label: 'Last name'
        },
        {
            id: 'dateOfBirth',
            type: 'date',
            label: 'DOB'
        },
        {
            id: 'gender',
            type: 'select',
            label: 'Gender',
            options: [
                {value: 'OTHER', name: 'Other'},
                {value: 'FEMALE', name: 'Female'},
                {value: 'MALE', name: 'Male'}
            ]
        },
        {
            id: 'socialSecurity',
            type: 'ssn',
            label: 'Social Security Number'
        },
        {
            id: 'driversLicense',
            type: 'text',
            label: 'Drivers License'
        },
        {
            id: 'income',
            type: 'income',
            label: 'Annual Income'
        },
        {
            id: 'contactSection',
            type: 'sectionHeader',
            label: 'Contact Information'
        },
        {
            id: 'email',
            type: 'email',
            label: 'Email'
        },
        {
            id: 'phone',
            type: 'phone',
            label: 'Phone'
        },
        {
            id: 'addressSection',
            type: 'sectionHeader',
            label: 'Address'
        },
        {
            id: 'address',
            type: 'addressWithMailingOption',
            label: 'Address'
        }

    ]


    return (
        <div className='w-75 mx-auto pb-5 p-3 '>
            <Helmet>
                <title>New Applicant</title>
                <meta
                    name='description'
                    content='New applicant form for Aline Financial'
                />
            </Helmet>
            <Form onSubmit={onSubmit} data={form} validationSchema={schema} defaultValues={{}}/>
        </div>
    );
};

Index.propTypes = {};

export default Index;
