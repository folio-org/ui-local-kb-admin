import React from 'react';
import { Field } from 'react-final-form';

import { renderWithIntl, TestForm } from '@folio/stripes-erm-testing';
import { Button, KeyValue } from '@folio/stripes-testing';

import translationsProperties from '../../../../../test/helpers';
import ProxyServerSettingsView from './ProxyServerSettingsView';

const onDelete = jest.fn();
const onEdit = jest.fn();
const onSubmit = jest.fn();

const initialValues = {
  'stringTemplates': [{
    'id': '5dd1311f-cfd8-4547-852d-cf38dc5fd376',
    'dateCreated': '2023-01-11T17:14:21Z',
    'rule': 'http://localhost:3000/settings/local-kb-admin/proxy-server-settings',
    'context': {
      'id': '2c91809c85a1216c0185a1297fbb0039',
      'value': 'urlproxier',
      'label': 'urlProxier'
    },
    'lastUpdated': '2023-01-11T17:14:21Z',
    'name': 'test',
    'idScopes': [{
      'label': 'Oxford Academic Journals',
      'value': '61230f51-9703-4734-9232-b6d11c3a2598'
    }]
  }]
};

describe('ProxyServerSettingsView', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm initialValues={initialValues} onSubmit={onSubmit}>
        <Field
          component={ProxyServerSettingsView}
          name="stringTemplates[0]"
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </TestForm>,
      translationsProperties
    );
  });

  test('renders the Proxy server setting header', () => {
    const { getByText } = renderComponent;
    expect(getByText('Proxy server setting')).toBeInTheDocument();
  });

  test('renders the Delete button', async () => {
    await Button('Delete').exists();
  });

  test('renders the Edit button', async () => {
    await Button('Edit').exists();
  });

  test('renders the Name keyValue with expected value', async () => {
    await KeyValue('Name').has({ value: 'test' });
  });

  test('renders the URL customization code keyValue with expected value', async () => {
    await KeyValue('URL customization code').has({ value: 'http://localhost:3000/settings/local-kb-admin/proxy-server-settings' });
  });

  test('renders the Platforms to exclude from proxy server setting keyValue with expected value', async () => {
    await KeyValue('Platforms to exclude from proxy server setting').has({ value: 'Oxford Academic Journals' });
  });
});
