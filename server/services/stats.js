const calculate = (albums) => {

    const words = extractAllTrackWords(albums)

    return {
        avg: averageOfTracks(words),
        min: getMin(words),
        max: getMax(words),
        stDeviation: getSstandardDeviation(words),
        variance: getVariance(words)
    }
}

function getVariance(words) {
    const avg = Mean(words);

    const squareDiffs = words.map((word) => {
        const diff = word - avg;
        const sqrDiff = diff * diff;
        return sqrDiff;
    });

    return Mean(squareDiffs).toFixed(2);
}

function getSstandardDeviation(words) {
    return Math.sqrt(getVariance(words)).toFixed(2);
}

function getMax(arr) {
    return Math.max(...arr);
}

function getMin(arr) {
    return Math.min(...arr);
}

function extractAllTrackWords(albums) {
    const tracks = albums.map(a => a.tracks);
    const merged = [].concat.apply([], tracks);
    return merged.map(t => t.words).filter(w => !!w);
}

function averageOfTracks(words) {
    return Math.ceil(Mean(words));
}

function Mean(words) {
    const sum = words.reduce((previous, current) => current += previous);
    return sum / words.length;
}

module.exports = {
    calculate
}