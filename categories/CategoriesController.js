const express = require('express');
const slugify = require('slugify');

const router = express.Router();
const CategoriesModel = require('./models/CategoriesModel');

router.get('/admin/category/new', (req, res) => {
    res.render('admin/category/new');
});

router.post('/categories/save', (req, res) => {
    var title = req.body.title;
    if (title != undefined) {

        /**
         * @function create Create a record at database
         * @function slugify Cria um caminho mais legível para as rotas com a string inserida
         *                   EX: Desenvolvimento web - Slug(desenvolvimento-web)
         */
        CategoriesModel.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            return res.redirect('/admin/categories')
        });

    } else {
        res.send(alert("O título não pode estar em branco"));
    }
});

router.get('/admin/categories', (req, res) => {
    /**
     * @alias CategoriesModel Respresenta uma tabela no banco de dados
     * @function findAll Seleciona todos os registro da tabela CategoriesModel 
     */
    CategoriesModel.findAll().then(categories => {
        return res.render('admin/category/index', {
            categories: categories
        });
    });
});

router.post('/categories/delete', (req, res) => {

    const id = req.body.id;
    if (id != undefined && !isNaN(id)) {
        /**
         * @function destroy Deleta um registro da tabela
         * @function where Condição para deletar
         */
        CategoriesModel.destroy({
            where: {
                id: id
            }
        }).then(() => {
            res.redirect('/admin/categories');
        })

    } else {
        res.redirect('admin/category/index')
    }
});

router.get('/admin/categories/edit/:id', (req, res) => {
    var id = req.params.id;

    if (isNaN(id)) return res.redirect('/');

    /**
     * @function findByPk Buscando registro pelo ID
     */
    CategoriesModel.findByPk(id).then(category => {

        if (category != undefined) {
            res.render('admin/category/edit', {
                categories: category
            });
        } else {
            res.redirect('/')
        }
    }).catch(e => {
        res.redirect('/');
    })
});

router.post('/categories/update', (req, res) => {
    const id = req.body.id;
    const title = req.body.title;

    CategoriesModel.update({
        title: title,
        slug: slugify(title)
    }, {
        where: {
            id: id
        }
    }).then(()=>{
         res.redirect('/admin/categories');
    })
});

module.exports = router;