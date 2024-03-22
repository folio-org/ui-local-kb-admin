import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { handleSaveKeyCommand, FileUploaderField, useFileHandlers } from '@folio/stripes-erm-components';
import { AppIcon, TitleManager } from '@folio/stripes/core';
import stripesFinalForm from '@folio/stripes/final-form';

import {
  Button,
  HasCommand,
  IconButton,
  Pane,
  PaneFooter,
  PaneMenu,
  Paneset,
  checkScope
} from '@folio/stripes/components';

import KbartFields from '../KbartFields';
import css from './JobForm.css';

const JobForm = (props) => {
  const {
    format,
    handlers: {
      onClose,
    },
    handleSubmit,
    localKB,
    pristine,
    submitting
  } = props;

  const { handleDownloadFile, handleUploadFile } = useFileHandlers('erm/files');

  const renderPaneFooter = () => {
    const startButton = (
      <Button
        buttonStyle="default mega"
        id="clickable-cancel"
        marginBottom0
        onClick={onClose}
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
        renderEnd={endButton}
        renderStart={startButton}
      />
    );
  };

  const renderFirstMenu = () => {
    return (
      <PaneMenu>
        <FormattedMessage id="ui-local-kb-admin.job.close">
          {([ariaLabel]) => (
            <IconButton
              aria-label={ariaLabel}
              icon="times"
              id="close-job-form-button"
              onClick={onClose}
            />
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  };

  const validateUploadFile = (value) => {
    if (value === null) return <FormattedMessage id="ui-local-kb-admin.error.uploadFile" />;
    return undefined;
  };

  const shortcuts = [
    {
      name: 'save',
      handler: (e) => handleSaveKeyCommand(e, props),
    }
  ];

  return (
    <HasCommand
      commands={shortcuts}
      isWithinScope={checkScope}
      scope={document.body}
    >
      <>
        <Paneset>
          <FormattedMessage id="ui-local-kb-admin.create">
            {create => (
              <Pane
                appIcon={<AppIcon app="local-kb-admin" />}
                defaultWidth="100%"
                firstMenu={renderFirstMenu()}
                footer={renderPaneFooter()}
                id="pane-job-form"
                paneTitle={<FormattedMessage id={`ui-local-kb-admin.job.new${format}Job`} />}
              >
                <TitleManager record={create?.[0]}>
                  <form>
                    <div className={css.jobForm}>
                      {format === 'KBART' && <KbartFields localKB={localKB} /> }
                      <Field
                        component={FileUploaderField}
                        data-test-document-field-file
                        id="fileUploadId"
                        label={<FormattedMessage id="stripes-erm-components.doc.file" />}
                        name="fileUpload"
                        onDownloadFile={handleDownloadFile}
                        onUploadFile={handleUploadFile}
                        required
                        validate={validateUploadFile}
                      />
                    </div>
                  </form>
                </TitleManager>
              </Pane>
            )}
          </FormattedMessage>
        </Paneset>
      </>
    </HasCommand>
  );
};

JobForm.propTypes = {
  format: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
  }),
  localKB: PropTypes.shape({
    trustedSourceTI: PropTypes.bool,
  }),
  pristine: PropTypes.bool,
  submitting: PropTypes.bool
};

export default stripesFinalForm({
  navigationCheck: true,
  keepDirtyOnReinitialize: true,
})(JobForm);
