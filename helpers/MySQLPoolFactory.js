const mysql = require('mysql');

const HOST = process.env.MYSQL_HOST;
const USER = process.env.MYSQL_USER;
const PASSWORD = process.env.MYSQL_PASSWORD;
const DATABASE = process.env.MYSQL_DATABASE;

class MySQLPoolFactory {

    static getPool({host, user, password, database} = {}) {

        let pool = mysql.createPool({
            host: HOST || host,
            user: USER || user,
            password: PASSWORD || password,
            database: DATABASE || database
        });

        pool.on('release', () => console.log('[pool] => conexão devolvida'));

        process.on('SIGINT', () => {
            pool.end(erro => {
                if (erro) return console.log(erro);
                console.log('[pool] => conexões finalizadas.');
                process.exit(1);
            })
        });

        return pool;
    }
}

module.exports = MySQLPoolFactory;