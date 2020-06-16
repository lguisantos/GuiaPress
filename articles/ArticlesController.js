const Slugfy = require('slugify');
const express = require('express');
const router = express.Router();

const Category = require('../categories/models/CategoriesModel');
const Article = require('../articles/models/ArticleModel');

router.get('/admin/articles', (req, res) => {
    Article.findAll({
        /**
         * @function include Criando um JOIN de tabelas
         * @description Para criar um JOIN, primeiramente devemos criar
         *              um relacionamento dentro do arquivo Model
         */
        include: [{
            model: Category
        }]

    }).then(article => {

        return res.render('admin/articles/index', {
            article: article,
        });

    });
});

router.get('/admin/articles/new', (req, res) => {

    Category.findAll().then(categories => {

        res.render('admin/articles/new', {
            categories: categories
        });
    });
});

router.post('/article/save', (req, res) => {

    const title = req.body.title;
    const body = req.body.body;
    const category = req.body.categories;

    Article.create({
        title: title,
        body: body,
        slug: Slugfy(title),

        // Chave estrangeira
        categoryId: category
    }).then(() => {
        res.redirect('/admin/articles');
    });

});

router.post('/articles/delete', (req, res) => {

    const id = req.body.id;
    if (id != undefined && !isNaN(id)) {
        /**
         * @function destroy Deleta um registro da tabela
         * @function where Condição para deletar
         */
        Article.destroy({
            where: {
                id: id
            }
        }).then(() => {
            res.redirect('/admin/articles');
        })

    } else {
        res.redirect('/admin/articles')
    }
});

router.post('/articles/edit/:id', (req, res) => {

})
module.exports = router;