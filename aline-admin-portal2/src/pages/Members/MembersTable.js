import React, {useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import Table from '../../components/Table'
import Modal from '../../components/Modal'
import API from '../../utils/API';
import MemberEditForm from './MemberEditForm';
import {Redirect} from 'react-router-dom';

const MembersTable = ({data}) => {
    const [modalDetails, setModalDetails] = useState({
        memberData: null,
        loading: true,
        memberId: null,
    })

    const [redirectDetails, setRedirectDetails] = useState({
        isRedirect: false,
        pathname: '/member/accounts',
        memberId: null,
    })


    const columns = useMemo(() => {

        const onEdit = async (e) => {
            e.preventDefault()
            setModalDetails({...modalDetails, loading: true})
            const membership = e.target.getAttribute('data-membership');
            const {data} = await API.Bank.getMemberByMembershipId(membership)
            setModalDetails({...modalDetails, memberData: data.applicant, loading: false, memberId: membership})
        }

        const onRedirect = (e) => {
            e.preventDefault()
            const memberId = e.target.getAttribute('data-memberid');
            setRedirectDetails({
                ...redirectDetails,
                isRedirect: true,
                memberId
            })
        }

        return [{
                Header: 'Membership Id',
                accessor: 'membershipId'
            },
            {
                Header: 'First name',
                accessor: 'applicant.firstName'
            },
            {
                Header: 'Last name',
                accessor: 'applicant.lastName'
            },
            {
                Header: 'Branch City',
                accessor: 'branch.city'
            },
            {
                Header: 'Edit',
                Cell: ({cell}) => {
                    const {row: original} = cell;
                    return (
                        <button className='btn btn-primary' onClick={onEdit}
                                data-bs-toggle='modal'
                                data-bs-target='#memberEdit'
                                data-membership={original.original.membershipId}
                        >
                            Edit
                        </button>

                    )
                }
            },
            {
                Header: 'Accounts',
                Cell: ({cell}) => {
                    const {row: original} = cell;
                    return (
                        <button className='btn btn-secondary'
                                data-memberid={original.original.applicant.id}
                                onClick={onRedirect}
                        >
                            View
                        </button>
                    )
                }
            }
        ]

    }, [modalDetails, redirectDetails])


    return (
        <div>
            {
                redirectDetails.isRedirect ? (
                    <Redirect push to={{
                        pathname: redirectDetails.pathname,
                        state: {memberId: redirectDetails.memberId}
                    }}/>
                ) : (
                    <Table data={data} columns={columns}/>
                )
            }

            <Modal modalId='memberEdit' title='Edit Member Details'>
                <MemberEditForm memberData={modalDetails.memberData} loading={modalDetails.loading}
                                membershipId={modalDetails.memberId}/>
            </Modal>
        </div>
    );
};

MembersTable.propTypes = {
    data: PropTypes.array
};

export default MembersTable;
