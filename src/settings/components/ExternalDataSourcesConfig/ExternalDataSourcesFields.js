import React from 'react';
import PropTypes from 'prop-types';
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

  render() {
    const ExternalDataSourceComponent = this.state.editing ? ExternalDataSourcesEdit : ExternalDataSourcesView;
    return (
      <ExternalDataSourceComponent
        {...this.props}
        onCancel={this.handleCancel}
        onDelete={this.props.onDelete}
        onSave={this.handleSave}
        onEdit={this.handleEdit}
      />
    );
  }
}
