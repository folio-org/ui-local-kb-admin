const input = {
  'name': 'stringTemplates[0]',
  'value': {
    'id': '2bd5b43f-d814-441b-bf99-bca465bf0862',
    'dateCreated': '2023-01-10T10:46:39Z',
    'rule': 'http://localhost:3000/settings/local-kb-admin/proxy-server-settings',
    'context': {
      'id': '2c91809c8596c5ad018596cefe43001b',
      'value': 'urlproxier',
      'label': 'urlProxier'
    },
    'lastUpdated': '2023-01-10T10:46:39Z',
    'name': 'test',
    'idScopes': [
      {
        'label': 'DeGruyter Online',
        'value': '2ea7ed39-559f-4598-955e-189cff919325'
      }
    ]
  },
  'onBlur': 'ƒ () {}',
  'onChange': 'ƒ () {}',
  'onFocus': 'ƒ () {}'
};

const meta = {
  'active': false,
  'data': '{}',
  'dirty': false,
  'dirtySinceLastSubmit': false,
  'initial': {
    'id': '2bd5b43f-d814-441b-bf99-bca465bf0862',
    'dateCreated': '2023-01-10T10:46:39Z',
    'rule': 'http://localhost:3000/settings/local-kb-admin/proxy-server-settings',
    'context': {
      'id': '2c91809c8596c5ad018596cefe43001b',
      'value': 'urlproxier',
      'label': 'urlProxier'
    },
    'lastUpdated': '2023-01-10T10:46:39Z',
    'name': 'test',
    'idScopes': [
      {
        'label': 'DeGruyter Online',
        'value': '2ea7ed39-559f-4598-955e-189cff919325'
      }
    ]
  },
  'invalid': false,
  'modified': false,
  'modifiedSinceLastSubmit': false,
  'pristine': true,
  'submitFailed': false,
  'submitSucceeded': false,
  'submitting': false,
  'touched': false,
  'valid': true,
  'validating': false,
  'visited': false
};

const mutators = {
  'setProxyServerSettingValue': 'ƒ () {}',
  'insert': 'ƒ () {}',
  'concat': 'ƒ () {}',
  'move': 'ƒ () {}',
  'pop': 'ƒ () {}',
  'push': 'ƒ () {}',
  'remove': 'ƒ () {}',
  'removeBatch': 'ƒ () {}',
  'shift': 'ƒ () {}',
  'swap': 'ƒ () {}',
  'unshift': 'ƒ () {}',
  'update': 'ƒ () {}'
};


const platforms = [
  {
    'id': '2ea7ed39-559f-4598-955e-189cff919325',
    'dateCreated': '2023-01-09T13:54:23Z',
    'lastUpdated': '2023-01-09T13:54:23Z',
    'name': 'DeGruyter Online',
    'locators': [
      {
        'id': 'e667e45c-3452-496f-b754-f52761c629c0',
        'domainName': 'www.degruyter.com'
      }
    ]
  },
  {
    'id': '467908ee-00f0-44f6-ac0f-02881f3f5a4b',
    'dateCreated': '2023-01-09T13:54:51Z',
    'lastUpdated': '2023-01-09T13:54:51Z',
    'name': 'Oxford Academic Journals',
    'locators': [
      {
        'id': '2d78caa3-dc91-4b3b-8c3b-e13fa6c283cc',
        'domainName': 'academic.oup.com'
      }
    ]
  },
  {
    'id': '9052bb48-2d1c-4210-b9ac-8159c0ea4fb5',
    'dateCreated': '2023-01-09T13:54:58Z',
    'lastUpdated': '2023-01-09T13:54:58Z',
    'name': 'Sage',
    'locators': [
      {
        'id': '0bf0a3e6-3452-4a8e-af0f-46cfda7908b6',
        'domainName': 'journals.sagepub.com'
      }
    ]
  }
];

export { input, meta, mutators, platforms };
