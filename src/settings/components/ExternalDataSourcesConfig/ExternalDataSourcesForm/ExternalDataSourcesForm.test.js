import React from 'react';
import { renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import { Pane } from '@folio/stripes-testing';

import translationsProperties from '../../../../../test/helpers';
import ExternalDataSourcesForm from './ExternalDataSourcesForm';

jest.mock('../ExternalDataSourcesListFieldArray', () => () => <div>ExternalDataSourcesListFieldArray</div>);

const onDeleteMock = jest.fn();
const onSaveMock = jest.fn();
const onSubmitMock = jest.fn();

const initialValues = {
  'externalKbs': [
    {
      'id': '68541eeb-508b-41af-a444-460a5ea31948',
      'cursor': '2022-12-24T14:49:02Z',
      'active': true,
      'trustedSourceTI': false,
      'activationEnabled': false,
      'readonly': false,
      'syncStatus': 'idle',
      'lastCheck': 1672303483141,
      'name': 'GOKb_TEST',
      'type': 'org.olf.kb.adapters.GOKbOAIAdapter',
      'fullPrefix': 'gokb',
      'uri': 'https://gokbt.gbv.de/gokb/oai/index',
      'supportsHarvesting': true,
      'rectype': 1
    }
  ]
};

const form = {
  'mutators': {
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
  },
  'reset': 'ƒ reset() {}',
  'submit': 'ƒ submit() {}',
};

describe('ExternalDataSourcesForm', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <ExternalDataSourcesForm
          form={form}
          initialValues={initialValues}
          onDelete={onDeleteMock}
          onSave={onSaveMock}
          onSubmit={onSubmitMock}
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the expected heading', () => {
    const { getByRole } = renderComponent;
    expect(getByRole('heading', { name: 'External data sources' }));
  });

  test('renders expected subtitle in the pane', () => {
    const { getByText } = renderComponent;
    expect(getByText('1 external data source')).toBeInTheDocument();
  });

  test('renders ExternalDataSourcesListFieldArray component', () => {
    const { getByText } = renderComponent;
    expect(getByText('ExternalDataSourcesListFieldArray')).toBeInTheDocument();
  });

  test('renders the expected External data sources Pane', async () => {
    await Pane('External data sources').is({ visible: true });
  });
});
