import React from 'react';

import { renderWithIntl, TestForm } from '@folio/stripes-erm-testing';
import { Button, TextField, TextArea } from '@folio/stripes-testing';

import translationsProperties from '../../../../../test/helpers';
import { input, meta, mutators, platforms } from './testResources';
import ProxyServerSettingsEdit from './ProxyServerSettingsEdit';

const onDelete = jest.fn();
const onSave = jest.fn();
const onCancel = jest.fn();
const onSubmit = jest.fn();

describe('ProxyServerSettingsEdit', () => {
  let renderComponent;
  describe('Info log', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmit}>
          <ProxyServerSettingsEdit
            input={input}
            meta={meta}
            mutators={mutators}
            onCancel={onCancel}
            onDelete={onDelete}
            onSave={onSave}
            platforms={platforms}
          />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the Edit proxy server setting header', () => {
      const { getByText } = renderComponent;
      expect(getByText('Edit proxy server setting')).toBeInTheDocument();
    });

    test('renders the Cancel button', async () => {
      await Button('Cancel').exists();
    });

    test('renders the name label', () => {
      const { getByText } = renderComponent;
      expect(getByText('Name')).toBeInTheDocument();
    });

    test('renders the URL customization code label', () => {
      const { getByText } = renderComponent;
      expect(getByText('URL customization code')).toBeInTheDocument();
    });

    test('renders the expected layout', () => {
      const { getByText } = renderComponent;
      expect(getByText('Variables: inputUrl, platformLocalCode')).toBeInTheDocument();
    });

    test('renders the expected layout', () => {
      const { getByText } = renderComponent;
      expect(getByText('Helpers: insertAfter, insertAfterAll, insertBefore, insertBeforeAll, urlEncode, removeProtocol, replace')).toBeInTheDocument();
    });

    test('renders the expected label', () => {
      const { getByText } = renderComponent;
      expect(getByText('Platforms to exclude from proxy server setting')).toBeInTheDocument();
    });

    test('renders the proxyServerSettingEdit by id', () => {
      const { getByTestId } = renderComponent;
      expect(getByTestId('proxyServerSettingEdit')).toBeInTheDocument();
    });

    test('renders the Name field', async () => {
      await TextField('Name*').exists();
    });

    test('renders the URL customization code field', async () => {
      await TextArea('URL customization code*').exists();
    });
  });
});
