import React, {useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import Table from '../../components/Table'
import Modal from '../../components/Modal'
import UserEditForm from './UserEditForm';
import API from '../../utils/API';


const UserTable = ({data}) => {
    const [modalDetails, setModalDetails] = useState({
        userType: null,
        userData: null,
        loading: true
    })

    const columns = useMemo(() => {

        const onEdit = async (e) => {
            setModalDetails({...modalDetails, loading: true})
            e.preventDefault();
            const userId = e.target.getAttribute('data-userid');

            const userData = await API.User.getUserById(userId);

            setModalDetails({...modalDetails, userData: userData.data, loading: false})

        }
        return [
            {
                Header: 'User Id',
                accessor: 'id'
            },
            {
                Header: 'First name',
                accessor: 'firstName',
            },
            {
                Header: 'Last Name',
                accessor: 'lastName'
            },
            {
                Header: 'Username',
                accessor: 'username'
            },
            {
                Header: 'Role',
                accessor: 'role'
            },
            {
                Header: 'Edit',
                Cell: ({cell}) => {
                    const {row: original} = cell;
                    return (
                        <button className='btn btn-primary' onClick={onEdit}
                                data-bs-toggle='modal'
                                data-bs-target='#userEdit'
                                data-userid={original.original.id}
                        >
                            Edit
                        </button>

                    )
                }
            }

        ]
    }, [modalDetails])

    return (
        <div>
            <Table data={data} columns={columns}/>
            <Modal modalId='userEdit' title='Edit'>
                <UserEditForm userData={modalDetails.userData} loading={modalDetails.loading}/>
            </Modal>
        </div>
    );
};

UserTable.propTypes = {
    data: PropTypes.array
};

export default UserTable;
