import React, { Component } from 'react'

import './SpotifyPlayer.css';
import play from "../assets/play.svg";
import pause from "../assets/pause.svg";
import MapView from "../mapview/Mapview";

import * as actionHandler from '../spotifyPlayer/Spotify-Interface.js'

class SpotifyPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {playSwitch:  true, image: play};
    }

    pressSwitch(){
        if (this.state.playSwitch) {
            this.setState({playSwitch: false, image: pause});

            actionHandler.pauseSong();
        }
        else {
            this.setState({playSwitch: true, image: play});

            actionHandler.resumeSong();
        }
    }

    render() {
        return (
            <div>
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
            </div>
        );
    }
}
export default SpotifyPlayer;