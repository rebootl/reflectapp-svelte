import { writable } from 'svelte/store';

export const activeTopics = writable(new Set());
export const activeTags = writable(new Set());




export const userEntries = writable({});
