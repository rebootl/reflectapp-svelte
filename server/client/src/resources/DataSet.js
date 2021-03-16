import { apiGetRequest, apiPostRequest, apiDeleteRequest } from './requests.js';

let updateQueue = [];
let syncInterval = null;
let locked = false;

export class DataSet {
  constructor(url) {
    this.url = url;

    this.data = [];
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
    // update locally
    this.dataStore.update(d => [ e, ...d ]);
    // insert queue
    updateQueue.push({ type: 'NEW', data: e });
    // sync queue
    this._syncQueue();
  }
  async update(e) {
    // update locally
    this.dataStore.update(d => {
      return d.map(v => {
        if (v.id === e.id) return e;
        return v;
      });
    });
    // insert queue
    updateQueue.push({ type: 'UPDATE', data: e });
    // sync queue
    this._syncQueue();
  }
  async delete(e) {
    // update locally
    this.dataStore.update(d => {
      return d.filter(v => {
        if (v.id !== e.id) return v;
      });
    });
    // insert queue
    updateQueue.push({ type: 'DELETE', data: e });
    // sync queue
    this._syncQueue();
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
      if (v.type === 'NEW') {
        r = await apiPostRequest(this.url, v.data);
      }
      else if (v.type === 'UPDATE') {
        r = await apiPostRequest(this.url, v.data);
      }
      else if (v.type === 'DELETE') {
        console.log(v.data)
        r = await apiDeleteRequest(this.url, v.data);
      }
      // check return
      if (!r.success) {
        console.log(r);
        // if server not reachable push to new queue
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
