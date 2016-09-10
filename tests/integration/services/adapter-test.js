import { moduleFor, test } from 'ember-qunit';
import sinon from 'sinon';

let server;
let service;

moduleFor('service:adapter', 'Integration | Service | adapter', {
  integration: true,
  beforeEach() {
    server = sinon.fakeServer.create();
    server.respondImmediately = true;

    service = this.subject();
  },
  afterEach() {
    server.restore();
  }
});

test('calls ajax with full url', function(assert) {
  server.respondWith('test-host/test-namespace/test-url', '[12]');

  return service.ajax('test-url').then(response => {
    assert.deepEqual(response, [12]);
  });
});

test('sends POST', function(assert) {
  server.respondWith('POST', 'test-host/test-namespace/test-url', '[12]');

  return service.ajax('test-url', 'POST').then(response => {
    assert.deepEqual(response, [12]);
  });
});
