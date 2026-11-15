const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../app/app.js'), 'utf8');
const start = source.indexOf('function saveOwnedCount(');
const end = source.indexOf('\nfunction ', start + 1);
function setup(confirmed, count = 1) {
  const detail = {notes: 'original copy'};
  const entry = {status: 'have', ownedCount: count, ownedDetails: Array.from({length: count}, () => ({...detail})), notes: 'keep notes', collectedAt: '2026-01-01'};
  let saves = 0, prompts = 0;
  const c = vm.createContext({progress: {rabbit: entry}, window: {confirm: message => {assert.equal(message, 'Are you sure you want to remove from collection?'); prompts++; return confirmed;}}, getOwnedDetails: id => c.progress[id].ownedDetails, createBlankOwnedDetail: () => ({}), saveProgress: () => saves++});
  vm.runInContext(source.slice(start, end), c);
  return {c, entry, counts: () => ({saves, prompts})};
}
test('confirming 1 to 0 marks Missing and persists removal once', () => {
  const {c, counts} = setup(true);
  assert.equal(c.saveOwnedCount('rabbit', 0), true);
  assert.equal(c.progress.rabbit.status, 'missing');
  assert.equal(c.progress.rabbit.ownedCount, 0);
  assert.equal(c.progress.rabbit.ownedDetails.length, 0);
  assert.equal(c.progress.rabbit.notes, 'keep notes');
  assert.deepEqual(counts(), {saves: 1, prompts: 1});
});
test('cancelling 1 to 0 leaves the original count and copy details untouched', () => {
  const {c, entry, counts} = setup(false);
  assert.equal(c.saveOwnedCount('rabbit', 0), false);
  assert.equal(c.progress.rabbit, entry);
  assert.equal(c.progress.rabbit.ownedCount, 1);
  assert.equal(c.progress.rabbit.status, 'have');
  assert.equal(c.progress.rabbit.ownedDetails[0].notes, 'original copy');
  assert.deepEqual(counts(), {saves: 0, prompts: 1});
});
test('reducing multiple copies to one does not prompt', () => {
  const {c, counts} = setup(false, 2);
  assert.equal(c.saveOwnedCount('rabbit', 1), true);
  assert.equal(c.progress.rabbit.status, 'have');
  assert.equal(c.progress.rabbit.ownedCount, 1);
  assert.equal(c.progress.rabbit.ownedDetails.length, 1);
  assert.deepEqual(counts(), {saves: 1, prompts: 0});
});
