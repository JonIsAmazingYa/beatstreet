import {setAccessToken} from "./Spotify-Interface";

export function obtainAccessToken() {
    var params = getQueryParams(window.location.href);

    if (params.length < 200) {
        return false;
    }

    var accToken = httpGet('https://beatstreet.herokuapp.com/?userKey=' + params);

    accToken = JSON.parse(accToken);
    accToken = JSON.stringify(accToken);

    var tok = accToken.split('"');

    console.log(tok);

    if (tok.length > 5) {
        setAccessToken(tok[4]);
        console.log("Access token retrieved, " + tok[4]);
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

    if (params.length < 1) {
        return '';
    }

    params = params[0].split('code=')[1];

    return params;
}