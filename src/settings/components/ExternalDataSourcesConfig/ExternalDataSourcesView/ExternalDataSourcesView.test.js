import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import {
  TestForm,
  renderWithIntl,
  KeyValue,
  Button,
} from '@folio/stripes-erm-testing';

import translationsProperties from '../../../../../test/helpers';
import ExternalDataSourcesView from './ExternalDataSourcesView';

const onCancelMock = jest.fn();
const onSaveMock = jest.fn();
const onSubmit = jest.fn();
const onDeleteMock = jest.fn();
const onCloseMock = jest.fn();
const onClickMock = jest.fn();

const externalDataSourceId = 'e68bbedb-2dd4-4ea2-aeff-6fe5560c5091';
const externalKbs = [
  {
    'id': 'e68bbedb-2dd4-4ea2-aeff-6fe5560c5091',
    'cursor': '2023-10-16T06:51:40Z',
    'active': true,
    'trustedSourceTI': false,
    'activationEnabled': false,
    'readonly': false,
    'syncStatus': 'in-process',
    'lastCheck': 1705268456638,
    'name' : 'GOKb_TEST',
    'type': 'org.olf.kb.adapters.GOKbOAIAdapter',
    'fullPrefix': 'gokb',
    'uri': 'https://gokbt.gbv.de/gokb/oai/index',
    'supportsHarvesting': true,
    'rectype': 1
  },
  {
    'id': '28af6772-9cdf-462b-89ec-be258756aa0d',
    'active': false,
    'trustedSourceTI': false,
    'activationEnabled': false,
    'readonly': false,
    'name': 'MR TEST',
    'type': 'org.olf.kb.adapters.GOKbOAIAdapter',
    'uri': 'https://mrtest.com',
    'supportsHarvesting': true,
    'rectype': 1
  }
];

const initialValues = {
  'externalKbs': [
    {
      'id': 'e68bbedb-2dd4-4ea2-aeff-6fe5560c5091',
      'cursor': '2023-10-16T06:51:40Z',
      'active': true,
      'trustedSourceTI': false,
      'activationEnabled': false,
      'readonly': false,
      'syncStatus': 'in-process',
      'lastCheck': 1705268456638,
      'name': 'GOKb_TEST',
      'type': 'org.olf.kb.adapters.GOKbOAIAdapter',
      'fullPrefix': 'gokb',
      'uri': 'https://gokbt.gbv.de/gokb/oai/index',
      'supportsHarvesting': true,
      'rectype': 1
    },
    {
      'id': '28af6772-9cdf-462b-89ec-be258756aa0d',
      'active': false,
      'trustedSourceTI': false,
      'activationEnabled': false,
      'readonly': false,
      'name': 'MR TEST',
      'type': 'org.olf.kb.adapters.GOKbOAIAdapter',
      'uri': 'https://mrtest.com',
      'supportsHarvesting': true,
      'rectype': 1
    }
  ]
};

let renderComponent;

describe('ExternalDataSourcesView', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <ExternalDataSourcesView
          externalDataSourceId={externalDataSourceId}
          externalKbs={externalKbs}
          onCancel={onCancelMock}
          onClick={onClickMock}
          onClose={onCloseMock}
          onDelete={onDeleteMock}
          onSave={onSaveMock}
          onSubmit={onSubmit}
        />
      </TestForm>,
      translationsProperties
    );
  });

  test('renders Action menu', async () => {
    await Button('Actions').exists();
  });

  test('Action menu has four items', async () => {
    await waitFor(async () => {
      await Button('Actions').click();
      await Button('Edit').exists();
      await Button('Reset sync status').click();
      await Button('Delete').click();
    });
  });
  test('renders the Name keyValue', async () => {
    await KeyValue('Name').exists();
  });

  test('renders the URI keyValue', async () => {
    await KeyValue('URI').exists();
  });

  test('renders the Trusted for title instance metadata keyValue', async () => {
    await KeyValue('Trusted for title instance metadata').exists();
  });

  test('renders the Is active keyValue', async () => {
    await KeyValue('Is active').exists();
  });

  test('renders the Activation enabled keyValue', async () => {
    await KeyValue('Activation enabled').exists();
  });

  test('renders the Listprefix keyValue', async () => {
    await KeyValue('Listprefix').exists();
  });

  test('renders the Fullprefix keyValue', async () => {
    await KeyValue('Fullprefix').exists();
  });

  test('renders the Principal keyValue', async () => {
    await KeyValue('Principal').exists();
  });

  test('renders the Credentials keyValue', async () => {
    await KeyValue('Credentials').exists();
  });

  test('renders the Supports harvesting keyValue', async () => {
    await KeyValue('Supports harvesting').exists();
  });
});

