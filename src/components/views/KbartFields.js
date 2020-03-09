import React from 'react';
import { FormattedMessage } from 'react-intl';
import SafeHTMLMessage from '@folio/react-intl-safe-html';
import { Field } from 'react-final-form';

import { requiredValidator } from '@folio/stripes-erm-components';

import {
  Col,
  MessageBanner,
  Row,
  TextField,
} from '@folio/stripes/components';

export default class KbartFields extends React.Component {
  render() {
    return (
      <>
        <MessageBanner>
          <SafeHTMLMessage id="ui-local-kb-admin.job.sourceReferenceWarning" />
        </MessageBanner>
        <Field
          component={TextField}
          data-test-field-package-name
          label={<FormattedMessage id="ui-local-kb-admin.job.packageName" />}
          name="packageName"
          required
          validate={requiredValidator}
        />
        <Row>
          <Col xs={4}>
            <Field
              component={TextField}
              data-test-field-package-source
              label={<FormattedMessage id="ui-local-kb-admin.job.packageSource" />}
              name="packageSource"
              required
              validate={requiredValidator}
            />
          </Col>
          <Col xs={8}>
            <Field
              component={TextField}
              data-test-field-package-reference
              label={<FormattedMessage id="ui-local-kb-admin.job.packageReference" />}
              name="packageReference"
              required
              validate={requiredValidator}
            />
          </Col>
        </Row>
        <Field
          component={TextField}
          data-test-field-package-provider
          label={<FormattedMessage id="ui-local-kb-admin.job.packageProvider" />}
          name="packageProvider"
        />
      </>
    );
  }
}
