import React from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';

import ProxyServerSettingsForm from '../components/ProxyServerSettingsConfig/ProxyServerSettingsForm';

class ProxyServerSettingsRoute extends React.Component {
  static propTypes = {
    resources: PropTypes.shape({
      stringTemplates: PropTypes.object,
    }),
    mutator: PropTypes.shape({
      stringTemplates: PropTypes.shape({
        DELETE: PropTypes.func.isRequired,
        POST: PropTypes.func.isRequired,
        PUT: PropTypes.func.isRequired,
      }),
    }),
  };

  static manifest = Object.freeze({
    stringTemplates: {
      type: 'okapi',
      path: 'erm/sts',
      clientGeneratePk: false,
      throwErrors: false
    },
    platforms: {
      type: 'okapi',
      path: 'erm/platforms',
      clientGeneratePk: false,
      throwErrors: false
    },
  });

  handleDelete = (proxyServer) => {
    return this.props.mutator.stringTemplates.DELETE(proxyServer);
  }

  handleSave = (proxyServer) => {
    const mutator = this.props.mutator.stringTemplates;

    const promise = proxyServer.id ?
      mutator.PUT(proxyServer, { pk: proxyServer.id }) :
      mutator.POST(proxyServer);
    return promise;
  }

  render() {
    if (!this.props.resources.stringTemplates) return <div />;
    const stringTemplates = this.props?.resources?.stringTemplates?.records ?? [];
    const platforms = this.props?.resources?.platforms?.records ?? [];
    return (
      <ProxyServerSettingsForm
        initialValues={{ stringTemplates }}
        onDelete={this.handleDelete}
        onSave={this.handleSave}
        onSubmit={this.handleSave}
        platforms={platforms}
      />
    );
  }
}

export default stripesConnect(ProxyServerSettingsRoute);
