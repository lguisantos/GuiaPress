const express = require('express');
const router = express.Router()

router.get('/articles', (req, res)=>{
    return res.send('Article Test');
});

router.get('/testArticle', (req, res)=>{
    return res.send('Test Router Article');
})

module.exports = router;