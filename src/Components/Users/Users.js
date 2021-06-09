import React from 'react';
import { Button, Card } from 'react-bootstrap';
import avatar from '../../Img/no-avatar.png'
import styled from 'styled-components';

const CardStyle = styled.div`
    display: flex;
    justify-content: flex-start;
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

    componentDidMount() {
        fetch('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => response.json())
            .then(u => {
                this.props.setUsers(u.items)
            })
    }


    render() {
        return (
            <CardStyle>
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