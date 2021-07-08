import React from 'react';
import styled from 'styled-components';
import PaginationElement from '../App/Pagination/PaginationElement';
import User from './User';

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



const Users = (props) => {
    return (
        <CardStyle>
            <PaginationElement totalUsersCount={props.totalUsersCount} pageSize={props.pageSize} currentPage={props.currentPage} onPageChanged={props.onPageChanged} />
            {
                props.users.map((u) => <User key={u.id} user={u} {...props}/>)
            }
        </CardStyle>
    )
}

export default Users;