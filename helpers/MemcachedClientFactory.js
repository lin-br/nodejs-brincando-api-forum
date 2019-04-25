const Memcached = require('memcached');

Memcached.config.retries = 10;
Memcached.config.retry = 10000;
Memcached.config.remove = true;
Memcached.config.poolSize = 10;

const HOST = process.env.MEMCACHED_HOST;
const PORT = process.env.MEMCACHED_PORT;

class MemcachedClientFactory {

    static getClient({host, port} = {}) {
        return new Memcached(`${HOST || host}: ${PORT || port}`);
    }
}

module.exports = MemcachedClientFactory;