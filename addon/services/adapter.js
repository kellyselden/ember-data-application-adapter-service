import Ember from 'ember';

const {
  Service,
  get, getWithDefault,
  inject: { service },
  computed
} = Ember;

export default Service.extend({
  store: service(),

  _adapter: computed(function() {
    return get(this, 'store').adapterFor('application');
  }),

  _buildUrl(adapter, url) {
    let host = getWithDefault(adapter, 'host', 'http://localhost:4200');
    let namespace = get(adapter, 'namespace');

    let parts = [host];
    if (namespace) {
      parts.push(namespace);
    }
    parts.push(url);

    return parts.join('/');
  },

  ajax(url) {
    let adapter = get(this, '_adapter');

    let shouldIgnore = url.match(/^https?:\/\//);
    if (!shouldIgnore) {
      url = this._buildUrl(adapter, url);
    }

    let params = Array.prototype.slice.call(arguments).slice(1);

    return adapter.ajax(url, ...params);
  }
});
