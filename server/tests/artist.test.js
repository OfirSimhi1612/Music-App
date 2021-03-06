const request = require('supertest');
const app = require('../app');
const { Artist } = require('../models');
const { Op } = require('sequelize');


const mock = [
    {
        name: 'Dire Straits',
        birthDate: '1970-10-12',
        coverImg: 'https://img.discogs.com/zFVoxciYn3vOd3svZgQAXQrkNDQ=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-13706512-1559425307-3223.jpeg.jpg'
    },
    {
        name: 'Tom Misch',
        birthDate: '1990-01-01',
        coverImg: 'https://img.discogs.com/zFVoxciYn3vOd3svZgQAXQrkNDQ=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-13706512-1559425307-3223.jpeg.jpg'
    }
]

describe('test artist model', () => {

    beforeEach(async () => {
        await Artist.destroy({
            where: {
                id: {
                    [Op.gt]: 0
                }
            }
        })
    })

    await test('can insert new artist', async () => {
        const { body: newArtist } = await request(app).post('/artist').send(mock[0]);

        expect(newArtist.id).not.toBe(null);
        expect(newArtist.name).toBe(mock[0].name);
        expect(newArtist.birthDate).toBe(mock[0].birthDate);
    })


    await test('can get artist by id', async () => {
        const { body: postArtist1 } = await request(app).post('/artist').send(mock[0]);
        const { body: postArtist2 } = await request(app).post('/artist').send(mock[1]);

        expect(postArtist1.name).toBe(mock[0].name);
        expect(postArtist2.name).toBe(mock[1].name);

        const { body: getArtist1 } = await request(app).get(`/artist/${postArtist1.id}`)
        const { body: getArtist2 } = await request(app).get(`/artist/${postArtist2.id}`)

        expect(getArtist1.name).toBe(mock[0].name);
        expect(getArtist1.birthDate).toBe(mock[0].birthDate)

        expect(getArtist2.name).toBe(mock[1].name);
        expect(getArtist2.birthDate).toBe(mock[1].birthDate)

    })


})