import React from 'react';
import { Container } from "react-bootstrap";
import Dialog from './Components/Dialogs/Dialog';
import styled from 'styled-components'
import Header from "./Components/Header/Header";
import Profile from './Components/Profile/Profile';


const MainWrapper = styled.div`
    height: 100vh;
    border: 1px solid gray;
    background-color: #eee;
`

const App = () => {
  return (
    <>
      <Header />
      <Container>
        <MainWrapper>
          {/* <Profile /> */}
          <Dialog />
        </MainWrapper>
      </Container>
    </>
  );
}

export default App;
