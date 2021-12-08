import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import avatar from '../../Img/no-avatar.png';
import { getIsAuth, getUserId } from '../../Redux/authSelectors';
import { followUser, unfollowUser } from '../../Redux/usersReducer';
import { getFollowingInProgress } from '../../Redux/usersSelectors';
import { usersType } from '../../Types/types';

type Props = {
    user: usersType
}

const User: React.FC<Props> = ({user}) => {
    
    const followingInProgress = useSelector(getFollowingInProgress);
    const isAuth = useSelector(getIsAuth);
    const currentUserId = useSelector(getUserId);

    const dispatch = useDispatch();

    const onFollowClick = (userId: number) => {
        dispatch(followUser(userId));
    }

    const onUnfollowClick = (userId: number) => {
        dispatch(unfollowUser(userId));
    }
    
    return (
        <Card>
            <div className="cardInfo">
                <NavLink to={`profile/${user.id}`}>
                    <Card.Img variant="top" className="img-thumbnail" loading="lazy" src={user.photos.large || avatar} />
                </NavLink>
                {user.followed
                    ? <Button disabled={followingInProgress.some(id => id === user.id)}
                        onClick={() => { onUnfollowClick(user.id) }} variant="primary">Unfollow</Button>
                    : <Button disabled={followingInProgress.some(id => id === user.id) || (isAuth && user.id === currentUserId)}
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