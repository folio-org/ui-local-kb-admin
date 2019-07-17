import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { stripesConnect } from '@folio/stripes/core';

import View from '../components/views';


class ViewJobRoute extends React.Component {
  static manifest = Object.freeze({
    job: {
      type: 'okapi',
      path: 'erm/jobs/:{id}',
    },
  });

  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
    }).isRequired,
    resources: PropTypes.shape({
      interfaces: PropTypes.object,
      linkedAgreements: PropTypes.object,
      license: PropTypes.object,
      terms: PropTypes.object,
      users: PropTypes.object,
    }).isRequired,
    stripes: PropTypes.shape({
      hasPerm: PropTypes.func.isRequired,
      okapi: PropTypes.object.isRequired,
    }).isRequired,
  };

  handleClose = () => {
    this.props.history.push(`/local-kb-admin${this.props.location.search}`);
  }

  render() {
    const { resources } = this.props;
    return (
      <View
        data={{
          job: {
            ...get(resources, 'job.records[0]', {}),
          },
        }}
        onClose={this.handleClose}
        isLoading={get(resources, 'job.isPending', true)}
      />
    );
  }
}

export default stripesConnect(ViewJobRoute);