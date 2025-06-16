import { useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';

import { generateKiwtQueryParams, useKiwtSASQuery, usePrevNextPagination } from '@k-int/stripes-kint-components';

import { useOkapiKy } from '@folio/stripes/core';
import {
  getRefdataValuesByDesc,
  useInfiniteFetch,
} from '@folio/stripes-erm-components';

import View from '../../components/views/Jobs';

import { JOBS_BASE_ENDPOINT, resultCount } from '../../constants';
import { useLocalKBAdminRefdata } from '../../hooks';

const [
  RESULT,
  STATUS,
] = [
  'PersistentJob.Result',
  'PersistentJob.Status',
];

const JobsRoute = ({
  children,
  location,
  match
}) => {
  const searchField = useRef();
  const ky = useOkapiKy();

  const { query, querySetter, queryGetter } = useKiwtSASQuery();

  const refdata = useLocalKBAdminRefdata({
    desc: [
      RESULT,
      STATUS,
    ]
  });

  useEffect(() => {
    if (searchField.current) {
      searchField.current.focus();
    }
  }, []); // This isn't particularly great, but in the interests of saving time migrating, it will have to do

  const { currentPage } = usePrevNextPagination();

  const jobsQueryParams = useMemo(() => (
    generateKiwtQueryParams({
      searchKey: 'name',
      filterConfig: [{
        name: 'class',
        values: [
          { name: 'Package harvester', value: 'org.olf.general.jobs.PackageIngestJob' },
          { name: 'Title harvester', value: 'org.olf.general.jobs.TitleIngestJob' },
          { name: 'File import', value: 'org.olf.general.jobs.PackageImportJob' },
          { name: 'Identifier reassignment', value: 'org.olf.general.jobs.IdentifierReassignmentJob' },
          { name: 'Resource rematch', value: 'org.olf.general.jobs.ResourceRematchJob' },
          { name: 'Naive match key assignment', value: 'org.olf.general.jobs.NaiveMatchKeyAssignmentJob' }
        ],
      }],
      page: currentPage,
      filterKeys: {
        status: 'status.value',
        result: 'result.value'
      },
      /* ComparisonJobs are handled in ui-erm-comparisons */
      filters: [
        {
          path: 'class',
          comparator: '!=',
          value: 'org.olf.general.jobs.ComparisonJob'
        }
      ],
      perPage: resultCount.RESULT_COUNT_INCREMENT_MEDIUM
    }, (query ?? {}))
  ), [currentPage, query]);
  const {
    // data: { results: jobs = [], totalRecords: jobsCount = 0 } = {},
    infiniteQueryObject: {
      error: jobsError,
      fetchNextPage: fetchNextJobsPage,
      isLoading: areJobsLoading,
      isLoading: areEresourcesLoading,
      isError: isJobsError
    },
    results: jobs = [],
    total: jobsCount = 0
  } = useInfiniteFetch(
    ['ERM', 'Jobs', jobsQueryParams, JOBS_BASE_ENDPOINT],
    () => {
      const params = [...jobsQueryParams];
      return ky.get(`${JOBS_BASE_ENDPOINT}?${params?.join('&')}`).json();
    }
  );

  return (
    <View
      data={{
        jobs,
        resultValues: getRefdataValuesByDesc(refdata, RESULT),
        statusValues: getRefdataValuesByDesc(refdata, STATUS),
      }}
      onNeedMoreData={(_askAmount, index) => fetchNextJobsPage({ pageParam: index })}
      queryGetter={queryGetter}
      querySetter={querySetter}
      searchString={location.search}
      selectedRecordId={match.params.id}
      source={{ // Fake source from useQuery return values;
        totalCount: () => jobsCount,
        loaded: () => !areEresourcesLoading,
        pending: () => areJobsLoading,
        failure: () => isJobsError,
        failureMessage: () => jobsError.message
      }}
    >
      {children}
    </View>
  );
};

JobsRoute.propTypes = {
  children: PropTypes.node,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default JobsRoute;
