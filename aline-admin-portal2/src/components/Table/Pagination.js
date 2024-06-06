import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

const Pagination = ({data, setPagination}) => {
    // console.log('Pagination Data: ', data)
    const [tablePagination, setTablePagination] = useState({
        isFirst: false,
        isLast: false,
        canPrevious: false,
        canNext: false,
    })

    useEffect(() => {
        setTablePagination({
            isFirst: data.first,
            isLast: data.last,
            canPrevious: (data.number - 1) > 0,
            canNext: (data.number + 1) < data.totalPages,
        })
    }, [data])

    const goToFirstPage=(e) =>{
        e.preventDefault();
        setPagination({page: 0});
    }

    const goBackOne = (e) => {
        e.preventDefault();
        setPagination({page: data.number - 1});
    }
    const goForwardOne = (e) => {
        e.preventDefault();
        setPagination({page: data.number + 1});
    }
    const goToLastPage=(e) =>{
        e.preventDefault();
        setPagination({page: data.totalPages-1});
    }



    return (
        <div className=''>
            <nav aria-label='Table Pagination'>
                <ul className='pagination justify-content-center'>
                    <li className={`page-item ${tablePagination.canPrevious ? '' : 'disabled'}`} aria-label='Previous'>
                        <button className='page-link' onClick={goToFirstPage}>
                            <span aria-hidden='true'>&laquo;</span>
                        </button>
                    </li>
                    {
                        tablePagination.canPrevious ? (
                            <li className='page-item'>
                                <button className='page-link' onClick={goBackOne} >
                                    {data.number}
                                </button>
                            </li>
                        ) : ('')
                    }
                    <li className='page-item active'>
                        <button className='page-link active'>
                            {data.number + 1}
                        </button>
                    </li>

                    {
                        tablePagination.canNext ? (
                            <li className='page-item'>
                                <button className='page-link' onClick={goForwardOne}>
                                    {data.number + 2}
                                </button>
                            </li>
                        ) : ('')
                    }

                    <li className={`page-item ${tablePagination.canNext ? '' : 'disabled'}`} aria-label='Next'>
                        <button className='page-link' onClick={goToLastPage}>
                            <span aria-hidden='true'>&raquo;</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

Pagination.propTypes = {
    data: PropTypes.object
};

export default Pagination;
