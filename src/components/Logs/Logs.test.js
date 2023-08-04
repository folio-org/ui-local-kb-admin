import { MemoryRouter } from 'react-router-dom';

import { Accordion, Button, renderWithIntl } from '@folio/stripes-erm-testing';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';

import translationsProperties from '../../../test/helpers';
import Logs from './Logs';

const job = {
  'id': '4fba2eea-8e86-41a3-a00d-a6fa8cc68239',
  'dateCreated': 1670384664063,
  'ended': 1670384668945,
  'result': {
    'id': '2c91809c84e7ad0e0184e7b4d53d0024',
    'value': 'success',
    'label': 'Success'
  },
  'name': 'Scheduled Package Ingest Job 2022-12-07T03:44:24.060981Z',
  'started': 1670384668275,
  'status': {
    'id': '2c91809c84e7ad0e0184e7b4d556002b',
    'value': 'ended',
    'label': 'Ended'
  },
  'class': 'org.olf.general.jobs.PackageIngestJob',
  'fullLogCount': 1,
  'errorLogCount': 0,
  'infoLogCount': 1
};

describe('Logs', () => {
  let renderComponent;
  describe('Error log', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <Logs
            id="errorLogs"
            job={job}
            type="error"
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the Error log Accordion', async () => {
      await Accordion('Error log').exists();
    });

    it('renders error message for the job', () => {
      const { getByText } = renderComponent;
      expect(getByText('No errors to report.')).toBeInTheDocument();
    });
  });

  describe('Info log', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <Logs
            id="infoLogs"
            job={job}
            type="info"
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the Info log Accordion', async () => {
      await Accordion('Info log').exists();
    });

    test('renders the Export button', async () => {
      await Button('Export').exists();
    });

    it('renders information message for the job', () => {
      const { getByText } = renderComponent;
      expect(getByText('No information notices for this job.')).toBeInTheDocument();
    });

    it('export button works as expected', () => {
      const { getByRole, queryAllByTestId } = renderComponent;
      expect(getByRole('button', { name: 'Export' })).toBeInTheDocument();
      userEvent.click(getByRole('button', { name: 'Export' }));
      expect(queryAllByTestId(/logs\[.*\]/i).length).toEqual(0);
    });
  });
});
