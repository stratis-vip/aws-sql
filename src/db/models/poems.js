const {sequelize} = require('../')
const {DataTypes} = require('sequelize')

const Poem = sequelize.define('Poem', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    idInCategory: {
        type: DataTypes.INTEGER,
        allowNull: false
        // allowNull defaults to true
    },
    content:{
        type: DataTypes.STRING,
        allowNull: false
    },
    category:{
        type: DataTypes.UUID,
        allowNull: false
    },
    authDate:{
        type: DataTypes.STRING
    },
    explanation: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    // createdAt:{
    //   type:DataTypes.STRING
    // },
    // updatedAt:{
    //  type:DataTypes.STRING
    // }
}, {

    // Other model options go here
});

module.exports = {Poem}
