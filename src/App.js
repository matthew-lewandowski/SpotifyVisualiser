import React, { useState, useEffect } from 'react';
import './App.css';
import LoggedIn from "./pages/loggedIn";
import SpotifyLogin from 'react-spotify-login';

function App() {
  const [ signedIn, setSignedIn ] = useState(false);
  const [ token, setToken ] = useState("0");

  const onSuccess = response => {
    if (response.access_token){
      setToken(response.access_token);
    }
    setSignedIn(true);
  };
  const onFailure = response => console.error(response);

  //use for testing effect of state changes.
  useEffect(() => {
    console.log(token)
  }, [token]);

  return (
    <div className="App">
      {signedIn? <LoggedIn/> :
          <SpotifyLogin clientId="62e41518de654c8d878e7e46996da76d"
                        redirectUri="http://localhost:3000"
                        onSuccess={onSuccess}
                        onFailure={onFailure}/>
      }
    </div>
  );
}

export default App;
