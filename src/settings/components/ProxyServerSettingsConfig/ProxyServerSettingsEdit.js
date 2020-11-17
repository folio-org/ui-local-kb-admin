import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Button, Card, Checkbox, Col, Layout, Row, TextArea, TextField } from '@folio/stripes/components';
import { composeValidators, requiredValidator } from '@folio/stripes-erm-components';
import { MultiSelectionFilter } from '@folio/stripes/smart-components';
import { validateURLIsValid } from '../../../util/validators';

export default class ProxyServerSettingsEdit extends React.Component {
  static propTypes = {
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
  }

  validateUniqueName = (value, allValues) => {
    const { stringTemplates } = allValues;
    const uniqueNameServers = stringTemplates
      .filter(ps => ps.name)
      .filter(ps => ps.name.toLowerCase() === value.toLowerCase());
    if (uniqueNameServers.length > 1) {
      return <FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.nameExists" />;
    }

    return undefined;
  }

  render() {
    const {
      input: { value, name },
      meta,
      onCancel,
      onSave,
    } = this.props;

    return (
      <Card
        data-test-proxy-server-setting-edit
        headerEnd={(
          <span>
            <Button
              data-test-proxy-server-setting-cancel
              marginBottom0
              onClick={onCancel}
            >
              <FormattedMessage id="stripes-core.button.cancel" />
            </Button>
            <Button
              buttonStyle="primary"
              data-test-proxy-server-setting-save
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
              <FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.editProxyServerSetting" />
              :
              <FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.newProxyServerSetting" />}
          </strong>
        )}
      >
        <Row>
          <Field
            component={TextField}
            data-test-proxy-server-setting-name-edit
            disabled={value.readonly}
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.name" />}
            name={`${name}.name`}
            required={!value.readonly}
            validate={composeValidators(
              requiredValidator,
              this.validateUniqueName,
            )}
          />
        </Row>
        <Row>
          <Field
            component={TextArea}
            data-test-proxy-server-setting-url-customization-code
            disabled={value.readonly}
            fullWidth
            label={<FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.urlCustomizationCode" />}
            name={`${name}.rule`}
          />
        </Row>
        <Row>
          <Field
            component={TextArea}
            data-test-proxy-server-setting-platforms-exclude
            disabled={value.readonly}
            fullWidth
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.credentials" />}
            name={`${name}.credentials`}
          />
        </Row>
      </Card>
    );
  }
}
