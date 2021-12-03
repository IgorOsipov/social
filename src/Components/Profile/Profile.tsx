import React, { ChangeEvent, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import avatar from '../../Img/no-avatar.png';
import { profileType } from '../../Types/types';
import PreloaderImage from '../App/Preloader/Preloader';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileData from './ProfileData';
import ProfileDataForm from './ProfileDataForm';
import ProfileStatus from './ProfileStatus';

type PropsType = {
    profile: profileType | null
    status: string
    preloader: boolean 
    isAuth: boolean
    userId: number | null
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (formData: profileType) => Promise<any>
    updateStatus: (status: string) => void
}

const Profile: React.FC<PropsType> = ({ profile, status, updateStatus, preloader, isAuth, userId, isOwner, savePhoto, saveProfile }) => {

    const [editProfileDataMode, setEditProfileDataMode] = useState(false);

    if (!profile) {
        return <PreloaderImage />
    }

    const onNewPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {

            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData: profileType) => {
        saveProfile(formData).then(() => {
            setEditProfileDataMode(false);
        });
    }

    return (
        <>
            {preloader && <PreloaderImage />}
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