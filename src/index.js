import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { Route } from '@folio/stripes/core';
import { CommandList, HasCommand } from '@folio/stripes/components';

import { checkScope, keyboardCommands } from '@folio/stripes-erm-components';

const JobCreateRoute = lazy(() => import('./routes/JobCreateRoute'));
const JobsRoute = lazy(() => import('./routes/JobsRoute'));
const JobViewRoute = lazy(() => import('./routes/JobViewRoute'));

const Settings = lazy(() => import('./settings'));

export default class App extends React.Component {
  static propTypes = {
    actAs: PropTypes.string.isRequired,
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object.isRequired,
    stripes: PropTypes.object.isRequired,
  }

  searchInput = () => {
    return this.props.location.pathname.search('/local-kb-admin') === 0 ?
      'input-local-kb-admin-search' :
      undefined;
  }

  focusSearchField = () => {
    const { history, stripes } = this.props;
    const el = document.getElementById(this.searchInput());
    if (el) {
      el.focus();
    } else {
      history.push(stripes.home);
    }
  }

  shortcuts = [
    {
      name: 'search',
      handler: this.focusSearchField
    },
  ];

  render() {
    const { actAs, match: { path } } = this.props;

    if (actAs === 'settings') {
      return (
        <Suspense fallback={null}>
          <Settings {...this.props} />
        </Suspense>
      );
    }

    return (
      <CommandList commands={keyboardCommands}>
        <HasCommand
          commands={this.shortcuts}
          isWithinScope={checkScope}
          scope={document.body}
        >
          <>
            <Suspense fallback={null}>
              <Switch>
                <Route component={JobCreateRoute} path={`${path}/create/:format`} />
                <Route component={JobsRoute} path={`${path}/:id?`}>
                  <Suspense fallback={null}>
                    <Route component={JobViewRoute} path={`${path}/:id`} />
                  </Suspense>
                </Route>
              </Switch>
            </Suspense>
          </>
        </HasCommand>
      </CommandList>
    );
  }
}
