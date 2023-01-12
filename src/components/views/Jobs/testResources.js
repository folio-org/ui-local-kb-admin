const data = {
  'jobs': [{
    'id': '5b0fade5-3b49-4fcc-b127-fb103b900e67',
    'dateCreated': 1670579294659,
    'ended': 1670579299710,
    'result': {
      'id': '2c91809c84f1fd4b0184f205302f003b',
      'value': 'success',
      'label': 'Success'
    },
    'name': 'Scheduled Package Ingest Job 2022-12-09T09:48:14.657389Z',
    'started': 1670579299703,
    'status': {
      'id': '2c91809c84f1fd4b0184f20530520042',
      'value': 'ended',
      'label': 'Ended'
    },
    'class': 'org.olf.general.jobs.PackageIngestJob',
    'fullLogCount': 0,
    'errorLogCount': 0,
    'infoLogCount': 0
  },
  {
    'id': '68dd9535-40d9-48be-acf3-9f152df20f96',
    'dateCreated': 1670575694648,
    'ended': 1670575738817,
    'result': {
      'id': '2c91809c84f1fd4b0184f205302f003b',
      'value': 'success',
      'label': 'Success'
    },
    'name': 'Scheduled Package Ingest Job 2022-12-09T08:48:14.646665Z',
    'started': 1670575699677,
    'status': {
      'id': '2c91809c84f1fd4b0184f20530520042',
      'value': 'ended',
      'label': 'Ended'
    },
    'class': 'org.olf.general.jobs.PackageIngestJob',
    'fullLogCount': 8,
    'errorLogCount': 0,
    'infoLogCount': 8
  },
  {
    'id': 'd37784cf-5922-4545-ba7f-65365e5bd29f',
    'dateCreated': 1670572094637,
    'ended': 1670572099652,
    'result': {
      'id': '2c91809c84f1fd4b0184f205302f003b',
      'value': 'success',
      'label': 'Success'
    },
    'name': 'Scheduled Package Ingest Job 2022-12-09T07:48:14.634957Z',
    'started': 1670572099645,
    'status': {
      'id': '2c91809c84f1fd4b0184f20530520042',
      'value': 'ended',
      'label': 'Ended'
    },
    'class': 'org.olf.general.jobs.PackageIngestJob',
    'fullLogCount': 0,
    'errorLogCount': 0,
    'infoLogCount': 0
  },
  {
    'id': '8bac5187-dda3-4f40-b78f-f20c9046e2c3',
    'dateCreated': 1670568494626,
    'ended': 1670568500157,
    'result': {
      'id': '2c91809c84f1fd4b0184f205302f003b',
      'value': 'success',
      'label': 'Success'
    },
    'name': 'Scheduled Package Ingest Job 2022-12-09T06:48:14.623914Z',
    'started': 1670568499611,
    'status': {
      'id': '2c91809c84f1fd4b0184f20530520042',
      'value': 'ended',
      'label': 'Ended'
    },
    'class': 'org.olf.general.jobs.PackageIngestJob',
    'fullLogCount': 1,
    'errorLogCount': 0,
    'infoLogCount': 1
  },
  ],
  'resultValues': [{
    'id': '2c91809c84f1fd4b0184f205303b003d',
    'value': 'failure',
    'label': 'Failure'
  },
  {
    'id': '2c91809c84f1fd4b0184f2053041003e',
    'value': 'interrupted',
    'label': 'Interrupted'
  },
  {
    'id': '2c91809c84f1fd4b0184f2053035003c',
    'value': 'partial_success',
    'label': 'Partial success'
  },
  {
    'id': '2c91809c84f1fd4b0184f205302f003b',
    'value': 'success',
    'label': 'Success'
  }
  ],
  'statusValues': [{
    'id': '2c91809c84f1fd4b0184f20530520042',
    'value': 'ended',
    'label': 'Ended'
  },
  {
    'id': '2c91809c84f1fd4b0184f205304c0041',
    'value': 'in_progress',
    'label': 'In progress'
  },
  {
    'id': '2c91809c84f1fd4b0184f20530480040',
    'value': 'queued',
    'label': 'Queued'
  }
  ]
};

const searchString = '?sort=-started';

export { data, searchString };
