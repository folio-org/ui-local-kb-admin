import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { stripesConnect, useCallout } from '@folio/stripes/core';
import View from '../components/views/JobForm';

const JobCreateRoute = ({
  history,
  location,
  match: { params: { format } },
  mutator,
  resources
}) => {
  const callout = useCallout();

  const handleClose = () => {
    history.push(`/local-kb-admin${location.search}`);
  };

  const handleSubmit = (job) => {
    return mutator.jobs
      .POST(job)
      .then(response => {
        const jobId = response?.id ?? '';
        const jobClass = response?.class ?? '';
        const name = response?.name ?? '';

        history.push(`/local-kb-admin/${jobId}${location.search}`);
        callout.sendCallout({ message: <FormattedMessage id={`ui-local-kb-admin.job.created.success.${jobClass}`} values={{ name }} /> });
      });
  };

  const localKB = resources.localKB?.records?.[0] || {};
  return (
    <View
      format={format}
      handlers={{
        onClose: handleClose
      }}
      localKB={localKB}
      onSubmit={handleSubmit}
    />
  );
};

JobCreateRoute.propTypes = {
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
  resources: PropTypes.shape({
    localKB: PropTypes.shape({
      records: PropTypes.arrayOf(PropTypes.shape({
        trustedSourceTI: PropTypes.bool,
      })),
    })
  })
};

JobCreateRoute.manifest = Object.freeze({
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

export default stripesConnect(JobCreateRoute);
