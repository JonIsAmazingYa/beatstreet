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

    componentDidMount() {
        let url = window.location.href;
        let code = url.substring(url.indexOf("=")+1, url.indexOf("&"));
        fetch("https://beatstreet.herokuapp.com/?userKey="+code).then((resp)=>{
            spot.setAccessToken(resp.accessToken);
            this.setState({loggedin:true})
        })
    }

    handleLogin() {
        this.setState({loggedin:true})
    }

    render() {
        return (
            <div>
                {this.state.loggedin ? <SpotifyPlayer />: <Splash onlog ={()=>{this.handleLogin()}}/>}
            </div>
        );
    }
}

export default App;
