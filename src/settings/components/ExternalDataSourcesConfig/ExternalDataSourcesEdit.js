import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { Field } from 'react-final-form';
import { Button, Card, Checkbox, Col, Layout, Row, Select, TextArea, TextField } from '@folio/stripes/components';
import { composeValidators, requiredValidator } from '@folio/stripes-erm-components';
import { validateURLIsValid } from '../../../util/validators';

const ExternalDataSourcesEdit = ({
  input: { value, name },
  meta,
  onCancel,
  onSave,
}) => {
  const intl = useIntl();

  const validateUniqueName = (v, allValues) => {
    const { externalKbs } = allValues;
    const uniqueNameSources = externalKbs
      .filter(ekb => ekb.name)
      .filter(ekb => ekb.name.toLowerCase() === v.toLowerCase());
    if (uniqueNameSources.length > 1) {
      return <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.nameExists" />;
    }

    return undefined;
  };

  return (
    <Card
      data-test-external-data-source-edit
      headerEnd={(
        <span>
          <Button
            data-test-external-data-source-cancel
            marginBottom0
            onClick={onCancel}
          >
            <FormattedMessage id="stripes-core.button.cancel" />
          </Button>
          <Button
            buttonStyle="primary"
            data-test-external-data-source-save
            disabled={meta.invalid || meta.pristine || meta.submitting}
            marginBottom0
            onClick={onSave}
          >
            <FormattedMessage id="stripes-core.button.save" />
          </Button>
        </span>
      )}
      headerStart={(
        <strong>
          {value.id ?
            <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.editExternalDataSource" />
            :
            <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.newExternalDataSource" />}
        </strong>
      )}
    >
      <Row>
        <Col xs={4}>
          <Field
            component={TextField}
            data-test-external-data-source-name-edit
            disabled={value.readonly}
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.name" />}
            name={`${name}.name`}
            required={!value.readonly}
            validate={composeValidators(
              requiredValidator,
              validateUniqueName,
            )}
          />
        </Col>
        <Col xs={4}>
          <Field
            component={Select}
            data-test-external-data-source-type-edit
            dataOptions={[
              { value: 'org.olf.kb.adapters.GOKbOAIAdapter', label: 'org.olf.kb.adapters.GOKbOAIAdapter' }
            ]}
            disabled={value.readonly}
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.type" />}
            name={`${name}.type`}
            required={!value.readonly}
            validate={v => (value.readonly ? undefined : requiredValidator(v))}
          />
        </Col>
        <Col xs={4}>
          <Field
            component={Select}
            data-test-external-data-source-record-type-edit
            dataOptions={
              [
                { value: '1', label: intl.formatMessage({ id: 'ui-local-kb-admin.settings.externalDataSources.package' }) },
                { value: '2', label: intl.formatMessage({ id: 'ui-local-kb-admin.settings.externalDataSources.title' }) }
              ]
            }
            disabled={value.readonly}
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.recordType" />}
            name={`${name}.rectype`}
            required={!value.readonly}
            validate={requiredValidator}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <Field
            component={TextField}
            data-test-external-data-source-uri
            disabled={value.readonly}
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.uri" />}
            name={`${name}.uri`}
            required={!value.readonly}
            validate={v => {
              if (!value.readonly) {
                return (v && v.length) ? validateURLIsValid(v) : requiredValidator(v);
              }
              return undefined;
            }}
          />
        </Col>
        <Col xs={4}>
          <Field
            component={Checkbox}
            data-test-external-data-source-trusted-source-ti-edit
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.trustedSourceTI" />}
            name={`${name}.trustedSourceTI`}
            type="checkbox"
          />
        </Col>
      </Row>
      <Layout className="padding-bottom-gutter">
        <Row>
          <Col xs={4}>
            <Field
              component={Checkbox}
              data-test-external-data-source-is-active-edit
              disabled={value.readonly}
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.isActive" />}
              name={`${name}.active`}
              type="checkbox"
            />
          </Col>
          <Col xs={4}>
            <Field
              component={Checkbox}
              data-test-external-data-source-supports-harvesting-edit
              disabled={value.readonly}
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.supportsHarvesting" />}
              name={`${name}.supportsHarvesting`}
              type="checkbox"
            />
          </Col>
          <Col xs={4}>
            <Field
              component={Checkbox}
              data-test-external-data-source-activation-enabled-edit
              disabled={value.readonly}
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
            disabled={value.readonly}
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.listPrefix" />}
            name={`${name}.listPrefix`}
          />
        </Col>
        <Col xs={4}>
          <Field
            component={TextField}
            data-test-external-data-source-full-prefix-edit
            disabled={value.readonly}
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.fullPrefix" />}
            name={`${name}.fullPrefix`}
          />
        </Col>
        <Col xs={4}>
          <Field
            component={TextField}
            data-test-external-data-source-principal-edit
            disabled={value.readonly}
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.principal" />}
            name={`${name}.principal`}
          />
        </Col>
      </Row>
      <Field
        component={TextArea}
        data-test-external-data-source-credentials-edit
        disabled={value.readonly}
        label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.credentials" />}
        name={`${name}.credentials`}
      />
    </Card>
  );
}

ExternalDataSourcesEdit.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.shape({
      id: PropTypes.string,
      readonly: PropTypes.bool,
    }).isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
  }),
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ExternalDataSourcesEdit;
