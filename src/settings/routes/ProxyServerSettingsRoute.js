import React from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';
import { cloneDeep, isEmpty } from 'lodash';
import ProxyServerSettingsForm from '../components/ProxyServerSettingsConfig/ProxyServerSettingsForm';

class ProxyServerSettingsRoute extends React.Component {
  static propTypes = {
    resources: PropTypes.shape({
      platforms: PropTypes.arrayOf(PropTypes.object),
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
      params: {
        filters: 'context.value=urlproxier',
      },
      throwErrors: false
    },
    platforms: {
      type: 'okapi',
      path: 'erm/platforms',
      clientGeneratePk: false,
      limitParam: 'perPage',
      perRequest: 100,
      throwErrors: false
    },
  });

  getInitialValues = () => {
    const stringTemplates = this.props?.resources?.stringTemplates?.records ?? [];
    const platforms = this.props?.resources?.platforms?.records ?? [];

    return {
      stringTemplates : cloneDeep(stringTemplates).map(stringTemplate => {
        const { idScopes = [] } = stringTemplate;
        return { ...stringTemplate,
          ...{ idScopes: (idScopes.length === 1 && idScopes[0] === '') ? [] : // condition needs to be taken off once the bug in webtoolkit is fixed
            idScopes.map(
              id => {
                const platformName = platforms.find(platform => platform.id === id)?.name;
                return {
                  label: platformName,
                  value: id
                };
              }
            ) } };
      })
    };
  }

  handleDelete = (proxyServer) => {
    return this.props.mutator.stringTemplates.DELETE(proxyServer);
  }

  handleSave = (proxyServer) => {
    const mutator = this.props.mutator.stringTemplates;
    const { idScopes = [] } = proxyServer;
    const idScopeValues = isEmpty(idScopes) ? [''] : idScopes.map(ids => ids.value); // fix logic once backend issue with [''] is fixed in the toolkit
    const proxyServerPayload = { ...proxyServer, ...{ idScopes: idScopeValues }, 'context': 'urlProxier' };

    const promise = proxyServerPayload.id ?
      mutator.PUT(proxyServerPayload) :
      mutator.POST(proxyServerPayload);
    return promise;
  }

  render() {
    if (!this.props.resources.stringTemplates) return <div />;
    const platforms = this.props?.resources?.platforms?.records ?? [];

    return (
      <ProxyServerSettingsForm
        initialValues={this.getInitialValues()}
        onDelete={this.handleDelete}
        onSave={this.handleSave}
        onSubmit={this.handleSave}
        platforms={platforms}
      />
    );
  }
}

export default stripesConnect(ProxyServerSettingsRoute);
