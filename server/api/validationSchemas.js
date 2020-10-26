const Joi = require('joi');
const { User } = require('../models')

async function UserSchema() {

    const takenEmails = await User.getTakenEmails()

    return Joi.object({
        firstName: Joi.string().min(2).max(25).required(),
        lastName: Joi.string().min(2).max(25).required(),
        email: Joi.string().email().invalid(...takenEmails).required(),
        password: Joi.string().min(8).max(15).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/).required(),
        repeatPassword: Joi.ref('password'),
        birthDate: Joi.date().less('now')
    })
}


const SongSchema = Joi.object({
    title: Joi.string().max(50).required(),
    artistId: Joi.number().min(1).required(),
    albumId: Joi.number().min(1),
    lyrics: Joi.string(),
    length: Joi.string().regex(/^([0-5])([0-9])\:([0-5])([0-9])\:([0-5])([0-9])$/),
    releasedAt: Joi.date().less('now'),
    youtubeLink: Joi.string().uri().regex(/^(https:\/\/((music)|(www)).youtube.com\/watch\?v=)/).required(),
    coverImg: Joi.string()
})

const PlaylistSchema = Joi.object({
    name: Joi.string().max(50).required(),
    coverImg: Joi.string(),
    genre: Joi.string().max(50),
    creator: Joi.number().required()
})

const ArtistSchema = Joi.object({
    name: Joi.string().max(50).required(),
    birthDate: Joi.date().less('now'),
    coverImg: Joi.string()
})

const AlbumSchema = Joi.object({
    name: Joi.string().max(50).required(),
    artistId: Joi.number().min(1),
    publishedAt: Joi.date().less('now'),
    coverImg: Joi.string()
})

module.exports = {
    SongSchema,
    ArtistSchema,
    AlbumSchema,
    PlaylistSchema,
    UserSchema
}