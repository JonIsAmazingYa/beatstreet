import {setAccessToken} from "./Spotify-Interface";

export function obtainAccessToken() {
    var params = getQueryParams(window.location.href);

    if (params.length < 200) {
        return false;
    }

    var accToken = httpGet('https://beatstreet.herokuapp.com/?userKey=' + params);

    console.log(accToken);

    if (accToken.access_token !== "undefined") {
        setAccessToken(accToken.access_token);
        console.log("Access token retrieved, " + accToken.access_token);
    } else {
        return false;
    }

    return true;
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    console.log(xmlHttp)
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function getQueryParams(qs) {
    var re = new RegExp('code=[^&]*');

    var params = re.exec(qs);

    params = params[0].split('code=')[1];

    return params;
}