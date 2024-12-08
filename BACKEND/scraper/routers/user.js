const express = require('express')
const {register,login,showMe,logout,upload,profilePic,search, like, dislike} = require('../controllers/users')
const auth = require('../middleware/auth');
const router = express.Router();

router.route('/login').post(login);

router.route('/showme').get(auth,showMe);
router.route('/logout').post(auth,logout);
module.exports = router