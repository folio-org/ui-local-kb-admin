import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { MultiColumnList } from '@folio/stripes/components';

const ExternalDataSourcesLookup = ({
  onSelectedExternalDataSource,
  externalKbs,
  mclProps
}) => {
  return (
    <MultiColumnList
      columnMapping={{
        name: <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.name" />,
        type: <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.type" />,
        uri: <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.uri" />,
        active: <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.isActive" />,
        trustedSourceTI: <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.trustedSourceTI" />,
        syncStatus: <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.syncStatus" />,
        cursor: <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.cursor" />,
        lastCheck: <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.lastChecked" />,
      }}
      contentData={externalKbs}
      formatter={{
        active: data => { return <FormattedMessage id={data.active ? 'ui-local-kb-admin.yes' : 'ui-local-kb-admin.no'} />; },
        trustedSourceTI: data => { return <FormattedMessage id={data.trustedSourceTI ? 'ui-local-kb-admin.yes' : 'ui-local-kb-admin.no'} />; },
      }}
      onRowClick={onSelectedExternalDataSource}
      visibleColumns={['name', 'type', 'uri', 'active', 'trustedSourceTI', 'syncStatus', 'cursor', 'lastCheck']}
      {...mclProps}
    />
  );
};

ExternalDataSourcesLookup.propTypes = {
  onSelectedExternalDataSource: PropTypes.func,
  externalKbs: PropTypes.arrayOf(PropTypes.object),
  mclProps: PropTypes.object,
};

export default ExternalDataSourcesLookup;
