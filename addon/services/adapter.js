import { set, getWithDefault, get } from '@ember/object';
import Service, { inject as service } from '@ember/service';

function buildUrl(adapter, url) {
  let host = getWithDefault(adapter, 'host', '');
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

    let params = Array.prototype.slice.call(arguments, 1);

    return adapter.ajax(url, ...params);
  }
});
