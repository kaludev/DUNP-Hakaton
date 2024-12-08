const createToken = require('./createToken')

const attachCookies = (res,userData) =>{
    const token = createToken(userData);

    return token;

}

module.exports = attachCookies;