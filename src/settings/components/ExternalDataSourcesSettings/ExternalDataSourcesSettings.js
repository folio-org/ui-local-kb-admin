import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import { Button, Col, Icon, KeyValue, MultiColumnList, NoValue, Pane, PaneHeader, Row } from '@folio/stripes/components';
import { CustomMetaSection } from '@folio/stripes-erm-components';
import useDisplayMetaInfo from './useDisplayMetaInfo';
import ExternalDataSourcesFormModal from './ExternalDataSourcesFormModal';
import ExternalDataSourceForm from './ExternalDataSourceForm';

const EDITING = 'edit';
const CREATING = 'create';
const VIEWING = 'view';

const ExternalDataSourcesSettings = ({
  externalKbs,
  onDelete,
  onSave,
  onSubmit
}) => {
  const stripes = useStripes();
  const perm = stripes.hasPerm('ui-local-kb-admin.kbs.manage');
  const count = externalKbs?.length ?? 0;
  const [mode, setMode] = useState(VIEWING);
  const [externalDataSource, setExternalDataSource] = useState();
  const { syncStatus, cursor, lastChecked } = useDisplayMetaInfo(externalDataSource);

  console.log('perm %o', perm);
  console.log('externalDataSource %o', externalDataSource);

  const getActionMenu = ({ onToggle }) => {
    const actionsArray = [];
    if (perm) {
      actionsArray.push(
        <>
          <Button
            key={`${externalDataSource.name}-action-edit`}
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
            disabled={!externalDataSource.cursor}
            marginBottom0
            onClick={() => {
              console.log('cursor reset button clicked');
              // change(`${name}.cursor`, null);
              // const newValue = { ...value, cursor: null };
              // onSave(newValue);
            }}
          >
            <Icon icon="refresh">
              <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.resetCursor" />
            </Icon>
          </Button>
          <Button
            buttonStyle="dropdownItem"
            data-test-external-data-source-resetsyncstatus
            disabled={externalDataSource.syncStatus === 'idle'}
            marginBottom0
            onClick={() => console.log('reset sync Status button clicked')}
          >
            <Icon icon="refresh">
              <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.resetSyncStatus" />
            </Icon>
          </Button>

          <Button
            key={`${externalDataSource.name}-action-delete`}
            buttonStyle="dropdownItem"
            data-test-external-data-source-delete
            marginBottom0
            // onClick={onDelete}
            onClick={() => {
              // setDeleteModal(true);
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

  const renderHeader = renderProps => (
    <PaneHeader
      {...renderProps}
      lastMenu={perm ?
        <Button
          buttonStyle="primary"
          data-test-external-data-source-new
          id="clickable-new-external-datasource"
          marginBottom0
          // onClick={onSubmit}
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
        renderHeader={renderHeader}
      >
        <MultiColumnList
          columnMapping={{
            name: <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.name" />,
            type: <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.type" />,
            uri: <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.uri" />,
            active: <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.isActive" />,
            trustedSourceTI: <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.trustedSourceTI" />,
            syncStatus: <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.syncStatus" />,
            cursor: <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.cursor" />,
            lastCheck: <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.lastChecked" />,
          }}
          contentData={externalKbs}
          formatter={{
            active: data => { return <FormattedMessage id={data.active ? 'ui-local-kb-admin.yes' : 'ui-local-kb-admin.no'} />; },
            trustedSourceTI: data => { return <FormattedMessage id={data.trustedSourceTI ? 'ui-local-kb-admin.yes' : 'ui-local-kb-admin.no'} />; },
          }}
          onRowClick={(_e, eds) => setExternalDataSource(eds)}
          visibleColumns={['name', 'type', 'uri', 'active', 'trustedSourceTI', 'syncStatus', 'cursor', 'lastCheck']}
        />
      </Pane>
      {
        externalDataSource &&
        <Pane
          actionMenu={getActionMenu}
          defaultWidth="fill"
          dismissible
          id="settings-externalDataSources-viewPane"
          onClose={() => setExternalDataSource()}
          paneTitle={externalDataSource.name}
        >
          <CustomMetaSection accordionLabel={syncStatus}>
            {cursor}
            {lastChecked}
          </CustomMetaSection>
          <Row>
            <Col xs={3}>
              <KeyValue
                data-test-external-data-source-name
                label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.name" />}
                value={externalDataSource.name}
              />
            </Col>
            <Col xs={5}>
              <KeyValue
                data-test-external-data-source-type
                label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.type" />}
                value={externalDataSource.type}
              />
            </Col>
            <Col xs={4}>
              <KeyValue
                data-test-external-data-source-recordtype
                label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.recordType" />}
                value={externalDataSource.rectype === 1 ? <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.package" /> : ''}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={8}>
              <KeyValue
                data-test-external-data-source-uri
                label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.uri" />}
                value={externalDataSource?.uri ?? <NoValue />}
              />
            </Col>
            <Col xs={4}>
              <KeyValue
                data-test-external-data-source-trusted-source-ti
                label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.trustedSourceTI" />}
                value={<FormattedMessage id={externalDataSource.trustedSourceTI ? 'ui-local-kb-admin.yes' : 'ui-local-kb-admin.no'} />}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={3}>
              <KeyValue
                data-test-external-data-source-isactive
                label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.isActive" />}
                value={<FormattedMessage id={externalDataSource.active ? 'ui-local-kb-admin.yes' : 'ui-local-kb-admin.no'} />}
              />
            </Col>
            <Col xs={5}>
              <KeyValue
                data-test-external-data-source-supportsharvesting
                label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.supportsHarvesting" />}
                value={<FormattedMessage id={externalDataSource.supportsHarvesting ? 'ui-local-kb-admin.yes' : 'ui-local-kb-admin.no'} />}
              />
            </Col>
            <Col xs={4}>
              <KeyValue
                data-test-external-data-source-activationenabled
                label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.activationEnabled" />}
                value={<FormattedMessage id={externalDataSource.activationEnabled ? 'ui-local-kb-admin.yes' : 'ui-local-kb-admin.no'} />}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={3}>
              <KeyValue
                data-test-external-data-source-listprefix
                label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.listPrefix" />}
                value={externalDataSource?.listPrefix ?? <NoValue />}
              />
            </Col>
            <Col xs={5}>
              <KeyValue
                data-test-external-data-source-fullprefix
                label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.fullPrefix" />}
                value={externalDataSource?.fullPrefix ?? <NoValue />}
              />
            </Col>
            <Col xs={4}>
              <KeyValue
                data-test-external-data-source-principal
                label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.principal" />}
                value={externalDataSource?.principal ?? <NoValue />}
              />
            </Col>
          </Row>
          <KeyValue
            data-test-external-data-source-credentials
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.credentials" />}
            value={externalDataSource?.credentials ?? <NoValue />}
          />
        </Pane>
      }
      <ExternalDataSourcesFormModal
        initialValues={mode === EDITING && { ...externalDataSource }}
        modalProps={{
          dismissible: true,
          label: mode === CREATING ?
            <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.newExternalDataSource" /> :
            'name of existing data source',
          onClose: () => setMode(VIEWING),
          open: (mode === CREATING || mode === EDITING)
        }}
        onSubmit={onSubmit}
      >
        <ExternalDataSourceForm />
      </ExternalDataSourcesFormModal>

    </>

  );
};

ExternalDataSourcesSettings.propTypes = {
  externalKbs: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default ExternalDataSourcesSettings;
