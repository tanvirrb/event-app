process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = require('chai');
const faker = require('faker');
const { deleteEvents } = require('../src/events/events.service');
const server = require('../src/app');
const _p = require('../src/helpers/asyncWrapper');

chai.use(chaiHttp);

describe('Event test suite', () => {
  beforeEach(async () => {
    await Promise.all([deleteEvents()]);
  });

  it('should create an event', async () => {
    const eventData = {
      name: faker.lorem.words(),
      location: faker.address.city(),
      date: faker.date.future(),
    };

    const [err, res] = await _p(chai.request(server).post('/v1/events').send(eventData));
    const event = res.body.data;
    if (err) console.error('Create test err', err);

    assert.equal(res.status, 201);
    assert.equal(event.name, eventData.name);
    assert.equal(event.location, eventData.location);
    assert.exists(event.date);
  });

  afterEach(async () => {
    await Promise.all([deleteEvents()]);
  });
});
