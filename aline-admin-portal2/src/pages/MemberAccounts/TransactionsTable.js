import React, {useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import Table from '../../components/Table'
import {useQuery} from 'react-query';
import API from '../../utils/API';

const TransactionsTable = ({accountId}) => {

    const [pages, setPages] = useState({page: 0})

    const fetchTransactions = async () => {
        const {data} = await API.Transaction.getTransactionByAccountId(accountId, pages)
        return data;
    }

    const {data, error, isError, isLoading} = useQuery(
        ['accountTransaction', pages.page],
        fetchTransactions,
        {keepPreviousData: true, staleTime: 5000})

    const columns = useMemo(() => {
        return [
            {
                Header: 'ID',
                accessor: 'id'
            },
            {
                Header: 'Amount',
                accessor: 'amount'
            },
            {
                Header: 'Type',
                accessor: 'Type'
            },
            {
                Header: 'Status',
                accessor: 'Status'
            },
            {
                Header: 'Vendor',
                accessor: 'merchant'
            }
        ]
    }, [])

    return (
        <div>
            {
                isLoading ? 'Loading' : (
                    <Table data={data.content} columns={columns}/>
                )
            }
        </div>
    );
};

TransactionsTable.propTypes = {
    accountId: PropTypes.number
};

export default TransactionsTable;
