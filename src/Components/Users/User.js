import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import avatar from '../../Img/no-avatar.png';


const User = ({user, onUnfollowClick, onFollowClick, isAuth, userId, followingInProgress}) => {
    return (
        <Card>
            <div className="cardInfo">
                <NavLink to={`profile/${user.id}`}><Card.Img variant="top" className="img-thumbnail" loading="lazy" src={user.photos.large || avatar} /></NavLink>
                {user.followed
                    ? <Button disabled={followingInProgress.some(id => id === user.id)}
                        onClick={() => { onUnfollowClick(user.id) }} variant="primary">Unfollow</Button>
                    : <Button disabled={followingInProgress.some(id => id === user.id) || (isAuth && user.id === userId)}
                        onClick={() => { onFollowClick(user.id) }} variant="primary">Follow</Button>
                }
            </div>

            <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>{user.status}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default User;