import React, {useRef, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import SearchForm from './SearchForm';
import API from '../../utils/API';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import Pagination from '../../components/Table/Pagination';
import MembersTable from './MembersTable';

const Index = options => {
    const queryClient = useQueryClient();

    const [pages, setPages] = useState({page: 0})
    const {mutate} = useMutation(API.Bank.searchMembers, {
        onSuccess: () => {
            queryClient.invalidateQueries(['members', pages.page])
        }
    })

    const fetchMembers = async () => {

        const {data} = await API.Bank.searchMembers({...pages})
        return data;
    }

    const {data, error, isError, isLoading} = useQuery(
        ['members', pages.page],
        fetchMembers,
        {keepPreviousData: true, staleTime: 5000})

    const dropdownRef = useRef();

    const onDowntownRotate = () => {
        dropdownRef.current.classList.toggle('rotate-180')
    }

    const onSubmit = async (data) => {
        mutate(data)
    }


    return (
        <div className='w-75 mx-auto my-2 py-3'>
            <Helmet>
                <title>Members Management</title>
                <meta
                    name='description'
                    content='Members management for Aline Financial'
                />
            </Helmet>
            <h1 className='display-5'>Members Management</h1>

            <div className='mb-5 mt-3'>
                <div className='d-flex'>

                    <button type='button' className='btn btn-primary rounded-circle rotate me-2'
                            data-bs-toggle='collapse'
                            data-bs-target='#searchArea'
                            aria-expanded='false'
                            aria-controls='searchArea'
                            ref={dropdownRef}
                            onClick={onDowntownRotate}
                    >
                        <FontAwesomeIcon icon='chevron-up' rotation={180}/>
                    </button>
                    <div>
                        <h2 className='fs-4 fw-normal me-3'>Search</h2>
                    </div>
                </div>

                <div className='collapse pt-2' id='searchArea'>
                    <SearchForm onSubmit={onSubmit}/>
                </div>
            </div>

            <div className='text-start'>
                <Link className='btn btn-primary mb-3 '
                      to={{
                          pathname: '/member/create'
                      }}
                >
                    Add Member<FontAwesomeIcon icon='plus'/>
                </Link>
            </div>

            <div>
                {
                    isLoading || isError ?
                        <div>table is loading . . .{isError ? <span>error: {error.message}</span> : ''}</div> : (
                            <div>
                                <MembersTable data={data.content}/>
                                <Pagination data={data} setPagination={setPages}/>
                            </div>
                        )
                }
            </div>
        </div>
    );
};


export default Index;
