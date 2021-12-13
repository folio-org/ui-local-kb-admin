import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { Button, KeyValue, Modal } from '@folio/stripes-testing';
import translationsProperties from '../../../../../test/helpers';
import ExternalDataSourcesView from './ExternalDataSourcesView';

jest.mock('@folio/stripes-erm-components', () => ({
  ...jest.requireActual('@folio/stripes-erm-components'),
  CustomMetaSection: () => <div>CustomMetaSection</div>,
}));

const onDeleteMock = jest.fn();
const onEditMock = jest.fn();
const onSaveMock = jest.fn();

const inputIdle = {
  'name': 'externalKbs[0]',
  'value': {
    'id': '3a8535b5-2002-405d-9bbd-1e43926ae2c2',
    'cursor': '2021-09-14T08:22:05Z',
    'active': true,
    'trustedSourceTI': false,
    'activationEnabled': true,
    'credentials': 'test_credentials',
    'readonly': false,
    'syncStatus': 'idle',
    'lastCheck': 1634327142473,
    'name': 'GOKb_TEST',
    'type': 'org.olf.kb.adapters.GOKbOAIAdapter',
    'principal': 'test_principal',
    'listPrefix': 'testPrefix',
    'fullPrefix': 'gokb',
    'uri': 'https://gokbt.gbv.de/gokb/oai/index',
    'supportsHarvesting': true,
    'rectype': 1
  }
};

const inputInProgress = {
  'name': 'externalKbs[1]',
  'value': {
    'id': 'f45445d2-2f33-44c1-ae62-f96494501c57',
    'cursor': '2021-12-07T10:44:56Z',
    'active': true,
    'trustedSourceTI': false,
    'activationEnabled': false,
    'readonly': false,
    'syncStatus': 'in-progress',
    'lastCheck': 1634327142473,
    'name': 'GOKb_TEST',
    'type': 'org.olf.kb.adapters.GOKbOAIAdapter',
    'fullPrefix': 'gokb',
    'uri': 'https://gokbt.gbv.de/gokb/oai/index',
    'supportsHarvesting': true,
    'rectype': 1
  }
};

let renderComponent;

describe('ExternalDataSourcesView', () => {
  describe('with syncStatus \'idle\'', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <ExternalDataSourcesView
          input={inputIdle}
          onDelete={onDeleteMock}
          onEdit={onEditMock}
          onSave={onSaveMock}
        />,
        translationsProperties
      );
    });

    test('renders the Custom meta section', () => {
      const { getByText } = renderComponent;
      expect(getByText('CustomMetaSection')).toBeInTheDocument();
    });

    test('renders the expected Name', async () => {
      await KeyValue('Name').has({ value: 'GOKb_TEST' });
    });

    test('renders the expected Type', async () => {
      await KeyValue('Type').has({ value: 'org.olf.kb.adapters.GOKbOAIAdapter' });
    });

    test('renders the expected Record type', async () => {
      await KeyValue('Record type').has({ value: 'Package' });
    });

    test('renders the expected URI', async () => {
      await KeyValue('URI').has({ value: 'https://gokbt.gbv.de/gokb/oai/index' });
    });

    test('renders the expected Trusted for title instance metadata value', async () => {
      await KeyValue('Trusted for title instance metadata').has({ value: 'No' });
    });

    test('renders the expected Is active value', async () => {
      await KeyValue('Is active').has({ value: 'Yes' });
    });

    test('renders the expected Supports harvesting value', async () => {
      await KeyValue('Supports harvesting').has({ value: 'Yes' });
    });

    test('renders the expected Activation enabled value', async () => {
      await KeyValue('Activation enabled').has({ value: 'Yes' });
    });

    test('renders the expected Listprefix', async () => {
      await KeyValue('Listprefix').has({ value: 'testPrefix' });
    });

    test('renders the expected Fullprefix', async () => {
      await KeyValue('Fullprefix').has({ value: 'gokb' });
    });

    test('renders the expected Principal', async () => {
      await KeyValue('Principal').has({ value: 'test_principal' });
    });

    test('renders the expected credentials', async () => {
      await KeyValue('Credentials').has({ value: 'test_credentials' });
    });

    test('clicking the edit/delete/reset buttons under the Actions dropdown', async () => {
      await Button('Actions').click();
      await Button('Reset cursor').click();
      expect(onSaveMock).toHaveBeenCalled();
      await Button('Reset sync status').has({ disabled: true });
      await Button('Delete').click();
      expect(onDeleteMock).toHaveBeenCalled();
      await Button('Edit').click();
      expect(onEditMock).toHaveBeenCalled();
    });
  });

  describe('with syncStatus \'in-progress\'', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <ExternalDataSourcesView
          input={inputInProgress}
          onDelete={onDeleteMock}
          onEdit={onEditMock}
          onSave={onSaveMock}
        />,
        translationsProperties
      );
    });

    test('clicking the edit/delete/reset buttons under the Actions dropdown', async () => {
      await Button('Actions').click();
      await Button('Reset cursor').click();
      expect(onSaveMock).toHaveBeenCalled();
      await Button('Reset sync status').click();
      expect(onSaveMock).toHaveBeenCalled();
      await Modal('Reset sync status').exists();
      await Button('Delete').click();
      expect(onDeleteMock).toHaveBeenCalled();
      await Button('Edit').click();
      expect(onEditMock).toHaveBeenCalled();
    });
  });
});
