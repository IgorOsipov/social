import React from 'react';
import { Row, Col } from 'react-bootstrap';
import avatar from '../../Img/no-avatar.png';
import PreloaderImage from '../App/Preloader/Preloader';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileStatus from './ProfileStatus';

const Profile = ({profile, status, updateStatus, preloader}) => {

    if(!profile || preloader){
        return <PreloaderImage />
    }
    
    return (
        <>
            <Row className="p-5">
                <Col sm={12} md={6} lg={5} xl={4}>
                    <img alt='avatar' src={profile.photos.large != null ? profile.photos.large : avatar} />
                </Col>
                <Col sm={12} md={6} lg={7} xl={8}>
                    <h1 className='ml-2'>{profile.fullName}</h1>
                    <ProfileStatus updateStatus={updateStatus} status={status} />
                </Col>
            </Row>
            <MyPostsContainer />
        </>
    )
}

export default Profile;