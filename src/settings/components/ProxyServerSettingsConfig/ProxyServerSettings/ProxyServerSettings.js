import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import arrayMutators from 'final-form-arrays';
import { useStripes, useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';
import { Button, Col, Icon, KeyValue, MultiColumnList, NoValue, Pane, PaneHeader, Row, List, ConfirmationModal } from '@folio/stripes/components';

import ProxyServerSettingsForm from '../ProxyServerSettingsForm/ProxyServerSettingsForm';
import ProxyServerSettingsFormModal from '../ProxyServerSettingsFormModal/ProxyServerSettingsFormModal';
import ProxyServerLookup from '../ProxyServerLookup/ProxyServerLookup';
import ProxyServerSettingsView from '../ProxyServerSettingsView/ProxyServerSettingsView';

const EDITING = 'edit';
const CREATING = 'create';
const VIEWING = 'view';

const ProxyServerSettings = ({
  stringTemplates,
  platforms,
  onDelete,
  onSave,
  onCancel,
  onSubmit,
  mclProps,
}) => {
  const stripes = useStripes();
  const perm = stripes.hasPerm('ui-local-kb-admin.proxyServer.manage');
  const count = stringTemplates?.length ?? 0;
  const [mode, setMode] = useState(VIEWING);
  const [proxyServerSettings, setProxyServerSettings] = useState();
  
  const renderSettingsHeader = renderProps => (
    <PaneHeader
      {...renderProps}
      lastMenu={perm ?
        <Button
          buttonStyle="primary"
          data-test-proxy-server-settings-new
          id="clickable-new-proxy-server-settings"
          marginBottom0
          onClick={() => setMode(CREATING)}
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
            ids: <FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.platformsToExclude" />,
          }}
          contentData={stringTemplates}
          onRowClick={(_p, pss) => {
            setProxyServerSettings(pss)
          }}
          visibleColumns={['name', 'rule', 'ids']}
          {...mclProps}
        />
      </Pane>
      {
        proxyServerSettings &&
        <ProxyServerSettingsView
          proxyServerSettingsId={proxyServerSettings.id}
          platforms={platforms}
          onClose={() => setProxyServerSettings()}
          onClick={() => setMode(EDITING)}
          onCancel={onCancel}
          onDelete={onDelete}
          onSave={onSave}
          onSubmit={onSubmit}
        />
      }
      <ProxyServerSettingsFormModal
        initialValues={mode === CREATING ? {} : { ...proxyServerSettings }}
        modalProps={{
          dismissible: true,
          label: mode === CREATING ?
            <FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.newProxyServerSetting" />
            :
            <FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.editProxyServerSetting" />,
          onClose: () => setMode(VIEWING),
          open: (mode === CREATING || mode === EDITING)
        }}
        mutators={{ ...arrayMutators }}
        onCancel={onCancel}
        onDelete={onDelete}
        onSave={onSave}
        onSubmit={onSubmit}
      >
        <ProxyServerSettingsForm
          stringTemplates={stringTemplates}
          platforms={platforms}
        />
      </ProxyServerSettingsFormModal>
    </>
  );
};

ProxyServerSettings.propTypes = {
  initialValues: PropTypes.shape({
    getInitialValues: PropTypes.func.isRequired,
    stringTemplates: PropTypes.arrayOf(PropTypes.object),
  }),
  mclProps: PropTypes.object,
  platforms: PropTypes.arrayOf(PropTypes.object),
  stringTemplates: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default ProxyServerSettings;