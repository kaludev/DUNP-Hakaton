require('dotenv').config();
const jwt = require('jsonwebtoken')

module.exports = ({id,username}) => {
    console.log(id)
    return jwt.sign({userId:id,userName:username},process.env.JWT_SECRET);
}