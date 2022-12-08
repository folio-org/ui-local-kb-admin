import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'react-final-form-arrays';
import { Pane } from '@folio/stripes/components';
import stripesFinalForm from '@folio/stripes/final-form';
import ExternalDataSourcesListFieldArray from './ExternalDataSourcesListFieldArray';

class ExternalDataSourcesForm extends React.Component {
  static propTypes = {
    form: PropTypes.shape({
      mutators: PropTypes.object,
      reset: PropTypes.func.isRequired
    }),
    initialValues: PropTypes.shape({
      externalKbs: PropTypes.arrayOf(PropTypes.object),
    }),
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
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

    const count = this.props?.initialValues?.externalKbs?.length ?? 0;
    return (
      <Pane
        data-test-external-data-sources
        defaultWidth="fill"
        id="settings-external-data-sources"
        paneSub={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.sourceCount" values={{ count }} />}
        paneTitle={<FormattedMessage id="ui-local-kb-admin.section.externalDataSources" />}
      >
        <form>
          <FieldArray
            component={ExternalDataSourcesListFieldArray}
            mutators={mutators}
            name="externalKbs"
            onDelete={onDelete}
            onSave={this.handleSave}
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
    setExternalDataSourceValue: (args, state, tools) => {
      tools.changeValue(state, args[0], () => args[1]);
    },
  },
  navigationCheck: true,
})(ExternalDataSourcesForm);
