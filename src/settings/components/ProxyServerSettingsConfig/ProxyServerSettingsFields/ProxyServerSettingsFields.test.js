import React from 'react';
import { Field } from 'react-final-form';
import { renderWithIntl, TestForm } from '@folio/stripes-erm-testing';

import translationsProperties from '../../../../../test/helpers';
import ProxyServerSettingsFields from './ProxyServerSettingsFields';

const onDelete = jest.fn();
const onSave = jest.fn();
const onSubmit = jest.fn();

jest.mock('../ProxyServerSettingsView', () => () => <div>ProxyServerSettingsView</div>);

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
  },
  {
    'id': '4296951d-b7e1-4710-aee6-27c0a5e89e94',
    'dateCreated': '2023-01-11T16:06:47Z',
    'rule': 'https://www.test.co.uk/',
    'context': {
      'id': '2c91809c85a1216c0185a1297fbb0039',
      'value': 'urlproxier',
      'label': 'urlProxier'
    },
    'lastUpdated': '2023-01-11T16:06:47Z',
    'name': 'MR test',
    'idScopes': [{
      'label': 'Sage',
      'value': '3945d877-4e89-406b-88a0-959cdc43aebf'
    },
    {
      'label': 'Oxford Academic Journals',
      'value': '61230f51-9703-4734-9232-b6d11c3a2598'
    }
    ]
  }
  ]
};

describe('ProxyServerSettingsFields', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm initialValues={initialValues} onSubmit={onSubmit}>
        <Field
          component={ProxyServerSettingsFields}
          name="stringTemplates[0]"
          onDelete={onDelete}
          onSave={onSave}
        />
      </TestForm>,
      translationsProperties
    );
  });

  test('renders the ProxyServerSettingsView component', () => {
    const { getByText } = renderComponent;
    expect(getByText('ProxyServerSettingsView')).toBeInTheDocument();
  });
});

