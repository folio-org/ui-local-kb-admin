import { cleanup } from '@folio/jest-config-stripes/testing-library/react';
import { renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import translationsProperties from '../../../test/helpers/translationsProperties';
import JobsRoute from './JobsRoute';
import mockRefdata from '../../../test/jest/refdata';

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useLocalKBAdminRefdata: () => mockRefdata,
}));

const routeProps = {
  history: {
    push: () => jest.fn()
  },
  location: {},
  match: {
    params: {},
  },
};

describe('JobsRoute', () => {
  describe('rendering the route', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <JobsRoute {...routeProps} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the jobs component', () => {
      const { getByTestId } = renderComponent;
      expect(getByTestId('jobs')).toBeInTheDocument();
    });

    describe('re-rendering the route', () => { // makes sure that we hit the componentDidUpdate block
      beforeEach(() => {
        // Using this to clean up the render component prior to rerender
        cleanup();

        renderWithIntl(
          <MemoryRouter>
            <JobsRoute {...routeProps} />
          </MemoryRouter>,
          translationsProperties,
          renderComponent.rerender
        );
      });

      test('renders the jobs component', () => {
        const { getByTestId } = renderComponent;
        expect(getByTestId('jobs')).toBeInTheDocument();
      });
    });
  });
});
