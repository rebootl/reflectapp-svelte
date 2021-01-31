import { apiGetRequest } from './requests.js';
import { entriesURL, menuURL } from './urls.js';

export async function getEntry(user, id) {
  const r = await apiGetRequest(entriesURL + '/' + user + '/' + id + '/', {});
  if (!r.success) {
    console.error(r)
    return [];
  }
  return r.result;
}

export async function getEntries(user, topics, tags, type, skip = 0) {
  const r = await apiGetRequest(entriesURL + '/' + user, {
    topics: topics,
    tags: tags,
    type: type,
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
