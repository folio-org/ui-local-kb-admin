import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-router-dom/Switch';
import { Route } from '@folio/stripes/core';
import Settings from './settings';

import JobCreateRoute from './routes/JobCreateRoute';
import JobsRoute from './routes/JobsRoute';
import JobViewRoute from './routes/JobViewRoute';

export default class App extends React.Component {
  static propTypes = {
    actAs: PropTypes.string.isRequired,
    match: PropTypes.object.isRequired,
  }

  render() {
    const { actAs, match: { path } } = this.props;

    if (actAs === 'settings') {
      return <Settings {...this.props} />;
    }

    return (
      <Switch>
        <Route path={`${path}/create`} component={JobCreateRoute} />
        <Route path={path} component={JobsRoute}>
          <Route path={`${path}/:id`} component={JobViewRoute} />
        </Route>
      </Switch>
    );
  }
}
