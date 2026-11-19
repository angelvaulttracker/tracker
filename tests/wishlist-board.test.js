const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../app/app.js'), 'utf8');
const begin = source.indexOf('function renderWishlistLanding(items)');
const end = source.indexOf('\nfunction ', begin + 1);
function boardHeight(y, count = 1) {
  const styles = {};
  const element = () => ({classList: {toggle() {}}, style: {setProperty(k,v) { styles[k] = v; }}});
  const items = Array.from({length: count}, (_, i) => ({id: String(i)}));
  const stop = new Error('Reached card rendering');
  const context = vm.createContext({
    wishlistLanding: element(), wishlistFloatingGrid: element(), wishlistLandingStage: element(),
    wishlistLayoutEditButton: null, wishlistLegendEditButton: null, wishlistLandingSummary: null,
    settings: {wishlistFloatingPositions: y == null ? {} : {'0': {y}}},
    renderWishlistLandingTitleEditor() {}, renderWishlistLegend() {}, saveSettings() {},
    isWishlistBoardBenched: () => false, getWishlistAddedAt: () => 0, getCollectedAt: () => 0,
    compareDateDesc: () => 0, compareText: () => 0, displayName: i => i.id,
    getWishlistBoardLegend: () => null, document: {createElement() {throw stop;}},
  });
  vm.runInContext(source.slice(begin,end),context);
  assert.throws(() => context.renderWishlistLanding(items), e => e === stop);
  return parseFloat(styles['--wishlist-stage-height']);
}
test('floating board contains saved positions with pixel units', () => {
  assert.equal(boardHeight('1400px'), 1620);
  assert.equal(boardHeight(1400), 1620);
});
test('floating board expands for new rows and ignores invalid saved positions', () => {
  assert.equal(boardHeight('invalid'), 530);
  assert.ok(boardHeight(null, 30) > 720);
});
