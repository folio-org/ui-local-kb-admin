import { MemoryRouter } from 'react-router-dom';
import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import { Button, Pane, PaneHeader, renderWithIntl, KeyValue, MultiColumnList, MultiColumnListCell } from '@folio/stripes-erm-testing';

import ExternalDataSourcesSettings from './ExternalDataSourcesSettings';
import translationsProperties from '../../../../../test/helpers';

jest.mock('../ExternaldataSourcesFormModal/ExternalDataSourcesFormModal', () => () => <div>ExternalDataSourcesFormModal</div>);

const onCancelMock = jest.fn();
const onSaveMock = jest.fn();
const onSubmit = jest.fn();
const onDeleteMock = jest.fn();

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

let renderComponent;

describe('ExternalDataSourcesSettings', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <ExternalDataSourcesSettings
          initialValues={initialValues}
          onCancel={onCancelMock}
          onSave={onSaveMock}
          onSubmit={onSubmit}
          onDelete={onDeleteMock}
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  it('renders ExternaldataSourcesFormModal component ', () => {
    const { getByText } = renderComponent;
    expect(getByText('ExternalDataSourcesFormModal')).toBeInTheDocument();
  });

  it('renders the expected New button', async () => {
    await Button('New').exists();
  });

  it('renders the expected Pane ', async () => {
    await Pane('External data sources').is({ visible: true });
  });

  it('renders the expected Pane header', async () => {
    await PaneHeader('External data sources').is({ visible: true });
  });
});
