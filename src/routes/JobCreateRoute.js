import React from 'react';
import compose from 'compose-function';
import PropTypes from 'prop-types';

import SafeHTMLMessage from '@folio/react-intl-safe-html';
import { CalloutContext, stripesConnect } from '@folio/stripes/core';
import withFileHandlers from './components/withFileHandlers';
import View from '../components/views/JobForm';

class JobCreateRoute extends React.Component {
  static manifest = Object.freeze({
    jobs: {
      type: 'okapi',
      path: (_q, params) => {
        const format = params?.format;
        let endpointPath;
        if (format === 'KBART') {
          endpointPath = 'erm/jobs/kbartImport';
        } else {
          endpointPath = 'erm/jobs/packageImport';
        }
        return endpointPath;
      },
      fetch: false,
      shouldRefresh: () => false,
    },
    localKB: {
      type: 'okapi',
      path: 'erm/kbs?filters=name%3DLOCAL',
      clientGeneratePk: false,
      throwErrors: false
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
    match: PropTypes.shape({
      params: PropTypes.shape({
        format: PropTypes.string,
      }),
    }),
    mutator: PropTypes.shape({
      jobs: PropTypes.shape({
        POST: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  };

  static contextType = CalloutContext;

  static defaultProps = {
    handlers: {},
  }

  handleClose = () => {
    const { location } = this.props;
    this.props.history.push(`/local-kb-admin${location.search}`);
  }

  handleSubmit = (job) => {
    const { history, location, mutator } = this.props;

    return mutator.jobs
      .POST(job)
      .then(response => {
        const jobId = response?.id ?? '';
        const jobClass = response?.class ?? '';
        const name = response?.name ?? '';

        history.push(`/local-kb-admin/${jobId}${location.search}`);
        this.context.sendCallout({ message: <SafeHTMLMessage id={`ui-local-kb-admin.job.created.success.${jobClass}`} values={{ name }} /> });
      });
  }

  render() {
    const { handlers, match: { params: { format } } } = this.props;
    const localKB = this.props?.resources?.localKB?.records[0] || {};
    return (
      <View
        format={format}
        handlers={{
          ...handlers,
          onClose: this.handleClose
        }}
        localKB={localKB}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default compose(
  withFileHandlers,
  stripesConnect
)(JobCreateRoute);
