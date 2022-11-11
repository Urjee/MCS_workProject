module.exports = app => {
    const users = require('../controllers/userController');
    const router = require('express').Router();

    router.post('/login', users.login);
    router.post('/register', users.register);
    router.get('/users', users.allUsers);
    router.post('/addUser', users.addUser);
    router.post('/adminCreateUser', users.adminCreateUser);
    router.post('/headUser', users.headUser);
    
    router.post('/headUserDetails', users.headUserDetails);
    router.post('/userDetails', users.userDetails);
    router.post('/deleteUser', users.deleteUser);
    // router.get('/settingsGet', users.settingsGet);
    router.put('/settings', users.settings);

    app.use('/api', router);
}