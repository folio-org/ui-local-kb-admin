import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { FormattedMessage } from 'react-intl';
import { NoValue } from '@folio/stripes/components';

dayjs.extend(utc);

const useDisplayMetaInfo = (value = {}) => {
  const syncStatus = useMemo(() => {
    return (
      <div>
        <FormattedMessage id="ui-local-kb-admin.metaSection.syncStatus" />
        :
        &nbsp;
        {value.syncStatus ?? <NoValue />}
      </div>
    );
  }, [value.syncStatus]);


  const cursor = useMemo(() => {
    return (
      <div>
        <FormattedMessage id="ui-local-kb-admin.metaSection.cursor" />
        :
        &nbsp;
        {value.cursor ?? <NoValue />}
      </div>
    );
  }, [value.cursor]);

  const lastChecked = useMemo(() => {
    return (
      <div>
        <FormattedMessage id="ui-local-kb-admin.metaSection.lastChecked" />
        :
        &nbsp;
        {value.lastCheck ? dayjs.utc(value.lastCheck).format() : <NoValue />}
      </div>
    );
  }, [value.lastCheck]);

  return { syncStatus, cursor, lastChecked };
};

export default useDisplayMetaInfo;
