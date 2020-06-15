const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const artist = require('./services/artist');
const lyrics = require("./services/lyrics")

const app = express();

app.use(cors());
app.use(bodyParser());

app.post('/artists/work', async (req, res) => {
  const {
    id: mbid,
    name
  } = req.body;
  const songs = await artist.getSongsByArtistId(mbid);

  const avgWords = await lyrics.calculateAvgWords(songs, name)

  res.status(200).send({
    name,
    avgWords
  });
});

app.get('/artists', async (req, res) => {
  const name = req.query.name;

  if (!name)
    return res.status(400).json({
      message: 'query parameter name is mandatory',
    });

  const artists = await artist.getByName(name);
  res.send(artists);
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});