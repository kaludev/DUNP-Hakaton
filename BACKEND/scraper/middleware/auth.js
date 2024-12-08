const UnauthenticatedError = require("../errors/UnauthenticatedError");
const jwt = require('jsonwebtoken')

const authentication = async (req,res,next) =>{
    token = req.headers.authorization;
    console.log(token)
    token = token.split("Bearer ")[1]
    console.log(token)
    if(!token) throw new UnauthenticatedError('You aren\'t logged in');
    try{
        const data = jwt.verify(token,process.env.JWT_SECRET)
        console.log(data)
        req.user = {userId:data.userId, userName: data.userName};
        next()
    }catch{
        throw new UnauthenticatedError('You aren\'t logged in')
    }
}

module.exports = authentication;