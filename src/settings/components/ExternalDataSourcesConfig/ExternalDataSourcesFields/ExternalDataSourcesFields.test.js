import React from 'react';
import { Field } from 'react-final-form';

import { TestForm, renderWithIntl } from '@folio/stripes-erm-testing';

import translationsProperties from '../../../../../test/helpers';
import ExternalDataSourcesFields from './ExternalDataSourcesFields';

const onSubmit = jest.fn();
const onDeleteMock = jest.fn();
const onSaveMock = jest.fn();

jest.mock('../ExternalDataSourcesView', () => () => <div>ExternalDataSourcesView</div>);

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

describe('ExternalDataSourcesFields', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <Field
          component={ExternalDataSourcesFields}
          name="externalKbs[0]"
          onDelete={onDeleteMock}
          onSave={onSaveMock}
        />
      </TestForm>,
      translationsProperties
    );
  });

  it('renders ExternalDataSourcesView component', () => {
    const { getByText } = renderComponent;
    expect(getByText('ExternalDataSourcesView')).toBeInTheDocument();
  });
});
