import React from 'react';
import { FormattedMessage } from 'react-intl';

const appKeyboardShortcuts = [
  {
    label: (<FormattedMessage id="ui-local-kb-admin.shortcut.saveRecord" />),
    name: 'save',
    shortcut: 'mod + s',
  },
  {
    label: (<FormattedMessage id="ui-local-kb-admin.shortcut.expandAll" />),
    name: 'expandAllSections',
    shortcut: 'mod + alt + b'
  },
  {
    label: (<FormattedMessage id="ui-local-kb-admin.shortcut.collapseAll" />),
    name: 'collapseAllSections',
    shortcut: 'mod + alt + g'
  },
  {
    label: (<FormattedMessage id="ui-local-kb-admin.shortcut.expandOrCollapse" />),
    name: 'expandOrCollapseAccordion',
    shortcut: 'spacebar'
  },
  {
    label: (<FormattedMessage id="ui-local-kb-admin.shortcut.goToSearchFilter" />),
    name: 'search',
    shortcut: 'mod + alt + h',
  },
];

export default appKeyboardShortcuts;
