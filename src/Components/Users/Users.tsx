import React, { useEffect } from 'react';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import User from './User';
import UsersSearchForm from './UsersSearchForm';
import { actions, FilterType, requestUsers } from '../../Redux/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPage, getIsFetching, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../Redux/usersSelectors';
import PreloaderImage from '../App/Preloader/Preloader';
import { useHistory } from 'react-router-dom';
import * as queryString from 'querystring';

const CardStyle = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    padding: 3%;

    .card{
        display: flex;
        flex-direction: row;
        width: 100%;
        padding: 3%;
        margin-bottom: 1%;

        .cardInfo{
            height: 300px;

            
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            
            a{
                width: 225px;
                height: 225px;
                img{
                    height: 100%;
                    width: auto;
                }
            }
            
            button{
                height: 15%;
                width: 100%;
            }
        }

        .card-body{
            padding: 0;
            padding-left: 5%;
        }
        
    }

    .pagination{
        cursor: pointer;
    }
`

type Props = {}


const Users: React.FC<Props> = () => {
    
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const users = useSelector(getUsers);
    const filter = useSelector(getUsersFilter);
    const isFetching = useSelector(getIsFetching);

    const history = useHistory();

    const dispatch = useDispatch();


    useEffect(()=>{
        const parsed = queryString.parse(history.location.search.substr(1)) as {term: string, page: string, size: string, friend: string};

        let actualFilter = {...filter}
        if(!!parsed.page) currentPage !== Number(parsed.page) && dispatch(actions.setCurrentPage(Number(parsed.page)));
        if(!!parsed.term) actualFilter.term !== parsed.term && dispatch(actions.setFilter({...actualFilter, term: parsed.term}));
        if(!!parsed.friend) actualFilter.friend !== parsed.friend as any && dispatch(actions.setFilter({...actualFilter, friend: parsed.friend as any}));
        if(!!parsed.size) pageSize !== Number(parsed.size) && dispatch(actions.setPageSize(Number(parsed.size)));
        // eslint-disable-next-line
    },[])

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter));
        history.push({
            pathname: '/users',
            search: `?page=${currentPage}&size=${pageSize}&term=${filter.term}&friend=${filter.friend}`
        });
        // eslint-disable-next-line
    }, [currentPage, pageSize, filter.term, filter.friend]);

    const onPageChanged = (p: { selected: number }) => {
        dispatch(actions.setCurrentPage(p.selected + 1));
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(actions.setFilter(filter));
    }

    return (
        <>
            {isFetching ? <PreloaderImage /> : null}
            <CardStyle>
                <UsersSearchForm filter={filter} onFilterChanged={onFilterChanged} />
                <ReactPaginate
                    forcePage={currentPage - 1}
                    breakLabel="..."
                    nextLabel=">"
                    previousLabel="<"
                    onPageChange={onPageChanged}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={1}
                    pageCount={Math.ceil(totalUsersCount / pageSize)}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                />
                {
                    users.map((u) => <User
                        key={u.id}
                        user={u}
                    />)
                }
            </CardStyle>
        </>
    )
}

export default Users;