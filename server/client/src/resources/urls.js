// request/server urls
const host = window.location.origin.toString();
const api = '/api';
const hostapi = host + api;

//export const loginUrl = hostapi + '/login';
export const authURL = hostapi + '/auth'
export const urlInfoUrl = hostapi + '/urlinfo';
export const uploadMultiImagesUrl = hostapi + '/uploadMultiImages';

export const profilesURL = hostapi + '/profiles';
export const entriesURL = hostapi + '/entries';
export const menuURL = hostapi + '/menu';
