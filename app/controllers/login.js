import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service('session'),

  actions: {
    login() {
      this.get('session').authenticate('authenticator:torii', 'babili');
    }
  }
});
