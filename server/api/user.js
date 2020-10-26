const { Router } = require('express');
const Joi = require('joi');
const { User, Interaction, Playlist } = require('../models');
const { UserSchema } = require('./validationSchemas');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { userAuth }  = require('../authentication/auth')

const router = Router();

router.use(cookieParser());

const newToken = (name, id, lifeTime) => {
    const token = jwt.sign({
        userId: id,
        userName: name
        //role?
    },
    process.env.JWT_SECRET,
    {
        expiresIn: lifeTime
    }
    )

    return `bearer ${token}`
}

router.get('/auth', userAuth, (req, res) => {
    try {
        res.json({
            name: req.decoded.userName,
            id: req.decoded.userId
        })
    } catch (error) {
        console.log(error)
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

        const user = await User.findOne({
            where: {
                email: email,
            }
        })

        if (!user) {
            res.status(404).send('User Does Not Exist')
        } else {
            bcrypt.compare(password, user.password, (err, succ) => {
                if (err) {
                    res.status(500).send('Wrong password!')
                } else if (succ) {
                    const token = newToken(user.firstName, user.id, '5d')

                    res.cookie('music_jwt', token)
                    res.send({
                        name: user.firstName,
                        id: user.id
                    })
                } else {
                    res.status(401).send('Incorrect Password')
                }
            })

        }


    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server error')
    }
})

router.get('/Logout', userAuth, async (req, res) => {
    try {
        res.cookie("music_jwt", "");
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
            name: `user ${newUser.id} playlist - systemPlaylist`,
            isPublic: false,
            genre: newUser.id,
            creator: newUser.id
        })

        const token = newToken(newUser.firstName, newUser.id, '5d')

        res.cookie('music_jwt', token)

        res.status(200).send({
            name: newUser.firstName,
        })

    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
})



module.exports = router;