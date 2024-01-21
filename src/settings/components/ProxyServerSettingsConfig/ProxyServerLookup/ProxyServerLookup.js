import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { MultiColumnList } from '@folio/stripes/components';

const ProxyServerLookup = ({
  onSelectedProxyServer,
  stringTemplates
}) => {
  return (
    <MultiColumnList
      columnMapping={{
        name: <FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.name" />,
        rule: <FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.urlCustomizationCode" />,
        ids: <FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.platformsToExclude" />,
      }}
      contentData={stringTemplates}
      onRowClick={onSelectedProxyServer}
      visibleColumns={['name', 'rule', 'ids']}
    />
  );
};

ProxyServerLookup.propTypes = {
  onSelectedProxyServer: PropTypes.func,
  stringTemplates: PropTypes.arrayOf(PropTypes.object)
};

export default ProxyServerLookup;
