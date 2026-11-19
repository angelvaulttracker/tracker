const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../app/app.js'), 'utf8');
function functionSource(name) {
  const start = source.indexOf(`function ${name}(`);
  const end = source.indexOf('\nfunction ', start + 1);
  return source.slice(start, end);
}
for (const separate of [false, true]) {
  test(`selecting and closing a collected figure preserves browsing position (separate copies: ${separate})`, () => {
    let renders = 0;
    const context = vm.createContext({
      settings: {collectedShowMultipleSeparate: separate},
      expandedCollectedId: null, expandedCollectedKey: null, sonnies: [],
      renderCollected() { renders++; },
      window: {scrollTo() {throw new Error('Selection must not scroll');}},
    });
    vm.runInContext(functionSource('toggleCollectedExpansion') + '\n' + functionSource('toggleCollectedEntryExpansion'), context);
    context.toggleCollectedEntryExpansion({id: 'rabbit'}, 'rabbit:1');
    assert.equal(context.expandedCollectedId, 'rabbit');
    assert.equal(context.expandedCollectedKey, separate ? 'rabbit:1' : 'rabbit');
    context.toggleCollectedEntryExpansion({id: 'rabbit'}, 'rabbit:1');
    assert.equal(context.expandedCollectedId, null);
    assert.equal(renders, 2);
    assert.doesNotMatch(functionSource('renderCollected'), /centerPendingCollectedBubble|scrollTo|scrollIntoView/);
  });
}
