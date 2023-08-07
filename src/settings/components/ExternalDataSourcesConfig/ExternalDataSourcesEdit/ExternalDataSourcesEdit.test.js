import { Field } from 'react-final-form';

import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import {
  Button,
  Checkbox,
  renderWithIntl,
  Select,
  TestForm,
  TextArea,
  TextField,
} from '@folio/stripes-erm-testing';

import translationsProperties from '../../../../../test/helpers';

import ExternalDataSourcesEdit from './ExternalDataSourcesEdit';

const onCancelMock = jest.fn();
const onSaveMock = jest.fn();
const onSubmit = jest.fn();

const initialValues = {
  'externalKbs': [{
    'id': '794bc27c-1291-4307-8da9-f23aa992bc1a',
    'cursor': '2022-08-09T17:37:14Z',
    'active': true,
    'trustedSourceTI': false,
    'activationEnabled': false,
    'credentials': 'testCredentials',
    'readonly': false,
    'syncStatus': 'in-process',
    'lastCheck': 1670595614843,
    'name': 'GOKb_TEST',
    'type': 'org.olf.kb.adapters.GOKbOAIAdapter',
    'principal': 'testPrincipal',
    'listPrefix': 'testPrefix',
    'fullPrefix': 'gokb',
    'uri': 'https://gokbt.gbv.de/gokb/oai/index',
    'supportsHarvesting': true,
    'rectype': 1
  }]
};

let renderComponent;

describe('ExternalDataSourcesEdit', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <Field
          component={ExternalDataSourcesEdit}
          name="externalKbs[0]"
          onCancel={onCancelMock}
          onSave={onSaveMock}
        />
      </TestForm>, translationsProperties
    );
  });

  test('renders the expected header', () => {
    const { getByText } = renderComponent;
    expect(getByText('Edit external data source')).toBeInTheDocument();
  });

  test('clicking the Cancel button works as expected', async () => {
    await waitFor(async () => {
      await Button('Cancel').click();
    });
    expect(onCancelMock).toHaveBeenCalled();
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

  test('renders the expected Submit button', () => {
    const { getByRole } = renderComponent;
    expect(getByRole('button', { name: 'Submit' }));
  });
});


