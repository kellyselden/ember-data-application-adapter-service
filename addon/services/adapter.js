import Ember from 'ember';

const {
  Service,
  get,
  inject: { service },
  computed
} = Ember;

export default Service.extend({
  store: service(),

  _adapter: computed(function() {
    return get(this, 'store').adapterFor('application');
  }),

  ajax(url) {
    let adapter = get(this, '_adapter');

    let {
      host,
      namespace
    } = adapter;

    url = `${host}/${namespace}/${url}`;

    let params = Array.prototype.slice.call(arguments).slice(1);

    return adapter.ajax(url, ...params);
  }
});
