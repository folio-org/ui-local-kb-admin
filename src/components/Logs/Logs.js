import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Accordion, Badge, Button, Spinner } from '@folio/stripes/components';

import JobLogContainer from '../../containers/JobLogContainer';
import { useExportLogStream } from '../../hooks';

const propTypes = {
  id: PropTypes.string,
  job: PropTypes.object,
  type: PropTypes.string.isRequired,
};

const Logs = ({ id, job, type }) => {
  const logCount = job[`${type}LogCount`];

  const { refetch: fetchLogs, isLoading } = useExportLogStream(job, type);

  const renderBadgeAndExport = useCallback(() => {
    return (
      <>
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
      </>
    );
  }, [fetchLogs, isLoading, logCount]);

  return (
    <Accordion
      displayWhenClosed={renderBadgeAndExport()}
      displayWhenOpen={renderBadgeAndExport()}
      id={id}
      label={<FormattedMessage id={`ui-local-kb-admin.${type}Log`} />}
    >
      <JobLogContainer
        job={job}
        type={type}
      />
    </Accordion>
  );
};

Logs.propTypes = propTypes;
export default Logs;
