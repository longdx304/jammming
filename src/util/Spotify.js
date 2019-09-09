const clientId = 'ca48cb9fa91b425f851609ca6a239fc1';
const redirectUri = 'http://localhost:3000/';
let accessToken = '';
const Spotify = {
    getAccessToken: () => {
        if (accessToken) {
            console.log(accessToken);
            return accessToken;
        }
        console.log("accessToken is not set");
        if (window.location.href.match(/access_token=([^&]*)/)) {
            accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
            const expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            console.log(`Just set accessToken: ${accessToken}`);
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        }
    }
}

export default Spotify;