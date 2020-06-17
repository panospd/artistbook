const axios = require("axios")

const getAlbumsWithLyrics = async (albums, artist) => {
    const lyricsRequests = albums.map(async (album) => {

        return {
            id: album.id,
            title: album.title,
            date: album.date,
            tracks: await Promise.all(await getTracks(album, artist))
        }
    });

    return Promise.all(lyricsRequests).then(albums => {
        return albums;
    })
}

async function getTracks(album, artist) {
    return album.tracks.map(async ({
        id,
        title
    }) => {
        const words = await getWordsForSong(title, artist);

        return {
            id,
            title,
            words
        }
    })
}

async function getWordsForSong(title, artist) {
    try {
        const response = await axios.get(
            `https://api.lyrics.ovh/v1/${artist}/${title}`
        );

        return response.data.lyrics
            .split(" ")
            .filter(l => {
                return !l.includes(":") && l !== "(*)" && l !== "";
            }).length;
    } catch (error) {}
}

module.exports = {
    getAlbumsWithLyrics
}