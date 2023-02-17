process.env.NODE_ENV = 'test';
describe('Wait hook before running test', () => {
  before(async () => {
    const waitingTime = 1000;
    await new Promise((resolve) => setTimeout(resolve, waitingTime));
    console.log(`Waited ${waitingTime}ms before running tests`);
  });

  it('should delay before running tests', async () => {});
});
