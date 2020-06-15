const removeDuplicates = (arr, property) => {
    return arr
        .map(e => e[property])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter((e) => arr[e]).map(e => arr[e]);
}

module.exports = {
    removeDuplicates
}