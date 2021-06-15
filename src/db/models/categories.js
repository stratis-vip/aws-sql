const {sequelize} = require('../')
const {DataTypes} = require('sequelize')

const CategoryModel = sequelize.define('Category', {
    // Model attributes are defined here
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
        // allowNull defaults to true
    }
}, {
    timestamps: false
    // Other model options go here
});

module.exports = {CategoryModel}
