import PropTypes from 'prop-types';
import { renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';

import { Button } from '@folio/stripes/components';
import { Button as ButtonInteractor, Callout } from '@folio/stripes-testing';

import translationsProperties from '../../../../test/helpers/translationsProperties';
import ProxyServerSettingsRoute from './ProxyServerSettingsRoute';

jest.mock('react-query', () => {
  const { mockReactQuery } = jest.requireActual('@folio/stripes-erm-testing');

  return ({
    ...jest.requireActual('react-query'),
    ...mockReactQuery,
    useMutation: () => ({ mutateAsync: () => Promise.resolve(true) })
  });
});

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
  return (props) => {
    return (
      <div>
        <div>ProxyServerSettingsForm</div>
        <SaveButton {...props} />
        <DeleteButton {...props} />
      </div>
    );
  };
});

const initialValues = {
  'stringTemplates': []
};

describe('ProxyServerSettingsRoute', () => {
  describe('rendering the route', () => {
    let renderComponent;
    beforeEach(() => {
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
      await Callout('External data source successfully saved.').exists();
    });

    test('clicking on the DeleteButton fires the callout', async () => {
      await ButtonInteractor('DeleteButton').click();
      await Callout('External data source successfully deleted.').exists();
    });
  });
});