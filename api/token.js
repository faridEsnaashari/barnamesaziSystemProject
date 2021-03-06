const jwt = require('jsonwebtoken');
const KEY = 'xxxxxxxxxxx';

const create = (userId) => {
    return jwt.sign(userId, KEY);
};

const verify = (token) => {
    try{
        return jwt.verify(token, KEY);
    }
    catch(err){
        throw err;
    }
}

const tokenFunctions = {
    create : create,
    verify : verify
};

module.exports = tokenFunctions;
