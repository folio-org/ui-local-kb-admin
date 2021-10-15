import { Factory } from 'miragejs';
import faker from 'faker';

export default Factory.extend({
  id: () => faker.random.uuid(),
  class: () => 'org.olf.general.jobs.PackageIngestJob',
  dateCreated: () => faker.date.recent().toISOString(),
  name: () => faker.random.words(),
  ended: () => faker.date.recent().getTime(),
  source: () => faker.random.arrayElement(['Package harvester']),
  started: () => faker.date.recent().getTime(),
  status: () => {
    const val = faker.random.arrayElement(['queued', 'in_progress', 'ended']);
    return {
      id: () => faker.random.uuid(),
      value: val,
      label: val,
    };
  },
  result: () => {
    const val = faker.random.arrayElement(['success', 'partial_success', 'failure', 'interrupted']);
    return {
      id: () => faker.random.uuid(),
      value: val,
      label: val,
    };
  },
});
