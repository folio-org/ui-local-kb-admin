import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import { isEqual } from 'lodash';
import { Button, Col, Row } from '@folio/stripes/components';
import { Field } from 'react-final-form';
import ExternalDataSourcesFields from '../ExternalDataSourcesFields';

const ExternalDataSourcesListFieldArray = ({ fields, mutators, onDelete, onSave }) => {
  const [disableNewButton, setDisableNewButton] = useState();
  const stripes = useStripes();
  const perm = stripes.hasPerm('ui-local-kb-admin.kbs.manage');

  const defaultValues = {
    active: false,
    activationEnabled: false,
    rectype: 1,
    supportsHarvesting: true,
    type: 'org.olf.kb.adapters.GOKbOAIAdapter',
  };

  const handleDelete = (index) => {
    const externalkb = fields.value[index];

    if (externalkb && externalkb.id) {
      onDelete(externalkb);
    } else {
      fields.remove(index);
    }
    setDisableNewButton(false);
  };

  const handleNew = () => {
    fields.unshift(defaultValues);
    setDisableNewButton(true);
  };

  const handleSave = (index) => {
    const externalkb = fields.value[index];

    if (!externalkb.id) {
      setDisableNewButton(false);
    }
    return onSave(externalkb);
  };

  return (
    <div>
      <Row end="sm">
        <Col>
          <Button
            buttonStyle="primary"
            data-test-external-data-source-new
            disabled={disableNewButton || !perm}
            onClick={handleNew}
          >
            <FormattedMessage id="ui-local-kb-admin.job.new" />
          </Button>
        </Col>
      </Row>
      {fields.value.map((externalkb, i) => (
        <div key={`externalkb.${externalkb.id}`} data-testid={`externalDataSourcesListFieldArray[${i}]`}>
          <Field
            key={externalkb.id || 'new'}
            component={ExternalDataSourcesFields}
            disabled={!perm}
            isEqual={isEqual}
            mutators={mutators}
            name={`${fields.name}[${i}]`}
            onDelete={() => handleDelete(i)}
            onSave={() => handleSave(i)}
            // This `validate` appears stupid and like a no-op, but it's necessary because of the way
            // that RFF decides whether to run validation: https://github.com/final-form/final-form/pull/267
            // We want this Field to have validation info (meta.invalid) upon mount because some of the
            // child Fields are required and they will run validation.
            validate={() => { }}

          />
        </div>
      ))}
    </div>
  );
};

ExternalDataSourcesListFieldArray.propTypes = {
  fields: PropTypes.shape({
    name: PropTypes.string,
    remove: PropTypes.func,
    unshift: PropTypes.func.isRequired,
    value: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  mutators: PropTypes.object,
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ExternalDataSourcesListFieldArray;
