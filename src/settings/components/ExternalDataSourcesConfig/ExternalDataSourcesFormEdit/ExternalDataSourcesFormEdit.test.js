import {
  TestForm,
  Button,
  Checkbox,
  Select,
  renderWithIntl,
} from '@folio/stripes-erm-testing';

import translationsProperties from '../../../../../test/helpers';
import ExternalDataSourcesFormEdit from './ExternalDataSourcesFormEdit';


const onSubmit = jest.fn();

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

let renderComponent;

describe('ExternalDataSourcesFormEdit', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <ExternalDataSourcesFormEdit />
      </TestForm>,
      translationsProperties
    );
  });

  it('renders the expected Submit button', async () => {
    await Button('Submit').exists();
  });

  it('Displays expected name label', () => {
    const { getByText } = renderComponent;
    expect(getByText('Name')).toBeInTheDocument();
  });

  it('renders the Type component', () => {
    const { getByText } = renderComponent;
    expect(getByText('Type')).toBeInTheDocument();
  });

  it('renders the Record type component', () => {
    const { getByText } = renderComponent;
    expect(getByText('Record type')).toBeInTheDocument();
  });

  it('renders expected Record type with selected option', async () => {
    Select('Record type').choose('Package');
  });

  it('renders the URI component', () => {
    const { getByText } = renderComponent;
    expect(getByText('URI')).toBeInTheDocument();
  });

  it('renders the Trusted for title instance metadata component', () => {
    const { getByText } = renderComponent;
    expect(getByText('Trusted for title instance metadata')).toBeInTheDocument();
  });

  it('renders the Is active component', () => {
    const { getByText } = renderComponent;
    expect(getByText('Is active')).toBeInTheDocument();
  });

  test('clicking the Is active checkbox', async () => {
    await Checkbox('Is active').is({ checked: false });
  });

  it('renders the Supports harvesting component', () => {
    const { getByText } = renderComponent;
    expect(getByText('Supports harvesting')).toBeInTheDocument();
  });

  it('renders the Activation enabled component', () => {
    const { getByText } = renderComponent;
    expect(getByText('Activation enabled')).toBeInTheDocument();
  });

  test('clicking the Activation enabled checkbox', async () => {
    await Checkbox('Activation enabled').is({ checked: false });
  });

  it('renders the Listprefix component', () => {
    const { getByText } = renderComponent;
    expect(getByText('Listprefix')).toBeInTheDocument();
  });

  it('renders the Fullprefix component', () => {
    const { getByText } = renderComponent;
    expect(getByText('Fullprefix')).toBeInTheDocument();
  });

  it('renders the Principal component', () => {
    const { getByText } = renderComponent;
    expect(getByText('Principal')).toBeInTheDocument();
  });

  it('renders the Credentials component', () => {
    const { getByText } = renderComponent;
    expect(getByText('Credentials')).toBeInTheDocument();
  });
});
