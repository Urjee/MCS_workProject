module.exports = app => {
    const users = require('../controllers/userController');
    const router = require('express').Router();

    router.post('/login', users.login);
    router.post('/register', users.register);
    router.post('/users', users.allUsers);
    router.post('/addUser', users.addUser);
    router.post('/adminCreateUser', users.adminCreateUser);
    router.post('/headUser', users.headUser);
    
    router.post('/headUserDetails', users.headUserDetails);
    router.post('/userDetails', users.userDetails);
    router.post('/deleteUser', users.deleteUser);
    router.put('/settings', users.settings);
    router.get('/totalOrganization', users.totalOrganization);
    router.get('/stateStatistic', users.stateStatistic);
    app.use('/api', router);
}