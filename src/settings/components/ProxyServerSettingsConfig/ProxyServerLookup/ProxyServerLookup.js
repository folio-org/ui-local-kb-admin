import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import { Button, MultiColumnList, Pane, PaneHeader } from '@folio/stripes/components';

const ProxyServerLookup = ({
  onSelectedProxyServer,
  stringTemplates,
  mclProps,
  onCreateClick
}) => {
  const stripes = useStripes();
  const perm = stripes.hasPerm('ui-local-kb-admin.proxyServer.manage');
  const count = stringTemplates?.length ?? 0;
  const renderSettingsHeader = renderProps => (
    <PaneHeader
      {...renderProps}
      lastMenu={perm ?
        <Button
          buttonStyle="primary"
          data-test-proxy-server-settings-new
          id="clickable-new-proxy-server-settings"
          marginBottom0
          onClick={onCreateClick}
        >
          <FormattedMessage id="ui-local-kb-admin.job.new" />
        </Button> : null
      }
      paneSub={<FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.count" values={{ count }} />}
      paneTitle={<FormattedMessage id="ui-local-kb-admin.section.proxyServerSettings" />}
    />
  );

  return (
    <Pane
      data-test-proxy-server-settings
      defaultWidth="fill"
      id="settings-proxy-server-settings"
      renderHeader={renderSettingsHeader}
    >
      <MultiColumnList
        columnMapping={{
          name: <FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.name" />,
          rule: <FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.urlCustomizationCode" />,
          ids: <FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.platformsToExclude" />,
        }}
        contentData={stringTemplates}
        onRowClick={onSelectedProxyServer}
        visibleColumns={['name', 'rule', 'ids']}
        {...mclProps}
      />
    </Pane>
  );
};

ProxyServerLookup.propTypes = {
  onSelectedProxyServer: PropTypes.func,
  onCreateClick: PropTypes.func.isRequired,
  stringTemplates: PropTypes.arrayOf(PropTypes.object),
  mclProps: PropTypes.object,
};

export default ProxyServerLookup;
