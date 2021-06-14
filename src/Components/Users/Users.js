import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import avatar from '../../Img/no-avatar.png';
import styled from 'styled-components';
import PaginationElement from '../App/Pagination/PaginationElement';

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
            <PaginationElement totalUsersCount={props.totalUsersCount} pageSize={props.pageSize} currentPage={props.currentPage} onPageChanged={props.onPageChanged}/>
            {
                props.users.map((u) => {
                    return (
                        <Card key={u.id} >
                            <div className="cardInfo">
                                <NavLink to={`profile/${u.id}`}><Card.Img variant="top" src={u.photos.large != null ? u.photos.large : avatar} /></NavLink>
                                {u.followed
                                    ? <Button disabled={props.followingInProgress.some(id=>id===u.id)} onClick={() => {
                                        props.toggleFollowingInProgress(true, u.id)
                                        fetch(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {method: 'DELETE', credentials: 'include', headers: {"API-KEY":'6f029e5f-48f9-458c-ac33-6b805ca9e34e'}})
                                        .then(response => response.json())    
                                        .then(r=>{
                                                if(r.resultCode === 0){
                                                    console.log(r)
                                                    props.unfollow(u.id)
                                                }
                                                props.toggleFollowingInProgress(false, u.id)
                                            }) 
                                        }} variant="primary">Unfollow</Button>
                                    : <Button disabled={props.followingInProgress.some(id=>id===u.id)} onClick={() => { 
                                        props.toggleFollowingInProgress(true, u.id)
                                        fetch(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {method: 'POST', credentials: 'include', headers: {"API-KEY":'6f029e5f-48f9-458c-ac33-6b805ca9e34e'}})
                                        .then(response => response.json())    
                                        .then(r=>{
                                                if(r.resultCode === 0){
                                                    console.log(r)
                                                    props.follow(u.id)
                                                }
                                                props.toggleFollowingInProgress(false, u.id)
                                            }) 
                                        props.follow(u.id) 
                                    }} variant="primary">Follow</Button>
                                }
                            </div>

                            <Card.Body>
                                <Card.Title>{u.name}</Card.Title>
                                <Card.Text>{u.status}</Card.Text>
                            </Card.Body>
                        </Card>
                    )
                })
            }
        </CardStyle>
    )
}

export default Users;