import React from 'react';

import { renderWithIntl, TestForm } from '@folio/stripes-erm-testing';
import { Button, KeyValue } from '@folio/stripes-testing';

import translationsProperties from '../../../../../test/helpers';
import { input, meta } from './testResources';
import ProxyServerSettingsView from './ProxyServerSettingsView';

const onDelete = jest.fn();
const onEdit = jest.fn();
const onSubmit = jest.fn();

describe('ProxyServerSettingsView', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm onSubmit={onSubmit}>
        <ProxyServerSettingsView
          input={input}
          meta={meta}
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
