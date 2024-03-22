import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import {
  renderWithIntl,
  KeyValue,
  Button
} from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router';

import translationsProperties from '../../../../../test/helpers';
import ProxyServerSettingsView from './ProxyServerSettingsView';

const onSaveMock = jest.fn();
const onSubmit = jest.fn();
const onDeleteMock = jest.fn();
const onCloseMock = jest.fn();
const onClickMock = jest.fn();

const initialValues = {
  stringTemplates: [
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
  ]
};

const platforms = [
  {
    'id': '8fdc6c20-e600-4182-8163-578df3a5ccc7',
    'dateCreated': '2024-01-29T14:03:09Z',
    'lastUpdated': '2024-01-29T14:03:09Z',
    'name': 'DeGruyter Online',
    'locators': [
      {
        'id': 'e1fb57a9-2bb0-4dd9-b20c-98ec8ef436b0',
        'domainName': 'www.degruyter.com'
      }
    ]
  },
  {
    'id': '99b7d658-8166-438a-a965-ea1f181f5d4b',
    'dateCreated': '2024-01-29T14:03:32Z',
    'lastUpdated': '2024-01-29T14:03:32Z',
    'name': 'Oxford Academic Journals',
    'locators': [
      {
        'id': 'e8bd2daa-8b23-4598-85b4-591a25efd45c',
        'domainName': 'academic.oup.com'
      }
    ]
  },
  {
    'id': '4a9665a0-be04-4b70-9972-b8fba00759fc',
    'dateCreated': '2024-01-29T14:03:40Z',
    'lastUpdated': '2024-01-29T14:03:40Z',
    'name': 'Taylor & Francis Online',
    'locators': [
      {
        'id': 'd901773e-207c-4a2c-b166-db25e5f929e5',
        'domainName': 'www.tandfonline.com'
      }
    ]
  },
  {
    'id': '8586db1c-718a-4115-b68a-36f78da98aa0',
    'dateCreated': '2024-01-29T14:03:43Z',
    'lastUpdated': '2024-01-29T14:03:43Z',
    'name': 'SpringerLink',
    'locators': [
      {
        'id': '4c468735-f6ef-4b1a-84f6-e390ea26669a',
        'domainName': 'link.springer.com'
      }
    ]
  }
];

const stringTemplates = [
  {
    'id': 'ff750618-47be-42d2-89ac-41f7ddbc5958',
    'dateCreated': '2024-01-29T16:36:33Z',
    'rule': 'https://mrtest.com',
    'context': {
      'id': '2c9180a58d557f71018d558710ea0021',
      'value': 'urlproxier',
      'label': 'urlProxier'
    },
    'lastUpdated': '2024-01-29T16:36:33Z',
    'name': 'MR TEST',
    'idScopes': [
      ''
    ]
  },
  {
    'id': '2f57d1d1-f32f-48cd-b99a-c1df1b0fcbeb',
    'dateCreated': '2024-01-29T16:37:12Z',
    'rule': 'https://test1.co.uk',
    'context': {
      'id': '2c9180a58d557f71018d558710ea0021',
      'value': 'urlproxier',
      'label': 'urlProxier'
    },
    'lastUpdated': '2024-01-29T16:37:12Z',
    'name': 'MR TEST 1',
    'idScopes': [
      ''
    ]
  }
];

// This isn't how I want to test this kind of thing.
// We should have a centralised proxy server object,
// then mock useQuery to bring it in and test the right things render
const proxyServerId = '2f57d1d1-f32f-48cd-b99a-c1df1b0fcbeb';

describe('ProxyServerSettingsView', () => {
  beforeEach(() => {
    renderWithIntl(
      <MemoryRouter
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <ProxyServerSettingsView
          onClick={onClickMock}
          onClose={onCloseMock}
          onDelete={onDeleteMock}
          onSave={onSaveMock}
          onSubmit={onSubmit}
          platforms={platforms}
          proxyServerId={proxyServerId}
          stringTemplates={stringTemplates}
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders Action menu', async () => {
    await Button('Actions').exists();
  });

  test('Action menu has four items', async () => {
    await waitFor(async () => {
      await Button('Actions').click();
      await Button('Edit').exists();
      await Button('Delete').click();
    });
  });

  test('renders the Name keyValue', async () => {
    await KeyValue('Name').exists();
  });

  test('renders the URL customization code keyValue', async () => {
    await KeyValue('URL customization code').exists();
  });

  test('renders the Platforms to exclude from proxy server setting keyValue', async () => {
    await KeyValue('Platforms to exclude from proxy server setting').exists();
  });
});
