import React from 'react';

import { renderWithIntl, TestForm } from '@folio/stripes-erm-testing';
import { Button, Select, TextArea, TextField, Checkbox } from '@folio/stripes-testing';
import translationsProperties from '../../../../../test/helpers';

import { input, meta, initialValues } from './testResources';
import ExternalDataSourcesEdit from './ExternalDataSourcesEdit';

const onCancelMock = jest.fn();
const onSaveMock = jest.fn();
const onSubmit = jest.fn();

let renderComponent;

describe('ExternalDataSourcesEdit', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <ExternalDataSourcesEdit
          input={input}
          meta={meta}
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
    await Button('Cancel').click();
    expect(onCancelMock).toHaveBeenCalled();
  });

  test('renders the Name field', async () => {
    await TextField('Name*').exists();
  });

  test('renders the Type dropdown with correct options', async () => {
    await Select('Type*').exists();
    await Select('Type*').choose('org.olf.kb.adapters.GOKbOAIAdapter');
  });

  test('renders the Record type dropdown with correct options', async () => {
    await Select('Record type*').exists();
    await Select('Record type*').choose('Package');
    await Select('Record type*').choose('Title');
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


