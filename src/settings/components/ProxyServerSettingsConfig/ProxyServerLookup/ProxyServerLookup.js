import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import { Button, MultiColumnList, Pane, PaneHeader } from '@folio/stripes/components';
import { FormModal } from '@k-int/stripes-kint-components';

import ProxyServerSettingsForm from '../ProxyServerSettingsForm/ProxyServerSettingsForm';

const ProxyServerLookup = ({
  onSelectedProxyServer,
  onSubmit,
  platforms,
  stringTemplates,
}) => {
  const stripes = useStripes();
  const perm = stripes.hasPerm('ui-local-kb-admin.proxyServer.manage');
  const count = stringTemplates?.length ?? 0;
  const [createPS, setCreatePS] = useState(false);
  const renderSettingsHeader = renderProps => (
    <PaneHeader
      {...renderProps}
      lastMenu={perm ?
        <Button
          buttonStyle="primary"
          data-test-proxy-server-settings-new
          id="clickable-new-proxy-server-settings"
          marginBottom0
          onClick={() => setCreatePS(true)}
        >
          <FormattedMessage id="ui-local-kb-admin.job.new" />
        </Button> : null
      }
      paneSub={<FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.count" values={{ count }} />}
      paneTitle={<FormattedMessage id="ui-local-kb-admin.section.proxyServerSettings" />}
    />
  );

  return (
    <>
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
            idScopes: <FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.platformsToExclude" />,
          }}
          contentData={stringTemplates}
          formatter={{
            idScopes: data => data?.idScopes?.map(ids => ids.label)?.join(', ')
          }}
          onRowClick={onSelectedProxyServer}
          visibleColumns={['name', 'rule', 'idScopes']}
        />
      </Pane>
      <FormModal
        initialValues={{}}
        modalProps={{
          dismissible: true,
          label: <FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.newProxyServerSetting" />,
          onClose: () => setCreatePS(false),
          open: (createPS)
        }}
        onSubmit={(values, form) => {
          onSubmit(values);
          // necessary because in FormModal the field state is not reset
          // https://gitlab.com/knowledge-integration/folio/stripes-kint-components/-/issues/35
          form.reset(); // Reset the form fields after submit
          setCreatePS(false);
        }}
      >
        <ProxyServerSettingsForm
          platforms={platforms}
          stringTemplates={stringTemplates}
        />
      </FormModal>
    </>
  );
};

ProxyServerLookup.propTypes = {
  onSelectedProxyServer: PropTypes.func,
  stringTemplates: PropTypes.arrayOf(PropTypes.object),
  platforms: PropTypes.arrayOf(PropTypes.object),
  onSubmit: PropTypes.func.isRequired,
};

export default ProxyServerLookup;
