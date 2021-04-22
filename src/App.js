import React from 'react';
import { Container } from "react-bootstrap";
import Header from "./Components/Header"


const App = () => {
  return (
    <>
      <Header />
      <Container>
        <div style={{height: "100vh", border: "1px solid gray", backgroundColor: "#eee"}}></div>
      </Container>
    </>
  );
}

export default App;
