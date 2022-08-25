module.exports = app => {
    const users = require('../controllers/userController');
    const router = require('express').Router();

    router.get('/userReqs', users.allProducts);
    router.post('/login', users.login);
    router.post('/register', users.register);
    router.get('/users', users.allUsers);

    app.use('/api', router);
}