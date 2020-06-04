const express = require('express');
const router = express.Router();
const CategoriesModel = require('../categories/models/CategoriesModel')

router.get('/articles', (req, res) => {
    return res.send('Article Test');
});

router.get('/admin/articles/new', (req, res) => {

    CategoriesModel.findAll().then(categories => {

        res.render('admin/articles/new', {
            categories: categories
        });
    })
})

module.exports = router;