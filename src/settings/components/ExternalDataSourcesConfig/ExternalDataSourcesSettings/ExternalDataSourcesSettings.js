import { useState } from 'react';
import PropTypes from 'prop-types';

import ExternalDataSourcesView from '../ExternalDataSourcesView/ExternalDataSourcesView';
import ExternalDataSourcesLookup from '../ExternalDataSourcesLookup/ExternalDataSourcesLookup';

const ExternalDataSourcesSettings = ({
  onDelete,
  onCancel,
  onSave,
  externalKbs,
  onSubmit,
  initialValues
}) => {
  const [externalDataSource, setExternalDataSource] = useState();

  return (
    <>
      <ExternalDataSourcesLookup
        externalKbs={externalKbs}
        onCancel={onCancel}
        onEditCancel={onCancel}
        onSave={onSave}
        onSelectedExternalDataSource={(_e, eds) => {
          setExternalDataSource(eds);
        }}
        onSubmit={onSubmit}
      />
      {
        externalDataSource &&
          <ExternalDataSourcesView
            externalDataSourceId={externalDataSource.id}
            externalKbs={externalKbs}
            initialValues={initialValues}
            onClose={() => setExternalDataSource()}
            onDelete={onDelete}
            onEditCancel={onCancel}
            onSave={onSave}
            onSubmit={onSubmit}
          />
      }
    </>
  );
};

ExternalDataSourcesSettings.propTypes = {
  externalKbs: PropTypes.arrayOf(PropTypes.object),
  initialValues: PropTypes.shape({
    externalKbs: PropTypes.arrayOf(PropTypes.object),
  }),
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default ExternalDataSourcesSettings;
