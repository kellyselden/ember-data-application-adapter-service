import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';

let server;
let service;

module('Integration | Service | adapter', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    server = sinon.fakeServer.create();
    server.respondImmediately = true;

    service = this.owner.lookup('service:adapter');
  });

  hooks.afterEach(function() {
    server.restore();
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
});
