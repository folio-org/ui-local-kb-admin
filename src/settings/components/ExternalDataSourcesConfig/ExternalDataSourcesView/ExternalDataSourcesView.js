import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { useMutation, useQuery } from 'react-query';
import {
  Col,
  KeyValue,
  NoValue,
  Row
} from '@folio/stripes/components';
import { useOkapiKy } from '@folio/stripes/core';
import { KB_ENDPOINT } from '../../../../constants/endpoints';

const ExternalDataSourcesView = ({
  // externalDataSource
  externalDataSourceId
}) => {
  const ky = useOkapiKy();
  const { data: externalDataSource = {} } = useQuery(
    ['ERM', 'KBs', KB_ENDPOINT(externalDataSourceId)],
    () => ky.get(KB_ENDPOINT(externalDataSourceId)).json()
  );

  // const { data: { results: externalDataSource = [] } = {} } = useQuery(
  //   [KBS_ENDPOINT(externalDataSourceId), 'getExternalDataSource'],
  //   () => ky.get(KBS_ENDPOINT(externalDataSourceId)).json()
  // );

  // const handleClose = () => {
  //   history.push(`/kbs/${externalDataSourceId}${location.search}`);
  // };

  // const { mutateAsync: postExternalKB } = useMutation(
  //   [KBS_ENDPOINT(externalDataSourceId), 'getExternalDataSource'],
  //   () => ky.put(KBS_ENDPOINT(externalDataSourceId), {
  //   }).json()
  //     .then(() => {
  //       queryClient.invalidateQueries(['ERM', 'kbs']);
  //       queryClient.invalidateQueries(KBS_ENDPOINT(externalDataSourceId));
  //     })
  // );

  console.log('externalDataSource %o', externalDataSource);
  console.log('externalDataSourceId %o', externalDataSourceId);

  return (
    <>
      <Row>
        <Col xs={3}>
          <KeyValue
            data-test-external-data-source-name
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.name" />}
            value={externalDataSource?.name}
          />
        </Col>
        <Col xs={5}>
          <KeyValue
            data-test-external-data-source-type
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.type" />}
            value={externalDataSource?.type}
          />
        </Col>
        <Col xs={4}>
          <KeyValue
            data-test-external-data-source-recordtype
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.recordType" />}
            value={externalDataSource?.rectype === 1 ? <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.package" /> : ''}
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
            value={<FormattedMessage id={externalDataSource?.trustedSourceTI ? 'ui-local-kb-admin.yes' : 'ui-local-kb-admin.no'} />}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <KeyValue
            data-test-external-data-source-isactive
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.isActive" />}
            value={<FormattedMessage id={externalDataSource?.active ? 'ui-local-kb-admin.yes' : 'ui-local-kb-admin.no'} />}
          />
        </Col>
        <Col xs={5}>
          <KeyValue
            data-test-external-data-source-supportsharvesting
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.supportsHarvesting" />}
            value={<FormattedMessage id={externalDataSource?.supportsHarvesting ? 'ui-local-kb-admin.yes' : 'ui-local-kb-admin.no'} />}
          />
        </Col>
        <Col xs={4}>
          <KeyValue
            data-test-external-data-source-activationenabled
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.activationEnabled" />}
            value={<FormattedMessage id={externalDataSource?.activationEnabled ? 'ui-local-kb-admin.yes' : 'ui-local-kb-admin.no'} />}
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
    </>
  );
};

ExternalDataSourcesView.propTypes = {
  externalDataSourceId: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ExternalDataSourcesView;
