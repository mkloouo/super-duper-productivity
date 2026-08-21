import { ConfigFormSection, AppFeaturesConfig } from '../global-config.model';
import { T } from '../../../t.const';

// Note: several AppFeaturesConfig keys (isTimeTrackingEnabled, isFocusModeEnabled,
// isPlannerEnabled, isBoardsEnabled, isScheduleDayPanelEnabled, isIssuesPanelEnabled,
// isDonatePageEnabled, isFinishDayEnabled, isHabitsEnabled, isEnableUserProfiles) are
// permanently disabled for this fork (see default-global-config.const.ts) and have no
// toggle here on purpose — their routes/nav/UI were removed, so re-enabling them via
// settings would just produce dead links. The model fields themselves are kept
// untouched for sync/data compatibility with the mainstream app.
export const EXPERIMENTAL_APP_FEATURE_KEYS: ReadonlyArray<keyof AppFeaturesConfig> = [];

export const APP_FEATURES_FORM_CFG: ConfigFormSection<AppFeaturesConfig> = {
  title: T.GCF.APP_FEATURES.TITLE,
  key: 'appFeatures',
  help: T.GCF.APP_FEATURES.HELP,
  items: [
    {
      key: 'isSchedulerEnabled',
      type: 'slide-toggle',
      templateOptions: {
        label: T.GCF.APP_FEATURES.SCHEDULE,
        icon: 'schedule',
      },
    },
    {
      key: 'isProjectNotesEnabled',
      type: 'slide-toggle',
      templateOptions: {
        label: T.GCF.APP_FEATURES.PROJECT_NOTES,
        icon: 'comment',
      },
    },
    {
      key: 'isSyncIconEnabled',
      type: 'slide-toggle',
      templateOptions: {
        label: T.GCF.APP_FEATURES.SYNC_BUTTON,
        icon: 'sync',
      },
    },
    {
      key: 'isSearchEnabled',
      type: 'slide-toggle',
      templateOptions: {
        label: T.GCF.APP_FEATURES.SEARCH,
        icon: 'search',
      },
    },
  ],
};
