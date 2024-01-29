import { useState } from 'react';
import PropTypes from 'prop-types';
import ProxyServerLookup from '../ProxyServerLookup/ProxyServerLookup';
import ProxyServerSettingsView from '../ProxyServerSettingsView/ProxyServerSettingsView';

const ProxyServerSettings = ({
  stringTemplates,
  platforms,
  onDelete,
  onSave,
  onSubmit,
  mclProps
}) => {
  const [proxyServerSettings, setProxyServerSettings] = useState();

  return (
    <>
      <ProxyServerLookup
        mclProps={mclProps}
        onSave={onSave}
        onSelectedProxyServer={(_p, pss) => {
          setProxyServerSettings(pss);
        }}
        onSubmit={onSubmit}
        platforms={platforms}
        stringTemplates={stringTemplates}
      />
      {
        proxyServerSettings &&
        <ProxyServerSettingsView
          onClose={() => setProxyServerSettings()}
          onDelete={onDelete}
          onSave={onSave}
          onSubmit={onSubmit}
          platforms={platforms}
          proxyServerSettingsId={proxyServerSettings.id}
          stringTemplates={stringTemplates}
        />
      }

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
};

export default ProxyServerSettings;
