ember-data-application-adapter-service
==============================================================================

[![Greenkeeper badge](https://badges.greenkeeper.io/kellyselden/ember-data-application-adapter-service.svg)](https://greenkeeper.io/)
[![npm version](https://badge.fury.io/js/ember-data-application-adapter-service.svg)](https://badge.fury.io/js/ember-data-application-adapter-service)
[![Build Status](https://travis-ci.org/kellyselden/ember-data-application-adapter-service.svg?branch=master)](https://travis-ci.org/kellyselden/ember-data-application-adapter-service)
[![Ember Version](https://img.shields.io/badge/ember-2.16%2B-brightgreen.svg)](https://www.emberjs.com/)

Send AJAX through your adapter without building the URL

Installation
------------------------------------------------------------------------------

```
ember install ember-data-application-adapter-service
```


Usage
------------------------------------------------------------------------------

Convert

```js
actions: {
  send() {
    let adapter = this.store.adapterFor('application');
    let host = adapter.get('host');
    let namespace = adapter.get('namespace');
    
    adapter.ajax(`${host}/${namespace}/my-url`);
  }
}
```

into

```js
adapter: Ember.inject.service(),

actions: {
  send() {
    this.get('adapter').ajax('my-url');
  }
}
```


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-data-application-adapter-service`
* `npm install`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
