import { writable, derived } from 'svelte/store';

// application state

export const activeTopics = writable(new Set());
export const activeTags = writable(new Set());

export const activeType = writable('any');

export const limitDisplay = writable(10);

// application data

export const userList = writable([]);

// all the user entries, loaded when clicked on user in userList
export const userEntries = writable([]);

// tags set by filteredEntries below, according to selected entries
export const tags = writable([]);

// derived from userEntries depending on selection state
export const filteredEntries = derived(
  [
    activeTopics,
    activeTags,
    activeType,
    limitDisplay,
    userEntries,
  ],
  ([
    $activeTopics,
    $activeTags,
    $activeType,
    $limitDisplay,
    $userEntries,
  ]) => {
    let filteredEntries = [];
    if ($activeType !== 'any') {
      filteredEntries = $userEntries.filter((e) => e.type === $activeType);
    } else filteredEntries = $userEntries;
    if ($activeTopics.size > 0) {
      filteredEntries = filteredEntries.filter((e) => {
        for (const t of e.topics) {
          if ($activeTopics.has(t)) return e;
        }
      });
    }

    // set tags here depending on filtered entries
    const t = [];
    for (const entry of filteredEntries) {
      for (const tag of entry.tags) {
        if (!t.includes(tag)) t.push(tag);
      }
    }
    tags.set(t.sort());

    if ($activeTags.size > 0) {
      filteredEntries = filteredEntries.filter((e) => {
        for (const t of e.tags) {
          if ($activeTags.has(t)) return e;
        }
      });
    }
    return filteredEntries.slice(0, $limitDisplay);
  }
);

// derived from userEntries
export const topics = derived(
  userEntries,
  $userEntries => {
    const topics = [];
    for (const entry of $userEntries) {
      for (const topic of entry.topics) {
        if (!topics.includes(topic)) {
          topics.push(topic);
        }
      }
    }
    return topics.sort();
  }
);
