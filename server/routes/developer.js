module.exports = app => {
    const developer = require('../controllers/developerController');
    const router = require('express').Router();

    router.get('/developer', developer.allDeveloper);
    router.post('/dev', developer.dev);

    app.use('/api', router);
}