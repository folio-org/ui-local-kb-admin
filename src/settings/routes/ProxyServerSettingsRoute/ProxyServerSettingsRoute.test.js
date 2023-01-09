import PropTypes from 'prop-types';
import { renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';

import { useCallout } from '@folio/stripes/core';
import { Button } from '@folio/stripes/components';
import { Button as ButtonInteractor } from '@folio/stripes-testing';

import translationsProperties from '../../../../test/helpers/translationsProperties';
import ProxyServerSettingsRoute from '../ProxyServerSettingsRoute';

SaveButton.propTypes = {
    onSave: PropTypes.func,
};

DeleteButton.propTypes = {
    onSave: PropTypes.func,
};

const historyPushMock = jest.fn();

jest.mock('../../components/ProxyServerSettingsConfig/ProxyServerSettingsForm', () => {
  return (props) => (
    <div>
      <div>ProxyServerSettingsForm</div>
      <SaveButton {...props} />
      <DeleteButton {...props} />
    </div>
  );
});

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

const props = {
  history: {
    push: historyPushMock
  },
  location: {
    pathname: '/local-kb-admin/7215d75f-e8c9-438b-85d0-c09425ae4043',
    search: '?sort=-started',
  },
  match: {
    params: {
      id: '7215d75f-e8c9-438b-85d0-c09425ae4043'
    },
  },
};

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
          <ProxyServerSettingsRoute {...props} initialValues={initialValues} />
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
