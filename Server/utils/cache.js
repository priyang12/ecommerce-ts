const NodeCache = require("node-cache");

// stdTTL is the default time-to-live for each cache entry
const myCache = new NodeCache({ stdTTL: 600 });

module.exports = myCache;
