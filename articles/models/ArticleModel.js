const Sequelize = require('sequelize');
const connection = require('../../database/Connection');
const Category = require('../../categories/models/CategoriesModel')

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

/**
 * @description Creating the relating 1 to n
 * @function hasMany Create the relationship between 2 model 
 *                   with cardinality 1 to n
 */
Category.hasMany(Article);

/**
 * @description Creating the relating 1 to 1
 * @function belongsTo Create the relationship between 2 model 
 *                     with cardinality 1 to 1
 */
Article.belongsTo(Category);

/**
 * @function sync Synchronizing the model with a database table
 * @description We need to remove this function after create our table on Database
 */
// Article.sync({force: true})

module.exports = Article;