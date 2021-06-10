import React from 'react';
import { Button, Card, Pagination } from 'react-bootstrap';
import avatar from '../../Img/no-avatar.png'
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

            img{
                height: 75%;
                width: auto;
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

class Users extends React.Component {

    getUsers = (cPage, pSize) => {
        fetch(`https://social-network.samuraijs.com/api/1.0/users?page=${cPage}&count=${pSize}`)
            .then(response => response.json())
            .then(u => {
                this.props.setUsers(u.items)
                this.props.SetTotalCount(u.totalCount)
            })
    }
    componentDidMount() {
        this.getUsers(this.props.currentPage, this.props.pageSize)
    }
    onPageChanged = (p) => {
        this.props.setCurrentPage(p)
        this.getUsers(p, this.props.pageSize)
    }


    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
        let pages = []
        for (let i = (this.props.currentPage <= pagesCount - 2 ? this.props.currentPage - 2 : this.props.currentPage - 5); 
            i <= (this.props.currentPage <= pagesCount - 2 ? this.props.currentPage + 2 : this.props.currentPage); 
            i++) 
            {
                pages.push(i)
            }

        return (
            <CardStyle>
                <Pagination>
                    {this.props.currentPage > 5 && <>
                        <Pagination.Prev />
                        <Pagination.Item onClick={()=>{this.onPageChanged(1)}}>{1}</Pagination.Item>
                        <Pagination.Ellipsis/>
                    </> }
                    {
                        pages.map(p => <Pagination.Item className={p === this.props.currentPage && 'active'} onClick={()=>{this.onPageChanged(p)}}>
                                         {p}
                                        </Pagination.Item>)
                    }
                    {
                        this.props.currentPage < pagesCount - 5 && <>
                            <Pagination.Ellipsis />
                            <Pagination.Item>{pagesCount}</Pagination.Item>
                            <Pagination.Next />
                        </>
                    } 
                </Pagination>
                {
                    this.props.users.map((u) => {
                        return (
                            <Card key={u.id} >
                                <div className="cardInfo">
                                    <Card.Img variant="top" src={u.photos.small != null ? u.photos.small : avatar} />
                                    {u.followed
                                        ? <Button onClick={() => { this.props.unfollow(u.id) }} variant="primary">Unfollow</Button>
                                        : <Button onClick={() => { this.props.follow(u.id) }} variant="primary">Follow</Button>
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
}

export default Users;