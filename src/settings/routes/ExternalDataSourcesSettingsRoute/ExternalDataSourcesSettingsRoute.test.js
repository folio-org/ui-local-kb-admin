import PropTypes from 'prop-types';
import { renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';

import { useCallout } from '@folio/stripes/core';
import { Button } from '@folio/stripes/components';
import { Button as ButtonInteractor } from '@folio/stripes-testing';

import translationsProperties from '../../../../test/helpers/translationsProperties';
import ExternalDataSourcesSettingsRoute from './ExternalDataSourcesSettingsRoute';

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useCallout: jest.fn().mockReturnValue({
    sendCallout: jest.fn()
  }),
  useOkapiKy:jest.fn()
}));

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

jest.mock('../../components/ExternalDataSourcesConfig/ExternalDataSourcesForm', () => {
  return (props) => (
    <div>
      <div>ExternalDataSourcesForm</div>
      <SaveButton {...props} />
      <DeleteButton {...props} />
    </div>
  );
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

describe('ExternalDataSourcesSettingsRoute', () => {
  describe('rendering the route', () => {
    let renderComponent;
    beforeEach(() => {
      jest.clearAllMocks();
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
      expect(useCallout).toHaveBeenCalled();
    });

    test('clicking on the DeleteButton fires the callout', async () => {
      await ButtonInteractor('DeleteButton').click();
      expect(useCallout).toHaveBeenCalled();
    });
  });
});
