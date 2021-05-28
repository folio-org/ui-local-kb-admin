import React from 'react';

const setUpRegistry = (registry) => {
  // Jobs Resource
  const jobReg = registry.registerResource('job');
  jobReg.addViewAll('/local-kb-admin');
  jobReg.addViewTemplate(job => `/local-kb-admin/${job.id}`);
};

export default setUpRegistry;
