const setUpRegistry = (registry) => {
  // Jobs Resource
  const jobReg = registry.registerResource('job');
  jobReg.setViewResources('/local-kb-admin');
  jobReg.setViewResource(job => `/local-kb-admin/${job.id}`);
};

export default setUpRegistry;
