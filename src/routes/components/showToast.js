
import React from 'react';
import SafeHTMLMessage from '@folio/react-intl-safe-html';

export default function showToast(messageId, jobClass, messageType = 'success', values = {}) {
  let classMessageId = messageId;
  if (jobClass !== '') {
    classMessageId = messageId.concat(`.${jobClass}`);
  }
  return ({
    message: <SafeHTMLMessage id={classMessageId} values={values} />,
    type: messageType,
  });
}
