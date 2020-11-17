import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Settings } from '@folio/stripes/smart-components';

import {
  ExternalDataSourcesSettingsRoute,
  ProxyServerSettingsRoute,
} from './routes';

export default class LocalKbAdminSettings extends React.Component {
  sections = [
    {
      label: <FormattedMessage id="ui-local-kb-admin.settings.general" />,
      pages: [
        {
          component: ExternalDataSourcesSettingsRoute,
          label: <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources" />,
          perm: 'ui-local-kb-admin.kbs.manage',
          route: 'external-data-sources',
        },
        {
          component: ProxyServerSettingsRoute,
          label: <FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings" />,
          route: 'proxy-server-settings',
        }
      ]
    },
  ]

  render() {
    return (
      <Settings
        {...this.props}
        navPaneWidth="20%"
        paneTitle={<FormattedMessage id="ui-local-kb-admin.meta.title" />}
        sections={this.sections}
      />
    );
  }
}
