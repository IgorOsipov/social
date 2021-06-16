import React from 'react';
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import DialogContainer from './Components/Dialogs/DialogContainer';
import HeaderContainer from "./Components/Header/HeaderContainer";
import Login from './Components/Login/Login';
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
      <HeaderContainer />
      <Container>
        <MainWrapper>
          <Switch>
            <Route path='/profile/:id' render={ () => <ProfileContainer />} />
            <Route path='/dialogs' render={ () => <DialogContainer /> } />
            <Route path='/users' render={ () => <UsersContainer /> } />
            <Route path='/news' component={News} />
            <Route path='/music' component={Music} />
            <Route path='/settings' component={Settings} />
            <Route path='/login' component={Login} />
          </Switch>
        </MainWrapper>
      </Container>
    </BrowserRouter>
  );
}

export default App;
