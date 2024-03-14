
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { cloneDeep, isEmpty } from 'lodash';

import { useParallelBatchFetch } from '@folio/stripes-erm-components';
import { generateKiwtQueryParams } from '@k-int/stripes-kint-components';

import { useCallout, useOkapiKy } from '@folio/stripes/core';

import ProxyServerSettings from '../../components/ProxyServerSettingsConfig/ProxyServerSettings/ProxyServerSettings';
import { PLATFORMS_ENDPOINT, STS_ENDPOINT } from '../../../constants';
import mapPlatformsToStringTemplate from '../../../util/mapPlatformsToStringTemplate';

const ProxyServerSettingsRoute = () => {
  const ky = useOkapiKy();
  const callout = useCallout();

  const queryClient = useQueryClient();

  const sendCallout = (operation, outcome, error = '') => {
    callout.sendCallout({
      type: outcome,
      message: <FormattedMessage id={`ui-local-kb-admin.settings.externalDataSources.callout.${operation}.${outcome}`} values={{ error }} />,
      timeout: error ? 0 : undefined, // Don't autohide callouts with a specified error message.
    });
  };

  // STS QUERY PARAMS
  const STSParams = useMemo(() => (
    generateKiwtQueryParams(
      {
        filters: [{ path: 'context.value', value: 'urlproxier' }],
        sort: [{ path: 'name' }]
      },
      {}
    )
  ), []);

  const { items: stringTemplates } = useParallelBatchFetch({
    generateQueryKey: ({ offset }) => ['ERM', 'STs', STSParams, offset, STS_ENDPOINT],
    endpoint: STS_ENDPOINT,
  });

  // Batch fetch platforms (Up to 1000)
  const {
    items: platforms
  } = useParallelBatchFetch({
    endpoint: PLATFORMS_ENDPOINT,
    generateQueryKey: ({ offset }) => ['ERM', 'Platforms', PLATFORMS_ENDPOINT, offset],
  });

  const { mutateAsync: postTemplate } = useMutation(
    ['ERM', 'STs', 'POST'],
    (payload) => ky.post(STS_ENDPOINT, { json: payload }).json()
      .then(p => {
        queryClient.invalidateQueries(['ERM', 'STs']);
        return p; // Return promise for promise chain
      })
  );

  const { mutateAsync: putTemplate } = useMutation(
    ['ERM', 'STs', 'PUT'],
    (payload) => ky.put(`${STS_ENDPOINT}/${payload.id}`, { json: payload }).json()
      .then(p => {
        queryClient.invalidateQueries(['ERM', 'STs']);
        return p; // Return promise for promise chain
      })
  );

  const { mutateAsync: deleteTemplate } = useMutation(
    ['ERM', 'STs', 'DELETE'],
    (id) => ky.delete(`${STS_ENDPOINT}/${id}`).json()
  );

  const mapPlatforms = () => {
    return cloneDeep(stringTemplates).map(stringTemplate => mapPlatformsToStringTemplate(stringTemplate, platforms));
  };

  const handleSave = (template, onSuccessFunc) => {
    let promise;
    const { idScopes = [] } = template;
    const idScopeValues = isEmpty(idScopes) ? [''] : idScopes.map(ids => ids.value); // fix logic once backend issue with [''] is fixed in the toolkit

    const templatePayload = { ...template, idScopes: idScopeValues, 'context': 'urlProxier' };
    if (template?.id) {
      promise = putTemplate(templatePayload);
    } else {
      promise = postTemplate(templatePayload);
    }

    return promise
      .then(p => {
        sendCallout('save', 'success');
        queryClient.invalidateQueries(['ERM', 'STs']);
        return p;
      })
      .then(onSuccessFunc)
      .catch(error => {
        // Nested promise chain isn't ideal, but we need it here since response JSONification might fail
        error.response.json()
          .then(errResp => {
            const { errors } = errResp;
            sendCallout('save', 'error', errors?.[0]?.message);
          })
          .catch(() => {
            sendCallout('save', 'error');
          });
      });
  };

  const handleDelete = (id) => {
    return deleteTemplate(id)
      .then(() => {
        sendCallout('delete', 'success');
        queryClient.invalidateQueries(['ERM', 'STs']);
      })
      .catch(error => {
        // Attempt to show an error message if we got JSON back with a message.
        // If json()ification fails, show the generic error callout.
        if (error?.message) {
          sendCallout('delete', 'error', error.message);
        } else {
          sendCallout('delete', 'error');
        }
      });
  };

  return (
    <ProxyServerSettings
      onDelete={handleDelete}
      onSubmit={handleSave}
      platforms={platforms}
      stringTemplates={mapPlatforms()}
    />
  );
};

export default ProxyServerSettingsRoute;
