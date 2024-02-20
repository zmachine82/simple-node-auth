const jwt = require('jsonwebtoken');
const User = require('./User')
const needsValidUser = (callback) => {
    return async (req, res, next) => {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1]
        const payload = jwt.verify(token, 'superSecretJwtSigningKey')
        req.user = await User.findOne({_id: payload.userId })
        callback(req, res, next)
    }
}

module.exports = needsValidUser