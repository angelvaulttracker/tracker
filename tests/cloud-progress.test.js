const assert = require("node:assert/strict");
const test = require("node:test");
const cloudProgress = require("../app/cloud-progress.js");

test("round-trips every per-copy collection detail", () => {
  const progress = {
    panda: {
      status: "have",
      notes: "First pull",
      collectedAt: "2026-03-21T12:00:00.000Z",
      ownedCount: 2,
      ownedDetails: [
        {
          customName: "Panda",
          acquiredBy: "purchased",
          purchasedFrom: "Local shop",
          purchasedPrice: "12.50",
          condition: "mint",
          hasBoxFoil: true,
          displayLocation: "Top shelf",
          currentValueEstimate: "20",
          customPhoto: "data:image/webp;base64,example",
        },
        {
          customName: "Panda 2",
          acquiredBy: "traded",
          tradedWith: "Collector friend",
          tradedForIds: ["rabbit"],
        },
      ],
    },
  };

  const { rows, emptyIds } = cloudProgress.buildRows(
    progress,
    "00000000-0000-0000-0000-000000000000",
    "2026-09-27T12:00:00.000Z",
  );
  const restored = cloudProgress.buildProgress(rows);

  assert.deepEqual(emptyIds, []);
  assert.equal(rows.length, 1);
  assert.deepEqual(restored.panda.ownedDetails, progress.panda.ownedDetails);
  assert.equal(restored.panda.ownedCount, 2);
  assert.equal(restored.panda.status, "have");
  assert.equal(restored.panda.notes, "First pull");
  assert.equal(restored.panda.collectedAt, progress.panda.collectedAt);
});

test("hydrates legacy cloud rows without progress_data", () => {
  const restored = cloudProgress.buildProgress([
    {
      sonny_id: "rabbit",
      status: "iso",
      notes: "Looking for boxed",
      wishlist_rank: 3,
      collected_at: null,
      wishlist_added_at: "2026-09-20T12:00:00.000Z",
    },
  ]);

  assert.deepEqual(restored.rabbit, {
    status: "iso",
    notes: "Looking for boxed",
    wishlistRank: 3,
    collectedAt: "",
    wishlistAddedAt: "2026-09-20T12:00:00.000Z",
  });
});

test("legacy fallback rows omit only the snapshot column", () => {
  const { rows } = cloudProgress.buildRows({ rabbit: { status: "diso" } }, "user-id", "now");
  const legacyRows = cloudProgress.withoutProgressData(rows);

  assert.equal(legacyRows[0].status, "diso");
  assert.equal("progress_data" in legacyRows[0], false);
});

test("empty missing entries are deleted while metadata-only entries are retained", () => {
  const { rows, emptyIds } = cloudProgress.buildRows({
    empty: { status: "missing" },
    personalized: { status: "missing", customName: "Little guy" },
  }, "user-id", "now");

  assert.deepEqual(emptyIds, ["empty"]);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].sonny_id, "personalized");
});
