const jwt = require('jsonwebtoken');


const generateToken = (data) => {
    const token =jwt.sign(data,'tushar',{expiresIn:'1h'});
    return token
}


const accessToken = (req, res, next) => {
    const token = req.headers.cookie.split('=')[1];
    const decoded = jwt.verify(token,'tushar')
    req.data = decoded
    next()
}

module.exports = {generateToken, accessToken}
