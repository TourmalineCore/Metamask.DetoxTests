const config = require('../package.json').detox; // eslint-disable-line

import detox from 'detox';
import adapter from 'detox/runners/jest/adapter';

jest.setTimeout(2250000);
jasmine.getEnv().addReporter(adapter);

beforeAll(async () => {
  await detox.init(config);
  await device.launchApp();
  await device.enableSynchronization();
});

beforeEach(async () => {
  await adapter.beforeEach();
});

afterAll(async () => {
  await adapter.afterAll();
  await detox.cleanup();
  jest.setTimeout(2250000);
});
