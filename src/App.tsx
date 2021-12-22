import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { initializeApp } from './Redux/appReducer';
import HeaderContainer from "./Components/Header/HeaderContainer";
import { Container, LinearProgress, makeStyles, Paper } from '@material-ui/core';
import Chat from './Components/App/Chat/Chat';
import { getIsInitialized } from './Redux/appSelectors';
const DialogContainer = React.lazy(() => import('./Components/Dialogs/DialogContainer'));
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'));
const Users = React.lazy(() => import('./Components/Users/Users'));
const Settings = React.lazy(() => import('./Components/Settings/Settings'));
const News = React.lazy(() => import('./Components/News/News'));
const Music = React.lazy(() => import('./Components/Music/Music'));
const Login = React.lazy(() => import('./Components/Login/Login'));

const useStyle = makeStyles({
    root: {
      minHeight: '94vh'
    }
});
    
const App = () => {

  const classes = useStyle();

  const isInitialized = useSelector(getIsInitialized);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(initializeApp());
  })

  return (
    isInitialized ? 
    <BrowserRouter>
      <HeaderContainer />
      <Container maxWidth="lg">
        <Paper elevation={12} className={classes.root}>
          <Switch>
            <Route exact path='/'><Redirect to='/profile' /></Route>
            <Route exact path='/profile/:id?' render={() => <Suspense fallback={<LinearProgress />}> <ProfileContainer /> </Suspense>} />
            <Route path='/dialogs' render={() => <Suspense fallback={<LinearProgress />}> <DialogContainer /> </Suspense>} />
            <Route path='/users' render={() => <Suspense fallback={<LinearProgress />}> <Users /> </Suspense>} />
            <Route path='/news' render={() => <Suspense fallback={<LinearProgress />}> <News /> </Suspense>} />
            <Route path='/music' render={() => <Suspense fallback={<LinearProgress />}> <Music /> </Suspense>} />
            <Route path='/settings' render={() => <Suspense fallback={<LinearProgress />}> <Settings /> </Suspense>} />
            <Route path='/login' render={() => <Suspense fallback={<LinearProgress />}> <Login /> </Suspense>} />
            <Route path='*' render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </Paper>
      </Container>
      <Chat />
    </BrowserRouter>
    : <LinearProgress />
  );
}


export default App;