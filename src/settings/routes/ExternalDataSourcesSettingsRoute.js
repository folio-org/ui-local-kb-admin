import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { stripesConnect } from '@folio/stripes/core';

import ExternalDataSourcesForm from '../components/ExternalDataSourcesForm';

class ExternalDataSourcesSettingsRoute extends React.Component {

  static propTypes = {
    resources: PropTypes.shape({
      externalKbs: PropTypes.object,
    }),
    mutator: PropTypes.shape({
      externalKbs: PropTypes.shape({
        DELETE: PropTypes.func.isRequired,
        POST: PropTypes.func.isRequired,
        PUT: PropTypes.func.isRequired,
      }),
    }),
  };

  static manifest = Object.freeze({
    externalKbs: {
      type: 'okapi',
      path: 'erm/kbs',
      clientGeneratePk: false,
    },
    DELETE: {
      path: 'erm/kbs/%{activeRecord.id}',
    },
  });

  handleSubmit = () => {
    console.log('submitting');
  }

  handleDelete = (externalKb) => {
    this.props.mutator.externalKbs.DELETE({ id: externalKb.id })
      .then(response => {
        console.log(response);
      });
  }

  handleSave = (externalKb) => {
    const mutator = this.props.mutator.externalKbs;

    const promise = externalKb.id ?
      mutator.PUT(externalKb, { pk: externalKb.id }) :
      mutator.POST(externalKb);

    promise.then(response => {
      console.log(response);
    });
  }

  render() {
    if (!this.props.resources.externalKbs) return <div />;
    const externalKbs = get(this.props, 'resources.externalKbs.records', []);

    return (
      <ExternalDataSourcesForm
        initialValues={{ externalKbs }}
        onDelete={this.handleDelete}
        onSave={this.handleSave}
        onSubmit={this.handleSave}
      />
    );
  }
}

export default stripesConnect(ExternalDataSourcesSettingsRoute);
