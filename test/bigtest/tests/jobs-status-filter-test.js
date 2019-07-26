import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';

import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import JobsInteractor from '../interactors/jobs';

setupApplication();
const endedJobsAmount = 4;

beforeEach(async function () {
  this.server.createList('job', endedJobsAmount, { status: { value: 'Queued', label: 'Queued' } });
  this.visit('/local-kb-admin?sort=Name');
});

describe('Status filter', () => {
  const jobs = new JobsInteractor();

  describe('show ended jobs', () => {
    beforeEach(async function () {
      await jobs.runningStatusCheckbox.clickInProgressJobCheckbox();
      await jobs.runningStatusCheckbox.clickQueuedJobCheckbox();
      await jobs.runningStatusCheckbox.clickEndedJobCheckbox();
    });

    it('should show the list of ended jobs', () => {
      expect(jobs.isVisible).to.equal(true);
    });

    it('should show right amount of ended jobs', () => {
      console.log(jobs.instanceList.size,'size');
      expect(jobs.instanceList.size).to.equal(endedJobsAmount);
    });
  });

  // describe('show active users', () => {
  //   beforeEach(async function () {
  //     await users.activeUserCheckbox.clickActive();
  //   });

  //   it('should show the list of users', () => {
  //     expect(users.isVisible).to.equal(true);
  //   });

  //   it('should be proper amount of users', () => {
  //     expect(users.instances().length).to.equal(activeUsersAmount);
  //   });
  // });

  // describe('show all users', () => {
  //   beforeEach(async function () {
  //     await users.activeUserCheckbox.clickActive();
  //     await users.activeUserCheckbox.clickInactive();
  //   });

  //   it('should show the list of users', () => {
  //     expect(users.isVisible).to.equal(true);
  //   });

  //   it('should be proper amount of users', () => {
  //     expect(users.instances().length).to.equal(allUsers);
  //   });
  // });
});
