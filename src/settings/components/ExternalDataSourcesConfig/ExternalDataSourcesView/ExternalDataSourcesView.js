import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { useMutation, useQuery } from 'react-query';
import { KBS_ENDPOINT } from '../../../../constants/endpoints';
import {
  Col,
  KeyValue,
  NoValue,
  Row
} from '@folio/stripes/components';

const ExternalDataSourcesView = ({
  // externalDataSource
  externalDataSourceId
}) => {
  const { data: { results: externalDataSource = [] } = {} } = useQuery(
    ['ERM', 'KBs', KBS_ENDPOINT],
    () => ky.get(KBS_ENDPOINT(externalDataSource)).json()
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

  return (
    <>
      <Row>
        <Col xs={3}>
          <KeyValue
            data-test-external-data-source-name
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.name" />}
            value={externalDataSourceId?.name}
          />
        </Col>
        <Col xs={5}>
          <KeyValue
            data-test-external-data-source-type
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.type" />}
            value={externalDataSourceId?.type}
          />
        </Col>
        <Col xs={4}>
          <KeyValue
            data-test-external-data-source-recordtype
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.recordType" />}
            value={externalDataSourceId?.rectype === 1 ? <FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.package" /> : ''}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <KeyValue
            data-test-external-data-source-uri
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.uri" />}
            value={externalDataSourceId?.uri ?? <NoValue />}
          />
        </Col>
        <Col xs={4}>
          <KeyValue
            data-test-external-data-source-trusted-source-ti
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.trustedSourceTI" />}
            value={<FormattedMessage id={externalDataSourceId?.trustedSourceTI ? 'ui-local-kb-admin.yes' : 'ui-local-kb-admin.no'} />}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <KeyValue
            data-test-external-data-source-isactive
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.isActive" />}
            value={<FormattedMessage id={externalDataSourceId?.active ? 'ui-local-kb-admin.yes' : 'ui-local-kb-admin.no'} />}
          />
        </Col>
        <Col xs={5}>
          <KeyValue
            data-test-external-data-source-supportsharvesting
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.supportsHarvesting" />}
            value={<FormattedMessage id={externalDataSourceId?.supportsHarvesting ? 'ui-local-kb-admin.yes' : 'ui-local-kb-admin.no'} />}
          />
        </Col>
        <Col xs={4}>
          <KeyValue
            data-test-external-data-source-activationenabled
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.activationEnabled" />}
            value={<FormattedMessage id={externalDataSourceId?.activationEnabled ? 'ui-local-kb-admin.yes' : 'ui-local-kb-admin.no'} />}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <KeyValue
            data-test-external-data-source-listprefix
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.listPrefix" />}
            value={externalDataSourceId?.listPrefix ?? <NoValue />}
          />
        </Col>
        <Col xs={5}>
          <KeyValue
            data-test-external-data-source-fullprefix
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.fullPrefix" />}
            value={externalDataSourceId?.fullPrefix ?? <NoValue />}
          />
        </Col>
        <Col xs={4}>
          <KeyValue
            data-test-external-data-source-principal
            label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.principal" />}
            value={externalDataSourceId?.principal ?? <NoValue />}
          />
        </Col>
      </Row>
      <KeyValue
        data-test-external-data-source-credentials
        label={<FormattedMessage id="ui-local-kb-admin.settings.externalDataSources.credentials" />}
        value={externalDataSourceId?.credentials ?? <NoValue />}
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
