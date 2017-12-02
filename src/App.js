import React, {Component} from 'react';

import SpotifyPlayer from './musicPlayer/SpotifyPlayer'
import Splash from './splash/Splash'
import * as spot from './spotifyPlayer/Spotify-Interface'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedin: false
        }
    }

    componentWillMount() {
        let url = window.location.href;
        if (url = 'https://beatstreet-fcff1.firebaseapp.com/'){
                console.log('You are on the splash');
        }
        else {
            console.log('You are on the map');
            let code = url.substring(url.indexOf("=")+1, url.indexOf("&"));

            fetch("https://beatstreet.herokuapp.com/?userKey="+code).then((resp)=>{
                spot.setAccessToken(resp.accessToken);
                this.setState({loggedin:true})
            })
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
