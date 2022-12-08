import { beforeEach, describe, it } from '@bigtest/mocha';

import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import JobsInteractor from '../interactors/jobs';

const jobsAmount = 10;

describe('Jobs', () => {
  setupApplication();
  const jobs = new JobsInteractor();

  describe('Jobs render', () => {
    beforeEach(async function () {
      this.server.createList('job', jobsAmount);
      await this.visit('/local-kb-admin?filters=status.queued%2Cstatus.in_progress%2Cstatus.ended&sort=started');
    });

    it('shows the list of job items', () => {
      expect(jobs.isVisible).to.equal(true);
    });

    it('renders each job instance', () => {
      expect(jobs.instanceList.size).to.equal(jobsAmount);
    });
  });
});
