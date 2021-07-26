import React from 'react';
import { Row, Col } from 'react-bootstrap';
import avatar from '../../Img/no-avatar.png';
import PreloaderImage from '../App/Preloader/Preloader';
import Contact from './Contact';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileStatus from './ProfileStatus';

const Profile = ({profile, status, updateStatus, preloader, isAuth, userId, currentProfileId}) => {

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
                    <h1 className=''>{profile.fullName}</h1>
                    <ProfileStatus currentProfileId={currentProfileId} isAuth={isAuth} userId={userId} updateStatus={updateStatus} status={status} />
                    
                    <div className="mt-2"><strong>Looking for a job:</strong> {profile.lookingForAJob ? 'yes' : 'no'}</div>
                    {profile.lookingForAJob && <div><strong>My professional skills:</strong> {profile.lookingForAJobDescription}</div>}
                    <div><strong>About Me:</strong> {profile.aboutMe}</div>

                    <div>
                        <strong>Contacts:</strong> 
                        {Object.keys(profile.contacts).map(key => {
                            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                        })}
                    </div>
                </Col>
            </Row>
            <MyPostsContainer />
        </>
    )
}



export default Profile;