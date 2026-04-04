const STOCK_STORAGE_KEY = "sonny-stock-shelf-local-v2";
const STOCK_STORAGE_MIRROR_KEY = "sonny-stock-shelf-local-mirror-v2";
const LEGACY_SHARED_STOCK_STORAGE_KEY = "sonny-stock-shelf-v1";
const FUND_STORAGE_KEY = "sonny-fund-v1";
const SHIPMENT_STORAGE_KEY = "sonny-shipment-plans-v1";
const SHIPMENT_TO_STOCK_RECOVERY_KEY = "sonny-shipment-stock-recovery-v1";
const ACTIVITY_LOG_STORAGE_KEY = "sonny-activity-log-v1";
const TRACKER_PROGRESS_STORAGE_KEY = "sonny-angel-tracker-progress-v1";
const LAST_BACKUP_STORAGE_KEY = "sonny-last-backup-v1";
const ACTIVE_VIEW_KEY = "sonny-stock-active-view-v1";
const FUND_FILTER_KEY = "sonny-fund-filter-v1";
const FUND_SORT_KEY = "sonny-fund-sort-v1";
const ACTIVE_SHIPMENT_KEY = "sonny-active-shipment-v1";
const STOCK_FILTER_STORAGE_KEY = "sonny-stock-filter-v1";
const STOCK_KIND_FILTER_STORAGE_KEY = "sonny-stock-kind-filter-v1";
const STOCK_SORT_STORAGE_KEY = "sonny-stock-sort-v1";
const ACTIVITY_FILTER_STORAGE_KEY = "sonny-activity-filter-v1";
const PRICE_HISTORY_STORAGE_KEY = "sonny-price-history-v1";
const STOCK_DISPLAY_STORAGE_KEY = "sonny-stock-display-v1";
const STOCK_CARD_DENSITY_STORAGE_KEY = "sonny-stock-card-density-v1";
const STOCK_SETTINGS_STORAGE_KEY = "sonny-stock-settings-v1";
const SHIPMENT_SELECTION_STORAGE_KEY = "sonny-shipment-selection-v1";
const STOCK_MESSAGE_DRAFT_STORAGE_KEY = "sonny-stock-message-draft-v1";
const FUND_STARTING_BALANCE = 5000;
const MAX_ACTIVITY_ITEMS = 300;

const imageMap = window.SONNY_IMAGE_MAP || {};
const manualOverrides = window.SONNY_MANUAL_OVERRIDES || {};
const manualItemOverrides = manualOverrides.items || {};
const rawCatalog = window.SONNIES_DATA || [];
const IMAGE_CACHE_BUSTER = "20260316-robby-refresh";
const trimmedShelfImageCache = new Map();

