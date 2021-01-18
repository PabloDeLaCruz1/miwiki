// setting up the node-postgres driver
const pg = require('pg');
const postgresUrl = 'postgres://localhost/mytwitterdb';
const client = new pg.Client(postgresUrl);

// connecting our client to the `postgres` server
client.connect();

module.exports = client;