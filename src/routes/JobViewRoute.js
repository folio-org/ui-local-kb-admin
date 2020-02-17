import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { stripesConnect } from '@folio/stripes/core';
import { FormattedMessage } from 'react-intl';
import SafeHTMLMessage from '@folio/react-intl-safe-html';
import { Callout, ConfirmationModal } from '@folio/stripes/components';
import showToast from './components/showToast';
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

    this.callout = React.createRef();
    this.state = { showConfirmDelete: false };
  }

  componentDidUpdate(prevProps) {
    const prevCreatedJobId = get(prevProps, 'location.state.createdJobId', '');
    const currentCreatedJobId = get(this.props, 'location.state.createdJobId', '');
    if (prevCreatedJobId !== currentCreatedJobId) {
      const name = get(this.props, 'location.state.createdJobName', '');
      if (name !== '') this.callout.current.sendCallout(showToast('ui-local-kb-admin.job.create.success', get(this.props, 'location.state.createdJobClass', ''), 'success', { name }));
    }
  }


  handleDelete = () => {
    const { resources } = this.props;
    const job = get(resources, 'job.records[0]', {});
    const name = get(job, 'name', '');
    const id = get(job, 'id', '');
    const jobClass = get(job, 'class', '');
    this.props.mutator.job
      .DELETE(job)
      .then(() => this.props.history.replace(
        {
          pathname: '/local-kb-admin',
          search: `${this.props.location.search}`,
          state: { deletedJobId: id, deletedJobName: name, deletedJobClass: jobClass }
        }
      )); // push deleted job id name and class to location state so that it could be used to show the callout in jobsRoute
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
    const jobClass = get(job, 'class', '');

    let deleteMessageId = 'ui-local-kb-admin.job.delete.message';
    let deleteHeadingId = 'ui-local-kb-admin.job.delete.heading';

    if (jobClass !== '') {
      deleteMessageId = deleteMessageId.concat(`.${jobClass}`);
      deleteHeadingId = deleteHeadingId.concat(`.${jobClass}`);
    }

    return (
      <>
        <JobInfo
          data={{
            job
          }}
          onClose={this.handleClose}
          onDelete={this.showDeleteConfirmationModal}
          isLoading={get(resources, 'job.isPending', true)}
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
        <Callout ref={this.callout} />
      </>
    );
  }
}

export default stripesConnect(JobViewRoute);
