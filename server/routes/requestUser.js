module.exports = app => {
    const requestUser = require('../controllers/requestUserController');

    const router = require('express').Router();

    router.get('/requestUser', requestUser.allUserRequests);

    app.use('/api', router);
}