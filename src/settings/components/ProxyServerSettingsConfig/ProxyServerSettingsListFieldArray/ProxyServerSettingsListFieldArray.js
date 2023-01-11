import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { isEqual } from 'lodash';
import { Button, Col, Row } from '@folio/stripes/components';
import { Field } from 'react-final-form';
import ProxyServerSettingsFields from '../ProxyServerSettingsFields';

export default class ProxyServerSettingsListFieldArray extends React.Component {
  static propTypes = {
    fields: PropTypes.shape({
      name: PropTypes.string,
      remove: PropTypes.func,
      unshift: PropTypes.func.isRequired,
      value: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    mutators: PropTypes.object,
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    platforms: PropTypes.arrayOf(PropTypes.object),
  }

  state = {
    disableNewButton: false,
  }

  defaultValues = {}

  handleDelete = (index) => {
    const { fields, onDelete } = this.props;
    const proxyServer = fields.value[index];

    if (proxyServer && proxyServer.id) {
      onDelete(proxyServer);
    } else {
      fields.remove(index);
      this.setState({ disableNewButton: false });
    }
  }

  handleNew = () => {
    this.props.fields.unshift(this.defaultValues);
    this.setState({ disableNewButton: true });
  }

  handleSave = (index) => {
    const proxyServer = this.props.fields.value[index];

    if (!proxyServer.id) {
      this.setState({ disableNewButton: false });
    }
    return this.props.onSave(proxyServer);
  }

  render() {
    const { fields, mutators } = this.props;
    return (
      <div>
        <Row end="sm">
          <Col>
            <Button
              buttonStyle="primary"
              data-test-proxy-server-setting-new
              disabled={this.state.disableNewButton}
              onClick={this.handleNew}
            >
              <FormattedMessage id="stripes-components.button.new" />
            </Button>
          </Col>
        </Row>
        {
          fields.value.map((proxyServer, i) => (
            <Field
              key={proxyServer.id || 'new'}
              component={ProxyServerSettingsFields}
              isEqual={isEqual}
              mutators={mutators}
              name={`${fields.name}[${i}]`}
              onDelete={() => this.handleDelete(i)}
              onSave={() => this.handleSave(i)}
              platforms={this.props.platforms}
              // This `validate` appears stupid and like a no-op, but it's necessary because of the way
              // that RFF decides whether to run validation: https://github.com/final-form/final-form/pull/267
              // We want this Field to have validation info (meta.invalid) upon mount because some of the
              // child Fields are required and they will run validation.
              validate={() => { }}
            />
          ))
        }
      </div>
    );
  }
}
