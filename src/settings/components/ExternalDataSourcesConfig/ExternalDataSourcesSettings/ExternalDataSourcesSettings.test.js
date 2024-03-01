import { MemoryRouter } from 'react-router-dom';

import { renderWithIntl } from '@folio/stripes-erm-testing';

import translationsProperties from '../../../../../test/helpers';
import ExternalDataSourcesSettings from './ExternalDataSourcesSettings';

jest.mock('../ExternalDataSourcesLookup/ExternalDataSourcesLookup', () => () => <div>ExternalDataSourcesLookup</div>);

const onCloseMock = jest.fn();
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
          onClose={onCloseMock}
          onDelete={onDeleteMock}
          onSubmit={onSubmit}
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  it('renders ExternalDataSourcesLookup component ', () => {
    const { getByText } = renderComponent;
    expect(getByText('ExternalDataSourcesLookup')).toBeInTheDocument();
  });
});
