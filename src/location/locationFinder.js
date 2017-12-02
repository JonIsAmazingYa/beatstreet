import MapboxClient from 'mapbox'
import * as spot from '../spotifyPlayer/Spotify-Interface.js';

var client = new MapboxClient('pk.eyJ1IjoidGhvbWFzZ29kZnJleTk3IiwiYSI6ImNqYWZoamt2NTE2MXcycW9pYWVvdHVxYWQifQ.5-oVq2GCvmOXuySwYZz_-w');
var poi;
var address;
var place;
var neighbourhood;

export function geoReverse() {

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

    function setTrack(feat) {
        console.log(feat);

        console.log(feat.entity.features);

        var features = feat.entity.features;

        var f = features[0].text.split(" ");

        console.log(f);

        spot.searchTracks(f[0]).then(function(result) {
            if (result.body.tracks.items.length > 0) {
                localStorage.setItem('song_uri', result.body.tracks.items[0].uri);
                localStorage.setItem('song_search', f[0]);
                console.log("Song is " + localStorage.getItem('song_uri') + " for location " + localStorage.getItem('song_search'));
            }
        });
    }

    function error() {
        console.log("Unable to retrieve your location");
    }

    console.log("Locating…");

    navigator.geolocation.getCurrentPosition(success, error);
}