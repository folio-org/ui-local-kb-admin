import PropTypes from 'prop-types';
import { renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import { Button } from '@folio/stripes/components';
import { Button as ButtonInteractor } from '@folio/stripes-testing';

import translationsProperties from '../../../test/helpers/translationsProperties';
import JobCreateRoute from './JobCreateRoute';

const CloseButton = (props) => {
  return <Button onClick={props.handlers.onClose}>CloseButton</Button>;
};

CloseButton.propTypes = {
  handlers: PropTypes.shape({
    onClose: PropTypes.func,
  }),
};

const historyPushMock = jest.fn();

jest.mock('../../components/views/JobForm', () => {
  return (props) => (
    <div>
      <div>JobForm</div>
      <CloseButton {...props} />
    </div>
  );
});

const KBARTProps = {
  history: {
    push: historyPushMock
  },
  location: {
    search: '?filters=status.queued%2Cstatus.in_progress%2Cstatus.ended&sort=-started',
  },
  match: {
    params: {
      format: 'KBART'
    },
  },
};

const JSONProps = {
  history: {
    push: historyPushMock
  },
  location: {
    search: '?filters=status.queued%2Cstatus.in_progress&sort=-started',
  },
  match: {
    params: {
      format: 'JSON'
    },
  },
};

describe('JobCreateRoute', () => {
  describe('rendering the route with KBART format', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <JobCreateRoute {...KBARTProps} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the JobForm component', () => {
      const { getByText } = renderComponent;
      expect(getByText('JobForm')).toBeInTheDocument();
    });

    test('triggers the CloseButton callback', async () => {
      await ButtonInteractor('CloseButton').click();
      expect(historyPushMock).toHaveBeenCalled();
    });

    describe('re-rendering the route', () => { // makes sure that we hit the componentDidUpdate block
      beforeEach(() => {
        renderWithIntl(
          <MemoryRouter>
            <JobCreateRoute {...KBARTProps} />
          </MemoryRouter>,
          translationsProperties,
          renderComponent.rerender
        );
      });

      test('renders the JobForm component', () => {
        const { getByText } = renderComponent;
        expect(getByText('JobForm')).toBeInTheDocument();
      });
    });
  });

  describe('rendering the route with JSON format', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <JobCreateRoute {...JSONProps} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the JobForm component', () => {
      const { getByText } = renderComponent;
      expect(getByText('JobForm')).toBeInTheDocument();
    });

    test('triggers the CloseButton callback', async () => {
      await ButtonInteractor('CloseButton').click();
      expect(historyPushMock).toHaveBeenCalled();
    });
  });
});
