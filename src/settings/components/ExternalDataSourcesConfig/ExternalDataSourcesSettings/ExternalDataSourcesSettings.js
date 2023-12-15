import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import arrayMutators from 'final-form-arrays';
import moment from 'moment';

import { useStripes } from '@folio/stripes/core';
import {
  Button,
  Icon,
  Pane,
  PaneHeader,
  ConfirmationModal,
  Modal,
  ModalFooter
} from '@folio/stripes/components';
import { CustomMetaSection } from '@folio/stripes-erm-components';

import useDisplayMetaInfo from '../useDisplayMetaInfo';
import ExternalDataSourcesFormModal from '../ExternaldataSourcesFormModal/ExternalDataSourcesFormModal';
import ExternalDataSourceForm from '../ExternalDataSourceForm/ExternalDataSourceForm';
import ExternalDataSourcesView from '../ExternalDataSourcesView/ExternalDataSourcesView';
import ExternalDataSourcesLookup from '../ExternalDataSourcesLookup/ExternalDataSourcesLookup';

const EDITING = 'edit';
const CREATING = 'create';
const VIEWING = 'view';

const ExternalDataSourcesSettings = ({
  onDelete,
  onCancel,
  onSave,
  externalKbs,
  onSubmit,
}) => {
  const stripes = useStripes();
  const perm = stripes.hasPerm('ui-local-kb-admin.kbs.manage');
  const count = externalKbs?.length ?? 0;
  const hours = moment.utc().diff(moment.utc(externalKbs?.lastCheck), 'hours');
  const messageType = hours >= 24 ? 'active' : 'passive';

  const [mode, setMode] = useState(VIEWING);
  const [externalDataSource, setExternalDataSource] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const { syncStatus, cursor, lastChecked } = useDisplayMetaInfo(externalDataSource);
  const [showConfirmResetSyncStatus, setShowConfirmResetSyncStatus] = useState(false);


  const renderModal = () => {
    const footer = (
      <ModalFooter>
        {messageType === 'active' && (
          <Button
            buttonStyle="danger"
            data-test-confirm-modal
            onClick={() => {
              const newValue = { ...externalDataSource, syncStatus: 'idle' };
              onSave(newValue);
              setShowConfirmResetSyncStatus(false);
            }}
          >
            <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.confirmLabel" />
          </Button>
        )}
        <Button
          data-test-cancel-modal
          onClick={() => setShowConfirmResetSyncStatus(false)}
        >
          <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.cancelLabel" />
        </Button>
      </ModalFooter>
    );
    return (
      <Modal
        enforceFocus={false}
        footer={footer}
        id="reset-syncstatus-confirmation"
        label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.resetSyncStatus" />}
        open
        size="medium"
      >
        <FormattedMessage id={`ui-local-kb-admin.settings.externalDataSources.confirmMessage.${messageType}`} values={{ hours }} />
      </Modal>
    );
  };

  const getActionMenu = ({ onToggle }) => {
    const actionsArray = [];
    if (perm) {
      actionsArray.push(
        <>
          <Button
            key={`${externalDataSource?.name}-action-edit`}
            buttonStyle="dropdownItem"
            data-test-external-data-source-edit
            marginBottom0
            onClick={() => setMode(EDITING)}
          >
            <Icon icon="edit">
              <FormattedMessage id="stripes-core.button.edit" />
            </Icon>
          </Button>
          <Button
            buttonStyle="dropdownItem"
            data-test-external-data-source-resetcursor
            disabled={!externalDataSource?.cursor}
            marginBottom0
            onClick={() => {
              const newValue = { ...externalDataSource, cursor: null };
              onSave(newValue);
            }}
          >
            <Icon icon="refresh">
              <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.resetCursor" />
            </Icon>
          </Button>
          <Button
            buttonStyle="dropdownItem"
            data-test-external-data-source-resetsyncstatus
            disabled={externalDataSource?.syncStatus === 'idle'}
            marginBottom0
            onClick={() => setShowConfirmResetSyncStatus(true)}
          >
            <Icon icon="refresh">
              <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.resetSyncStatus" />
            </Icon>
          </Button>
          <Button
            key={`${externalDataSource?.name}-action-delete`}
            buttonStyle="dropdownItem"
            data-test-external-data-source-delete
            marginBottom0
            onClick={() => {
              setDeleteModal(true);
              onToggle();
            }}
          >
            <Icon icon="trash">
              <FormattedMessage id="stripes-core.button.delete" />
            </Icon>
          </Button>
        </>
      );
    }

    return (actionsArray?.length ? actionsArray : null);
  };

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

  const renderViewHeader = renderProps => (
    <PaneHeader
      {...renderProps}
      actionMenu={getActionMenu}
      dismissible
      onClose={() => setExternalDataSource()}
      paneTitle={externalDataSource?.name}
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
          onSelectedExternalDataSource={(_e, eds) => setExternalDataSource(eds)}
        />
      </Pane>
      {
        externalDataSource &&
        <Pane
          defaultWidth="fill"
          id="settings-externalDataSources-viewPane"
          renderHeader={renderViewHeader}
        >
          {showConfirmResetSyncStatus && renderModal()}
          <CustomMetaSection accordionLabel={syncStatus}>
            {cursor}
            {lastChecked}
          </CustomMetaSection>
          <ExternalDataSourcesView
            externalDataSource={externalDataSource}
            externalKbs={externalKbs}
          />
        </Pane>
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
      {deleteModal && (
        <ConfirmationModal
          buttonStyle="danger"
          confirmLabel={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.delete.confirmLabel" />}
          data-test-confirmationModal
          heading={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.delete.confirmHeading" />}
          id="delete-external-data-source-confirmation"
          message={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.delete.confirmMessage" values={{ name: externalDataSource?.name }} />}
          onCancel={() => setDeleteModal(false)}
          onConfirm={() => {
            onDelete(externalDataSource?.id);
            setExternalDataSource();
            setDeleteModal(false);
          }}
          open={deleteModal}
        />
      )}
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
