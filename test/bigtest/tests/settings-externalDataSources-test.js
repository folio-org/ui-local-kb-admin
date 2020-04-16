import { beforeEach, describe, it } from '@bigtest/mocha';

import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import ExternalDataSourcesInteractor from '../interactors/external-data-sources';

describe('External Data Source Settings', () => {
  setupApplication();
  const externaldatasources = new ExternalDataSourcesInteractor();

  const dataSource = {
    active: true,
    trustedSourceTI: true,
    activationEnabled: false,
    credentials: 'test credentials',
    name: 'test source',
    fullPrefix: 'test fullprefix',
    listPrefix: 'test listPrefix',
    principal: 'test principal',
    type: 'org.olf.kb.adapters.GOKbOAIAdapter',
    uri: 'http://abcd.com',
    supportsHarvesting: true,
  };

  describe('one external data source', () => {
    beforeEach(async function () {
      this.server.create('externalDataSource', dataSource);
      this.visit('/settings/local-kb-admin/external-data-sources');
    });

    describe('viewing the fetched data source', () => {
      it('renders the external data source', () => {
        expect(externaldatasources.isFormPresent).to.be.true;
      });

      it('renders the expected count of external data sources', () => {
        expect(externaldatasources.externalDataSourceList.size).to.equal(1);
      });

      it('renders the delete button', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isDeleteButtonPresent).to.be.true;
      });

      it('renders the edit button', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isEditButtonPresent).to.be.true;
      });

      it('renders the name Field', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isNamePresent).to.be.true;
      });

      it('renders the expected name', () => {
        expect(externaldatasources.externalDataSourceList.items(0).name.value.text).to.equal(dataSource.name);
      });

      it('renders the type Field', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isTypePresent).to.be.true;
      });

      it('renders the expected type', () => {
        expect(externaldatasources.externalDataSourceList.items(0).type.value.text).to.equal(dataSource.type);
      });

      it('renders the record type Field', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isRecordTypePresent).to.be.true;
      });

      it('renders the expected record type', () => {
        expect(externaldatasources.externalDataSourceList.items(0).recordType.value.text).to.equal('Package');
      });

      it('renders the URI Field', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isURIPresent).to.be.true;
      });

      it('renders the expected URI', () => {
        expect(externaldatasources.externalDataSourceList.items(0).uri.value.text).to.equal(dataSource.uri);
      });

      it('renders the isActive checkbox', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isActivePresent).to.be.true;
      });

      it('renders the expected isActive checkobx status', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isActive.value.text).to.equal('Yes');
      });

      it('renders the trustedSourceTI checkbox', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isTrustedSourceTIPresent).to.be.true;
      });

      it('renders the expected trustedSourceTI checkobx status', () => {
        expect(externaldatasources.externalDataSourceList.items(0).trustedSourceTI.value.text).to.equal('Yes');
      });

      it('renders the supportsHarvesting checkbox', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isSupportsHarvestingPresent).to.be.true;
      });

      it('renders the expected isSupportsHarvesting checkobx status', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isSupportsHarvesting.value.text).to.equal('Yes');
      });

      it('renders the activationEnabled checkbox', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isActivationEnabledPresent).to.be.true;
      });

      it('renders the expected isActivationEnabled checkobx status', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isActivationEnabled.value.text).to.equal('No');
      });

      it('renders the listPrefix Field', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isListPrefixPresent).to.be.true;
      });

      it('renders the expected listPrefix', () => {
        expect(externaldatasources.externalDataSourceList.items(0).listPrefix.value.text).to.equal(dataSource.listPrefix);
      });

      it('renders the fullPrefix Field', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isFullPrefixPresent).to.be.true;
      });

      it('renders the expected fullPrefix', () => {
        expect(externaldatasources.externalDataSourceList.items(0).fullPrefix.value.text).to.equal(dataSource.fullPrefix);
      });

      it('renders the principal Field', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isPrincipalPresent).to.be.true;
      });

      it('renders the expected principal', () => {
        expect(externaldatasources.externalDataSourceList.items(0).principal.value.text).to.equal(dataSource.principal);
      });

      it('renders the credentials Field', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isCredentialsPresent).to.be.true;
      });

      it('renders the expected credentials', () => {
        expect(externaldatasources.externalDataSourceList.items(0).credentials.value.text).to.equal(dataSource.credentials);
      });
    });
  });

  describe('readonly data source', () => {
    beforeEach(async function () {
      this.server.create('externalDataSource', { ...dataSource, readonly: true });
      this.visit('/settings/local-kb-admin/external-data-sources');
    });

    describe('viewing the data source', () => {
      it('renders the external data source', () => {
        expect(externaldatasources.isFormPresent).to.be.true;
      });

      it('renders the expected name', () => {
        expect(externaldatasources.externalDataSourceList.items(0).name.value.text).to.equal(dataSource.name);
      });

      it('does not render the delete button', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isDeleteButtonPresent).to.be.false;
      });

      it('renders the edit button', () => {
        expect(externaldatasources.externalDataSourceList.items(0).isEditButtonPresent).to.be.true;
      });

      describe('Editing readonly data source', () => {
        beforeEach(async function () {
          await externaldatasources.externalDataSourceList.items(0).clickEditButton();
        });

        it('should have disabled name field', () => {
          expect(externaldatasources.externalDataSourceList.itemsEdit(0).isNameFieldDisabled).to.be.true;
        });

        it('should have disabled URI field', () => {
          expect(externaldatasources.externalDataSourceList.itemsEdit(0).isURIFieldDisabled).to.be.true;
        });

        it('should have disabled type field', () => {
          expect(externaldatasources.externalDataSourceList.itemsEdit(0).isTypeFieldDisabled).to.be.true;
        });

        it('should have disabled recordType field', () => {
          expect(externaldatasources.externalDataSourceList.itemsEdit(0).isRecordTypeFieldDisabled).to.be.true;
        });

        it('should have disabled isActive field', () => {
          expect(externaldatasources.externalDataSourceList.itemsEdit(0).isIsActiveFieldDisabled).to.be.true;
        });

        it('should have disabled supportsHarvesting field', () => {
          expect(externaldatasources.externalDataSourceList.itemsEdit(0).isSupportsHarvestingFieldDisabled).to.be.true;
        });

        it('should have disabled activationEnabled field', () => {
          expect(externaldatasources.externalDataSourceList.itemsEdit(0).isActivationEnabledFieldDisabled).to.be.true;
        });

        it('should not have disabled trustedSourceTI field', () => {
          expect(externaldatasources.externalDataSourceList.itemsEdit(0).isTrustedSourceTIFieldDisabled).to.be.false;
        });
      });
    });
  });

  describe('Creating, editing and cancelling data source', () => {
    const name = 'aa';
    const type = 'org.olf.kb.adapters.GOKbOAIAdapter';
    const recordType = 'Package';
    const URI = 'http://abcd.com';
    const isActive = true;
    const trustedSourceTI = true;
    const supportsHarvesting = false;
    const activationEnabled = true;

    beforeEach(async function () {
      this.visit('/settings/local-kb-admin/external-data-sources');
      await externaldatasources.clickNewButton();
      await externaldatasources.whenFormLoaded();
      await externaldatasources.externalDataSourceList.itemsEdit(0).editName(name);
      await externaldatasources.externalDataSourceList.itemsEdit(0).editType(type);
      await externaldatasources.externalDataSourceList.itemsEdit(0).editRecordType(recordType);
      await externaldatasources.externalDataSourceList.itemsEdit(0).editURI(URI);
      await externaldatasources.externalDataSourceList.itemsEdit(0).editTrustedSourceTI(trustedSourceTI);
      await externaldatasources.externalDataSourceList.itemsEdit(0).clickSaveButton();
    });

    describe('creating a new data source', () => {
      beforeEach(async function () {
        await externaldatasources.clickNewButton();
        await new Promise(resolve => { setTimeout(resolve, 500); }); // Should be removed as a part of ERM-825
        await externaldatasources.externalDataSourceList.itemsEdit(0).editName(name);
        await externaldatasources.externalDataSourceList.itemsEdit(0).editType(type);
        await externaldatasources.externalDataSourceList.itemsEdit(0).editRecordType(recordType);
        await externaldatasources.externalDataSourceList.itemsEdit(0).editURI(URI);
        await externaldatasources.externalDataSourceList.itemsEdit(0).clickSaveButton();
      });

      it('should render the expected source', () => {
        expect(externaldatasources.externalDataSourceList.items(0).name.value.text).to.equal(name);
      });

      describe('edit', () => {
        const editedName = 'aa edited name';

        beforeEach(async function () {
          await externaldatasources.externalDataSourceList.items(0).clickEditButton();
          await externaldatasources.externalDataSourceList.itemsEdit(0).editName(editedName);
          await externaldatasources.externalDataSourceList.itemsEdit(0).editIsActive(isActive);
          await externaldatasources.externalDataSourceList.itemsEdit(0).editSupportsHarvesting(supportsHarvesting);
          await externaldatasources.externalDataSourceList.itemsEdit(0).editActivationEnabled(activationEnabled);
          await externaldatasources.externalDataSourceList.itemsEdit(0).editTrustedSourceTI(!trustedSourceTI);
          await externaldatasources.externalDataSourceList.itemsEdit(0).clickSaveButton();
        });

        describe('editing and saving the source', () => {
          it('should render the edited data source name', () => {
            expect(externaldatasources.externalDataSourceList.items(0).name.value.text).to.equal(editedName);
          });

          it('should render the edited isActive checkbox status', () => {
            expect(externaldatasources.externalDataSourceList.items(0).isActive.value.text).to.equal('Yes');
          });

          it('should render the edited trustedSourceTI checkbox status', () => {
            expect(externaldatasources.externalDataSourceList.items(0).trustedSourceTI.value.text).to.equal('No');
          });

          it('should render the edited supportsHarvesting checkbox status', () => {
            expect(externaldatasources.externalDataSourceList.items(0).isSupportsHarvesting.value.text).to.equal('No');
          });

          it('should render the edited activationEnabled checkbox status', () => {
            expect(externaldatasources.externalDataSourceList.items(0).isActivationEnabled.value.text).to.equal('Yes');
          });
        });
      });

      describe('edit and cancel', () => {
        beforeEach(async function () {
          await externaldatasources.externalDataSourceList.items(0).clickEditButton();
          await externaldatasources.externalDataSourceList.itemsEdit(0).clickCancelButton();
        });

        describe('editing and canceling the source', () => {
          it('should render the previous name', () => {
            expect(externaldatasources.externalDataSourceList.items(0).name.value.text).to.equal(name);
          });

          it('should render the previous isActive checkbox status', () => {
            expect(externaldatasources.externalDataSourceList.items(0).isActive.value.text).to.equal('No');
          });

          it('should render the previous trustedSourceTI checkbox status', () => {
            expect(externaldatasources.externalDataSourceList.items(0).trustedSourceTI.value.text).to.equal('Yes');
          });

          it('should render the previous supportsHarvesting checkbox status', () => {
            expect(externaldatasources.externalDataSourceList.items(0).isSupportsHarvesting.value.text).to.equal('Yes');
          });

          it('should render the previous activationEnabled checkbox status', () => {
            expect(externaldatasources.externalDataSourceList.items(0).isActivationEnabled.value.text).to.equal('No');
          });
        });
      });
    });
  });

  describe('externaldatasources tests for multiple data sources', () => {
    const externalDataSourceCount = 10;
    beforeEach(async function () {
      this.server.createList('externalDataSource', 10);
      this.visit('/settings/local-kb-admin/external-data-sources');
    });

    describe('viewing the data sources', () => {
      it('renders the list of external data sources', () => {
        expect(externaldatasources.isFormPresent).to.be.true;
      });

      it('renders the expected count of external data sources', () => {
        expect(externaldatasources.externalDataSourceList.size).to.equal(externalDataSourceCount);
      });

      describe('deleting 2 sources', () => {
        beforeEach(async function () {
          await externaldatasources.externalDataSourceList.items(0).clickDeleteButton();
        });

        it('confirmation modal opens', () => {
          expect(externaldatasources.externalDataSourceList.items(0).confirmation.isDeleteConfirmationButtonPresent).to.be.true;
        });

        describe('confirm delete', () => {
          beforeEach(async () => {
            await externaldatasources.externalDataSourceList.items(0).confirmation.clickConfirmDeleteButton();
          });

          it('reduces the count of data sources by 1', () => {
            expect(externaldatasources.externalDataSourceList.size).to.equal(externalDataSourceCount - 1);
          });

          it('reduces the count of data sources by 1', () => {
            expect(externaldatasources.externalDataSourceList.size).to.equal(externalDataSourceCount - 1);
          });
        });
      });
    });
  });
});
