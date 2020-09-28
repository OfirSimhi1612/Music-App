const { Router } = require('express')
const session = require('express-session');
var cookieParser = require('cookie-parser');

const router = Router();

router.use(cookieParser());

router.use(session({
    key: 'sid',
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    secure: process.env.PROD_DB_DATABASE = 'music_app_prod',
    cookie: {
        maxAge: 24000 * 60 * 60,
        httpOnly: true
    }
}));

router.use((req, res, next) => {
    if (req.cookies.test && !req.session.user_id) {
        res.clearCookie('sid')
    }
    next()
});

router.get('/test', (req, res) => {
    res.send(req.cookies)
});

module.exports = router