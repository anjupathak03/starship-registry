// server/tests/unit/starship.controller.test.js
const { listStarships, getStarship, createStarship } =
  require('../../src/controllers/starship');
const Starship = require('../../src/models/Starship');

jest.mock('../../src/models/Starship');

describe('Starship controller (mocked DB)', () => {
  const res = () => {
    const r = {};
    r.json = jest.fn().mockReturnValue(r);
    r.status = jest.fn().mockReturnValue(r);
    return r;
  };

  afterEach(jest.clearAllMocks);

  it('listStarships returns all ships', async () => {
    Starship.find.mockResolvedValueOnce([{ name: 'Defiant' }]);
    const r = res();
    await listStarships({}, r);
    expect(Starship.find).toHaveBeenCalledWith();
    expect(r.json).toHaveBeenCalledWith([{ name: 'Defiant' }]);
  });

  it('getStarship 404s when missing', async () => {
    Starship.findOne.mockResolvedValueOnce(null);
    const r = res();
    await getStarship({ params: { registry: 'NCC-404' } }, r);
    expect(r.status).toHaveBeenCalledWith(404);
    expect(r.json).toHaveBeenCalledWith({ message: 'Not found' });
  });

  it('createStarship 400s on validation error', async () => {
    Starship.create.mockRejectedValueOnce(new Error('validation'));
    const r = res();
    await createStarship({ body: {} }, r);
    expect(r.status).toHaveBeenCalledWith(400);
    expect(r.json).toHaveBeenCalledWith({ error: 'validation' });
  });
});
