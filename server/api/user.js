const { Router } = require('express');
const Joi = require('joi');
const { User, Interaction, Playlist } = require('../models');
const { UserSchema, PlaylistSchema } = require('./validationSchemas');
const bcrypt = require('bcrypt');
const session = require('express-session')
const cookieParser = require('cookie-parser');

const router = Router();

router.use(cookieParser());

router.use(session({
    key: 'music_sid',
    secret: process.env.SESS_SECRET || 'test',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24000 * 60 * 60,
        // httpOnly: true,
        // secure: true,
        // sameSite: true
    }
}));

router.use((req, res, next) => {
    if (req.cookies.test && !req.session.user_id) {
        res.clearCookie('music_sid')
    }
    next()
});

router.get('/auth', async (req, res) => {
    try {
        console.log(req.session)
        if (req.session.user_id) {
            const user = await User.findByPk(req.session.user_id)

            res.json({
                authorized: true,
                name: user.firstName,
                id: user.id
            })
        } else {
            res.status(401).json({
                authorized: false,
            })
        }

    } catch (error) {
        console.log(error)
        re.status(500).send(error.message)
    }
})

router.post('/interaction', async (req, res) => {
    try {
        const posted = await Interaction.create(req.body)

        if (posted) {
            res.send(true)
        } else {
            res.status(500).send(false)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email && !password) {
            throw 'missing details'
        }

        const user = await User.findAll({
            where: {
                email: email,
            }
        })

        if (user.length === 0) {
            res.status(404).send({
                authorized: false,
                error: 'User Does Not Exist'
            })
        } else {
            bcrypt.compare(password, user[0].password, (err, succ) => {
                if (err) {
                    res.status(500).send(err.message)
                }
                if (succ) {
                    req.session.user_id = user[0].id;
                    console.log(req.session)
                    res.status(200).send({
                        authorized: true,
                        name: user[0].firstName,
                        id: user[0].id,
                        isAdmin: user[0].isAdmin
                    })
                } else {
                    res.status(401).send({
                        authorized: false,
                        error: 'Incorrect Password'
                    })
                }
            })

        }


    } catch (error) {
        console.log(error)
        res.status(404).send(error.message)
    }
})

router.get('/Logout', async (req, res) => {
    try {
        req.session.user_id = null;
        res.cookie("music_sid", "");
        res.send(true)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})

router.post('/signUp', async (req, res) => {
    try {

        const validatedUser = await Joi.attempt(req.body, await UserSchema());

        validatedUser.password = await bcrypt.hash(validatedUser.password, 10);

        const newUser = await User.create(validatedUser);

        await Playlist.create({
            name: `user ${newUser.id} playlist`,
            isPublic: false,
            genre: newUser.id,
            creator: newUser.id
        })

        req.session.user_id = newUser.id;

        res.status(200).send({
            authorized: true,
            name: newUser.firstName,
            id: newUser.id,
            isAdmin: newUser.isAdmin
        })

    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
})



module.exports = router;