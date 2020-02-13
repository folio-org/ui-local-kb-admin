import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FileUploaderField } from '@folio/stripes-erm-components';
import { AppIcon, TitleManager } from '@folio/stripes/core';
import stripesFinalForm from '@folio/stripes/final-form';

import {
  Button,
  Col,
  IconButton,
  Pane,
  PaneFooter,
  PaneMenu,
  Paneset,
  Row,
  TextField,
} from '@folio/stripes/components';

import { required } from '../../util/validators';

import css from './JobForm.css';

class JobFormKBART extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handlers: PropTypes.shape({
      onClose: PropTypes.func.isRequired,
      onDownloadFile: PropTypes.func.isRequired,
      onUploadFile: PropTypes.func.isRequired,
    }),
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
  }

  renderPaneFooter() {
    const { handlers, handleSubmit, pristine, submitting } = this.props;
    const startButton = (
      <Button
        buttonStyle="default mega"
        id="clickable-cancel"
        marginBottom0
        onClick={handlers.onClose}
      >
        <FormattedMessage id="stripes-components.cancel" />
      </Button>
    );

    const endButton = (
      <Button
        buttonStyle="primary mega"
        data-test-save-button
        disabled={pristine || submitting}
        marginBottom0
        onClick={handleSubmit}
        type="submit"
      >
        <FormattedMessage id="stripes-components.saveAndClose" />
      </Button>
    );

    return (
      <PaneFooter
        renderStart={startButton}
        renderEnd={endButton}
      />
    );
  }

  renderFirstMenu() {
    return (
      <PaneMenu>
        <FormattedMessage id="ui-local-kb-admin.job.close">
          {ariaLabel => (
            <IconButton
              icon="times"
              id="close-job-form-button"
              onClick={this.props.handlers.onClose}
              aria-label={ariaLabel}
            />
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  }

  validateUploadFile(value) {
    if (value === null) return <FormattedMessage id="ui-local-kb-admin.error.uploadFile" />;
    return undefined;
  }

  render() {
    const { handlers: { onDownloadFile, onUploadFile } } = this.props;
    return (
      <Paneset>
        <FormattedMessage id="ui-local-kb-admin.create">
          {create => (
            <Pane
              appIcon={<AppIcon app="local-kb-admin" />}
              defaultWidth="100%"
              footer={this.renderPaneFooter()}
              id="pane-job-form"
              firstMenu={this.renderFirstMenu()}
              paneTitle={<FormattedMessage id="ui-local-kb-admin.job.newKBARTJob" />}
            >
              <TitleManager record={create}>
                <form>
                  <div className={css.jobForm}>
                    <Row>
                      <Col xs={12}>
                        <Field
                          data-test-field-package-name
                          component={TextField}
                          name="packageName"
                          label={<FormattedMessage id="ui-local-kb-admin.job.packageName" />}
                          required
                          validate={required}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={4}>
                        <Field
                          data-test-field-package-source
                          component={TextField}
                          name="packageSource"
                          label={<FormattedMessage id="ui-local-kb-admin.job.packageSource" />}
                          required
                          validate={required}
                        />
                      </Col>
                      <Col xs={8}>
                        <Field
                          data-test-field-package-reference
                          component={TextField}
                          name="packageReference"
                          label={<FormattedMessage id="ui-local-kb-admin.job.packageReference" />}
                          required
                          validate={required}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}>
                        <Field
                          data-test-field-package-provider
                          component={TextField}
                          name="packageProvider"
                          label={<FormattedMessage id="ui-local-kb-admin.job.packageProvider" />}
                        />
                      </Col>
                    </Row>
                    <Field
                      component={FileUploaderField}
                      data-test-document-field-file
                      id="fileUploadId"
                      label={<FormattedMessage id="stripes-erm-components.doc.file" />}
                      name="fileUpload"
                      onDownloadFile={onDownloadFile}
                      onUploadFile={onUploadFile}
                      validate={this.validateUploadFile}
                    />
                  </div>
                </form>
              </TitleManager>
            </Pane>
          )}
        </FormattedMessage>
      </Paneset>
    );
  }
}

export default stripesFinalForm({
  navigationCheck: true,
  keepDirtyOnReinitialize: true,
})(JobFormKBART);
