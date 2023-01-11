import React from 'react';
import { Field } from 'react-final-form';
import { renderWithIntl, TestForm } from '@folio/stripes-erm-testing';
import { Button, TextField, TextArea } from '@folio/stripes-testing';

import translationsProperties from '../../../../../test/helpers';
import ProxyServerSettingsEdit from './ProxyServerSettingsEdit';

const onDelete = jest.fn();
const onSave = jest.fn();
const onCancel = jest.fn();
const onSubmit = jest.fn();

const initialValues = {
  'stringTemplates': [{
    'id': '7e273329-0cbf-498b-8ed8-4c4b029670bc',
    'dateCreated': '2023-01-11T14:36:36Z',
    'rule': 'https://www.google.co.uk/',
    'context': {
      'id': '2c91809c85a1216c0185a1297fbb0039',
      'value': 'urlproxier',
      'label': 'urlProxier'
    },
    'lastUpdated': '2023-01-11T14:36:36Z',
    'name': 'MR test',
    'idScopes': [{
      'label': 'Oxford Academic Journals',
      'value': '61230f51-9703-4734-9232-b6d11c3a2598'
    },
    {
      'label': 'DeGruyter Online',
      'value': '1d3050af-762c-4132-afa5-dfbd57a27766'
    }
    ]
  }]
};

const platforms = [{
  'id': '2ea7ed39-559f-4598-955e-189cff919325',
  'dateCreated': '2023-01-09T13:54:23Z',
  'lastUpdated': '2023-01-09T13:54:23Z',
  'name': 'DeGruyter Online',
  'locators': [{
    'id': 'e667e45c-3452-496f-b754-f52761c629c0',
    'domainName': 'www.degruyter.com'
  }]
},
{
  'id': '467908ee-00f0-44f6-ac0f-02881f3f5a4b',
  'dateCreated': '2023-01-09T13:54:51Z',
  'lastUpdated': '2023-01-09T13:54:51Z',
  'name': 'Oxford Academic Journals',
  'locators': [{
    'id': '2d78caa3-dc91-4b3b-8c3b-e13fa6c283cc',
    'domainName': 'academic.oup.com'
  }]
},
{
  'id': '9052bb48-2d1c-4210-b9ac-8159c0ea4fb5',
  'dateCreated': '2023-01-09T13:54:58Z',
  'lastUpdated': '2023-01-09T13:54:58Z',
  'name': 'Sage',
  'locators': [{
    'id': '0bf0a3e6-3452-4a8e-af0f-46cfda7908b6',
    'domainName': 'journals.sagepub.com'
  }]
}
];

describe('ProxyServerSettingsEdit', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm initialValues={initialValues} onSubmit={onSubmit}>
        <Field
          component={ProxyServerSettingsEdit}
          name="stringTemplates[0]"
          onCancel={onCancel}
          onDelete={onDelete}
          onSave={onSave}
          platforms={platforms}
        />
      </TestForm>,
      translationsProperties
    );
  });

  test('renders the Edit proxy server setting header', () => {
    const { getByText } = renderComponent;
    expect(getByText('Edit proxy server setting')).toBeInTheDocument();
  });

  test('renders the Cancel button', async () => {
    await Button('Cancel').exists();
  });

  test('renders the save button', async () => {
    await Button('Save').has({ disabled: true });
  });

  test('renders the name label', () => {
    const { getByText } = renderComponent;
    expect(getByText('Name')).toBeInTheDocument();
  });

  test('renders the URL customization code label', () => {
    const { getByText } = renderComponent;
    expect(getByText('URL customization code')).toBeInTheDocument();
  });

  test('renders the expected layout', () => {
    const { getByText } = renderComponent;
    expect(getByText('Variables: inputUrl, platformLocalCode')).toBeInTheDocument();
  });

  test('renders the expected layout', () => {
    const { getByText } = renderComponent;
    expect(getByText('Helpers: insertAfter, insertAfterAll, insertBefore, insertBeforeAll, urlEncode, removeProtocol, replace')).toBeInTheDocument();
  });

  test('renders the expected label', () => {
    const { getByText } = renderComponent;
    expect(getByText('Platforms to exclude from proxy server setting')).toBeInTheDocument();
  });

  test('renders the proxyServerSettingEdit by id', () => {
    const { getByTestId } = renderComponent;
    expect(getByTestId('proxyServerSettingEdit')).toBeInTheDocument();
  });

  test('renders the Name field', async () => {
    await TextField('Name*').exists();
  });

  test('renders the URL customization code field', async () => {
    await TextArea('URL customization code*').exists();
  });
});
