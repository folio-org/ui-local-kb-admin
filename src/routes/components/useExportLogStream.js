import React from 'react';
import { useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';

import downloadBlob from '../../util/downloadBlob';

const useExportLogStream = (job, type) => {
  const ky = useOkapiKy();
  const { refetch, isLoading } = useQuery(
    ['ui-local-kb-admin', 'Logs', 'fetchLogStream', job.id],
    () => ky(
      `erm/jobs/${job.id}/${type}LogStream`
    ).blob()
      .then(downloadBlob(job.name)),
    {
      // Ensure this doesn't run until the user clicks the button
      enabled: false
    }
  );

  return { refetch, isLoading };
};

export default useExportLogStream;
