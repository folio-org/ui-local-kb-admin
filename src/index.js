import React from 'react';
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

import Settings from './settings';

import setUpRegistry from './setUpRegistry';

export default class App extends React.Component {
  static eventHandler(event, _s, data) {
    if (event === 'ui-stripes-registry-load') {
      // Data should contain Registry singleton:
      setUpRegistry(data);
    }

    return null;
  }

  static propTypes = {
    actAs: PropTypes.string.isRequired,
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object.isRequired,
    stripes: PropTypes.object.isRequired,
  }

  state = {
    showKeyboardShortcutsModal: false,
  };

  changeKeyboardShortcutsModal = (modalState) => {
    this.setState({ showKeyboardShortcutsModal: modalState });
  };

  shortcutModalToggle(handleToggle) {
    handleToggle();
    this.changeKeyboardShortcutsModal(true);
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
    {
      name: 'openShortcutModal',
      handler: this.changeKeyboardShortcutsModal
    },
  ];

  render() {
    const { actAs, match: { path } } = this.props;

    if (actAs === 'settings') {
      return (
        <Settings {...this.props} />
      );
    }

    return (
      <>
        <CommandList commands={defaultKeyboardShortcuts}>
          <HasCommand
            commands={this.shortcuts}
            isWithinScope={checkScope}
            scope={document.body}
          >
            <AppContextMenu>
              {(handleToggle) => (
                <NavList>
                  <NavListSection>
                    <NavListItem
                      id="keyboard-shortcuts-item"
                      onClick={() => { this.shortcutModalToggle(handleToggle); }}
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
                <Route component={JobViewRoute} path={`${path}/:id`} />
              </Route>
            </Switch>
          </HasCommand>
        </CommandList>
        { this.state.showKeyboardShortcutsModal && (
        <KeyboardShortcutsModal
          allCommands={defaultKeyboardShortcuts}
          onClose={() => { this.changeKeyboardShortcutsModal(false); }}
          open
        />
        )}
      </>
    );
  }
}
