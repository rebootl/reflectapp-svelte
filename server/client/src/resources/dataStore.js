import { apiGetRequest } from './requests.js';
import { profilesURL } from './urls.js';
import { getEntries, getUserMenu } from './getData.js';

const updateCallbacks = new Set();


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
    }
    this.data = r.result;
  }
  async new() {
  }
  async update() {
  }
  async delete() {
  }
}



class DataStore {

  constructor() {
    this.profiles = null;
    this.userMenus = {};
    this.entries = {};
  }

  registerUpdateCallback(f) {
    updateCallbacks.add(f);
  }

  updateCallbacks() {
    for (const f of updateCallbacks) {
      f();
    }
  }

  async loadProfiles() {
		const r = await apiGetRequest(profilesURL);
		if (!r.success) {
			console.error(r)
			return [];
		}
		return r.result;
	}
  async getProfiles() {
    if (!this.profiles)
      this.profiles = await this.loadProfiles();
    return this.profiles;
  }

  async loadEntries(user) {
    //console.log("loadEntries (loading entries from server)")
    this.entries[user] = await getEntries(user, [], [], 'any');
  }
  async getSingleEntry(user, entryId) {
    if (user === '') {
      console.log("no user to load for");
      return;
    }
    if (!this.entries.hasOwnProperty(user)) {
      await this.loadEntries(user);
    }
    const entry = this.entries[user].filter((e) => e.id === entryId);
    return entry;
  }
  async getFilteredEntries(user, typeSelect = 'any',
                     activeTopics = new Set(), activeTags =  new Set(),
                     skip = 0, limit = 10) {
    if (!this.entries.hasOwnProperty(user)) {
      await this.loadEntries(user);
    }
    let entries = this.entries[user];
    if (typeSelect !== 'any') {
      entries = this.entries[user].filter((e) => e.type === typeSelect);
    }
    if (activeTopics.size > 0) {
      entries = entries.filter((e) => {
        for (const t of e.topics) {
          if (activeTopics.has(t)) return e;
        }
      });
    }
    if (activeTags.size > 0) {
      entries = entries.filter((e) => {
        for (const t of e.tags) {
          if (activeTags.has(t)) return e;
        }
      });
    }
    return entries.slice(skip, skip + limit);
  }

  async loadUserMenu(user) {
    const r = await getUserMenu(user);
    this.userMenus[user] = r;
  }
  async getUserMenu(user) {
    if (!this.userMenus.hasOwnProperty(user))
      await this.loadUserMenu(user);
    return this.userMenus[user];
  }
}

export const myDataStore = new DataStore();
