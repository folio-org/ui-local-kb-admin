import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useQuery } from 'react-query';

import { useStripes, useOkapiKy } from '@folio/stripes/core';
import { Button, Col, Icon, KeyValue, NoValue, Pane, PaneHeader, Row, List, ConfirmationModal } from '@folio/stripes/components';
import { FormModal } from '@k-int/stripes-kint-components';

import { ST_ENDPOINT } from '../../../../constants/endpoints';
import mapPlatformsToStringTemplate from '../../../../util/mapPlatformsToStringTemplate';
import ProxyServerSettingsForm from '../ProxyServerSettingsForm';

const ProxyServerSettingsView = ({
  proxyServerId,
  stringTemplates,
  platforms,
  onDelete,
  onClose,
  onSubmit
}) => {
  const stripes = useStripes();
  const perm = stripes.hasPerm('ui-local-kb-admin.proxyServer.manage');
  const [editPS, setEditPS] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const ky = useOkapiKy();

  const { data = {} } = useQuery(
    ['ERM', 'STs', ST_ENDPOINT(proxyServerId)],
    () => ky.get(ST_ENDPOINT(proxyServerId)).json()
  );
  const proxyServer = mapPlatformsToStringTemplate(data, platforms);
  const { idScopes = [] } = proxyServer;

  const getActionMenu = ({ onToggle }) => {
    const actionsArray = [];
    if (perm) {
      actionsArray.push(
        <Button
          key={`${proxyServer?.name}-action-edit`}
          buttonStyle="dropdownItem"
          data-test-proxy-server-settings-edit
          marginBottom0
          onClick={() => setEditPS(true)}
        >
          <Icon icon="edit">
            <FormattedMessage id="stripes-core.button.edit" />
          </Icon>
        </Button>,
        <Button
          key={`${proxyServer?.name}-action-delete`}
          buttonStyle="dropdownItem"
          data-test-proxy-server-settings-delete
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
      );
    }
    return (actionsArray?.length ? actionsArray : null);
  };

  const renderViewHeader = renderProps => (
    <PaneHeader
      {...renderProps}
      actionMenu={getActionMenu}
      dismissible
      onClose={onClose}
      paneTitle={proxyServer?.name}
    />
  );

  return (
    <>
      <Pane
        defaultWidth="fill"
        id="settings-proxyServerSettings-viewPane"
        renderHeader={renderViewHeader}
      >
        <Row>
          <Col xs={12}>
            <KeyValue
              data-test-proxy-server-setting-name
              label={<FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.name" />}
              value={proxyServer?.name}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <KeyValue
              data-test-proxy-server-setting-url
              label={<FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.urlCustomizationCode" />}
              value={proxyServer?.rule ?? <NoValue />}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <KeyValue label={<FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.platformsToExclude" />}>
              <List
                items={idScopes?.map(ids => ids.label)}
                listStyle="bullets"
              />
            </KeyValue>
          </Col>
        </Row>
      </Pane>
      {deleteModal && (
        <ConfirmationModal
          buttonStyle="danger"
          confirmLabel={<FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.delete.confirmLabel" />}
          data-test-confirmationModal
          heading={<FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.delete.confirmHeading" />}
          id="delete-proxy-server-settings-confirmation"
          message={<FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.delete.confirmMessage" values={{ name: proxyServer?.name }} />}
          onCancel={() => setDeleteModal(false)}
          onConfirm={() => {
            onDelete(proxyServer?.id);
            onClose();
            setDeleteModal(false);
          }}
          open={deleteModal}
        />
      )}
      <FormModal
        initialValues={{ ...proxyServer }}
        modalProps={{
          dismissible: true,
          label: <FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.editProxyServerSetting" />,
          onClose: () => setEditPS(false),
          open: (editPS)
        }}
        onDelete={onDelete}
        onSubmit={(values, form) => {
          onSubmit(values);
          // necessary because in FormModal the field state is not reset
          // https://gitlab.com/knowledge-integration/folio/stripes-kint-components/-/issues/35
          form.reset(); // Reset the form fields after submit
          setEditPS(false);
        }}
      >
        <ProxyServerSettingsForm
          platforms={platforms}
          stringTemplates={stringTemplates}
        />
      </FormModal>
    </>
  );
};

ProxyServerSettingsView.propTypes = {
  proxyServerId: PropTypes.string.isRequired,
  stringTemplates: PropTypes.arrayOf(PropTypes.object),
  platforms: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default ProxyServerSettingsView;
