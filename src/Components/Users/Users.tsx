import React from 'react';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import User from './User';
import { usersType } from '../../Types/types';

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
`

type Props = {
    users: Array<usersType>
    followingInProgress: Array<number>
    onFollowClick: (userId: number) => void
    onUnfollowClick: (userId: number) => void
    onPageChanged: (p: { selected: number }) => void
    pageSize: number
    totalUsersCount: number
    isAuth: boolean
    userId: number | null
}


const Users: React.FC<Props> = ({ userId, users, followingInProgress, onFollowClick, onUnfollowClick, onPageChanged, pageSize, totalUsersCount, isAuth }) => {
    return (
        <CardStyle>
            <ReactPaginate
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
                    onFollowClick={onFollowClick}
                    onUnfollowClick={onUnfollowClick}
                    followingInProgress={followingInProgress}
                    isAuth={isAuth}
                    userId={userId}
                />)
            }
        </CardStyle>
    )
}

export default Users;