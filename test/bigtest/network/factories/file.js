import { Factory, faker } from '@bigtest/mirage';

export default Factory.extend({
  id: () => faker.random.uuid(),
  contentType: () => 'application/json',
  size: () => faker.random.number(),
  modified: () => faker.date.recent().getTime(),
  name: () => faker.random.words()
});
