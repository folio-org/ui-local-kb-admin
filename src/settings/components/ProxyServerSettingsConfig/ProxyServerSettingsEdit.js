import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import {
  Button,
  Card,
  InfoPopover,
  Layout,
  Row,
  TextArea,
  TextField,
  MultiSelection
} from '@folio/stripes/components';
import { composeValidators, requiredValidator } from '@folio/stripes-erm-components';
import css from './ProxyServerSettingsEdit.css';

export default class ProxyServerSettingsEdit extends React.Component {
  static propTypes = {
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
    }),
    platforms: PropTypes.arrayOf(PropTypes.object),
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
            label={
              <>
                <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.name" />
                <InfoPopover
                  content={<FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.name.info" />}
                  contentClass={css.infoPopoverContent}
                />
              </>
            }
            name={`${name}.name`}
            required
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
            fullWidth
            label={
              <>
                <FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.urlCustomizationCode" />
                <InfoPopover
                  allowAnchorClick
                  buttonHref="https://wiki.folio.org/display/FOLIOtips/Proxy+server+configuration+and+URL+customizations"
                  buttonLabel={<FormattedMessage id="ui-local-kb-admin.settings.urlCustomizationCode.learnMore" />}
                  content={<FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.urlCustomizationCode.info" />}
                  contentClass={css.infoPopoverContent}
                  hideOnButtonClick
                />
              </>
          }
            name={`${name}.rule`}
            required
            validate={requiredValidator}
          />
        </Row>
        <Row>
          <Layout className="display-flex flex-direction-column padding-bottom-gutter">
            <FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.urlCustomizationCode.variables" tagName="div" />
            <FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.urlCustomizationCode.helpers" tagName="div" />
          </Layout>
        </Row>
        <Row>
          <Field
            component={MultiSelection}
            data-test-proxy-server-setting-platforms-exclude
            dataOptions={this.props.platforms.map(platform => {
              return {
                label: platform.name,
                value: platform.id
              };
            })}
            label={
              <>
                <FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.platformsToExclude" />
                <InfoPopover
                  content={<FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.platformsToExclude.info" />}
                  contentClass={css.infoPopoverContent}
                />
              </>
            }
            name={`${name}.idScopes`}
            renderToOverlay
          />
        </Row>
      </Card>
    );
  }
}
