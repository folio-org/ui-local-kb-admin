import { MemoryRouter } from 'react-router-dom';

import {
  Button,
  MultiColumnList,
  MultiColumnListCell,
  Pane,
  PaneHeader,
  renderWithIntl,
} from '@folio/stripes-erm-testing';

import ProxyServerLookup from './ProxyServerLookup';
import translationsProperties from '../../../../../test/helpers';

const onSubmit = jest.fn();
const onDeleteMock = jest.fn();
const onSelectedProxyServer = jest.fn();

const stringTemplates = [
  {
    id: '699b584e-1416-4369-8098-c19c24de84e7',
    dateCreated: '2023-12-12T21:47:37Z',
    rule: 'https://mrTest.com',
    context: {
      id: '2c9180a48c5e40e1018c5e47dfb10046',
      value: 'urlproxier',
      label: 'urlProxier'
    },
    lastUpdated: '2023-12-13T10:41:10Z',
    name: 'MR TEST',
    idScopes: [
      {
        label: 'Oxford Academic Journals',
        value: '1920ffe0-a00e-4277-b7dc-090b990ddae8'
      },
      {
        label: 'Mary Ann Liebert, Inc. Publishers',
        value: '900ae0cc-febc-449c-900a-c86555d565d2'
      }
    ]
  },
  {
    id: '02be54b8-26d4-48e8-b24a-248968e4cbdf',
    dateCreated: '2023-12-12T21:54:33Z',
    rule: 'https://mrtest2.co.uk',
    context: {
      id: '2c9180a48c5e40e1018c5e47dfb10046',
      value: 'urlproxier',
      label: 'urlProxier'
    },
    lastUpdated: '2023-12-13T10:42:33Z',
    name: 'MR TEST 2',
    idScopes: []
  }
];

const platforms = [
  {
    'id': '314d9595-c449-4948-8d90-e730f386269e',
    'dateCreated': '2024-01-28T13:48:57Z',
    'lastUpdated': '2024-01-28T13:48:57Z',
    'name': 'DeGruyter Online',
    'locators': []
  },
  {
    'id': 'dd539bf7-f745-42c7-99d0-a68e276a1154',
    'dateCreated': '2024-01-28T13:49:21Z',
    'lastUpdated': '2024-01-28T13:49:21Z',
    'name': 'Oxford Academic Journals',
    'locators': [
      {
        'id': 'f6fc9711-fa5b-4cf7-87de-419041dd3ca0',
        'domainName': 'academic.oup.com'
      }
    ]
  },
];

describe('ProxyServerLookup', () => {
  beforeEach(() => {
    renderWithIntl(
      <MemoryRouter>
        <ProxyServerLookup
          onDelete={onDeleteMock}
          onSelectedProxyServer={onSelectedProxyServer}
          onSubmit={onSubmit}
          platforms={platforms}
          stringTemplates={stringTemplates}
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  it('renders the expected New button', async () => {
    await Button('New').exists();
  });

  it('renders the expected Pane ', async () => {
    await Pane('Proxy server settings').is({ visible: true });
  });

  it('renders the expected Pane header', async () => {
    await PaneHeader('Proxy server settings').is({ visible: true });
  });

  test('renders the expected number of records in the pane sub text', async () => {
    await Pane('Proxy server settings').has({ subtitle: '2 proxy server settings' });
  });

  test('renders the expcted number of MCL columns', async () => {
    await MultiColumnList({ columnCount: 3 }).exists();
  });

  test('renders the expcted number of MCL rows', async () => {
    await MultiColumnList({ rowCount: 2 }).exists();
  });

  test('renders expected columns', async () => {
    await MultiColumnList({
      columns: [
        'Name',
        'URL customization code',
        'Platforms to exclude from proxy server setting',
      ],
    }).exists();
  });

  test('renders expected name in the row', async () => {
    Promise.all([
      await MultiColumnListCell({ row: 0, columnIndex: 0 }).has({ content: 'MR TEST' }),
      await MultiColumnListCell({ row: 1, columnIndex: 0 }).has({ content: 'MR TEST 2' })
    ]);
  });

  test('renders expected url in the row', async () => {
    Promise.all([
      await MultiColumnListCell({ row: 0, columnIndex: 1 }).has({ content: 'https://mrTest.com' }),
      await MultiColumnListCell({ row: 1, columnIndex: 1 }).has({ content: 'https://mrtest2.co.uk' })
    ]);
  });

  test('renders expected platforms in the row', async () => {
    Promise.all([
      await MultiColumnListCell({ row: 0, columnIndex: 2 }).has({ content: 'Oxford Academic Journals, Mary Ann Liebert, Inc. Publishers' }),
    ]);
  });
});
