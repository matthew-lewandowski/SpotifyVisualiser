import React, {useState, useEffect} from 'react';
import './App.css';
import LoggedIn from "./pages/loggedIn";
import qs from 'qs';

function App() {
    const [signedIn, setSignedIn] = useState(false);
    const [code, setCode] = useState(0);
    const params = qs.parse(window.location.search, {ignoreQueryPrefix: true});
    if (params.code !== code) {
        setCode(params.code)
    }
    useEffect(() => {
        if (params.code) {
            const code = params.code;
            fetch('/api/authCodeGrant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: code
                })
            })
                .then(data => {
                    setSignedIn(true);
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }, [code]);

    //Functions
    const redirectToSpotify = () => {
        fetch('/api/authorizeURI')
            .then(response => response.json())
            .then(data => {
                if (data.authorizeUri) {
                    window.location = data.authorizeUri;
                }
            }).catch(error => {
            console.log(error)
        });
    };

    return (
        <div className="App">
            {signedIn ?
                <LoggedIn/> :
                <button onClick={redirectToSpotify}>Login to spotify</button>
            }
        </div>
    );
}

export default App;
