import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import SafeHTMLMessage from '@folio/react-intl-safe-html';

import { ConfirmationModal } from '@folio/stripes/components';
import ExternalDataSourcesEdit from './ExternalDataSourcesEdit';
import ExternalDataSourcesView from './ExternalDataSourcesView';

export default class ExternalDataSourcesFields extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.shape({
        id: PropTypes.string,
      }).isRequired,
    }).isRequired,
    mutators: PropTypes.shape({
      setExternalDataSourceValue: PropTypes.func,
    }),
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    const { value } = props.input;

    this.state = {
      editing: !(value && value.id),
      initialValue: value,
    };
  }

  handleEdit = () => {
    this.setState({
      initialValue: this.props.input.value,
      editing: true,
    });
  }

  handleCancel = () => {
    const {
      input: { name, value },
      onDelete,
    } = this.props;

    if (value.id) {
      this.props.mutators.setExternalDataSourceValue(name, this.state.initialValue);
    } else {
      onDelete();
    }

    this.setState({
      editing: false,
    });
  }

  handleSave = () => {
    this.props.onSave()
      .then(() => this.setState({ editing: false }));
  }

  showDeleteConfirmationModal = () => this.setState({ showConfirmDelete: true });

  hideDeleteConfirmationModal = () => this.setState({ showConfirmDelete: false });

  render() {
    const ExternalDataSourceComponent = this.state.editing ? ExternalDataSourcesEdit : ExternalDataSourcesView;
    const custPropName = this.props?.input?.value?.name;
    return (
      <>
        <ExternalDataSourceComponent
          {...this.props}
          onCancel={this.handleCancel}
          onDelete={this.showDeleteConfirmationModal}
          onSave={this.handleSave}
          onEdit={this.handleEdit}
        />
        {this.state.showConfirmDelete && (
          <ConfirmationModal
            buttonStyle="danger"
            confirmLabel={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.delete.confirmLabel" />}
            data-test-confirmationModal
            heading={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.delete.confirmHeading" />}
            id="delete-external-data-source-confirmation"
            message={<SafeHTMLMessage id="ui-local-kb-admin.settings.externalDataSources.delete.confirmMessage" values={{ name: custPropName }} />}
            onCancel={this.hideDeleteConfirmationModal}
            onConfirm={() => {
              this.props.onDelete();
              this.hideDeleteConfirmationModal();
            }}
            open
          />
        )}
      </>
    );
  }
}
