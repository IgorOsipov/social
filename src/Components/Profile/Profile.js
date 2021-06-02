import React from 'react';
import MyPosts from './MyPosts/MyPosts';


const Profile = (props) => {
    return (
        <MyPosts dispatch={props.dispatch} state={props.state}/>
    )
}

export default Profile;