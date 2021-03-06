import { apiGetRequest, apiPostRequest } from './requests.js';

let updateQueue = [];
let syncInterval = null;
let locked = false;

export class DataSet {
  constructor(url) {
    this.url = url;

    this.data = [];
    //this.load();
  }
  useStore(dataStore) {
    this.dataStore = dataStore;
    this.dataStore.set(this.data);
  }
  async load(params = {}) {
    const r = await apiGetRequest(this.url, {
      skip: 0,
      ...params
    });
    if (!r.success) {
      console.error(r)
      this.data = [];
    } else {
      this.data = r.result;
    }
  }
  async fetch() {

  }
  async new(e) {
    // -> update locally
    this.dataStore.update(d => [ e, ...d ]);
    // -> insert queue
    updateQueue.push({ type: 'POST', data: e });
    // -> sync queue
    this._syncQueue();
  }
  async update() {
  }
  async delete() {
  }

  async _syncQueue() {
    if (!syncInterval)
      syncInterval = setInterval(() => this._syncQueue(), 3000);
    if (locked) return;
    else locked = true;
    console.log("SYNCTRY");
    const newQueue = [];
    for (const v of updateQueue) {
      let r;
      if (v.type === 'POST') {
        r = await apiPostRequest(this.url, v.data);
      }
      else if (v.type === 'PUT') {}
      else if (v.type === 'DELETE') {}
      // -> check return
      if (!r.success) {
        console.log(r);
        // -> if server not reachable push to new queue
        newQueue.push(v);
      }
      // -> what to do if error/cannot sync?
    }
    updateQueue = newQueue;
    console.log(updateQueue)
    // -> if queue empty, clear interval
    if (updateQueue.length === 0)
      clearInterval(syncInterval);
    locked = false;
  }
}