function withImageVersion(path) {
  if (!path) {
    return "";
  }
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}v=${IMAGE_CACHE_BUSTER}`;
}

const stockCatalog = rawCatalog
  .map((item) => {
    const override = manualItemOverrides[item.id] || {};
    const mapped = imageMap[item.id] || {};
    const name = override.name || mapped.catalogName || item.name;
    const series = override.series || mapped.catalogSeries || item.series;
    const imagePath = withImageVersion(override.artPath || mapped.path || "");
    return {
      id: item.id,
      name,
      series,
      imagePath,
      label: `${name} - ${series}`,
    };
  })
  .sort((a, b) => a.label.localeCompare(b.label));

const catalogByLabel = new Map(stockCatalog.map((item) => [item.label.toLowerCase(), item]));
const catalogByNormalizedName = new Map();

stockCatalog.forEach((item) => {
  const normalized = normalizeText(item.name);
  if (!normalized) {
    return;
  }
  if (!catalogByNormalizedName.has(normalized)) {
    catalogByNormalizedName.set(normalized, item);
  }
});

const DEFAULT_STOCK = [
  { id: crypto.randomUUID(), sonnyId: "", name: "sun", series: "", price: 25.0 },
  { id: crypto.randomUUID(), sonnyId: "", name: "sonny angel dolphin", series: "", price: 9.5 },
  { id: crypto.randomUUID(), sonnyId: "", name: "sonny angel skiploom", series: "", price: 16.0 },
  { id: crypto.randomUUID(), sonnyId: "", name: "zebra", series: "", price: 9.5 },
  { id: crypto.randomUUID(), sonnyId: "", name: "whale", series: "", price: 9.5 },
  { id: crypto.randomUUID(), sonnyId: "", name: "macaw", series: "", price: 9.5 },
  { id: crypto.randomUUID(), sonnyId: "", name: "sonny angel buffalo", series: "", price: 9.5 },
  { id: crypto.randomUUID(), sonnyId: "", name: "flower gift", series: "", price: 16.0 },
  { id: crypto.randomUUID(), sonnyId: "", name: "tiger", series: "", price: 9.5 },
  { id: crypto.randomUUID(), sonnyId: "", name: "skiplum", series: "", price: 16.0 },
  { id: crypto.randomUUID(), sonnyId: "", name: "yellow gummy", series: "", price: 17.0 },
  { id: crypto.randomUUID(), sonnyId: "", name: "chimpunk hipper", series: "", price: 13.0 },
  { id: crypto.randomUUID(), sonnyId: "", name: "flower gift", series: "", price: 16.0 },
  { id: crypto.randomUUID(), sonnyId: "", name: "macaw", series: "", price: 9.5 },
  { id: crypto.randomUUID(), sonnyId: "", name: "cucumber", series: "", price: 6.0 },
  { id: crypto.randomUUID(), sonnyId: "", name: "kompeito", series: "", price: 9.5 },
  { id: crypto.randomUUID(), sonnyId: "", name: "koala hipper", series: "", price: 10.0 },
  { id: crypto.randomUUID(), sonnyId: "", name: "zebra", series: "", price: 7.0 },
  { id: crypto.randomUUID(), sonnyId: "", name: "kompeito", series: "", price: 9.5 },
];

const DEFAULT_FUND_TRANSACTIONS = [
  { id: crypto.randomUUID(), label: "ebay lot (apple card)", amount: 96.76, amountMode: "total", sonnyIds: [], figurePrice: 0, shipping: 0, person: "", sentToRealFund: false, type: "out", date: "2025-10-20" },
  { id: crypto.randomUUID(), label: "sonny chick", amount: 21.17, amountMode: "total", sonnyIds: [], figurePrice: 0, shipping: 0, person: "", sentToRealFund: false, type: "out", date: "2025-11-06" },
  { id: crypto.randomUUID(), label: "robby", amount: 51.27, amountMode: "total", sonnyIds: [], figurePrice: 0, shipping: 0, person: "", sentToRealFund: false, type: "out", date: "2025-11-18" },
  { id: crypto.randomUUID(), label: "fennec fox", amount: 42.0, amountMode: "total", sonnyIds: [], figurePrice: 0, shipping: 0, person: "", sentToRealFund: false, type: "out", date: "2025-12-02" },
  { id: crypto.randomUUID(), label: "wasa + rabbit", amount: 310.0, amountMode: "total", sonnyIds: [], figurePrice: 0, shipping: 0, person: "", sentToRealFund: false, type: "out", date: "2025-12-14" },
  { id: crypto.randomUUID(), label: "bofa", amount: 460.53, amountMode: "total", sonnyIds: [], figurePrice: 0, shipping: 0, person: "", sentToRealFund: false, type: "out", date: "2025-12-27" },
  { id: crypto.randomUUID(), label: "apple card reponer rammen", amount: 102.0, amountMode: "total", sonnyIds: [], figurePrice: 0, shipping: 0, person: "", sentToRealFund: false, type: "out", date: "2026-01-05" },
  { id: crypto.randomUUID(), label: "lo que no se ha vendido del otro lot (apple card)", amount: 266.0, amountMode: "total", sonnyIds: [], figurePrice: 0, shipping: 0, person: "", sentToRealFund: false, type: "out", date: "2026-01-18" },
  { id: crypto.randomUUID(), label: "sonny angels nyc", amount: 315.0, amountMode: "total", sonnyIds: [], figurePrice: 0, shipping: 0, person: "", sentToRealFund: false, type: "out", date: "2026-02-03" },
  { id: crypto.randomUUID(), label: "wire rameen", amount: 670.7, amountMode: "total", sonnyIds: [], figurePrice: 0, shipping: 0, person: "", sentToRealFund: false, type: "out", date: "2026-02-11" },
  { id: crypto.randomUUID(), label: "rameen japan sonny angels", amount: 337.96, amountMode: "total", sonnyIds: [], figurePrice: 0, shipping: 0, person: "", sentToRealFund: false, type: "out", date: "2026-02-24" },
  { id: crypto.randomUUID(), label: "jordana", amount: 36.0, amountMode: "total", sonnyIds: [], figurePrice: 0, shipping: 0, person: "", sentToRealFund: false, type: "out", date: "2026-03-01" },
  { id: crypto.randomUUID(), label: "lot de sonnies con clown sheep", amount: 51.0, amountMode: "total", sonnyIds: [], figurePrice: 0, shipping: 0, person: "", sentToRealFund: false, type: "out", date: "2026-03-03" },
  { id: crypto.randomUUID(), label: "cactus monkey", amount: 37.0, amountMode: "total", sonnyIds: [], figurePrice: 0, shipping: 0, person: "", sentToRealFund: false, type: "out", date: "2026-03-08" },
  { id: crypto.randomUUID(), label: "hsh sheep", amount: 41.0, amountMode: "total", sonnyIds: [], figurePrice: 0, shipping: 0, person: "", sentToRealFund: false, type: "out", date: "2026-03-10" },
  { id: crypto.randomUUID(), label: "i sold 300", amount: 300.0, amountMode: "total", sonnyIds: [], figurePrice: 0, shipping: 0, person: "", sentToRealFund: false, type: "in", date: "2026-03-12" },
  { id: crypto.randomUUID(), label: "white ghost", amount: 38.0, amountMode: "total", sonnyIds: [], figurePrice: 0, shipping: 0, person: "", sentToRealFund: false, type: "out", date: "2026-03-13" },
];

const DEFAULT_SHIPMENTS = [
  {
    presetKey: "rameen-mar-13",
    id: crypto.randomUUID(),
    name: "Rameen Mar 13",
    cost: 705,
    items: [
      { id: crypto.randomUUID(), name: "chef", sellPrice: 150, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "bee", sellPrice: 0, keepPrice: 100 },
      { id: crypto.randomUUID(), name: "christmas bear", sellPrice: 0, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "christmas robby", sellPrice: 0, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "turtle", sellPrice: 120, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "yellow robby", sellPrice: 55, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "purple robby", sellPrice: 0, keepPrice: 55 },
      { id: crypto.randomUUID(), name: "elephant", sellPrice: 0, keepPrice: 30 },
      { id: crypto.randomUUID(), name: "squirrel", sellPrice: 90, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "christmas stuffed robby", sellPrice: 35, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "chocolate fawn", sellPrice: 20, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "wink keychain secret", sellPrice: 70, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "sprout hipper", sellPrice: 110, keepPrice: 0 },
    ],
  },
  {
    presetKey: "rameen-big-lot",
    id: crypto.randomUUID(),
    name: "Rameen Big Lot",
    cost: 1465,
    items: [
      { id: crypto.randomUUID(), name: "cactus monkey", sellPrice: 45, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "cactus parrot", sellPrice: 15, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "cactus rabbit", sellPrice: 30, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "cactus secret", sellPrice: 0, keepPrice: 60 },
      { id: crypto.randomUUID(), name: "cactus mouse", sellPrice: 0, keepPrice: 30 },
      { id: crypto.randomUUID(), name: "mt fuji", sellPrice: 40, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "ebisuten", sellPrice: 18, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "raccoon dog", sellPrice: 30, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "guardian dog", sellPrice: 25, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "lucky cat", sellPrice: 67, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "red daruma", sellPrice: 30, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "jgl robby", sellPrice: 0, keepPrice: 130 },
      { id: crypto.randomUUID(), name: "golden cat", sellPrice: 0, keepPrice: 90 },
      { id: crypto.randomUUID(), name: "unrefined cat", sellPrice: 0, keepPrice: 15 },
      { id: crypto.randomUUID(), name: "unrefined dog", sellPrice: 0, keepPrice: 10 },
      { id: crypto.randomUUID(), name: "unrefined seal", sellPrice: 0, keepPrice: 25 },
      { id: crypto.randomUUID(), name: "unrefined brown duck", sellPrice: 0, keepPrice: 25 },
      { id: crypto.randomUUID(), name: "unrefined white duck", sellPrice: 25, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "unrefined white bear", sellPrice: 30, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "unrefined bamboo", sellPrice: 15, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "blue sheep", sellPrice: 0, keepPrice: 45 },
      { id: crypto.randomUUID(), name: "orange mouse", sellPrice: 30, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "green giraffe", sellPrice: 25, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "yellow pig", sellPrice: 0, keepPrice: 30 },
      { id: crypto.randomUUID(), name: "white rhino", sellPrice: 45, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "green fawn", sellPrice: 25, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "purple ouribou", sellPrice: 0, keepPrice: 30 },
      { id: crypto.randomUUID(), name: "pink racoon", sellPrice: 0, keepPrice: 45 },
      { id: crypto.randomUUID(), name: "purple cow", sellPrice: 0, keepPrice: 200 },
      { id: crypto.randomUUID(), name: "pink reindeer", sellPrice: 20, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "blue bear", sellPrice: 0, keepPrice: 30 },
      { id: crypto.randomUUID(), name: "pink parrot?", sellPrice: 25, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "yellow whale", sellPrice: 30, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "reef whale", sellPrice: 0, keepPrice: 30 },
      { id: crypto.randomUUID(), name: "pink whale", sellPrice: 0, keepPrice: 30 },
      { id: crypto.randomUUID(), name: "blue whale", sellPrice: 30, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "green whale", sellPrice: 30, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "sunset whale w gogglesss", sellPrice: 0, keepPrice: 60 },
      { id: crypto.randomUUID(), name: "green penguin", sellPrice: 27, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "gray penguin", sellPrice: 27, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "blue penguin", sellPrice: 27, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "pink penguin", sellPrice: 0, keepPrice: 27 },
      { id: crypto.randomUUID(), name: "purple penguin", sellPrice: 0, keepPrice: 27 },
      { id: crypto.randomUUID(), name: "turquoise penguin", sellPrice: 27, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "sunset shorts", sellPrice: 37, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "purple shorts", sellPrice: 0, keepPrice: 35 },
      { id: crypto.randomUUID(), name: "reef shorts", sellPrice: 0, keepPrice: 35 },
      { id: crypto.randomUUID(), name: "green shorts", sellPrice: 35, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "yellow shorts", sellPrice: 35, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "watermelon shorts", sellPrice: 0, keepPrice: 40 },
      { id: crypto.randomUUID(), name: "fennec fox", sellPrice: 35, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "je t'aime", sellPrice: 0, keepPrice: 60 },
      { id: crypto.randomUUID(), name: "te amo", sellPrice: 0, keepPrice: 150 },
      { id: crypto.randomUUID(), name: "mol mouse", sellPrice: 0, keepPrice: 90 },
      { id: crypto.randomUUID(), name: "mol rabbit", sellPrice: 0, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "mol dalmatian", sellPrice: 0, keepPrice: 90 },
      { id: crypto.randomUUID(), name: "mt fuji", sellPrice: 40, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "racoon dog", sellPrice: 30, keepPrice: 0 },
      { id: crypto.randomUUID(), name: "red daruma", sellPrice: 30, keepPrice: 0 },
    ],
  },
];

const summaryGrid = document.querySelector("#summary-grid");
const stockSaveStatusPill = document.querySelector("#stock-save-status-pill");
const stockSaveStatusCopy = document.querySelector("#stock-save-status-copy");
const inventoryGrid = document.querySelector("#inventory-grid");
const fundList = document.querySelector("#fund-list");
const shipmentList = document.querySelector("#shipment-list");
const shipmentEditor = document.querySelector("#shipment-editor");
const shipmentPlanTitle = document.querySelector("#shipment-plan-title");
const shipmentPlanCopy = document.querySelector("#shipment-plan-copy");
const activityList = document.querySelector("#activity-list");
const stockSearchInput = document.querySelector("#stock-search");
const stockStatusFilter = document.querySelector("#stock-status-filter");
const stockKindFilter = document.querySelector("#stock-kind-filter");
const stockSortSelect = document.querySelector("#stock-sort");
const stockDisplayToggle = document.querySelector("#stock-display-toggle");
const stockCardDensitySelect = document.querySelector("#stock-card-density");
const stockResultsCount = document.querySelector("#stock-results-count");
const buildStockMessageButton = document.querySelector("#build-stock-message");
const copyStockMessageButton = document.querySelector("#copy-stock-message");
const stockMessageStatus = document.querySelector("#stock-message-status");
const stockMessageOutput = document.querySelector("#stock-message-output");
const useFundInput = document.querySelector("#setting-use-fund");
const allowTradeValuesInput = document.querySelector("#setting-allow-trade-values");
const includeTradeValuesInput = document.querySelector("#setting-include-trade-values");
const resetSettingsViewButton = document.querySelector("#reset-settings-view");
const fundTabButton = document.querySelector('[data-view-target="fund"]');
const stockAuthForm = document.querySelector("#stock-auth-form");
const stockAuthStatusTitle = document.querySelector("#stock-auth-status-title");
const stockAuthStatusCopy = document.querySelector("#stock-auth-status-copy");
const stockAuthStatusPill = document.querySelector("#stock-auth-status-pill");
const stockAuthEmailInput = document.querySelector("#stock-auth-email");
const stockAuthPasswordInput = document.querySelector("#stock-auth-password");
const stockAuthMagicLinkButton = document.querySelector("#stock-auth-magic-link");
const stockAuthSignInButton = document.querySelector("#stock-auth-sign-in");
const stockAuthSignUpButton = document.querySelector("#stock-auth-sign-up");
const stockAuthSyncNowButton = document.querySelector("#stock-auth-sync-now");
const stockAuthImportLocalButton = document.querySelector("#stock-auth-import-local");
const stockAuthSignOutButton = document.querySelector("#stock-auth-sign-out");
const stockAuthFeedback = document.querySelector("#stock-auth-feedback");
const exportFullBackupButton = document.querySelector("#export-full-backup");
const importFullBackupButton = document.querySelector("#import-full-backup");
const importFullBackupInput = document.querySelector("#import-full-backup-input");
const exportActivityLogButton = document.querySelector("#export-activity-log");
const activitySearchInput = document.querySelector("#activity-search");
const activityKindFilter = document.querySelector("#activity-kind-filter");
const lastBackupStatus = document.querySelector("#last-backup-status");
const stockCatalogSearch = document.querySelector("#stock-catalog-search");
const stockCatalogOptions = document.querySelector("#stock-catalog-options");
const stockCatalogPreview = document.querySelector("#stock-catalog-preview");
const stockCatalogPreviewArt = document.querySelector(".catalog-preview-art");
const stockCatalogPreviewCopy = document.querySelector(".catalog-preview-copy");
const newPriceInput = document.querySelector("#new-price");
const newQuantityInput = document.querySelector("#new-quantity");
const fundNoteInput = document.querySelector("#fund-note");
const fundAmountLabel = document.querySelector("#fund-amount-label");
const fundAmountInput = document.querySelector("#fund-amount");
const fundSonniesInput = document.querySelector("#fund-sonnies");
const fundSonnyPreviewList = document.querySelector("#fund-sonny-preview-list");
const fundShippingInput = document.querySelector("#fund-shipping");
const fundPersonInput = document.querySelector("#fund-person");
const fundPaidViaInput = document.querySelector("#fund-paid-via");
const fundTypeInput = document.querySelector("#fund-type");
const fundDateInput = document.querySelector("#fund-date");
const fundSentToRealFundInput = document.querySelector("#fund-sent-to-real-fund");
const fundSentToRealFundLabel = document.querySelector("#fund-sent-to-real-fund-label");
const fundRangeFilter = document.querySelector("#fund-range-filter");
const fundSortSelect = document.querySelector("#fund-sort");
const shipmentNameInput = document.querySelector("#shipment-name");
const shipmentCostInput = document.querySelector("#shipment-cost");
const heroTitle = document.querySelector("#hero-title");
const heroCopy = document.querySelector("#hero-copy");
const resetButton = document.querySelector("#reset-active-view");
const addForm = document.querySelector("#add-stock-form");
const addFundForm = document.querySelector("#add-fund-form");
const addShipmentForm = document.querySelector("#add-shipment-form");
const viewTabs = document.querySelectorAll(".view-tab");
const viewPanels = {
  stock: document.querySelector("#stock-view"),
  fund: document.querySelector("#fund-view"),
  shipments: document.querySelector("#shipments-view"),
  logs: document.querySelector("#logs-view"),
  settings: document.querySelector("#settings-view"),
};

const cardTemplate = document.querySelector("#stock-card-template");
const fundRowTemplate = document.querySelector("#fund-row-template");
const shipmentListItemTemplate = document.querySelector("#shipment-list-item-template");
const shipmentItemTemplate = document.querySelector("#shipment-item-template");
const activityItemTemplate = document.querySelector("#activity-item-template");

let stock = loadStock();
let fundTransactions = loadFundTransactions();
let shipments = loadShipments();
let activityLog = loadActivityLog();
let activeView = loadActiveView();
let fundFilter = loadFundFilter();
let fundSort = loadFundSort();
let activeShipmentId = loadActiveShipmentId();
let stockSearch = loadStockSearch();
let stockStatus = loadStockStatus();
let stockKind = loadStockKind();
let stockSort = loadStockSort();
let stockDisplayMode = loadStockDisplayMode();
let stockCardDensity = loadStockCardDensity();
let stockSettings = loadStockSettings();
let activitySearch = loadActivitySearch();
let activityKind = loadActivityKind();
let priceHistory = loadPriceHistory();
let stockMessageDraft = loadStockMessageDraft();
let expandedHistoryItemId = "";
let expandedShipmentHistoryItemId = "";
let selectedShipmentSelections = loadShipmentSelections();
const supabaseConfig = window.SONNY_SUPABASE_CONFIG || {};
const stockAuthState = {
  client: null,
  user: null,
  configured: false,
  syncing: false,
  hydrating: false,
  stockTimer: null,
  fundTimer: null,
  activityTimer: null,
  sessionCheckTimer: null,
};

function displayNameForId(sonnyId, fallbackName = "") {
  const match = stockCatalog.find((item) => item.id === sonnyId);
  return match?.name || fallbackName;
}

function displaySeriesForId(sonnyId, fallbackSeries = "") {
  const match = stockCatalog.find((item) => item.id === sonnyId);
  return match?.series || fallbackSeries;
}

function displayImageForId(sonnyId) {
  const match = stockCatalog.find((item) => item.id === sonnyId);
  return match?.imagePath || "";
}

function trimTransparentImage(path) {
  if (!path) {
    return Promise.resolve({ src: "", aspectRatio: 1 });
  }

  if (trimmedShelfImageCache.has(path)) {
    return Promise.resolve(trimmedShelfImageCache.get(path));
  }

  return new Promise((resolve) => {
    const sourceImage = new Image();
    sourceImage.decoding = "async";
    sourceImage.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = sourceImage.naturalWidth;
        canvas.height = sourceImage.naturalHeight;
        const context = canvas.getContext("2d", { willReadFrequently: true });
        if (!context) {
          const fallback = {
            src: path,
            aspectRatio: sourceImage.naturalWidth / Math.max(sourceImage.naturalHeight, 1),
          };
          trimmedShelfImageCache.set(path, fallback);
          resolve(fallback);
          return;
        }

        context.drawImage(sourceImage, 0, 0);
        const { data, width, height } = context.getImageData(0, 0, canvas.width, canvas.height);
        let top = height;
        let right = 0;
        let bottom = 0;
        let left = width;

        for (let y = 0; y < height; y += 1) {
          for (let x = 0; x < width; x += 1) {
            const alpha = data[(y * width + x) * 4 + 3];
            if (alpha === 0) {
              continue;
            }
            if (x < left) {
              left = x;
            }
            if (x > right) {
              right = x;
            }
            if (y < top) {
              top = y;
            }
            if (y > bottom) {
              bottom = y;
            }
          }
        }

        if (left > right || top > bottom) {
          const fallback = {
            src: path,
            aspectRatio: sourceImage.naturalWidth / Math.max(sourceImage.naturalHeight, 1),
          };
          trimmedShelfImageCache.set(path, fallback);
          resolve(fallback);
          return;
        }

        const trimWidth = right - left + 1;
        const trimHeight = bottom - top + 1;
        const trimmedCanvas = document.createElement("canvas");
        trimmedCanvas.width = trimWidth;
        trimmedCanvas.height = trimHeight;
        const trimmedContext = trimmedCanvas.getContext("2d");
        if (!trimmedContext) {
          const fallback = {
            src: path,
            aspectRatio: trimWidth / Math.max(trimHeight, 1),
          };
          trimmedShelfImageCache.set(path, fallback);
          resolve(fallback);
          return;
        }

        trimmedContext.drawImage(canvas, left, top, trimWidth, trimHeight, 0, 0, trimWidth, trimHeight);
        const trimmedAsset = {
          src: trimmedCanvas.toDataURL("image/png"),
          aspectRatio: trimWidth / Math.max(trimHeight, 1),
        };
        trimmedShelfImageCache.set(path, trimmedAsset);
        resolve(trimmedAsset);
      } catch {
        const fallback = {
          src: path,
          aspectRatio: sourceImage.naturalWidth / Math.max(sourceImage.naturalHeight, 1),
        };
        trimmedShelfImageCache.set(path, fallback);
        resolve(fallback);
      }
    };
    sourceImage.onerror = () => {
      const fallback = { src: path, aspectRatio: 1 };
      trimmedShelfImageCache.set(path, fallback);
      resolve(fallback);
    };
    sourceImage.src = path;
  });
}

function hydrateShelfFigureImage(imageElement, path) {
  if (!imageElement || !path) {
    return;
  }

  imageElement.dataset.sourcePath = path;
  trimTransparentImage(path).then(({ src, aspectRatio }) => {
    if (imageElement.dataset.sourcePath !== path) {
      return;
    }
    imageElement.src = src || path;
    imageElement.classList.toggle("is-wide", aspectRatio > 0.82);
    imageElement.classList.toggle("is-extra-wide", aspectRatio > 1.05);
  });
}

function catalogLabelForItem(item) {
  return `${item.name} - ${item.series}`;
}

function resolveCatalogSelectionValue(value) {
  return catalogByLabel.get(String(value || "").trim().toLowerCase()) || null;
}

function parseFundSonnySelection(value) {
  return Array.from(
    new Set(
      String(value || "")
        .split(",")
        .map((part) => resolveCatalogSelectionValue(part))
        .filter(Boolean)
        .map((item) => item.id),
    ),
  );
}

function getFundSonnyIds(inputElement) {
  if (!inputElement?.dataset.selectedSonnyIds) {
    return [];
  }

  try {
    const saved = JSON.parse(inputElement.dataset.selectedSonnyIds);
    return Array.isArray(saved) ? Array.from(new Set(saved.filter(Boolean).map(String))) : [];
  } catch {
    return [];
  }
}

function setFundSonnyIds(inputElement, sonnyIds) {
  if (!inputElement) {
    return;
  }
  inputElement.dataset.selectedSonnyIds = JSON.stringify(Array.from(new Set((sonnyIds || []).filter(Boolean).map(String))));
}

function normalizeFundSonnyPriceMap(priceMap, sonnyIds = [], fallbackPrice = 0) {
  const allowedIds = new Set((sonnyIds || []).filter(Boolean).map(String));
  const normalized = {};
  if (priceMap && typeof priceMap === "object") {
    Object.entries(priceMap).forEach(([sonnyId, value]) => {
      if (!allowedIds.has(String(sonnyId))) {
        return;
      }
      const amount = Number(value);
      if (Number.isFinite(amount) && amount > 0) {
        normalized[String(sonnyId)] = amount;
      }
    });
  }
  const safeFallback = Number(fallbackPrice);
  if (Object.keys(normalized).length === 0 && Number.isFinite(safeFallback) && safeFallback > 0) {
    allowedIds.forEach((sonnyId) => {
      normalized[sonnyId] = safeFallback;
    });
  }
  return normalized;
}

function getFundSonnyPriceMap(inputElement) {
  if (!inputElement?.dataset.selectedSonnyPrices) {
    return {};
  }
  try {
    const saved = JSON.parse(inputElement.dataset.selectedSonnyPrices);
    return saved && typeof saved === "object" ? saved : {};
  } catch {
    return {};
  }
}

function setFundSonnyPriceMap(inputElement, priceMap) {
  if (!inputElement) {
    return;
  }
  inputElement.dataset.selectedSonnyPrices = JSON.stringify(priceMap && typeof priceMap === "object" ? priceMap : {});
}

function commonFundSonnyPrice(sonnyIds = [], priceMap = {}) {
  const prices = sonnyIds
    .map((sonnyId) => Number(priceMap?.[sonnyId]))
    .filter((amount) => Number.isFinite(amount) && amount > 0);
  if (!prices.length || prices.length !== sonnyIds.length) {
    return null;
  }
  return prices.every((amount) => amount === prices[0]) ? prices[0] : null;
}

function formatFundSonnySelection(sonnyIds = []) {
  return sonnyIds
    .map((sonnyId) => stockCatalog.find((item) => item.id === sonnyId))
    .filter(Boolean)
    .map((item) => catalogLabelForItem(item))
    .join(", ");
}

function fundRealToggleLabel(type) {
  return type === "out" ? "Removed from real fund?" : "Sent to real fund?";
}

function normalizeFundAmountMode() {
  return "total";
}

function fundTransactionTotal(item) {
  return Number(item.amount) || 0;
}

function fundTransactionShipping(item) {
  return Math.max(0, Number(item.shipping) || 0);
}

function fundTransactionNetContribution(item) {
  const total = fundTransactionTotal(item);
  const shipping = fundTransactionShipping(item);
  return item.type === "out" ? -(total + shipping) : total - shipping;
}

function renderFundSonnyPreview(previewElement, sonnyIds = [], priceMap = {}) {
  if (!previewElement) {
    return;
  }

  const matchedItems = sonnyIds
    .map((sonnyId) => stockCatalog.find((item) => item.id === sonnyId))
    .filter(Boolean);

  if (!matchedItems.length) {
    previewElement.innerHTML = "";
    return;
  }

  previewElement.innerHTML = matchedItems
    .map((item) => {
      const imagePath = item.imagePath || "";
      const salePrice = Number(priceMap?.[item.id]);
      return `
        <span class="fund-sonny-chip" title="${item.name} - ${item.series}">
          <span class="fund-sonny-chip-thumb${imagePath ? "" : " is-empty"}"${imagePath ? ` style="background-image: url('${imagePath}');"` : ""}></span>
          <span class="fund-sonny-chip-body">
            <span class="fund-sonny-chip-name">${item.name}</span>
            <label class="fund-sonny-chip-price">
              <span class="fund-sonny-chip-price-currency">$</span>
              <input class="fund-sonny-chip-price-input" type="number" min="0" step="0.01" inputmode="decimal" data-sonny-id="${item.id}" value="${Number.isFinite(salePrice) && salePrice > 0 ? salePrice.toFixed(2) : ""}" placeholder="0.00" />
            </label>
          </span>
          <button class="fund-sonny-chip-remove" type="button" data-sonny-id="${item.id}" aria-label="Remove ${item.name}">x</button>
        </span>
      `;
    })
    .join("");
}

function appendFundSonnyFromInput(inputElement, previewElement) {
  const selected = resolveCatalogSelectionValue(inputElement?.value || "");
  if (!selected) {
    return getFundSonnyIds(inputElement);
  }
  const nextIds = Array.from(new Set([...getFundSonnyIds(inputElement), selected.id]));
  const nextPriceMap = normalizeFundSonnyPriceMap(getFundSonnyPriceMap(inputElement), nextIds);
  setFundSonnyIds(inputElement, nextIds);
  setFundSonnyPriceMap(inputElement, nextPriceMap);
  renderFundSonnyPreview(previewElement, nextIds, nextPriceMap);
  inputElement.value = "";
  return nextIds;
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalizeStockStatus(status, justTrading = false) {
  if (status === "available" || status === "pending" || status === "traded") {
    return status;
  }
  if (status === "sold") {
    return justTrading ? "traded" : "sold";
  }
  return "available";
}

function inferCatalogItemFromName(name) {
  return catalogByNormalizedName.get(normalizeText(name)) || null;
}

function loadSavedJson(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
}

function normalizeLoadedStockItems(items) {
  return items.map((item) => {
    const inferredCatalog = inferCatalogItemFromName(item.name || "");
    const resolvedId = item.sonnyId || inferredCatalog?.id || "";
    return {
      id: item.id || crypto.randomUUID(),
      sonnyId: resolvedId,
      name: displayNameForId(resolvedId, item.name || ""),
      series: displaySeriesForId(resolvedId, item.series || ""),
      quantity: Math.max(1, Number(item.quantity) || 1),
      status: normalizeStockStatus(item.status, Boolean(item.justTrading)),
      justTrading: Boolean(item.justTrading),
      price: Number(item.price) || 0,
      soldHistory: Array.isArray(item.soldHistory)
        ? item.soldHistory
          .map((entry) => ({
            id: entry.id || crypto.randomUUID(),
            buyer: String(entry.buyer || "").trim(),
            amount: Number.isFinite(Number(entry.amount)) ? Number(entry.amount) : null,
            quantity: Math.max(1, Number(entry.quantity) || 1),
            createdAt: entry.createdAt || new Date().toISOString(),
          }))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [],
      createdAt: item.createdAt || new Date().toISOString(),
    };
  });
}

function loadShipmentRecoveryQueue() {
  const saved = loadSavedJson(SHIPMENT_TO_STOCK_RECOVERY_KEY);
  return Array.isArray(saved) ? normalizeLoadedStockItems(saved) : [];
}

function saveShipmentRecoveryQueue(items) {
  localStorage.setItem(SHIPMENT_TO_STOCK_RECOVERY_KEY, JSON.stringify(items));
}

function removeShipmentRecoveryItems(itemIds) {
  if (!itemIds.length) {
    return;
  }
  const blockedIds = new Set(itemIds);
  const nextQueue = loadShipmentRecoveryQueue().filter((item) => !blockedIds.has(item.id));
  saveShipmentRecoveryQueue(nextQueue);
}

function persistStockLocally(items) {
  const serialized = JSON.stringify(items);
  localStorage.setItem(STOCK_STORAGE_KEY, serialized);
  localStorage.setItem(STOCK_STORAGE_MIRROR_KEY, serialized);
  localStorage.removeItem(LEGACY_SHARED_STOCK_STORAGE_KEY);
}

function mergeRecoveredStock(primaryItems, recoveredItems) {
  if (!recoveredItems.length) {
    return primaryItems;
  }

  const existingIds = new Set(primaryItems.map((item) => item.id));
  const merged = [...primaryItems];
  recoveredItems.forEach((item) => {
    if (existingIds.has(item.id)) {
      return;
    }
    existingIds.add(item.id);
    merged.unshift(item);
  });
  return merged;
}

function loadStock() {
  const saved = loadSavedJson(STOCK_STORAGE_KEY);
  const mirrored = loadSavedJson(STOCK_STORAGE_MIRROR_KEY);
  const legacySaved = loadSavedJson(LEGACY_SHARED_STOCK_STORAGE_KEY);
  const recoveredTransfers = loadShipmentRecoveryQueue();
  const candidates = [saved, mirrored, legacySaved].filter(Array.isArray);
  const source = candidates.sort((a, b) => b.length - a.length)[0] || null;

  if (Array.isArray(source)) {
    const normalized = normalizeLoadedStockItems(source);
    const merged = mergeRecoveredStock(normalized, recoveredTransfers);
    persistStockLocally(merged);
    saveShipmentRecoveryQueue([]);
    return merged;
  }

  const seeded = DEFAULT_STOCK.map((item) => {
    const inferred = inferCatalogItemFromName(item.name);
    return {
      ...item,
      sonnyId: inferred?.id || item.sonnyId || "",
      name: displayNameForId(inferred?.id || item.sonnyId || "", item.name),
      series: displaySeriesForId(inferred?.id || item.sonnyId || "", item.series),
      quantity: 1,
      status: "available",
      justTrading: false,
      createdAt: new Date().toISOString(),
    };
  });
  const merged = mergeRecoveredStock(seeded, recoveredTransfers);
  persistStockLocally(merged);
  saveShipmentRecoveryQueue([]);
  return merged;
}

function loadStockSearch() {
  return localStorage.getItem(STOCK_FILTER_STORAGE_KEY) || "";
}

function saveStockSearch() {
  localStorage.setItem(STOCK_FILTER_STORAGE_KEY, stockSearch);
}

function loadStockStatus() {
  const saved = localStorage.getItem(STOCK_FILTER_STORAGE_KEY + "-status");
  return ["all", "available", "pending", "sold", "traded"].includes(saved) ? saved : "all";
}

function saveStockStatus() {
  localStorage.setItem(STOCK_FILTER_STORAGE_KEY + "-status", stockStatus);
}

function loadStockKind() {
  const saved = localStorage.getItem(STOCK_KIND_FILTER_STORAGE_KEY);
  return ["all", "selling", "trading"].includes(saved) ? saved : "all";
}

function saveStockKind() {
  localStorage.setItem(STOCK_KIND_FILTER_STORAGE_KEY, stockKind);
}

function loadStockSort() {
  const saved = localStorage.getItem(STOCK_SORT_STORAGE_KEY);
  return ["newest", "oldest", "price-desc", "price-asc", "name-asc"].includes(saved) ? saved : "newest";
}

function saveStockSort() {
  localStorage.setItem(STOCK_SORT_STORAGE_KEY, stockSort);
}

function loadStockDisplayMode() {
  const saved = localStorage.getItem(STOCK_DISPLAY_STORAGE_KEY);
  return ["cards", "shelf"].includes(saved) ? saved : "cards";
}

function saveStockDisplayMode() {
  localStorage.setItem(STOCK_DISPLAY_STORAGE_KEY, stockDisplayMode);
}

function loadStockCardDensity() {
  const saved = localStorage.getItem(STOCK_CARD_DENSITY_STORAGE_KEY);
  return ["roomy", "compact"].includes(saved) ? saved : "roomy";
}

function saveStockCardDensity() {
  localStorage.setItem(STOCK_CARD_DENSITY_STORAGE_KEY, stockCardDensity);
}

function loadStockSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(STOCK_SETTINGS_STORAGE_KEY) || "null");
    return {
      useFund: saved?.useFund !== false,
      allowTradeValues: Boolean(saved?.allowTradeValues),
      includeTradeValuesInTotals: Boolean(saved?.includeTradeValuesInTotals),
    };
  } catch {
    return {
      useFund: true,
      allowTradeValues: false,
      includeTradeValuesInTotals: false,
    };
  }
}

function saveStockSettings() {
  localStorage.setItem(STOCK_SETTINGS_STORAGE_KEY, JSON.stringify(stockSettings));
}

function loadStockMessageDraft() {
  return localStorage.getItem(STOCK_MESSAGE_DRAFT_STORAGE_KEY) || "";
}

function saveStockMessageDraft() {
  localStorage.setItem(STOCK_MESSAGE_DRAFT_STORAGE_KEY, stockMessageDraft);
}

function loadActivitySearch() {
  return localStorage.getItem(ACTIVITY_FILTER_STORAGE_KEY) || "";
}

function saveActivitySearch() {
  localStorage.setItem(ACTIVITY_FILTER_STORAGE_KEY, activitySearch);
}

function loadActivityKind() {
  const saved = localStorage.getItem(ACTIVITY_FILTER_STORAGE_KEY + "-kind");
  return ["all", "stock", "fund", "shipment", "system"].includes(saved) ? saved : "all";
}

function saveActivityKind() {
  localStorage.setItem(ACTIVITY_FILTER_STORAGE_KEY + "-kind", activityKind);
}

function loadPriceHistory() {
  try {
    const saved = JSON.parse(localStorage.getItem(PRICE_HISTORY_STORAGE_KEY) || "null");
    if (Array.isArray(saved)) {
      return saved
        .map((entry) => ({
          id: entry.id || crypto.randomUUID(),
          stockItemId: entry.stockItemId || "",
          figureKey: entry.figureKey || "",
          sonnyId: entry.sonnyId || "",
          name: entry.name || "",
          series: entry.series || "",
          price: Number(entry.price) || 0,
          source: entry.source || "stocked",
          createdAt: entry.createdAt || new Date().toISOString(),
        }))
        .filter((entry) => entry.figureKey && entry.name);
    }
  } catch {}

  return buildPriceHistoryFromActivityLog();
}

function savePriceHistory() {
  localStorage.setItem(PRICE_HISTORY_STORAGE_KEY, JSON.stringify(priceHistory));
}

function saveStock() {
  persistStockLocally(stock);
  setStockSaveState("saved", "Stock changes are saved on this device.");
}

function loadFundTransactions() {
  try {
    const saved = JSON.parse(localStorage.getItem(FUND_STORAGE_KEY) || "null");
    if (Array.isArray(saved)) {
      return saved.map((item) => ({
        id: item.id || crypto.randomUUID(),
        label: item.label || "",
        amount: Number(item.amount) || 0,
        amountMode: normalizeFundAmountMode(item.amountMode),
        sonnyIds: Array.isArray(item.sonnyIds) ? Array.from(new Set(item.sonnyIds.filter(Boolean).map(String))) : [],
        figurePrice: Number(item.figurePrice) || 0,
        figurePricesById: normalizeFundSonnyPriceMap(item.figurePricesById, item.sonnyIds, item.figurePrice),
        shipping: Math.max(0, Number(item.shipping) || 0),
        person: String(item.person || item.personName || "").trim(),
        paidVia: ["venmo", "zelle", "paypal"].includes(item.paidVia) ? item.paidVia : "",
        sentToRealFund: Boolean(item.sentToRealFund),
        type: item.type === "in" ? "in" : "out",
        date: item.date || "",
      }));
    }
  } catch {}

  return DEFAULT_FUND_TRANSACTIONS.map((item) => ({ ...item }));
}

function saveFundTransactions() {
  localStorage.setItem(FUND_STORAGE_KEY, JSON.stringify(fundTransactions));
  setStockSaveState("saved", "Fund changes are saved on this device.");
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

function setStockAuthFeedback(message) {
  if (stockAuthFeedback) {
    stockAuthFeedback.textContent = message;
  }
}

function setStockSaveState(mode, message) {
  if (!stockSaveStatusPill || !stockSaveStatusCopy) {
    return;
  }

  stockSaveStatusPill.classList.remove("is-connected", "is-saved", "is-syncing", "is-error");

  if (mode === "connected") {
    stockSaveStatusPill.textContent = "Cloud ready";
    stockSaveStatusPill.classList.add("is-connected");
  } else if (mode === "saved") {
    stockSaveStatusPill.textContent = "Saved";
    stockSaveStatusPill.classList.add("is-saved");
  } else if (mode === "syncing") {
    stockSaveStatusPill.textContent = "Syncing";
    stockSaveStatusPill.classList.add("is-syncing");
  } else if (mode === "error") {
    stockSaveStatusPill.textContent = "Needs attention";
    stockSaveStatusPill.classList.add("is-error");
  } else {
    stockSaveStatusPill.textContent = "Device only";
  }

  stockSaveStatusCopy.textContent = message;
}

function renderStockAuthState() {
  if (!stockAuthStatusTitle || !stockAuthStatusCopy || !stockAuthStatusPill) {
    return;
  }

  stockAuthStatusPill.classList.remove("is-connected", "is-syncing");

  if (!stockAuthState.configured) {
    stockAuthStatusTitle.textContent = "Cloud sync not connected";
    stockAuthStatusCopy.textContent = "Add your Supabase project URL and anon key in app/supabase-config.js.";
    stockAuthStatusPill.textContent = "Setup needed";
    setStockAuthFeedback("Cloud sync is off until Supabase is connected.");
    setStockSaveState("local", "Stock, fund, and activity changes are currently saved on this device.");
  } else if (stockAuthState.syncing) {
    stockAuthStatusTitle.textContent = stockAuthState.user
      ? `Syncing ${stockAuthState.user.email || "your account"}`
      : "Finishing account sync";
    stockAuthStatusCopy.textContent = "Saving stock, fund, and activity changes to the cloud right now.";
    stockAuthStatusPill.textContent = "Syncing";
    stockAuthStatusPill.classList.add("is-syncing");
    setStockSaveState("syncing", "Saving stock, fund, and activity changes to the cloud right now.");
  } else if (stockAuthState.user) {
    stockAuthStatusTitle.textContent = "Cloud sync is on";
    stockAuthStatusCopy.textContent = `Signed in as ${stockAuthState.user.email || "your account"}. Stock, fund, and activity can now sync to your Supabase project.`;
    stockAuthStatusPill.textContent = "Connected";
    stockAuthStatusPill.classList.add("is-connected");
    setStockSaveState("connected", `Cloud sync is on for ${stockAuthState.user.email || "your account"}.`);
  } else {
    stockAuthStatusTitle.textContent = "Ready for account login";
    stockAuthStatusCopy.textContent = "Sign in with a magic link or password to save stock, fund, and activity to the cloud.";
    stockAuthStatusPill.textContent = "Not signed in";
    setStockSaveState("local", "Stock, fund, and activity changes are saved on this device until you sign in.");
  }

  const disabled = !stockAuthState.configured;
  if (stockAuthMagicLinkButton) stockAuthMagicLinkButton.disabled = disabled;
  if (stockAuthSignInButton) stockAuthSignInButton.disabled = disabled;
  if (stockAuthSignUpButton) stockAuthSignUpButton.disabled = disabled;
  if (stockAuthSyncNowButton) stockAuthSyncNowButton.disabled = disabled || !stockAuthState.user;
  if (stockAuthImportLocalButton) stockAuthImportLocalButton.disabled = disabled || !stockAuthState.user;
  if (stockAuthSignOutButton) stockAuthSignOutButton.disabled = disabled || !stockAuthState.user;
  if (stockAuthEmailInput) stockAuthEmailInput.disabled = disabled || Boolean(stockAuthState.user);
  if (stockAuthPasswordInput) stockAuthPasswordInput.disabled = disabled || Boolean(stockAuthState.user);
}

function buildStockRows() {
  return stock.map((item) => ({
    id: item.id,
    user_id: stockAuthState.user.id,
    sonny_id: item.sonnyId || "",
    name: item.name || "",
    series: item.series || "",
    quantity: Math.max(1, Number(item.quantity) || 1),
    status: normalizeStockStatus(item.status, Boolean(item.justTrading)),
    just_trading: Boolean(item.justTrading),
    price: Number(item.price) || 0,
    sold_history: Array.isArray(item.soldHistory) ? item.soldHistory : [],
    created_at: item.createdAt || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));
}

function buildFundRows() {
  return fundTransactions.map((item) => ({
    id: item.id,
    user_id: stockAuthState.user.id,
    label: item.label || "",
    amount: Number(item.amount) || 0,
    amount_mode: normalizeFundAmountMode(item.amountMode),
    sonny_ids: Array.isArray(item.sonnyIds) ? item.sonnyIds : [],
    figure_price: Number(item.figurePrice) || 0,
    figure_prices_by_id: normalizeFundSonnyPriceMap(item.figurePricesById, item.sonnyIds, item.figurePrice),
    shipping: Math.max(0, Number(item.shipping) || 0),
    person_name: item.person || "",
    paid_via: ["venmo", "zelle", "paypal"].includes(item.paidVia) ? item.paidVia : null,
    sent_to_real_fund: Boolean(item.sentToRealFund),
    type: item.type === "in" ? "in" : "out",
    date: item.date || null,
    updated_at: new Date().toISOString(),
  }));
}

function buildActivityRows() {
  return activityLog.map((entry) => ({
    id: entry.id || crypto.randomUUID(),
    user_id: stockAuthState.user.id,
    kind: entry.kind || "system",
    title: entry.title || "",
    detail: entry.detail || "",
    metadata: entry.metadata && typeof entry.metadata === "object" ? entry.metadata : {},
    created_at: entry.createdAt || new Date().toISOString(),
  }));
}

function getLocalStockCount() {
  return stock.reduce((sum, item) => sum + Math.max(1, Number(item.quantity) || 1), 0);
}

function getLocalFundCount() {
  return fundTransactions.length;
}

function getLocalActivityCount() {
  return activityLog.length;
}

function scheduleStockCloudSync() {
  if (!stockAuthState.user || !stockAuthState.client) {
    return;
  }
  window.clearTimeout(stockAuthState.stockTimer);
  stockAuthState.stockTimer = window.setTimeout(() => {
    syncStockToCloud();
  }, 300);
}

function scheduleFundCloudSync() {
  if (!stockAuthState.user || !stockAuthState.client) {
    return;
  }
  window.clearTimeout(stockAuthState.fundTimer);
  stockAuthState.fundTimer = window.setTimeout(() => {
    syncFundToCloud();
  }, 300);
}

function scheduleActivityCloudSync() {
  if (!stockAuthState.user || !stockAuthState.client) {
    return;
  }
  window.clearTimeout(stockAuthState.activityTimer);
  stockAuthState.activityTimer = window.setTimeout(() => {
    syncActivityToCloud();
  }, 300);
}

async function replaceCloudTable(table, rows) {
  const { error: deleteError } = await stockAuthState.client
    .from(table)
    .delete()
    .eq("user_id", stockAuthState.user.id);
  if (deleteError) {
    throw deleteError;
  }

  if (!rows.length) {
    return;
  }

  const { error: insertError } = await stockAuthState.client
    .from(table)
    .insert(rows);
  if (insertError) {
    throw insertError;
  }
}

async function syncStockToCloud() {
  if (!stockAuthState.client || !stockAuthState.user || stockAuthState.hydrating) {
    return;
  }
  stockAuthState.syncing = true;
  renderStockAuthState();
  try {
    await replaceCloudTable("stock_items", buildStockRows());
    setStockAuthFeedback("Stock sync is up to date.");
    setStockSaveState("saved", "Saved stock changes to your cloud account.");
  } catch (error) {
    console.error("Failed to sync stock to Supabase", error);
    setStockAuthFeedback("Stock sync hit a snag. Try syncing again in a moment.");
    setStockSaveState("error", "Stock sync hit a snag. Your changes may not be backed up yet.");
  } finally {
    stockAuthState.syncing = false;
    renderStockAuthState();
  }
}

async function syncFundToCloud() {
  if (!stockAuthState.client || !stockAuthState.user || stockAuthState.hydrating) {
    return;
  }
  stockAuthState.syncing = true;
  renderStockAuthState();
  try {
    await replaceCloudTable("fund_transactions", buildFundRows());
    setStockAuthFeedback("Fund sync is up to date.");
    setStockSaveState("saved", "Saved fund changes to your cloud account.");
  } catch (error) {
    console.error("Failed to sync fund to Supabase", error);
    setStockAuthFeedback("Fund sync hit a snag. Try syncing again in a moment.");
    setStockSaveState("error", "Fund sync hit a snag. Your changes may not be backed up yet.");
  } finally {
    stockAuthState.syncing = false;
    renderStockAuthState();
  }
}

async function syncActivityToCloud() {
  if (!stockAuthState.client || !stockAuthState.user || stockAuthState.hydrating) {
    return;
  }
  stockAuthState.syncing = true;
  renderStockAuthState();
  try {
    await replaceCloudTable("activity_log", buildActivityRows());
    setStockAuthFeedback("Activity log sync is up to date.");
    setStockSaveState("saved", "Saved activity log changes to your cloud account.");
  } catch (error) {
    console.error("Failed to sync activity log to Supabase", error);
    setStockAuthFeedback("Activity log sync hit a snag. Try syncing again in a moment.");
    setStockSaveState("error", "Activity log sync hit a snag. Your changes may not be backed up yet.");
  } finally {
    stockAuthState.syncing = false;
    renderStockAuthState();
  }
}

async function syncStockFundAndActivityToCloud() {
  if (!stockAuthState.user) {
    return;
  }
  stockAuthState.syncing = true;
  renderStockAuthState();
  try {
    await Promise.all([
      replaceCloudTable("stock_items", buildStockRows()),
      replaceCloudTable("fund_transactions", buildFundRows()),
      replaceCloudTable("activity_log", buildActivityRows()),
    ]);
    setStockAuthFeedback("Stock, fund, and activity are synced to the cloud.");
    setStockSaveState("saved", "Saved stock, fund, and activity changes to your cloud account.");
  } catch (error) {
    console.error("Failed to sync stock, fund, and activity to Supabase", error);
    setStockAuthFeedback("Cloud sync hit a snag for stock, fund, or activity. Try syncing again.");
    setStockSaveState("error", "Cloud sync hit a snag for stock, fund, or activity. Your latest changes may not be backed up yet.");
  } finally {
    stockAuthState.syncing = false;
    renderStockAuthState();
  }
}

async function hydrateStockAndFundFromCloud() {
  if (!stockAuthState.client || !stockAuthState.user) {
    return;
  }

  stockAuthState.hydrating = true;
  try {
    const [
      { data: stockRows, error: stockError },
      { data: fundRows, error: fundError },
      { data: activityRows, error: activityError },
    ] = await Promise.all([
      stockAuthState.client.from("stock_items").select("id,sonny_id,name,series,quantity,status,just_trading,price,sold_history,created_at").eq("user_id", stockAuthState.user.id),
      stockAuthState.client.from("fund_transactions").select("id,label,amount,type,date").eq("user_id", stockAuthState.user.id),
      stockAuthState.client.from("activity_log").select("id,kind,title,detail,metadata,created_at").eq("user_id", stockAuthState.user.id).order("created_at", { ascending: false }),
    ]);

    if (stockError) throw stockError;
    if (fundError) throw fundError;
    if (activityError) throw activityError;

    if ((stockRows && stockRows.length) || (fundRows && fundRows.length) || (activityRows && activityRows.length)) {
      stock = (stockRows || []).map((item) => ({
        id: item.id || crypto.randomUUID(),
        sonnyId: item.sonny_id || "",
        name: displayNameForId(item.sonny_id || "", item.name || ""),
        series: displaySeriesForId(item.sonny_id || "", item.series || ""),
        quantity: Math.max(1, Number(item.quantity) || 1),
        status: normalizeStockStatus(item.status, Boolean(item.just_trading)),
        justTrading: Boolean(item.just_trading),
        price: Number(item.price) || 0,
        soldHistory: Array.isArray(item.sold_history)
          ? item.sold_history.map((entry) => ({
            id: entry.id || crypto.randomUUID(),
            buyer: String(entry.buyer || "").trim(),
            amount: Number.isFinite(Number(entry.amount)) ? Number(entry.amount) : null,
            quantity: Math.max(1, Number(entry.quantity) || 1),
            createdAt: entry.createdAt || new Date().toISOString(),
          }))
          : [],
        createdAt: item.created_at || new Date().toISOString(),
      }));

      fundTransactions = (fundRows || []).map((item) => ({
        id: item.id || crypto.randomUUID(),
        label: item.label || "",
        amount: Number(item.amount) || 0,
        amountMode: normalizeFundAmountMode(item.amount_mode),
        sonnyIds: Array.isArray(item.sonny_ids) ? Array.from(new Set(item.sonny_ids.filter(Boolean).map(String))) : [],
        figurePrice: Number(item.figure_price) || 0,
        figurePricesById: normalizeFundSonnyPriceMap(item.figure_prices_by_id, item.sonny_ids, item.figure_price),
        shipping: Math.max(0, Number(item.shipping) || 0),
        person: String(item.person_name || "").trim(),
        paidVia: ["venmo", "zelle", "paypal"].includes(item.paid_via) ? item.paid_via : "",
        sentToRealFund: Boolean(item.sent_to_real_fund),
        type: item.type === "in" ? "in" : "out",
        date: item.date || "",
      }));

      if (Array.isArray(activityRows) && activityRows.length) {
        activityLog = activityRows.map((entry) => ({
          id: entry.id || crypto.randomUUID(),
          kind: entry.kind || "system",
          title: entry.title || "",
          detail: entry.detail || "",
          metadata: entry.metadata && typeof entry.metadata === "object" ? entry.metadata : {},
          createdAt: entry.created_at || new Date().toISOString(),
        }));
        saveActivityLog();
      }

      localStorage.removeItem(STOCK_STORAGE_KEY);
      localStorage.removeItem(FUND_STORAGE_KEY);
      syncPriceHistoryFromCurrentStock();
      render();
      setStockAuthFeedback("Loaded your saved stock, fund, and activity from the cloud.");
      setStockSaveState("saved", "Loaded your saved stock, fund, and activity from your account.");
    } else {
      render();
      setStockAuthFeedback("Signed in. Cloud stock, fund, and activity are empty for now. You can upload this device's data whenever you're ready.");
      setStockSaveState("connected", "Signed in and ready for cloud sync. You can upload this device's stock, fund, and activity whenever you're ready.");
    }
  } catch (error) {
    console.error("Failed to hydrate stock, fund, and activity from Supabase", error);
    setStockAuthFeedback("Could not load cloud stock, fund, and activity yet.");
    setStockSaveState("error", "Could not load cloud stock, fund, and activity yet. You can keep using this device and try again.");
  } finally {
    stockAuthState.hydrating = false;
    renderStockAuthState();
  }
}

async function importLocalStockFundAndActivityToCloud() {
  if (!stockAuthState.user) {
    return;
  }
  const stockCount = getLocalStockCount();
  const fundCount = getLocalFundCount();
  const activityCount = getLocalActivityCount();
  const shouldImport = window.confirm(
    `Use this device's stock, fund, and activity data for your account?\n\nThis will replace the stock, fund, and activity data currently saved in the cloud for this account.\n\nThis device currently has ${stockCount} stock unit${stockCount === 1 ? "" : "s"}, ${fundCount} fund movement${fundCount === 1 ? "" : "s"}, and ${activityCount} activity entr${activityCount === 1 ? "y" : "ies"}.`,
  );

  if (!shouldImport) {
    return;
  }

  await syncStockFundAndActivityToCloud();
}

