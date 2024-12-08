const express = require('express')
const {login,showMe,profile,logout} = require('../controllers/users')
const auth = require('../middleware/auth');
const router = express.Router();

router.route('/login').post(login);

router.route('/showme').get(auth,showMe);
router.route("/profile").get(auth,profile)
router.route('/logout').post(auth,logout);
module.exports = router