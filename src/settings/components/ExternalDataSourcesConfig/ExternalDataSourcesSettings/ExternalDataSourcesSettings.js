import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import arrayMutators from 'final-form-arrays';

import ExternalDataSourcesView from '../ExternalDataSourcesView/ExternalDataSourcesView';
import ExternalDataSourcesLookup from '../ExternalDataSourcesLookup/ExternalDataSourcesLookup';
import ExternalDataSourcesFormModal from '../ExternaldataSourcesFormModal/ExternalDataSourcesFormModal';
import ExternalDataSourceForm from '../ExternalDataSourceForm/ExternalDataSourceForm';

const EDITING = 'edit';
const CREATING = 'create';
const VIEWING = 'view';

const ExternalDataSourcesSettings = ({
  onDelete,
  onCancel,
  onSave,
  externalKbs,
  onSubmit,
  initialValues
}) => {
  const [mode, setMode] = useState(VIEWING);
  const [externalDataSource, setExternalDataSource] = useState();

  return (
    <>
      <ExternalDataSourcesLookup
        externalKbs={externalKbs}
        onClick={() => setMode(CREATING)}
        onSelectedExternalDataSource={(_e, eds) => {
          setExternalDataSource(eds);
        }}
      />
      {
        externalDataSource &&
          <ExternalDataSourcesView
            externalDataSourceId={externalDataSource.id}
            externalKbs={externalKbs}
            initialValues={initialValues}
            onCancel={onCancel}
            onClick={() => setMode(EDITING)}
            onClose={() => setExternalDataSource()}
            onDelete={onDelete}
            onSave={onSave}
            onSubmit={onSubmit}
          />
      }
      <ExternalDataSourcesFormModal
        initialValues={mode === CREATING ?
          {
            active: false,
            activationEnabled: false,
            rectype: 1,
            supportsHarvesting: true,
            type: 'org.olf.kb.adapters.GOKbOAIAdapter',
          }
          :
          { ...externalDataSource }}
        modalProps={{
          dismissible: true,
          label: mode === CREATING ?
            <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.newExternalDataSource" />
            :
            <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.edit" values={{ name: externalDataSource?.name }} />,
          onClose: () => setMode(VIEWING),
          open: (mode === CREATING || mode === EDITING)
        }}
        mutators={{ ...arrayMutators }}
        onCancel={onCancel}
        onDelete={onDelete}
        onSave={onSave}
        onSubmit={onSubmit}
      >
        <ExternalDataSourceForm externalKbs={externalKbs} />
      </ExternalDataSourcesFormModal>
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
