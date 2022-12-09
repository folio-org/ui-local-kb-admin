import React from 'react';

import { renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import { Pane, Button, TextField, MultiColumnList } from '@folio/stripes-testing';

import translationsProperties from '../../../../test/helpers';
import { data, searchString } from './testResources';
import Jobs from './Jobs';

jest.mock('../../JobFilters', () => () => <div>JobFilters</div>);

describe('Jobs', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <Jobs
          data={data}
          onNeedMoreData={jest.fn()}
          queryGetter={jest.fn()}
          querySetter={jest.fn()}
          searchString={searchString}
          source={{
            totalCount: jest.fn(() => data.jobs.length),
            loaded: jest.fn(() => true),
            pending: jest.fn(() => false),
            failure: jest.fn(() => false),
            failureMessage: jest.fn(() => null)
          }}
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the expected Search and Filter Pane', async () => {
    await Pane('Search and filter').is({ visible: true });
  });

  test('renders the expected Search and Reset all Button', async () => {
    await TextField({ id: 'input-local-kb-admin-search' }).fillIn('test'); // enables the disabled buttons
    await Button('Search').exists();
    await Button('Reset all').exists();
  });

  test('renders the JobFilters component', () => {
    const { getByText } = renderComponent;
    expect(getByText('JobFilters')).toBeInTheDocument();
  });

  test('renders the expected Local KB admin Pane', async () => {
    await Pane('Local KB admin').is({ visible: true });
  });

  test('renders the expected number of records in the pane sub text', async () => {
    await Pane('Local KB admin').has({ subtitle: '"4 records found"' });
  });

  test('renders the expcted number of MCL columns', async () => {
    await MultiColumnList({ columnCount: 6 }).exists();
  });

  test('renders the expcted number of MCL rows', async () => {
    await MultiColumnList({ rowCount: 4 }).exists();
  });

  test('renders expected columns', async () => {
    await MultiColumnList({
      columns: [
        'Job name',
        'Running status',
        'Import outcome',
        'Errors',
        'Started',
        'Ended'
      ],
    }).exists();
  });
});
