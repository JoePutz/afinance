import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Modal from '../../components/Modal'
import {SelectUserType} from './SelectUserType';
import {Helmet} from 'react-helmet';
import {useQuery} from 'react-query'
import API from '../../utils/API';
import UserTable from './UserTable';
import Pagination from '../../components/Table/Pagination';

const Index = () => {
    const [pages, setPages] = useState({page: 0})

    const fetchUsers = async () => {
        const {data} = await API.User.getUsers(pages)
        return data;
    }

    const {data, error, isError, isLoading} = useQuery(
        ['users', pages.page],
        fetchUsers,
        {keepPreviousData: true, staleTime: 5000})


    return (
        <div className='w-75 mx-auto my-2 py-3 '>
            <Helmet>
                <title>User Management</title>
                <meta
                    name='description'
                    content='User management for Aline Financial'
                />
            </Helmet>
            <h1 className='display-5'>Users Management</h1>
            <Modal modalId='userModal' title='Create a User'>
                <p>Select User type to create: </p>
                <SelectUserType/>
            </Modal>
            <div className='my-2'>
                <button className='btn btn-primary ' data-bs-toggle='modal' data-bs-target='#userModal'>
                    <span>Create user<FontAwesomeIcon icon='plus' className='ms-2'/></span>
                </button>

            </div>

            <div>
                {
                    isLoading || isError?
                        <div>table is loading . . .{isError? <span>error: {error.message}</span>:''}</div> : (
                            <div>
                                <UserTable data={data.content}/>
                                <Pagination data={data} setPagination={setPages}/>
                            </div>
                        )
                }
            </div>
        </div>
    );
};


export default Index;
