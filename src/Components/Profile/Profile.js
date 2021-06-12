import React from 'react';
import { Row, Col } from 'react-bootstrap';
import avatar from '../../Img/no-avatar.png';
import PreloaderImage from '../App/Preloader/Preloader';
import MyPostsContainer from './MyPosts/MyPostsContainer';


const Profile = ({profile}) => {

    if(!profile){
        return <PreloaderImage />
    }

    return (
        <>
            <Row className="p-5">
                <Col xs={12} sm={4}>
                    <img alt='avatar' src={profile.photos.large != null ? profile.photos.large : avatar} />
                </Col>
                <Col xs={12} sm={8}>
                    <h1>{profile.fullName}</h1>
                    <div>{profile.aboutMe}</div>
                </Col>
            </Row>
            <MyPostsContainer />
        </>
    )
}

export default Profile;