import React from 'react'
import { Button, Card, Pagination } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import avatar from '../../Img/no-avatar.png';
import styled from 'styled-components';

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
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    let pagPage = props.currentPage;
    let endPagPage = pagPage + 4;
    
    if(pagPage === 2){
        endPagPage = pagPage + 3;
        pagPage -= 1;
    }else if(pagPage === pagesCount - 1){
        endPagPage = pagPage + 1;
        pagPage -= 3;
    }else if(pagPage === pagesCount){
        endPagPage = pagesCount;
        pagPage = endPagPage - 4;
    }else if(pagPage > 2 && pagPage !== 1){
        endPagPage = pagPage + 2;
        pagPage -= 2;
    }

    for (let i = pagPage; i <= endPagPage; 
        i++) {
        pages.push(i)
    }

    return (
        <CardStyle>
            <Pagination>
                {
                    props.currentPage > 1 && <Pagination.Prev  onClick={() => { props.onPageChanged(props.currentPage - 1) }}/>
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
                    props.currentPage < pagesCount - 1 && <Pagination.Next   onClick={() => { props.onPageChanged(props.currentPage + 1) }}/>
                }
            </Pagination>
            {
                props.users.map((u) => {
                    return (
                        <Card key={u.id} >
                            <div className="cardInfo">
                                <NavLink to={`profile/${u.id}`}><Card.Img variant="top" src={u.photos.large != null ? u.photos.small : avatar} /></NavLink>
                                {u.followed
                                    ? <Button onClick={() => { props.unfollow(u.id) }} variant="primary">Unfollow</Button>
                                    : <Button onClick={() => { props.follow(u.id) }} variant="primary">Follow</Button>
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