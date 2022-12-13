const input = {
  'name': 'externalKbs[0]',
  'value': {
    'id': '67f27cc1-a34e-441d-980b-558acfe89b9a',
    'active': true,
    'trustedSourceTI': false,
    'activationEnabled': false,
    'readonly': false,
    'syncStatus': 'idle',
    'lastCheck': 1670921093980,
    'name': 'GOKb_TEST',
    'type': 'org.olf.kb.adapters.GOKbOAIAdapter',
    'fullPrefix': 'gokb',
    'uri': 'https://gokbt.gbv.de/gokb/oai/index',
    'supportsHarvesting': true,
    'rectype': 1
  }
};

const mutators = {
  'setExternalDataSourceValue': () => {},
  'insert': () => {},
  'concat': () => {},
  'move': () => {},
  'pop': () => {},
  'push': () => {},
  'remove': () => {},
  'removeBatch': () => {},
  'shift': () => {},
  'swap': () => {},
  'unshift': () => {},
  'update': () => {}
};


export {
  input,
  mutators
};
