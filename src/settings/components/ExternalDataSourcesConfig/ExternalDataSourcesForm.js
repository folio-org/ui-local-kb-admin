import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'react-final-form-arrays';
import { Callout, Pane } from '@folio/stripes/components';
import stripesFinalForm from '@folio/stripes/final-form';
import ExternalDataSourcesListFieldArray from './ExternalDataSourcesListFieldArray';

class ExternalDataSourcesForm extends React.Component {
  static propTypes = {
    form: PropTypes.shape({
      mutators: PropTypes.object
    }),
    initialValues: PropTypes.shape({
      externalKbs: PropTypes.arrayOf(PropTypes.object),
    }),
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  }

  sendCallout = (operation, outcome, error = '') => {
    this.callout.sendCallout({
      type: outcome,
      message: <FormattedMessage id={`ui-local-kb-admin.settings.externalDataSources.callout.${operation}.${outcome}`} values={{ error }} />,
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

    const count = this.props?.initialValues?.externalKbs?.length ?? 0;
    return (
      <Pane
        data-test-external-data-sources
        defaultWidth="fill"
        id="settings-external-data-sources"
        paneTitle={<FormattedMessage id="ui-local-kb-admin.section.externalDataSources" />}
        paneSub={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.sourceCount" values={{ count }} />}
      >
        <form>
          <FieldArray
            component={ExternalDataSourcesListFieldArray}
            mutators={mutators}
            name="externalKbs"
            onDelete={this.handleDelete}
            onSave={this.handleSave}
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
    setExternalDataSourceValue: (args, state, tools) => {
      tools.changeValue(state, args[0], () => args[1]);
    },
  },
  navigationCheck: true,
})(ExternalDataSourcesForm);
