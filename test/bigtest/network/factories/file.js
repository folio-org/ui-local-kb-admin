import { Factory } from 'miragejs';
import faker from 'faker';

export default Factory.extend({
  id: () => faker.random.uuid(),
  contentType: () => 'application/json',
  size: () => faker.random.number(),
  modified: () => faker.date.recent().getTime(),
  name: () => faker.random.words()
});
