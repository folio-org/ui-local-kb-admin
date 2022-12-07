import { useCallback, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { generateKiwtQueryParams } from '@k-int/stripes-kint-components';

import { useOkapiKy } from '@folio/stripes/core';
import { Accordion, Badge, Button, Spinner } from '@folio/stripes/components';
import { LogsList, useInfiniteFetch } from '@folio/stripes-erm-components';

import { resultCount } from '../../constants';
import { useExportLogStream } from '../../hooks';

const Logs = ({
  id,
  job,
  type
}) => {
  const ky = useOkapiKy();
  const logCount = job[`${type}LogCount`];

  const LOGS_ENDPOINT = `erm/jobs/${job.id}/${type}Log`;

  const { refetch: fetchLogs, isLoading } = useExportLogStream(job, type);

  // LOGS INFINITE FETCH
  const logQueryParams = useMemo(() => (
    generateKiwtQueryParams(
      {
        perPage: resultCount.RESULT_COUNT_INCREMENT
      },
      {}
    )
  ), []);

  const {
    infiniteQueryObject: {
      fetchNextPage: fetchNextLogsPage,
    },
    results: logs = [],
  } = useInfiniteFetch(
    ['ERM', 'Job', job.id, 'Logs', type, LOGS_ENDPOINT, logQueryParams],
    ({ pageParam = 0 }) => {
      const params = [...logQueryParams, `offset=${pageParam}`];
      return ky.get(`${LOGS_ENDPOINT}?${params?.join('&')}`).json();
    }
  );

  const renderBadgeAndExport = useCallback(() => {
    return (
      <>
        <div data-testid="logs">
          <Button
            disabled={logCount < 1 || isLoading}
            onClick={() => fetchLogs()}
          >
            <FormattedMessage id="ui-local-kb-admin.job.export" />
            {
            isLoading &&
            <Spinner />
          }
          </Button>
          <Badge>
            {logCount}
          </Badge>
        </div>
      </>
    );
  }, [fetchLogs, isLoading, logCount]);

  return (
    <Accordion
      displayWhenClosed={renderBadgeAndExport()}
      displayWhenOpen={renderBadgeAndExport()}
      id={id}
      label={<FormattedMessage id={`ui-erm-comparisons.${type}Log`} />}
    >
      <LogsList
        job={job}
        logs={logs}
        onNeedMoreLogs={(_askAmount, index) => fetchNextLogsPage({ pageParam: index })}
        type={type}
      />
    </Accordion>
  );
};

Logs.propTypes = {
  id: PropTypes.string,
  job: PropTypes.object,
  type: PropTypes.string.isRequired,
};

export default Logs;
