import { apiGetRequest } from './requests.js';
import { entriesURL, menuURL } from './urls.js';

export async function getEntries(user, topics, tags, skip = 0) {
  const r = await apiGetRequest(entriesURL + '/' + user, {
    topics: topics,
    tags: tags,
    skip: skip
  });
  if (!r.success) {
    console.error(r)
    return [];
  }
  return r.result;
}

export async function getAllEntries(skip = 0) {
  const r = await apiGetRequest(entriesURL + '/', {
    skip: skip
  });
  if (!r.success) {
    console.error(r)
    return [];
  }
  return r.result;
}

export async function getUserMenu(user) {
  const r = await apiGetRequest(menuURL + '/' + user);
  if (!r.success) {
    console.error(r)
    return [];
  }
  return r.result;
}
