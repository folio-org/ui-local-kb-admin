
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { cloneDeep, isEmpty } from 'lodash';

import { useParallelBatchFetch } from '@folio/stripes-erm-components';
import { generateKiwtQueryParams } from '@k-int/stripes-kint-components';

import { useCallout, useOkapiKy } from '@folio/stripes/core';

import ProxyServerSettings from '../../components/ProxyServerSettingsConfig/ProxyServerSettings/ProxyServerSettings';
import { PLATFORMS_ENDPOINT, STS_ENDPOINT } from '../../../constants';

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

  const { data: { results: stringTemplates = [] } = {} } = useQuery(
    ['ERM', 'STs', STSParams, STS_ENDPOINT],
    () => ky.get(`${STS_ENDPOINT}?${STSParams?.join('&')}`).json()
  );

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
  );

  const { mutateAsync: putTemplate } = useMutation(
    ['ERM', 'STs', 'PUT'],
    (payload) => ky.put(`${STS_ENDPOINT}/${payload.id}`, { json: payload }).json()
  );

  const { mutateAsync: deleteTemplate } = useMutation(
    ['ERM', 'STs', 'PUT'],
    (id) => ky.delete(`${STS_ENDPOINT}/${id}`).json()
  );

  const getInitialValues = () => {
    return {
      stringTemplates: cloneDeep(stringTemplates).map(stringTemplate => {
        const { idScopes = [] } = stringTemplate;
        return { ...stringTemplate,
          ...{ idScopes: (idScopes.length === 1 && idScopes[0] === '') ? [] : // condition needs to be taken off once the bug in webtoolkit is fixed
            idScopes.map(
              id => {
                const platformName = platforms.find(platform => platform.id === id)?.name;
                return {
                  label: platformName,
                  value: id
                };
              }
            ) } };
      })
    };
  };

  const handleSave = (template) => {
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
      .then(() => {
        sendCallout('save', 'success');
        queryClient.invalidateQueries(['ERM', 'STs']);
      })
      .catch(error => {
        // Attempt to show an error message if we got JSON back with a message.
        // If json()ification fails, show the generic error callout.
        if (error?.message) {
          sendCallout('save', 'error', error.message);
        } else {
          sendCallout('save', 'error');
        }
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
      initialValues={getInitialValues()}
      onDelete={handleDelete}
      onSave={handleSave}
      onSubmit={handleSave}
      platforms={platforms}
      stringTemplates={stringTemplates}
    />
  );
};

export default ProxyServerSettingsRoute;
