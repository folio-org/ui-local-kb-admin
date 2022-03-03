import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import SafeHTMLMessage from '@folio/react-intl-safe-html';
import { Field } from 'react-final-form';

import { requiredValidator } from '@folio/stripes-erm-components';

import {
  Checkbox,
  Col,
  MessageBanner,
  Row,
  TextField
} from '@folio/stripes/components';

export default class KbartFields extends React.Component {
  static propTypes = {
    localKB: PropTypes.shape({
      trustedSourceTI: PropTypes.bool,
    }),
  }

  render() {
    const { localKB } = this.props;
    return (
      <>
        <MessageBanner>
          <SafeHTMLMessage id="ui-local-kb-admin.job.sourceReferenceWarning" />
        </MessageBanner>
        <Field
          autoFocus
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
        <Field
          component={Checkbox}
          data-test-field-trusted-source-ti
          id="create-kbart-job-trustedSourceTI"
          initialValue={localKB.trustedSourceTI}
          label={<FormattedMessage id="ui-local-kb-admin.job.trustedSourceTI" />}
          name="trustedSourceTI"
          required
          type="checkbox"
          validate={requiredValidator}
        />
      </>
    );
  }
}
