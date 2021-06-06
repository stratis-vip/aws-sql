const {Sequelize} = require('sequelize');


// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('collection', 'dbaseuser', 'Jqw6f0^9', {
    host: 'db22.papaki.gr',
    port: '3306',
    dialect: 'mariadb',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

async function checkStatus(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}



module.exports = {checkStatus}