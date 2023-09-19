import { useState } from 'react';

import { useForm } from 'react-final-form';

import { FormattedMessage } from 'react-intl';

import PropTypes from 'prop-types';
import moment from 'moment';

import { useStripes } from '@folio/stripes/core';
import {
  Button,
  Card,
  Col,
  Icon,
  KeyValue,
  Layout,
  Modal,
  ModalFooter,
  NoValue,
  Row
} from '@folio/stripes/components';
import { ActionMenu, CustomMetaSection } from '@folio/stripes-erm-components';

import useDisplayMetaInfo from '../useDisplayMetaInfo';

const ExternalDataSourcesView = ({
  input: { name, value = {} },
  onDelete,
  onEdit,
  onSave
}) => {
  const { change } = useForm();
  const { syncStatus, cursor, lastChecked } = useDisplayMetaInfo(value);
  const [showConfirmResetSyncStatus, setShowConfirmResetSyncStatus] = useState(false);

  const stripes = useStripes();
  const perm = stripes.hasPerm('ui-local-kb-admin.kbs.manage');

  const hours = moment.utc().diff(moment.utc(value.lastCheck), 'hours');
  const messageType = hours >= 24 ? 'active' : 'passive';

  const renderModal = () => {
    const footer = (
      <ModalFooter>
        {messageType === 'active' && (
          <Button
            buttonStyle="danger"
            data-test-confirm-modal
            onClick={() => {
              change(`${name}.syncStatus`, 'idle');
              onSave();
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

  const getActionMenu = () => (
    <>
      <Button
        buttonStyle="dropdownItem"
        data-test-external-data-source-edit
        marginBottom0
        onClick={onEdit}
      >
        <Icon icon="edit">
          <FormattedMessage id="stripes-core.button.edit" />
        </Icon>
      </Button>
      <Button
        buttonStyle="dropdownItem"
        data-test-external-data-source-resetcursor
        disabled={!value.cursor}
        marginBottom0
        onClick={() => {
          change(`${name}.cursor`, null);
          const newValue = { ...value, cursor: null };
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
        disabled={value.syncStatus === 'idle'}
        marginBottom0
        onClick={() => setShowConfirmResetSyncStatus(true)}
      >
        <Icon icon="refresh">
          <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.resetSyncStatus" />
        </Icon>
      </Button>
      {!value.readonly &&
        <Button
          buttonStyle="dropdownItem"
          data-test-external-data-source-delete
          marginBottom0
          onClick={onDelete}
        >
          <Icon icon="trash">
            <FormattedMessage id="stripes-core.button.delete" />
          </Icon>
        </Button>
      }
    </>
  );

  return (
    <>
      <Card
        data-test-external-data-source-view
        headerEnd={perm && <ActionMenu actionMenu={getActionMenu} />}
        headerStart={<strong><FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.externalDataSource" /></strong>}
      >
        {showConfirmResetSyncStatus && renderModal()}
        <CustomMetaSection accordionLabel={syncStatus}>
          {cursor}
          {lastChecked}
        </CustomMetaSection>
        <Row>
          <Col xs={3}>
            <KeyValue
              data-test-external-data-source-name
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.name" />}
              value={value.name}
            />
          </Col>
          <Col xs={5}>
            <KeyValue
              data-test-external-data-source-type
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.type" />}
              value={value.type}
            />
          </Col>
          <Col xs={4}>
            <KeyValue
              data-test-external-data-source-recordtype
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.recordType" />}
              value={value.rectype === 1 ? <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.package" /> : ''}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <KeyValue
              data-test-external-data-source-uri
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.uri" />}
              value={value?.uri ?? <NoValue />}
            />
          </Col>
          <Col xs={4}>
            <KeyValue
              data-test-external-data-source-trusted-source-ti
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.trustedSourceTI" />}
              value={<FormattedMessage id={value.trustedSourceTI ? 'ui-local-kb-admin.yes' : 'ui-local-kb-admin.no'} />}
            />
          </Col>
        </Row>
        <Layout className="padding-bottom-gutter">
          <Row>
            <Col xs={3}>
              <KeyValue
                data-test-external-data-source-isactive
                label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.isActive" />}
                value={<FormattedMessage id={value.active ? 'ui-local-kb-admin.yes' : 'ui-local-kb-admin.no'} />}
              />
            </Col>
            <Col xs={5}>
              <KeyValue
                data-test-external-data-source-supportsharvesting
                label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.supportsHarvesting" />}
                value={<FormattedMessage id={value.supportsHarvesting ? 'ui-local-kb-admin.yes' : 'ui-local-kb-admin.no'} />}
              />
            </Col>
            <Col xs={4}>
              <KeyValue
                data-test-external-data-source-activationenabled
                label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.activationEnabled" />}
                value={<FormattedMessage id={value.activationEnabled ? 'ui-local-kb-admin.yes' : 'ui-local-kb-admin.no'} />}
              />
            </Col>
          </Row>
        </Layout>
        <Row>
          <Col xs={3}>
            <KeyValue
              data-test-external-data-source-listprefix
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.listPrefix" />}
              value={value?.listPrefix ?? <NoValue />}
            />
          </Col>
          <Col xs={5}>
            <KeyValue
              data-test-external-data-source-fullprefix
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.fullPrefix" />}
              value={value?.fullPrefix ?? <NoValue />}
            />
          </Col>
          <Col xs={4}>
            <KeyValue
              data-test-external-data-source-principal
              label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.principal" />}
              value={value?.principal ?? <NoValue />}
            />
          </Col>
        </Row>
        <KeyValue
          data-test-external-data-source-credentials
          label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.credentials" />}
          value={value?.credentials ?? <NoValue />}
        />
      </Card>
    </>
  );
};

ExternalDataSourcesView.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.shape({
        activationEnabled: PropTypes.bool,
        active: PropTypes.bool,
        credentials: PropTypes.string,
        fullPrefix: PropTypes.string,
        id: PropTypes.string,
        listPrefix: PropTypes.string,
        name: PropTypes.string,
        principal: PropTypes.string,
        readonly: PropTypes.bool,
        rectype: PropTypes.number,
        supportsHarvesting: PropTypes.bool,
        trustedSourceTI: PropTypes.bool,
        type: PropTypes.string,
        uri: PropTypes.string,
        syncStatus: PropTypes.string,
        cursor: PropTypes.string,
        lastCheck: PropTypes.number
      }),
      PropTypes.string
    ]).isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
  }),
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default ExternalDataSourcesView;
