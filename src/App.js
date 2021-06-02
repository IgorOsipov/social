import React from 'react';
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Dialog from './Components/Dialogs/Dialog';
import Header from "./Components/Header/Header";
import Music from './Components/Music/Music';
import News from './Components/News/News';
import Profile from './Components/Profile/Profile';
import Settings from './Components/Settings/Settings';



const MainWrapper = styled.div`
    min-height: 100vh;
    border: 1px solid gray;
    background-color: #eee;
`

const App = (props) => {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <MainWrapper>
          <Switch>
            <Route path='/profile' render={ () => <Profile dispatch={props.dispatch} state={props.state.profilePage}/>} />
            <Route path='/dialogs' render={ () => <Dialog dispatch={props.dispatch} state={props.state.dialogsPage}/> } />
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
