const server = require('./server.js');
const request = require('supertest')

describe("GET /", () => {
  it("should return an OK status code from the index route", async () => {
    const expectedStatusCode = 200;

    const response = await request(server).get("/");

    expect(response.status).toEqual(expectedStatusCode);
  });

  it("should return JSON", async () => {
    const response = await request(server).get("/");

    expect(response.type).toMatch(/json/i);
  });

  it('should return { api: "running" }', async () => {
    const response = await request(server).get("/");

    expect(response.body).toEqual({ api: "running" });
    expect(response.body.api).toBe("running");
  });
});

describe('{POST / register route', () => {
    
    it('should return a JSON object', async () => {
        const response = await request(server).post('/api/auth/register')
        .send({
            "username": "Mimi2",
            "password": "verysecure"
        })

        expect(response.type).toEqual('application/json');
    })

    it('should return status 200', async () => {
        const expectedStatusCode = 200;
        const response = await request(server).post('/api/auth/login')
        .send({
            "username": "Mimi2",
            "password": "verysecure"
        })
        expect(response.status).toEqual(expectedStatusCode);
    })
})

describe('POST/ login route', () => {

    it('should return a JSON object', async () => {
        const response = await request(server).post('/api/auth/login');

        expect(response.type).toEqual('application/json');
    })

    it('should return status 200', async () => {
        const expectedStatusCode = 200;
        const response = await request(server).post('/api/auth/login')
        .send({
            "username": "Mimi2",
            "password": "verysecure"
        })
        expect(response.status).toEqual(expectedStatusCode);
    })
})