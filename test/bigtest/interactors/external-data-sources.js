import {
  interactor,
  clickable,
  collection,
  count,
  fillable,
  isPresent,
  selectable,
} from '@bigtest/interactor';
import KeyValueInteractor from '@folio/stripes-components/lib/KeyValue/tests/interactor'; // eslint-disable-line

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
  isSupportsHarvesting = new KeyValueInteractor('[data-test-external-data-source-supportsharvesting]');
  isActivationEnabled = new KeyValueInteractor('[data-test-external-data-source-activationenabled]');
  listPrefix = new KeyValueInteractor('[data-test-external-data-source-listprefix]');
  fullPrefix = new KeyValueInteractor('[data-test-external-data-source-fullprefix]');
  principal = new KeyValueInteractor('[data-test-external-data-source-principal]');
  credentials = new KeyValueInteractor('[data-test-external-data-source-credentials]');
}

@interactor class ExternalDataSourceEditInteractor {
  isSaveButtonPresent = isPresent('[data-test-external-data-source-save]');
  isCancelButtonPresent = isPresent('[data-test-external-data-source-cancel]');

  clickSaveButton = clickable('[data-test-external-data-source-save]');
  clickCancelButton = clickable('[data-test-external-data-source-cancel]');

  editName = fillable('[data-test-external-data-source-name-edit]');
  editURI = fillable('[data-test-external-data-source-URI]');
  editType = selectable('[data-test-external-data-source-type-edit]');
  editRecordType = selectable('[data-test-external-data-source-record-type-edit]');
  editIsActive = clickable('[data-test-external-data-source-is-active-edit]');
  editSupportsHarvesting = clickable('[data-test-external-data-source-supports-harvesting-edit]');
  editActivationEnabled = clickable('[data-test-external-data-source-activation-enabled-edit]');
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
