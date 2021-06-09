import React from 'react';
import { Button, Card } from 'react-bootstrap';
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
        margin-bottom: 0;

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


const Users = (props) => {
    return (
        <CardStyle>
            {
                props.users.map((u) => {
                    return (
                        <Card key={u.id} >
                            <div className="cardInfo">
                                <Card.Img variant="top" src="https://cdn.worldvectorlogo.com/logos/fdf.svg" />
                                {u.followed
                                    ? <Button onClick={() => { props.unfollow(u.id) }} variant="primary">Unfollow</Button>
                                    : <Button onClick={() => { props.follow(u.id) }} variant="primary">Follow</Button>
                                }
                            </div>

                            <Card.Body>
                                <Card.Title>{u.name}</Card.Title>
                                <Card.Text>{u.status}</Card.Text>
                                <Card.Text>{u.location.city + ", " + u.location.country}</Card.Text>
                            </Card.Body>
                        </Card>
                    )
                })
            }
        </CardStyle>
    )
}

export default Users;