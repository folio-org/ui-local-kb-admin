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
    }
  }

  handleNew = () => {
    this.props.fields.unshift(this.defaultValues);
  }

  handleSave = (index) => {
    const externalkb = this.props.fields.value[index];
    return this.props.onSave(externalkb);
  }

  render() {
    const { fields, mutators } = this.props;
    return (
      <div>
        <Row end="sm">
          <Col>
            <Button data-test-external-data-source-new onClick={this.handleNew}>
              <FormattedMessage id="stripes-components.button.new" />
            </Button>
          </Col>
        </Row>
        {
          fields.value.map((externalkb, i) => (
            <Field
              component={ExternalDataSourcesFields}
              isEqual={isEqual}
              key={externalkb.id || i}
              mutators={mutators}
              name={`${fields.name}[${i}]`}
              onDelete={() => this.handleDelete(i)}
              onSave={() => this.handleSave(i)}
            />
          ))
        }
      </div>
    );
  }
}
