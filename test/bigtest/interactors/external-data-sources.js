import {
  interactor,
  clickable,
  collection,
  count,
  fillable,
  focusable,
  isPresent,
  property,
  selectable,
} from '@bigtest/interactor';
import KeyValueInteractor from '@folio/stripes-components/lib/KeyValue/tests/interactor'; // eslint-disable-line

@interactor class ConfirmationModalInteractor {
  isDeleteConfirmationButtonPresent = isPresent('[data-test-confirmation-modal-confirm-button]')
  clickConfirmDeleteButton = clickable('[data-test-confirmation-modal-confirm-button]')
}

@interactor class ExternalDataSourceViewInteractor {
  isDeleteButtonPresent = isPresent('[data-test-external-data-source-delete]');
  isEditButtonPresent = isPresent('[data-test-external-data-source-edit]');

  clickDeleteButton = clickable('[data-test-external-data-source-delete]');
  clickEditButton = clickable('[data-test-external-data-source-edit]');

  isNamePresent = isPresent('[data-test-external-data-source-name]');
  isTypePresent = isPresent('[data-test-external-data-source-type]');
  isRecordTypePresent = isPresent('[data-test-external-data-source-recordtype]');
  isURIPresent = isPresent('[data-test-external-data-source-uri]');
  isActivePresent = isPresent('[data-test-external-data-source-isactive]');
  isTrustedSourceTIPresent = isPresent('[data-test-external-data-source-trusted-source-ti]');
  isSupportsHarvestingPresent = isPresent('[data-test-external-data-source-supportsharvesting]');
  isActivationEnabledPresent = isPresent('[data-test-external-data-source-activationenabled]');
  isListPrefixPresent = isPresent('[data-test-external-data-source-listprefix]');
  isFullPrefixPresent = isPresent('[data-test-external-data-source-fullprefix]');
  isPrincipalPresent = isPresent('[data-test-external-data-source-principal]');
  isCredentialsPresent = isPresent('[data-test-external-data-source-credentials]');

  name = new KeyValueInteractor('[data-test-external-data-source-name]');
  type = new KeyValueInteractor('[data-test-external-data-source-type]');
  recordType = new KeyValueInteractor('[data-test-external-data-source-recordtype]');
  uri = new KeyValueInteractor('[data-test-external-data-source-uri]');
  isActive = new KeyValueInteractor('[data-test-external-data-source-isactive]');
  trustedSourceTI = new KeyValueInteractor('[data-test-external-data-source-trusted-source-ti]');
  isSupportsHarvesting = new KeyValueInteractor('[data-test-external-data-source-supportsharvesting]');
  isActivationEnabled = new KeyValueInteractor('[data-test-external-data-source-activationenabled]');
  listPrefix = new KeyValueInteractor('[data-test-external-data-source-listprefix]');
  fullPrefix = new KeyValueInteractor('[data-test-external-data-source-fullprefix]');
  principal = new KeyValueInteractor('[data-test-external-data-source-principal]');
  credentials = new KeyValueInteractor('[data-test-external-data-source-credentials]');

  confirmation = new ConfirmationModalInteractor(['data-test-confirmationModal']);
}

@interactor class ExternalDataSourceEditInteractor {
  isSaveButtonPresent = isPresent('[data-test-external-data-source-save]');
  isCancelButtonPresent = isPresent('[data-test-external-data-source-cancel]');

  clickSaveButton = clickable('[data-test-external-data-source-save]');
  clickCancelButton = clickable('[data-test-external-data-source-cancel]');

  editName = fillable('[data-test-external-data-source-name-edit]');
  editURI = fillable('[data-test-external-data-source-uri]');
  editType = selectable('[data-test-external-data-source-type-edit]');
  editRecordType = selectable('[data-test-external-data-source-record-type-edit]');
  editIsActive = clickable('[data-test-external-data-source-is-active-edit]');
  editSupportsHarvesting = clickable('[data-test-external-data-source-supports-harvesting-edit]');
  editActivationEnabled = clickable('[data-test-external-data-source-activation-enabled-edit]');
  editTrustedSourceTI = clickable('[data-test-external-data-source-trusted-source-ti-edit]');

  isNameFieldDisabled = property('[data-test-external-data-source-name-edit]', 'disabled');
  isURIFieldDisabled = property('[data-test-external-data-source-uri]', 'disabled');
  isTypeFieldDisabled = property('[data-test-external-data-source-type-edit]', 'disabled');
  isRecordTypeFieldDisabled = property('[data-test-external-data-source-record-type-edit]', 'disabled');
  isIsActiveFieldDisabled = property('[data-test-external-data-source-is-active-edit]', 'disabled');
  isSupportsHarvestingFieldDisabled = property('[data-test-external-data-source-supports-harvesting-edit]', 'disabled');
  isActivationEnabledFieldDisabled = property('[data-test-external-data-source-activation-enabled-edit]', 'disabled');
  isTrustedSourceTIFieldDisabled = property('[data-test-external-data-source-trusted-source-ti-edit]', 'disabled');
}

@interactor class ExternalDataSourcesListInteractor {
  size = count('[data-test-external-data-source-view]');
  items = collection('[data-test-external-data-source-view]', ExternalDataSourceViewInteractor);
  itemsEdit = collection('[data-test-external-data-source-edit]', ExternalDataSourceEditInteractor);
}

export default @interactor class ExternalDataSourcesInteractor {
  isFormPresent = isPresent('[data-test-external-data-sources]');
  externalDataSourceList = new ExternalDataSourcesListInteractor();
  clickNewButton = clickable('[data-test-external-data-source-new]')
}
