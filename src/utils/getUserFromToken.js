const JWT = require('jsonwebtoken');
const JWT_Signature = "usually a very long string";

async function getUserFromToken(token) {
    try{
        return await JWT.verify(token, JWT_Signature);
    }
    catch{
        return null;
    }
}

module.exports = getUserFromToken;