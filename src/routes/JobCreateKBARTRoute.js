import React from 'react';
import compose from 'compose-function';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';
import withFileHandlers from './components/withFileHandlers';
import View from '../components/views/JobForm';

class JobCreateKBARTRoute extends React.Component {
  static manifest = Object.freeze({
    jobs: {
      type: 'okapi',
      path: 'erm/jobs/kbartImport',
      fetch: false,
      shouldRefresh: () => false,
    },
  });

  static propTypes = {
    handlers: PropTypes.object,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
      replace: PropTypes.func,
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
    mutator: PropTypes.shape({
      jobs: PropTypes.shape({
        POST: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  };

  static defaultProps = {
    handlers: {},
  }

  handleClose = () => {
    const { location } = this.props;
    this.props.history.push(`/local-kb-admin${location.search}`);
  }

  handleSubmit = (job) => {
    const { history, location, mutator } = this.props;
    let jobName = '';
    let jobId = '';
    let jobClass = '';

    mutator.jobs
      .POST(job)
      .then(response => {
        jobName = get(response, 'name', '');
        jobId = get(response, 'id', '');
        jobClass = get(response, 'class', '');
        history.push(`/local-kb-admin/${jobId}${location.search}`);
      })
      .then(() => history.replace(
        {
          state: { createdJobId: jobId, createdJobName: jobName, createdJobClass: jobClass }
        }
      ));
  }

  render() {
    const { handlers } = this.props;

    return (
      <View
        handlers={{
          ...handlers,
          onClose: this.handleClose
        }}
        onSubmit={this.handleSubmit}
        format="KBART"
      />
    );
  }
}

export default compose(
  withFileHandlers,
  stripesConnect
)(JobCreateKBARTRoute);
