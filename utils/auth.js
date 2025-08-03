const jwt = require('jsonwebtoken');

exports.sendTokenResponse = (user, statusCode, res) => {
    payload = {
        user: {
            id: user.id,
            role: user.role,
            expiresIn: process.env.JWT_EXPIRE
        }
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.status(statusCode).json({ token });
}

module.exports = exports;