import DS from 'ember-data'
import { inject as service } from '@ember/service';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import config from '../config/environment';

const { RESTAdapter } = DS;
const hostUri = config.torii.providers['babili'].host;

export default RESTAdapter.extend(DataAdapterMixin, {
  namespace: 'api',
  host: hostUri,

  session: service('session'), 
  authorize(xhr) {
    let { access_token } = this.get('session.data.authenticated');
    xhr.setRequestHeader('Authorization', `Bearer ${access_token}`);
  }
});