import React from 'react';
import { Container } from "react-bootstrap";
import Header from "./Components/Header/Header"
import Profile from './Components/Profile/Profile';


const App = () => {
  return (
    <>
      <Header />
      <Container>
        <Profile />
      </Container>
    </>
  );
}

export default App;
