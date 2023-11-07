import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useStripes } from '@folio/stripes/core';
import { Button, Col, Icon, KeyValue, MultiColumnList, NoValue, Pane, Row } from '@folio/stripes/components';
import { CustomMetaSection } from '@folio/stripes-erm-components';
import useDisplayMetaInfo from './useDisplayMetaInfo';

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
    actionsArray.push(
      <Button
        key={`${externalDataSource.name}-action-edit`}
        buttonStyle="dropdownItem"
        data-test-external-data-source-edit
        disabled={!perm}
        marginBottom0
        onClick={() => setMode(EDITING)}
      >
        <Icon icon="edit">
          <FormattedMessage id="stripes-core.button.edit" />
        </Icon>
      </Button>
    );
    actionsArray.push(
      <Button
        key={`${externalDataSource.name}-action-delete`}
        buttonStyle="dropdownItem"
        data-test-external-data-source-delete
        disabled={!perm}
        marginBottom0
        // onClick={onDelete}
        onClick={() => {
          setDeleteModal(true);
          onToggle();
        }}
      >
        <Icon icon="trash">
          <FormattedMessage id="stripes-core.button.delete" />
        </Icon>
      </Button>
    );

    return (actionsArray?.length ? actionsArray : null);
  };

  return (
    <>
      <Pane
        data-test-external-data-sources
        defaultWidth="fill"
        id="settings-external-data-sources"
        lastMenu={
          <Button
            buttonStyle="primary"
            data-test-external-data-source-new
            disabled={!perm}
            id="clickable-new-external-datasource"
            marginBottom0
            onClick={onSubmit}
          >
            <FormattedMessage id="ui-local-kb-admin.job.new" />
          </Button>
        }
        paneSub={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.sourceCount" values={{ count }} />}
        paneTitle={<FormattedMessage id="ui-local-kb-admin.section.externalDataSources" />}
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
          // actionMenu={({ onToggle }) => {
          // const actionsArray = [];
          // if (editCondition) {
          //   actionsArray.push(
          //     <Button
          //       key={`${customProperty.name}-action-edit`}
          //       buttonStyle="dropdownItem"
          //       marginBottom0
          //       onClick={() => setMode(EDITING)}
          //     >
          //       <Icon icon="edit">
          //         {
          //           kintIntl.formatKintMessage(
          //             {
          //               id: 'edit',
          //               overrideValue: labelOverrides?.edit,
          //             }
          //           )
          //         }
          //       </Icon>
          //     </Button>
          //   );
          // }
          // if (deleteCondition) {
          //   actionsArray.push(
          //     <Button
          //       key={`${customProperty.name}-action-delete`}
          //       buttonStyle="dropdownItem"
          //       marginBottom0
          //       onClick={() => {
          //         setDeleteModal(true);
          //         onToggle();
          //       }}
          //     >
          //       <Icon icon="trash">
          //         {
          //           kintIntl.formatKintMessage(
          //             {
          //               id: 'delete',
          //               overrideValue: labelOverrides?.delete,
          //             }
          //           )
          //         }
          //       </Icon>
          //     </Button>
          //   );
          // }
          // return (actionsArray?.length ? actionsArray : null);
          // }}
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
