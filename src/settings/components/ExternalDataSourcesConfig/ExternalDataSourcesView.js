import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button, Card, Col, KeyValue, Layout, NoValue, Row } from '@folio/stripes/components';

export default class ExternalDataSourcesView extends React.Component {
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
        uri: PropTypes.string,
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
        headerStart={<strong><FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.externalDataSource" /></strong>}
      >
        <Row>
          <Col xs={3}>
            <KeyValue
              data-test-external-data-source-name
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.name" />}
              value={value.name}
            />
          </Col>
          <Col xs={5}>
            <KeyValue
              data-test-external-data-source-type
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.type" />}
              value={value.type}
            />
          </Col>
          <Col xs={4}>
            <KeyValue
              data-test-external-data-source-recordtype
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.recordType" />}
              value={value.rectype === 1 ? <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.package" /> : ''}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <KeyValue
              data-test-external-data-source-uri
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.uri" />}
              value={value?.uri ?? <NoValue />}
            />
          </Col>
          <Col xs={4}>
            <KeyValue
              data-test-external-data-source-trusted-source-ti
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.trustedSourceTI" />}
              value={<FormattedMessage id={value.trustedSourceTI ? 'ui-local-kb-admin.yes' : 'ui-local-kb-admin.no'} />}
            />
          </Col>
        </Row>
        <Layout className="padding-bottom-gutter">
          <Row>
            <Col xs={3}>
              <KeyValue
                data-test-external-data-source-isactive
                label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.isActive" />}
                value={<FormattedMessage id={value.active ? 'ui-local-kb-admin.yes' : 'ui-local-kb-admin.no'} />}
              />
            </Col>
            <Col xs={5}>
              <KeyValue
                data-test-external-data-source-supportsharvesting
                label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.supportsHarvesting" />}
                value={<FormattedMessage id={value.supportsHarvesting ? 'ui-local-kb-admin.yes' : 'ui-local-kb-admin.no'} />}
              />
            </Col>
            <Col xs={4}>
              <KeyValue
                data-test-external-data-source-activationenabled
                label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.activationEnabled" />}
                value={<FormattedMessage id={value.activationEnabled ? 'ui-local-kb-admin.yes' : 'ui-local-kb-admin.no'} />}
              />
            </Col>
          </Row>
        </Layout>
        <Row>
          <Col xs={3}>
            <KeyValue
              data-test-external-data-source-listprefix
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.listPrefix" />}
              value={value?.listPrefix ?? <NoValue />}
            />
          </Col>
          <Col xs={5}>
            <KeyValue
              data-test-external-data-source-fullprefix
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.fullPrefix" />}
              value={value?.fullPrefix ?? <NoValue />}
            />
          </Col>
          <Col xs={4}>
            <KeyValue
              data-test-external-data-source-principal
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.principal" />}
              value={value?.principal ?? <NoValue />}
            />
          </Col>
        </Row>
        <KeyValue
          data-test-external-data-source-credentials
          label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.credentials" />}
          value={value?.credentials ?? <NoValue />}
        />
      </Card>
    );
  }
}
