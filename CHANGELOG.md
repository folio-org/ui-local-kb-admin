# Change history for ui-local-kb-admin
## 5.3.0 In progress

## 5.2.0 2022-07-05
* ERM-2110 / ERM-2085 Refactor away from react-intl-safe-html
* ERM-2100 Replace babel-eslint with @babel/eslint-parser
* ERM-1971 Bump eslint-config stripes version

## 5.1.5 2022-03-02

* ERM-1950 Reset syncStatus for remote KB
* ERM-1949 Reset cursor for remote KB
* ERM-1896 Upgrade `@folio/react-intl-safe-html` for compatibility with `@folio/stripes` `v7`.
* ERM-1888 Display syncStatus, cursor and lastChecked for local KB admin External data sources
* ERM-1799, ERM-1800 Added filters and translations for new Job types
  * Identifier Reassignment Job
  * Resource Rematch Job
  * Naive MatchKey Assignment Job
* ERM-1760 Local KB admin: Apply keyboard shortcuts modal guidelines

## 5.0.0 2021-10-07
* Upgrade to Stripes v7
* Add `Export Log` option to the UI
* Support title ingestion process. ERM-1801
* Display the keyboard shortcuts modal. ERM-1734
* Included interface dependency for erm 5.0

## 4.1.0 2021-06-16
* ERM-1684 Set up ui-local-kb-admin Registry entry
* ERM-1625 ui-local-kb-admin.jobs.edit should include erm.files.edit and erm.kbs.view as subpermissions
* ERM-1595 Add descriptions to visible permission set in ui-local-kb-admin
* ERM-1558 Local KB admin: Give focus to the Package Name field on opening the "New KBART import job" form

## 4.0.0 2021-03-17
* Upgrade to Stripes 6.0
* Default filter values removed when label is changed ERM-1551
* Added dep for stripe-cli v2 ERM-1550
* Added keyboard shortcuts. ERM-1240
* Change labels for Job classes in Local KB Import UI ERM-1539
* On Platform view Action button should not show if user would see no options in Action dropdown ERM-1225
* Applied "Actions" button pattern. ERM-1150
* Support for e-resource proxies and url customisers ERM-1102
  * UIs for managing proxy url and customiser url configurations from the Platform context ERM-1194
  * UI for managing proxy server configurations ERM-1109


## 3.0.0 2020-10-15
* Upgrade to Stripes 5.0
* Refactor to `miragejs` from `bigtest/mirage`.

## 2.0.0 2020-06-10
* Upgrade to Stripes 4.0
* Added translations
* Added ability to set "Trusted for title instance metadata" value for local KB data sources. ERM-794 795
* Bumped the required node version to 10

## 1.3.3 2020-03-11
* Disabled tests

## 1.3.2 2020-03-11
* Fixed tests

## 1.3.1 2020-03-11
* Fixed tests

## 1.3.0 2020-03-11
* Switched to using `<FormattedUTCDate>` from Stripes. ERM-635
* Switched to using `<Spinner>` from Stripes. ERM-635
* Improved performance for job log and error lists. ERM-642
* Added support for importing KBART files. ERM-685
* Added callouts and confirmation modals. ERM-727 733
* Upgrade to Stripes 3.0

## 1.2.0 2019-12-02
* Update stripes to v2.10.1 to support PaneFooter.
* Move the Save & close button and add a Cancel button to Pane footer. ERM-414
* Improved performance when viewing info and error logs.
* Added permission sets

## 1.1.1 2019-09-10
* Added translations.

## 1.1.0 2019-09-09
* Added functionality to create jobs. ERM-337
* Added settings page for External Data Sources. ERM-83
* Added ability to import packages from files. ERM-217

## 1.0.0 2019-07-22
* Search and view jobs. ERM-332
* Initial setup. ERM-289
