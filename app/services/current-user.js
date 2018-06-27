import { inject as service } from '@ember/service';
import Service from '@ember/service';
import RSVP from 'rsvp'; 

// https://github.com/simplabs/ember-simple-auth/blob/master/guides/managing-current-user.md

export default Service.extend({
  session: service('session'),
  store: service(),

  load() {
    if (this.get('session.isAuthenticated')) {
      return this.get('store').findRecord('user', '#').then((user) => {
        this.set('user', user);
      });
    } else {
      return RSVP.resolve();
    }
  }
});