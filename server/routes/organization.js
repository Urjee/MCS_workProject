module.exports = app => {
    const organization = require('../controllers/organizationController');
    const router = require('express').Router();

    router.get('/organization', organization.allOrganization);

    app.use('/api', router);
}