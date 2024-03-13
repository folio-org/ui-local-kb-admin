import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Field, useFormState } from 'react-final-form';
import { Checkbox, Col, Row, Select, TextArea, TextField } from '@folio/stripes/components';
import { composeValidators, requiredValidator, validateURL } from '@folio/stripes-erm-components';


const ExternalDataSourcesFormEdit = () => {
  const intl = useIntl();
  const { values } = useFormState();
  return (
    <>
      <Row>
        <Col xs={4}>
          <Field
            component={TextField}
            data-test-external-data-source-name-edit
            disabled={values.readonly}
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.name" />}
            name="name"
            required={!values.readonly}
            validate={composeValidators(
              requiredValidator
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
            disabled={values.readonly}
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.type" />}
            name="type"
            required={!values.readonly}
            validate={v => (values.readonly ? undefined : requiredValidator(v))}
          />
        </Col>
        <Col xs={4}>
          <Field
            component={Select}
            data-test-external-data-source-record-type-edit
            dataOptions={[
              { value: '1', label: intl.formatMessage({ id: 'ui-local-kb-admin.settings.externalDataSources.package' }) },
              { value: '2', label: intl.formatMessage({ id: 'ui-local-kb-admin.settings.externalDataSources.title' }) }
            ]}
            disabled={values.readonly}
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.recordType" />}
            name="rectype"
            required={!values.readonly}
            validate={requiredValidator}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <Field
            component={TextField}
            data-test-external-data-source-uri
            disabled={values.readonly}
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.uri" />}
            name="uri"
            required={!values.readonly}
            validate={v => {
              if (!values.readonly) {
                return (v?.length) ? validateURL(v) : requiredValidator(v);
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
            name="trustedSourceTI"
            type="checkbox"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <Field
            component={Checkbox}
            data-test-external-data-source-is-active-edit
            disabled={values.readonly}
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.isActive" />}
            name="active"
            type="checkbox"
          />
        </Col>
        <Col xs={4}>
          <Field
            component={Checkbox}
            data-test-external-data-source-supports-harvesting-edit
            disabled={values.readonly}
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.supportsHarvesting" />}
            name="supportsHarvesting"
            type="checkbox"
          />
        </Col>
        <Col xs={4}>
          <Field
            component={Checkbox}
            data-test-external-data-source-activation-enabled-edit
            disabled={values.readonly}
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.activationEnabled" />}
            name="activationEnabled"
            type="checkbox"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <Field
            component={TextField}
            data-test-external-data-source-list-prefix-edit
            disabled={values.readonly}
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.listPrefix" />}
            name="listPrefix"
          />
        </Col>
        <Col xs={4}>
          <Field
            component={TextField}
            data-test-external-data-source-full-prefix-edit
            disabled={values.readonly}
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.fullPrefix" />}
            name="fullPrefix"
          />
        </Col>
        <Col xs={4}>
          <Field
            component={TextField}
            data-test-external-data-source-principal-edit
            disabled={values.readonly}
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.principal" />}
            name="principal"
          />
        </Col>
      </Row>
      <Field
        component={TextArea}
        data-test-external-data-source-credentials-edit
        disabled={values.readonly}
        label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.credentials" />}
        name="credentials"
      />
    </>
  );
};

export default ExternalDataSourcesFormEdit;