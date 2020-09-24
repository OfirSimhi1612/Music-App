const request = require('supertest');
const app = require('../app');
const { Album, Artist } = require('../models');
const { Op } = require('sequelize');


const mock = [
    {
        name: "Love Over Gold",
        publishedAt: '1990-01-01',
        coverImg: 'https://img.discogs.com/zFVoxciYn3vOd3svZgQAXQrkNDQ=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-13706512-1559425307-3223.jpeg.jpg'
    },
    {
        name: "Geograpy",
        publishedAt: '2000-01-01',
        coverImg: 'https://img.discogs.com/zFVoxciYn3vOd3svZgQAXQrkNDQ=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-13706512-1559425307-3223.jpeg.jpg'
    }
]

describe('test album model', () => {

    beforeAll(async () => {

        await Artist.destroy({
            where: {
                id: {
                    [Op.gt]: 0
                }
            }
        })

        const Artist1 = await Artist.create({
            name: 'Dire Straits',
            birthDate: '1970-10-12',
            coverImg: 'https://img.discogs.com/zFVoxciYn3vOd3svZgQAXQrkNDQ=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-13706512-1559425307-3223.jpeg.jpg'
        });
        const Artist2 = await Artist.create({
            name: 'Tom Misch',
            birthDate: '1990-01-01',
            coverImg: 'https://img.discogs.com/zFVoxciYn3vOd3svZgQAXQrkNDQ=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-13706512-1559425307-3223.jpeg.jpg'
        });

        mock[0].artistId = Artist1.id;
        mock[1].artistId = Artist2.id;

    })

    beforeEach(async () => {
        await Album.destroy({
            where: {
                id: {
                    [Op.gt]: 0
                }
            }
        })
    })

    // afterAll(async () => {
    //     await Album.destroy({
    //         where: {
    //             id: {
    //                 [Op.gt]: 0
    //             }
    //         }
    //     })

    //     await Artist.destroy({
    //         where: {
    //             id: {
    //                 [Op.gt]: 0
    //             }
    //         }
    //     })
    // })

    test('can insert new album', async () => {
        const { body: newAlbum } = await request(app).post('/album').send(mock[0]);
        console.log(newAlbum);
        expect(newAlbum.id).not.toBe(null);
        expect(newAlbum.name).toBe(mock[0].name);
        expect(newAlbum.birthDate).toBe(mock[0].birthDate);
    })


    test('can get album by id', async () => {
        const { body: postAlbum1 } = await request(app).post('/album').send(mock[0]);
        const { body: postAlbum2 } = await request(app).post('/album').send(mock[1]);

        expect(postAlbum1.name).toBe(mock[0].name);
        expect(postAlbum2.name).toBe(mock[1].name);

        const { body: getAlbum1 } = await request(app).get(`/album/${postAlbum1.id}`)
        const { body: getAlbum2 } = await request(app).get(`/album/${postAlbum2.id}`)

        expect(getAlbum1.name).toBe(mock[0].name);
        expect(getAlbum1.publishedAt).toBe(mock[0].publishedAt)

        expect(getAlbum2.name).toBe(mock[1].name);
        expect(getAlbum2.publishedAt).toBe(mock[1].publishedAt)

    })


})