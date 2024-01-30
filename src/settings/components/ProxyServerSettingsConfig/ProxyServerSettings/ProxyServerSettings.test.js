import { MemoryRouter } from 'react-router-dom';

import { renderWithIntl } from '@folio/stripes-erm-testing';

import ProxyServerSettings from './ProxyServerSettings';
import translationsProperties from '../../../../../test/helpers';

jest.mock('../ProxyServerLookup/ProxyServerLookup', () => () => <div>ProxyServerLookup</div>);

const onCancelMock = jest.fn();
const onSaveMock = jest.fn();
const onSubmit = jest.fn();
const onDeleteMock = jest.fn();

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

let renderComponent;

describe('ProxyServerSettings', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <ProxyServerSettings
          initialValues={initialValues}
          onCancel={onCancelMock}
          onDelete={onDeleteMock}
          onSave={onSaveMock}
          onSubmit={onSubmit}
          stringTemplates={stringTemplates}
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  it('renders ProxyServerLookup component ', () => {
    const { getByText } = renderComponent;
    expect(getByText('ProxyServerLookup')).toBeInTheDocument();
  });
});
