import {
    interactor,
    scoped,
    collection,
    count,
    clickable,
    isPresent,
    isVisible,
  } from '@bigtest/interactor';
  
  @interactor class RunningStatusCheckbox {
    clickQueuedJobCheckbox = clickable('#clickable-filter-status-queued');
    clickInProgressJobCheckbox = clickable('#clickable-filter-status-in-progress');
    clickEndedJobCheckbox = clickable('#clickable-filter-status-ended');
  }

  @interactor class ResultCheckbox {
    clickSuccessResultCheckbox = clickable('#clickable-filter-result-success');
    clickPartialSuccessResultCheckbox = clickable('#clickable-filter-result-partial-success');
    clickFailureResultCheckbox = clickable('#clickable-filter-result-failure');
    clickInterruptedResultCheckbox = clickable('#clickable-filter-result-interrupted');
  }

  @interactor class JobTypeCheckbox {
    clickHarvesterCheckbox = clickable('#clickable-filter-class-harvester');
  }

  @interactor class InstanceList {
    static defaultScope = '#list-jobs';
    size = count('a[role=row]');
    items = collection('a[role=row]');
  }
    
  export default @interactor class JobsInteractor {
    static defaultScope = '[data-test-localkbadmin]';
  
    clickResetAll = clickable('#clickable-reset-all')
    isLoaded = isPresent('#list-jobs > [class*=mclScrollable---]');
    isView = isVisible('#list-jobs > [class*=mclScrollable---]');
    instanceList = new InstanceList();
    runningStatusCheckbox = new RunningStatusCheckbox();
    sectionIsPresent = isPresent('#list-jobs');
    resultCheckbox = new ResultCheckbox();
    jobTypeCheckbox = new JobTypeCheckbox();
    instance = scoped('[data-test-job-details]');

    whenInstancesArePresent(size) {
        return this.when(() => {
          console.log(this.instanceList.isVisible, this.instanceList.size,'size');
          return this.instanceList.isVisible && this.instanceList.size === size;
        });
      }
    
    whenSectionLoaded() {
      return this.when(() => this.sectionIsPresent).timeout(3000);
    }
  
  }
  