function stockAuthRedirectUrl() {
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
    console.warn("Falling back to current page for stock auth redirect", error);
    return window.location.origin + window.location.pathname;
  }
}

async function stockSendMagicLink() {
  if (!stockAuthState.client) {
    return;
  }
  const email = stockAuthEmailInput?.value.trim() || "";
  if (!email) {
    setStockAuthFeedback("Add an email address first so I know where to send the magic link.");
    return;
  }
  const { error } = await stockAuthState.client.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: stockAuthRedirectUrl() },
  });
  if (error) {
    console.error("Stock magic link failed", error);
    setStockAuthFeedback(error.message || "Could not send the magic link just yet.");
    setStockSaveState("error", "Could not send the magic link yet.");
    return;
  }
  setStockAuthFeedback(`Magic link sent to ${email}. Open it from your email to finish signing in.`);
  setStockSaveState("connected", `Magic link sent to ${email}. Finish the sign-in from your inbox.`);
}

async function stockSignInWithPassword() {
  if (!stockAuthState.client) {
    return;
  }
  const email = stockAuthEmailInput?.value.trim() || "";
  const password = stockAuthPasswordInput?.value || "";
  if (!email || !password) {
    setStockAuthFeedback("Enter both your email and password to sign in.");
    return;
  }
  const { error } = await stockAuthState.client.auth.signInWithPassword({ email, password });
  if (error) {
    console.error("Stock password sign-in failed", error);
    setStockAuthFeedback(error.message || "Could not sign in with that email and password.");
    setStockSaveState("error", "That email and password did not work just yet.");
    return;
  }
  setStockAuthFeedback("Signed in. Loading your stock, fund, and activity now.");
  setStockSaveState("syncing", "Signed in. Loading your stock, fund, and activity now.");
}

