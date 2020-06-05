const express = require('express');
const router = express.Router();
const CategoriesModel = require('../categories/models/CategoriesModel')
const Article = require('../articles/models/ArticleModel');
const Slugfy = require('slugify')

router.get('/admin/articles', (req, res) => {
    return res.send('Article Test');
});

router.get('/admin/articles/new', (req, res) => {

    CategoriesModel.findAll().then(categories => {

        res.render('admin/articles/new', {
            categories: categories
        });
    })
})

router.post('/article/save', (req, res) => {

    const title = req.body.title;
    const body = req.body.body;
    const category = req.body.category;

    Article.create({
        title: title,
        body: body,
        slug: Slugfy(title),
        // Chave estrangeira
        categoryId: category
    }).then(()=>{
         res.redirect('/admin/articles');
    })
});
module.exports = router;