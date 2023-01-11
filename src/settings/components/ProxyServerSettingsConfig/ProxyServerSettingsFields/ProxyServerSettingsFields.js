import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import { ConfirmationModal } from '@folio/stripes/components';
import ProxyServerSettingsEdit from '../ProxyServerSettingsEdit';
import ProxyServerSettingsView from '../ProxyServerSettingsView';

export default class ProxyServerSettingsFields extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      }).isRequired,
    }).isRequired,
    mutators: PropTypes.shape({
      setProxyServerSettingValue: PropTypes.func,
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
      this.props.mutators.setProxyServerSettingValue(name, this.state.initialValue);
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
    const ProxyServerSettingComponent = this.state.editing ? ProxyServerSettingsEdit : ProxyServerSettingsView;
    const proxyServerSettingName = this.props?.input?.value?.name;
    return (
      <>
        <ProxyServerSettingComponent
          {...this.props}
          onCancel={this.handleCancel}
          onDelete={this.showDeleteConfirmationModal}
          onEdit={this.handleEdit}
          onSave={this.handleSave}
        />
        {this.state.showConfirmDelete && (
          <ConfirmationModal
            buttonStyle="danger"
            confirmLabel={<FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.delete.confirmLabel" />}
            data-test-confirmationModal
            heading={<FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.delete.confirmHeading" />}
            id="delete-proxy-server-setting-confirmation"
            message={<FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.delete.confirmMessage" values={{ name: proxyServerSettingName }} />}
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
