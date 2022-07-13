import {
  clickable,
  fillable,
  interactor,
  isPresent,
  property,
  text
} from '@interactors/html';

@interactor class Button {
  isDisabled = property('disabled');
  click = clickable();

  whenEnabled() {
    return this.when(() => !this.isDisabled);
  }
}

export default @interactor class JobsCreate {
  isFileUploaderPresent = isPresent('[data-test-document-field-file]');
  isPackageNameFieldPresent = isPresent('[data-test-field-package-name]');
  fillPackageName = fillable('[data-test-field-package-name]');
  isPackageSourceFieldPresent = isPresent('[data-test-field-package-source]');
  fillPackageSource = fillable('[data-test-field-package-source]');
  isPackageReferenceFieldPresent = isPresent('[data-test-field-package-reference]');
  fillPackageReference = fillable('[data-test-field-package-reference]');
  isPackageProviderFieldPresent = isPresent('[data-test-field-package-provider]');
  fillPackageProvider = fillable('[data-test-field-package-provider]');
  isTrustedSourceTIFieldPresent = isPresent('[data-test-field-trusted-source-ti]');
  fillTrustedSourceTI = clickable('[data-test-field-trusted-source-ti]');
  saveButton = new Button('[data-test-save-button]');
  closeButton = clickable('#close-job-form-button');
  confirmCloseButton = clickable('[data-test-confirmation-modal-cancel-button]');
  isJobsPane = isPresent('[data-test-localkbadmin]');
  errorText = text('[data-test-error-msg]');
}
