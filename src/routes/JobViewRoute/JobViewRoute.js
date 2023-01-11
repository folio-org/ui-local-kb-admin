import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { useMutation, useQuery, useQueryClient } from 'react-query';

import { useCallout, useOkapiKy } from '@folio/stripes/core';
import { ConfirmationModal } from '@folio/stripes/components';

import JobInfo from '../../components/views/JobInfo';
import { JOB_ENDPOINT } from '../../constants';

const JobViewRoute = ({
  history,
  location,
  match: { params: { id: jobId } = {} } = {},
}) => {
  const ky = useOkapiKy();
  const queryClient = useQueryClient();
  const callout = useCallout();

  const jobPath = JOB_ENDPOINT(jobId);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const { data: job, isLoading: isJobLoading } = useQuery(
    ['ERM', 'Job', jobId, jobPath],
    () => ky.get(jobPath).json()
  );

  const name = job?.name ?? '';
  const jobClass = job?.class ?? '';

  const handleClose = () => {
    history.push(`/local-kb-admin${location.search}`);
  };

  const showDeleteConfirmationModal = () => setShowConfirmDelete(true);
  const hideDeleteConfirmationModal = () => setShowConfirmDelete(false);

  const { mutateAsync: deleteJob } = useMutation(
    ['ERM', 'Job', jobId, jobPath, 'delete'],
    () => ky.delete(jobPath).then(() => {
      queryClient.invalidateQueries(['ERM', 'Jobs']);
      callout.sendCallout({
        message: <FormattedMessage
          id={`ui-local-kb-admin.job.deleted.success.${jobClass}`}
          values={{ name }}
        />
      });

      hideDeleteConfirmationModal();
      handleClose();
    })
  );

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
          job,
        }}
        isLoading={isJobLoading ?? true}
        onClose={handleClose}
        onDelete={showDeleteConfirmationModal}
      />
      {showConfirmDelete && (
        <ConfirmationModal
          buttonStyle="danger"
          confirmLabel={<FormattedMessage id="ui-local-kb-admin.job.delete.confirmLabel" />}
          heading={<FormattedMessage id={deleteHeadingId} />}
          id="delete-job-confirmation"
          message={<FormattedMessage id={deleteMessageId} values={{ name }} />}
          onCancel={hideDeleteConfirmationModal}
          onConfirm={deleteJob}
          open
        />
      )}
    </>
  );
};

JobViewRoute.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
  logExportLoading: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    isLoading: PropTypes.bool
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  }).isRequired,
};

export default JobViewRoute;
