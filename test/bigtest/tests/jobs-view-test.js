import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';
import setupApplication from '../helpers/setup-application';
import JobsViewInteractor from '../interactors/jobs-view';

describe('JobView', () => {
  setupApplication();
  const jobsView = new JobsViewInteractor();

  let job;
  const jobInfo = {
    name: 'testName',
    status: { value: 'ended', label: 'Ended' },
    result: { value: 'success', label: 'Success' },
  };

  beforeEach(async function () {
    job = this.server.create('job', jobInfo);
    this.visit(`/local-kb-admin/${job.id}`);
  });

  describe('jobview pane', () => {
    it('should display the instance title in the pane header', () => {
      expect(jobsView.headerTitle).to.equal(job.name);
    });

    it('should render title field', () => {
      expect(jobsView.isTitlePresent).to.be.true;
    });

    it('should render the expected title', () => {
      expect(jobsView.title).to.equal(job.name);
    });

    it('should render status field', () => {
      expect(jobsView.isStatusPresent).to.be.true;
    });

    it('should render the expected status', () => {
      expect(jobsView.status).to.equal(job.status.label);
    });

    it('should render import outcome field', () => {
      expect(jobsView.isOutcomePresent).to.be.true;
    });

    it('should render the expected outcome', () => {
      expect(jobsView.outcome).to.equal(job.result.label);
    });

    it('should render started field', () => {
      expect(jobsView.isStartedPresent).to.be.true;
    });

    it('should render ended field', () => {
      expect(jobsView.isEndedPresent).to.be.true;
    });

    it('should render source field', () => {
      expect(jobsView.isSourcePresent).to.be.true;
    });

    it('should render the expected source', () => {
      expect(jobsView.source).to.equal(job.source);
    });

    it('should render error logs accordion', () => {
      expect(jobsView.isErrorLogsAccordionPresent).to.be.true;
    });

    it('should render info logs accordion', () => {
      expect(jobsView.isInfoLogsAccordionPresent).to.be.true;
    });

    it('should render the delete button in the action dropdown', () => {
      expect(jobsView.headerDropdownMenu.isDeleteButtonPresent).to.be.true;
    });
  });

  describe('click delete job', () => {
    beforeEach(async function () {
      await jobsView.headerDropdown.click();
      await jobsView.headerDropdownMenu.clickDelete();
    });

    it('shows delete job confirmation modal', () => {
      expect(jobsView.confirmationModal.isVisible).to.be.true;
    });
  });

  describe('click delete job and cancel the confirmation modal', () => {
    beforeEach(async function () {
      await jobsView.headerDropdown.click();
      await jobsView.headerDropdownMenu.clickDelete();
      await jobsView.confirmationModal.cancel();
    });

    it('closes delete order confirmation', () => {
      expect(jobsView.confirmationModal.isPresent).to.be.false;
    });

    it('shows view job details pane', () => {
      expect(jobsView.isVisible).to.be.true;
    });
  });

  describe('click delete job and confirm the confirmation modal', () => {
    beforeEach(async function () {
      await jobsView.headerDropdown.click();
      await jobsView.headerDropdownMenu.clickDelete();
      await jobsView.confirmationModal.confirm();
    });

    it('closes delete job confirmation modal', () => {
      expect(jobsView.confirmationModal.isPresent).to.be.false;
    });

    it('closes view job details pane', () => {
      expect(jobsView.isPresent).to.be.false;
    });
  });
});
