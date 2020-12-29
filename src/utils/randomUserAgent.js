const fakeUserAgent = require('../../botnet/useragents.json');

module.exports = randomUA = () => {
    const randomIn = (array) => array[Math.floor(Math.random() * array.length)];
    const optionsLength = randomIn(fakeUserAgent);
    return randomIn(randomIn(optionsLength.list).useragents);
};