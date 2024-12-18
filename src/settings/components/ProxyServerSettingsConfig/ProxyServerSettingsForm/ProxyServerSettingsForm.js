import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field, useFormState } from 'react-final-form';
import {
  InfoPopover,
  Layout,
  Row,
  TextArea,
  TextField,
  MultiSelection
} from '@folio/stripes/components';
import { composeValidators, requiredValidator } from '@folio/stripes-erm-components';
import css from './ProxyServerSettingsForm.css';

const ProxyServerSettingsForm = ({ platforms, stringTemplates }) => {
  const { values } = useFormState();

  const validateUniqueName = (val, _allVal, meta) => {
    // ONLY RUN VALIDATION WHEN FIELD IS DIRTY
    if (meta.dirty) {
      const uniqueNameServers = stringTemplates
        .filter(ekb => ekb.name)
        .filter(ekb => ekb.name.toLowerCase() === val.toLowerCase());
      if (uniqueNameServers?.length > 0) {
        return <FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.nameExists" />;
      }
    }

    return undefined;
  };

  return (
    <>
      <Row>
        <Field
          component={TextField}
          data-test-proxy-server-setting-name-edit
          disabled={values.readonly}
          label={
            <>
              <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.name" />
              <InfoPopover
                content={<FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.name.info" />}
                contentClass={css.infoPopoverContent}
              />
            </>
          }
          name="name"
          required={!values.readonly}
          validate={composeValidators(
            requiredValidator,
            validateUniqueName,
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
          name="rule"
          required
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
          dataOptions={platforms?.map(platform => {
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
          name="idScopes"
          usePortal
        />
      </Row>
    </>
  );
};

ProxyServerSettingsForm.propTypes = {
  platforms: PropTypes.arrayOf(PropTypes.object),
  stringTemplates: PropTypes.arrayOf(PropTypes.object),
};

export default ProxyServerSettingsForm;
