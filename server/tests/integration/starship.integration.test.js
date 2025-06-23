const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../src/app');
const Starship = require('../../src/models/Starship');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  process.env.MONGO_URI = uri;
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Starship.deleteMany({});
});

describe('Database Integration Tests', () => {
  const testShip = {
    registryNumber: 'NCC-1701-D',
    name: 'Enterprise',
    class: 'Galaxy-class',
    commissioned: '2363-10-04',
    status: 'ACTIVE'
  };

  test('POST creates a new starship', async () => {
    const response = await request(app)
      .post('/starfleet/starships')
      .send(testShip)
      .expect(201);

    expect(response.body).toMatchObject(testShip);
    
    // Verify database state
    const ship = await Starship.findOne({ registryNumber: 'NCC-1701-D' });
    expect(ship.name).toBe('Enterprise');
  });

  test('GET retrieves all starships', async () => {
    await new Starship(testShip).save();
    
    const response = await request(app)
      .get('/starfleet/starships')
      .expect(200);
    
    expect(response.body.length).toBe(1);
    expect(response.body[0].registryNumber).toBe('NCC-1701-D');
  });

  test('PUT updates a starship', async () => {
    const ship = await new Starship(testShip).save();
    
    const update = { name: 'Enterprise-D' };
    const response = await request(app)
      .put(`/starfleet/starships/${ship.registryNumber}`)
      .send(update)
      .expect(200);
    
    expect(response.body.name).toBe('Enterprise-D');
    
    // Verify database update
    const updated = await Starship.findById(ship._id);
    expect(updated.name).toBe('Enterprise-D');
  });

  test('DELETE removes a starship', async () => {
    const ship = await new Starship(testShip).save();
    
    await request(app)
      .delete(`/starfleet/starships/${ship.registryNumber}`)
      .expect(200);
    
    // Verify database deletion
    const deleted = await Starship.findById(ship._id);
    expect(deleted).toBeNull();
  });

  test('Returns 404 for non-existent starship', async () => {
    await request(app)
      .get('/starfleet/starships/NCC-9999')
      .expect(404);
  });
});