import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Accordion, Badge, Button, Spinner } from '@folio/stripes/components';

import JobLogContainer from '../../containers/JobLogContainer';

const propTypes = {
  id: PropTypes.string,
  job: PropTypes.object,
  logExportLoading: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    isLoading: PropTypes.bool
  }),
  onExportLogs: PropTypes.func,
  type: PropTypes.string.isRequired,
};

const Logs = ({ id, job, logExportLoading, onExportLogs, type }) => {
  const logCount = job[`${type}LogCount`];

  const logsAreLoading = () => (
    logExportLoading?.id === job.id &&
    logExportLoading?.type === type &&
    logExportLoading.isLoading
  );

  const renderBadgeAndExport = () => {
    return (
      <>
        <Button
          disabled={logCount < 1}
          onClick={() => onExportLogs(job, type)}
        >
          <FormattedMessage id="ui-local-kb-admin.job.export" />
          {
            logsAreLoading() &&
            <Spinner />
          }
        </Button>
        <Badge>
          {logCount}
        </Badge>
      </>
    );
  };

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
