import PropTypes from 'prop-types';
import { renderWithIntl } from '@folio/stripes-erm-testing';

import { MemoryRouter } from 'react-router-dom';

import { Button } from '@folio/stripes/components';
import { Button as ButtonInteractor, Callout } from '@folio/stripes-testing';

import translationsProperties from '../../../../test/helpers/translationsProperties';
import ExternalDataSourcesSettingsRoute from './ExternalDataSourcesSettingsRoute';

const SaveButton = (props) => {
  return <Button onClick={props.onSave}>SaveButton</Button>;
};

const DeleteButton = (props) => {
  return <Button onClick={props.onDelete}>DeleteButton</Button>;
};

SaveButton.propTypes = {
  onSave: PropTypes.func,
};

DeleteButton.propTypes = {
  onDelete: PropTypes.func,
};

/* EXAMPLE Mocking useMutation to allow us to test the .then clause */
jest.mock('react-query', () => {
  const { mockReactQuery } = jest.requireActual('@folio/stripes-erm-testing');

  return ({
    ...jest.requireActual('react-query'),
    ...mockReactQuery,
    useMutation: () => ({ mutateAsync: () => Promise.resolve(true) })
  });
});

jest.mock('../../components/ExternalDataSourcesConfig/ExternalDataSourcesForm', () => {
  return (props) => {
    return (
      <div>
        <div>ExternalDataSourcesForm</div>
        <SaveButton {...props} />
        <DeleteButton {...props} />
      </div>
    );
  };
});

const initialValues = {
  'externalKbs': [{
    'id': 'b65ef225-0458-4784-9cfa-45d7599acc37',
    'cursor': '2022-12-15T07:29:46Z',
    'active': true,
    'trustedSourceTI': false,
    'activationEnabled': false,
    'readonly': false,
    'syncStatus': 'in-process',
    'name': 'GOKb_TEST',
    'type': 'org.olf.kb.adapters.GOKbOAIAdapter',
    'fullPrefix': 'gokb',
    'uri': 'https://gokbt.gbv.de/gokb/oai/index',
    'supportsHarvesting': true,
    'rectype': 1
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

    test('renders the ExternalDataSourcesForm component', () => {
      const { getByText } = renderComponent;
      expect(getByText('ExternalDataSourcesForm')).toBeInTheDocument();
    });

    test('clicking on the SaveButton fires the callout', async () => {
      await ButtonInteractor('SaveButton').click();
      await Callout('External data source successfully saved.').exists();
    });

    test('clicking on the DeleteButton fires the callout', async () => {
      await ButtonInteractor('DeleteButton').click();
      await Callout('External data source successfully deleted.').exists();
    });
  });
});
