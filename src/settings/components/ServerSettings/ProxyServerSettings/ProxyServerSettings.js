import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import arrayMutators from 'final-form-arrays';
import { useStripes, useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';
import { Button, Col, Icon, KeyValue, MultiColumnList, NoValue, Pane, PaneHeader, Row, List, ConfirmationModal } from '@folio/stripes/components';

import ProxyServerSettingsForm from '../ProxyServerSettingsForm/ProxyServerSettingsForm';
import ProxyServerSettingsFormModal from '../ProxyServerSettingsFormModal/ProxyServerSettingsFormModal';

const EDITING = 'edit';
const CREATING = 'create';
const VIEWING = 'view';

const ProxyServerSettings = ({
  stringTemplates,
  platforms,
  onDelete,
  onSave,
  onCancel,
  onSubmit,
  initialValues,
  mclProps,
}) => {
  const stripes = useStripes();
  const perm = stripes.hasPerm('ui-local-kb-admin.proxyServer.manage');
  const count = stringTemplates?.length ?? 0;
  const [mode, setMode] = useState(VIEWING);
  const [proxyServerSettings, setProxyServerSettings] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const { idScopes = [] } = platforms;

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
            onClick={() => setMode(EDITING)}
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

  const renderSettingsHeader = renderProps => (
    <PaneHeader
      {...renderProps}
      lastMenu={perm ?
        <Button
          buttonStyle="primary"
          data-test-proxy-server-settings-new
          id="clickable-new-proxy-server-settings"
          marginBottom0
          onClick={() => setMode(CREATING)}
        >
          <FormattedMessage id="ui-local-kb-admin.job.new" />
        </Button> : null
      }
      paneSub={<FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.count" values={{ count }} />}
      paneTitle={<FormattedMessage id="ui-local-kb-admin.section.proxyServerSettings" />}
    />
  );

  const renderViewHeader = renderProps => (
    <PaneHeader
      {...renderProps}
      actionMenu={getActionMenu}
      dismissible
      onClose={() => setProxyServerSettings()}
      paneTitle={proxyServerSettings?.name}
    />
  );


  return (
    <>
      <Pane
        data-test-proxy-server-settings
        defaultWidth="fill"
        id="settings-proxy-server-settings"
        renderHeader={renderSettingsHeader}
      >
        <MultiColumnList
          columnMapping={{
            name: <FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.name" />,
            rule: <FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.urlCustomizationCode" />,
            ids: <FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.platformsToExclude" />,
          }}
          contentData={stringTemplates}
          onRowClick={(_p, pss) => {
            console.log('pss %o', pss)
            setProxyServerSettings(pss)
          }}
          visibleColumns={['name', 'rule', 'ids']}
          {...mclProps}
        />
      </Pane>
      {
      proxyServerSettings &&
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
      }
      <ProxyServerSettingsFormModal
        initialValues={mode === CREATING ? {} : { ...proxyServerSettings }}
        modalProps={{
          dismissible: true,
          label: mode === CREATING ?
            <FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.newProxyServerSetting" />
            :
            <FormattedMessage id="ui-local-kb-admin.settings.proxyServerSettings.editProxyServerSetting" />,
          onClose: () => setMode(VIEWING),
          open: (mode === CREATING || mode === EDITING)
        }}
        mutators={{ ...arrayMutators }}
        onCancel={onCancel}
        onDelete={onDelete}
        onSave={onSave}
        onSubmit={onSubmit}
      >
        <ProxyServerSettingsForm
          stringTemplates={stringTemplates}
          platforms={platforms}
        />
      </ProxyServerSettingsFormModal>
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
            setProxyServerSettings();
            setDeleteModal(false);
          }}
          open={deleteModal}
        />
      )}
    </>
  );
};

ProxyServerSettings.propTypes = {
  initialValues: PropTypes.shape({
    getInitialValues: PropTypes.func.isRequired,
    stringTemplates: PropTypes.arrayOf(PropTypes.object),
  }),
  mclProps: PropTypes.object,
  platforms: PropTypes.arrayOf(PropTypes.object),
  stringTemplates: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default ProxyServerSettings;