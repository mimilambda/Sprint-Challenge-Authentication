const db = require('../database/dbConfig.js');
const request = require('supertest');

const server = require('../api/server');

describe('POST /register', () => {
    beforeEach(async() => {
        await db('users')
            .truncate();
    })

    it('should register member to db', async () => {        
        const newDad = await request(server).post('/api/auth/register')
            .send({ username: 'mimimimi', password: '1234' })
            expect(newDad.body.username).toMatch(/mimimimi/)

    })

    it('should return a status of 201', async () => {
        const response = await request(server).post('/api/auth/register')
        .send({ username: 'mimimimi', password: '1234' })
        expect(response.status).toBe(201)
    })

})

describe('GET /', () => {
    beforeEach(async() => {
        await db('users')
            .truncate();
    })

    it('should register member to db', async () => {        
        const response = await request(server).get('/jokes/jokes-router')
            expect(response.status).toBe(201)

    });
});