import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button, Card, Col, KeyValue, Layout, NoValue, Row } from '@folio/stripes/components';

export default class ProxyServerSettingsView extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.shape({
        activationEnabled: PropTypes.bool,
        active: PropTypes.bool,
        credentials: PropTypes.string,
        fullPrefix: PropTypes.string,
        id: PropTypes.string,
        listPrefix: PropTypes.string,
        name: PropTypes.string,
        principal: PropTypes.string,
        readonly: PropTypes.bool,
        rectype: PropTypes.number,
        supportsHarvesting: PropTypes.bool,
        trustedSourceTI: PropTypes.bool,
        type: PropTypes.string,
        rule: PropTypes.string,
      }).isRequired,
    }).isRequired,
    meta: PropTypes.shape({
      invalid: PropTypes.bool,
      pristine: PropTypes.bool,
      submitting: PropTypes.bool,
    }),
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
  }

  render() {
    const {
      input: { value },
      onDelete,
      onEdit
    } = this.props;

    return (
      <Card
        data-test-external-data-source-view
        headerEnd={(
          <span>
            {value.readonly ? undefined :
            <Button
              buttonStyle="danger"
              data-test-external-data-source-delete
              marginBottom0
              onClick={onDelete}
            >
              <FormattedMessage id="stripes-core.button.delete" />
            </Button>}
            <Button
              data-test-external-data-source-edit
              marginBottom0
              onClick={onEdit}
            >
              <FormattedMessage id="stripes-core.button.edit" />
            </Button>
          </span>
        )}
        headerStart={<strong><FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.proxyServerSetting" /></strong>}
      >
        <Row>
          <Col xs={12}>
            <KeyValue
              data-test-proxy-server-setting-name
              label={<FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.name" />}
              value={value.name}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <KeyValue
              data-test-proxy-server-setting-url
              label={<FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.urlCustomizationCode" />}
              value={value?.rule ?? <NoValue />}
            />
          </Col>
        </Row>
      </Card>
    );
  }
}
