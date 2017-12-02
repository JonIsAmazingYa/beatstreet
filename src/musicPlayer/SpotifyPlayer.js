import React, { Component } from 'react'
import './SpotifyPlayer.css';
import play from "../assets/play.svg";
import pause from "../assets/pause.svg";
import album from "../assets/duffy.PNG";
import MapView from "../mapview/Mapview";
import SpotifyWebApi from 'spotify-web-api-node';
import * as actionHandler from '../spotifyPlayer/Spotify-Interface.js'
import {getCurrentTrack} from "../spotifyPlayer/Spotify-Interface";

class SpotifyPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playSwitch:  true,
            image: play,
            currentSong: 'No Song',
            currentArtist: 'No Artist',
            albumart: '../assets/duffy.PNG',
            location: 'No Location'
        };
    }
    componentDidMount(){
        this.getCurrentTrack();
    }

    getCurrentTrack() {
        var spotifyApi = new SpotifyWebApi();

        spotifyApi.setAccessToken(localStorage.getItem('accessToken'));

        spotifyApi.getMyCurrentPlayingTrack().then((response) => {
            console.log(response);
            this.setState({currentSong: response.body.item.name, currentArtist: response.body.item.artists[0].name, albumart: response.body.item.album.images[0].url});
    })
    }

    getCurrentLocation(coords){
        this.setState({location: coords})
    }

    playSongs(uri, location) {
        var spotifyApi = new SpotifyWebApi();

        spotifyApi.setAccessToken(localStorage.getItem('accessToken'));

        spotifyApi.play({"uris": uri}).then((response) => {
            console.log(response);
            getCurrentTrack();
            this.getCurrentLocation(location)
            });
    }

    pressSwitch() {
        if (!this.state.playSwitch) {
            this.setState({playSwitch: true, image: pause});
            actionHandler.getCurrentTrack();
            actionHandler.resumeSong();
        }
        else {
            this.setState({playSwitch: false, image: play});
            actionHandler.pauseSong();
        }
    }




    render() {
        return (
                    <div className="Background">
                        <h1 className="Brand">BeatStreet</h1>
                        <MapView/>
                        <div className="Bar">
                            <div className="ButtonHolder">
                                <img className="Play" onClick={() => this.pressSwitch()} src={this.state.image} />
                            </div>
                            <img className="Album" src={this.state.albumart} />
                            <div className="MediaInfo">
                                <h2 className={"MusicArtist"}>Street</h2>
                                <h1 className={"MusicSong"}>{this.state.currentSong}</h1>
                                <h2 className={"MusicArtist"}>{this.state.currentArtist}</h2>
                            </div>
                        </div>
                    </div>
        );
    }
}
export default SpotifyPlayer;