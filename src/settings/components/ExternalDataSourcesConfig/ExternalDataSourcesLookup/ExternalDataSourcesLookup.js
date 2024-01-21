import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { MultiColumnList, Pane, PaneHeader, Button } from '@folio/stripes/components';
import { useStripes } from '@folio/stripes/core';

const ExternalDataSourcesLookup = ({
  onSelectedExternalDataSource,
  externalKbs,
  mclProps,
  onCreateClick
}) => {
  const stripes = useStripes();
  const perm = stripes.hasPerm('ui-local-kb-admin.kbs.manage');
  const count = externalKbs?.length ?? 0;

  const renderSettingsHeader = renderProps => (
    <PaneHeader
      {...renderProps}
      lastMenu={perm ?
        <Button
          buttonStyle="primary"
          data-test-external-data-source-new
          id="clickable-new-external-datasource"
          marginBottom0
          onClick={onCreateClick}
        >
          <FormattedMessage id="ui-local-kb-admin.job.new" />
        </Button> : null
      }
      paneSub={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.sourceCount" values={{ count }} />}
      paneTitle={<FormattedMessage id="ui-local-kb-admin.section.externalDataSources" />}
    />
  );

  return (
    <Pane
      data-test-external-data-sources
      defaultWidth="fill"
      id="settings-external-data-sources"
      renderHeader={renderSettingsHeader}
    >
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
    </Pane>
  );
};

ExternalDataSourcesLookup.propTypes = {
  onSelectedExternalDataSource: PropTypes.func,
  externalKbs: PropTypes.arrayOf(PropTypes.object),
  mclProps: PropTypes.object,
  onCreateClick: PropTypes.func.isRequired
};

export default ExternalDataSourcesLookup;
