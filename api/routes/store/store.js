const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200);
    res.json({
        msg : 'get'
    });
});

router.post('/', (req, res, next) => {
    res.status(200);
    res.json({
        msg : 'post'
    });
});

router.delete('/', (req, res, next) => {
    res.status(200);
    res.json({
        msg : 'delete'
    });
});

router.put('/', (req, res, next) => {
    res.status(200);
    res.json({
        msg : 'put'
    });
});


module.exports = router;