async function stockSignUpWithPassword() {
  if (!stockAuthState.client) {
    return;
  }
  const email = stockAuthEmailInput?.value.trim() || "";
  const password = stockAuthPasswordInput?.value || "";
  if (!email || !password) {
    setStockAuthFeedback("Enter an email and password to create your account.");
    return;
  }
  const { error } = await stockAuthState.client.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: stockAuthRedirectUrl() },
  });
  if (error) {
    console.error("Stock password sign-up failed", error);
    setStockAuthFeedback(error.message || "Could not create your account just yet.");
    setStockSaveState("error", "Could not create your account just yet.");
    return;
  }
  setStockAuthFeedback("Account created. If email confirmation is on, check your inbox before signing in.");
  setStockSaveState("connected", "Account created. If email confirmation is on, check your inbox before signing in.");
}

async function initializeStockSupabaseAuth() {
  stockAuthState.configured = hasSupabaseConfig() && Boolean(window.supabase?.createClient);
  renderStockAuthState();

  if (!stockAuthState.configured) {
    return;
  }

  stockAuthState.client = window.supabase.createClient(supabaseConfig.url, supabaseConfig.anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });

  stockAuthState.client.auth.onAuthStateChange(async (event, session) => {
    stockAuthState.user = session?.user || null;
    renderStockAuthState();

    if ((event === "SIGNED_IN" || event === "TOKEN_REFRESHED") && stockAuthState.user) {
      await hydrateStockAndFundFromCloud();
      scheduleStockSessionChecks();
    }

    if (event === "SIGNED_OUT") {
      window.clearTimeout(stockAuthState.sessionCheckTimer);
      stockAuthState.syncing = false;
      stockAuthState.hydrating = false;
      setStockAuthFeedback("Signed out. Stock, fund, and activity changes are saved on this device until you sign in again.");
      setStockSaveState("local", "Signed out. Stock, fund, and activity changes are now saved on this device.");
      renderStockAuthState();
    }
  });

  const {
    data: { session },
    error,
  } = await stockAuthState.client.auth.getSession();

  if (error) {
    console.error("Failed to restore stock session", error);
    setStockAuthFeedback("Could not restore your stock sign-in session yet.");
    setStockSaveState("error", "Could not restore your stock sign-in session yet.");
    return;
  }

  stockAuthState.user = session?.user || null;
  renderStockAuthState();

  if (stockAuthState.user) {
    await hydrateStockAndFundFromCloud();
    scheduleStockSessionChecks();
  }
}

async function verifyStockSessionActive(contextLabel = "checking your session") {
  if (!stockAuthState.client || !stockAuthState.user) {
    return;
  }

  try {
    const {
      data: { session },
      error,
    } = await stockAuthState.client.auth.getSession();

    if (error) {
      throw error;
    }

    if (!session?.user) {
      stockAuthState.user = null;
      renderStockAuthState();
      setStockAuthFeedback(`Your account session expired while ${contextLabel}. Please sign in again to keep syncing.`);
      setStockSaveState("error", "Your session expired. Stock, fund, and activity changes are saved on this device until you sign in again.");
    }
  } catch (error) {
    console.warn("Stock session verification failed", error);
  }
}

function scheduleStockSessionChecks() {
  window.clearTimeout(stockAuthState.sessionCheckTimer);
  if (!stockAuthState.user || !stockAuthState.client) {
    return;
  }

  stockAuthState.sessionCheckTimer = window.setTimeout(async () => {
    await verifyStockSessionActive("checking your session");
    scheduleStockSessionChecks();
  }, 60_000);
}

function loadShipments() {
  try {
    const saved = JSON.parse(localStorage.getItem(SHIPMENT_STORAGE_KEY) || "null");
    if (Array.isArray(saved) && saved.length) {
      return normalizeSavedShipments(
        saved.map((shipment) => ({
          id: shipment.id || crypto.randomUUID(),
          presetKey: shipment.presetKey || inferShipmentPresetKey(shipment),
          name: shipment.name || "Untitled shipment",
          cost: Number(shipment.cost) || 0,
          items: Array.isArray(shipment.items)
            ? shipment.items.map((item) => ({
                id: item.id || crypto.randomUUID(),
                sonnyId: item.sonnyId || inferCatalogItemFromName(item.name || "")?.id || "",
                name: displayNameForId(item.sonnyId || inferCatalogItemFromName(item.name || "")?.id || "", item.name || ""),
                quantity: Math.max(1, Number(item.quantity) || 1),
                sellPrice: Number(item.sellPrice) || 0,
                keepPrice: Number(item.keepPrice) || 0,
              }))
            : [],
        })),
      );
    }
  } catch {}

  return DEFAULT_SHIPMENTS.map((shipment) => ({
    ...shipment,
    items: shipment.items.map((item) => {
      const inferred = inferCatalogItemFromName(item.name || "");
      return {
        ...item,
        sonnyId: inferred?.id || "",
        name: displayNameForId(inferred?.id || "", item.name || ""),
        quantity: Math.max(1, Number(item.quantity) || 1),
      };
    }),
  }));
}

function loadShipmentSelections() {
  try {
    const saved = JSON.parse(localStorage.getItem(SHIPMENT_SELECTION_STORAGE_KEY) || "null");
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(saved).map(([shipmentId, itemIds]) => [
        shipmentId,
        Array.isArray(itemIds) ? Array.from(new Set(itemIds.filter(Boolean).map(String))) : [],
      ]),
    );
  } catch {
    return {};
  }
}

function saveShipmentSelections() {
  localStorage.setItem(SHIPMENT_SELECTION_STORAGE_KEY, JSON.stringify(selectedShipmentSelections));
}

function selectedShipmentItemIdsFor(shipmentId) {
  return Array.isArray(selectedShipmentSelections[shipmentId])
    ? selectedShipmentSelections[shipmentId]
    : [];
}

function setSelectedShipmentItemIds(shipmentId, itemIds) {
  if (!shipmentId) {
    return;
  }

  const nextItemIds = Array.from(new Set((itemIds || []).filter(Boolean).map(String)));
  if (nextItemIds.length) {
    selectedShipmentSelections = {
      ...selectedShipmentSelections,
      [shipmentId]: nextItemIds,
    };
  } else if (selectedShipmentSelections[shipmentId]) {
    const nextSelections = { ...selectedShipmentSelections };
    delete nextSelections[shipmentId];
    selectedShipmentSelections = nextSelections;
  }

  saveShipmentSelections();
}

function normalizeSavedShipments(savedShipments) {
  const dedupedByPreset = [];
  const seenPresetKeys = new Set();

  savedShipments.forEach((shipment) => {
    if (!shipment.presetKey) {
      dedupedByPreset.push(shipment);
      return;
    }

    if (seenPresetKeys.has(shipment.presetKey)) {
      const existingIndex = dedupedByPreset.findIndex(
        (entry) => entry.presetKey === shipment.presetKey,
      );
      const preset = DEFAULT_SHIPMENTS.find((entry) => entry.presetKey === shipment.presetKey);
      const existing = dedupedByPreset[existingIndex];
      const existingLooksDefault = preset && existing?.name === preset.name;
      const currentLooksDefault = preset && shipment.name === preset.name;

      if (existingLooksDefault && !currentLooksDefault) {
        dedupedByPreset[existingIndex] = shipment;
      }
      return;
    }

    seenPresetKeys.add(shipment.presetKey);
    dedupedByPreset.push(shipment);
  });

  return dedupedByPreset;
}

function inferShipmentPresetKey(shipment) {
  const signature = shipmentItemSignature(shipment.items || []);
  const matchedPreset = DEFAULT_SHIPMENTS.find((preset) => {
    return (
      Number(shipment.cost || 0) === Number(preset.cost || 0) &&
      shipmentItemSignature(preset.items || []) === signature
    );
  });

  return matchedPreset?.presetKey || "";
}

function shipmentItemSignature(items) {
  return (items || [])
    .map((item) => {
      const name = String(item.name || "").trim().toLowerCase();
      const quantity = Math.max(1, Number(item.quantity) || 1);
      const sellPrice = Number(item.sellPrice || 0).toFixed(2);
      const keepPrice = Number(item.keepPrice || 0).toFixed(2);
      return `${name}|${quantity}|${sellPrice}|${keepPrice}`;
    })
    .sort()
    .join("::");
}

function saveShipments() {
  localStorage.setItem(SHIPMENT_STORAGE_KEY, JSON.stringify(shipments));
}

function loadActivityLog() {
  try {
    const saved = JSON.parse(localStorage.getItem(ACTIVITY_LOG_STORAGE_KEY) || "null");
    if (Array.isArray(saved)) {
      return saved;
    }
  } catch {}
  return [];
}

function saveActivityLog() {
  localStorage.setItem(ACTIVITY_LOG_STORAGE_KEY, JSON.stringify(activityLog));
}

function buildPriceHistoryFromActivityLog() {
  const recoveredEntries = [];

  activityLog.forEach((entry) => {
    const title = String(entry.title || "");
    const detail = String(entry.detail || "");
    const createdAt = entry.createdAt || new Date().toISOString();

    const addedMatch = title.match(/^Added (.+) to stock$/);
    const shippedMatch = title.match(/^Moved (.+) from shipment to stock$/);
    const updatedMatch = title.match(/^Updated stock price for (.+)$/);
    const priceValues = [...detail.matchAll(/\$([0-9]+(?:\.[0-9]{1,2})?)/g)].map((match) => Number.parseFloat(match[1]));

    if (addedMatch && priceValues[0] != null) {
      const name = addedMatch[1].trim();
      recoveredEntries.push({
        id: crypto.randomUUID(),
        stockItemId: "",
        figureKey: `name:${normalizeText(name)}`,
        sonnyId: "",
        name,
        series: "",
        price: priceValues[0],
        source: "stocked",
        createdAt,
      });
      return;
    }

    if (shippedMatch && priceValues[0] != null) {
      const name = shippedMatch[1].trim();
      recoveredEntries.push({
        id: crypto.randomUUID(),
        stockItemId: "",
        figureKey: `name:${normalizeText(name)}`,
        sonnyId: "",
        name,
        series: "",
        price: priceValues[0],
        source: "shipment",
        createdAt,
      });
      return;
    }

    if (updatedMatch && priceValues[1] != null) {
      const name = updatedMatch[1].trim();
      recoveredEntries.push({
        id: crypto.randomUUID(),
        stockItemId: "",
        figureKey: `name:${normalizeText(name)}`,
        sonnyId: "",
        name,
        series: "",
        price: priceValues[1],
        source: "updated",
        createdAt,
      });
    }
  });

  return recoveredEntries;
}

function figureKeyForItem(item) {
  if (item.sonnyId) {
    return `id:${item.sonnyId}`;
  }
  const normalizedName = normalizeText(item.name);
  return normalizedName ? `name:${normalizedName}` : "";
}

function addPriceHistoryEntry(item, options = {}) {
  if (item.justTrading) {
    return;
  }

  const price = Number(item.price || 0);
  const figureKey = figureKeyForItem(item);
  if (!figureKey) {
    return;
  }

  const createdAt = options.createdAt || new Date().toISOString();
  const latestMatchingEntry = priceHistory.find((entry) => {
    return entry.stockItemId === item.id && entry.price === price;
  });
  if (latestMatchingEntry) {
    return;
  }

  priceHistory = [
    {
      id: crypto.randomUUID(),
      stockItemId: item.id,
      figureKey,
      sonnyId: item.sonnyId || "",
      name: item.name || "Untitled Sonny",
      series: item.series || "",
      price,
      source: options.source || "stocked",
      createdAt,
    },
    ...priceHistory,
  ];
  savePriceHistory();
}

function syncPriceHistoryFromCurrentStock() {
  let changed = false;
  stock.forEach((item) => {
    if (item.justTrading) {
      return;
    }
    const beforeLength = priceHistory.length;
    addPriceHistoryEntry(item, {
      source: "snapshot",
      createdAt: item.createdAt || new Date().toISOString(),
    });
    if (priceHistory.length !== beforeLength) {
      changed = true;
    }
  });

  if (changed) {
    savePriceHistory();
  }
}

function loadLastBackupAt() {
  return localStorage.getItem(LAST_BACKUP_STORAGE_KEY) || "";
}

function saveLastBackupAt(value) {
  localStorage.setItem(LAST_BACKUP_STORAGE_KEY, value);
}

function logActivity(kind, title, detail) {
  activityLog = [
    {
      id: crypto.randomUUID(),
      kind,
      title,
      detail,
      metadata: {},
      createdAt: new Date().toISOString(),
    },
    ...activityLog,
  ].slice(0, MAX_ACTIVITY_ITEMS);
  saveActivityLog();
  scheduleActivityCloudSync();
}

function loadActiveView() {
  const saved = localStorage.getItem(ACTIVE_VIEW_KEY);
  return ["stock", "fund", "shipments", "logs", "settings"].includes(saved) ? saved : "stock";
}

function saveActiveView() {
  localStorage.setItem(ACTIVE_VIEW_KEY, activeView);
}

function loadFundFilter() {
  const saved = localStorage.getItem(FUND_FILTER_KEY);
  return ["7d", "30d", "90d", "all"].includes(saved) ? saved : "all";
}

function saveFundFilter() {
  localStorage.setItem(FUND_FILTER_KEY, fundFilter);
}

function loadFundSort() {
  const saved = localStorage.getItem(FUND_SORT_KEY);
  return ["newest", "oldest"].includes(saved) ? saved : "newest";
}

function saveFundSort() {
  localStorage.setItem(FUND_SORT_KEY, fundSort);
}

function loadActiveShipmentId() {
  const saved = localStorage.getItem(ACTIVE_SHIPMENT_KEY);
  if (saved && shipments.some((shipment) => shipment.id === saved)) {
    return saved;
  }
  return shipments[0]?.id || "";
}

function saveActiveShipmentId() {
  localStorage.setItem(ACTIVE_SHIPMENT_KEY, activeShipmentId);
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function formatTimestamp(value) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatTimestampForFilename(value) {
  const date = new Date(value);
  const pad = (part) => String(part).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}_${pad(date.getHours())}-${pad(date.getMinutes())}`;
}

function currentLocalDateInputValue() {
  const now = new Date();
  const offsetDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 10);
}

function csvEscape(value) {
  const stringValue = String(value ?? "");
  return `"${stringValue.replaceAll('"', '""')}"`;
}

function getBackupPayload() {
  return {
    exportedAt: new Date().toISOString(),
    version: 2,
    data: {
      [TRACKER_PROGRESS_STORAGE_KEY]: JSON.parse(localStorage.getItem(TRACKER_PROGRESS_STORAGE_KEY) || "{}"),
      [STOCK_STORAGE_KEY]: JSON.parse(localStorage.getItem(STOCK_STORAGE_KEY) || "[]"),
      [STOCK_STORAGE_MIRROR_KEY]: JSON.parse(localStorage.getItem(STOCK_STORAGE_MIRROR_KEY) || "[]"),
      [FUND_STORAGE_KEY]: JSON.parse(localStorage.getItem(FUND_STORAGE_KEY) || "[]"),
      [SHIPMENT_STORAGE_KEY]: JSON.parse(localStorage.getItem(SHIPMENT_STORAGE_KEY) || "[]"),
      [SHIPMENT_SELECTION_STORAGE_KEY]: JSON.parse(localStorage.getItem(SHIPMENT_SELECTION_STORAGE_KEY) || "{}"),
      [SHIPMENT_TO_STOCK_RECOVERY_KEY]: JSON.parse(localStorage.getItem(SHIPMENT_TO_STOCK_RECOVERY_KEY) || "[]"),
      [ACTIVITY_LOG_STORAGE_KEY]: JSON.parse(localStorage.getItem(ACTIVITY_LOG_STORAGE_KEY) || "[]"),
      [PRICE_HISTORY_STORAGE_KEY]: JSON.parse(localStorage.getItem(PRICE_HISTORY_STORAGE_KEY) || "[]"),
      [LAST_BACKUP_STORAGE_KEY]: localStorage.getItem(LAST_BACKUP_STORAGE_KEY) || "",
      [ACTIVE_VIEW_KEY]: localStorage.getItem(ACTIVE_VIEW_KEY) || "stock",
      [FUND_FILTER_KEY]: localStorage.getItem(FUND_FILTER_KEY) || "all",
      [FUND_SORT_KEY]: localStorage.getItem(FUND_SORT_KEY) || "newest",
      [ACTIVE_SHIPMENT_KEY]: localStorage.getItem(ACTIVE_SHIPMENT_KEY) || "",
      [STOCK_FILTER_STORAGE_KEY]: localStorage.getItem(STOCK_FILTER_STORAGE_KEY) || "",
      [STOCK_FILTER_STORAGE_KEY + "-status"]: localStorage.getItem(STOCK_FILTER_STORAGE_KEY + "-status") || "all",
      [STOCK_SORT_STORAGE_KEY]: localStorage.getItem(STOCK_SORT_STORAGE_KEY) || "newest",
      [STOCK_DISPLAY_STORAGE_KEY]: localStorage.getItem(STOCK_DISPLAY_STORAGE_KEY) || "cards",
      [STOCK_CARD_DENSITY_STORAGE_KEY]: localStorage.getItem(STOCK_CARD_DENSITY_STORAGE_KEY) || "roomy",
      [STOCK_KIND_FILTER_STORAGE_KEY]: localStorage.getItem(STOCK_KIND_FILTER_STORAGE_KEY) || "all",
      [STOCK_SETTINGS_STORAGE_KEY]: JSON.parse(localStorage.getItem(STOCK_SETTINGS_STORAGE_KEY) || '{"allowTradeValues":false,"includeTradeValuesInTotals":false}'),
      [STOCK_MESSAGE_DRAFT_STORAGE_KEY]: localStorage.getItem(STOCK_MESSAGE_DRAFT_STORAGE_KEY) || "",
      [ACTIVITY_FILTER_STORAGE_KEY]: localStorage.getItem(ACTIVITY_FILTER_STORAGE_KEY) || "",
      [ACTIVITY_FILTER_STORAGE_KEY + "-kind"]: localStorage.getItem(ACTIVITY_FILTER_STORAGE_KEY + "-kind") || "all",
    },
  };
}

