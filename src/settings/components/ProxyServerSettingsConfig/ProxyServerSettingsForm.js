import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'react-final-form-arrays';
import { Pane } from '@folio/stripes/components';
import stripesFinalForm from '@folio/stripes/final-form';
import ProxyServerSettingsListFieldArray from './ProxyServerSettingsListFieldArray';

class ProxyServerSettingsForm extends React.Component {
  static propTypes = {
    form: PropTypes.shape({
      mutators: PropTypes.object,
      reset: PropTypes.func.isRequired
    }),
    initialValues: PropTypes.shape({
      stringTemplates: PropTypes.arrayOf(PropTypes.object),
    }),
    platforms: PropTypes.arrayOf(PropTypes.object),
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  }

  handleSave = (submitValues) => {
    /* Whether the save goes through or not, the form has to reset */
    return this.props.onSave(submitValues).then(() => {
      this.props.form.reset();
    })
      .catch(() => {
        this.props.form.reset();
      });
  }

  render() {
    const { form: { mutators }, onDelete } = this.props;

    const count = this.props?.initialValues?.stringTemplates?.length ?? 0;
    return (
      <Pane
        data-test-proxy-server-settings
        defaultWidth="fill"
        id="settings-proxy-server"
        paneSub={<FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.count" values={{ count }} />}
        paneTitle={<FormattedMessage id="ui-local-kb-admin.section.proxyServerSettings" />}
      >
        <form>
          <FieldArray
            component={ProxyServerSettingsListFieldArray}
            mutators={mutators}
            name="stringTemplates"
            onDelete={onDelete}
            onSave={this.handleSave}
            platforms={this.props.platforms}
          />
        </form>
      </Pane>
    );
  }
}
export default stripesFinalForm({
  enableReinitialize: true,
  keepDirtyOnReinitialize: false,
  mutators: {
    setProxyServerSettingValue: (args, state, tools) => {
      tools.changeValue(state, args[0], () => args[1]);
    },
  },
  navigationCheck: true,
})(ProxyServerSettingsForm);
