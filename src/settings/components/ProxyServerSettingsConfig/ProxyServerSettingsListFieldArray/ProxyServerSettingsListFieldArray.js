import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import { isEqual } from 'lodash';
import { Button, Col, Row } from '@folio/stripes/components';
import { Field } from 'react-final-form';
import ProxyServerSettingsFields from '../ProxyServerSettingsFields';

const ProxyServerSettingsListFieldArray = ({ fields, mutators, onDelete, onSave, platforms }) => {
  const [disableNewButton, setDisableNewButton] = useState(false);

  const stripes = useStripes();
  const perm = stripes.hasPerm('ui-local-kb-admin.kbs.manage');

  const defaultValues = {};

  const handleDelete = (index) => {
    const proxyServer = fields.value[index];

    if (proxyServer && proxyServer.id) {
      onDelete(proxyServer);
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
    const proxyServer = fields.value[index];

    if (!proxyServer.id) {
      setDisableNewButton(false);
    }
    return onSave(proxyServer);
  };

  return (
    <div>
      <Row end="sm">
        <Col>
          <Button
            buttonStyle="primary"
            data-test-proxy-server-setting-new
            disabled={disableNewButton || !perm}
            onClick={handleNew}
          >
            <FormattedMessage id="ui-local-kb-admin.job.new" />
          </Button>
        </Col>
      </Row>
      {fields?.value?.map((proxyServer, i) => (
        <Field
          key={proxyServer.id || 'new'}
          component={ProxyServerSettingsFields}
          isEqual={isEqual}
          mutators={mutators}
          name={`${fields.name}[${i}]`}
          onDelete={() => handleDelete(i)}
          onSave={() => handleSave(i)}
          platforms={platforms}
          // This `validate` appears stupid and like a no-op, but it's necessary because of the way
          // that RFF decides whether to run validation: https://github.com/final-form/final-form/pull/267
          // We want this Field to have validation info (meta.invalid) upon mount because some of the
          // child Fields are required and they will run validation.
          validate={() => { }}
        />
      ))}
    </div>
  );
};

ProxyServerSettingsListFieldArray.propTypes = {
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
};

export default ProxyServerSettingsListFieldArray;
