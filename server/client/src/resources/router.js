
// as per: https://stackoverflow.com/questions/6390341/how-to-detect-if-url-has-changed-after-hash-in-javascript
//
/*history.pushState = ( f => function pushState(){
    var ret = f.apply(this, arguments);
    window.dispatchEvent(new Event('pushstate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
})(history.pushState);

history.replaceState = ( f => function replaceState(){
    var ret = f.apply(this, arguments);
    window.dispatchEvent(new Event('replacestate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
})(history.replaceState);

window.addEventListener('popstate',()=>{
    window.dispatchEvent(new Event('locationchange'))
});*/
//


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
  parseUrl() {
    this._pathArray = window.location.pathname.split('/');
    console.log(this._pathArray)

    this._route = dec(this._pathArray[0]);
  }
  setURL(p) {
    window.location.pathname = p;
  }
}

export const myrouter = new Router();