function downloadFullBackup() {
  const exportedAt = new Date().toISOString();
  const payload = JSON.stringify({ ...getBackupPayload(), exportedAt }, null, 2);
  const blob = new Blob([payload], { type: "application/json;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `sonny-full-backup-${formatTimestampForFilename(exportedAt)}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  saveLastBackupAt(exportedAt);
  logActivity("system", "Exported full backup", "Downloaded a full JSON backup of tracker, stock, fund, shipments, and logs.");
}

function applyBackupPayload(payload) {
  const backupData = payload?.data;
  if (!backupData || typeof backupData !== "object") {
    throw new Error("Backup file is missing its data bundle.");
  }

  const keysToRestore = [
    TRACKER_PROGRESS_STORAGE_KEY,
    STOCK_STORAGE_KEY,
    STOCK_STORAGE_MIRROR_KEY,
    FUND_STORAGE_KEY,
    SHIPMENT_STORAGE_KEY,
    SHIPMENT_SELECTION_STORAGE_KEY,
    SHIPMENT_TO_STOCK_RECOVERY_KEY,
    ACTIVITY_LOG_STORAGE_KEY,
    PRICE_HISTORY_STORAGE_KEY,
    LAST_BACKUP_STORAGE_KEY,
    ACTIVE_VIEW_KEY,
    FUND_FILTER_KEY,
    FUND_SORT_KEY,
    ACTIVE_SHIPMENT_KEY,
    STOCK_FILTER_STORAGE_KEY,
    STOCK_FILTER_STORAGE_KEY + "-status",
    STOCK_KIND_FILTER_STORAGE_KEY,
    STOCK_SORT_STORAGE_KEY,
    STOCK_DISPLAY_STORAGE_KEY,
    STOCK_CARD_DENSITY_STORAGE_KEY,
    STOCK_SETTINGS_STORAGE_KEY,
    STOCK_MESSAGE_DRAFT_STORAGE_KEY,
    ACTIVITY_FILTER_STORAGE_KEY,
    ACTIVITY_FILTER_STORAGE_KEY + "-kind",
  ];

  keysToRestore.forEach((key) => {
    if (!(key in backupData)) {
      return;
    }
    const value = backupData[key];
    if (typeof value === "string") {
      localStorage.setItem(key, value);
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  });

  localStorage.removeItem(LEGACY_SHARED_STOCK_STORAGE_KEY);
}

function downloadActivityLogCsv() {
  const header = ["timestamp", "kind", "title", "detail"];
  const rows = activityLog.map((entry) => [
    entry.createdAt,
    entry.kind,
    entry.title,
    entry.detail,
  ]);
  const csv = [header, ...rows]
    .map((row) => row.map(csvEscape).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `sonny-activity-log-${formatTimestampForFilename(new Date().toISOString())}.csv`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function totalValue() {
  return stock.reduce(
    (sum, item) =>
      sum + ((!item.justTrading || stockSettings.includeTradeValuesInTotals) ? Number(item.price || 0) * Number(item.quantity || 1) : 0),
    0,
  );
}

function averagePrice() {
  return stock.length ? totalValue() / stock.length : 0;
}

function uniqueCount() {
  return new Set(stock.map((item) => (item.sonnyId || item.name).trim().toLowerCase())).size;
}

function totalUnits() {
  return stock.reduce((sum, item) => sum + Number(item.quantity || 1), 0);
}

function totalSellingUnits() {
  return stock
    .filter((item) => !item.justTrading)
    .reduce((sum, item) => sum + Number(item.quantity || 1), 0);
}

function totalTradingUnits() {
  return stock
    .filter((item) => item.justTrading)
    .reduce((sum, item) => sum + Number(item.quantity || 1), 0);
}

function stockMessageItems() {
  return filteredStock().filter((item) => ["available", "pending"].includes(item.status));
}

function formatStockMessageLabel(item) {
  return `${item.series || ""} ${item.name || ""}`
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function formatStockMessagePrice(item) {
  if (item.justTrading && Number(item.price || 0) <= 0) {
    return "trade only";
  }
  return formatCurrency(Number(item.price || 0));
}

function buildStockMessage(items = stockMessageItems()) {
  const sortedItems = [...items].sort((a, b) => {
    const seriesCompare = String(a.series || "").localeCompare(String(b.series || ""));
    if (seriesCompare !== 0) {
      return seriesCompare;
    }
    return String(a.name || "").localeCompare(String(b.name || ""));
  });

  const grouped = new Map();
  sortedItems.forEach((item) => {
    const groupKey = normalizeText(item.series || "other");
    if (!grouped.has(groupKey)) {
      grouped.set(groupKey, []);
    }
    const quantity = Math.max(1, Number(item.quantity) || 1);
    const suffix = quantity > 1 ? ` x${quantity}` : "";
    grouped.get(groupKey).push(`${formatStockMessageLabel(item)} ${formatStockMessagePrice(item)}${suffix}`.trim());
  });

  const listing = Array.from(grouped.values())
    .map((lines) => lines.join("\n"))
    .join("\n\n");

  return [
    "ufs/uft! ❤️",
    "all are all for trade as well, willing to bundle too.",
    "",
    "😄 open to lowering prices esp. if bundling! ✨",
    "",
    "ship is $5.50. i accept paypal, venmo and zelle ❤️",
    "",
    listing || "no available sonnies right now",
  ].join("\n");
}

function setStockMessageStatus(message) {
  if (stockMessageStatus) {
    stockMessageStatus.textContent = message;
  }
}

function handleBuildStockMessage() {
  const items = stockMessageItems();
  stockMessageDraft = buildStockMessage(items);
  saveStockMessageDraft();
  if (stockMessageOutput) {
    stockMessageOutput.value = stockMessageDraft;
    stockMessageOutput.focus();
    stockMessageOutput.select();
    stockMessageOutput.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  setStockMessageStatus(
    `Built a message from ${items.length} ${items.length === 1 ? "stock card" : "stock cards"} in the current view.`,
  );
  if (buildStockMessageButton) {
    buildStockMessageButton.textContent = "Built";
    window.setTimeout(() => {
      if (buildStockMessageButton) {
        buildStockMessageButton.textContent = "Build From Current Stock";
      }
    }, 1400);
  }
}

window.buildStockMessageDraftNow = handleBuildStockMessage;

function filteredStock() {
  const search = normalizeText(stockSearch);
  const filtered = stock.filter((item) => {
    const matchesSearch =
      !search ||
      normalizeText(item.name).includes(search) ||
      normalizeText(item.series).includes(search);
    const matchesStatus = stockStatus === "all" || item.status === stockStatus;
    const matchesKind =
      stockKind === "all" ||
      (stockKind === "selling" && !item.justTrading) ||
      (stockKind === "trading" && item.justTrading);
    return matchesSearch && matchesStatus && matchesKind;
  });

  const sorted = [...filtered];
  sorted.sort((a, b) => {
    if (stockSort === "oldest") {
      return stock.findIndex((item) => item.id === a.id) - stock.findIndex((item) => item.id === b.id);
    }
    if (stockSort === "price-desc") {
      return b.price - a.price;
    }
    if (stockSort === "price-asc") {
      return a.price - b.price;
    }
    if (stockSort === "name-asc") {
      return a.name.localeCompare(b.name);
    }
    return stock.findIndex((item) => item.id === b.id) - stock.findIndex((item) => item.id === a.id);
  });
  return sorted;
}

function fundTotals() {
  const moneyIn = fundTransactions
    .filter((item) => item.type === "in")
    .reduce((sum, item) => sum + fundTransactionTotal(item), 0);
  const moneyOut = fundTransactions
    .filter((item) => item.type === "out")
    .reduce((sum, item) => sum + fundTransactionTotal(item), 0);
  const shipping = fundTransactions.reduce((sum, item) => sum + fundTransactionShipping(item), 0);
  const net = fundTransactions.reduce((sum, item) => sum + fundTransactionNetContribution(item), 0);

  return {
    moneyIn,
    moneyOut,
    shipping,
    balance: FUND_STARTING_BALANCE + net,
  };
}

function filteredFundTransactions() {
  const filtered = fundFilter === "all"
    ? [...fundTransactions]
    : (() => {
        const days = fundFilter === "7d" ? 7 : fundFilter === "30d" ? 30 : 90;
        const now = new Date("2026-03-14T12:00:00");
        const cutoff = new Date(now);
        cutoff.setDate(cutoff.getDate() - days);

        return fundTransactions.filter((item) => {
          if (!item.date) {
            return false;
          }
          const itemDate = new Date(`${item.date}T12:00:00`);
          return itemDate >= cutoff && itemDate <= now;
        });
      })();

  filtered.sort((a, b) => {
    const timeA = new Date(`${a.date || "1970-01-01"}T12:00:00`).getTime();
    const timeB = new Date(`${b.date || "1970-01-01"}T12:00:00`).getTime();
    return fundSort === "oldest" ? timeA - timeB : timeB - timeA;
  });

  return filtered;
}

function filteredFundTotals() {
  const visible = filteredFundTransactions();
  return {
    moneyIn: visible.filter((item) => item.type === "in").reduce((sum, item) => sum + fundTransactionTotal(item), 0),
    moneyOut: visible.filter((item) => item.type === "out").reduce((sum, item) => sum + fundTransactionTotal(item), 0),
    shipping: visible.reduce((sum, item) => sum + fundTransactionShipping(item), 0),
  };
}

function getActiveShipment() {
  return shipments.find((shipment) => shipment.id === activeShipmentId) || null;
}

function shipmentMetrics(shipment) {
  const sellTotal = shipment.items.reduce((sum, item) => sum + Number(item.sellPrice || 0) * Math.max(1, Number(item.quantity) || 1), 0);
  const keepTotal = shipment.items.reduce((sum, item) => sum + Number(item.keepPrice || 0) * Math.max(1, Number(item.quantity) || 1), 0);
  const unpricedCount = shipment.items.reduce(
    (sum, item) => sum + (item.sellPrice <= 0 && item.keepPrice <= 0 ? Math.max(1, Number(item.quantity) || 1) : 0),
    0,
  );
  const cashLoss = shipment.cost - sellTotal;
  const overallResult = sellTotal + keepTotal - shipment.cost;

  return {
    sellTotal,
    keepTotal,
    unpricedCount,
    cashLoss,
    overallResult,
  };
}

function resolveCatalogSelection() {
  return catalogByLabel.get(stockCatalogSearch.value.trim().toLowerCase()) || null;
}

function renderCatalogOptions() {
  stockCatalogOptions.innerHTML = "";
  stockCatalog.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.label;
    stockCatalogOptions.append(option);
  });
}

function renderCatalogPreview() {
  const selection = resolveCatalogSelection();
  if (!selection) {
    stockCatalogPreviewArt.className = "catalog-preview-art catalog-preview-art-empty";
    stockCatalogPreviewArt.style.backgroundImage = "";
    stockCatalogPreviewCopy.innerHTML = `
      <p class="eyebrow">Catalog Preview</p>
      <strong>Pick a Sonny from the tracker list</strong>
      <span>Search by name or series and choose a matching catalog result.</span>
    `;
    return;
  }

  stockCatalogPreviewArt.className = `catalog-preview-art${selection.imagePath ? " catalog-preview-art-mapped" : ""}`;
  stockCatalogPreviewArt.style.backgroundImage = selection.imagePath
    ? `url("${selection.imagePath}")`
    : "";
  stockCatalogPreviewCopy.innerHTML = `
    <p class="eyebrow">Catalog Preview</p>
    <strong>${selection.name}</strong>
    <span>${selection.series}</span>
  `;
}

function stockArtStyle(item) {
  const imagePath = displayImageForId(item.sonnyId);
  if (!imagePath) {
    return `
      background-image:
        radial-gradient(circle at 35% 35%, rgba(247, 205, 215, 0.85), transparent 45%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(248, 238, 225, 0.92));
    `;
  }

  return `
    background-image: url("${imagePath}");
  `;
}

function hasMappedStockArt(item) {
  return Boolean(displayImageForId(item.sonnyId));
}

function renderSummary() {
  const cards =
    activeView === "stock"
      ? [
          ["Total Sonnies", String(totalUnits())],
          ["Total Selling", String(totalSellingUnits())],
          ["Total Trading", String(totalTradingUnits())],
          ["Total Stock Price", formatCurrency(totalValue())],
        ]
      : activeView === "fund"
        ? [
            ["Current Balance", formatCurrency(fundTotals().balance)],
            ["Money In", formatCurrency(filteredFundTotals().moneyIn)],
            ["Money Out", formatCurrency(filteredFundTotals().moneyOut)],
            ["View", fundFilter === "7d" ? "Past 7 days" : fundFilter === "30d" ? "Past 30 days" : fundFilter === "90d" ? "Past 3 months" : "Lifetime"],
          ]
      : activeView === "shipments"
          ? (() => {
              const shipment = getActiveShipment();
              if (!shipment) {
                return [
                  ["Saved Plans", String(shipments.length)],
                  ["Original Payment", formatCurrency(0)],
                  ["Selling Total", formatCurrency(0)],
                  ["Keeping Total", formatCurrency(0)],
                ];
              }

              const metrics = shipmentMetrics(shipment);
              return [
                ["Saved Plans", String(shipments.length)],
                ["Original Payment", formatCurrency(shipment.cost)],
                ["Selling Total", formatCurrency(metrics.sellTotal)],
                ["Keeping Total", formatCurrency(metrics.keepTotal)],
              ];
            })()
          : activeView === "settings"
            ? [
                ["Sonny Fund", stockSettings.useFund ? "On" : "Off"],
                ["Trade Values", stockSettings.allowTradeValues ? "On" : "Off"],
                ["Use In Total", stockSettings.includeTradeValuesInTotals ? "On" : "Off"],
                ["Total Stock Price", formatCurrency(totalValue())],
              ]
          : [
              ["Logged Events", String(activityLog.length)],
              ["Stock Actions", String(activityLog.filter((item) => item.kind === "stock").length)],
              ["Fund Actions", String(activityLog.filter((item) => item.kind === "fund").length)],
              ["Shipment Actions", String(activityLog.filter((item) => item.kind === "shipment").length)],
            ];

  summaryGrid.innerHTML = "";
  cards.forEach(([label, value]) => {
    const card = document.createElement("div");
    card.className = "summary-card";
    card.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
    summaryGrid.append(card);
  });
}

function priceHistoryForItem(item) {
  const figureKey = figureKeyForItem(item);
  return priceHistory
    .filter((entry) => entry.figureKey === figureKey)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function uniquePricePoints(entries) {
  const seen = new Set();
  return entries.filter((entry) => {
    const key = entry.price.toFixed(2);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function soldHistoryForItem(item) {
  return Array.isArray(item.soldHistory)
    ? [...item.soldHistory].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];
}

function updateItem(id, updates) {
  let previousItem = null;
  stock = stock.map((item) => {
    if (item.id !== id) {
      return item;
    }
    previousItem = item;
    return { ...item, ...updates };
  });
  saveStock();
  render();
  return previousItem;
}

function removeItem(id) {
  const removed = stock.find((item) => item.id === id);
  stock = stock.filter((item) => item.id !== id);
  saveStock();
  removeShipmentRecoveryItems([id]);
  if (removed) {
    logActivity("stock", `Removed ${removed.name} from stock`, `Removed stock card priced at ${formatCurrency(removed.price)}.`);
  }
  render();
}

function removeFundTransaction(id) {
  const removed = fundTransactions.find((item) => item.id === id);
  fundTransactions = fundTransactions.filter((item) => item.id !== id);
  saveFundTransactions();
  if (removed) {
    logActivity(
      "fund",
      `Removed fund movement`,
      `${removed.label} was deleted from the Sonny fund log.`,
    );
  }
  render();
}

function updateFundTransaction(id, updates) {
  let previous = null;
  fundTransactions = fundTransactions.map((item) => {
    if (item.id !== id) {
      return item;
    }
    previous = item;
    return { ...item, ...updates };
  });
  saveFundTransactions();
  return previous;
}

function updateShipment(id, updates) {
  shipments = shipments.map((shipment) =>
    shipment.id === id ? { ...shipment, ...updates } : shipment,
  );
  saveShipments();
  render();
}

function removeShipment(id) {
  const removed = shipments.find((shipment) => shipment.id === id);
  clearShipmentSelection(id);
  shipments = shipments.filter((shipment) => shipment.id !== id);
  if (!shipments.length) {
    const replacement = {
      id: crypto.randomUUID(),
      name: "New Shipment",
      cost: 0,
      items: [],
    };
    shipments = [replacement];
  }
  if (!shipments.some((shipment) => shipment.id === activeShipmentId)) {
    activeShipmentId = shipments[0].id;
  }
  saveShipments();
  saveActiveShipmentId();
  if (removed) {
    logActivity("shipment", `Removed shipment ${removed.name}`, `Deleted a shipment plan with ${removed.items.length} items.`);
  }
  render();
}

function addShipmentRows(shipmentId, count) {
  const safeCount = Math.max(1, Math.min(100, Number.parseInt(count, 10) || 1));
  const rows = Array.from({ length: safeCount }, () => ({
    id: crypto.randomUUID(),
    sonnyId: "",
    name: "",
    quantity: 1,
    sellPrice: 0,
    keepPrice: 0,
  }));

  shipments = shipments.map((shipment) =>
    shipment.id === shipmentId
      ? { ...shipment, items: [...shipment.items, ...rows] }
      : shipment,
  );
  saveShipments();
  logActivity("shipment", `Added ${safeCount} shipment row${safeCount === 1 ? "" : "s"}`, `Created blank planning rows in ${getActiveShipment()?.name || "a shipment"}.`);
  render();
}

function updateShipmentItem(shipmentId, itemId, updates) {
  shipments = shipments.map((shipment) =>
    shipment.id === shipmentId
      ? {
          ...shipment,
          items: shipment.items.map((item) => (item.id === itemId ? { ...item, ...updates } : item)),
        }
      : shipment,
  );
  saveShipments();
  render();
}

function removeShipmentItem(shipmentId, itemId) {
  const shipment = shipments.find((entry) => entry.id === shipmentId);
  const item = shipment?.items.find((entry) => entry.id === itemId);
  const nextSelectedItemIds = selectedShipmentItemIdsFor(shipmentId).filter((id) => id !== itemId);
  setSelectedShipmentItemIds(shipmentId, nextSelectedItemIds);
  shipments = shipments.map((entry) =>
    entry.id === shipmentId
      ? { ...entry, items: entry.items.filter((row) => row.id !== itemId) }
      : entry,
  );
  saveShipments();
  if (item) {
    logActivity("shipment", `Removed shipment item`, `${item.name || "Untitled Sonny"} was removed from ${shipment?.name || "the shipment"}.`);
  }
  render();
}

function addShipmentItemToStock(shipment, item) {
  const catalogMatch = item.sonnyId
    ? stockCatalog.find((entry) => entry.id === item.sonnyId) || inferCatalogItemFromName(item.name)
    : inferCatalogItemFromName(item.name);
  const price = item.sellPrice > 0 ? item.sellPrice : item.keepPrice;
  const quantity = Math.max(1, Number(item.quantity) || 1);
  const stockItem = {
    id: crypto.randomUUID(),
    sonnyId: catalogMatch?.id || "",
    name: catalogMatch?.name || item.name || "Untitled Sonny",
    series: catalogMatch?.series || "",
    quantity,
    status: "available",
    justTrading: item.sellPrice <= 0,
    price: Number(price || 0),
    createdAt: new Date().toISOString(),
  };

  const recoveryQueue = loadShipmentRecoveryQueue();
  saveShipmentRecoveryQueue([stockItem, ...recoveryQueue.filter((entry) => entry.id !== stockItem.id)]);
  stock = [stockItem, ...stock];
  saveStock();
  resetStockFiltersForNewItem();
  addPriceHistoryEntry(stockItem, { source: "shipment" });
  logActivity(
    "stock",
    `Moved ${stockItem.name} from shipment to stock`,
    stockItem.justTrading
      ? `${stockItem.quantity} ${stockItem.quantity === 1 ? "unit" : "units"} of ${stockItem.name} were sent from ${shipment.name} to stock as trade-only.`
      : `${stockItem.quantity} ${stockItem.quantity === 1 ? "unit" : "units"} of ${stockItem.name} were sent from ${shipment.name} to stock at ${formatCurrency(stockItem.price)} each.`,
  );
}

function toggleShipmentItemSelection(shipmentId, itemId, isSelected) {
  const selectedShipmentItemIds = selectedShipmentItemIdsFor(shipmentId);
  setSelectedShipmentItemIds(
    shipmentId,
    isSelected
      ? [...selectedShipmentItemIds, itemId]
      : selectedShipmentItemIds.filter((id) => id !== itemId),
  );
}

function clearShipmentSelection(shipmentId) {
  setSelectedShipmentItemIds(shipmentId, []);
}

function resetStockFiltersForNewItem() {
  stockSearch = "";
  stockStatus = "all";
  stockKind = "all";
  stockSort = "newest";
  saveStockSearch();
  saveStockStatus();
  saveStockKind();
  saveStockSort();
}

function sendSelectedShipmentItemsToStock(shipment) {
  const selectedShipmentItemIds = selectedShipmentItemIdsFor(shipment.id);
  const selectedItems = shipment.items.filter((item) => selectedShipmentItemIds.includes(item.id));
  if (!selectedItems.length) {
    return;
  }

  selectedItems.forEach((item) => {
    addShipmentItemToStock(shipment, item);
  });

  logActivity(
    "shipment",
    "Sent selected shipment items to stock",
    `${selectedItems.length} shipment ${selectedItems.length === 1 ? "row was" : "rows were"} sent from ${shipment.name} to stock.`,
  );
  clearShipmentSelection(shipment.id);
}

function renderInventory() {
  inventoryGrid.innerHTML = "";
  inventoryGrid.classList.toggle("is-shelf-view", stockDisplayMode === "shelf");
  inventoryGrid.classList.toggle("is-compact-cards", stockDisplayMode !== "shelf" && stockCardDensity === "compact");
  const visibleStock = filteredStock();
  stockResultsCount.textContent = `${visibleStock.length} stock card${visibleStock.length === 1 ? "" : "s"} showing`;

  if (!stock.length) {
    inventoryGrid.innerHTML =
      '<div class="empty-state">Your shelf is empty right now. Add a Sonny from the tracker list to start your stock list.</div>';
    return;
  }

  if (!visibleStock.length) {
    inventoryGrid.innerHTML =
      '<div class="empty-state">No stock cards match this search or status filter yet.</div>';
    return;
  }

  if (stockDisplayMode === "shelf") {
    visibleStock.forEach((item) => {
      const tile = document.createElement("article");
      const imagePath = displayImageForId(item.sonnyId);
      tile.className = "shelf-tile";
      tile.innerHTML = `
        ${
          imagePath
            ? `<div class="shelf-figure shelf-figure-mapped"><img class="shelf-figure-image" src="${imagePath}" alt="${item.name}" loading="lazy" /></div>`
            : '<div class="shelf-figure shelf-figure-empty"></div>'
        }
        <div class="shelf-meta">
          <span class="shelf-price-row">
            <span class="shelf-status-dot" data-status="${item.status}" aria-hidden="true"></span>
            <span class="shelf-price">${item.justTrading ? "Trade" : formatCurrency(item.price)}</span>
          </span>
        </div>
      `;
      inventoryGrid.append(tile);
      if (imagePath) {
        const shelfImage = tile.querySelector(".shelf-figure-image");
        hydrateShelfFigureImage(shelfImage, imagePath);
      }
    });
    return;
  }

  visibleStock.forEach((item) => {
    const fragment = cardTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".stock-card");
    const art = fragment.querySelector(".stock-card-art");
    const statusPill = fragment.querySelector(".stock-status-pill");
    const seriesInput = fragment.querySelector(".series-input");
    const nameInput = fragment.querySelector(".name-input");
    const priceInput = fragment.querySelector(".price-input");
    const quantityInput = fragment.querySelector(".quantity-input");
    const statusSelect = fragment.querySelector(".status-select");
    const justTradingInput = fragment.querySelector(".just-trading-input");
    const historyPanel = fragment.querySelector(".stock-history-panel");
    const historySummary = fragment.querySelector(".stock-history-summary");
    const historyList = fragment.querySelector(".stock-history-list");
    const historyButton = fragment.querySelector(".stock-history-button");
    const soldButton = fragment.querySelector(".stock-sold-button");
    const removeButton = fragment.querySelector(".remove-button");
    const historyEntries = priceHistoryForItem(item);
    const soldEntries = soldHistoryForItem(item);
    const uniqueEntries = uniquePricePoints(historyEntries);
    const previousEntries = uniqueEntries.filter((entry) => entry.stockItemId !== item.id || entry.price !== Number(item.price || 0));
    const statusOptions = item.justTrading
      ? [
          ["available", "Available"],
          ["pending", "Pending"],
          ["traded", "Traded"],
        ]
      : [
          ["available", "Available"],
          ["pending", "Pending"],
          ["sold", "Sold"],
        ];

    card.dataset.status = item.status;
    card.dataset.tradeOnly = item.justTrading ? "true" : "false";
    art.setAttribute("style", stockArtStyle(item));
    art.classList.toggle("stock-card-art-mapped", hasMappedStockArt(item));
    statusPill.dataset.status = item.status;
    statusPill.textContent = item.status;
    seriesInput.value = item.series || "Manual entry";
    nameInput.value = item.name;
    priceInput.value = item.justTrading && !stockSettings.allowTradeValues ? "" : Number(item.price).toFixed(2);
    priceInput.disabled = item.justTrading && !stockSettings.allowTradeValues;
    quantityInput.value = String(item.quantity || 1);
    statusSelect.innerHTML = statusOptions
      .map(([value, label]) => `<option value="${value}">${label}</option>`)
      .join("");
    statusSelect.value = item.status;
    justTradingInput.checked = Boolean(item.justTrading);
    historyButton.textContent = expandedHistoryItemId === item.id ? "Hide History" : "Show History";
    soldButton.disabled = item.status === "sold" || item.justTrading;
    soldButton.textContent = item.status === "sold"
      ? "Already Sold"
      : item.justTrading
        ? "Trading Only"
        : "Mark as Sold";
    historyPanel.hidden = expandedHistoryItemId !== item.id;

    if (historyEntries.length || soldEntries.length) {
      const prices = historyEntries.map((entry) => entry.price);
      const low = prices.length ? Math.min(...prices) : 0;
      const high = prices.length ? Math.max(...prices) : 0;
      historySummary.innerHTML = `
        <strong>${item.name} has ${soldEntries.length} sold log${soldEntries.length === 1 ? "" : "s"} and ${uniqueEntries.length} tracked price${uniqueEntries.length === 1 ? "" : "s"}.</strong>
        <span>${
          historyEntries.length
            ? `Price range: ${formatCurrency(low)} to ${formatCurrency(high)}. Latest tracked price: ${formatCurrency(historyEntries[0].price)} on ${formatTimestamp(historyEntries[0].createdAt)}.`
            : "No price changes have been tracked for this Sonny yet."
        }</span>
      `;
    } else {
      historySummary.innerHTML = `
        <strong>No history yet.</strong>
        <span>Once this Sonny gets repriced or marked sold, its history will show up here.</span>
      `;
    }

    const soldHistoryMarkup = soldEntries.length
      ? `
        <div class="stock-history-section">
          <strong class="stock-history-section-title">Sold History</strong>
          ${soldEntries
            .slice(0, 6)
            .map((entry) => `
              <article class="stock-history-entry is-sale">
                <strong>${entry.amount !== null ? formatCurrency(entry.amount) : "Sold"}</strong>
                <span>${entry.buyer ? `Buyer: ${entry.buyer}. ` : ""}${entry.quantity > 1 ? `Quantity: ${entry.quantity}. ` : ""}Logged on ${formatTimestamp(entry.createdAt)}</span>
              </article>
            `)
            .join("")}
        </div>
      `
      : `
        <div class="stock-history-section">
          <strong class="stock-history-section-title">Sold History</strong>
          <div class="stock-history-empty">
            No sold logs yet. Use Mark as Sold to save who bought it and for how much.
          </div>
        </div>
      `;

    const priceHistoryMarkup = previousEntries.length
      ? `
        <div class="stock-history-section">
          <strong class="stock-history-section-title">Price History</strong>
          ${previousEntries
            .slice(0, 6)
            .map((entry) => `
              <article class="stock-history-entry">
                <strong>${formatCurrency(entry.price)}</strong>
                <span>${entry.source === "updated" ? "Updated price" : entry.source === "shipment" ? "Sent from shipment" : "Added to stock"} on ${formatTimestamp(entry.createdAt)}</span>
              </article>
            `)
            .join("")}
        </div>
      `
      : `
        <div class="stock-history-section">
          <strong class="stock-history-section-title">Price History</strong>
          <div class="stock-history-empty">
            No older prices for this figure yet. Starting now, the tracker will keep every stocked and updated price here.
          </div>
        </div>
      `;

    historyList.innerHTML = soldHistoryMarkup + priceHistoryMarkup;

    priceInput.addEventListener("change", (event) => {
      const nextPrice = event.target.value === "" ? 0 : Number.parseFloat(event.target.value);
      const safePrice = Number.isFinite(nextPrice) ? nextPrice : 0;
      const previous = updateItem(item.id, {
        price: safePrice,
      });
      if (previous && previous.price !== safePrice) {
        addPriceHistoryEntry({ ...item, price: safePrice }, { source: "updated" });
        logActivity(
          "stock",
          `Updated stock price for ${item.name}`,
          `${item.name} changed from ${formatCurrency(previous.price)} to ${formatCurrency(safePrice)}.`,
        );
      }
    });

    quantityInput.addEventListener("change", (event) => {
      const nextQuantity = Math.max(1, Number.parseInt(event.target.value || "1", 10) || 1);
      const previous = updateItem(item.id, { quantity: nextQuantity });
      if (previous && previous.quantity !== nextQuantity) {
        logActivity("stock", `Updated quantity for ${item.name}`, `${item.name} quantity changed from ${previous.quantity} to ${nextQuantity}.`);
      }
    });

    justTradingInput.addEventListener("change", (event) => {
      const nextTrading = event.target.checked;
      const nextStatus = nextTrading
        ? item.status === "sold" ? "traded" : normalizeStockStatus(item.status, true)
        : item.status === "traded" ? "available" : normalizeStockStatus(item.status, false);
      const previous = updateItem(item.id, {
        justTrading: nextTrading,
        status: nextStatus,
        price: nextTrading ? 0 : item.price,
      });
      if (previous && previous.justTrading !== nextTrading) {
        logActivity(
          "stock",
          `${nextTrading ? "Enabled" : "Disabled"} just trading for ${item.name}`,
          nextTrading
            ? `${item.name} is now trade-only, no longer has a sale price, and uses traded status tracking.`
            : `${item.name} is no longer trade-only and is back on selling statuses.`,
        );
        if (!nextTrading) {
          addPriceHistoryEntry(item, { source: "updated" });
        }
      }
    });

    historyButton.addEventListener("click", () => {
      expandedHistoryItemId = expandedHistoryItemId === item.id ? "" : item.id;
      render();
    });

    statusSelect.addEventListener("change", (event) => {
      const nextStatus = event.target.value;
      const previous = updateItem(item.id, { status: nextStatus });
      if (previous && previous.status !== nextStatus) {
        logActivity("stock", `Updated status for ${item.name}`, `${item.name} moved from ${previous.status} to ${nextStatus}.`);
      }
    });

    soldButton.addEventListener("click", () => {
      if (item.status === "sold" || item.justTrading) {
        return;
      }

      const shouldProceed = window.confirm(`Mark ${item.name} as sold?`);
      if (!shouldProceed) {
        return;
      }

      const buyerResponse = window.prompt(`Who bought ${item.name}? Leave blank if you don't want to save a buyer.`);
      if (buyerResponse === null) {
        return;
      }
      const amountResponse = window.prompt(`How much did it sell for? Leave blank if you don't want to save an amount.`);
      if (amountResponse === null) {
        return;
      }
      const parsedAmount = amountResponse.trim() === "" ? null : Number.parseFloat(amountResponse);
      const saleAmount = Number.isFinite(parsedAmount) ? parsedAmount : null;
      const soldRecord = {
        id: crypto.randomUUID(),
        buyer: buyerResponse.trim(),
        amount: saleAmount,
        quantity: Math.max(1, Number(item.quantity) || 1),
        createdAt: new Date().toISOString(),
      };

      const previous = updateItem(item.id, {
        status: "sold",
        soldHistory: [...soldEntries, soldRecord],
      });
      if (previous && previous.status !== "sold") {
        logActivity(
          "stock",
          `Marked ${item.name} as sold`,
          `${item.name} was marked sold${soldRecord.amount !== null ? ` for ${formatCurrency(soldRecord.amount)}` : ""}${soldRecord.buyer ? ` to ${soldRecord.buyer}` : ""}.`,
        );
      }
      render();
    });

    removeButton.addEventListener("click", () => {
      removeItem(item.id);
    });

    inventoryGrid.append(fragment);
  });
}

function renderFundList() {
  fundList.innerHTML = "";

  if (!fundTransactions.length) {
    fundList.innerHTML =
      '<div class="empty-state">No fund movements yet. Add money in or money out to start tracking.</div>';
    return;
  }

  const visibleTransactions = filteredFundTransactions();
  const balancesById = new Map();
  let runningBalance = FUND_STARTING_BALANCE;
  fundTransactions.forEach((item) => {
    runningBalance += fundTransactionNetContribution(item);
    balancesById.set(item.id, runningBalance);
  });
  let hasVisibleTransactions = false;

  visibleTransactions.forEach((item) => {
    hasVisibleTransactions = true;

    const fragment = fundRowTemplate.content.cloneNode(true);
    const row = fragment.querySelector(".fund-row");
    const labelInput = fragment.querySelector(".fund-label-input");
    const amountFieldLabel = fragment.querySelector(".fund-amount-field-label");
    const amountInput = fragment.querySelector(".fund-amount-input");
    const dateInput = fragment.querySelector(".fund-date-input");
    const typeInput = fragment.querySelector(".fund-type-input");
    const sonniesInput = fragment.querySelector(".fund-sonnies-input");
    const sonnyPreviewList = fragment.querySelector(".fund-sonny-preview-list");
    const shippingInput = fragment.querySelector(".fund-shipping-input");
    const personInput = fragment.querySelector(".fund-person-input");
    const paidViaInput = fragment.querySelector(".fund-paid-via-input");
    const sentToRealFundInput = fragment.querySelector(".fund-sent-to-real-fund-input");
    const sentToRealFundLabel = fragment.querySelector(".fund-sent-to-real-fund-label");
    const balance = fragment.querySelector(".fund-row-balance");
    const removeButton = fragment.querySelector(".remove-button");

    row.classList.add(item.type === "in" ? "is-in" : "is-out");
    labelInput.value = item.label;
    dateInput.value = item.date;
    typeInput.value = item.type;
    setFundSonnyIds(sonniesInput, item.sonnyIds);
    setFundSonnyPriceMap(sonniesInput, normalizeFundSonnyPriceMap(item.figurePricesById, item.sonnyIds, item.figurePrice));
    sonniesInput.value = "";
    renderFundSonnyPreview(sonnyPreviewList, item.sonnyIds, getFundSonnyPriceMap(sonniesInput));
    shippingInput.value = fundTransactionShipping(item) > 0 ? fundTransactionShipping(item).toFixed(2) : "";
    amountInput.value = Number(fundTransactionTotal(item)).toFixed(2);
    personInput.value = item.person || "";
    paidViaInput.value = ["venmo", "zelle", "paypal"].includes(item.paidVia) ? item.paidVia : "";
    sentToRealFundInput.checked = Boolean(item.sentToRealFund);
    if (amountFieldLabel) {
      amountFieldLabel.textContent = "Total amount";
    }
    if (sentToRealFundLabel) {
      sentToRealFundLabel.textContent = fundRealToggleLabel(item.type);
    }
    balance.textContent = `Balance after movement: ${formatCurrency(balancesById.get(item.id) || FUND_STARTING_BALANCE)}`;

    labelInput.addEventListener("change", (event) => {
      const previous = updateFundTransaction(item.id, { label: event.target.value });
      if (previous && previous.label !== event.target.value) {
        logActivity("fund", `Renamed fund movement`, `Changed "${previous.label}" to "${event.target.value}".`);
      }
      render();
    });
    dateInput.addEventListener("change", (event) => {
      const previous = updateFundTransaction(item.id, { date: event.target.value });
      if (previous && previous.date !== event.target.value) {
        logActivity("fund", `Updated movement date`, `${item.label} moved to ${event.target.value}.`);
      }
      render();
    });
    typeInput.addEventListener("change", (event) => {
      const nextType = event.target.value === "in" ? "in" : "out";
      if (sentToRealFundLabel) {
        sentToRealFundLabel.textContent = fundRealToggleLabel(nextType);
      }
      const previous = updateFundTransaction(item.id, { type: nextType });
      if (previous && previous.type !== nextType) {
        logActivity("fund", `Updated movement type`, `${item.label} is now tracked as money ${nextType}.`);
      }
      render();
    });
    sonniesInput.addEventListener("change", (event) => {
      const sonnyIds = appendFundSonnyFromInput(sonniesInput, sonnyPreviewList);
      const nextPriceMap = normalizeFundSonnyPriceMap(getFundSonnyPriceMap(sonniesInput), sonnyIds);
      setFundSonnyPriceMap(sonniesInput, nextPriceMap);
      renderFundSonnyPreview(sonnyPreviewList, sonnyIds, nextPriceMap);
      const previous = updateFundTransaction(item.id, { sonnyIds });
      if (previous && JSON.stringify(previous.sonnyIds || []) !== JSON.stringify(sonnyIds)) {
        logActivity("fund", `Updated transaction Sonnies`, `${item.label} now tracks ${sonnyIds.length} ${sonnyIds.length === 1 ? "Sonny" : "Sonnies"}.`);
      }
      updateFundTransaction(item.id, {
        figurePricesById: nextPriceMap,
        figurePrice: Number.isFinite(commonFundSonnyPrice(sonnyIds, nextPriceMap)) ? commonFundSonnyPrice(sonnyIds, nextPriceMap) : 0,
      });
      render();
    });
    sonnyPreviewList.addEventListener("click", (event) => {
      const removeButton = event.target.closest(".fund-sonny-chip-remove");
      if (!removeButton) {
        return;
      }
      const nextIds = getFundSonnyIds(sonniesInput).filter((sonnyId) => sonnyId !== removeButton.dataset.sonnyId);
      setFundSonnyIds(sonniesInput, nextIds);
      const nextPriceMap = normalizeFundSonnyPriceMap(getFundSonnyPriceMap(sonniesInput), nextIds);
      setFundSonnyPriceMap(sonniesInput, nextPriceMap);
      renderFundSonnyPreview(sonnyPreviewList, nextIds, nextPriceMap);
      const previous = updateFundTransaction(item.id, {
        sonnyIds: nextIds,
        figurePricesById: nextPriceMap,
        figurePrice: Number.isFinite(commonFundSonnyPrice(nextIds, nextPriceMap)) ? commonFundSonnyPrice(nextIds, nextPriceMap) : 0,
      });
      if (previous && JSON.stringify(previous.sonnyIds || []) !== JSON.stringify(nextIds)) {
        logActivity("fund", `Updated transaction Sonnies`, `${item.label} now tracks ${nextIds.length} ${nextIds.length === 1 ? "Sonny" : "Sonnies"}.`);
      }
      render();
    });
    sonnyPreviewList.addEventListener("input", (event) => {
      const priceInput = event.target.closest(".fund-sonny-chip-price-input");
      if (!priceInput) {
        return;
      }
      const sonnyIds = getFundSonnyIds(sonniesInput);
      const nextPriceMap = normalizeFundSonnyPriceMap(getFundSonnyPriceMap(sonniesInput), sonnyIds);
      const rawValue = priceInput.value === "" ? null : Number.parseFloat(priceInput.value);
      if (Number.isFinite(rawValue) && rawValue > 0) {
        nextPriceMap[priceInput.dataset.sonnyId] = rawValue;
      } else {
        delete nextPriceMap[priceInput.dataset.sonnyId];
      }
      setFundSonnyPriceMap(sonniesInput, nextPriceMap);
      updateFundTransaction(item.id, {
        figurePricesById: nextPriceMap,
        figurePrice: Number.isFinite(commonFundSonnyPrice(sonnyIds, nextPriceMap)) ? commonFundSonnyPrice(sonnyIds, nextPriceMap) : 0,
      });
    });
    shippingInput.addEventListener("change", (event) => {
      const nextAmount = event.target.value === "" ? 0 : Number.parseFloat(event.target.value);
      const safeAmount = Number.isFinite(nextAmount) ? Math.max(0, nextAmount) : 0;
      const previous = updateFundTransaction(item.id, {
        shipping: safeAmount,
      });
      if (previous && fundTransactionShipping(previous) !== safeAmount) {
        logActivity("fund", `Updated shipping`, `${item.label} shipping changed from ${formatCurrency(fundTransactionShipping(previous))} to ${formatCurrency(safeAmount)}.`);
      }
      render();
    });
    amountInput.addEventListener("change", (event) => {
      const nextAmount = event.target.value === "" ? 0 : Number.parseFloat(event.target.value);
      const safeAmount = Number.isFinite(nextAmount) ? nextAmount : 0;
      const previous = updateFundTransaction(item.id, {
        amount: safeAmount,
      });
      if (previous && previous.amount !== safeAmount) {
        logActivity("fund", `Updated movement amount`, `${item.label} changed from ${formatCurrency(previous.amount)} to ${formatCurrency(safeAmount)}.`);
      }
      render();
    });

    personInput.addEventListener("change", (event) => {
      const nextPerson = event.target.value.trim();
      const previous = updateFundTransaction(item.id, {
        person: nextPerson,
      });
      if (previous && previous.person !== nextPerson) {
        logActivity("fund", `Updated person`, `${item.label} is now linked to ${nextPerson || "no person"}.`);
      }
      render();
    });
    paidViaInput.addEventListener("change", (event) => {
      const nextPaidVia = ["venmo", "zelle", "paypal"].includes(event.target.value) ? event.target.value : "";
      const previous = updateFundTransaction(item.id, {
        paidVia: nextPaidVia,
      });
      if (previous && previous.paidVia !== nextPaidVia) {
        logActivity("fund", `Updated payment method`, `${item.label} is now marked as ${nextPaidVia || "no payment method set"}.`);
      }
      render();
    });

    sentToRealFundInput.addEventListener("change", (event) => {
      const previous = updateFundTransaction(item.id, {
        sentToRealFund: Boolean(event.target.checked),
      });
      if (previous && previous.sentToRealFund !== Boolean(event.target.checked)) {
        logActivity("fund", `Updated real fund status`, `${item.label} was marked ${event.target.checked ? "sent to the real fund" : "not sent to the real fund yet"}.`);
      }
      render();
    });

    removeButton.addEventListener("click", () => {
      removeFundTransaction(item.id);
    });

    fundList.append(fragment);
  });

  if (!hasVisibleTransactions) {
    fundList.innerHTML =
      '<div class="empty-state">No movements match this date filter yet. Switch the range or add a new movement.</div>';
  }
}

function renderShipmentList() {
  shipmentList.innerHTML = "";

  shipments.forEach((shipment) => {
    const fragment = shipmentListItemTemplate.content.cloneNode(true);
    const button = fragment.querySelector(".shipment-list-item");
    const name = fragment.querySelector(".shipment-list-name");
    const meta = fragment.querySelector(".shipment-list-meta");
    const metrics = shipmentMetrics(shipment);
    const totalUnits = shipment.items.reduce((sum, item) => sum + Math.max(1, Number(item.quantity) || 1), 0);

    button.classList.toggle("is-active", shipment.id === activeShipmentId);
    name.textContent = shipment.name;
    meta.textContent = `${totalUnits} ${totalUnits === 1 ? "unit" : "units"} • ${shipment.items.length} ${shipment.items.length === 1 ? "row" : "rows"} • ${formatCurrency(shipment.cost)} paid • ${formatCurrency(metrics.sellTotal)} selling`;

    button.addEventListener("click", () => {
      activeShipmentId = shipment.id;
      saveActiveShipmentId();
      render();
    });

    shipmentList.append(fragment);
  });
}

function renderShipmentEditor() {
  const shipment = getActiveShipment();

  if (!shipment) {
    shipmentPlanTitle.textContent = "Select a shipment";
    shipmentPlanCopy.textContent =
      "Create a shipment plan on the left to start splitting what you will sell and what you will keep.";
    shipmentEditor.innerHTML =
      '<div class="shipment-empty">No shipment selected yet. Create one to start planning.</div>';
    return;
  }

  const metrics = shipmentMetrics(shipment);
  const selectedShipmentItemIds = selectedShipmentItemIdsFor(shipment.id).filter((itemId) =>
    shipment.items.some((item) => item.id === itemId),
  );
  setSelectedShipmentItemIds(shipment.id, selectedShipmentItemIds);
  shipmentPlanTitle.textContent = shipment.name;
  shipmentPlanCopy.textContent =
    metrics.unpricedCount > 0
      ? `${metrics.unpricedCount} unit${metrics.unpricedCount === 1 ? "" : "s"} still need pricing in this shipment.`
      : "Everything in this shipment has a sell or keep value.";

  shipmentEditor.innerHTML = `
    <section class="shipment-overview">
      <article class="shipment-stat">
        <span>Original payment</span>
        <strong>${formatCurrency(shipment.cost)}</strong>
      </article>
      <article class="shipment-stat">
        <span>Selling total</span>
        <strong>${formatCurrency(metrics.sellTotal)}</strong>
      </article>
      <article class="shipment-stat">
        <span>Keeping total</span>
        <strong>${formatCurrency(metrics.keepTotal)}</strong>
      </article>
      <article class="shipment-stat ${metrics.cashLoss > 0 ? "is-warning" : "is-success"}">
        <span>Cash loss</span>
        <strong>${formatCurrency(metrics.cashLoss)}</strong>
      </article>
      <article class="shipment-stat ${metrics.overallResult >= 0 ? "is-success" : "is-warning"}">
        <span>Overall result</span>
        <strong>${formatCurrency(metrics.overallResult)}</strong>
      </article>
      <article class="shipment-stat">
        <span>Unpriced</span>
        <strong>${metrics.unpricedCount}</strong>
      </article>
    </section>
    <p class="shipment-stat-copy">
      Cash loss matches your sheet style: original payment minus what you will sell. Overall result also counts the value of what you are keeping.
    </p>
    <section class="shipment-controls">
      <div class="shipment-forms">
        <form class="shipment-inline-form" id="shipment-meta-form">
          <label class="field">
            <span>Shipment name</span>
            <input id="shipment-edit-name" type="text" />
          </label>
          <label class="field">
            <span>Original payment</span>
            <div class="price-input-wrap">
              <span class="currency">$</span>
              <input id="shipment-edit-cost" type="number" min="0" step="0.01" inputmode="decimal" />
            </div>
          </label>
        </form>
        <form class="shipment-inline-form" id="shipment-row-form">
          <label class="field">
            <span>Add empty rows</span>
            <input id="shipment-row-count" type="number" min="1" max="100" step="1" inputmode="numeric" value="5" />
          </label>
          <button class="primary-button" type="submit">Add Rows</button>
        </form>
      </div>
      <button class="remove-button" id="remove-shipment-button" type="button">Remove Shipment</button>
    </section>
    <section class="shipment-items-panel">
      <div class="shipment-items-header">
        <div>
          <p class="eyebrow">Shipment Items</p>
          <h2>Sell vs keep breakdown</h2>
        </div>
        <div class="shipment-bulk-actions">
          <span class="shipment-selection-count">${selectedShipmentItemIds.length} selected</span>
          <button class="ghost-button" id="send-selected-shipment-items" type="button"${selectedShipmentItemIds.length ? "" : " disabled"}>
            Send Selected To Stock
          </button>
        </div>
      </div>
      <div class="shipment-item-list" id="shipment-item-list"></div>
    </section>
  `;

  const metaNameInput = shipmentEditor.querySelector("#shipment-edit-name");
  const metaCostInput = shipmentEditor.querySelector("#shipment-edit-cost");
  const rowForm = shipmentEditor.querySelector("#shipment-row-form");
  const rowCountInput = shipmentEditor.querySelector("#shipment-row-count");
  const removeShipmentButton = shipmentEditor.querySelector("#remove-shipment-button");
  const itemList = shipmentEditor.querySelector("#shipment-item-list");
  const sendSelectedShipmentItemsButton = shipmentEditor.querySelector("#send-selected-shipment-items");

  metaNameInput.value = shipment.name;
  metaCostInput.value = shipment.cost.toFixed(2);

  metaNameInput.addEventListener("change", (event) => {
    const nextName = event.target.value.trim() || "Untitled shipment";
    if (nextName !== shipment.name) {
      updateShipment(shipment.id, { name: nextName });
      logActivity("shipment", `Renamed shipment`, `Changed shipment name from "${shipment.name}" to "${nextName}".`);
    }
  });

  metaCostInput.addEventListener("change", (event) => {
    const nextCost = event.target.value === "" ? 0 : Number.parseFloat(event.target.value);
    const safeCost = Number.isFinite(nextCost) ? nextCost : 0;
    if (safeCost !== shipment.cost) {
      updateShipment(shipment.id, { cost: safeCost });
      logActivity("shipment", `Updated shipment cost`, `${shipment.name} changed from ${formatCurrency(shipment.cost)} to ${formatCurrency(safeCost)}.`);
    }
  });

  rowForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addShipmentRows(shipment.id, rowCountInput.value);
  });

  removeShipmentButton.addEventListener("click", () => {
    const confirmed = window.confirm(
      `Delete the entire shipment "${shipment.name}"? This will remove all of its rows.`,
    );
    if (!confirmed) {
      return;
    }
    removeShipment(shipment.id);
  });

  sendSelectedShipmentItemsButton?.addEventListener("click", () => {
    sendSelectedShipmentItemsToStock(shipment);
    render();
  });

  if (!shipment.items.length) {
    itemList.innerHTML =
      '<div class="shipment-empty">No Sonnies in this shipment yet. Add rows above to start the plan.</div>';
    return;
  }

  shipment.items.forEach((item) => {
    const fragment = shipmentItemTemplate.content.cloneNode(true);
    const nameInput = fragment.querySelector(".shipment-item-name-input");
    const identityThumb = fragment.querySelector(".shipment-item-thumb");
    const identityName = fragment.querySelector(".shipment-item-identity-name");
    const identitySeries = fragment.querySelector(".shipment-item-identity-series");
    const historySummary = fragment.querySelector(".shipment-item-history-summary");
    const quantityInput = fragment.querySelector(".shipment-item-quantity-input");
    const sellInput = fragment.querySelector(".shipment-item-sell-input");
    const keepInput = fragment.querySelector(".shipment-item-keep-input");
    const selectInput = fragment.querySelector(".shipment-item-select-input");
    const historyButton = fragment.querySelector(".shipment-history-button");
    const historyPanel = fragment.querySelector(".shipment-history-panel");
    const historyList = fragment.querySelector(".shipment-history-list");
    const toStockButton = fragment.querySelector(".shipment-to-stock-button");
    const removeButton = fragment.querySelector(".remove-button");
    const selectedCatalogItem = item.sonnyId
      ? stockCatalog.find((entry) => entry.id === item.sonnyId) || inferCatalogItemFromName(item.name)
      : inferCatalogItemFromName(item.name);
    const shipmentHistoryEntries = priceHistoryForItem({
      sonnyId: item.sonnyId || selectedCatalogItem?.id || "",
      name: selectedCatalogItem?.name || item.name,
    });
    const uniqueShipmentHistory = uniquePricePoints(shipmentHistoryEntries);

    nameInput.value = selectedCatalogItem ? catalogLabelForItem(selectedCatalogItem) : item.name;
    selectInput.checked = selectedShipmentItemIds.includes(item.id);
    quantityInput.value = String(Math.max(1, Number(item.quantity) || 1));
    sellInput.value = item.sellPrice > 0 ? item.sellPrice.toFixed(2) : "";
    keepInput.value = item.keepPrice > 0 ? item.keepPrice.toFixed(2) : "";
    historyButton.textContent = expandedShipmentHistoryItemId === item.id ? "Hide History" : "Show History";
    historyPanel.hidden = expandedShipmentHistoryItemId !== item.id;

    if (selectedCatalogItem) {
      identityThumb.className = `shipment-item-thumb${selectedCatalogItem.imagePath ? " shipment-item-thumb-mapped" : ""}`;
      identityThumb.style.backgroundImage = selectedCatalogItem.imagePath
        ? `url("${selectedCatalogItem.imagePath}")`
        : "";
      if (!selectedCatalogItem.imagePath) {
        identityThumb.classList.add("shipment-item-thumb-empty");
      }
      identityName.textContent = selectedCatalogItem.name;
      identitySeries.textContent = selectedCatalogItem.series;
    } else {
      identityThumb.className = "shipment-item-thumb shipment-item-thumb-empty";
      identityThumb.style.backgroundImage = "";
      identityName.textContent = item.name || "Choose a Sonny";
      identitySeries.textContent = item.name
        ? "Not matched to the catalog yet."
        : "Selecting from the list keeps the exact identity matched.";
    }

    if (uniqueShipmentHistory.length) {
      const latest = uniqueShipmentHistory[0];
      historySummary.textContent = `Previously in stock at ${formatCurrency(latest.price)} most recently, with ${uniqueShipmentHistory.length} tracked price${uniqueShipmentHistory.length === 1 ? "" : "s"} total.`;
      historyList.innerHTML = uniqueShipmentHistory
        .slice(0, 5)
        .map((entry) => `
          <article class="shipment-history-entry">
            <strong>${formatCurrency(entry.price)}</strong>
            <span>${entry.source === "updated" ? "Updated price" : entry.source === "shipment" ? "Sent from shipment" : "Added to stock"} on ${formatTimestamp(entry.createdAt)}</span>
          </article>
        `)
        .join("");
    } else {
      historySummary.textContent = selectedCatalogItem
        ? "No stock-price history has been tracked for this Sonny yet."
        : "Pick a Sonny from the catalog to see its previous stock prices here.";
      historyList.innerHTML = `
        <div class="shipment-history-empty">
          No previous in-stock prices are available for this selection yet.
        </div>
      `;
    }

    quantityInput.addEventListener("change", (event) => {
      const nextQuantity = Math.max(1, Number.parseInt(event.target.value || "1", 10) || 1);
      event.target.value = String(nextQuantity);
      if (nextQuantity !== Math.max(1, Number(item.quantity) || 1)) {
        updateShipmentItem(shipment.id, item.id, { quantity: nextQuantity });
        logActivity("shipment", `Updated shipment quantity`, `${item.name || "Untitled Sonny"} in ${shipment.name} is now ${nextQuantity} ${nextQuantity === 1 ? "unit" : "units"}.`);
      }
    });

    selectInput.addEventListener("change", (event) => {
      toggleShipmentItemSelection(shipment.id, item.id, event.target.checked);
      render();
    });

    nameInput.addEventListener("change", (event) => {
      const selected = resolveCatalogSelectionValue(event.target.value);
      if (selected) {
        updateShipmentItem(shipment.id, item.id, {
          sonnyId: selected.id,
          name: selected.name,
        });
        logActivity("shipment", `Matched shipment Sonny`, `${selected.name} in ${shipment.name} is now linked to the catalog identity.`);
        return;
      }

      if (event.target.value !== item.name) {
        updateShipmentItem(shipment.id, item.id, {
          sonnyId: "",
          name: event.target.value,
        });
        logActivity("shipment", `Updated shipment item`, `Renamed "${item.name || "Untitled Sonny"}" in ${shipment.name}.`);
      }
    });

    sellInput.addEventListener("change", (event) => {
      const nextValue = event.target.value === "" ? 0 : Number.parseFloat(event.target.value);
      const safeValue = Number.isFinite(nextValue) ? nextValue : 0;
      if (safeValue !== item.sellPrice) {
        updateShipmentItem(shipment.id, item.id, { sellPrice: safeValue });
        logActivity("shipment", `Updated selling price`, `${item.name || "Untitled Sonny"} in ${shipment.name} is now ${formatCurrency(safeValue)} to sell each.`);
      }
    });

    keepInput.addEventListener("change", (event) => {
      const nextValue = event.target.value === "" ? 0 : Number.parseFloat(event.target.value);
      const safeValue = Number.isFinite(nextValue) ? nextValue : 0;
      if (safeValue !== item.keepPrice) {
        updateShipmentItem(shipment.id, item.id, { keepPrice: safeValue });
        logActivity("shipment", `Updated keeping value`, `${item.name || "Untitled Sonny"} in ${shipment.name} is now ${formatCurrency(safeValue)} to keep each.`);
      }
    });

    historyButton.addEventListener("click", () => {
      expandedShipmentHistoryItemId = expandedShipmentHistoryItemId === item.id ? "" : item.id;
      render();
    });

    toStockButton.addEventListener("click", () => {
      addShipmentItemToStock(shipment, item);
      render();
    });

    removeButton.addEventListener("click", () => {
      removeShipmentItem(shipment.id, item.id);
    });

    itemList.append(fragment);
  });
}

function renderActivityLog() {
  activityList.innerHTML = "";
  const search = normalizeText(activitySearch);
  const visibleLog = activityLog.filter((entry) => {
    const matchesKind = activityKind === "all" || entry.kind === activityKind;
    const haystack = normalizeText(`${entry.title} ${entry.detail}`);
    const matchesSearch = !search || haystack.includes(search);
    return matchesKind && matchesSearch;
  });

  if (!visibleLog.length) {
    activityList.innerHTML =
      '<div class="empty-state">No activity matches this filter yet. Try a broader search or another category.</div>';
    return;
  }

  visibleLog.forEach((entry) => {
    const fragment = activityItemTemplate.content.cloneNode(true);
    const kind = fragment.querySelector(".activity-item-kind");
    const time = fragment.querySelector(".activity-item-time");
    const title = fragment.querySelector(".activity-item-title");
    const detail = fragment.querySelector(".activity-item-detail");

    kind.textContent = entry.kind;
    time.textContent = formatTimestamp(entry.createdAt);
    title.textContent = entry.title;
    detail.textContent = entry.detail;

    activityList.append(fragment);
  });
}

function renderBackupStatus() {
  const lastBackupAt = loadLastBackupAt();
  lastBackupStatus.textContent = lastBackupAt
    ? `Last full backup: ${formatTimestamp(lastBackupAt)}`
    : "No backup exported yet from this browser.";
}

function applyActiveView() {
  if (!stockSettings.useFund && activeView === "fund") {
    activeView = "stock";
    saveActiveView();
  }

  viewTabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.viewTarget === activeView);
  });

  Object.entries(viewPanels).forEach(([name, panel]) => {
    panel.classList.toggle("is-active", name === activeView);
  });

  fundTabButton.hidden = !stockSettings.useFund;

  if (activeView === "stock") {
    heroTitle.textContent = "Your Sonny stock shelf.";
    heroCopy.textContent =
      "Keep your Sonny stock in one place and add new ones as they come in.";
    resetButton.hidden = false;
  } else if (activeView === "fund") {
    heroTitle.textContent = "Your Sonny fund garden.";
    heroCopy.textContent =
      "Track every little money movement in and out of your Sonny fund, with an always-saved running balance you can check at a glance.";
    resetButton.hidden = false;
  } else if (activeView === "shipments") {
    heroTitle.textContent = "Your shipment planning studio.";
    heroCopy.textContent =
      "Map out each incoming Sonny shipment, split what you will sell versus keep, and see your cash loss and overall result update automatically.";
    resetButton.hidden = false;
  } else if (activeView === "logs") {
    heroTitle.textContent = "Your Sonny paper trail.";
    heroCopy.textContent =
      "Every stock change, fund movement, and shipment edit gets timestamped here so you can track what happened and when.";
    resetButton.hidden = false;
  } else {
    heroTitle.textContent = "Your Sonny settings nook.";
    heroCopy.textContent =
      "Choose how stock totals should behave and whether trade-only Sonnies can carry optional values in this browser.";
    resetButton.hidden = true;
  }
}

function render() {
  renderCatalogOptions();
  renderCatalogPreview();
  stockSearchInput.value = stockSearch;
  if (fundSentToRealFundLabel) {
    fundSentToRealFundLabel.textContent = fundRealToggleLabel(fundTypeInput?.value || "in");
  }
  if (!fundDateInput.value) {
    fundDateInput.value = currentLocalDateInputValue();
  }
  if (fundAmountLabel) {
    fundAmountLabel.textContent = "Total amount";
  }
  setFundSonnyPriceMap(fundSonniesInput, normalizeFundSonnyPriceMap(getFundSonnyPriceMap(fundSonniesInput), getFundSonnyIds(fundSonniesInput)));
  renderFundSonnyPreview(fundSonnyPreviewList, getFundSonnyIds(fundSonniesInput), getFundSonnyPriceMap(fundSonniesInput));
  fundRangeFilter.value = fundFilter;
  if (fundSortSelect) {
    fundSortSelect.value = fundSort;
  }
  stockStatusFilter.value = stockStatus;
  stockKindFilter.value = stockKind;
  stockSortSelect.value = stockSort;
  stockDisplayToggle.textContent = stockDisplayMode === "shelf" ? "Shelf version on" : "Shelf version off";
  stockCardDensitySelect.value = stockCardDensity;
  stockCardDensitySelect.disabled = stockDisplayMode === "shelf";
  if (stockMessageOutput) {
    stockMessageOutput.value = stockMessageDraft;
  }
  setStockMessageStatus(
    stockMessageDraft.trim()
      ? "Edit the draft below or rebuild it from the stock you can currently see."
      : "Build a message from the stock you can currently see.",
  );
  useFundInput.checked = stockSettings.useFund;
  allowTradeValuesInput.checked = stockSettings.allowTradeValues;
  includeTradeValuesInput.checked = stockSettings.includeTradeValuesInTotals;
  includeTradeValuesInput.disabled = !stockSettings.allowTradeValues;
  activitySearchInput.value = activitySearch;
  activityKindFilter.value = activityKind;
  applyActiveView();
  renderSummary();
  renderInventory();
  renderFundList();
  renderShipmentList();
  renderShipmentEditor();
  renderActivityLog();
  renderBackupStatus();
  renderStockAuthState();
}

addForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const selection = resolveCatalogSelection();
  const price = Number.parseFloat(newPriceInput.value);
  const quantity = Math.max(1, Number.parseInt(newQuantityInput.value || "1", 10) || 1);
  if (!selection) {
    stockCatalogSearch.setCustomValidity("Choose a Sonny from the tracker list.");
    stockCatalogSearch.reportValidity();
    return;
  }

  stockCatalogSearch.setCustomValidity("");

  const stockItem = {
    id: crypto.randomUUID(),
    sonnyId: selection.id,
    name: selection.name,
    series: selection.series,
    quantity,
    status: "available",
    justTrading: false,
    price: Number.isFinite(price) ? price : 0,
    createdAt: new Date().toISOString(),
  };

  stock = [stockItem, ...stock];
  saveStock();
  addPriceHistoryEntry(stockItem, { source: "stocked" });
  logActivity("stock", `Added ${selection.name} to stock`, `${selection.name} from ${selection.series} was added at ${formatCurrency(stockItem.price)} with quantity ${quantity}.`);
  addForm.reset();
  stockCatalogSearch.focus();
  render();
});

addFundForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const label = fundNoteInput.value.trim();
  const amount = Number.parseFloat(fundAmountInput.value);
  const shipping = Number.parseFloat(fundShippingInput.value);
  const sonnyIds = getFundSonnyIds(fundSonniesInput);
  const figurePricesById = normalizeFundSonnyPriceMap(getFundSonnyPriceMap(fundSonniesInput), sonnyIds);
  const person = fundPersonInput.value.trim();
  const paidVia = ["venmo", "zelle", "paypal"].includes(fundPaidViaInput?.value) ? fundPaidViaInput.value : "";
  const type = fundTypeInput.value === "in" ? "in" : "out";
  const date = fundDateInput.value;

  if (!label) {
    fundNoteInput.focus();
    return;
  }

  const transaction = {
    id: crypto.randomUUID(),
    label,
    amount: Number.isFinite(amount) ? amount : 0,
    amountMode: "total",
    sonnyIds,
    figurePrice: Number.isFinite(commonFundSonnyPrice(sonnyIds, figurePricesById)) ? commonFundSonnyPrice(sonnyIds, figurePricesById) : 0,
    figurePricesById,
    shipping: Number.isFinite(shipping) ? Math.max(0, shipping) : 0,
    person,
    paidVia,
    sentToRealFund: Boolean(fundSentToRealFundInput.checked),
    type,
    date,
  };

  fundTransactions = [...fundTransactions, transaction];
  saveFundTransactions();
  logActivity("fund", `Added fund movement`, `${label} was logged as ${type === "in" ? "money in" : "money out"} for ${formatCurrency(transaction.amount)}.`);
  addFundForm.reset();
  setFundSonnyIds(fundSonniesInput, []);
  setFundSonnyPriceMap(fundSonniesInput, {});
  renderFundSonnyPreview(fundSonnyPreviewList, [], {});
  fundTypeInput.value = "in";
  fundDateInput.value = currentLocalDateInputValue();
  fundSentToRealFundInput.checked = false;
  if (fundShippingInput) {
    fundShippingInput.value = "";
  }
  if (fundPaidViaInput) {
    fundPaidViaInput.value = "";
  }
  fundNoteInput.focus();
  render();
});

addShipmentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = shipmentNameInput.value.trim();
  const cost = Number.parseFloat(shipmentCostInput.value);
  if (!name) {
    shipmentNameInput.focus();
    return;
  }

  const shipment = {
    id: crypto.randomUUID(),
    name,
    cost: Number.isFinite(cost) ? cost : 0,
    items: [],
  };

  shipments = [shipment, ...shipments];
  activeShipmentId = shipment.id;
  saveShipments();
  saveActiveShipmentId();
  logActivity("shipment", `Created shipment ${name}`, `${name} started with an original payment of ${formatCurrency(shipment.cost)}.`);
  addShipmentForm.reset();
  shipmentNameInput.focus();
  render();
});

resetButton.addEventListener("click", () => {
  if (activeView === "stock") {
    removeShipmentRecoveryItems(stock.map((item) => item.id));
    stock = DEFAULT_STOCK.map((item) => {
      const inferred = inferCatalogItemFromName(item.name);
      return {
        ...item,
        id: crypto.randomUUID(),
        sonnyId: inferred?.id || "",
        name: displayNameForId(inferred?.id || "", item.name),
        series: displaySeriesForId(inferred?.id || "", item.series),
        quantity: 1,
        status: "available",
        justTrading: false,
        createdAt: new Date().toISOString(),
      };
    });
    priceHistory = [];
    savePriceHistory();
    saveStock();
    syncPriceHistoryFromCurrentStock();
    logActivity("stock", "Reset stock view", "Restored the stock shelf to its default seeded list.");
  } else if (activeView === "fund") {
    fundTransactions = DEFAULT_FUND_TRANSACTIONS.map((item) => ({
      ...item,
      id: crypto.randomUUID(),
    }));
    saveFundTransactions();
    logActivity("fund", "Reset fund view", "Restored the Sonny fund to its default seeded movements.");
  } else if (activeView === "shipments") {
    shipments = DEFAULT_SHIPMENTS.map((shipment) => ({
      ...shipment,
      id: crypto.randomUUID(),
      items: shipment.items.map((item) => ({ ...item, id: crypto.randomUUID() })),
    }));
    activeShipmentId = shipments[0]?.id || "";
    saveShipments();
    saveActiveShipmentId();
    logActivity("shipment", "Reset shipment planner", "Restored the default shipment plans.");
  } else if (activeView === "settings") {
    stockSettings = {
      useFund: true,
      allowTradeValues: false,
      includeTradeValuesInTotals: false,
    };
    saveStockSettings();
    logActivity("system", "Reset settings view", "Restored the stock settings to their default values.");
  } else {
    activityLog = [];
    saveActivityLog();
    scheduleActivityCloudSync();
  }
  render();
});

