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

describe('JobCreate JSON', () => {
  setupApplication();
  const interactor = new JobsCreateInteractor();
  const jobviewinteractor = new JobViewInteractor();

  beforeEach(async function () {
    await this.visit('/local-kb-admin/create/JSON');
  });

  describe('job create JSON pane', () => {
    it('should display file uploader component', () => {
      expect(interactor.isFileUploaderPresent).to.be.true;
    });

    describe('Upload file', () => {
      beforeEach(async function () {
        await uploaderInteractor.dragEnter();
        await uploaderInteractor.drop();
      });

      it('should display the uploaded file name', () => {
        expect(uploaderFieldInteractor.filename).to.equal('Test File');
      });

      it('should enable save button', () => {
        expect(interactor.saveButton.isDisabled).to.be.false;
      });

      describe.skip('Save the uploaded file', () => {
        beforeEach(async function () {
          await interactor.saveButton.whenEnabled();
          await interactor.saveButton.click();
          await jobviewinteractor.whenLoaded();
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
          expect(jobviewinteractor.source).to.equal('File import');
        });
      });

      describe('Clicking the close button', () => {
        beforeEach(async function () {
          await interactor.closeButton();
        });

        it('should navigate to the jobs page', () => {
          expect(interactor.isJobsPane).to.be.true;
        });
      });

      describe('Uploading and deleting a file', () => {
        beforeEach(async function () {
          await uploaderInteractor.dragEnter();
          await uploaderInteractor.drop();
          await uploaderFieldInteractor.clickDelete();
        });

        it('should render validation error message', () => {
          expect(interactor.errorText).contains('Please upload a file to continue');
        });
      });
    });
  });
});
