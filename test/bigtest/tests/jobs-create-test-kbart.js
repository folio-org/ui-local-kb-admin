import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';
import FileUploaderInteractor from '@folio/stripes-erm-components/lib/FileUploader/tests/interactor';
import FileUploaderFieldInteractor from '@folio/stripes-erm-components/lib/FileUploaderField/tests/interactor';

import setupApplication from '../helpers/setup-application';
import JobsCreateInteractor from '../interactors/jobs-create';
import JobViewInteractor from '../interactors/jobs-view';

const uploaderInteractor = new FileUploaderInteractor();
const uploaderFieldInteractor = new FileUploaderFieldInteractor();

describe('JobCreate KBART', () => {
  setupApplication();
  const interactor = new JobsCreateInteractor();
  const jobviewinteractor = new JobViewInteractor();

  beforeEach(async function () {
    this.visit('/local-kb-admin/create/KBART');
  });

  describe('job create KBART pane', () => {
    it('should display file uploader component', () => {
      expect(interactor.isFileUploaderPresent).to.be.true;
    });

    it('should display package name field', () => {
      expect(interactor.isPackageNameFieldPresent).to.be.true;
    });

    it('should display package source field', () => {
      expect(interactor.isPackageSourceFieldPresent).to.be.true;
    });

    it('should display package reference field', () => {
      expect(interactor.isPackageReferenceFieldPresent).to.be.true;
    });

    it('should display package provider field', () => {
      expect(interactor.isPackageProviderFieldPresent).to.be.true;
    });

    describe('Upload file', () => {
      beforeEach(async function () {
        await uploaderInteractor.dragEnter();
        await uploaderInteractor.drop();

        await interactor.fillPackageName('Test package');
        await interactor.fillPackageSource('Test package source');
        await interactor.fillPackageReference('Test package reference');
        await interactor.fillPackageProvider('Test package provider');
      });

      it('should display the uploaded file name', () => {
        expect(uploaderFieldInteractor.filename).to.equal('Test File');
      });

      it('should enable save button', () => {
        expect(interactor.saveButton.isDisabled).to.be.false;
      });

      describe('Save the uploaded file', () => {
        beforeEach(async function () {
          await interactor.saveButton.whenEnabled();
          await interactor.saveButton.click();
        });

        it('should render job title', () => {
          expect(jobviewinteractor.isTitlePresent).to.be.true;
        });

        it('should render the expected job title', () => {
          expect(jobviewinteractor.title).to.equal('Test File');
        });

        it('should render job source', () => {
          expect(jobviewinteractor.isSourcePresent).to.be.true;
        });

        it('should render the expected job source', () => {
          expect(jobviewinteractor.source).to.equal('KBART File import');
        });
      });

      describe('Clicking the close button', () => {
        beforeEach(async function () {
          await interactor.closeButton();
          await interactor.confirmCloseButton();
        });

        it('should navigate to the jobs page', () => {
          expect(interactor.isJobsPane).to.be.true;
        });
      });

      describe('Uploading and deleteing a file', () => {
        beforeEach(async function () {
          await uploaderInteractor.dragEnter();
          await uploaderInteractor.drop();
          await uploaderFieldInteractor.clickDelete();
        });

        it('should render validation message', () => {
          expect(interactor.errorText).to.equal('Please upload a file to continue');
        });
      });
    });
  });
});
