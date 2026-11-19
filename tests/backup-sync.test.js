const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../app/app.js'), 'utf8');
function fn(name) {
 const start = source.search(new RegExp('(?:async )?function '+name+'\\('));
 const rest = source.slice(start); const end = rest.slice(1).search(/\n(?:async )?function /);
 return end < 0 ? rest : rest.slice(0,end+1);
}
test('backup exports collection, settings, and stock together', () => {
 const c=vm.createContext({STORAGE_KEY:'progress',SETTINGS_STORAGE_KEY:'settings',STOCK_STORAGE_KEY:'stock',progress:{rabbit:{status:'have',ownedCount:2}},settings:{hiddenSeries:[],hiddenSonnies:[]},loadLocalStockItems:()=>[{id:'sale-copy'}],getMeaningfulProgressCount:()=>1});
 vm.runInContext(fn('buildTrackerBackupPayload'),c);
 const b=c.buildTrackerBackupPayload(); assert.equal(b.data.progress.rabbit.ownedCount,2);assert.equal(b.data.stock[0].id,'sale-copy');assert.deepEqual(b.data.settings.hiddenSeries,[]);
});
test('restore preserves settings and stock and does not claim failed cloud sync succeeded', async () => {
 let feedback='',state='';const saved=new Map();
 const data={progress:{rabbit:{status:'have',ownedCount:2}},settings:{hiddenSeries:['old']},stock:[{id:'sale-copy'}]};
 const c=vm.createContext({STORAGE_KEY:'progress',SETTINGS_STORAGE_KEY:'settings',STOCK_STORAGE_KEY:'stock',authBackupFileInput:{files:[{text:async()=>JSON.stringify({data})}],value:'file'},extractTrackerProgressFromBackup:x=>x.data.progress,hasMeaningfulProgress:()=>true,normalizeSettingsSnapshot:x=>x,saveSettings:()=>{},saveLocalStockItems:x=>saved.set('stock',x),localStorage:{setItem:(k,v)=>saved.set(k,v)},RECOVERY_STORAGE_KEY:'recovery',applyFilters:()=>{},getMeaningfulProgressCount:()=>1,authState:{user:{id:'test'},configured:true},syncProgressToCloud:async()=>false,setAuthFeedback:x=>feedback=x,setSaveState:x=>state=x,console});
 vm.runInContext(fn('restoreTrackerBackupFromFile'),c);await c.restoreTrackerBackupFromFile();
 assert.equal(c.progress.rabbit.ownedCount,2);assert.equal(c.settings.hiddenSeries[0],'old');assert.equal(saved.get('stock')[0].id,'sale-copy');assert.equal(state,'error');assert.match(feedback,/cloud sync failed/);assert.doesNotMatch(feedback,/synced them/);
});
test('cloud failures return false and retain the recovery copy', async () => {
 let cleared=false;const c=vm.createContext({authState:{client:{from:()=>({upsert:async()=>({error:new Error('offline')})})},user:{id:'test'},hydrating:false},renderAuthState:()=>{},buildCloudRowsFromProgress:()=>({rows:[{sonny_id:'rabbit'}],emptyIds:[]}),ensureProfileRow:async()=>{},isSessionError:()=>false,setAuthFeedback:()=>{},setSaveState:()=>{},clearRecoveryProgress:()=>cleared=true,console:{error:()=>{}}});vm.runInContext(fn('syncProgressToCloud'),c);
 assert.equal(await c.syncProgressToCloud(),false);assert.equal(cleared,false);assert.equal(c.authState.syncing,false);
});
test('invalid stored progress shapes do not crash startup', () => {
 for (const raw of ['null','[]','42','"invalid"','{broken']) {
  const c=vm.createContext({STORAGE_KEY:'progress',localStorage:{getItem:()=>raw}});vm.runInContext(fn('loadProgress'),c);assert.equal(Object.keys(c.loadProgress()).length,0);
 }
});
test('successful cloud save reports success only after snapshot persistence', async () => {
 let recovered=false,persisted=false,mode='';const c=vm.createContext({authState:{client:{from:()=>({upsert:async()=>({error:null})})},user:{id:'test'},hydrating:false},progress:{rabbit:{status:'have',ownedCount:2}},STORAGE_KEY:'progress',renderAuthState:()=>{},buildCloudRowsFromProgress:()=>({rows:[{sonny_id:'rabbit',progress_data:{ownedCount:2}}],emptyIds:[]}),ensureProfileRow:async()=>{},syncProfileStateToCloud:async()=>{},localStorage:{setItem:()=>persisted=true},clearRecoveryProgress:()=>recovered=true,setAuthFeedback:()=>{},setSaveState:x=>mode=x,console});vm.runInContext(fn('syncProgressToCloud'),c);assert.equal(await c.syncProgressToCloud(),true);assert.equal(persisted,true);assert.equal(recovered,true);assert.equal(mode,'saved');
});
