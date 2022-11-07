module.exports = app => {
    const state = require('../controllers/stateController');
    const router = require('express').Router();

    router.get('/state', state.allState);

    app.use('/api', router);
}