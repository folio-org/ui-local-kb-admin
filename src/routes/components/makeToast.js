
import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function makeToast(messageId, jobClass, messageType = 'success', values = {}) {
  let classMessageId = messageId;
  if (jobClass !== '') {
    classMessageId = `${messageId}.${jobClass}`;
  }
  return ({
    message: <FormattedMessage id={classMessageId} values={values} />,
    type: messageType,
  });
}
