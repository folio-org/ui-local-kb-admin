import { useState } from 'react';
import PropTypes from 'prop-types';

import ExternalDataSourcesView from '../ExternalDataSourcesView/ExternalDataSourcesView';
import ExternalDataSourcesLookup from '../ExternalDataSourcesLookup/ExternalDataSourcesLookup';

const ExternalDataSourcesSettings = ({
  onDelete,
  externalKbs,
  onSubmit,
  initialValues
}) => {
  const [externalDataSource, setExternalDataSource] = useState();

  return (
    <>
      <ExternalDataSourcesLookup
        externalKbs={externalKbs}
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
  onSubmit: PropTypes.func.isRequired
};

export default ExternalDataSourcesSettings;
