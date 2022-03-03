const activeFilters = {
  'status': [],
  'result': [],
  'class': []
};

const data = {
  'statusValues': [
    {
      'id': 'c2852a2226d11e472d881fa19cb9d715',
      'value': 'queued',
      'label': 'Queued'
    },
    {
      'id': '2c91809c7cd92b6b017cd932c66d0038',
      'value': 'in_progress',
      'label': 'In progress'
    },
    {
      'id': '2c91809c7cd92b6b017cd932c6730039',
      'value': 'ended',
      'label': 'Ended'
    }
  ],
  'resultValues': [
    {
      'id': '2c91809c7cd92b6b017cd932c6350032',
      'value': 'success',
      'label': 'Success'
    },
    {
      'id': '2c91809c7cd92b6b017cd932c6390033',
      'value': 'partial_success',
      'label': 'Partial success'
    },
    {
      'id': '2c91809c7cd92b6b017cd932c63f0034',
      'value': 'failure',
      'label': 'Failure'
    },
    {
      'id': '68e1bb44-0b36-453d-b336-1127990d02e2',
      'value': 'interrupted',
      'label': 'Interrupted'
    }
  ]
};

export {
  activeFilters,
  data
};
