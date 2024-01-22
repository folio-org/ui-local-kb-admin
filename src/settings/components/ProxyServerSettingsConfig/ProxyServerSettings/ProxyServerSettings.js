import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import arrayMutators from 'final-form-arrays';

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
  const [mode, setMode] = useState(VIEWING);
  const [proxyServerSettings, setProxyServerSettings] = useState();

  return (
    <>
      <ProxyServerLookup
        mclProps={mclProps}
        onCreateClick={() => setMode(CREATING)}
        onSelectedProxyServer={(_p, pss) => {
          setProxyServerSettings(pss);
        }}
        stringTemplates={stringTemplates}
      />
      {
        proxyServerSettings &&
        <ProxyServerSettingsView
          onCancel={onCancel}
          onClick={() => setMode(EDITING)}
          onClose={() => setProxyServerSettings()}
          onDelete={onDelete}
          onSave={onSave}
          onSubmit={onSubmit}
          platforms={platforms}
          proxyServerSettingsId={proxyServerSettings.id}
        />
      }
      <ProxyServerSettingsFormModal
        initialValues={mode === CREATING ? {} : { ...proxyServerSettings }}
        modalProps={{
          dismissible: true,
          label: <FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.newProxyServerSetting" />,
          onClose: () => setMode(VIEWING),
          open: (mode === CREATING)
        }}
        mutators={{ ...arrayMutators }}
        onCancel={onCancel}
        onDelete={onDelete}
        onSave={onSave}
        onSubmit={onSubmit}
      >
        <ProxyServerSettingsForm
          platforms={platforms}
          stringTemplates={stringTemplates}
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
