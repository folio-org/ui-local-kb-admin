import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { KeyValue, Button } from '@folio/stripes-testing';
import translationsProperties from '../../../../../test/helpers';
import ExternalDataSourcesView from './ExternalDataSourcesView';

jest.mock('@folio/stripes-erm-components', () => ({
  ...jest.requireActual('@folio/stripes-erm-components'),
  ExternalDataSourcesView: () => <div>ExternalDataSourcesView</div>,
}));

const onDeleteMock = jest.fn();
const onEditMock = jest.fn();

const input = {
  'name': 'externalKbs[0]',
  'value': {
    'id': '3a8535b5-2002-405d-9bbd-1e43926ae2c2',
    'cursor': '2021-09-14T08:22:05Z',
    'active': true,
    'trustedSourceTI': false,
    'activationEnabled': false,
    'readonly': false,
    'syncStatus': 'idle',
    'lastCheck': 1634305542481,
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
  describe('with no initial values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <ExternalDataSourcesView input={input} onDelete={onDeleteMock} onEdit={onEditMock} />,
        translationsProperties
      );
    });

    test('renders the Name field', async () => {
      await KeyValue('Name').has({ value: 'GOKb_TEST' });
    });

    //   test('renders the Description field', () => {
    //     const { getByRole } = renderComponent;
    //     expect(getByRole('textbox', { name: 'Description' }));
    //   });

    //   test('renders the Status dropdown', () => {
    //     const { getByRole } = renderComponent;
    //     expect(getByRole('combobox', { name: 'Status' }));
    //   });

    //   test('renders the Reason for closure dropdown', () => {
    //     const { getByRole } = renderComponent;
    //     expect(getByRole('combobox', { name: 'Reason for closure' }));
    //   });

    //   test('renders a disabled Reason for closure dropdown', () => {
    //     const { getByRole } = renderComponent;
    //     expect(getByRole('combobox', { name: 'Reason for closure' })).toBeDisabled();
    //   });

    //   test('renders the Renewal priority dropdown', () => {
    //     const { getByRole } = renderComponent;
    //     expect(getByRole('combobox', { name: 'Renewal priority' }));
    //   });

    //   test('renders the Is perpertual dropdown', () => {
    //     const { getByRole } = renderComponent;
    //     expect(getByRole('combobox', { name: 'Is perpetual' }));
    //   });

    //   test('renders the AlternativeNames FieldArray', () => {
    //     const { getByText } = renderComponent;
    //     expect(getByText('AlternativeNamesFieldArray')).toBeInTheDocument();
    //   });

    //   test('renders the AgreementPeriods FieldArray', () => {
    //     const { getByText } = renderComponent;
    //     expect(getByText('AgreementPeriodsFieldArray')).toBeInTheDocument();
    //   });
    // });

    // describe('with initial values', () => {
    //   beforeEach(() => {
    //     renderWithIntl(
    //       <TestForm initialValues={initialValues} onSubmit={onSubmit}>
    //         <FormInfo data={data} form={form} handlers={handlers} values={values} />
    //       </TestForm>, translationsProperties
    //     );
    //   });

    //   test('renders the expected value in the Name field', () => {
    //     const { getByRole } = renderComponent;
    //     expect(getByRole('textbox', { name: 'Name' })).toHaveDisplayValue('AM ag 1');
    //   });

    //   test('renders the expected value in the Description field', () => {
    //     const { getByRole } = renderComponent;
    //     expect(getByRole('textbox', { name: 'Description' })).toHaveDisplayValue('description for this agreement');
    //   });

    //   test('renders the expected value in the Status dropdown', () => {
    //     const { getByRole } = renderComponent;
    //     expect(getByRole('combobox', { name: 'Status' })).toHaveDisplayValue('Active');
    //   });

    //   test('renders a disabled Reason for closure dropdown', () => {
    //     const { getByRole } = renderComponent;
    //     expect(getByRole('combobox', { name: 'Reason for closure' })).toBeDisabled();
    //   });

    //   test('renders the expected value in the Renewal priority dropdown', () => {
    //     const { getByRole } = renderComponent;
    //     expect(getByRole('combobox', { name: 'Renewal priority' })).toHaveDisplayValue('Definitely renew');
    //   });

    //   test('renders the expected value in the Is perpertual dropdown', () => {
    //     const { getByRole } = renderComponent;
    //     expect(getByRole('combobox', { name: 'Is perpetual' })).toHaveDisplayValue('Yes');
    //   });

    //   test('renders the AlternativeNames FieldArray', () => {
    //     const { getByText } = renderComponent;
    //     expect(getByText('AlternativeNamesFieldArray')).toBeInTheDocument();
    //   });

    //   test('renders the AgreementPeriods FieldArray', () => {
    //     const { getByText } = renderComponent;
    //     expect(getByText('AgreementPeriodsFieldArray')).toBeInTheDocument();
    //   });

    //   test('typing in the name field should fire the onAsyncValidate callback', () => {
    //     const { getByRole } = renderComponent;
    //     userEvent.type(getByRole('textbox', { name: 'Name' }), 'a');
    //     expect(handlers.onAsyncValidate).toHaveBeenCalled();
    //   });
  });
});
