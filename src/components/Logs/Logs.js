import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Accordion, Badge, Button, Spinner } from '@folio/stripes/components';

import JobLogContainer from '../../containers/JobLogContainer';

const propTypes = {
  id: PropTypes.string,
  job: PropTypes.object,
  logFetch: PropTypes.shape({
    fetchFunction: PropTypes.func.isRequired,
    logExportLoading: PropTypes.object
  }),
  type: PropTypes.string.isRequired,
};

const Logs = ({ id, job, logFetch, type }) => {
  const logCount = job[`${type}LogCount`];

  const renderBadgeAndExport = () => {
    return (
      <>
        <Button
          disabled={logCount < 1}
          onClick={() => logFetch?.fetchFunction(type)}
        >
          <FormattedMessage id="ui-local-kb-admin.job.export" />
          {
            logFetch?.logExportLoading?.[type] &&
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
