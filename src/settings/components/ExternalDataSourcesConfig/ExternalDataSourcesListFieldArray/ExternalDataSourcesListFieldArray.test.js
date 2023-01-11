import React from 'react';
import { renderWithIntl, TestForm } from '@folio/stripes-erm-testing';
import { FieldArray } from 'react-final-form-arrays';
import { Button } from '@folio/stripes-testing';

import translationsProperties from '../../../../../test/helpers';
import ExternalDataSourcesListFieldArray from './ExternalDataSourcesListFieldArray';

jest.mock('../ExternalDataSourcesFields', () => () => <div>ExternalDataSourcesFields</div>);

const onSubmit = jest.fn();
const onDelete = jest.fn();
const onSave = jest.fn();

const initialValues = {
  'externalKbs': [{
    'id': 'c4c903d0-f7ef-4d84-8fc7-2ed738e21b91',
    'cursor': '2023-01-11T14:47:18Z',
    'active': true,
    'trustedSourceTI': false,
    'activationEnabled': false,
    'readonly': false,
    'syncStatus': 'idle',
    'lastCheck': 1673458491602,
    'name': 'GOKb_TEST',
    'type': 'org.olf.kb.adapters.GOKbOAIAdapter',
    'fullPrefix': 'gokb',
    'uri': 'https://gokbt.gbv.de/gokb/oai/index',
    'supportsHarvesting': true,
    'rectype': 1
  }]
};

let renderComponent;
describe('ExternalDataSourcesListFieldArray', () => {
  describe('render without initial values ', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          <FieldArray
            component={ExternalDataSourcesListFieldArray}
            name="externalKbs"
            onDelete={onDelete}
            onSave={onSave}
          />
        </TestForm>, translationsProperties
      );
    });

    test('renders ExternalDataSourcesFields component', () => {
      const { getByText } = renderComponent;
      expect(getByText('ExternalDataSourcesFields')).toBeInTheDocument();
    });

    it('renders expected number of fields', () => {
      const { queryAllByTestId } = renderComponent;
      expect(queryAllByTestId(/externalDataSourcesListFieldArray\[.*\]/).length).toEqual(1);
    });

    test('renders the new button', async () => {
      await Button('New').exists();
    });

    it('clicking the new button opens a new empty field', async () => {
      const { getAllByText } = renderComponent;
      await Button('New').click();
      expect(getAllByText('ExternalDataSourcesFields')).toHaveLength(2);
    });
  });
});
