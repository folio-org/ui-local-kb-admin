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
    'ended': 1670507744793,
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

    test('renders the expected Running status value', async () => {
      await KeyValue('Running status').has({ value: 'Ended' });
    });

    test('renders the expected Import outcome value', async () => {
      await KeyValue('Import outcome').has({ value: 'Success' });
    });

    test('renders the expcected Started date and time', async () => {
      await FormattedDateTime({ id: 'started-datetime' }).has({ date: '12/8/2022' });
      await FormattedDateTime({ id: 'started-datetime' }).has({ time: '1:55 PM' });
    });

    test('renders the expcected Ended date and time', async () => {
      await FormattedDateTime({ id: 'ended-datetime' }).has({ date: '12/8/2022' });
      await FormattedDateTime({ id: 'ended-datetime' }).has({ time: '1:55 PM' });
    });

    test('renders the expected Errors value', async () => {
      await KeyValue('Errors').has({ value: '0' });
    });

    test('renders the expected Job Type value', async () => {
      await KeyValue('Job Type').has({ value: 'Title harvester' });
    });

    test('renders expected Collapse all button', async () => {
      await Button('Collapse all').exists();
    });

    test('renders dropdwon action/delete buttons', async () => {
      await waitFor(async () => {
        await Button('Actions').click();
        await Button('Delete').click();
      });

      expect(onDeleteMock).toHaveBeenCalled();
    });
  });
});
