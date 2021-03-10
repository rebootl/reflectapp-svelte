
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

const updateCallbacks = new Set();

const dec = decodeURIComponent;
const enc = encodeURIComponent;

class Router {

  get namedRoute() {
    return this._namedRoute || '';
  }
  set namedRoute(v) {
    this._namedRoute = v;
  }

  get user() {
    return this._user || '';
  }
  set user(v) {
    this._user = v;
  }

  get entryId() {
    return this._entryId || '';
  }
  set entryId(v) {
    this._entryId = v;
  }

  constructor() {
    window.addEventListener('hashchange', ()=>this._urlChange());
    window.addEventListener('load', ()=>this._urlChange());
  }

  registerCallback(f) {
    updateCallbacks.add(f);
  }
  unregisterCallback(f) {
    updateCallbacks.delete(f);
  }
  triggerUpdate() {
    this._urlChange();
  }
  /*setURL(p) {
    window.location.pathname = p;
  }*/
  setNamedRoute(v) {
    let route = '';
    if (v.length > 1) {
      route = '#' + enc(v[0]) + '/' + enc(v[1]);
    } else {
      route = '#' + enc(v[0]);
    }
    window.location.hash = route;
  }

  _urlChange() {
    this._parseUrl();
    for (let c of updateCallbacks) {
      c();
    }
  }
  _parseUrl() {
    const pathArray = location.hash.slice(1).split('/');

    this.route = dec(pathArray[0]);

    if (this.route === '')
      this.namedRoute = 'home';
    else {
      this.namedRoute = 'user';
      this.user = pathArray[0];

      if (pathArray.length > 1) {
        this.namedRoute = 'singleentry';
        this.entryId = pathArray[1];
      }
    }
  }
}

export const myrouter = new Router();
