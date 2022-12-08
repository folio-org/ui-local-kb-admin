import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { FormattedMessage } from 'react-intl';

import { generateKiwtQueryParams } from '@k-int/stripes-kint-components';

import { useCallout, useOkapiKy } from '@folio/stripes/core';
import View from '../components/views/JobForm';
import { JSON_IMPORT_ENDPOINT, KBART_IMPORT_ENDPOINT, KBS_ENDPOINT } from '../constants/endpoints';

const JobCreateRoute = ({
  history,
  location,
  match: { params: { format } },
}) => {
  const callout = useCallout();
  const ky = useOkapiKy();
  const queryClient = useQueryClient();

  const handleClose = () => {
    history.push(`/local-kb-admin${location.search}`);
  };

  const importPath = useMemo(() => (
    format === 'KBART' ? KBART_IMPORT_ENDPOINT : JSON_IMPORT_ENDPOINT
  ), [format]);

  const { mutateAsync: postJob } = useMutation(
    ['ERM', 'Jobs', 'POST', importPath],
    (payload) => ky.post(importPath, { json: { ...payload } }).json()
      .then(({
        id: jobId,
        class: jobClass,
        name
      }) => {
        /* Invalidate cached queries */
        queryClient.invalidateQueries(['ERM', 'Jobs']);

        history.push(`/local-kb-admin/${jobId}${location.search}`);
        callout.sendCallout({ message: <FormattedMessage id={`ui-local-kb-admin.job.created.success.${jobClass}`} values={{ name }} /> });
      })
  );

  // LOAL-KB QUERY PARAMS
  const localKBParams = useMemo(() => (
    generateKiwtQueryParams(
      {
        filters: [
          {
            path: 'name',
            value: 'LOCAL'
          }
        ]
      },
      {}
    )
  ), []);

  const { data: { results: { 0: localKB = {} } = [] } = {} } = useQuery(
    ['ERM', 'KBs', localKBParams],
    () => ky.get(`${KBS_ENDPOINT}?${localKBParams?.join('&')}`).json()
  );

  const handleSubmit = (job) => {
    return postJob(job);
  };

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
};

export default JobCreateRoute;
