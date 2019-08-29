import React from 'react';
import { FormattedMessage } from 'react-intl';

const required = value => (
  value === undefined ? <FormattedMessage id="stripes-core.label.missingRequiredField" /> : undefined
);

const isURLValid = (value) => {
  const REGEXP_URL = new RegExp('^$|([Hh][Tt][Tt][Pp]|[Ff][Tt][Pp])([Ss])?://.+$');
  const isTrue = REGEXP_URL.test(value);

  if (value === undefined || isTrue) return undefined;

  return <FormattedMessage id="ui-local-kb-admin.valid.isURLValid" />;
};

export { isURLValid, required };
