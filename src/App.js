import React, {Component} from 'react';
import * as auth from 'spotifyPlayer/Spotify-Authentication.js';

import SpotifyPlayer from './musicPlayer/SpotifyPlayer'
import Splash from './splash/Splash'
import * as spot from './spotifyPlayer/Spotify-Interface'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedin: true
        }
    }

    componentWillMount() {
        let url = window.location.href;
        if (url = 'https://beatstreet-fcff1.firebaseapp.com/'){
                console.log('You are on the splash');
                this.setState((loggedin: false))
        }
        else {
            if(auth.obtainAccessToken()) {
                this.setState({loggedin: true});
            } else {
                this.setState((loggedin: false));
                console.log('Failed to get auth code');
            }
        }
    }


    render() {
        return (
            <div>
                {this.state.loggedin ? <SpotifyPlayer />: <Splash />}
            </div>
        );
    }
}

export default App;
