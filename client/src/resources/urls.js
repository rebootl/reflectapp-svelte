// request/server urls
const host = window.location.origin.toString();
const api = '/api';
const hostapi = host + api;

export const loginUrl = hostapi + '/login';
export const urlInfoUrl = '/api/urlinfo';
export const uploadMultiImagesUrl = '/api/uploadMultiImages';

export const profilesURL = hostapi + '/profiles';
export const entriesURL = hostapi + '/entries';
