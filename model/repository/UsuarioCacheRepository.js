const MemcachedClientFactory = require('../../helpers/MemcachedClientFactory');
const UsuarioCacheDAO = require('../dao/UsuarioCacheDAO');

const clientMemcached = MemcachedClientFactory.getClient({
    host: 'localhost',
    port: 11211
});

const dao = new UsuarioCacheDAO(clientMemcached);

class UsuarioCacheRepository {

    static cachearUsuario(usuario) {
        return dao.adicionarCache(usuario);
    }

    static obterCachePorId(id) {
        return dao.buscarCache(id);
    }
}

module.exports = UsuarioCacheRepository;