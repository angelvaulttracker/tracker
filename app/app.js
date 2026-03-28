const STORAGE_KEY = "sonny-angel-tracker-progress-v1";
const SETTINGS_STORAGE_KEY = "sonny-angel-tracker-settings-v1";
const RECOVERY_STORAGE_KEY = "sonny-angel-tracker-recovery-v1";
const STOCK_STORAGE_KEY = "sonny-stock-shelf-v1";
const TRACKER_STOCK_SEARCH_KEY = "tracker-stock-search-v1";
const TRACKER_STOCK_STATUS_KEY = "tracker-stock-status-v1";
const TRACKER_STOCK_SORT_KEY = "tracker-stock-sort-v1";
const TRACKER_STOCK_DISPLAY_KEY = "tracker-stock-display-v1";
const TRACKER_STOCK_DENSITY_KEY = "tracker-stock-density-v1";

const STATUS_RANK = {
  have: 0,
  iso: 1,
  diso: 2,
  missing: 3,
};

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
const wishlistMakerFlow = document.querySelector("#wishlist-maker-flow");
const openIsoMakerButton = document.querySelector("#open-iso-maker");
const wishlistLanding = document.querySelector("#wishlist-landing");
const wishlistLandingSummary = document.querySelector("#wishlist-landing-summary");
const wishlistLandingStage = document.querySelector(".wishlist-landing-stage");
const wishlistFloatingGrid = document.querySelector("#wishlist-floating-grid");
const wishlistLayoutEditButton = document.querySelector("#wishlist-layout-edit");
const wishlistLayoutResetButton = document.querySelector("#wishlist-layout-reset");
const wishlistLegendEditButton = document.querySelector("#wishlist-legend-edit");
const wishlistLandingLegend = document.querySelector("#wishlist-landing-legend");
const wishlistLegendEditor = document.querySelector("#wishlist-legend-editor");
const wishlistLegendEditorList = document.querySelector("#wishlist-legend-editor-list");
const wishlistLegendAddButton = document.querySelector("#wishlist-legend-add");
const wishlistSearch = document.querySelector("#wishlist-search");
const wishlistStatusFilter = document.querySelector("#wishlist-status-filter");
const wishlistSeriesFilter = document.querySelector("#wishlist-series-filter");
const wishlistSortFilter = document.querySelector("#wishlist-sort-filter");
const isoColumn = document.querySelector("#iso-column");
const disoColumn = document.querySelector("#diso-column");
const makerSelectionStep = document.querySelector("#maker-selection-step");
const makerCanvasStep = document.querySelector("#maker-canvas-step");
const makerPickerGrid = document.querySelector("#maker-picker-grid");
const makerSelectionCount = document.querySelector("#maker-selection-count");
const makerCanvasCount = document.querySelector("#maker-canvas-count");
const makerCanvas = document.querySelector("#maker-canvas");
const makerBackgroundGrid = document.querySelector("#maker-background-grid");
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
const bugReportNameInput = document.querySelector("#bug-report-name");
const bugReportContactInput = document.querySelector("#bug-report-contact");
const bugReportDescriptionInput = document.querySelector("#bug-report-description");
const bugReportImagesInput = document.querySelector("#bug-report-images");
const bugUploadList = document.querySelector("#bug-upload-list");
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

const BUG_REPORT_EMAIL = "angelvaulttracker@gmail.com";

let sonnies = [];
let progress = loadProgress();

const DEFAULT_WISHLIST_LEGEND_ITEMS = [
  { id: "iso", emoji: "✦", label: "ISO", tone: "iso" },
  { id: "diso", emoji: "♥", label: "DISO", tone: "diso" },
  { id: "low-prio", emoji: "★", label: "Low prio", tone: "buy" },
];

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

