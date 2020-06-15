const axios = require("axios")

const calculateAvgWords = async (songs, artist) => {
    const lyricsRequests = songs.list.map(async (song) => {
        return await getWordsForSong(song.title, artist);
    });

    return Promise.all(lyricsRequests).then(songs => {
        const filtered = songs.filter(s => !!s);
        const sum = filtered.reduce((previous, current) => current += previous);
        const avg = sum / filtered.length;

        return Math.ceil(avg);
    })
}

async function getWordsForSong(title, artist) {
    try {
        const response = await axios.get(
            `https://api.lyrics.ovh/v1/${artist}/${title}`
        );

        const lyrics = response.data.lyrics;
        return lyrics.split(" ").length;
    } catch (error) {}
}

module.exports = {
    calculateAvgWords
}