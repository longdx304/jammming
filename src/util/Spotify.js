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
    search: async (term) => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {headers: {Authorization: `Bearer ${accessToken}`}});
            if (response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse.tracks.items.map(track => {
                    return({
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    });
                });
            }
            throw new Error('Request failed!');
        } catch(error) {
            return console.log(error);
        }
    },
    savePlaylist: (name, trackURIs) => {
        if (!name || trackURIs.length===0) {
            console.log("No Name or Track URIs");
            return;
        } else {
            const headers = {Authorization: `Bearer ${accessToken}`};
            return fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response => {
                return response.json();
            }).then(jsonResponse => {
                return jsonResponse.id;
            }).then(userId => {
                const postHeaders = {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    headers: postHeaders,
                    method: 'POST',
                    body: JSON.stringify({'name': `${name}`})
                }).then(response => {
                    return response.json();
                 }).then(jsonResponse => {
                    return jsonResponse.id;
                 }).then(playlistId => {
                     return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                         headers: postHeaders,
                         method: 'POST',
                         body: JSON.stringify({'uris': trackURIs})
                     }).then(response => {
                         return response.json();
                     }).then(jsonResponse => {
                         return jsonResponse.snapshot_id;
                     })
                 })
            })
        }
    }
}

export default Spotify;