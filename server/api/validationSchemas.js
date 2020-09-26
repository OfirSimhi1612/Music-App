const Joi = require('joi');

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
    genre: Joi.string().max(50)
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
    PlaylistSchema
}