fundRangeFilter.addEventListener("change", (event) => {
  fundFilter = event.target.value;
  saveFundFilter();
  render();
});

fundSortSelect?.addEventListener("change", (event) => {
  fundSort = event.target.value === "oldest" ? "oldest" : "newest";
  saveFundSort();
  render();
});

fundTypeInput?.addEventListener("change", (event) => {
  if (fundSentToRealFundLabel) {
    fundSentToRealFundLabel.textContent = fundRealToggleLabel(event.target.value);
  }
});

fundSonniesInput?.addEventListener("input", (event) => {
  if (!event.target.value.trim()) {
    renderFundSonnyPreview(fundSonnyPreviewList, getFundSonnyIds(fundSonniesInput), getFundSonnyPriceMap(fundSonniesInput));
  }
});

fundSonniesInput?.addEventListener("change", (event) => {
  const sonnyIds = appendFundSonnyFromInput(fundSonniesInput, fundSonnyPreviewList);
  const nextPriceMap = normalizeFundSonnyPriceMap(getFundSonnyPriceMap(fundSonniesInput), sonnyIds);
  setFundSonnyPriceMap(fundSonniesInput, nextPriceMap);
  renderFundSonnyPreview(fundSonnyPreviewList, sonnyIds, nextPriceMap);
});

fundSonnyPreviewList?.addEventListener("click", (event) => {
  const removeButton = event.target.closest(".fund-sonny-chip-remove");
  if (!removeButton) {
    return;
  }
  const nextIds = getFundSonnyIds(fundSonniesInput).filter((sonnyId) => sonnyId !== removeButton.dataset.sonnyId);
  setFundSonnyIds(fundSonniesInput, nextIds);
  const nextPriceMap = normalizeFundSonnyPriceMap(getFundSonnyPriceMap(fundSonniesInput), nextIds);
  setFundSonnyPriceMap(fundSonniesInput, nextPriceMap);
  renderFundSonnyPreview(fundSonnyPreviewList, nextIds, nextPriceMap);
});

fundSonnyPreviewList?.addEventListener("input", (event) => {
  const priceInput = event.target.closest(".fund-sonny-chip-price-input");
  if (!priceInput) {
    return;
  }
  const sonnyIds = getFundSonnyIds(fundSonniesInput);
  const nextPriceMap = normalizeFundSonnyPriceMap(getFundSonnyPriceMap(fundSonniesInput), sonnyIds);
  const rawValue = priceInput.value === "" ? null : Number.parseFloat(priceInput.value);
  if (Number.isFinite(rawValue) && rawValue > 0) {
    nextPriceMap[priceInput.dataset.sonnyId] = rawValue;
  } else {
    delete nextPriceMap[priceInput.dataset.sonnyId];
  }
  setFundSonnyPriceMap(fundSonniesInput, nextPriceMap);
});

stockSearchInput.addEventListener("input", (event) => {
  stockSearch = event.target.value;
  saveStockSearch();
  render();
});

stockStatusFilter.addEventListener("change", (event) => {
  stockStatus = event.target.value;
  saveStockStatus();
  render();
});

stockKindFilter.addEventListener("change", (event) => {
  stockKind = event.target.value;
  saveStockKind();
  render();
});

stockSortSelect.addEventListener("change", (event) => {
  stockSort = event.target.value;
  saveStockSort();
  render();
});

stockDisplayToggle.addEventListener("click", () => {
  stockDisplayMode = stockDisplayMode === "shelf" ? "cards" : "shelf";
  saveStockDisplayMode();
  render();
});

stockCardDensitySelect.addEventListener("change", (event) => {
  stockCardDensity = event.target.value === "compact" ? "compact" : "roomy";
  saveStockCardDensity();
  render();
});

copyStockMessageButton?.addEventListener("click", async () => {
  const message = stockMessageOutput?.value || stockMessageDraft || buildStockMessage();
  try {
    await navigator.clipboard.writeText(message);
    setStockMessageStatus("Copied your stock message.");
    copyStockMessageButton.textContent = "Copied";
    window.setTimeout(() => {
      if (copyStockMessageButton) {
        copyStockMessageButton.textContent = "Copy Message";
      }
    }, 1400);
  } catch {
    setStockMessageStatus("Your message is selected below so you can copy it manually.");
    if (stockMessageOutput) {
      stockMessageOutput.focus();
      stockMessageOutput.select();
    }
  }
});

stockMessageOutput?.addEventListener("input", (event) => {
  stockMessageDraft = event.target.value;
  saveStockMessageDraft();
  setStockMessageStatus("Saved your message draft in this browser.");
});

useFundInput.addEventListener("change", (event) => {
  stockSettings = {
    ...stockSettings,
    useFund: event.target.checked,
  };
  saveStockSettings();
  if (!stockSettings.useFund && activeView === "fund") {
    activeView = "stock";
    saveActiveView();
  }
  render();
});

allowTradeValuesInput.addEventListener("change", (event) => {
  stockSettings = {
    ...stockSettings,
    allowTradeValues: event.target.checked,
    includeTradeValuesInTotals: event.target.checked ? stockSettings.includeTradeValuesInTotals : false,
  };
  saveStockSettings();
  render();
});

includeTradeValuesInput.addEventListener("change", (event) => {
  stockSettings = {
    ...stockSettings,
    includeTradeValuesInTotals: stockSettings.allowTradeValues && event.target.checked,
  };
  saveStockSettings();
  render();
});

resetSettingsViewButton.addEventListener("click", () => {
  stockSettings = {
    useFund: true,
    allowTradeValues: false,
    includeTradeValuesInTotals: false,
  };
  saveStockSettings();
  logActivity("system", "Reset settings view", "Restored the stock settings to their default values.");
  render();
});

activitySearchInput.addEventListener("input", (event) => {
  activitySearch = event.target.value;
  saveActivitySearch();
  render();
});

activityKindFilter.addEventListener("change", (event) => {
  activityKind = event.target.value;
  saveActivityKind();
  render();
});

stockCatalogSearch.addEventListener("input", () => {
  stockCatalogSearch.setCustomValidity("");
  renderCatalogPreview();
});

stockCatalogSearch.addEventListener("change", () => {
  const selection = resolveCatalogSelection();
  if (!selection) {
    stockCatalogSearch.setCustomValidity("Choose a Sonny from the tracker list.");
  } else {
    stockCatalogSearch.setCustomValidity("");
  }
  renderCatalogPreview();
});

viewTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activeView = tab.dataset.viewTarget;
    saveActiveView();
    render();
  });
});

document.addEventListener("click", (event) => {
  const buildButton = event.target.closest("#build-stock-message");
  if (buildButton) {
    handleBuildStockMessage();
  }
});

stockAuthForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  stockSignInWithPassword();
});
stockAuthMagicLinkButton?.addEventListener("click", () => {
  stockSendMagicLink();
});
stockAuthSignInButton?.addEventListener("click", () => {
  stockSignInWithPassword();
});
stockAuthSignUpButton?.addEventListener("click", () => {
  stockSignUpWithPassword();
});
stockAuthSyncNowButton?.addEventListener("click", () => {
  syncStockFundAndActivityToCloud();
});
stockAuthImportLocalButton?.addEventListener("click", () => {
  importLocalStockFundAndActivityToCloud();
});
stockAuthSignOutButton?.addEventListener("click", async () => {
  if (!stockAuthState.client) {
    return;
  }

  const { error } = await stockAuthState.client.auth.signOut({ scope: "local" });
  if (error) {
    console.error("Failed to sign out of stock auth", error);
    setStockAuthFeedback(error.message || "Could not sign out right now.");
    return;
  }
});

exportFullBackupButton.addEventListener("click", () => {
  downloadFullBackup();
});

importFullBackupButton.addEventListener("click", () => {
  importFullBackupInput.click();
});

importFullBackupInput.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }

  try {
    const text = await file.text();
    const payload = JSON.parse(text);
    const confirmed = window.confirm(
      "Restore this full backup? This will replace your current tracker, stock, fund, shipment, and activity data in this browser.",
    );
    if (!confirmed) {
      importFullBackupInput.value = "";
      return;
    }

    applyBackupPayload(payload);
    window.location.reload();
  } catch (error) {
    window.alert(
      error instanceof Error
        ? `Could not restore backup: ${error.message}`
        : "Could not restore backup. Please check that the file is a valid Sonny backup JSON.",
    );
  } finally {
    importFullBackupInput.value = "";
  }
});

exportActivityLogButton.addEventListener("click", () => {
  downloadActivityLogCsv();
});

fundDateInput.value = currentLocalDateInputValue();
fundRangeFilter.value = fundFilter;
syncPriceHistoryFromCurrentStock();
window.addEventListener("storage", (event) => {
  if (event.key === STOCK_STORAGE_KEY) {
    stock = loadStock();
    syncPriceHistoryFromCurrentStock();
    render();
  }
});
window.addEventListener("focus", () => {
  verifyStockSessionActive("checking your session");
});
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    verifyStockSessionActive("checking your session");
  }
});
render();
initializeStockSupabaseAuth().catch((error) => {
  console.error("Stock auth init failed", error);
  setStockSaveState("error", "Stock setup hit a snag.");
});
