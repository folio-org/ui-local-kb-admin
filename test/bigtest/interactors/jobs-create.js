import {
  clickable,
  interactor,
  isPresent,
  is,
  text
} from '@bigtest/interactor';

@interactor class Button {
  isDisabled = is('[disabled]');
  click = clickable();

  whenEnabled() {
    return this.when(() => !this.isDisabled);
  }
}

export default @interactor class JobsCreate {
  isFileUploaderPresent = isPresent('[data-test-document-field-file]');
  saveButton = new Button('[data-test-save-button]');
  closeButton = clickable('#close-job-form-button');
  isJobsPane = isPresent('[data-test-localkbadmin]');
  errorText = text('[data-test-error-msg]');
}
