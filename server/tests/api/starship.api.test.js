const request = require('supertest');
const app = require('../../src/app');

describe('Starship API Endpoints', () => {
  const validShip = {
    registryNumber: 'NCC-1864',
    name: 'Reliant',
    class: 'Miranda-class',
    commissioned: '2280-01-01',
    status: 'ACTIVE'
  };

  const invalidShip = {
    name: 'No Registry'
  };

  test('POST /starfleet/starships - Valid request', async () => {
    const response = await request(app)
      .post('/starfleet/starships')
      .send(validShip)
      .expect(201);
    
    expect(response.body).toMatchObject(validShip);
    expect(response.body).toHaveProperty('_id');
  });

  test('POST /starfleet/starships - Invalid request', async () => {
    const response = await request(app)
      .post('/starfleet/starships')
      .send(invalidShip)
      .expect(400);
    
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('registryNumber');
  });

  test('GET /starfleet/starships/:registry - Found', async () => {
    // Create first to ensure existence
    const created = await request(app)
      .post('/starfleet/starships')
      .send(validShip);
    
    const response = await request(app)
      .get(`/starfleet/starships/${validShip.registryNumber}`)
      .expect(200);
    
    expect(response.body.registryNumber).toBe(validShip.registryNumber);
  });

  test('GET /starfleet/starships/:registry - Not Found', async () => {
    await request(app)
      .get('/starfleet/starships/NCC-9999')
      .expect(404);
  });

  test('PUT /starfleet/starships/:registry - Valid update', async () => {
    const created = await request(app)
      .post('/starfleet/starships')
      .send(validShip);
    
    const update = { status: 'MUSEUM' };
    const response = await request(app)
      .put(`/starfleet/starships/${validShip.registryNumber}`)
      .send(update)
      .expect(200);
    
    expect(response.body.status).toBe('MUSEUM');
  });

  test('DELETE /starfleet/starships/:registry - Success', async () => {
    await request(app)
      .post('/starfleet/starships')
      .send(validShip);
    
    const response = await request(app)
      .delete(`/starfleet/starships/${validShip.registryNumber}`)
      .expect(200);
    
    expect(response.body.deleted).toBe(true);
  });
});