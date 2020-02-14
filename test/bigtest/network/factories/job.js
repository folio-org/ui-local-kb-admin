import { Factory, faker } from '@bigtest/mirage';

export default Factory.extend({
  id: () => faker.random.uuid(),
  class: () => 'org.olf.general.jobs.PackageIngestJob',
  dateCreated: () => faker.date.recent().toISOString(),
  name: () => faker.random.words(),
  ended: () => faker.date.recent().getTime(),
  source: () => faker.random.arrayElement(['JSON Harvester']),
  started: () => faker.date.recent().getTime(),
  status: () => {
    const val = faker.random.arrayElement(['Queued', 'In progress', 'Ended']);
    return {
      id: () => faker.random.uuid(),
      value: val,
      label: val,
    };
  },
  result: () => {
    const val = faker.random.arrayElement(['Success', 'Partial success', 'Failure', 'Interrupted']);
    return {
      id: () => faker.random.uuid(),
      value: val,
      label: val,
    };
  },
});
