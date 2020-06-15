const axios = require('axios');

const musicBrainzBaseUrl = "https://beta.musicbrainz.org/ws/2/"

const getSongsByArtistId = async (mbid) => {
    const response = await axios.get(
        `${musicBrainzBaseUrl}work/?query=arid:${mbid}&type:song&fmt=json`
    );

    return {
        count: response.data.count,
        list: response.data.works.map(({
            id,
            title
        }) => ({
            id,
            title
        }))
    }
}

const getByName = async (name) => {
    const response = await axios.get(
        `${musicBrainzBaseUrl}artist/?query=artist:${name}&type:person&fmt=json`
    );

    return {
        count: response.data.count,
        list: response.data.artists.map(({
            id,
            name,
            gender,
            country,
            area,
            disambiguation,
            tags
        }) => {
            return {
                id,
                name,
                gender,
                disambiguation: disambiguation ? disambiguation.split(", ") : [],
                country: {
                    code: country,
                    name: area ? area.name : ''
                },
                tags: tags ? tags.map(({
                    name
                }) => (name)) : []
            }
        })
    };
};

module.exports = {
    getByName,
    getSongsByArtistId
};