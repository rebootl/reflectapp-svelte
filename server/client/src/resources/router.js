
const registeredComponents = new Set();

const updateCallbacks = new Set();

const dec = decodeURIComponent;
const enc = encodeURIComponent;

class Router {
  constructor() {
    window.addEventListener('hashchange', ()=>this.urlChange());
    window.addEventListener('load', ()=>this.urlChange());
  }
  registerSvelte(updateCallback) {
    updateCallbacks.add(updateCallback);
  }
  unregisterSvelte(updateCallback) {
    updateCallbacks.delete(updateCallback);
  }
  register(comp) {
    console.log("router register");
    registeredComponents.add(comp);
  }
  unregister(comp) {
    registeredComponents.delete(comp);
  }
  triggerUpdate() {
    this.urlChange();
  }
  urlChange() {
    this.parseUrl();
    //console.log("router update");
    for (const c of registeredComponents) {
      c.routerUpdate();
    }
    for (let c of updateCallbacks) {
      c();
    }
  }
  getRoute() {
    return this._route || '';
  }
  getRouteNamed() {
    // user entries/entry
    if (this._route.startsWith('~')) {
      const _p0 = this.getParts(0);
      // single user entry
      if (_p0[0]) {
        if (_p0[0].startsWith('~')) {
          return 'singleentry';
        }
      }
      return 'user';
    }
    return 'overview';
  }
  getUser() {
    if (this._route.startsWith('~'))
      return this._route.slice(1);
    return '';
  }
  getEntryId() {
    const p = this.getParts(0);
    //console.log(p)
    if (p) {
      if (p.startsWith('~')) {
        return p.slice(1);
      }
      return '';
    }
    return '';
  }
  getParts(n) {
    console.log(this._parts)
    return this._parts[n] || [];
  }
  getParameters() {
    return this._parameters || [];
  }
  parseUrl() {
    const hashString = location.hash.slice(1) || '';
    const [ path, parameters ] = hashString.split('?');
    const pathParts = path.split('/');
    // ~username
    this._route = dec(pathParts[0]);
    this._parts = pathParts.slice(1).map(p=>dec(p));
    // -> needed?
    if (this._parts[0]) if (this._parts[0][0] === '') this._parts[0] = [];

    this._parameters = parameters ? parameters.split('&').map((p)=>dec(p)) : [];
  }
  setURL(route, parts=[], parameters=[]) {
    const parameterString = parameters.map(p=>enc(p)).join('&');

    const pts = parts.join('/');

    let hashString = '#' + route;
    if (pts.length > 0) hashString += '/' + s;
    if (parameterString.length > 0) hashString += '?' + parameterString;
    window.location.hash = hashString;
  }
}

export const myrouter = new Router();
