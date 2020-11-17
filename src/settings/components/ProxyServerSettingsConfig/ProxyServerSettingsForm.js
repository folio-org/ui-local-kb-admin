import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'react-final-form-arrays';
import { Callout, Pane } from '@folio/stripes/components';
import stripesFinalForm from '@folio/stripes/final-form';
import ProxyServerSettingsListFieldArray from './ProxyServerSettingsListFieldArray';

class ProxyServerSettingsForm extends React.Component {
  static propTypes = {
    form: PropTypes.shape({
      mutators: PropTypes.object
    }),
    initialValues: PropTypes.shape({
      stringTemplates: PropTypes.arrayOf(PropTypes.object),
    }),
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  }

  sendCallout = (operation, outcome, error = '') => {
    this.callout.sendCallout({
      type: outcome,
      message: <FormattedMessage id={`ui-local-kb-admin.settings.proxyServerSettings.callout.${operation}.${outcome}`} values={{ error }} />,
      timeout: error ? 0 : undefined, // Don't autohide callouts with a specified error message.
    });
  }

  handleDelete = (...rest) => {
    return this.props.onDelete(...rest)
      .then(() => this.sendCallout('delete', 'success'))
      .catch(response => {
        // Attempt to show an error message if we got JSON back with a message.
        // If json()ification fails, show the generic error callout.
        response.json()
          .then(error => this.sendCallout('delete', 'error', error.message))
          .catch(() => this.sendCallout('delete', 'error'));

        // Return a rejected promise to break any downstream Promise chains.
        return Promise.reject();
      });
  }

  handleSave = (...rest) => {
    return this.props.onSave(...rest)
      .then(() => this.sendCallout('save', 'success'))
      .catch(response => {
        // Attempt to show an error message if we got JSON back with a message.
        // If json()ification fails, show the generic error callout.
        response.json()
          .then(error => this.sendCallout('save', 'error', error.message))
          .catch(() => this.sendCallout('save', 'error'));

        // Return a rejected promise to break any downstream Promise chains.
        return Promise.reject();
      });
  }

  render() {
    const { form: { mutators } } = this.props;

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
            onDelete={this.handleDelete}
            onSave={this.handleSave}
            platforms={this.props.platforms}
          />
        </form>
        <Callout ref={ref => { this.callout = ref; }} />
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
