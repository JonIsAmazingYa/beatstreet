import React, { Component } from 'react'
import './SpotifyPlayer.css';
import play from "../assets/play.svg";
import pause from "../assets/pause.svg";
import album from "../assets/duffy.PNG";
import MapView from "../mapview/Mapview";
import SpotifyWebApi from 'spotify-web-api-node';
import * as actionHandler from '../spotifyPlayer/Spotify-Interface.js'
import {getCurrentTrack} from "../spotifyPlayer/Spotify-Interface";
import MapboxClient from 'mapbox'

var client = new MapboxClient('pk.eyJ1IjoidGhvbWFzZ29kZnJleTk3IiwiYSI6ImNqYWZoamt2NTE2MXcycW9pYWVvdHVxYWQifQ.5-oVq2GCvmOXuySwYZz_-w');
var poi;
var address;
var place;
var neighbourhood;

class SpotifyPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playSwitch:  true,
            image: play,
            currentSong: 'No Song',
            currentArtist: 'No Artist',
            albumart: album,
            location: 'No Location'
        };
    }
    componentDidMount(){
        this.getCurrentTrack();
    }

    geoReverse() {

        if (!navigator.geolocation){
            return;
        }

        function success(position) {
            var latitude  = position.coords.latitude;
            var longitude = position.coords.longitude;

            console.log('Latitude is ' + latitude + ' Longitude is ' + longitude)

            client.geocodeReverse(
                {latitude: latitude, longitude: longitude},
                function (err, res) {
                    // res is a GeoJSON document with geocoding matches
                    let f = res.features;
                    for (var i = 0; i < f.length; i++) {
                        var obj = f[i];
                        if (obj.id.includes('address')){
                            address = obj.text;
                        }
                        if (obj.id.includes('poi')){
                            poi = obj.text;
                        }
                        if (obj.id.includes('place')){
                            place = obj.text;
                        }
                        if (obj.id.includes('neighbourhood')){
                            neighbourhood = obj.text;
                        }
                    }

                    return res.features;
                }).then(function(r) {
                setTrack(r);
            });
        }
        function playSongs(uri, location) {
            var spotifyApi = new SpotifyWebApi();

            spotifyApi.setAccessToken(localStorage.getItem('accessToken'));
            
            spotifyApi.play({"uris": uri}).then((response) => {
                console.log(response);
                setTimeout(() => {
                    this.getCurrentTrack();
                    this.getCurrentLocation(location)
                }, 2000);

            });
        }


        function setTrack(feat) {
            console.log(feat);

            console.log(feat.entity.features);

            var features = feat.entity.features;

            var f = features[0].text.split(" ");

            console.log(f);

            actionHandler.searchTracks(f[0]).then(function(result) {
                if (result.body.tracks.items.length > 0) {
                    localStorage.setItem('song_uri', result.body.tracks.items[0].uri);
                    localStorage.setItem('song_search', f[0]);
                    console.log("Song is " + localStorage.getItem('song_uri') + " for location " + localStorage.getItem('song_search'));
                    playSongs([localStorage.getItem('song_uri')],localStorage.getItem('song_search'))
                }
            });
        }

        function error() {
            console.log("Unable to retrieve your location");
        }

        console.log("Locating…");

        navigator.geolocation.getCurrentPosition(success, error);
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

    playSongs2(uri, location) {
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
                        <h1 className="Brand" onClick={() => this.geoReverse()}>BeatStreet</h1>
                        <MapView/>
                        <div className="Bar">
                            <div className="ButtonHolder">
                                <img className="Play" onClick={() => this.pressSwitch()} src={this.state.image} />
                            </div>
                            <img className="Album" src={this.state.albumart} />
                            <div className="MediaInfo">
                                <h2 className={"MusicArtist"}>{this.state.location}</h2>
                                <h1 className={"MusicSong"}>{this.state.currentSong}</h1>
                                <h2 className={"MusicArtist"}>{this.state.currentArtist}</h2>
                            </div>
                        </div>
                    </div>
        );
    }
}
export default SpotifyPlayer;