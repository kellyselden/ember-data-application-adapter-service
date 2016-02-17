import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: 'test-host',
  namespace: 'test-namespace'
});
