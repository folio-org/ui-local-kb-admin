import {
  clickable,
  interactor,
  isPresent,
  is
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
}
