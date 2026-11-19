# Website audit — November 18, 2026

The final four Hawaii/Halloween photos were deployed as `0eaffc0` and verified byte-for-byte on both production sites. The audit below covers the production code at that release and a separate local candidate containing the fixes.

## Confirmed faults fixed in this audit

| Priority | Finding | Result |
| --- | --- | --- |
| High | Cloud rows omitted owned quantities, photos, prices, and other per-copy details. | Publish the existing tested snapshot serializer and hydrate `progress_data`. The live database's snapshot column and profile state columns were checked using zero-row requests; no migration was needed. Old rows remain readable. |
| High | Public standalone stock JavaScript embedded preset stock, financial transactions, and shipments. | Remove those defaults from the current bundle. New visitors start empty; existing local/cloud records are preserved. This does not remove historical Git copies. |
| High | Restoring a backup could claim cloud success after sync caught an error. | Sync now returns a success result; restore keeps an error state and reports that the local restore succeeded while cloud saving failed. |
| Medium | Backups omitted stock, and restore ignored exported settings. | Include stock in new backups and restore settings/stock when present. Old progress-only exports remain supported. |
| Medium | ISO-maker custom labels and emoji text were inserted directly into HTML. | Escape user text before adding it to legends. |
| Medium | Immersive ISO/DISO view hid and disabled the site navigation. | Keep the header available so users can leave the board directly. |
| Medium | Empty ISO/DISO lists displayed a large blank board. | Explain how to add items or clear filters and provide a working Browse Sonnies button. |
| Medium | ISO/DISO controls forced two 220px columns on small screens. | Use a single column below 600px. Verified document width equals the 390px viewport. |
| Medium | Syntactically valid but invalid-shaped local progress (`null`, arrays, numbers) could break startup. | Reject invalid root shapes and safely start with an empty progress object. |
| Medium | Regulars and secrets from the same release appeared as separate series in filters/insights. | Align 102 entries across 11 confirmed sets. No IDs, variants, or owned data are merged or deleted. |
| Low | An unmatched tracker search left a blank grid. | Add a no-results message and a Clear search and filters button. Announce result counts to assistive technology. |
| Low | Collection details did not respond to Escape. | Close the details dialog with Escape. |
| Low | Each search keystroke immediately rebuilt the tracker and all dependent pages. | Debounce typing by 150ms. Full rendering still needs a larger performance pass. |

## Remaining confirmed issues, in recommended order

1. **High: stock transfers discard per-copy information.** `moveCollectedItemToStock` removes the selected owned detail without putting it on the stock item; `sendStockItemBackToCollectionInTracker` adds quantity without restoring a detail snapshot. A reversible move should carry notes, photos, price, condition, and acquisition history with the copy. This needs a shared transfer representation and round-trip tests, including multiple identical copies and legacy stock rows.
2. **High: two stock cloud models need reconciliation.** The tracker stores stock in `profiles.stock_state`; the standalone stock page uses stock tables. They share local storage but do not have one cloud source of truth. A focused migration/reconciliation pass should preserve both histories and test two devices before changing either model.
3. **Medium: full-catalog rendering remains expensive.** The tracker creates 1,580 cards and `applyFilters` also rebuilds hidden Insights, Collected, wishlist, and Settings views. Browser inspection was intermittently slow even after typing debounce. Render active views on demand, use a document fragment, and introduce pagination or virtualization before adding more catalog features.
4. **Medium: collection tiles need keyboard access.** Minimalist collected tiles are clickable articles without a focusable primary action. Provide a real Open details button or appropriate keyboard behavior, and check focus return/trapping in dialogs.
5. **Medium: authenticated conflict/failure handling needs end-to-end testing.** Source review shows full-state saves and no clear multi-device conflict reconciliation. The serializer and failure paths are covered by tests, but this audit did not write to a real account or prove concurrent saves safe. Test offline edits, sign-out during a save, session expiry, and two devices editing different copies.

## Small UX improvements worth doing next

- Undo for accidental status changes and stock moves.
- Persistent active-filter chips with a Clear all action, including when results are nonempty.
- Search across name and series words together, with common aliases such as Robby/Robby Angel.
- A direct PNG export for ISO-maker designs and clear feedback while rendering/exporting.
- Accessible names that include the figure name on repeated quantity buttons.
- A clear unified entry point for selling stock, rather than two separate implementations.

## Verification and limits

- 19 Node tests pass on the production-based candidate: complete cloud snapshot round trips, legacy rows, backup export/restore, failed/successful sync signaling, malformed progress, empty stock defaults, preservation of saved stock, collection decrement confirmation, Easter catalog exclusions, and floating-board height.
- JavaScript syntax checks and local HTML asset/link checks pass.
- Local browser checks: tracker search/clear, series filtering, ownership, quantity 1→2, Collected counts, notes retained after reload, Escape close, Insights, stock empty state, mobile navigation, ISO board entry/exit, adding an ISO, single-item ranker guidance, ISO-maker selection and layout creation.
- Responsive checks at 390px and 1440px. Mobile tracker, Collected, Insights, and stock had no horizontal overflow. ISO filter overflow reproduced before the fix and was absent after it.
- No browser console errors were captured in the checked flows. This is not a guarantee that every path is error-free.
- Live schema checks read zero rows. No account resets, actual user collection edits, password changes, tickets, or purchase actions were performed. Authenticated writes were tested with mocks, not a real user account. Native Safari/iOS and full accessibility navigation remain to be tested.

Screenshots and the local candidate are in ignored `deliverables/site-audit/`.
