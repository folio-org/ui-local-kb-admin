import { get, isEmpty } from 'lodash';
import parseQueryString from './util';

export default function config() {
  const server = this;

  this.get('/configurations/entries', {
    configs: []
  });

  this.get('/erm/jobs', (schema, request) => {
    const queryString = request.url.split('?')[1];
    const params = parseQueryString(queryString);
    let { filters } = params;

    // when there is only one filter and its not an array
    if (filters && !isEmpty(filters) && !Array.isArray(filters)) filters = [filters];

    // returns a flattened array of { name, value } pairs of filter name and its value
    const parsed = filters && filters.map((filter) => {
      return filter.split('||').map(f => {
        const [name, value] = f.split('==');
        return { name, value };
      });
    }).flat();

    if (parsed) {
      return {
        results: schema.jobs.where((job) => {
          return parsed.reduce((acc, { name, value }) => {
            return acc || get(job, name) === value;
          }, false);
        }).models
      };
    } else {
      return { results: schema.jobs.all().models };
    }
  });

  this.get('/erm/refdataValues/persistentJob/result', () => {
    return [
      { 'id': '2c9d81916c044334016c0444659b0032', 'value': 'success', 'label': 'Success' },
      { 'id': '2c9d81916c044334016c044465a90033', 'value': 'partial_success', 'label': 'Partial success' },
      { 'id': '2c9d81916c044334016c044465ba0034', 'value': 'failure', 'label': 'Failure' },
      { 'id': '2c9d81916c044334016c044465c10035', 'value': 'interrupted', 'label': 'Interrupted' }
    ];
  });

  this.get('/erm/refdataValues/persistentJob/status', () => {
    return [
      { 'id': '2c9d81916c044334016c04445e310008', 'value': 'queued', 'label': 'Queued' },
      { 'id': '2c9d81916c044334016c0444657d002f', 'value': 'in_progress', 'label': 'In progress' },
      { 'id': '2c9d81916c044334016c044465880030', 'value': 'ended', 'label': 'Ended' }
    ];
  });

  this.get('erm/jobs/:id', (schema, request) => {
    return schema.jobs.find(request.params.id).attrs;
  });

  this.delete('erm/jobs/:id', (schema, request) => {
    return schema.jobs.find(request.params.id).destroy();
  });

  this.get('erm/kbs', ({ externalDataSources }) => {
    return externalDataSources.all().models;
  });

  this.delete('erm/kbs/:id', (schema, request) => {
    return schema.externalDataSources.find(request.params.id).destroy();
  });

  this.post('erm/kbs', (_, request) => {
    const body = JSON.parse(request.requestBody);
    return server.create('externalDataSource', body);
  });

  this.put('erm/kbs/:id', ({ externalDataSources }, { params, requestBody }) => {
    const externalDataSourceData = JSON.parse(requestBody);
    return externalDataSources.find(params.id).update(externalDataSourceData);
  });
}
