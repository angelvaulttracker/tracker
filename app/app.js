const STORAGE_KEY = "sonny-angel-tracker-progress-v1";
const SETTINGS_STORAGE_KEY = "sonny-angel-tracker-settings-v1";
const RECOVERY_STORAGE_KEY = "sonny-angel-tracker-recovery-v1";
const STOCK_STORAGE_KEY = "sonny-stock-shelf-v1";
const TRACKER_STOCK_SEARCH_KEY = "tracker-stock-search-v1";
const TRACKER_STOCK_STATUS_KEY = "tracker-stock-status-v1";
const TRACKER_STOCK_SORT_KEY = "tracker-stock-sort-v1";
const TRACKER_STOCK_DISPLAY_KEY = "tracker-stock-display-v1";
const TRACKER_STOCK_DENSITY_KEY = "tracker-stock-density-v1";
const ANALYTICS_SESSION_KEY = "sonny-site-analytics-session-v1";

const STATUS_RANK = {
  have: 0,
  iso: 1,
  diso: 2,
  missing: 3,
};

const WISHLIST_RANKER_BASE_SCORE = 1000;
const WISHLIST_RANKER_DISO_BONUS = 36;
const WISHLIST_RANKER_ELO_K = 28;
const WISHLIST_RANKER_TIE_K = 14;

const SPECIAL_TRACKER_SERIES_FILTERS = [
  { value: "__secrets__", label: "Secrets only" },
  { value: "__robbys__", label: "Robbys only" },
];

const ARTIST_SERIES = new Set([
  "Angel in The Bird Garden",
  "With Colette",
  "Collaboration with Cai",
  "Collaboration WAAC 2022",
  "Collaboration WAAC 2023",
]);

const grid = document.querySelector("#collection-grid");
const template = document.querySelector("#card-template");
const wishlistTemplate = document.querySelector("#wishlist-card-template");
const collectedTemplate = document.querySelector("#collected-card-template");
const statGrid = document.querySelector("#stat-grid");
const saveStatusPill = document.querySelector("#save-status-pill");
const saveStatusCopy = document.querySelector("#save-status-copy");
const accountMenuWrap = document.querySelector("#account-menu-wrap");
const mobileNavWrap = document.querySelector("#mobile-nav-wrap");
const mobileNavTrigger = document.querySelector("#mobile-nav-trigger");
const appHeader = document.querySelector(".app-header");
const accountTrigger = document.querySelector("#account-trigger");
const accountTriggerAvatar = document.querySelector("#account-trigger-avatar");
const accountTriggerLabel = document.querySelector("#account-trigger-label");
const accountTriggerSubtext = document.querySelector("#account-trigger-subtext");
const accountMenu = document.querySelector("#account-menu");
const accountOpenModalButton = document.querySelector("#account-open-modal");
const accountOpenSettingsButton = document.querySelector("#account-open-settings");
const accountMenuSignOutButton = document.querySelector("#account-menu-sign-out");
const accountModalShell = document.querySelector("#account-modal-shell");
const accountModalBackdrop = document.querySelector("#account-modal-backdrop");
const accountModalCloseButton = document.querySelector("#account-modal-close");
const collectedDetailModalShell = document.querySelector("#collected-detail-modal-shell");
const collectedDetailBackdrop = document.querySelector("#collected-detail-backdrop");
const collectedDetailCloseButton = document.querySelector("#collected-detail-close");
const collectedDetailArt = document.querySelector("#collected-detail-art");
const collectedDetailSeries = document.querySelector("#collected-detail-series");
const collectedDetailName = document.querySelector("#collected-detail-name");
const collectedDetailPhotoInput = document.querySelector("#collected-detail-photo-input");
const collectedDetailPhotoUploadButton = document.querySelector("#collected-detail-photo-upload");
const collectedDetailPhotoReplaceButton = document.querySelector("#collected-detail-photo-replace");
const collectedDetailPhotoRemoveButton = document.querySelector("#collected-detail-photo-remove");
const collectedDetailRequestImageButton = document.querySelector("#collected-detail-request-image");
const collectedDetailUploadedPhoto = document.querySelector("#collected-detail-uploaded-photo");
const collectedDetailUploadedPhotoImage = document.querySelector("#collected-detail-uploaded-photo-image");
const collectedDetailCustomName = document.querySelector("#collected-detail-custom-name");
const collectedDetailDate = document.querySelector("#collected-detail-date");
const collectedDetailCondition = document.querySelector("#collected-detail-condition");
const collectedDetailConditionCustomField = document.querySelector("#collected-detail-condition-custom-field");
const collectedDetailConditionCustom = document.querySelector("#collected-detail-condition-custom");
const collectedDetailHasBoxFoil = document.querySelector("#collected-detail-has-box-foil");
const collectedDetailDisplayLocation = document.querySelector("#collected-detail-display-location");
const collectedDetailCurrentValue = document.querySelector("#collected-detail-current-value");
const collectedDetailModeButtons = document.querySelectorAll(".collected-detail-mode-button");
const collectedDetailPurchasedFields = document.querySelector("#collected-detail-purchased-fields");
const collectedDetailTradedFields = document.querySelector("#collected-detail-traded-fields");
const collectedDetailPurchasedFrom = document.querySelector("#collected-detail-purchased-from");
const collectedDetailPurchasedPrice = document.querySelector("#collected-detail-purchased-price");
const collectedDetailTradedWith = document.querySelector("#collected-detail-traded-with");
const collectedDetailTradedForInput = document.querySelector("#collected-detail-traded-for-input");
const collectedDetailTradedForOptions = document.querySelector("#collected-detail-traded-for-options");
const collectedDetailAddTradedForButton = document.querySelector("#collected-detail-add-traded-for");
const collectedDetailTradedForList = document.querySelector("#collected-detail-traded-for-list");
const collectedDetailMixFields = document.querySelector("#collected-detail-mix-fields");
const collectedDetailMixPayingAmount = document.querySelector("#collected-detail-mix-paying-amount");
const collectedDetailNotes = document.querySelector("#collected-detail-notes");
const settingsOpenAccountButton = document.querySelector("#settings-open-account");
const accountModalAuthSection = document.querySelector("#account-modal-auth-section");
const accountModalSessionSection = document.querySelector("#account-modal-session-section");
const settingsAuthSummaryTitle = document.querySelector("#settings-auth-summary-title");
const settingsAuthSummaryCopy = document.querySelector("#settings-auth-summary-copy");
const settingsAuthSummaryPill = document.querySelector("#settings-auth-summary-pill");
const settingsCloudCount = document.querySelector("#settings-cloud-count");
const settingsDeviceCount = document.querySelector("#settings-device-count");
const accountCloudCount = document.querySelector("#account-cloud-count");
const accountDeviceCount = document.querySelector("#account-device-count");
const settingsCloudState = document.querySelector("#settings-cloud-state");
const settingsLastSync = document.querySelector("#settings-last-sync");
const accountCloudState = document.querySelector("#account-cloud-state");
const accountLastSync = document.querySelector("#account-last-sync");
const insightGrid = document.querySelector("#insight-grid");
const seriesProgressGrid = document.querySelector("#series-progress-grid");
const insightsSeriesFilter = document.querySelector("#insights-series-filter");
const insightsSeriesSort = document.querySelector("#insights-series-sort");
const insightsColorCodeModeToggle = document.querySelector("#insights-color-code-mode");
const insightsResetBrowserButton = document.querySelector("#insights-reset-browser");
const searchInput = document.querySelector("#search-input");
const statusFilter = document.querySelector("#status-filter");
const seriesFilter = document.querySelector("#series-filter");
const sortFilter = document.querySelector("#sort-filter");
const trackerColumnsSelect = document.querySelector("#tracker-columns");
const showOnlyFavorites = document.querySelector("#show-only-favorites");
const resultsCount = document.querySelector("#results-count");
const resetButton = document.querySelector("#reset-button");
const isoGrid = document.querySelector("#iso-grid");
const disoGrid = document.querySelector("#diso-grid");
const isoCount = document.querySelector("#iso-count");
const disoCount = document.querySelector("#diso-count");
const wishlistBoardView = document.querySelector("#wishlist-board-view");
const wishlistRankerFlow = document.querySelector("#wishlist-ranker-flow");
const wishlistMakerFlow = document.querySelector("#wishlist-maker-flow");
const openWishlistRankerButton = document.querySelector("#open-wishlist-ranker");
const openIsoMakerButton = document.querySelector("#open-iso-maker");
const wishlistLanding = document.querySelector("#wishlist-landing");
const wishlistLandingSummary = document.querySelector("#wishlist-landing-summary");
const wishlistLandingStage = document.querySelector(".wishlist-landing-stage");
const wishlistStageMenu = document.querySelector(".wishlist-stage-menu");
const wishlistStageMenuClose = document.querySelector("#wishlist-stage-menu-close");
const wishlistControlsMenu = document.querySelector(".wishlist-controls-menu");
const wishlistControlsTrigger = document.querySelector(".wishlist-controls-trigger");
const wishlistFloatingGrid = document.querySelector("#wishlist-floating-grid");
const wishlistTitleEditor = document.querySelector("#wishlist-title-editor");
const wishlistLandingTitle = document.querySelector("#wishlist-landing-title");
const wishlistTitleEditButton = document.querySelector("#wishlist-title-edit");
const wishlistTitleTextInput = document.querySelector("#wishlist-title-text");
const wishlistTitleFontSelect = document.querySelector("#wishlist-title-font");
const wishlistLayoutEditButton = document.querySelector("#wishlist-layout-edit");
const wishlistLayoutResetButton = document.querySelector("#wishlist-layout-reset");
const wishlistLegendEditButton = document.querySelector("#wishlist-legend-edit");
const wishlistRankerOpenButton = document.querySelector("#wishlist-ranker-open");
const wishlistLandingLegend = document.querySelector("#wishlist-landing-legend");
const wishlistLegendEditor = document.querySelector("#wishlist-legend-editor");
const wishlistLegendEditorList = document.querySelector("#wishlist-legend-editor-list");
const wishlistLegendAddButton = document.querySelector("#wishlist-legend-add");
const wishlistGridViewButton = document.querySelector("#wishlist-grid-view");
const wishlistBench = document.querySelector("#wishlist-bench");
const wishlistBenchGrid = document.querySelector("#wishlist-bench-grid");
const wishlistBenchCopy = document.querySelector("#wishlist-bench-copy");
const wishlistSearch = document.querySelector("#wishlist-search");
const wishlistStatusFilter = document.querySelector("#wishlist-status-filter");
const wishlistSeriesFilter = document.querySelector("#wishlist-series-filter");
const wishlistSortFilter = document.querySelector("#wishlist-sort-filter");
const wishlistGridLayout = document.querySelector("#wishlist-grid-layout");
const wishlistGridViewSection = document.querySelector("#wishlist-grid-view-section");
const isoColumn = document.querySelector("#iso-column");
const disoColumn = document.querySelector("#diso-column");
const wishlistRankerCloseButton = document.querySelector("#wishlist-ranker-close");
const wishlistRankerRerankButton = document.querySelector("#wishlist-ranker-rerank");
const wishlistRankerSummary = document.querySelector("#wishlist-ranker-summary");
const wishlistRankerStage = document.querySelector("#wishlist-ranker-stage");
const wishlistRankerLeftButton = document.querySelector("#wishlist-ranker-left");
const wishlistRankerLeftArt = document.querySelector("#wishlist-ranker-left-art");
const wishlistRankerLeftSeries = document.querySelector("#wishlist-ranker-left-series");
const wishlistRankerLeftName = document.querySelector("#wishlist-ranker-left-name");
const wishlistRankerLeftStatus = document.querySelector("#wishlist-ranker-left-status");
const wishlistRankerRightButton = document.querySelector("#wishlist-ranker-right");
const wishlistRankerRightArt = document.querySelector("#wishlist-ranker-right-art");
const wishlistRankerRightSeries = document.querySelector("#wishlist-ranker-right-series");
const wishlistRankerRightName = document.querySelector("#wishlist-ranker-right-name");
const wishlistRankerRightStatus = document.querySelector("#wishlist-ranker-right-status");
const wishlistRankerSkipButton = document.querySelector("#wishlist-ranker-skip");
const wishlistRankerTooToughButton = document.querySelector("#wishlist-ranker-too-tough");
const wishlistRankerPreviewMeta = document.querySelector("#wishlist-ranker-preview-meta");
const wishlistRankerPreview = document.querySelector("#wishlist-ranker-preview");
const makerSelectionStep = document.querySelector("#maker-selection-step");
const makerCanvasStep = document.querySelector("#maker-canvas-step");
const makerPickerGrid = document.querySelector("#maker-picker-grid");
const makerSelectionCount = document.querySelector("#maker-selection-count");
const makerCanvasCount = document.querySelector("#maker-canvas-count");
const makerCanvas = document.querySelector("#maker-canvas");
const makerBackgroundGrid = document.querySelector("#maker-background-grid");
const makerBackgroundUploadInput = document.querySelector("#maker-background-upload");
const makerColumnsDownButton = document.querySelector("#maker-columns-down");
const makerColumnsUpButton = document.querySelector("#maker-columns-up");
const makerColumnsValue = document.querySelector("#maker-columns-value");
const makerWidthDownButton = document.querySelector("#maker-width-down");
const makerWidthUpButton = document.querySelector("#maker-width-up");
const makerWidthValue = document.querySelector("#maker-width-value");
const makerHeightDownButton = document.querySelector("#maker-height-down");
const makerHeightUpButton = document.querySelector("#maker-height-up");
const makerHeightValue = document.querySelector("#maker-height-value");
const makerOrderSelect = document.querySelector("#maker-order-select");
const makerLabelStyleSelect = document.querySelector("#maker-label-style-select");
const makerEmojiPanel = document.querySelector("#maker-emoji-panel");
const makerDisoEmojiInput = document.querySelector("#maker-diso-emoji");
const makerIsoEmojiInput = document.querySelector("#maker-iso-emoji");
const makerCustomCodeEnabledToggle = document.querySelector("#maker-custom-code-enabled");
const makerCustomCodeFields = document.querySelector("#maker-custom-code-fields");
const makerCustomLabelNameInput = document.querySelector("#maker-custom-label-name");
const makerCustomEmojiInput = document.querySelector("#maker-custom-emoji");
const makerOrderNote = document.querySelector("#maker-order-note");
const makerArrangementList = document.querySelector("#maker-arrangement-list");
const makerLayoutNameInput = document.querySelector("#maker-layout-name");
const makerSaveNewButton = document.querySelector("#maker-save-new");
const makerSaveCurrentButton = document.querySelector("#maker-save-current");
const makerNewDraftButton = document.querySelector("#maker-new-draft");
const makerSavedList = document.querySelector("#maker-saved-list");
const makerSelectAllButton = document.querySelector("#maker-select-all");
const makerClearAllButton = document.querySelector("#maker-clear-all");
const makerBuildButton = document.querySelector("#maker-build");
const makerEditSelectionButton = document.querySelector("#maker-edit-selection");
const makerCloseButton = document.querySelector("#maker-close");
const makerCloseCanvasButton = document.querySelector("#maker-close-canvas");
const collectedGrid = document.querySelector("#collected-grid");
const collectedSummary = document.querySelector("#collected-summary");
const collectedSearch = document.querySelector("#collected-search");
const collectedSeriesMultiselect = document.querySelector("#collected-series-multiselect");
const collectedSeriesFilterButton = document.querySelector("#collected-series-filter-button");
const collectedSeriesFilterPanel = document.querySelector("#collected-series-filter-panel");
const collectedSeriesAllToggle = document.querySelector("#collected-series-all");
const collectedSeriesOptions = document.querySelector("#collected-series-options");
const collectedViewFilter = document.querySelector("#collected-view-filter");
const collectedArmiesViewField = document.querySelector("#collected-armies-view-field");
const collectedArmiesView = document.querySelector("#collected-armies-view");
const collectedShelfGroupField = document.querySelector("#collected-shelf-group-field");
const collectedShelfGrouping = document.querySelector("#collected-shelf-grouping");
const collectedShelfDensityField = document.querySelector("#collected-shelf-density-field");
const collectedShelfDensity = document.querySelector("#collected-shelf-density");
const collectedArmyThresholdField = document.querySelector("#collected-army-threshold-field");
const collectedArmyThreshold = document.querySelector("#collected-army-threshold");
const collectedSortFilter = document.querySelector("#collected-sort-filter");
const collectedShowMultipleSeparateField = document.querySelector("#collected-show-multiple-separate-field");
const collectedShowMultipleSeparateToggle = document.querySelector("#collected-show-multiple-separate");
const collectedResultsCount = document.querySelector("#collected-results-count");
const trackerStockSearch = document.querySelector("#tracker-stock-search");
const trackerStockStatusFilter = document.querySelector("#tracker-stock-status-filter");
const trackerStockSort = document.querySelector("#tracker-stock-sort");
const trackerStockDisplayMode = document.querySelector("#tracker-stock-display-mode");
const trackerStockCardDensity = document.querySelector("#tracker-stock-card-density");
const trackerStockResultsCount = document.querySelector("#tracker-stock-results-count");
const trackerStockGrid = document.querySelector("#tracker-stock-grid");
const trackerBackToTopButton = document.querySelector("#tracker-back-to-top");
const hideSearchInput = document.querySelector("#hide-search-input");
const hideSeriesList = document.querySelector("#hide-series-list");
const hideSonniesList = document.querySelector("#hide-sonnies-list");
const hiddenSeriesCount = document.querySelector("#hidden-series-count");
const hiddenSonniesCount = document.querySelector("#hidden-sonnies-count");
const hideViewButtons = document.querySelectorAll(".hide-view-button");
const unhideVisibleSeriesButton = document.querySelector("#unhide-visible-series");
const unhideVisibleSonniesButton = document.querySelector("#unhide-visible-sonnies");
const authStatusTitle = document.querySelector("#auth-status-title");
const authStatusCopy = document.querySelector("#auth-status-copy");
const authStatusPill = document.querySelector("#auth-status-pill");
const authForm = document.querySelector("#auth-form");
const authEmailInput = document.querySelector("#auth-email");
const authPasswordInput = document.querySelector("#auth-password");
const authMagicLinkButton = document.querySelector("#auth-magic-link");
const authSignInButton = document.querySelector("#auth-sign-in");
const authSignUpButton = document.querySelector("#auth-sign-up");
const authNewPasswordInput = document.querySelector("#auth-new-password");
const authSetPasswordButton = document.querySelector("#auth-set-password");
const authBackupFileInput = document.querySelector("#auth-backup-file");
const authRestoreBackupButton = document.querySelector("#auth-restore-backup");
const authExportJsonButton = document.querySelector("#auth-export-json");
const authSyncNowButton = document.querySelector("#auth-sync-now");
const authImportLocalButton = document.querySelector("#auth-import-local");
const authSignOutButton = document.querySelector("#auth-sign-out");
const authFeedback = document.querySelector("#auth-feedback");
const accountAuthFeedback = document.querySelector("#account-auth-feedback");
const openBugReportButton = document.querySelector("#open-bug-report");
const closeBugReportButton = document.querySelector("#close-bug-report");
const cancelBugReportButton = document.querySelector("#cancel-bug-report");
const bugReportPanel = document.querySelector("#bug-report-panel");
const bugReportForm = document.querySelector("#bug-report-form");
const bugReportTitle = document.querySelector("#bug-report-title");
const bugReportPanelCopy = document.querySelector("#bug-report-panel-copy");
const bugReportNameInput = document.querySelector("#bug-report-name");
const bugReportContactInput = document.querySelector("#bug-report-contact");
const bugReportDescriptionLabel = document.querySelector("#bug-report-description-label");
const bugReportDescriptionInput = document.querySelector("#bug-report-description");
const bugReportImagesInput = document.querySelector("#bug-report-images");
const bugReportUploadField = document.querySelector("#bug-report-upload-field");
const bugReportUploadEyebrow = document.querySelector("#bug-report-upload-eyebrow");
const bugReportUploadTitle = document.querySelector("#bug-report-upload-title");
const bugReportUploadCopy = document.querySelector("#bug-report-upload-copy");
const bugUploadList = document.querySelector("#bug-upload-list");
const supportRequestSummary = document.querySelector("#support-request-summary");
const supportRequestItemName = document.querySelector("#support-request-item-name");
const supportRequestItemSeries = document.querySelector("#support-request-item-series");
const supportRequestChooser = document.querySelector("#support-request-chooser");
const supportRequestChoiceButtons = document.querySelectorAll("[data-support-image-kind]");
const supportPhotoConsent = document.querySelector("#support-photo-consent");
const supportPhotoConsentInput = document.querySelector("#support-photo-consent-input");
const supportCaptchaBlock = document.querySelector("#support-captcha-block");
const supportCaptchaWidget = document.querySelector("#support-captcha-widget");
const bugReportSubmitButton = document.querySelector("#submit-bug-report");
const bugReportFeedback = document.querySelector("#bug-report-feedback");
const settingsSubtabs = document.querySelectorAll(".settings-subtab");
const settingsSubpanels = document.querySelectorAll(".settings-subpanel");
const collectionFieldToggles = document.querySelectorAll("[id^='field-toggle-']");
const viewTabs = document.querySelectorAll(".view-tab");
const viewPanels = document.querySelectorAll(".view-panel");

const DEFAULT_COLLECTION_FIELD_VISIBILITY = {
  "collected-name": true,
  "date-collected": true,
  acquisition: true,
  condition: true,
  "box-foil": true,
  "display-location": true,
  "current-value": true,
  notes: true,
  photo: true,
};

const SUPPORT_EMAIL = "angelvaulttracker@gmail.com";

let sonnies = [];
let progress = loadProgress();
let catalogSeriesOrder = new Map();
let catalogItemOrder = new Map();

const DEFAULT_WISHLIST_LEGEND_ITEMS = [
  { id: "iso", emoji: "✦", label: "ISO", tone: "iso" },
  { id: "diso", emoji: "♥", label: "DISO", tone: "diso" },
  { id: "low-prio", emoji: "★", label: "Low prio", tone: "buy" },
];

const DEFAULT_WISHLIST_TITLE_TEXT = "ISO / DISO";
const DEFAULT_WISHLIST_TITLE_FONT = "fraunces";
const WISHLIST_TITLE_FONTS = ["fraunces", "manrope", "georgia", "didot"];

const MAKER_CANVAS_PADDING_PX = 36;
const MAKER_CANVAS_GAP_PX = 12;
const MAKER_CANVAS_MIN_CARD_WIDTH_PX = 76;
const MAKER_CANVAS_MIN_CARD_HEIGHT_PX = 94;
const MAKER_CANVAS_EMOJI_LEGEND_PX = 58;
const MAKER_CANVAS_SECTION_TITLE_PX = 72;
const MAKER_CANVAS_SECTION_BREAK_PX = 48;

function isLegacyWishlistLegend(items) {
  if (!Array.isArray(items)) {
    return false;
  }

  const normalized = items.map((item) => ({
    emoji: typeof item?.emoji === "string" ? item.emoji.trim() : "",
    label: typeof item?.label === "string" ? item.label.trim().toLowerCase() : "",
    tone: String(item?.tone || ""),
  }));

  const joined = normalized
    .map((item) => `${item.emoji}|${item.label}|${item.tone}`)
    .join("||");

  return (
    joined === "✦|iso|iso||♥|diso|diso" ||
    joined === "★|starred for buy|buy||♥|diso dreamies|diso||✦|iso floaters|iso"
  );
}

function normalizeWishlistLegendItems(items) {
  if (!Array.isArray(items) || !items.length || isLegacyWishlistLegend(items)) {
    return DEFAULT_WISHLIST_LEGEND_ITEMS.map((item) => ({ ...item }));
  }

  return items
    .filter((item) => item && typeof item === "object")
    .map((item, index) => ({
      id: typeof item.id === "string" && item.id ? item.id : `legend-${index + 1}`,
      emoji: typeof item.emoji === "string" && item.emoji.trim() ? item.emoji.trim().slice(0, 2) : "✦",
      label: typeof item.label === "string" && item.label.trim() ? item.label.trim() : `Label ${index + 1}`,
      tone: ["iso", "diso", "buy", "custom"].includes(String(item.tone)) ? String(item.tone) : "custom",
    }));
}

function normalizeWishlistBoardItemStates(states) {
  if (!states || typeof states !== "object") {
    return {};
  }

  return Object.fromEntries(
    Object.entries(states)
      .filter(([id, value]) => typeof id === "string" && value && typeof value === "object")
      .map(([id, value]) => [
        id,
        {
          benched: Boolean(value.benched),
          legendId:
            typeof value.legendId === "string" && value.legendId.trim()
              ? value.legendId.trim()
              : "",
        },
      ]),
  );
}

function normalizeWishlistTitleText(value) {
  if (typeof value !== "string") {
    return DEFAULT_WISHLIST_TITLE_TEXT;
  }

  const trimmed = value.trim();
  return trimmed || DEFAULT_WISHLIST_TITLE_TEXT;
}

function normalizeWishlistTitleFont(value) {
  return WISHLIST_TITLE_FONTS.includes(String(value)) ? String(value) : DEFAULT_WISHLIST_TITLE_FONT;
}

function normalizeWishlistMakerLayouts(layouts) {
  if (!Array.isArray(layouts)) {
    return [];
  }

  return layouts
    .filter((layout) => layout && typeof layout === "object")
    .map((layout, index) => ({
      id:
        typeof layout.id === "string" && layout.id
          ? layout.id
          : `maker-layout-${index + 1}`,
      name:
        typeof layout.name === "string" && layout.name.trim()
          ? layout.name.trim()
          : `Dream board ${index + 1}`,
      savedAt:
        typeof layout.savedAt === "string" && layout.savedAt
          ? layout.savedAt
          : new Date().toISOString(),
      draftSelection: Array.isArray(layout.draftSelection)
        ? layout.draftSelection.filter((entry) => typeof entry === "string")
        : [],
      appliedSelection: Array.isArray(layout.appliedSelection)
        ? layout.appliedSelection.filter((entry) => typeof entry === "string")
        : [],
      background:
        typeof layout.background === "string" &&
        (MAKER_BACKGROUNDS.some((background) => background.id === layout.background) ||
          layout.background === "custom")
          ? layout.background
          : "blush",
      customBackgroundDataUrl:
        typeof layout.customBackgroundDataUrl === "string" ? layout.customBackgroundDataUrl : "",
      customBackgroundName:
        typeof layout.customBackgroundName === "string" ? layout.customBackgroundName : "",
      columns:
        Number.isFinite(Number(layout.columns)) &&
        Number(layout.columns) >= 1 &&
        Number(layout.columns) <= 10
          ? Math.round(Number(layout.columns))
          : 4,
      orderMode:
        ["custom", "rank-asc", "iso-first", "wanted", "name-asc", "series-asc"].includes(String(layout.orderMode))
          ? String(layout.orderMode)
          : "custom",
      canvasWidthInches:
        Number.isFinite(Number(layout.canvasWidthInches)) &&
        Number(layout.canvasWidthInches) >= 1 &&
        Number(layout.canvasWidthInches) <= 20
          ? Math.round(Number(layout.canvasWidthInches))
          : 8,
      canvasHeightInches:
        Number.isFinite(Number(layout.canvasHeightInches)) &&
        Number(layout.canvasHeightInches) >= 1 &&
        Number(layout.canvasHeightInches) <= 20
          ? Math.round(Number(layout.canvasHeightInches))
          : 10,
      labelStyle:
        ["none", "section-labels", "emoji-code"].includes(String(layout.labelStyle))
          ? String(layout.labelStyle)
          : "none",
      isoEmoji:
        typeof layout.isoEmoji === "string" && layout.isoEmoji.trim() ? layout.isoEmoji.trim().slice(0, 4) : "💙",
      disoEmoji:
        typeof layout.disoEmoji === "string" && layout.disoEmoji.trim() ? layout.disoEmoji.trim().slice(0, 4) : "💗",
      customCodeEnabled: Boolean(layout.customCodeEnabled),
      customLabelName:
        typeof layout.customLabelName === "string" && layout.customLabelName.trim()
          ? layout.customLabelName.trim()
          : "On the way",
      customEmoji:
        typeof layout.customEmoji === "string" && layout.customEmoji.trim()
          ? layout.customEmoji.trim().slice(0, 4)
          : "✨",
      customEmojiIds: Array.isArray(layout.customEmojiIds)
        ? layout.customEmojiIds.filter((entry) => typeof entry === "string")
        : [],
    }));
}

function getWishlistLegendItem(id) {
  const items = normalizeWishlistLegendItems(settings.wishlistLegendItems);
  return items.find((item) => item.id === id) || DEFAULT_WISHLIST_LEGEND_ITEMS.find((item) => item.id === id) || null;
}

function getWishlistDefaultLegendId(id) {
  return getStatus(id) === "diso" ? "diso" : "iso";
}

function getWishlistBoardItemState(id) {
  return settings.wishlistBoardItemStates?.[id] || { benched: false, legendId: "" };
}

function getWishlistBoardLegendId(id) {
  const state = getWishlistBoardItemState(id);
  return getWishlistLegendItem(state.legendId)?.id || getWishlistDefaultLegendId(id);
}

function getWishlistBoardLegend(id) {
  return getWishlistLegendItem(getWishlistBoardLegendId(id)) || getWishlistLegendItem(getWishlistDefaultLegendId(id));
}

function isWishlistBoardBenched(id) {
  return Boolean(getWishlistBoardItemState(id).benched);
}

function saveWishlistBoardItemState(id, patch) {
  settings.wishlistBoardItemStates = normalizeWishlistBoardItemStates({
    ...(settings.wishlistBoardItemStates || {}),
    [id]: {
      ...getWishlistBoardItemState(id),
      ...patch,
    },
  });
  saveSettings();
}

function benchWishlistItem(id) {
  saveWishlistBoardItemState(id, { benched: true });
}

function restoreWishlistBoardItem(id) {
  saveWishlistBoardItemState(id, { benched: false });
}

function updateWishlistBoardLegend(id, legendId) {
  saveWishlistBoardItemState(id, { legendId, benched: false });
  if (legendId === "iso" || legendId === "diso") {
    saveStatusChange(id, legendId);
  }
}

function normalizeWishlistRankerScores(scores) {
  if (!scores || typeof scores !== "object") {
    return {};
  }

  return Object.fromEntries(
    Object.entries(scores)
      .filter(([id, value]) => typeof id === "string" && Number.isFinite(Number(value)))
      .map(([id, value]) => [id, Number(value)]),
  );
}

function normalizeWishlistRankerPairCounts(counts) {
  if (!counts || typeof counts !== "object") {
    return {};
  }

  return Object.fromEntries(
    Object.entries(counts)
      .filter(([key, value]) => typeof key === "string" && Number.isFinite(Number(value)) && Number(value) >= 0)
      .map(([key, value]) => [key, Math.round(Number(value))]),
  );
}

function getWishlistBadgeEmoji(status) {
  return getWishlistLegendItem(status)?.emoji || "✦";
}

let settings = loadSettings();
let wishlistImmersedForced = false;
let currentWishlistRankerPair = [];
let activeWishlistDrag = null;
let activeWishlistRotateDrag = null;
let activeWishlistSubview = "board";
let hideManagerView = "all";
let makerDraftSelection = [];
let makerAppliedSelection = [];
let makerBackground = "blush";
let makerCustomBackgroundDataUrl = "";
let makerCustomBackgroundName = "";
let makerCustomBackgroundJustUploaded = false;
let makerColumns = 4;
let makerOrderMode = "custom";
let makerCanvasWidthInches = 8;
let makerCanvasHeightInches = 10;
let makerLabelStyle = "none";
let makerIsoEmoji = "💙";
let makerDisoEmoji = "💗";
let makerCustomCodeEnabled = false;
let makerCustomLabelName = "On the way";
let makerCustomEmoji = "✨";
let makerCustomEmojiIds = [];
let makerActiveSavedLayoutId = "";
let makerLayoutName = "Dream board 1";
let expandedCollectedId = null;
let expandedCollectedKey = null;
let pendingCollectedCenterKey = null;
let collectedSeriesSelection = [];
let inferredSeriesYearHints = new Map();
let displaySeriesCache = new Map();
let likelySecretIds = new Set();
let insightsPinnedSeries = "";
let activeOwnedCounterId = null;
let expandedInsightLists = new Set();
let activeCollectedDetailId = null;
let activeCollectedCopyIndexes = {};
let supportPanelMode = "bug_report";
let supportPanelRequestedItem = null;
let supportImageRequestKind = "request_only";
let supportCaptchaToken = "";
let supportCaptchaWidgetId = null;
let supportCaptchaLoader = null;
let trackerStockSearchValue = localStorage.getItem(TRACKER_STOCK_SEARCH_KEY) || "";
let trackerStockStatusValue = localStorage.getItem(TRACKER_STOCK_STATUS_KEY) || "all";
let trackerStockSortValue = localStorage.getItem(TRACKER_STOCK_SORT_KEY) || "newest";
let trackerStockDisplayValue = localStorage.getItem(TRACKER_STOCK_DISPLAY_KEY) || "shelf";
let trackerStockDensityValue = localStorage.getItem(TRACKER_STOCK_DENSITY_KEY) || "roomy";
const imageMap = window.SONNY_IMAGE_MAP || {};
const manualOverrides = window.SONNY_MANUAL_OVERRIDES || {};
const LOCAL_MANUAL_ITEM_OVERRIDES = {
  "page-10-01-rabbit": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-1/01__rabbit.png",
    artSource: "series-lock",
  },
  "page-10-02-elephant": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-1/02__elephant.png",
    artSource: "series-lock",
  },
  "page-10-03-cockerel": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-1/07__cockerel.png",
    artSource: "series-lock",
  },
  "page-10-04-dalmatian": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-1/08__dalmatian.png",
    artSource: "series-lock",
  },
  "page-10-05-frog": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-1/09__frog.png",
    artSource: "series-lock",
  },
  "page-10-06-koala": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-1/10__koala.png",
    artSource: "series-lock",
  },
  "page-10-07-panda": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-1/03__panda.png",
    artSource: "series-lock",
  },
  "page-10-08-sloth": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-1/04__sloth.png",
    artSource: "series-lock",
  },
  "page-10-09-tiger": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-1/05__tiger.png",
    artSource: "series-lock",
  },
  "page-10-10-white-bear": {
    artPath: "./app/assets/manual/animal-series-1-white-bear.png",
    artSource: "manual-upload",
  },
  "page-10-11-monkey": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-1/11__monkey.png",
    artSource: "series-lock",
  },
  "page-10-12-owl": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-1/12__owl.png",
    artSource: "series-lock",
  },
  "page-10-13-chipmunk": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-1/13__chipmunk.png",
    artSource: "series-lock",
  },
  "page-10-14-robby-angel": {
    artPath: "./app/assets/manual/animal-series-1-robby.png",
    artSource: "manual-upload",
  },
  "page-11-01-mouse": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-2/01__mouse.png",
    artSource: "series-lock",
  },
  "page-11-02-lesser-panda": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-2/02__lesser-panda.png",
    artSource: "series-lock",
  },
  "page-11-03-chameleon": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-2/07__chameleon.png",
    artSource: "series-lock",
  },
  "page-11-04-uribou": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-2/08__uribou.png",
    artSource: "series-lock",
  },
  "page-11-05-skunk": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-2/09__skunk.png",
    artSource: "series-lock",
  },
  "page-11-06-sheep": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-2/10__sheep.png",
    artSource: "series-lock",
  },
  "page-11-07-hedgehog": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-2/03__hedgehog.png",
    artSource: "series-lock",
  },
  "page-11-08-fawn": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-2/04__fawn.png",
    artSource: "series-lock",
  },
  "page-11-09-duck": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-2/05__duck.png",
    artSource: "series-lock",
  },
  "page-11-10-cow": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-2/06__cow.png",
    artSource: "series-lock",
  },
  "page-11-11-reindeer": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-2/11__reindeer.png",
    artSource: "series-lock",
  },
  "page-11-12-pig": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-2/12__pig.png",
    artSource: "series-lock",
  },
  "page-11-13-kappa": {
    artPath: "./sonny_png_library_guidebook_backup/regulars/animal-collections/animal-series-ver-2/13__kappa__page-011.png",
    artSource: "series-lock",
  },
  "page-11-14-robby-angel": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-2/14__robby-angel.png",
    artSource: "series-lock",
  },
  "page-12-01-parrot": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-3/01__parrot.png",
    artSource: "series-lock",
  },
  "page-12-02-rhinoceros": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-3/02__rhinoceros.png",
    artSource: "series-lock",
  },
  "page-12-03-chihuahua": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-3/07__chihuahua.png",
    artSource: "series-lock",
  },
  "page-12-04-crocodile": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-3/08__crocodile.png",
    artSource: "series-lock",
  },
  "page-12-05-french-bulldog": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-3/09__french-bulldog.png",
    artSource: "series-lock",
  },
  "page-12-06-giraffe": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-3/10__giraffe.png",
    artSource: "series-lock",
  },
  "page-12-07-snake": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-3/03__snake.png",
    artSource: "series-lock",
  },
  "page-12-08-toy-poodle": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-3/04__toy-poodle.png",
    artSource: "series-lock",
  },
  "page-12-09-zebra": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-3/05__zebra.png",
    artSource: "series-lock",
  },
  "page-12-10-american-shorthair": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-3/06__american-short-hair.png",
    artSource: "series-lock",
  },
  "page-12-11-lop-ear-rabbit": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-3/11__lop-ear-rabbit.png",
    artSource: "series-lock",
  },
  "page-12-12-macaw": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-3/12__macaw.png",
    artSource: "series-lock",
  },
  "page-12-13-unicorn": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-3/13__unicorn.png",
    artSource: "series-lock",
  },
  "page-12-14-robby-angel": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-3/14__robby-angel.png",
    artSource: "series-lock",
  },
  "page-13-01-hippopotamus": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-4/01__hippopotamus.png",
    artSource: "series-lock",
  },
  "page-13-02-horse": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-4/02__horse.png",
    artSource: "series-lock",
  },
  "page-13-03-anteater": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-4/07__anteater.png",
    artSource: "series-lock",
  },
  "page-13-04-buffalo": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-4/08__buffalo.png",
    artSource: "series-lock",
  },
  "page-13-05-calico-cat": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-4/09__calico-cat.png",
    artSource: "series-lock",
  },
  "page-13-06-cheetah": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-4/10__cheetah.png",
    artSource: "series-lock",
  },
  "page-13-07-lion": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-4/03__lion.png",
    artSource: "series-lock",
  },
  "page-13-08-peacock": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-4/04__peacock.png",
    artSource: "series-lock",
  },
  "page-13-09-shiba-inu": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-4/05__shiba-inu.png",
    artSource: "series-lock",
  },
  "page-13-10-alpaca": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-4/06__alpaca.png",
    artSource: "series-lock",
  },
  "page-13-11-goat": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-4/11__goat.png",
    artSource: "series-lock",
  },
  "page-13-12-gorilla": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-4/12__gorilla.png",
    artSource: "series-lock",
  },
  "page-13-13-dragon": {
    artPath: "./sonny_png_library_guidebook_backup/regulars/animal-collections/animal-series-ver-4/13__dragon__page-013.png",
    artSource: "series-lock",
  },
  "page-13-14-robby-angel": {
    artPath: "./sonny_png_library/regulars/animal-collections/animal-series-4/14__robby-angel.png",
    artSource: "series-lock",
  },
  "page-18-13-chipmunk": {
    artPath: "./app/assets/manual/unrefined-chipmunk.jpg",
    artSource: "manual-upload",
  },
  "page-18-14-robby-angel": {
    artPath: "./app/assets/manual/unrefined-robby-ver-1.jpg",
    artSource: "manual-upload",
  },
};
const manualItemOverrides = {
  ...LOCAL_MANUAL_ITEM_OVERRIDES,
  ...(manualOverrides.items || {}),
};
const supabaseConfig = window.SONNY_SUPABASE_CONFIG || {};
const authState = {
  client: null,
  session: null,
  user: null,
  configured: false,
  ready: false,
  syncing: false,
  syncTimer: null,
  hydrating: false,
  sessionExpired: false,
  cloudItemCount: null,
  cloudLoadState: "idle",
  lastSuccessfulSyncAt: "",
  isSigningOut: false,
};
const saveState = {
  mode: "local",
  message: "Tracker changes are currently saved on this device.",
};
const analyticsState = {
  queue: [],
  flushTimer: null,
  flushing: false,
  disabled: false,
  fallbackSessionId: "",
  seenKeys: new Set(),
};
const IMAGE_CACHE_BUSTER = "20260316-robby-refresh";
const MANUAL_ASSET_CACHE_BUSTER = String(Date.now());
const MAKER_BACKGROUNDS = [
  {
    id: "blush",
    name: "Blush studio",
    description: "Warm pink clouds with a soft collector-card feel.",
    preview:
      "radial-gradient(circle at 18% 18%, rgba(244, 200, 207, 0.44), transparent 24%), radial-gradient(circle at 82% 24%, rgba(255, 232, 238, 0.72), transparent 26%), linear-gradient(180deg, rgba(255, 247, 249, 0.92), rgba(248, 230, 236, 0.96))",
  },
  {
    id: "sky",
    name: "Sky shelf",
    description: "Airy blue with a little sunshine to keep things bright.",
    preview:
      "radial-gradient(circle at 22% 18%, rgba(220, 235, 255, 0.72), transparent 24%), radial-gradient(circle at 78% 22%, rgba(252, 247, 210, 0.66), transparent 24%), linear-gradient(180deg, rgba(242, 248, 255, 0.94), rgba(220, 235, 250, 0.98))",
  },
  {
    id: "peach",
    name: "Peach glow",
    description: "Creamy peach tones for a sweeter, warmer lineup.",
    preview:
      "radial-gradient(circle at 16% 18%, rgba(255, 220, 198, 0.76), transparent 24%), radial-gradient(circle at 85% 22%, rgba(255, 241, 214, 0.76), transparent 28%), linear-gradient(180deg, rgba(255, 249, 238, 0.92), rgba(255, 230, 214, 0.98))",
  },
  {
    id: "mint",
    name: "Mint wash",
    description: "Fresh green for a lighter, calmer composition.",
    preview:
      "radial-gradient(circle at 18% 18%, rgba(216, 239, 224, 0.76), transparent 24%), radial-gradient(circle at 82% 24%, rgba(235, 249, 239, 0.8), transparent 28%), linear-gradient(180deg, rgba(246, 255, 249, 0.92), rgba(223, 242, 230, 0.98))",
  },
];
const SERIES_DEFAULT_YEAR = {
  "Animal Series 1": "2018",
  "Animal Series 2": "2018",
  "Animal Series 3": "2018",
  "Animal Series 4": "2018",
  "Sweets Series": "2018",
  "Marine Series": "2019",
  "Flower Series": "2019",
  "Fruit Series": "2019",
  "Vegetable Series": "2019",
};
const UNREFINED_REGULAR_GUIDE_SERIES = new Set([
  "Animal Series Ver. 1",
  "Animal Series Ver. 2",
  "Animal Series Ver. 3",
  "Animal Series Ver. 4",
  "Marine Series",
  "Flower Series",
  "Fruit Series",
  "Vegetable Series",
]);

function isExplicitGuideUnrefinedSeries(label) {
  return /^Unrefined\b/i.test((label || "").trim());
}

function normalizeGuideRegularSeriesLabel(label) {
  const rawLabel = (label || "").trim();
  if (!rawLabel) {
    return "";
  }

  const animalMatch = rawLabel.match(/^(Unrefined\s+)?Animal Series Ver\.\s*(\d)$/i);
  if (animalMatch) {
    const prefix = animalMatch[1] ? "~" : "";
    return `Animal Series ${animalMatch[2]} (${prefix}2018)`;
  }

  const namedMatch = rawLabel.match(/^(Unrefined\s+)?(Marine|Flower|Fruit|Vegetable) Series$/i);
  if (namedMatch) {
    const base = `${namedMatch[2][0].toUpperCase()}${namedMatch[2].slice(1).toLowerCase()} Series`;
    const prefix = namedMatch[1] ? "~" : "";
    return `${base} (${prefix}2019)`;
  }

  return "";
}

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));

  if (authState.user && authState.configured) {
    localStorage.setItem(RECOVERY_STORAGE_KEY, JSON.stringify(progress));
    setSaveState("syncing", "Saving this tracker update to your cloud account...");
    scheduleCloudProgressSync();
    return;
  }

  setSaveState("saved", "Saved on this device. Sign in anytime if you want cloud backup across devices.");
}

function clearRecoveryProgress() {
  localStorage.removeItem(RECOVERY_STORAGE_KEY);
}

function loadRecoveryProgress() {
  try {
    return JSON.parse(localStorage.getItem(RECOVERY_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function hasMeaningfulProgress(sourceProgress = progress) {
  return Object.values(sourceProgress).some((entry) => meaningfulProgressEntry(entry));
}

function isSessionError(error) {
  const message = String(error?.message || "").toLowerCase();
  const code = String(error?.code || "").toLowerCase();
  const status = Number(error?.status || 0);

  return (
    status === 401 ||
    status === 403 ||
    code.includes("jwt") ||
    code.includes("session") ||
    message.includes("jwt") ||
    message.includes("session") ||
    message.includes("token") ||
    message.includes("refresh token") ||
    message.includes("not authenticated") ||
    message.includes("invalid claim") ||
    message.includes("auth session missing")
  );
}

async function handleExpiredSession(contextLabel = "session") {
  window.clearTimeout(authState.syncTimer);
  window.clearTimeout(authState.sessionCheckTimer);
  authState.syncing = false;
  authState.sessionExpired = true;

  if (hasMeaningfulProgress(progress)) {
    localStorage.setItem(RECOVERY_STORAGE_KEY, JSON.stringify(progress));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }

  authState.session = null;
  authState.user = null;

  try {
    await authState.client?.auth.signOut({ scope: "local" });
  } catch (error) {
    console.warn("Could not fully clear expired session locally", error);
  }

  renderAuthState();
  setAuthFeedback(`Your account session expired while ${contextLabel}. Your latest tracker changes were kept on this device, so please log in again to keep syncing.`);
  setSaveState("error", "Your session expired. Recent tracker changes were kept on this device until you log in again.");
  openAccountModal();
}

async function verifySessionActive(contextLabel = "checking your session") {
  if (!authState.client || !authState.user || authState.isSigningOut || authState.sessionExpired) {
    return;
  }

  try {
    const {
      data: { session },
      error,
    } = await authState.client.auth.getSession();

    if (error) {
      throw error;
    }

    if (!session?.user) {
      await handleExpiredSession(contextLabel);
    }
  } catch (error) {
    if (isSessionError(error)) {
      await handleExpiredSession(contextLabel);
    } else {
      console.warn("Session verification failed", error);
    }
  }
}

function loadSettings() {
  try {
    return normalizeSettingsSnapshot(JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY) || "{}"));
  } catch {
    return normalizeSettingsSnapshot({});
  }
}

function getDefaultTrackerColumns() {
  return window.matchMedia("(max-width: 980px)").matches ? "4" : "6";
}

function normalizeSettingsSnapshot(parsed = {}) {
  const defaultTrackerColumns = getDefaultTrackerColumns();
  return {
    hiddenSeries: Array.isArray(parsed.hiddenSeries) ? parsed.hiddenSeries : [],
    hiddenSonnies: Array.isArray(parsed.hiddenSonnies) ? parsed.hiddenSonnies : [],
    trackerColumns:
      Number.isFinite(Number(parsed.trackerColumns)) &&
      Number(parsed.trackerColumns) >= 4 &&
      Number(parsed.trackerColumns) <= 8
        ? String(parsed.trackerColumns)
        : defaultTrackerColumns,
    collectedShelfGrouping:
      ["all", "series"].includes(String(parsed.collectedShelfGrouping))
        ? String(parsed.collectedShelfGrouping)
        : "all",
    collectedShelfDensity:
      Number.isFinite(Number(parsed.collectedShelfDensity)) &&
      Number(parsed.collectedShelfDensity) >= 1 &&
      Number(parsed.collectedShelfDensity) <= 8
        ? String(Math.round(Number(parsed.collectedShelfDensity)))
        : "4",
    collectedArmyThreshold:
      Number.isFinite(Number(parsed.collectedArmyThreshold)) && Number(parsed.collectedArmyThreshold) >= 2
        ? String(Math.round(Number(parsed.collectedArmyThreshold)))
        : "2",
    collectedArmiesView:
      ["overview", "shelf"].includes(String(parsed.collectedArmiesView))
        ? String(parsed.collectedArmiesView)
        : "overview",
    activeView:
      ["tracker", "insights", "wishlist", "collected", "stock", "settings"].includes(String(parsed.activeView))
        ? String(parsed.activeView)
        : "tracker",
    wishlistLandingEditMode: Boolean(parsed.wishlistLandingEditMode),
    wishlistFloatingPositions:
      parsed.wishlistFloatingPositions && typeof parsed.wishlistFloatingPositions === "object"
        ? parsed.wishlistFloatingPositions
        : {},
    wishlistBoardItemStates: normalizeWishlistBoardItemStates(parsed.wishlistBoardItemStates),
    wishlistLegendItems: normalizeWishlistLegendItems(parsed.wishlistLegendItems),
    wishlistRankerScores: normalizeWishlistRankerScores(parsed.wishlistRankerScores),
    wishlistRankerPairCounts: normalizeWishlistRankerPairCounts(parsed.wishlistRankerPairCounts),
    wishlistMakerLayouts: normalizeWishlistMakerLayouts(parsed.wishlistMakerLayouts),
    wishlistLandingTitleText: normalizeWishlistTitleText(parsed.wishlistLandingTitleText),
    wishlistLandingTitleFont: normalizeWishlistTitleFont(parsed.wishlistLandingTitleFont),
    wishlistLegendEditMode: Boolean(parsed.wishlistLegendEditMode),
    wishlistTitleEditMode: Boolean(parsed.wishlistTitleEditMode),
    wishlistBoardMode:
      ["immersive", "grid"].includes(String(parsed.wishlistBoardMode))
        ? String(parsed.wishlistBoardMode)
        : "immersive",
    wishlistGridLayout:
      ["split", "stacked"].includes(String(parsed.wishlistGridLayout))
        ? String(parsed.wishlistGridLayout)
        : "split",
    collectionFieldVisibility: {
      ...DEFAULT_COLLECTION_FIELD_VISIBILITY,
      ...(parsed.collectionFieldVisibility && typeof parsed.collectionFieldVisibility === "object"
        ? parsed.collectionFieldVisibility
        : {}),
    },
    collectedSeriesSelection:
      Array.isArray(parsed.collectedSeriesSelection)
        ? parsed.collectedSeriesSelection.filter((entry) => typeof entry === "string")
        : [],
    collectedShowMultipleSeparate:
      parsed.collectedShowMultipleSeparate === undefined
        ? false
        : Boolean(parsed.collectedShowMultipleSeparate),
    insightsColorCodeMode:
      parsed.insightsColorCodeMode === undefined
        ? true
        : Boolean(parsed.insightsColorCodeMode),
  };
}

function saveSettings() {
  settings = normalizeSettingsSnapshot(settings);
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  scheduleCloudProgressSync();
}

function buildCloudSettingsPayload(sourceSettings = settings) {
  return normalizeSettingsSnapshot(sourceSettings);
}

function hasMeaningfulCloudSettings(rawSettings) {
  return Boolean(
    rawSettings &&
      typeof rawSettings === "object" &&
      Object.keys(rawSettings).length,
  );
}

function isMissingProfileStateColumnError(error) {
  const message = String(error?.message || "").toLowerCase();
  return (
    message.includes("tracker_settings") ||
    message.includes("stock_state") ||
    message.includes("could not find the 'tracker_settings' column") ||
    message.includes("could not find the 'stock_state' column") ||
    message.includes("column") && message.includes("does not exist")
  );
}

function hasMeaningfulStockState(stockItems) {
  return Array.isArray(stockItems) && stockItems.length > 0;
}

async function syncProfileStateToCloud(options = {}) {
  const { allowMissingColumns = false } = options;
  if (!authState.client || !authState.user) {
    return;
  }

  const { error } = await authState.client.from("profiles").upsert({
    id: authState.user.id,
    email: authState.user.email || null,
    tracker_settings: buildCloudSettingsPayload(),
    stock_state: loadLocalStockItems(),
    updated_at: new Date().toISOString(),
  });

  if (error) {
    if (allowMissingColumns && isMissingProfileStateColumnError(error)) {
      console.warn("Supabase profiles table is missing tracker_settings/stock_state columns; skipping profile state sync.", error);
      return;
    }
    throw error;
  }
}

async function loadProfileStateFromCloud(options = {}) {
  const { allowMissingColumns = false } = options;
  if (!authState.client || !authState.user) {
    return { trackerSettings: null, stockState: null };
  }

  const { data, error } = await authState.client
    .from("profiles")
    .select("tracker_settings,stock_state")
    .eq("id", authState.user.id)
    .maybeSingle();

  if (error) {
    if (allowMissingColumns && isMissingProfileStateColumnError(error)) {
      console.warn("Supabase profiles table is missing tracker_settings/stock_state columns; skipping profile state hydrate.", error);
      return { trackerSettings: null, stockState: null };
    }
    throw error;
  }

  return {
    trackerSettings: data?.tracker_settings || null,
    stockState: Array.isArray(data?.stock_state) ? data.stock_state : null,
  };
}

function loadLocalStockItems() {
  try {
    const saved = JSON.parse(localStorage.getItem(STOCK_STORAGE_KEY) || "null");
    if (!Array.isArray(saved)) {
      return [];
    }

    return saved.map((item) => ({
      id: item.id || crypto.randomUUID(),
      sonnyId: item.sonnyId || "",
      name: item.name || "",
      series: item.series || "",
      quantity: Math.max(1, Number(item.quantity) || 1),
      status: ["available", "pending", "sold", "traded"].includes(item.status) ? item.status : "available",
      justTrading: Boolean(item.justTrading),
      price: Number(item.price) || 0,
      priceHistory: Array.isArray(item.priceHistory)
        ? item.priceHistory
            .map((entry) => ({
              id: entry?.id || crypto.randomUUID(),
              price: Number(entry?.price) || 0,
              changedAt: entry?.changedAt || item.createdAt || new Date().toISOString(),
            }))
            .filter((entry) => entry.price > 0)
        : [],
      createdAt: item.createdAt || new Date().toISOString(),
    }));
  } catch {
    return [];
  }
}

function normalizeStockItemsSnapshot(items) {
  return Array.isArray(items)
    ? items.map((item) => ({
        ...item,
        price: Number(item.price) || 0,
        priceHistory: Array.isArray(item.priceHistory)
          ? item.priceHistory
              .map((entry) => ({
                id: entry?.id || crypto.randomUUID(),
                price: Number(entry?.price) || 0,
                changedAt: entry?.changedAt || new Date().toISOString(),
              }))
              .filter((entry) => entry.price > 0)
          : [],
      }))
    : [];
}

function saveLocalStockItems(items) {
  const normalized = normalizeStockItemsSnapshot(items);
  localStorage.setItem(STOCK_STORAGE_KEY, JSON.stringify(normalized));
  scheduleCloudProgressSync();
}

function stockNameForItem(stockItem) {
  const matched = sonnies.find((item) => item.id === stockItem.sonnyId);
  return matched ? displayName(matched) : (stockItem.name || "Untitled Sonny");
}

function stockSeriesForItem(stockItem) {
  const matched = sonnies.find((item) => item.id === stockItem.sonnyId);
  return matched ? displaySeries(matched) : (stockItem.series || "Manual entry");
}

function stockArtworkStyle(stockItem) {
  const matched = sonnies.find((item) => item.id === stockItem.sonnyId);
  if (!matched) {
    return "";
  }
  return buildArtworkStyle(matched);
}

function stockStatusLabel(status) {
  if (status === "pending") {
    return "Pending";
  }
  if (status === "sold") {
    return "Sold";
  }
  if (status === "traded") {
    return "Traded";
  }
  return "Available";
}

function formatStockPrice(stockItem) {
  if (stockItem.justTrading) {
    return "Trade";
  }
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(Number(stockItem.price || 0));
}

function formatStockPriceInputValue(stockItem) {
  const value = Number(stockItem.price || 0);
  return value > 0 ? value.toFixed(2) : "";
}

function formatStockHistoryDate(value) {
  if (!value) {
    return "Unknown date";
  }
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function updateStockItemPrice(stockItemId, nextValue) {
  const stockItems = loadLocalStockItems();
  let updatedItem = null;
  const parsedNext = Math.max(0, Math.round((Number(nextValue) || 0) * 100) / 100);

  const nextItems = stockItems.map((item) => {
    if (item.id !== stockItemId) {
      return item;
    }

    const previousPrice = Math.max(0, Math.round((Number(item.price) || 0) * 100) / 100);
    const nextPrice = parsedNext;
    const nextHistory = Array.isArray(item.priceHistory) ? [...item.priceHistory] : [];

    if (nextPrice !== previousPrice && nextPrice > 0) {
      nextHistory.push({
        id: crypto.randomUUID(),
        price: nextPrice,
        changedAt: new Date().toISOString(),
      });
    }

    updatedItem = {
      ...item,
      price: nextPrice,
      priceHistory: nextHistory,
    };
    return updatedItem;
  });

  if (!updatedItem) {
    return;
  }

  saveLocalStockItems(nextItems);
  renderStockPanel();
  setSaveState("saved", `${stockNameForItem(updatedItem)} price updated.`);
}

function removeStockPriceHistoryEntry(stockItemId, historyId) {
  const stockItems = loadLocalStockItems();
  let updatedItem = null;
  const nextItems = stockItems.map((item) => {
    if (item.id !== stockItemId) {
      return item;
    }

    updatedItem = {
      ...item,
      priceHistory: Array.isArray(item.priceHistory)
        ? item.priceHistory.filter((entry) => entry.id !== historyId)
        : [],
    };
    return updatedItem;
  });

  if (!updatedItem) {
    return;
  }

  saveLocalStockItems(nextItems);
  renderStockPanel();
  setSaveState("saved", `${stockNameForItem(updatedItem)} price history updated.`);
}

function buildStockPriceEditor(stockItem, options = {}) {
  const { compact = false } = options;
  const wrapper = document.createElement("label");
  wrapper.className = `tracker-stock-price-editor${compact ? " is-compact" : ""}`;

  const label = document.createElement("span");
  label.className = "tracker-stock-price-editor-label";
  label.textContent = stockItem.justTrading ? "Trade only" : "Current price";

  const input = document.createElement("input");
  input.className = "tracker-stock-price-input";
  input.type = "number";
  input.min = "0";
  input.step = "0.01";
  input.inputMode = "decimal";
  input.placeholder = "0.00";
  input.value = formatStockPriceInputValue(stockItem);
  input.disabled = Boolean(stockItem.justTrading);

  const commit = () => {
    if (stockItem.justTrading) {
      return;
    }
    const rawValue = input.value.trim();
    const normalizedValue = rawValue ? String(Math.max(0, Math.round((Number(rawValue) || 0) * 100) / 100)) : "0";
    if (input.dataset.lastCommitted === normalizedValue) {
      return;
    }
    input.dataset.lastCommitted = normalizedValue;
    updateStockItemPrice(stockItem.id, normalizedValue);
  };

  input.dataset.lastCommitted = String(Math.max(0, Math.round((Number(stockItem.price) || 0) * 100) / 100));
  input.addEventListener("change", commit);
  input.addEventListener("blur", commit);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      input.blur();
    }
  });

  wrapper.append(label, input);
  return wrapper;
}

function buildStockPriceHistory(stockItem, options = {}) {
  const { compact = false } = options;
  const details = document.createElement("details");
  details.className = `tracker-stock-price-history${compact ? " is-compact" : ""}`;

  const summary = document.createElement("summary");
  summary.textContent = `Price history (${Array.isArray(stockItem.priceHistory) ? stockItem.priceHistory.length : 0})`;

  const body = document.createElement("div");
  body.className = "tracker-stock-price-history-body";

  const entries = Array.isArray(stockItem.priceHistory) ? [...stockItem.priceHistory].reverse() : [];
  if (!entries.length) {
    const empty = document.createElement("p");
    empty.className = "tracker-stock-price-history-empty";
    empty.textContent = "The first non-zero price you set will start the history here.";
    body.append(empty);
  } else {
    entries.forEach((entry) => {
      const row = document.createElement("div");
      row.className = "tracker-stock-price-history-row";

      const info = document.createElement("div");
      info.className = "tracker-stock-price-history-info";

      const price = document.createElement("strong");
      price.textContent = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "USD",
      }).format(Number(entry.price || 0));

      const date = document.createElement("span");
      date.textContent = formatStockHistoryDate(entry.changedAt);

      info.append(price, date);

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "tracker-stock-history-remove";
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => removeStockPriceHistoryEntry(stockItem.id, entry.id));

      row.append(info, removeButton);
      body.append(row);
    });
  }

  details.append(summary, body);
  return details;
}

function saveTrackerStockUiPrefs() {
  localStorage.setItem(TRACKER_STOCK_SEARCH_KEY, trackerStockSearchValue);
  localStorage.setItem(TRACKER_STOCK_STATUS_KEY, trackerStockStatusValue);
  localStorage.setItem(TRACKER_STOCK_SORT_KEY, trackerStockSortValue);
  localStorage.setItem(TRACKER_STOCK_DISPLAY_KEY, trackerStockDisplayValue);
  localStorage.setItem(TRACKER_STOCK_DENSITY_KEY, trackerStockDensityValue);
}

function hasSupabaseConfig() {
  return Boolean(
    supabaseConfig &&
      typeof supabaseConfig.url === "string" &&
      supabaseConfig.url &&
      typeof supabaseConfig.anonKey === "string" &&
      supabaseConfig.anonKey,
  );
}

function createAnalyticsSessionId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `session-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
}

function getAnalyticsSessionId() {
  try {
    const existing = window.sessionStorage.getItem(ANALYTICS_SESSION_KEY);
    if (existing) {
      return existing;
    }
    const next = createAnalyticsSessionId();
    window.sessionStorage.setItem(ANALYTICS_SESSION_KEY, next);
    return next;
  } catch {
    if (!analyticsState.fallbackSessionId) {
      analyticsState.fallbackSessionId = createAnalyticsSessionId();
    }
    return analyticsState.fallbackSessionId;
  }
}

function sanitizeAnalyticsValue(value) {
  if (value == null || value === "") {
    return null;
  }
  if (Array.isArray(value)) {
    return value
      .map((entry) => sanitizeAnalyticsValue(entry))
      .filter((entry) => entry != null)
      .slice(0, 12);
  }
  if (typeof value === "object") {
    const next = {};
    Object.entries(value).forEach(([key, entry]) => {
      const sanitized = sanitizeAnalyticsValue(entry);
      if (sanitized != null) {
        next[key] = sanitized;
      }
    });
    return next;
  }
  if (typeof value === "string") {
    return value.slice(0, 240);
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return value;
  }
  return String(value).slice(0, 240);
}

function sanitizeAnalyticsMetadata(metadata = {}) {
  return sanitizeAnalyticsValue(metadata) || {};
}

function isMissingSiteEventsError(error) {
  const message = String(error?.message || "").toLowerCase();
  return (
    message.includes("site_events") ||
    message.includes("relation") && message.includes("does not exist") ||
    message.includes("could not find the table") && message.includes("site_events")
  );
}

function scheduleAnalyticsFlush() {
  if (
    analyticsState.disabled ||
    analyticsState.flushing ||
    analyticsState.flushTimer ||
    !analyticsState.queue.length
  ) {
    return;
  }

  analyticsState.flushTimer = window.setTimeout(() => {
    analyticsState.flushTimer = null;
    flushAnalyticsEvents();
  }, 1200);
}

async function flushAnalyticsEvents() {
  if (
    analyticsState.disabled ||
    analyticsState.flushing ||
    !analyticsState.queue.length ||
    !authState.client
  ) {
    return;
  }

  const batch = analyticsState.queue.splice(0, 20);
  analyticsState.flushing = true;

  const { error } = await authState.client.from("site_events").insert(batch);

  analyticsState.flushing = false;

  if (error) {
    if (isMissingSiteEventsError(error)) {
      analyticsState.disabled = true;
      console.warn("site_events table is missing; disabling analytics logging.", error);
      analyticsState.queue = [];
      return;
    }

    console.warn("Could not write analytics event batch.", error);
    analyticsState.queue = [...batch, ...analyticsState.queue].slice(-120);
  }

  if (analyticsState.queue.length) {
    scheduleAnalyticsFlush();
  }
}

function trackSiteEvent(eventName, metadata = {}, options = {}) {
  if (!hasSupabaseConfig() || analyticsState.disabled || !eventName) {
    return;
  }

  const sanitizedMetadata = sanitizeAnalyticsMetadata(metadata);
  const dedupeKey = options.oncePerSession
    ? `${eventName}:${JSON.stringify(sanitizedMetadata)}`
    : "";
  if (dedupeKey) {
    if (analyticsState.seenKeys.has(dedupeKey)) {
      return;
    }
    analyticsState.seenKeys.add(dedupeKey);
  }

  analyticsState.queue.push({
    session_id: getAnalyticsSessionId(),
    user_id: authState.user?.id || null,
    event_name: eventName,
    active_view:
      settings.activeView ||
      document.querySelector(".view-tab.is-active")?.dataset.view ||
      "",
    path: window.location.pathname || "/",
    metadata: sanitizedMetadata,
  });

  if (analyticsState.queue.length > 120) {
    analyticsState.queue.splice(0, analyticsState.queue.length - 120);
  }

  scheduleAnalyticsFlush();
}

function meaningfulProgressEntry(entry) {
  if (!entry || typeof entry !== "object") {
    return false;
  }

  const status = entry.status || "missing";
  const notes = (entry.notes || "").trim();
  const wishlistRank = getNormalizedWishlistRank(entry.wishlistRank);
  return Boolean(
    status !== "missing" ||
      notes ||
      wishlistRank != null ||
      entry.collectedAt ||
      entry.wishlistAddedAt,
  );
}

function getNormalizedWishlistRank(raw) {
  if (raw === "" || raw == null) {
    return null;
  }

  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return null;
  }

  return Math.round(parsed);
}

function buildCloudRowsFromProgress() {
  const rows = [];
  const emptyIds = [];

  Object.entries(progress).forEach(([sonnyId, entry]) => {
    if (!meaningfulProgressEntry(entry)) {
      emptyIds.push(sonnyId);
      return;
    }

    rows.push({
      user_id: authState.user.id,
      sonny_id: sonnyId,
      status: entry.status || "missing",
      notes: entry.notes || "",
      wishlist_rank: getNormalizedWishlistRank(entry.wishlistRank),
      collected_at: entry.collectedAt || null,
      wishlist_added_at: entry.wishlistAddedAt || null,
      updated_at: new Date().toISOString(),
    });
  });

  return { rows, emptyIds };
}

function getMeaningfulProgressCount(sourceProgress = progress) {
  return Object.values(sourceProgress).filter((entry) => meaningfulProgressEntry(entry)).length;
}

function getBestDeviceProgressCount() {
  return Math.max(
    getMeaningfulProgressCount(progress),
    getMeaningfulProgressCount(loadProgress()),
    getMeaningfulProgressCount(loadRecoveryProgress()),
  );
}

function formatSyncTimestamp(isoString) {
  if (!isoString) {
    return "not yet";
  }

  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return "not yet";
  }

  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function isExistingEmailError(error) {
  const message = String(error?.message || "").toLowerCase();
  return (
    message.includes("already registered") ||
    message.includes("already been registered") ||
    message.includes("user already registered") ||
    message.includes("email address is already registered") ||
    message.includes("already exists")
  );
}

function extractTrackerProgressFromBackup(payload) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  if (payload.data && typeof payload.data === "object") {
    const fullBackupProgress = payload.data[STORAGE_KEY];
    if (fullBackupProgress && typeof fullBackupProgress === "object") {
      return fullBackupProgress;
    }
  }

  if (payload[STORAGE_KEY] && typeof payload[STORAGE_KEY] === "object") {
    return payload[STORAGE_KEY];
  }

  const looksLikeRawProgress = Object.values(payload).some((entry) => {
    return entry && typeof entry === "object" && (
      "status" in entry ||
      "notes" in entry ||
      "wishlistRank" in entry ||
      "collectedAt" in entry ||
      "wishlistAddedAt" in entry
    );
  });

  return looksLikeRawProgress ? payload : null;
}

function buildTrackerBackupPayload() {
  return {
    exportedAt: new Date().toISOString(),
    app: "Sonny Angel Tracker",
    version: 1,
    data: {
      [STORAGE_KEY]: progress,
      [SETTINGS_STORAGE_KEY]: settings,
    },
    summary: {
      trackedEntries: getMeaningfulProgressCount(progress),
      hiddenSeries: settings.hiddenSeries.length,
      hiddenSonnies: settings.hiddenSonnies.length,
    },
  };
}

function downloadTrackerBackupJson() {
  try {
    const payload = buildTrackerBackupPayload();
    const stamp = new Date().toISOString().slice(0, 10);
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `sonny-tracker-backup-${stamp}.json`;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setAuthFeedback("Downloaded your tracker data as a JSON backup.");
    setSaveState("saved", "Downloaded a JSON backup of your tracker data.");
  } catch (error) {
    console.error("Failed to export tracker backup", error);
    setAuthFeedback("Could not download your tracker data just yet.");
    setSaveState("error", "Could not download your JSON backup.");
  }
}

function getCloudStateLabel() {
  if (!authState.configured) {
    return "Cloud status: setup needed.";
  }

  if (!authState.user) {
    return authState.sessionExpired
      ? "Cloud status: session expired."
      : "Cloud status: sign in to load cloud data.";
  }

  if (authState.syncing) {
    return "Cloud status: syncing now.";
  }

  if (authState.cloudLoadState === "loaded") {
    return `Cloud status: loaded ${authState.cloudItemCount || 0} saved entr${authState.cloudItemCount === 1 ? "y" : "ies"}.`;
  }

  if (authState.cloudLoadState === "empty") {
    return "Cloud status: loaded, but no saved cloud entries were found.";
  }

  if (authState.cloudLoadState === "error") {
    return "Cloud status: failed to load or save.";
  }

  return "Cloud status: not loaded yet.";
}

function renderSyncSnapshot() {
  const cloudValue =
    authState.cloudItemCount === null ? "--" : String(authState.cloudItemCount);
  const deviceValue = String(getBestDeviceProgressCount());
  const cloudStateLabel = getCloudStateLabel();
  const lastSyncLabel = `Last successful sync: ${formatSyncTimestamp(authState.lastSuccessfulSyncAt)}.`;

  if (settingsCloudCount) {
    settingsCloudCount.textContent = cloudValue;
  }
  if (settingsDeviceCount) {
    settingsDeviceCount.textContent = deviceValue;
  }
  if (accountCloudCount) {
    accountCloudCount.textContent = cloudValue;
  }
  if (accountDeviceCount) {
    accountDeviceCount.textContent = deviceValue;
  }
  if (settingsCloudState) {
    settingsCloudState.textContent = cloudStateLabel;
  }
  if (accountCloudState) {
    accountCloudState.textContent = cloudStateLabel;
  }
  if (settingsLastSync) {
    settingsLastSync.textContent = lastSyncLabel;
  }
  if (accountLastSync) {
    accountLastSync.textContent = lastSyncLabel;
  }
}

function buildProgressFromCloudRows(rows) {
  const nextProgress = {};

  (rows || []).forEach((row) => {
    nextProgress[row.sonny_id] = {
      status: row.status || "missing",
      notes: row.notes || "",
      wishlistRank: row.wishlist_rank ?? "",
      collectedAt: row.collected_at || "",
      wishlistAddedAt: row.wishlist_added_at || "",
    };
  });

  return nextProgress;
}

function setAuthFeedback(message) {
  authFeedback.textContent = message;
  if (accountAuthFeedback) {
    accountAuthFeedback.textContent = message;
  }
}

function setSaveState(mode, message) {
  saveState.mode = mode;
  saveState.message = message;

  if (!saveStatusPill || !saveStatusCopy) {
    return;
  }

  saveStatusPill.classList.remove("is-connected", "is-saved", "is-syncing", "is-error");

  if (mode === "connected") {
    saveStatusPill.textContent = "Cloud ready";
    saveStatusPill.classList.add("is-connected");
  } else if (mode === "saved") {
    saveStatusPill.textContent = "Saved";
    saveStatusPill.classList.add("is-saved");
  } else if (mode === "syncing") {
    saveStatusPill.textContent = "Syncing";
    saveStatusPill.classList.add("is-syncing");
  } else if (mode === "error") {
    saveStatusPill.textContent = "Needs attention";
    saveStatusPill.classList.add("is-error");
  } else {
    saveStatusPill.textContent = "Device only";
  }

  saveStatusCopy.textContent = message;
}

function getAccountInitial() {
  const email = authState.user?.email || "";
  return (email[0] || "?").toUpperCase();
}

function openAccountMenu() {
  if (!accountMenu || !accountTrigger) {
    return;
  }
  accountMenu.hidden = false;
  accountTrigger.setAttribute("aria-expanded", "true");
}

function closeAccountMenu() {
  if (!accountMenu || !accountTrigger) {
    return;
  }
  accountMenu.hidden = true;
  accountTrigger.setAttribute("aria-expanded", "false");
}

function openAccountModal() {
  if (!accountModalShell) {
    return;
  }
  accountModalShell.hidden = false;
  accountModalShell.classList.add("is-open");
  document.body.classList.add("modal-open");
  closeAccountMenu();
  window.setTimeout(() => {
    if (!authState.user) {
      authEmailInput?.focus();
    }
  }, 0);
}

function closeAccountModal() {
  if (!accountModalShell) {
    return;
  }
  accountModalShell.classList.remove("is-open");
  accountModalShell.hidden = true;
  document.body.classList.remove("modal-open");
}

function updateCollectedDetailModeUi(mode) {
  collectedDetailModeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.detailMode === mode);
  });

  if (collectedDetailPurchasedFields) {
    collectedDetailPurchasedFields.hidden = mode !== "purchased";
  }
  if (collectedDetailTradedFields) {
    collectedDetailTradedFields.hidden = !(mode === "traded" || mode === "mix");
  }
  if (collectedDetailMixFields) {
    collectedDetailMixFields.hidden = mode !== "mix";
  }
}

function updateCollectedConditionUi(value) {
  if (collectedDetailConditionCustomField) {
    const visibility = settings.collectionFieldVisibility || DEFAULT_COLLECTION_FIELD_VISIBILITY;
    collectedDetailConditionCustomField.hidden = value !== "custom" || visibility.condition === false;
  }
}

function applyCollectedFieldVisibility() {
  const visibility = settings.collectionFieldVisibility || DEFAULT_COLLECTION_FIELD_VISIBILITY;
  document.querySelectorAll("[data-collection-field]").forEach((element) => {
    const fieldKey = element.dataset.collectionField;
    const isVisible = visibility[fieldKey] !== false;
    element.hidden = !isVisible;
  });
}

function buildCollectedTradeOptionLabel(item) {
  return `${displayName(item)} — ${displaySeries(item)}`;
}

function findSonnyByTradeLabel(label) {
  const normalized = String(label || "").trim().toLowerCase();
  if (!normalized) {
    return null;
  }

  return sonnies.find((item) => buildCollectedTradeOptionLabel(item).toLowerCase() === normalized) || null;
}

function normalizeCollectedTradeEntries(detail) {
  if (Array.isArray(detail?.tradedForEntries) && detail.tradedForEntries.length) {
    return detail.tradedForEntries
      .map((entry) => {
        if (!entry || typeof entry !== "object") {
          return null;
        }
        return {
          id: typeof entry.id === "string" ? entry.id : "",
          label: String(entry.label || "").trim(),
        };
      })
      .filter((entry) => entry && entry.label);
  }

  if (Array.isArray(detail?.tradedForIds) && detail.tradedForIds.length) {
    return detail.tradedForIds
      .map((tradedId) => sonnies.find((item) => item.id === tradedId))
      .filter(Boolean)
      .map((item) => ({
        id: item.id,
        label: displayName(item),
      }));
  }

  if (detail?.tradedFor) {
    return String(detail.tradedFor)
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean)
      .map((label) => ({ id: "", label }));
  }

  return [];
}

function serializeCollectedTradeEntries(entries) {
  const normalizedEntries = (entries || [])
    .map((entry) => {
      if (!entry || typeof entry !== "object") {
        return null;
      }
      return {
        id: typeof entry.id === "string" ? entry.id : "",
        label: String(entry.label || "").trim(),
      };
    })
    .filter((entry) => entry && entry.label);

  return {
    tradedForEntries: normalizedEntries,
    tradedForIds: normalizedEntries.map((entry) => entry.id).filter(Boolean),
    tradedFor: normalizedEntries.map((entry) => entry.label).join(", "),
  };
}

function populateCollectedTradePicker(activeId = "") {
  if (!collectedDetailTradedForOptions) {
    return;
  }

  const options = [...sonnies].sort((left, right) => {
    return (
      compareSeriesLabels(displaySeries(left), displaySeries(right)) ||
      compareText(displayName(left), displayName(right))
    );
  });

  collectedDetailTradedForOptions.innerHTML = "";

  options.forEach((item) => {
    if (item.id === activeId) {
      return;
    }
    const option = document.createElement("option");
    option.value = buildCollectedTradeOptionLabel(item);
    collectedDetailTradedForOptions.append(option);
  });
}

function renderCollectedTradedForList(id, copyIndex = getActiveCollectedDetailCopyIndex(id)) {
  if (!collectedDetailTradedForList) {
    return;
  }

  const detail = getOwnedDetail(id, copyIndex);
  const tradedEntries = normalizeCollectedTradeEntries(detail);

  collectedDetailTradedForList.innerHTML = "";

  if (!tradedEntries.length) {
    const empty = document.createElement("p");
    empty.className = "collected-detail-traded-empty";
    empty.textContent = "No traded Sonnies added yet.";
    collectedDetailTradedForList.append(empty);
    return;
  }

  tradedEntries.forEach((tradeEntry, entryIndex) => {
    const tradedItem = tradeEntry.id ? sonnies.find((item) => item.id === tradeEntry.id) : findSonnyByTradeLabel(tradeEntry.label);

    const chip = document.createElement("div");
    chip.className = "collected-detail-traded-chip";

    const icon = document.createElement("div");
    icon.className = "collected-detail-traded-chip-art";
    if (tradedItem) {
      icon.setAttribute("style", buildArtworkStyle(tradedItem));
    } else {
      icon.classList.add("is-custom");
      icon.textContent = tradeEntry.label.slice(0, 1).toUpperCase();
    }

    const label = document.createElement("span");
    label.className = "collected-detail-traded-chip-label";
    label.textContent = tradedItem ? displayName(tradedItem) : tradeEntry.label;

    const remove = document.createElement("button");
    remove.className = "collected-detail-traded-chip-remove";
    remove.type = "button";
    remove.textContent = "×";
    remove.addEventListener("click", () => {
      const nextEntries = tradedEntries.filter((_, index) => index !== entryIndex);
      saveOwnedDetailPatch(id, copyIndex, serializeCollectedTradeEntries(nextEntries));
      renderCollectedTradedForList(id, copyIndex);
      refreshCollectedAfterDetailEdit();
    });

    chip.append(icon, label, remove);
    collectedDetailTradedForList.append(chip);
  });
}

function updateCollectedDetailPhotoUi(detail) {
  const hasPhoto = Boolean(detail?.customPhoto);

  if (collectedDetailUploadedPhoto) {
    collectedDetailUploadedPhoto.hidden = !hasPhoto;
  }
  if (collectedDetailUploadedPhotoImage) {
    if (hasPhoto) {
      collectedDetailUploadedPhotoImage.src = detail.customPhoto;
    } else {
      collectedDetailUploadedPhotoImage.removeAttribute("src");
    }
  }
  if (collectedDetailPhotoUploadButton) {
    collectedDetailPhotoUploadButton.hidden = hasPhoto;
  }
  if (collectedDetailPhotoReplaceButton) {
    collectedDetailPhotoReplaceButton.hidden = !hasPhoto;
  }
  if (collectedDetailPhotoRemoveButton) {
    collectedDetailPhotoRemoveButton.hidden = !hasPhoto;
  }
}

function closeCollectedDetailModal() {
  if (!collectedDetailModalShell) {
    return;
  }
  collectedDetailModalShell.hidden = true;
  activeCollectedDetailId = null;
  document.body.classList.remove("modal-open");
}

function openCollectedDetailModal(item, copyIndex = getActiveCollectedCopyIndex(item.id)) {
  if (!item || !collectedDetailModalShell) {
    return;
  }

  trackSiteEvent("open_collected_detail", {
    itemId: item.id,
    series: displaySeries(item),
  });

  activeCollectedDetailId = item.id;
  setActiveCollectedCopyIndex(item.id, copyIndex);
  const detail = getOwnedDetail(item.id, copyIndex);
  collectedDetailModalShell.hidden = false;
  document.body.classList.add("modal-open");

  if (collectedDetailArt) {
    collectedDetailArt.setAttribute("style", buildArtworkStyle(item));
  }
  if (collectedDetailSeries) {
    renderSeriesLabel(collectedDetailSeries, item);
  }
  if (collectedDetailName) {
    collectedDetailName.textContent = getCollectedCopyName(item, copyIndex);
  }
  if (collectedDetailCustomName) {
    collectedDetailCustomName.value = detail.customName || "";
  }
  if (collectedDetailDate) {
    collectedDetailDate.value = formatDateInputValue(detail.collectedAt || "");
  }
  if (collectedDetailCondition) {
    collectedDetailCondition.value = detail.condition || "";
  }
  if (collectedDetailConditionCustom) {
    collectedDetailConditionCustom.value = detail.conditionCustom || "";
  }
  if (collectedDetailHasBoxFoil) {
    collectedDetailHasBoxFoil.checked = Boolean(detail.hasBoxFoil);
  }
  if (collectedDetailDisplayLocation) {
    collectedDetailDisplayLocation.value = detail.displayLocation || "";
  }
  if (collectedDetailCurrentValue) {
    const value = detail.currentValueEstimate;
    collectedDetailCurrentValue.value = value == null || value === "" ? "" : String(value);
  }
  if (collectedDetailPurchasedFrom) {
    collectedDetailPurchasedFrom.value = detail.purchasedFrom || "";
  }
  if (collectedDetailPurchasedPrice) {
    const value = detail.purchasedPrice;
    collectedDetailPurchasedPrice.value = value == null || value === "" ? "" : String(value);
  }
  if (collectedDetailTradedWith) {
    collectedDetailTradedWith.value = detail.tradedWith || "";
  }
  if (collectedDetailMixPayingAmount) {
    const value = detail.mixPayingAmount;
    collectedDetailMixPayingAmount.value = value == null || value === "" ? "" : String(value);
  }
  if (collectedDetailNotes) {
    collectedDetailNotes.value = detail.notes || "";
  }

  populateCollectedTradePicker(item.id);
  renderCollectedTradedForList(item.id, copyIndex);
  updateCollectedDetailPhotoUi(detail);
  updateCollectedConditionUi(detail.condition || "");
  applyCollectedFieldVisibility();
  updateCollectedDetailModeUi(detail.acquiredBy || "purchased");
}

function shouldUseCollectedMobileDetailModal() {
  return window.matchMedia("(max-width: 640px)").matches;
}

function isCollectedEntryExpanded(item, key = item.id) {
  return settings.collectedShowMultipleSeparate ? expandedCollectedKey === key : expandedCollectedId === item.id;
}

function centerPendingCollectedBubble() {
  if (!pendingCollectedCenterKey) {
    return;
  }

  const pendingKey = pendingCollectedCenterKey;
  pendingCollectedCenterKey = null;

  window.requestAnimationFrame(() => {
    const expandedEntry = [...document.querySelectorAll("[data-id]")].find((element) => {
      return element.dataset.id === pendingKey;
    });
    if (!expandedEntry) {
      return;
    }

    const bubble = expandedEntry.querySelector(
      ".collected-shelf-details, .collected-minimal-details, .collected-body",
    ) || expandedEntry;

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
      const stickySelectors = [".app-header", ".collected-controls", ".shelf-meta"];
      const visibleTop = stickySelectors.reduce((maxBottom, selector) => {
        const element = document.querySelector(selector);
        if (!element) {
          return maxBottom;
        }
        const rect = element.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
          return maxBottom;
        }
        return Math.max(maxBottom, rect.bottom);
      }, 0);

      const rect = bubble.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
      const visibleHeight = Math.max(120, viewportHeight - visibleTop);
      const targetCenter = visibleTop + visibleHeight / 2;
      const bubbleCenter = rect.top + rect.height / 2;
      const delta = bubbleCenter - targetCenter;
      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - viewportHeight,
      );
      const nextTop = Math.min(
        maxScroll,
        Math.max(0, window.scrollY + delta),
      );

      window.scrollTo({
        top: nextTop,
        behavior: "smooth",
      });
      });
    });
  });
}

async function signOutOfCloudSync() {
  if (!authState.client) {
    setAuthFeedback("Cloud sync is not connected right now.");
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  const previousSession = authState.session;
  const previousUser = authState.user;
  const previousCloudItemCount = authState.cloudItemCount;
  const previousCloudLoadState = authState.cloudLoadState;
  const previousLastSuccessfulSyncAt = authState.lastSuccessfulSyncAt;
  authState.isSigningOut = true;
  closeAccountMenu();
  closeAccountModal();

  // Flip the UI to local mode immediately so logout feels responsive.
  authState.session = null;
  authState.user = null;
  authState.cloudItemCount = null;
  authState.cloudLoadState = "idle";
  authState.sessionExpired = false;
  setAuthFeedback("Signing out of cloud sync...");
  setSaveState("local", "Signing out. Tracker changes will stay on this device.");
  renderAuthState();
  applyFilters();

  // Clear the local session immediately so logout works even if the network is flaky.
  const { error } = await authState.client.auth.signOut({ scope: "local" });
  if (error) {
    authState.isSigningOut = false;
    authState.session = previousSession;
    authState.user = previousUser;
    authState.cloudItemCount = previousCloudItemCount;
    authState.cloudLoadState = previousCloudLoadState;
    authState.lastSuccessfulSyncAt = previousLastSuccessfulSyncAt;
    console.error("Failed to sign out", error);
    setAuthFeedback(error.message || "Could not sign out right now.");
    setSaveState("error", "Could not sign out right now. Please try again.");
    renderAuthState();
    return;
  }

  authState.ready = true;
  authState.isSigningOut = false;
  setAuthFeedback("Signed out of cloud sync.");
  setSaveState("local", "Signed out. Tracker changes are now saved on this device.");
  renderAuthState();
  applyFilters();
}

function renderAuthState() {
  if (!authStatusTitle || !authStatusCopy || !authStatusPill) {
    return;
  }

  renderSyncSnapshot();

  authStatusPill.classList.remove("is-connected", "is-syncing");
  settingsAuthSummaryPill?.classList.remove("is-connected", "is-syncing");

  if (!authState.configured) {
    authStatusTitle.textContent = "Cloud sync not connected";
    authStatusCopy.textContent = "Add your Supabase project URL and anon key in app/supabase-config.js.";
    authStatusPill.textContent = "Setup needed";
    if (settingsAuthSummaryTitle && settingsAuthSummaryCopy && settingsAuthSummaryPill) {
      settingsAuthSummaryTitle.textContent = "Cloud sync not connected";
      settingsAuthSummaryCopy.textContent = "Add your Supabase project URL and anon key in app/supabase-config.js.";
      settingsAuthSummaryPill.textContent = "Setup needed";
    }
    setAuthFeedback("Cloud sync is off until Supabase is connected.");
    setSaveState("local", "Tracker changes are currently saved on this device.");
  } else if (authState.sessionExpired) {
    authStatusTitle.textContent = "Session expired";
    authStatusCopy.textContent = "Please log back in to keep saving to your account. Recent changes were kept on this device for safety.";
    authStatusPill.textContent = "Log in again";
    if (settingsAuthSummaryTitle && settingsAuthSummaryCopy && settingsAuthSummaryPill) {
      settingsAuthSummaryTitle.textContent = "Session expired";
      settingsAuthSummaryCopy.textContent = "Cloud sync paused because your sign-in expired. Recent changes were kept on this device until you log in again.";
      settingsAuthSummaryPill.textContent = "Log in again";
    }
    setSaveState("error", "Your session expired. Recent tracker changes were kept on this device until you log in again.");
  } else if (authState.syncing) {
    authStatusTitle.textContent = authState.user
      ? "Syncing your account"
      : "Finishing account sync";
    authStatusCopy.textContent = "Saving your tracker changes to the cloud right now.";
    authStatusPill.textContent = "Syncing";
    authStatusPill.classList.add("is-syncing");
    if (settingsAuthSummaryTitle && settingsAuthSummaryCopy && settingsAuthSummaryPill) {
      settingsAuthSummaryTitle.textContent = authStatusTitle.textContent;
      settingsAuthSummaryCopy.textContent = authStatusCopy.textContent;
      settingsAuthSummaryPill.textContent = "Syncing";
      settingsAuthSummaryPill.classList.add("is-syncing");
    }
    setSaveState("syncing", "Saving your tracker changes to the cloud right now.");
  } else if (authState.user) {
    authStatusTitle.textContent = "Cloud sync is on";
    authStatusCopy.textContent = "Signed in. Tracker progress now lives in your Supabase project.";
    authStatusPill.textContent = "Connected";
    authStatusPill.classList.add("is-connected");
    if (settingsAuthSummaryTitle && settingsAuthSummaryCopy && settingsAuthSummaryPill) {
      settingsAuthSummaryTitle.textContent = "Cloud sync is on";
      settingsAuthSummaryCopy.textContent = "Signed in. Tracker progress now lives in your account.";
      settingsAuthSummaryPill.textContent = "Connected";
      settingsAuthSummaryPill.classList.add("is-connected");
    }
    if (saveState.mode !== "saved" && saveState.mode !== "error") {
      setSaveState("connected", "Cloud sync is on for your account.");
    }
  } else {
    authStatusTitle.textContent = "Ready for account login";
    authStatusCopy.textContent = "Sign in with a magic link or password to save your collection to the cloud.";
    authStatusPill.textContent = "Not signed in";
    if (settingsAuthSummaryTitle && settingsAuthSummaryCopy && settingsAuthSummaryPill) {
      settingsAuthSummaryTitle.textContent = "Ready for account login";
      settingsAuthSummaryCopy.textContent = "Sign in with a magic link or password any time you want your tracker saved to your account.";
      settingsAuthSummaryPill.textContent = "Not signed in";
    }
    setSaveState("local", "Tracker changes are saved on this device until you sign in for cloud sync.");
  }

  const disabled = !authState.configured;
  if (authMagicLinkButton) authMagicLinkButton.disabled = disabled;
  if (authSignInButton) authSignInButton.disabled = disabled;
  if (authSignUpButton) authSignUpButton.disabled = disabled;
  if (authSetPasswordButton) authSetPasswordButton.disabled = disabled || !authState.user;
  if (authRestoreBackupButton) authRestoreBackupButton.disabled = false;
  if (authSyncNowButton) authSyncNowButton.disabled = disabled || !authState.user;
  if (authImportLocalButton) authImportLocalButton.disabled = disabled || !authState.user;
  if (authSignOutButton) authSignOutButton.disabled = disabled || !authState.user;
  if (authEmailInput) authEmailInput.disabled = disabled || Boolean(authState.user);
  if (authPasswordInput) authPasswordInput.disabled = disabled || Boolean(authState.user);
  if (authNewPasswordInput) authNewPasswordInput.disabled = disabled || !authState.user;
  if (accountModalAuthSection) {
    accountModalAuthSection.hidden = disabled || Boolean(authState.user);
  }
  if (accountModalSessionSection) {
    accountModalSessionSection.hidden = disabled || !authState.user;
  }
  if (accountTriggerAvatar) {
    accountTriggerAvatar.textContent = getAccountInitial();
  }
  if (accountTriggerLabel) {
    accountTriggerLabel.textContent = authState.user ? "Account" : "Log in";
  }
  if (accountTriggerSubtext) {
    accountTriggerSubtext.textContent = authState.user
      ? "Cloud sync on"
      : (authState.sessionExpired ? "Session expired" : (authState.configured ? "Save to cloud" : "Setup needed"));
  }
  if (accountOpenModalButton) {
    accountOpenModalButton.textContent = authState.user ? "Account" : "Log in / Account";
  }
  if (accountMenuSignOutButton) {
    accountMenuSignOutButton.hidden = !authState.user;
  }
}

async function ensureProfileRow() {
  if (!authState.client || !authState.user) {
    return;
  }

  await authState.client.from("profiles").upsert({
    id: authState.user.id,
    email: authState.user.email || null,
    updated_at: new Date().toISOString(),
  });
}

async function syncProgressToCloud() {
  if (!authState.client || !authState.user || authState.hydrating) {
    return;
  }

  authState.syncing = true;
  renderAuthState();

  const { rows, emptyIds } = buildCloudRowsFromProgress();

  try {
    await ensureProfileRow();

    if (rows.length) {
      const { error } = await authState.client
        .from("collection_progress")
        .upsert(rows, { onConflict: "user_id,sonny_id" });
      if (error) {
        throw error;
      }
    }

    if (emptyIds.length) {
      const { error } = await authState.client
        .from("collection_progress")
        .delete()
        .eq("user_id", authState.user.id)
        .in("sonny_id", emptyIds);
      if (error) {
        throw error;
      }
    }

    await syncProfileStateToCloud({ allowMissingColumns: true });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    clearRecoveryProgress();
    authState.cloudItemCount = rows.length;
    authState.cloudLoadState = rows.length ? "loaded" : "empty";
    authState.lastSuccessfulSyncAt = new Date().toISOString();
    setAuthFeedback("Cloud sync is up to date.");
    setSaveState("saved", "Saved to your cloud account. Your tracker should load the same way on any signed-in device.");
  } catch (error) {
    console.error("Failed to sync tracker progress to Supabase", error);
    if (isSessionError(error)) {
      await handleExpiredSession("saving to the cloud");
      return;
    }
    authState.cloudLoadState = "error";
    setAuthFeedback("Cloud sync hit a snag. Your changes are still in memory, so try syncing again.");
    setSaveState("error", "Cloud sync hit a snag. Your latest changes are still on screen, but they may not be backed up yet.");
  } finally {
    authState.syncing = false;
    renderAuthState();
  }
}

function scheduleCloudProgressSync() {
  if (!authState.client || !authState.user) {
    return;
  }

  window.clearTimeout(authState.syncTimer);
  authState.syncTimer = window.setTimeout(() => {
    syncProgressToCloud();
  }, 300);
}

async function hydrateProgressFromCloud() {
  if (!authState.client || !authState.user) {
    return;
  }

  authState.hydrating = true;

  try {
    const localProgress = loadProgress();
    const recoveryProgress = loadRecoveryProgress();
    const inMemoryProgress = progress;
    const hasLocalProgress = hasMeaningfulProgress(localProgress);
    const hasRecoveryProgress = hasMeaningfulProgress(recoveryProgress);
    const hasInMemoryProgress = hasMeaningfulProgress(inMemoryProgress);
    const { data, error } = await authState.client
      .from("collection_progress")
      .select("sonny_id,status,notes,wishlist_rank,collected_at,wishlist_added_at")
      .eq("user_id", authState.user.id);

    if (error) {
      throw error;
    }

    const { trackerSettings: cloudTrackerSettings, stockState: cloudStockState } =
      await loadProfileStateFromCloud({ allowMissingColumns: true });

    const cloudProgress = buildProgressFromCloudRows(data || []);
    const hasCloudProgress = Object.keys(cloudProgress).length > 0;
    const hasCloudSettings = hasMeaningfulCloudSettings(cloudTrackerSettings);
    const hasCloudStock = hasMeaningfulStockState(cloudStockState);
    authState.cloudItemCount = (data || []).length;
    authState.cloudLoadState = hasCloudProgress ? "loaded" : "empty";
    authState.lastSuccessfulSyncAt = new Date().toISOString();
    const fallbackProgress = hasRecoveryProgress
      ? recoveryProgress
      : hasLocalProgress
        ? localProgress
        : hasInMemoryProgress
          ? inMemoryProgress
          : {};
    const hasFallbackProgress = hasMeaningfulProgress(fallbackProgress);
    const localSettings = loadSettings();
    const localStockState = loadLocalStockItems();

    if (!hasCloudProgress && hasFallbackProgress) {
      progress = fallbackProgress;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      settings = hasCloudSettings
        ? normalizeSettingsSnapshot({ ...localSettings, ...cloudTrackerSettings })
        : normalizeSettingsSnapshot(localSettings);
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
      if (hasCloudStock) {
        localStorage.setItem(STOCK_STORAGE_KEY, JSON.stringify(normalizeStockItemsSnapshot(cloudStockState)));
      } else if (hasMeaningfulStockState(localStockState)) {
        localStorage.setItem(STOCK_STORAGE_KEY, JSON.stringify(normalizeStockItemsSnapshot(localStockState)));
      }
      applyFilters();
      setAuthFeedback("Your cloud tracker was empty, so this device's saved progress was restored and is being saved back to your account now.");
      setSaveState("syncing", "Restoring this device's tracker progress to your cloud account.");
      await syncProgressToCloud();
      setAuthFeedback("This device's tracker progress was restored to your cloud account.");
      setSaveState("saved", "Restored this device's tracker progress to your cloud account.");
      return;
    }

    progress = cloudProgress;
    settings = hasCloudSettings
      ? normalizeSettingsSnapshot({ ...localSettings, ...cloudTrackerSettings })
      : normalizeSettingsSnapshot(localSettings);
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    if (hasCloudStock) {
      localStorage.setItem(STOCK_STORAGE_KEY, JSON.stringify(normalizeStockItemsSnapshot(cloudStockState)));
    }
    if (hasCloudProgress) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      clearRecoveryProgress();
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
    applyFilters();
    setAuthFeedback(hasCloudProgress ? "Loaded your saved cloud progress." : "Signed in and ready to save your tracker.");
    setSaveState(
      hasCloudProgress ? "saved" : "connected",
      hasCloudProgress
        ? "Loaded your saved cloud progress from your account."
        : "Signed in and ready to save your tracker to the cloud.",
    );
  } catch (error) {
    console.error("Failed to hydrate tracker progress from Supabase", error);
    if (isSessionError(error)) {
      await handleExpiredSession("loading your tracker");
      return;
    }
    authState.cloudLoadState = "error";
    setAuthFeedback("Could not load cloud progress yet. You can try syncing again in a moment.");
    setSaveState("error", "Could not load cloud progress yet. You can keep browsing and try syncing again in a moment.");
  } finally {
    authState.hydrating = false;
    renderAuthState();
  }
}

async function importLocalProgressToCloud() {
  if (!authState.user) {
    return;
  }

  const localProgress = loadProgress();
  const recoveryProgress = loadRecoveryProgress();
  const sourceProgress = hasMeaningfulProgress(localProgress)
    ? localProgress
    : hasMeaningfulProgress(recoveryProgress)
      ? recoveryProgress
      : progress;
  const localCount = getMeaningfulProgressCount(sourceProgress);
  const hasLocalProgress = localCount > 0;

  if (!hasLocalProgress) {
    setAuthFeedback("This device does not have any local tracker progress to upload.");
    return;
  }

  const shouldImport = window.confirm(
    `Use this device's tracker data for your account?\n\nThis will replace the tracker data currently saved in the cloud for this account.\n\nThis device currently has ${localCount} saved tracker entr${localCount === 1 ? "y" : "ies"}.`,
  );

  if (!shouldImport) {
    return;
  }

  progress = sourceProgress;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  applyFilters();
  await syncProgressToCloud();
  setAuthFeedback(`This device's ${localCount} tracker entr${localCount === 1 ? "y was" : "ies were"} copied to your cloud account.`);
  setSaveState("saved", "This device's tracker data was copied to your cloud account.");
}

async function resetCloudProgress() {
  if (!authState.client || !authState.user) {
    return;
  }

  const { error } = await authState.client
    .from("collection_progress")
    .delete()
    .eq("user_id", authState.user.id);

  if (error) {
    throw error;
  }
}

async function initializeSupabaseAuth() {
  authState.configured = hasSupabaseConfig() && Boolean(window.supabase?.createClient);
  authState.cloudLoadState = authState.configured ? "idle" : "unconfigured";
  renderAuthState();

  if (!authState.configured) {
    return;
  }

  authState.client = window.supabase.createClient(supabaseConfig.url, supabaseConfig.anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
  scheduleAnalyticsFlush();

  authState.client.auth.onAuthStateChange(async (event, session) => {
    authState.session = session;
    authState.user = session?.user || null;
    if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
      authState.sessionExpired = false;
    }
    renderAuthState();

    if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
      if (authState.user) {
        closeAccountModal();
        await hydrateProgressFromCloud();
        scheduleSessionChecks();
      }
    }

    if (event === "SIGNED_OUT") {
      window.clearTimeout(authState.sessionCheckTimer);
      if (authState.sessionExpired) {
        const recoveryProgress = loadRecoveryProgress();
        if (hasMeaningfulProgress(recoveryProgress)) {
          progress = recoveryProgress;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        }
        applyFilters();
        setAuthFeedback("Your session expired. Recent tracker changes were kept on this device until you log in again.");
      } else {
        authState.isSigningOut = false;
        authState.session = null;
        authState.user = null;
        authState.cloudItemCount = null;
        authState.cloudLoadState = "idle";
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        clearRecoveryProgress();
        applyFilters();
        setAuthFeedback("Signed out. Tracker progress is still on this device, and your cloud copy will be there when you log back in.");
        setSaveState("local", "Signed out. Tracker changes are now saved on this device.");
      }
      renderAuthState();
      closeAccountMenu();
      closeAccountModal();
    }
  });

  const {
    data: { session },
    error,
  } = await authState.client.auth.getSession();

  if (error) {
    console.error("Failed to restore Supabase session", error);
    setAuthFeedback("Could not restore your sign-in session yet.");
    return;
  }

  authState.session = session;
  authState.user = session?.user || null;
  authState.sessionExpired = false;
  authState.cloudItemCount = null;
  authState.cloudLoadState = session?.user ? "idle" : "idle";
  authState.ready = true;
  renderAuthState();

  if (authState.user) {
    await hydrateProgressFromCloud();
    scheduleSessionChecks();
  } else {
    const recoveryProgress = loadRecoveryProgress();
    if (hasMeaningfulProgress(recoveryProgress)) {
      progress = recoveryProgress;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      applyFilters();
      setAuthFeedback("Recent tracker changes were recovered from this device. Log in again if you want to resume cloud sync.");
    }
  }
}

function scheduleSessionChecks() {
  window.clearTimeout(authState.sessionCheckTimer);
  if (!authState.user || !authState.client) {
    return;
  }

  authState.sessionCheckTimer = window.setTimeout(async () => {
    await verifySessionActive("checking your session");
    scheduleSessionChecks();
  }, 60_000);
}

function authRedirectUrl() {
  const configuredSiteUrl = window.SONNY_SUPABASE_CONFIG?.siteUrl?.trim();
  const isLocalHost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  if (isLocalHost || !configuredSiteUrl) {
    return window.location.origin + window.location.pathname;
  }

  try {
    const redirectUrl = new URL(window.location.pathname, configuredSiteUrl);
    return redirectUrl.toString();
  } catch (error) {
    console.warn("Falling back to current page for auth redirect", error);
    return window.location.origin + window.location.pathname;
  }
}

async function sendMagicLink() {
  if (!authState.client) {
    return;
  }

  const email = authEmailInput?.value.trim() || "";
  if (!email) {
    setAuthFeedback("Add an email address first so I know where to send the magic link.");
    authEmailInput?.focus();
    return;
  }

  const { error } = await authState.client.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: authRedirectUrl(),
    },
  });

  if (error) {
    console.error("Magic link sign-in failed", error);
    setAuthFeedback(error.message || "Could not send the magic link just yet.");
    setSaveState("error", "Could not send the magic link yet. Double-check your email and try again.");
    return;
  }

  setAuthFeedback(`Magic link sent to ${email}. Open it from your email to finish signing in.`);
  setSaveState("connected", `Magic link sent to ${email}. Finish the sign-in from your inbox.`);
}

async function signInWithPassword() {
  if (!authState.client) {
    return;
  }

  const email = authEmailInput?.value.trim() || "";
  const password = authPasswordInput?.value || "";

  if (!email || !password) {
    setAuthFeedback("Enter both your email and password to sign in.");
    return;
  }

  const { error } = await authState.client.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Password sign-in failed", error);
    setAuthFeedback(error.message || "Could not sign in with that email and password.");
    setSaveState("error", "That email and password did not work just yet. Try again or use a magic link.");
    return;
  }

  setAuthFeedback("Signed in. Loading your saved tracker progress now.");
  setSaveState("syncing", "Signed in. Loading your saved tracker progress now.");
}

async function signUpWithPassword() {
  if (!authState.client) {
    return;
  }

  const email = authEmailInput?.value.trim() || "";
  const password = authPasswordInput?.value || "";

  if (!email || !password) {
    setAuthFeedback("Enter an email and password to create your account.");
    return;
  }

  const { error } = await authState.client.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: authRedirectUrl(),
    },
  });

  if (error) {
    console.error("Password sign-up failed", error);
    if (isExistingEmailError(error)) {
      setAuthFeedback("That email already has an account. Try a magic link or password sign-in instead. If you originally used a magic link, sign in first and then save a password in the Account panel.");
      setSaveState("error", "That email already has an account. Sign in instead of creating a new one.");
      return;
    }
    setAuthFeedback(error.message || "Could not create your account just yet.");
    setSaveState("error", "Could not create your account yet. Try a different password or check your email format.");
    return;
  }

  setAuthFeedback("Account created. If email confirmation is on, check your inbox before signing in.");
  setSaveState("connected", "Account created. If email confirmation is on, check your inbox before signing in.");
}

async function setPasswordForCurrentUser() {
  if (!authState.client || !authState.user) {
    setAuthFeedback("Log in with a magic link first, then you can save a password here.");
    setSaveState("error", "Log in first to save a password for this account.");
    return;
  }

  const password = authNewPasswordInput?.value || "";
  if (password.length < 6) {
    setAuthFeedback("Choose a password with at least 6 characters.");
    setSaveState("error", "Choose a longer password before saving it to your account.");
    return;
  }

  if (authSetPasswordButton) {
    authSetPasswordButton.disabled = true;
  }

  setAuthFeedback("Saving your password for this account...");
  setSaveState("syncing", "Saving your password for this account...");

  const timeoutMs = 12000;
  try {
    const result = await Promise.race([
      authState.client.auth.updateUser({ password }),
      new Promise((_, reject) => {
        window.setTimeout(() => reject(new Error("timeout")), timeoutMs);
      }),
    ]);

    const { error } = result || {};
    if (error) {
      console.error("Failed to set password for existing user", error);
      setAuthFeedback(error.message || "Could not save a password for this account yet.");
      setSaveState("error", "Could not save a password for this account yet.");
      if (authSetPasswordButton) {
        authSetPasswordButton.disabled = false;
      }
      return;
    }
  } catch (error) {
    console.error("Timed out saving password", error);
    setAuthFeedback("Saving your password took too long. Please try again.");
    setSaveState(
      "error",
      "Saving your password took too long. If you opened the magic link in an in-app browser, open it directly in Safari/Chrome and try again.",
    );
    if (authSetPasswordButton) {
      authSetPasswordButton.disabled = false;
    }
    return;
  }

  if (authNewPasswordInput) {
    authNewPasswordInput.value = "";
  }
  if (authSetPasswordButton) {
    authSetPasswordButton.disabled = false;
  }
  setAuthFeedback(`Password saved for ${authState.user.email || "this account"}. You can use password sign-in next time if you want.`);
  setSaveState("saved", "Password saved for this account.");
}

async function restoreTrackerBackupFromFile() {
  const file = authBackupFileInput?.files?.[0];
  if (!file) {
    setAuthFeedback("Choose your backup JSON file first.");
    setSaveState("error", "Choose a backup file before trying to restore it.");
    return;
  }

  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    const restoredProgress = extractTrackerProgressFromBackup(parsed);

    if (!restoredProgress || !hasMeaningfulProgress(restoredProgress)) {
      setAuthFeedback("That file did not include any tracker progress I could restore.");
      setSaveState("error", "That backup file did not include usable tracker progress.");
      return;
    }

    progress = restoredProgress;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    localStorage.setItem(RECOVERY_STORAGE_KEY, JSON.stringify(progress));
    applyFilters();

    const restoredCount = getMeaningfulProgressCount(restoredProgress);
    if (authState.user && authState.configured) {
      await syncProgressToCloud();
      setAuthFeedback(`Restored ${restoredCount} tracker entr${restoredCount === 1 ? "y" : "ies"} from your backup and synced them to your account.`);
      setSaveState("saved", "Backup restored and synced to your cloud account.");
    } else {
      setAuthFeedback(`Restored ${restoredCount} tracker entr${restoredCount === 1 ? "y" : "ies"} from your backup on this device.`);
      setSaveState("saved", "Backup restored on this device. Sign in if you want it synced to your account.");
    }

    if (authBackupFileInput) {
      authBackupFileInput.value = "";
    }
  } catch (error) {
    console.error("Failed to restore tracker backup", error);
    setAuthFeedback("Could not restore that backup file. Make sure it is a valid Sonny tracker JSON export.");
    setSaveState("error", "Could not restore that backup file.");
  }
}

function withImageVersion(path) {
  if (!path) {
    return "";
  }
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}v=${IMAGE_CACHE_BUSTER}`;
}

function withManualAssetVersion(path, item) {
  if (!path) {
    return "";
  }

  const override = getManualItemOverride(item);
  if (override.artSource === "manual-upload") {
    const separator = path.includes("?") ? "&" : "?";
    return `${path}${separator}v=${MANUAL_ASSET_CACHE_BUSTER}`;
  }

  return withImageVersion(path);
}

function labelFor(status) {
  if (status === "have") {
    return "Owned";
  }
  if (status === "iso") {
    return "ISO";
  }
  return status === "diso" ? "DISO" : status[0].toUpperCase() + status.slice(1);
}

function getStatus(id) {
  return progress[id]?.status || "missing";
}

function getNotes(id) {
  const details = getOwnedDetails(id);
  const firstDetailWithNotes = details.find((detail) => (detail.notes || "").trim());
  return firstDetailWithNotes?.notes || progress[id]?.notes || "";
}

function getWishlistRank(id) {
  return getNormalizedWishlistRank(progress[id]?.wishlistRank);
}

function getNormalizedOwnedCount(raw) {
  if (raw === "" || raw == null) {
    return null;
  }

  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return null;
  }

  return Math.round(parsed);
}

function getOwnedCount(id) {
  return getNormalizedOwnedCount(progress[id]?.ownedCount) || 1;
}

function getCollectedAt(id) {
  const details = getOwnedDetails(id)
    .map((detail) => detail.collectedAt || "")
    .filter(Boolean)
    .sort((left, right) => Date.parse(right) - Date.parse(left));
  return details[0] || progress[id]?.collectedAt || "";
}

function getCollectedDetailMode(id) {
  const mode = progress[id]?.acquiredBy || "";
  return ["purchased", "traded", "mix"].includes(mode) ? mode : "";
}

function formatDateInputValue(raw) {
  if (!raw) {
    return "";
  }
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) {
    return /^\d{4}-\d{2}-\d{2}$/.test(String(raw)) ? String(raw) : "";
  }
  return parsed.toISOString().slice(0, 10);
}

function normalizeCollectedDateValue(value, previousValue = "") {
  if (!value) {
    return previousValue || "";
  }
  const previous = previousValue ? new Date(previousValue) : null;
  if (previous && !Number.isNaN(previous.getTime())) {
    const [year, month, day] = value.split("-");
    previous.setFullYear(Number(year), Number(month) - 1, Number(day));
    return previous.toISOString();
  }
  return new Date(`${value}T12:00:00`).toISOString();
}

function getWishlistAddedAt(id) {
  return progress[id]?.wishlistAddedAt || "";
}

function createBlankOwnedDetail() {
  return {
    customName: "",
    notes: "",
    collectedAt: "",
    condition: "",
    conditionCustom: "",
    hasBoxFoil: false,
    displayLocation: "",
    currentValueEstimate: "",
    acquiredBy: "",
    purchasedFrom: "",
    purchasedPrice: "",
    tradedWith: "",
    tradedFor: "",
    tradedForIds: [],
    tradedForEntries: [],
    mixPayingAmount: "",
    customPhoto: "",
  };
}

function buildLegacyOwnedDetail(entry) {
  return {
    customName: entry?.customName || "",
    notes: entry?.notes || "",
    collectedAt: entry?.collectedAt || "",
    condition: entry?.condition || "",
    conditionCustom: entry?.conditionCustom || "",
    hasBoxFoil: Boolean(entry?.hasBoxFoil),
    displayLocation: entry?.displayLocation || "",
    currentValueEstimate: entry?.currentValueEstimate || "",
    acquiredBy: entry?.acquiredBy || "",
    purchasedFrom: entry?.purchasedFrom || "",
    purchasedPrice: entry?.purchasedPrice || "",
    tradedWith: entry?.tradedWith || "",
    tradedFor: entry?.tradedFor || "",
    tradedForIds: Array.isArray(entry?.tradedForIds) ? entry.tradedForIds : [],
    tradedForEntries: Array.isArray(entry?.tradedForEntries) ? entry.tradedForEntries : [],
    mixPayingAmount: entry?.mixPayingAmount || "",
    customPhoto: entry?.customPhoto || "",
  };
}

function getOwnedDetails(id) {
  const entry = progress[id] && typeof progress[id] === "object" ? progress[id] : {};
  const count = entry.status === "have" ? getOwnedCount(id) : Math.max(0, getNormalizedOwnedCount(entry.ownedCount) || 0);
  const savedDetails = Array.isArray(entry.ownedDetails) ? entry.ownedDetails : [];
  const fallbackDetail = buildLegacyOwnedDetail(entry);

  if (count <= 0) {
    return [];
  }

  return Array.from({ length: count }, (_, index) => {
    const current = savedDetails[index];
    if (current && typeof current === "object") {
      return {
        ...createBlankOwnedDetail(),
        ...current,
      };
    }
    if (index === 0) {
      return {
        ...createBlankOwnedDetail(),
        ...fallbackDetail,
      };
    }
    return createBlankOwnedDetail();
  });
}

function getOwnedDetail(id, copyIndex = 0) {
  const details = getOwnedDetails(id);
  return details[Math.min(Math.max(copyIndex, 0), Math.max(details.length - 1, 0))] || createBlankOwnedDetail();
}

function getCollectedCopyName(item, copyIndex = 0) {
  const baseName = displayName(item);
  const detail = getOwnedDetail(item.id, copyIndex);
  const customName = String(detail.customName || "").trim();
  if (customName) {
    return customName;
  }

  const ownedCount = getOwnedCount(item.id);
  if (ownedCount > 1 && copyIndex > 0) {
    return `${baseName} ${copyIndex + 1}`;
  }

  return baseName;
}

function getCollectedSearchText(item) {
  const baseName = displayName(item);
  const seriesName = displaySeries(item);
  const notes = getNotes(item.id);
  const copyNames = getOwnedDetails(item.id)
    .map((detail, index) => getCollectedCopyName(item, index))
    .join(" ");

  return `${baseName} ${seriesName} ${notes} ${copyNames}`.toLowerCase();
}

function getActiveCollectedCopyIndex(id) {
  const total = getOwnedCount(id);
  const saved = activeCollectedCopyIndexes[id] || 0;
  return Math.min(Math.max(saved, 0), Math.max(total - 1, 0));
}

function setActiveCollectedCopyIndex(id, copyIndex) {
  activeCollectedCopyIndexes[id] = Math.max(0, copyIndex);
}

function getManualItemOverride(itemOrId) {
  const id = typeof itemOrId === "string" ? itemOrId : itemOrId?.id;
  return manualItemOverrides[id] || {};
}

function getCatalogName(item) {
  return getManualItemOverride(item).name || imageMap[item.id]?.catalogName || item.name;
}

function getCatalogSeries(item) {
  return getManualItemOverride(item).series || imageMap[item.id]?.catalogSeries || "";
}

function getManualDisplaySeries(item) {
  return getManualItemOverride(item).displaySeries || "";
}

function getArtworkPath(item) {
  return getManualItemOverride(item).artPath || imageMap[item.id]?.path || "";
}

function buildGeneratedKeychainStyle(label) {
  const safeLabel = String(label || "?").slice(0, 2);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 320">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#fff8ef"/>
          <stop offset="100%" stop-color="#f7ead8"/>
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#d9c9b4" flood-opacity="0.35"/>
        </filter>
      </defs>
      <rect x="34" y="38" width="152" height="232" rx="56" fill="url(#bg)" stroke="#d8c8b2" stroke-width="4" filter="url(#shadow)"/>
      <circle cx="110" cy="36" r="18" fill="none" stroke="#7d6c5b" stroke-width="8"/>
      <path d="M110 54 L110 84" stroke="#7d6c5b" stroke-width="8" stroke-linecap="round"/>
      <rect x="68" y="100" width="84" height="92" rx="28" fill="#ffefe2" stroke="#ead6bf" stroke-width="3"/>
      <text x="110" y="166" text-anchor="middle" font-family="Manrope, Arial, sans-serif" font-size="58" font-weight="800" fill="#5a4034">${safeLabel}</text>
      <text x="110" y="228" text-anchor="middle" font-family="Manrope, Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="2" fill="#8d7766">KEY CHAIN</text>
    </svg>
  `;
  const encoded = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  return `
    background-image: url("${encoded}");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  `;
}

function displayName(item) {
  const name = getCatalogName(item);
  if (isUnrefinedRegular(item) && !/\(unrefined\)$/i.test(name)) {
    return `${name} (Unrefined)`;
  }
  return name;
}

function parseSeriesYear(label) {
  const trimmed = (label || "").trim();
  const parenMatch = trimmed.match(/^(.*?)\s*\((~?)(\d{4})\)$/);
  if (parenMatch) {
    return {
      base: parenMatch[1].trim(),
      year: parenMatch[3],
      approximate: parenMatch[2] === "~",
    };
  }

  const suffixMatch = trimmed.match(/^(.*)\s+(~?)(\d{4})$/);
  if (suffixMatch) {
    return {
      base: suffixMatch[1].trim(),
      year: suffixMatch[3],
      approximate: suffixMatch[2] === "~",
    };
  }

  return null;
}

function yearFromSeriesPath(path) {
  const segments = (path || "").split("/").filter(Boolean);
  const seriesFolder = segments[segments.length - 2] || "";
  const yearMatch = seriesFolder.match(/(?:^|-)((?:19|20)\d{2})(?:-|$)/);
  return yearMatch?.[1] || "";
}

function normalizeSeriesLabel(label, path = "") {
  const rawLabel = (label || "").trim();
  if (!rawLabel) {
    return "";
  }

  const parsed = parseSeriesYear(rawLabel);
  if (parsed) {
    const prefix = parsed.approximate ? "~" : "";
    return `${parsed.base} (${prefix}${parsed.year})`;
  }

  const explicitYear = yearFromSeriesPath(path);
  if (explicitYear) {
    return `${rawLabel} (${explicitYear})`;
  }

  const fallbackYear = SERIES_DEFAULT_YEAR[rawLabel] || "";
  if (!fallbackYear) {
    return rawLabel;
  }

  if (path) {
    return `${rawLabel} (~${fallbackYear})`;
  }

  return `${rawLabel} (${fallbackYear})`;
}

function buildInferredSeriesYearHints(items) {
  const hints = new Map();

  items.forEach((item) => {
    const rawSeries = (item.series || "").trim();
    if (!rawSeries || hints.has(rawSeries)) {
      return;
    }

    const mappedLabel = normalizeSeriesLabel(getCatalogSeries(item) || "", getArtworkPath(item));
    const year = parseSeriesYear(mappedLabel)?.year || "";
    if (year) {
      hints.set(rawSeries, year);
    }
  });

  items.forEach((item) => {
    const rawSeries = (item.series || "").trim();
    if (!rawSeries || hints.has(rawSeries)) {
      return;
    }

    const siblingYear = items
      .filter((candidate) => candidate.series === rawSeries)
      .map((candidate) => {
        const mapped = imageMap[candidate.id];
        const mappedLabel = normalizeSeriesLabel(mapped?.catalogSeries || "", mapped?.path || "");
        return parseSeriesYear(mappedLabel)?.year || "";
      })
      .find(Boolean);

    if (siblingYear) {
      hints.set(rawSeries, siblingYear);
    }
  });

  return hints;
}

function inferYearFromSiblingMappings(rawSeries) {
  return inferredSeriesYearHints.get((rawSeries || "").trim()) || "";
}

function normalizeGuideSeriesLabel(label) {
  const rawLabel = (label || "").trim();
  if (!rawLabel) {
    return "";
  }

  const normalizedRegular = normalizeGuideRegularSeriesLabel(rawLabel);
  if (normalizedRegular) {
    return normalizedRegular;
  }

  const christmasNamedSeries = rawLabel.match(/^Christmas Series (\d{4}) (.+)$/i);
  if (christmasNamedSeries) {
    return `${christmasNamedSeries[2].trim()} (${christmasNamedSeries[1]})`;
  }

  const seriesSuffixMatch = rawLabel.match(/^(.*?)(?:\s+Series)$/i);
  if (seriesSuffixMatch) {
    const inferredYear = inferYearFromSiblingMappings(rawLabel);
    if (inferredYear) {
      return `${seriesSuffixMatch[1].trim()} (${inferredYear})`;
    }
  }

  return normalizeSeriesLabel(rawLabel);
}

function canonicalSeriesKey(label) {
  const parsed = parseSeriesYear(label);
  const year = parsed?.year || "";
  const yearPrefix = parsed?.approximate ? "~" : "";
  const base = (parsed?.base || label || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\bsonny angel\b/g, "")
    .replace(/\bladur\s*e\b/g, "laduree")
    .replace(/\bp\s*tisserie\b/g, "patisserie")
    .replace(/\bpatisserie\b/g, "patisseries")
    .replace(/\bseries\b/g, "")
    .replace(/\bcollection\b/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return year ? `${base}::${yearPrefix}${year}` : base;
}

function compareSeriesLabels(left, right, direction = "asc") {
  const multiplier = direction === "desc" ? -1 : 1;
  const leftLabel = (left || "").trim();
  const rightLabel = (right || "").trim();
  const leftStartsWithLetter = /^[A-Za-z]/.test(leftLabel);
  const rightStartsWithLetter = /^[A-Za-z]/.test(rightLabel);

  if (leftStartsWithLetter !== rightStartsWithLetter) {
    return leftStartsWithLetter ? -1 * multiplier : 1 * multiplier;
  }

  return leftLabel.localeCompare(rightLabel) * multiplier;
}

function displaySeries(item) {
  if (displaySeriesCache.has(item.id)) {
    return displaySeriesCache.get(item.id);
  }

  const manualDisplaySeries = getManualDisplaySeries(item);
  if (manualDisplaySeries) {
    displaySeriesCache.set(item.id, manualDisplaySeries);
    return manualDisplaySeries;
  }

  const guideLabel = normalizeGuideSeriesLabel(item.series);
  const normalizedGuideRegular = normalizeGuideRegularSeriesLabel(item.series);
  const mappedSeries = getCatalogSeries(item);
  const mappedPath = getArtworkPath(item);
  const mappedLabel = normalizeSeriesLabel(mappedSeries || item.series, mappedPath);
  let label = "";

  if (getCollectionType(item) === "Regular" && normalizedGuideRegular) {
    label = guideLabel || mappedLabel;
  } else if (getCollectionType(item) === "Regular") {
    label = mappedLabel;
  } else if (!mappedSeries) {
    label = guideLabel;
  } else {
    const guideKeyWithoutYear = canonicalSeriesKey(guideLabel).replace(/::\d{4}$/, "");
    const mappedKeyWithoutYear = canonicalSeriesKey(mappedLabel).replace(/::\d{4}$/, "");

    if (guideKeyWithoutYear && guideKeyWithoutYear === mappedKeyWithoutYear) {
      if (!parseSeriesYear(guideLabel)?.year && parseSeriesYear(mappedLabel)?.year) {
        label = mappedLabel;
      } else {
        label = guideLabel;
      }
    } else {
      label = guideLabel || mappedLabel;
    }
  }

  displaySeriesCache.set(item.id, label);
  return label;
}

function isUnrefinedRegular(item) {
  if (getCollectionType(item) !== "Regular") {
    return false;
  }

  if (isExplicitGuideUnrefinedSeries(item.series)) {
    return true;
  }

  if (Boolean(parseSeriesYear(displaySeries(item))?.approximate)) {
    return true;
  }

  return false;
}

function formatSeriesUiLabel(label) {
  const parsed = parseSeriesYear(label);
  if (!parsed?.approximate) {
    return label;
  }

  return `${parsed.base} (Unrefined) (~${parsed.year})`;
}

function renderSeriesLabel(container, item) {
  container.textContent = formatSeriesUiLabel(displaySeries(item));
}

function getVisibleTrackerItems(items) {
  const hiddenSeries = new Set(settings.hiddenSeries.map((series) => canonicalSeriesKey(series)));
  const hiddenSonnies = new Set(settings.hiddenSonnies);

  return items.filter((item) => {
    if (hiddenSonnies.has(item.id)) {
      return false;
    }
    return !hiddenSeries.has(canonicalSeriesKey(displaySeries(item)));
  });
}

function toggleHiddenSeries(series) {
  const seriesKey = canonicalSeriesKey(series);
  const hiddenSeries = [...settings.hiddenSeries];
  const isHidden = hiddenSeries.some((entry) => canonicalSeriesKey(entry) === seriesKey);

  if (isHidden) {
    settings.hiddenSeries = hiddenSeries.filter((entry) => canonicalSeriesKey(entry) !== seriesKey);
  } else {
    settings.hiddenSeries = [...hiddenSeries, series].sort((a, b) => a.localeCompare(b));
  }
  saveSettings();
  applyFilters();
}

function toggleHiddenSonny(id) {
  const hiddenSonnies = new Set(settings.hiddenSonnies);
  if (hiddenSonnies.has(id)) {
    hiddenSonnies.delete(id);
  } else {
    hiddenSonnies.add(id);
  }
  settings.hiddenSonnies = [...hiddenSonnies].sort((a, b) => a.localeCompare(b));
  saveSettings();
  applyFilters();
}

function setHideManagerView(view) {
  hideManagerView = view;
  hideViewButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.hideView === view);
  });
  renderSettings();
}

function supportTurnstileSiteKey() {
  return typeof supabaseConfig.turnstileSiteKey === "string"
    ? supabaseConfig.turnstileSiteKey.trim()
    : "";
}

function isImageRequestMode() {
  return supportPanelMode === "image_request";
}

function isPhotoSubmissionMode() {
  return isImageRequestMode() && supportImageRequestKind === "photo_submission";
}

function supportUploadEnabled() {
  return !isImageRequestMode() || (isPhotoSubmissionMode() && Boolean(supportPhotoConsentInput?.checked));
}

function currentSupportTitle() {
  return isImageRequestMode() ? "Request a Sonny picture" : "Tell me what broke";
}

function currentSupportSubmitLabel() {
  if (!isImageRequestMode()) {
    return "Send bug report";
  }
  return isPhotoSubmissionMode() ? "Send my photo" : "Send picture request";
}

function currentSupportProgressLabel() {
  if (!isImageRequestMode()) {
    return "Uploading screenshots and sending your bug report...";
  }
  return isPhotoSubmissionMode()
    ? "Uploading your Sonny photo and sending the request..."
    : "Sending your picture request...";
}

function currentSupportPanelCopy() {
  if (!isImageRequestMode()) {
    return `Bug reports send to ${SUPPORT_EMAIL} through Supabase. Screenshots upload automatically when configured.`;
  }
  return isPhotoSubmissionMode()
    ? `Share a Sonny photo and, if you consent, I can use it to help improve the website artwork. The upload goes to ${SUPPORT_EMAIL} through Supabase.`
    : `Picture requests send to ${SUPPORT_EMAIL} through Supabase. Add a quick note if there is a specific version or series art you want.`;
}

function currentSupportDescriptionPlaceholder() {
  if (!isImageRequestMode()) {
    return "Describe the bug, what you expected, and what page/tab you were on.";
  }
  return isPhotoSubmissionMode()
    ? "Optional note: what version this is, any special details, or anything I should know about your photo..."
    : "Optional note: special version, series mismatch, missing art details...";
}

function currentSupportUploadMeta() {
  if (!isImageRequestMode()) {
    return {
      eyebrow: "Add screenshots",
      title: "Choose images",
      copy: "You can add one or more screenshots here. They will upload with the report.",
    };
  }
  return {
    eyebrow: "Add your Sonny photo",
    title: "Choose photo",
    copy: "Upload one clear photo of your Sonny if you want to help fill the image library.",
  };
}

function syncSupportPanelUi() {
  const imageRequest = isImageRequestMode();
  const photoSubmission = isPhotoSubmissionMode();
  const uploadMeta = currentSupportUploadMeta();

  if (bugReportPanelCopy) {
    bugReportPanelCopy.textContent = currentSupportPanelCopy();
  }
  if (bugReportTitle) {
    bugReportTitle.textContent = currentSupportTitle();
  }
  if (bugReportDescriptionLabel) {
    bugReportDescriptionLabel.textContent = imageRequest
      ? (photoSubmission ? "Anything I should know about your photo? (optional)" : "Anything I should know? (optional)")
      : "What happened?";
  }
  if (bugReportDescriptionInput) {
    bugReportDescriptionInput.placeholder = currentSupportDescriptionPlaceholder();
  }
  if (bugReportSubmitButton) {
    bugReportSubmitButton.textContent = currentSupportSubmitLabel();
  }
  if (bugReportUploadField) {
    bugReportUploadField.hidden = !supportUploadEnabled();
  }
  if (bugReportUploadEyebrow) {
    bugReportUploadEyebrow.textContent = uploadMeta.eyebrow;
  }
  if (bugReportUploadTitle) {
    bugReportUploadTitle.textContent = uploadMeta.title;
  }
  if (bugReportUploadCopy) {
    bugReportUploadCopy.textContent = uploadMeta.copy;
  }
  if (bugUploadList) {
    bugUploadList.hidden = !supportUploadEnabled();
  }
  if (supportRequestSummary) {
    supportRequestSummary.hidden = !imageRequest || !supportPanelRequestedItem;
  }
  if (supportRequestItemName) {
    supportRequestItemName.textContent = supportPanelRequestedItem
      ? displayName(supportPanelRequestedItem)
      : "";
  }
  if (supportRequestItemSeries) {
    supportRequestItemSeries.textContent = supportPanelRequestedItem
      ? displaySeries(supportPanelRequestedItem)
      : "";
  }
  if (supportRequestChooser) {
    supportRequestChooser.hidden = !imageRequest;
  }
  supportRequestChoiceButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.supportImageKind === supportImageRequestKind);
  });
  if (supportPhotoConsent) {
    supportPhotoConsent.hidden = !photoSubmission;
  }
  if (bugReportImagesInput) {
    bugReportImagesInput.multiple = !imageRequest;
  }
  if (bugReportFeedback) {
    bugReportFeedback.textContent = currentSupportPanelCopy();
  }
}

function resetSupportCaptcha() {
  supportCaptchaToken = "";
  if (window.turnstile && supportCaptchaWidgetId !== null) {
    window.turnstile.reset(supportCaptchaWidgetId);
  }
}

function loadSupportCaptchaScript() {
  if (!supportTurnstileSiteKey()) {
    return Promise.resolve(null);
  }
  if (window.turnstile) {
    return Promise.resolve(window.turnstile);
  }
  if (supportCaptchaLoader) {
    return supportCaptchaLoader;
  }

  supportCaptchaLoader = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-support-turnstile="true"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(window.turnstile), { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.defer = true;
    script.dataset.supportTurnstile = "true";
    script.addEventListener("load", () => resolve(window.turnstile), { once: true });
    script.addEventListener("error", reject, { once: true });
    document.head.append(script);
  });

  return supportCaptchaLoader;
}

async function ensureSupportCaptchaReady() {
  if (!supportCaptchaBlock || !supportCaptchaWidget || !supportTurnstileSiteKey()) {
    if (supportCaptchaBlock) {
      supportCaptchaBlock.hidden = true;
    }
    supportCaptchaToken = "";
    return;
  }

  supportCaptchaBlock.hidden = false;
  await loadSupportCaptchaScript();

  if (!window.turnstile) {
    return;
  }

  if (supportCaptchaWidgetId === null) {
    supportCaptchaWidgetId = window.turnstile.render("#support-captcha-widget", {
      sitekey: supportTurnstileSiteKey(),
      theme: "auto",
      callback(token) {
        supportCaptchaToken = token;
      },
      "expired-callback"() {
        supportCaptchaToken = "";
      },
      "error-callback"() {
        supportCaptchaToken = "";
      },
    });
    return;
  }

  resetSupportCaptcha();
}

function getSupportPanelPrimaryFocusTarget() {
  if (isImageRequestMode()) {
    if (supportRequestChoiceButtons?.length) {
      return supportRequestChoiceButtons[0];
    }
    return bugReportDescriptionInput || bugReportNameInput || closeBugReportButton || null;
  }

  return bugReportDescriptionInput || bugReportNameInput || closeBugReportButton || null;
}

function scrollSupportPanelIntoView() {
  if (!bugReportPanel) {
    return;
  }

  const headerHeight = appHeader?.getBoundingClientRect().height || 0;
  const rect = bugReportPanel.getBoundingClientRect();
  const targetTop = Math.max(0, window.scrollY + rect.top - headerHeight - 20);

  window.scrollTo({
    top: targetTop,
    behavior: "smooth",
  });
}

function focusSupportPanelPrimaryControl() {
  const target = getSupportPanelPrimaryFocusTarget();
  if (!target || typeof target.focus !== "function") {
    return;
  }

  target.focus({ preventScroll: true });
}

function openSupportPanel(mode = "bug_report", item = null) {
  if (!bugReportPanel) {
    return;
  }

  if (!collectedDetailModalShell?.hidden) {
    closeCollectedDetailModal();
  }
  if (!accountModalShell?.hidden) {
    closeAccountModal();
  }
  setMobileNavOpen(false);
  setWishlistControlsOpen(false);

  supportPanelMode = mode;
  supportPanelRequestedItem = item || null;
  supportImageRequestKind = "request_only";
  bugReportForm?.reset();
  renderBugUploadList();
  resetSupportCaptcha();
  bugReportPanel.hidden = false;
  bugReportPanel.classList.add("is-open");
  syncSupportPanelUi();
  ensureSupportCaptchaReady().catch((error) => {
    console.error("Could not load captcha", error);
  });
  window.requestAnimationFrame(() => {
    scrollSupportPanelIntoView();
    window.setTimeout(() => {
      scrollSupportPanelIntoView();
      focusSupportPanelPrimaryControl();
    }, 220);
  });
}

function openBugReportPanel() {
  trackSiteEvent("open_bug_report_panel");
  openSupportPanel("bug_report");
}

function openImageRequestPanel(item) {
  trackSiteEvent("open_sonny_picture_request", {
    itemId: item?.id || "",
    series: item ? displaySeries(item) : "",
  });
  openSupportPanel("image_request", item);
}

function closeBugReportPanel() {
  if (bugReportPanel) {
    bugReportPanel.hidden = true;
    bugReportPanel.classList.remove("is-open");
  }
  supportImageRequestKind = "request_only";
  bugReportForm?.reset();
  renderBugUploadList();
  resetSupportCaptcha();
}

function renderBugUploadList() {
  bugUploadList.innerHTML = "";
  const files = [...(bugReportImagesInput?.files || [])];

  if (!files.length) {
    bugUploadList.innerHTML =
      `<p class="wishlist-empty">${isPhotoSubmissionMode() ? "No Sonny photo added yet." : "No screenshots added yet."}</p>`;
    return;
  }

  files.forEach((file) => {
    const item = document.createElement("article");
    item.className = "bug-upload-item";
    item.innerHTML = `
      <strong>${file.name}</strong>
      <p>${Math.max(1, Math.round(file.size / 1024))} KB</p>
    `;
    bugUploadList.append(item);
  });
}

function setBugReportSubmitting(isSubmitting, message = "") {
  if (bugReportSubmitButton) {
    bugReportSubmitButton.disabled = isSubmitting;
    bugReportSubmitButton.textContent = isSubmitting ? "Sending..." : currentSupportSubmitLabel();
  }

  if (bugReportFeedback && message) {
    bugReportFeedback.textContent = message;
  }
}

function buildBugReportFormData() {
  const name = bugReportNameInput?.value.trim() || "";
  const contact = bugReportContactInput?.value.trim() || "";
  const rawDescription = bugReportDescriptionInput?.value.trim() || "";
  const files = supportUploadEnabled() ? [...(bugReportImagesInput?.files || [])] : [];
  const activeView =
    document.querySelector(".view-tab.is-active")?.textContent?.trim() || "";
  const hasPhotoConsent = Boolean(supportPhotoConsentInput?.checked);
  const description = isPhotoSubmissionMode()
    ? [
        rawDescription,
        rawDescription ? "" : null,
        "Submission type: User supplied Sonny photo",
        `Consent to use on Sonny Tracker: ${hasPhotoConsent ? "Yes" : "No"}`,
      ]
        .filter(Boolean)
        .join("\n")
    : rawDescription;

  const formData = new FormData();
  formData.set("report_type", supportPanelMode);
  formData.set("image_request_kind", supportImageRequestKind);
  formData.set("image_usage_consent", hasPhotoConsent ? "yes" : "no");
  formData.set("name", name);
  formData.set("contact", contact);
  formData.set("description", description);
  formData.set("page_url", window.location.href);
  formData.set("user_agent", window.navigator.userAgent || "");
  formData.set("active_view", activeView);
  formData.set("site_url", window.SONNY_SUPABASE_CONFIG?.siteUrl?.trim() || window.location.origin);
  formData.set("reporter_email", authState.user?.email || "");
  formData.set("reporter_user_id", authState.user?.id || "");
  formData.set("requested_item_id", supportPanelRequestedItem?.id || "");
  formData.set("requested_item_name", supportPanelRequestedItem ? displayName(supportPanelRequestedItem) : "");
  formData.set("requested_item_series", supportPanelRequestedItem ? displaySeries(supportPanelRequestedItem) : "");

  if (supportCaptchaToken) {
    formData.set("captcha_token", supportCaptchaToken);
  }

  files.forEach((file) => {
    formData.append("screenshots", file);
  });

  return { formData, description, rawDescription, files, hasPhotoConsent };
}

async function submitBugReport() {
  if (!hasSupabaseConfig()) {
    throw new Error("Bug reporting is not configured yet. Add your Supabase project config first.");
  }

  const { formData, description, files, hasPhotoConsent } = buildBugReportFormData();
  if (!description && !isImageRequestMode()) {
    bugReportDescriptionInput?.focus();
    throw new Error("Add a short description of the bug first so the report has enough context.");
  }
  if (isImageRequestMode() && !isPhotoSubmissionMode() && !supportPanelRequestedItem) {
    throw new Error("Pick a Sonny first so I know which PNG image you want requested.");
  }
  if (isPhotoSubmissionMode() && !hasPhotoConsent) {
    supportPhotoConsentInput?.focus();
    throw new Error("Please confirm that your Sonny photo can be used on Sonny Tracker before uploading it.");
  }
  if (isPhotoSubmissionMode() && !files.length) {
    bugReportImagesInput?.focus();
    throw new Error("Add your Sonny photo first so I can send it along with the request.");
  }
  if (supportTurnstileSiteKey() && !supportCaptchaToken) {
    throw new Error("Please finish the captcha first so I know the request is from a real person.");
  }

  const response = await fetch(`${supabaseConfig.url}/functions/v1/bug-report`, {
    method: "POST",
    headers: {
      apikey: supabaseConfig.anonKey,
      Authorization: `Bearer ${supabaseConfig.anonKey}`,
    },
    body: formData,
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload?.error || "Could not send this request yet. Please try again.");
  }

  return payload;
}

function unhideVisibleSeries(items, query) {
  const hiddenSeriesKeys = new Set(
    settings.hiddenSeries.map((series) => canonicalSeriesKey(series)),
  );
  const visibleSeries = uniqueSeries(items).filter((series) => {
    const matchesQuery = !query || series.toLowerCase().includes(query);
    const matchesView =
      hideManagerView !== "hidden" || hiddenSeriesKeys.has(canonicalSeriesKey(series));
    return matchesQuery && matchesView;
  });
  const visibleKeys = new Set(visibleSeries.map((series) => canonicalSeriesKey(series)));
  settings.hiddenSeries = settings.hiddenSeries.filter(
    (series) => !visibleKeys.has(canonicalSeriesKey(series)),
  );
  saveSettings();
  applyFilters();
}

function unhideVisibleSonnies(items, query) {
  const visibleIds = new Set(
    items
      .filter((item) => {
        const matchesQuery =
          !query ||
          displayName(item).toLowerCase().includes(query) ||
          displaySeries(item).toLowerCase().includes(query);
        const matchesView =
          hideManagerView !== "hidden" || settings.hiddenSonnies.includes(item.id);
        return matchesQuery && matchesView;
      })
      .map((item) => item.id),
  );
  settings.hiddenSonnies = settings.hiddenSonnies.filter((id) => !visibleIds.has(id));
  saveSettings();
  applyFilters();
}

function getBadges(item) {
  const override = getManualItemOverride(item);
  const name = (getCatalogName(item) || "").toLowerCase();
  const badges = [];
  const customBadges = Array.isArray(override.badges)
    ? override.badges.filter((badge) => typeof badge === "string" && badge.trim())
    : [];
  if (override.isSecret || name.includes("secret") || likelySecretIds.has(item.id)) {
    badges.push("S");
  }
  const suppressRobby = override.isRobby === false || override.suppressRobby;
  if (!suppressRobby && (override.isRobby || name.includes("robby"))) {
    badges.push("R");
  }
  badges.push(...customBadges);
  return badges;
}

function buildLikelySecretIds(items) {
  const groups = new Map();
  const ids = new Set();

  items.forEach((item) => {
    const key = (item.series || "").trim();
    if (!key) {
      return;
    }
    const current = groups.get(key) || [];
    current.push(item);
    groups.set(key, current);
  });

  groups.forEach((groupItems) => {
    groupItems.forEach((item) => {
      const rawName = (getCatalogName(item) || "").toLowerCase();
      if (rawName.includes("secret")) {
        ids.add(item.id);
      }
    });

    const candidates = groupItems.filter((item) => {
      const rawName = (getCatalogName(item) || "").toLowerCase();
      if (rawName.includes("robby") || rawName.includes("secret")) {
        return false;
      }

      const mappedPath = getArtworkPath(item);
      const hasMappedArt = Boolean(mappedPath);
      const siblingsHaveMappedArt = groupItems.some(
        (sibling) => sibling.id !== item.id && Boolean(getArtworkPath(sibling)),
      );
      const guideSeries = normalizeGuideSeriesLabel(item.series);
      const mappedSeries = normalizeSeriesLabel(getCatalogSeries(item) || "", mappedPath);
      const mismatchedSeries =
        hasMappedArt &&
        guideSeries &&
        mappedSeries &&
        canonicalSeriesKey(guideSeries) !== canonicalSeriesKey(mappedSeries);

      return (siblingsHaveMappedArt && !hasMappedArt) || mismatchedSeries;
    });

    if (candidates.length === 1) {
      ids.add(candidates[0].id);
    }
  });

  return ids;
}

function getCollectionType(item) {
  if (ARTIST_SERIES.has((item.series || "").trim())) {
    return "Artist Series";
  }
  const mappedPath = getArtworkPath(item);
  if (mappedPath.includes("/regulars/")) {
    return "Regular";
  }
  if (UNREFINED_REGULAR_GUIDE_SERIES.has((item.series || "").trim())) {
    return "Regular";
  }
  if (mappedPath.includes("/limited/")) {
    return "Limited";
  }
  if (mappedPath.includes("/collaboration/")) {
    return "Collaboration";
  }
  return "Other";
}

function renderBadges(container, item) {
  container.innerHTML = "";
  getBadges(item).forEach((badge) => {
    const chip = document.createElement("span");
    const badgeKey = String(badge)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    chip.className = `mini-badge mini-badge-${badgeKey || "custom"}`;
    chip.textContent = badge;
    container.append(chip);
  });
}

function buildCatalogOrderMaps(items) {
  const seriesOrder = new Map();
  const itemOrder = new Map();
  const nextItemOrderBySeries = new Map();

  items.forEach((item) => {
    const seriesLabel = displaySeries(item);
    const seriesKey = canonicalSeriesKey(seriesLabel);

    if (!seriesOrder.has(seriesKey)) {
      seriesOrder.set(seriesKey, seriesOrder.size);
    }

    const nextOrder = nextItemOrderBySeries.get(seriesKey) || 0;
    itemOrder.set(item.id, nextOrder);
    nextItemOrderBySeries.set(seriesKey, nextOrder + 1);
  });

  return { seriesOrder, itemOrder };
}

function uniqueSeries(items) {
  const labelsByKey = new Map();
  items.forEach((item) => {
    const label = displaySeries(item);
    const key = canonicalSeriesKey(label);

    if (!labelsByKey.has(key)) {
      labelsByKey.set(key, label);
    }
  });

  return [...labelsByKey.values()].sort((left, right) => {
    const leftKey = canonicalSeriesKey(left);
    const rightKey = canonicalSeriesKey(right);
    const leftOrder = catalogSeriesOrder.get(leftKey) ?? Number.MAX_SAFE_INTEGER;
    const rightOrder = catalogSeriesOrder.get(rightKey) ?? Number.MAX_SAFE_INTEGER;
    return (leftOrder - rightOrder) || compareSeriesLabels(left, right);
  });
}

function updateSeriesFilter(items) {
  const visibleItems = getVisibleTrackerItems(items);
  const selected = seriesFilter.value;
  seriesFilter.innerHTML = '<option value="all">All series</option>';
  SPECIAL_TRACKER_SERIES_FILTERS.forEach((entry) => {
    const option = document.createElement("option");
    option.value = entry.value;
    option.textContent = entry.label;
    if (entry.value === selected) {
      option.selected = true;
    }
    seriesFilter.append(option);
  });
  uniqueSeries(visibleItems).forEach((series) => {
    const option = document.createElement("option");
    option.value = series;
    option.textContent = formatSeriesUiLabel(series);
    if (series === selected) {
      option.selected = true;
    }
    seriesFilter.append(option);
  });
}

function updateCollectedSeriesFilter(items) {
  const collected = items.filter((item) => getStatus(item.id) === "have");
  const availableSeries = uniqueSeries(collected);
  const availableKeys = new Set(availableSeries.map((series) => canonicalSeriesKey(series)));
  collectedSeriesSelection = (settings.collectedSeriesSelection || []).filter((series) => {
    return availableKeys.has(canonicalSeriesKey(series));
  });
  settings.collectedSeriesSelection = [...collectedSeriesSelection];

  if (!collectedSeriesOptions || !collectedSeriesFilterButton || !collectedSeriesAllToggle) {
    return;
  }

  collectedSeriesOptions.innerHTML = "";
  collectedSeriesAllToggle.checked = collectedSeriesSelection.length === 0;

  availableSeries.forEach((series) => {
    const option = document.createElement("label");
    option.className = "collected-series-option";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = series;
    input.checked = collectedSeriesSelection.some((entry) => canonicalSeriesKey(entry) === canonicalSeriesKey(series));
    input.addEventListener("change", () => {
      const nextSelection = new Map(
        collectedSeriesSelection.map((entry) => [canonicalSeriesKey(entry), entry]),
      );
      if (input.checked) {
        nextSelection.set(canonicalSeriesKey(series), series);
      } else {
        nextSelection.delete(canonicalSeriesKey(series));
      }
      collectedSeriesSelection = [...nextSelection.values()];
      settings.collectedSeriesSelection = [...collectedSeriesSelection];
      if (collectedSeriesAllToggle) {
        collectedSeriesAllToggle.checked = collectedSeriesSelection.length === 0;
      }
      updateCollectedSeriesFilterButtonLabel();
      saveSettings();
      renderCollected(sonnies);
    });

    const text = document.createElement("span");
    text.textContent = formatSeriesUiLabel(series);

    option.append(input, text);
    collectedSeriesOptions.append(option);
  });

  updateCollectedSeriesFilterButtonLabel();
}

function updateCollectedSeriesFilterButtonLabel() {
  if (!collectedSeriesFilterButton) {
    return;
  }

  if (!collectedSeriesSelection.length) {
    collectedSeriesFilterButton.textContent = "All series";
    return;
  }

  if (collectedSeriesSelection.length === 1) {
    collectedSeriesFilterButton.textContent = formatSeriesUiLabel(collectedSeriesSelection[0]);
    return;
  }

  collectedSeriesFilterButton.textContent = `${collectedSeriesSelection.length} series selected`;
}

function renderStats(items) {
  const have = items.filter((item) => getStatus(item.id) === "have").length;
  const missing = items.filter((item) => getStatus(item.id) === "missing").length;
  const iso = items.filter((item) => getStatus(item.id) === "iso").length;
  const diso = items.filter((item) => getStatus(item.id) === "diso").length;
  const completion = items.length ? Math.round((have / items.length) * 100) : 0;

  const stats = [
    ["Total Sonnies", items.length],
    ["Collected", have],
    ["Missing", missing],
    ["ISO", iso],
    ["DISO", diso],
    ["Completion", `${completion}%`],
  ];

  statGrid.innerHTML = "";
  stats.forEach(([label, value]) => {
    const card = document.createElement("div");
    card.className = "stat-card";
    card.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
    statGrid.append(card);
  });
}

function syncTrackerColumnsPreference() {
  const defaultTrackerColumns = getDefaultTrackerColumns();
  const trackerColumns = String(
    Math.min(
      8,
      Math.max(
        4,
        Number.parseInt(settings.trackerColumns || defaultTrackerColumns, 10) ||
          Number(defaultTrackerColumns),
      ),
    ),
  );
  settings.trackerColumns = trackerColumns;
  if (trackerColumnsSelect) {
    trackerColumnsSelect.value = trackerColumns;
  }
  if (grid) {
    grid.style.setProperty("--tracker-columns", trackerColumns);
  }
}

function renderWishlistCard(item, container) {
  const fragment = wishlistTemplate.content.cloneNode(true);
  const card = fragment.querySelector(".wishlist-card");
  const art = fragment.querySelector(".wishlist-art");
  const seriesName = fragment.querySelector(".series-name");
  const name = fragment.querySelector(".wishlist-name");
  const badges = fragment.querySelector(".name-badges");
  const details = fragment.querySelector(".wishlist-details");

  if (isUnrefinedRegular(item)) {
    card.classList.add("is-unrefined");
  }
  art.setAttribute("style", buildArtworkStyle(item));
  renderSeriesLabel(seriesName, item);
  name.textContent = displayName(item);
  renderBadges(badges, item);
  const boardLegend = getWishlistBoardLegend(item.id);

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "wishlist-remove-button";
  removeButton.textContent = "Bench";
  removeButton.addEventListener("click", () => {
    benchWishlistItem(item.id);
    renderWishlist();
  });

  const boardTagField = document.createElement("label");
  boardTagField.className = "wishlist-rank-field wishlist-board-tag-field";

  const boardTagLabel = document.createElement("span");
  boardTagLabel.textContent = "Board tag";

  const boardTagSelect = document.createElement("select");
  normalizeWishlistLegendItems(settings.wishlistLegendItems).forEach((legendItem) => {
    const option = document.createElement("option");
    option.value = legendItem.id;
    option.textContent = legendItem.label;
    option.selected = legendItem.id === boardLegend?.id;
    boardTagSelect.append(option);
  });
  boardTagSelect.addEventListener("change", () => {
    updateWishlistBoardLegend(item.id, boardTagSelect.value);
    renderWishlist();
  });

  boardTagField.append(boardTagLabel, boardTagSelect);

  const rankField = document.createElement("label");
  rankField.className = "wishlist-rank-field";

  const rankLabel = document.createElement("span");
  rankLabel.textContent = "Rank";

  const rankInput = document.createElement("input");
  rankInput.type = "number";
  rankInput.min = "1";
  rankInput.step = "1";
  rankInput.placeholder = "-";
  const currentRank = getWishlistRank(item.id);
  rankInput.value = currentRank ? String(currentRank) : "";
  rankInput.addEventListener("input", () => {
    const nextValue = rankInput.value.trim();
    saveItemPatch(item.id, { wishlistRank: nextValue });
    renderWishlist();
  });

  rankField.append(rankLabel, rankInput);
  details.append(boardTagField, removeButton, rankField);
  container.append(fragment);
}

function removeFromWishlist(id) {
  saveStatusChange(id, "missing");
  applyFilters();
}

function renderWishlistBench(items) {
  if (!wishlistBench || !wishlistBenchGrid || !wishlistBenchCopy) {
    return;
  }

  wishlistBenchGrid.innerHTML = "";
  wishlistBench.hidden = !items.length;

  if (!items.length) {
    return;
  }

  wishlistBenchCopy.textContent = `${items.length} Sonny${items.length === 1 ? "" : "s"} are resting off this board right now.`;

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "wishlist-bench-card";

    const art = document.createElement("div");
    art.className = "wishlist-bench-art";
    art.setAttribute("style", buildArtworkStyle(item));

    const copy = document.createElement("div");
    copy.className = "wishlist-bench-copy-card";

    const title = document.createElement("strong");
    title.textContent = displayName(item);

    const meta = document.createElement("span");
    meta.textContent = formatSeriesUiLabel(displaySeries(item));

    copy.append(title, meta);

    const controls = document.createElement("div");
    controls.className = "wishlist-bench-controls";

    const tagSelect = document.createElement("select");
    tagSelect.className = "wishlist-bench-tag-select";
    const currentLegendId = getWishlistBoardLegendId(item.id);
    normalizeWishlistLegendItems(settings.wishlistLegendItems).forEach((legendItem) => {
      const option = document.createElement("option");
      option.value = legendItem.id;
      option.textContent = legendItem.label;
      option.selected = legendItem.id === currentLegendId;
      tagSelect.append(option);
    });
    tagSelect.addEventListener("change", () => {
      updateWishlistBoardLegend(item.id, tagSelect.value);
      renderWishlist();
    });

    const restoreButton = document.createElement("button");
    restoreButton.type = "button";
    restoreButton.className = "ghost-button";
    restoreButton.textContent = "Add back";
    restoreButton.addEventListener("click", () => {
      restoreWishlistBoardItem(item.id);
      renderWishlist();
    });

    controls.append(tagSelect, restoreButton);
    card.append(art, copy, controls);
    wishlistBenchGrid.append(card);
  });
}

function renderWishlistLanding(items) {
  if (!wishlistLanding || !wishlistFloatingGrid) {
    return;
  }

  wishlistFloatingGrid.innerHTML = "";
  wishlistLanding.classList.toggle("is-editing", Boolean(settings.wishlistLandingEditMode));
  wishlistLanding.classList.toggle("is-editing-legend", Boolean(settings.wishlistLegendEditMode));
  wishlistLanding.classList.toggle("is-editing-title", Boolean(settings.wishlistTitleEditMode));
  if (wishlistLayoutEditButton) {
    wishlistLayoutEditButton.textContent = settings.wishlistLandingEditMode ? "Done editing" : "Edit layout";
    wishlistLayoutEditButton.classList.toggle("is-active", Boolean(settings.wishlistLandingEditMode));
  }
  renderWishlistLandingTitleEditor();
  if (wishlistLegendEditButton) {
    wishlistLegendEditButton.textContent = settings.wishlistLegendEditMode ? "Done legend" : "Edit legend";
    wishlistLegendEditButton.classList.toggle("is-active", Boolean(settings.wishlistLegendEditMode));
  }
  renderWishlistLegend();
  if (!items.length) {
    wishlistLanding.hidden = true;
    return;
  }

  wishlistLanding.hidden = false;
  const benchedItems = items.filter((item) => isWishlistBoardBenched(item.id));
  const floatingItems = items.filter((item) => !isWishlistBoardBenched(item.id));

  if (wishlistLandingSummary) {
    wishlistLandingSummary.textContent = `${floatingItems.length} Sonny${floatingItems.length === 1 ? "" : "s"} are floating here right now.`;
  }

  const orderedFloatingItems = [...floatingItems]
    .sort((left, right) => {
      return (
        compareDateDesc(getWishlistAddedAt(left.id), getWishlistAddedAt(right.id)) ||
        compareDateDesc(getCollectedAt(left.id), getCollectedAt(right.id)) ||
        compareText(displayName(left), displayName(right))
      );
    });

  const columns = Math.max(3, Math.min(6, Math.ceil(Math.sqrt(Math.max(orderedFloatingItems.length, 1) / 1.35))));
  const rowCount = Math.max(1, Math.ceil(Math.max(orderedFloatingItems.length, 1) / columns));
  const topPadding = 160;
  const rowGap = 210;
  const bottomPadding = 160;
  const persistedPositions = {
    ...(settings.wishlistFloatingPositions || {}),
  };
  let persistedPositionsChanged = false;

  orderedFloatingItems.forEach((item, index) => {
    if (persistedPositions[item.id]) {
      return;
    }
    const row = Math.floor(index / columns);
    const column = index % columns;
    const xBase = ((column + 0.5) / columns) * 100;
    const xOffsetPattern = [-4.5, 2.5, -1.5, 3.5, -3, 1.5];
    const yOffsetPattern = [-18, 10, -8, 16, -12, 6];
    const rotatePattern = [-8, 5, -3, 7, -6, 4, -5, 3];
    const scalePattern = [1.02, 0.95, 1.06, 0.98, 0.93, 1.01, 0.97, 1.04];
    persistedPositions[item.id] = {
      x: `${Math.max(8, Math.min(92, xBase + xOffsetPattern[(row + column) % xOffsetPattern.length]))}%`,
      y: `${topPadding + row * rowGap + yOffsetPattern[(index + row) % yOffsetPattern.length]}px`,
      rotate: `${rotatePattern[index % rotatePattern.length]}deg`,
      scale: String(scalePattern[index % scalePattern.length]),
    };
    persistedPositionsChanged = true;
  });

  if (persistedPositionsChanged) {
    settings.wishlistFloatingPositions = persistedPositions;
    saveSettings();
  }

  const maxCustomY = orderedFloatingItems.reduce((maxValue, item) => {
    const saved = persistedPositions[item.id];
    const numeric = Number(saved?.y || 0);
    return Number.isFinite(numeric) ? Math.max(maxValue, numeric) : maxValue;
  }, 0);
  const stageHeight = Math.max(topPadding + rowCount * rowGap + bottomPadding, maxCustomY + 220);
  wishlistLandingStage?.style.setProperty("--wishlist-stage-height", `${stageHeight}px`);
  wishlistFloatingGrid.style.setProperty("--wishlist-stage-height", `${stageHeight}px`);

  orderedFloatingItems.forEach((item, index) => {
    const saved = persistedPositions[item.id] || null;
    const boardLegend = getWishlistBoardLegend(item.id);
    const floating = document.createElement("article");
    floating.className = "wishlist-floating-item";
    floating.dataset.legendTone = boardLegend?.tone || "custom";
    floating.dataset.sonnyId = item.id;
    floating.style.setProperty("--float-x", saved?.x || "50%");
    floating.style.setProperty("--float-y", saved?.y || `${topPadding}px`);
    floating.style.setProperty("--float-rotate", saved?.rotate || "0deg");
    floating.style.setProperty("--float-scale", saved?.scale || "1");

    const art = document.createElement("div");
    art.className = "wishlist-floating-art";
    art.setAttribute("style", buildArtworkStyle(item));

    const badge = document.createElement("button");
    badge.type = "button";
    badge.className = "wishlist-floating-badge";
    badge.textContent = boardLegend?.emoji || "✦";
    badge.setAttribute("aria-label", `Change board tag for ${displayName(item)}`);
    badge.addEventListener("pointerdown", (event) => {
      event.stopPropagation();
    });
    badge.addEventListener("click", (event) => {
      event.stopPropagation();
      event.preventDefault();
      floating.classList.toggle("is-controls-open");
    });

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "wishlist-floating-remove";
    removeButton.textContent = "×";
    removeButton.setAttribute("aria-label", `Bench ${displayName(item)} from this board`);
    removeButton.addEventListener("pointerdown", (event) => {
      event.stopPropagation();
    });
    removeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      event.preventDefault();
      benchWishlistItem(item.id);
      renderWishlist();
    });

    const chip = document.createElement("span");
    chip.className = "wishlist-floating-name";
    chip.textContent = displayName(item);

    const controlsRow = document.createElement("div");
    controlsRow.className = "wishlist-floating-controls";

    const legendPicker = document.createElement("div");
    legendPicker.className = "wishlist-floating-legend-picker";
    normalizeWishlistLegendItems(settings.wishlistLegendItems).forEach((legendItem) => {
      const legendButton = document.createElement("button");
      legendButton.type = "button";
      legendButton.className = `wishlist-floating-legend-option wishlist-floating-legend-option-${legendItem.tone}`;
      if (legendItem.id === boardLegend?.id) {
        legendButton.classList.add("is-active");
      }
      legendButton.textContent = legendItem.emoji;
      legendButton.title = legendItem.label;
      legendButton.setAttribute("aria-label", `Set ${displayName(item)} to ${legendItem.label}`);
      legendButton.addEventListener("pointerdown", (event) => {
        event.stopPropagation();
      });
      legendButton.addEventListener("click", (event) => {
        event.stopPropagation();
        event.preventDefault();
        updateWishlistBoardLegend(item.id, legendItem.id);
        renderWishlist();
      });
      legendPicker.append(legendButton);
    });
    controlsRow.append(legendPicker, removeButton);

    if (settings.wishlistLandingEditMode) {
      const rotateHandle = document.createElement("button");
      rotateHandle.type = "button";
      rotateHandle.className = "wishlist-floating-rotate-handle";
      rotateHandle.setAttribute("aria-label", `Rotate ${displayName(item)}`);

      const rotateHandleLabel = document.createElement("span");
      rotateHandleLabel.className = "wishlist-rotate-handle-label";
      rotateHandleLabel.textContent = "Rotate";

      const rotateValue = document.createElement("span");
      rotateValue.className = "wishlist-rotate-value";
      rotateValue.textContent = `${Math.round(Number.parseFloat((saved?.rotate || rotate).replace("deg", "")) || 0)}°`;

      const rotateTrack = document.createElement("span");
      rotateTrack.className = "wishlist-rotate-handle-track";

      rotateHandle.append(rotateHandleLabel, rotateValue, rotateTrack);
      rotateHandle.addEventListener("pointerdown", (event) => {
        startWishlistRotateDrag(event, item.id, floating, rotateHandle);
      });

      floating.append(rotateHandle);
    }

    floating.append(art, badge, chip, controlsRow);
    floating.addEventListener("pointerdown", startWishlistFloatingDrag);
    wishlistFloatingGrid.append(floating);
  });
}

function renderWishlistLegend() {
  if (!wishlistLandingLegend || !wishlistLegendEditor || !wishlistLegendEditorList) {
    return;
  }

  const items = normalizeWishlistLegendItems(settings.wishlistLegendItems);
  settings.wishlistLegendItems = items;
  wishlistLandingLegend.innerHTML = "";
  items.forEach((item) => {
    const chip = document.createElement("span");
    chip.className = `wishlist-legend-chip wishlist-legend-chip-${item.tone}`;
    chip.dataset.emoji = item.emoji;
    chip.textContent = item.label;
    wishlistLandingLegend.append(chip);
  });

  wishlistLegendEditor.hidden = !settings.wishlistLegendEditMode;
  wishlistLegendEditorList.innerHTML = "";
  items.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "wishlist-legend-editor-row";

    const emojiInput = document.createElement("input");
    emojiInput.className = "wishlist-legend-editor-emoji";
    emojiInput.type = "text";
    emojiInput.maxLength = 2;
    emojiInput.value = item.emoji;
    emojiInput.placeholder = "✦";
    emojiInput.addEventListener("input", () => updateWishlistLegendItem(index, { emoji: emojiInput.value.trim() || "✦" }));

    const labelInput = document.createElement("input");
    labelInput.className = "wishlist-legend-editor-label";
    labelInput.type = "text";
    labelInput.value = item.label;
    labelInput.placeholder = "Legend label";
    labelInput.addEventListener("input", () => updateWishlistLegendItem(index, { label: labelInput.value.trim() || `Label ${index + 1}` }));

    const toneSelect = document.createElement("select");
    toneSelect.className = "wishlist-legend-editor-tone";
    [
      ["iso", "ISO tint"],
      ["diso", "DISO tint"],
      ["buy", "Buy tint"],
      ["custom", "Neutral tint"],
    ].forEach(([value, label]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      option.selected = item.tone === value;
      toneSelect.append(option);
    });
    toneSelect.addEventListener("change", () => updateWishlistLegendItem(index, { tone: toneSelect.value }));

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "wishlist-legend-editor-remove";
    removeButton.textContent = "Remove";
    removeButton.disabled = items.length <= 1;
    removeButton.addEventListener("click", () => removeWishlistLegendItem(index));

    row.append(emojiInput, labelInput, toneSelect, removeButton);
    wishlistLegendEditorList.append(row);
  });
}

function renderWishlistLandingTitleEditor() {
  if (!wishlistLandingTitle || !wishlistTitleEditor || !wishlistTitleTextInput || !wishlistTitleFontSelect) {
    return;
  }

  const titleText = normalizeWishlistTitleText(settings.wishlistLandingTitleText);
  const titleFont = normalizeWishlistTitleFont(settings.wishlistLandingTitleFont);
  settings.wishlistLandingTitleText = titleText;
  settings.wishlistLandingTitleFont = titleFont;

  wishlistLandingTitle.textContent = titleText;
  wishlistLandingTitle.dataset.font = titleFont;
  wishlistTitleEditor.hidden = !settings.wishlistTitleEditMode;

  if (wishlistTitleTextInput.value !== titleText) {
    wishlistTitleTextInput.value = titleText;
  }
  if (wishlistTitleFontSelect.value !== titleFont) {
    wishlistTitleFontSelect.value = titleFont;
  }
  if (wishlistTitleEditButton) {
    wishlistTitleEditButton.textContent = settings.wishlistTitleEditMode ? "Done title" : "Title";
    wishlistTitleEditButton.classList.toggle("is-active", Boolean(settings.wishlistTitleEditMode));
  }
}

function updateWishlistLegendItem(index, patch) {
  const items = normalizeWishlistLegendItems(settings.wishlistLegendItems);
  items[index] = {
    ...items[index],
    ...patch,
  };
  settings.wishlistLegendItems = items;
  saveSettings();
  renderWishlistLegend();
}

function removeWishlistLegendItem(index) {
  const items = normalizeWishlistLegendItems(settings.wishlistLegendItems);
  items.splice(index, 1);
  settings.wishlistLegendItems = normalizeWishlistLegendItems(items);
  saveSettings();
  renderWishlistLegend();
}

function adjustWishlistFloatingRotation(id, delta) {
  const element = wishlistFloatingGrid?.querySelector(`[data-sonny-id="${id}"]`);
  const currentRotate = element?.style.getPropertyValue("--float-rotate").trim() || settings.wishlistFloatingPositions?.[id]?.rotate || "0deg";
  const currentValue = Number.parseFloat(currentRotate.replace("deg", "")) || 0;
  const nextValue = Math.max(-45, Math.min(45, currentValue + delta));
  const nextRotate = `${nextValue}deg`;
  if (element) {
    element.style.setProperty("--float-rotate", nextRotate);
    const label = element.querySelector(".wishlist-rotate-value");
    if (label) {
      label.textContent = `${nextValue}°`;
    }
  }
  settings.wishlistFloatingPositions = {
    ...(settings.wishlistFloatingPositions || {}),
    [id]: {
      ...(settings.wishlistFloatingPositions?.[id] || {}),
      x: element?.style.getPropertyValue("--float-x").trim() || settings.wishlistFloatingPositions?.[id]?.x || "50%",
      y: element?.style.getPropertyValue("--float-y").trim() || settings.wishlistFloatingPositions?.[id]?.y || "200px",
      rotate: nextRotate,
      scale: element?.style.getPropertyValue("--float-scale").trim() || settings.wishlistFloatingPositions?.[id]?.scale || "1",
    },
  };
  saveSettings();
}

function startWishlistRotateDrag(event, id, element, handle) {
  if (!settings.wishlistLandingEditMode) {
    return;
  }
  event.preventDefault();
  event.stopPropagation();
  activeWishlistRotateDrag = {
    id,
    element,
    handle,
    startClientX: event.clientX,
    startRotate: Number.parseFloat(
      (element?.style.getPropertyValue("--float-rotate").trim() || settings.wishlistFloatingPositions?.[id]?.rotate || "0deg").replace("deg", ""),
    ) || 0,
  };
  element?.classList.add("is-rotating");
  handle?.setPointerCapture?.(event.pointerId);
}

function updateWishlistRotateDragPosition(event) {
  if (!activeWishlistRotateDrag) {
    return;
  }
  const deltaX = event.clientX - activeWishlistRotateDrag.startClientX;
  const nextValue = Math.max(-45, Math.min(45, activeWishlistRotateDrag.startRotate + deltaX * 0.35));
  const nextRotate = `${Math.round(nextValue)}deg`;
  const { element, id } = activeWishlistRotateDrag;
  if (element) {
    element.style.setProperty("--float-rotate", nextRotate);
    const label = element.querySelector(".wishlist-rotate-value");
    if (label) {
      label.textContent = `${Math.round(nextValue)}°`;
    }
  }
  settings.wishlistFloatingPositions = {
    ...(settings.wishlistFloatingPositions || {}),
    [id]: {
      ...(settings.wishlistFloatingPositions?.[id] || {}),
      x: element?.style.getPropertyValue("--float-x").trim() || settings.wishlistFloatingPositions?.[id]?.x || "50%",
      y: element?.style.getPropertyValue("--float-y").trim() || settings.wishlistFloatingPositions?.[id]?.y || "200px",
      rotate: nextRotate,
      scale: element?.style.getPropertyValue("--float-scale").trim() || settings.wishlistFloatingPositions?.[id]?.scale || "1",
    },
  };
}

function endWishlistRotateDrag(event) {
  if (!activeWishlistRotateDrag) {
    return;
  }
  activeWishlistRotateDrag.element?.classList.remove("is-rotating");
  if (event) {
    activeWishlistRotateDrag.handle?.releasePointerCapture?.(event.pointerId);
  }
  activeWishlistRotateDrag = null;
  saveSettings();
}

function startWishlistFloatingDrag(event) {
  if (!settings.wishlistLandingEditMode || !wishlistLandingStage) {
    return;
  }
  if (activeWishlistRotateDrag || event.target.closest(".wishlist-floating-rotate-handle")) {
    return;
  }
  const floating = event.currentTarget;
  const sonnyId = floating?.dataset?.sonnyId;
  if (!floating || !sonnyId) {
    return;
  }
  event.preventDefault();
  const stageRect = wishlistLandingStage.getBoundingClientRect();
  const currentXValue = floating.style.getPropertyValue("--float-x").trim() || settings.wishlistFloatingPositions?.[sonnyId]?.x || "50%";
  const currentYValue = floating.style.getPropertyValue("--float-y").trim() || settings.wishlistFloatingPositions?.[sonnyId]?.y || "200px";
  const currentCenterX = currentXValue.endsWith("%")
    ? (Number.parseFloat(currentXValue) / 100) * stageRect.width
    : Number.parseFloat(currentXValue) || stageRect.width / 2;
  const currentCenterY = Number.parseFloat(currentYValue) || 200;
  activeWishlistDrag = {
    id: sonnyId,
    element: floating,
    stageRect,
    pointerOffsetX: event.clientX - stageRect.left - currentCenterX,
    pointerOffsetY: event.clientY - stageRect.top - currentCenterY,
  };
  floating.classList.add("is-dragging");
  floating.setPointerCapture?.(event.pointerId);
}

function updateWishlistFloatingDragPosition(event) {
  if (!activeWishlistDrag || !wishlistLandingStage) {
    return;
  }
  const stageRect = wishlistLandingStage.getBoundingClientRect();
  const rawX = event.clientX - stageRect.left - (activeWishlistDrag.pointerOffsetX || 0);
  const rawY = event.clientY - stageRect.top - (activeWishlistDrag.pointerOffsetY || 0);
  const clampedX = Math.max(24, Math.min(stageRect.width - 24, rawX));
  const clampedY = Math.max(120, Math.min(stageRect.height - 70, rawY));
  const xPercent = `${((clampedX / stageRect.width) * 100).toFixed(2)}%`;
  const yPixels = `${clampedY.toFixed(0)}px`;
  activeWishlistDrag.element.style.setProperty("--float-x", xPercent);
  activeWishlistDrag.element.style.setProperty("--float-y", yPixels);
  settings.wishlistFloatingPositions = {
    ...(settings.wishlistFloatingPositions || {}),
    [activeWishlistDrag.id]: {
      ...(settings.wishlistFloatingPositions?.[activeWishlistDrag.id] || {}),
      x: xPercent,
      y: yPixels,
      rotate: activeWishlistDrag.element.style.getPropertyValue("--float-rotate").trim() || "-2deg",
      scale: activeWishlistDrag.element.style.getPropertyValue("--float-scale").trim() || "1",
    },
  };
}

function endWishlistFloatingDrag(event) {
  if (!activeWishlistDrag) {
    return;
  }
  activeWishlistDrag.element.classList.remove("is-dragging");
  if (event) {
    activeWishlistDrag.element.releasePointerCapture?.(event.pointerId);
  }
  activeWishlistDrag = null;
  saveSettings();
}

function renderWishlist() {
  const wishlistItems = sonnies.filter((item) => {
    const status = getStatus(item.id);
    return status === "iso" || status === "diso";
  });
  const search = wishlistSearch?.value.trim().toLowerCase() || "";
  const selectedSeries = wishlistSeriesFilter?.value || "all";
  const selectedStatus = wishlistStatusFilter?.value || "all";
  const sortMode = wishlistSortFilter?.value || "wishlist-date-desc";

  const wishlistSeries = uniqueSeries(wishlistItems);
  const previousSeries = wishlistSeriesFilter?.value || "all";
  if (wishlistSeriesFilter) {
    wishlistSeriesFilter.innerHTML = '<option value="all">All series</option>';
    wishlistSeries.forEach((series) => {
      const option = document.createElement("option");
      option.value = series;
      option.textContent = formatSeriesUiLabel(series);
      option.selected = series === previousSeries;
      wishlistSeriesFilter.append(option);
    });
    if (selectedSeries !== "all" && !wishlistSeries.includes(selectedSeries)) {
      wishlistSeriesFilter.value = "all";
    }
  }

  const filteredWishlistItems = wishlistItems.filter((item) => {
    const status = getStatus(item.id);
    const matchesSearch =
      !search ||
      displayName(item).toLowerCase().includes(search) ||
      displaySeries(item).toLowerCase().includes(search);
    const matchesSeries =
      (wishlistSeriesFilter?.value || "all") === "all" ||
      displaySeries(item) === (wishlistSeriesFilter?.value || "all");
    const matchesStatus = selectedStatus === "all" || status === selectedStatus;
    return matchesSearch && matchesSeries && matchesStatus;
  });

  const benchedFilteredItems = filteredWishlistItems.filter((item) => isWishlistBoardBenched(item.id));
  const activeFilteredWishlistItems = filteredWishlistItems.filter((item) => !isWishlistBoardBenched(item.id));

  const isoItems = sortItems(
    activeFilteredWishlistItems.filter((item) => getStatus(item.id) === "iso"),
    sortMode,
  );
  const disoItems = sortItems(
    activeFilteredWishlistItems.filter((item) => getStatus(item.id) === "diso"),
    sortMode,
  );

  syncWishlistSubview();

  renderWishlistLanding(filteredWishlistItems);
  renderWishlistBench(sortItems(benchedFilteredItems, sortMode));

  const boardMode = settings.wishlistBoardMode || "immersive";
  if (wishlistBoardView) {
    wishlistBoardView.classList.toggle("is-grid-view", boardMode === "grid");
    wishlistBoardView.classList.toggle("is-immersive-view", boardMode !== "grid");
  }
  if (wishlistLanding) {
    wishlistLanding.hidden = boardMode === "grid";
  }
  if (wishlistGridViewSection) {
    wishlistGridViewSection.hidden = boardMode !== "grid";
  }
  if (wishlistGridViewButton) {
    wishlistGridViewButton.textContent = boardMode === "grid" ? "Dream board" : "Grid view";
    wishlistGridViewButton.classList.toggle("is-active", boardMode === "grid");
  }

  isoGrid.innerHTML = "";
  disoGrid.innerHTML = "";
  isoCount.textContent = isoItems.length;
  disoCount.textContent = disoItems.length;
  if (isoColumn) {
    isoColumn.hidden = selectedStatus === "diso";
  }
  if (disoColumn) {
    disoColumn.hidden = selectedStatus === "iso";
  }

  if (!isoItems.length) {
    isoGrid.innerHTML = '<p class="wishlist-empty">No ISOs yet.</p>';
  } else {
    isoItems.forEach((item) => renderWishlistCard(item, isoGrid));
  }

  if (!disoItems.length) {
    disoGrid.innerHTML = '<p class="wishlist-empty">No DISOs yet.</p>';
  } else {
    disoItems.forEach((item) => renderWishlistCard(item, disoGrid));
  }

  if (wishlistGridLayout && wishlistGridLayout.value !== settings.wishlistGridLayout) {
    wishlistGridLayout.value = settings.wishlistGridLayout || "split";
  }
  if (wishlistGridViewSection) {
    wishlistGridViewSection.classList.toggle(
      "is-stacked",
      (settings.wishlistGridLayout || "split") === "stacked",
    );
  }

  reconcileMakerSelections();
  updateWishlistImmersiveState();
  renderWishlistRanker();
}

function syncWishlistSubview() {
  if (wishlistBoardView) {
    wishlistBoardView.hidden = activeWishlistSubview !== "board";
  }
  if (wishlistRankerFlow) {
    wishlistRankerFlow.hidden = activeWishlistSubview !== "ranker";
  }
  if (wishlistMakerFlow) {
    wishlistMakerFlow.hidden = activeWishlistSubview !== "maker";
  }
}

function renderHideSeriesList(items, query) {
  const hiddenSeriesKeys = new Set(
    settings.hiddenSeries.map((series) => canonicalSeriesKey(series)),
  );
  const visibleSeries = uniqueSeries(items).filter((series) => {
    const matchesQuery = !query || series.toLowerCase().includes(query);
    const matchesView =
      hideManagerView !== "hidden" || hiddenSeriesKeys.has(canonicalSeriesKey(series));
    return matchesQuery && matchesView;
  });

  hiddenSeriesCount.textContent = hiddenSeriesKeys.size;
  hideSeriesList.innerHTML = "";

  if (!visibleSeries.length) {
    hideSeriesList.innerHTML =
      '<p class="wishlist-empty">No series match that search.</p>';
    return;
  }

  visibleSeries.forEach((series) => {
    const row = document.createElement("article");
    row.className = "hide-row";
    if (hiddenSeriesKeys.has(canonicalSeriesKey(series))) {
      row.classList.add("is-hidden");
    }

    const copy = document.createElement("div");
    copy.className = "hide-row-copy";

    const title = document.createElement("h4");
    title.textContent = series;

    const detail = document.createElement("p");
    const seriesCount = items.filter((item) => displaySeries(item) === series).length;
    detail.textContent = `${seriesCount} Sonny${seriesCount === 1 ? "" : "s"} in this series`;

    const button = document.createElement("button");
    button.className = "hide-toggle-button";
    button.type = "button";
    button.textContent = hiddenSeriesKeys.has(canonicalSeriesKey(series))
      ? "Show again"
      : "Hide series";
    button.addEventListener("click", () => toggleHiddenSeries(series));

    copy.append(title, detail);
    row.append(copy, button);
    hideSeriesList.append(row);
  });
}

function renderHideSonniesList(items, query) {
  const filteredItems = items
    .filter((item) => {
      const matchesQuery =
        !query ||
        displayName(item).toLowerCase().includes(query) ||
        displaySeries(item).toLowerCase().includes(query);
      const matchesView =
        hideManagerView !== "hidden" || settings.hiddenSonnies.includes(item.id);
      return matchesQuery && matchesView;
    })
    .sort((left, right) => {
      const seriesDiff = displaySeries(left).localeCompare(displaySeries(right));
      return seriesDiff || compareCatalogOrder(left, right) || displayName(left).localeCompare(displayName(right));
    });

  hiddenSonniesCount.textContent = settings.hiddenSonnies.length;
  hideSonniesList.innerHTML = "";

  if (!filteredItems.length) {
    hideSonniesList.innerHTML =
      '<p class="wishlist-empty">No Sonnies match that search.</p>';
    return;
  }

  filteredItems.forEach((item) => {
    const row = document.createElement("article");
    row.className = "hide-row hide-row-sonny";
    if (settings.hiddenSonnies.includes(item.id)) {
      row.classList.add("is-hidden");
    }

    const art = document.createElement("div");
    art.className = "hide-row-art";
    art.setAttribute("style", buildArtworkStyle(item));

    const copy = document.createElement("div");
    copy.className = "hide-row-copy";

    const title = document.createElement("h4");
    title.textContent = displayName(item);

    const detail = document.createElement("p");
    detail.textContent = displaySeries(item);

    const button = document.createElement("button");
    button.className = "hide-toggle-button";
    button.type = "button";
    button.textContent = settings.hiddenSonnies.includes(item.id) ? "Show again" : "Hide Sonny";
    button.addEventListener("click", () => toggleHiddenSonny(item.id));

    copy.append(title, detail);
    row.append(art, copy, button);
    hideSonniesList.append(row);
  });
}

function renderSettings() {
  const query = hideSearchInput.value.trim().toLowerCase();
  renderHideSeriesList(sonnies, query);
  renderHideSonniesList(sonnies, query);

  const visibility = settings.collectionFieldVisibility || DEFAULT_COLLECTION_FIELD_VISIBILITY;
  collectionFieldToggles.forEach((toggle) => {
    const key = toggle.id.replace("field-toggle-", "");
    toggle.checked = visibility[key] !== false;
  });
}

function getWishlistMakerItems() {
  return sortItems(
    sonnies.filter((item) => {
      const status = getStatus(item.id);
      return status === "iso" || status === "diso";
    }),
    "wanted",
  );
}

function getWishlistRankerItems() {
  return getWishlistMakerItems();
}

function buildWishlistRankerPairKey(leftId, rightId) {
  return [leftId, rightId].sort().join("::");
}

function estimateWishlistRankerScore(item) {
  const existingRank = getWishlistRank(item.id);
  if (existingRank != null) {
    return 1600 - existingRank * 16;
  }

  return WISHLIST_RANKER_BASE_SCORE + (getStatus(item.id) === "diso" ? WISHLIST_RANKER_DISO_BONUS : 0);
}

function ensureWishlistRankerState(items = getWishlistRankerItems()) {
  const nextScores = normalizeWishlistRankerScores(settings.wishlistRankerScores);
  let changed = false;

  items.forEach((item) => {
    if (!Number.isFinite(nextScores[item.id])) {
      nextScores[item.id] = estimateWishlistRankerScore(item);
      changed = true;
    }
  });

  if (changed) {
    settings.wishlistRankerScores = nextScores;
    saveSettings();
  }

  return nextScores;
}

function getWishlistRankerScore(id) {
  const scores = normalizeWishlistRankerScores(settings.wishlistRankerScores);
  return Number.isFinite(scores[id]) ? scores[id] : null;
}

function getWishlistRankerComparisonTotal(items = getWishlistRankerItems()) {
  const ids = new Set(items.map((item) => item.id));
  const counts = normalizeWishlistRankerPairCounts(settings.wishlistRankerPairCounts);
  return Object.entries(counts).reduce((sum, [key, value]) => {
    const [leftId, rightId] = key.split("::");
    if (!ids.has(leftId) || !ids.has(rightId)) {
      return sum;
    }
    return sum + Number(value || 0);
  }, 0);
}

function getWishlistRankerCandidatePairTotal(items = getWishlistRankerItems()) {
  if (items.length < 2) {
    return 0;
  }

  const ordered = getWishlistRankerOrderedItems(items);
  const neighborWindow = ordered.length <= 8 ? ordered.length - 1 : 5;
  let total = 0;

  ordered.forEach((_, index) => {
    total += Math.min(neighborWindow, Math.max(0, ordered.length - index - 1));
  });

  return total;
}

function getWishlistRankerTargetComparisons(items = getWishlistRankerItems()) {
  const candidateTotal = getWishlistRankerCandidatePairTotal(items);
  if (candidateTotal <= 0) {
    return 0;
  }
  if (items.length <= 2) {
    return 1;
  }
  if (items.length <= 4) {
    return Math.min(candidateTotal, items.length * 2);
  }

  const softTarget = Math.max(8, Math.min(40, Math.ceil(items.length * 0.5)));
  return Math.min(candidateTotal, softTarget);
}

function isWishlistRankerComplete(items = getWishlistRankerItems()) {
  const target = getWishlistRankerTargetComparisons(items);
  if (!target) {
    return false;
  }
  return getWishlistRankerComparisonTotal(items) >= target;
}

function getWishlistRankerOrderedItems(items = getWishlistRankerItems()) {
  const scores = ensureWishlistRankerState(items);
  return [...items].sort((left, right) => {
    const scoreDiff = (scores[right.id] || 0) - (scores[left.id] || 0);
    return (
      scoreDiff ||
      compareText(labelForWishlistStatus(getStatus(left.id)), labelForWishlistStatus(getStatus(right.id))) ||
      compareCatalogOrder(left, right) ||
      compareText(displayName(left), displayName(right))
    );
  });
}

function applyWishlistRanksFromRanker(items = getWishlistRankerItems()) {
  const ordered = getWishlistRankerOrderedItems(items);
  const now = new Date().toISOString();

  ordered.forEach((item, index) => {
    const current = progress[item.id] && typeof progress[item.id] === "object" ? progress[item.id] : {};
    progress[item.id] = {
      ...current,
      status: getStatus(item.id),
      wishlistRank: String(index + 1),
      wishlistAddedAt: current.wishlistAddedAt || now,
    };
  });

  saveProgress();
}

function pickNextWishlistRankerPair(items = getWishlistRankerItems()) {
  if (items.length < 2) {
    return [];
  }

  const scores = ensureWishlistRankerState(items);
  const counts = normalizeWishlistRankerPairCounts(settings.wishlistRankerPairCounts);
  const ordered = getWishlistRankerOrderedItems(items);
  const candidates = [];
  const neighborWindow = ordered.length <= 8 ? ordered.length - 1 : 5;

  ordered.forEach((leftItem, index) => {
    for (let offset = 1; offset <= neighborWindow; offset += 1) {
      const rightItem = ordered[index + offset];
      if (!rightItem) {
        break;
      }
      const pairKey = buildWishlistRankerPairKey(leftItem.id, rightItem.id);
      const pairCount = counts[pairKey] || 0;
      const scoreGap = Math.abs((scores[leftItem.id] || 0) - (scores[rightItem.id] || 0));
      const candidateWeight =
        pairCount * 1000 +
        scoreGap +
        offset * 14 +
        Math.random() * 8;
      candidates.push({
        pairKey,
        pairCount,
        weight: candidateWeight,
        items: [leftItem, rightItem],
      });
    }
  });

  if (!candidates.length) {
    return ordered.slice(0, 2);
  }

  candidates.sort((left, right) => left.weight - right.weight);
  return candidates[0].items;
}

function renderWishlistRankerChoice(button, item) {
  if (!button) {
    return;
  }

  const art = button.querySelector(".ranker-choice-art");
  const series = button.querySelector(".ranker-choice-series");
  const name = button.querySelector(".ranker-choice-name");
  const status = button.querySelector(".ranker-choice-status");

  if (!item) {
    button.disabled = true;
    button.hidden = true;
    return;
  }

  button.hidden = false;
  button.disabled = false;
  if (art) {
    art.setAttribute("style", buildArtworkStyle(item));
  }
  if (series) {
    series.textContent = formatSeriesUiLabel(displaySeries(item));
  }
  if (name) {
    name.textContent = displayName(item);
  }
  if (status) {
    status.textContent = labelForWishlistStatus(getStatus(item.id));
    status.dataset.status = getStatus(item.id);
  }
}

function renderWishlistRanker() {
  if (!wishlistRankerFlow || wishlistRankerFlow.hidden) {
    return;
  }

  const items = getWishlistRankerItems();
  const ordered = getWishlistRankerOrderedItems(items);
  const comparisonTotal = getWishlistRankerComparisonTotal(items);
  const comparisonTarget = getWishlistRankerTargetComparisons(items);
  const isComplete = isWishlistRankerComplete(items);
  const [leftItem, rightItem] =
    !isComplete &&
    currentWishlistRankerPair.length === 2 &&
    items.some((item) => item.id === currentWishlistRankerPair[0]?.id) &&
    items.some((item) => item.id === currentWishlistRankerPair[1]?.id)
      ? currentWishlistRankerPair
      : (isComplete ? [] : pickNextWishlistRankerPair(items));

  currentWishlistRankerPair = leftItem && rightItem ? [leftItem, rightItem] : [];

  if (wishlistRankerSummary) {
    if (items.length < 2) {
      wishlistRankerSummary.textContent = items.length === 1
        ? "Add at least one more ISO or DISO to start comparing pairs."
        : "Add some ISO or DISO Sonnies first, then the ranker can start building your order.";
    } else if (isComplete) {
      wishlistRankerSummary.textContent = `Ranking pass complete · ${comparisonTotal} of ${comparisonTarget} comparisons done. Use Rerank anytime to start a fresh pass.`;
    } else {
      wishlistRankerSummary.textContent = `${items.length} Sonnies in the ranking pool · ${comparisonTotal} of ${comparisonTarget} comparisons done`;
    }
  }

  if (wishlistRankerStage) {
    wishlistRankerStage.classList.toggle("is-empty", items.length < 2 || isComplete);
  }

  renderWishlistRankerChoice(wishlistRankerLeftButton, leftItem);
  renderWishlistRankerChoice(wishlistRankerRightButton, rightItem);

  if (wishlistRankerSkipButton) {
    wishlistRankerSkipButton.disabled = items.length < 2 || isComplete;
  }
  if (wishlistRankerTooToughButton) {
    wishlistRankerTooToughButton.disabled = items.length < 2 || isComplete;
  }
  if (wishlistRankerRerankButton) {
    wishlistRankerRerankButton.disabled = items.length < 2;
  }

  if (wishlistRankerPreviewMeta) {
    const topCount = Math.min(ordered.length, 10);
    wishlistRankerPreviewMeta.textContent = ordered.length
      ? `Showing top ${topCount} of ${ordered.length}`
      : "No ranked Sonnies yet";
  }

  if (wishlistRankerPreview) {
    wishlistRankerPreview.innerHTML = "";
    if (!ordered.length) {
      wishlistRankerPreview.innerHTML = '<li class="wishlist-empty">No ISO or DISO Sonnies to rank yet.</li>';
    } else {
      ordered.slice(0, 10).forEach((item, index) => {
        const row = document.createElement("li");
        row.className = "ranker-preview-item";

        const order = document.createElement("span");
        order.className = "ranker-preview-order";
        order.textContent = `${index + 1}.`;

        const art = document.createElement("div");
        art.className = "ranker-preview-art";
        art.setAttribute("style", buildArtworkStyle(item));

        const copy = document.createElement("div");
        copy.className = "ranker-preview-copy";

        const title = document.createElement("strong");
        title.textContent = displayName(item);

        const meta = document.createElement("span");
        meta.textContent = `${labelForWishlistStatus(getStatus(item.id))} · ${formatSeriesUiLabel(displaySeries(item))}`;

        copy.append(title, meta);
        row.append(order, art, copy);
        wishlistRankerPreview.append(row);
      });
    }
  }
}

function advanceWishlistRanker(outcome) {
  const items = getWishlistRankerItems();
  if (items.length < 2 || currentWishlistRankerPair.length !== 2) {
    renderWishlistRanker();
    return;
  }

  const [leftItem, rightItem] = currentWishlistRankerPair;
  const pairKey = buildWishlistRankerPairKey(leftItem.id, rightItem.id);
  const nextScores = normalizeWishlistRankerScores(settings.wishlistRankerScores);
  const nextCounts = normalizeWishlistRankerPairCounts(settings.wishlistRankerPairCounts);
  const leftScore = Number.isFinite(nextScores[leftItem.id]) ? nextScores[leftItem.id] : estimateWishlistRankerScore(leftItem);
  const rightScore = Number.isFinite(nextScores[rightItem.id]) ? nextScores[rightItem.id] : estimateWishlistRankerScore(rightItem);

  nextCounts[pairKey] = (nextCounts[pairKey] || 0) + 1;

  if (outcome === "left" || outcome === "right" || outcome === "tie") {
    const expectedLeft = 1 / (1 + 10 ** ((rightScore - leftScore) / 400));
    const expectedRight = 1 - expectedLeft;
    const resultLeft = outcome === "left" ? 1 : outcome === "right" ? 0 : 0.5;
    const resultRight = 1 - resultLeft;
    const kValue = outcome === "tie" ? WISHLIST_RANKER_TIE_K : WISHLIST_RANKER_ELO_K;

    nextScores[leftItem.id] = leftScore + kValue * (resultLeft - expectedLeft);
    nextScores[rightItem.id] = rightScore + kValue * (resultRight - expectedRight);
  }

  settings.wishlistRankerScores = nextScores;
  settings.wishlistRankerPairCounts = nextCounts;
  saveSettings();
  applyWishlistRanksFromRanker(items);
  currentWishlistRankerPair = pickNextWishlistRankerPair(items);
  renderWishlist();
  renderWishlistRanker();
}

function resetWishlistRanker() {
  const items = getWishlistRankerItems();
  settings.wishlistRankerScores = {};
  settings.wishlistRankerPairCounts = {};

  items.forEach((item) => {
    const current = progress[item.id] && typeof progress[item.id] === "object" ? progress[item.id] : null;
    if (!current) {
      return;
    }
    const next = { ...current };
    delete next.wishlistRank;
    progress[item.id] = next;
  });

  saveProgress();
  saveSettings();
  currentWishlistRankerPair = [];
  renderWishlist();
  renderWishlistRanker();
}

function openWishlistRanker() {
  if (!wishlistBoardView || !wishlistRankerFlow) {
    return;
  }

  trackSiteEvent("open_wishlist_ranker");

  activeWishlistSubview = "ranker";
  syncWishlistSubview();
  currentWishlistRankerPair = [];
  renderWishlistRanker();
}

function closeWishlistRanker() {
  if (!wishlistBoardView || !wishlistRankerFlow) {
    return;
  }

  activeWishlistSubview = "board";
  syncWishlistSubview();
  currentWishlistRankerPair = [];
  renderWishlist();
}

function getMakerItemsById() {
  return new Map(getWishlistMakerItems().map((item) => [item.id, item]));
}

function getSavedMakerLayouts() {
  return normalizeWishlistMakerLayouts(settings.wishlistMakerLayouts);
}

function getNextMakerLayoutName() {
  const existingNames = new Set(getSavedMakerLayouts().map((layout) => layout.name.toLowerCase()));
  let index = 1;
  while (existingNames.has(`dream board ${index}`)) {
    index += 1;
  }
  return `Dream board ${index}`;
}

function snapshotMakerLayout() {
  return {
    draftSelection: [...makerDraftSelection],
    appliedSelection: [...makerAppliedSelection],
    background: makerBackground,
    customBackgroundDataUrl: makerCustomBackgroundDataUrl,
    customBackgroundName: makerCustomBackgroundName,
    columns: makerColumns,
    orderMode: makerOrderMode,
    canvasWidthInches: makerCanvasWidthInches,
    canvasHeightInches: makerCanvasHeightInches,
    labelStyle: makerLabelStyle,
    isoEmoji: makerIsoEmoji,
    disoEmoji: makerDisoEmoji,
    customCodeEnabled: makerCustomCodeEnabled,
    customLabelName: makerCustomLabelName,
    customEmoji: makerCustomEmoji,
    customEmojiIds: [...makerCustomEmojiIds],
  };
}

function updateMakerSavedLayoutControls() {
  if (makerLayoutNameInput) {
    makerLayoutNameInput.value = makerLayoutName;
  }
  if (makerSaveCurrentButton) {
    makerSaveCurrentButton.disabled = !makerActiveSavedLayoutId;
  }
}

function renderMakerSavedLayouts() {
  updateMakerSavedLayoutControls();

  if (!makerSavedList) {
    return;
  }

  const layouts = getSavedMakerLayouts();
  makerSavedList.innerHTML = "";

  if (!layouts.length) {
    makerSavedList.innerHTML = '<p class="wishlist-empty">No saved ISO / DISO designs yet. Save one here and you can reopen it later.</p>';
    return;
  }

  layouts.forEach((layout) => {
    const row = document.createElement("article");
    row.className = "maker-saved-item";
    row.classList.toggle("is-active", layout.id === makerActiveSavedLayoutId);

    const copy = document.createElement("div");
    copy.className = "maker-saved-copy";

    const title = document.createElement("h5");
    title.textContent = layout.name;

    const meta = document.createElement("p");
    const savedDate = new Date(layout.savedAt);
    const savedLabel = Number.isNaN(savedDate.getTime())
      ? "Saved recently"
      : `Saved ${savedDate.toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}`;
    meta.textContent = `${layout.appliedSelection.length || layout.draftSelection.length} Sonnies · ${layout.canvasWidthInches}x${layout.canvasHeightInches} · ${savedLabel}`;

    copy.append(title, meta);

    const actions = document.createElement("div");
    actions.className = "maker-saved-actions-inline";

    const openButton = document.createElement("button");
    openButton.type = "button";
    openButton.className = "ghost-button maker-saved-action";
    openButton.textContent = layout.id === makerActiveSavedLayoutId ? "Open now" : "Open";
    openButton.addEventListener("click", () => loadSavedMakerLayout(layout.id));

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "ghost-button maker-saved-action";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      settings.wishlistMakerLayouts = getSavedMakerLayouts().filter((entry) => entry.id !== layout.id);
      if (makerActiveSavedLayoutId === layout.id) {
        makerActiveSavedLayoutId = "";
        makerLayoutName = getNextMakerLayoutName();
      }
      saveSettings();
      renderMakerSavedLayouts();
    });

    actions.append(openButton, deleteButton);
    row.append(copy, actions);
    makerSavedList.append(row);
  });
}

function loadSavedMakerLayout(id) {
  const layout = getSavedMakerLayouts().find((entry) => entry.id === id);
  if (!layout) {
    return;
  }

  trackSiteEvent("open_saved_wishlist_maker_layout", {
    layoutId: layout.id,
    layoutName: layout.name,
  });

  makerActiveSavedLayoutId = layout.id;
  makerLayoutName = layout.name;
  makerDraftSelection = [...layout.draftSelection];
  makerAppliedSelection = [...(layout.appliedSelection.length ? layout.appliedSelection : layout.draftSelection)];
  makerBackground = layout.background;
  makerCustomBackgroundDataUrl = layout.customBackgroundDataUrl;
  makerCustomBackgroundName = layout.customBackgroundName;
  makerColumns = layout.columns;
  makerOrderMode = layout.orderMode;
  makerCanvasWidthInches = layout.canvasWidthInches;
  makerCanvasHeightInches = layout.canvasHeightInches;
  makerLabelStyle = layout.labelStyle;
  makerIsoEmoji = layout.isoEmoji;
  makerDisoEmoji = layout.disoEmoji;
  makerCustomCodeEnabled = layout.customCodeEnabled;
  makerCustomLabelName = layout.customLabelName;
  makerCustomEmoji = layout.customEmoji;
  makerCustomEmojiIds = [...layout.customEmojiIds];

  makerOrderSelect.value = makerOrderMode;
  syncMakerSelectionCapacity({ syncDraftFromApplied: true });
  updateMakerLayoutControls();
  wishlistBoardView.hidden = true;
  wishlistMakerFlow.hidden = false;
  makerSelectionStep.hidden = true;
  makerCanvasStep.hidden = false;
  renderMakerSavedLayouts();
  renderMakerPicker();
  renderMakerBackgroundOptions();
  renderMakerArrangement();
  renderMakerCanvas();
}

function saveCurrentMakerLayout(options = {}) {
  const { asNew = false } = options;
  const layouts = getSavedMakerLayouts();
  const trimmedName = (makerLayoutNameInput?.value || makerLayoutName || "").trim() || getNextMakerLayoutName();
  const snapshot = normalizeWishlistMakerLayouts([
    {
      id: !asNew && makerActiveSavedLayoutId ? makerActiveSavedLayoutId : crypto.randomUUID(),
      name: trimmedName,
      savedAt: new Date().toISOString(),
      ...snapshotMakerLayout(),
    },
  ])[0];

  const existingIndex = !asNew
    ? layouts.findIndex((layout) => layout.id === makerActiveSavedLayoutId)
    : -1;

  if (existingIndex >= 0) {
    layouts[existingIndex] = snapshot;
  } else {
    layouts.unshift(snapshot);
  }

  makerActiveSavedLayoutId = snapshot.id;
  makerLayoutName = snapshot.name;
  settings.wishlistMakerLayouts = layouts;
  saveSettings();
  trackSiteEvent(asNew ? "save_new_wishlist_maker_layout" : "update_wishlist_maker_layout", {
    layoutId: snapshot.id,
    layoutName: snapshot.name,
    selectionCount: snapshot.appliedSelection.length || snapshot.draftSelection.length,
  });
  renderMakerSavedLayouts();
}

function startNewMakerLayoutDraft() {
  makerActiveSavedLayoutId = "";
  makerLayoutName = getNextMakerLayoutName();
  renderMakerSavedLayouts();
}

function makerBadgeEmojiForItem(item) {
  if (makerLabelStyle !== "emoji-code") {
    return "";
  }
  if (makerCustomCodeEnabled && makerCustomEmojiIds.includes(item.id)) {
    return makerCustomEmoji.trim() || "✨";
  }
  return getStatus(item.id) === "diso"
    ? (makerDisoEmoji.trim() || "💗")
    : (makerIsoEmoji.trim() || "💙");
}

function makerBadgeLabelForItem(item) {
  if (makerCustomCodeEnabled && makerCustomEmojiIds.includes(item.id)) {
    return makerCustomLabelName.trim() || "Custom";
  }
  return getStatus(item.id) === "diso" ? "DISO" : "ISO";
}

function moveMakerSelection(id, direction) {
  if (makerOrderMode !== "custom") {
    return;
  }

  const index = makerAppliedSelection.indexOf(id);
  if (index === -1) {
    return;
  }

  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= makerAppliedSelection.length) {
    return;
  }

  const reordered = [...makerAppliedSelection];
  [reordered[index], reordered[nextIndex]] = [reordered[nextIndex], reordered[index]];
  makerAppliedSelection = reordered;
  renderMakerArrangement();
  renderMakerCanvas();
}

function applyMakerOrdering() {
  const items = getWishlistMakerItems().filter((item) => makerAppliedSelection.includes(item.id));

  if (makerOrderMode === "custom") {
    const availableIds = new Set(items.map((item) => item.id));
    makerAppliedSelection = makerAppliedSelection.filter((id) => availableIds.has(id));
    return;
  }

  if (makerOrderMode === "iso-first") {
    makerAppliedSelection = sortItems(items, "wanted")
      .reverse()
      .map((item) => item.id);
    return;
  }

  makerAppliedSelection = sortItems(items, makerOrderMode).map((item) => item.id);
}

function updateMakerLayoutControls() {
  makerColumnsValue.textContent = String(makerColumns);
  makerWidthValue.textContent = String(makerCanvasWidthInches);
  makerHeightValue.textContent = String(makerCanvasHeightInches);
  makerLabelStyleSelect.value = makerLabelStyle;
  makerEmojiPanel.hidden = makerLabelStyle !== "emoji-code";
  makerDisoEmojiInput.value = makerDisoEmoji;
  makerIsoEmojiInput.value = makerIsoEmoji;
  makerCustomCodeEnabledToggle.checked = makerCustomCodeEnabled;
  makerCustomCodeFields.hidden = !makerCustomCodeEnabled;
  makerCustomLabelNameInput.value = makerCustomLabelName;
  makerCustomEmojiInput.value = makerCustomEmoji;

  makerColumnsDownButton.disabled = makerColumns <= 1;
  makerColumnsUpButton.disabled = makerColumns >= 10;
  makerWidthDownButton.disabled = makerCanvasWidthInches <= 1;
  makerWidthUpButton.disabled = makerCanvasWidthInches >= 20;
  makerHeightDownButton.disabled = makerCanvasHeightInches <= 1;
  makerHeightUpButton.disabled = makerCanvasHeightInches >= 20;
}

function updateMakerSelectionCount() {
  const count = makerDraftSelection.length;
  const maxCount = getMakerMaxSelectableCount(getWishlistMakerItems());
  makerSelectionCount.textContent = `${count} selected · ${maxCount} fit on page`;
}

function getMakerSelectionCountsFromIds(selectionIds) {
  let isoCount = 0;
  let disoCount = 0;
  const itemsById = getMakerItemsById();

  selectionIds.forEach((id) => {
    const item = itemsById.get(id);
    if (!item) {
      return;
    }
    if (getStatus(item.id) === "diso") {
      disoCount += 1;
      return;
    }
    isoCount += 1;
  });

  return {
    totalCount: isoCount + disoCount,
    isoCount,
    disoCount,
  };
}

function getMakerCanvasLayoutMetrics(counts) {
  const columns = Math.max(1, makerColumns);
  const canvasWidth = makerCanvasWidthInches * 96;
  const canvasHeight = makerCanvasHeightInches * 96;
  const contentWidth = Math.max(0, canvasWidth - MAKER_CANVAS_PADDING_PX);
  const contentHeight = Math.max(0, canvasHeight - MAKER_CANVAS_PADDING_PX);
  const cellWidth = Math.max(
    0,
    (contentWidth - MAKER_CANVAS_GAP_PX * Math.max(0, columns - 1)) / columns,
  );

  if (!counts.totalCount) {
    return {
      cellWidth,
      cardHeight: Math.max(MAKER_CANVAS_MIN_CARD_HEIGHT_PX, cellWidth),
      fits: cellWidth >= MAKER_CANVAS_MIN_CARD_WIDTH_PX,
    };
  }

  let cardHeight = 0;

  if (makerLabelStyle === "section-labels") {
    const sectionCounts = [counts.disoCount, counts.isoCount].filter((value) => value > 0);
    const totalRows = sectionCounts.reduce((sum, value) => sum + Math.ceil(value / columns), 0);
    const totalGridGapHeight = sectionCounts.reduce((sum, value) => {
      const rows = Math.ceil(value / columns);
      return sum + Math.max(0, rows - 1) * MAKER_CANVAS_GAP_PX;
    }, 0);
    const sectionExtraHeight =
      sectionCounts.length * MAKER_CANVAS_SECTION_TITLE_PX +
      Math.max(0, sectionCounts.length - 1) * MAKER_CANVAS_SECTION_BREAK_PX;
    const availableCardHeight = contentHeight - sectionExtraHeight - totalGridGapHeight;
    cardHeight = totalRows > 0 ? availableCardHeight / totalRows : 0;
  } else {
    const rows = Math.ceil(counts.totalCount / columns);
    const headerHeight = makerLabelStyle === "emoji-code" ? MAKER_CANVAS_EMOJI_LEGEND_PX : 0;
    const totalGridGapHeight = Math.max(0, rows - 1) * MAKER_CANVAS_GAP_PX;
    const availableCardHeight = contentHeight - headerHeight - totalGridGapHeight;
    cardHeight = rows > 0 ? availableCardHeight / rows : 0;
  }

  return {
    cellWidth,
    cardHeight,
    fits:
      cellWidth >= MAKER_CANVAS_MIN_CARD_WIDTH_PX &&
      cardHeight >= MAKER_CANVAS_MIN_CARD_HEIGHT_PX,
  };
}

function doesMakerSelectionFit(selectionIds) {
  return getMakerCanvasLayoutMetrics(getMakerSelectionCountsFromIds(selectionIds)).fits;
}

function getMakerSelectionIdsThatFit(selectionIds) {
  const itemsById = getMakerItemsById();
  const nextSelection = selectionIds.filter((id) => itemsById.has(id));

  while (nextSelection.length && !doesMakerSelectionFit(nextSelection)) {
    nextSelection.pop();
  }

  return nextSelection;
}

function getMakerMaxSelectableCount(items = getWishlistMakerItems()) {
  const availableIso = items.filter((item) => getStatus(item.id) === "iso").length;
  const availableDiso = items.length - availableIso;

  for (let total = items.length; total >= 0; total -= 1) {
    if (makerLabelStyle !== "section-labels") {
      const counts = {
        totalCount: total,
        isoCount: Math.min(total, availableIso),
        disoCount: Math.max(0, total - Math.min(total, availableIso)),
      };
      if (getMakerCanvasLayoutMetrics(counts).fits) {
        return total;
      }
      continue;
    }

    const minDiso = Math.max(0, total - availableIso);
    const maxDiso = Math.min(availableDiso, total);

    for (let disoCount = minDiso; disoCount <= maxDiso; disoCount += 1) {
      const isoCount = total - disoCount;
      if (
        getMakerCanvasLayoutMetrics({
          totalCount: total,
          isoCount,
          disoCount,
        }).fits
      ) {
        return total;
      }
    }
  }

  return 0;
}

function syncMakerSelectionCapacity(options = {}) {
  const { syncDraftToApplied = false, syncDraftFromApplied = false } = options;

  const nextDraft = getMakerSelectionIdsThatFit(makerDraftSelection);
  if (nextDraft.length !== makerDraftSelection.length) {
    makerDraftSelection = nextDraft;
  }

  if (syncDraftToApplied) {
    makerAppliedSelection = [...makerDraftSelection];
    return;
  }

  const nextApplied = getMakerSelectionIdsThatFit(makerAppliedSelection);
  if (nextApplied.length !== makerAppliedSelection.length) {
    makerAppliedSelection = nextApplied;
  }

  if (syncDraftFromApplied) {
    makerDraftSelection = [...makerAppliedSelection];
  }
}

function reconcileMakerSelections(options = {}) {
  const { reset = false } = options;
  const wantedIds = new Set(getWishlistMakerItems().map((item) => item.id));

  makerDraftSelection = reset
    ? [...wantedIds]
    : makerDraftSelection.filter((id) => wantedIds.has(id));
  makerAppliedSelection = makerAppliedSelection.filter((id) => wantedIds.has(id));
  syncMakerSelectionCapacity();

  updateMakerSelectionCount();

  if (!wishlistMakerFlow.hidden) {
    applyMakerOrdering();
    renderMakerPicker();
    renderMakerArrangement();
    renderMakerCanvas();
  }
}

function openWishlistMaker() {
  trackSiteEvent("open_wishlist_maker");
  makerBackground = "blush";
  makerColumns = 4;
  makerOrderMode = "custom";
  makerCanvasWidthInches = 8;
  makerCanvasHeightInches = 10;
  makerLabelStyle = "none";
  makerDraftSelection = getWishlistMakerItems().map((item) => item.id);
  syncMakerSelectionCapacity({ syncDraftToApplied: true });
  makerIsoEmoji = "💙";
  makerDisoEmoji = "💗";
  makerCustomCodeEnabled = false;
  makerCustomLabelName = "On the way";
  makerCustomEmoji = "✨";
  makerCustomEmojiIds = [];
  makerActiveSavedLayoutId = "";
  makerLayoutName = getNextMakerLayoutName();
  makerOrderSelect.value = makerOrderMode;
  updateMakerLayoutControls();
  activeWishlistSubview = "maker";
  syncWishlistSubview();
  makerSelectionStep.hidden = false;
  makerCanvasStep.hidden = true;
  renderMakerSavedLayouts();
  renderMakerPicker();
  renderMakerCanvas();
}

function closeWishlistMaker() {
  activeWishlistSubview = "board";
  syncWishlistSubview();
  makerSelectionStep.hidden = false;
  makerCanvasStep.hidden = true;
}

function showMakerCanvas() {
  makerAppliedSelection = [...makerDraftSelection];
  applyMakerOrdering();
  syncMakerSelectionCapacity({ syncDraftFromApplied: true });
  makerSelectionStep.hidden = true;
  makerCanvasStep.hidden = false;
  renderMakerSavedLayouts();
  renderMakerBackgroundOptions();
  renderMakerArrangement();
  renderMakerCanvas();
}

function showMakerSelection() {
  makerSelectionStep.hidden = false;
  makerCanvasStep.hidden = true;
  renderMakerSavedLayouts();
  renderMakerPicker();
}

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function triggerMakerBackgroundUpload() {
  if (makerBackgroundUploadInput) {
    makerBackgroundUploadInput.value = "";
    makerBackgroundUploadInput.click();
  }
}

function applyMakerCanvasBackground() {
  if (!makerCanvas) {
    return;
  }

  makerCanvas.dataset.background = makerBackground === "custom" ? "custom" : makerBackground;

  if (makerBackground === "custom" && makerCustomBackgroundDataUrl) {
    makerCanvas.style.backgroundImage = `url("${makerCustomBackgroundDataUrl}")`;
    makerCanvas.style.backgroundSize = "cover";
    makerCanvas.style.backgroundPosition = "center";
    makerCanvas.style.backgroundRepeat = "no-repeat";
    return;
  }

  makerCanvas.style.backgroundImage = "";
  makerCanvas.style.backgroundSize = "";
  makerCanvas.style.backgroundPosition = "";
  makerCanvas.style.backgroundRepeat = "";
}

function renderMakerPicker() {
  const items = getWishlistMakerItems();
  makerPickerGrid.innerHTML = "";
  updateMakerSelectionCount();

  if (!items.length) {
    makerPickerGrid.innerHTML = '<p class="wishlist-empty">Add some ISO or DISO Sonnies first, then open the maker.</p>';
    return;
  }

  items.forEach((item) => {
    const label = document.createElement("label");
    label.className = "maker-picker-card";

    const input = document.createElement("input");
    input.className = "maker-picker-toggle";
    input.type = "checkbox";
    input.checked = makerDraftSelection.includes(item.id);

    const art = document.createElement("div");
    art.className = "maker-picker-art";
    art.setAttribute("style", buildArtworkStyle(item));

    const marker = document.createElement("span");
    marker.className = "maker-picker-marker";

    const copy = document.createElement("div");
    copy.className = "maker-picker-copy";

    const series = document.createElement("p");
    series.className = "series-name";
    series.textContent = displaySeries(item);

    const name = document.createElement("h4");
    name.className = "maker-picker-name";
    name.textContent = displayName(item);

    const statusPill = document.createElement("span");
    statusPill.className = `pill maker-picker-status pill-${getStatus(item.id)}`;
    statusPill.textContent = labelFor(getStatus(item.id));

    const selectionState = document.createElement("span");
    selectionState.className = "maker-picker-selection-state";

    function syncSelectionState() {
      const selected = input.checked;
      const canIncludeMore = selected || doesMakerSelectionFit([...makerDraftSelection, item.id]);
      label.classList.toggle("is-selected", selected);
      label.classList.toggle("is-unselected", !selected);
      label.classList.toggle("is-disabled", !selected && !canIncludeMore);
      input.disabled = !selected && !canIncludeMore;
      marker.textContent = selected ? "Selected" : "Skipped";
      selectionState.textContent = selected
        ? "Included in layout"
        : canIncludeMore
          ? "Will not be included"
          : "Page is full at this size";
    }

    copy.append(series, name, statusPill);
    label.append(input, art, marker, copy, selectionState);
    syncSelectionState();

    input.addEventListener("change", () => {
      if (input.checked) {
        const nextSelection = [...makerDraftSelection, item.id];
        if (!makerDraftSelection.includes(item.id) && doesMakerSelectionFit(nextSelection)) {
          makerDraftSelection = nextSelection;
        } else {
          input.checked = false;
        }
      } else {
        makerDraftSelection = makerDraftSelection.filter((id) => id !== item.id);
      }

      renderMakerPicker();
    });

    makerPickerGrid.append(label);
  });
}

function renderMakerBackgroundOptions() {
  makerBackgroundGrid.innerHTML = "";

  MAKER_BACKGROUNDS.forEach((background) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "maker-background-option";
    button.classList.toggle("is-selected", background.id === makerBackground);
    button.innerHTML = `
      <div class="maker-background-preview" style="background: ${background.preview}"></div>
      <div>
        <p class="maker-background-name">${background.name}</p>
      </div>
    `;
    button.addEventListener("click", () => {
      makerBackground = background.id;
      renderMakerBackgroundOptions();
      renderMakerCanvas();
    });
    makerBackgroundGrid.append(button);
  });

  const customButton = document.createElement("div");
  customButton.className = `maker-background-option maker-background-option-custom${
    makerBackground === "custom" ? " is-selected" : ""
  }`;

  if (makerCustomBackgroundDataUrl) {
    customButton.innerHTML = `
      <button class="maker-background-select" type="button">
        <div class="maker-background-preview maker-background-preview-image" style="background-image: url('${escapeAttribute(makerCustomBackgroundDataUrl)}')"></div>
        <div>
          <p class="maker-background-name">Your picture</p>
          <p class="maker-background-description">${escapeAttribute(makerCustomBackgroundName || "Custom upload")}</p>
        </div>
      </button>
      <div class="maker-background-custom-actions">
        <button class="ghost-button maker-background-action" type="button" data-action="change">Change</button>
        <button class="ghost-button maker-background-action" type="button" data-action="remove">Remove</button>
      </div>
    `;
    customButton.querySelector(".maker-background-select")?.addEventListener("click", () => {
      makerBackground = "custom";
      renderMakerBackgroundOptions();
      renderMakerCanvas();
    });
    customButton.querySelector('[data-action="change"]')?.addEventListener("click", () => {
      triggerMakerBackgroundUpload();
    });
    customButton.querySelector('[data-action="remove"]')?.addEventListener("click", () => {
      makerCustomBackgroundDataUrl = "";
      makerCustomBackgroundName = "";
      if (makerBackground === "custom") {
        makerBackground = "blush";
      }
      if (makerBackgroundUploadInput) {
        makerBackgroundUploadInput.value = "";
      }
      renderMakerBackgroundOptions();
      renderMakerCanvas();
    });
  } else {
    customButton.innerHTML = `
      <button class="maker-background-select maker-background-select-empty" type="button">
        <div class="maker-background-preview maker-background-preview-upload">
          <span>+</span>
        </div>
        <div>
          <p class="maker-background-name">Add your own</p>
          <p class="maker-background-description">Upload a photo or graphic for the layout background.</p>
        </div>
      </button>
    `;
    customButton.querySelector(".maker-background-select")?.addEventListener("click", () => {
      triggerMakerBackgroundUpload();
    });
  }

  makerBackgroundGrid.append(customButton);

  if (makerCustomBackgroundJustUploaded) {
    makerCustomBackgroundJustUploaded = false;
    customButton.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }
}

function renderMakerArrangement() {
  const itemsById = getMakerItemsById();
  const selectedItems = makerAppliedSelection
    .map((id) => itemsById.get(id))
    .filter(Boolean);

  makerArrangementList.innerHTML = "";
  makerArrangementList.classList.toggle("is-locked", makerOrderMode !== "custom");
  makerOrderNote.textContent =
    makerOrderMode === "custom"
      ? "Custom order keeps the exact lineup below. Use the arrows to move Sonnies earlier or later."
      : "Automatic ordering is on. Switch back to Custom if you want to fine-tune the exact sequence yourself.";

  if (!selectedItems.length) {
    makerArrangementList.innerHTML = '<p class="wishlist-empty">No Sonnies are selected for the layout yet.</p>';
    return;
  }

  selectedItems.forEach((item, index) => {
    const row = document.createElement("article");
    row.className = "maker-arrangement-item";

    const thumb = document.createElement("div");
    thumb.className = "maker-arrangement-thumb";
    thumb.setAttribute("style", buildArtworkStyle(item));

    const copy = document.createElement("div");
    copy.className = "maker-arrangement-copy";

    const series = document.createElement("p");
    series.className = "series-name";
    renderSeriesLabel(series, item);

    const name = document.createElement("h5");
    name.textContent = `${index + 1}. ${displayName(item)}`;

    copy.append(series, name);

    const actions = document.createElement("div");
    actions.className = "maker-arrangement-actions";

    const upButton = document.createElement("button");
    upButton.type = "button";
    upButton.className = "ghost-button maker-arrangement-button";
    upButton.textContent = "←";
    upButton.setAttribute("aria-label", `Move ${displayName(item)} earlier`);
    upButton.title = "Move earlier";
    upButton.disabled = makerOrderMode !== "custom" || index === 0;
    upButton.addEventListener("click", () => moveMakerSelection(item.id, -1));

    const downButton = document.createElement("button");
    downButton.type = "button";
    downButton.className = "ghost-button maker-arrangement-button";
    downButton.textContent = "→";
    downButton.setAttribute("aria-label", `Move ${displayName(item)} later`);
    downButton.title = "Move later";
    downButton.disabled = makerOrderMode !== "custom" || index === selectedItems.length - 1;
    downButton.addEventListener("click", () => moveMakerSelection(item.id, 1));

    actions.append(upButton, downButton);

    if (makerLabelStyle === "emoji-code" && makerCustomCodeEnabled) {
      const customToggleLabel = document.createElement("label");
      customToggleLabel.className = "maker-arrangement-custom-toggle";

      const customToggle = document.createElement("input");
      customToggle.type = "checkbox";
      customToggle.checked = makerCustomEmojiIds.includes(item.id);
      customToggle.addEventListener("change", () => {
        if (customToggle.checked) {
          if (!makerCustomEmojiIds.includes(item.id)) {
            makerCustomEmojiIds = [...makerCustomEmojiIds, item.id];
          }
        } else {
          makerCustomEmojiIds = makerCustomEmojiIds.filter((id) => id !== item.id);
        }
        renderMakerArrangement();
        renderMakerCanvas();
      });

      const customToggleText = document.createElement("span");
      customToggleText.textContent = "Custom code";

      customToggleLabel.append(customToggle, customToggleText);
      actions.append(customToggleLabel);
    }

    row.append(thumb, copy, actions);
    makerArrangementList.append(row);
  });
}

function labelForWishlistStatus(status) {
  return status === "diso" ? "DISO" : "ISO";
}

function getMakerSectionOrder(items) {
  if (makerOrderMode === "iso-first") {
    return ["iso", "diso"];
  }
  if (makerOrderMode === "wanted") {
    return ["diso", "iso"];
  }

  const seen = [];
  items.forEach((item) => {
    const status = getStatus(item.id);
    if ((status === "iso" || status === "diso") && !seen.includes(status)) {
      seen.push(status);
    }
  });

  ["iso", "diso"].forEach((status) => {
    if (!seen.includes(status)) {
      seen.push(status);
    }
  });

  return seen;
}

function renderMakerCanvas() {
  syncMakerSelectionCapacity({ syncDraftFromApplied: true });
  const itemsById = getMakerItemsById();
  const selectedItems = makerAppliedSelection
    .map((id) => itemsById.get(id))
    .filter(Boolean);
  const selectedCounts = getMakerSelectionCountsFromIds(makerAppliedSelection);
  const layoutMetrics = getMakerCanvasLayoutMetrics(selectedCounts);
  const maxCount = getMakerMaxSelectableCount(getWishlistMakerItems());

  makerCanvasCount.textContent = `${selectedItems.length} Sonny${
    selectedItems.length === 1 ? "" : "s"
  } in layout · ${maxCount} max`;
  makerCanvas.innerHTML = "";
  makerCanvas.style.setProperty("--maker-columns", String(makerColumns));
  makerCanvas.style.setProperty("--maker-canvas-width", `${makerCanvasWidthInches * 96}px`);
  makerCanvas.style.setProperty(
    "--maker-canvas-width-ratio",
    `${makerCanvasWidthInches} / ${makerCanvasHeightInches}`,
  );
  makerCanvas.style.setProperty(
    "--maker-card-height",
    `${Math.max(layoutMetrics.cardHeight, MAKER_CANVAS_MIN_CARD_HEIGHT_PX)}px`,
  );
  applyMakerCanvasBackground();
  updateMakerLayoutControls();

  if (!selectedItems.length) {
    makerCanvas.innerHTML = '<p class="wishlist-empty">Select at least one Sonny to build your layout.</p>';
    return;
  }

  if (makerLabelStyle === "emoji-code") {
    makerCanvas.classList.remove("has-status-sections");

    const legend = document.createElement("div");
    legend.className = "maker-canvas-legend";

    const disoLegend = document.createElement("div");
    disoLegend.className = "maker-canvas-legend-item";
    disoLegend.innerHTML = `<span class="maker-canvas-legend-emoji">${makerDisoEmoji.trim() || "💗"}</span><span>DISO</span>`;

    const isoLegend = document.createElement("div");
    isoLegend.className = "maker-canvas-legend-item";
    isoLegend.innerHTML = `<span class="maker-canvas-legend-emoji">${makerIsoEmoji.trim() || "💙"}</span><span>ISO</span>`;

    legend.append(disoLegend, isoLegend);

    if (makerCustomCodeEnabled) {
      const customLegend = document.createElement("div");
      customLegend.className = "maker-canvas-legend-item";
      customLegend.innerHTML = `<span class="maker-canvas-legend-emoji">${makerCustomEmoji.trim() || "✨"}</span><span>${makerCustomLabelName.trim() || "Custom"}</span>`;
      legend.append(customLegend);
    }

    makerCanvas.append(legend);

    const grid = document.createElement("div");
    grid.className = "maker-canvas-section-grid maker-canvas-emoji-grid";

    selectedItems.forEach((item) => {
      const card = document.createElement("article");
      card.className = "maker-canvas-card";

      const art = document.createElement("div");
      art.className = "maker-canvas-art";
      art.setAttribute("style", buildArtworkStyle(item));

      const badge = document.createElement("div");
      badge.className = "maker-canvas-badge";
      badge.textContent = makerBadgeEmojiForItem(item);
      badge.setAttribute("aria-label", makerBadgeLabelForItem(item));

      card.append(art, badge);
      grid.append(card);
    });

    makerCanvas.append(grid);
    return;
  }

  if (makerLabelStyle === "section-labels") {
    const sectionOrder = getMakerSectionOrder(selectedItems);
    makerCanvas.classList.add("has-status-sections");

    sectionOrder.forEach((status) => {
      const itemsInSection = selectedItems.filter((item) => getStatus(item.id) === status);
      if (!itemsInSection.length) {
        return;
      }

      const section = document.createElement("section");
      section.className = `maker-canvas-section maker-canvas-section-${status}`;

      const title = document.createElement("div");
      title.className = "maker-canvas-section-title";
      title.textContent = labelForWishlistStatus(status);

      const grid = document.createElement("div");
      grid.className = "maker-canvas-section-grid";

      itemsInSection.forEach((item) => {
        const card = document.createElement("article");
        card.className = "maker-canvas-card";

        const art = document.createElement("div");
        art.className = "maker-canvas-art";
        art.setAttribute("style", buildArtworkStyle(item));

        card.append(art);
        grid.append(card);
      });

      section.append(title, grid);
      makerCanvas.append(section);
    });
    return;
  }

  makerCanvas.classList.remove("has-status-sections");
  selectedItems.forEach((item) => {
    const card = document.createElement("article");
    card.className = "maker-canvas-card";

    const art = document.createElement("div");
    art.className = "maker-canvas-art";
    art.setAttribute("style", buildArtworkStyle(item));

    card.append(art);
    makerCanvas.append(card);
  });
}

function saveItemPatch(id, patch) {
  const current = progress[id] && typeof progress[id] === "object" ? progress[id] : {};
  progress[id] = {
    ...current,
    ...patch,
  };
  saveProgress();
}

function saveStatusChange(id, status) {
  const current = progress[id] && typeof progress[id] === "object" ? progress[id] : {};
  const nextPatch = { status };

  if (status === "have") {
    nextPatch.collectedAt = current.collectedAt || new Date().toISOString();
    nextPatch.ownedCount = getNormalizedOwnedCount(current.ownedCount) || 1;
    nextPatch.ownedDetails = getOwnedDetails(id);
  }

  if (status === "iso" || status === "diso") {
    nextPatch.wishlistAddedAt = current.wishlistAddedAt || new Date().toISOString();
  }

  progress[id] = {
    ...current,
    ...nextPatch,
  };
  saveProgress();
}

function saveOwnedCount(id, ownedCount) {
  const current = progress[id] && typeof progress[id] === "object" ? progress[id] : {};
  const currentDetails = getOwnedDetails(id);
  const nextCount = Math.max(1, ownedCount);
  const nextDetails = Array.from({ length: nextCount }, (_, index) => {
    return currentDetails[index] ? { ...currentDetails[index] } : createBlankOwnedDetail();
  });
  progress[id] = {
    ...current,
    status: "have",
    collectedAt: current.collectedAt || new Date().toISOString(),
    ownedCount: nextCount,
    ownedDetails: nextDetails,
  };
  saveProgress();
}

function saveOwnedDetailPatch(id, copyIndex, patch) {
  const current = progress[id] && typeof progress[id] === "object" ? progress[id] : {};
  const ownedDetails = getOwnedDetails(id);
  const safeIndex = Math.min(Math.max(copyIndex, 0), Math.max(ownedDetails.length - 1, 0));
  const nextDetails = ownedDetails.map((detail, index) => (
    index === safeIndex ? { ...detail, ...patch } : detail
  ));

  progress[id] = {
    ...current,
    status: "have",
    ownedCount: Math.max(1, getOwnedCount(id)),
    ownedDetails: nextDetails,
  };
  saveProgress();
}

function moveCollectedItemToStock(item, copyIndex = getActiveCollectedCopyIndex(item.id)) {
  if (!item || getStatus(item.id) !== "have") {
    return;
  }

  trackSiteEvent("move_collected_to_stock", {
    itemId: item.id,
    series: displaySeries(item),
  });

  const stockItems = loadLocalStockItems();
  const matchingStockItem = stockItems.find((stockItem) => {
    return (
      stockItem.sonnyId === item.id &&
      stockItem.status === "available" &&
      !stockItem.justTrading &&
      Number(stockItem.price || 0) === 0
    );
  });

  if (matchingStockItem) {
    matchingStockItem.quantity = Math.max(1, Number(matchingStockItem.quantity || 1) + 1);
  } else {
    stockItems.unshift({
      id: crypto.randomUUID(),
      sonnyId: item.id,
      name: getCatalogName(item),
      series: displaySeries(item),
      quantity: 1,
      status: "available",
      justTrading: false,
      price: 0,
      priceHistory: [],
      createdAt: new Date().toISOString(),
    });
  }

  saveLocalStockItems(stockItems);
  const current = progress[item.id] && typeof progress[item.id] === "object" ? progress[item.id] : {};
  const ownedDetails = getOwnedDetails(item.id);
  const safeIndex = Math.min(Math.max(copyIndex, 0), Math.max(ownedDetails.length - 1, 0));
  const nextDetails = ownedDetails.filter((_, index) => index !== safeIndex);

  progress[item.id] = nextDetails.length
    ? {
        ...current,
        status: "have",
        ownedCount: nextDetails.length,
        ownedDetails: nextDetails,
      }
    : {
        ...current,
        status: "missing",
        ownedCount: null,
        ownedDetails: [],
      };

  setActiveCollectedCopyIndex(item.id, Math.max(0, Math.min(safeIndex, nextDetails.length - 1)));

  saveProgress();
  setSaveState("saved", `${displayName(item)} was moved to your stock shelf.`);
  applyFilters();
}

function sendStockItemBackToCollectionInTracker(stockItemId) {
  const stockItems = loadLocalStockItems();
  const stockItem = stockItems.find((item) => item.id === stockItemId);
  if (!stockItem?.sonnyId || stockItem.status === "sold") {
    return;
  }

  trackSiteEvent("move_stock_to_collection", {
    itemId: stockItem.sonnyId,
    stockItemId,
    series: stockItem.series || "",
  });

  const current = progress[stockItem.sonnyId] && typeof progress[stockItem.sonnyId] === "object"
    ? progress[stockItem.sonnyId]
    : {};
  const nextOwnedCount = getOwnedCount(stockItem.sonnyId) + 1;

  progress[stockItem.sonnyId] = {
    ...current,
    status: "have",
    collectedAt: current.collectedAt || new Date().toISOString(),
    ownedCount: nextOwnedCount,
  };

  const nextStockItems = Number(stockItem.quantity || 1) > 1
    ? stockItems.map((item) => {
        if (item.id !== stockItemId) {
          return item;
        }
        return {
          ...item,
          quantity: Math.max(1, Number(item.quantity || 1) - 1),
        };
      })
    : stockItems.filter((item) => item.id !== stockItemId);

  saveLocalStockItems(nextStockItems);
  saveProgress();
  setSaveState("saved", `${stockNameForItem(stockItem)} was sent back to your collection.`);
  renderStockPanel();
  applyFilters();
}

function removeStockItemFromTracker(stockItemId) {
  const stockItems = loadLocalStockItems();
  const nextItems = stockItems.filter((item) => item.id !== stockItemId);
  saveLocalStockItems(nextItems);
  renderStockPanel();
}

function sortStockItems(items) {
  const sorted = [...items];
  sorted.sort((left, right) => {
    if (trackerStockSortValue === "oldest") {
      return new Date(left.createdAt) - new Date(right.createdAt);
    }
    if (trackerStockSortValue === "price-desc") {
      return Number(right.price || 0) - Number(left.price || 0);
    }
    if (trackerStockSortValue === "price-asc") {
      return Number(left.price || 0) - Number(right.price || 0);
    }
    if (trackerStockSortValue === "name-asc") {
      return stockNameForItem(left).localeCompare(stockNameForItem(right));
    }
    return new Date(right.createdAt) - new Date(left.createdAt);
  });
  return sorted;
}

function buildTrackerStockCard(stockItem) {
  const card = document.createElement("article");
  card.className = "tracker-stock-card";
  if (trackerStockDensityValue === "compact") {
    card.classList.add("is-compact");
  }

  const art = document.createElement("div");
  art.className = "tracker-stock-card-art";
  const artStyle = stockArtworkStyle(stockItem);
  if (artStyle) {
    art.setAttribute("style", artStyle);
  } else {
    art.classList.add("is-empty");
  }

  const body = document.createElement("div");
  body.className = "tracker-stock-card-body";

  const series = document.createElement("p");
  series.className = "series-name";
  series.textContent = stockSeriesForItem(stockItem);

  const name = document.createElement("h3");
  name.className = "wishlist-name";
  name.textContent = stockNameForItem(stockItem);

  const meta = document.createElement("p");
  meta.className = "collected-meta";
  meta.textContent = `${stockStatusLabel(stockItem.status)} • Qty ${Math.max(1, Number(stockItem.quantity || 1))}`;

  const priceEditor = buildStockPriceEditor(stockItem);
  const priceHistory = buildStockPriceHistory(stockItem);

  const actions = document.createElement("div");
  actions.className = "collected-action-row";

  const backButton = document.createElement("button");
  backButton.className = "collected-open-button collected-transfer-button";
  backButton.type = "button";
  backButton.textContent = stockItem.status === "sold" ? "Already sold" : "Back to collection";
  backButton.disabled = stockItem.status === "sold" || !stockItem.sonnyId;
  backButton.addEventListener("click", () => sendStockItemBackToCollectionInTracker(stockItem.id));

  const removeButton = document.createElement("button");
  removeButton.className = "collected-open-button";
  removeButton.type = "button";
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", () => removeStockItemFromTracker(stockItem.id));

  actions.append(backButton, removeButton);
  body.append(series, name, meta, priceEditor, priceHistory, actions);
  card.append(art, body);
  return card;
}

function buildTrackerStockShelfTile(stockItem) {
  const tile = document.createElement("article");
  tile.className = "tracker-stock-shelf-tile";

  const figure = document.createElement("div");
  figure.className = "tracker-stock-shelf-figure";

  const art = document.createElement("div");
  art.className = "tracker-stock-shelf-art";
  const artStyle = stockArtworkStyle(stockItem);
  if (artStyle) {
    art.setAttribute("style", artStyle);
  } else {
    art.classList.add("is-empty");
  }
  figure.append(art);

  const price = document.createElement("div");
  price.className = "tracker-stock-shelf-price";
  price.innerHTML = `
    <span class="tracker-stock-status-dot is-${stockItem.status}"></span>
    <span>${formatStockPrice(stockItem)}</span>
  `;

  const name = document.createElement("span");
  name.className = "tracker-stock-shelf-name";
  name.textContent = `${stockNameForItem(stockItem)}${Number(stockItem.quantity || 1) > 1 ? ` x${Math.max(1, Number(stockItem.quantity || 1))}` : ""}`;

  const priceEditor = buildStockPriceEditor(stockItem, { compact: true });
  const priceHistory = buildStockPriceHistory(stockItem, { compact: true });

  const actions = document.createElement("div");
  actions.className = "tracker-stock-shelf-actions";

  const backButton = document.createElement("button");
  backButton.className = "collected-open-button collected-transfer-button";
  backButton.type = "button";
  backButton.textContent = "Back to collection";
  backButton.disabled = stockItem.status === "sold" || !stockItem.sonnyId;
  backButton.addEventListener("click", () => sendStockItemBackToCollectionInTracker(stockItem.id));

  const removeButton = document.createElement("button");
  removeButton.className = "collected-open-button";
  removeButton.type = "button";
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", () => removeStockItemFromTracker(stockItem.id));

  actions.append(backButton, removeButton);
  tile.append(figure, price, name, priceEditor, priceHistory, actions);
  return tile;
}

function renderStockPanel() {
  if (!trackerStockGrid) {
    return;
  }

  if (trackerStockSearch) {
    trackerStockSearch.value = trackerStockSearchValue;
  }
  if (trackerStockStatusFilter) {
    trackerStockStatusFilter.value = trackerStockStatusValue;
  }
  if (trackerStockSort) {
    trackerStockSort.value = trackerStockSortValue;
  }
  if (trackerStockDisplayMode) {
    trackerStockDisplayMode.checked = trackerStockDisplayValue === "shelf";
  }
  if (trackerStockCardDensity) {
    trackerStockCardDensity.value = trackerStockDensityValue;
  }

  const search = trackerStockSearchValue.trim().toLowerCase();
  const stockItems = sortStockItems(
    loadLocalStockItems().filter((item) => {
      const name = stockNameForItem(item).toLowerCase();
      const series = stockSeriesForItem(item).toLowerCase();
      const matchesSearch = !search || name.includes(search) || series.includes(search);
      const matchesStatus = trackerStockStatusValue === "all" || item.status === trackerStockStatusValue;
      return matchesSearch && matchesStatus;
    }),
  );

  trackerStockResultsCount.textContent = `${stockItems.length} stock item${stockItems.length === 1 ? "" : "s"} showing`;
  trackerStockGrid.innerHTML = "";
  trackerStockGrid.classList.toggle("is-shelf-view", trackerStockDisplayValue === "shelf");
  trackerStockGrid.classList.toggle("is-card-view", trackerStockDisplayValue !== "shelf");
  trackerStockGrid.classList.toggle("is-compact-cards", trackerStockDensityValue === "compact");

  if (!stockItems.length) {
    trackerStockGrid.innerHTML = '<p class="wishlist-empty">No stock items yet. Send a Sonny here from your collected shelf to start stocking.</p>';
    return;
  }

  stockItems.forEach((item) => {
    trackerStockGrid.append(
      trackerStockDisplayValue === "shelf"
        ? buildTrackerStockShelfTile(item)
        : buildTrackerStockCard(item),
    );
  });
}

function compareText(left, right, direction = "asc") {
  const multiplier = direction === "desc" ? -1 : 1;
  return left.localeCompare(right) * multiplier;
}

function compareDateDesc(left, right) {
  const leftTime = left ? new Date(left).getTime() : 0;
  const rightTime = right ? new Date(right).getTime() : 0;
  const safeLeft = Number.isFinite(leftTime) ? leftTime : 0;
  const safeRight = Number.isFinite(rightTime) ? rightTime : 0;
  return safeRight - safeLeft;
}

function getCatalogSortParts(item) {
  const match = String(item?.id || "").match(/^page-(\d+)-(\d+)([a-z]?)-/i);
  if (match) {
    const override = getManualItemOverride(item);
    const suffix = (match[3] || "").toLowerCase();
    const slotOffset = suffix ? (suffix.charCodeAt(0) - 96) / 100 : 0;
    const manualSlot = Number(override.catalogSortSlot);
    return {
      page: Number(match[1]),
      slot: Number.isFinite(manualSlot) ? manualSlot : Number(match[2]) + slotOffset,
      y: Number(item?.image?.y || 0),
      x: Number(item?.image?.x || 0),
    };
  }

  return {
    page: Number(item?.page || 0),
    slot: Number.MAX_SAFE_INTEGER,
    y: Number(item?.image?.y || 0),
    x: Number(item?.image?.x || 0),
  };
}

function compareCatalogOrder(left, right) {
  const leftSeriesKey = canonicalSeriesKey(displaySeries(left));
  const rightSeriesKey = canonicalSeriesKey(displaySeries(right));
  const leftSeriesOrder = catalogSeriesOrder.get(leftSeriesKey) ?? Number.MAX_SAFE_INTEGER;
  const rightSeriesOrder = catalogSeriesOrder.get(rightSeriesKey) ?? Number.MAX_SAFE_INTEGER;
  const seriesDiff = leftSeriesOrder - rightSeriesOrder;
  if (seriesDiff) {
    return seriesDiff;
  }

  const leftItemOrder = catalogItemOrder.get(left?.id) ?? Number.MAX_SAFE_INTEGER;
  const rightItemOrder = catalogItemOrder.get(right?.id) ?? Number.MAX_SAFE_INTEGER;
  const itemDiff = leftItemOrder - rightItemOrder;
  if (itemDiff) {
    return itemDiff;
  }

  const leftParts = getCatalogSortParts(left);
  const rightParts = getCatalogSortParts(right);

  return (
    (leftParts.page - rightParts.page) ||
    (leftParts.slot - rightParts.slot) ||
    (leftParts.y - rightParts.y) ||
    (leftParts.x - rightParts.x)
  );
}

function sortItems(items, mode) {
  const sorted = [...items];

  sorted.sort((left, right) => {
    if (mode === "rank-asc" || mode === "rank-desc") {
      const leftRank = getWishlistRank(left.id);
      const rightRank = getWishlistRank(right.id);
      const leftValue = leftRank == null ? Number.MAX_SAFE_INTEGER : leftRank;
      const rightValue = rightRank == null ? Number.MAX_SAFE_INTEGER : rightRank;
      const diff = mode === "rank-desc" ? rightValue - leftValue : leftValue - rightValue;
      return diff || compareText(displaySeries(left), displaySeries(right)) || compareCatalogOrder(left, right) || compareText(displayName(left), displayName(right));
    }

    if (mode === "date-desc" || mode === "date-asc") {
      const leftDate = getCollectedAt(left.id) ? Date.parse(getCollectedAt(left.id)) : 0;
      const rightDate = getCollectedAt(right.id) ? Date.parse(getCollectedAt(right.id)) : 0;
      const diff = mode === "date-desc" ? rightDate - leftDate : leftDate - rightDate;
      return diff || compareText(displaySeries(left), displaySeries(right)) || compareCatalogOrder(left, right) || compareText(displayName(left), displayName(right));
    }

    if (mode === "wishlist-date-desc" || mode === "wishlist-date-asc") {
      const leftDate = getWishlistAddedAt(left.id) ? Date.parse(getWishlistAddedAt(left.id)) : 0;
      const rightDate = getWishlistAddedAt(right.id) ? Date.parse(getWishlistAddedAt(right.id)) : 0;
      const diff = mode === "wishlist-date-desc" ? rightDate - leftDate : leftDate - rightDate;
      return diff || compareText(displaySeries(left), displaySeries(right)) || compareCatalogOrder(left, right) || compareText(displayName(left), displayName(right));
    }

    if (mode === "name-asc" || mode === "name-desc") {
      return compareText(displayName(left), displayName(right), mode.endsWith("desc") ? "desc" : "asc");
    }

    if (mode === "series-asc" || mode === "series-desc") {
      const seriesComparison = compareSeriesLabels(
        displaySeries(left),
        displaySeries(right),
        mode.endsWith("desc") ? "desc" : "asc",
      );
      return seriesComparison || compareCatalogOrder(left, right) || compareText(displayName(left), displayName(right));
    }

    if (mode === "status") {
      const rankDiff = STATUS_RANK[getStatus(left.id)] - STATUS_RANK[getStatus(right.id)];
      return rankDiff || compareText(displaySeries(left), displaySeries(right)) || compareCatalogOrder(left, right) || compareText(displayName(left), displayName(right));
    }

    if (mode === "wanted") {
      const wantedRank = (item) => {
        const status = getStatus(item.id);
        if (status === "diso") {
          return 0;
        }
        if (status === "iso") {
          return 1;
        }
        if (status === "missing") {
          return 2;
        }
        return 3;
      };
      const rankDiff = wantedRank(left) - wantedRank(right);
      return rankDiff || compareText(displaySeries(left), displaySeries(right)) || compareCatalogOrder(left, right) || compareText(displayName(left), displayName(right));
    }

    if (mode === "notes") {
      const leftHasNotes = getNotes(left.id).trim() ? 0 : 1;
      const rightHasNotes = getNotes(right.id).trim() ? 0 : 1;
      const noteDiff = leftHasNotes - rightHasNotes;
      return noteDiff || compareText(displaySeries(left), displaySeries(right)) || compareCatalogOrder(left, right) || compareText(displayName(left), displayName(right));
    }

    return compareCatalogOrder(left, right) || compareText(displayName(left), displayName(right));
  });

  return sorted;
}

function buildSeriesSummaries(items) {
  const bySeries = new Map();

  items.forEach((item) => {
    const series = displaySeries(item);
    const current = bySeries.get(series) || {
      series,
      items: [],
      total: 0,
      have: 0,
      missing: 0,
      iso: 0,
      diso: 0,
      secrets: 0,
      robbys: 0,
      collectionTypes: new Set(),
    };
    const status = getStatus(item.id);
    current.items.push(item);
    current.total += 1;
    current[status] += 1;
    current.collectionTypes.add(getCollectionType(item));
    if (getBadges(item).includes("S")) {
      current.secrets += 1;
    }
    if (getBadges(item).includes("R")) {
      current.robbys += 1;
    }
    bySeries.set(series, current);
  });

  return [...bySeries.values()]
    .map((summary) => ({
      ...summary,
      wanted: summary.iso + summary.diso,
      completion: summary.total ? Math.round((summary.have / summary.total) * 100) : 0,
      remaining: summary.total - summary.have,
      collectionType:
        summary.collectionTypes.size === 1
          ? [...summary.collectionTypes][0]
          : "Mixed",
    }))
    .sort((left, right) => {
      const completionDiff = right.completion - left.completion;
      return completionDiff || compareSeriesLabels(left.series, right.series);
    });
}

function buildTypeCoverage(items) {
  const coverage = new Map();

  items.forEach((item) => {
    const type = getCollectionType(item);
    const current = coverage.get(type) || { type, total: 0, have: 0 };
    current.total += 1;
    if (getStatus(item.id) === "have") {
      current.have += 1;
    }
    coverage.set(type, current);
  });

  return [...coverage.values()]
    .map((entry) => ({
      ...entry,
      completion: entry.total ? Math.round((entry.have / entry.total) * 100) : 0,
    }))
    .sort((left, right) => compareSeriesLabels(left.type, right.type));
}

function sortSeriesSummaries(summaries, mode) {
  const sorted = [...summaries];

  const guidebookSortValueForItem = (item) => {
    const idMatch = String(item?.id || "").match(/^page-(\d+)-/i);
    const pageValue = idMatch ? Number.parseInt(idMatch[1], 10) : Number.POSITIVE_INFINITY;
    const yValue = Number.parseInt(String(item?.image?.y || ""), 10);
    const xValue = Number.parseInt(String(item?.image?.x || ""), 10);

    return {
      page: Number.isFinite(pageValue) ? pageValue : Number.POSITIVE_INFINITY,
      y: Number.isFinite(yValue) ? yValue : Number.POSITIVE_INFINITY,
      x: Number.isFinite(xValue) ? xValue : Number.POSITIVE_INFINITY,
    };
  };

  const guidebookSortValueForSummary = (summary) => {
    return summary.items.reduce((best, item) => {
      const current = guidebookSortValueForItem(item);
      if (
        current.page < best.page ||
        (current.page === best.page && current.y < best.y) ||
        (current.page === best.page && current.y === best.y && current.x < best.x)
      ) {
        return current;
      }
      return best;
    }, {
      page: Number.POSITIVE_INFINITY,
      y: Number.POSITIVE_INFINITY,
      x: Number.POSITIVE_INFINITY,
    });
  };

  sorted.sort((left, right) => {
    if (mode === "guidebook-20th") {
      const leftGuidebook = guidebookSortValueForSummary(left);
      const rightGuidebook = guidebookSortValueForSummary(right);

      if (leftGuidebook.page !== rightGuidebook.page) {
        return leftGuidebook.page - rightGuidebook.page;
      }
      if (leftGuidebook.y !== rightGuidebook.y) {
        return leftGuidebook.y - rightGuidebook.y;
      }
      if (leftGuidebook.x !== rightGuidebook.x) {
        return leftGuidebook.x - rightGuidebook.x;
      }
      return compareSeriesLabels(left.series, right.series);
    }

    if (mode === "name-asc" || mode === "name-desc") {
      return compareSeriesLabels(left.series, right.series, mode === "name-desc" ? "desc" : "asc");
    }

    if (mode === "completion-asc" || mode === "completion-desc") {
      const diff =
        mode === "completion-asc"
          ? left.completion - right.completion
          : right.completion - left.completion;
      return diff || compareSeriesLabels(left.series, right.series);
    }

    if (mode === "closest") {
      const leftIsActive = left.have > 0 && left.have < left.total ? 0 : 1;
      const rightIsActive = right.have > 0 && right.have < right.total ? 0 : 1;
      const activeDiff = leftIsActive - rightIsActive;
      if (activeDiff) {
        return activeDiff;
      }

      const completionDiff = right.completion - left.completion;
      if (completionDiff) {
        return completionDiff;
      }

      const remainingDiff = left.remaining - right.remaining;
      return remainingDiff || compareSeriesLabels(left.series, right.series);
    }

    if (mode === "wanted-desc") {
      const wantedDiff = right.wanted - left.wanted;
      if (wantedDiff) {
        return wantedDiff;
      }

      const completionDiff = right.completion - left.completion;
      return completionDiff || compareSeriesLabels(left.series, right.series);
    }

    const defaultDiff = right.completion - left.completion;
    return defaultDiff || compareSeriesLabels(left.series, right.series);
  });

  return sorted;
}

function filterInsightsSeriesSummaries(summaries) {
  if (insightsPinnedSeries) {
    return summaries.filter((summary) => summary.series === insightsPinnedSeries);
  }

  const mode = insightsSeriesFilter?.value || "all";
  if (mode === "all") {
    return summaries;
  }

  return summaries.filter((summary) => {
    if (mode === "regular") {
      return summary.collectionType === "Regular";
    }
    if (mode === "limited") {
      return summary.collectionType === "Limited";
    }
    if (mode === "artist") {
      return summary.collectionType === "Artist Series";
    }
    if (mode === "other") {
      return !["Regular", "Limited", "Artist Series"].includes(summary.collectionType);
    }
    if (mode === "completed") {
      return summary.total > 0 && summary.have === summary.total;
    }
    if (mode === "in-progress") {
      return summary.have > 0 && summary.have < summary.total;
    }
    if (mode === "none-owned") {
      return summary.have === 0;
    }
    if (mode === "wanted") {
      return summary.wanted > 0;
    }
    return true;
  });
}

function jumpToInsightsCollections(options = {}) {
  const { filter = "all", series = "" } = options;
  insightsPinnedSeries = series || "";
  if (insightsSeriesFilter) {
    insightsSeriesFilter.value = series ? "all" : filter;
  }

  switchView("insights");
  renderSeriesBrowser(getVisibleTrackerItems(sonnies));

  requestAnimationFrame(() => {
    const browserSection = document.querySelector(".series-browser");
    browserSection?.scrollIntoView({ behavior: "smooth", block: "start" });

    if (!series) {
      return;
    }

    const seriesKey = canonicalSeriesKey(series);
    const cards = [...seriesProgressGrid.querySelectorAll(".series-progress-card")];
    const match = cards.find((card) => card.dataset.seriesKey === seriesKey);
    if (!match) {
      return;
    }

    match.classList.add("is-jump-highlight");
    match.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => {
      match.classList.remove("is-jump-highlight");
    }, 1800);
  });
}

function resetInsightsSeriesBrowser() {
  insightsPinnedSeries = "";
  if (insightsSeriesFilter) {
    insightsSeriesFilter.value = "all";
  }
  renderSeriesBrowser(getVisibleTrackerItems(sonnies));

  requestAnimationFrame(() => {
    const insightsBoard = document.querySelector(".insights-board");
    insightsBoard?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function isInsightListExpanded(key) {
  return expandedInsightLists.has(key);
}

function toggleInsightList(key) {
  if (expandedInsightLists.has(key)) {
    expandedInsightLists.delete(key);
  } else {
    expandedInsightLists.add(key);
  }
  renderInsights(getVisibleTrackerItems(sonnies));
}

function renderInsights(items) {
  const seriesSummaries = buildSeriesSummaries(items);
  const typeCoverage = buildTypeCoverage(items);
  const totalSeries = seriesSummaries.length;
  const completedSeries = seriesSummaries.filter((summary) => summary.total && summary.have === summary.total);
  const inProgressSeries = seriesSummaries.filter(
    (summary) => summary.have > 0 && summary.have < summary.total,
  );
  const secretOwned = items.filter(
    (item) => getStatus(item.id) === "have" && getBadges(item).includes("S"),
  ).length;
  const robbyOwned = items.filter(
    (item) => getStatus(item.id) === "have" && getBadges(item).includes("R"),
  ).length;
  const closestSeries = [...seriesSummaries]
    .filter((summary) => summary.have > 0 && summary.have < summary.total)
    .sort((left, right) => right.completion - left.completion || left.remaining - right.remaining)[0];
  const mostWantedSeries = [...seriesSummaries]
    .filter((summary) => summary.wanted > 0)
    .sort((left, right) => right.wanted - left.wanted || compareSeriesLabels(left.series, right.series))[0];
  const regularCoverage = typeCoverage.find((entry) => entry.type === "Regular");
  const limitedCoverage = typeCoverage.find((entry) => entry.type === "Limited");
  const artistCoverage = typeCoverage.find((entry) => entry.type === "Artist Series");
  const collaborationCoverage = typeCoverage.find((entry) => entry.type === "Collaboration");
  const otherCoverage = typeCoverage.find((entry) => entry.type === "Other");
  const totalSpecials = items.filter((item) => getBadges(item).length > 0).length;

  const cards = [
    {
      label: "Regulars collected",
      value: regularCoverage ? `${regularCoverage.completion}%` : "0%",
      detail: regularCoverage
        ? `${regularCoverage.have}/${regularCoverage.total} regular Sonnies collected.`
        : "No regular catalog items found yet.",
      progress: regularCoverage?.completion || 0,
      progressLabel: regularCoverage
        ? `${regularCoverage.have} of ${regularCoverage.total}`
        : "0 of 0",
      featured: true,
      ctaLabel: "Go to collections",
      ctaTarget: { filter: "regular" },
    },
    {
      label: "Limiteds collected",
      value: limitedCoverage ? `${limitedCoverage.completion}%` : "0%",
      detail: limitedCoverage
        ? `${limitedCoverage.have}/${limitedCoverage.total} limited Sonnies collected.`
        : "No limited catalog items found yet.",
      progress: limitedCoverage?.completion || 0,
      progressLabel: limitedCoverage
        ? `${limitedCoverage.have} of ${limitedCoverage.total}`
        : "0 of 0",
      featured: true,
      tall: true,
      ctaLabel: "Go to collections",
      ctaTarget: { filter: "limited" },
    },
    {
      label: "All Sonnies",
      value: `${regularCoverage?.completion || 0}% / ${limitedCoverage?.completion || 0}% / ${artistCoverage?.completion || 0}% / ${otherCoverage?.completion || 0}% / 0%`,
      detail: `${regularCoverage?.have || 0}/${regularCoverage?.total || 0} regular, ${limitedCoverage?.have || 0}/${limitedCoverage?.total || 0} limited, ${artistCoverage?.have || 0}/${artistCoverage?.total || 0} artist, ${otherCoverage?.have || 0}/${otherCoverage?.total || 0} other, and 0/0 non-figures collected.`,
      splitProgress: [
        {
          label: "Regular",
          progress: regularCoverage?.completion || 0,
        },
        {
          label: "Limited",
          progress: limitedCoverage?.completion || 0,
        },
        {
          label: "Artist",
          progress: artistCoverage?.completion || 0,
        },
        {
          label: "Other",
          progress: otherCoverage?.completion || 0,
        },
        {
          label: "Non-figures",
          progress: 0,
        },
      ],
      tall: true,
      ctaLabel: "Go to collections",
      ctaTarget: { filter: "all" },
    },
    {
      label: "Completed series",
      value: String(completedSeries.length),
      detail: "Sets where you own every Sonny in that series.",
      progress: totalSeries ? Math.round((completedSeries.length / totalSeries) * 100) : 0,
      progressLabel: `${completedSeries.length} of ${totalSeries} sets`,
      listKey: "completed-series",
      seriesList: [...completedSeries].sort((left, right) => compareSeriesLabels(left.series, right.series)),
      ctaLabel: "Go to collections",
      ctaTarget: { filter: "completed" },
    },
    {
      label: "Series in progress",
      value: String(inProgressSeries.length),
      detail: "Sets where you have at least one but still have gaps.",
      progress: totalSeries ? Math.round((inProgressSeries.length / totalSeries) * 100) : 0,
      progressLabel: `${inProgressSeries.length} active sets`,
      listKey: "in-progress-series",
      seriesList: [...inProgressSeries].sort((left, right) => compareSeriesLabels(left.series, right.series)),
      ctaLabel: "Go to collections",
      ctaTarget: { filter: "in-progress" },
    },
    {
      label: "Secrets + Robbys",
      value: `${secretOwned} / ${robbyOwned}`,
      detail: "Owned specials, shown as secrets first and Robbys second.",
      progress: totalSpecials ? Math.round((((secretOwned + robbyOwned) / totalSpecials) * 100)) : 0,
      progressLabel: `${secretOwned + robbyOwned} of ${totalSpecials} specials`,
      ctaLabel: "Go to collections",
      ctaTarget: { filter: "specials" },
    },
    {
      label: "Closest to complete",
      value: closestSeries ? `${closestSeries.series} (${closestSeries.completion}%)` : "Nothing started yet",
      detail: closestSeries
        ? `${closestSeries.remaining} left to finish this set.`
        : "Mark a few Sonnies as collected to surface your nearest finish.",
      progress: closestSeries?.completion || 0,
      progressLabel: closestSeries
        ? `${closestSeries.have} of ${closestSeries.total}`
        : "0 of 0",
      ctaLabel: "Go to collection",
      ctaTarget: closestSeries ? { series: closestSeries.series } : null,
    },
    {
      label: "Most wanted series",
      value: mostWantedSeries ? `${mostWantedSeries.series} (${mostWantedSeries.wanted})` : "No active wants",
      detail: mostWantedSeries
        ? `${mostWantedSeries.iso} ISO and ${mostWantedSeries.diso} DISO in this set.`
        : "Your ISO and DISO picks will surface here.",
      progress: mostWantedSeries?.total
        ? Math.round((mostWantedSeries.wanted / mostWantedSeries.total) * 100)
        : 0,
      progressLabel: mostWantedSeries
        ? `${mostWantedSeries.wanted} wanted in set`
        : "0 wanted",
      ctaLabel: "Go to collection",
      ctaTarget: mostWantedSeries ? { series: mostWantedSeries.series } : null,
    },
  ];

  insightGrid.innerHTML = "";
  cards.forEach((cardData) => {
    const card = document.createElement("article");
    card.className = "insight-card";
    if (cardData.featured) {
      card.classList.add("insight-card-featured");
    }
    if (cardData.tall) {
      card.classList.add("insight-card-tall");
    }
    const listProgressMarkup = cardData.seriesList
      ? (() => {
          const expanded = isInsightListExpanded(cardData.listKey);
          const visibleSeries = expanded ? cardData.seriesList : cardData.seriesList.slice(0, 2);
          const toggleLabel = expanded ? "Collapse" : "Expand";
          const shouldShowToggle = cardData.seriesList.length > 2;
          return `
            <div class="insight-progress-split insight-series-list">
              <div class="insight-series-list-header">
                <span>Collections</span>
                ${shouldShowToggle ? `<button class="insight-inline-toggle" data-insight-list-toggle="${cardData.listKey}" type="button">${toggleLabel}</button>` : ""}
              </div>
              ${visibleSeries
                .map(
                  (entry) => `
                    <div class="insight-progress-lane">
                      <div class="insight-progress-row">
                        <span>${entry.series}</span>
                        <strong>${entry.completion}%</strong>
                      </div>
                      <div class="insight-progress-bar">
                        <span style="width: ${entry.completion}%"></span>
                      </div>
                    </div>
                  `,
                )
                .join("")}
            </div>
          `;
        })()
      : null;
    const splitProgressMarkup = listProgressMarkup || (cardData.splitProgress
      ? `
        <div class="insight-progress-split">
          ${cardData.splitProgress
            .map(
              (entry) => `
                <div class="insight-progress-lane">
                  <div class="insight-progress-row">
                    <span>${entry.label}</span>
                    <strong>${entry.progress}%</strong>
                  </div>
                  <div class="insight-progress-bar">
                    <span style="width: ${entry.progress}%"></span>
                  </div>
                </div>
              `,
            )
            .join("")}
        </div>
      `
      : `
        <div class="insight-progress">
          <div class="insight-progress-row">
            <span>Progress</span>
            <strong>${cardData.progress}%</strong>
          </div>
          <div class="insight-progress-bar">
            <span style="width: ${cardData.progress}%"></span>
          </div>
          <p class="insight-progress-label">${cardData.progressLabel}</p>
        </div>
      `);
    card.innerHTML = `
      <span>${cardData.label}</span>
      <strong>${cardData.value}</strong>
      <p>${cardData.detail}</p>
      ${splitProgressMarkup}
    `;
    const listToggle = card.querySelector("[data-insight-list-toggle]");
    listToggle?.addEventListener("click", () => {
      toggleInsightList(listToggle.dataset.insightListToggle);
    });
    if (cardData.ctaTarget) {
      const button = document.createElement("button");
      button.className = "insight-jump-button";
      button.type = "button";
      button.textContent = cardData.ctaLabel || "Go to collections";
      button.addEventListener("click", () => {
        jumpToInsightsCollections(cardData.ctaTarget);
      });
      card.append(button);
    }
    insightGrid.append(card);
  });
}

function focusSeries(series) {
  seriesFilter.value = series;
  switchView("tracker");
  applyFilters();
  window.requestAnimationFrame(() => {
    const trackerMeta = document.querySelector('[data-panel="tracker"] .shelf-meta');
    const target = trackerMeta || grid;
    if (!target) {
      return;
    }

    const header = document.querySelector(".app-header");
    const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
    const rect = target.getBoundingClientRect();
    const absoluteTop = rect.top + window.scrollY;
    const topPadding = 14;
    const targetTop = Math.max(0, absoluteTop - headerBottom - topPadding);
    window.scrollTo({ top: targetTop, behavior: "smooth" });
  });
}

function clearSeriesFocus() {
  seriesFilter.value = "all";
  applyFilters();
}

function renderSeriesBrowser(items) {
  const activeSeries = seriesFilter.value;
  const summaries = filterInsightsSeriesSummaries(
    sortSeriesSummaries(
      buildSeriesSummaries(items),
      insightsSeriesSort?.value || "completion-desc",
    ),
  );

  seriesProgressGrid.innerHTML = "";
  seriesProgressGrid.classList.toggle("is-color-code-mode", Boolean(settings.insightsColorCodeMode));
  if (insightsColorCodeModeToggle) {
    insightsColorCodeModeToggle.checked = !Boolean(settings.insightsColorCodeMode);
  }

  if (!summaries.length) {
    seriesProgressGrid.innerHTML = '<p class="wishlist-empty">No collections match this view yet.</p>';
    return;
  }

  summaries.forEach((summary) => {
    const card = document.createElement("article");
    card.className = "series-progress-card";
    card.dataset.seriesKey = canonicalSeriesKey(summary.series);
    if (summary.series === activeSeries) {
      card.classList.add("is-active");
    }
    if (summary.series === insightsPinnedSeries) {
      card.classList.add("is-jump-highlight");
    }
    const seriesItems = items.filter((item) => displaySeries(item) === summary.series);
    if (seriesItems.some((item) => isUnrefinedRegular(item))) {
      card.classList.add("is-unrefined");
    }

    const actionLabel = summary.series === activeSeries ? "Clear filter" : "View series";
    const statsLabel = `${summary.have}/${summary.total} collected • ${summary.completion}% complete`;
    card.innerHTML = `
      <div class="series-progress-copy">
        <p class="series-progress-name">${summary.series}</p>
        <p class="series-progress-meta">${statsLabel}</p>
      </div>
      <div class="series-preview-strip"></div>
      <div class="series-progress-bar">
        <span style="width: ${summary.completion}%"></span>
      </div>
      <div class="series-progress-stats">
        <span>Missing ${summary.missing}</span>
        <span>ISO ${summary.iso}</span>
        <span>DISO ${summary.diso}</span>
      </div>
      <button class="series-focus-button" type="button">${actionLabel}</button>
    `;

    const previewStrip = card.querySelector(".series-preview-strip");
    seriesItems
      .forEach((item) => {
        const previewItem = document.createElement("div");
        previewItem.className = "series-preview-item";
        if (getStatus(item.id) === "have") {
          previewItem.classList.add("is-owned");
        }

        const previewArt = document.createElement("div");
        previewArt.className = "series-preview-art";
        previewArt.setAttribute("style", buildArtworkStyle(item));

        previewItem.append(previewArt);
        previewStrip.append(previewItem);
      });

    const button = card.querySelector(".series-focus-button");
    button.addEventListener("click", () => {
      if (summary.series === activeSeries) {
        clearSeriesFocus();
        return;
      }
      focusSeries(summary.series);
    });

    seriesProgressGrid.append(card);
  });
}

function renderCollected(items) {
  const search = collectedSearch.value.trim().toLowerCase();
  const wantedSeries = collectedSeriesSelection;
  const viewMode = collectedViewFilter.value;
  const sortMode = collectedSortFilter.value;
  const armiesViewMode = settings.collectedArmiesView || "overview";
  const shelfDensity = settings.collectedShelfDensity || "4";
  const armyThreshold = Math.max(2, Number(settings.collectedArmyThreshold || "2"));
  const showMultipleSeparate = Boolean(settings.collectedShowMultipleSeparate);
  const useCollectedMobileModal = shouldUseCollectedMobileDetailModal();
  const collected = items.filter((item) => getStatus(item.id) === "have");
  const filtered = collected.filter((item) => {
    const matchesSearch = !search || getCollectedSearchText(item).includes(search);
    const matchesSeries =
      !wantedSeries.length ||
      wantedSeries.some((series) => canonicalSeriesKey(series) === canonicalSeriesKey(displaySeries(item)));
    return matchesSearch && matchesSeries;
  });
  const sorted = sortItems(filtered, sortMode);
  const shelfSorted = [...filtered].sort((left, right) => {
    return (
      compareCatalogOrder(left, right) ||
      compareSeriesLabels(displaySeries(left), displaySeries(right)) ||
      compareText(displayName(left), displayName(right))
    );
  });
  renderCollectedSummary(collected);

  if (collectedShelfDensityField) {
    collectedShelfDensityField.hidden = !(viewMode === "compact" || viewMode === "shelf-series" || viewMode === "minimalist" || viewMode === "armies");
  }
  if (collectedArmiesViewField) {
    collectedArmiesViewField.hidden = viewMode !== "armies";
  }
  if (collectedArmyThresholdField) {
    collectedArmyThresholdField.hidden = viewMode !== "armies";
  }
  if (collectedShelfDensity) {
    collectedShelfDensity.value = shelfDensity;
  }
  if (collectedArmyThreshold) {
    collectedArmyThreshold.value = String(armyThreshold);
  }
  if (collectedArmiesView) {
    collectedArmiesView.value = armiesViewMode;
  }
  if (collectedShowMultipleSeparateField) {
    collectedShowMultipleSeparateField.hidden = viewMode === "armies";
  }
  if (collectedShowMultipleSeparateToggle) {
    collectedShowMultipleSeparateToggle.checked = showMultipleSeparate;
  }

  const buildCollectedEntries = (sourceItems) => sourceItems.flatMap((item) => {
    if (!showMultipleSeparate) {
      const copyIndex = getActiveCollectedCopyIndex(item.id);
      return [{ item, copyIndex, key: item.id }];
    }

    return getOwnedDetails(item.id).map((_, copyIndex) => ({
      item,
      copyIndex,
      key: `${item.id}::${copyIndex}`,
    }));
  });

  const sortedEntries = buildCollectedEntries(sorted);
  const shelfEntries = buildCollectedEntries(shelfSorted);
  const armyItems = shelfSorted
    .filter((item) => getOwnedDetails(item.id).length >= armyThreshold)
    .sort((left, right) => {
      if (sortMode === "army-size-desc" || sortMode === "army-size-asc") {
        const leftCount = getOwnedDetails(left.id).length;
        const rightCount = getOwnedDetails(right.id).length;
        const diff = sortMode === "army-size-desc" ? rightCount - leftCount : leftCount - rightCount;
        if (diff !== 0) {
          return diff;
        }
      }

      return (
        compareCatalogOrder(left, right) ||
        compareSeriesLabels(displaySeries(left), displaySeries(right)) ||
        compareText(displayName(left), displayName(right))
      );
    });
  if (viewMode === "armies") {
    collectedResultsCount.textContent = `${armyItems.length} arm${armyItems.length === 1 ? "y" : "ies"} showing`;
  } else {
    collectedResultsCount.textContent = `${sortedEntries.length} collected Sonny${
      sortedEntries.length === 1 ? "" : "s"
    } showing`;
  }
  collectedGrid.innerHTML = "";

  if (
    (viewMode === "armies" && !armyItems.length) ||
    (viewMode !== "armies" && !sortedEntries.length)
  ) {
    collectedGrid.innerHTML =
      (viewMode === "armies")
        ? `<p class="wishlist-empty">No armies yet at the ${armyThreshold}+ threshold.</p>`
        : '<p class="wishlist-empty">No collected Sonnies match this view yet.</p>';
    return;
  }

  if (expandedCollectedId && !filtered.some((item) => item.id === expandedCollectedId)) {
    expandedCollectedId = null;
  }
  if (showMultipleSeparate && expandedCollectedKey && !sortedEntries.some((entry) => entry.key === expandedCollectedKey)) {
    expandedCollectedKey = null;
  }
  if (!showMultipleSeparate) {
    expandedCollectedKey = null;
  }
  if (useCollectedMobileModal) {
    expandedCollectedId = null;
    expandedCollectedKey = null;
    pendingCollectedCenterKey = null;
  }

  collectedGrid.classList.toggle("is-shelf-view", viewMode === "shelf-series" || (viewMode === "armies" && armiesViewMode === "shelf"));
  collectedGrid.classList.toggle("is-minimal-view", viewMode === "minimalist");
  collectedGrid.classList.toggle("is-army-overview", viewMode === "armies" && armiesViewMode === "overview");
  collectedGrid.classList.toggle("is-compact-view", viewMode === "compact");
  collectedGrid.style.setProperty("--collected-shelf-columns", shelfDensity);

  if (viewMode === "shelf-series") {
    renderCollectedShelfBySeries(shelfEntries);
    centerPendingCollectedBubble();
    return;
  }

  if (viewMode === "minimalist") {
    renderCollectedMinimalist(shelfEntries);
    centerPendingCollectedBubble();
    return;
  }

  if (viewMode === "armies") {
    if (armiesViewMode === "shelf") {
      renderCollectedArmiesShelf(armyItems, armyThreshold);
    } else {
      renderCollectedArmies(armyItems, armyThreshold);
    }
    centerPendingCollectedBubble();
    return;
  }

  renderCollectedCompact(sortedEntries);
  centerPendingCollectedBubble();
}

function buildCollectedDateLabel(item, copyIndex = null) {
  const collectedAt = copyIndex == null ? getCollectedAt(item.id) : (getOwnedDetail(item.id, copyIndex).collectedAt || "");
  if (!collectedAt) {
    return "Collected earlier";
  }

  const parsed = new Date(collectedAt);
  if (Number.isNaN(parsed.getTime())) {
    return "Collected earlier";
  }

  return `Collected ${parsed.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })}`;
}

function renderCollectedSummary(items) {
  if (!collectedSummary) {
    return;
  }

  const collectedCount = items.reduce((sum, item) => sum + getOwnedCount(item.id), 0);
  const seriesCount = new Set(items.map((item) => displaySeries(item))).size;
  const notesCount = items.filter((item) => getNotes(item.id).trim()).length;
  const newestDatedItem = [...items]
    .filter((item) => getCollectedAt(item.id))
    .sort((left, right) => new Date(getCollectedAt(right.id)) - new Date(getCollectedAt(left.id)))[0];

  const recentLabel = newestDatedItem
    ? buildCollectedDateLabel(newestDatedItem).replace(/^Collected\s+/i, "")
    : "Earlier adds";

  const cards = [
    {
      label: "On your shelf",
      value: collectedCount,
      detail: collectedCount === 1 ? "One little Sonny at home." : "Sonnies marked as collected.",
    },
    {
      label: "Series represented",
      value: seriesCount,
      detail: seriesCount === 1 ? "All from one series." : "Different sets in your display.",
    },
    {
      label: "Latest add",
      value: recentLabel,
      detail: newestDatedItem ? displayName(newestDatedItem) : "Older saved collection",
    },
    {
      label: "Notes kept",
      value: notesCount,
      detail: notesCount ? "Sonnies with memories or trade notes." : "No notes added yet.",
    },
  ];

  collectedSummary.innerHTML = "";
  cards.forEach((cardData, index) => {
    const card = document.createElement("article");
    card.className = "collected-summary-card";
    if (index === 0) {
      card.classList.add("is-highlight");
    }
    card.innerHTML = `
      <span>${cardData.label}</span>
      <strong>${cardData.value}</strong>
      <p>${cardData.detail}</p>
    `;
    collectedSummary.append(card);
  });
}

function buildCollectedNotes(item, copyIndex = getActiveCollectedCopyIndex(item.id)) {
  const wrapper = document.createElement("label");
  wrapper.className = "collected-notes";

  const title = document.createElement("span");
  title.textContent = "Notes";

  const input = document.createElement("textarea");
  input.className = "notes-input";
  input.rows = 4;
  input.value = getOwnedDetail(item.id, copyIndex).notes || "";
  input.placeholder = "Add trade notes, where you got it, condition, display ideas...";
  input.addEventListener("input", () => {
    saveOwnedDetailPatch(item.id, copyIndex, { notes: input.value });
    if (collectedSortFilter.value === "notes") {
      renderCollected(sonnies);
    }
  });

  wrapper.append(title, input);
  return wrapper;
}

function buildCollectedTransferButton(item, copyIndex = getActiveCollectedCopyIndex(item.id)) {
  const button = document.createElement("button");
  button.className = "collected-open-button collected-transfer-button";
  button.type = "button";
  button.textContent = "Send to UFS / UFT";
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    moveCollectedItemToStock(item, copyIndex);
  });
  return button;
}

function buildCollectedOpenDetailsButton(item, copyIndex = getActiveCollectedCopyIndex(item.id)) {
  const button = document.createElement("button");
  button.className = "collected-open-button";
  button.type = "button";
  button.textContent = "Open details";
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    openCollectedDetailModal(item, copyIndex);
  });
  return button;
}

function buildCollectedRequestImageButton(item) {
  const button = document.createElement("button");
  button.className = "collected-open-button collected-request-button";
  button.type = "button";
  button.textContent = "Request Sonny picture";
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    openImageRequestPanel(item);
  });
  return button;
}

function buildCollectedCountBadge(item) {
  const ownedCount = getOwnedCount(item.id);
  if (settings.collectedShowMultipleSeparate || ownedCount <= 1) {
    return null;
  }

  const badge = document.createElement("span");
  badge.className = "collected-copy-count-badge";
  badge.textContent = String(ownedCount);
  return badge;
}

function buildCollectedCopyNavigator(item) {
  const ownedCount = getOwnedCount(item.id);
  if (settings.collectedShowMultipleSeparate || ownedCount <= 1) {
    return null;
  }

  const currentIndex = getActiveCollectedCopyIndex(item.id);
  const nav = document.createElement("div");
  nav.className = "collected-copy-nav";

  const prev = document.createElement("button");
  prev.className = "collected-copy-nav-button";
  prev.type = "button";
  prev.textContent = "←";
  prev.disabled = currentIndex <= 0;
  prev.addEventListener("click", (event) => {
    event.stopPropagation();
    setActiveCollectedCopyIndex(item.id, currentIndex - 1);
    renderCollected(sonnies);
  });

  const label = document.createElement("span");
  label.className = "collected-copy-nav-label";
  label.textContent = `${currentIndex + 1} of ${ownedCount}`;

  const next = document.createElement("button");
  next.className = "collected-copy-nav-button";
  next.type = "button";
  next.textContent = "→";
  next.disabled = currentIndex >= ownedCount - 1;
  next.addEventListener("click", (event) => {
    event.stopPropagation();
    setActiveCollectedCopyIndex(item.id, currentIndex + 1);
    renderCollected(sonnies);
  });

  nav.append(prev, label, next);
  return nav;
}

function buildCollectedActiveCopyLabel(item, copyIndex = getActiveCollectedCopyIndex(item.id)) {
  if (settings.collectedShowMultipleSeparate || getOwnedCount(item.id) <= 1) {
    return null;
  }

  const label = document.createElement("p");
  label.className = "collected-active-copy-label";
  label.textContent = getCollectedCopyName(item, copyIndex);
  return label;
}

function buildCollectedQuantityControl(item) {
  const ownedCount = getOwnedCount(item.id);
  const row = document.createElement("div");
  row.className = "collected-quantity-row";

  const label = document.createElement("span");
  label.className = "collected-quantity-label";
  label.textContent = "Quantity";

  const control = document.createElement("div");
  control.className = "collected-quantity-control";

  const decrease = document.createElement("button");
  decrease.className = "collected-quantity-button";
  decrease.type = "button";
  decrease.textContent = "−";
  decrease.disabled = ownedCount <= 1;
  decrease.addEventListener("click", (event) => {
    event.stopPropagation();
    if (ownedCount <= 1) {
      return;
    }
    saveOwnedCount(item.id, ownedCount - 1);
    setActiveCollectedCopyIndex(item.id, Math.max(0, Math.min(getActiveCollectedCopyIndex(item.id), ownedCount - 2)));
    renderCollected(sonnies);
  });

  const value = document.createElement("span");
  value.className = "collected-quantity-value";
  value.textContent = String(ownedCount);

  const increase = document.createElement("button");
  increase.className = "collected-quantity-button";
  increase.type = "button";
  increase.textContent = "+";
  increase.addEventListener("click", (event) => {
    event.stopPropagation();
    saveOwnedCount(item.id, ownedCount + 1);
    renderCollected(sonnies);
  });

  control.append(decrease, value, increase);
  row.append(label, control);
  return row;
}

function toggleCollectedExpansion(id) {
  expandedCollectedId = expandedCollectedId === id ? null : id;
  expandedCollectedKey = expandedCollectedId ? id : null;
  pendingCollectedCenterKey = expandedCollectedKey;
  renderCollected(sonnies);
}

function toggleCollectedEntryExpansion(item, key = item.id) {
  if (settings.collectedShowMultipleSeparate) {
    expandedCollectedKey = expandedCollectedKey === key ? null : key;
    expandedCollectedId = expandedCollectedKey ? item.id : null;
    pendingCollectedCenterKey = expandedCollectedKey;
    renderCollected(sonnies);
    return;
  }
  toggleCollectedExpansion(item.id);
}

function getActiveCollectedDetailCopyIndex(id) {
  if (!id) {
    return 0;
  }
  return getActiveCollectedCopyIndex(id);
}

function refreshCollectedAfterDetailEdit() {
  renderCollected(sonnies);
}

function renderCollectedCompact(entries) {
  entries.forEach(({ item, copyIndex, key }) => {
    const card = document.createElement("article");
    card.className = "collected-card collected-card-compact";
    card.dataset.id = key;

    if (isUnrefinedRegular(item)) {
      card.classList.add("is-unrefined");
    }
    if (isCollectedEntryExpanded(item, key)) {
      card.classList.add("is-expanded");
    }
    card.addEventListener("click", (event) => {
      if (event.target.closest(".collected-notes") || event.target.closest("button")) {
        return;
      }
      if (shouldUseCollectedMobileDetailModal()) {
        openCollectedDetailModal(item, copyIndex);
        return;
      }
      toggleCollectedEntryExpansion(item, key);
    });

    const art = document.createElement("div");
    art.className = "collected-art collected-art-compact";
    art.setAttribute("style", buildArtworkStyle(item));

    const body = document.createElement("div");
    body.className = "collected-body collected-body-compact";

    const seriesName = document.createElement("p");
    seriesName.className = "series-name";
    renderSeriesLabel(seriesName, item);

    const nameRow = document.createElement("h3");
    nameRow.className = "wishlist-name-row";

    const name = document.createElement("span");
    name.className = "wishlist-name";
    name.textContent = displayName(item);

    const badges = document.createElement("span");
    badges.className = "name-badges";
    renderBadges(badges, item);
    const countBadge = buildCollectedCountBadge(item);
    if (countBadge) {
      badges.append(countBadge);
    }

    nameRow.append(name, badges);

    const meta = document.createElement("p");
    meta.className = "collected-meta";
    meta.textContent = `${buildCollectedDateLabel(item, copyIndex)}${
      (getOwnedDetail(item.id, copyIndex).notes || "").trim() ? " • Notes saved" : ""
    }`;

    const toggle = document.createElement("button");
    toggle.className = "collected-open-button";
    toggle.type = "button";
    if (shouldUseCollectedMobileDetailModal()) {
      toggle.textContent = "Open details";
      toggle.addEventListener("click", (event) => {
        event.stopPropagation();
        openCollectedDetailModal(item, copyIndex);
      });
    } else {
      toggle.textContent = isCollectedEntryExpanded(item, key) ? "Hide details" : "Open details";
      toggle.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleCollectedEntryExpansion(item, key);
      });
    }

    const actionRow = document.createElement("div");
    actionRow.className = "collected-action-row";
    actionRow.append(toggle, buildCollectedRequestImageButton(item));

    body.append(seriesName, nameRow, meta, actionRow);

    if (isCollectedEntryExpanded(item, key)) {
      const navigator = buildCollectedCopyNavigator(item);
      if (navigator) {
        body.append(navigator);
      }
      const activeCopyLabel = buildCollectedActiveCopyLabel(item, copyIndex);
      if (activeCopyLabel) {
        body.append(activeCopyLabel);
      }
      body.append(
        buildCollectedQuantityControl(item),
        buildCollectedNotes(item, copyIndex),
        buildCollectedOpenDetailsButton(item, copyIndex),
        buildCollectedRequestImageButton(item),
        buildCollectedTransferButton(item, copyIndex),
      );
    }

    card.append(art, body);
    collectedGrid.append(card);
  });
}

function renderCollectedShelfBySeries(entries) {
  const grouped = new Map();
  entries.forEach((entry) => {
    const key = displaySeries(entry.item);
    const group = grouped.get(key) || [];
    group.push(entry);
    grouped.set(key, group);
  });

  [...grouped.entries()]
    .sort((left, right) => {
      const leftFirst = [...left[1]].sort((a, b) => compareCatalogOrder(a.item, b.item))[0];
      const rightFirst = [...right[1]].sort((a, b) => compareCatalogOrder(a.item, b.item))[0];
      return (
        compareCatalogOrder(leftFirst.item, rightFirst.item) ||
        compareSeriesLabels(left[0], right[0])
      );
    })
    .forEach(([series, seriesItems]) => {
    const section = document.createElement("section");
    section.className = "collected-shelf-section";

    const header = document.createElement("div");
    header.className = "collected-shelf-header";
    header.innerHTML = `
      <div>
        <p class="eyebrow">Shelf</p>
        <h3>${series}</h3>
      </div>
      <p class="wishlist-copy">${seriesItems.length} collected Sonny${seriesItems.length === 1 ? "" : "s"}</p>
    `;

    const shelf = document.createElement("div");
    shelf.className = "collected-shelf collected-shelf-figures";

    [...seriesItems]
      .sort((left, right) => {
        return (
          compareCatalogOrder(left.item, right.item) ||
      compareText(displayName(left.item), displayName(right.item))
        );
      })
      .forEach(({ item, copyIndex, key }) => {
      const tile = document.createElement("article");
      tile.className = "collected-shelf-tile collected-shelf-figure-tile";
      tile.dataset.id = key;
      if (isUnrefinedRegular(item)) {
        tile.classList.add("is-unrefined");
      }
      if (isCollectedEntryExpanded(item, key)) {
        tile.classList.add("is-expanded");
      }
      tile.addEventListener("click", (event) => {
        if (event.target.closest(".collected-notes") || event.target.closest("button")) {
          return;
        }
        if (shouldUseCollectedMobileDetailModal()) {
          openCollectedDetailModal(item, copyIndex);
          return;
        }
        toggleCollectedEntryExpansion(item, key);
      });

      const figure = document.createElement("div");
      figure.className = "collected-shelf-figure";

      const art = document.createElement("div");
      art.className = "collected-shelf-art collected-shelf-figure-art";
      art.setAttribute("style", buildArtworkStyle(item));
      figure.append(art);

      const meta = document.createElement("div");
      meta.className = "collected-shelf-figure-meta";

      const name = document.createElement("h4");
      name.className = "collected-shelf-name collected-shelf-figure-name";
      name.textContent = getCollectedCopyName(item, copyIndex);
      const countBadge = buildCollectedCountBadge(item);
      if (countBadge) {
        name.append(" ", countBadge);
      }
      meta.append(name);

      tile.append(figure, meta);
      if (isCollectedEntryExpanded(item, key)) {
        const details = document.createElement("div");
        details.className = "collected-shelf-details";

        const navigator = buildCollectedCopyNavigator(item);
        const date = document.createElement("p");
        date.className = "collected-meta";
        date.textContent = buildCollectedDateLabel(item, copyIndex);

        if (navigator) {
          details.append(navigator);
        }
        const activeCopyLabel = buildCollectedActiveCopyLabel(item, copyIndex);
        if (activeCopyLabel) {
          details.append(activeCopyLabel);
        }
        details.append(
          date,
          buildCollectedQuantityControl(item),
          buildCollectedNotes(item, copyIndex),
          buildCollectedOpenDetailsButton(item, copyIndex),
          buildCollectedRequestImageButton(item),
          buildCollectedTransferButton(item, copyIndex),
        );
        tile.append(details);
      }
      shelf.append(tile);
      });

    section.append(header, shelf);
    collectedGrid.append(section);
    });
}

function renderCollectedMinimalist(entries) {
  entries.forEach(({ item, copyIndex, key }) => {
    const tile = document.createElement("article");
    tile.className = "collected-minimal-tile";
    tile.dataset.id = key;
    if (isUnrefinedRegular(item)) {
      tile.classList.add("is-unrefined");
    }
    if (isCollectedEntryExpanded(item, key)) {
      tile.classList.add("is-expanded");
    }
    tile.addEventListener("click", (event) => {
      if (event.target.closest(".collected-notes") || event.target.closest("button")) {
        return;
      }
      if (shouldUseCollectedMobileDetailModal()) {
        openCollectedDetailModal(item, copyIndex);
        return;
      }
      toggleCollectedEntryExpansion(item, key);
    });

    const figure = document.createElement("div");
    figure.className = "collected-minimal-figure";

    const art = document.createElement("div");
    art.className = "collected-minimal-art";
    art.setAttribute("style", buildArtworkStyle(item));

    figure.append(art);

    const meta = document.createElement("div");
    meta.className = "collected-minimal-meta";

    const name = document.createElement("span");
    name.className = "collected-minimal-name";
    name.textContent = getCollectedCopyName(item, copyIndex);
    const countBadge = buildCollectedCountBadge(item);
    if (countBadge) {
      name.append(" ", countBadge);
    }

    meta.append(name);
    tile.append(figure, meta);

    if (isCollectedEntryExpanded(item, key)) {
      const details = document.createElement("div");
      details.className = "collected-minimal-details";

      const navigator = buildCollectedCopyNavigator(item);
      const date = document.createElement("p");
      date.className = "collected-meta";
      date.textContent = buildCollectedDateLabel(item, copyIndex);

      if (navigator) {
        details.append(navigator);
      }
      const activeCopyLabel = buildCollectedActiveCopyLabel(item, copyIndex);
      if (activeCopyLabel) {
        details.append(activeCopyLabel);
      }
      details.append(
        date,
        buildCollectedQuantityControl(item),
        buildCollectedNotes(item, copyIndex),
        buildCollectedOpenDetailsButton(item, copyIndex),
        buildCollectedRequestImageButton(item),
        buildCollectedTransferButton(item, copyIndex),
      );
      tile.append(details);
    }

    collectedGrid.append(tile);
  });
}

function renderCollectedArmies(items, threshold) {
  items.forEach((item) => {
    const ownedCount = getOwnedDetails(item.id).length;
    const section = document.createElement("section");
    section.className = "collected-shelf-section collected-army-shelf-section";

    const header = document.createElement("div");
    header.className = "collected-shelf-header";
    header.innerHTML = `
      <div>
        <h3>${displayName(item)}</h3>
        <p class="wishlist-copy">${displaySeries(item)}</p>
      </div>
      <p class="wishlist-copy">${ownedCount} Sonny${ownedCount === 1 ? "" : "s"} in army</p>
    `;

    const shelf = document.createElement("div");
    shelf.className = "collected-army-grid";

    Array.from({ length: ownedCount }, (_, copyIndex) => ({ item, copyIndex, key: `${item.id}::army::${copyIndex}` }))
      .forEach(({ item: currentItem, copyIndex, key }) => {
        const tile = document.createElement("article");
        tile.className = "collected-minimal-tile collected-army-tile";
        tile.dataset.id = key;
        if (isUnrefinedRegular(currentItem)) {
          tile.classList.add("is-unrefined");
        }
        if (isCollectedEntryExpanded(currentItem, key)) {
          tile.classList.add("is-expanded");
        }
        tile.addEventListener("click", (event) => {
          if (event.target.closest(".collected-notes") || event.target.closest("button")) {
            return;
          }
          if (shouldUseCollectedMobileDetailModal()) {
            openCollectedDetailModal(currentItem, copyIndex);
            return;
          }
          setActiveCollectedCopyIndex(currentItem.id, copyIndex);
          toggleCollectedEntryExpansion(currentItem, key);
        });

        const figure = document.createElement("div");
        figure.className = "collected-minimal-figure";

        const art = document.createElement("div");
        art.className = "collected-minimal-art";
        art.setAttribute("style", buildArtworkStyle(currentItem));
        figure.append(art);

        const meta = document.createElement("div");
        meta.className = "collected-minimal-meta";

        const name = document.createElement("span");
        name.className = "collected-minimal-name collected-army-copy-name";
        name.textContent = getCollectedCopyName(currentItem, copyIndex);
        meta.append(name);

        tile.append(figure, meta);

        if (isCollectedEntryExpanded(currentItem, key)) {
          const details = document.createElement("div");
          details.className = "collected-minimal-details";

          const date = document.createElement("p");
          date.className = "collected-meta";
          date.textContent = buildCollectedDateLabel(currentItem, copyIndex);

          details.append(
            date,
            buildCollectedNotes(currentItem, copyIndex),
            buildCollectedOpenDetailsButton(currentItem, copyIndex),
            buildCollectedRequestImageButton(currentItem),
            buildCollectedTransferButton(currentItem, copyIndex),
          );
          tile.append(details);
        }

        shelf.append(tile);
      });

    section.append(header, shelf);
    collectedGrid.append(section);
  });
}

function renderCollectedArmiesShelf(items, threshold) {
  items.forEach((item) => {
    const ownedCount = getOwnedDetails(item.id).length;
    const section = document.createElement("section");
    section.className = "collected-shelf-section collected-army-shelf-section";

    const header = document.createElement("div");
    header.className = "collected-shelf-header";
    header.innerHTML = `
      <div>
        <h3>${displayName(item)}</h3>
        <p class="wishlist-copy">${displaySeries(item)}</p>
      </div>
      <p class="wishlist-copy">${ownedCount} Sonny${ownedCount === 1 ? "" : "s"} in army</p>
    `;

    const shelf = document.createElement("div");
    shelf.className = "collected-shelf collected-shelf-figures";

    Array.from({ length: ownedCount }, (_, copyIndex) => ({ item, copyIndex, key: `${item.id}::army::${copyIndex}` }))
      .forEach(({ item: currentItem, copyIndex, key }) => {
        const tile = document.createElement("article");
        tile.className = "collected-shelf-tile collected-shelf-figure-tile";
        tile.dataset.id = key;
        if (isUnrefinedRegular(currentItem)) {
          tile.classList.add("is-unrefined");
        }
        if (isCollectedEntryExpanded(currentItem, key)) {
          tile.classList.add("is-expanded");
        }
        tile.addEventListener("click", (event) => {
          if (event.target.closest(".collected-notes") || event.target.closest("button")) {
            return;
          }
          if (shouldUseCollectedMobileDetailModal()) {
            openCollectedDetailModal(currentItem, copyIndex);
            return;
          }
          setActiveCollectedCopyIndex(currentItem.id, copyIndex);
          toggleCollectedEntryExpansion(currentItem, key);
        });

        const figure = document.createElement("div");
        figure.className = "collected-shelf-figure";

        const art = document.createElement("div");
        art.className = "collected-shelf-art collected-shelf-figure-art";
        art.setAttribute("style", buildArtworkStyle(currentItem));
        figure.append(art);

        const meta = document.createElement("div");
        meta.className = "collected-shelf-figure-meta";

        const name = document.createElement("h4");
        name.className = "collected-shelf-name collected-shelf-figure-name";
        name.textContent = getCollectedCopyName(currentItem, copyIndex);
        meta.append(name);

        tile.append(figure, meta);

        if (isCollectedEntryExpanded(currentItem, key)) {
          const details = document.createElement("div");
          details.className = "collected-shelf-details";

          const date = document.createElement("p");
          date.className = "collected-meta";
          date.textContent = buildCollectedDateLabel(currentItem, copyIndex);

          details.append(
            date,
            buildCollectedNotes(currentItem, copyIndex),
            buildCollectedOpenDetailsButton(currentItem, copyIndex),
            buildCollectedRequestImageButton(currentItem),
            buildCollectedTransferButton(currentItem, copyIndex),
          );
          tile.append(details);
        }

        shelf.append(tile);
      });

    section.append(header, shelf);
    collectedGrid.append(section);
  });
}

function switchView(view) {
  const previousView = settings.activeView || "tracker";
  settings.activeView = view;
  saveSettings();
  if (previousView !== view) {
    trackSiteEvent("view_tab", {
      view,
      previousView,
    });
  }
  setMobileNavOpen(false);
  if (previousView === "tracker" && view !== "tracker" && searchInput?.value) {
    searchInput.value = "";
    applyFilters();
  }
  document.body.classList.toggle("settings-active", view === "settings");
  document.body.classList.toggle("stock-active", view === "stock");
  document.body.classList.toggle("wishlist-active", view === "wishlist");
  if (view !== "wishlist") {
    document.body.classList.remove("wishlist-immersed");
    wishlistImmersedForced = false;
    setWishlistControlsOpen(false);
  }
  viewTabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.view === view);
  });
  viewPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.panel === view);
  });
  if (view === "wishlist") {
    if ((settings.wishlistBoardMode || "immersive") === "immersive") {
      wishlistImmersedForced = true;
      setWishlistControlsOpen(true);
      wishlistLandingStage?.scrollIntoView({ behavior: "auto", block: "start" });
      window.setTimeout(() => {
        wishlistImmersedForced = false;
        updateWishlistImmersiveState();
      }, 1200);
    } else {
      wishlistImmersedForced = false;
      document.body.classList.remove("wishlist-immersed");
      setWishlistControlsOpen(false);
      wishlistBoardView?.scrollIntoView({ behavior: "auto", block: "start" });
    }
  }
  if (view === "stock") {
    renderStockPanel();
  }
  updateTrackerBackToTopVisibility();
  requestAnimationFrame(updateWishlistImmersiveState);
}

function isTrackerViewActive() {
  return document.querySelector('.view-panel[data-panel="tracker"]')?.classList.contains("is-active");
}

function updateTrackerBackToTopVisibility() {
  if (!trackerBackToTopButton) {
    return;
  }

  const shouldShow = isTrackerViewActive() && window.scrollY > 260;
  trackerBackToTopButton.hidden = !shouldShow;
  trackerBackToTopButton.classList.toggle("is-visible", shouldShow);
}

function scrollTrackerBackToTop() {
  const trackerPanel = document.querySelector('.view-panel[data-panel="tracker"]');
  const headerOffset = (appHeader?.getBoundingClientRect().height || 0) + 22;
  const trackerTop = trackerPanel
    ? window.scrollY + trackerPanel.getBoundingClientRect().top - headerOffset
    : 0;

  window.scrollTo({
    top: Math.max(0, trackerTop),
    behavior: "smooth",
  });
}

function setMobileNavOpen(isOpen) {
  if (!mobileNavWrap || !mobileNavTrigger) {
    return;
  }
  mobileNavWrap.classList.toggle("is-open", isOpen);
  mobileNavTrigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

function updateWishlistImmersiveState() {
  const isWishlistActive = document.body.classList.contains("wishlist-active");
  if (!isWishlistActive || !wishlistLanding || (settings.wishlistBoardMode || "immersive") !== "immersive" || wishlistLanding.hidden) {
    document.body.classList.remove("wishlist-immersed");
    return;
  }

  if (wishlistImmersedForced) {
    document.body.classList.add("wishlist-immersed");
    return;
  }

  const landingRect = wishlistLanding.getBoundingClientRect();
  const stageRect = wishlistLandingStage?.getBoundingClientRect();
  const hasScrolledIntoDreamBoard = window.scrollY > 120 || landingRect.top < 24;
  const stageIsStillVisible = !stageRect || stageRect.bottom > 120;
  document.body.classList.toggle(
    "wishlist-immersed",
    hasScrolledIntoDreamBoard && stageIsStillVisible,
  );
}

function switchWishlistBoardMode(mode) {
  const nextMode = mode === "grid" ? "grid" : "immersive";
  settings.wishlistBoardMode = nextMode;
  saveSettings();
  trackSiteEvent("switch_wishlist_board_mode", {
    mode: nextMode,
  });
  renderWishlist();
  if (nextMode === "grid") {
    wishlistImmersedForced = false;
    document.body.classList.remove("wishlist-immersed");
    setWishlistControlsOpen(false);
    wishlistBoardView?.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    wishlistImmersedForced = true;
    setWishlistControlsOpen(true);
    wishlistLandingStage?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      wishlistImmersedForced = false;
      updateWishlistImmersiveState();
    }, 900);
  }
}

function setWishlistControlsOpen(isOpen) {
  if (!wishlistControlsMenu || !wishlistControlsTrigger) {
    return;
  }

  wishlistControlsMenu.classList.toggle("is-open", isOpen);
  wishlistControlsTrigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

function switchSettingsView(view) {
  settingsSubtabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.settingsView === view);
  });
  settingsSubpanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.settingsPanel === view);
  });
}

function applyFilters() {
  const trackerItems = getVisibleTrackerItems(sonnies);
  updateSeriesFilter(sonnies);
  const search = searchInput.value.trim().toLowerCase();
  const wantedStatus = statusFilter.value;
  const sortMode = sortFilter.value;

  const availableSeries = new Set([
    ...SPECIAL_TRACKER_SERIES_FILTERS.map((entry) => entry.value),
    ...uniqueSeries(trackerItems),
  ]);
  if (seriesFilter.value !== "all" && !availableSeries.has(seriesFilter.value)) {
    seriesFilter.value = "all";
  }
  const wantedSeries = seriesFilter.value;

  const filtered = trackerItems.filter((item) => {
    const status = getStatus(item.id);
    const badges = getBadges(item);
    const matchesSearch =
      !search ||
      displayName(item).toLowerCase().includes(search) ||
      displaySeries(item).toLowerCase().includes(search);
    const matchesStatus =
      wantedStatus === "all" ||
      status === wantedStatus;
    const matchesSeries =
      wantedSeries === "all" ||
      displaySeries(item) === wantedSeries ||
      (wantedSeries === "__secrets__" && badges.includes("S")) ||
      (wantedSeries === "__robbys__" && badges.includes("R"));
    const matchesWishlist =
      !showOnlyFavorites.checked || status === "iso" || status === "diso";
    return matchesSearch && matchesStatus && matchesSeries && matchesWishlist;
  });
  const sorted = sortItems(filtered, sortMode);

  syncTrackerColumnsPreference();
  if (resultsCount) {
    resultsCount.textContent = `${sorted.length} Sonny${
      sorted.length === 1 ? "" : "s"
    } showing`;
  }
  renderGrid(sorted);
  renderStats(trackerItems);
  renderInsights(trackerItems);
  renderSeriesBrowser(trackerItems);
  renderWishlist();
  updateCollectedSeriesFilter(sonnies);
  renderCollected(sonnies);
  renderSettings();
}

function buildCropStyle(item) {
  const imagePath = item.image.page.startsWith("./assets/")
    ? item.image.page.replace("./assets/", "./app/assets/")
    : item.image.page;
  return `
    background-image: url("${imagePath}");
    background-size: ${item.image.pageWidth}px ${item.image.pageHeight}px;
    background-position: -${item.image.x}px -${item.image.y}px;
  `;
}

function buildGuidebookBackupStyle(path) {
  const imagePath = withImageVersion(path);
  return `
    background-image: url("${imagePath}");
    background-size: contain;
    background-position: center bottom;
    background-repeat: no-repeat;
  `;
}

function guidebookBackupPathForItem(item) {
  if (!isExplicitGuideUnrefinedSeries(item.series)) {
    return "";
  }

  const seriesFolders = {
    "Unrefined Animal Series Ver. 1":
      "./sonny_png_library_guidebook_backup/regulars/animal-collections/unrefined-animal-series-ver-1",
    "Unrefined Animal Series Ver. 2":
      "./sonny_png_library_guidebook_backup/regulars/animal-collections/unrefined-animal-series-ver-2",
    "Unrefined Animal Series Ver. 3":
      "./sonny_png_library_guidebook_backup/regulars/animal-collections/unrefined-animal-series-ver-3",
    "Unrefined Animal Series Ver. 4":
      "./sonny_png_library_guidebook_backup/regulars/animal-collections/unrefined-animal-series-ver-4",
    "Unrefined Marine Series":
      "./sonny_png_library_guidebook_backup/regulars/marine-collections/unrefined-marine-series",
    "Unrefined Flower Series":
      "./sonny_png_library_guidebook_backup/regulars/flower-collections/unrefined-flower-series",
    "Unrefined Fruit Series":
      "./sonny_png_library_guidebook_backup/regulars/fruit-collections/unrefined-fruit-series",
    "Unrefined Vegetable Series":
      "./sonny_png_library_guidebook_backup/regulars/vegetable-collections/unrefined-vegetable-series",
  };

  const folder = seriesFolders[(item.series || "").trim()];
  if (!folder) {
    return "";
  }

  const idMatch = (item.id || "").match(/^page-(\d+)-(\d+)-(.+)$/);
  if (!idMatch) {
    return "";
  }

  const pageNumber = idMatch[1];
  const slotNumber = idMatch[2];
  const slug = idMatch[3];
  const paddedPageNumber = pageNumber.padStart(3, "0");
  return `${folder}/${slotNumber}__${slug}__page-${paddedPageNumber}.png`;
}

function buildArtworkStyle(item) {
  const manualOverride = getManualItemOverride(item);
  if (manualOverride.artLabel) {
    return buildGeneratedKeychainStyle(manualOverride.artLabel);
  }

  const manualArtPath = withManualAssetVersion(manualOverride.artPath || "", item);
  if (manualArtPath) {
    return `
      background-image: url("${manualArtPath}");
      background-size: contain;
      background-position: center bottom;
      background-repeat: no-repeat;
    `;
  }

  const guidebookBackupPath = guidebookBackupPathForItem(item);
  if (guidebookBackupPath) {
    return buildGuidebookBackupStyle(guidebookBackupPath);
  }

  if (shouldPreferGuidebookArtwork(item)) {
    return buildCropStyle(item);
  }

  const mappedImage = withImageVersion(getArtworkPath(item));
  if (mappedImage) {
    return `
      background-image: url("${mappedImage}");
      background-size: contain;
      background-position: center bottom;
      background-repeat: no-repeat;
    `;
  }
  return buildCropStyle(item);
}

function hasMappedArtwork(item) {
  return Boolean(getArtworkPath(item)) || Boolean(guidebookBackupPathForItem(item));
}

function shouldPreferGuidebookArtwork(item) {
  return (
    getCollectionType(item) === "Regular" &&
    isExplicitGuideUnrefinedSeries(item.series) &&
    !guidebookBackupPathForItem(item)
  );
}

function sourceLabel(item) {
  const override = getManualItemOverride(item);
  if (override.artPath) {
    return override.artSource === "manual-web-override"
      ? "Manual web art override"
      : "Manual art override";
  }
  if (shouldPreferGuidebookArtwork(item)) {
    return `Guide page ${item.page}`;
  }
  if (guidebookBackupPathForItem(item)) {
    return "Guidebook extracted art";
  }
  if (isUnrefinedRegular(item)) {
    return "Unrefined regular variant";
  }
  return getArtworkPath(item) ? "Official product image" : `Guide page ${item.page}`;
}

function renderGrid(items) {
  grid.innerHTML = "";

  items.forEach((item) => {
    const fragment = template.content.cloneNode(true);
    const card = fragment.querySelector(".card");
    const crop = fragment.querySelector(".page-crop");
    const seriesName = fragment.querySelector(".series-name");
    const sonnyName = fragment.querySelector(".sonny-name");
    const badges = fragment.querySelector(".name-badges");
    const sourceNote = fragment.querySelector(".source-note");
    const requestImageButton = fragment.querySelector("[data-request-image]");
    const buttons = fragment.querySelectorAll(".status-button");
    const mobileStatusSelect = fragment.querySelector(".mobile-status-select");
    const mobileOwnedCounter = fragment.querySelector(".mobile-owned-counter");
    const mobileOwnedValue = fragment.querySelector(".mobile-owned-value");
    const mobileOwnedDecreaseButton = fragment.querySelector('[data-mobile-owned-adjust="-1"]');
    const ownedSlot = fragment.querySelector(".status-slot-owned");
    const ownedButton = fragment.querySelector('.status-button[data-status="have"]');
    const ownedCounter = fragment.querySelector(".owned-counter");
    const ownedCounterValue = fragment.querySelector(".owned-counter-value");
    const ownedDecreaseButton = fragment.querySelector('[data-owned-adjust="-1"]');

    if (isUnrefinedRegular(item)) {
      card.classList.add("card-unrefined");
    }
    crop.setAttribute("style", buildArtworkStyle(item));
    crop.classList.toggle("is-official-art", hasMappedArtwork(item));
    renderSeriesLabel(seriesName, item);
    sonnyName.textContent = displayName(item);
    renderBadges(badges, item);
    if (sourceNote) {
      sourceNote.hidden = true;
      sourceNote.textContent = "";
    }
    requestImageButton?.addEventListener("click", (event) => {
      event.stopPropagation();
      openImageRequestPanel(item);
    });

    buttons.forEach((button) => {
      const isActive = button.dataset.status === getStatus(item.id);
      button.classList.toggle("is-active", isActive);
    });

    const currentStatus = getStatus(item.id);
    const isOwned = currentStatus === "have";
    const ownedCount = getOwnedCount(item.id);
    card.dataset.status = currentStatus;
    if (ownedSlot) {
      ownedSlot.dataset.itemId = item.id;
      ownedSlot.classList.toggle("is-active", isOwned);
      ownedSlot.classList.toggle("is-peek-open", isOwned && activeOwnedCounterId === item.id);
    }
    if (mobileStatusSelect) {
      mobileStatusSelect.value = currentStatus;
      mobileStatusSelect.setAttribute("aria-label", `${displayName(item)} status`);
    }
    if (mobileOwnedCounter) {
      mobileOwnedCounter.hidden = !isOwned;
    }
    if (mobileOwnedValue) {
      mobileOwnedValue.textContent = String(ownedCount);
    }
    if (mobileOwnedDecreaseButton) {
      mobileOwnedDecreaseButton.disabled = ownedCount <= 1;
    }
    if (ownedButton) {
      ownedButton.classList.toggle("has-inline-counter", isOwned);
    }
    if (ownedCounter) {
      ownedCounter.hidden = !isOwned;
    }
    if (ownedCounterValue) {
      ownedCounterValue.textContent = String(ownedCount);
    }
    if (ownedDecreaseButton) {
      ownedDecreaseButton.disabled = ownedCount <= 1;
    }

    card.dataset.id = item.id;
    grid.append(fragment);
  });
}

async function init() {
  sonnies = window.SONNIES_DATA || [];
  collectedSeriesSelection = Array.isArray(settings.collectedSeriesSelection)
    ? [...settings.collectedSeriesSelection]
    : [];
  if (searchInput) {
    searchInput.value = "";
  }
  if (statusFilter) {
    statusFilter.value = "all";
  }
  if (seriesFilter) {
    seriesFilter.value = "all";
  }
  if (sortFilter) {
    sortFilter.value = "catalog";
  }
  if (showOnlyFavorites) {
    showOnlyFavorites.checked = false;
  }
  syncTrackerColumnsPreference();
  inferredSeriesYearHints = buildInferredSeriesYearHints(sonnies);
  displaySeriesCache = new Map();
  ({ seriesOrder: catalogSeriesOrder, itemOrder: catalogItemOrder } = buildCatalogOrderMaps(sonnies));
  likelySecretIds = buildLikelySecretIds(sonnies);
  updateMakerLayoutControls();
  updateSeriesFilter(sonnies);
  reconcileMakerSelections({ reset: true });
  renderBugUploadList();
  renderAuthState();
  applyFilters();
  switchView(settings.activeView || "tracker");
  trackSiteEvent(
    "page_load",
    {
      initialView: settings.activeView || "tracker",
    },
    { oncePerSession: true },
  );
  renderStockPanel();
  await initializeSupabaseAuth();
  updateTrackerBackToTopVisibility();
}

searchInput.addEventListener("input", applyFilters);
statusFilter.addEventListener("change", applyFilters);
seriesFilter.addEventListener("change", applyFilters);
sortFilter.addEventListener("change", applyFilters);
trackerColumnsSelect?.addEventListener("change", () => {
  const defaultTrackerColumns = getDefaultTrackerColumns();
  const nextColumns = String(
    Math.min(
      8,
      Math.max(
        4,
        Number.parseInt(trackerColumnsSelect.value, 10) || Number(defaultTrackerColumns),
      ),
    ),
  );
  trackerColumnsSelect.value = nextColumns;
  settings.trackerColumns = nextColumns;
  saveSettings();
  syncTrackerColumnsPreference();
});
showOnlyFavorites.addEventListener("change", applyFilters);
wishlistSearch?.addEventListener("input", renderWishlist);
wishlistStatusFilter?.addEventListener("change", renderWishlist);
wishlistSeriesFilter?.addEventListener("change", renderWishlist);
wishlistSortFilter?.addEventListener("change", renderWishlist);
wishlistGridLayout?.addEventListener("change", () => {
  settings.wishlistGridLayout = wishlistGridLayout.value;
  saveSettings();
  renderWishlist();
});
collectedSearch.addEventListener("input", () => renderCollected(sonnies));
collectedSeriesFilterButton?.addEventListener("click", () => {
  const isOpen = !collectedSeriesFilterPanel?.hidden;
  if (collectedSeriesFilterPanel) {
    collectedSeriesFilterPanel.hidden = isOpen;
  }
  collectedSeriesFilterButton.setAttribute("aria-expanded", String(!isOpen));
});
collectedSeriesAllToggle?.addEventListener("change", () => {
  if (!collectedSeriesAllToggle.checked) {
    return;
  }
  collectedSeriesSelection = [];
  settings.collectedSeriesSelection = [];
  if (collectedSeriesOptions) {
    collectedSeriesOptions.querySelectorAll("input[type='checkbox']").forEach((input) => {
      input.checked = false;
    });
  }
  updateCollectedSeriesFilterButtonLabel();
  saveSettings();
  renderCollected(sonnies);
});
collectedViewFilter.addEventListener("change", () => {
  renderCollected(sonnies);
  saveSettings();
});
collectedArmiesView?.addEventListener("change", () => {
  settings.collectedArmiesView = collectedArmiesView.value;
  saveSettings();
  renderCollected(sonnies);
});
collectedShelfGrouping?.addEventListener("change", () => {
  settings.collectedShelfGrouping = collectedShelfGrouping.checked ? "series" : "all";
  saveSettings();
  renderCollected(sonnies);
});
collectedShelfDensity?.addEventListener("change", () => {
  const nextValue = Math.min(8, Math.max(1, Math.round(Number(collectedShelfDensity.value || 4))));
  settings.collectedShelfDensity = String(nextValue);
  collectedShelfDensity.value = String(nextValue);
  saveSettings();
  renderCollected(sonnies);
});
collectedArmyThreshold?.addEventListener("change", () => {
  settings.collectedArmyThreshold = collectedArmyThreshold.value;
  expandedCollectedId = null;
  expandedCollectedKey = null;
  saveSettings();
  renderCollected(sonnies);
});
collectedShowMultipleSeparateToggle?.addEventListener("change", () => {
  settings.collectedShowMultipleSeparate = Boolean(collectedShowMultipleSeparateToggle.checked);
  expandedCollectedId = null;
  expandedCollectedKey = null;
  saveSettings();
  renderCollected(sonnies);
});
collectedSortFilter.addEventListener("change", () => renderCollected(sonnies));
wishlistLayoutEditButton?.addEventListener("click", () => {
  settings.wishlistLandingEditMode = !settings.wishlistLandingEditMode;
  saveSettings();
  renderWishlist();
});
wishlistLayoutResetButton?.addEventListener("click", () => {
  settings.wishlistFloatingPositions = {};
  saveSettings();
  renderWishlist();
});
wishlistTitleEditButton?.addEventListener("click", () => {
  settings.wishlistTitleEditMode = !settings.wishlistTitleEditMode;
  saveSettings();
  renderWishlistLandingTitleEditor();
  if (settings.wishlistTitleEditMode) {
    wishlistTitleTextInput?.focus();
    wishlistTitleTextInput?.select();
  }
});
wishlistTitleTextInput?.addEventListener("input", () => {
  settings.wishlistLandingTitleText = normalizeWishlistTitleText(wishlistTitleTextInput.value);
  saveSettings();
  renderWishlistLandingTitleEditor();
});
wishlistTitleFontSelect?.addEventListener("change", () => {
  settings.wishlistLandingTitleFont = normalizeWishlistTitleFont(wishlistTitleFontSelect.value);
  saveSettings();
  renderWishlistLandingTitleEditor();
});
wishlistLegendEditButton?.addEventListener("click", () => {
  settings.wishlistLegendEditMode = !settings.wishlistLegendEditMode;
  saveSettings();
  renderWishlistLegend();
  if (wishlistLanding) {
    wishlistLanding.classList.toggle("is-editing-legend", Boolean(settings.wishlistLegendEditMode));
  }
});
wishlistLegendAddButton?.addEventListener("click", () => {
  const items = normalizeWishlistLegendItems(settings.wishlistLegendItems);
  items.push({
    id: `legend-${Date.now()}`,
    emoji: "✧",
    label: `New label ${items.length - 1}`,
    tone: "custom",
  });
  settings.wishlistLegendItems = items;
  saveSettings();
  renderWishlistLegend();
});
openWishlistRankerButton?.addEventListener("click", openWishlistRanker);
wishlistRankerOpenButton?.addEventListener("click", openWishlistRanker);
wishlistRankerCloseButton?.addEventListener("click", closeWishlistRanker);
wishlistRankerRerankButton?.addEventListener("click", resetWishlistRanker);
wishlistRankerLeftButton?.addEventListener("click", () => advanceWishlistRanker("left"));
wishlistRankerRightButton?.addEventListener("click", () => advanceWishlistRanker("right"));
wishlistRankerSkipButton?.addEventListener("click", () => advanceWishlistRanker("skip"));
wishlistRankerTooToughButton?.addEventListener("click", () => advanceWishlistRanker("tie"));
wishlistGridViewButton?.addEventListener("click", () => {
  switchWishlistBoardMode((settings.wishlistBoardMode || "immersive") === "grid" ? "immersive" : "grid");
});
makerBackgroundUploadInput?.addEventListener("change", () => {
  const file = makerBackgroundUploadInput.files?.[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    if (typeof reader.result !== "string") {
      return;
    }
    makerCustomBackgroundDataUrl = reader.result;
    makerCustomBackgroundName = file.name;
    makerCustomBackgroundJustUploaded = true;
    makerBackground = "custom";
    renderMakerBackgroundOptions();
    renderMakerCanvas();
  };
  reader.readAsDataURL(file);
});
wishlistLandingStage?.addEventListener("pointermove", updateWishlistFloatingDragPosition);
wishlistLandingStage?.addEventListener("pointerup", endWishlistFloatingDrag);
wishlistLandingStage?.addEventListener("pointercancel", endWishlistFloatingDrag);
wishlistLandingStage?.addEventListener("pointermove", updateWishlistRotateDragPosition);
wishlistLandingStage?.addEventListener("pointerup", endWishlistRotateDrag);
wishlistLandingStage?.addEventListener("pointercancel", endWishlistRotateDrag);
window.addEventListener("pointerup", endWishlistFloatingDrag);
window.addEventListener("pointercancel", endWishlistFloatingDrag);
window.addEventListener("pointermove", updateWishlistRotateDragPosition);
window.addEventListener("pointerup", endWishlistRotateDrag);
window.addEventListener("pointercancel", endWishlistRotateDrag);
window.addEventListener("scroll", updateWishlistImmersiveState, { passive: true });
window.addEventListener("resize", updateWishlistImmersiveState);
collectedDetailCloseButton?.addEventListener("click", closeCollectedDetailModal);
collectedDetailBackdrop?.addEventListener("click", closeCollectedDetailModal);
collectedDetailPhotoUploadButton?.addEventListener("click", () => {
  collectedDetailPhotoInput?.click();
});
collectedDetailPhotoReplaceButton?.addEventListener("click", () => {
  collectedDetailPhotoInput?.click();
});
collectedDetailPhotoRemoveButton?.addEventListener("click", () => {
  if (!activeCollectedDetailId) {
    return;
  }
  saveOwnedDetailPatch(activeCollectedDetailId, getActiveCollectedDetailCopyIndex(activeCollectedDetailId), {
    customPhoto: "",
  });
  updateCollectedDetailPhotoUi(getOwnedDetail(
    activeCollectedDetailId,
    getActiveCollectedDetailCopyIndex(activeCollectedDetailId),
  ));
  refreshCollectedAfterDetailEdit();
});
collectedDetailRequestImageButton?.addEventListener("click", () => {
  if (!activeCollectedDetailId) {
    return;
  }
  const item = sonnies.find((entry) => entry.id === activeCollectedDetailId);
  if (!item) {
    return;
  }
  openImageRequestPanel(item);
});
collectedDetailCustomName?.addEventListener("input", () => {
  if (!activeCollectedDetailId) {
    return;
  }
  const copyIndex = getActiveCollectedDetailCopyIndex(activeCollectedDetailId);
  saveOwnedDetailPatch(activeCollectedDetailId, copyIndex, {
    customName: collectedDetailCustomName.value,
  });
  const activeItem = sonnies.find((item) => item.id === activeCollectedDetailId);
  if (activeItem && collectedDetailName) {
    collectedDetailName.textContent = getCollectedCopyName(activeItem, copyIndex);
  }
  refreshCollectedAfterDetailEdit();
});
collectedDetailCondition?.addEventListener("change", () => {
  if (!activeCollectedDetailId) {
    return;
  }
  const copyIndex = getActiveCollectedDetailCopyIndex(activeCollectedDetailId);
  saveOwnedDetailPatch(activeCollectedDetailId, copyIndex, {
    condition: collectedDetailCondition.value,
  });
  updateCollectedConditionUi(collectedDetailCondition.value);
});
collectedDetailConditionCustom?.addEventListener("input", () => {
  if (!activeCollectedDetailId) {
    return;
  }
  saveOwnedDetailPatch(activeCollectedDetailId, getActiveCollectedDetailCopyIndex(activeCollectedDetailId), {
    conditionCustom: collectedDetailConditionCustom.value,
  });
});
collectedDetailHasBoxFoil?.addEventListener("change", () => {
  if (!activeCollectedDetailId) {
    return;
  }
  saveOwnedDetailPatch(activeCollectedDetailId, getActiveCollectedDetailCopyIndex(activeCollectedDetailId), {
    hasBoxFoil: Boolean(collectedDetailHasBoxFoil.checked),
  });
});
collectedDetailDisplayLocation?.addEventListener("input", () => {
  if (!activeCollectedDetailId) {
    return;
  }
  saveOwnedDetailPatch(activeCollectedDetailId, getActiveCollectedDetailCopyIndex(activeCollectedDetailId), {
    displayLocation: collectedDetailDisplayLocation.value,
  });
});
collectedDetailCurrentValue?.addEventListener("input", () => {
  if (!activeCollectedDetailId) {
    return;
  }
  saveOwnedDetailPatch(activeCollectedDetailId, getActiveCollectedDetailCopyIndex(activeCollectedDetailId), {
    currentValueEstimate: collectedDetailCurrentValue.value,
  });
});
collectedDetailPhotoInput?.addEventListener("change", () => {
  const file = collectedDetailPhotoInput.files?.[0];
  if (!activeCollectedDetailId || !file) {
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const result = typeof reader.result === "string" ? reader.result : "";
    saveOwnedDetailPatch(activeCollectedDetailId, getActiveCollectedDetailCopyIndex(activeCollectedDetailId), {
      customPhoto: result,
    });
    updateCollectedDetailPhotoUi(getOwnedDetail(
      activeCollectedDetailId,
      getActiveCollectedDetailCopyIndex(activeCollectedDetailId),
    ));
    refreshCollectedAfterDetailEdit();
    collectedDetailPhotoInput.value = "";
  });
  reader.readAsDataURL(file);
});
collectedDetailModalShell?.addEventListener("click", (event) => {
  const closeTarget = event.target.closest("#collected-detail-close, #collected-detail-backdrop");
  if (closeTarget) {
    closeCollectedDetailModal();
  }
});
collectedDetailModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!activeCollectedDetailId) {
      return;
    }
    const mode = button.dataset.detailMode || "purchased";
    saveOwnedDetailPatch(activeCollectedDetailId, getActiveCollectedDetailCopyIndex(activeCollectedDetailId), {
      acquiredBy: mode,
    });
    updateCollectedDetailModeUi(mode);
    refreshCollectedAfterDetailEdit();
  });
});
collectedDetailDate?.addEventListener("change", () => {
  if (!activeCollectedDetailId) {
    return;
  }
  saveOwnedDetailPatch(activeCollectedDetailId, getActiveCollectedDetailCopyIndex(activeCollectedDetailId), {
    collectedAt: normalizeCollectedDateValue(
      collectedDetailDate.value,
      getOwnedDetail(
        activeCollectedDetailId,
        getActiveCollectedDetailCopyIndex(activeCollectedDetailId),
      ).collectedAt || "",
    ),
  });
  refreshCollectedAfterDetailEdit();
});
collectedDetailPurchasedFrom?.addEventListener("input", () => {
  if (!activeCollectedDetailId) {
    return;
  }
  saveOwnedDetailPatch(activeCollectedDetailId, getActiveCollectedDetailCopyIndex(activeCollectedDetailId), {
    purchasedFrom: collectedDetailPurchasedFrom.value,
  });
});
collectedDetailPurchasedPrice?.addEventListener("input", () => {
  if (!activeCollectedDetailId) {
    return;
  }
  saveOwnedDetailPatch(activeCollectedDetailId, getActiveCollectedDetailCopyIndex(activeCollectedDetailId), {
    purchasedPrice: collectedDetailPurchasedPrice.value,
  });
});
collectedDetailTradedWith?.addEventListener("input", () => {
  if (!activeCollectedDetailId) {
    return;
  }
  saveOwnedDetailPatch(activeCollectedDetailId, getActiveCollectedDetailCopyIndex(activeCollectedDetailId), {
    tradedWith: collectedDetailTradedWith.value,
  });
});
collectedDetailAddTradedForButton?.addEventListener("click", () => {
  const rawValue = collectedDetailTradedForInput?.value?.trim() || "";
  if (!activeCollectedDetailId || !rawValue) {
    return;
  }

  const copyIndex = getActiveCollectedDetailCopyIndex(activeCollectedDetailId);
  const detail = getOwnedDetail(activeCollectedDetailId, copyIndex);
  const nextEntries = normalizeCollectedTradeEntries(detail);
  const matchedSonny = findSonnyByTradeLabel(rawValue);
  const nextEntry = matchedSonny
    ? { id: matchedSonny.id, label: displayName(matchedSonny) }
    : { id: "", label: rawValue };

  const alreadyExists = nextEntries.some((entry) => {
    if (nextEntry.id) {
      return entry.id === nextEntry.id;
    }
    return entry.label.toLowerCase() === nextEntry.label.toLowerCase();
  });

  if (!alreadyExists) {
    nextEntries.push(nextEntry);
  }

  saveOwnedDetailPatch(activeCollectedDetailId, copyIndex, serializeCollectedTradeEntries(nextEntries));

  collectedDetailTradedForInput.value = "";
  renderCollectedTradedForList(activeCollectedDetailId, copyIndex);
  refreshCollectedAfterDetailEdit();
});
collectedDetailMixPayingAmount?.addEventListener("input", () => {
  if (!activeCollectedDetailId) {
    return;
  }
  saveOwnedDetailPatch(activeCollectedDetailId, getActiveCollectedDetailCopyIndex(activeCollectedDetailId), {
    mixPayingAmount: collectedDetailMixPayingAmount.value,
  });
});
collectedDetailNotes?.addEventListener("input", () => {
  if (!activeCollectedDetailId) {
    return;
  }
  saveOwnedDetailPatch(activeCollectedDetailId, getActiveCollectedDetailCopyIndex(activeCollectedDetailId), {
    notes: collectedDetailNotes.value,
  });
  if (collectedSortFilter.value === "notes") {
    refreshCollectedAfterDetailEdit();
  }
});
trackerStockSearch?.addEventListener("input", () => {
  trackerStockSearchValue = trackerStockSearch.value;
  saveTrackerStockUiPrefs();
  renderStockPanel();
});
trackerStockStatusFilter?.addEventListener("change", () => {
  trackerStockStatusValue = trackerStockStatusFilter.value;
  saveTrackerStockUiPrefs();
  renderStockPanel();
});
trackerStockSort?.addEventListener("change", () => {
  trackerStockSortValue = trackerStockSort.value;
  saveTrackerStockUiPrefs();
  renderStockPanel();
});
trackerStockDisplayMode?.addEventListener("change", () => {
  trackerStockDisplayValue = trackerStockDisplayMode.checked ? "shelf" : "cards";
  saveTrackerStockUiPrefs();
  renderStockPanel();
});
trackerStockCardDensity?.addEventListener("change", () => {
  trackerStockDensityValue = trackerStockCardDensity.value;
  saveTrackerStockUiPrefs();
  renderStockPanel();
});
window.addEventListener("storage", (event) => {
  if (event.key === STORAGE_KEY) {
    progress = loadProgress();
    applyFilters();
    return;
  }

  if (event.key === STOCK_STORAGE_KEY) {
    renderStockPanel();
    return;
  }

  if (event.key === SETTINGS_STORAGE_KEY) {
    settings = loadSettings();
    syncTrackerColumnsPreference();
    applyFilters();
  }
});
insightsSeriesSort?.addEventListener("change", () => {
  insightsPinnedSeries = "";
  renderSeriesBrowser(getVisibleTrackerItems(sonnies));
});
insightsSeriesFilter?.addEventListener("change", () => {
  insightsPinnedSeries = "";
  renderSeriesBrowser(getVisibleTrackerItems(sonnies));
});
insightsColorCodeModeToggle?.addEventListener("change", () => {
  settings.insightsColorCodeMode = !insightsColorCodeModeToggle.checked;
  saveSettings();
  renderSeriesBrowser(getVisibleTrackerItems(sonnies));
});
insightsResetBrowserButton?.addEventListener("click", resetInsightsSeriesBrowser);
hideSearchInput?.addEventListener("input", renderSettings);
collectionFieldToggles.forEach((toggle) => {
  toggle.addEventListener("change", () => {
    const key = toggle.id.replace("field-toggle-", "");
    settings.collectionFieldVisibility = {
      ...DEFAULT_COLLECTION_FIELD_VISIBILITY,
      ...(settings.collectionFieldVisibility || {}),
      [key]: Boolean(toggle.checked),
    };
    saveSettings();
    renderSettings();
    applyCollectedFieldVisibility();
  });
});
grid.addEventListener("click", (event) => {
  const ownedAdjustButton = event.target.closest(".owned-counter-button");
  if (ownedAdjustButton) {
    const card = ownedAdjustButton.closest(".card");
    const id = card?.dataset.id;
    const delta = Number(ownedAdjustButton.dataset.ownedAdjust || 0);
    if (!id || !delta) {
      return;
    }

    const nextCount = Math.max(1, getOwnedCount(id) + delta);
    activeOwnedCounterId = id;
    saveOwnedCount(id, nextCount);
    try {
      applyFilters();
    } catch (error) {
      console.error("Failed to refresh tracker after owned count change", error);
    }
    return;
  }

  const mobileOwnedAdjustButton = event.target.closest(".mobile-owned-button");
  if (mobileOwnedAdjustButton) {
    const card = mobileOwnedAdjustButton.closest(".card");
    const id = card?.dataset.id;
    const delta = Number(mobileOwnedAdjustButton.dataset.mobileOwnedAdjust || 0);
    if (!id || !delta) {
      return;
    }

    const nextCount = Math.max(1, getOwnedCount(id) + delta);
    saveOwnedCount(id, nextCount);
    try {
      applyFilters();
    } catch (error) {
      console.error("Failed to refresh tracker after mobile owned count change", error);
    }
    return;
  }

  const button = event.target.closest(".status-button");
  if (!button) {
    return;
  }

  const card = button.closest(".card");
  const id = card?.dataset.id;
  const status = button.dataset.status;

  if (!id || !status) {
    return;
  }

  activeOwnedCounterId = status === "have" ? id : null;
  saveStatusChange(id, status);
  try {
    applyFilters();
  } catch (error) {
    console.error("Failed to refresh tracker after status change", error);
  }
});
grid.addEventListener("change", (event) => {
  const mobileStatusSelect = event.target.closest(".mobile-status-select");
  if (!mobileStatusSelect) {
    return;
  }

  const card = mobileStatusSelect.closest(".card");
  const id = card?.dataset.id;
  const status = mobileStatusSelect.value;
  if (!id || !status) {
    return;
  }

  activeOwnedCounterId = null;
  saveStatusChange(id, status);
  try {
    applyFilters();
  } catch (error) {
    console.error("Failed to refresh tracker after mobile status change", error);
  }
});
grid.addEventListener("mouseleave", () => {
  if (!activeOwnedCounterId) {
    return;
  }
  activeOwnedCounterId = null;
  applyFilters();
});
grid.addEventListener("pointermove", (event) => {
  if (!activeOwnedCounterId) {
    return;
  }

  const activeOwnedSlot = event.target.closest(".status-slot-owned");
  if (activeOwnedSlot?.dataset.itemId === activeOwnedCounterId) {
    return;
  }

  activeOwnedCounterId = null;
  applyFilters();
});
viewTabs.forEach((tab) => {
  tab.addEventListener("click", () => switchView(tab.dataset.view));
});
trackerBackToTopButton?.addEventListener("click", scrollTrackerBackToTop);
window.addEventListener("scroll", updateTrackerBackToTopVisibility, { passive: true });
hideViewButtons.forEach((button) => {
  button.addEventListener("click", () => setHideManagerView(button.dataset.hideView));
});
unhideVisibleSeriesButton?.addEventListener("click", () => {
  unhideVisibleSeries(sonnies, hideSearchInput.value.trim().toLowerCase());
});
unhideVisibleSonniesButton?.addEventListener("click", () => {
  unhideVisibleSonnies(sonnies, hideSearchInput.value.trim().toLowerCase());
});
openBugReportButton?.addEventListener("click", openBugReportPanel);
closeBugReportButton?.addEventListener("click", closeBugReportPanel);
cancelBugReportButton?.addEventListener("click", closeBugReportPanel);
supportRequestChoiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedKind = button.dataset.supportImageKind || "request_only";

    if (selectedKind === "bug_report") {
      supportPanelMode = "bug_report";
      supportPanelRequestedItem = null;
      supportImageRequestKind = "request_only";
      if (supportPhotoConsentInput) {
        supportPhotoConsentInput.checked = false;
      }
      if (bugReportImagesInput) {
        bugReportImagesInput.value = "";
      }
      renderBugUploadList();
      syncSupportPanelUi();
      focusSupportPanelPrimaryControl();
      return;
    }

    supportPanelMode = "image_request";
    supportImageRequestKind = selectedKind;
    trackSiteEvent("select_sonny_picture_request_mode", {
      mode: supportImageRequestKind,
      itemId: supportPanelRequestedItem?.id || "",
    });
    if (supportImageRequestKind !== "photo_submission" && supportPhotoConsentInput) {
      supportPhotoConsentInput.checked = false;
      if (bugReportImagesInput) {
        bugReportImagesInput.value = "";
      }
      renderBugUploadList();
    }
    syncSupportPanelUi();
  });
});
supportPhotoConsentInput?.addEventListener("change", () => {
  if (!supportPhotoConsentInput.checked && bugReportImagesInput) {
    bugReportImagesInput.value = "";
    renderBugUploadList();
  }
  syncSupportPanelUi();
});
bugReportImagesInput?.addEventListener("change", renderBugUploadList);
bugReportForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  renderBugUploadList();
  setBugReportSubmitting(true, currentSupportProgressLabel());

  try {
    const payload = await submitBugReport();
    const attachmentCount = Number(payload?.attachments || 0);
    trackSiteEvent(
      isImageRequestMode()
        ? (isPhotoSubmissionMode() ? "submit_sonny_photo_offer" : "submit_sonny_picture_request")
        : "submit_bug_report",
      {
        attachments: attachmentCount,
        itemId: supportPanelRequestedItem?.id || "",
      },
    );
    bugReportForm.reset();
    renderBugUploadList();
    resetSupportCaptcha();
    setBugReportSubmitting(
      false,
      isImageRequestMode()
        ? (isPhotoSubmissionMode()
            ? `Photo request sent to ${SUPPORT_EMAIL}${attachmentCount ? ` with ${attachmentCount} photo${attachmentCount === 1 ? "" : "s"}.` : "."}`
            : `Picture request sent to ${SUPPORT_EMAIL}.`)
        : `Bug report sent to ${SUPPORT_EMAIL}${attachmentCount ? ` with ${attachmentCount} screenshot${attachmentCount === 1 ? "" : "s"}.` : "."}`,
    );
    window.setTimeout(() => {
      closeBugReportPanel();
    }, 500);
  } catch (error) {
    setBugReportSubmitting(
      false,
      error?.message || "Could not send the bug report yet. Please try again.",
    );
  }
});
settingsSubtabs.forEach((tab) => {
  tab.addEventListener("click", () => switchSettingsView(tab.dataset.settingsView));
});
accountTrigger?.addEventListener("click", (event) => {
  event.stopPropagation();
  if (accountMenu?.hidden) {
    openAccountMenu();
  } else {
    closeAccountMenu();
  }
});
accountOpenModalButton?.addEventListener("click", () => {
  closeAccountMenu();
  openAccountModal();
});
settingsOpenAccountButton?.addEventListener("click", openAccountModal);
accountModalCloseButton?.addEventListener("click", closeAccountModal);
accountModalBackdrop?.addEventListener("click", closeAccountModal);
accountModalShell?.addEventListener("click", (event) => {
  const closeTarget = event.target.closest("#account-modal-close, #account-modal-backdrop");
  if (closeTarget) {
    closeAccountModal();
  }
});
accountOpenSettingsButton?.addEventListener("click", () => {
  switchView("settings");
  closeAccountMenu();
});
accountMenuSignOutButton?.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  signOutOfCloudSync();
});
mobileNavTrigger?.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  const isOpen = mobileNavWrap?.classList.contains("is-open");
  setMobileNavOpen(!isOpen);
});
wishlistControlsTrigger?.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  const isOpen = wishlistControlsMenu?.classList.contains("is-open");
  setWishlistControlsOpen(!isOpen);
});
wishlistStageMenuClose?.addEventListener("click", (event) => {
  event.preventDefault();
  wishlistStageMenu?.removeAttribute("open");
});
document.addEventListener("click", (event) => {
  const signOutTrigger = event.target.closest("#auth-sign-out, #account-menu-sign-out");
  if (signOutTrigger) {
    event.preventDefault();
    signOutOfCloudSync();
    return;
  }

  if (
    collectedSeriesMultiselect &&
    !collectedSeriesMultiselect.contains(event.target) &&
    collectedSeriesFilterPanel &&
    !collectedSeriesFilterPanel.hidden
  ) {
    collectedSeriesFilterPanel.hidden = true;
    collectedSeriesFilterButton?.setAttribute("aria-expanded", "false");
  }

  if (!accountMenuWrap?.contains(event.target)) {
    closeAccountMenu();
  }

  if (mobileNavWrap && !mobileNavWrap.contains(event.target)) {
    setMobileNavOpen(false);
  }

  if (wishlistControlsMenu && !wishlistControlsMenu.contains(event.target)) {
    setWishlistControlsOpen(false);
  }

  if (wishlistStageMenu && !wishlistStageMenu.contains(event.target)) {
    wishlistStageMenu.removeAttribute("open");
  }

  if (!event.target.closest(".wishlist-floating-item")) {
    wishlistFloatingGrid?.querySelectorAll(".wishlist-floating-item.is-controls-open").forEach((item) => {
      item.classList.remove("is-controls-open");
    });
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (collectedSeriesFilterPanel && !collectedSeriesFilterPanel.hidden) {
      collectedSeriesFilterPanel.hidden = true;
      collectedSeriesFilterButton?.setAttribute("aria-expanded", "false");
    }
    closeAccountMenu();
    closeAccountModal();
    setMobileNavOpen(false);
    setWishlistControlsOpen(false);
    wishlistStageMenu?.removeAttribute("open");
  }
});
window.addEventListener("focus", () => {
  verifySessionActive("checking your session");
});
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    verifySessionActive("checking your session");
  }
});
openIsoMakerButton?.addEventListener("click", openWishlistMaker);
makerSelectAllButton?.addEventListener("click", () => {
  makerDraftSelection = getWishlistMakerItems().map((item) => item.id);
  syncMakerSelectionCapacity();
  renderMakerPicker();
});
makerClearAllButton?.addEventListener("click", () => {
  makerDraftSelection = [];
  renderMakerPicker();
});
makerBuildButton?.addEventListener("click", showMakerCanvas);
makerEditSelectionButton?.addEventListener("click", showMakerSelection);
makerCloseButton?.addEventListener("click", closeWishlistMaker);
makerCloseCanvasButton?.addEventListener("click", closeWishlistMaker);
makerColumnsDownButton?.addEventListener("click", () => {
  makerColumns = Math.max(1, makerColumns - 1);
  syncMakerSelectionCapacity({ syncDraftFromApplied: true });
  renderMakerPicker();
  renderMakerArrangement();
  renderMakerCanvas();
});
makerColumnsUpButton?.addEventListener("click", () => {
  makerColumns = Math.min(10, makerColumns + 1);
  syncMakerSelectionCapacity({ syncDraftFromApplied: true });
  renderMakerPicker();
  renderMakerArrangement();
  renderMakerCanvas();
});
makerWidthDownButton?.addEventListener("click", () => {
  makerCanvasWidthInches = Math.max(1, makerCanvasWidthInches - 1);
  syncMakerSelectionCapacity({ syncDraftFromApplied: true });
  renderMakerPicker();
  renderMakerArrangement();
  renderMakerCanvas();
});
makerWidthUpButton?.addEventListener("click", () => {
  makerCanvasWidthInches = Math.min(20, makerCanvasWidthInches + 1);
  syncMakerSelectionCapacity({ syncDraftFromApplied: true });
  renderMakerPicker();
  renderMakerArrangement();
  renderMakerCanvas();
});
makerHeightDownButton?.addEventListener("click", () => {
  makerCanvasHeightInches = Math.max(1, makerCanvasHeightInches - 1);
  syncMakerSelectionCapacity({ syncDraftFromApplied: true });
  renderMakerPicker();
  renderMakerArrangement();
  renderMakerCanvas();
});
makerHeightUpButton?.addEventListener("click", () => {
  makerCanvasHeightInches = Math.min(20, makerCanvasHeightInches + 1);
  syncMakerSelectionCapacity({ syncDraftFromApplied: true });
  renderMakerPicker();
  renderMakerArrangement();
  renderMakerCanvas();
});
makerOrderSelect?.addEventListener("change", () => {
  makerOrderMode = makerOrderSelect.value;
  applyMakerOrdering();
  renderMakerArrangement();
  renderMakerCanvas();
});
makerLabelStyleSelect?.addEventListener("change", () => {
  makerLabelStyle = makerLabelStyleSelect.value;
  syncMakerSelectionCapacity({ syncDraftFromApplied: true });
  updateMakerLayoutControls();
  renderMakerPicker();
  renderMakerArrangement();
  renderMakerCanvas();
});
makerDisoEmojiInput?.addEventListener("input", () => {
  makerDisoEmoji = makerDisoEmojiInput.value || "💗";
  renderMakerCanvas();
});
makerIsoEmojiInput?.addEventListener("input", () => {
  makerIsoEmoji = makerIsoEmojiInput.value || "💙";
  renderMakerCanvas();
});
makerCustomCodeEnabledToggle?.addEventListener("change", () => {
  makerCustomCodeEnabled = makerCustomCodeEnabledToggle.checked;
  if (!makerCustomCodeEnabled) {
    makerCustomEmojiIds = [];
  }
  updateMakerLayoutControls();
  renderMakerArrangement();
  renderMakerCanvas();
});
makerCustomLabelNameInput?.addEventListener("input", () => {
  makerCustomLabelName = makerCustomLabelNameInput.value || "On the way";
  renderMakerCanvas();
});
makerCustomEmojiInput?.addEventListener("input", () => {
  makerCustomEmoji = makerCustomEmojiInput.value || "✨";
  renderMakerCanvas();
});
makerLayoutNameInput?.addEventListener("input", () => {
  makerLayoutName = makerLayoutNameInput.value || "";
  updateMakerSavedLayoutControls();
});
makerSaveNewButton?.addEventListener("click", () => {
  saveCurrentMakerLayout({ asNew: true });
});
makerSaveCurrentButton?.addEventListener("click", () => {
  saveCurrentMakerLayout();
});
makerNewDraftButton?.addEventListener("click", () => {
  startNewMakerLayoutDraft();
});
authMagicLinkButton?.addEventListener("click", () => {
  sendMagicLink();
});
authForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  signInWithPassword();
});
authSignInButton?.addEventListener("click", () => {
  signInWithPassword();
});
authSignUpButton?.addEventListener("click", () => {
  signUpWithPassword();
});
authSetPasswordButton?.addEventListener("click", () => {
  setPasswordForCurrentUser();
});
authRestoreBackupButton?.addEventListener("click", () => {
  restoreTrackerBackupFromFile();
});
authExportJsonButton?.addEventListener("click", () => {
  downloadTrackerBackupJson();
});
authSyncNowButton?.addEventListener("click", () => {
  syncProgressToCloud();
});
authImportLocalButton?.addEventListener("click", () => {
  importLocalProgressToCloud();
});
authSignOutButton?.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  signOutOfCloudSync();
});
resetButton.addEventListener("click", async () => {
  const previousProgress = { ...progress };
  let didReset = false;
  if (authState.user && authState.client) {
    try {
      await resetCloudProgress();
      progress = {};
      didReset = true;
      setAuthFeedback("Cloud tracker progress was reset for this account.");
    } catch (error) {
      progress = previousProgress;
      console.error("Failed to reset cloud tracker progress", error);
      setAuthFeedback("Could not reset your cloud progress right now.");
    }
  } else {
    progress = {};
    didReset = true;
    saveProgress();
  }
  if (didReset) {
    localStorage.removeItem(STORAGE_KEY);
  }
  reconcileMakerSelections({ reset: true });
  applyFilters();
});

init().catch((error) => {
  console.error("Tracker init failed", error);
  setAuthFeedback("The tracker loaded with a setup hiccup. Refresh and try again.");
});
