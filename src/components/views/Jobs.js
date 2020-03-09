import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import { noop } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { AppIcon, IfPermission } from '@folio/stripes/core';

import {
  Button,
  Dropdown,
  DropdownMenu,
  Icon,
  MultiColumnList,
  NoValue,
  Pane,
  PaneMenu,
  Paneset,
  SearchField,
} from '@folio/stripes/components';

import {
  SearchAndSortQuery,
  SearchAndSortNoResultsMessage as NoResultsMessage,
  SearchAndSortSearchButton as FilterPaneToggle,
} from '@folio/stripes/smart-components';

import JobFilters from '../JobFilters';
import FormattedDateTime from '../FormattedDateTime';
import css from './Jobs.css';

export default class Jobs extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    contentRef: PropTypes.object,
    data: PropTypes.object,
    onNeedMoreData: PropTypes.func,
    queryGetter: PropTypes.func,
    querySetter: PropTypes.func,
    searchString: PropTypes.string,
    selectedRecordId: PropTypes.string,
    source: PropTypes.object,
  }

  static defaultProps = {
    data: {},
    searchString: '',
  }

  state = {
    filterPaneIsVisible: true
  }

  columnMapping = {
    jobname: <FormattedMessage id="ui-local-kb-admin.prop.jobName" />,
    runningStatus: <FormattedMessage id="ui-local-kb-admin.prop.runningStatus" />,
    result: <FormattedMessage id="ui-local-kb-admin.prop.outcome" />,
    errors: <FormattedMessage id="ui-local-kb-admin.prop.errors" />,
    started: <FormattedMessage id="ui-local-kb-admin.prop.started" />,
    ended: <FormattedMessage id="ui-local-kb-admin.prop.ended" />,
  }

  columnWidths = {
    ended: 150,
    errors: 100,
    jobname: 300,
    runningStatus: 150,
    result: 150,
    started: 150,
  }

  formatter = {
    ended: ({ ended }) => (ended ? <FormattedDateTime date={ended} /> : <NoValue />),
    errors: ({ errorLogCount }) => errorLogCount,
    jobname: ({ name }) => name,
    runningStatus: ({ status }) => status && status.label,
    result: ({ result }) => result && result.label,
    started: ({ started }) => (started ? <FormattedDateTime date={started} /> : <NoValue />),
  }

  rowFormatter = (row) => {
    const { rowClass, rowData, rowIndex, rowProps = {}, cells } = row;

    return (
      <Link
        key={`row-${rowIndex}`}
        aria-rowindex={rowIndex + 2}
        className={rowClass}
        data-label={rowData.name}
        role="row"
        to={this.rowURL(rowData.id)}
        {...rowProps}
      >
        {cells}
      </Link>
    );
  }

  rowURL = (id) => {
    return `/local-kb-admin/${id}${this.props.searchString}`;
  }

  toggleFilterPane = () => {
    this.setState(curState => ({
      filterPaneIsVisible: !curState.filterPaneIsVisible,
    }));
  }

  renderIsEmptyMessage = (query, source) => {
    if (!source) {
      return 'no source yet';
    }

    return (
      <div data-test-jobs-no-results-message>
        <NoResultsMessage
          filterPaneIsVisible
          searchTerm={query.query || ''}
          source={source}
          toggleFilterPane={noop}
        />
      </div>
    );
  }

  renderResultsFirstMenu = (filters) => {
    const { filterPaneIsVisible } = this.state;
    const filterCount = filters.string !== '' ? filters.string.split(',').length : 0;
    const hideOrShowMessageId = filterPaneIsVisible ?
      'stripes-smart-components.hideSearchPane' : 'stripes-smart-components.showSearchPane';

    return (
      <PaneMenu>
        <FormattedMessage id="stripes-smart-components.numberOfFilters" values={{ count: filterCount }}>
          {appliedFiltersMessage => (
            <FormattedMessage id={hideOrShowMessageId}>
              {hideOrShowMessage => (
                <FilterPaneToggle
                  aria-label={`${hideOrShowMessage}...${appliedFiltersMessage}`}
                  badge={!filterPaneIsVisible && filterCount ? filterCount : undefined}
                  onClick={this.toggleFilterPane}
                  visible={filterPaneIsVisible}
                />
              )}
            </FormattedMessage>
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  }

  renderNewJobMenu = ({ onToggle }) => (
    <DropdownMenu
      data-role="menu"
      onToggle={onToggle}
    >
      <FormattedMessage id="ui-local-kb-admin.job.newJob">
        {() => (
          <>
            <Button
              buttonStyle="dropdownItem"
              id="clickable-new-JSON-job"
              marginBottom0
              to={`/local-kb-admin/create/JSON${this.props.searchString}`}
            >
              <FormattedMessage id="ui-local-kb-admin.job.JSONImportJob" />
            </Button>
            <Button
              buttonStyle="dropdownItem"
              id="clickable-new-KBART-job"
              marginBottom0
              to={`/local-kb-admin/create/KBART${this.props.searchString}`}
            >
              <FormattedMessage id="ui-local-kb-admin.job.KBARTImportJob" />
            </Button>
          </>
        )}
      </FormattedMessage>
    </DropdownMenu>
  );

  renderResultsLastMenu() {
    return (
      <IfPermission perm="ui-local-kb-admin.jobs.edit">
        <Dropdown
          buttonProps={{ buttonStyle: 'primary' }}
          label={<FormattedMessage id="ui-local-kb-admin.job.new" />}
          renderMenu={this.renderNewJobMenu}
        />
      </IfPermission>
    );
  }

  renderResultsPaneSubtitle = (source) => {
    if (source && source.loaded()) {
      const count = source ? source.totalCount() : 0;
      return <FormattedMessage id="stripes-smart-components.searchResultsCountHeader" values={{ count }} />;
    }

    return <FormattedMessage id="stripes-smart-components.searchCriteria" />;
  }

  render() {
    const {
      children,
      contentRef,
      data,
      onNeedMoreData,
      queryGetter,
      querySetter,
      selectedRecordId,
      source,
    } = this.props;

    const query = queryGetter() || {};
    const count = source ? source.totalCount() : 0;
    const sortOrder = query.sort || '';
    const visibleColumns = ['jobname', 'runningStatus', 'result', 'errors', 'started', 'ended'];

    return (
      <div ref={contentRef} data-test-localkbadmin>
        <SearchAndSortQuery
          initialFilterState={{ status: ['Queued', 'In progress'] }}
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

              return (
                <Paneset id="local-kb-admin-paneset">
                  {this.state.filterPaneIsVisible &&
                    <Pane
                      defaultWidth="20%"
                      onClose={this.toggleFilterPane}
                      paneTitle={<FormattedMessage id="stripes-smart-components.searchAndFilter" />}
                    >
                      <form onSubmit={onSubmitSearch}>
                        {/* TODO: Use forthcoming <SearchGroup> or similar component */}
                        <div className={css.searchGroupWrap}>
                          <FormattedMessage id="ui-local-kb-admin.searchInputLabel">
                            {ariaLabel => (
                              <SearchField
                                aria-label={ariaLabel}
                                autoFocus
                                className={css.searchField}
                                data-test-local-kb-admin-search-input
                                id="input-local-kb-admin-search"
                                inputRef={this.searchField}
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
                    </Pane> }
                  <Pane
                    appIcon={<AppIcon app="local-kb-admin" />}
                    defaultWidth="fill"
                    firstMenu={this.renderResultsFirstMenu(activeFilters)}
                    lastMenu={this.renderResultsLastMenu()}
                    padContent={false}
                    paneSub={this.renderResultsPaneSubtitle(source)}
                    paneTitle={<FormattedMessage id="ui-local-kb-admin.meta.title" />}
                  >
                    <MultiColumnList
                      autosize
                      columnMapping={this.columnMapping}
                      columnWidths={this.columnWidths}
                      contentData={data.jobs}
                      formatter={this.formatter}
                      id="list-jobs"
                      isEmptyMessage={this.renderIsEmptyMessage(query, source)}
                      isSelected={({ item }) => item.id === selectedRecordId}
                      onHeaderClick={onSort}
                      onNeedMoreData={onNeedMoreData}
                      rowFormatter={this.rowFormatter}
                      sortDirection={sortOrder.startsWith('-') ? 'descending' : 'ascending'}
                      sortOrder={sortOrder.replace(/^-/, '').replace(/,.*/, '')}
                      totalCount={count}
                      virtualize
                      visibleColumns={visibleColumns}
                    />
                  </Pane>
                  {children}
                </Paneset>
              );
            }
          }
        </SearchAndSortQuery>
      </div>
    );
  }
}
