import NodeCache from "node-cache";

// stdTTL is the default time-to-live for each cache entry
const myCache = new NodeCache({ stdTTL: 600 });

export default myCache;
