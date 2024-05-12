const express = require("express");
const router = express.Router();

module.exports = function(socket,session) {
  // Route to get filterFeature min-max values
  router.get('/filterFeature', (req, res) => {
    res.json(session.getFeatureFilters);
  });

  // Route to update filterFeature min-max values
  router.post('/filterFeature/update', (req, res) => {
    const { energy, instrumentalness, valence, tempo, explicit } = req.body;
    session.updateFeatureFilters({
      energy,
      instrumentalness,
      valence,
      tempo,
      explicit
    });
    res.sendStatus(200);
    console.log("UPDATED backend filter")
  });

  return router;
};
