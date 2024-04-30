const express = require("express");
const router = express.Router()

module.exports = function(socket, session) {

  router.get('/', (req, res) => {
    res.send('pauseplay routing check')
  })

  router.get('/state', (req, res) => {
    if (!session.status.host || !session.playback.device.is_active) res.send('Host not active');
    else {
      const playState = session.playback;
      res.json({
        isPlaying: playState.is_playing
      });
    }
  })

  router.post('/pause', async (req, res) => {
    if (!session.status.host || !session.playback.device.is_active) {
      res.status(400).json({ error: 'Host not active or playback device not active' });
    } else {
      try {
        // Toggle playback state
        await session.pause();
        console.log('Playback toggled successfully.');
        res.status(200).json({ message: 'Playback toggled successfully' });
      } catch (error) {
        console.error('Error toggling playback:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  })
  router.post('/play', async (req, res) => {
    if (!session.status.host || !session.playback.device.is_active) {
      res.status(400).json({ error: 'Host not active or playback device not active' });
    } else {
      try {
        // Toggle playback state
        await session.play();
        console.log('Playback toggled successfully.');
        res.status(200).json({ message: 'Playback toggled successfully' });
      } catch (error) {
        console.error('Error toggling playback:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  })

  return router;
}
