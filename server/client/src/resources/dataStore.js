import { apiGetRequest } from './requests.js';
import { profilesURL } from './urls.js';
import { getEntries, getUserMenu } from './getData.js';

const updateCallbacks = new Set();

class DataStore {

  set currentMenu(v) {
    this._currentMenu = v;

    const activeTopics = [];
    const activeTags = []
    for (const t of v) {
      if (t.active) activeTopics.push(t.name);
      for (const u of t.tags) {
        if (u.active) activeTags.push(u.name);
      }
    }
    this.activeTopics = activeTopics;
    this.activeTags = activeTags;
  }
  get currentMenu() {
    return this._currentMenu;
  }

  set activeTopics(v) {
    this._activeTopics = v;
    console.log(v)
  }
  get activeTopics() {
    return this._activeTopics;
  }
  set activeTags(v) {
    this._activeTopics = v;
    console.log(v)
  }
  get activeTags() {
    return this._activeTopics;
  }

  constructor() {
    this.profiles = null;
    this.userMenus = {};
    this.entries = {};
    this.currentMenu = [];
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
    console.log("loadEntries (loading entries from server)")
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
                     activeTopics = [], activeTags =  [],
                     skip = 0, limit = 10) {
    if (!this.entries.hasOwnProperty(user)) {
      await this.loadEntries(user);
    }
    let entries = this.entries[user];
    if (typeSelect !== 'any') {
      entries = this.entries[user].filter((e) => e.type === typeSelect);
    }
    if (activeTopics.length > 0) {
      entries = entries.filter((e) => {
        for (const t of e.topics) {
          if (activeTopics.includes(t)) return e;
        }
      });
    }
    if (activeTags.length > 0) {
      entries = entries.filter((e) => {
        for (const t of e.tags) {
          if (activeTopics.includes(t)) return e;
        }
      });
    }
    return entries.slice(skip, skip + limit);
  }

  async loadUserMenu(user) {
    const r = await getUserMenu(user);
    const r1 = r.map((e) => {
      e.active = false;
      e.tags = e.tags.map((e) => { return { name: e, active: false }});
      return e;
    });
    //console.log(r1)
    this.userMenus[user] = r;
    this.currentMenu = r;
  }
  async getUserMenu(user) {
    if (!this.userMenus.hasOwnProperty(user))
      await this.loadUserMenu(user);
    return this.userMenus[user];
  }
}

export const myDataStore = new DataStore();
