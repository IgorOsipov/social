import { Button } from 'react-bootstrap';
import React from 'react';
import styled from 'styled-components';
import Contact from './Contact';

const ProfileDataStyles = styled.div`
    margin-top: .5rem;

    .editButton{
        padding: 0;
        border: 0;
        background-color: transparent;
        color: #5a5a5a;
        float: right;
        font-style: italic;

        &:hover, &:focus, &:active{
            text-decoration: underline;
        }
        &:focus, &:active{
            background-color: transparent !important;
            color: #5a5a5a !important;
            box-shadow: none !important;
        }
    }
`

const ProfileData = ({profile, isOwner, setEditProfileDataMode}) => {
    return (
        <ProfileDataStyles>
            <div>
                <strong>Looking for a job:</strong> 
                {profile.lookingForAJob ? ' yes' : ' no'} 
                {isOwner && <Button className="editButton" onClick={()=>setEditProfileDataMode(true)}>edit</Button>}
            </div>
            {profile.lookingForAJob && <div><strong>My professional skills:</strong> {profile.lookingForAJobDescription}</div>}
            <div><strong>About Me:</strong> {profile.aboutMe}</div>

            <div>
                <strong>Contacts:</strong>
                {Object.keys(profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
                })}
            </div>
        </ProfileDataStyles>
    )
}

export default ProfileData;