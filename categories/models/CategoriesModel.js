const Sequelize = require('sequelize');
const connection = require('../../database/Connection');

const Category = connection.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

/**
 * @function sync Synchronizing the model with a database table
 * @description We need to remove this function after create our table on Database
 */
Category.sync({ force: false })

module.exports = Category;