import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import arrayMutators from 'final-form-arrays';

import { useStripes } from '@folio/stripes/core';
import {
  Button,
  Pane,
  PaneHeader,
} from '@folio/stripes/components';

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
  const stripes = useStripes();
  const perm = stripes.hasPerm('ui-local-kb-admin.kbs.manage');
  const count = externalKbs?.length ?? 0;

  const [mode, setMode] = useState(VIEWING);
  const [externalDataSource, setExternalDataSource] = useState();

  const renderSettingsHeader = renderProps => (
    <PaneHeader
      {...renderProps}
      lastMenu={perm ?
        <Button
          buttonStyle="primary"
          data-test-external-data-source-new
          id="clickable-new-external-datasource"
          marginBottom0
          onClick={() => setMode(CREATING)}
        >
          <FormattedMessage id="ui-local-kb-admin.job.new" />
        </Button> : null
      }
      paneSub={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.sourceCount" values={{ count }} />}
      paneTitle={<FormattedMessage id="ui-local-kb-admin.section.externalDataSources" />}
    />
  );


  return (
    <>
      <Pane
        data-test-external-data-sources
        defaultWidth="fill"
        id="settings-external-data-sources"
        renderHeader={renderSettingsHeader}
      >
        <ExternalDataSourcesLookup
          externalKbs={externalKbs}
          onSelectedExternalDataSource={(_e, eds) => {
            setExternalDataSource(eds)
          }}
        />
      </Pane>
      {
        externalDataSource &&
          <ExternalDataSourcesView
              externalDataSourceId={externalDataSource.id}
          onClose={() => setExternalDataSource()}
          externalKbs={externalKbs}
          initialValues={initialValues}
          onCancel={onCancel}
          onDelete={onDelete}
          onSave={onSave}
          onSubmit={onSubmit}
          onClick={() => setMode(EDITING)}
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
