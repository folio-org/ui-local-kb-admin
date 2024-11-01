import {
  Button,
  FormattedDateTime,
  KeyValue,
  renderWithIntl
} from '@folio/stripes-erm-testing';

import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import translationsProperties from '../../../../test/helpers';
import JobInfo from './JobInfo';

const onDeleteMock = jest.fn();
const onCloseMock = jest.fn();

const data = {
  'job': {
    'id': '6eb739dc-04b5-4528-addd-f87730ed7bd6',
    'dateCreated': 1670507737772,
    'ended': 1670509984793,
    'result': {
      'id': '2c91809c84f1fd4b0184f205302f003b',
      'value': 'success',
      'label': 'Success'
    },
    'name': 'Scheduled Title Ingest Job 2022-12-08T13:55:37.588445Z',
    'started': 1670507744743,
    'status': {
      'id': '2c91809c84f1fd4b0184f20530520042',
      'value': 'ended',
      'label': 'Ended'
    },
    'class': 'org.olf.general.jobs.TitleIngestJob',
    'fullLogCount': 0,
    'errorLogCount': 0,
    'infoLogCount': 0
  }
};

const isLoadingData = {
  'job': {
    class: 'org.olf.general.jobs.TitleIngestJob'
  }
};

describe('JobInfo', () => {
  let renderComponent;
  describe('Job info is loading', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <JobInfo
          data={isLoadingData}
          isLoading
          onClose={onCloseMock}
          onDelete={onDeleteMock}
        />,
        translationsProperties
      );
    });

    it('renders the Loading pane', () => {
      const { getByText } = renderComponent;
      expect(getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('Job info after loading', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <JobInfo
          data={data}
          isLoading={false}
          onClose={onCloseMock}
          onDelete={onDeleteMock}
        />,
        translationsProperties
      );
    });

    test('renders the job title', () => {
      const { getAllByText } = renderComponent;
      expect(getAllByText('Scheduled Title Ingest Job 2022-12-08T13:55:37.588445Z').length).toEqual(2);
    });

    test.each([
      {
        title: 'Running status',
        interactor: KeyValue('Running status'),
        hasObj: { value: 'Ended' }
      },
      {
        title: 'Import outcome',
        interactor: KeyValue('Import outcome'),
        hasObj: { value: 'Success' }
      },
      {
        title: 'Start date date',
        interactor: FormattedDateTime({ id: 'started-datetime' }),
        hasObj: { date: '12/8/2022' }
      },
      {
        title: 'Start date time',
        interactor: FormattedDateTime({ id: 'started-datetime' }),
        hasObj: { time: '1:55 PM' }
      },
      {
        title: 'End date date',
        interactor: FormattedDateTime({ id: 'ended-datetime' }),
        hasObj: { date: '12/8/2022' }
      },
      {
        title: 'End date time',
        interactor: FormattedDateTime({ id: 'ended-datetime' }),
        hasObj: { time: '2:33 PM' }
      },
      {
        title: 'Errors',
        interactor: KeyValue('Errors'),
        hasObj: { value: '0' }
      },
      {
        title: 'Job Type',
        interactor: KeyValue('Job Type'),
        hasObj: { value: 'Title harvester' }
      },
    ])('renders the expected $title', async ({ title: _t, interactor, hasObj }) => {
      await interactor.has(hasObj);
    });

    test('renders expected Collapse all button', async () => {
      await Button('Collapse all').exists();
    });

    describe('clicking actions button', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Button('Actions').click();
        });
      });

      describe('clicking delete button', () => {
        beforeEach(async () => {
          await waitFor(async () => {
            await Button('Delete').click();
          });
        });

        test('onDelete callback called', async () => {
          await waitFor(() => {
            expect(onDeleteMock).toHaveBeenCalled();
          });
        });
      });
    });
  });
});
