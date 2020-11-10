const request = require('supertest');
const app = require('../app');
const { User } = require('../models');
const { Op } = require('sequelize');


const mock = [
    {
        firstName: "User1",
        lastName: "Password1",
        email: "User1@gmail.com",
        password: "12345aA@!",
        repeatPassword: "12345aA@!",
        birthDate: "1970-01-01"
    },
    {
        firstName: "User2",
        lastName: "Password2",
        email: "User2@gmail.com",
        password: "56789bB@!",
        repeatPassword: "56789bB@!",
        birthDate: "1980-01-01"
    }
]

describe('user models test', () => {


    beforeEach(async () => {
        await User.destroy({
            where: {
                id: {
                    [Op.gt]: 0
                }
            }
        })
    })


    test('can add new user', async () => {

    })
})
