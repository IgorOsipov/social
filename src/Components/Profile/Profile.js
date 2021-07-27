import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import avatar from '../../Img/no-avatar.png';
import PreloaderImage from '../App/Preloader/Preloader';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileData from './ProfileData';
import ProfileDataForm from './ProfileDataForm';
import ProfileStatus from './ProfileStatus';



const Profile = ({ profile, status, updateStatus, preloader, isAuth, userId, isOwner, savePhoto, saveProfile }) => {

    const [editProfileDataMode, setEditProfileDataMode] = useState(false);

    if (!profile || preloader) {
        return <PreloaderImage />
    }

    const onNewPhotoSelected = (e) => {
        if (e.target.files.length) {

            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData) => {
        saveProfile(formData);
        setEditProfileDataMode(false);
    }

    return (
        <>
            <Row className="p-5">
                <Col sm={12} md={6} lg={5} xl={4}>
                    <img className="img-thumbnail" alt='avatar' src={profile.photos.large || avatar} />
                    {isOwner && <input className="mt-1" type={"file"} onChange={onNewPhotoSelected} />}
                </Col>
                <Col sm={12} md={6} lg={7} xl={8}>
                    <h1 className=''>{profile.fullName}</h1>
                    <ProfileStatus isOwner={isOwner} isAuth={isAuth} userId={userId} updateStatus={updateStatus} status={status} />
                    {!editProfileDataMode 
                        ? <ProfileData profile={profile} setEditProfileDataMode={setEditProfileDataMode} isOwner={isOwner}/> 
                        : <ProfileDataForm initialValues={profile} profile={profile} setEditProfileDataMode={setEditProfileDataMode} onSubmit={onSubmit} />
                    }
                </Col>
            </Row>
            <MyPostsContainer />
        </>
    )
}



export default Profile;