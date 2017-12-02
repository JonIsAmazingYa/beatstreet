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

    pressSwitch() {
        if (this.state.playSwitch) {
            this.setState({playSwitch: false, image: play});

            actionHandler.resumeSong();
        }
        else {
            this.setState({playSwitch: true, image: pause});

            actionHandler.pauseSong();
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
                            <img className="Album" src={actionHandler.getCurrentTrack().album.images.0.url} />
                            <div className="MediaInfo">
                                <h1 className={"MusicSong"}>Street</h1>
                                <h1 className={"MusicSong"}>{actionHandler.getCurrentTrack().name}</h1>
                                <h2 className={"MusicArtist"}>{actionHandler.getCurrentTrack().artists[0].name}</h2>
                            </div>
                        </div>
                        <img className="SmallButton" src={require("../assets/arrow.svg")} onClick={() => window.scrollTo(0,document.body.scrollHeight)} />
                    </div>
            </div>
        );
    }
}
export default SpotifyPlayer;