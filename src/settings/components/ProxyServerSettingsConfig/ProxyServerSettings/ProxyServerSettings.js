import { useState } from 'react';
import PropTypes from 'prop-types';
import ProxyServerLookup from '../ProxyServerLookup/ProxyServerLookup';
import ProxyServerSettingsView from '../ProxyServerSettingsView/ProxyServerSettingsView';

const ProxyServerSettings = ({
  stringTemplates,
  platforms,
  onDelete,
  onSubmit,
}) => {
  const [proxyServer, setProxyServer] = useState();
  const handleClose = () => setProxyServer();
  
  console.log('proxyServerSettings %o', proxyServer);
  return (
    <>
      <ProxyServerLookup
        onClose={handleClose}
        onSelectedProxyServer={(_p, pss) => {
          setProxyServer(pss.id);
        }}
        onSubmit={onSubmit}
        platforms={platforms}
        stringTemplates={stringTemplates}
        // stringTemplates={initialValues.stringTemplates}
      />
      {
        proxyServer &&
        <ProxyServerSettingsView
          onClose={handleClose}
          onDelete={onDelete}
          onSubmit={onSubmit}
          platforms={platforms}
          proxyServerId={proxyServer}
          stringTemplates={stringTemplates}
        />
      }
    </>
  );
};

ProxyServerSettings.propTypes = {
  platforms: PropTypes.arrayOf(PropTypes.object),
  stringTemplates: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ProxyServerSettings;
