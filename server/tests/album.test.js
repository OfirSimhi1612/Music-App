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
        name: "Geography",
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

        const albumFromDB = await Album.findAll();

        expect(albumFromDB[0].id).not.toBe(null);
        expect(albumFromDB[0].name).toBe(mock[0].name);
        expect(albumFromDB[0].birthDate).toBe(mock[0].birthDate);
    })


    test('can get album by id', async () => {
        const { body: postAlbum1 } = await request(app).post('/album').send(mock[0]);
        const { body: postAlbum2 } = await request(app).post('/album').send(mock[1]);

        const albumsFromDB = await Album.findAll()

        expect(albumsFromDB[0].name).toBe(mock[0].name);
        expect(albumsFromDB[1].name).toBe(mock[1].name);

        const { body: getAlbum1 } = await request(app).get(`/album/${postAlbum1.id}`)
        const { body: getAlbum2 } = await request(app).get(`/album/${postAlbum2.id}`)

        expect(getAlbum1.name).toBe(mock[0].name);
        expect(getAlbum1.publishedAt).toBe(mock[0].publishedAt)

        expect(getAlbum2.name).toBe(mock[1].name);
        expect(getAlbum2.publishedAt).toBe(mock[1].publishedAt)

    })


    test('can search album', async () => {
        const postAlbum1 = await request(app).post('/album').send(mock[0]);
        const postAlbum2 = await request(app).post('/album').send(mock[1]);

        const albumsFromDB = await Album.findAll()

        expect(albumsFromDB[0].name).toBe(mock[0].name);
        expect(albumsFromDB[1].name).toBe(mock[1].name);

        const { body: searchResults } = await request(app).get(`/album/search/gold`);

        expect(searchResults.length).toBe(1)
        expect(searchResults[0].name).toBe('Love Over Gold')

        const { body: searchResults2 } = await request(app).get(`/album/search/g`);

        expect(searchResults2.length).toBe(2)
        expect(searchResults[0].publishedAt).toBe('1990-01-01')
        expect(searchResults2[1].name).toBe('Geography')
    })


    test('can like/dislike album', async () => {
        const postAlbum1 = await request(app).post('/album').send(mock[0]);

        const albumsFromDB = await Album.findAll()

        expect(albumsFromDB[0].name).toBe(mock[0].name);
        expect(albumsFromDB[0].likes).toBe(0)

        const { body: isLiked1 } = await request(app).patch(`/album/like/${albumsFromDB[0].id}?like`);
        const { body: isLiked2 } = await request(app).patch(`/album/like/${albumsFromDB[0].id}?like`);
        const likedAlbum = await Album.findAll()

        expect(isLiked1).toBe(true)
        expect(isLiked2).toBe(true)
        expect(likedAlbum[0].likes).toBe(2)

        const { body: isLiked3 } = await request(app).patch(`/album/like/${albumsFromDB[0].id}?dislike`);
        const dislikedAlbum = await Album.findAll()

        expect(isLiked3).toBe(true)
        expect(dislikedAlbum[0].likes).toBe(1)

    })

    test('can delete and restore albums', async () => {
        const postAlbum1 = await request(app).post('/album').send(mock[0]);

        const albumsFromDB = await Album.findAll()

        expect(albumsFromDB[0].name).toBe(mock[0].name);

        const { body: isDeleted } = await request(app).delete(`/album/${albumsFromDB[0].id}`)

        const albumsFromDB1 = await Album.findAll()

        expect(isDeleted).toBe(true)
        expect(albumsFromDB1.length).toBe(0)

        const { body: isRestored } = await request(app).patch(`/album/restore/${albumsFromDB[0].id}`)

        const albumsFromDB2 = await Album.findAll()

        expect(isRestored).toBe(true)
        expect(albumsFromDB2.length).toBe(1)
        expect(albumsFromDB2[0].name).toBe(mock[0].name);
    })

})