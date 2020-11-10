const jwt = require('jsonwebtoken');
const cookie = require('cookie')

const userAuth = async (req, res, next) => {
    try {
        let token = '';

        if (req.headers.cookie) {
            const cookies = cookie.parse(req.headers.cookie)
            token = cookies.music_jwt
        }

        if (token) {
            token = token.slice(7, token.length);
            jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
                if (error) {
                    res.status(401).send('Token is Not Valid')
                } else {
                    req.decoded = decoded
                    next()
                }
            })
        } else {
            res.status(401).send('No Token supplied')
        }

    } catch (error) {
        res.status(500).send(error.message)
    }

}

module.exports = {
    userAuth
}