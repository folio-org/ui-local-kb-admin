import { beforeEach, describe, it } from '@bigtest/mocha';

import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import JobsInteractor from '../interactors/jobs';

const jobsAmount = 10;

describe('Jobs', () => {
  setupApplication();
  const jobs = new JobsInteractor();

  describe('Jobs render', () => {
    let jobList;
    beforeEach(async function () {
      jobList = this.server.createList('job', jobsAmount);
      this.visit('/local-kb-admin?filters=status.Queued%2Cstatus.In%20progress&sort=started');
      await jobs.runningStatusCheckbox.clickEndedJobCheckbox();
    });

    it('shows the list of job items', () => {
      expect(jobs.isVisible).to.equal(true);
    });

    it('renders each job instance', () => {
      expect(jobs.instanceList.size).to.equal(jobsAmount);
    });

    describe('clicking on the first job', function () {
      beforeEach(async function () {
        await jobs.instanceList.items(0).click();
      });

      it('loads the job details', function () {
        expect(jobs.instance.isVisible).to.equal(true);
      });

      it('should display the instance title in the pane header', () => {
        expect(jobs.headerTitle).to.equal(jobList[0].name);
      });
    });
  });
});
