import React from 'react';
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import DialogContainer from './Components/Dialogs/DialogContainer';
import Header from "./Components/Header/Header";
import Music from './Components/Music/Music';
import News from './Components/News/News';
import ProfileContainer from './Components/Profile/ProfileContainer';
import Settings from './Components/Settings/Settings';
import UsersContainer from './Components/Users/UsersContainer';



const MainWrapper = styled.div`
    min-height: 100vh;
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
            <Route path='/profile' render={ () => <ProfileContainer />} />
            <Route path='/dialogs' render={ () => <DialogContainer /> } />
            <Route path='/users' render={ () => <UsersContainer /> } />
            <Route path='/news' component={News} />
            <Route path='/music' component={Music} />
            <Route path='/settings' component={Settings} />
          </Switch>
        </MainWrapper>
      </Container>
    </BrowserRouter>
  );
}

export default App;
