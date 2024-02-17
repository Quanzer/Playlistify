const express = require("express");
const router = express.Router()

module.exports = function(session) {

  router.post('/tracks', function(req, res){
    const results = {
      tracks : {},
      features : {},
    }
    res.setHeader('Content-Type', 'application/json');
    console.log('Search Query', req.body.searchString);
    session.spotify.searchTracks(req.body.searchString,req.body.params).then(
      function(data) {
        results.tracks = data.body;
        return data.body;
      }).then(
        function(searchResults){
          const idArr = [];
          //get id array from search
          for(let i = 0; i < searchResults.tracks.items.length; i++)
            idArr.push(searchResults.tracks.items[i].uri.replace('spotify:track:', ''))
          return session.spotify.getAudioFeaturesForTracks(idArr);
        }).then(function(data){
          results.features = data.body
          res.json(results); 
        })
      .catch(function(err) {
        console.error(err);
      })
  })

  return router;
}

