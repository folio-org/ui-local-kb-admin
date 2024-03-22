import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { useLocalStorage, writeStorage } from '@rehooks/local-storage';

import { AppIcon, useStripes } from '@folio/stripes/core';
import {
  usePrevNextPagination,
  FormattedDateTime
} from '@folio/stripes-erm-components';

import {
  Button,
  Icon,
  MultiColumnList,
  NoValue,
  Pane,
  PaneMenu,
  SearchField,
} from '@folio/stripes/components';

import {
  SearchAndSortQuery,
  CollapseFilterPaneButton,
  ExpandFilterPaneButton,
  PersistedPaneset,
  SearchAndSortNoResultsMessage,
} from '@folio/stripes/smart-components';

import { resultCount } from '../../../constants';
import JobFilters from '../../JobFilters';
import css from './Jobs.css';

const propTypes = {
  children: PropTypes.node,
  data: PropTypes.object,
  queryGetter: PropTypes.func,
  querySetter: PropTypes.func,
  searchField: PropTypes.object,
  searchString: PropTypes.string,
  contentRef: PropTypes.string,
  selectedRecordId: PropTypes.string,
  source: PropTypes.object,
  stripes: PropTypes.shape({
    hasPerm: PropTypes.func
  }),
};

const filterPaneVisibilityKey = '@folio/local-kb-admin/jobsFilterPaneVisibility';
const { RESULT_COUNT_INCREMENT_MEDIUM } = resultCount;

