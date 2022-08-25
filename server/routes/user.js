module.exports = app => {
    const users = require('../controllers/userController');
    const router = require('express').Router();

    router.post('/login', users.login);
    router.post('/register', users.register);
    router.get('/users', users.allUsers);
    router.post('/addUser',users.addUser);
    app.use('/api', router);
}