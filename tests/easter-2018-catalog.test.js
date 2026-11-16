const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const context = vm.createContext({window: {}});
vm.runInContext(read('app/data/manual_overrides.js'), context);
const overrides = context.window.SONNY_MANUAL_OVERRIDES.items;
const data = JSON.parse(read('app/data/sonnies.json'));
const source = read('app/app.js');
function loadFunction(name, target) {
  const start = source.indexOf(`function ${name}(`);
  const end = source.indexOf('\nfunction ', start + 1);
  vm.runInContext(source.slice(start, end), target);
}
test('seven distinct Easter 2018 figures share one explicit display series', () => {
  const rows = data.filter(i => overrides[i.id]?.displaySeries === 'Easter Series 2018');
  assert.equal(rows.length, 7);
  assert.equal(rows.filter(i => overrides[i.id].isSecret).length, 3);
  assert.equal(new Set(rows.map(i => overrides[i.id].artPath)).size, 7);
  const c = vm.createContext({displaySeriesCache: new Map(), getManualDisplaySeries: i => overrides[i.id]?.displaySeries});
  loadFunction('displaySeries', c);
  for (const i of rows) {
    assert.equal(c.displaySeries(i), 'Easter Series 2018');
    assert.ok(fs.existsSync(path.join(root, overrides[i.id].artPath)));
  }
});
test('OCR review records are omitted from tracker and stock, without deleting IDs', () => {
  const omitted = data.filter(i => overrides[i.id]?.excludeFromCatalog);
  assert.equal(omitted.filter(i => i.id.startsWith("page-40-")).length, 7);
  assert.equal(omitted.filter(i => i.id.startsWith("page-39-")).length, 5);
  const visible = data.filter(i => !overrides[i.id]?.excludeFromCatalog);
  assert.ok(!visible.some(i => (overrides[i.id]?.displaySeries || overrides[i.id]?.series || i.series) === "Page 39 Review Queue"));
  const init = source.slice(source.indexOf('async function init()'));
  const assignment = init.slice(init.indexOf('  sonnies ='), init.indexOf('  collectedSeriesSelection'));
  const c = vm.createContext({window: {SONNIES_DATA: data}, getManualItemOverride: i => overrides[i.id] || {}});
  vm.runInContext('let sonnies;\n' + assignment + '\nwindow.result = sonnies;', c);
  for (const i of omitted) assert.ok(!c.window.result.some(r => r.id === i.id));
  const stock = read('app/stock.js');
  const start = stock.indexOf('const stockCatalog = rawCatalog');
  const end = stock.indexOf('const catalogByLabel', start);
  const sc = vm.createContext({rawCatalog: data, manualItemOverrides: overrides, imageMap: {}, withImageVersion: p => p});
  vm.runInContext(stock.slice(start, end) + '\nglobalThis.result = stockCatalog;', sc);
  for (const i of omitted) assert.ok(!sc.result.some(r => r.id === i.id));
  assert.equal(c.window.result.length, data.length - omitted.length);
  assert.equal(sc.result.length, data.length - omitted.length);
});
