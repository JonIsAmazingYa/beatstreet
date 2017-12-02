import React, { Component } from 'react';
import Slider from 'react-viewport-slider';
import * as auth from '../spotifyPlayer/Spotify-Authentication.js'

import './SpotifyPlayer.css';
import play from "../assets/play.svg";
import pause from "../assets/pause.svg";
import MapView from "../mapview/Mapview";

class SpotifyPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {playSwitch:  true, image: play};
    }

    componentDidMount() {
        auth.obtainAccessToken();
    }

    pressSwitch(){
        if (this.state.playSwitch) {
            this.setState({playSwitch: false, image: pause});
        }
        else {
            this.setState({playSwitch: true, image: play});
        }
    }

    render() {
        return (
            <Slider>
                <Slider.Item buttonLabel={'More Songs'} hideButton={true}>
                    <h1 className="Brand">BeatStreet</h1>
                    <div className="Background">
                        <MapView/>
                        <div className="Bar">
                            <div className="ButtonHolder">
                                <img className="Play" onClick={() => this.pressSwitch()} src={this.state.image} />
                            </div>
                            <img className="Album" src={require("../assets/duffy.PNG")} />
                            <div className="MediaInfo">
                                <h1 className={"MusicSong"}>Street</h1>
                                <h1 className={"MusicSong"}>Song Title</h1>
                                <h2 className={"MusicArtist"}>Artist Name</h2>
                            </div>
                        </div>
                        <img className="SmallButton" src={require("../assets/arrow.svg")} onClick={() => window.scrollTo(0,document.body.scrollHeight)} />
                    </div>
                </Slider.Item>
                <Slider.Item style={{ backgroundColor: '#526077' }}>
                    <h1 className="TitleSecondScreen">Street</h1>
                    <div className="AlternativeBox">
                        <img className="Album" src={require("../assets/duffy.PNG")} />
                        <div className="MediaInfo">
                            <h1>Song Title</h1>
                            <h2>Artist Name</h2>
                            <h2>2015</h2>
                        </div>
                    </div>
                    <div className="AlternativeBox">
                        <img className="Album" src={require("../assets/duffy.PNG")} />
                        <div className="MediaInfo">
                            <h1 className="MusicSong">Song Title</h1>
                            <h2 className="MusicArtist">Artist Name</h2>
                            <h2 className="MusicArtist">2017</h2>
                        </div>
                    </div>
                    <div className="AlternativeBox">
                        <img className="Album" src={require("../assets/duffy.PNG")} />
                        <div className="MediaInfo">
                            <h1>Song Title</h1>
                            <h2>Artist Name</h2>
                            <h2>2014</h2>
                        </div>
                    </div>
                    <h2 className="PoweredBy">Powered by BeatStreet.</h2>
                </Slider.Item>
            </Slider>
        );
    }
}
export default SpotifyPlayer;