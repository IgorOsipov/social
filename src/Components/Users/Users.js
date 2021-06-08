import React from 'react';
import { Button, Card } from 'react-bootstrap';



const Users = (props) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
            {
                props.users.map(u => {
                    return (
                        <Card key={u.id} style={{ width: '25%'}}>
                            <Card.Img style={{ width: '100%', height: 'auto' }} variant="top" src="https://cdn.worldvectorlogo.com/logos/fdf.svg" />
                            <Card.Body>
                                <Card.Title>{u.name}</Card.Title>
                                <Card.Text>{u.status}</Card.Text>
                                <Card.Text>{u.location.city + ", " + u.location.country }</Card.Text>
                            </Card.Body>
                            {u.followed 
                                ? <Button onClick={() => {props.unfollow(u.id)}} variant="primary">Unfollow</Button> 
                                : <Button onClick={() => {props.follow(u.id)}} variant="primary">Follow</Button>
                            }
                        </Card>
                    )
                })
            }
        </div>
    )
}

export default Users;