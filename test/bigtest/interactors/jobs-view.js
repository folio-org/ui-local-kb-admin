import {
  interactor,
  isPresent,
  clickable,
  text,
} from '@bigtest/interactor';

@interactor class HeaderDropdown {
  click = clickable('button');
}

@interactor class ConfirmationModalInteractor {
  static defaultScope = '#delete-job-confirmation';
  cancel = clickable('[data-test-confirmation-modal-cancel-button]');
  confirm = clickable('[data-test-confirmation-modal-confirm-button]');
}

@interactor class HeaderDropdownMenu {
  isDeleteButtonPresent = isPresent('#clickable-dropdown-delete-job')
  clickDelete = clickable('#clickable-dropdown-delete-job');
}

export default @interactor class JobsView {
  static defaultScope = '[data-test-job-details]';

  headerTitle = text('[data-test-header-title]');

  isTitlePresent = isPresent('[data-test-job-name]');
  isStatusPresent = isPresent('[data-test-job-status]');
  isOutcomePresent = isPresent('[data-test-job-result]');
  isStartedPresent = isPresent('[data-test-job-started]');
  isEndedPresent = isPresent('[data-test-job-ended]');
  isSourcePresent = isPresent('[data-test-job-type]');
  isErrorLogsAccordionPresent = isPresent('#errorLogs');
  isInfoLogsAccordionPresent = isPresent('#infoLogs');

  title = text('[data-test-job-name]');
  status = text('[data-test-job-status]');
  outcome = text('[data-test-job-result]');
  started = text('[data-test-job-started]');
  ended = text('[data-test-job-ended]');
  source = text('[data-test-job-type]');

  headerDropdown = new HeaderDropdown('[class*=paneHeaderCenterInner---] [class*=dropdown---]');
  headerDropdownMenu = new HeaderDropdownMenu();
  confirmationModal = new ConfirmationModalInteractor();
}
