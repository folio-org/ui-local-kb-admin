import React from 'react';
import { FieldArray } from 'react-final-form-arrays';
import { renderWithIntl, TestForm } from '@folio/stripes-erm-testing';

import translationsProperties from '../../../../../test/helpers';
import ProxyServerSettingsListFieldArray from './ProxyServerSettingsListFieldArray';

const onDelete = jest.fn();
const onSave = jest.fn();
const onSubmit = jest.fn();

jest.mock('../ProxyServerSettingsFields', () => () => <div>ProxyServerSettingsFields</div>);

const initialValues = {
  'stringTemplates': [{
    'id': '85d11efb-fef5-4960-a509-0fc72b8c1ff3',
    'dateCreated': '2023-01-11T17:54:34Z',
    'rule': 'https://www.test.co.uk/',
    'context': {
      'id': '2c91809c85a1216c0185a1297fbb0039',
      'value': 'urlproxier',
      'label': 'urlProxier'
    },
    'lastUpdated': '2023-01-11T17:54:34Z',
    'name': 'MR test',
    'idScopes': [{
      'label': 'DeGruyter Online',
      'value': '1d3050af-762c-4132-afa5-dfbd57a27766'
    }]
  }]
};

describe('ProxyServerSettingsListFieldArray', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm initialValues={initialValues} onSubmit={onSubmit}>
        <FieldArray
          component={ProxyServerSettingsListFieldArray}
          name="stringTemplates"
          onDelete={onDelete}
          onSave={onSave}
        />
      </TestForm>,
      translationsProperties
    );
  });

  test('renders the ProxyServerSettingsFields component', () => {
    const { getByText } = renderComponent;
    expect(getByText('ProxyServerSettingsFields')).toBeInTheDocument();
  });
});

