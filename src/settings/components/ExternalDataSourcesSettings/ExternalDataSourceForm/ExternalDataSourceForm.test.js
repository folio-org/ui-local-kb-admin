import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import { TestForm, renderWithIntl, Checkbox, Select, TextArea, TextField } from '@folio/stripes-erm-testing';

import translationsProperties from '../../../../../test/helpers';
import ExternalDataSourceForm from './ExternalDataSourceForm';

const onCancelMock = jest.fn();
const onSaveMock = jest.fn();
const onSubmit = jest.fn();

const initialValues = {
  'externalKbs': [{
    'id': 'c4c903d0-f7ef-4d84-8fc7-2ed738e21b91',
    'cursor': '2023-01-11T14:47:18Z',
    'active': true,
    'trustedSourceTI': false,
    'activationEnabled': false,
    'readonly': false,
    'syncStatus': 'idle',
    'lastCheck': 1673463680170,
    'name': 'GOKb_TEST',
    'type': 'org.olf.kb.adapters.GOKbOAIAdapter',
    'fullPrefix': 'gokb',
    'uri': 'https://gokbt.gbv.de/gokb/oai/index',
    'supportsHarvesting': true,
    'rectype': 1
  }]
};

let renderComponent;

describe('ExternalDataSourceForm', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <ExternalDataSourceForm
          onCancel={onCancelMock}
          onSave={onSaveMock}
        />
      </TestForm>, translationsProperties
    );
  });

  test('renders the Name field', async () => {
    await TextField('Name*').exists();
  });

  test('renders the Type dropdown with correct options', async () => {
    await Select('Type*').exists();
    await waitFor(async () => {
      await Select('Type*').choose('org.olf.kb.adapters.GOKbOAIAdapter');
    });
  });

  test('renders the Record type dropdown with correct options', async () => {
    await Select('Record type*').exists();
    await waitFor(async () => {
      await Select('Record type*').choose('Package');
      await Select('Record type*').choose('Title');
    });
  });

  test('renders the URI field', async () => {
    await TextField('URI*').exists();
  });

  test('expected initial checked value', async () => {
    await Checkbox('Trusted for title instance metadata').has({ checked: false });
    await Checkbox('Activation enabled').has({ checked: false });
  });

  test('renders the Listprefix field', async () => {
    await TextField('Listprefix').exists();
  });

  test('renders the Fullprefix field', async () => {
    await TextField('Fullprefix').exists();
  });

  test('renders the Principal field', async () => {
    await TextField('Principal').exists();
  });

  test('renders the Credentials field', async () => {
    await TextArea('Credentials').exists();
  });

  test('renders the expected Save & close button', () => {
    const { getByRole } = renderComponent;
    expect(getByRole('button', { name: 'Submit' }));
  });
});

