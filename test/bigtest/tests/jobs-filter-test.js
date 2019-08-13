import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';

import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import JobsInteractor from '../interactors/jobs';

describe('Local kb admin Filters', () => {
  setupApplication();
  const jobs = new JobsInteractor();

  describe('status filter tests', () => {
    const endedJobsAmount = 4;
    const queuedJobsAmount = 6;
    const inProgressJobsAmount = 8;
    const totalJobsAmount = endedJobsAmount + queuedJobsAmount + inProgressJobsAmount;

    beforeEach(async function () {
      this.server.createList('job', endedJobsAmount, { status: { value: 'ended', label: 'Ended' } });
      this.server.createList('job', queuedJobsAmount, { status: { value: 'queued', label: 'Queued' } });
      this.server.createList('job', inProgressJobsAmount, { status: { value: 'in_progress', label: 'In progress' } });
      this.visit('/local-kb-admin');
      await jobs.runningStatusCheckbox.clickQueuedJobCheckbox();
      await jobs.runningStatusCheckbox.clickInProgressJobCheckbox();
      await jobs.whenInstancesArePresent(totalJobsAmount);
    });

    describe('filtering by', () => {
      beforeEach(async function () {
        await jobs.runningStatusCheckbox.clickInProgressJobCheckbox();
      });

      it('in progress jobs should show all the in progress jobs', () => {
        expect(jobs.instanceList.size).to.equal(inProgressJobsAmount);
      });
    });

    describe('queued jobs', () => {
      beforeEach(async function () {
        await jobs.clickResetAll();
        await jobs.runningStatusCheckbox.clickInProgressJobCheckbox();
      });

      it('should show all the queued jobs', () => {
        expect(jobs.instanceList.size).to.equal(queuedJobsAmount);
      });
    });

    describe('in progress, queued and ended jobs', () => {
      beforeEach(async function () {
        await jobs.clickResetAll();
        await jobs.runningStatusCheckbox.clickEndedJobCheckbox();
      });

      it('should show all the jobs', () => {
        expect(jobs.instanceList.size).to.equal(totalJobsAmount);
      });
    });
  });

  describe('result filter tests', () => {
    const successJobsAmount = 2;
    const partialSuccessJobsAmount = 3;
    const failureJobsAmount = 4;
    const interruptedJobsAmount = 5;
    const totalJobsAmount = successJobsAmount + partialSuccessJobsAmount + failureJobsAmount + interruptedJobsAmount;

    beforeEach(async function () {
      this.server.createList('job', successJobsAmount, { result: { value: 'success', label: 'Success' } });
      this.server.createList('job', partialSuccessJobsAmount, { result: { value: 'partial_success', label: 'Partial success' } });
      this.server.createList('job', failureJobsAmount, { result: { value: 'failure', label: 'Failure' } });
      this.server.createList('job', interruptedJobsAmount, { result: { value: 'interrupted', label: 'Interrupted' } });
      await this.visit('/local-kb-admin');
      await jobs.runningStatusCheckbox.clickQueuedJobCheckbox();
      await jobs.runningStatusCheckbox.clickInProgressJobCheckbox();
      await jobs.whenInstancesArePresent(totalJobsAmount);
    });

    describe('filtering by', () => {
      beforeEach(async function () {
        await jobs.clickResetAll();
        await jobs.runningStatusCheckbox.clickInProgressJobCheckbox();
        await jobs.runningStatusCheckbox.clickQueuedJobCheckbox();
        await jobs.resultCheckbox.clickSuccessResultCheckbox();
      });

      it('success filter should show all successful jobs', () => {
        expect(jobs.instanceList.size).to.equal(successJobsAmount);
      });

      describe('partially successful jobs', () => {
        beforeEach(async function () {
          await jobs.clickResetAll();
          await jobs.runningStatusCheckbox.clickInProgressJobCheckbox();
          await jobs.runningStatusCheckbox.clickQueuedJobCheckbox();
          await jobs.resultCheckbox.clickPartialSuccessResultCheckbox();
        });

        it('should show all the partial successful jobs', () => {
          expect(jobs.instanceList.size).to.equal(partialSuccessJobsAmount);
        });
      });

      describe('failed jobs', () => {
        beforeEach(async function () {
          await jobs.clickResetAll();
          await jobs.runningStatusCheckbox.clickInProgressJobCheckbox();
          await jobs.runningStatusCheckbox.clickQueuedJobCheckbox();
          await jobs.resultCheckbox.clickFailureResultCheckbox();
        });

        it('should show all the failed jobs', () => {
          expect(jobs.instanceList.size).to.equal(failureJobsAmount);
        });
      });

      describe('interrupted jobs', () => {
        beforeEach(async function () {
          await jobs.clickResetAll();
          await jobs.runningStatusCheckbox.clickInProgressJobCheckbox();
          await jobs.runningStatusCheckbox.clickQueuedJobCheckbox();
          await jobs.resultCheckbox.clickInterruptedResultCheckbox();
        });

        it('should show all the interrupted jobs', () => {
          expect(jobs.instanceList.size).to.equal(interruptedJobsAmount);
        });
      });

      describe('harvester jobs', () => {
        beforeEach(async function () {
          await jobs.clickResetAll();
          await jobs.jobTypeCheckbox.clickHarvesterCheckbox();
        });

        it('should show all the harvester jobs', () => {
          expect(jobs.instanceList.size).to.equal(totalJobsAmount);
        });
      });
    });
  });
});
