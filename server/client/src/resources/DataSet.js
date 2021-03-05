import { apiGetRequest } from './requests.js';

export class DataSet {
  constructor(url) {
    this.url = url;

    this.data = [];
    //this.load();
  }
  useStore(store) {
    this.store = store;
    this.store.set(this.data);
  }
  async load() {
    const r = await apiGetRequest(this.url, {
      skip: 0,
    });
    if (!r.success) {
      console.error(r)
      this.data = [];
    } else {
      this.data = r.result;
    }
  }
  async new() {
  }
  async update() {
  }
  async delete() {
  }
}
