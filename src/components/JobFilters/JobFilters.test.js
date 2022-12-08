import React from 'react';

import { renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import { Accordion, Checkbox } from '@folio/stripes-testing';
import { waitFor } from '@testing-library/dom';
import translationsProperties from '../../../test/helpers';
import { activeFilters, data } from './testResources';

import JobFilters from './JobFilters';

const stateMock = jest.fn(() => Promise.resolve());

const filterHandlers = {
  state: stateMock,
  checkbox: () => {},
  clear: () => {},
  clearGroup: () => {},
  reset: () => {},
};
describe('JobFilters', () => {
  beforeEach(() => {
    renderWithIntl(
      <MemoryRouter>
        <JobFilters
          activeFilters={activeFilters}
          data={data}
          filterHandlers={filterHandlers}
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the Running status Accordion', async () => {
    await Accordion('Running status').exists();
  });

  test('renders the Result Accordion', async () => {
    await Accordion('Result').exists();
  });

  test('renders the Job type Accordion', async () => {
    await Accordion('Job type').exists();
  });

  describe('clicking the status checkboxes', () => {
    test('clicking the queued checkbox', async () => {
      await waitFor(async () => {
        await Checkbox({ id: 'clickable-filter-status-queued' }).click();
      });

      expect(stateMock).toHaveBeenCalled();
    });

    test('clicking the in_progress checkbox', async () => {
      await waitFor(async () => {
        await Checkbox({ id: 'clickable-filter-status-in-progress' }).click();
      });
      expect(stateMock).toHaveBeenCalled();
    });

    test('clicking the ended checkbox', async () => {
      await waitFor(async () => {
        await Checkbox({ id: 'clickable-filter-status-ended' }).click();
      });
      expect(stateMock).toHaveBeenCalled();
    });
  });

  describe('clicking the result checkboxes', () => {
    test('clicking the success checkbox', async () => {
      await waitFor(async () => {
        await Checkbox({ id: 'clickable-filter-result-success' }).click();
      });
      expect(stateMock).toHaveBeenCalled();
    });

    test('clicking the partial_success checkbox', async () => {
      await waitFor(async () => {
        await Checkbox({ id: 'clickable-filter-result-partial-success' }).click();
      });
      expect(stateMock).toHaveBeenCalled();
    });

    test('clicking the failure checkbox', async () => {
      await waitFor(async () => {
        await Checkbox({ id: 'clickable-filter-result-failure' }).click();
      });
      expect(stateMock).toHaveBeenCalled();
    });

    test('clicking the interrupted checkbox', async () => {
      await waitFor(async () => {
        await Checkbox({ id: 'clickable-filter-result-interrupted' }).click();
      });
      expect(stateMock).toHaveBeenCalled();
    });
  });

  describe('clicking the class checkboxes', () => {
    test('clicking the Title harvester checkbox', async () => {
      await waitFor(async () => {
        await Checkbox({ id: 'clickable-filter-class-title-harvester' }).click();
      });
      expect(stateMock).toHaveBeenCalled();
    });

    test('clicking the Package harvester checkbox', async () => {
      await waitFor(async () => {
        await Checkbox({ id: 'clickable-filter-class-package-harvester' }).click();
      });
      expect(stateMock).toHaveBeenCalled();
    });

    test('clicking the File import checkbox', async () => {
      await waitFor(async () => {
        await Checkbox({ id: 'clickable-filter-class-file-import' }).click();
      });
      expect(stateMock).toHaveBeenCalled();
    });

    test('clicking the Identifier reassignment checkbox', async () => {
      await waitFor(async () => {
        await Checkbox({ id: 'clickable-filter-class-identifier-reassignment' }).click();
      });
      expect(stateMock).toHaveBeenCalled();
    });

    test('clicking the Resource rematch checkbox', async () => {
      await waitFor(async () => {
        await Checkbox({ id: 'clickable-filter-class-resource-rematch' }).click();
      });
      expect(stateMock).toHaveBeenCalled();
    });

    test('clicking the Naive match key assignment checkbox', async () => {
      await waitFor(async () => {
        await Checkbox({ id: 'clickable-filter-class-naive-match-key-assignment' }).click();
      });
      expect(stateMock).toHaveBeenCalled();
    });
  });
});
