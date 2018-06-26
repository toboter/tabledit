import BabiliSerializer from './application';

export default BabiliSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    if (id === '#') {
//      payload.repos_url = payload.repos_url.replace(`users/${payload.id}`, 'user');
    }
    return this._super(store, primaryModelClass, payload, id, requestType);
  },

  normalize(modelClass, resourceHash, prop) {
    resourceHash.id = resourceHash.recordId || resourceHash.login;
    resourceHash.links = {
      repositories: resourceHash.repos_url
    }

    return this._super(modelClass, resourceHash, prop);
  }
});