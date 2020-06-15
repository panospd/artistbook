const axios = require('axios');
const unique = require('../utils/unique')

const musicBrainzBaseUrl = "https://beta.musicbrainz.org/ws/2/"

"artist/79239441-bfd5-4981-a70c-55c3f15c1287?inc=releases&fmt=json"

const getAlbumsForArtist = async (mbid) => {
    const response = await axios.get(
        `${musicBrainzBaseUrl}artist/${mbid}?inc=releases&fmt=json`
    );

    const releases = {
        count: response.data.releases.length,
        list: response.data.releases.map(r => ({
            id: r.id,
            title: r.title,
            date: r.date.includes("-") ? r.date.split("-")[0] : r.date,
        }))
    };

    const trackRequests = releases.list.map(async (r) => {
        const response = await axios.get(`${musicBrainzBaseUrl}release/${r.id}?inc=recordings&fmt=json`);

        const trackData = response.data.media[0].tracks.map(track => ({
            id: track.id,
            title: track.title
        }));

        return {
            id: r.id,
            title: r.title,
            date: r.date,
            tracks: unique.removeDuplicates(trackData, "title")
        }
    });

    return Promise.allSettled(trackRequests).then(req => {
        const result = req.filter(r => r.status === 'fulfilled').map(r => r.value);
        return unique.removeDuplicates(result, "title");
    });
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
    getAlbumsForArtist
};