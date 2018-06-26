import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import config from '../config/environment';

export default Controller.extend({
  session: service('session'),
  config: config.torii.providers['babili'],

  actions: {
    logout() {
      this.get('session').invalidate();
    }
  }
});