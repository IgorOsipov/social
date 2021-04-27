import React from 'react';
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Dialog from './Components/Dialogs/Dialog';
import Header from "./Components/Header/Header";
import Profile from './Components/Profile/Profile';



const MainWrapper = styled.div`
    height: 100vh;
    border: 1px solid gray;
    background-color: #eee;
`

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <MainWrapper>
          <Switch>
            <Route path='/profile' component={Profile} />
            <Route path='/dialogs' component={Dialog} />
          </Switch>
        </MainWrapper>
      </Container>
    </BrowserRouter>
  );
}

export default App;
