(function attachCloudProgress(root, factory) {
  const api = factory();

  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }

  root.SONNY_CLOUD_PROGRESS = api;
})(typeof globalThis !== "undefined" ? globalThis : window, function createCloudProgressApi() {
  const VALID_STATUSES = new Set(["missing", "have", "iso", "diso"]);

  function cloneEntry(entry) {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      return {};
    }

    try {
      return JSON.parse(JSON.stringify(entry));
    } catch {
      return {};
    }
  }

  function normalizedStatus(value) {
    return VALID_STATUSES.has(value) ? value : "missing";
  }

  function normalizedWishlistRank(value) {
    if (value === "" || value == null) {
      return null;
    }

    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : null;
  }

  function isMeaningfulEntry(entry) {
    if (!entry || typeof entry !== "object") {
      return false;
    }

    const snapshot = cloneEntry(entry);
    const status = normalizedStatus(snapshot.status);
    const notes = String(snapshot.notes || "").trim();
    const rank = normalizedWishlistRank(snapshot.wishlistRank);
    const extraKeys = Object.keys(snapshot).filter((key) => ![
      "status",
      "notes",
      "wishlistRank",
      "collectedAt",
      "wishlistAddedAt",
    ].includes(key));

    return Boolean(
      status !== "missing" ||
        notes ||
        rank != null ||
        snapshot.collectedAt ||
        snapshot.wishlistAddedAt ||
        extraKeys.length,
    );
  }

  function buildRows(progress, userId, updatedAt = new Date().toISOString()) {
    const rows = [];
    const emptyIds = [];

    Object.entries(progress || {}).forEach(([sonnyId, rawEntry]) => {
      const entry = cloneEntry(rawEntry);
      if (!isMeaningfulEntry(entry)) {
        emptyIds.push(sonnyId);
        return;
      }

      const status = normalizedStatus(entry.status);
      const notes = String(entry.notes || "");
      const wishlistRank = normalizedWishlistRank(entry.wishlistRank);
      const collectedAt = entry.collectedAt || null;
      const wishlistAddedAt = entry.wishlistAddedAt || null;

      rows.push({
        user_id: userId,
        sonny_id: sonnyId,
        status,
        notes,
        wishlist_rank: wishlistRank,
        collected_at: collectedAt,
        wishlist_added_at: wishlistAddedAt,
        progress_data: {
          ...entry,
          status,
          notes,
          wishlistRank: wishlistRank ?? "",
          collectedAt: collectedAt || "",
          wishlistAddedAt: wishlistAddedAt || "",
        },
        updated_at: updatedAt,
      });
    });

    return { rows, emptyIds };
  }

  function buildProgress(rows) {
    const progress = {};

    (rows || []).forEach((row) => {
      if (!row?.sonny_id) {
        return;
      }

      const snapshot = cloneEntry(row.progress_data);
      progress[row.sonny_id] = {
        ...snapshot,
        status: normalizedStatus(row.status || snapshot.status),
        notes: row.notes ?? snapshot.notes ?? "",
        wishlistRank: row.wishlist_rank ?? snapshot.wishlistRank ?? "",
        collectedAt: row.collected_at || snapshot.collectedAt || "",
        wishlistAddedAt: row.wishlist_added_at || snapshot.wishlistAddedAt || "",
      };
    });

    return progress;
  }

  function withoutProgressData(rows) {
    return (rows || []).map(({ progress_data: _progressData, ...row }) => row);
  }

  return {
    buildProgress,
    buildRows,
    cloneEntry,
    isMeaningfulEntry,
    normalizedWishlistRank,
    withoutProgressData,
  };
});
