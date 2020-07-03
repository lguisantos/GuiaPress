const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController')

//Initializing Tables
const ArticleModel = require('./articles/models/ArticleModel');
const CategoryModel = require('./categories/models/CategoriesModel');

//Import Connection
const connection = require('./database/Connection');

//Database connection    //Seccess
connection.authenticate().then(() => console.log('Database connected'))
    //Error
    .catch((error) => console.log(`Connection erro: ${error}`));

//View engine
app.set('view engine', 'ejs');

//Static files
app.use(express.static('public'));

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    ArticleModel.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {
        CategoryModel.findAll().then(categories => {
            return res.render('index', {
                articles: articles,
                categories: categories
            });
        });
    });
});


app.get('/:slug', (req, res) => {
    console.log('No lugar errado')
    const slug = req.params.slug;

    if (slug != undefined) {
        ArticleModel.findOne({
            where: {
                slug: slug
            }
        }).then(article => {

            if (article != undefined) {
                console.log('testando artigo', article);
                CategoryModel.findAll().then(categories => {
                    res.render('article', {
                        article: article,
                        categories: categories
                    });
                });
            }
        }).catch(e => {
            console.log('Ocorreu o seguinte erro =>', e)
            res.redirect('/');
        });
    }
});

//Using external Routes
app.use('/', categoriesController);
app.use('/', articlesController);

app.listen(666, () => {
    console.log(`Server started on port: 666`);
});