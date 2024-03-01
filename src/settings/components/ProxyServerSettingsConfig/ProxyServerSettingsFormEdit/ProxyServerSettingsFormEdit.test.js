import {
  TestForm,
  renderWithIntl,
  TextField,
} from '@folio/stripes-erm-testing';

import translationsProperties from '../../../../../test/helpers';
import ProxyServerSettingsFormEdit from './ProxyServerSettingsFormEdit';

const onSubmit = jest.fn();

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

let renderComponent;

describe('ProxyServerSettingsFormEdit', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <ProxyServerSettingsFormEdit
          platforms={platforms}
        />
      </TestForm>,
      translationsProperties
    );
  });

  test('renders the Name field', async () => {
    await TextField('Name*').exists();
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

  test('renders the expected Save & close button', () => {
    const { getByRole } = renderComponent;
    expect(getByRole('button', { name: 'Submit' }));
  });
});
