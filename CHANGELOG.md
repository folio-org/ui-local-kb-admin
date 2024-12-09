# Change history for ui-local-kb-admin

## 8.1.1 2024-12-09
  * ERM-3461 Cannot reset sync status via the UI  

## 8.1.0 2024-11-01
  * ERM-3380 Update module license and guidance for ui-local-kb-admin
  * ERM-3354 Review and cleanup Module Descriptor for ui-local-kb-admin (Eureka)
  * ERM-3234 React v19: refactor ui-local-kb-admin away from default props for functional components
  * ERM-3165 Replace moment with dayjs across app suite
  * FOLIO-4086 Fix GitHub Actions workflow not running for tags
  * ProxyServerSettings
    * Fixed issue where wrong callout text showed up while saving ProxyServerSetting
    * Swapped deprecated use of renderToOverlay out for a usePortal instead in ProxyServerSettingsForm

## 8.0.1 2024-04-19
  * ERM-3195 Settings page for Proxy server settings should use filter `filters=context.value%3D%3Durlproxier`
  * ERM-3180 LOCAL external source should not offer delete option
  * Translations

## 8.0.0 2024-03-22
* ERM-3164 New proxy server setting form includes old data
* ERM-3163 On attempting to save an external data source if the save fails the toast message should reflect this
* ERM-3129 Remove explicit typescript version
* ERM-2981 Standardise use of external url validator library across ERM apps
* ERM-2793 Swap proxy server settings from card-based to MCL based form
* ERM-2792 Swap external datasources (LKB) from card-based to MCL based form
* *BREAKING* Switched to erm interface 7

## 7.0.0 2023-10-13
  * ERM-3051 Default filters and sort not applied in Local KB Admin
  * ERM-3045 Swap Logs component to prev-next pagination
  * ERM-3030 *BREAKING* bump `react-intl` to `v6.4.4`
  * ERM-3024 Local KB admin external data source Reset cursor / Reset sync status do not work
  * ERM-3001 Update Node.js to v18 in GitHub Actions
  * ERM-2973 Replace naive fetch hooks with parallelised ones (and deprecate)
    * ERM-2976 Switch to useParallelBatchFetch
  * ERM-2641 Upgrade to Grails 5 (including Hibernate 5.6.x) for Poppy
    * Added okapi interface dependency on new erm interface 6.0
  * ERM-2633 Add view only settings for Local KB Admin
  * ERM-2056 Local KB Admin - Implement MCL Next/Previous pagination
    * ERM-3049 On Next/Previous pagination the page of results doesn't go to top of page
  * STRIPES-870 *BREAKING* upgrade react to v18
    * ERM-2985 upgrade ui-local-kb-admin React to v18

## 6.0.0 2023-02-22
* ERM-2637 ProxyServer Settings page breaks when cancel the first and only entry
* ERM-2618 Remove unneeded `react-redux`
* ERM-2590 Increment ui-local-kb-admin to Stripes v8
* ERM-2571 Remove BigTest/Nightmare dependencies and tests (ui-local-kb-admin)
* ERM-2570 New button/settings don't display for Proxy server settings
* ERM-2556 Increment ui-local-kb-admin to Stripes v8
* ERM-2467 Change export file name and file extension in Agreements and Local KB admin
* ERM-2461 Bump ui-local-kb-admin erm-components dep
* ERM-2392 Add erm.packages.collection.import to UI perm set
* FAT-83 ui-local-kb-admin: UI tests replacement with RTL/Jest
  * ERM-2528 Add test coverage for ui-local-kb-admin <ProxyServerSettingsView>
  * ERM-2527 Add test coverage for ui-local-kb-admin <ProxyServerSettingsListFieldArray>
  * ERM-2526 Add test coverage for ui-local-kb-admin <ExternalDataSourcesForm>
  * ERM-2525 Add test coverage for ui-local-kb-admin <ProxyServerSettingsFields>
  * ERM-2524 Add test coverage for ui-local-kb-admin <ProxyServerSettingsEdit>
  * ERM-2523 Add test coverage for ui-local-kb-admin <ExternalDataSourcesListFieldArray>
  * ERM-2522 Add test coverage for ui-local-kb-admin <ExternalDataSourcesListFieldArray>
  * ERM-2521 Add test coverage for ui-local-kb-admin <ExternalDataSourcesFields>
  * ERM-2520 Add test coverage for ui-local-kb-admin <ExternalDataSourcesFields>
  * ERM-2519 Add test coverage for ui-local-kb-admin <Jobs>
  * ERM-2518 Add test coverage for ui-local-kb-admin <JobInfo>
  * ERM-2517 Add test coverage for ui-local-kb-admin <JobInfo>
  * ERM-2516 Refactor local-kb-admin routes
  * ERM-1519 Add test coverage for ui-local-kb-admin <ProxyServerSettingsRoute>
  * ERM-1518 Add test coverage for ui-local-kb-admin <ExternalDataSourcesSettingsRoute>
  * ERM-1515 Add test coverage for ui-local-kb-admin <JobsRoute>
  * ERM-1514 Add test coverage for ui-local-kb-admin <JobViewRoute>
  * ERM-1513 Add test coverage for ui-local-kb-admin <JobViewRoute>
  * ERM-1303 Add test coverage for ui-local-kb-admin <JobCreateRoute>
  * ERM-1242 Add test coverage for ui-local-kb-admin <Logs>

## 5.3.0 2022-10-27
* ERM-2323 stripes-erm-components should be a peer
* ERM-2277 Karma tests fail on Github Actions CI with Node v14 and v16 LTS
* ERM-2149 update outdated dependencies in ui-local-kb-admin
* ERM-1986 Move identifiers between title instances
* Bump to stripes-erm-components ^7.0.0


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
