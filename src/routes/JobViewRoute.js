import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { stripesConnect } from '@folio/stripes/core';
import { FormattedMessage } from 'react-intl';
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
    mutator: PropTypes.func.isRequired,
    resources: PropTypes.shape({
      job: PropTypes.object,
    }).isRequired,
    stripes: PropTypes.shape({
      okapi: PropTypes.object.isRequired,
    }).isRequired,
  };

  state = { showConfirmDelete: false };

  handleDelete = () => {
    const { resources } = this.props;
    const job = get(resources, 'job.records[0]', {});
    const name = get(job, 'name', '');
    const id = get(job, 'id', '');

    this.props.mutator.job
      .DELETE(job)
      .then(() => this.props.history.replace(
        {
          pathname: '/local-kb-admin',
          search: `${this.props.location.search}`,
          state: { deletedJobId: id, deletedJobName: name }
        }
      )); // push deleted job id and name to location state so that it could be used to show the callout in jobsRoute
  };

  handleClose = () => {
    this.props.history.push(`/local-kb-admin${this.props.location.search}`);
  };

  showDeleteConfirmationModal = () => this.setState({ showConfirmDelete: true });

  hideDeleteConfirmationModal = () => this.setState({ showConfirmDelete: false });

  render() {
    const { resources } = this.props;
    const job = get(resources, 'job.records[0]', {});
    const name = get(job, 'name', '');

    return (
      <React.Fragment>
        <JobInfo
          data={{
            job: get(resources, 'job.records[0]', {}),
          }}
          onClose={this.handleClose}
          onDelete={this.showDeleteConfirmationModal}
          isLoading={get(resources, 'job.isPending', true)}
        />
        {this.state.showConfirmDelete && (
          <ConfirmationModal
            id="delete-job-confirmation"
            confirmLabel={<FormattedMessage id="ui-local-kb-admin.job.delete.confirmLabel" />}
            heading={<FormattedMessage id="ui-local-kb-admin.job.delete.heading" values={{ name }} />}
            message={<FormattedMessage id="ui-local-kb-admin.job.delete.message" />}
            onCancel={this.hideDeleteConfirmationModal}
            onConfirm={this.handleDelete}
            open
          />
        )}
      </React.Fragment>
    );
  }
}

export default stripesConnect(JobViewRoute);
