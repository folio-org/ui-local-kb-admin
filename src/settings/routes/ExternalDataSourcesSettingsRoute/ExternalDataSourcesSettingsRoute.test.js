import { MemoryRouter } from 'react-router-dom';
/*
 * IMPORTANT -- in order to mock react query successfully
 * below you must import it into the test
 */
import _ReactQuery from 'react-query';
import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import { Button as MockButton } from '@folio/stripes/components';

import {
  Button,
  Callout,
  renderWithIntl
} from '@folio/stripes-erm-testing';

import translationsProperties from '../../../../test/helpers/translationsProperties';
import ExternalDataSourcesSettingsRoute from './ExternalDataSourcesSettingsRoute';

/* EXAMPLE Mocking useMutation to allow us to test the .then clause */
jest.mock('react-query', () => {
  const { mockReactQuery } = jest.requireActual('@folio/stripes-erm-testing');

  return ({
    ...jest.requireActual('react-query'),
    ...mockReactQuery,
    useMutation: () => ({ mutateAsync: () => Promise.resolve(true) })
  });
});


jest.mock('../../components/ExternalDataSourcesConfig/ExternalDataSourcesSettings', () => {
  return (props) => {
    return (
      <div>
        <div>ExternalDataSourcesSettings</div>
        <MockButton onClick={props.onSubmit}>SubmitButton</MockButton>
        <MockButton onClick={props.onDelete}>DeleteButton</MockButton>
      </div>
    );
  };
});

const initialValues = {
  externalKbs: [{
    id: 'b65ef225-0458-4784-9cfa-45d7599acc37',
    cursor: '2022-12-15T07:29:46Z',
    active: true,
    trustedSourceTI: false,
    activationEnabled: false,
    readonly: false,
    syncStatus: 'in-process',
    name: 'GOKb_TEST',
    type: 'org.olf.kb.adapters.GOKbOAIAdapter',
    fullPrefix: 'gokb',
    uri: 'https://gokbt.gbv.de/gokb/oai/index',
    supportsHarvesting: true,
    rectype: 1
  }]
};

/* EXAMPLE Testing callouts should be pretty easy now. */

describe('ExternalDataSourcesSettingsRoute', () => {
  describe('rendering the route', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <ExternalDataSourcesSettingsRoute
            initialValues={initialValues}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the ExternalDataSourcesSettings component', () => {
      const { getByText } = renderComponent;
      expect(getByText('ExternalDataSourcesSettings')).toBeInTheDocument();
    });

    test('clicking on the SubmitButton fires the callout', async () => {
      await waitFor(async () => {
        await Button('SubmitButton').click();
      });
      await Callout('External data source successfully saved.').exists();
    });

    test('clicking on the DeleteButton fires the callout', async () => {
      await waitFor(async () => {
        await Button('DeleteButton').click();
      });
      await Callout('External data source successfully deleted.').exists();
    });
  });
});
