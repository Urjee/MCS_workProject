module.exports = app => {
    const files = require('../controllers/fileController');

    const router = require('express').Router();

    router.get('/file', files.allFiles);
    router.post('/download', files.download);

    app.use('/api', router);
}