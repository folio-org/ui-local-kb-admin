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
  isPackageNameFieldPresent = isPresent('[data-test-field-package-name]');
  isPackageSourceFieldPresent = isPresent('[data-test-field-package-source]');
  isPackageReferenceFieldPresent = isPresent('[data-test-field-package-reference]');
  isPackageProviderFieldPresent = isPresent('[data-test-field-package-provider]');
  saveButton = new Button('[data-test-save-button]');
  closeButton = clickable('#close-job-form-button');
  isJobsPane = isPresent('[data-test-localkbadmin]');
  errorText = text('[data-test-error-msg]');
}
