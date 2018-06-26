import BabiliAdapter from './application';

export default BabiliAdapter.extend({
  urlForFindRecord(id, modelName, snapshot) {
    const isInteger = /^\d+$/;
    let builtURL = this._super(id, modelName, snapshot);
    if (id === '#') {
      builtURL = builtURL.replace('users/%23', 'user');
    } else if (isInteger.test(id)) {
      builtURL = builtURL.replace('/users/', '/user/')
    }
    return builtURL;
  }
});