import React from 'react';
import PropTypes from 'prop-types';

import { LogsList } from '@folio/stripes-erm-components';
import { resultCount } from '../../constants';

export default class JobLogContainer extends React.Component {
  static manifest = Object.freeze({
    logs: {
      type: 'okapi',
      path: 'erm/jobs/!{job.id}/!{type}Log',
      records: 'results',
      perRequest: resultCount.RESULT_COUNT_INCREMENT,
      resultOffset: '%{resultOffset}',
      limitParam: 'perPage',
      params: {
        stats: 'true',
      },
      throwErrors: false,
    },
    resultOffset: { initialValue: 0 },
    resultCount: { initialValue: resultCount.INITIAL_RESULT_COUNT },
  });

  static defaultProps = {
    job: {},
  }

  static propTypes = {
    job: PropTypes.shape({
      id: PropTypes.string,
    }),
    mutator: PropTypes.shape({
      resultOffset: PropTypes.shape({
        replace: PropTypes.func.isRequired,
      }),
      resultCount: PropTypes.shape({
        replace: PropTypes.func.isRequired,
      }),
    }).isRequired,
    resources: PropTypes.shape({
      logs: PropTypes.object,
      resultCount: PropTypes.number,
    }),
    // eslint-disable-next-line react/no-unused-prop-types
    type: PropTypes.string, // used in `logs` manifest
  };

  getLogRecords = () => {
    const { job, resources } = this.props;
    const jobLogsURL = resources.logs?.url ?? '';

    // If a new job is selected return undefined
    return jobLogsURL.includes(job.id)
      ? resources.logs?.records
      : undefined;
  }

  handleNeedMoreLogs = (_askAmount, index) => {
    const { mutator, resources } = this.props;
    if (index > 0) {
      mutator.resultOffset.replace(index);
    } else {
      mutator.resultCount.replace(resources.resultCount + resultCount.RESULT_COUNT_INCREMENT);
    }
  }

  render() {
    const { job, resources, ...rest } = this.props;

    const records = this.getLogRecords();
    const isPending = resources.logs?.isPending ?? true;

    // We want to send any logs if we've fetched them, and only send an empty array
    // if the fetch is complete. Otherwise send an undefined to indicate that we're loading.
    let logs;
    if (records?.length) logs = records;
    else if (!isPending) logs = [];

    return (
      <LogsList
        job={job}
        logs={logs}
        onNeedMoreLogs={this.handleNeedMoreLogs}
        {...rest}
      />
    );
  }
}
