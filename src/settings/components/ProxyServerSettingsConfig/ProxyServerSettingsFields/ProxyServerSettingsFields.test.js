import React from 'react';
import { renderWithIntl, TestForm } from '@folio/stripes-erm-testing';

import translationsProperties from '../../../../../test/helpers';
import ProxyServerSettingsFields from './ProxyServerSettingsFields';

const onDelete = jest.fn();
const onSave = jest.fn();
const onSubmit = jest.fn();

jest.mock('../ProxyServerSettingsView', () => () => <div>ProxyServerSettingsView</div>);

const input = {
  'name': 'stringTemplates[1]',
  'value': {
    'id': 'b03c2a7e-5ed3-4d58-8cdc-7e8c3fdf9d74',
    'dateCreated': '2023-01-10T14:01:36Z',
    'rule': 'http://localhost:3000/settings/local-kb-admin/proxy-server-settings',
    'context': {
      'id': '2c91809c859beb1f01859bf328ab0047',
      'value': 'urlproxier',
      'label': 'urlProxier'
    },
    'lastUpdated': '2023-01-10T15:59:02Z',
    'name': 'test',
    'idScopes': [{
      'label': 'Oxford Academic Journals',
      'value': '64d8acbf-5964-4223-bc5c-83c3659ef843'
    }]
  },
  'onBlur': 'ƒ () {}',
  'onChange': 'ƒ () {}',
  'onFocus': 'ƒ () {}'
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

describe('ProxyServerSettingsFields', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm onSubmit={onSubmit}>
        <ProxyServerSettingsFields
          input={input}
          mutators={mutators}
          onDelete={onDelete}
          onSave={onSave}
        />
      </TestForm>,
      translationsProperties
    );
  });

  test('renders the ProxyServerSettingsView component', () => {
    const { getByText } = renderComponent;
    expect(getByText('ProxyServerSettingsView')).toBeInTheDocument();
  });
});

