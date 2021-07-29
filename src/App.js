import React, {Suspense} from 'react';
import { Container } from "react-bootstrap";
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { initializeApp } from './Redux/appReducer';
import HeaderContainer from "./Components/Header/HeaderContainer";
import { LinearProgress } from '@material-ui/core';
const DialogContainer = React.lazy(() => import('./Components/Dialogs/DialogContainer'));
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import('./Components/Users/UsersContainer'));
const Settings = React.lazy(() => import('./Components/Settings/Settings'));
const News = React.lazy(() => import('./Components/News/News'));
const Music = React.lazy(() => import('./Components/Music/Music'));
const Login = React.lazy(() => import('./Components/Login/Login'));

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
    if(!this.props.initialized) return <LinearProgress />

    return (
      <BrowserRouter>
        <HeaderContainer />
        <Container>
          <MainWrapper>
            <Switch>
                <Route exact path='/'><Redirect to='/profile'/></Route>
                <Route exact path='/profile/:id?' render={() => <Suspense fallback={<LinearProgress />}> <ProfileContainer /> </Suspense>} />
                <Route path='/dialogs' render={() => <Suspense fallback={<LinearProgress />}> <DialogContainer /> </Suspense>} />
                <Route path='/users' render={() => <Suspense fallback={<LinearProgress />}> <UsersContainer /> </Suspense>} />
                <Route path='/news' render={() => <Suspense fallback={<LinearProgress />}> <News /> </Suspense>} />
                <Route path='/music' render={() => <Suspense fallback={<LinearProgress />}> <Music /> </Suspense>} />
                <Route path='/settings' render={() => <Suspense fallback={<LinearProgress />}> <Settings /> </Suspense>} />
                <Route path='/login' render={() => <Suspense fallback={<LinearProgress />}> <Login /> </Suspense>} />              
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

