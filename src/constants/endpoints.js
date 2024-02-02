export const JOBS_BASE_ENDPOINT = 'erm/jobs';
export const JOB_ENDPOINT = (id) => `${JOBS_BASE_ENDPOINT}/${id}`;
export const JSON_IMPORT_ENDPOINT = `${JOBS_BASE_ENDPOINT}/packageImport`;
export const KBART_IMPORT_ENDPOINT = `${JOBS_BASE_ENDPOINT}/kbartImport`;

export const KBS_ENDPOINT = 'erm/kbs';
export const KB_ENDPOINT = (id) => `${KBS_ENDPOINT}/${id}`;
export const STS_ENDPOINT = 'erm/sts';
export const ST_ENDPOINT = (id) => `${STS_ENDPOINT}/${id}`;
export const PLATFORMS_ENDPOINT = 'erm/platforms';
export const PLATFORM_ENDPOINT = (id) => `${PLATFORMS_ENDPOINT}/${id}`;
export const REFDATA_ENDPOINT = 'erm/refdata';
