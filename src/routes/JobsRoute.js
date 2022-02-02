import React from 'react';
import PropTypes from 'prop-types';
import { getSASParams } from '@folio/stripes-erm-components';
import { StripesConnectedSource } from '@folio/stripes/smart-components';
import { stripesConnect } from '@folio/stripes/core';
import View from '../components/views/Jobs';

const INITIAL_RESULT_COUNT = 100;
const RESULT_COUNT_INCREMENT = 100;

class JobsRoute extends React.Component {
  static manifest = Object.freeze({
    jobs: {
      type: 'okapi',
      recordsRequired: '%{resultCount}',
      records: 'results',
      perRequest: RESULT_COUNT_INCREMENT,
      limitParam: 'perPage',
      path: 'erm/jobs',
      params: getSASParams({
        searchKey: 'name',
        filterConfig: [{
          name: 'class',
          values: [
            { name: 'Package harvester', value: 'org.olf.general.jobs.PackageIngestJob' },
            { name: 'Title harvester', value: 'org.olf.general.jobs.TitleIngestJob' },
            { name: 'File import', value: 'org.olf.general.jobs.PackageImportJob' },
            { name: 'Identifier reassignment', value: 'org.olf.general.jobs.IdentifierReassignmentJob' },
            { name: 'Naive match key assignment', value: 'org.olf.general.jobs.NaiveMatchKeyAssignmentJob' }
          ],
        }],
        filterKeys: {
          status: 'status.value',
          result: 'result.value'
        },
      })
    },
    resultValues: {
      type: 'okapi',
      path: 'erm/refdata/persistentJob/result',
      shouldRefresh: () => false,
    },
    statusValues: {
      type: 'okapi',
      path: 'erm/refdata/persistentJob/status',
      shouldRefresh: () => false,
    },
    query: { initialValue: {} },
    resultCount: { initialValue: INITIAL_RESULT_COUNT },
  });

  static propTypes = {
    children: PropTypes.node,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
    mutator: PropTypes.object,
    resources: PropTypes.object,
    stripes: PropTypes.shape({
      logger: PropTypes.object,
    }),
  }

  constructor(props) {
    super(props);

    this.logger = props.stripes.logger;
    this.searchField = React.createRef();
  }

  componentDidMount() {
    this.source = new StripesConnectedSource(this.props, this.logger, 'jobs');

    if (this.searchField.current) {
      this.searchField.current.focus();
    }
  }

  componentDidUpdate(prevProps) {
    const newCount = this.source.totalCount();
    const newRecords = this.source.records();

    if (newCount === 1) {
      const { history, location } = this.props;

      const prevSource = new StripesConnectedSource(prevProps, this.logger, 'jobs');
      const oldCount = prevSource.totalCount();
      const oldRecords = prevSource.records();

      if (oldCount !== 1 || (oldCount === 1 && oldRecords[0].id !== newRecords[0].id)) {
        const record = newRecords[0];
        history.push(`/local-kb-admin/${record.id}${location.search}`);
      }
    }
  }

  querySetter = ({ nsValues, state }) => {
    const defaults = {
      filters: null,
      query: null,
      sort: null,
    };

    if (/reset/.test(state.changeType)) {
      this.props.mutator.query.update({ ...defaults, ...nsValues });
    } else {
      this.props.mutator.query.update(nsValues);
    }
  }

  queryGetter = () => {
    return this.props?.resources?.query ?? {};
  }

  render() {
    const { children, location, match, resources } = this.props;
    if (this.source) {
      this.source.update(this.props, 'jobs');
    }

    return (
      <View
        data={{
          jobs: resources?.jobs?.records ?? [],
          resultValues: resources?.resultValues?.records ?? [],
          statusValues: resources?.statusValues?.records ?? [],
        }}
        queryGetter={this.queryGetter}
        querySetter={this.querySetter}
        searchString={location.search}
        selectedRecordId={match.params.id}
        source={this.source}
      >
        {children}
      </View>
    );
  }
}

export default stripesConnect(JobsRoute);
