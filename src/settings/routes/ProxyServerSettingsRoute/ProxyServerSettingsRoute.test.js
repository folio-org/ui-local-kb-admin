import PropTypes from 'prop-types';
import { renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';

import { useCallout } from '@folio/stripes/core';
import { Button } from '@folio/stripes/components';
import { Button as ButtonInteractor } from '@folio/stripes-testing';

import translationsProperties from '../../../../test/helpers/translationsProperties';
import ProxyServerSettingsRoute from './ProxyServerSettingsRoute';

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

jest.mock('../../components/ProxyServerSettingsConfig/ProxyServerSettingsForm', () => {
  return (props) => (
    <div>
      <div>ProxyServerSettingsForm</div>
      <SaveButton {...props} />
      <DeleteButton {...props} />
    </div>
  );
});

const initialValues = {
  'stringTemplates': []
};

describe('ProxyServerSettingsRoute', () => {
  describe('rendering the route', () => {
    let renderComponent;
    beforeEach(() => {
      jest.clearAllMocks();
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <ProxyServerSettingsRoute
            initialValues={initialValues}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the ProxyServerSettingsForm component', () => {
      const { getByText } = renderComponent;
      expect(getByText('ProxyServerSettingsForm')).toBeInTheDocument();
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
