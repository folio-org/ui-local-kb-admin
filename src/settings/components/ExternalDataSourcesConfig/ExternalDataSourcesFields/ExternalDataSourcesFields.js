import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import { ConfirmationModal } from '@folio/stripes/components';
import ExternalDataSourcesEdit from '../ExternalDataSourcesEdit';
import ExternalDataSourcesView from '../ExternalDataSourcesView';

const ExternalDataSourcesFields = (props) => {
  const {
    input: { name, value },
    onDelete,
    onSave,
    mutators,
  } = props;
  const [editing, setEditing] = useState(!value?.id);
  const [initialValue, setInitialValue] = useState(value);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleEdit = () => {
    setInitialValue(value);
    setEditing(true);
  };

  const handleCancel = () => {
    if (value.id) {
      mutators.setExternalDataSourceValue(name, initialValue);
    } else {
      onDelete();
    }

    setEditing(false);
  };

  const handleSave = () => {
    onSave()
      .then(() => setEditing(false));
  };

  const showDeleteConfirmationModal = () => setShowConfirmDelete(true);

  const hideDeleteConfirmationModal = () => setShowConfirmDelete(false);

  const ExternalDataSourceComponent = editing ? ExternalDataSourcesEdit : ExternalDataSourcesView;
  const custPropName = value?.name;
  return (
    <>
      <ExternalDataSourceComponent
        {...props}
        onCancel={handleCancel}
        onDelete={showDeleteConfirmationModal}
        onEdit={handleEdit}
        onSave={handleSave}
      />
      {showConfirmDelete && (
        <ConfirmationModal
          buttonStyle="danger"
          confirmLabel={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.delete.confirmLabel" />}
          data-test-confirmationModal
          heading={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.delete.confirmHeading" />}
          id="delete-external-data-source-confirmation"
          message={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.delete.confirmMessage" values={{ name: custPropName }} />}
          onCancel={hideDeleteConfirmationModal}
          onConfirm={() => {
            onDelete();
            hideDeleteConfirmationModal();
          }}
          open
        />
      )}
    </>
  );
}

ExternalDataSourcesFields.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      }),
      PropTypes.string
    ]).isRequired,
  }).isRequired,
  mutators: PropTypes.shape({
    setExternalDataSourceValue: PropTypes.func,
  }),
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
}

export default ExternalDataSourcesFields;
