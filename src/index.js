import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { AppContextMenu, Route } from '@folio/stripes/core';

import {
  CommandList,
  HasCommand,
  KeyboardShortcutsModal,
  NavList,
  NavListItem,
  NavListSection,
  checkScope,
  defaultKeyboardShortcuts,
} from '@folio/stripes/components';

import JobCreateRoute from './routes/JobCreateRoute';
import JobsRoute from './routes/JobsRoute';
import JobViewRoute from './routes/JobViewRoute';

import useExportLogStream from './routes/components/useExportLogStream';

import Settings from './settings';

import setUpRegistry from './setUpRegistry';

const propTypes = {
  actAs: PropTypes.string.isRequired,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object.isRequired,
  stripes: PropTypes.object.isRequired,
};

const App = (props) => {
  const { actAs, match: { path } } = props;

  const [showKeyboardShortcutsModal, setShowKeyboardShortcutsModal] = useState(false);

  const shortcutModalToggle = (handleToggle) => {
    handleToggle();
    setShowKeyboardShortcutsModal(true);
  };

  const searchInput = () => {
    return props.location.pathname.search('/local-kb-admin') === 0 ?
      'input-local-kb-admin-search' :
      undefined;
  };

  const focusSearchField = () => {
    const { history, stripes } = props;
    const el = document.getElementById(searchInput());
    if (el) {
      el.focus();
    } else {
      history.push(stripes.home);
    }
  };

  const shortcuts = [
    {
      name: 'search',
      handler: focusSearchField
    },
    {
      name: 'openShortcutModal',
      handler: setShowKeyboardShortcutsModal
    },
  ];

  // Downloading of log stream at top level so navigation away doesn't cause download to cease
  // We store job/type in state, then when that state changes we fire exportLogs on that new data
  const [exportLogState, setExportLogState] = useState({});
  const {
    refetch: exportLogs,
    isLoading
  } = useExportLogStream(exportLogState.job, exportLogState.type);

  const onExportLogs = (j, t) => {
    setExportLogState({ job: j, type: t });
  };

  useEffect(() => {
    if (exportLogState.job && exportLogState.type) {
      exportLogs();
    }
  }, [exportLogs, exportLogState]);


  // In order to determine which logs are downloading, we send back isLoading along with type and id
  const logExportLoading = { id: exportLogState.job?.id, type: exportLogState.type, isLoading };


  if (actAs === 'settings') {
    return (
      <Settings {...props} />
    );
  }

  return (
    <>
      <CommandList commands={defaultKeyboardShortcuts}>
        <HasCommand
          commands={shortcuts}
          isWithinScope={checkScope}
          scope={document.body}
        >
          <AppContextMenu>
            {(handleToggle) => (
              <NavList>
                <NavListSection>
                  <NavListItem
                    id="keyboard-shortcuts-item"
                    onClick={() => { shortcutModalToggle(handleToggle); }}
                  >
                    <FormattedMessage id="ui-agreements.appMenu.keyboardShortcuts" />
                  </NavListItem>
                </NavListSection>
              </NavList>
            )}
          </AppContextMenu>
          <Switch>
            <Route component={JobCreateRoute} path={`${path}/create/:format`} />
            <Route component={JobsRoute} path={`${path}/:id?`}>
              <Route
                path={`${path}/:id`}
                render={routeProps => (
                  <JobViewRoute
                    {...routeProps}
                    logExportLoading={logExportLoading}
                    onExportLogs={onExportLogs}
                  />
                )}
              />
            </Route>
          </Switch>
        </HasCommand>
      </CommandList>
      { showKeyboardShortcutsModal && (
      <KeyboardShortcutsModal
        allCommands={defaultKeyboardShortcuts}
        onClose={() => { setShowKeyboardShortcutsModal(false); }}
        open
      />
      )}
    </>
  );
};

App.propTypes = propTypes;

App.eventHandler = (event, _s, data) => {
  if (event === 'ui-stripes-registry-load') {
    // Data should contain Registry singleton:
    setUpRegistry(data);
  }

  return null;
};

export default App;
