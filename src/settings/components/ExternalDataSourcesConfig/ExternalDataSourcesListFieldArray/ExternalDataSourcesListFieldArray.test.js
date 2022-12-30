import React from 'react';
import { renderWithIntl, TestForm } from '@folio/stripes-erm-testing';
import { FieldArray } from 'react-final-form-arrays';
import { Button } from '@folio/stripes-testing';

import translationsProperties from '../../../../../test/helpers';
import { data, initialValue } from './testResources';
import ExternalDataSourcesListFieldArray from './ExternalDataSourcesListFieldArray';

jest.mock('../ExternalDataSourcesFields', () => () => <div>ExternalDataSourcesFields</div>);

const onSubmit = jest.fn();
const onDelete = jest.fn();
const onSave = jest.fn();

let renderComponent;
describe('ExternalDataSourcesListFieldArray', () => {
  describe('render without initial values ', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm
          onSubmit={onSubmit}
        >
          <FieldArray
            component={ExternalDataSourcesListFieldArray}
            name="externalKbs"
            {...data}
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

    test('renders the new button', async () => {
      await Button('stripes-components.button.new').exists();
    });

    it('clicking the new button renders the xeternal data source field', async () => {
      const { getByText } = renderComponent;
      await Button('stripes-components.button.new').click();
      expect(getByText('ExternalDataSourcesFields')).toBeInTheDocument();
    });
  });

  describe('render with initial values set ', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm
          initialValues={{ initialValue }}
          onSubmit={onSubmit}
        >
          <FieldArray
            component={ExternalDataSourcesListFieldArray}
            name="externalKbs"
            {...data}
            onDelete={onDelete}
            onSave={onSave}
          />
        </TestForm>, translationsProperties
      );
    });

    it('renders expected number of fields', () => {
      const { queryAllByTestId } = renderComponent;
      expect(queryAllByTestId(/externalDataSourcesListFieldArray\[.*\]/).length).toEqual(1);
    });
  });
});
