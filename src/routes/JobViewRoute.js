import React from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';
import { FormattedMessage } from 'react-intl';
import SafeHTMLMessage from '@folio/react-intl-safe-html';
import { ConfirmationModal } from '@folio/stripes/components';
import JobInfo from '../components/views/JobInfo';

class JobViewRoute extends React.Component {
  static manifest = Object.freeze({
    job: {
      type: 'okapi',
      path: 'erm/jobs/:{id}',
      shouldRefresh: () => false,
    },
  });

  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
    }).isRequired,
    mutator: PropTypes.shape({
      job: PropTypes.object,
    }).isRequired,
    resources: PropTypes.shape({
      job: PropTypes.object,
    }).isRequired,
    stripes: PropTypes.shape({
      okapi: PropTypes.object.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { showConfirmDelete: false };
  }

  handleDelete = () => {
    const { resources } = this.props;
    const job = resources?.job?.records?.[0] ?? {};
    const name = job?.name ?? '';
    const jobClass = job?.class ?? '';
    const id = job?.id ?? '';
    this.props.mutator.job
      .DELETE(job)
      .then(() => this.props.history.replace(
        {
          pathname: '/local-kb-admin',
          search: `${this.props.location.search}`,
          state: { deletedJobId: id, deletedJobName: name, deletedJobClass: jobClass }
        }
      ));
  };

  handleClose = () => {
    this.props.history.push(`/local-kb-admin${this.props.location.search}`);
  };

  showDeleteConfirmationModal = () => this.setState({ showConfirmDelete: true });

  hideDeleteConfirmationModal = () => this.setState({ showConfirmDelete: false });

  render() {
    const { resources } = this.props;
    const job = resources?.job?.records?.[0] ?? {};
    const name = job?.name ?? '';
    const jobClass = job?.class ?? '';

    let deleteMessageId = 'ui-local-kb-admin.job.delete.message';
    let deleteHeadingId = 'ui-local-kb-admin.job.delete.heading';

    if (jobClass !== '') {
      deleteMessageId = `${deleteMessageId}.${jobClass}`;
      deleteHeadingId = `${deleteHeadingId}.${jobClass}`;
    }

    return (
      <>
        <JobInfo
          data={{
            job
          }}
          onClose={this.handleClose}
          onDelete={this.showDeleteConfirmationModal}
          isLoading={resources?.job?.isPending ?? true}
        />
        {this.state.showConfirmDelete && (
          <ConfirmationModal
            id="delete-job-confirmation"
            confirmLabel={<FormattedMessage id="ui-local-kb-admin.job.delete.confirmLabel" />}
            heading={<FormattedMessage id={deleteHeadingId} />}
            message={<SafeHTMLMessage id={deleteMessageId} values={{ name }} />}
            onCancel={this.hideDeleteConfirmationModal}
            onConfirm={this.handleDelete}
            buttonStyle="danger"
            open
          />
        )}
      </>
    );
  }
}

export default stripesConnect(JobViewRoute);
