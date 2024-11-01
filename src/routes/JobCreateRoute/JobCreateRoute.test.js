import { MemoryRouter } from 'react-router-dom';

import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import { Button as MockStripesButton } from '@folio/stripes/components';
import { Button, renderWithIntl } from '@folio/stripes-erm-testing';

import translationsProperties from '../../../test/helpers/translationsProperties';
import JobCreateRoute from './JobCreateRoute';

const historyPushMock = jest.fn();

jest.mock('../../components/views/JobForm', () => {
  return (props) => (
    <div>
      <div>JobForm</div>
      <MockStripesButton
        onClick={props.handlers.onClose}
      >
        CloseButton
      </MockStripesButton>
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
  describe.each([
    { format: 'KBART', props: KBARTProps },
    { format: 'JSON', props: JSONProps }
  ])('rendering the route with $format format', ({ props }) => {
    let renderComponent;
    beforeEach(() => {
      historyPushMock.mockClear();
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <JobCreateRoute {...props} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the JobForm component', () => {
      const { getByText } = renderComponent;
      expect(getByText('JobForm')).toBeInTheDocument();
    });

    describe('clicking the CloseButton', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Button('CloseButton').click();
        });
      });

      test('triggers the CloseButton callback', async () => {
        await waitFor(() => {
          expect(historyPushMock).toHaveBeenCalled();
        });
      });
    });
  });
});
