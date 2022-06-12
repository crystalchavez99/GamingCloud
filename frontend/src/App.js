// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import SplashPage from "./components/SplashPage";
import UploadPage from "./components/UploadPage";
import ListSongPage from "./components/ListSongPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SongDetail from "./components/SongDetail";
import EditPage from "./components/EditPage";
import ProfilePage from "./components/ProfilePage";
import ErrorPage from "./components/404Page";
import ReactPlayer from "./components/ReactPlayer/ReactPlayer";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));

  }, [dispatch]);
  const sessionUser = useSelector(state => state.session.user);
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/upload">
            <UploadPage user={sessionUser} />
          </Route>
          <Route exact path="/songs">
            <ListSongPage />
          </Route>
          <Route exact path="/songs/:songId">
            <SongDetail />
          </Route>
          <Route path="/songs/:songId/edit">
            <EditPage />
          </Route>
          <Route exact path="/profile/:userName">
            <ProfilePage />
          </Route>
          <Route>
            <ErrorPage />
          </Route>
        </Switch>
      )}
  <ReactPlayer/>
    </>
  );
}

export default App;
