//src/dbs/_dbs.js
// Create a pool of connections to the database
import pg from 'pg';
const { Pool } = pg;

/**
 * Creates a pool of connections to the database.
 * @param {string} host - The hostname of the database server.
 * @param {number} port - The port number on which the database server is running.
 * @param {string} user - The username for the database.
 * @param {string} password - The password for the database.
 * @param {string} database - The name of the database to connect to.
 * @returns {Pool} A new Pool instance of PostgreSQL connections.
 */
export function createPool(host, port, user, password, database) {
    const pool = new Pool({
        host,
        port,
        user,
        password,
        database
    });

    pool.connect(err => {
        if (err) {
            console.error('Error connecting to the database', err.stack);
            return;
        }
        console.log('Connected to the database');
    });

    return pool;
}
