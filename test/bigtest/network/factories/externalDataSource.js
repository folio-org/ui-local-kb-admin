import { Factory, faker } from '@bigtest/mirage';

export default Factory.extend({
  id: () => faker.random.uuid(),
  cursor: () => faker.date.recent(),
  credentials: () => faker.random.words(),
  active: () => faker.random.boolean(),
  activationEnabled: () => faker.random.boolean(),
  lastCheck: () => faker.date.recent().toISOString(),
  type: () => faker.random.arrayElement(['org.olf.kb.adapters.GOKbOAIAdapter']),
  name: () => faker.random.words(),
  fullPrefix: () => faker.random.words(),
  listPrefix: () => faker.random.words(),
  principal: () => faker.random.words(),
  uri: () => faker.internet.url(),
  supportsHarvesting: () => faker.random.boolean(),
  syncStatus: () => faker.random.arrayElement(['idle']),
  rectype: () => faker.random.arrayElement([1]),
});