let settings = loadSettings();
let activeWishlistDrag = null;
let hideManagerView = "all";
let makerDraftSelection = [];
let makerAppliedSelection = [];
let makerBackground = "blush";
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
    const parsed = JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY) || "{}");
    return {
      hiddenSeries: Array.isArray(parsed.hiddenSeries) ? parsed.hiddenSeries : [],
      hiddenSonnies: Array.isArray(parsed.hiddenSonnies) ? parsed.hiddenSonnies : [],
      trackerColumns:
        ["4", "5", "6"].includes(String(parsed.trackerColumns))
          ? String(parsed.trackerColumns)
          : "4",
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
      wishlistLegendItems: normalizeWishlistLegendItems(parsed.wishlistLegendItems),
      wishlistLegendEditMode: Boolean(parsed.wishlistLegendEditMode),
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
  } catch {
    return {
      hiddenSeries: [],
      hiddenSonnies: [],
      trackerColumns: "4",
      collectedShelfGrouping: "all",
      collectedShelfDensity: "4",
      collectedArmyThreshold: "2",
      collectedArmiesView: "overview",
      activeView: "tracker",
      wishlistLandingEditMode: false,
      wishlistFloatingPositions: {},
      wishlistLegendItems: normalizeWishlistLegendItems([]),
      wishlistLegendEditMode: false,
      collectionFieldVisibility: { ...DEFAULT_COLLECTION_FIELD_VISIBILITY },
      collectedSeriesSelection: [],
      collectedShowMultipleSeparate: false,
      insightsColorCodeMode: true,
    };
  }
}

function saveSettings() {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
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
      createdAt: item.createdAt || new Date().toISOString(),
    }));
  } catch {
    return [];
  }
}

