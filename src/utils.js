export let chunk = (arr, n) => {
    let results = [];
    while (arr.length) {
        results.push(arr.splice(0, n));
    }
    return results;
};