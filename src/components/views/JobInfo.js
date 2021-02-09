import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  AccordionSet,
  AccordionStatus,
  Button,
  Col,
  ExpandAllButton,
  HasCommand,
  Headline,
  Icon,
  KeyValue,
  Layout,
  NoValue,
  Pane,
  Row,
  Spinner,
  checkScope,
  collapseAllSections,
  expandAllSections
} from '@folio/stripes/components';
import { TitleManager, withStripes } from '@folio/stripes/core';


import Logs from '../Logs';
import FormattedDateTime from '../FormattedDateTime';

class JobInfo extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      job: PropTypes.object,
    }),
    isLoading: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    stripes: PropTypes.shape({
      hasPerm: PropTypes.func
    })
  };

  constructor(props) {
    super(props);
    this.accordionStatusRef = React.createRef();
  }

  getInitialAccordionsState = () => {
    return {
      errorLogs: false,
      infoLogs: false,
    };
  }

  renderLoadingPane = () => {
    return (
      <Pane
        defaultWidth="45%"
        dismissible
        id="pane-view-job"
        onClose={this.props.onClose}
        paneTitle={<FormattedMessage id="ui-local-kb-admin.loading" />}
      >
        <Layout className="marginTop1">
          <Spinner />
        </Layout>
      </Pane>
    );
  }

  getSectionProps = (id) => {
    const { data: { job } } = this.props;
    return {
      id,
      job,
    };
  }

  getActionMenu = ({ onToggle }) => {
    const { data: { job }, stripes } = this.props;
    const isJobNotInProgress = job?.status?.value !== 'in_progress';

    return stripes.hasPerm('ui-local-kb-admin.jobs.delete') ? (
      <Button
        buttonStyle="dropdownItem"
        disabled={!isJobNotInProgress}
        id="clickable-dropdown-delete-job"
        onClick={() => {
          onToggle();
          this.props.onDelete();
        }}
      >
        <Icon icon="trash">
          <FormattedMessage id="ui-local-kb-admin.job.delete" />
        </Icon>
      </Button>
    ) : null;
  }

  render() {
    const { data: { job }, isLoading } = this.props;

    if (isLoading) return this.renderLoadingPane();
    const isJobNotQueued = job?.status?.value !== 'queued';

    const shortcuts = [
      {
        name: 'expandAllSections',
        handler: (e) => expandAllSections(e, this.accordionStatusRef),
      },
      {
        name: 'collapseAllSections',
        handler: (e) => collapseAllSections(e, this.accordionStatusRef)
      },
    ];

    return (
      <HasCommand
        commands={shortcuts}
        isWithinScope={checkScope}
        scope={document.body}
      >
        <>
          <Pane
            actionMenu={this.getActionMenu}
            data-test-job-details
            defaultWidth="45%"
            dismissible
            id="pane-view-job"
            onClose={this.props.onClose}
            paneTitle={
              <span data-test-header-title>
                {job.name}
              </span>
        }
          >
            <TitleManager data-test-title-name record={job.name}>
              <div>
                <Row>
                  <Col xs={12}>
                    <Headline
                      data-test-job-name
                      size="xx-large"
                      tag="h2"
                    >
                      {job.name}
                    </Headline>
                  </Col>
                </Row>
                <Row>
                  <Col xs={3}>
                    <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.runningStatus" />}>
                      <div data-test-job-status>
                        {job?.status?.label ?? <NoValue />}
                      </div>
                    </KeyValue>
                  </Col>
                  {
                isJobNotQueued && (
                  <Col xs={3}>
                    <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.outcome" />}>
                      <div data-test-job-result>
                        {job?.result?.label ?? <NoValue />}
                      </div>
                    </KeyValue>
                  </Col>
                )
              }
                  {
                isJobNotQueued && (
                  <Col xs={3}>
                    <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.started" />}>
                      <div data-test-job-started>
                        {job.started ? <FormattedDateTime date={job.started} /> : <NoValue />}
                      </div>
                    </KeyValue>
                  </Col>
                )
              }
                  {
                isJobNotQueued && (
                  <Col xs={3}>
                    <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.ended" />}>
                      <div data-test-job-ended>
                        {job.ended ? <FormattedDateTime date={job.ended} /> : <NoValue />}
                      </div>
                    </KeyValue>
                  </Col>
                )
              }
                </Row>
                <Row>
                  {
                isJobNotQueued && (
                  <Col xs={3}>
                    <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.errors" />}>
                      <div data-test-job-errors>
                        {job.errorLog ? job.errorLog.length : '0'}
                      </div>
                    </KeyValue>
                  </Col>
                )
              }
                  <Col xs={3}>
                    {
                  job.fileName ? (
                    <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.filename" />}>
                      <div data-test-job-filename>
                        {job.fileName}
                      </div>
                    </KeyValue>) : (
                      <KeyValue label={<FormattedMessage id="ui-local-kb-admin.jobType" />}>
                        <div data-test-job-type>
                          <FormattedMessage id={`ui-local-kb-admin.${job.class}`} />
                        </div>
                      </KeyValue>)
                }
                  </Col>
                </Row>
              </div>
              {
            isJobNotQueued ? (
              <AccordionStatus ref={this.accordionStatusRef}>
                <Row end="xs">
                  <Col xs>
                    <ExpandAllButton />
                  </Col>
                </Row>
                <AccordionSet initialStatus={this.getInitialAccordionsState()}>
                  <Logs
                    type="error"
                    {...this.getSectionProps('errorLogs')}
                  />
                  <Logs
                    type="info"
                    {...this.getSectionProps('infoLogs')}
                  />
                </AccordionSet>
              </AccordionStatus>
            ) : null
          }

            </TitleManager>
          </Pane>
        </>
      </HasCommand>
    );
  }
}

export default withStripes(JobInfo);
