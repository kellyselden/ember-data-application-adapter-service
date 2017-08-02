import Ember from 'ember';

const {
  Service,
  get, getWithDefault,
  set,
  inject: { service }
} = Ember;

function buildUrl(adapter, url) {
  let host = getWithDefault(adapter, 'host', 'http://localhost:4200');
  let namespace = get(adapter, 'namespace');

  let parts = [host];
  if (namespace) {
    parts.push(namespace);
  }
  parts.push(url);

  return parts.join('/');
}

export default Service.extend({
  store: service(),

  init() {
    this._super(...arguments);

    let adapter = get(this, 'store').adapterFor('application');
    set(this, '_adapter', adapter);
  },

  ajax(url) {
    let adapter = get(this, '_adapter');

    let shouldIgnore = url.match(/^https?:\/\//);
    if (!shouldIgnore) {
      url = buildUrl(adapter, url);
    }

    let params = Array.prototype.slice.call(arguments).slice(1);

    return adapter.ajax(url, ...params);
  }
});
