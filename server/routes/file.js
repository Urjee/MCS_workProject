module.exports = app => {
    const files = require('../controllers/fileController');

    const router = require('express').Router();

    router.get('/files', files.allFiles);

    app.use('/api', router);
    app.post("/upload", router);
}