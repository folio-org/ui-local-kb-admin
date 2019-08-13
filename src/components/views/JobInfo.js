import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { get } from 'lodash';

import {
  AccordionSet,
  Button,
  Col,
  ExpandAllButton,
  Icon,
  KeyValue,
  Layout,
  Pane,
  Row,
} from '@folio/stripes/components';
import { TitleManager } from '@folio/stripes/core';
import { Spinner } from '@folio/stripes-erm-components';
import ErrorLogs from './ErrorLogs';
import InfoLogs from './InfoLogs';
import FormattedDateTime from '../FormattedDateTime';

export default class JobInfo extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      job: PropTypes.object,
    }),
    isLoading: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
  };

  state = {
    sections: {
      errorLogs: false,
      infoLogs: false,
    }
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
      onToggle: this.handleSectionToggle,
      open: this.state.sections[id],
    };
  }

  handleSectionToggle = ({ id }) => {
    this.setState((prevState) => ({
      sections: {
        ...prevState.sections,
        [id]: !prevState.sections[id],
      }
    }));
  }

  handleAllSectionsToggle = (sections) => {
    this.setState({ sections });
  }

  getActionMenu = ({ onToggle }) => {
    const { data: { job } } = this.props;
    const isJobNotInProgress = get(job, 'status.value') !== 'in_progress';

    return (
      <React.Fragment>
        <Button
          buttonStyle="dropdownItem"
          id="clickable-dropdown-delete-job"
          disabled={!isJobNotInProgress}
          onClick={() => {
            onToggle();
            this.props.onDelete();
          }}
        >
          <Icon icon="trash">
            <FormattedMessage id="ui-local-kb-admin.job.delete" />
          </Icon>
        </Button>
      </React.Fragment>
    );
  }

  render() {
    const { data: { job }, isLoading } = this.props;

    if (isLoading) return this.renderLoadingPane();
    const isJobNotQueued = get(job, 'status.value') !== 'queued';

    return (
      <Pane
        data-test-job-details
        actionMenu={this.getActionMenu}
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
              <Col xs={9}>
                <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.jobName" />}>
                  <div data-test-job-name>
                    <strong>{job.name}</strong>
                  </div>
                </KeyValue>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.runningStatus" />}>
                  <div data-test-job-status>
                    {get(job, 'status.label', '-')}
                  </div>
                </KeyValue>
              </Col>
              {
                isJobNotQueued && (
                  <Col xs={4}>
                    <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.outcome" />}>
                      <div data-test-job-result>
                        {get(job, 'result.label', '-')}
                      </div>
                    </KeyValue>
                  </Col>
                )
              }
              {
                isJobNotQueued && (
                  <Col xs={4}>
                    <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.errors" />}>
                      <div data-test-job-errors>
                        {job.errorLog ? job.errorLog.length : '0'}
                      </div>
                    </KeyValue>
                  </Col>
                )
              }
            </Row>
            <Row>
              {
                isJobNotQueued && (
                  <Col xs={4}>
                    <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.started" />}>
                      <div data-test-job-started>
                        {job.started ? <FormattedDateTime dateString={job.started} /> : '-'}
                      </div>
                    </KeyValue>
                  </Col>
                )
              }
              {
                isJobNotQueued && (
                  <Col xs={4}>
                    <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.ended" />}>
                      <div data-test-job-ended>
                        {job.ended ? <FormattedDateTime dateString={job.ended} /> : '-'}
                      </div>
                    </KeyValue>
                  </Col>
                )
              }
              <Col xs={4}>
                {
                  job.fileName ? (
                    <KeyValue label={<FormattedMessage id="ui-local-kb-admin.prop.filename" />}>
                      <div data-test-job-filename>
                        {job.fileName}
                      </div>
                    </KeyValue>) : (
                      <KeyValue label={<FormattedMessage id="ui-local-kb-admin.source" />}>
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
              <AccordionSet>
                <Row end="xs">
                  <Col xs>
                    <ExpandAllButton
                      accordionStatus={this.state.sections}
                      id="clickable-expand-all"
                      onToggle={this.handleAllSectionsToggle}
                    />
                  </Col>
                </Row>
                <ErrorLogs {...this.getSectionProps('errorLogs')} />
                <InfoLogs {...this.getSectionProps('infoLogs')} />
              </AccordionSet>
            ) : null
          }
        </TitleManager>
      </Pane>
    );
  }
}
