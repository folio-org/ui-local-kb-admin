import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useStripes, useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';
import { Button, Col, Icon, KeyValue, NoValue, Pane, PaneHeader, Row, List, ConfirmationModal } from '@folio/stripes/components';
import { ST_ENDPOINT, PLATFORM_ENDPOINT } from '../../../../constants/endpoints';

const ProxyServerSettingsView = ({
  proxyServerSettingsId,
  platformsId,
  onDelete,
  onClose,
  onClick
 }) => {
  const stripes = useStripes();
  const perm = stripes.hasPerm('ui-local-kb-admin.proxyServer.manage');
  const [deleteModal, setDeleteModal] = useState(false);
  const ky = useOkapiKy();

  const { data: proxyServerSettings = {} } = useQuery(
    ['ERM', 'sts', ST_ENDPOINT(proxyServerSettingsId)],
    () => ky.get(ST_ENDPOINT(proxyServerSettingsId)).json()
  );

  const { data: platforms = {} } = useQuery(
    ['ERM', 'platforms', PLATFORM_ENDPOINT(platformsId)],
    () => ky.get(PLATFORM_ENDPOINT(platformsId)).json()
  );

  
  const { idScopes = [] } = platforms;
  
    console.log('proxyServerSettingsId %o', proxyServerSettingsId);
    console.log('proxyServerSettings %o', proxyServerSettings);
  console.log('data platform  %o', platforms);

  const getActionMenu = ({ onToggle }) => {
    const actionsArray = [];
    if (perm)
      actionsArray.push(
        <>
          <Button
            key={`${proxyServerSettings?.name}-action-edit`}
            buttonStyle="dropdownItem"
            data-test-proxy-server-settings-edit
            marginBottom0
            onClick={onClick}
          >
            <Icon icon="edit">
              <FormattedMessage id="stripes-core.button.edit" />
            </Icon>
          </Button>
          <Button
            key={`${proxyServerSettings?.name}-action-delete`}
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
        </>
      );
    return (actionsArray?.length ? actionsArray : null);
  };

  const renderViewHeader = renderProps => (
    <PaneHeader
      {...renderProps}
      actionMenu={getActionMenu}
      dismissible
      onClose={onClose}
      paneTitle={proxyServerSettings?.name}
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
            value={proxyServerSettings.name}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <KeyValue
            data-test-proxy-server-setting-url
            label={<FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.urlCustomizationCode" />}
            value={proxyServerSettings?.rule ?? <NoValue />}
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
          message={<FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.delete.confirmMessage" values={{ name: proxyServerSettings?.name }} />}
          onCancel={() => setDeleteModal(false)}
          onConfirm={() => {
            onDelete(proxyServerSettings?.id);
            onClose();
            setDeleteModal(false);
          }}
          open={deleteModal}
        />
      )}
    </>
  );
};

ProxyServerSettingsView.propTypes = {
  proxyServerSettingsId: PropTypes.arrayOf(PropTypes.object),
  platformsId: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ProxyServerSettingsView;
