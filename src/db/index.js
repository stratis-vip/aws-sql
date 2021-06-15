require('dotenv').config()
const {Sequelize} = require('sequelize');

const DBUSER = process.env.DBUSER || 'dbaseuser'
const DBPASS = process.env.DBPASS || 'Jqw6f0^9'
const DBDBASE = process.env.DBDBASE || 'collection'
const DBHOST = process.env.DBHOST || 'db22.papaki.gr'

console.log(DBHOST, DBPASS, DBUSER, DBDBASE)

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize(DBDBASE, DBUSER, DBPASS, {
    host: DBHOST,
    port: '3306',
    dialect: 'mariadb',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    logging: false,
    define: {
        timestamps: true,
        charset: 'utf8',
    }
});

function checkStatus() {
    return new Promise(async (resolve, reject) => {
        let returnValue = false
        try {
            await sequelize.authenticate();
            returnValue = true
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        } finally {
            resolve(returnValue)
        }
    })
}


module.exports = {checkStatus, sequelize}