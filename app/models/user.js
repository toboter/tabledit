import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  username: attr('string'),
  display_name: attr('string'),
  image_thumb_50: attr('string')
});