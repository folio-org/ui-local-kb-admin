import { MemoryRouter } from 'react-router-dom';

import {
  Button,
  MultiColumnList,
  MultiColumnListCell,
  Pane,
  PaneHeader,
  renderWithIntl,
} from '@folio/stripes-erm-testing';

import ExternalDataSourcesSettings from './ExternalDataSourcesSettings';
import translationsProperties from '../../../../../test/helpers';

jest.mock('../ExternaldataSourcesFormModal/ExternalDataSourcesFormModal', () => () => <div>ExternalDataSourcesFormModal</div>);

const onCancelMock = jest.fn();
const onSaveMock = jest.fn();
const onSubmit = jest.fn();
const onDeleteMock = jest.fn();

const initialValues = {
  externalKbs: [{
    id: 'c4c903d0-f7ef-4d84-8fc7-2ed738e21b91',
    cursor: '2023-01-11T14:47:18Z',
    active: true,
    trustedSourceTI: false,
    activationEnabled: false,
    readonly: false,
    syncStatus: 'idle',
    lastCheck: 1673463680170,
    name: 'GOKb_TEST',
    type: 'org.olf.kb.adapters.GOKbOAIAdapter',
    fullPrefix: 'gokb',
    uri: 'https://gokbt.gbv.de/gokb/oai/index',
    supportsHarvesting: true,
    rectype: 1
  }]
};

const externalKbs = [
  {
    id: '30a30945-8d12-444b-8fc3-883a53bbd947',
    cursor: '2023-12-07T17:18:02Z',
    active: true,
    trustedSourceTI: false,
    activationEnabled: false,
    readonly: false,
    syncStatus: 'idle',
    lastCheck: 1701974599391,
    name: 'GOKb_TEST',
    type: 'org.olf.kb.adapters.GOKbOAIAdapter',
    fullPrefix: 'gokb',
    uri: 'https://gokbt.gbv.de/gokb/oai/index',
    supportsHarvesting: true,
    rectype: 1
  },
  {
    id: 'b27d2eba-9194-4aa3-a2d2-87f63814315f',
    active: true,
    trustedSourceTI: true,
    activationEnabled: true,
    credentials: 'test',
    readonly: false,
    name: 'MR TEST',
    type: 'org.olf.kb.adapters.GOKbOAIAdapter',
    principal: 'test',
    listPrefix: 'test',
    fullPrefix: 'test',
    uri: 'https://mrtest.co.uk',
    supportsHarvesting: true,
    rectype: 1
  }
];

let renderComponent;

describe('ExternalDataSourcesSettings', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <ExternalDataSourcesSettings
          externalKbs={externalKbs}
          initialValues={initialValues}
          onCancel={onCancelMock}
          onDelete={onDeleteMock}
          onSave={onSaveMock}
          onSubmit={onSubmit}
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

  test('renders the expected number of records in the pane sub text', async () => {
    await Pane('External data sources').has({ subtitle: '2 external data sources' });
  });

  test('renders the expcted number of MCL columns', async () => {
    await MultiColumnList({ columnCount: 8 }).exists();
  });

  test('renders the expcted number of MCL rows', async () => {
    await MultiColumnList({ rowCount: 2 }).exists();
  });

  test('renders expected columns', async () => {
    await MultiColumnList({
      columns: [
        'Name',
        'Type',
        'URI',
        'Is active',
        'Trusted for title instance metadata',
        'Sync status',
        'Cursor',
        'Last checked'
      ],
    }).exists();
  });

  test('renders expected name in the row', async () => {
    Promise.all([
      await MultiColumnListCell({ row: 0, columnIndex: 0 }).has({ content: 'GOKb_TEST' }),
      await MultiColumnListCell({ row: 1, columnIndex: 0 }).has({ content: 'MR TEST' })
    ]);
  });

  test('renders expected type in the row', async () => {
    Promise.all([
      await MultiColumnListCell({ row: 0, columnIndex: 1 }).has({ content: 'org.olf.kb.adapters.GOKbOAIAdapter' }),
      await MultiColumnListCell({ row: 1, columnIndex: 1 }).has({ content: 'org.olf.kb.adapters.GOKbOAIAdapter' })
    ]);
  });

  test('renders expected uri in the row', async () => {
    Promise.all([
      await MultiColumnListCell({ row: 0, columnIndex: 2 }).has({ content: 'https://gokbt.gbv.de/gokb/oai/index' }),
      await MultiColumnListCell({ row: 1, columnIndex: 2 }).has({ content: 'https://mrtest.co.uk' })
    ]);
  });

  test('renders expected is active in the row', async () => {
    Promise.all([
      await MultiColumnListCell({ row: 0, columnIndex: 3 }).has({ content: 'Yes' }),
      await MultiColumnListCell({ row: 1, columnIndex: 3 }).has({ content: 'Yes' })
    ]);
  });

  test('renders expected Trusted for title instance metadata in the row', async () => {
    Promise.all([
      await MultiColumnListCell({ row: 0, columnIndex: 4 }).has({ content: 'No' }),
      await MultiColumnListCell({ row: 1, columnIndex: 4 }).has({ content: 'Yes' })
    ]);
  });

  test('renders expected sync status in the row', async () => {
    Promise.all([
      await MultiColumnListCell({ row: 0, columnIndex: 5 }).has({ content: 'idle' }),
      await MultiColumnListCell({ row: 1, columnIndex: 5 }).has({ content: '' })
    ]);
  });

  test('renders expected cursor in the row', async () => {
    Promise.all([
      await MultiColumnListCell({ row: 0, columnIndex: 6 }).has({ content: '2023-12-07T17:18:02Z' }),
      await MultiColumnListCell({ row: 1, columnIndex: 6 }).has({ content: '' })
    ]);
  });

  test('renders expected last checked in the row', async () => {
    Promise.all([
      await MultiColumnListCell({ row: 0, columnIndex: 7 }).has({ content: '1701974599391' }),
      await MultiColumnListCell({ row: 1, columnIndex: 7 }).has({ content: '' })
    ]);
  });
});
