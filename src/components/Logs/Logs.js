import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Accordion, Badge } from '@folio/stripes/components';

import JobLogContainer from '../../containers/JobLogContainer';

export default class Logs extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    job: PropTypes.object,
    onToggle: PropTypes.func,
    open: PropTypes.bool,
    type: PropTypes.string.isRequired,
  };

  render() {
    const { id, job, onToggle, open, type } = this.props;

    return (
      <Accordion
        displayWhenClosed={<Badge>{job[`${type}LogCount`]}</Badge>}
        displayWhenOpen={<Badge>{job[`${type}LogCount`]}</Badge>}
        id={id}
        label={<FormattedMessage id={`ui-local-kb-admin.${type}Log`} />}
        onToggle={onToggle}
        open={open}
      >
        { open ?
          <JobLogContainer
            job={job}
            type={type}
          />
          :
          <div />
        }
      </Accordion>
    );
  }
}
