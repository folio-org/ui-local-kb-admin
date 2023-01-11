import { renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';

import translationsProperties from '../../../test/helpers/translationsProperties';
import JobViewRoute from './JobViewRoute';

jest.mock('../../components/views/JobInfo', () => () => <div>JobInfo</div>);

const historyPushMock = jest.fn();
const historyReplaceMock = jest.fn();


const props = {
  history: {
    push: historyPushMock,
    replace: historyReplaceMock
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

describe('JobViewRoute', () => {
  describe('rendering the route', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <JobViewRoute {...props} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the JobInfo component', () => {
      const { getByText } = renderComponent;
      expect(getByText('JobInfo')).toBeInTheDocument();
    });
  });
});
