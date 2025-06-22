// server/tests/integration/starship.routes.test.js
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' }); // bring in PORT

let app, mongod;

beforeAll(async () => {
  // spin up the DB
  mongod = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongod.getUri();
  // lazy-import app after env is patched
  app = require('../../src/app');
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe('Starship routes (in-memory DB)', () => {
  it('POST → GET full round-trip', async () => {
    const payload = {
      registryNumber: 'NCC-1701',
      name: 'Enterprise',
      class: 'Constitution',
      commissioned: '2245-01-01',
    };

    // create
    const { body: created } = await request(app)
      .post('/starfleet/starships')
      .send(payload)
      .expect(201);

    expect(created._id).toBeDefined();
    expect(created.registryNumber).toBe('NCC-1701');

    // fetch list
    const { body: list } = await request(app)
      .get('/starfleet/starships')
      .expect(200);

    expect(list).toHaveLength(1);
    expect(list[0].name).toBe('Enterprise');
  });

  it('PUT updates a ship', async () => {
    await request(app)
      .post('/starfleet/starships')
      .send({
        registryNumber: 'NX-74205',
        name: 'Defiant',
        class: 'Defiant',
        commissioned: '2370-01-01',
      });

    const { body: updated } = await request(app)
      .put('/starfleet/starships/NX-74205')
      .send({ status: 'MUSEUM' })
      .expect(200);

    expect(updated.status).toBe('MUSEUM');
  });

  it('DELETE removes a ship', async () => {
    await request(app)
      .post('/starfleet/starships')
      .send({
        registryNumber: 'NCC-1987',
        name: 'Pegasus',
        class: 'Oberth',
        commissioned: '2354-01-01',
      });

    await request(app)
      .delete('/starfleet/starships/NCC-1987')
      .expect(200);

    const { body } = await request(app)
      .get('/starfleet/starships')
      .expect(200);

    expect(body.find(s => s.registryNumber === 'NCC-1987')).toBeUndefined();
  });
});
