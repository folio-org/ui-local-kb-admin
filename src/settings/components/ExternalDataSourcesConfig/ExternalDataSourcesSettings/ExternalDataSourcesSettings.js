import { useState } from 'react';
import PropTypes from 'prop-types';

import ExternalDataSourcesView from '../ExternalDataSourcesView/ExternalDataSourcesView';
import ExternalDataSourcesLookup from '../ExternalDataSourcesLookup/ExternalDataSourcesLookup';

const ExternalDataSourcesSettings = ({
  onDelete,
  externalKbs,
  onSubmit
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
  onDelete: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default ExternalDataSourcesSettings;
