import { writable, derived } from 'svelte/store';

// application state

export const activeTopics = writable(new Set());
export const activeTags = writable(new Set());

export const activeType = writable('any');

export const limitDisplay = writable(10);

// application data

export const userList = writable([]);

// -> all the user entries, loaded when clicked on user in userList
export const userEntries = writable([]);

// -> derived from userEntries depending on selection state
export const filteredEntries = derived(
  activeTopics,
  userEntries,
  ($activeTopics, $userEntries) => {
    return $userEntries;
  }
);
// -> derived from userEntries
//export const userMenu = derived([]);
