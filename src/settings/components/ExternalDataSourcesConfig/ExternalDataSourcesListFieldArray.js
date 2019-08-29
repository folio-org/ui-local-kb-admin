import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { isEqual } from 'lodash';
import { Button, Col, Row } from '@folio/stripes/components';
import { Field } from 'react-final-form';
import ExternalDataSourcesFields from './ExternalDataSourcesFields';

export default class ExternalDataSourcesListFieldArray extends React.Component {
  static propTypes = {
    fields: PropTypes.shape({
      unshift: PropTypes.func.isRequired,
      value: PropTypes.array.isRequired,
    }).isRequired,
    mutators: PropTypes.object,
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  }

  state = {
    disableNewButton: false,
  }

  defaultValues = {
    active: false,
    activationEnabled: false,
    rectype: 1,
    supportsHarvesting: true,
    type: 'org.olf.kb.adapters.EbscoKBAdapter',
  }

  handleDelete = (index) => {
    const { fields, onDelete } = this.props;
    const externalkb = fields.value[index];

    if (externalkb && externalkb.id) {
      onDelete(externalkb);
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
    const externalkb = this.props.fields.value[index];

    if (!externalkb.id) {
      this.setState({ disableNewButton: false });
    }
    return this.props.onSave(externalkb);
  }

  render() {
    const { fields, mutators } = this.props;
    return (
      <div>
        <Row end="sm">
          <Col>
            <Button
              data-test-external-data-source-new
              buttonStyle="primary"
              disabled={this.state.disableNewButton}
              onClick={this.handleNew}
            >
              <FormattedMessage id="stripes-components.button.new" />
            </Button>
          </Col>
        </Row>
        {
          fields.value.map((externalkb, i) => (
            <Field
              component={ExternalDataSourcesFields}
              isEqual={isEqual}
              key={externalkb.id || 'new'}
              mutators={mutators}
              name={`${fields.name}[${i}]`}
              onDelete={() => this.handleDelete(i)}
              onSave={() => this.handleSave(i)}
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
