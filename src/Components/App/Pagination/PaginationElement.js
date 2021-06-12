import React from 'react';
import { Pagination } from 'react-bootstrap';


const PaginationElement = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    let pagPage = props.currentPage;
    let endPagPage = pagPage + 4;

    if (pagPage === 2) {
        endPagPage = pagPage + 3;
        pagPage -= 1;
    } else if (pagPage === pagesCount - 1) {
        endPagPage = pagPage + 1;
        pagPage -= 3;
    } else if (pagPage === pagesCount) {
        endPagPage = pagesCount;
        pagPage = endPagPage - 4;
    } else if (pagPage > 2 && pagPage !== 1) {
        endPagPage = pagPage + 2;
        pagPage -= 2;
    }

    for (let i = pagPage; i <= endPagPage;
        i++) {
        pages.push(i)
    }

    return (
        <Pagination>
            {
                props.currentPage > 1 && <Pagination.Prev onClick={() => { props.onPageChanged(props.currentPage - 1) }} />
            }
            {props.currentPage > 3 && <>
                <Pagination.Item onClick={() => { props.onPageChanged(1) }}>{1}</Pagination.Item>
                <Pagination.Ellipsis />
            </>}
            {
                pages.map(p => <Pagination.Item key={p} className={p === props.currentPage && 'active'} onClick={() => { props.onPageChanged(p) }}>
                    {p}
                </Pagination.Item>)
            }
            {
                props.currentPage < pagesCount - 3 && <>
                    <Pagination.Ellipsis />
                    <Pagination.Item onClick={() => { props.onPageChanged(pagesCount) }}>{pagesCount}</Pagination.Item>

                </>
            }
            {
                props.currentPage < pagesCount - 1 && <Pagination.Next onClick={() => { props.onPageChanged(props.currentPage + 1) }} />
            }
        </Pagination>
    )
}

export default PaginationElement