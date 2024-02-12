import React, { useState } from 'react';
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
  importShortcuts,
} from '@folio/stripes/components';

import { useIntlKeyStore } from '@k-int/stripes-kint-components';

import JobCreateRoute from './routes/JobCreateRoute';
import JobsRoute from './routes/JobsRoute';
import JobViewRoute from './routes/JobViewRoute';

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
  const addKey = useIntlKeyStore(state => state.addKey);
  addKey('ui-local-kb-admin');
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

  const appSpecificShortcuts = importShortcuts(['save', 'expandAllSections', 'collapseAllSections', 'expandOrCollapseAccordion', 'openShortcutModal', 'search']);

  const shortcuts = [
    {
      name: 'search',
      handler: focusSearchField
    },
    {
      name: 'openShortcutModal',
      handler: () => setShowKeyboardShortcutsModal(true)
    },
  ];


  if (actAs === 'settings') {
    return (
      <Settings {...props} />
    );
  }

  return (
    <>
      <CommandList commands={appSpecificShortcuts}>
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
                component={JobViewRoute}
                path={`${path}/:id`}
              />
            </Route>
          </Switch>
        </HasCommand>
      </CommandList>
      {showKeyboardShortcutsModal && (
        <KeyboardShortcutsModal
          allCommands={appSpecificShortcuts}
          onClose={() => { setShowKeyboardShortcutsModal(false); }}
          open
        />
      )}
    </>
  );
};

App.propTypes = propTypes;

App.eventHandler = (event, _s, data) => {
  if (event === 'LOAD_STRIPES_REGISTRY') {
    // Data should contain Registry singleton:
    setUpRegistry(data);
  }

  return null;
};

export default App;
