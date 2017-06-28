import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import sinon from 'sinon';

const {
  RSVP: { Promise }
} = Ember;

let service;
let adapter;
let adapterForStub, ajaxStub;

moduleFor('service:adapter', 'Unit | Service | adapter', {
  beforeEach() {
    ajaxStub = sinon.stub().returns(Promise.resolve(12));
    adapter = {
      host: 'test-host',
      namespace: 'test-namespace',
      ajax: ajaxStub
    };
    adapterForStub = sinon.stub().returns(adapter);

    service = this.subject({
      store: {
        adapterFor: adapterForStub
      }
    });
  }
});

test('grabs application adapter', function(assert) {
  return service.ajax('test-url').then(() => {
    assert.deepEqual(adapterForStub.args, [['application']]);
  });
});

test('calls adapter.ajax with full url', function(assert) {
  return service.ajax('test-url').then(() => {
    assert.deepEqual(ajaxStub.args, [['test-host/test-namespace/test-url']]);
  });
});

test('calls adapter.ajax with remaining params', function(assert) {
  return service.ajax('test-url', 23, 34).then(() => {
    assert.deepEqual(ajaxStub.args, [['test-host/test-namespace/test-url', 23, 34]]);
  });
});

test('skips the logic if starts with http://', function(assert) {
  return service.ajax('http://test-url').then(() => {
    assert.deepEqual(ajaxStub.args, [['http://test-url']]);
  });
});

test('skips the logic if starts with https://', function(assert) {
  return service.ajax('https://test-url').then(() => {
    assert.deepEqual(ajaxStub.args, [['https://test-url']]);
  });
});

test('returns adapter.ajax response', function(assert) {
  return service.ajax('test-url').then(response => {
    assert.strictEqual(response, 12);
  });
});

test('uses default host if not supplied', function(assert) {
  delete adapter.host;

  return service.ajax('test-url').then(() => {
    assert.deepEqual(ajaxStub.args, [['http://localhost:4200/test-namespace/test-url']]);
  });
});

test('uses default namespace if not supplied', function(assert) {
  delete adapter.namespace;

  return service.ajax('test-url').then(() => {
    assert.deepEqual(ajaxStub.args, [['test-host/test-url']]);
  });
});
