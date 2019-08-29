import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import { FileUploaderField } from '@folio/stripes-erm-components';
import { AppIcon, TitleManager } from '@folio/stripes/core';
import stripesForm from '@folio/stripes/form';

import {
  Button,
  IconButton,
  Pane,
  PaneMenu,
  Paneset,
} from '@folio/stripes/components';

import css from './JobForm.css';

class JobForm extends React.Component {
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

  renderLastMenu() {
    return (
      <PaneMenu>
        <Button
          type="submit"
          disabled={this.props.pristine || this.props.submitting}
          onClick={this.props.handleSubmit}
          buttonStyle="primary paneHeaderNewButton"
          marginBottom0
        >
          <FormattedMessage id="stripes-components.saveAndClose" />
        </Button>
      </PaneMenu>
    );
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
              id="pane-job-form"
              firstMenu={this.renderFirstMenu()}
              lastMenu={this.renderLastMenu()}
              paneTitle={<FormattedMessage id="ui-local-kb-admin.job.newJob" />}
            >
              <TitleManager record={create}>
                <form>
                  <div className={css.jobForm}>
                    <Field
                      component={FileUploaderField}
                      data-test-document-field-file
                      id="fileUploadId"
                      label={<FormattedMessage id="stripes-erm-components.doc.file" />}
                      name="fileUpload"
                      onDownloadFile={onDownloadFile}
                      onUploadFile={onUploadFile}
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

export default stripesForm({
  form: 'JobForm',
  navigationCheck: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(JobForm);
