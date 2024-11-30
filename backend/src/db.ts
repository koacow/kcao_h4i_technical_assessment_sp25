const { Client } = require('pg');

const dbClient = new Client({
    user: '',
    host: '',
    database: '',
    password: '',
    port: 5432,
});

dbClient.connect((e) => {
    if (e) {
        console.error(e);
    } else {
        console.log('Connected to the database');
    }
})

module.exports = dbClient;