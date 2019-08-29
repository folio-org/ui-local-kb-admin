import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Card, Checkbox, Col, Layout, Row, Select, TextArea, TextField } from '@folio/stripes/components';
import { required } from '../../../util/validators';

export default class ExternalDataSourcesEdit extends React.Component {
  static propTypes = {
    actionButtons: PropTypes.func,
    input: PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.shape({
        id: PropTypes.string,
      }).isRequired,
    }).isRequired,
    meta: PropTypes.shape({
      invalid: PropTypes.bool,
      pristine: PropTypes.bool,
      submitting: PropTypes.bool,
    })
  }

  render() {
    const { actionButtons, input: { value, name } } = this.props;
    return (
      <Card
        data-test-external-data-source-edit
        headerStart={(
          <strong>
            {value.id ?
              <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.editExternalKb" />
              :
              <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.newExternalKb" />}
          </strong>
        )}
        headerEnd={actionButtons}
      >
        <Row>
          <Col xs={4}>
            <Field
              component={TextField}
              data-test-external-data-source-name-edit
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.name" />}
              name={`${name}.name`}
              required
              validate={required}
            />
          </Col>
          <Col xs={4}>
            <Field
              component={Select}
              data-test-external-data-source-type-edit
              dataOptions={[
                { value: 'org.olf.kb.adapters.EbscoKBAdapter', label: 'org.olf.kb.adapters.EbscoKBAdapter' }
              ]}
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.type" />}
              name={`${name}.type`}
              required
              validate={required}
            />
          </Col>
          <Col xs={4}>
            <Field
              component={Select}
              data-test-external-data-source-record-type-edit
              dataOptions={
                [{ value: '1', label: 'Package' }]
              }
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.recordType" />}
              name={`${name}.rectype`}
              required
              validate={required}
            />
          </Col>
        </Row>
        <Field
          component={TextField}
          label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.uri" />}
          name={`${name}.uri`}
        />
        <Layout className="padding-bottom-gutter">
          <Row>
            <Col xs={4}>
              <Field
                component={Checkbox}
                data-test-external-data-source-is-active-edit
                label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.isActive" />}
                name={`${name}.active`}
                type="checkbox"
              />
            </Col>
            <Col xs={4}>
              <Field
                component={Checkbox}
                data-test-external-data-source-supports-harvesting-edit
                label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.supportsHarvesting" />}
                name={`${name}.supportsHarvesting`}
                type="checkbox"
              />
            </Col>
            <Col xs={4}>
              <Field
                component={Checkbox}
                data-test-external-data-source-activation-enabled-edit
                label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.activationEnabled" />}
                name={`${name}.activationEnabled`}
                type="checkbox"
              />
            </Col>
          </Row>
        </Layout>
        <Row>
          <Col xs={4}>
            <Field
              component={TextField}
              data-test-external-data-source-list-prefix-edit
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.listPrefix" />}
              name={`${name}.listPrefix`}
            />
          </Col>
          <Col xs={4}>
            <Field
              component={TextField}
              data-test-external-data-source-full-prefix-edit
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.fullPrefix" />}
              name={`${name}.fullPrefix`}
            />
          </Col>
          <Col xs={4}>
            <Field
              component={TextField}
              data-test-external-data-source-principal-edit
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.principal" />}
              name={`${name}.principal`}
            />
          </Col>
        </Row>
        <Field
          component={TextArea}
          data-test-external-data-source-credentials-edit
          label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.credentials" />}
          name={`${name}.credentials`}
        />
      </Card>
    );
  }
}
