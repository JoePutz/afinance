import React from 'react';
import Form from '../../components/Form'
import schema from '../../utils/Validation/AdminForm'
import API from '../../utils/API';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const AdminForm = () => {
    const MySwal = withReactContent(Swal);

    const onSubmit = async (data) => {
        const reqBody = {...data, role: 'admin'}

        try {
            const res = await API.User.create(reqBody)
            if(res.status===201){
                await MySwal.fire({
                    title: <strong>Success</strong>,
                    html: <p>Admin user created</p>,
                    icon: 'success',
                })
            }else {
                await MySwal.fire({
                    title: <strong>Oops!</strong>,
                    html: <p>{res.message || 'We\'re checking out what went wrong' }</p>,
                    icon: 'error',
                })
            }
        }catch (e){
            await MySwal.fire({
                title: <strong>Oops!</strong>,
                html: <p>Please check your network</p>,
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const data = [
        {
            id: 'firstName',
            type: 'text',
            label: 'First Name'
        },
        {
            id: 'lastName',
            type: 'text',
            label: 'Last name'
        },
        {
            id: 'username',
            type: 'text',
            label: 'Username'
        },
        {
            id: 'password',
            type: 'password',
            label: 'Password'
        },
        {
            id: 'phone',
            type: 'phone',
            label: 'Phone'
        },
        {
            id: 'email',
            type: 'email',
            label: 'Email'
        }
    ]

    return (
        <div>
            <h1 className='display-5 mb-3 mt-5'>Create an Admin</h1>
            <hr className = 'mb-5'/>
            <Form data={data} onSubmit={onSubmit} validationSchema={schema}/>

        </div>
    );
};

export default AdminForm;
