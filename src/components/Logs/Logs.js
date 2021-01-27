import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Accordion, Badge } from '@folio/stripes/components';

import JobLogContainer from '../../containers/JobLogContainer';

export default class Logs extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    job: PropTypes.object,
    type: PropTypes.string.isRequired,
  };

  render() {
    const { id, job, type } = this.props;

    return (
      <Accordion
        displayWhenClosed={<Badge>{job[`${type}LogCount`]}</Badge>}
        displayWhenOpen={<Badge>{job[`${type}LogCount`]}</Badge>}
        id={id}
        label={<FormattedMessage id={`ui-local-kb-admin.${type}Log`} />}
      >
        <JobLogContainer
          job={job}
          type={type}
        />
      </Accordion>
    );
  }
}