function saveLocalStockItems(items) {
  localStorage.setItem(STOCK_STORAGE_KEY, JSON.stringify(items));
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

    const cloudProgress = buildProgressFromCloudRows(data || []);
    const hasCloudProgress = Object.keys(cloudProgress).length > 0;
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

    if (!hasCloudProgress && hasFallbackProgress) {
      progress = fallbackProgress;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      applyFilters();
      setAuthFeedback("Your cloud tracker was empty, so this device's saved progress was restored and is being saved back to your account now.");
      setSaveState("syncing", "Restoring this device's tracker progress to your cloud account.");
      await syncProgressToCloud();
      setAuthFeedback("This device's tracker progress was restored to your cloud account.");
      setSaveState("saved", "Restored this device's tracker progress to your cloud account.");
      return;
    }

    progress = cloudProgress;
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

function openBugReportPanel() {
  bugReportPanel.hidden = false;
}

function closeBugReportPanel() {
  bugReportPanel.hidden = true;
}

function renderBugUploadList() {
  bugUploadList.innerHTML = "";
  const files = [...(bugReportImagesInput?.files || [])];

  if (!files.length) {
    bugUploadList.innerHTML =
      '<p class="wishlist-empty">No screenshots added yet.</p>';
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

function buildBugReportMailtoUrl() {
  const name = bugReportNameInput?.value.trim() || "";
  const contact = bugReportContactInput?.value.trim() || "";
  const description = bugReportDescriptionInput?.value.trim() || "";
  const files = [...(bugReportImagesInput?.files || [])];

  const subjectParts = ["Bug report"];
  if (name) {
    subjectParts.push(`from ${name}`);
  }

  const bodySections = [
    "Bug report details",
    "",
    `Name: ${name || "Not provided"}`,
    `Contact: ${contact || "Not provided"}`,
    "",
    "What happened:",
    description || "No description provided.",
  ];

  if (files.length) {
    bodySections.push(
      "",
      "Selected screenshots:",
      ...files.map((file) => `- ${file.name} (${Math.max(1, Math.round(file.size / 1024))} KB)`),
      "",
      "Please attach these screenshots manually before sending.",
    );
  }

  return `mailto:${BUG_REPORT_EMAIL}?subject=${encodeURIComponent(subjectParts.join(" "))}&body=${encodeURIComponent(bodySections.join("\n"))}`;
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
  if (override.isSecret || name.includes("secret") || likelySecretIds.has(item.id)) {
    badges.push("S");
  }
  if (override.isRobby || name.includes("robby")) {
    badges.push("R");
  }
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
    chip.className = `mini-badge mini-badge-${badge.toLowerCase()}`;
    chip.textContent = badge;
    container.append(chip);
  });
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

  return [...labelsByKey.values()].sort((a, b) => compareSeriesLabels(a, b));
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
  const trackerColumns = settings.trackerColumns || "4";
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
  details.append(rankField);
  container.append(fragment);
}

function renderWishlistLanding(items) {
  if (!wishlistLanding || !wishlistFloatingGrid) {
    return;
  }

  wishlistFloatingGrid.innerHTML = "";
  wishlistLanding.classList.toggle("is-editing", Boolean(settings.wishlistLandingEditMode));
  wishlistLanding.classList.toggle("is-editing-legend", Boolean(settings.wishlistLegendEditMode));
  if (wishlistLayoutEditButton) {
    wishlistLayoutEditButton.textContent = settings.wishlistLandingEditMode ? "Done editing" : "Edit layout";
    wishlistLayoutEditButton.classList.toggle("is-active", Boolean(settings.wishlistLandingEditMode));
  }
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
  const isoCountValue = items.filter((item) => getStatus(item.id) === "iso").length;
  const disoCountValue = items.filter((item) => getStatus(item.id) === "diso").length;

  if (wishlistLandingSummary) {
    wishlistLandingSummary.textContent = `${isoCountValue} ISO and ${disoCountValue} DISO Sonny${items.length === 1 ? "" : "s"} are floating here right now.`;
  }

  const floatingItems = [...items]
    .sort((left, right) => {
      return (
        compareDateDesc(getWishlistAddedAt(left.id), getWishlistAddedAt(right.id)) ||
        compareDateDesc(getCollectedAt(left.id), getCollectedAt(right.id)) ||
        compareText(displayName(left), displayName(right))
      );
    });

  const columns = Math.max(3, Math.min(6, Math.ceil(Math.sqrt(floatingItems.length / 1.35))));
  const rowCount = Math.max(1, Math.ceil(floatingItems.length / columns));
  const topPadding = 160;
  const rowGap = 210;
  const bottomPadding = 160;
  const maxCustomY = floatingItems.reduce((maxValue, item) => {
    const saved = settings.wishlistFloatingPositions?.[item.id];
    const numeric = Number(saved?.y || 0);
    return Number.isFinite(numeric) ? Math.max(maxValue, numeric) : maxValue;
  }, 0);
  const stageHeight = Math.max(topPadding + rowCount * rowGap + bottomPadding, maxCustomY + 220);
  wishlistLandingStage?.style.setProperty("--wishlist-stage-height", `${stageHeight}px`);
  wishlistFloatingGrid.style.setProperty("--wishlist-stage-height", `${stageHeight}px`);

  floatingItems.forEach((item, index) => {
    const row = Math.floor(index / columns);
    const column = index % columns;
    const xBase = ((column + 0.5) / columns) * 100;
    const xOffsetPattern = [-4.5, 2.5, -1.5, 3.5, -3, 1.5];
    const yOffsetPattern = [-18, 10, -8, 16, -12, 6];
    const rotatePattern = [-8, 5, -3, 7, -6, 4, -5, 3];
    const scalePattern = [1.02, 0.95, 1.06, 0.98, 0.93, 1.01, 0.97, 1.04];
    const x = `${Math.max(8, Math.min(92, xBase + xOffsetPattern[(row + column) % xOffsetPattern.length]))}%`;
    const y = `${topPadding + row * rowGap + yOffsetPattern[(index + row) % yOffsetPattern.length]}px`;
    const rotate = `${rotatePattern[index % rotatePattern.length]}deg`;
    const scale = String(scalePattern[index % scalePattern.length]);
    const saved = settings.wishlistFloatingPositions?.[item.id] || null;
    const floating = document.createElement("article");
    floating.className = `wishlist-floating-item is-${getStatus(item.id)}`;
    floating.dataset.sonnyId = item.id;
    floating.style.setProperty("--float-x", saved?.x || x);
    floating.style.setProperty("--float-y", saved?.y || y);
    floating.style.setProperty("--float-rotate", saved?.rotate || rotate);
    floating.style.setProperty("--float-scale", saved?.scale || scale);

    const art = document.createElement("div");
    art.className = "wishlist-floating-art";
    art.setAttribute("style", buildArtworkStyle(item));

    const badge = document.createElement("span");
    badge.className = "wishlist-floating-badge";
    badge.textContent = getStatus(item.id) === "diso" ? "♥" : "★";

    const chip = document.createElement("span");
    chip.className = "wishlist-floating-name";
    chip.textContent = displayName(item);

    if (settings.wishlistLandingEditMode) {
      const controls = document.createElement("div");
      controls.className = "wishlist-floating-rotate-controls";
      controls.addEventListener("pointerdown", (event) => {
        event.stopPropagation();
      });

      const rotateLeftButton = document.createElement("button");
      rotateLeftButton.type = "button";
      rotateLeftButton.className = "wishlist-rotate-button";
      rotateLeftButton.textContent = "↺";
      rotateLeftButton.addEventListener("pointerdown", (event) => {
        event.stopPropagation();
      });
      rotateLeftButton.addEventListener("click", (event) => {
        event.stopPropagation();
        event.preventDefault();
        adjustWishlistFloatingRotation(item.id, -5);
      });

      const rotateValue = document.createElement("span");
      rotateValue.className = "wishlist-rotate-value";
      rotateValue.textContent = (saved?.rotate || rotate).replace("deg", "") + "°";

      const rotateRightButton = document.createElement("button");
      rotateRightButton.type = "button";
      rotateRightButton.className = "wishlist-rotate-button";
      rotateRightButton.textContent = "↻";
      rotateRightButton.addEventListener("pointerdown", (event) => {
        event.stopPropagation();
      });
      rotateRightButton.addEventListener("click", (event) => {
        event.stopPropagation();
        event.preventDefault();
        adjustWishlistFloatingRotation(item.id, 5);
      });

      controls.append(rotateLeftButton, rotateValue, rotateRightButton);
      floating.append(controls);
    }

    floating.append(art, badge, chip);
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
  const nextValue = Math.max(-30, Math.min(30, currentValue + delta));
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

function startWishlistFloatingDrag(event) {
  if (!settings.wishlistLandingEditMode || !wishlistLandingStage) {
    return;
  }
  if (event.target.closest(".wishlist-floating-rotate-controls")) {
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

  const isoItems = sortItems(
    filteredWishlistItems.filter((item) => getStatus(item.id) === "iso"),
    sortMode,
  );
  const disoItems = sortItems(
    filteredWishlistItems.filter((item) => getStatus(item.id) === "diso"),
    sortMode,
  );

  renderWishlistLanding(filteredWishlistItems);

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

  reconcileMakerSelections();
  updateWishlistImmersiveState();
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

function getMakerItemsById() {
  return new Map(getWishlistMakerItems().map((item) => [item.id, item]));
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
  makerSelectionCount.textContent = `${count} selected`;
}

function reconcileMakerSelections(options = {}) {
  const { reset = false } = options;
  const wantedIds = new Set(getWishlistMakerItems().map((item) => item.id));

  makerDraftSelection = reset
    ? [...wantedIds]
    : makerDraftSelection.filter((id) => wantedIds.has(id));
  makerAppliedSelection = makerAppliedSelection.filter((id) => wantedIds.has(id));

  updateMakerSelectionCount();

  if (!wishlistMakerFlow.hidden) {
    applyMakerOrdering();
    renderMakerPicker();
    renderMakerArrangement();
    renderMakerCanvas();
  }
}

function openWishlistMaker() {
  makerDraftSelection = getWishlistMakerItems().map((item) => item.id);
  makerAppliedSelection = [...makerDraftSelection];
  makerBackground = "blush";
  makerColumns = 4;
  makerOrderMode = "custom";
  makerCanvasWidthInches = 8;
  makerCanvasHeightInches = 10;
  makerLabelStyle = "none";
  makerIsoEmoji = "💙";
  makerDisoEmoji = "💗";
  makerCustomCodeEnabled = false;
  makerCustomLabelName = "On the way";
  makerCustomEmoji = "✨";
  makerCustomEmojiIds = [];
  makerOrderSelect.value = makerOrderMode;
  updateMakerLayoutControls();
  wishlistBoardView.hidden = true;
  wishlistMakerFlow.hidden = false;
  makerSelectionStep.hidden = false;
  makerCanvasStep.hidden = true;
  renderMakerPicker();
  renderMakerCanvas();
}

function closeWishlistMaker() {
  wishlistBoardView.hidden = false;
  wishlistMakerFlow.hidden = true;
  makerSelectionStep.hidden = false;
  makerCanvasStep.hidden = true;
}

function showMakerCanvas() {
  makerAppliedSelection = [...makerDraftSelection];
  applyMakerOrdering();
  makerSelectionStep.hidden = true;
  makerCanvasStep.hidden = false;
  renderMakerBackgroundOptions();
  renderMakerArrangement();
  renderMakerCanvas();
}

function showMakerSelection() {
  makerSelectionStep.hidden = false;
  makerCanvasStep.hidden = true;
  renderMakerPicker();
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
    name.textContent = getCollectedCopyName(item, copyIndex);

    const statusPill = document.createElement("span");
    statusPill.className = `pill maker-picker-status pill-${getStatus(item.id)}`;
    statusPill.textContent = labelFor(getStatus(item.id));

    const selectionState = document.createElement("span");
    selectionState.className = "maker-picker-selection-state";

    function syncSelectionState() {
      const selected = input.checked;
      label.classList.toggle("is-selected", selected);
      label.classList.toggle("is-unselected", !selected);
      marker.textContent = selected ? "Selected" : "Skipped";
      selectionState.textContent = selected ? "Included in layout" : "Will not be included";
    }

    copy.append(series, name, statusPill);
    label.append(input, art, marker, copy, selectionState);
    syncSelectionState();

    input.addEventListener("change", () => {
      if (input.checked) {
        if (!makerDraftSelection.includes(item.id)) {
          makerDraftSelection.push(item.id);
        }
      } else {
        makerDraftSelection = makerDraftSelection.filter((id) => id !== item.id);
      }

      syncSelectionState();
      updateMakerSelectionCount();
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
    upButton.textContent = "Earlier";
    upButton.disabled = makerOrderMode !== "custom" || index === 0;
    upButton.addEventListener("click", () => moveMakerSelection(item.id, -1));

    const downButton = document.createElement("button");
    downButton.type = "button";
    downButton.className = "ghost-button maker-arrangement-button";
    downButton.textContent = "Later";
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
  const itemsById = getMakerItemsById();
  const selectedItems = makerAppliedSelection
    .map((id) => itemsById.get(id))
    .filter(Boolean);

  makerCanvasCount.textContent = `${selectedItems.length} Sonny${
    selectedItems.length === 1 ? "" : "s"
  } in layout`;
  makerCanvas.innerHTML = "";
  makerCanvas.style.setProperty("--maker-columns", String(makerColumns));
  makerCanvas.style.setProperty("--maker-canvas-width", `${makerCanvasWidthInches * 96}px`);
  makerCanvas.style.setProperty(
    "--maker-canvas-width-ratio",
    `${makerCanvasWidthInches} / ${makerCanvasHeightInches}`,
  );
  makerCanvas.dataset.background = makerBackground;
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
  meta.textContent = `${stockStatusLabel(stockItem.status)} • ${formatStockPrice(stockItem)} • Qty ${Math.max(1, Number(stockItem.quantity || 1))}`;

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
  body.append(series, name, meta, actions);
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
  tile.append(figure, price, name, actions);
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
  const match = String(item?.id || "").match(/^page-(\d+)-(\d+)-/);
  if (match) {
    return {
      page: Number(match[1]),
      slot: Number(match[2]),
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
    toggle.textContent = isCollectedEntryExpanded(item, key) ? "Hide details" : "Open details";
    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleCollectedEntryExpansion(item, key);
    });

    const actionRow = document.createElement("div");
    actionRow.className = "collected-action-row";
    actionRow.append(toggle);

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
  settings.activeView = view;
  saveSettings();
  document.body.classList.toggle("settings-active", view === "settings");
  document.body.classList.toggle("stock-active", view === "stock");
  document.body.classList.toggle("wishlist-active", view === "wishlist");
  if (view !== "wishlist") {
    document.body.classList.remove("wishlist-immersed");
  }
  viewTabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.view === view);
  });
  viewPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.panel === view);
  });
  if (view === "stock") {
    renderStockPanel();
  }
  requestAnimationFrame(updateWishlistImmersiveState);
}

function updateWishlistImmersiveState() {
  const isWishlistActive = document.body.classList.contains("wishlist-active");
  if (!isWishlistActive || !wishlistLanding) {
    document.body.classList.remove("wishlist-immersed");
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
  resultsCount.textContent = `${sorted.length} Sonny${
    sorted.length === 1 ? "" : "s"
  } showing`;
  renderGrid(sorted);
  renderStats(trackerItems);
  renderInsights(trackerItems);
  renderSeriesBrowser(trackerItems);
  renderWishlist();
  updateCollectedSeriesFilter(sonnies);
  renderCollected(sonnies);
  renderSettings();
  switchView(settings.activeView || "tracker");
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
    sourceNote.textContent = sourceLabel(item);

    buttons.forEach((button) => {
      const isActive = button.dataset.status === getStatus(item.id);
      button.classList.toggle("is-active", isActive);
    });

    const currentStatus = getStatus(item.id);
    const isOwned = currentStatus === "have";
    const ownedCount = getOwnedCount(item.id);
    card.dataset.status = currentStatus;
    if (ownedSlot) {
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
  syncTrackerColumnsPreference();
  inferredSeriesYearHints = buildInferredSeriesYearHints(sonnies);
  displaySeriesCache = new Map();
  likelySecretIds = buildLikelySecretIds(sonnies);
  updateMakerLayoutControls();
  updateSeriesFilter(sonnies);
  reconcileMakerSelections({ reset: true });
  renderBugUploadList();
  renderAuthState();
  applyFilters();
  renderStockPanel();
  await initializeSupabaseAuth();
}

searchInput.addEventListener("input", applyFilters);
statusFilter.addEventListener("change", applyFilters);
seriesFilter.addEventListener("change", applyFilters);
sortFilter.addEventListener("change", applyFilters);
trackerColumnsSelect?.addEventListener("change", () => {
  settings.trackerColumns = trackerColumnsSelect.value;
  saveSettings();
  syncTrackerColumnsPreference();
});
showOnlyFavorites.addEventListener("change", applyFilters);
wishlistSearch?.addEventListener("input", renderWishlist);
wishlistStatusFilter?.addEventListener("change", renderWishlist);
wishlistSeriesFilter?.addEventListener("change", renderWishlist);
wishlistSortFilter?.addEventListener("change", renderWishlist);
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
wishlistLandingStage?.addEventListener("pointermove", updateWishlistFloatingDragPosition);
wishlistLandingStage?.addEventListener("pointerup", endWishlistFloatingDrag);
wishlistLandingStage?.addEventListener("pointercancel", endWishlistFloatingDrag);
window.addEventListener("pointerup", endWishlistFloatingDrag);
window.addEventListener("pointercancel", endWishlistFloatingDrag);
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
viewTabs.forEach((tab) => {
  tab.addEventListener("click", () => switchView(tab.dataset.view));
});
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
bugReportImagesInput?.addEventListener("change", renderBugUploadList);
bugReportForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  renderBugUploadList();
  const description = bugReportDescriptionInput?.value.trim() || "";
  if (!description) {
    window.alert("Add a short description of the bug first so the email draft has enough context.");
    bugReportDescriptionInput?.focus();
    return;
  }
  window.location.href = buildBugReportMailtoUrl();
  bugReportForm.reset();
  renderBugUploadList();
  closeBugReportPanel();
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
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (collectedSeriesFilterPanel && !collectedSeriesFilterPanel.hidden) {
      collectedSeriesFilterPanel.hidden = true;
      collectedSeriesFilterButton?.setAttribute("aria-expanded", "false");
    }
    closeAccountMenu();
    closeAccountModal();
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
  renderMakerCanvas();
});
makerColumnsUpButton?.addEventListener("click", () => {
  makerColumns = Math.min(10, makerColumns + 1);
  renderMakerCanvas();
});
makerWidthDownButton?.addEventListener("click", () => {
  makerCanvasWidthInches = Math.max(1, makerCanvasWidthInches - 1);
  renderMakerCanvas();
});
makerWidthUpButton?.addEventListener("click", () => {
  makerCanvasWidthInches = Math.min(20, makerCanvasWidthInches + 1);
  renderMakerCanvas();
});
makerHeightDownButton?.addEventListener("click", () => {
  makerCanvasHeightInches = Math.max(1, makerCanvasHeightInches - 1);
  renderMakerCanvas();
});
makerHeightUpButton?.addEventListener("click", () => {
  makerCanvasHeightInches = Math.min(20, makerCanvasHeightInches + 1);
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
  updateMakerLayoutControls();
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
