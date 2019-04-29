const Memcached = require('memcached');

Memcached.config.retries = 5;
Memcached.config.failures = 5;
Memcached.config.retry = 500;
Memcached.config.reconnect = 500;
Memcached.config.timeout = 500;
Memcached.config.idle = 500;
Memcached.config.failuresTimeout = 1;
Memcached.config.maxTimeout = 500;
Memcached.config.minTimeout = 500;
Memcached.config.remove = true;
Memcached.config.poolSize = 10;

const HOST = process.env.MEMCACHED_HOST;
const PORT = process.env.MEMCACHED_PORT;

class MemcachedClientFactory {

    static getClient({host, port} = {}) {
        return new Memcached(`${HOST || host}:${PORT || port}`);
    }
}

module.exports = MemcachedClientFactory;