const Jobs = ({
  children,
  contentRef,
  data,
  queryGetter,
  querySetter,
  searchField,
  searchString,
  selectedRecordId,
  source,
}) => {
  const count = source?.totalCount() ?? 0;
  const query = queryGetter() ?? {};
  const sortOrder = query.sort ?? '';

  const {
    paginationMCLProps,
    paginationSASQProps
  } = usePrevNextPagination({
    count,
    pageSize: RESULT_COUNT_INCREMENT_MEDIUM
  });

  const [storedFilterPaneVisibility] = useLocalStorage(filterPaneVisibilityKey, true);
  const [filterPaneIsVisible, setFilterPaneIsVisible] = useState(storedFilterPaneVisibility);
  const toggleFilterPane = () => {
    setFilterPaneIsVisible(!filterPaneIsVisible);
    writeStorage(filterPaneVisibilityKey, !filterPaneIsVisible);
  };

  const stripes = useStripes();

  const getActionMenu = () => {
    const buttons = [];
    if (stripes.hasPerm('ui-local-kb-admin.jobs.edit')) {
      buttons.push(
        <Button
          key="new-JSON-job-button"
          buttonStyle="dropdownItem"
          id="clickable-new-JSON-job"
          to={`/local-kb-admin/create/JSON${searchString}`}
        >
          <FormattedMessage id="ui-local-kb-admin.job.JSONImportJob" />
        </Button>
      );
      buttons.push(
        <Button
          key="new-KBART-job-button"
          buttonStyle="dropdownItem"
          id="clickable-new-KBART-job"
          to={`/local-kb-admin/create/KBART${searchString}`}
        >
          <FormattedMessage id="ui-local-kb-admin.job.KBARTImportJob" />
        </Button>
      );
    }
    return buttons.length ? buttons : null;
  };

  return (
    <div ref={contentRef} data-test-localkbadmin data-testid="jobs">
      <SearchAndSortQuery
        {...paginationSASQProps}
        initialFilterState={{ status: ['queued', 'in_progress'] }}
        initialSearchState={{ query: '' }}
        initialSortState={{ sort: '-started' }}
        queryGetter={queryGetter}
        querySetter={querySetter}
      >
        {
          ({
            searchValue,
            getSearchHandlers,
            onSubmitSearch,
            onSort,
            getFilterHandlers,
            activeFilters,
            filterChanged,
            searchChanged,
            resetAll,
          }) => {
            const disableReset = () => (!filterChanged && !searchChanged);
            const filterCount = activeFilters.string ? activeFilters.string.split(',').length : 0;
            return (
              <PersistedPaneset
                appId="@folio/local-kb-admin"
                id="local-kb-admin-paneset"
              >
                {filterPaneIsVisible &&
                  <Pane
                    defaultWidth="20%"
                    lastMenu={
                      <PaneMenu>
                        <CollapseFilterPaneButton onClick={toggleFilterPane} />
                      </PaneMenu>
                    }
                    paneTitle={<FormattedMessage id="stripes-smart-components.searchAndFilter" />}
                  >
                    <form onSubmit={onSubmitSearch}>
                      {/* TODO: Use forthcoming <SearchGroup> or similar component */}
                      <div className={css.searchGroupWrap}>
                        <FormattedMessage id="ui-local-kb-admin.searchInputLabel">
                          {([ariaLabel]) => (
                            <SearchField
                              aria-label={ariaLabel}
                              autoFocus
                              className={css.searchField}
                              data-test-local-kb-admin-search-input
                              id="input-local-kb-admin-search"
                              inputRef={searchField}
                              marginBottom0
                              name="query"
                              onChange={getSearchHandlers().query}
                              onClear={() => {
                                getSearchHandlers().clear();
                                // TODO: Add way to trigger search automatically
                                // onSubmitSearch();
                              }}
                              value={searchValue.query}
                            />
                          )}
                        </FormattedMessage>
                        <Button
                          buttonStyle="primary"
                          disabled={!searchValue.query || searchValue.query === ''}
                          fullWidth
                          id="clickable-search-jobs"
                          marginBottom0
                          type="submit"
                        >
                          <FormattedMessage id="stripes-smart-components.search" />
                        </Button>
                      </div>
                      <div className={css.resetButtonWrap}>
                        <Button
                          buttonStyle="none"
                          disabled={disableReset()}
                          id="clickable-reset-all"
                          onClick={resetAll}
                        >
                          <Icon icon="times-circle-solid">
                            <FormattedMessage id="stripes-smart-components.resetAll" />
                          </Icon>
                        </Button>
                      </div>
                      <JobFilters
                        activeFilters={activeFilters.state}
                        data={data}
                        filterHandlers={getFilterHandlers()}
                      />
                    </form>
                  </Pane>}
                <Pane
                  actionMenu={getActionMenu}
                  appIcon={<AppIcon app="local-kb-admin" />}
                  defaultWidth="fill"
                  firstMenu={
                    !filterPaneIsVisible ?
                      (
                        <PaneMenu>
                          <ExpandFilterPaneButton
                            filterCount={filterCount}
                            onClick={toggleFilterPane}
                          />
                        </PaneMenu>
                      )
                      :
                      null
                  }
                  noOverflow
                  padContent={false}
                  paneSub={
                    source?.loaded() ?
                      <FormattedMessage id="stripes-smart-components.searchResultsCountHeader" values={{ count: source.totalCount() }} />
                      :
                      <FormattedMessage id="stripes-smart-components.searchCriteria" />
                  }
                  paneTitle={<FormattedMessage id="ui-local-kb-admin.meta.title" />}
                >
                  <MultiColumnList
                    autosize
                    columnMapping={{
                      jobname: <FormattedMessage id="ui-local-kb-admin.prop.jobName" />,
                      runningStatus: <FormattedMessage id="ui-local-kb-admin.prop.runningStatus" />,
                      result: <FormattedMessage id="ui-local-kb-admin.prop.outcome" />,
                      errors: <FormattedMessage id="ui-local-kb-admin.prop.errors" />,
                      started: <FormattedMessage id="ui-local-kb-admin.prop.started" />,
                      ended: <FormattedMessage id="ui-local-kb-admin.prop.ended" />,
                    }}
                    columnWidths={{
                      ended: 150,
                      errors: 100,
                      jobname: 300,
                      runningStatus: 150,
                      result: 150,
                      started: 150,
                    }}
                    contentData={data.jobs}
                    formatter={{
                      ended: ({ ended }) => (ended ? <FormattedDateTime date={ended} /> : <NoValue />),
                      errors: ({ errorLogCount }) => errorLogCount,
                      jobname: ({ name }) => name,
                      runningStatus: ({ status }) => status && status.label,
                      result: ({ result }) => result && result.label,
                      started: ({ started }) => (started ? <FormattedDateTime date={started} /> : <NoValue />),
                    }}
                    id="list-jobs"
                    isEmptyMessage={
                      source ? (
                        <div data-test-eresources-no-results-message>
                          <SearchAndSortNoResultsMessage
                            filterPaneIsVisible
                            searchTerm={query.query ?? ''}
                            source={source}
                            toggleFilterPane={toggleFilterPane}
                          />
                        </div>
                      ) : '...'
                    }
                    isSelected={({ item }) => item.id === selectedRecordId}
                    onHeaderClick={onSort}
                    {...paginationMCLProps}
                    rowProps={{
                      labelStrings: ({ rowData }) => [rowData.name],
                      to: id => `/local-kb-admin/${id}${searchString}`
                    }}
                    sortDirection={sortOrder.startsWith('-') ? 'descending' : 'ascending'}
                    sortOrder={sortOrder.replace(/^-/, '').replace(/,.*/, '')}
                    totalCount={count}
                    visibleColumns={[
                      'jobname',
                      'runningStatus',
                      'result',
                      'errors',
                      'started',
                      'ended'
                    ]}
                  />
                </Pane>
                {children}
              </PersistedPaneset>
            );
          }
        }
      </SearchAndSortQuery>
    </div>
  );
};

Jobs.propTypes = propTypes;
export default Jobs;
