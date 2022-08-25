module.exports = app => {
    const workUsers = require('../controllers/workUserController');
    const router = require('express').Router();

    router.get('/workUsers', workUsers.allWorkUsers);
    router.post('/addWorkUser', workUsers.addWorkUser);

    app.use('/api', router);
}