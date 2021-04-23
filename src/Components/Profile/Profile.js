import React from 'react';
import styled from 'styled-components'
import MyPosts from './MyPosts/MyPosts';

const MainWrapper = styled.div`
    height: 100vh;
    border: 1px solid gray;
    background-color: #eee;
`

const Profile = () => {
    return (
    <MainWrapper>
        <MyPosts />
    </MainWrapper>
    )
}

export default Profile;