# ember-data-application-adapter-service

[![Greenkeeper badge](https://badges.greenkeeper.io/kellyselden/ember-data-application-adapter-service.svg)](https://greenkeeper.io/)

[![npm version](https://badge.fury.io/js/ember-data-application-adapter-service.svg)](https://badge.fury.io/js/ember-data-application-adapter-service)
[![Build Status](https://travis-ci.org/kellyselden/ember-data-application-adapter-service.svg?branch=master)](https://travis-ci.org/kellyselden/ember-data-application-adapter-service)
![Ember Version](https://embadge.io/v1/badge.svg?start=1.13.0)

Send AJAX through your adapter without building the URL

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

## Installation

```sh
ember install ember-data-application-adapter-service
```
