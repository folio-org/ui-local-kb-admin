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
          data-test-field-package-name
          component={TextField}
          name="packageName"
          label={<FormattedMessage id="ui-local-kb-admin.job.packageName" />}
          required
          validate={requiredValidator}
        />
        <Row>
          <Col xs={4}>
            <Field
              data-test-field-package-source
              component={TextField}
              name="packageSource"
              label={<FormattedMessage id="ui-local-kb-admin.job.packageSource" />}
              required
              validate={requiredValidator}
            />
          </Col>
          <Col xs={8}>
            <Field
              data-test-field-package-reference
              component={TextField}
              name="packageReference"
              label={<FormattedMessage id="ui-local-kb-admin.job.packageReference" />}
              required
              validate={requiredValidator}
            />
          </Col>
        </Row>
        <Field
          data-test-field-package-provider
          component={TextField}
          name="packageProvider"
          label={<FormattedMessage id="ui-local-kb-admin.job.packageProvider" />}
        />
      </>
    );
  }
}
