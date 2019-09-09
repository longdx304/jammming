const clientId = 'ca48cb9fa91b425f851609ca6a239fc1';
const redirectUri = 'http://localhost:3000/';
let accessToken = '';

const Spotify = {
    getAccessToken: () => {
        if (accessToken) {
            return accessToken;
        }
        if (window.location.href.match(/access_token=([^&]*)/)) {
            accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
            const expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        }
    },
    asyncReq: async (endpoint, postBody) => {
        try {
            const getHeaders = {
                headers: {Authorization: `Bearer ${accessToken}`}
            };
            const postHeaders = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: postBody
            }
            const response = await fetch(endpoint, postBody ? postHeaders : getHeaders);
            if (response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse;
            }
            throw new Error('Request failed!');
        } catch(error) {
            console.log(error);
        }
    },
    search: async (term) => {
        const searchedTracks = await Spotify.asyncReq(`https://api.spotify.com/v1/search?type=track&q=${term}`);
        return searchedTracks.tracks.items.map(track => {
            return({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            });
        });
    },
    savePlaylist: async (name, trackURIs) => {
        if (!name || trackURIs.length===0) {
            console.log("No Name or Track URIs");
            return;
        } else {
            const userProfile = await Spotify.asyncReq('https://api.spotify.com/v1/me');
            const playlist = await Spotify.asyncReq(`https://api.spotify.com/v1/users/${userProfile.id}/playlists`, JSON.stringify({'name': `${name}`}));
            return await Spotify.asyncReq(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, JSON.stringify({'uris': trackURIs}));
        }
    }
}

export default Spotify;