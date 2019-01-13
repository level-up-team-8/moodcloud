function recommend(mood) {

    console.log(document.getElementById('track-list'));
    if (!(document.getElementById('track-list') == null)) {
      document.getElementById("track-list").outerHTML = "";
    }

    const app = document.getElementById('root');
  
    const ul = document.createElement('ul');
    ul.setAttribute('id', 'track-list');
  
    app.appendChild(ul);
  
    var trackList = [];
  
    var header = {
      'Accept': "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer BQCTM-5TusA_rJ2-aM3ebs99DV6Dx0aeQalTA1OnWrNBDHK2Jq4d9BMz9WH1xxPvR36XULgp8hwRBNMRtwQ"
  
    };

    var lnk = '';

    if (mood == 'happy') {
        lnk = 'https://api.spotify.com/v1/recommendations?limit=5&market=US&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&min_popularity=50&min_valence=0.6&max_valence=1'
    }
    if (mood == 'sad') {
        lnk = 'https://api.spotify.com/v1/recommendations?limit=5&market=US&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&min_popularity=50&min_valence=0&max_valence=0.5'
    }
    if (mood == 'relaxing') {
        lnk = 'https://api.spotify.com/v1/recommendations?limit=5&market=US&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&min_acousticness=0.6&max_acousticness=1&min_popularity=50'
    }

    if (mood == 'high-energy') {
        lnk = 'https://api.spotify.com/v1/recommendations?limit=5&market=US&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&min_energy=0.6&max_energy=1.0&min_popularity=50'
    }

    if (mood == 'fitness') {
        lnk = 'https://api.spotify.com/v1/recommendations?market=US&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&min_danceability=0.6&max_danceability=1&min_energy=0.4&min_popularity=50'
    }
  
    const getData = () => {
      try {
        return axios.get(lnk,{'headers':header})
      } catch (error) {
        if (response.status == 401) {
          console.log("Get new token.")
        } else {
          console.log(error)
        }
      }
    }
  
    const getTracks = async () => {
      const breeds = getData()
        .then(response => {
          if (response.data.tracks) {
            for (counter = 0; counter < 5; counter++) {
  
              const li = document.createElement('li');
              const anc = document.createElement('a');
              anc.setAttribute("href", response.data.tracks[counter].album.external_urls.spotify);
              anc.setAttribute("target", "_blank");
              anc.textContent = response.data.tracks[counter].name + " by " + response.data.tracks[counter].album.artists[0].name;

              li.appendChild(anc);
              ul.appendChild(li);
  
              trackList.push([response.data.tracks[counter].name, response.data.tracks[counter].album.artists[0].name], response.data.tracks[counter].album.external_urls.spotify)
              //console.log(response.data.tracks[counter].name + " by " + response.data.tracks[counter].album.artists[0].name)
            }
          }
          trackList.forEach(element => {
            console.log(element)
          });
          console.log(response.data)
        
        })
        .catch(error => {
          console.log(error)
        })
    }
  
    getTracks()
  }