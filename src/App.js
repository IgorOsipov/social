import React from 'react';
import { Container } from "react-bootstrap";
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { initializeApp } from './Redux/appReducer';
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
    /* background-color: #f7f7f7; */
`

class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp();
  }

  render(){
    if(!this.props.initialized) return null

    return (
      <BrowserRouter>
        <HeaderContainer />
        <Container>
          <MainWrapper>
            <Switch>
              <Route exact path='/profile/:id?' component={ProfileContainer} />
              <Route path='/dialogs' component={DialogContainer} />
              <Route path='/users' component={UsersContainer} />
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
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default connect(mapStateToProps, { initializeApp })(App)

