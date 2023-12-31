// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}
(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }
  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  }
  // if setTimeout wasn't available but was latter defined
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  }
  // if clearTimeout wasn't available but was latter defined
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
};

// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};
process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};
function noop() {}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function (name) {
  return [];
};
process.binding = function (name) {
  throw new Error('process.binding is not supported');
};
process.cwd = function () {
  return '/';
};
process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};
process.umask = function () {
  return 0;
};
},{}],"node_modules/tradex-chart/dist/tradex-chart.es.js":[function(require,module,exports) {
var process = require("process");
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canvas = exports.StateMachine = exports.Range = exports.Overlay = exports.Indicator = exports.EventHub = exports.DOM = exports.Chart = void 0;
exports.copyDeep = ce;
exports.isPromise = cm;
exports.mergeDeep = Bt;
exports.talibAPI = void 0;
exports.uid = Z;
function ia(r, e) {
  for (var i = 0; i < e.length; i++) {
    const s = e[i];
    if (typeof s != "string" && !Array.isArray(s)) {
      for (const n in s) if (n !== "default" && !(n in r)) {
        const o = Object.getOwnPropertyDescriptor(s, n);
        o && Object.defineProperty(r, n, o.get ? o : {
          enumerable: !0,
          get: () => s[n]
        });
      }
    }
  }
  return Object.freeze(Object.defineProperty(r, Symbol.toStringTag, {
    value: "Module"
  }));
}
const bs = "0.139.19";
function M(r) {
  return Array.isArray(r);
}
function U(r) {
  return r && typeof r == "function";
}
function b(r) {
  return typeof r == "object" && !Array.isArray(r) && r !== null;
}
function T(r) {
  return typeof r == "number" && !isNaN(r);
}
function K(r) {
  return typeof r == "boolean";
}
function E(r) {
  return typeof r == "string";
}
function cm(r) {
  return !!r && (b(r) || U(r)) && U(r.then);
}
const sa = ["y", "M", "d", "h", "m", "s", "ms"],
  na = ["years", "months", "days", "hours", "minutes", "seconds", "milliseconds"],
  ra = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
  oa = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335],
  or = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  aa = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  ar = 1231006505e3,
  Ye = 1,
  z = 1e3,
  F = z * 60,
  j = F * 60,
  $ = j * 24,
  pt = $ * 7,
  he = $ * 30;
function lr(r = 3, e = !1) {
  let i = or[r % 12] * $;
  return e && r > 0 && (i += $), i;
}
const ve = $ * 365,
  $t = {
    y: ve,
    M: he,
    w: pt,
    d: $,
    h: j,
    m: F,
    s: z,
    u: Ye
  },
  hr = {
    years: ve,
    months: he,
    weeks: pt,
    days: $,
    hours: j,
    minutes: F,
    seconds: z,
    milliseconds: Ye
  },
  la = {
    ...$t,
    ...hr
  },
  Yt = {
    YEARS10: [ve * 10, "years"],
    YEARS5: [ve * 5, "years"],
    YEARS3: [ve * 3, "years"],
    YEARS2: [ve * 2, "years"],
    YEARS: [ve, "years"],
    MONTH6: [he * 6, "months"],
    MONTH4: [he * 4, "months"],
    MONTH3: [he * 3, "months"],
    MONTH2: [he * 2, "months"],
    MONTH: [he, "months"],
    DAY15: [$ * 15, "years"],
    DAY10: [$ * 10, "days"],
    DAY7: [$ * 7, "days"],
    DAY5: [$ * 5, "days"],
    DAY3: [$ * 3, "days"],
    DAY2: [$ * 2, "days"],
    DAY: [$, "days"],
    HOUR12: [j * 12, "hours"],
    HOUR6: [j * 6, "hours"],
    HOUR4: [j * 4, "hours"],
    HOUR2: [j * 2, "hours"],
    HOUR: [j, "hours"],
    MINUTE30: [F * 30, "minutes"],
    MINUTE15: [F * 15, "minutes"],
    MINUTE10: [F * 10, "minutes"],
    MINUTE5: [F * 5, "minutes"],
    MINUTE2: [F * 2, "minutes"],
    MINUTE: [F, "minutes"],
    SECOND30: [z * 30, "seconds"],
    SECOND15: [z * 15, "seconds"],
    SECOND10: [z * 10, "seconds"],
    SECOND5: [z * 5, "seconds"],
    SECOND2: [z * 2, "seconds"],
    SECOND: [z, "seconds"],
    MILLISECOND500: [Ye * 500, "milliseconds"],
    MILLISECOND250: [Ye * 250, "milliseconds"],
    MILLISECOND100: [Ye * 100, "milliseconds"],
    MILLISECOND50: [Ye * 50, "milliseconds"],
    MILLISECOND: [Ye, "milliseconds"]
  },
  ha = () => {
    const r = Object.values(Yt),
      e = [];
    for (let i = r.length; --i; i > 0) e[i] = r[i][0];
    return e;
  },
  Dt = ha(),
  ca = () => {
    const r = Object.values(Yt),
      e = [];
    for (let i = r.length; --i; i > 0) e[i] = r[i][1];
    return e;
  },
  os = ca(),
  ua = Object.keys(Yt),
  da = () => {
    const r = {};
    for (const [e, i] of Object.entries(Yt)) r[e] = i[0];
    return r;
  },
  ma = da(),
  as = {
    0: "Europe/London",
    "-120": "Europe/Tallinn",
    "-60": "Europe/Zurich",
    180: "America/Santiago",
    300: "America/Toronto",
    240: "America/Caracas",
    360: "America/Mexico_City",
    540: "America/Juneau",
    480: "America/Vancouver",
    420: "US/Mountain",
    120: "America/Sao_Paulo",
    "-360": "Asia/Almaty",
    "-300": "Asia/Ashkhabad",
    "-180": "Europe/Moscow",
    "-420": "Asia/Jakarta",
    "-480": "Asia/Taipei",
    "-240": "Asia/Muscat",
    "-345": "Asia/Kathmandu",
    "-330": "Asia/Kolkata",
    "-540": "Asia/Tokyo",
    "-210": "Asia/Tehran",
    "-660": "Pacific/Norfolk",
    "-630": "Australia/Adelaide",
    "-600": "Australia/Brisbane",
    "-780": "Pacific/Fakaofo",
    "-825": "Pacific/Chatham",
    600: "Pacific/Honolulu"
  };
function pa() {
  const r = ( /* @__PURE__ */new Date()).getTimezoneOffset();
  return Object.prototype.hasOwnProperty.call(as, r) ? as[r.toString()] : "Etc/UTC";
}
function ga() {
  const r = {};
  for (let e in $t) {
    let i = 0;
    r[e] = [];
    do r[e].push(Math.round($t[e] * i)), i += 0.125; while (i < 1);
  }
  return r;
}
function cr(r) {
  const e = new Date(r).getTime();
  return T(e);
}
function ur(r, e = ar, i = Date.now()) {
  return cr(r) ? r > e && r < i : !1;
}
function Nt(r, e, i) {
  r = new Date(r), e = new Date(e);
  var s = e.getTime(),
    n = r.getTime();
  return parseInt((s - n) / i);
}
const Ge = {
  inSeconds: function (r, e) {
    return Nt(r, e, z);
  },
  inMinutes: function (r, e) {
    return Nt(r, e, F);
  },
  inHours: function (r, e) {
    return Nt(r, e, j);
  },
  inDays: function (r, e) {
    return Nt(r, e, $);
  },
  inWeeks: function (r, e) {
    return Nt(r, e, pt);
  },
  inMonths: function (r, e) {
    r = new Date(r), e = new Date(e);
    let i = r.getUTCFullYear(),
      s = e.getUTCFullYear(),
      n = r.getUTCMonth();
    return e.getUTCMonth() + 12 * s - (n + 12 * i);
  },
  inYears: function (r, e) {
    let i = new Date(r);
    return new Date(e).getUTCFullYear() - i.getUTCFullYear();
  }
};
function fa(r, e) {
  let i = Ge.inYears(r, e),
    s = Ge.inMonths(r, e),
    n = Ge.inWeeks(r, e),
    o = Ge.inDays(r, e),
    a = Ge.inHours(r, e),
    l = Ge.inMinutes(r, e),
    h = Ge.inSeconds(r, e),
    m = new Date(e).getTime() - new Date(r).getTime();
  return {
    y: i,
    M: s,
    w: n,
    d: o,
    h: a,
    m: l,
    s: h,
    ms: m,
    years: i,
    months: s,
    weeks: n,
    days: o,
    hours: a,
    minutes: l,
    seconds: h,
    milliseconds: m
  };
}
function di(r) {
  let e = z;
  return E(r) ? (e = dr(r), e ? r = r : (e = z, r = "1s")) : r = "1s", {
    tf: r,
    ms: e
  };
}
function dr(r) {
  if (!E(r)) return !1;
  const e = /([0-9]{1,2})([s|m|h|d|w|M|y])/gm;
  let i;
  return (i = e.exec(r)) !== null ? $t[i[2]] * i[1] : !1;
}
function Cs(r) {
  let e = Math.floor(r / 1e3),
    i = Math.floor(e / 60);
  e = e % 60;
  let s = Math.floor(i / 60);
  i = i % 60;
  let n = Math.floor(s / 24);
  s = s % 24;
  let o = Math.floor(n / 7);
  n = n % 7;
  let a = Math.floor(o / 4),
    l = Math.floor(o / 52),
    h = o % 4;
  return a = a % 13, {
    y: l,
    M: a,
    w: h,
    d: n,
    h: s,
    m: i,
    s: e,
    years: l,
    months: a,
    weeks: h,
    days: n,
    hours: s,
    minutes: i,
    seconds: e
  };
}
function kt(r) {
  const e = Cs(r);
  for (const i in e) if (e[i]) return `${e[i]}${i}`;
}
function mr(r) {
  return r ? new Date(r).getUTCSeconds() : null;
}
function Ts(r) {
  return new Date(r).setUTCMilliseconds(0, 0);
}
function pr(r) {
  return r ? new Date(r).getUTCMinutes() : null;
}
function Es(r) {
  return new Date(r).setUTCSeconds(0, 0);
}
function gr(r) {
  return r ? new Date(r).getUTCHours() : null;
}
function Ss(r) {
  return new Date(r).setUTCMinutes(0, 0, 0);
}
function Ps(r) {
  return r ? new Date(r).getUTCDate() : null;
}
function ya(r, e = "en-GB", i = "short") {
  return new Date(r).toLocaleDateString(e, {
    weekday: i
  });
}
function Ut(r) {
  return new Date(r).setUTCHours(0, 0, 0, 0);
}
function Ms(r) {
  if (r) return new Date(r).getUTCMonth();
}
function fr(r, e = "en-GB", i = "short") {
  return new Date(r).toLocaleDateString(e, {
    month: i
  });
}
function As(r) {
  let e = new Date(r);
  return Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), 1);
}
function yr(r) {
  let e = (Ms(r) + 1) % 12;
  return r += lr(e, Di(r)), r;
}
function vr(r) {
  if (r) return new Date(r).getUTCFullYear();
}
function Ls(r) {
  return Date.UTC(new Date(r).getUTCFullYear());
}
function wr(r) {
  return r = r + ve + $, Di(r), r;
}
function Di(r) {
  let i = new Date(r).getUTCFullYear();
  return i & 3 ? !1 : i % 100 != 0 || i % 400 == 0;
}
function va(r) {
  let e = new Date(r),
    i = e.getUTCMonth(),
    s = e.getUTCDate(),
    n = dayCount[i] + s;
  return i > 1 && Di() && n++, n;
}
function mi(r, e) {
  return {
    years: s => Ls(s),
    months: s => As(s),
    weeks: s => Ut(s),
    days: s => Ut(s),
    hours: s => Ss(s),
    minutes: s => Es(s),
    seconds: s => Ts(s)
  }[e](r);
}
function wa(r, e) {
  let i, s;
  switch (e) {
    case "years":
      i = Ls(r), s = wr(r);
      break;
    case "months":
      i = As(r), s = yr(r);
      break;
    case "weeks":
      i = Ut(r), s = i + $;
      break;
    case "days":
      i = Ut(r), s = i + $;
      break;
    case "hours":
      i = Ss(r), s = i + j;
      break;
    case "minutes":
      i = Es(r), s = i + F;
      break;
    case "seconds":
      i = Ts(r), s = i + z;
  }
  return {
    start: i,
    end: s
  };
}
function ls(r) {
  let {
    h: e,
    m: i
  } = Ns(r);
  return e == 0 && i == 0 ? `${d}` : `${e}:${i}`;
}
function xa(r) {
  let {
    h: e,
    m: i,
    s
  } = Ns(r);
  return e == 0 && i == 0 && s == 0 ? `${d}` : `${e}:${i}:${s}`;
}
function hs(r) {
  let {
    h: e,
    m: i,
    s
  } = Ns(r);
  return e == 0 && i == 0 && s == 0 ? `${d}` : `${i}:${s}`;
}
function Ns(r) {
  let e, i, s, n;
  return e = String(Ps(r)), i = String(gr(r)).padStart(2, "0"), s = String(pr(r)).padStart(2, "0"), n = String(mr(r)).padStart(2, "0"), {
    d: e,
    h: i,
    m: s,
    s: n
  };
}
function ba(r, e) {
  let i = 1 / 0,
    s = null,
    n = -1;
  for (let o = 0; o < e.length; o++) {
    let a = e[o][0];
    Math.abs(a - r) < i && (i = Math.abs(a - r), s = e[o], n = o);
  }
  return [n, s];
}
const Ca = /* @__PURE__ */Object.freeze( /* @__PURE__ */Object.defineProperty({
  __proto__: null,
  BTCGENESIS: ar,
  DAY_MS: $,
  HM: ls,
  HMS: xa,
  HOUR_MS: j,
  MILLISECOND: Ye,
  MINUTE_MS: F,
  MONTHMAP: aa,
  MONTHR_MS: he,
  MONTH_MS: lr,
  MS: hs,
  SECOND_MS: z,
  TIMESCALES: Dt,
  TIMESCALESKEYS: ua,
  TIMESCALESRANK: os,
  TIMESCALESVALUES: Yt,
  TIMESCALESVALUESKEYS: ma,
  TIMEUNITS: sa,
  TIMEUNITSLONG: na,
  TIMEUNITSVALUES: la,
  TIMEUNITSVALUESLONG: hr,
  TIMEUNITSVALUESSHORT: $t,
  WEEK_MS: pt,
  YEAR_MS: ve,
  buildSubGrads: ga,
  dayCntInc: ra,
  dayCntLeapInc: oa,
  dayOfYear: va,
  day_start: Ut,
  getTimezone: pa,
  get_day: Ps,
  get_dayName: ya,
  get_hour: gr,
  get_minute: pr,
  get_month: Ms,
  get_monthName: fr,
  get_second: mr,
  get_year: vr,
  hour_start: Ss,
  interval2MS: dr,
  isLeapYear: Di,
  isTimeFrame: di,
  isValidTimeInRange: ur,
  isValidTimestamp: cr,
  minute_start: Es,
  monthDayCnt: or,
  month_start: As,
  ms2Interval: kt,
  ms2TimeUnits: Cs,
  nearestTs: ba,
  nextMonth: yr,
  nextYear: wr,
  second_start: Ts,
  time_start: mi,
  timestampDiff: Ge,
  timestampDifference: fa,
  timezones: as,
  unitRange: wa,
  year_start: Ls
}, Symbol.toStringTag, {
  value: "Module"
}));
function Ta(r, e) {
  return r = Math.ceil(r) + 1, e = Math.floor(e), Math.floor(Math.random() * (e - r) + r);
}
function Ea(r) {
  const e = {};
  return e.value = r, e.sign = !!r, e.integers = xr(r), e.decimals = br(r), e.total = e.integers + e.decimals, e;
}
function xr(r) {
  return (Math.log10((r ^ r >> 31) - (r >> 31)) | 0) + 1;
}
function Sa(r) {
  return r | 0;
}
function un(r, e) {
  e = e || 100;
  const i = Math.pow(10, e);
  return Math.round((r + Number.EPSILON) * i) / i;
}
function we(r, e = 0) {
  var i = r * Math.pow(10, e),
    s = Math.round(i),
    n = (i > 0 ? i : -i) % 1 === 0.5 ? s % 2 === 0 ? s : s - 1 : s;
  return n / Math.pow(10, e);
}
function br(r) {
  if (typeof r != "number" && (r = parseFloat(r)), isNaN(r) || !isFinite(r)) return 0;
  for (var e = 1, i = 0; Math.round(r * e) / e !== r && (e *= 10, e !== 1 / 0);) i++;
  return i;
}
function Pa(r) {
  return Math.log(r) / Math.log(10);
}
function Ma(r, e) {
  return Math.pow(r, e);
}
function _(r, e, i) {
  return Math.min(i, Math.max(e, r));
}
function Bt(r, e) {
  return !b(r) || !b(e) ? e : (Object.keys(e).forEach(i => {
    const s = r[i],
      n = e[i];
    Array.isArray(s) && Array.isArray(n) ? r[i] = Bt(s.concat([]), n) : b(s) && b(n) ? r[i] = Bt(Object.assign({}, s), n) : r[i] = n;
  }), r);
}
function ce(r) {
  try {
    if (window.structuredClone) return structuredClone(r);
  } catch {
    if (r === null || typeof r != "object" || "isActiveClone" in r) return r;
    let i;
    r instanceof Date ? i = new r.constructor() : i = Array.isArray(r) ? [] : {};
    for (let s in r) Object.prototype.hasOwnProperty.call(r, s) && (r.isActiveClone = null, i[s] = ce(r[s]), delete r.isActiveClone);
    return i;
  }
}
function Cr(r, e, i) {
  const [s, ...n] = e.split(".");
  return {
    ...r,
    [s]: n.length ? Cr(r[s], n.join("."), i) : i
  };
}
function dn(r, e) {
  return e.split(".").reduce((s, n) => s && s[n] !== "undefined" ? s[n] : void 0, r);
}
function bi(r, e) {
  if (!M(r) || !M(e) || r.length !== e.length) return !1;
  let i = r.length;
  for (; i--;) {
    if (M(r[i]) || M(e[i])) {
      if (!bi(r[i], e[i])) return !1;
      continue;
    }
    if (b(r[i]) || b(r[i])) {
      if (!b(r[i], e[i])) return !1;
      continue;
    }
    if (r[i] !== e[i]) return !1;
  }
  return !0;
}
function Aa(r, e, i) {
  let s = r[e];
  r.splice(e, 1), r.splice(i, 0, s);
}
function La(r, e, i) {
  [myArray[e], myArray[i]] = [myArray[i], myArray[e]];
}
function Tr(r, e) {
  return M(e) ? M(r) ? r.every(i => e.includes(i)) : e.includes(r) : !1;
}
function Er(r, e) {
  if (!b(r) || !b(e)) return !1;
  const i = Object.keys(r).sort(),
    s = Object.keys(e).sort();
  return i.length !== s.length ? !1 : i.every((o, a) => {
    const l = r[o],
      h = e[s[a]];
    return M(l) || M(h) ? bi(l, h) : b(l) || b(h) ? Er(l, h) : l === h;
  });
}
function Z(r = "ID") {
  T(r) ? r = r.toString() : E(r) || (r = "ID"), r = $e(r);
  const e = Date.now().toString(36),
    i = Math.random().toString(36).substring(2, 5);
  return `${r}_${e}_${i}`;
}
function $e(r) {
  return String(r).replace(/ |,|;|:|\.|#/g, "_");
}
const Na = r => r.entries().next().value,
  Ia = r => r.entries().next().value[0],
  Da = r => r.entries().next().value[1],
  Oa = r => [...r].pop(),
  Ra = r => [...r.keys()].pop(),
  ka = r => [...r.values()].pop();
class be extends Map {
  constructor(e) {
    super(e);
  }
  indexOfKey(e) {
    return [...this.keys()].indexOf(e);
  }
  indexOfValue(e) {
    return [...this.values()].indexOf(e);
  }
  entryAtIndex(e) {
    return [...this.entries()][e];
  }
  keyAtIndex(e) {
    return [...this.keys()][e];
  }
  valueAtIndex(e) {
    return [...this.values()][e];
  }
  insert(e, i, s) {
    return insertAtMapIndex(s, e, i, this);
  }
  remove(e) {
    return removeMapIndex(e, this);
  }
  firstEntry() {
    return Na(this);
  }
  firstKey() {
    return Ia(this);
  }
  firstValue() {
    return Da(this);
  }
  lastEntry() {
    return Oa(this);
  }
  lastKey() {
    return Ra(this);
  }
  lastValue() {
    return ka(this);
  }
  prevCurrNext(e) {
    let i = curr = next = null;
    for (let s of this) if (i = curr, curr = s, s.key == e) break;
    return {
      prev: i,
      curr,
      next
    };
  }
  union(...e) {
    if (typeof super.prototype.union == "function") super.union(...e);else for (const i of e) for (const s of i) this.set(...s);
  }
  setMultiple(e) {
    return M(e) ? (arr.forEach(([i, s]) => this.set(i, s)), !0) : !1;
  }
  populate(e) {
    return M(e) ? (this.clear(), arr.forEach(([i, s]) => this.set(i, s)), !0) : !1;
  }
  insertIndex(e, i, s) {
    if (!T(e)) return !1;
    const n = [...this];
    return n.splice(e, 0, [i, s]), this.populate(n), !0;
  }
  removeIndex(e) {
    if (!T(e)) return !1;
    const i = [...this];
    return i.splice(e, 1), this.populate(i), !0;
  }
  swapIndices(e, i) {
    if (!T(e) || !T(i)) return !1;
    const s = [...this];
    return La(s, e, i), this.populate(s), !0;
  }
  swapKeys(e, i) {
    const s = [...this],
      n = s.findIndex(([a]) => a === e),
      o = s.findIndex(([a]) => a === i);
    return [s[n], s[o]] = [s[o], s[n]], this.clear(), s.forEach(([a, l]) => this.set(a, l)), !0;
  }
}
function ke(r, e = 100, i, s = !1) {
  let n;
  return function () {
    let o = i || this,
      a = arguments,
      l = function () {
        n = null, s || r.apply(o, a);
      },
      h = s && !n;
    clearTimeout(n), n = setTimeout(l, e), h && r.apply(o, a);
  };
}
function _a(r, e = 250, i) {
  let s,
    n,
    o = function () {
      let l = i || this,
        h = /* @__PURE__ */new Date(),
        m = arguments;
      s && h < s + e ? (clearTimeout(n), n = setTimeout(function () {
        s = h, r.apply(l, m);
      }, e)) : (s = h, r.apply(l, m));
    };
  function a() {
    timeout && (clearTimeout(n), timeout = void 0);
  }
  return o.reset = function () {
    a(), s = 0;
  }, o;
}
class Ha {
  #e;
  #t;
  #n;
  #r = [];
  constructor(e, i) {
    this.#e = e, this.#t = E(i.id) ? i.id : Z, this.#n = E(i.type) ? i.type : "default", this.#r = M(i.data) ? i.data : [];
  }
}
function $a(r, e = !1) {
  if (!M(r)) return !1;
  let i = Ta(0, r.length);
  if (!pi(r[0], e) || !pi(r[i], e) || !pi(r[r.length - 1], e)) return !1;
  let s = r[0][0],
    n = r[1][0],
    o = r[2][0];
  return !(s > n && n > o);
}
function Ua(r, e = !1) {
  if (!M(r)) return !1;
  let i = 0,
    s = 0;
  for (; i < r.length;) {
    if (!pi(r[i], e) || r[i][0] < s) return !1;
    s = r[i][0], i++;
  }
  return !0;
}
function Ba(r, e) {
  if (!M(r) || r.length == 1) return !1;
  let i,
    s,
    n,
    o,
    a = [],
    l = 0,
    h = (r[r.length - 1][0] - r[l][0]) / e;
  for (; l < h;) i = r[l][0], s = r[l + 1][0], n = s - i, n == e ? a.push(r[l]) : n > e && (o = [i + e, null, null, null, null, null], a.push(o), r.splice(l + 1, 0, o)), l++;
  return r;
}
function pi(r, e = !1) {
  return !(!M(r) || r.length !== 6 || e && !ur(r[0]) || !T(r[1]) || !T(r[2]) || !T(r[3]) || !T(r[4]) || !T(r[5]));
}
function Va(r) {
  for (let e of r) for (let i = 0; i < 6; i++) e.length = 6, e[i] *= 1;
  return r;
}
const za = F,
  Wa = "1m",
  Ci = za,
  Fa = 6,
  mn = 0.05,
  Ga = 100,
  pn = 100,
  Ke = ["default", "percent", "log"],
  gn = 0.3,
  fn = 30,
  oi = 200,
  yn = 200,
  vn = 20,
  wn = 4096,
  Oi = 5,
  xn = 50,
  bn = 30,
  Ya = 8,
  cs = 30;
class fe {
  static t = 0;
  static o = 1;
  static h = 2;
  static l = 3;
  static c = 4;
  static v = 5;
}
class us {
  #e = Ci;
  #t = "1s";
  indexStart = 0;
  indexEnd = oi;
  valueMin = 0;
  valueMax = 0;
  valueDiff = 0;
  volumeMin = 0;
  volumeMax = 0;
  volumeDiff = 0;
  valueMinIdx = 0;
  valueMaxIdx = 0;
  volumeMinIdx = 0;
  volumeMaxIdx = 0;
  old = {};
  initialCnt = fn;
  limitFuture = oi;
  limitPast = yn;
  minCandles = vn;
  maxCandles = wn;
  yAxisBounds = gn;
  rangeLimit = oi;
  anchor;
  #n;
  #r;
  #i = !0;
  constructor(e, i, s = {}) {
    if (!b(s) || !(s?.core instanceof I)) return !1;
    this.#i = !0, this.setConfig(s), this.#n = s.core, e = T(e) ? e : 0, i = T(i) ? i : this.data.length - 1, `${this.maxMinPriceVol.toString()}`;
    const n = s?.interval || Ci;
    if (this.data.length == 0) {
      let o = Date.now();
      e = 0, i = this.rangeLimit, this.#e = n, this.#t = kt(this.interval), this.anchor = o - o % n;
    } else this.data.length < 2 ? (this.#e = n, this.#t = kt(this.interval)) : (this.#e = ds(this.data), this.#t = kt(this.interval));
    i == 0 && this.data.length >= this.rangeLimit ? i = this.rangeLimit : i == 0 && (i = this.data.length), this.set(e, i);
  }
  get allData() {
    return this.#n.allData;
  }
  get data() {
    return this.allData?.data || [];
  }
  get dataLength() {
    return this.allData?.data.length == 0 ? 0 : this.allData.data.length - 1;
  }
  get Length() {
    return this.indexEnd - this.indexStart;
  }
  get timeDuration() {
    return this.timeFinish - this.timeStart;
  }
  get timeMin() {
    return this.value(this.indexStart)[0];
  }
  get timeMax() {
    return this.value(this.indexEnd)[0];
  }
  get rangeDuration() {
    return this.timeMax - this.timeMin;
  }
  get timeStart() {
    return this.value(0)[0];
  }
  get timeFinish() {
    return this.value(this.dataLength)[0];
  }
  set interval(e) {
    this.#e = e;
  }
  get interval() {
    return this.#e;
  }
  set intervalStr(e) {
    this.#t = e;
  }
  get intervalStr() {
    return this.#t;
  }
  end() {}
  set(e = 0, i = this.dataLength, s = this.maxCandles, n) {
    if (!T(e) || !T(i) || !T(s)) return !1;
    e = e | 0, i = i | 0, s = s | 0, s = _(s, this.minCandles, this.maxCandles), e > i && ([e, i] = [i, e]), i = _(i, e + this.minCandles, e + s);
    let o = i - e;
    e = _(e, this.limitPast * -1, this.dataLength + this.limitFuture - this.minCandles - 1), i = _(i, e + this.minCandles, this.dataLength + this.limitFuture - 1), e = i - e < o ? e - (o - (i - e)) : e;
    const a = e,
      l = i,
      h = this.indexStart,
      m = this.indexEnd;
    let g = this.Length;
    this.indexStart = e, this.indexEnd = i, g -= this.Length;
    let v = this.maxMinPriceVol({
      data: this.data,
      start: this.indexStart,
      end: this.indexEnd,
      that: this
    });
    return this.setMaxMin(v), this.setConfig(n), this.#n.emit("setRange", [a, l, h, m]), !0;
  }
  setConfig(e) {
    if (!b(e)) return !1;
    this.initialCnt = T(e?.initialCnt) ? e.initialCnt : fn, this.limitFuture = T(e?.limitFuture) ? e.limitFuture : oi, this.limitPast = T(e?.limitPast) ? e.limitPast : yn, this.minCandles = T(e?.minCandles) ? e.minCandles : vn, this.maxCandles = T(e?.maxCandles) ? e.maxCandles : wn, this.yAxisBounds = T(e?.yAxisBounds) ? e.yAxisBounds : gn;
  }
  setMaxMin(e) {
    for (let i in e) this.old[i] = this[i], this[i] = e[i];
    this.scale = this.dataLength != 0 ? this.Length / this.dataLength : 1;
  }
  value(e, i = "chart") {
    let s;
    if (i == "chart") s = this.data;else if (s = this.getDataById(i), !s) return null;
    T(e) || (e = s.length - 1);
    let n = s[e];
    if (n !== void 0) return n;
    {
      const o = s.length - 1;
      return n = [null, null, null, null, null, null], s.length < 1 ? (n[0] = Date.now() + this.interval * e, n) : e < 0 ? (n[0] = s[0][0] + this.interval * e, n) : e > o ? (n[0] = s[o][0] + this.interval * (e - o), n) : null;
    }
  }
  valueByTS(e, i = "") {
    if (!T(e) || !E(i)) return !1;
    const s = this.getTimeIndex(e);
    switch (i) {
      case "chart":
        break;
      case "primary":
        break;
      case "secondary":
        break;
      case "dataset":
        break;
      case "all":
        break;
      default:
        if (i.length === 0) return this.value(s);
        i.split("_");
        break;
    }
  }
  getDataById(e) {
    if (!E(e)) return !1;
    const i = e.split("_");
    switch (i[1]) {
      case "chart":
        return this.data;
      case "primary":
        for (let s of this.allData.primaryPane) if (i[2] in s) return s[i[2]];
        return !1;
      case "secondary":
        for (let s of this.allData.secondaryPane) if (i[2] in s) return s[i[2]];
        return !1;
      case "datasets":
        for (let s of this.allData.datasets) if (i[2] in s) return s[i[2]];
        return !1;
      default:
        return !1;
    }
  }
  getTimeIndex(e) {
    if (!T(e)) return !1;
    e = e - e % this.interval;
    let i = this.data.length > 0 ? this.data[0][0] : this.anchor;
    return e === i ? 0 : e < i ? (i - e) / this.interval * -1 : (e - i) / this.interval;
  }
  inRange(e) {
    return e >= this.timeMin && e <= this.timeMax;
  }
  inPriceHistory(e) {
    return e >= this.timeStart && e <= this.timeFinish;
  }
  inRenderRange(e) {
    let i = this.getTimeIndex(e),
      s = this.#n.rangeScrollOffset;
    return i >= this.indexStart - s && i <= this.indexEnd + s;
  }
  rangeIndex(e) {
    return this.getTimeIndex(e) - this.indexStart;
  }
  maxMinPriceVol(e) {
    let {
        data: i,
        start: s,
        end: n,
        that: o
      } = {
        ...e
      },
      a = we(this.#n.bufferPx / this.#n.candleW);
    if (a = T(a) ? a : 0, s = T(s) ? s - a : 0, s = s > 0 ? s : 0, n = typeof n == "number" ? n : i?.length - 1, i.length == 0) return {
      valueLo: 0,
      valueHi: 1,
      valueMin: 0,
      valueMax: 1,
      volumeMin: 0,
      volumeMax: 0,
      valueMinIdx: 0,
      valueMaxIdx: 0,
      volumeMinIdx: 0,
      volumeMaxIdx: 0
    };
    let l = i.length - 1,
      h = ue(s, 0, l),
      m = ue(n, 0, l),
      g = i[h][3],
      v = i[h][2],
      S = i[h][5],
      A = i[h][5],
      L = h,
      O = h,
      ae = h,
      B = h;
    for (; h++ < m;) i[h][3] < g && (g = i[h][3], L = h), i[h][2] > v && (v = i[h][2], O = h), i[h][5] < S && (S = i[h][5], ae = h), i[h][5] > A && (A = i[h][5], B = h);
    let R = v - g,
      Ne = g,
      J = v;
    return g -= R * o.yAxisBounds, g = g > 0 ? g : 0, v += R * o.yAxisBounds, R = v - g, {
      valueLo: Ne,
      valueHi: J,
      valueMin: g,
      valueMax: v,
      valueDiff: v - g,
      volumeMin: S,
      volumeMax: A,
      volumeDiff: A - S,
      valueMinIdx: L,
      valueMaxIdx: O,
      volumeMinIdx: ae,
      volumeMaxIdx: B
    };
    function ue(Q, ie, de) {
      return Math.min(de, Math.max(ie, Q));
    }
  }
  snapshot(e, i) {
    return {
      snapshot: !0,
      ts: Date.now(),
      data: this.data,
      dataLength: this.dataLength,
      Length: this.Length,
      timeDuration: this.timeDuration,
      timeMin: this.timeMin,
      timeMax: this.timeMax,
      rangeDuration: this.rangeDuration,
      timeStart: this.timeStart,
      timeFinish: this.timeFinish,
      interval: this.interval,
      intervalStr: this.intervalStr
    };
  }
}
exports.Range = us;
function ds(r) {
  let e = Math.min(r.length - 1, 99),
    i = 1 / 0;
  return r.slice(0, e).forEach((s, n) => {
    let o = r[n + 1][0] - s[0];
    o === o && o < i && (i = o);
  }), i;
}
function ps(r, e) {
  if (!T(e)) return !1;
  let i,
    s = r.timeFrameMS;
  return e = e - e % s, e === r.range.data[0][0] ? i = 0 : e < r.range.data[0][0] ? i = (r.range.data[0][0] - e) / s * -1 : i = (e - r.range.data[0][0]) / s, i;
}
const It = "TradeX-Chart",
  _t = "TX",
  qa = "tradeXutils",
  Cn = "tradeXmenus",
  Xa = "tradeXmenu",
  Tn = "tradeXdividers",
  En = "tradeXwindows",
  Ka = "tradeXwindow",
  Sn = "tradeXprogress",
  ja = 500,
  Za = "stream_None",
  Ht = "stream_Listening",
  Pn = "stream_Started",
  Ja = "stream_Stopped",
  Qa = "stream_Error",
  Vt = "stream_candleFirst",
  _e = "stream_candleUpdate",
  zt = "stream_candleNew",
  el = 250,
  tl = 8,
  il = 2,
  sl = 2,
  Ti = 1e3,
  nl = "defaultState",
  rl = {
    version: bs,
    id: nl,
    key: "",
    status: "default",
    isEmpty: !0,
    chart: {
      name: "Primary",
      type: "candles",
      candleType: "CANDLE_SOLID",
      indexed: !1,
      data: [],
      settings: {},
      tf: Wa,
      tfms: Ci
    },
    ohlcv: [],
    views: [],
    primary: [],
    secondary: [],
    datasets: [],
    tools: {},
    trades: {
      display: !0,
      displayInfo: !0
    },
    events: {},
    annotations: {}
  },
  Mn = {
    timestamp: "number",
    id: "string",
    side: "string",
    price: "number",
    amount: "number",
    filled: "number",
    average: "number",
    total: "number",
    tag: "string"
  },
  An = {
    timestamp: "number",
    id: "string",
    title: "string",
    content: "string",
    url: "string"
  };
class k {
  static #e = new be();
  static #t = {};
  static get default() {
    return ce(rl);
  }
  static get list() {
    return k.#e;
  }
  static create(e, i = !1, s = !1) {
    const n = new k(e, i, s),
      o = n.key;
    return k.#e.set(o, n), n;
  }
  static validate(e, i = !1, s = !1) {
    const n = this.default;
    if (b(e) || (e = {}), b(e.chart) || (e.chart = n.chart, e.chart.isEmpty = !0, e.chart.data = M(e.ohlcv) ? e.ohlcv : [], delete e.ohlcv), e = Bt(n, e), i ? e.chart.data = Ua(e.chart.data, s) ? e.chart.data : [] : e.chart.data = $a(e.chart.data, s) ? e.chart.data : [], e.chart.isEmpty = e.chart.data.length == 0, !T(e.chart?.tf) || i) {
      let h = ds(e.chart.data);
      h < z && (h = Ci), e.chart.tfms = h;
    }
    if ((!E(e.chart?.tfms) || i) && (e.chart.tf = kt(e.chart.tfms)), M(e.views) || (e.views = n.views), M(e.primary) || (e.primary = n.primary), M(e.secondary) || (e.secondary = n.secondary), b(e.chart.settings) || (e.chart.settings = n.chart.settings), M(e.datasets) || (e.datasets = []), e.views.length == 0) {
      e.views.push(["primary", e.primary]);
      for (let h in e) h.indexOf("secondary") == 0 && e.views.push([h, e[h]]);
    }
    let o = e.views,
      a = o.length;
    for (; a--;) if (!M(o[a]) || o[a].length == 0) o.splice(a, 1);else {
      let h = e.views[a][1],
        m = h.length;
      for (; m--;) !b(h[m]) || !E(h[m].name) || !E(h[m].type) ? h.splice(m, 1) : b(h[m].settings) || (h[m].settings = {});
      o[a].length == 0 && o.splice(a, 1);
    }
    e.views.length == 0 && (e.views[0] = ["primary", n.primary]), e.views = new be(e.views), e.views.has("primary") || e.views.insert("primary", n.primary, 0), e.views.get("primary").push(e.chart);
    for (var l of e.datasets) this.#t || (this.#t = {}), this.dss[l.id] = new Ha(this, l);
    return e;
  }
  static delete(e) {
    if (!E(e) || !k.has(e)) return !1;
    k.#e.delete(e);
  }
  static has(e) {
    return k.#e.has(e);
  }
  static get(e) {
    return k.#e.get(e);
  }
  static export(e, i = {}) {
    if (!k.has(e)) return !1;
    b(i) || (i = {});
    const s = k.get(e),
      n = i?.type,
      o = ce(s.data),
      a = o.chart.data;
    let l;
    switch (a.length > 0 && a[a.length - 1].length > 6 && (a.length = a.length - 1), o.views.get("primary").pop(), o.views = Array.from(o.views), o.version = bs, n) {
      case "json":
      default:
        const {
          replacer: h,
          space: m
        } = {
          ...i
        };
        l = JSON.stringify(o, h, m);
    }
    return l;
  }
  #n = "";
  #r = "";
  #i = {};
  #s;
  #l = !1;
  #o = !0;
  #c = [];
  constructor(e, i = !1, s = !1) {
    b(e) ? (this.#i = k.validate(e, i, s), this.#l = "valid", this.#o = !!this.#i.chart?.isEmpty, this.#s = e?.core instanceof I ? e.core : void 0) : (this.#i = k.default, this.#l = "default", this.#o = !0), this.#n = e?.id || "", this.#r = Z(`${_t}_state`);
  }
  get id() {
    return this.#n;
  }
  get key() {
    return this.#r;
  }
  get status() {
    return this.#l;
  }
  get isEmpty() {
    return this.#o;
  }
  get allData() {
    return {
      data: this.#i.chart.data,
      primaryPane: this.#i.primary,
      secondaryPane: this.#i.secondary,
      datasets: this.#i.datasets
    };
  }
  get data() {
    return this.#i;
  }
  get core() {
    return this.#s !== void 0 ? this.#s : !1;
  }
  get time() {
    return this.#s.time;
  }
  get range() {
    return this.#s.range;
  }
  error(e) {
    this.#s.error(e);
  }
  create(e, i, s) {
    return k.create(e, i, s);
  }
  delete(e) {
    if (!E(e)) return !1;
    if (e !== this.key) k.delete(e);else if (k.has(e)) {
      const i = k.create();
      this.use(i.key), k.delete(e);
    }
    return !0;
  }
  list() {
    return k.list;
  }
  has(e) {
    return k.has(e);
  }
  get(e) {
    return k.get(e);
  }
  use(e) {
    const i = this.core;
    if (!k.has(e)) return i.warn(`${i.name} id: ${i.id} : Specified state does not exist`), !1;
    if (e === this.key) return !0;
    i.stream.stop(), i.MainPane.reset();
    let s = k.get(e);
    this.#n = s.id, this.#l = s.status, this.#o = s.isEmpty, this.#i = s.data;
    const n = {
      interval: s.data.chart.tfms,
      core: i
    };
    if (i.getRange(null, null, n), this.range.Length > 1) {
      const o = ps(i.time, void 0),
        a = o ? o + this.range.initialCnt : s.data.length - 1,
        l = o || a - this.range.initialCnt;
      this.range.initialCnt = a - l, i.setRange(l, a);
    }
    i.MainPane.restart(), i.refresh();
  }
  export(e = this.key, i = {}) {
    return k.export(e, i = {});
  }
  mergeData(e, i = !1, s = !1) {
    if (!b(e)) return this.error(`ERROR: ${this.id}: merge data must be type Object!`), !1;
    let n = M(e?.ohlcv) ? e.ohlcv.length - 1 : 0;
    if (n > 1 && this.time.timeFrameMS !== ds(e?.ohlcv)) return this.error(`ERROR: ${this.core.id}: merge data time frame does not match existing time frame!`), !1;
    (this.#o || !T(this.time.timeFrameMS)) && (!b(i) || !T(i.start) || !T(i.end)) && n > 1 && (i = {
      start: n - this.range.initialCnt,
      end: n
    }), b(i) ? (T(i?.startTS) ? i.start = i.startTS : i.start = T(i.start) ? this.range.value(i.start)[0] : this.range.timeMin, T(i?.endTS) ? i.end = i.endTS : i.end = T(i.end) ? this.range.value(i.end)[0] : this.range.timeMax) : (i = {}, i.start = this.range.timeMin, i.end = this.range.timeMax);
    let o,
      a,
      l = e?.ohlcv || !1;
    const h = this.allData.data,
      m = this.allData?.primaryPane,
      g = e?.primary || !1;
    this.allData?.secondaryPane;
    const v = e?.secondary || !1;
    this.allData?.dataset?.data;
    const S = e?.dataset?.data || !1;
    this.allData?.trades, e?.trades, this.allData?.events, e?.events;
    const A = M(l) && this.range.inRange(l[0][0]) ? 1 : 0,
      L = {};
    if (M(l) && l.length > 0) {
      if (o = l.length - 1, h.length - 1, L.mData = this.range.inRange(l[0][0]) && this.range.inRange(l[0][o]), !K(l[o][7]) && l[o].length !== 8 && l[o][6] !== null && l[o][7] !== !0 ? l = Va(l) : i.end >= this.range.timeFinish && i.start <= this.range.timeFinish && (i.start += this.range.interval, i.end += this.range.interval), h.length == 0) this.allData.data.push(...l);else {
        let B = this.time.timeFrameMS,
          R = l[0][0],
          Ne = l[l.length - 1][0],
          J = (l.length - 1) * B;
        Ne > R + J && (l = Ba(l, B)), this.data.chart.data = this.merge(h, l);
      }
      if (s) this.#s.calcAllIndicators(s);else {
        if (M(g) && g.length > 0) {
          for (let B of g) if (M(B?.data) && B?.data.length > 0) for (let R of m) R.name === B.name && R.type === B.type && Er(R.settings, B.settings) && (R.data = this.merge(R.data, B.data));
        }
        if (M(v) && v.length > 0) for (let B of v) M(B?.data) && B?.data.length > 0;
        this.#s.calcAllIndicators();
      }
      if (M(S) && S.length > 0) for (let B of S) M(B?.data) && B?.data.length > 0;
      i && (b(i) ? (a = T(i.start) ? this.range.getTimeIndex(i.start) : this.range.indexStart, n = T(i.end) ? this.range.getTimeIndex(i.end) : this.range.indexEnd) : (l[0][0] && (a = this.range.indexStart + A), n = this.range.indexEnd + A), this.#s.setRange(a, n));
      let O,
        ae = !1;
      for (O in L) ae = ae || O;
      return e.ohlcv.length > 1 && this.#s.emit("state_mergeComplete"), ae && this.#s.refresh(), this.#o = !1, !0;
    }
  }
  merge(e, i) {
    let s = [],
      n,
      o;
    if (e[0][0] < i[0][0] ? (n = e, o = i) : (n = i, o = e), o.length == 1 && o[0][0] == n[n.length - 1][0]) n[n.length - 1] = o[0], s = n;else if (o.length == 1 && o[0][0] == n[n.length - 1][0] + this.range.interval) s = n.concat(o);else if (n[n.length - 1][0] >= o[0][0]) {
      let a = 0;
      for (; n[a][0] < o[0][0];) s.push(n[a]), a++;
      s = s.concat(o);
      let l = a + o.length;
      l < n.length && (s = s.concat(n.slice(l)));
    } else if (o[0][0] - n[n.length - 1][0] > this.range.interval) {
      s = n;
      let a = n[n.length - 1][0],
        l = Math.floor((o[0][0] - a) / this.range.interval);
      for (l; l > 0; l--) {
        let h = Array(o[0].length).fill(null);
        h[0] = a, a = +this.range.interval, s.push(h), s = s.concat(o);
      }
    } else s = n.concat(o);
    return s;
  }
  removeIndicator(e) {
    if (!E(e)) return !1;
    const i = (s, n) => {
      const o = this.data[s];
      for (let a = 0; a < o.length; a++) if (o[a].id == n) return o.splice(a, 1), !0;
      return !1;
    };
    return !!(i("primary", e) || i("secondary", e));
  }
  addTrade(e) {
    const i = Object.keys(e),
      s = Object.keys(Mn);
    if (!b(e) || !bi(i, s)) return !1;
    for (let a of s) if (typeof e[a] !== Mn[a]) return !1;
    const n = e.timestamp - e.timestamp % this.time.timeFrameMS,
      o = new Date(n);
    return e.dateStr = `${o.getFullYear()}/${o.getMonth() + 1}/${o.getDate()} ${o.getHours()}:${o.getMinutes()}`, M(this.allData.trades[n]) || (this.allData.trades[n] = []), this.allData.trades[n].push(e), !0;
  }
  removeTrade(e) {
    console.log("TODO: state.removeTrade()");
  }
  addEvent(e) {
    const i = Object.keys(e),
      s = Object.keys(An);
    if (!b(e) || !bi(i, s)) return !1;
    for (let a of s) if (typeof t[a] !== An[a]) return !1;
    const n = t.timestamp - t.timestamp % this.time.timeFrameMS,
      o = new Date(n);
    return e.dateStr = `${o.getFullYear()}/${o.getMonth() + 1}/${o.getDate()} ${o.getHours()}:${o.getMinutes()}`, M(this.allData.events[n]) || (this.allData.events[n] = []), this.allData.events[n].push(e), !0;
  }
  removeEvent(e) {
    console.log("TODO: state.removeEvent()");
  }
}
const Sr = {
    findByID(r, e = document) {
      return e.getElementById(r);
    },
    findByClass(r, e = document) {
      return e.getElementsByClassName(r);
    },
    findByName(r, e = document) {
      return e.getElementsByName(r);
    },
    fndByTag(r, e = document) {
      return e.getElementsByTagName(r);
    },
    findBySelector(r, e = document) {
      return e.querySelector(r);
    },
    findBySelectorAll(r, e = document) {
      return e.querySelectorAll(r);
    },
    isNode(r) {
      return typeof Node == "object" ? r instanceof Node : r && typeof r == "object" && typeof r.nodeType == "number" && typeof r.nodeName == "string";
    },
    isElement(r) {
      return typeof HTMLElement == "object" ? r instanceof HTMLElement : r && typeof r == "object" && r !== null && r.nodeType === 1 && typeof r.nodeName == "string";
    },
    isVisible(r) {
      return this.isElement(r) ? !!r && !!(r.offsetWidth || r.offsetHeight || r.getClientRects().length) : !1;
    },
    isInViewport(r) {
      if (!this.isElement(r)) return !1;
      const e = r.getBoundingClientRect();
      return e.top >= 0 && e.left >= 0 && e.bottom <= (window.innerHeight || document.documentElement.clientHeight) && e.right <= (window.innerWidth || document.documentElement.clientWidth);
    },
    isVisibleToUser(r) {
      if (!this.isElement(r)) return !1;
      const e = getComputedStyle(elem);
      if (e.display === "none" || e.visibility !== "visible" || e.opacity < 0.1 || r.offsetWidth + r.offsetHeight + r.getBoundingClientRect().height + r.getBoundingClientRect().width === 0) return !1;
      const i = {
        x: r.getBoundingClientRect().left + r.offsetWidth / 2,
        y: r.getBoundingClientRect().top + r.offsetHeight / 2
      };
      if (i.x < 0 || i.x > (document.documentElement.clientWidth || window.innerWidth) || i.y < 0 || i.y > (document.documentElement.clientHeight || window.innerHeight)) return !1;
      let s = document.elementFromPoint(i.x, i.y);
      do if (s === elem) return !0; while (s = s.parentNode);
      return !1;
    },
    isImage(r, e) {
      if (this.isSVG(r)) var i = window.URL || window.webkitURL || window,
        r = new Blob([r], {
          type: "image/svg+xml"
        }),
        r = i.createObjectURL(r);
      const s = new Image();
      if (s.src = r, U(e)) s.complete ? e(s) : (s.onload = () => e(s), s.onerror = () => e(!1));else return new Promise(function (n, o) {
        s.complete ? n(s) : (s.onload = () => n(s), s.onerror = () => o(!1));
      });
    },
    isSVG(r) {
      return E(r) ? /<\s*svg[^>]*>(.*?)<\s*\/\s*svg>/.test(r) : !1;
    },
    elementDimPos(r) {
      if (!this.isElement(r)) return !1;
      let e = 0,
        i = 0,
        s = r;
      for (; s && s.tagName.toLowerCase() != "body" && !isNaN(s.offsetLeft) && !isNaN(s.offsetTop);) e += s.offsetLeft - s.scrollLeft, i += s.offsetTop - s.scrollTop, s = s.offsetParent;
      const n = r.getBoundingClientRect();
      let o = n.right - n.left,
        a = n.bottom - n.top,
        l = this.isVisible(r),
        h = this.isInViewport(r);
      return {
        top: i,
        bottom: i + a,
        left: e,
        right: e + o,
        width: o,
        height: a,
        visible: l,
        viewport: h
      };
    },
    elementsDistance(r, e) {
      return !this.isElement(r) || !this.isElement(r) ? !1 : (el1Location = this.elementDimPos(r), el2Location = this.elementDimPos(e), {
        x: el1Location.top - el2Location.top,
        y: el1Location.left - el2Location.left,
        el1Location,
        el2Location
      });
    },
    htmlToElement(r) {
      if (!E(r)) return !1;
      const e = document.createElement("template");
      return r = r.trim(), e.innerHTML = r, e.content.firstChild;
    },
    htmlToElements(r) {
      if (!E(r)) return !1;
      const e = document.createElement("template");
      return e.innerHTML = r, e.content.childNodes;
    },
    svgToImage(r, e, i) {
      if (!this.isSVG(r) || !T(i?.w) || !T(i?.h)) return !1;
      let s = i.w,
        n = i.h,
        o = document.createElement("canvas");
      o.width = s, o.height = n;
      let a = this.htmlToElement(r);
      a.style.fill = e, a.setAttribute("width", s), a.setAttribute("height", n), a.xmlns = "http://www.w3.org/2000/svg";
      let l = new XMLSerializer().serializeToString(a),
        g = "data:image/svg+xml;base64," + btoa(l),
        v = new Image();
      return v.setAttribute("width", s), v.setAttribute("height", n), v.onload = () => {
        o.getContext("2d").drawImage(v, 0, 0, s, n);
      }, v.src = g, v;
    },
    hideOnClickOutside(r) {
      if (!this.isElement(r)) return !1;
      const e = s => {
          !r.contains(s.target) && this.isVisible(r) && (r.style.display = "none", i());
        },
        i = () => {
          document.removeEventListener("click", e);
        };
      document.addEventListener("click", e);
    },
    onClickOutside(r, e) {
      if (!this.isElement(r)) return !1;
      const i = n => {
          !r.contains(n.target) && Sr.isVisible(r) && (e(), s());
        },
        s = () => {
          document.removeEventListener("click", i);
        };
      document.addEventListener("click", i);
    },
    getStyle(r, e) {
      let i, s;
      if (E(r)) i = document.getElementById(r);else if (this.isElement(r)) i = r;else return !1;
      return E(e) ? (window.getComputedStyle ? s = document.defaultView.getComputedStyle(i, null).getPropertyValue(e) : i.currentStyle && (s = i.currentStyle[e]), s) : !1;
    },
    addStyleRule(r, e, i, s) {
      let n = this.findStyleRule(r, e, i, s);
      if (n) n.i >= 0 ? n.rules[n.i].style[n.property] = n.value : this.addCSSRule(n.styleSheet, n.selector, n.rules, n.index);else return;
    },
    deleteStyleRule(r, e, i) {
      let s = this.findStyleRule(r, e, i, "");
      (s.styleSheet.deleteRule || s.styleSheet.removeRule)(s.i);
    },
    findStyleRule(r, e, i, s) {
      if (!r || !b(r)) return null;
      if (r.constructor.name == "HTMLStyleElement") r = r.sheet;else if (r.constructor.name != "CSSStyleSheet") return null;
      let n = this.styleRuleSanitize(e, i, s);
      e = n[0], i = n[1], s = n[2];
      const o = r.cssRules || r.rules;
      for (var a = o.length - 1; a > 0 && o[a].selectorText !== e; --a);
      return {
        styleSheet: r,
        rules: o,
        selector: e,
        property: i,
        value: s,
        i: a
      };
    },
    styleRuleSanitize(r, e, i) {
      return [r = r.toLowerCase().replace(/\s+/g, " "), e = e.toLowerCase(), i = i.toLowerCase()];
    },
    addCSSRule(r, e, i, s) {
      r.insertRule ? r.insertRule(e + "{" + i + "}", s) : r.addRule(e, i, s);
    },
    findTargetParentWithClass(r, e) {
      return !this.isElement(r) || !E(e) ? null : r.classList.contains(e) ? r : this.findTargetParentWithClass(r.parentElement, e);
    }
  },
  D = exports.DOM = Sr,
  ol = typeof window < "u" && typeof window.document < "u";
typeof process < "u" && process.versions != null && process.versions.node != null;
typeof window < "u" && window.name === "nodejs" || navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom");
const al = (r => "onorientationchange" in r || r.matchMedia("(any-pointer:coarse)").matches || !!navigator.maxTouchPoints || !!navigator.msMaxTouchPoints || "ontouchstart" in r || r.DocumentTouch && document instanceof r.DocumentTouch)(typeof window < "u" ? window : {}),
  ll = {
    idle: 0,
    dragStart: 1,
    dragging: 2
  };
class it {
  #e = 0;
  #t = 0;
  constructor() {
    if (arguments.length === 1) {
      const {
        x: e,
        y: i
      } = arguments[0];
      this.x = e || 0, this.y = i || 0;
    } else if (arguments.length > 1) {
      const [e, i] = arguments;
      this.x = e || 0, this.y = i || 0;
    }
  }
  set x(e) {
    T(e) && (this.#e = e);
  }
  get x() {
    return this.#e;
  }
  set y(e) {
    T(e) && (this.#t = e);
  }
  get y() {
    return this.#t;
  }
  clone() {
    return new it(this.x, this.y);
  }
}
function hl(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var Pr = {
  exports: {}
};
/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function (r) {
  (function (e, i, s, n) {
    var o = ["", "webkit", "Moz", "MS", "ms", "o"],
      a = i.createElement("div"),
      l = "function",
      h = Math.round,
      m = Math.abs,
      g = Date.now;
    function v(c, u, p) {
      return setTimeout(Ne(c, p), u);
    }
    function S(c, u, p) {
      return Array.isArray(c) ? (A(c, p[u], p), !0) : !1;
    }
    function A(c, u, p) {
      var f;
      if (c) if (c.forEach) c.forEach(u, p);else if (c.length !== n) for (f = 0; f < c.length;) u.call(p, c[f], f, c), f++;else for (f in c) c.hasOwnProperty(f) && u.call(p, c[f], f, c);
    }
    function L(c, u, p) {
      var f = "DEPRECATED METHOD: " + u + `
` + p + ` AT 
`;
      return function () {
        var x = new Error("get-stack-trace"),
          P = x && x.stack ? x.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace",
          N = e.console && (e.console.warn || e.console.log);
        return N && N.call(e.console, f, P), c.apply(this, arguments);
      };
    }
    var O;
    typeof Object.assign != "function" ? O = function (u) {
      if (u === n || u === null) throw new TypeError("Cannot convert undefined or null to object");
      for (var p = Object(u), f = 1; f < arguments.length; f++) {
        var x = arguments[f];
        if (x !== n && x !== null) for (var P in x) x.hasOwnProperty(P) && (p[P] = x[P]);
      }
      return p;
    } : O = Object.assign;
    var ae = L(function (u, p, f) {
        for (var x = Object.keys(p), P = 0; P < x.length;) (!f || f && u[x[P]] === n) && (u[x[P]] = p[x[P]]), P++;
        return u;
      }, "extend", "Use `assign`."),
      B = L(function (u, p) {
        return ae(u, p, !0);
      }, "merge", "Use `assign`.");
    function R(c, u, p) {
      var f = u.prototype,
        x;
      x = c.prototype = Object.create(f), x.constructor = c, x._super = f, p && O(x, p);
    }
    function Ne(c, u) {
      return function () {
        return c.apply(u, arguments);
      };
    }
    function J(c, u) {
      return typeof c == l ? c.apply(u && u[0] || n, u) : c;
    }
    function ue(c, u) {
      return c === n ? u : c;
    }
    function Q(c, u, p) {
      A(ot(u), function (f) {
        c.addEventListener(f, p, !1);
      });
    }
    function ie(c, u, p) {
      A(ot(u), function (f) {
        c.removeEventListener(f, p, !1);
      });
    }
    function de(c, u) {
      for (; c;) {
        if (c == u) return !0;
        c = c.parentNode;
      }
      return !1;
    }
    function me(c, u) {
      return c.indexOf(u) > -1;
    }
    function ot(c) {
      return c.trim().split(/\s+/g);
    }
    function We(c, u, p) {
      if (c.indexOf && !p) return c.indexOf(u);
      for (var f = 0; f < c.length;) {
        if (p && c[f][p] == u || !p && c[f] === u) return f;
        f++;
      }
      return -1;
    }
    function Xt(c) {
      return Array.prototype.slice.call(c, 0);
    }
    function zs(c, u, p) {
      for (var f = [], x = [], P = 0; P < c.length;) {
        var N = u ? c[P][u] : c[P];
        We(x, N) < 0 && f.push(c[P]), x[P] = N, P++;
      }
      return p && (u ? f = f.sort(function (q, te) {
        return q[u] > te[u];
      }) : f = f.sort()), f;
    }
    function Kt(c, u) {
      for (var p, f, x = u[0].toUpperCase() + u.slice(1), P = 0; P < o.length;) {
        if (p = o[P], f = p ? p + x : u, f in c) return f;
        P++;
      }
      return n;
    }
    var bo = 1;
    function Co() {
      return bo++;
    }
    function Ws(c) {
      var u = c.ownerDocument || c;
      return u.defaultView || u.parentWindow || e;
    }
    var To = /mobile|tablet|ip(ad|hone|od)|android/i,
      Fs = ("ontouchstart" in e),
      Eo = Kt(e, "PointerEvent") !== n,
      So = Fs && To.test(navigator.userAgent),
      Ct = "touch",
      Po = "pen",
      $i = "mouse",
      Mo = "kinect",
      Ao = 25,
      ee = 1,
      Ze = 2,
      V = 4,
      se = 8,
      jt = 1,
      Tt = 2,
      Et = 4,
      St = 8,
      Pt = 16,
      Ie = Tt | Et,
      Je = St | Pt,
      Gs = Ie | Je,
      Ys = ["x", "y"],
      Zt = ["clientX", "clientY"];
    function pe(c, u) {
      var p = this;
      this.manager = c, this.callback = u, this.element = c.element, this.target = c.options.inputTarget, this.domHandler = function (f) {
        J(c.options.enable, [c]) && p.handler(f);
      }, this.init();
    }
    pe.prototype = {
      handler: function () {},
      init: function () {
        this.evEl && Q(this.element, this.evEl, this.domHandler), this.evTarget && Q(this.target, this.evTarget, this.domHandler), this.evWin && Q(Ws(this.element), this.evWin, this.domHandler);
      },
      destroy: function () {
        this.evEl && ie(this.element, this.evEl, this.domHandler), this.evTarget && ie(this.target, this.evTarget, this.domHandler), this.evWin && ie(Ws(this.element), this.evWin, this.domHandler);
      }
    };
    function Lo(c) {
      var u,
        p = c.options.inputClass;
      return p ? u = p : Eo ? u = Bi : So ? u = ei : Fs ? u = Vi : u = Qt, new u(c, No);
    }
    function No(c, u, p) {
      var f = p.pointers.length,
        x = p.changedPointers.length,
        P = u & ee && f - x === 0,
        N = u & (V | se) && f - x === 0;
      p.isFirst = !!P, p.isFinal = !!N, P && (c.session = {}), p.eventType = u, Io(c, p), c.emit("hammer.input", p), c.recognize(p), c.session.prevInput = p;
    }
    function Io(c, u) {
      var p = c.session,
        f = u.pointers,
        x = f.length;
      p.firstInput || (p.firstInput = qs(u)), x > 1 && !p.firstMultiple ? p.firstMultiple = qs(u) : x === 1 && (p.firstMultiple = !1);
      var P = p.firstInput,
        N = p.firstMultiple,
        Y = N ? N.center : P.center,
        q = u.center = Xs(f);
      u.timeStamp = g(), u.deltaTime = u.timeStamp - P.timeStamp, u.angle = Ui(Y, q), u.distance = Jt(Y, q), Do(p, u), u.offsetDirection = js(u.deltaX, u.deltaY);
      var te = Ks(u.deltaTime, u.deltaX, u.deltaY);
      u.overallVelocityX = te.x, u.overallVelocityY = te.y, u.overallVelocity = m(te.x) > m(te.y) ? te.x : te.y, u.scale = N ? ko(N.pointers, f) : 1, u.rotation = N ? Ro(N.pointers, f) : 0, u.maxPointers = p.prevInput ? u.pointers.length > p.prevInput.maxPointers ? u.pointers.length : p.prevInput.maxPointers : u.pointers.length, Oo(p, u);
      var Oe = c.element;
      de(u.srcEvent.target, Oe) && (Oe = u.srcEvent.target), u.target = Oe;
    }
    function Do(c, u) {
      var p = u.center,
        f = c.offsetDelta || {},
        x = c.prevDelta || {},
        P = c.prevInput || {};
      (u.eventType === ee || P.eventType === V) && (x = c.prevDelta = {
        x: P.deltaX || 0,
        y: P.deltaY || 0
      }, f = c.offsetDelta = {
        x: p.x,
        y: p.y
      }), u.deltaX = x.x + (p.x - f.x), u.deltaY = x.y + (p.y - f.y);
    }
    function Oo(c, u) {
      var p = c.lastInterval || u,
        f = u.timeStamp - p.timeStamp,
        x,
        P,
        N,
        Y;
      if (u.eventType != se && (f > Ao || p.velocity === n)) {
        var q = u.deltaX - p.deltaX,
          te = u.deltaY - p.deltaY,
          Oe = Ks(f, q, te);
        P = Oe.x, N = Oe.y, x = m(Oe.x) > m(Oe.y) ? Oe.x : Oe.y, Y = js(q, te), c.lastInterval = u;
      } else x = p.velocity, P = p.velocityX, N = p.velocityY, Y = p.direction;
      u.velocity = x, u.velocityX = P, u.velocityY = N, u.direction = Y;
    }
    function qs(c) {
      for (var u = [], p = 0; p < c.pointers.length;) u[p] = {
        clientX: h(c.pointers[p].clientX),
        clientY: h(c.pointers[p].clientY)
      }, p++;
      return {
        timeStamp: g(),
        pointers: u,
        center: Xs(u),
        deltaX: c.deltaX,
        deltaY: c.deltaY
      };
    }
    function Xs(c) {
      var u = c.length;
      if (u === 1) return {
        x: h(c[0].clientX),
        y: h(c[0].clientY)
      };
      for (var p = 0, f = 0, x = 0; x < u;) p += c[x].clientX, f += c[x].clientY, x++;
      return {
        x: h(p / u),
        y: h(f / u)
      };
    }
    function Ks(c, u, p) {
      return {
        x: u / c || 0,
        y: p / c || 0
      };
    }
    function js(c, u) {
      return c === u ? jt : m(c) >= m(u) ? c < 0 ? Tt : Et : u < 0 ? St : Pt;
    }
    function Jt(c, u, p) {
      p || (p = Ys);
      var f = u[p[0]] - c[p[0]],
        x = u[p[1]] - c[p[1]];
      return Math.sqrt(f * f + x * x);
    }
    function Ui(c, u, p) {
      p || (p = Ys);
      var f = u[p[0]] - c[p[0]],
        x = u[p[1]] - c[p[1]];
      return Math.atan2(x, f) * 180 / Math.PI;
    }
    function Ro(c, u) {
      return Ui(u[1], u[0], Zt) + Ui(c[1], c[0], Zt);
    }
    function ko(c, u) {
      return Jt(u[0], u[1], Zt) / Jt(c[0], c[1], Zt);
    }
    var _o = {
        mousedown: ee,
        mousemove: Ze,
        mouseup: V
      },
      Ho = "mousedown",
      $o = "mousemove mouseup";
    function Qt() {
      this.evEl = Ho, this.evWin = $o, this.pressed = !1, pe.apply(this, arguments);
    }
    R(Qt, pe, {
      handler: function (u) {
        var p = _o[u.type];
        p & ee && u.button === 0 && (this.pressed = !0), p & Ze && u.which !== 1 && (p = V), this.pressed && (p & V && (this.pressed = !1), this.callback(this.manager, p, {
          pointers: [u],
          changedPointers: [u],
          pointerType: $i,
          srcEvent: u
        }));
      }
    });
    var Uo = {
        pointerdown: ee,
        pointermove: Ze,
        pointerup: V,
        pointercancel: se,
        pointerout: se
      },
      Bo = {
        2: Ct,
        3: Po,
        4: $i,
        5: Mo
      },
      Zs = "pointerdown",
      Js = "pointermove pointerup pointercancel";
    e.MSPointerEvent && !e.PointerEvent && (Zs = "MSPointerDown", Js = "MSPointerMove MSPointerUp MSPointerCancel");
    function Bi() {
      this.evEl = Zs, this.evWin = Js, pe.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
    }
    R(Bi, pe, {
      handler: function (u) {
        var p = this.store,
          f = !1,
          x = u.type.toLowerCase().replace("ms", ""),
          P = Uo[x],
          N = Bo[u.pointerType] || u.pointerType,
          Y = N == Ct,
          q = We(p, u.pointerId, "pointerId");
        P & ee && (u.button === 0 || Y) ? q < 0 && (p.push(u), q = p.length - 1) : P & (V | se) && (f = !0), !(q < 0) && (p[q] = u, this.callback(this.manager, P, {
          pointers: p,
          changedPointers: [u],
          pointerType: N,
          srcEvent: u
        }), f && p.splice(q, 1));
      }
    });
    var Vo = {
        touchstart: ee,
        touchmove: Ze,
        touchend: V,
        touchcancel: se
      },
      zo = "touchstart",
      Wo = "touchstart touchmove touchend touchcancel";
    function Qs() {
      this.evTarget = zo, this.evWin = Wo, this.started = !1, pe.apply(this, arguments);
    }
    R(Qs, pe, {
      handler: function (u) {
        var p = Vo[u.type];
        if (p === ee && (this.started = !0), !!this.started) {
          var f = Fo.call(this, u, p);
          p & (V | se) && f[0].length - f[1].length === 0 && (this.started = !1), this.callback(this.manager, p, {
            pointers: f[0],
            changedPointers: f[1],
            pointerType: Ct,
            srcEvent: u
          });
        }
      }
    });
    function Fo(c, u) {
      var p = Xt(c.touches),
        f = Xt(c.changedTouches);
      return u & (V | se) && (p = zs(p.concat(f), "identifier", !0)), [p, f];
    }
    var Go = {
        touchstart: ee,
        touchmove: Ze,
        touchend: V,
        touchcancel: se
      },
      Yo = "touchstart touchmove touchend touchcancel";
    function ei() {
      this.evTarget = Yo, this.targetIds = {}, pe.apply(this, arguments);
    }
    R(ei, pe, {
      handler: function (u) {
        var p = Go[u.type],
          f = qo.call(this, u, p);
        f && this.callback(this.manager, p, {
          pointers: f[0],
          changedPointers: f[1],
          pointerType: Ct,
          srcEvent: u
        });
      }
    });
    function qo(c, u) {
      var p = Xt(c.touches),
        f = this.targetIds;
      if (u & (ee | Ze) && p.length === 1) return f[p[0].identifier] = !0, [p, p];
      var x,
        P,
        N = Xt(c.changedTouches),
        Y = [],
        q = this.target;
      if (P = p.filter(function (te) {
        return de(te.target, q);
      }), u === ee) for (x = 0; x < P.length;) f[P[x].identifier] = !0, x++;
      for (x = 0; x < N.length;) f[N[x].identifier] && Y.push(N[x]), u & (V | se) && delete f[N[x].identifier], x++;
      if (Y.length) return [zs(P.concat(Y), "identifier", !0), Y];
    }
    var Xo = 2500,
      en = 25;
    function Vi() {
      pe.apply(this, arguments);
      var c = Ne(this.handler, this);
      this.touch = new ei(this.manager, c), this.mouse = new Qt(this.manager, c), this.primaryTouch = null, this.lastTouches = [];
    }
    R(Vi, pe, {
      handler: function (u, p, f) {
        var x = f.pointerType == Ct,
          P = f.pointerType == $i;
        if (!(P && f.sourceCapabilities && f.sourceCapabilities.firesTouchEvents)) {
          if (x) Ko.call(this, p, f);else if (P && jo.call(this, f)) return;
          this.callback(u, p, f);
        }
      },
      destroy: function () {
        this.touch.destroy(), this.mouse.destroy();
      }
    });
    function Ko(c, u) {
      c & ee ? (this.primaryTouch = u.changedPointers[0].identifier, tn.call(this, u)) : c & (V | se) && tn.call(this, u);
    }
    function tn(c) {
      var u = c.changedPointers[0];
      if (u.identifier === this.primaryTouch) {
        var p = {
          x: u.clientX,
          y: u.clientY
        };
        this.lastTouches.push(p);
        var f = this.lastTouches,
          x = function () {
            var P = f.indexOf(p);
            P > -1 && f.splice(P, 1);
          };
        setTimeout(x, Xo);
      }
    }
    function jo(c) {
      for (var u = c.srcEvent.clientX, p = c.srcEvent.clientY, f = 0; f < this.lastTouches.length; f++) {
        var x = this.lastTouches[f],
          P = Math.abs(u - x.x),
          N = Math.abs(p - x.y);
        if (P <= en && N <= en) return !0;
      }
      return !1;
    }
    var sn = Kt(a.style, "touchAction"),
      nn = sn !== n,
      rn = "compute",
      on = "auto",
      zi = "manipulation",
      Qe = "none",
      Mt = "pan-x",
      At = "pan-y",
      ti = Jo();
    function Wi(c, u) {
      this.manager = c, this.set(u);
    }
    Wi.prototype = {
      set: function (c) {
        c == rn && (c = this.compute()), nn && this.manager.element.style && ti[c] && (this.manager.element.style[sn] = c), this.actions = c.toLowerCase().trim();
      },
      update: function () {
        this.set(this.manager.options.touchAction);
      },
      compute: function () {
        var c = [];
        return A(this.manager.recognizers, function (u) {
          J(u.options.enable, [u]) && (c = c.concat(u.getTouchAction()));
        }), Zo(c.join(" "));
      },
      preventDefaults: function (c) {
        var u = c.srcEvent,
          p = c.offsetDirection;
        if (this.manager.session.prevented) {
          u.preventDefault();
          return;
        }
        var f = this.actions,
          x = me(f, Qe) && !ti[Qe],
          P = me(f, At) && !ti[At],
          N = me(f, Mt) && !ti[Mt];
        if (x) {
          var Y = c.pointers.length === 1,
            q = c.distance < 2,
            te = c.deltaTime < 250;
          if (Y && q && te) return;
        }
        if (!(N && P) && (x || P && p & Ie || N && p & Je)) return this.preventSrc(u);
      },
      preventSrc: function (c) {
        this.manager.session.prevented = !0, c.preventDefault();
      }
    };
    function Zo(c) {
      if (me(c, Qe)) return Qe;
      var u = me(c, Mt),
        p = me(c, At);
      return u && p ? Qe : u || p ? u ? Mt : At : me(c, zi) ? zi : on;
    }
    function Jo() {
      if (!nn) return !1;
      var c = {},
        u = e.CSS && e.CSS.supports;
      return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function (p) {
        c[p] = u ? e.CSS.supports("touch-action", p) : !0;
      }), c;
    }
    var ii = 1,
      ge = 2,
      at = 4,
      Fe = 8,
      Ue = Fe,
      Lt = 16,
      De = 32;
    function Be(c) {
      this.options = O({}, this.defaults, c || {}), this.id = Co(), this.manager = null, this.options.enable = ue(this.options.enable, !0), this.state = ii, this.simultaneous = {}, this.requireFail = [];
    }
    Be.prototype = {
      defaults: {},
      set: function (c) {
        return O(this.options, c), this.manager && this.manager.touchAction.update(), this;
      },
      recognizeWith: function (c) {
        if (S(c, "recognizeWith", this)) return this;
        var u = this.simultaneous;
        return c = si(c, this), u[c.id] || (u[c.id] = c, c.recognizeWith(this)), this;
      },
      dropRecognizeWith: function (c) {
        return S(c, "dropRecognizeWith", this) ? this : (c = si(c, this), delete this.simultaneous[c.id], this);
      },
      requireFailure: function (c) {
        if (S(c, "requireFailure", this)) return this;
        var u = this.requireFail;
        return c = si(c, this), We(u, c) === -1 && (u.push(c), c.requireFailure(this)), this;
      },
      dropRequireFailure: function (c) {
        if (S(c, "dropRequireFailure", this)) return this;
        c = si(c, this);
        var u = We(this.requireFail, c);
        return u > -1 && this.requireFail.splice(u, 1), this;
      },
      hasRequireFailures: function () {
        return this.requireFail.length > 0;
      },
      canRecognizeWith: function (c) {
        return !!this.simultaneous[c.id];
      },
      emit: function (c) {
        var u = this,
          p = this.state;
        function f(x) {
          u.manager.emit(x, c);
        }
        p < Fe && f(u.options.event + an(p)), f(u.options.event), c.additionalEvent && f(c.additionalEvent), p >= Fe && f(u.options.event + an(p));
      },
      tryEmit: function (c) {
        if (this.canEmit()) return this.emit(c);
        this.state = De;
      },
      canEmit: function () {
        for (var c = 0; c < this.requireFail.length;) {
          if (!(this.requireFail[c].state & (De | ii))) return !1;
          c++;
        }
        return !0;
      },
      recognize: function (c) {
        var u = O({}, c);
        if (!J(this.options.enable, [this, u])) {
          this.reset(), this.state = De;
          return;
        }
        this.state & (Ue | Lt | De) && (this.state = ii), this.state = this.process(u), this.state & (ge | at | Fe | Lt) && this.tryEmit(u);
      },
      process: function (c) {},
      getTouchAction: function () {},
      reset: function () {}
    };
    function an(c) {
      return c & Lt ? "cancel" : c & Fe ? "end" : c & at ? "move" : c & ge ? "start" : "";
    }
    function ln(c) {
      return c == Pt ? "down" : c == St ? "up" : c == Tt ? "left" : c == Et ? "right" : "";
    }
    function si(c, u) {
      var p = u.manager;
      return p ? p.get(c) : c;
    }
    function Ce() {
      Be.apply(this, arguments);
    }
    R(Ce, Be, {
      defaults: {
        pointers: 1
      },
      attrTest: function (c) {
        var u = this.options.pointers;
        return u === 0 || c.pointers.length === u;
      },
      process: function (c) {
        var u = this.state,
          p = c.eventType,
          f = u & (ge | at),
          x = this.attrTest(c);
        return f && (p & se || !x) ? u | Lt : f || x ? p & V ? u | Fe : u & ge ? u | at : ge : De;
      }
    });
    function ni() {
      Ce.apply(this, arguments), this.pX = null, this.pY = null;
    }
    R(ni, Ce, {
      defaults: {
        event: "pan",
        threshold: 10,
        pointers: 1,
        direction: Gs
      },
      getTouchAction: function () {
        var c = this.options.direction,
          u = [];
        return c & Ie && u.push(At), c & Je && u.push(Mt), u;
      },
      directionTest: function (c) {
        var u = this.options,
          p = !0,
          f = c.distance,
          x = c.direction,
          P = c.deltaX,
          N = c.deltaY;
        return x & u.direction || (u.direction & Ie ? (x = P === 0 ? jt : P < 0 ? Tt : Et, p = P != this.pX, f = Math.abs(c.deltaX)) : (x = N === 0 ? jt : N < 0 ? St : Pt, p = N != this.pY, f = Math.abs(c.deltaY))), c.direction = x, p && f > u.threshold && x & u.direction;
      },
      attrTest: function (c) {
        return Ce.prototype.attrTest.call(this, c) && (this.state & ge || !(this.state & ge) && this.directionTest(c));
      },
      emit: function (c) {
        this.pX = c.deltaX, this.pY = c.deltaY;
        var u = ln(c.direction);
        u && (c.additionalEvent = this.options.event + u), this._super.emit.call(this, c);
      }
    });
    function Fi() {
      Ce.apply(this, arguments);
    }
    R(Fi, Ce, {
      defaults: {
        event: "pinch",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function () {
        return [Qe];
      },
      attrTest: function (c) {
        return this._super.attrTest.call(this, c) && (Math.abs(c.scale - 1) > this.options.threshold || this.state & ge);
      },
      emit: function (c) {
        if (c.scale !== 1) {
          var u = c.scale < 1 ? "in" : "out";
          c.additionalEvent = this.options.event + u;
        }
        this._super.emit.call(this, c);
      }
    });
    function Gi() {
      Be.apply(this, arguments), this._timer = null, this._input = null;
    }
    R(Gi, Be, {
      defaults: {
        event: "press",
        pointers: 1,
        time: 251,
        threshold: 9
      },
      getTouchAction: function () {
        return [on];
      },
      process: function (c) {
        var u = this.options,
          p = c.pointers.length === u.pointers,
          f = c.distance < u.threshold,
          x = c.deltaTime > u.time;
        if (this._input = c, !f || !p || c.eventType & (V | se) && !x) this.reset();else if (c.eventType & ee) this.reset(), this._timer = v(function () {
          this.state = Ue, this.tryEmit();
        }, u.time, this);else if (c.eventType & V) return Ue;
        return De;
      },
      reset: function () {
        clearTimeout(this._timer);
      },
      emit: function (c) {
        this.state === Ue && (c && c.eventType & V ? this.manager.emit(this.options.event + "up", c) : (this._input.timeStamp = g(), this.manager.emit(this.options.event, this._input)));
      }
    });
    function Yi() {
      Ce.apply(this, arguments);
    }
    R(Yi, Ce, {
      defaults: {
        event: "rotate",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function () {
        return [Qe];
      },
      attrTest: function (c) {
        return this._super.attrTest.call(this, c) && (Math.abs(c.rotation) > this.options.threshold || this.state & ge);
      }
    });
    function qi() {
      Ce.apply(this, arguments);
    }
    R(qi, Ce, {
      defaults: {
        event: "swipe",
        threshold: 10,
        velocity: 0.3,
        direction: Ie | Je,
        pointers: 1
      },
      getTouchAction: function () {
        return ni.prototype.getTouchAction.call(this);
      },
      attrTest: function (c) {
        var u = this.options.direction,
          p;
        return u & (Ie | Je) ? p = c.overallVelocity : u & Ie ? p = c.overallVelocityX : u & Je && (p = c.overallVelocityY), this._super.attrTest.call(this, c) && u & c.offsetDirection && c.distance > this.options.threshold && c.maxPointers == this.options.pointers && m(p) > this.options.velocity && c.eventType & V;
      },
      emit: function (c) {
        var u = ln(c.offsetDirection);
        u && this.manager.emit(this.options.event + u, c), this.manager.emit(this.options.event, c);
      }
    });
    function ri() {
      Be.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;
    }
    R(ri, Be, {
      defaults: {
        event: "tap",
        pointers: 1,
        taps: 1,
        interval: 300,
        time: 250,
        threshold: 9,
        posThreshold: 10
      },
      getTouchAction: function () {
        return [zi];
      },
      process: function (c) {
        var u = this.options,
          p = c.pointers.length === u.pointers,
          f = c.distance < u.threshold,
          x = c.deltaTime < u.time;
        if (this.reset(), c.eventType & ee && this.count === 0) return this.failTimeout();
        if (f && x && p) {
          if (c.eventType != V) return this.failTimeout();
          var P = this.pTime ? c.timeStamp - this.pTime < u.interval : !0,
            N = !this.pCenter || Jt(this.pCenter, c.center) < u.posThreshold;
          this.pTime = c.timeStamp, this.pCenter = c.center, !N || !P ? this.count = 1 : this.count += 1, this._input = c;
          var Y = this.count % u.taps;
          if (Y === 0) return this.hasRequireFailures() ? (this._timer = v(function () {
            this.state = Ue, this.tryEmit();
          }, u.interval, this), ge) : Ue;
        }
        return De;
      },
      failTimeout: function () {
        return this._timer = v(function () {
          this.state = De;
        }, this.options.interval, this), De;
      },
      reset: function () {
        clearTimeout(this._timer);
      },
      emit: function () {
        this.state == Ue && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
      }
    });
    function Ve(c, u) {
      return u = u || {}, u.recognizers = ue(u.recognizers, Ve.defaults.preset), new Xi(c, u);
    }
    Ve.VERSION = "2.0.7", Ve.defaults = {
      domEvents: !1,
      touchAction: rn,
      enable: !0,
      inputTarget: null,
      inputClass: null,
      preset: [[Yi, {
        enable: !1
      }], [Fi, {
        enable: !1
      }, ["rotate"]], [qi, {
        direction: Ie
      }], [ni, {
        direction: Ie
      }, ["swipe"]], [ri], [ri, {
        event: "doubletap",
        taps: 2
      }, ["tap"]], [Gi]],
      cssProps: {
        userSelect: "none",
        touchSelect: "none",
        touchCallout: "none",
        contentZooming: "none",
        userDrag: "none",
        tapHighlightColor: "rgba(0,0,0,0)"
      }
    };
    var Qo = 1,
      hn = 2;
    function Xi(c, u) {
      this.options = O({}, Ve.defaults, u || {}), this.options.inputTarget = this.options.inputTarget || c, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = c, this.input = Lo(this), this.touchAction = new Wi(this, this.options.touchAction), cn(this, !0), A(this.options.recognizers, function (p) {
        var f = this.add(new p[0](p[1]));
        p[2] && f.recognizeWith(p[2]), p[3] && f.requireFailure(p[3]);
      }, this);
    }
    Xi.prototype = {
      set: function (c) {
        return O(this.options, c), c.touchAction && this.touchAction.update(), c.inputTarget && (this.input.destroy(), this.input.target = c.inputTarget, this.input.init()), this;
      },
      stop: function (c) {
        this.session.stopped = c ? hn : Qo;
      },
      recognize: function (c) {
        var u = this.session;
        if (!u.stopped) {
          this.touchAction.preventDefaults(c);
          var p,
            f = this.recognizers,
            x = u.curRecognizer;
          (!x || x && x.state & Ue) && (x = u.curRecognizer = null);
          for (var P = 0; P < f.length;) p = f[P], u.stopped !== hn && (!x || p == x || p.canRecognizeWith(x)) ? p.recognize(c) : p.reset(), !x && p.state & (ge | at | Fe) && (x = u.curRecognizer = p), P++;
        }
      },
      get: function (c) {
        if (c instanceof Be) return c;
        for (var u = this.recognizers, p = 0; p < u.length; p++) if (u[p].options.event == c) return u[p];
        return null;
      },
      add: function (c) {
        if (S(c, "add", this)) return this;
        var u = this.get(c.options.event);
        return u && this.remove(u), this.recognizers.push(c), c.manager = this, this.touchAction.update(), c;
      },
      remove: function (c) {
        if (S(c, "remove", this)) return this;
        if (c = this.get(c), c) {
          var u = this.recognizers,
            p = We(u, c);
          p !== -1 && (u.splice(p, 1), this.touchAction.update());
        }
        return this;
      },
      on: function (c, u) {
        if (c !== n && u !== n) {
          var p = this.handlers;
          return A(ot(c), function (f) {
            p[f] = p[f] || [], p[f].push(u);
          }), this;
        }
      },
      off: function (c, u) {
        if (c !== n) {
          var p = this.handlers;
          return A(ot(c), function (f) {
            u ? p[f] && p[f].splice(We(p[f], u), 1) : delete p[f];
          }), this;
        }
      },
      emit: function (c, u) {
        this.options.domEvents && ea(c, u);
        var p = this.handlers[c] && this.handlers[c].slice();
        if (!(!p || !p.length)) {
          u.type = c, u.preventDefault = function () {
            u.srcEvent.preventDefault();
          };
          for (var f = 0; f < p.length;) p[f](u), f++;
        }
      },
      destroy: function () {
        this.element && cn(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
      }
    };
    function cn(c, u) {
      var p = c.element;
      if (p.style) {
        var f;
        A(c.options.cssProps, function (x, P) {
          f = Kt(p.style, P), u ? (c.oldCssProps[f] = p.style[f], p.style[f] = x) : p.style[f] = c.oldCssProps[f] || "";
        }), u || (c.oldCssProps = {});
      }
    }
    function ea(c, u) {
      var p = i.createEvent("Event");
      p.initEvent(c, !0, !0), p.gesture = u, u.target.dispatchEvent(p);
    }
    O(Ve, {
      INPUT_START: ee,
      INPUT_MOVE: Ze,
      INPUT_END: V,
      INPUT_CANCEL: se,
      STATE_POSSIBLE: ii,
      STATE_BEGAN: ge,
      STATE_CHANGED: at,
      STATE_ENDED: Fe,
      STATE_RECOGNIZED: Ue,
      STATE_CANCELLED: Lt,
      STATE_FAILED: De,
      DIRECTION_NONE: jt,
      DIRECTION_LEFT: Tt,
      DIRECTION_RIGHT: Et,
      DIRECTION_UP: St,
      DIRECTION_DOWN: Pt,
      DIRECTION_HORIZONTAL: Ie,
      DIRECTION_VERTICAL: Je,
      DIRECTION_ALL: Gs,
      Manager: Xi,
      Input: pe,
      TouchAction: Wi,
      TouchInput: ei,
      MouseInput: Qt,
      PointerEventInput: Bi,
      TouchMouseInput: Vi,
      SingleTouchInput: Qs,
      Recognizer: Be,
      AttrRecognizer: Ce,
      Tap: ri,
      Pan: ni,
      Swipe: qi,
      Pinch: Fi,
      Rotate: Yi,
      Press: Gi,
      on: Q,
      off: ie,
      each: A,
      merge: B,
      extend: ae,
      assign: O,
      inherit: R,
      bindFn: Ne,
      prefixed: Kt
    });
    var ta = typeof e < "u" ? e : typeof self < "u" ? self : {};
    ta.Hammer = Ve, typeof n == "function" && n.amd ? n(function () {
      return Ve;
    }) : r.exports ? r.exports = Ve : e[s] = Ve;
  })(window, document, "Hammer");
})(Pr);
var qt = Pr.exports;
const cl = hl(qt),
  Re = /* @__PURE__ */ia({
    __proto__: null,
    default: cl
  }, [qt]),
  Mr = 1,
  Ar = 2,
  gs = 4,
  ul = {
    mousedown: Mr,
    mousemove: Ar,
    mouseup: gs
  };
function dl(r, e) {
  for (let i = 0; i < r.length; i++) if (e(r[i])) return !0;
  return !1;
}
function ml(r) {
  const e = r.prototype.handler;
  r.prototype.handler = function (s) {
    const n = this.store;
    s.button > 0 && s.type === "pointerdown" && (dl(n, o => o.pointerId === s.pointerId) || n.push(s)), e.call(this, s);
  };
}
function pl(r) {
  r.prototype.handler = function (i) {
    let s = ul[i.type];
    s & Mr && i.button >= 0 && (this.pressed = !0), s & Ar && i.which === 0 && (s = gs), this.pressed && (s & gs && (this.pressed = !1), this.callback(this.manager, s, {
      pointers: [i],
      changedPointers: [i],
      pointerType: "mouse",
      srcEvent: i
    }));
  };
}
ml(qt.PointerEventInput);
pl(qt.MouseInput);
const gl = qt.Manager;
let Ri = class {
  constructor(e, i, s) {
    this.element = e, this.callback = i, this.options = {
      enable: !0,
      ...s
    };
  }
};
const fl = Re ? [[Re.Pan, {
    event: "tripan",
    pointers: 3,
    threshold: 0,
    enable: !1
  }], [Re.Rotate, {
    enable: !1
  }], [Re.Pinch, {
    enable: !1
  }], [Re.Swipe, {
    enable: !1
  }], [Re.Pan, {
    threshold: 0,
    enable: !1
  }], [Re.Press, {
    enable: !1
  }], [Re.Tap, {
    event: "doubletap",
    taps: 2,
    enable: !1
  }], [Re.Tap, {
    event: "anytap",
    enable: !1
  }], [Re.Tap, {
    enable: !1
  }]] : null,
  Ln = {
    tripan: ["rotate", "pinch", "pan"],
    rotate: ["pinch"],
    pinch: ["pan"],
    pan: ["press", "doubletap", "anytap", "tap"],
    doubletap: ["anytap"],
    anytap: ["tap"]
  },
  yl = {
    doubletap: ["tap"]
  },
  vl = {
    pointerdown: "pointerdown",
    pointermove: "pointermove",
    pointerup: "pointerup",
    touchstart: "pointerdown",
    touchmove: "pointermove",
    touchend: "pointerup",
    mousedown: "pointerdown",
    mousemove: "pointermove",
    mouseup: "pointerup"
  },
  Is = {
    KEY_EVENTS: ["keydown", "keyup"],
    MOUSE_EVENTS: ["mousedown", "mousemove", "mouseup", "mouseover", "mouseout", "mouseleave"],
    WHEEL_EVENTS: ["wheel", "mousewheel"]
  },
  wl = {
    tap: "tap",
    anytap: "anytap",
    doubletap: "doubletap",
    press: "press",
    pinch: "pinch",
    pinchin: "pinch",
    pinchout: "pinch",
    pinchstart: "pinch",
    pinchmove: "pinch",
    pinchend: "pinch",
    pinchcancel: "pinch",
    rotate: "rotate",
    rotatestart: "rotate",
    rotatemove: "rotate",
    rotateend: "rotate",
    rotatecancel: "rotate",
    tripan: "tripan",
    tripanstart: "tripan",
    tripanmove: "tripan",
    tripanup: "tripan",
    tripandown: "tripan",
    tripanleft: "tripan",
    tripanright: "tripan",
    tripanend: "tripan",
    tripancancel: "tripan",
    pan: "pan",
    panstart: "pan",
    panmove: "pan",
    panup: "pan",
    pandown: "pan",
    panleft: "pan",
    panright: "pan",
    panend: "pan",
    pancancel: "pan",
    swipe: "swipe",
    swipeleft: "swipe",
    swiperight: "swipe",
    swipeup: "swipe",
    swipedown: "swipe"
  },
  Nn = {
    click: "tap",
    anyclick: "anytap",
    dblclick: "doubletap",
    mousedown: "pointerdown",
    mousemove: "pointermove",
    mouseup: "pointerup",
    mouseover: "pointerover",
    mouseout: "pointerout",
    mouseleave: "pointerleave"
  },
  xl = typeof navigator < "u" && navigator.userAgent ? navigator.userAgent.toLowerCase() : "",
  lt = typeof window < "u" ? window : global;
let fs = !1;
try {
  const r = {
    get passive() {
      return fs = !0, !0;
    }
  };
  lt.addEventListener("test", null, r), lt.removeEventListener("test", null);
} catch {
  fs = !1;
}
const bl = xl.indexOf("firefox") !== -1,
  {
    WHEEL_EVENTS: Cl
  } = Is,
  In = "wheel",
  Dn = 4.000244140625,
  Tl = 40,
  El = 0.25;
class Sl extends Ri {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = n => {
      if (!this.options.enable) return;
      let o = n.deltaY;
      lt.WheelEvent && (bl && n.deltaMode === lt.WheelEvent.DOM_DELTA_PIXEL && (o /= lt.devicePixelRatio), n.deltaMode === lt.WheelEvent.DOM_DELTA_LINE && (o *= Tl)), o !== 0 && o % Dn === 0 && (o = Math.floor(o / Dn)), n.shiftKey && o && (o = o * El), this.callback({
        type: In,
        center: {
          x: n.clientX,
          y: n.clientY
        },
        delta: -o,
        srcEvent: n,
        pointerType: "mouse",
        target: n.target
      });
    }, this.events = (this.options.events || []).concat(Cl), this.events.forEach(n => e.addEventListener(n, this.handleEvent, fs ? {
      passive: !1
    } : !1));
  }
  destroy() {
    this.events.forEach(e => this.element.removeEventListener(e, this.handleEvent));
  }
  enableEventType(e, i) {
    e === In && (this.options.enable = i);
  }
}
const {
    MOUSE_EVENTS: Pl
  } = Is,
  On = "pointermove",
  Rn = "pointerover",
  kn = "pointerout",
  _n = "pointerenter",
  Hn = "pointerleave";
class Ml extends Ri {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = o => {
      this.handleOverEvent(o), this.handleOutEvent(o), this.handleEnterEvent(o), this.handleLeaveEvent(o), this.handleMoveEvent(o);
    }, this.pressed = !1;
    const {
      enable: n
    } = this.options;
    this.enableMoveEvent = n, this.enableLeaveEvent = n, this.enableEnterEvent = n, this.enableOutEvent = n, this.enableOverEvent = n, this.events = (this.options.events || []).concat(Pl), this.events.forEach(o => e.addEventListener(o, this.handleEvent));
  }
  destroy() {
    this.events.forEach(e => this.element.removeEventListener(e, this.handleEvent));
  }
  enableEventType(e, i) {
    e === On && (this.enableMoveEvent = i), e === Rn && (this.enableOverEvent = i), e === kn && (this.enableOutEvent = i), e === _n && (this.enableEnterEvent = i), e === Hn && (this.enableLeaveEvent = i);
  }
  handleOverEvent(e) {
    this.enableOverEvent && e.type === "mouseover" && this._emit(Rn, e);
  }
  handleOutEvent(e) {
    this.enableOutEvent && e.type === "mouseout" && this._emit(kn, e);
  }
  handleEnterEvent(e) {
    this.enableEnterEvent && e.type === "mouseenter" && this._emit(_n, e);
  }
  handleLeaveEvent(e) {
    this.enableLeaveEvent && e.type === "mouseleave" && this._emit(Hn, e);
  }
  handleMoveEvent(e) {
    if (this.enableMoveEvent) switch (e.type) {
      case "mousedown":
        e.button >= 0 && (this.pressed = !0);
        break;
      case "mousemove":
        e.which === 0 && (this.pressed = !1), this.pressed || this._emit(On, e);
        break;
      case "mouseup":
        this.pressed = !1;
        break;
    }
  }
  _emit(e, i) {
    this.callback({
      type: e,
      center: {
        x: i.clientX,
        y: i.clientY
      },
      srcEvent: i,
      pointerType: "mouse",
      target: i.target
    });
  }
}
const {
    KEY_EVENTS: Al
  } = Is,
  $n = "keydown",
  Un = "keyup";
class Ll extends Ri {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = n => {
      const o = n.target || n.srcElement;
      o.tagName === "INPUT" && o.type === "text" || o.tagName === "TEXTAREA" || (this.enableDownEvent && n.type === "keydown" && this.callback({
        type: $n,
        srcEvent: n,
        key: n.key,
        target: n.target
      }), this.enableUpEvent && n.type === "keyup" && this.callback({
        type: Un,
        srcEvent: n,
        key: n.key,
        target: n.target
      }));
    }, this.enableDownEvent = this.options.enable, this.enableUpEvent = this.options.enable, this.events = (this.options.events || []).concat(Al), e.tabIndex = this.options.tabIndex || 0, e.style.outline = "none", this.events.forEach(n => e.addEventListener(n, this.handleEvent));
  }
  destroy() {
    this.events.forEach(e => this.element.removeEventListener(e, this.handleEvent));
  }
  enableEventType(e, i) {
    e === $n && (this.enableDownEvent = i), e === Un && (this.enableUpEvent = i);
  }
}
const Bn = "contextmenu";
class Nl extends Ri {
  constructor(e, i, s) {
    super(e, i, s), this.handleEvent = n => {
      this.options.enable && this.callback({
        type: Bn,
        center: {
          x: n.clientX,
          y: n.clientY
        },
        srcEvent: n,
        pointerType: "mouse",
        target: n.target
      });
    }, e.addEventListener("contextmenu", this.handleEvent);
  }
  destroy() {
    this.element.removeEventListener("contextmenu", this.handleEvent);
  }
  enableEventType(e, i) {
    e === Bn && (this.options.enable = i);
  }
}
const ys = 1,
  Ei = 2,
  vs = 4,
  Il = {
    pointerdown: ys,
    pointermove: Ei,
    pointerup: vs,
    mousedown: ys,
    mousemove: Ei,
    mouseup: vs
  },
  Dl = 1,
  Ol = 2,
  Rl = 3,
  kl = 0,
  _l = 1,
  Hl = 2,
  $l = 1,
  Ul = 2,
  Bl = 4;
function Vl(r) {
  const e = Il[r.srcEvent.type];
  if (!e) return null;
  const {
    buttons: i,
    button: s,
    which: n
  } = r.srcEvent;
  let o = !1,
    a = !1,
    l = !1;
  return e === vs || e === Ei && !Number.isFinite(i) ? (o = n === Dl, a = n === Ol, l = n === Rl) : e === Ei ? (o = !!(i & $l), a = !!(i & Bl), l = !!(i & Ul)) : e === ys && (o = s === kl, a = s === _l, l = s === Hl), {
    leftButton: o,
    middleButton: a,
    rightButton: l
  };
}
function zl(r, e) {
  const i = r.center;
  if (!i) return null;
  const s = e.getBoundingClientRect(),
    n = s.width / e.offsetWidth || 1,
    o = s.height / e.offsetHeight || 1,
    a = {
      x: (i.x - s.left - e.clientLeft) / n,
      y: (i.y - s.top - e.clientTop) / o
    };
  return {
    center: i,
    offsetCenter: a
  };
}
const Ki = {
  srcElement: "root",
  priority: 0
};
class Wl {
  constructor(e) {
    this.handleEvent = i => {
      if (this.isEmpty()) return;
      const s = this._normalizeEvent(i);
      let n = i.srcEvent.target;
      for (; n && n !== s.rootElement;) {
        if (this._emit(s, n), s.handled) return;
        n = n.parentNode;
      }
      this._emit(s, "root");
    }, this.eventManager = e, this.handlers = [], this.handlersByElement = /* @__PURE__ */new Map(), this._active = !1;
  }
  isEmpty() {
    return !this._active;
  }
  add(e, i, s, n = !1, o = !1) {
    const {
      handlers: a,
      handlersByElement: l
    } = this;
    let h = Ki;
    typeof s == "string" || s && s.addEventListener ? h = {
      ...Ki,
      srcElement: s
    } : s && (h = {
      ...Ki,
      ...s
    });
    let m = l.get(h.srcElement);
    m || (m = [], l.set(h.srcElement, m));
    const g = {
      type: e,
      handler: i,
      srcElement: h.srcElement,
      priority: h.priority
    };
    n && (g.once = !0), o && (g.passive = !0), a.push(g), this._active = this._active || !g.passive;
    let v = m.length - 1;
    for (; v >= 0 && !(m[v].priority >= g.priority);) v--;
    m.splice(v + 1, 0, g);
  }
  remove(e, i) {
    const {
      handlers: s,
      handlersByElement: n
    } = this;
    for (let o = s.length - 1; o >= 0; o--) {
      const a = s[o];
      if (a.type === e && a.handler === i) {
        s.splice(o, 1);
        const l = n.get(a.srcElement);
        l.splice(l.indexOf(a), 1), l.length === 0 && n.delete(a.srcElement);
      }
    }
    this._active = s.some(o => !o.passive);
  }
  _emit(e, i) {
    const s = this.handlersByElement.get(i);
    if (s) {
      let n = !1;
      const o = () => {
          e.handled = !0;
        },
        a = () => {
          e.handled = !0, n = !0;
        },
        l = [];
      for (let h = 0; h < s.length; h++) {
        const {
          type: m,
          handler: g,
          once: v
        } = s[h];
        if (g({
          ...e,
          type: m,
          stopPropagation: o,
          stopImmediatePropagation: a
        }), v && l.push(s[h]), n) break;
      }
      for (let h = 0; h < l.length; h++) {
        const {
          type: m,
          handler: g
        } = l[h];
        this.remove(m, g);
      }
    }
  }
  _normalizeEvent(e) {
    const i = this.eventManager.getElement();
    return {
      ...e,
      ...Vl(e),
      ...zl(e, i),
      preventDefault: () => {
        e.srcEvent.preventDefault();
      },
      stopImmediatePropagation: null,
      stopPropagation: null,
      handled: !1,
      rootElement: i
    };
  }
}
const Fl = {
  events: null,
  recognizers: null,
  recognizerOptions: {},
  Manager: gl,
  touchAction: "none",
  tabIndex: 0
};
class Gl {
  constructor(e = null, i) {
    this._onBasicInput = n => {
      const {
          srcEvent: o
        } = n,
        a = vl[o.type];
      a && this.manager.emit(a, n);
    }, this._onOtherEvent = n => {
      this.manager.emit(n.type, n);
    }, this.options = {
      ...Fl,
      ...i
    }, this.events = /* @__PURE__ */new Map(), this.setElement(e);
    const {
      events: s
    } = this.options;
    s && this.on(s);
  }
  getElement() {
    return this.element;
  }
  setElement(e) {
    if (this.element && this.destroy(), this.element = e, !e) return;
    const {
        options: i
      } = this,
      s = i.Manager;
    this.manager = new s(e, {
      touchAction: i.touchAction,
      recognizers: i.recognizers || fl
    }).on("hammer.input", this._onBasicInput), i.recognizers || Object.keys(Ln).forEach(n => {
      const o = this.manager.get(n);
      o && Ln[n].forEach(a => {
        o.recognizeWith(a);
      });
    });
    for (const n in i.recognizerOptions) {
      const o = this.manager.get(n);
      if (o) {
        const a = i.recognizerOptions[n];
        delete a.enable, o.set(a);
      }
    }
    this.wheelInput = new Sl(e, this._onOtherEvent, {
      enable: !1
    }), this.moveInput = new Ml(e, this._onOtherEvent, {
      enable: !1
    }), this.keyInput = new Ll(e, this._onOtherEvent, {
      enable: !1,
      tabIndex: i.tabIndex
    }), this.contextmenuInput = new Nl(e, this._onOtherEvent, {
      enable: !1
    });
    for (const [n, o] of this.events) o.isEmpty() || (this._toggleRecognizer(o.recognizerName, !0), this.manager.on(n, o.handleEvent));
  }
  destroy() {
    this.element && (this.wheelInput.destroy(), this.moveInput.destroy(), this.keyInput.destroy(), this.contextmenuInput.destroy(), this.manager.destroy(), this.wheelInput = null, this.moveInput = null, this.keyInput = null, this.contextmenuInput = null, this.manager = null, this.element = null);
  }
  on(e, i, s) {
    this._addEventHandler(e, i, s, !1);
  }
  once(e, i, s) {
    this._addEventHandler(e, i, s, !0);
  }
  watch(e, i, s) {
    this._addEventHandler(e, i, s, !1, !0);
  }
  off(e, i) {
    this._removeEventHandler(e, i);
  }
  _toggleRecognizer(e, i) {
    const {
      manager: s
    } = this;
    if (!s) return;
    const n = s.get(e);
    if (n && n.options.enable !== i) {
      n.set({
        enable: i
      });
      const o = yl[e];
      o && !this.options.recognizers && o.forEach(a => {
        const l = s.get(a);
        i ? (l.requireFailure(e), n.dropRequireFailure(a)) : l.dropRequireFailure(e);
      });
    }
    this.wheelInput.enableEventType(e, i), this.moveInput.enableEventType(e, i), this.keyInput.enableEventType(e, i), this.contextmenuInput.enableEventType(e, i);
  }
  _addEventHandler(e, i, s, n, o) {
    if (typeof e != "string") {
      s = i;
      for (const g in e) this._addEventHandler(g, e[g], s, n, o);
      return;
    }
    const {
        manager: a,
        events: l
      } = this,
      h = Nn[e] || e;
    let m = l.get(h);
    m || (m = new Wl(this), l.set(h, m), m.recognizerName = wl[h] || h, a && a.on(h, m.handleEvent)), m.add(e, i, s, n, o), m.isEmpty() || this._toggleRecognizer(m.recognizerName, !0);
  }
  _removeEventHandler(e, i) {
    if (typeof e != "string") {
      for (const a in e) this._removeEventHandler(a, e[a]);
      return;
    }
    const {
        events: s
      } = this,
      n = Nn[e] || e,
      o = s.get(n);
    if (o && (o.remove(e, i), o.isEmpty())) {
      const {
        recognizerName: a
      } = o;
      let l = !1;
      for (const h of s.values()) if (h.recognizerName === a && !h.isEmpty()) {
        l = !0;
        break;
      }
      l || this._toggleRecognizer(a, !1);
    }
  }
}
class Vn {
  #e = ["pointerdown", "pointerup", "pointerover", "pointerenter", "pointerout", "pointerleave", "pointermove", "pointercancel", "gotpointercapture", "lostpointercapture", "click", "dblclick", "anyclick", "wheel", "contextmenu", "pointerdrag", "pointerdragend", "pan", "panstart", "panmove", "panup", "pandown", "panleft", "panright", "panend", "pancancel"];
  #t;
  #n = {
    left: !1
  };
  constructor(e) {
    this.#t = e;
  }
  has(e) {
    return this.#e.indexOf(e) != -1;
  }
  on(e, i, s, n) {
    let o = i;
    switch (e) {
      case "pointerdown":
        o = function (a) {
          this.logit(a), a.leftButton && (this.#t.pad.left = !0), this.#t.onPointerDown(a), i(this.#t.pointerEventData(a));
        };
        break;
      case "pointerup":
        o = function (a) {
          this.logit(a), this.#t.onPointerUp(a), i(this.#t.pointerEventData(a));
        };
        break;
      case "pointermove":
        o = function (a) {
          this.#t.motion(a), i(this.#t.pointerEventData(a));
        };
        break;
      case "click":
      case "dbclick":
      case "pointerenter":
      case "pointerleave":
      case "pointerout":
      case "pointerover":
      case "contextmenu":
        o = function (a) {
          this.logit(a), this.#t.location(a), i(this.#t.pointerEventData(a));
        };
        break;
      case "wheel":
        o = function (a) {
          this.logit(a), this.#t.wheeldelta = a, i(this.#t.pointerEventData(a));
        };
        break;
      case "pointercancel":
      case "gotpointercapture":
      case "lostpointercapture":
        o = function (a) {
          i(a);
        };
        break;
      case "pointerdrag":
        o = function (a) {
          this.logit(a), this.#t.motion(a), i(this.#t.pointerEventData(a));
        }, this.#t.agent.on("panstart", this.#t.startPointerDrag.bind(this.#t)), e = "panmove";
        break;
      case "pointerdragend":
        o = function (a) {
          this.logit(a), this.#t.motion(a), this.#t.endPointerDrag(a), i(this.#t.pointerEventData(a));
        }, e = "panend";
        break;
    }
    return n ? this.#t.agent.once(e, o.bind(this), s) : this.#t.agent.on(e, o.bind(this), s), o;
  }
  off(e, i, s) {
    this.#t.agent.off(e, i, s);
  }
  logit(e) {}
}
class zn {
  #e = ["rotate", "rotatestart", "rotatemove", "rotateend", "rotatecancel", "pinch", "pinchin", "pinchout", "pinchstart", "pinchmove", "pinchend", "pinchcancel", "swipe", "swipeleft", "swiperight", "swipeup", "swipedown", "tripan", "tripanstart", "tripanmove", "tripanup", "tripandown", "tripanleft", "tripanright", "tripanend", "tripancancel"];
  #t;
  constructor(e) {
    this.#t = e;
  }
  has(e) {
    return this.#e.indexOf(e) != -1;
  }
  on(e, i, s, n) {
    let o = i;
    return n ? this.#t.agent.once(e, o.bind(this), s) : this.#t.agent.on(e, o.bind(this), s), o;
  }
  off(e, i, s) {
    this.#t.agent.off(e, i, s);
  }
}
class Wn {
  #e = ["keydown", "keyup"];
  #t;
  constructor(e) {
    this.#t = e;
  }
  has(e) {
    return this.#e.indexOf(e) != -1;
  }
  on(e, i, s, n) {
    let o = i;
    return n ? this.#t.agent.once(e, o.bind(this), s) : this.#t.agent.on(e, o.bind(this), s), o;
  }
  off(e, i, s) {
    this.#t.agent.off(e, i, s);
  }
}
const Yl = {
  element: void 0,
  contextMenu: !0,
  panX: !0,
  panY: !0
};
class Le {
  #e;
  #t;
  #n;
  #r = null;
  #i = null;
  #s = null;
  #l;
  #o;
  #c = !1;
  #a;
  #h;
  #d;
  pad = {
    left: !1
  };
  constructor(e, i) {
    if (this.#e = {
      ...Yl,
      ...i
    }, this.#o = ll.idle, this.#l = al, this.#t = e, !this.#t && this.#e.elementId && (this.#t = document.getElementById(this.#e.elementId)), !D.isElement(this.#t)) throw "Must specify an element to receive user input.";
    this.#e.contextMenu || (window.oncontextmenu = o => (o.preventDefault(), !1));
    const n = {
      recognizerOptions: {
        pan: {
          threshold: this.#l ? 10 : 0
        },
        pinch: {
          threshold: 0
        }
      }
    };
    this.#n = new Gl(this.#t, n), this.pointerInit();
  }
  get agent() {
    return this.#n;
  }
  get pointer() {
    return this.#r instanceof Vn ? this.#r : (this.#r = new Vn(this), this.#r);
  }
  get touch() {
    return this.#s instanceof zn ? this.#s : (this.#s = new zn(this), this.#s);
  }
  get key() {
    return this.#i instanceof Wn ? this.#i : (this.#i = new Wn(this), this.#i);
  }
  get status() {
    return this.#o;
  }
  get element() {
    return this.#t;
  }
  get isTouch() {
    return this.#l;
  }
  get isPan() {
    return this.#c;
  }
  set panX(e) {
    K(e) && (this.#a = e);
  }
  set panY(e) {
    K(y) && (this.#h = y);
  }
  set wheeldelta(e) {
    this.#d = e.delta;
  }
  get wheeldelta() {
    return this.#d;
  }
  destroy() {
    this.#n.destroy(), this.#r = void 0, this.#i = void 0, this.#s = void 0;
  }
  isValid(e, i) {
    return !!(E(e) || U(i));
  }
  validOptions(e) {
    return b(e) && K(e) ? e : void 0;
  }
  on(e, i, s, n = !1) {
    if (!this.isValid(e, i)) return !1;
    this.pointer.has(e) ? this.#r.on(e, i, s, n) : this.touch.has(e) ? this.#s.on(e, i, s, n) : this.key.has(e) ? this.#i.on(e, i, s, n) : this.element.addEventListener(e, i, this.validOptions(s));
  }
  off(e, i, s) {
    this.#r?.has(e) ? this.#r.off(e, i, s) : this.#s?.has(e) ? this.#s.off(e, i, s) : this.#i?.has(e) ? this.#i.off(e, i, s) : this.element.removeEventListener(e, i, this.validOptions(s));
  }
  once(e, i, s) {
    this.on(e, i, s, !0);
  }
  setCursor(e) {
    this.#t.style.cursor = e;
  }
  pointerInit() {
    this.clientPosPrev = new it([null, null]), this.position = new it([0, 0]), this.movement = new it([0, 0]), this.dragstart = new it([null, null]), this.dragend = new it([null, null]), this.dragCheckThreshold = 3, this.dragStatus = !1, this.wheeldelta = 0, this.pointerButtons = [!1, !1, !1, !1, !1], this.pointerdrag = new Event("pointerdrag"), this.pointerdragend = new Event("pointerdragend");
  }
  pointerEventData(e) {
    return {
      isProcessed: !1,
      pointerType: e.pointerType,
      position: this.position.clone(),
      movement: this.movement.clone(),
      dragstart: this.dragstart.clone(),
      dragend: this.dragend.clone(),
      wheeldelta: this.wheeldelta,
      buttons: this.pointerButtons,
      domEvent: e,
      timeStamp: Date.now()
    };
  }
  motion(e) {
    let i = {
      left: 0,
      top: 0
    };
    try {
      i = e.srcEvent.target?.getBoundingClientRect();
    } catch {}
    const s = e.srcEvent.clientX || this.position.x,
      n = e.srcEvent.clientY || this.position.y;
    this.movement.x = s - this.clientPosPrev.x, this.movement.y = n - this.clientPosPrev.y, this.position.x = s - i.left, this.position.y = n - i.top, this.clientPosPrev.x = s, this.clientPosPrev.y = n;
  }
  location(e) {
    let i = {
      left: 0,
      top: 0
    };
    try {
      i = e.srcEvent.target?.getBoundingClientRect();
    } catch {}
    this.clientPosPrev.x = e.srcEvent.clientX, this.clientPosPrev.y = e.srcEvent.clientY, this.position.x = e.srcEvent.clientX - i.left, this.position.y = e.srcEvent.clientY - i.top, this.movement.x = 0, this.movement.y = 0;
  }
  onPointerDown(e) {
    this.location(e), this.pointerButtons[e.srcEvent.button] = !0;
  }
  onPointerUp(e) {
    this.location(e), this.pointerButtons[e.srcEvent.button] = !1;
  }
  startPointerDrag(e) {
    this.#c = !0, this.onPointerDown(e);
  }
  endPointerDrag(e) {
    this.#c = !1;
  }
}
class le {
  #e;
  #t;
  #n;
  #r;
  #i;
  #s;
  #l;
  #o;
  #c;
  #a;
  #h;
  static dividerList = {};
  static divideCnt = 0;
  static class = Tn;
  static name = "Dividers";
  static type = "Divider";
  static create(e, i) {
    const s = `${i.core.id}_divider_${++le.divideCnt}`;
    return i.id = s, le.dividerList[s] = new le(e, i), le.dividerList[s];
  }
  static destroy() {
    for (let e in le.dividerList) le.dividerList[e].destroy();
    delete le.dividerList[id];
  }
  static defaultNode() {
    return `
  <div slot="widget" class="${Tn}" style="position: absolute;"></div>
  `;
  }
  constructor(e, i) {
    const s = {
      ...i
    };
    this.#i = e, this.#t = s.core, this.#n = s, this.#r = s.core.theme, this.#e = s.id, this.#s = s.chartPane, this.#l = e.elements.elDividers, this.init();
  }
  get el() {
    return this.#o;
  }
  get id() {
    return this.#e;
  }
  get chartPane() {
    return this.#s;
  }
  get config() {
    return this.#t.config;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return D.elementDimPos(this.#o);
  }
  get height() {
    return this.#o.getBoundingClientRect().height;
  }
  set cursor(e) {
    this.setCursorStyle(e);
  }
  get cursor() {
    return this.#a;
  }
  get type() {
    return le.type;
  }
  init() {
    this.mount();
  }
  start() {
    this.cursor = "row-resize", this.eventsListen();
  }
  destroy() {
    this.#h.destroy(), this.el.remove(), delete le.dividerList[this.id];
  }
  eventsListen() {
    this.#h = new Le(this.#o, {
      disableContextMenu: !1
    }), this.#h.on("pointerover", this.onMouseEnter.bind(this)), this.#h.on("pointerout", this.onMouseOut.bind(this)), this.#h.on("pointerdrag", this.onPointerDrag.bind(this)), this.#h.on("pointerdragend", this.onPointerDragEnd.bind(this));
  }
  on(e, i, s) {
    this.#t.on(e, i, s);
  }
  off(e, i) {
    this.#t.off(e, i);
  }
  emit(e, i) {
    this.#t.emit(e, i);
  }
  onMouseEnter() {
    this.#o.style.background = this.#r.divider.active, this.#t.MainPane.onMouseEnter();
  }
  onMouseOut() {
    this.#o.style.background = this.#r.divider.idle, this.#t.MainPane.onMouseEnter();
  }
  onPointerDrag(e) {
    this.#c = this.#t.MainPane.cursorPos, this.#o.style.background = this.#r.divider.active, this.emit(`${this.id}_pointerdrag`, this.#c), this.emit("divider_pointerdrag", {
      id: this.id,
      e,
      pos: this.#c,
      chartPane: this.chartPane
    }), this.chartPane.resize();
  }
  onPointerDragEnd(e) {
    "position" in e && (this.#o.style.background = this.#r.divider.idle), this.#c = this.#t.MainPane.cursorPos, this.emit(`${this.id}_pointerdragend`, this.#c), this.emit("divider_pointerdragend", {
      id: this.id,
      e,
      pos: this.#c,
      chartPane: this.chartPane
    }), this.chartPane.resize();
  }
  mount() {
    this.#l.lastElementChild == null ? this.#l.innerHTML = this.dividerNode() : this.#l.lastElementChild.insertAdjacentHTML("afterend", this.dividerNode()), this.#o = D.findBySelector(`#${this.#e}`, this.#l);
  }
  dividerNode() {
    let e = this.#t.theme,
      i = this.#s.pos.top - D.elementDimPos(this.#l).top,
      s = this.#t.MainPane.rowsW + this.#t.scaleW,
      n = T(this.config.dividerHeight) ? this.config.dividerHeight : Ya,
      o = e.tools.width;
    switch (i -= n / 2, e.tools.location) {
      case "left":
        break;
      case !1:
      case "none":
      case "right":
        o *= -1;
        break;
    }
    const a = `position: absolute; top: ${i}px; left: ${o}px; z-index:100; width: ${s}px; height: ${n}px; background: ${e.divider.idle};`,
      l = `width: 100%; margin: 3.5px 0; border: 0; border-top: ${e.divider.style} ${e.divider.line};`;
    return `
      <div id="${this.#e}" class="divider" style="${a}"><hr style="${l}"></div>
    `;
  }
  setPos() {
    let e = this.#s.pos.top - D.elementDimPos(this.#l).top;
    e = e - this.height / 2 + 1, this.#o.style.top = `${e}px`;
  }
  setWidth() {
    this.#o.style.width = `${this.#t.MainPane.width}px`;
  }
  setCursorStyle(e) {
    E(e) && (this.#a = e, this.#o.style.cursor = e);
  }
  hide() {
    this.#o.style.display = "none";
  }
  show() {
    this.#o.style.display = "block";
  }
}
const ql = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4" ><path d="M471.993 112h-89.2l-16.242-46.75a32.023 32.023 0 00-30.229-21.5H175.241a31.991 31.991 0 00-30.294 21.691L129.1 112H40a24.027 24.027 0 00-24 24v312a24.027 24.027 0 0024 24h431.993a24.027 24.027 0 0024-24V136a24.027 24.027 0 00-24-24zm-8 328H48.007V144h104.01l23.224-68.25h161.081l23.71 68.25h103.961z" class="ci-primary"></path><path d="M256 168a114 114 0 10114 114 114.13 114.13 0 00-114-114zm0 196a82 82 0 1182-82 82.093 82.093 0 01-82 82z"></path></svg>',
  Xl = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M376 160v32h65.372L252 381.373l-72-72L76.686 412.686l22.628 22.628L180 354.627l72 72 212-211.999V280h32V160H376z"></path><path d="M48 104H16v392h480v-32H48V104z"></path></svg>',
  Kl = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M271.514 95.5h-32v178.111l115.613 54.948 13.737-28.902-97.35-46.268V95.5z"></path><path d="M256 16C123.452 16 16 123.452 16 256s107.452 240 240 240 240-107.452 240-240S388.548 16 256 16zm0 448c-114.875 0-208-93.125-208-208S141.125 48 256 48s208 93.125 208 208-93.125 208-208 208z"></path></svg>',
  Lr = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M245.151 168a88 88 0 1088 88 88.1 88.1 0 00-88-88zm0 144a56 56 0 1156-56 56.063 56.063 0 01-56 56z"></path><path d="M464.7 322.319l-31.77-26.153a193.081 193.081 0 000-80.332l31.77-26.153a19.941 19.941 0 004.606-25.439l-32.612-56.483a19.936 19.936 0 00-24.337-8.73l-38.561 14.447a192.038 192.038 0 00-69.54-40.192l-6.766-40.571A19.936 19.936 0 00277.762 16H212.54a19.937 19.937 0 00-19.728 16.712l-6.762 40.572a192.03 192.03 0 00-69.54 40.192L77.945 99.027a19.937 19.937 0 00-24.334 8.731L21 164.245a19.94 19.94 0 004.61 25.438l31.767 26.151a193.081 193.081 0 000 80.332l-31.77 26.153A19.942 19.942 0 0021 347.758l32.612 56.483a19.937 19.937 0 0024.337 8.73l38.562-14.447a192.03 192.03 0 0069.54 40.192l6.762 40.571A19.937 19.937 0 00212.54 496h65.222a19.936 19.936 0 0019.728-16.712l6.763-40.572a192.038 192.038 0 0069.54-40.192l38.564 14.449a19.938 19.938 0 0024.334-8.731l32.609-56.487a19.939 19.939 0 00-4.6-25.436zm-50.636 57.12l-48.109-18.024-7.285 7.334a159.955 159.955 0 01-72.625 41.973l-10 2.636L267.6 464h-44.89l-8.442-50.642-10-2.636a159.955 159.955 0 01-72.625-41.973l-7.285-7.334-48.117 18.024L53.8 340.562l39.629-32.624-2.7-9.973a160.9 160.9 0 010-83.93l2.7-9.972L53.8 171.439l22.446-38.878 48.109 18.024 7.285-7.334a159.955 159.955 0 0172.625-41.973l10-2.636L222.706 48H267.6l8.442 50.642 10 2.636a159.955 159.955 0 0172.625 41.973l7.285 7.334 48.109-18.024 22.447 38.877-39.629 32.625 2.7 9.972a160.9 160.9 0 010 83.93l-2.7 9.973 39.629 32.623z"></path></svg>',
  jl = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><rect x="16" y="240.18" width="188.84" height="31.635"/><g transform="translate(-3.3234e-7 -112.18)"><rect x="307.16" y="352.37" width="188.84" height="31.635"/></g><rect transform="rotate(-90)" x="-496" y="240.18" width="188.84" height="31.635"/><rect transform="rotate(-90)" x="-204.84" y="240.18" width="188.84" height="31.635"/></svg>',
  Zl = '<svg width="46.08" height="46.08" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6.535 3H21a1 1 0 011 1v16a1 1 0 01-1 1H6.535a1 1 0 01-.832-.445l-5.333-8a1 1 0 010-1.11l5.333-8A1 1 0 016.535 3zm.535 2l-4.666 7 4.666 7H20V5H7.07zM13 10.586l2.828-2.829 1.415 1.415L14.414 12l2.829 2.828-1.415 1.415L13 13.414l-2.828 2.829-1.415-1.415L11.586 12 8.757 9.172l1.415-1.415L13 10.586z"></path></svg>',
  Jl = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><g stroke-width="30.155"><rect x="14.757" y="240.92" width="482.49" height="30.155" rx="15.078"/><rect x="14.757" y="147" width="482.49" height="30.155" rx="15.078"/><rect x="14.757" y="334.84" width="482.49" height="30.155" rx="15.078"/></g ><g transform="translate(5.937 -288.34)"><path d="m23.904 712.34c-8.3532 0-15.078 6.7252-15.078 15.078s6.7249 15.078 15.078 15.078h173.93c-0.65295-3.3651-2.0312-6.4697-2.0312-10.026 0-7.1393 1.5573-13.888 4.0625-20.13zm276.35 0c2.5051 6.2423 4.0365 12.991 4.0365 20.13 0 3.5554-1.3526 6.6618-2.0052 10.026h173.93c8.3532 0 15.078-6.7252 15.078-15.078s-6.7249-15.078-15.078-15.078z"/><path d="m250.06 759.97c17.965 0 32.545-14.58 32.545-32.545 0-17.965-14.58-32.545-32.545-32.545-17.965 0-32.545 14.58-32.545 32.545 0 17.965 14.58 32.545 32.545 32.545zm0 21.697c-29.964 0-54.242-24.279-54.242-54.242 0-29.964 24.279-54.242 54.242-54.242 29.964 0 54.242 24.279 54.242 54.242 0 29.964-24.279 54.242-54.242 54.242z" stroke-width="21.697"/></g ><path d="m144.05 18.672c-24.694 0-45.285 16.595-51.849 39.167h-62.37c-8.3532 0-15.078 6.7252-15.078 15.078s6.7249 15.078 15.078 15.078h62.37c6.5639 22.572 27.155 39.167 51.849 39.167s45.285-16.595 51.849-39.167h120.03c6.5639 22.572 27.155 39.167 51.849 39.167 24.694 0 45.285-16.595 51.849-39.167h62.552c8.3532 0 15.078-6.7252 15.078-15.078s-6.7249-15.078-15.078-15.078h-62.552c-6.5639-22.572-27.155-39.167-51.849-39.167-24.694 0-45.285 16.595-51.849 39.167h-120.03c-6.5639-22.572-27.155-39.167-51.849-39.167zm0 21.693c17.965 0 32.552 14.587 32.552 32.552 0 17.965-14.587 32.552-32.552 32.552-17.965 1e-5 -32.552-14.587-32.552-32.552 0-17.965 14.587-32.552 32.552-32.552zm223.72 0c17.965 0 32.552 14.587 32.552 32.552 0 17.965-14.587 32.552-32.552 32.552-17.965 0-32.552-14.587-32.552-32.552 0-17.965 14.587-32.552 32.552-32.552z" stroke-width="30.155"/></svg>',
  et = '<svg width="46.08" height="46.08" version="1.1" viewBox="-51.2 -51.2 614.4 614.4"><g transform="matrix(21.697 0 0 21.697 -47.758 -47.758)"><path d="m7.354 21.354 14-14-0.707-0.707-14 14z"/><path d="m22.5 7c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zm-17 16c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5-1.5 0.672-1.5 1.5 0.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"/></g></svg>',
  Ql = '<svg width="46.08" height="46.08" viewBox="0 0 32 32"><path d="M 3.2758709,20.241377 11.758622,28.72413 28.72413,11.758622 20.241377,3.2758709 Z m 2.1206881,0 1.5905161,-1.590515 3.7112049,3.711203 1.060342,-1.060345 -3.7112027,-3.711204 1.0603441,-1.060344 2.1206876,2.12069 1.060346,-1.060346 -2.120689,-2.120688 1.060343,-1.060344 3.711203,3.711203 L 16,17.060346 l -3.711203,-3.711208 1.060341,-1.060341 2.12069,2.120687 1.060344,-1.060346 -2.120688,-2.120687 1.060344,-1.060343 3.711204,3.711205 1.060345,-1.060345 -3.711205,-3.7112046 1.060344,-1.0603441 2.120687,2.1206887 1.060346,-1.0603446 -2.120687,-2.1206883 1.590515,-1.5905161 6.362065,6.362063 -14.84482,14.84482 z" style="stroke-width:0.749776" /></svg>',
  eh = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><g id="g930" transform="matrix(21.128963,0,0,21.128963,-29.235597,-50.369964)"><path clip-rule="evenodd" d="m 4.5,5 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,6.5 A 2.5,2.5 0 0 1 6.95,6 H 24 V 7 H 6.95 A 2.5,2.5 0 0 1 2,6.5 Z M 4.5,15 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,16.5 A 2.5,2.5 0 0 1 6.95,16 h 13.1 a 2.5,2.5 0 1 1 0,1 H 6.95 A 2.5,2.5 0 0 1 2,16.5 Z M 22.5,15 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z m -18,6 a 1.5,1.5 0 1 0 0,3 1.5,1.5 0 0 0 0,-3 z M 2,22.5 A 2.5,2.5 0 0 1 6.95,22 H 24 v 1 H 6.95 A 2.5,2.5 0 0 1 2,22.5 Z" id="path908" /><path clip-rule="evenodd" d="M 22.4,8.94 21.01,9.57 20.6,8.66 21.99,8.03 Z m -4,1.8 -1.39,0.63 -0.41,-0.91 1.39,-0.63 z m -4,1.8 -1.4,0.63 -0.4,-0.91 1.39,-0.63 z m -4,1.8 L 9,14.97 8.6,14.06 9.99,13.43 Z" id="path910" /></g></svg>',
  th = '<svg width="46.08" height="46.08" viewBox="-51.2 -51.2 614.4 614.4"><path d="M231.359 147l-80.921 205h45.155l15.593-39.5h89.628l15.593 39.5h45.155l-80.921-205zm-3.594 123.5L256 198.967l28.235 71.533z"></path><path d="M384 56H128V16H16v112h40v256H16v112h112v-40h256v40h112V384h-40V128h40V16H384zM48 96V48h48v48zm48 368H48v-48h48zm288-40H128v-40H88V128h40V88h256v40h40v256h-40zm80-8v48h-48v-48zM416 48h48v48h-48z"></path></svg>',
  ih = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g718" transform="translate(0,1.2499996)"><path d="M 7.5010125,7.9560661 5.355012,10.103066 c -0.472,0.472 -1.18,-0.2360003 -0.708,-0.7080003 L 7.6470125,6.3950659 c 0.195364,-0.195858 0.512636,-0.195858 0.708,0 l 3.0000005,2.9999998 c 0.472,0.472 -0.236,1.1800003 -0.708,0.7080003 L 8.5010125,7.9560661 c -0.431103,-0.417289 -0.523896,-0.423024 -1,0 z" style="" id="path566-5" /><path d="m 7.4989873,5.5439348 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.195858 0.5126361,0.195858 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></g></svg>',
  sh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 7.4989873,7.7026182 -2.1460003,2.147 c -0.472,0.4719998 -1.18,-0.236 -0.708,-0.708 l 3.0000003,-3 c 0.1953639,-0.1958581 0.5126361,-0.1958581 0.708,0 l 2.9999997,3 c 0.472,0.472 -0.236,1.1799998 -0.708,0.708 l -2.1459997,-2.147 c -0.4311027,-0.417289 -0.5238956,-0.423024 -1,0 z" style="" id="path566-6-3" /></svg>',
  nh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 7.4989873,8.2973819 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.1958581 0.5126361,0.1958581 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></svg>',
  rh = '<svg width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="m1 14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1h-12a1 1 0 0 0-1 1zm15 0a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-8.5-2.5a0.5 0.5 0 0 0 1 0v-5.793l2.146 2.147a0.50063 0.50063 0 1 0 0.708-0.708l-3-3a0.5 0.5 0 0 0-0.708 0l-3 3a0.50063 0.50063 0 0 0 0.708 0.708l2.146-2.147z" fill-rule="evenodd"/></svg>',
  oh = '<svg width="46.08" height="46.08" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M 15,2 A 1,-1 0 0 0 14,1 H 2 A 1,-1 0 0 0 1,2 v 12 a 1,-1 0 0 0 1,1 h 12 a 1,-1 0 0 0 1,-1 z M 0,2 A 2,-2 0 0 1 2,0 h 12 a 2,-2 0 0 1 2,2 v 12 a 2,-2 0 0 1 -2,2 H 2 A 2,-2 0 0 1 0,14 Z m 8.5,2.5 a 0.5,-0.5 0 0 0 -1,0 v 5.793 L 5.354,8.146 A 0.5006316,-0.5006316 0 1 0 4.646,8.854 l 3,3 a 0.5,-0.5 0 0 0 0.708,0 l 3,-3 A 0.5006316,-0.5006316 0 0 0 10.646,8.146 L 8.5,10.293 Z" id="path2" /></svg>',
  ah = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g687" transform="translate(15.647255,-0.0288128)"><path d="m -8.1462425,10.484879 -2.1460005,2.146999 c -0.472,0.472 -1.18,-0.236 -0.708,-0.708 l 3.0000005,-2.9999994 c 0.195364,-0.195858 0.512636,-0.195858 0.708,0 l 3.0000005,2.9999994 c 0.472,0.472 -0.236,1.18 -0.708,0.708 l -2.1460005,-2.146999 c -0.431103,-0.417289 -0.523896,-0.423024 -1,0 z" style="" id="path566-5" /><path d="m -8.1482677,5.5727476 -2.1460003,-2.147 c -0.472,-0.472 -1.18,0.236 -0.708,0.708 l 3.0000003,3 c 0.1953639,0.195858 0.5126361,0.195858 0.708,0 l 2.9999997,-3 c 0.472,-0.472 -0.236,-1.18 -0.708,-0.708 l -2.1459997,2.147 c -0.4311027,0.417289 -0.5238956,0.423024 -1,0 z" style="" id="path566-6-3" /></g></svg>',
  lh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><g id="g611" transform="translate(0.2050748,-0.8829888)"><path d="m 7.2959375,11.933818 -2.146,-2.1469999 c -0.472,-0.4719998 -1.18,0.2359999 -0.708,0.7079999 l 3,3 c 0.195364,0.195858 0.512636,0.195858 0.708,0 l 3.0000005,-3 c 0.472,-0.472 -0.236,-1.1799997 -0.708,-0.7079999 L 8.2959375,11.933818 c -0.431103,0.417289 -0.523896,0.423024 -1,0 z" style="" id="path566" /><path d="m 7.2939123,5.8321596 -2.146,2.147 c -0.4719998,0.472 -1.1799998,-0.236 -0.708,-0.708 l 3,-3 c 0.1953639,-0.195858 0.5126361,-0.195858 0.708,0 l 2.9999997,3 c 0.472,0.472 -0.236,1.18 -0.708,0.708 l -2.1459997,-2.147 c -0.4311027,-0.417289 -0.5238956,-0.423024 -1,0 z" style="" id="path566-6" /></g></svg>',
  hh = '<svg style="width: 46px; height: 46px" viewBox="-1.6 -1.6 19.2 19.2"><path d="M 15,2 C 15,1.4477153 14.552285,1 14,1 H 2 C 1.4477153,1 1,1.4477153 1,2 v 12 c 0,0.552285 0.4477153,1 1,1 h 12 c 0.552285,0 1,-0.447715 1,-1 z M 0,2 C 0,0.8954305 0.8954305,0 2,0 h 12 c 1.104569,0 2,0.8954305 2,2 v 12 c 0,1.104569 -0.895431,2 -2,2 H 2 C 0.8954305,16 0,15.104569 0,14 Z" id="path2" /><path d="m 11.500447,8.5 c 0.666666,0 0.666666,-1 0,-1 H 4.444275 c -0.1571231,0 -0.224029,0.07336 -0.2978281,0.1459999 -0.1958579,0.195364 -0.1958579,0.5126361 0,0.7080001 0,0 0.113806,0.146 0.320186,0.146 z" style="" id="path887" /></svg>',
  ch = '<svg style="height:46px;width:46px" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <g fill-rule="evenodd">  <path d="m15 2c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1h12c0.55228 0 1-0.44772 1-1zm-15 0c0-1.1046 0.89543-2 2-2h12c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2z"/>  <path d="m4.4449 4.097c-0.01964 0-0.037678 0.0018-0.054687 0.0039-0.017011 0.0022-0.034068 0.0058-0.048828 0.0098-0.014761 4e-3 -0.028126 0.0081-0.041016 0.01367-0.012889 0.0056-0.025711 0.01268-0.037109 0.01953-0.022796 0.01371-0.041442 0.02783-0.060547 0.04492s-0.038191 0.03653-0.056641 0.05469c-0.024482 0.02442-0.046092 0.05037-0.064453 0.07813-0.018362 0.02775-0.032681 0.05776-0.044922 0.08789s-0.021223 0.06023-0.027344 0.0918c-0.00612 0.03156-0.00977 0.06366-0.00977 0.0957 0 8e-3 -4.378e-4 0.01543 0 0.02344v1.2988c0 0.02083 6.41e-5 0.04102 0.00195 0.06055 0.00189 0.01953 0.0061 0.03841 0.00977 0.05664 0.00366 0.01823 0.00836 0.03581 0.013672 0.05273 0.00531 0.01693 0.010742 0.0332 0.017578 0.04883 0.013672 0.03125 0.029785 0.0599 0.048828 0.08594s0.041016 0.04948 0.064453 0.07031 0.049316 0.03906 0.076172 0.05469c0.026855 0.01563 0.054687 0.02865 0.083984 0.03906 0.029297 0.01042 0.059082 0.01823 0.089844 0.02344 0.030762 0.0052 0.0625 0.0078 0.09375 0.0078s0.062988-0.0026 0.09375-0.0078 0.060547-0.01302 0.089844-0.02344 0.057129-0.02344 0.083984-0.03906c0.026855-0.01563 0.052734-0.03385 0.076172-0.05469 0.023437-0.02083 0.04541-0.04427 0.064453-0.07031s0.035156-0.05469 0.048828-0.08594c0.00684-0.01563 0.012268-0.0319 0.017578-0.04883s0.01001-0.0345 0.013672-0.05273c0.00366-0.01823 0.00787-0.03711 0.00977-0.05664 0.00189-0.01953 0.00195-0.03971 0.00195-0.06055v-0.82227h6v0.98633c0 0.02083 2e-3 0.04102 0.0039 0.06055s0.0042 0.03841 0.0078 0.05664c0.0037 0.01823 0.0084 0.03581 0.01367 0.05273 0.0053 0.01693 0.01074 0.0332 0.01758 0.04883 0.01367 0.03125 0.03174 0.0599 0.05078 0.08594s0.03906 0.04948 0.0625 0.07031 0.04932 0.03906 0.07617 0.05469c0.02686 0.01563 0.05469 0.02865 0.08399 0.03906 0.0293 0.01042 0.06104 0.01823 0.0918 0.02344 0.03076 0.0052 0.06055 0.0078 0.0918 0.0078s0.06299-0.0026 0.09375-0.0078 0.06055-0.01302 0.08984-0.02344c0.0293-0.01042 0.05908-0.02344 0.08594-0.03906 0.02686-0.01563 0.05078-0.03385 0.07422-0.05469 0.02344-0.02083 0.04541-0.04427 0.06445-0.07031s0.03516-0.05469 0.04883-0.08594c0.0068-0.01563 0.01422-0.0319 0.01953-0.04883 0.0053-0.01693 0.01001-0.0345 0.01367-0.05273 0.0037-0.01823 0.0059-0.03711 0.0078-0.05664s2e-3 -0.03971 2e-3 -0.06055v-1.4629c3.25e-4 -0.0078 0-0.01563 0-0.02344 0-0.03125-0.0026-0.06299-0.0078-0.09375s-0.01302-0.06055-0.02344-0.08984c-0.01042-0.0293-0.02344-0.05713-0.03906-0.08398-0.01563-0.02685-0.03385-0.05273-0.05469-0.07617-0.02083-0.02344-0.04427-0.04541-0.07031-0.06445s-0.05469-0.03516-0.08594-0.04883c-0.01563-0.0068-0.0319-0.01227-0.04883-0.01758-0.01693-0.0053-0.0345-0.01001-0.05273-0.01367-0.01823-0.0037-0.03711-0.0059-0.05664-0.0078s-0.03971-0.0039-0.06055-0.0039h-6.5z"/>  <path d="m11.555 11.903c0.01964 0 0.03768-0.0018 0.05469-0.0039 0.01701-0.0022 0.03407-0.0058 0.04883-0.0098s0.02813-0.0081 0.04102-0.01367c0.01289-0.0056 0.02571-0.01268 0.03711-0.01953 0.0228-0.01371 0.04144-0.02783 0.06055-0.04492 0.0191-0.01709 0.03819-0.03653 0.05664-0.05469 0.02448-0.02442 0.04609-0.05037 0.06445-0.07813 0.01836-0.02775 0.03268-0.05776 0.04492-0.08789s0.02122-0.06023 0.02734-0.0918c0.0061-0.03156 0.0098-0.06366 0.0098-0.0957 0-8e-3 4.38e-4 -0.01543 0-0.02344v-1.2988c0-0.02083-6.4e-5 -0.04102-2e-3 -0.06055-0.0019-0.01953-0.0061-0.03841-0.0098-0.05664s-0.0084-0.03581-0.01367-0.05273c-0.0053-0.01693-0.01074-0.0332-0.01758-0.04883-0.01367-0.03125-0.02979-0.0599-0.04883-0.08594s-0.04102-0.04948-0.06445-0.07031c-0.02344-0.02083-0.04932-0.03906-0.07617-0.05469s-0.05469-0.02865-0.08398-0.03906c-0.0293-0.01042-0.05908-0.01823-0.08984-0.02344-0.03076-0.0052-0.0625-0.0078-0.09375-0.0078s-0.06299 0.0026-0.09375 0.0078-0.06055 0.01302-0.08984 0.02344c-0.0293 0.01042-0.05713 0.02344-0.08398 0.03906-0.02685 0.01563-0.05273 0.03385-0.07617 0.05469-0.02344 0.02083-0.04541 0.04427-0.06445 0.07031s-0.03516 0.05469-0.04883 0.08594c-0.0068 0.01563-0.01227 0.0319-0.01758 0.04883-0.0053 0.01693-0.01001 0.0345-0.01367 0.05273-0.0037 0.01823-0.0079 0.03711-0.0098 0.05664s-0.0019 0.03971-0.0019 0.06055v0.82227h-6v-0.98633c0-0.02083-2e-3 -0.04102-0.0039-0.06055s-0.0042-0.03841-0.0078-0.05664c-0.0037-0.01823-0.0084-0.03581-0.01367-0.05273-0.0053-0.01693-0.01074-0.0332-0.01758-0.04883-0.01367-0.03125-0.03174-0.0599-0.05078-0.08594s-0.03906-0.04948-0.0625-0.07031-0.04932-0.03906-0.07617-0.05469c-0.02686-0.01563-0.05469-0.02865-0.08399-0.03906-0.0293-0.01042-0.06104-0.01823-0.0918-0.02344-0.03076-0.0052-0.06055-0.0078-0.0918-0.0078s-0.06299 0.0026-0.09375 0.0078-0.06055 0.01302-0.08984 0.02344c-0.0293 0.01042-0.05908 0.02344-0.08594 0.03906-0.02686 0.01563-0.05078 0.03385-0.07422 0.05469-0.02344 0.02083-0.04541 0.04427-0.06445 0.07031s-0.03516 0.05469-0.04883 0.08594c-0.0068 0.01563-0.01422 0.0319-0.01953 0.04883-0.0053 0.01693-0.01001 0.03451-0.01367 0.05273-0.0037 0.01823-0.0059 0.03711-0.0078 0.05664s-2e-3 0.03971-2e-3 0.06055v1.4629c-3.25e-4 0.0078 0 0.01563 0 0.02344 0 0.03125 0.0026 0.06299 0.0078 0.09375s0.01302 0.06055 0.02344 0.08984c0.01042 0.0293 0.02344 0.05713 0.03906 0.08398 0.01563 0.02685 0.03385 0.05273 0.05469 0.07617 0.02083 0.02344 0.04427 0.04541 0.07031 0.06445s0.05469 0.03516 0.08594 0.04883c0.01563 0.0068 0.0319 0.01227 0.04883 0.01758 0.01693 0.0053 0.0345 0.01001 0.05273 0.01367 0.01823 0.0037 0.03711 0.0059 0.05664 0.0078s0.03971 0.0039 0.06055 0.0039h6.5z"/></g></svg>',
  uh = '<svg style="height:46px;width:46px" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="m15 2c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1h12c0.55228 0 1-0.44772 1-1zm-15 0c0-1.1046 0.89543-2 2-2h12c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2z" fill-rule="evenodd"/> <path d="m13.291 7.7876c-1.0729-2.491-3.0911-4.0365-5.2687-4.0365-2.1776 0-4.1958 1.5456-5.2687 4.0365a0.53112 0.53112 0 0 0 0 0.4249c1.0729 2.491 3.0911 4.0365 5.2687 4.0365 2.1776 0 4.1959-1.5456 5.2687-4.0365a0.53112 0.53112 0 0 0 0-0.4249zm-5.2687 3.3992c-1.6836 0-3.277-1.2163-4.1958-3.1867 0.91884-1.9705 2.5122-3.1867 4.1958-3.1867 1.6837 0 3.277 1.2163 4.1959 3.1867-0.91884 1.9705-2.5122 3.1867-4.1959 3.1867zm0-5.3112a2.1245 2.1245 0 1 0 2.1245 2.1245 2.1245 2.1245 0 0 0-2.1245-2.1245zm0 3.1867a1.0622 1.0622 0 1 1 1.0622-1.0622 1.0622 1.0622 0 0 1-1.0622 1.0622z" stroke-width=".53112"/></svg>',
  dh = '<svg style="height:46px;width:46px" version="1.1" viewBox="-1.6 -1.6 19.2 19.2" xmlns="http://www.w3.org/2000/svg"> <path d="m15 2c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1h12c0.55228 0 1-0.44772 1-1zm-15 0c0-1.1046 0.89543-2 2-2h12c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2z" fill-rule="evenodd"/> <path d="m13.291 7.7876c-1.0729-2.491-3.0911-4.0365-5.2687-4.0365-2.1776 0-4.1958 1.5456-5.2687 4.0365a0.53112 0.53112 0 0 0 0 0.4249c1.0729 2.491 3.0911 4.0365 5.2687 4.0365 2.1776 0 4.1959-1.5456 5.2687-4.0365a0.53112 0.53112 0 0 0 0-0.4249zm-5.2687 3.3992c-1.6836 0-3.277-1.2163-4.1958-3.1867 0.91884-1.9705 2.5122-3.1867 4.1958-3.1867 1.6837 0 3.277 1.2163 4.1959 3.1867-0.91884 1.9705-2.5122 3.1867-4.1959 3.1867zm0-5.3112a2.1245 2.1245 0 1 0 2.1245 2.1245 2.1245 2.1245 0 0 0-2.1245-2.1245zm0 3.1867a1.0622 1.0622 0 1 1 1.0622-1.0622 1.0622 1.0622 0 0 1-1.0622 1.0622z" stroke-width=".53112"/> <path d="m12.757 3.0055c-0.11087 0.0051358-0.22696 0.051177-0.33008 0.1543l-4.9883 4.9902c-0.061946 0.061947-0.086644 0.12038-0.097656 0.17773l-4.8184 4.8164c-0.1111 0.1111-0.1066 0.2109-0.10742 0.31445-3.5e-4 0.27663 0.22337 0.50035 0.5 0.5 0 0 0.18415 0.022881 0.33008-0.12305l4.9746-4.9727c0.06758-0.06758 0.10951-0.13979 0.13281-0.21289l4.7832-4.7832c0.36828-0.36828 0.017071-0.87967-0.37891-0.86133z" fill-rule="evenodd"/></svg>',
  mh = '<svg class="ov-icon" width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2"><path d="m14 15c0.55228 0 1-0.44772 1-1v-12c0-0.55228-0.44772-1-1-1h-12c-0.55228 0-1 0.44772-1 1v12c0 0.55228 0.44772 1 1 1zm0-15c1.1046 0 2 0.89543 2 2v12c0 1.1046-0.89543 2-2 2h-12c-1.1046 0-2-0.89543-2-2v-12c0-1.1046 0.89543-2 2-2z" fill-rule="evenodd"/><g transform="translate(-1.1585)" fill-rule="evenodd">  <path d="m8.2964 7.5-2.147-2.146c-0.472-0.472 0.236-1.18 0.708-0.708l3 3c0.19586 0.19536 0.19586 0.51264 0 0.708l-3 3c-0.472 0.472-1.18-0.236-0.708-0.708l2.147-2.146c0.41729-0.4311 0.42302-0.5239 0-1z"/>  <path d="m12.323 4.4996c0-0.66667-1-0.66667-1 0v7.0562c0 0.15712 0.07336 0.22403 0.146 0.29783 0.19536 0.19586 0.51264 0.19586 0.708 0 0 0 0.146-0.11381 0.146-0.32019z"/></g></svg>',
  ph = '<svg class="ov-icon" width="46.08" height="46.08" version="1.1" viewBox="-1.6 -1.6 19.2 19.2"><path d="m2 15c-0.55228 0-1-0.44772-1-1v-12c0-0.55228 0.44772-1 1-1h12c0.55228 0 1 0.44772 1 1v12c0 0.55228-0.44772 1-1 1zm0-15c-1.1046 0-2 0.89543-2 2v12c0 1.1046 0.89543 2 2 2h12c1.1046 0 2-0.89543 2-2v-12c0-1.1046-0.89543-2-2-2z" fill-rule="evenodd"/><g transform="matrix(-1 0 0 1 17.159 0)" fill-rule="evenodd">  <path d="m8.2964 7.5-2.147-2.146c-0.472-0.472 0.236-1.18 0.708-0.708l3 3c0.19586 0.19536 0.19586 0.51264 0 0.708l-3 3c-0.472 0.472-1.18-0.236-0.708-0.708l2.147-2.146c0.41729-0.4311 0.42302-0.5239 0-1z"/>  <path d="m12.323 4.4996c0-0.66667-1-0.66667-1 0v7.0562c0 0.15712 0.07336 0.22403 0.146 0.29783 0.19536 0.19586 0.51264 0.19586 0.708 0 0 0 0.146-0.11381 0.146-0.32019z"/></g></svg>',
  gh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 336.96 336.36" xmlns="http://www.w3.org/2000/svg"><path d="m0 0 168.48 336.36 168.48-336.36z"/></svg>',
  fh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 336.96 336.36" xmlns="http://www.w3.org/2000/svg"><path d="m0 336.36 168.48-336.36 168.48 336.36z"/></svg>',
  yh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0 70.67-28.66 134.68-74.99 181.01s-110.34 74.99-181.01 74.99c-70.68 0-134.69-28.66-181.01-74.99-46.33-46.33-74.99-110.34-74.99-181.01 0-70.68 28.66-134.69 74.99-181.01 46.32-46.33 110.33-74.99 181.01-74.99 70.67 0 134.68 28.66 181.01 74.99 46.33 46.32 74.99 110.33 74.99 181.01zm-204.29-21.97v-67.04c0-7.53-6.19-13.72-13.73-13.72h-75.96c-7.53 0-13.72 6.17-13.72 13.72v67.03h-42.84c-16.5 0-24.78 19.64-13.86 31.54l94.74 110.57c7.44 9 21.03 9.01 28.66 0.37l93.71-111.31c10.69-12.27 1.64-31.14-14.19-31.16h-42.81zm105.52 179.2c40.22-40.24 65.11-95.84 65.11-157.23 0-61.4-24.89-117-65.11-157.23-40.24-40.23-95.84-65.11-157.23-65.11-61.4 0-117 24.88-157.23 65.11s-65.11 95.83-65.11 157.23c0 61.39 24.88 116.99 65.11 157.23 40.23 40.22 95.83 65.11 157.23 65.11 61.39 0 116.99-24.89 157.23-65.11z" fill-rule="nonzero"/></svg>',
  vh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0-70.67-28.66-134.68-74.99-181.01s-110.34-74.99-181.01-74.99c-70.68 0-134.69 28.66-181.01 74.99-46.33 46.33-74.99 110.34-74.99 181.01 0 70.68 28.66 134.69 74.99 181.01 46.32 46.33 110.33 74.99 181.01 74.99 70.67 0 134.68-28.66 181.01-74.99 46.33-46.32 74.99-110.33 74.99-181.01zm-204.29 21.97v67.04c0 7.53-6.19 13.72-13.73 13.72h-75.96c-7.53 0-13.72-6.17-13.72-13.72v-67.03h-42.84c-16.5 0-24.78-19.64-13.86-31.54l94.74-110.57c7.44-9 21.03-9.01 28.66-0.37l93.71 111.31c10.69 12.27 1.64 31.14-14.19 31.16zm105.52-179.2c40.22 40.24 65.11 95.84 65.11 157.23 0 61.4-24.89 117-65.11 157.23-40.24 40.23-95.84 65.11-157.23 65.11-61.4 0-117-24.88-157.23-65.11s-65.11-95.83-65.11-157.23c0-61.39 24.88-116.99 65.11-157.23 40.23-40.22 95.83-65.11 157.23-65.11 61.39 0 116.99 24.89 157.23 65.11z" fill-rule="nonzero"/></svg>',
  wh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M512 256c0-70.67-28.66-134.68-74.98-181.02C390.69 28.66 326.68 0 256 0S121.31 28.66 74.98 74.98C28.66 121.32 0 185.33 0 256c0 70.68 28.66 134.69 74.98 181.02C121.31 483.34 185.32 512 256 512c70.67 0 134.69-28.66 181.02-74.98C483.34 390.69 512 326.68 512 256zm-160.23-21.5h-43.38v-67.93c0-7.63-6.27-13.9-13.91-13.9H217.5c-7.62 0-13.9 6.25-13.9 13.9v67.92h-43.41c-16.71 0-25.11 19.9-14.05 31.96l96.01 112.05c7.54 9.12 21.31 9.12 29.04.37l94.96-112.8c10.83-12.43 1.66-31.55-14.38-31.57z"/></svg>',
  xh = '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m512 256c0 70.67-28.66 134.68-74.98 181.02-46.33 46.32-110.34 74.98-181.02 74.98s-134.69-28.66-181.02-74.98c-46.32-46.34-74.98-110.35-74.98-181.02 0-70.68 28.66-134.69 74.98-181.02 46.33-46.32 110.34-74.98 181.02-74.98 70.67 0 134.69 28.66 181.02 74.98 46.32 46.33 74.98 110.34 74.98 181.02zm-160.23 21.5h-43.38v67.93c0 7.63-6.27 13.9-13.91 13.9h-76.98c-7.62 0-13.9-6.25-13.9-13.9v-67.92h-43.41c-16.71 0-25.11-19.9-14.05-31.96l96.01-112.05c7.54-9.12 21.31-9.12 29.04-0.37l94.96 112.8c10.83 12.43 1.66 31.55-14.38 31.57z"/></svg>',
  bh = '<svg width="800px" height="800px" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">  <defs>   <clipPath id="clipPath1">    <path d="m6.1885 15.281v-9.0209h3.1721q1.0764 0 1.6765 0.65299 0.63822 0.71345 0.63822 1.7171 0 0.58043-0.22862 1.0158-0.21909 0.42323-0.743 0.84646 1.1812 0.87065 1.1812 2.1887 0 0.53206-0.19051 1.0762-0.19051 0.53206-0.51439 0.87065-0.60964 0.65299-1.7908 0.65299zm1.467-7.4731v2.0315h1.5813q1.0383 0 1.0383-1.0158 0-1.0158-1.0383-1.0158zm0 3.5793v2.3459h1.7432q1.0859 0 1.0859-1.1609 0-1.185-1.0859-1.185zm9.6876-5.1271h1.467v6.1066q0 1.4874-0.69538 2.2854-0.80016 0.91902-2.1242 0.91902t-2.1242-0.91902q-0.69538-0.79809-0.69538-2.2854v-6.1066h1.4574v6.1066q0 1.6083 1.3622 1.6083 1.3526 0 1.3526-1.6083zm6.2108 5.6834v3.3375h-1.467v-3.3375l-2.3528-5.6834h1.6289l1.4479 3.9784 1.3622-3.9784h1.6384z" display="none" stroke-width=".041213" style="white-space:pre" aria-label="BUY"/>    <path class="powerclip" d="m-5-5h42v42.001h-42zm11.189 20.281h3.2006q1.1812 0 1.7908-0.65299 0.32387-0.33859 0.51439-0.87065 0.19051-0.54416 0.19051-1.0762 0-1.3181-1.1812-2.1887 0.52391-0.42323 0.743-0.84646 0.22862-0.43532 0.22862-1.0158 0-1.0037-0.63822-1.7171-0.60012-0.65299-1.6765-0.65299h-3.1721zm1.467-7.4731v2.0315h1.5813q1.0383 0 1.0383-1.0158 0-1.0158-1.0383-1.0158zm0 3.5793v2.3459h1.7432q1.0859 0 1.0859-1.1609 0-1.185-1.0859-1.185zm9.6876-5.1271v6.1066q0 1.6083-1.3526 1.6083-1.3622 0-1.3622-1.6083v-6.1066h-1.4574v6.1066q0 1.4874 0.69538 2.2854 0.80016 0.91902 2.1242 0.91902t2.1242-0.91902q0.69538-0.79809 0.69538-2.2854v-6.1066zm6.2108 5.6834 2.2576-5.6834h-1.6384l-1.3622 3.9784-1.4479-3.9784h-1.6289l2.3528 5.6834v3.3375h1.467z" stroke-width=".041213" style="white-space:pre"/>   </clipPath>  </defs>  <g clip-path="url(#clipPath1)" fill="none" fill-rule="evenodd">   <g id="Icon-Set" transform="translate(-360 -255)" fill="#000">    <path d="m386.67 255h-21.334c-2.945 0-5.333 2.371-5.333 5.297v12.33c0 2.924 2.055 4.813 5 4.813h6.639l4.361 9.561 4.361-9.561h6.639c2.945 0 5-1.889 5-4.813v-12.33c0-2.926-2.388-5.297-5.333-5.297z"/>   </g>  </g> </svg>',
  Ch = '<svg width="800px" height="800px" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">  <defs>   <clipPath id="clipPath4">    <path d="m10.026 8.6238h-1.2531q-0.06962-1.4148-1.3576-1.4148-0.51344 0-0.81803 0.30231-0.30458 0.30231-0.30458 0.81019 0 0.49579 0.25237 0.74972 0.26107 0.24185 0.97467 0.43532l1.0182 0.26603q0.90505 0.24185 1.3054 0.83437 0.40901 0.59252 0.40901 1.6566 0 1.3785-0.7049 2.1524-0.69619 0.77391-1.958 0.77391-1.2444 0-1.9406-0.76182-0.68749-0.77391-0.74841-2.225h1.2967q0.03481 0.72554 0.40901 1.1125t1.053 0.38696q0.60917 0 0.95727-0.32649 0.3568-0.32649 0.3568-0.89483 0-0.54416-0.27848-0.83437-0.27848-0.30231-0.94856-0.4716l-0.90505-0.25394q-0.99208-0.26603-1.4098-0.81019-0.41772-0.55625-0.41772-1.6083 0-1.3181 0.64398-2.0436 0.65268-0.73763 1.8188-0.73763 1.4185 0 2.0886 1.0278 0.46123 0.71345 0.46123 1.8743zm2.5672 2.3822v2.3459h3.5245v1.5478h-4.8559v-9.0209h4.6993v1.5478h-3.3678v2.0315h3.1155v1.5478zm5.9612-5.1271v7.4731h3.1068v1.5478h-4.4469v-9.0209zm5.439 0v7.4731h3.1068v1.5478h-4.4469v-9.0209z" display="none" stroke-width=".039392" style="white-space:pre" aria-label="SELL"/>    <path class="powerclip" d="m-5-5h42v42.001h-42zm15.026 13.624q0-1.1609-0.46123-1.8743-0.67009-1.0278-2.0886-1.0278-1.1661 0-1.8188 0.73763-0.64398 0.72554-0.64398 2.0436 0 1.052 0.41772 1.6083 0.41772 0.54416 1.4098 0.81019l0.90505 0.25394q0.67009 0.16929 0.94856 0.4716 0.27848 0.29022 0.27848 0.83437 0 0.56834-0.3568 0.89483-0.3481 0.32649-0.95727 0.32649-0.67879 0-1.053-0.38696-0.3742-0.38695-0.40901-1.1125h-1.2967q0.060917 1.4511 0.74841 2.225 0.69619 0.76182 1.9406 0.76182 1.2619 0 1.958-0.77391 0.7049-0.77391 0.7049-2.1524 0-1.0641-0.40901-1.6566-0.40031-0.59252-1.3054-0.83437l-1.0182-0.26603q-0.7136-0.19348-0.97467-0.43532-0.25237-0.25394-0.25237-0.74972 0-0.50788 0.30458-0.81019t0.81803-0.30231q1.288 0 1.3576 1.4148zm2.5672 2.3822h3.1155v-1.5478h-3.1155v-2.0315h3.3678v-1.5478h-4.6993v9.0209h4.8559v-1.5478h-3.5245zm5.9612-5.1271h-1.3402v9.0209h4.4469v-1.5478h-3.1068zm5.439 0h-1.3402v9.0209h4.4469v-1.5478h-3.1068z" stroke-width=".039392" style="white-space:pre"/>   </clipPath>  </defs>  <path d="m26.667 0h-21.334c-2.945 0-5.333 2.371-5.333 5.297v12.33c0 2.924 2.055 4.813 5 4.813h6.639l4.361 9.561 4.361-9.561h6.639c2.945 0 5-1.889 5-4.813v-12.33c0-2.926-2.388-5.297-5.333-5.297z" clip-path="url(#clipPath4)" fill-rule="evenodd"/> </svg>',
  Th = '<svg width="493px" height="512px" clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" version="1.1" viewBox="0 0 493 511.77" xmlns="http://www.w3.org/2000/svg"><path d="m33.11 458.2 104.5-79.1c3.09-3 7.08-4.47 11.08-4.45l302.6-0.08c2.67 0 5.09-1.08 6.78-2.77 1.74-1.81 2.84-4.24 2.84-6.87v-323.2c0-2.59-1.12-5-2.86-6.74-1.78-1.78-4.2-2.9-6.76-2.9h-409.56c-2.54 0-4.94 1.14-6.72 2.92s-2.92 4.18-2.92 6.72c0 793.72 1.02 39.329 1.02 416.47zm90.6-229.77c10.9 0 19.74 8.85 19.74 19.74s-8.84 19.73-19.74 19.73c-10.89 0-19.73-8.84-19.73-19.73s8.84-19.74 19.73-19.74zm0-101.14c10.9 0 19.74 8.85 19.74 19.74s-8.84 19.74-19.74 19.74c-10.89 0-19.73-8.85-19.73-19.74s8.84-19.74 19.73-19.74zm61.72 138.89c-9.95 0-18.02-8.07-18.02-18.01 0-9.95 8.07-18.02 18.02-18.02h185.56c9.95 0 18.01 8.07 18.01 18.02 0 9.94-8.06 18.01-18.01 18.01zm0-101.13c-9.95 0-18.02-8.07-18.02-18.02 0-9.94 8.07-18.01 18.02-18.01h185.56c9.95 0 18.01 8.07 18.01 18.01 0 9.95-8.06 18.02-18.01 18.02zm-30.38 241.61-125.97 99.69c-2.96 3.32-7.24 5.42-12.01 5.42-8.85 0-17.07-7.1228-17.07-15.963v-454.08c0-11.4 4.77-21.88 12.31-29.42s18.02-12.31 29.42-12.31h409.56c11.4 0 21.9 4.74 29.45 12.29 7.5 7.51 12.26 17.96 12.26 29.44v323.2c0 11.48-4.7 21.95-12.24 29.49-7.61 7.54-18.05 12.24-29.47 12.24z" fill-rule="nonzero"/></svg>',
  Eh = '<svg width="800px" height="800px" fill="none" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m15.746 2.7281c-5.1207-2.0689-10.949 0.40512-13.018 5.5258-2.0689 5.1207 0.40512 10.949 5.5258 13.018 5.1207 2.0689 10.949-0.40508 13.018-5.5258 2.0689-5.1207-0.40508-10.949-5.5258-13.018zm-1.3378 8.3035-1.2703-0.51325c-0.21854-0.08829-0.32785-0.13246-0.3683-0.22775-0.04045-0.09529 0.0037-0.20461 0.09201-0.42314l1.6595-4.1073c0.33362-0.82575 0.50047-1.2387 0.33474-1.3523-0.16582-0.11359-0.49058 0.19103-1.1403 0.8003l-4.7426 4.4469c-1.0274 0.96338-1.541 1.445-1.4405 1.9835 0.10054 0.53837 0.75347 0.80216 2.0594 1.3298l1.2703 0.51325c0.21854 0.08829 0.32785 0.13246 0.3683 0.22775 0.04045 0.09529-0.0037 0.20461-0.09201 0.42314l-1.6595 4.1073c-0.33365 0.82582-0.50047 1.2387-0.33475 1.3523 0.16582 0.1136 0.49059-0.19104 1.1403-0.80025l4.7425-4.4469c1.0275-0.96346 1.5411-1.4451 1.4406-1.9836-0.10057-0.53838-0.75352-0.80218-2.0594-1.3298z" clip-rule="evenodd" fill-rule="evenodd"/></svg>',
  Sh = '<svg enable-background="new 0 0 100 100" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">  <g>   <rect transform="scale(-1)" x="-15" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-36.25" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.1s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-57.5" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.3s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-78.75" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.5s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>   <rect transform="scale(-1)" x="-100" y="-100" width="15" height="100">    <animate attributeName="height" attributeType="XML" begin="0.1s" dur="1s" repeatCount="indefinite" values="30; 100; 30"/>   </rect>  </g> </svg>',
  Ph = '<svg version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">   <path fill="#fff" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="3s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path> <path fill="#fff" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5  L82,35.7z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="2s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path>   <path fill="#fff" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">      <animateTransform         attributeName="transform"         attributeType="XML"         type="rotate"         dur="1s"         from="0 50 50"         to="360 50 50"         repeatCount="indefinite" />  </path></svg>',
  st = 300,
  Si = 400,
  Mh = `${Si}px`,
  Nr = `${st}px`,
  Ah = "100%",
  Lh = "100%",
  je = 30,
  qe = 35,
  Pi = 25,
  Ir = 25,
  Mi = Pi + Ir,
  gt = 60,
  ht = "normal",
  ct = 12,
  ji = "normal",
  ut = "Avenir, Helvetica, Arial, sans-serif",
  Ds = "#141414",
  Os = "#333",
  Rs = "#cccccc",
  Wt = "#888888",
  ft = "#cccccc",
  Dr = "25px",
  Nh = "position: relative;",
  H = {
    COLOUR_BG: Ds,
    COLOUR_BORDER: Os,
    COLOUR_TXT: Rs,
    COLOUR_ICON: Wt,
    COLOUR_ICONHOVER: ft,
    BORDER_THICKNESS: 0,
    FONTWEIGHT: ht,
    FONTSIZE: ct,
    FONTSTYLE: ji,
    FONTFAMILY: ut,
    FONT: `${ji} ${ct}px ${ht} ${ut}`,
    FONTSTRING: `font-style: ${ji}; font-size: ${ct}px; font-weight: ${ht}; font-family: ${ut};`
  },
  xe = {
    fontSize: ct,
    fontWeight: ht,
    fontFamily: ut,
    paddingLeft: 3,
    paddingRight: 3,
    paddingTop: 2,
    paddingBottom: 2,
    borderWidth: 1,
    txtCol: "#000000",
    bakCol: "#cccccc",
    stroke: "#ffffff",
    fill: "#888888"
  },
  Xe = {
    COLOUR_ICON: Wt,
    COLOUR_ICONHOVER: ft,
    ICONSIZE: Dr
  },
  dt = {
    COLOUR_ICON: Wt,
    COLOUR_ICONHOVER: ft,
    ICONSIZE: Dr
  },
  Zi = {
    COLOUR_BG: Ds,
    COLOUR_BORDER: Os,
    COLOUR_TXT: Rs
  },
  Ji = {
    COLOUR_BG: Ds,
    COLOUR_BORDER: Os,
    COLOUR_TXT: Rs
  },
  Ih = {
    FILL: ft + "88"
  },
  X = {
    CANDLE_SOLID: "candle_solid",
    CANDLE_HOLLOW: "candle_hollow",
    CANDLE_UP_HOLLOW: "candle_up_hollow",
    CANDLE_DOWN_HOLLOW: "candle_down_hollow",
    OHLC: "ohlc",
    AREA: "area",
    LINE: "line"
  },
  ai = {
    COLOUR_CANDLE_UP: "#00F04088",
    COLOUR_CANDLE_DN: "#F0004088",
    COLOUR_WICK_UP: "#0F4",
    COLOUR_WICK_DN: "#F04"
  },
  gi = {
    COLOUR_VOLUME_UP: "#00F04044",
    COLOUR_VOLUME_DN: "#F0004044",
    ONCHART_VOLUME_HEIGHT: 15
  },
  Fn = ht,
  fi = ct,
  yi = ut,
  Pe = {
    COLOUR_TICK: "#888",
    COLOUR_LABEL: "888",
    COLOUR_CURSOR: "#000",
    COLOUR_CURSOR_BG: "#CCC",
    FONTFAMILY: yi,
    FONTSIZE: fi,
    FONTWEIGHT: Fn,
    FONT_LABEL: `${Fn} ${fi}px ${yi}`,
    FONT_LABEL_BOLD: `bold ${fi}px ${yi}`
  },
  Gn = ht,
  Yn = ct,
  qn = ut,
  tt = {
    COLOUR_TICK: "#888",
    COLOUR_LABEL: "888",
    COLOUR_CURSOR: "#000",
    COLOUR_CURSOR_BG: "#CCC",
    FONTFAMILY: qn,
    FONTSIZE: Yn,
    FONTWEIGHT: Gn,
    FONT_LABEL: `${Gn} ${Yn}px ${qn}`,
    FONT_LABEL_BOLD: `bold ${fi}px ${yi}`
  },
  Or = {
    COLOUR_GRID: "#222"
  },
  Dh = {
    width: 1,
    stroke: "#ccc",
    dash: [1, 1]
  },
  Qi = {
    text: H.FONTSTRING,
    font: H.FONT,
    colour: H.COLOUR_TXT
  },
  li = {
    ACTIVE: "#888888C0",
    IDLE: "#FFFFFF00",
    LINE: H.COLOUR_BORDER,
    STYLE: "1px solid"
  },
  Oh = {
    FONTSIZE: 50,
    FONTWEIGHT: "bold",
    FONTFAMILY: H.FONTFAMILY,
    COLOUR: "#181818",
    IMGWIDTH: "200",
    IMGHEIGHT: "200"
  },
  es = {
    arrowDown: gh,
    arrowUp: fh,
    arrowDownRound: yh,
    arrowUpRound: vh,
    arrowDownRoundSolid: wh,
    arrowUpRoundSolid: xh,
    buySolid: bh,
    sellSolid: Ch
  },
  Xn = {
    noteSolid: Th,
    lightning: Eh
  },
  Rr = {
    candle: {
      Type: X.CANDLE_SOLID,
      UpBodyColour: ai.COLOUR_CANDLE_UP,
      UpWickColour: ai.COLOUR_WICK_UP,
      DnBodyColour: ai.COLOUR_CANDLE_DN,
      DnWickColour: ai.COLOUR_WICK_DN
    },
    volume: {
      Height: gi.ONCHART_VOLUME_HEIGHT,
      UpColour: gi.COLOUR_VOLUME_UP,
      DnColour: gi.COLOUR_VOLUME_DN
    },
    xAxis: {
      colourTick: tt.COLOUR_TICK,
      colourLabel: tt.COLOUR_LABEL,
      colourCursor: tt.COLOUR_CURSOR,
      colourCursorBG: tt.COLOUR_CURSOR_BG,
      fontFamily: tt.FONTFAMILY,
      fontSize: tt.FONTSIZE,
      fontWeight: tt.FONTWEIGHT,
      line: "#656565",
      slider: "#555555",
      handle: "#55555588",
      icon: Wt,
      iconHover: ft
    },
    yAxis: {
      colourTick: Pe.COLOUR_TICK,
      colourLabel: Pe.COLOUR_LABEL,
      colourCursor: Pe.COLOUR_CURSOR,
      colourCursorBG: Pe.COLOUR_CURSOR_BG,
      fontFamily: Pe.FONTFAMILY,
      fontSize: Pe.FONTSIZE,
      fontWeight: Pe.FONTWEIGHT,
      line: "#656565"
    },
    chart: {
      Background: H.COLOUR_BG,
      BorderColour: H.COLOUR_BORDER,
      BorderThickness: H.BORDER_THICKNESS,
      TextColour: H.COLOUR_TXT,
      FontWeight: H.FONTWEIGHT,
      FontSize: H.FONTSIZE,
      FontStyle: H.FONTSTYLE,
      FontFamily: H.FONTFAMILY,
      Font: H.FONT,
      FontString: H.FONTSTRING,
      GridColour: Or.COLOUR_GRID
    },
    primaryPane: {
      separator: "#666"
    },
    secondaryPane: {
      separator: "#666"
    },
    time: {
      navigation: !1,
      font: Qi.font,
      colour: "#96a9db",
      handleColour: "#586ea6"
    },
    legend: {
      font: Qi.font,
      colour: Qi.colour,
      controls: !0,
      controlsColour: "#aaa",
      controlsOver: "#fff",
      controlsW: 18,
      controlsH: 18
    },
    icon: {
      colour: Wt,
      hover: ft
    },
    divider: {
      active: li.ACTIVE,
      idle: li.IDLE,
      line: li.LINE,
      style: li.STYLE
    },
    watermark: Oh,
    trades: {
      iconBuy: es.arrowUp,
      iconSell: es.arrowDown,
      iconHeight: 30,
      iconWidth: 30,
      iconMinDim: 10,
      buyColour: "#0f0",
      sellColour: "#f00",
      defaultIcons: es,
      offset: 10
    },
    events: {
      iconEvent: Xn.lightning,
      iconHeight: 30,
      iconWidth: 30,
      iconMinDim: 10,
      iconColour: "#ccc",
      defaultIcons: Xn,
      offset: 10
    }
  },
  Rh = `
<style title="txc_CSSVars">
  --txc-background: #141414:
  --txc-border-color: #888;
  --txc-time-scrollbar-color: #888;
  --txc-time-handle-color: #888;
  --txc-time-slider-color: #888;
  --txc-time-cursor-fore: #222;
  --txc-time-cursor-back: #ccc;
  --txc-time-icon-color: #888;
  --txc-time-icon-hover-color: #888;
</style>`,
  kh = `
<style>
  tradex-chart {
    display: flex;
    width: var(--txc-width, 100%);
    height: var(--txc-height, 100%);
    min-width: var(--txc-min-width, ${Mh});
    min-height: var(--txc-min-height, ${Nr});
    max-width: var(--txc-max-width, ${Ah});
    max-height: var(--txc-max-height, ${Lh});
    overflow: hidden;
    background: var(--txc-background, ${H.COLOUR_BG});
    font: var(--txc-font, ${H.FONT});
  }
  .tradeXchart .tradeXtime .navigation { 
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    gap: 2px;
  }
  .tradeXchart .tradeXtime .navigation .icon { 
    flex-basis: 20px;
   }
  .tradeXchart .tradeXtime .navigation #tScrollBar { 
    height: 20px; 
    border: 1px solid; 
    border-radius: 3px; 
    flex-basis: 100%;
    overflow: hidden;
  }
  .tradeXchart .tradeXtime .navigation #tScrollBar .handle { 
    height: 18px; 
    border-radius: 2px; 
    margin: 1px;
  }

  tradex-grid {
    position: absolute;
  }
</style>
`;
class ze {
  #e;
  #t;
  #n;
  #r = {};
  #i;
  #s;
  #l = "stopped";
  #o;
  #c;
  #a;
  #h;
  #d = ["await", "idle", "running", "stopped"];
  constructor(e, i) {
    if (!ze.validateConfig(e)) return !1;
    const s = {
      ...e
    };
    this.id = s.id, this.#i = s, this.#t = s.initial, this.#r.origin = i, this.#h = s.actions, this.#s = i.core, this.#u();
  }
  set id(e) {
    this.#e = $e(e);
  }
  get id() {
    return this.#e;
  }
  get state() {
    return this.#t;
  }
  get previousSate() {
    return this.#n;
  }
  get context() {
    return this.#r;
  }
  get core() {
    return this.#s;
  }
  get status() {
    return this.#l;
  }
  get event() {
    return this.#c;
  }
  get events() {
    return this.#o;
  }
  get eventData() {
    return this.#a;
  }
  get actions() {
    return this.#h;
  }
  notify(e, i) {
    this.#c = e, this.#a = i;
    const s = this.#i.states[this.#t];
    let n = s.on[e];
    if (!n || !U(n.action) || this.#l !== "running") return !1;
    let o = n?.condition?.type || n?.condition || !1;
    if (o && !this.condition.call(this, o, n.condition)) return !1;
    const a = n.target,
      l = this.#i.states[a];
    if (s?.onExit.call(this, i), n.action.call(this, i), this.#n = this.#t, this.#t = a, l?.onEnter.call(this, i), this.#i.states[a]?.on && (this.#i.states[a].on[""] || this.#i.states[a].on?.always)) {
      const h = this.#i.states[a].on[""] || this.#i.states[a].on.always;
      if (M(h)) for (let m of h) {
        let g = m?.condition?.type || m?.condition || !1;
        this.condition.call(this, g, m.condition) && E(m.target) && (m?.action.call(this, i), this.#n = this.#t, this.#t = m?.target, this.notify(null, null));
      } else if (b(h) && E(h.target)) {
        let m = h?.condition?.type || h?.condition || !1;
        this.condition.call(this, m, h.condition) && E(h.target) && (h?.action.call(this, i), this.#n = this.#t, this.#t = h.target, this.notify(null, null));
      }
    }
    return this.#t;
  }
  condition(e, i = null, s = {}) {
    return e ? this.#i.guards[e].call(this, this.#r, i, s) : !1;
  }
  canTransition(e) {
    const i = this.#i.states[this.#t];
    return e in i.on;
  }
  start() {
    this.#l = "running";
  }
  stop() {
    this.#l = "stopped";
  }
  destroy() {
    this.#m(), this.#i = null;
  }
  #u() {
    this.#o = /* @__PURE__ */new Set();
    for (let e in this.#i.states) for (let i in this.#i.states[e].on) {
      let s = this.notify.bind(this, i);
      this.#o.add({
        topic: i,
        cb: s
      }), this.#s.on(i, s, this.context);
    }
  }
  #m() {
    for (let e of this.#o) this.#s.off(e.topic, e.cb);
  }
  static validateConfig(e) {
    if (!b(e)) return !1;
    const i = ["id", "initial", "context", "states"];
    let s = Object.keys(e);
    if (!Tr(i, s) || !(e.initial in e.states)) return !1;
    for (let n in e.states) {
      if (!b(e.states[n]) || "onEnter" in e.states[n] && !U(e.states[n].onEnter) || "onExit" in e.states[n] && !U(e.states[n].onExit)) return !1;
      if ("on" in e.states[n]) for (let o in e.states[n].on) {
        let a = e.states[n].on[o];
        if (!E(a.target) || "action" in a && !U(a.action)) return !1;
      }
    }
    return !0;
  }
}
exports.StateMachine = ze;
const _h = "alert";
class Hh {
  #e = new be();
  #t = {};
  constructor(e) {
    if (M(e)) for (let i of e) this.add(i?.price, i?.condition, i?.handler);
  }
  get list() {
    return this.#e;
  }
  get handlers() {
    return this.#t;
  }
  destroy() {
    this.#e.clear(), this.#t = {};
  }
  batchAdd(e) {
    if (M(e)) {
      let i = [];
      for (let s of e) i.push(this.add(s?.price, s?.condition, s?.handler));
      return i;
    } else return !1;
  }
  add(e, i, s) {
    if (isNaN(e) || !U(s)) return !1;
    const n = Z(_h),
      o = {
        price: e,
        condition: i
      };
    if (this.list.has(o)) {
      let a = this.list.get(o);
      a[n] = s;
    } else {
      const a = {};
      a[n] = s, this.list.set(o, a);
    }
    return this.#t[n] = {
      alert: o,
      handler: s
    }, n;
  }
  remove(e) {
    if (!(e in this.#t)) return !1;
    const i = this.#t[e],
      s = i.alert,
      n = this.#e.get(s);
    return n.delete(e), i.delete(e), Object.keys(n).length == 0 && this.#e.delete(s), !0;
  }
  delete(e, i) {
    if (this.list.has({
      price: e,
      condition: i
    })) {
      const s = this.list.get({
        price: e,
        condition: i
      });
      for (let n in s) this.#t.delete(n), s.delete(n);
    }
    return this.list.delete({
      price: e,
      condition: i
    });
  }
  pause(e) {
    if (!(e in this.#t)) return !1;
    this.#t[e];
  }
  handlerByID(e) {
    return e in this.#t ? this.#t[e].handler : !1;
  }
  check(e, i) {
    if (!(!M(e) || !M(i))) {
      for (let [s, n] of this.list) if (s.condition(s.price, e, i)) for (let o in n) try {
        n[o](s.price, e, i);
      } catch (a) {
        console.error(a);
      }
    }
  }
}
const $h = 0,
  Uh = 1,
  Bh = 2,
  Vh = 3,
  zh = 4,
  Wh = 5,
  hi = [null, null, null, null, null],
  ci = {
    tfCountDown: !0,
    alerts: []
  };
class mt {
  #e;
  #t;
  #n;
  #r;
  #i;
  #s;
  #l;
  #o = hi;
  #c = 0;
  #a = 0;
  #h = "";
  #d = !1;
  #u;
  #m;
  #y = hi;
  #g;
  static validateConfig(e) {
    if (b(e)) {
      let i = ce(ci);
      e = Bt(i, e), e.tfCountDown = K(e.tfCountDown) ? e.tfCountDown : ci.tfCountDown, e.alerts = M(e.alerts) ? e.alerts : ci.alerts;
    } else return ci;
    return e;
  }
  constructor(e) {
    this.#e = e, this.#r = e.time, this.status = {
      status: Za
    }, this.#t = mt.validateConfig(e.config?.stream), this.#i = T(e.config?.maxCandleUpdate) ? e.config.maxCandleUpdate : el, this.#l = T(e.config?.streamPrecision) ? e.config.streamPrecision : tl;
  }
  get config() {
    return this.#t;
  }
  get countDownMS() {
    return this.#a;
  }
  get countDown() {
    return this.#h;
  }
  get range() {
    return this.#e.range;
  }
  get status() {
    return this.#n;
  }
  set status({
    status: e,
    data: i
  }) {
    this.#n = e, this.emit(e, i);
  }
  set dataReceived(e) {
    this.#d || (this.#d = !0, this.status = {
      status: Vt,
      data: e
    });
  }
  get alerts() {
    return this.#g;
  }
  get lastPriceMin() {
    return this.#m;
  }
  set lastPriceMin(e) {
    T(e) && (this.#m = e);
  }
  get lastPriceMax() {
    return this.#u;
  }
  set lastPriceMax(e) {
    T(e) && (this.#u = e);
  }
  get lastTick() {
    return this.#y;
  }
  set lastTick(e) {
    M(e) && (this.#y, this.#y = e, this.alerts.check(e, this.#o));
  }
  set candle(e) {
    const i = [...this.#o];
    e.t = this.roundTime(new Date(e.t)), e.o = e.o * 1, e.h = e.h * 1, e.l = e.l * 1, e.c = e.c * 1, e.v = e.v * 1, this.#o[$h] !== e.t ? this.newCandle(e) : this.updateCandle(e), this.status = {
      status: Ht,
      data: this.#o
    }, this.lastTick = i;
  }
  get candle() {
    return this.#o !== hi ? this.#o : null;
  }
  start() {
    this.#g = new Hh(this.#t.alerts), this.status = {
      status: Pn
    }, this.#s = setInterval(this.onUpdate.bind(this), this.#i);
  }
  stop() {
    this.#g.destroy(), this.status = {
      status: Ja
    };
  }
  emit(e, i) {
    this.#e.emit(e, i);
  }
  error() {
    this.status = {
      status: Qa
    };
  }
  onTick(e) {
    (this.#n == Pn || this.#n == Ht) && b(e) && (this.candle = e);
  }
  onUpdate() {
    this.#o !== hi && (this.status = {
      status: _e,
      data: this.candle
    }, this.status = {
      status: Ht,
      data: this.#o
    });
  }
  newCandle(e) {
    this.prevCandle(), this.#o = [e.t, e.o, e.h, e.l, e.c, e.v, null, !0], this.#e.state.mergeData({
      ohlcv: [this.#o]
    }, !0, !1), this.status = {
      status: zt,
      data: {
        data: e,
        candle: this.#o
      }
    }, this.#a = this.#r.timeFrameMS, this.#c = this.roundTime(Date.now());
  }
  prevCandle() {
    const e = this.#e.allData.data;
    e.length > 0 && e[e.length - 1][7] && (e[e.length - 1].length = 6);
  }
  updateCandle(e) {
    let i = this.#o;
    i[Uh] = e.o, i[Bh] = e.h, i[Vh] = e.l, i[zh] = e.c, i[Wh] = e.v, this.#o = i;
    const s = this.#e.allData.data,
      n = s.length > 0 ? s.length - 1 : 0;
    s[n] = this.#o, this.countDownUpdate();
  }
  countDownUpdate() {
    let e, i, s, n, o, a, l;
    this.#r.timeFrameMS;
    let h = this.#r.timeFrameMS - (Date.now() - this.#c);
    return h < 0 && (h = 0), this.#a = h, h > ve ? (e = String(Math.floor(h / ve)), i = String(Math.floor(h % ve / he)).padStart(2, "0"), this.#h = `${e}Y ${i}M`) : h > he ? (i = String(Math.floor(h / he)).padStart(2, "0"), n = String(Math.floor(h % he / $)).padStart(2, "0"), this.#h = `${i}M ${n}D`) : h > pt ? (s = String(Math.floor(h / pt)).padStart(2, "0"), n = String(Math.floor(h % he / $)).padStart(2, "0"), this.#h = `${s}W ${n}D`) : h > $ ? (n = String(Math.floor(h / $)).padStart(2, "0"), o = String(Math.floor(h % $ / j)).padStart(2, "0"), a = String(Math.floor(h % j / F)).padStart(2, "0"), this.#h = `${n}D ${o}:${a}`) : h > j ? (o = String(Math.floor(h / j)).padStart(2, "0"), a = String(Math.floor(h % j / F)).padStart(2, "0"), l = String(Math.floor(h % F / z)).padStart(2, "0"), this.#h = `${o}:${a}:${l}`) : h > F ? (a = String(Math.floor(h / F)).padStart(2, "0"), l = String(Math.floor(h % F / z)).padStart(2, "0"), this.#h = `00:${a}:${l}`) : (l = String(Math.floor(h / z)).padStart(2, "0"), String(h % z).padStart(4, "0"), this.#h = `00:00:${l}`), this.#h;
  }
  roundTime(e) {
    return e - e % this.#e.time.timeFrameMS;
  }
}
const Kn = ["constructor", "list", "setCurrent", "setTheme", "setValue"];
class Se {
  static #e = new be();
  static get list() {
    return Se.#e;
  }
  #t;
  static create(e, i) {
    if (!b(e)) return !1;
    e.id = E(e.name) ? Z(e.name) : `${i.id}.theme`;
    const s = new Se(e, i);
    return Se.list.set(e.id, s), s;
  }
  constructor(e, i) {
    this.#t = i, this.setCurrent(e);
  }
  get list() {
    return Se.list;
  }
  setCurrent(e = {}) {
    e = b(e) ? e : {};
    const i = ce(Rr),
      s = ce(e),
      n = Bt(i, s);
    for (let o in n) Kn.includes(o) || (this[o] = n[o]);
    this.#t.refresh();
  }
  setTheme(e) {
    if (E(e) && Se.list.has(e)) {
      const i = Se.list.get(e);
      return this.setCurrent(i), !0;
    }
    return !1;
  }
  setProperty(e, i) {
    if (!E(e)) return;
    const s = dn(this, e),
      n = e.split(".");
    if (n.length == 1) this[n[0]] = i;else {
      let o = n.shift();
      this[o] = Cr(this[o], n.join("."), i);
    }
    return this.#t.refresh(), s;
  }
  getProperty(e) {
    return dn(this, e);
  }
  deleteTheme(e) {
    return E(e) && Se.list.has(e) ? (Se.list.delete(e), !0) : !1;
  }
  exportTheme(e = {}) {
    b || (e = {});
    const i = e?.type,
      s = {};
    let n;
    for (let o in this) Kn.includes(o) || (s[o] = this[o]);
    switch (i) {
      case "json":
      default:
        const {
          replacer: o,
          space: a
        } = {
          ...e
        };
        n = JSON.stringify(s, o, a);
    }
    return n;
  }
}
class Fh {
  #e;
  constructor(e) {
    this.#e = e, self.onmessage = i => this._onmessage(i.data);
  }
  _onmessage(e) {
    const {
      r: i,
      data: s
    } = e;
    try {
      const n = this.#e(s, i);
      self.postMessage({
        r: i,
        status: !0,
        result: n
      });
    } catch (n) {
      self.postMessage({
        r: i,
        status: !1,
        result: n
      });
    }
  }
  end() {
    self.close();
  }
}
class Gh {
  #e;
  #t;
  #n;
  #r = 0;
  #i = {};
  #s;
  constructor(e, i, s, n) {
    this.#e = e, this.#t = s, this.#n = n;
    const o = `
      ${Me.ThreadWorker.toString()};
      const fn = ${i}
      const worker = new ThreadWorker(fn)
    `,
      a = new Blob([`;(async () => {${o}})().catch(e => {console.error(e)})`], {
        type: "text/javascript"
      }),
      l = URL.createObjectURL(a);
    this.#s = new Worker(l);
  }
  get id() {
    return this.#e;
  }
  get req() {
    return `r_${this.#r++}`;
  }
  get cb() {
    return this.#t;
  }
  set cb(e) {
    this.#t = e;
  }
  onmessage(e) {
    return U(this.#t) ? this.#t(e) : e;
  }
  onerror(e) {
    return U(this.#n) ? this.#n(e) : e;
  }
  postMessage(e) {
    return new Promise((i, s) => {
      try {
        let n = this.req;
        this.#i[n] = {
          resolve: i,
          reject: s
        }, this.#s.postMessage({
          r: n,
          data: e
        }), this.#s.onmessage = o => {
          const {
            r: a,
            status: l,
            result: h
          } = o.data;
          if (a in this.#i) {
            const {
              resolve: m,
              reject: g
            } = this.#i[a];
            delete this.#i[a], l ? m(this.onmessage(h)) : g(this.onerror({
              r: a,
              result: h
            }));
          } else if (l == "resolved") this.onmessage(h);else throw new Error("Orphaned thread request ${r}");
        }, this.#s.onerror = o => {
          s(this.onerror(o));
        };
      } catch (n) {
        s(n);
      }
    });
  }
  terminate() {
    this.#s.terminate();
  }
}
class Me {
  static #e = /* @__PURE__ */new Map();
  static ThreadWorker = Fh;
  static Thread = Gh;
  static create(e, i = "worker", s) {
    if (typeof window.Worker > "u") return !1;
    if (U(e)) e = e.toString();else if (!E(e)) return !1;
    return i = E(i) ? Z(i) : Z("worker"), Me.#e.set(i, new Me.Thread(i, e, s)), Me.#e.get(i);
  }
  static destroy(e) {
    if (!E(e)) return !1;
    Me.#e.get(e).terminate(), Me.#e.delete(e);
  }
  static end() {
    Me.#e.forEach((e, i, s) => {
      Me.destroy(i);
    });
  }
}
class Yh {
  #e = {};
  constructor() {}
  on(e, i, s) {
    return !E(e) || !U(i) ? !1 : (this.#e[e] || (this.#e[e] = []), this.#e[e].push({
      handler: i,
      context: s
    }), !0);
  }
  off(e, i, s) {
    if (!E(e) || !U(i) || !(e in this.#e)) return !1;
    const n = this.#e[e];
    for (let o = 0; o < n.length; o++) if (n[o].handler === i) {
      if (s !== void 0 && n[o].context !== s) continue;
      if (n.splice(o, 1), n.length === 0) {
        delete this.#e[e];
        break;
      }
    }
    return !0;
  }
  emit(e, i) {
    E(e) && (this.#e[e] || []).forEach(s => s.handler.call(s.context, i));
  }
  execute(e, i, s) {}
}
exports.EventHub = Yh;
class oe extends HTMLElement {
  shadowRoot;
  template;
  id = Z(_t);
  doInit = !0;
  intersectionObserver;
  mutationObserver;
  resizeObserver;
  DOM = {
    width: 0,
    height: 0,
    style: {}
  };
  oldDOM = {};
  subscribers = {
    resize: [],
    mutation: [],
    intersection: []
  };
  #e;
  constructor(e, i = "open") {
    super(), this.template = e, this.shadowRoot = this.attachShadow({
      mode: i
    }), this.#e = new Yh();
  }
  destroy() {}
  connectedCallback(e) {
    this.doInit && (this.doInit = !1, this.shadowRoot.appendChild(this.template.content.cloneNode(!0)), this.style.display = "block", this.DOM.width = this.clientWidth, this.DOM.height = this.clientHeight, this.oldDOM.width = this.clientWidth, this.oldDOM.height = this.clientHeight, this.resizeObserver = new ResizeObserver(this.onResize.bind(this)), this.resizeObserver.observe(this), U(e) && e());
  }
  disconnectedCallback() {
    this.resizeObserver.disconnect(), this.#e = void 0;
  }
  get width() {
    return this.DOM.width;
  }
  set width(e) {
    this.setDim(e, "width");
  }
  get oWidth() {
    return this.oldDOM.width;
  }
  get height() {
    return this.DOM.height;
  }
  set height(e) {
    this.setDim(e, "height");
  }
  get oHeight() {
    return this.oldDOM.height;
  }
  get widthDeltaR() {
    return this.DOM.width / this.oldDOM.width;
  }
  get heightDeltaR() {
    return this.DOM.height / this.oldDOM.height;
  }
  get top() {
    return this.DOM.top;
  }
  get left() {
    return this.DOM.left;
  }
  get bottom() {
    return this.DOM.bottom;
  }
  get right() {
    return this.DOM.right;
  }
  get x() {
    return this.x;
  }
  get y() {
    return this.y;
  }
  get dimensions() {
    return this.DOM;
  }
  set cursor(e) {
    this.style.cursor = e;
  }
  get cursor() {
    return this.style.cursor;
  }
  setDim(e, i) {
    !["width", "height"].includes(i) || !E(e) || (T(e) ? (this.DOM[i] = e, e += "px") : E(e) || (this.DOM[i] = this.parentElement.getBoundingClientRect().width, e = this.DOM[i] + "px"), this.style[i] = e);
  }
  onIntersection(e) {
    this.emit("intersection");
  }
  onMutation(e) {
    this.emit("mutation");
  }
  onResize(e) {
    this.oldDOM = {
      ...this.DOM
    };
    for (let i in e[0].contentRect) {
      const s = e[0].contentRect[i];
      U(s) || (this.DOM[i] = s);
    }
    this.emit("resize", this.DOM);
  }
  on(e, i, s) {
    this.#e.on(e, i, s);
  }
  off(e, i, s) {
    this.#e.off(e, i, s);
  }
  emit(e, i) {
    this.#e.emit(e, i);
  }
}
class kr {
  #e;
  #t;
  #n;
  constructor(e) {
    this.#t = e, this.#e = this.#t.core, this.#n = this.#e.Chart;
  }
  get core() {
    return this.#e;
  }
  get chart() {
    return this.#n;
  }
  get parent() {
    return this.#t;
  }
  get theme() {
    return this.#e.theme;
  }
  get width() {
    return this.#n.width;
  }
  get height() {
    return this.#n.height;
  }
  get data() {
    return this.#n.data;
  }
  get range() {
    return this.#n.range;
  }
  get yDigits() {
    return this.#n.yAxisDigits;
  }
  float2Int(e) {
    return Sa(e);
  }
  numDigits(e) {
    return xr(e);
  }
  countDigits(e) {
    return Ea(e);
  }
  precision(e) {
    return br(e);
  }
}
class vi extends kr {
  #e = 4;
  #t;
  #n = !0;
  constructor(e) {
    super(e);
  }
  get range() {
    return this.parent.range;
  }
  get width() {
    return this.parent.width;
  }
  get interval() {
    return this.range.interval;
  }
  get intervalStr() {
    return this.range.intervalStr;
  }
  get timeStart() {
    return this.range.timeStart;
  }
  get timeFinish() {
    return this.range.timeFinish;
  }
  get rangeDuration() {
    return this.range.rangeDuration;
  }
  get rangeLength() {
    return this.range.Length;
  }
  get indexStart() {
    return this.range.indexStart;
  }
  get indexEnd() {
    return this.range.indexEnd;
  }
  get timeMax() {
    return this.range.timeMax;
  }
  get timeMin() {
    return this.range.timeMin;
  }
  get candleW() {
    return this.width / this.range.Length;
  }
  get candlesOnLayer() {
    return we(this.core.Chart.layerWidth / this.candleW);
  }
  get xAxisRatio() {
    return this.width / this.range.rangeDuration;
  }
  set xAxisTicks(e) {
    this.#e = T(e) ? e : 0;
  }
  get xAxisTicks() {
    return this.#e;
  }
  get xAxisGrads() {
    return this.#t;
  }
  get scrollOffsetPx() {
    return this.core.scrollPos % this.candleW;
  }
  get bufferPx() {
    return this.core.bufferPx;
  }
  xPos(e) {
    return we(this.range.rangeIndex(e) * this.candleW + this.candleW * 0.5);
  }
  t2Index(e) {
    return this.range.rangeIndex(e);
  }
  t2Pixel(e) {
    return this.xPos(e);
  }
  pixel2T(e) {
    let i = this.pixel2Index(e);
    return this.range.value(i)[0];
  }
  pixel2Index(e) {
    e -= this.candleW / 2;
    let i = this.range.indexStart,
      s = we(e / this.candleW);
    return i + s;
  }
  pixelOHLCV(e) {
    let i = this.pixel2Index(e);
    return this.range.value(i);
  }
  xPosSnap2CandlePos(e) {
    let i = e % this.candleW,
      s = i ? this.candleW / 2 : 0;
    return we(e - i + s);
  }
  xPos2Time(e) {
    return this.pixel2T(e);
  }
  xPos2Index(e) {
    return this.pixel2Index(e);
  }
  xPosOHLCV(e) {
    return this.pixelOHLCV(e);
  }
  initXAxisGrads() {
    this.#t = this.calcXAxisGrads();
  }
  doCalcXAxisGrads(e) {
    this.#t = this.calcXAxisGrads(e);
  }
  calcXAxisGrads(e = this.range.snapshot()) {
    const i = {
        entries: {},
        values: [],
        major: [],
        minor: []
      },
      s = Cs(e.rangeDuration);
    i.units = s;
    for (let g in s) if (s[g] > 0) {
      i.units = [g, g], i.timeSpan = `${s[g]} ${g}`;
      break;
    }
    const n = e.interval,
      {
        xStep: o,
        rank: a
      } = this.xStep(e),
      l = this.pixel2T(this.width) + o;
    let h = e.timeMin - e.timeMin % o - o,
      m = h;
    for (; h < l;) {
      let g = mi(h, "years"),
        v = mi(h, "months"),
        S = mi(h, "days");
      !(g in i.entries) && g >= m ? i.entries[g] = [this.dateTimeValue(g, n, a), this.t2Pixel(g), g, "major"] : !(v in i.entries) && v >= m ? i.entries[v] = [this.dateTimeValue(v, n, a), this.t2Pixel(v), v, "major"] : !(S in i.entries) && S >= m && (i.entries[S] = [this.dateTimeValue(S, n, a), this.t2Pixel(S), S, "major"]), i.entries[h] = [this.dateTimeValue(h, n, a), this.t2Pixel(h), h, "minor"], h += o;
    }
    return i.values = Object.values(i.entries), i;
  }
  xStep(e) {
    let i = Ga,
      s = this.#n ? e.interval : 1,
      n = Dt[0],
      o = we(this.width / e.Length),
      a = os[0],
      l = Dt.indexOf(s);
    for (; l-- >= 0 && !(o * (Dt[l] / s) >= i););
    return n = Dt[l], a = os[l], {
      xStep: n,
      rank: a
    };
  }
  dateTimeValue(e, i, s) {
    if (e / $ % 1 === 0) {
      const n = Ps(e);
      return n === 1 ? Ms(e) === 0 ? vr(e) : fr(e) : n;
    } else switch (s) {
      case "milliseconds":
        return hs(e);
      case "seconds":
        return hs(e);
      case "minutes":
        return ls(e);
      case "hours":
        return ls(e);
    }
  }
}
const ts = {
    id: "time",
    initial: "idle",
    context: {},
    states: {
      idle: {
        onEnter(r) {},
        onExit(r) {},
        on: {
          resize: {
            target: "resize",
            action(r) {}
          },
          xAxis_scale: {
            target: "scale",
            action(r) {}
          },
          xAxis_inc: {
            target: "incremental",
            action(r) {}
          },
          xAxis_log: {
            target: "logarithmic",
            action(r) {}
          },
          xAxis_100: {
            target: "percentual",
            action(r) {}
          },
          chart_pan: {
            target: "chart_pan",
            action(r) {}
          }
        }
      },
      resize: {
        onEnter(r) {},
        onExit(r) {},
        on: {
          someEvent: {
            target: "",
            action(r) {}
          }
        }
      },
      chart_pan: {
        onEnter(r) {},
        onExit(r) {},
        on: {
          chart_pan: {
            target: "chart_pan",
            action(r) {}
          },
          chart_panDone: {
            target: "idle",
            action(r) {}
          }
        }
      }
    },
    guards: {}
  },
  jn = /^#?([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i,
  Zn = /^hsla?((\d{1,3}?),\s*(\d{1,3}%),\s*(\d{1,3}%)(,\s*[01]?\.?\d*)?)$/,
  Jn = /^hsla[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*,\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/,
  Qn = /^rgba?((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)(,\s*[01]?\.?\d*)?)$/,
  er = /^^rgba[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*,){3}\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/;
class _r {
  #e = {
    r: null,
    g: null,
    b: null,
    a: null,
    h: null,
    s: null,
    l: null,
    v: null,
    r16: null,
    g16: null,
    b16: null,
    a16: null,
    hex: null,
    hsl: null,
    hsla: null,
    rgb: null,
    rgba: null,
    isValid: !1
  };
  constructor(e) {
    this.#t(e), jn.test(e) && this.#n(e), Zn.test(e) && this.#r(e), Jn.test(e) && this.#i(e), Qn.test(e) && this.#s(e), er.test(e) && this.#l(e);
  }
  get value() {
    return this.#e;
  }
  get isValid() {
    return this.#e.isValid;
  }
  get hex() {
    return this.#e.hex.slice(0, -2);
  }
  get hexa() {
    return this.#e.hex;
  }
  #t(e) {
    if (ol) {
      let i = document.getElementById("divValidColourTest");
      i || (i = document.createElement("div"), i.id = "divValidColourTest"), i.style.backgroundColor = "", i.style.backgroundColor = e, this.#e.isValid = !!i.style.backgroundColor.length;
    } else this.#e.isValid = !!(jn.test(e) || Zn.test(e) || Jn.test(e) || Qn.test(e) || er.test(e));
  }
  setHex(e) {
    let i = this.#e;
    [i.r16, i.g16, i.b16, i.a16] = e, i.hex = "#" + i.r16 + i.g16 + i.b16 + i.a16;
  }
  setRGBA(e) {
    let i = this.#e;
    [i.r, i.g, i.b, i.a] = e, i.rgb = `rgb(${e[0]},${e[1]},${e[2]})`, i.rgba = `rgb(${e[0]},${e[1]},${e[2]},${e[3]})`;
  }
  setHSLA(e) {
    let i = this.#e;
    [i.h, i.s, i.l, i.a] = e, i.hsl = `hsl(${e[0]},${e[1]}%,${e[2]}%)`, i.hsla = `hsl(${e[0]},${e[1]}%,${e[2]}%,${e[3]})`;
  }
  #n(e) {
    this.#e.hex = e;
    let i = e.length,
      s;
    switch (i) {
      case 4:
        s = [`${e[1]}${e[1]}`, `${e[2]}${e[2]}`, `${e[3]}${e[3]}`, "ff"];
        break;
      case 7:
        s = [e.substr(1, 2), e.substr(3, 2), e.substr(5, 2), "ff"];
        break;
      case 9:
        s = [e.substr(1, 2), e.substr(3, 2), e.substr(5, 2), e.substr(7, 2)];
        break;
    }
    this.setHex(s), this.#d(s), this.#u(s);
  }
  #r(e) {
    this.#e.hsl = e;
  }
  #i(e) {
    this.#e.hsla = e;
  }
  #s(e) {
    this.#e.rgb = e, this.#y(rgba);
  }
  #l(e) {
    this.#e.rgba = e, this.#y(e);
  }
  #o(e) {
    let {
      r: i,
      g: s,
      b: n,
      a: o
    } = this.#m(e);
    return i.length == 1 && (i = "0" + i), s.length == 1 && (s = "0" + s), n.length == 1 && (n = "0" + n), o.length == 1 && (o = "0" + o), this.value.r = i, this.value.g = s, this.value.b = n, this.value.a = o, this.setHex([i, s, n, o]), this;
  }
  #c(e) {
    let {
      r: i,
      g: s,
      b: n,
      a: o
    } = this.#m(e);
    i = parseInt(i, 16) / 255, s = parseInt(s, 16) / 255, n = parseInt(n, 16) / 255, o = parseInt(o, 16) / 255;
    const a = Math.max(i, s, n),
      l = a - Math.min(i, s, n),
      h = l ? a === i ? (s - n) / l : a === s ? 2 + (n - i) / l : 4 + (i - s) / l : 0;
    let m = [(60 * h < 0 ? 60 * h + 360 : 60 * h).toString(), (100 * (l ? a <= 0.5 ? l / (2 * a - l) : l / (2 - (2 * a - l)) : 0)).toString(), (100 * (2 * a - l) / 2).toString(), o.toString()];
    return this.setHSLA(m), this;
  }
  #a(e, i, s) {
    i /= 100, s /= 100;
    const n = l => (l + e / 30) % 12,
      o = i * Math.min(s, 1 - s),
      a = l => s - o * Math.max(-1, Math.min(n(l) - 3, Math.min(9 - n(l), 1)));
    return [255 * a(0), 255 * a(8), 255 * a(4)];
  }
  #h(e, i, s) {
    s /= 100;
    const n = i * Math.min(s, 1 - s) / 100,
      o = a => {
        const l = (a + e / 30) % 12,
          h = s - n * Math.max(Math.min(l - 3, 9 - l, 1), -1);
        return Math.round(255 * h).toString(16).padStart(2, "0");
      };
    return `#${o(0)}${o(8)}${o(4)}`;
  }
  #d(e) {
    E(e) && (e = /([a-f\d]{2})/ig.exec(e));
    var i = [parseInt(e[0], 16), parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16) / 255];
    this.setRGBA(i);
  }
  #u(e) {
    E(e) && (e = /([a-f\d]{2})/ig.exec(e));
    let i = parseInt(e[0], 16),
      s = parseInt(e[1], 16),
      n = parseInt(e[2], 16),
      o = parseInt(e[3], 16);
    i /= 255, s /= 255, n /= 255, o /= 255, this.setHSLA([i, s, n, o]);
  }
  #m(e) {
    let i,
      s,
      n,
      o,
      a = this.#e;
    if (a.r && a.g && a.b && a.a) return ({
      r: i,
      g: s,
      b: n,
      a: o
    } = {
      ...a
    });
    if (E(e)) {
      let l = e.indexOf(",") > -1 ? "," : " ";
      e = e.substr(4).split(")")[0].split(l);
    }
    if (M(e)) {
      if (e.length < 3 || e.length > 4) return !1;
      i = e[0], s = e[1], n = e[2], o = E(e[3]) ? e[3] : "";
    } else if (b(e)) i = e.r, s = e.g, n = e.b, o = "a" in e ? e.a : "";else return !1;
    return {
      r: i,
      g: s,
      b: n,
      a: o
    };
  }
  #y(e) {
    let i,
      s,
      n = 0,
      o = [],
      a = [],
      l = e.replace(/\s/g, "").match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
    l.shift();
    for (let h of l) s = h.indexOf("%") > -1, i = parseFloat(h), n < 3 && s ? i = Math.round(255 * i / 100) : n == 3 && (!s && i >= 0 && i <= 1 ? i = Math.round(255 * i) : s && i >= 0 && i <= 100 ? i = Math.round(255 * i / 100) : i = ""), o[n] = (i | 256).toString(16).slice(1), a[n++] = i;
    this.setHex(o), this.setRGBA(a), this.#u(this.#e.hex);
  }
}
class ks {
  static #e;
  #t;
  #n;
  #r;
  #i;
  #s = {
    w: 0,
    h: 0
  };
  #l = {
    w: 0,
    h: 0,
    x: 0,
    y: 0
  };
  #o = {
    x: !1,
    y: !0
  };
  #c;
  #a = {
    x: 0,
    drag: !1
  };
  #h;
  #d;
  constructor(e) {
    this.#t = ks.#e++, this.#n = e.core, this.#r = D.isElement(e.elContainer) ? e.elContainer : !1, this.#i = D.isElement(e.elHandle) ? e.elHandle : !1, this.#d = U(e.callback) ? e.callback : !1, D.isElement(this.#r) && D.isElement(this.#i) && (this.mount(), this.eventsListen());
  }
  set cursor(e) {
    this.#i.style.cursor = e;
  }
  get cursor() {
    return this.#i.style.cursor;
  }
  eventsListen() {
    this.#h = new Le(this.#i, {
      disableContextMenu: !1
    }), this.#h.on("mouseenter", ke(this.onMouseEnter, 1, this, !0)), this.#h.on("mouseout", ke(this.onMouseOut, 1, this, !0)), this.#h.on("drag", _a(this.onHandleDrag, 100, this)), this.#h.on("enddrag", this.onHandleDragDone.bind(this)), this.#h.on("mousedown", ke(this.onMouseDown, 100, this, !0)), this.#h.on("mouseup", this.onMouseUp.bind(this));
  }
  on(e, i, s) {
    this.#n.on(e, i, s);
  }
  off(e, i) {
    this.#n.off(e, i);
  }
  emit(e, i) {
    this.#n.emit(e, i);
  }
  onMouseEnter() {
    const e = getComputedStyle(this.#i).backgroundColor;
    e && (this.colour = new _r(e), this.#i.style.backgroundColor = this.colour.hex);
  }
  onMouseOut() {
    this.#i.style.backgroundColor = this.colour.hexa;
  }
  onMouseDown() {}
  onMouseUp(e) {
    this.onHandleDragDone(e);
  }
  onHandleDrag(e) {
    this.#a.drag || (this.#a.drag = !0, this.#a.x = e.position.x), this.handlePos(e);
  }
  onHandleDragDone(e) {
    this.handlePos(e), this.#a.drag = !1;
  }
  mount() {
    this.#s.w = this.#r.getBoundingClientRect().width, this.#s.h = this.#r.getBoundingClientRect().height, this.#r.style.overflow = "hidden", this.#l.w = this.#i.getBoundingClientRect().width, this.#l.h = this.#i.getBoundingClientRect().height, this.#i.style.marginRight = 0, this.#i.style.position = "absolute";
  }
  handlePos(e) {
    let i = this.#n.range,
      s = parseInt(this.#i.style.marginLeft),
      n = this.#r.getBoundingClientRect().width,
      o = this.#i.getBoundingClientRect().width,
      a = n - o,
      l = e.position.x - this.#a.x,
      h = _(s + l, 0, a),
      m = (i.dataLength + i.limitFuture + i.limitPast) / n,
      g = Math.floor(h * m);
    this.setHandleDims(h, o), this.#n.jumpToIndex(g);
  }
  setHandleDims(e, i) {
    let s = this.#r.getBoundingClientRect().width;
    i = i || this.#i.getBoundingClientRect().width, e = e / s * 100, this.#i.style.marginLeft = `${e}%`, i = i / s * 100, this.#i.style.width = `${i}%`;
  }
}
const Hr = ["source-over", "source-atop", "source-in", "source-out", "destination-over", "destination-atop", "destination-in", "destination-out", "lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
let $r = class {
  #e = 0;
  constructor(e = {}) {
    this.container = e.container, this.layers = [], this.id = G.idCnt++, this.scene = new G.Scene(), this.setSize(e.width || 0, e.height || 0);
  }
  generateKey() {
    return this.#e++;
  }
  setSize(e, i) {
    return this.width = e, this.height = i, this.scene.setSize(e, i), this.layers.forEach(function (s) {
      s.setSize(e, i);
    }), this;
  }
  addLayer(e) {
    return this.layers.push(e), e.setSize(e.width || this.width, e.height || this.height), e.viewport = this, this;
  }
  getIntersection(e, i) {
    for (var s = this.layers, n = s.length - 1, o, a; n >= 0;) {
      if (o = s[n], a = o.hit.getIntersection(e, i), a >= 0) return a;
      n--;
    }
    return -1;
  }
  get index() {
    let e = G.viewports,
      i,
      s = 0;
    for (i of e) {
      if (this.id === i.id) return s;
      s++;
    }
    return null;
  }
  destroy() {
    for (let e of this.layers) e.remove();
  }
  render(e = !1) {
    let {
        scene: i,
        layers: s
      } = this,
      n;
    i.clear();
    for (n of s) e && n.layers.length > 0 && n.render(e), Hr.includes(n?.composition) && (i.context.globalCompositeOperation = n.composition), n.visible && n.width > 0 && n.height > 0 && i.context.drawImage(n.scene.canvas, n.x, n.y, n.width, n.height);
  }
};
class qh extends $r {
  constructor(e = {}) {
    super(e);
    const i = this.scene.canvas,
      s = e.container;
    s?.hasCanvasSlot && (i.slot = "viewportCanvas"), s.innerHTML = "", s.appendChild(i), G.viewports.push(this);
  }
  destroy() {
    super.destroy(), this.container.innerHTML = "", G.viewports.splice(this.index, 1);
  }
}
class Xh {
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  visible = !0;
  composition = null;
  constructor(e = {}) {
    this.id = G.idCnt++, this.hit = new G.Hit({
      layer: this,
      contextType: e.contextType
    }), this.scene = new G.Scene({
      layer: this,
      contextType: e.contextType
    }), e.x && e.y && this.setPosition(e.x, e.y), e.width && e.height && this.setSize(e.width, e.height), e.composition && this.setComposition(e.composition);
  }
  get index() {
    let e = this.viewport.layers,
      i = 0,
      s;
    for (s of e) {
      if (this.id === s.id) return i;
      i++;
    }
    return null;
  }
  setPosition(e, i) {
    return this.x = e, this.y = i, this;
  }
  setSize(e, i) {
    return this.width = e, this.height = i, this.scene.setSize(e, i), this.hit.setSize(e, i), this;
  }
  setComposition(e) {
    if (Hr.includes(e)) return this.composition = e, this;
  }
  move(e) {
    let {
        index: i,
        viewport: s
      } = this,
      n = s.layers,
      o;
    switch (typeof e == "number" && (o = _(Math.floor(e), (n.length - 1) * -1, n.length - 1), e = "order"), e) {
      case "up":
        i < n.length - 1 && (n[i] = n[i + 1], n[i + 1] = this);
        break;
      case "down":
        i > 0 && (n[i] = n[i - 1], n[i - 1] = this);
        break;
      case "top":
        n.splice(i, 1), n.push(this);
        break;
      case "bottom":
        n.splice(i, 1), n.unshift(this);
        break;
      case "order":
        Aa(n, this.index, o);
        break;
    }
    return this;
  }
  moveUp() {
    return this.move("up");
  }
  moveDown() {
    return this.move("down");
  }
  moveTop() {
    return this.move("top");
  }
  moveBottom() {
    return this.move("bottom");
  }
  remove() {
    this.viewport.layers.splice(this.index, 1);
  }
}
class Kh {
  width = 0;
  height = 0;
  constructor(e) {
    e || (e = {}), this.id = G.idCnt++, this.layer = e.layer, this.contextType = e.contextType || "2d", this.canvas = document.createElement("canvas"), this.canvas.className = "scene-canvas", this.canvas.style.display = "block", this.context = this.canvas.getContext(this.contextType), e.width && e.height && this.setSize(e.width, e.height);
  }
  setSize(e, i) {
    return Br(e, i, this);
  }
  clear() {
    return Ur(this);
  }
  toImage(e = "image/png", i, s) {
    let n = this,
      o = new Image(),
      a = this.canvas.toDataURL(e, i);
    o.onload = function () {
      o.width = n.width, o.height = n.height, s(o);
    }, o.src = a;
  }
  export(e, i, s = "image/png", n) {
    typeof i != "function" && (i = this.blobCallback.bind({
      cfg: e
    })), this.canvas.toBlob(i, s, n);
  }
  exportHit(e, i, s = "image/png", n) {
    typeof i != "function" && (i = this.blobCallback.bind({
      cfg: e
    })), this.layer.hit.canvas.toBlob(i, s, n);
  }
  blobCallback(e) {
    let i = document.createElement("a"),
      s = URL.createObjectURL(e),
      n = this.cfg.fileName || "canvas.png";
    i.setAttribute("href", s), i.setAttribute("target", "_blank"), i.setAttribute("download", n), document.createEvent ? Object.assign(document.createElement("a"), {
      href: s,
      target: "_blank",
      download: n
    }).click() : i.click && i.click();
  }
}
class jh {
  width = 0;
  height = 0;
  constructor(e) {
    e || (e = {}), this.layer = e.layer, this.contextType = e.contextType || "2d", this.canvas = document.createElement("canvas"), this.canvas.className = "hit-canvas", this.canvas.style.display = "none", this.canvas.style.position = "relative", this.context = this.canvas.getContext(this.contextType, {
      preserveDrawingBuffer: !0,
      antialias: !1
    }), e.width && e.height && this.setSize(e.width, e.height);
  }
  setSize(e, i) {
    return Br(e, i, this);
  }
  clear() {
    return Ur(this);
  }
  getIntersection(e, i) {
    let s = this.context,
      n;
    if (e = Math.round(e - this.layer.x), i = Math.round(i - this.layer.y), e < 0 || i < 0 || e > this.width || i > this.height) return -1;
    if (this.contextType === "2d") {
      if (n = s.getImageData(e, i, 1, 1).data, n[3] < 255) return -1;
    } else if (n = new Uint8Array(4), s.readPixels(e * G.pixelRatio, (this.height - i - 1) * G.pixelRatio, 1, 1, s.RGBA, s.UNSIGNED_BYTE, n), n[0] === 255 && n[1] === 255 && n[2] === 255) return -1;
    return this.rgbToInt(n);
  }
  getIndexValue(e) {
    let i = this.intToRGB(e);
    return "rgb(" + i[0] + ", " + i[1] + ", " + i[2] + ")";
  }
  rgbToInt(e) {
    let i = e[0],
      s = e[1],
      n = e[2];
    return (i << 16) + (s << 8) + n;
  }
  intToRGB(e) {
    let i = (e & 16711680) >> 16,
      s = (e & 65280) >> 8,
      n = e & 255;
    return [i, s, n];
  }
}
function Ur(r) {
  let e = r.context;
  return r.contextType === "2d" ? e.clearRect(0, 0, r.width * G.pixelRatio, r.height * G.pixelRatio) : e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT), r;
}
function Br(r, e, i) {
  return i.width = r, i.height = e, i.canvas.width = r * G.pixelRatio, i.canvas.style.width = `${r}px`, i.canvas.height = e * G.pixelRatio, i.canvas.style.height = `${e}px`, i.contextType === "2d" && G.pixelRatio !== 1 && i.context.scale(G.pixelRatio, G.pixelRatio), i;
}
const G = {
    idCnt: 0,
    viewports: [],
    pixelRatio: window && window.devicePixelRatio || 1,
    Node: $r,
    Viewport: qh,
    Layer: Xh,
    Scene: Kh,
    Hit: jh
  },
  Ft = G;
class Zh {
  #e;
  #t;
  #n;
  #r;
  #i;
  constructor(e, i = []) {
    this.#n = e, this.#e = e.core, this.#r = new be([...i]);
    for (const [s, n] of this.#r) this.addOverlay(s, n);
  }
  log(e) {
    this.#e.log(e);
  }
  info(e) {
    this.#e.info(e);
  }
  warn(e) {
    this.#e.warn(e);
  }
  error(e) {
    this.#e.error(e);
  }
  get core() {
    return this.#e;
  }
  get parent() {
    return this.#n;
  }
  get layerConfig() {
    return this.#n.layerConfig().layerConfig;
  }
  get list() {
    return this.#r;
  }
  get scale() {
    return this.#n.parent.scale;
  }
  get time() {
    return this.#n.parent.time;
  }
  start() {
    this.eventsListen();
  }
  destroy() {
    if (this.#r.size != 0) for (let e of this.#r.keys()) this.removeOverlay(e);
  }
  eventsListen() {}
  on(e, i, s) {
    this.#e.on(e, i, s);
  }
  off(e, i) {
    this.#e.off(e, i);
  }
  emit(e, i) {
    this.#e.emit(e, i);
  }
  get(e) {
    return this.#r.get(e);
  }
  addOverlays(e) {
    let i = [],
      s,
      n;
    for (let o of e) n = this.addOverlay(o[0], o[1]), s = n.instance?.id || o[0], i.push([s, n]);
    return i;
  }
  addOverlay(e, i) {
    try {
      const s = new Ft.Layer(this.layerConfig);
      return this.parent.viewport.addLayer(s), i.layer = s, i.instance = new i.class(s, this.#n.TimeLine, this.#n.Scale, this.#e.theme, this, i.params), E(i.instance?.id) || (i.instance.id = e), this.#r.set(i.instance.id, i), !0;
    } catch (s) {
      return console.error(`Error: Cannot instantiate ${e} overlay / indicator`), console.error(s), !1;
    }
  }
  removeOverlay(e) {
    if (this.#r.has(e)) {
      const i = this.#r.get(e);
      i.instance?.isIndicator || i.instance.destroy(), i.layer.remove(), this.#r.delete(e);
    }
  }
}
class wi extends kr {
  #e;
  #t;
  #n;
  #r = Ke[0];
  #i = "automatic";
  #s = {
    automatic: {
      get max() {
        return this.range?.valueMax;
      },
      get min() {
        return this.range?.valueMin;
      },
      get mid() {
        return this.range?.valueMin + this.range?.valueDiff * 0.5;
      },
      get diff() {
        return this.range?.valueDiff;
      },
      get zoom() {
        return 1;
      },
      get offset() {
        return 0;
      },
      range: null
    },
    manual: {
      max: 1,
      min: 0,
      mid: 0.5,
      diff: 1,
      zoom: 1,
      offset: 0
    }
  };
  #l = 1.04;
  #o = pn;
  #c = Fa;
  #a = 3;
  #h;
  #d;
  #u;
  constructor(e, i, s = Ke[0], n) {
    super(e), this.#n = i, this.#t = e, this.#e = e.parent, this.yAxisType = s, n = n || this.core.range, this.setRange(n);
  }
  get chart() {
    return this.#n;
  }
  get range() {
    return this.#u;
  }
  get height() {
    return this.chart.height;
  }
  get rangeH() {
    return this.#u.diff * this.yAxisPadding;
  }
  get yAxisRatio() {
    return this.getYAxisRatio();
  }
  get yAxisPrecision() {
    return this.yAxisCalcPrecision;
  }
  set yAxisPadding(e) {
    this.#l = e;
  }
  get yAxisPadding() {
    return this.#l;
  }
  set yAxisType(e) {
    this.#r = Ke.includes(e) ? e : Ke[0];
  }
  get yAxisType() {
    return this.#r;
  }
  set yAxisStep(e) {
    this.#o = T(e) ? e : pn;
  }
  get yAxisStep() {
    return this.#o;
  }
  set yAxisTicks(e) {
    this.#a = T(e) ? e : 0;
  }
  get yAxisTicks() {
    return this.#a;
  }
  get yAxisGrads() {
    return this.#h;
  }
  get yAxisDigits() {
    return this.parent.digitCnt;
  }
  get step() {
    return this.#d;
  }
  set mode(e) {
    this.setMode(e);
  }
  get mode() {
    return this.#i;
  }
  set offset(e) {
    this.setOffset(e);
  }
  get offset() {
    return this.#u.offset;
  }
  set zoom(e) {
    this.setZoom(e);
  }
  get zoom() {
    return this.#u.zoom;
  }
  getYAxisRatio() {
    return this.height / this.#u.diff;
  }
  yAxisRangeBounds() {}
  yAxisLog() {}
  yAxisCntDigits(e) {
    return this.countDigits(e);
  }
  yAxisCalcPrecision() {
    let e = this.numDigits(this.#u.max);
    return this.yDigits - e;
  }
  yAxisCursor() {}
  yPos(e) {
    switch (this.yAxisType) {
      case "percent":
        return we(this.p100toPixel(e));
      case "log":
        return we(this.$2Pixel(Pa(e)));
      default:
        return we(this.$2Pixel(e));
    }
  }
  yPos2Price(e) {
    return this.pixel2$(e);
  }
  $2Pixel(e) {
    const i = e - this.#u.min;
    return this.height - i * this.yAxisRatio;
  }
  lastYData2Pixel(e) {
    let i = e - this.core.stream.lastPriceMin;
    return this.height - i * this.yAxisRatio;
  }
  pixel2$(e) {
    let i = (this.height - e) / this.height,
      s = this.#u.diff * i;
    return this.#u.min + s;
  }
  p100toPixel(e) {
    let i = this.#u.max,
      s = this.height / (i - this.#u.min);
    return Math.floor(i - this.#u.max), (e - i) * -1 * s;
  }
  yAxisTransform() {}
  setMode(e) {
    if (!["automatic", "manual"].includes(e)) return !1;
    const i = this.#s;
    return this.mode == "automatic" && e == "manual" ? (i.manual.zoom = 0, i.manual.max = this.#u.valueMax, i.manual.min = this.#u.valueMin, this.#i = e, this.core.emit("yaxis_setmode", {
      mode: e,
      axis: this
    })) : this.mode == "manual" && e == "automatic" && (i.manual.zoom = 0, this.#i = e, this.core.emit("yaxis_setmode", {
      mode: e,
      axis: this
    })), !0;
  }
  setOffset(e) {
    if (!T(e) || e == 0 || this.#i !== "manual") return !1;
    const i = this.#s;
    let s = this.pixel2$(e * -1),
      n = this.pixel2$(this.height - e),
      o = s - n;
    i.manual.min = n, i.manual.max = s, i.manual.mid = o / 2, i.manual.diff = o, i.manual.zoom = 0;
  }
  setZoom(e) {
    if (!T(e) || this.#i !== "manual") return !1;
    const i = this.#s;
    let s = i.manual.min,
      n = i.manual.max;
    const o = n - s,
      a = o * 0.01,
      l = e * a;
    s -= l, n += l, !(n < s || s <= 1 / 0 * -1 || n >= 1 / 0) && (i.manual.max = n, i.manual.min = s, i.manual.mid = o / 2, i.manual.diff = o, i.manual.zoom = l, this.calcGradations());
  }
  setRange(e) {
    this.#s.automatic.range = e, this.#u = new Proxy(e, {
      get: (i, s) => {
        const n = this.#i,
          o = this.#s;
        switch (s) {
          case "max":
            return o[n][s];
          case "min":
            return o[n][s];
          case "mid":
            return o[n][s];
          case "diff":
            return o[n][s];
          case "zoom":
            return o[n][s];
          case "offset":
            return o[n][s];
          default:
            return i[s];
        }
      }
    });
  }
  calcGradations() {
    let e, i, s;
    switch (this.yAxisType) {
      case "percent":
        e = this.#u.max > -10 ? this.#u.max : 110, i = this.#u.min > -10 ? this.#u.min : -10, s = this.#u.offset, this.#h = this.gradations(e + s, i + s);
        break;
      default:
        e = this.#u.max > 0 ? this.#u.max : 1, i = this.#u.min > 0 ? this.#u.min : 0, s = this.#u.offset, this.#h = this.gradations(e + s, i + s);
        break;
    }
    return this.#h;
  }
  gradations(e, i, s = !0) {
    let n, o, a;
    const l = [];
    o = e - i, o = this.rangeH > 0 ? this.rangeH : 1, a = o / (this.height / (this.core.theme.yAxis.fontSize * 1.75));
    let h = Math.pow(10, Math.ceil(Math.log10(a)));
    a < 0.25 * h ? h = 0.25 * h : a < 0.5 * h && (h = 0.5 * h);
    var m = Math.ceil(i / h) * h,
      g = Math.floor(e / h) * h;
    let v = this.height,
      S = (g - m) / h;
    this.height / S;
    let A = this.countDigits(h),
      L;
    this.#d = A;
    for (var O = m; O <= g; O += h) n = this.countDigits(O), L = this.limitPrecision(n, A), v = this.yPos(L), l.push([L, v, n]);
    return l;
  }
  niceValue(e, i = this.#d) {
    let s = i.integers,
      n = i.decimals,
      o = e.value;
    if (e.integers > 1) {
      if (s - 2 > 0) {
        let a = Ma(10, s - 2);
        return Math.floor(o / a) * a;
      } else return n == 0 ? Math.floor(o) : un(o, n);
    } else return n == 0 ? 0 : un(o, n);
  }
  limitPrecision(e) {
    let {
        sign: i,
        integers: s,
        decimals: n,
        value: o
      } = e,
      a = this.yAxisDigits - 1,
      l = `${o}`,
      h = "",
      m = 0,
      g = 0;
    return i = i ? 0 : 1, i > 0 && (h += "-", m++), s == 0 ? (h += "0", m++) : (h += l.slice(m, s), m += s), m + 1 < a && n > 0 && (h += `${l.slice(m)}`, g = a - (m + 1), g = n < g ? n : g, h = Number.parseFloat(h).toFixed(g)), h;
  }
}
class W {
  #e;
  #t;
  #n = {};
  #r;
  #i;
  #s;
  #l;
  #o;
  #c;
  #a;
  #h = {
    valueMax: null,
    valueMin: null,
    indexStart: null,
    Length: null,
    rowsW: null,
    rowsH: null,
    refresh: !1
  };
  id;
  constructor(e, i = !1, s = !1, n, o, a = {}) {
    this.#t = o.core, this.#e = o, this.#n = o.core.config, this.#l = e, this.#o = e.scene, this.#c = e.hit, this.#r = n, this.#i = i, this.#s = s, this.#a = a;
  }
  get core() {
    return this.#t;
  }
  get parent() {
    return this.#e;
  }
  get target() {
    return this.#l;
  }
  get config() {
    return this.#n;
  }
  get params() {
    return this.#a;
  }
  get scene() {
    return this.#o;
  }
  get hit() {
    return this.#c;
  }
  get theme() {
    return this.#r;
  }
  get chart() {
    return this.#e.parent.parent;
  }
  get xAxis() {
    return this.getXAxis();
  }
  get yAxis() {
    return this.getYAxis();
  }
  get overlay() {
    return this.#a.overlay;
  }
  get context() {
    return this.contextIs();
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  destroy() {}
  on(e, i, s) {
    this.#t.on(e, i, s);
  }
  off(e, i) {
    this.#t.off(e, i);
  }
  emit(e, i) {
    this.core.emit(e, i);
  }
  setSize(e, i) {
    this.#l.setSize(e, i), this.#h.refresh = !0;
  }
  setRefresh() {
    this.#h.refresh = !0;
  }
  getXAxis() {
    return this.#i instanceof vi ? this.#i : this.core.Chart.time.xAxis instanceof vi ? this.core.Chart.time.xAxis : "time" in this.#e ? this.#e.time.xAxis : !1;
  }
  getYAxis() {
    return this.#s instanceof wi ? this.#s : this.chart.yAxis instanceof wi ? this.chart.yAxis : "scale" in this.#e ? this.#e.scale.yAxis : !1;
  }
  contextIs() {
    return !this.#i && !this.#s ? "chart" : this.#i instanceof vi ? "timeline" : this.#s instanceof wi ? "scale" : !1;
  }
  mustUpdate() {
    const e = this.#t.range,
      i = this.#h;
    return this.#t.MainPane.elRows, i.valueMax !== e.valueMax || i.valueMin !== e.valueMin || i.indexStart !== e.indexStart || i.Length !== e.Length || i.refresh ? this.#h : !1;
  }
  updated() {
    const e = this.#t.range,
      i = this.#h,
      s = this.#t.MainPane.elRows;
    i.valueMax = e.valueMax, i.valueMin = e.valueMin, i.indexStart = e.indexStart, i.Length = e.Length, i.rowsW = s.width, i.rowsH = s.height, i.rowsW = s.width, i.rowsH = s.height, i.refresh = !1;
  }
}
exports.Overlay = W;
class Ai extends W {
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a), this.params.axes = a?.axes || "both";
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw(e) {
    if (!super.mustUpdate() || (e = e || this.params.axes, this.scene.clear(), e == "none")) return;
    const i = this.scene.context;
    if (i.save(), i.strokeStyle = this.core.theme.chart.GridColour || Or.COLOUR_GRID, e != "y") {
      const n = this.xAxis.xAxisGrads.values;
      for (let o of n) {
        let a = we(o[1]);
        i.beginPath(), i.moveTo(a + 0, 0), i.lineTo(a + 0, this.scene.height), i.stroke();
      }
    }
    if (e != "x") {
      const s = this.yAxis.yAxisGrads;
      for (let n of s) {
        let o = this.yAxis.$2Pixel(n[0]);
        i.beginPath(), i.moveTo(0, o), i.lineTo(this.scene.width, o), i.stroke();
      }
    }
    i.restore(), super.updated();
  }
  drawX() {
    this.draw("x");
  }
}
function _s(r, e) {
  return Math.round(r.measureText(e).width);
}
function wt(r = xe.fontSize, e = xe.fontWeight, i = xe.fontFamily) {
  return `${e} ${r}px ${i}`;
}
function ki(r, e, i) {
  r.font = wt(i?.fontSize, i?.fontWeight, i?.fontFamily);
  const s = _s(r, e),
    n = i?.paddingLeft || 0,
    o = i?.paddingRight || 0,
    a = i?.borderWidth || 0;
  return n + o + s + a * 2;
}
function _i(r) {
  const e = r?.paddingTop || 0,
    i = r?.paddingBottom || 0,
    s = r?.borderWidth || 0,
    n = r?.fontSize || 0;
  return e + i + n + s * 2;
}
function Vr(r, e, i, s) {
  r.fillStyle = s?.colour, r.font = wt(s?.fontSize, s?.fontWeight, s?.fontFamily), r.textAlign = s?.textAlign || "start", r.textBaseline = s?.textBaseLine || "alphabetic", r.direction = s?.direction || "inherit", r.lineWidth = s?.width, r.strokeStyle = s?.border, s?.stroke ? r.strokeText(s?.text, e, i, s?.max) : r.fillText(s?.text, e, i, s?.max);
}
function yt(r, e, i, s, n) {
  r.save(), r.font = wt(n?.fontSize, n?.fontWeight, n?.fontFamily), r.textBaseline = "top", r.fillStyle = n?.bakCol || xe.bakCol;
  let o = n?.width || ki(r, e, n),
    a = n?.height || _i(n);
  r.fillRect(i, s, o, a), r.fillStyle = n?.txtCol || xe.txtCol, i = i + n?.paddingLeft, s = s + n?.paddingTop, r.fillText(`${e}`, i, s), r.restore();
}
class ws extends W {
  #e = [0, 0];
  #t = !0;
  #n;
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a), this.core.on("chart_pan", this.onMouseDragX, this), this.core.on("chart_panDone", this.onMouseDragX, this), this.core.on("main_mousemove", this.onMouseMoveX, this), this.#n = new Le(this.target.viewport.container, {
      disableContextMenu: !1
    }), this.#n.on("pointermove", this.onMouseMove.bind(this)), this.#n.on("pointerenter", this.onMouseMove.bind(this));
  }
  destroy() {
    super.destroy(), this.core.off("chart_pan", this.onMouseDragX, this), this.core.off("chart_panDone", this.onMouseDragX, this), this.core.off("main_mousemove", this.onMouseMoveX, this);
  }
  set position(e) {}
  get update() {
    return this.#t;
  }
  get always() {
    return !0;
  }
  onMouseDragX(e) {
    this.#e[0] = e[0], this.#e[1] = e[1], this.draw(!0), this.core.emit("chart_render");
  }
  onMouseMoveX(e) {
    this.#e[0] = e[0], this.draw(), this.core.emit("chart_render");
  }
  onMouseMove(e) {
    const i = b(e) ? e.position.x : e[0],
      s = b(e) ? e.position.y : e[1];
    this.#e[0] = i, this.#e[1] = s, this.draw(), this.core.emit("chart_render");
  }
  draw(e = !1) {
    const i = this.target.viewport.container.getBoundingClientRect();
    let s = this.core.mousePos.y - i.top,
      n = this.core.mousePos.x - i.left;
    e || (n = this.xAxis.xPosSnap2CandlePos(n) + this.xAxis.scrollOffsetPx), this.scene.clear();
    const o = this.scene.context;
    o.save(), o.setLineDash([5, 5]);
    const a = this.xAxis.smoothScrollOffset || 0;
    o.strokeStyle = "#666", o.beginPath(), o.moveTo(n + a, 0), o.lineTo(n + a, this.scene.height), o.stroke(), this.chart.cursorActive && (o.beginPath(), o.moveTo(0, s), o.lineTo(this.scene.width, s), o.stroke()), o.restore(), this.chart.scale.overlays.cursor.instance.scaleDraw();
  }
}
class zr extends W {
  #e = [0, 0];
  constructor(e, i, s, n, o, a) {
    o = s, s = s.yAxis, super(e, i, s, n, o, a), this.viewport = e.viewport;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw() {}
  scaleDraw() {
    if (!this.parent.parent.cursorActive) return;
    const e = this.target.viewport.container.getBoundingClientRect();
    let i = this.core.mousePos.y - e.top,
      s = this.parent.yPos2Price(i),
      n = this.parent.nicePrice(s),
      o = {
        fontSize: this.theme.yAxis.fontSize * 1.05,
        fontWeight: this.theme.yAxis.fontWeight,
        fontFamily: this.theme.yAxis.fontFamily,
        txtCol: this.theme.yAxis.colourCursor,
        bakCol: this.theme.yAxis.colourCursorBG,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 3,
        paddingRight: 3,
        width: this.viewport.width
      },
      a = o.fontSize + o.paddingTop + o.paddingBottom,
      l = i - a * 0.5;
    const h = this.scene.context;
    this.scene.clear(), h.save(), h.fillStyle = o.bakCol, h.fillRect(1, l, this.width, a), yt(h, `${n}`, 1, l, o), h.restore();
  }
  erase() {
    this.scene.clear(), this.target.viewport.render();
  }
}
const Jh = [["grid", {
  class: Ai,
  fixed: !0
}], ["cursor", {
  class: ws,
  fixed: !0
}]];
class vt {
  #e;
  #t;
  #n;
  #r;
  #i;
  #s;
  #l;
  #o;
  #c;
  #a;
  constructor(e, i, s, n = !1) {
    this.#r = e, this.#e = e.core, this.#t = this.core.config, this.#n = this.core.theme, this.#l = this.#r.element, this.#c = i, this.createViewport(s, n);
  }
  get parent() {
    return this.#r;
  }
  get core() {
    return this.#e;
  }
  get config() {
    return this.#t;
  }
  set width(e) {
    this.setWidth(e);
  }
  get width() {
    return this.#l.getBoundingClientRect().width;
  }
  set height(e) {
    this.setHeight(e);
  }
  get height() {
    return this.#l.getBoundingClientRect().height;
  }
  get dimensions() {
    return D.elementDimPos(this.#l);
  }
  set layerWidth(e) {
    this.#a = e;
  }
  get layerWidth() {
    return this.#a;
  }
  get stateMachine() {
    return this.#r.stateMachine;
  }
  set state(e) {
    this.#e.setState(e);
  }
  get state() {
    return this.#e.getState();
  }
  get data() {
    return this.#e.chartData;
  }
  get range() {
    return this.#e.range;
  }
  get stream() {
    return this.#e.stream;
  }
  get TimeLine() {
    return this.#e.TimeLine;
  }
  get xAxis() {
    return this.#e.TimeLine.xAxis;
  }
  get Scale() {
    return this.#r.Scale;
  }
  get yAxis() {
    return this.#r.Scale.yAxis;
  }
  get viewport() {
    return this.#i;
  }
  get overlays() {
    return this.#s;
  }
  destroy() {
    this.#s.destroy(), this.#i.destroy();
  }
  setSize(e, i, s) {
    const n = this.#s.list;
    this.#i.setSize(e, i);
    for (let [o, a] of n) a.instance.setSize(s, i);
    this.draw(), this.render();
  }
  createViewport(e = [], i = !1) {
    e = e.length == 0 ? ce(Jh) : e;
    const {
      width: s,
      height: n
    } = this.layerConfig();
    let o = i ? Ft.Node : Ft.Viewport;
    this.#i = new o({
      width: s,
      height: n,
      container: this.#c
    }), this.#o = this.#i.scene.canvas, this.#s = new Zh(this, e);
  }
  layerConfig() {
    const e = this.config?.buffer || Oi,
      i = this.#c.getBoundingClientRect().width,
      s = this.#c.getBoundingClientRect().height;
    this.layerWidth = Math.round(i * ((100 + e) * 0.01));
    const n = {
      width: this.layerWidth,
      height: s
    };
    return {
      width: i,
      height: s,
      layerConfig: n
    };
  }
  addOverlays(e) {
    return this.#s.addOverlays(e);
  }
  addOverlay(e, i) {
    return this.#s.addOverlay(e, i);
  }
  removeOverlay(e) {
    return this.#s.removeOverlay(e);
  }
  draw(e = this.range, i = !1) {
    const s = (n, o) => {
      !b(o) || !U(o?.instance?.draw) || (i && o.instance.setRefresh(), o.instance.draw(), o.fixed || (o.instance.position = [this.#e.scrollPos, 0]));
    };
    this.executeOverlayList(s);
  }
  drawAll() {
    const e = (i, s) => {
      s.instance.mustUpdate();
    };
    this.executeOverlayList(e);
  }
  executeOverlayList(e) {
    const i = this.#s.list;
    if (!(i instanceof be)) return !1;
    let s = [];
    for (let [n, o] of i) try {
      e(n, o);
    } catch (a) {
      s.push(a);
    }
    return s.length > 0 ? this.#e.error(s) : s = !0, s;
  }
  render() {
    this.#i.render();
  }
  refresh() {
    this.draw(void 0, !0), this.render();
  }
}
class Qh extends W {
  #e = [0, 0];
  #t;
  constructor(e, i = !1, s = !1, n, o, a) {
    i = o.time.xAxis, super(e, i, s, n, o);
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw(e) {
    if (!super.mustUpdate()) return;
    this.scene.clear();
    const i = this.scene.context,
      s = this.xAxis.xAxisGrads.values,
      n = 0,
      o = this.theme.xAxis,
      a = K(o.tickMarker) ? o.tickMarker : !0;
    i.save(), i.strokeStyle = o.colourTick, i.fillStyle = o.colourTick, i.font = `${o.fontWeight} ${o.fontSize}px ${o.fontFamily}`;
    for (let l of s) {
      let h = we(l[1]),
        m = Math.floor(i.measureText(`${l[0]}`).width * 0.5);
      i.fillText(l[0], h - m + n, this.xAxis.xAxisTicks + 12), a && (i.beginPath(), i.moveTo(h + n, 0), i.lineTo(h + n, this.xAxis.xAxisTicks), i.stroke());
    }
    i.restore(), super.updated();
  }
}
class ec extends W {
  #e = [0, 0];
  #t;
  constructor(e, i = !1, s = !1, n, o, a) {
    i = o.time.xAxis, super(e, i, s, n, o);
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw() {
    this.scene.clear();
    const e = this.scene.context;
    this.xAxis.xAxisGrads.values, this.theme.xAxis, e.save(), e.restore();
  }
}
class tc extends W {
  #e = [0, 0];
  constructor(e, i = !1, s = !1, n, o) {
    i = o.time.xAxis, super(e, i, s, n, o), this.viewport = e.viewport;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw() {
    const e = this.scene.context,
      i = this.target.viewport.container.getBoundingClientRect(),
      s = this.core.mousePos.x - i.left;
    let n = this.xAxis.xPos2Time(s),
      o = new Date(n),
      a = o.toUTCString(),
      l = {
        fontSize: this.theme.xAxis.fontSize * 1.05,
        fontWeight: this.theme.xAxis.fontWeight,
        fontFamily: this.theme.xAxis.fontFamily,
        txtCol: this.theme.xAxis.colourCursor,
        bakCol: this.theme.xAxis.colourCursorBG,
        paddingTop: 5,
        paddingBottom: 3,
        paddingLeft: 4,
        paddingRight: 4
      },
      h = ki(e, a, l),
      m = s + this.core.bufferPx;
    m = this.xAxis.xPosSnap2CandlePos(m), m = m - Math.round(h * 0.5) - this.core.scrollPos - this.core.bufferPx, this.scene.clear(), e.save(), yt(e, a, m, 1, l), e.restore();
  }
}
const ic = [["labels", {
  class: Qh,
  fixed: !1,
  required: !0
}], ["overlay", {
  class: ec,
  fixed: !1,
  required: !0
}], ["cursor", {
  class: tc,
  fixed: !1,
  required: !0
}]];
class sc {
  #e;
  #t = "Timeline";
  #n = "time";
  #r;
  #i;
  #s;
  #l;
  #o;
  #c;
  #a;
  #h;
  #d;
  #u = new be();
  #m = [];
  #y;
  #g;
  #b;
  #w;
  #p;
  #S;
  #C;
  #f;
  #E;
  #x;
  #O;
  #M;
  #L;
  #T;
  #A = {
    width: 20,
    height: 20,
    fill: "#aaa"
  };
  #P = {
    end: !1,
    start: !1
  };
  constructor(e, i) {
    this.#s = e, this.#r = i, this.#i = i.elements.elTime, this.#l = e.Chart, this.#o = new vi(this, this.#l), this.init();
  }
  log(e) {
    this.#s.log(e);
  }
  info(e) {
    this.#s.info(e);
  }
  warn(e) {
    this.#s.warn(e);
  }
  error(e) {
    this.#s.error(e);
  }
  set id(e) {
    this.#e = $e(e);
  }
  get id() {
    return this.#e ? `${this.#e}` : `${this.#s.id}-${this.#n}`.replace(/ |,|;|:|\.|#/g, "_");
  }
  get name() {
    return this.#t;
  }
  get shortName() {
    return this.#n;
  }
  get options() {
    return this.#r;
  }
  get core() {
    return this.#s;
  }
  get element() {
    return this.#i;
  }
  get elViewport() {
    return this.#a;
  }
  get height() {
    return this.#i.height;
  }
  set width(e) {
    this.setWidth(e);
  }
  get width() {
    return this.#i.width;
  }
  get xAxis() {
    return this.#o;
  }
  get xAxisWidth() {
    return this.#o.width;
  }
  get xAxisRatio() {
    return this.#o.xAxisRatio;
  }
  get layerCursor() {
    return this.#E;
  }
  get layerLabels() {
    return this.#C;
  }
  get layerOverlays() {
    return this.#f;
  }
  get overlays() {
    return Object.fromEntries([...this.#d.overlays.list]);
  }
  get xAxisGrads() {
    return this.#o.xAxisGrads;
  }
  get candleW() {
    return this.#o.candleW;
  }
  get candlesOnLayer() {
    return this.#o.candlesOnLayer;
  }
  get theme() {
    return this.#s.theme;
  }
  get config() {
    return this.#s.config;
  }
  get graph() {
    return this.#d;
  }
  get navigation() {
    return this.#y;
  }
  get range() {
    return this.#s.range;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return D.elementDimPos(this.#i);
  }
  get bufferPx() {
    return this.#s.bufferPx;
  }
  get scrollPos() {
    return this.#s.scrollPos;
  }
  get scrollOffsetPx() {
    return this.#s.scrollPos % this.candleW;
  }
  get smoothScrollOffset() {
    return this.#s.smoothScrollOffset;
  }
  get rangeScrollOffset() {
    return this.#s.rangeScrollOffset;
  }
  set stateMachine(e) {
    this.#c = new ze(e, this);
  }
  get stateMachine() {
    return this.#c;
  }
  get time() {
    return this;
  }
  init() {
    const e = this.#i;
    this.#a = e.viewport, this.#h = e.overview, this.#g = e.overview.icons, this.#b = e.overview.scrollBar, this.#w = e.overview.handle, this.#p = e.overview.rwdStart, this.#S = e.overview.fwdEnd;
    const i = {
      core: this.#s,
      elContainer: this.#b,
      elHandle: this.#w,
      callback: null
    };
    this.#T = new ks(i), this.#s.theme?.time?.navigation === !1 && this.navigationDisplay(!1);
  }
  setWidth(e) {
    this.#i.style.width = `${e}px`, this.#a.style.width = `${e}px`;
  }
  setDimensions(e) {
    const i = this.config.buffer || Oi,
      s = e.w,
      n = this.height,
      o = Math.round(s * ((100 + i) * 0.01));
    this.#d.setSize(s, n, o), this.draw();
  }
  navigationDisplay(e) {
    if (e) this.#S.style["margin-top"] = 0, this.#p.style["margin-top"] = 0;else {
      const i = this.core.theme.xAxis?.background ? this.core.theme.xAxis.Background : this.core.theme.chart.Background;
      this.#h.style.visibility = "hidden", this.#S.style["margin-top"] = `${this.#a.clientHeight * -1}px`, this.#p.style["margin-top"] = `${this.#a.clientHeight * -1}px`, this.#S.style.background = this.core.theme.chart.Background, this.#p.style.background = i;
    }
  }
  start() {
    this.createGraph(), this.onSetRange(), this.#o.initXAxisGrads(), this.draw(), this.eventsListen(), ts.id = this.id, ts.context = this, this.stateMachine = ts, this.stateMachine.start();
  }
  destroy() {
    this.stateMachine.destroy(), this.#x.destroy(), this.#O.destroy(), this.#M.destroy(), this.off("main_mousemove", this.drawCursorTime), this.off("setRange", this.onSetRange), this.#S.removeEventListener("click", ke), this.#p.removeEventListener("click", ke), this.#d.destroy(), this.element.remove();
  }
  eventsListen() {
    this.#x = new Le(this.#a, {
      disableContextMenu: !1
    }), this.#x.on("dblclick", this.onDoubleClick.bind(this)), this.#x.on("pointerover", this.onPointerEnter.bind(this)), this.#x.on("pointerout", this.onPointerLeave.bind(this)), this.#x.on("pointerdrag", this.onPointerDrag.bind(this)), this.#O = new Le(this.#S, {
      disableContextMenu: !1
    }), this.#O.on("pointerover", () => this.showJump(this.#P.end)), this.#O.on("pointerleave", () => this.hideJump(this.#P.end)), this.#M = new Le(this.#p, {
      disableContextMenu: !1
    }), this.#M.on("pointerover", () => this.showJump(this.#P.start)), this.#M.on("pointerleave", () => this.hideJump(this.#P.start)), this.on("main_mousemove", this.#E.draw, this.#E), this.on("setRange", this.onSetRange, this), this.#S.addEventListener("click", ke(this.onMouseClick, 1e3, this, !0)), this.#p.addEventListener("click", ke(this.onMouseClick, 1e3, this, !0));
  }
  on(e, i, s) {
    this.#s.on(e, i, s);
  }
  off(e, i) {
    this.#s.off(e, i);
  }
  emit(e, i) {
    this.#s.emit(e, i);
  }
  onMouseClick(e) {
    switch (e?.currentTarget?.id || e.target.parentElement.id) {
      case "fwdEnd":
        this.onFwdEnd();
        break;
      case "rwdStart":
        this.onRwdStart();
        break;
    }
  }
  onPointerEnter(e) {
    e.domEvent.target.style.cursor = "ew-resize", this.#h.style.visibility = "visible", this.hideCursorTime();
  }
  onPointerLeave(e) {
    this.#s.theme?.time?.navigation === !1 && !(this.#P.end && this.#P.start) && (this.#h.style.visibility = "hidden");
  }
  onPointerDrag(e) {
    let i = this.range,
      s = i.indexStart - e.movement.x,
      n = i.indexEnd;
    i.set(s, n);
  }
  onDoubleClick(e) {
    this.core.jumpToEnd(), this.core.MainPane.draw(void 0, !0);
  }
  onFwdEnd() {
    this.core.jumpToEnd(), this.core.MainPane.draw(void 0, !0);
  }
  onRwdStart() {
    this.core.jumpToStart(), this.core.MainPane.draw(void 0, !0);
  }
  onSetRange() {
    let e = this.range,
      i = e.indexStart;
    e.indexEnd;
    let s = this.#b.getBoundingClientRect().width,
      n = e.dataLength + e.limitFuture + e.limitPast,
      o = s / n,
      a = e.Length * o,
      l = (i + e.limitPast) * o;
    this.#T.setHandleDims(l, a);
  }
  t2Index(e) {
    return this.#o.t2Index(e);
  }
  xPos(e) {
    return this.#o.xPos(e);
  }
  xPosSnap2CandlePos(e) {
    return this.#o.xPosSnap2CandlePos(e);
  }
  xPos2Time(e) {
    return this.#o.xPos2Time(e);
  }
  xPos2Index(e) {
    return this.#o.xPos2Index(e);
  }
  xPosOHLCV(e) {
    return this.#o.xPosOHLCV(e);
  }
  createGraph() {
    let e = ce(ic);
    this.#d = new vt(this, this.#a, e, !1), this.#E = this.graph.overlays.get("cursor").instance, this.#C = this.graph.overlays.get("labels").instance, this.#f = this.graph.overlays.get("overlay").instance, this.graph.addOverlays(this.#m);
  }
  addOverlays(e) {
    if (!isArray(e)) return !1;
    this.graph === void 0 ? this.#m.push(...e) : this.graph.addOverlays(e);
  }
  addOverlay(e, i) {
    if (!isObject(i)) return !1;
    if (this.graph === void 0) this.#m.push([e, i]);else return this.graph.addOverlay(e, i);
  }
  render() {
    this.#d.render();
  }
  draw(e = this.range, i = !0) {
    this.#d.draw(e, i);
  }
  hideCursorTime() {
    this.#d.overlays.list.get("cursor").layer.visible = !1, this.#s.MainPane.draw();
  }
  showCursorTime() {
    this.#d.overlays.list.get("cursor").layer.visible = !0, this.#s.MainPane.draw();
  }
  hideJump(e) {
    this.#s.theme?.time?.navigation === !1 && (this.#h.style.visibility = "hidden");
  }
  showJump(e) {
    this.#h.style.visibility = "visible", this.hideCursorTime();
  }
}
const nc = {
    renderQ: new be(),
    rendered: [],
    renderLog: !1,
    dropFrames: !0,
    graphs: [],
    range: {},
    init: function (r) {
      b(r) && (this.renderLog = r?.renderLog || !1, this.dropFrames = r?.dropFrames || !0, this.graphs = M(r?.graphs) ? [...r.graphs] : [], this.range = b(r?.range) ? r.range : {});
    },
    queueFrame: function (r = this.range, e = this.graphs, i = !1) {
      this.renderQ.size > 1 && this.dropFrames && (i = this.dropFrame() || i);
      const s = Date.now();
      return r = r.snapshot(), this.renderQ.set(s, {
        graphs: e,
        range: r,
        update: i
      }), s;
    },
    dropFrame: function (r = -1) {
      let e = !1;
      return r === -1 && (r = this.renderQ.lastKey()), this.renderQ.size > 1 && this.renderQ.has(r) && (e = r.update, this.renderQ.delete(r)), e;
    },
    getFrame: function (r = 0) {
      return this.renderQ.has(r) ? this.renderQ.get(r) : this.renderQ.firstValue();
    },
    frameDone: function () {
      if (this.renderQ.size === 0) return;
      const r = this.renderQ.firstKey();
      this.renderLog && this.rendered.push([r, Date.now()]), this.renderQ.delete(r);
    },
    start: function () {
      requestAnimationFrame(this.execute.bind(this));
    },
    execute: function () {
      if (requestAnimationFrame(this.execute.bind(this)), this.renderQ.size === 0) return;
      const [r, e] = this.renderQ.firstEntry();
      if (e.range?.snapshot) {
        for (let i of e.graphs) U(i.draw) && i.draw(e.range, e.update);
        for (let i of e.graphs) U(i.render) && i.render();
        this.frameDone();
      }
    }
  },
  rc = nc,
  tr = ["-webkit-touch-callout", "-webkit-user-select", "-khtml-user-select", "-moz-user-select", "-ms-user-select", "user-select"];
class oc {
  #e;
  #t;
  #n;
  #r;
  #i;
  #s;
  #l;
  #o = [];
  #c;
  #a = {};
  #h;
  #d;
  #u = null;
  constructor(e, i) {
    this.#e = e, this.#t = i, this.#n = i.core, this.#r = i.core.theme.legend, this.init(), this.eventsListen();
  }
  get elTarget() {
    return this.#e;
  }
  get list() {
    return this.#a;
  }
  set collapse(e) {
    this.setCollapse(e);
  }
  get collapse() {
    return this.#l;
  }
  destroy() {
    this.#n.off("chart_pan", this.primaryPanePan), this.#n.off("chart_panDone", this.primaryPanePanDone);
    for (let e in this.#a) e !== "collapse" && this.remove(e);
    this.#e.remove();
  }
  eventsListen() {
    this.#n.on("chart_pan", this.primaryPanePan, this), this.#n.on("chart_panDone", this.primaryPanePanDone, this);
  }
  init() {
    const e = this.#e.legends;
    this.#s = e.querySelector(".controls"), this.#l = e.querySelectorAll(".control"), this.#h = e.querySelector("#showLegends"), this.#d = e.querySelector("#hideLegends"), this.#s.style.display = "none", this.icons(this.#l, {
      id: "collapse",
      parent: this
    }), this.#e.legends.classList.add("hide"), this.#u = "hide", this.collapse = "show";
  }
  onMouseClick(e) {
    const i = s => E(s.dataset.icon) ? {
      id: s.id,
      icon: s.dataset.icon,
      parent: s.parentElement
    } : s.parentElement.className !== "controls" ? i(s.parentElement) : !1;
    return i(e);
  }
  onMouseOver(e) {}
  onLegendAction(e) {
    const i = this.onMouseClick(e.currentTarget);
    this.setCollapse(i.icon);
  }
  setCollapse(e) {
    e === "show" && this.#u !== "show" ? (this.#u = e, this.#h.style.display = "none", this.#d.style.display = "inline-block", this.#e.legends.classList.toggle("hide")) : e === "hide" && this.#u !== "hide" && (this.#u = e, this.#h.style.display = "inline-block", this.#d.style.display = "none", this.#e.legends.classList.toggle("hide"));
  }
  primaryPanePan() {
    for (let e of tr) this.#e.style.setProperty(e, "none");
  }
  primaryPanePanDone() {
    for (let e of tr) this.#e.style.removeProperty(e);
  }
  add(e) {
    if (!b(e) || !("title" in e)) return !1;
    const i = () => {
      this.#n.error("ERROR: Legend parent missing!");
    };
    e.id = e?.id || Z("legend"), e.type = e?.type || "overlay", e.parent = e?.parent || i;
    const s = this.elTarget.buildLegend(e, this.#n.theme);
    this.#e.legends.insertAdjacentHTML("beforeend", s);
    const n = this.#e.legends.querySelector(`#legend_${e.id}`);
    return this.#c = n.querySelectorAll(".control"), this.#a[e.id] = {
      el: n,
      type: e.type,
      source: e?.source,
      click: []
    }, this.icons(this.#c, e), e.type == "indicator" && (this.#s.style.display = "block", !e.parent.primaryPane && Object.keys(this.#a).length < 3 && (this.#s.style.display = "none")), e.id;
  }
  remove(e) {
    if (!(e in this.#a) || this.#a[e].type === "chart") return !1;
    this.#a[e].el.remove();
    for (let i of this.#a[e].click) i.el.removeEventListener("click", i.click);
    return delete this.#a[e], Object.keys(this.#a).length < 2 && (this.#s.style.display = "none"), !0;
  }
  update(e, i) {
    if (!b(i) || !(e in this.#a) || this.#n.range.data.length == 0) return !1;
    let s = this.#a[e].source(i.pos);
    const n = this.#e.buildInputs(s);
    this.#e.legends.querySelector(`#legend_${e} dl`).innerHTML = n;
  }
  icons(e, i) {
    let s;
    for (let n of e) {
      let o = n.querySelector("svg");
      o.style.width = `${this.#r.controlsW}px`, o.style.height = `${this.#r.controlsH}px`, o.style.fill = `${this.#r.controlsColour}`, o.onpointerover = a => a.currentTarget.style.fill = this.#r.controlsOver, o.onpointerout = a => a.currentTarget.style.fill = this.#r.controlsColour, s = i.parent.onLegendAction.bind(i.parent), i.id === "collapse" ? this.#o.push({
        el: n,
        click: s
      }) : this.#a[i.id].click.push({
        el: n,
        click: s
      }), n.addEventListener("click", s);
    }
  }
}
const is = {
    id: "chart",
    initial: "idle",
    context: {},
    states: {
      idle: {
        onEnter(r) {
          this.context.origin.cursor = "crosshair";
        },
        onExit(r) {},
        on: {
          xAxis_scale: {
            target: "xAxis_scale",
            action(r) {}
          },
          chart_yAxisRedraw: {
            target: "chart_yAxisRedraw",
            action(r) {}
          },
          chart_tool: {
            target: "chart_tool",
            action(r) {}
          },
          tool_activated: {
            target: "tool_activated",
            action(r) {
              this.context.origin.cursor = "default";
            }
          }
        }
      },
      xAxis_scale: {
        onEnter(r) {},
        onExit(r) {},
        on: {
          Idle: {
            target: "idle",
            action(r) {}
          }
        }
      },
      chart_yAxisRedraw: {
        onEnter(r) {},
        onExit(r) {},
        on: {
          always: {
            target: "idle",
            condition: "yAxisRedraw",
            action(r) {
              this.context.origin.drawGrid();
            }
          }
        }
      },
      tool_activated: {
        onEnter(r) {},
        onExit(r) {},
        on: {
          tool_targetSelected: {
            target: "idle",
            condition: "toolSelectedThis",
            action(r) {
              console.log("tool_targetSelected:", r);
            }
          }
        }
      }
    },
    guards: {
      priceMaxMin() {
        return !0;
      },
      toolSelectedThis(r, e) {
        return this.eventData === this.context;
      },
      yAxisRedraw() {
        return !0;
      },
      zoomDone() {
        return !0;
      }
    }
  },
  ac = {
    id: "scale",
    initial: "idle",
    context: {},
    states: {
      idle: {
        onEnter(r) {
          this.context.origin.cursor = "ns-resize";
        },
        onExit(r) {},
        on: {
          resize: {
            target: "resize",
            action(r) {}
          },
          yAxis_scale: {
            target: "scale",
            action(r) {}
          },
          yAxis_inc: {
            target: "incremental",
            action(r) {}
          },
          yAxis_log: {
            target: "logarithmic",
            action(r) {}
          },
          yAxis_100: {
            target: "percentual",
            action(r) {}
          },
          setRange: {
            target: "setRange",
            action(r) {}
          }
        }
      },
      resize: {
        onEnter(r) {},
        onExit(r) {},
        on: {
          someEvent: {
            target: "",
            action(r) {}
          }
        }
      },
      setRange: {
        onEnter(r) {},
        onExit(r) {},
        on: {
          always: {
            target: "idle",
            condition: "zoomDone",
            action(r) {
              this.context.origin.draw();
            }
          }
        }
      }
    },
    guards: {
      receiver() {
        return this.eventData.scale.id == this.context.origin.id;
      },
      zoomDone() {
        return !0;
      }
    }
  };
class lc extends W {
  constructor(e, i, s, n, o, a) {
    o = s, s = s.yAxis, super(e, i, s, n, o, a), this.viewport = e.viewport;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  get always() {
    return !0;
  }
  draw() {
    if (!super.mustUpdate()) return;
    const e = this.scene.context,
      i = this.yAxis,
      s = this.yAxis.calcGradations() || [],
      n = this.theme.yAxis,
      o = K(n.tickMarker) ? n.tickMarker : !0;
    let a = [],
      l;
    switch (n?.location) {
      case "left":
        a = [this.width, this.width - i.yAxisTicks];
        break;
      case "right":
      default:
        a = [1, i.yAxisTicks];
        break;
    }
    this.scene.clear(), e.save(), e.strokeStyle = n.colourTick, e.fillStyle = n.colourTick, e.font = `${n.fontWeight} ${n.fontSize}px ${n.fontFamily}`;
    for (let h of s) l = i.$2Pixel(h[0]), e.fillText(h[0], i.yAxisTicks + 5, l + n.fontSize * 0.3), o && (e.beginPath(), e.moveTo(a[0], l), e.lineTo(a[1], l), e.stroke());
    e.restore(), super.updated();
  }
}
class hc extends W {
  constructor(e, i, s, n, o, a) {
    o = s, s = s.yAxis, super(e, i, s, n, o, a), this.viewport = e.viewport;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw() {
    const e = this.scene.context;
    this.yAxis.yAxis, this.scene.clear(), e.save(), e.restore();
  }
}
class cc extends W {
  constructor(e, i, s, n, o, a) {
    o = s, s = s.yAxis, super(e, i, s, n, o, a), this.viewport = e.viewport;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw(e) {
    if (e === void 0) return;
    const i = this.scene.context,
      s = this.core.stream instanceof mt && this.config.stream.tfCountDown;
    let n = e[4],
      o = this.parent.nicePrice(n),
      a = {
        fontSize: Pe.FONTSIZE * 1.05,
        fontWeight: Pe.FONTWEIGHT,
        fontFamily: Pe.FONTFAMILY,
        txtCol: "#FFFFFF",
        bakCol: Pe.COLOUR_CURSOR_BG,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 5,
        paddingRight: 3,
        width: this.viewport.width
      },
      l = 0,
      h = _i(a),
      m = this.parent.yPos(n) - h * 0.5;
    this.scene.clear(), i.save(), e[4] >= e[1] ? a.bakCol = this.theme.candle.UpBodyColour : a.bakCol = this.theme.candle.DnBodyColour, yt(i, o, l, m, a), s && (o = this.core.stream.countDownUpdate(), a.fontSize = a?.fontSize / 1.1, yt(i, o, l, m + h, a)), i.restore(), this.viewport.render();
  }
}
const uc = [["labels", {
  class: lc,
  fixed: !0,
  required: !0
}], ["overlay", {
  class: hc,
  fixed: !0,
  required: !0
}], ["price", {
  class: cc,
  fixed: !0,
  required: !0
}], ["cursor", {
  class: zr,
  fixed: !0,
  required: !0
}]];
class dc {
  #e;
  #t = "Y Scale Axis";
  #n = "scale";
  #r;
  #i;
  #s;
  #l;
  #o;
  #c;
  #a;
  #h;
  #d;
  #u;
  #m;
  #y;
  #g;
  #b = new be();
  #w = [];
  #p;
  #S;
  #C;
  #f;
  #E;
  #x = {};
  constructor(e, i) {
    this.#r = e, this.#i = {
      ...i
    }, this.#h = this.#i.elScale, this.#o = this.#i.chart, this.#s = this.#i.parent, this.id = `${this.#s.id}_scale`, this.init();
  }
  log(e) {
    this.#r.log(e);
  }
  info(e) {
    this.#r.info(e);
  }
  warn(e) {
    this.#r.warn(e);
  }
  error(e) {
    this.#r.error(e);
  }
  set id(e) {
    this.#e = $e(e);
  }
  get id() {
    return this.#e ? `${this.#e}` : `${this.#r.id}-${this.#n}`.replace(/ |,|;|:|\.|#/g, "_");
  }
  get name() {
    return this.#t;
  }
  get shortName() {
    return this.#n;
  }
  get core() {
    return this.#r;
  }
  get options() {
    return this.#i;
  }
  get parent() {
    return this.#s;
  }
  set height(e) {
    this.setHeight(e);
  }
  get height() {
    return this.#h.getBoundingClientRect().height;
  }
  get width() {
    return this.#h.getBoundingClientRect().width;
  }
  get element() {
    return this.#h;
  }
  set cursor(e) {
    this.#h.style.cursor = e;
  }
  get cursor() {
    return this.#h.style.cursor;
  }
  get layerCursor() {
    return this.#g;
  }
  get layerLabels() {
    return this.#u;
  }
  get layerOverlays() {
    return this.#m;
  }
  get layerPriceLine() {
    return this.#y;
  }
  get overlays() {
    return Object.fromEntries([...this.#p.overlays.list]);
  }
  get yAxis() {
    return this.#a;
  }
  set yAxisType(e) {
    this.#a.yAxisType = YAXIS_TYPES.includes(e) ? e : YAXIS_TYPES[0];
  }
  get yAxisType() {
    return this.#a.yAxisType;
  }
  get yAxisHeight() {
    return this.#a.height;
  }
  get yAxisRatio() {
    return this.#a.yAxisRatio;
  }
  get yAxisGrads() {
    return this.#a.yAxisGrads;
  }
  set graph(e) {
    this.#p = e;
  }
  get graph() {
    return this.#p;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return D.elementDimPos(this.#h);
  }
  get theme() {
    return this.#r.theme;
  }
  get config() {
    return this.#r.config;
  }
  get digitCnt() {
    return this.#S;
  }
  set scaleRange(e) {
    this.setScaleRange(e);
  }
  set rangeMode(e) {
    this.#a.mode = e;
  }
  get rangeMode() {
    return this.#a.mode;
  }
  set rangeYFactor(e) {
    this.core.range.yFactor(e);
  }
  set yOffset(e) {
    this.#a.offset = e;
  }
  get yOffset() {
    return this.#a.offset;
  }
  set stateMachine(e) {
    this.#l = new ze(e, this);
  }
  get stateMachine() {
    return this.#l;
  }
  get Scale() {
    return this;
  }
  init() {
    this.#d = this.#h.viewport || this.#h;
  }
  start() {
    const e = this.#s.name == "Chart" ? void 0 : this.#s.localRange;
    this.#a = new wi(this, this, this.options.yAxisType, e), this.createGraph(), this.#a.calcGradations(), this.draw(), this.eventsListen();
    const i = ce(ac);
    i.id = this.id, i.context = this, this.stateMachine = i, this.stateMachine.start();
  }
  restart() {
    this.#a.setRange(this.#r.range), this.draw();
  }
  destroy() {
    this.stateMachine.destroy(), this.#p.destroy(), this.#C.destroy(), this.off(`${this.#s.id}_mousemove`, this.onMouseMove, this), this.off(`${this.#s.id}_mouseout`, this.#g.erase, this.#g), this.off(_e, this.onStreamUpdate, this.#y), this.element.remove();
  }
  eventsListen() {
    let e = this.#p.viewport.scene.canvas;
    this.#C = new Le(e, {
      disableContextMenu: !1
    }), this.#C.setCursor("ns-resize"), this.#C.on("pointerdrag", this.onDrag.bind(this)), this.#C.on("pointerdragend", this.onDragDone.bind(this)), this.#C.on("wheel", this.onMouseWheel.bind(this)), this.#C.on("dblclick", this.resetScaleRange.bind(this)), this.on(`${this.#s.id}_mousemove`, this.onMouseMove, this), this.on(`${this.#s.id}_mouseout`, this.#g.erase, this.#g), this.on(_e, this.#y.draw, this.#y);
  }
  on(e, i, s) {
    this.core.on(e, i, s);
  }
  off(e, i) {
    this.core.off(e, i);
  }
  emit(e, i) {
    this.core.emit(e, i);
  }
  onResize(e) {
    this.setDimensions(e);
  }
  onMouseMove(e) {
    this.#E = M(e) ? e : [Math.floor(e.position.x), Math.floor(e.position.y)], this.#g.draw(this.#E);
  }
  onDrag(e) {
    this.#E = [Math.floor(e.position.x), Math.floor(e.position.y), e.dragstart.x, e.dragstart.y, e.movement.x, e.movement.y], this.setScaleRange(Math.sign(e.movement.y));
  }
  onDragDone(e) {}
  onMouseWheel(e) {
    e.domEvent.preventDefault(), this.setScaleRange(Math.sign(e.wheeldelta) * -1);
  }
  onStreamUpdate(e) {}
  onChartDrag(e) {
    this.#a.mode === "manual" && (this.#a.offset = e.domEvent.srcEvent.movementY, this.draw());
  }
  setHeight(e) {
    this.#h.style.height = `${e}px`;
  }
  setDimensions(e) {
    const i = this.#h.getBoundingClientRect().width;
    this.setHeight(e.h), this.graph instanceof vt && (this.#p.setSize(i, e.h, i), this.draw()), this.#g instanceof zr && this.calcPriceDigits();
  }
  setScaleRange(e = 0) {
    this.#a.mode == "automatic" && (this.#a.mode = "manual"), this.#a.zoom = e, this.draw(this.range, !0), this.#r.MainPane.draw();
  }
  resetScaleRange() {
    this.#a.mode = "automatic", this.draw(this.range, !0), this.#r.MainPane.draw();
  }
  yPos(e) {
    return this.#a.yPos(e);
  }
  yPosStream(e) {
    return this.#a.lastYData2Pixel(e);
  }
  yPos2Price(e) {
    return this.#a.yPos2Price(e);
  }
  nicePrice(e) {
    let i = this.#a.countDigits(e);
    return this.#a.limitPrecision(i);
  }
  createGraph() {
    let e = ce(uc);
    this.graph = new vt(this, this.#d, e, !1), this.#g = this.graph.overlays.get("cursor").instance, this.#u = this.graph.overlays.get("labels").instance, this.#m = this.graph.overlays.get("overlay").instance, this.#y = this.graph.overlays.get("price").instance, this.graph.addOverlays(this.#w), this.#y.target.moveTop(), this.#g.target.moveTop(), this.calcPriceDigits();
  }
  calcPriceDigits() {
    const e = this.#g.viewport.scene.context,
      i = this.theme.yAxis;
    e.font = wt(i.fontSize, i.fontWeight, i.fontFamily);
    const s = _s(e, "0");
    this.#S = Math.floor(this.width / s);
  }
  addOverlays(e) {
    if (!M(e)) return !1;
    this.graph === void 0 ? this.#w.push(...e) : this.graph.addOverlays(e);
  }
  addOverlay(e, i) {
    if (!b(i)) return !1;
    if (this.graph === void 0) this.#w.push([e, i]);else {
      let s = this.graph.addOverlay(e, i);
      return this.#y.target.moveTop(), this.#g.target.moveTop(), s;
    }
  }
  render() {
    this.#p.render();
  }
  draw(e = this.range, i = !0) {
    this.#p.draw(e, i), this.#s.drawGrid(i), this.parent.draw(this.range, !0);
  }
  resize(e = this.width, i = this.height) {
    this.setDimensions({
      w: e,
      h: i
    });
  }
}
class mc {
  constructor(e, i) {
    this.scene = e, this.ctx = this.scene.context, this.width = this.scene.width, this.cfg = i;
  }
  draw(e) {
    const i = this.ctx,
      n = e.raw[4] >= e.raw[1] ? this.cfg.volume.UpColour : this.cfg.volume.DnColour;
    i.save(), i.strokeStyle = n, i.fillStyle = n, i.fillRect(Math.floor(e.x), Math.floor(e.z - e.h), Math.floor(e.w), Math.floor(e.h)), i.restore();
  }
}
class pc extends W {
  #e;
  #t;
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a), this.#e = new mc(e.scene, n), this.theme.volume.Height = _(n?.volume?.Height, 0, 100) || 100;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw(e = this.core.range) {
    if (!super.mustUpdate()) return;
    this.scene.clear();
    const i = e.data,
      s = this.scene.height,
      n = this.xAxis.smoothScrollOffset || 0;
    let o = Math.max(this.xAxis.candleW - 1, 1);
    o < 3 ? o = 1 : o < 5 ? o = 3 : o > 5 && (o = Math.ceil(o * 0.8));
    const a = {
        x: 0 + n - this.xAxis.candleW,
        w: o,
        z: s
      },
      l = Math.floor(s * this.theme.volume.Height / 100);
    let h = this.core.rangeScrollOffset,
      m = e.indexStart - h,
      g = e.Length + h * 2,
      v = g,
      S = m,
      A,
      L = 0;
    for (; v--;) A = e.value(S), A[4] !== null && (L = A[5] > L ? A[5] : L), S++;
    for (; g--;) A = e.value(m), a.x = we(this.xAxis.xPos(A[0]) - o / 2), A[4] !== null && (a.h = l - l * ((L - A[5]) / L), a.raw = i[m], this.#e.draw(a)), m++;
    super.updated();
  }
}
class Wr {
  areaCoordinates = [];
  constructor(e, i) {
    this.scene = e, this.ctx = this.scene.context, this.width = this.scene.width, this.cfg = i;
  }
  draw(e) {
    const i = this.ctx,
      s = e.raw[4] >= e.raw[1],
      n = s ? this.cfg.candle.UpBodyColour : this.cfg.candle.DnBodyColour,
      o = s ? this.cfg.candle.UpWickColour : this.cfg.candle.DnWickColour;
    switch (this.cfg.candle.Type) {
      case X.CANDLE_SOLID:
        this.fill = !0;
        break;
      case X.CANDLE_HOLLOW:
      case X.OHLC:
        this.fill = !1;
        break;
      case X.CANDLE_UP_HOLLOW:
        this.fill = !s;
        break;
      case X.CANDLE_DOWN_HOLLOW:
        this.fill = s;
    }
    let a = Math.max(e.w - 1, 1);
    a < 3 ? a = 1 : a < 5 ? a = 3 : a > 5 && (a = Math.ceil(a * 0.8));
    let l = Math.max(Math.floor(a * 0.5), 1),
      h = Math.abs(e.o - e.c),
      m = e.c === e.o ? 1 : 2,
      g = e.x,
      v = Math.floor(g) - 0.5;
    if (i.save(), i.strokeStyle = o, i.beginPath(), i.moveTo(v, Math.floor(e.h)), this.cfg.candle.Type === X.OHLC ? i.lineTo(v, Math.floor(e.l)) : s ? (i.lineTo(v, Math.floor(e.c)), i.moveTo(v, Math.floor(e.o))) : (i.lineTo(v, Math.floor(e.o)), i.moveTo(v, Math.floor(e.c))), i.lineTo(v, Math.floor(e.l)), i.stroke(), a == 3) {
      i.fillStyle = o;
      let S = s ? 1 : -1;
      i.rect(Math.floor(g - l), e.c, Math.floor(l * 2), S * Math.max(h, m)), i.fill(), i.stroke();
    } else if (a > 3 && this.fill) {
      i.fillStyle = n;
      let S = s ? 1 : -1;
      i.rect(Math.floor(g - l), e.c, Math.floor(l * 2), S * Math.max(h, m)), i.fill(), i.stroke();
    } else if (a > 3 && !this.fill && this.cfg.candle.Type !== X.OHLC) {
      let S = s ? 1 : -1;
      i.rect(Math.floor(g - l), e.c, Math.floor(l * 2), S * Math.max(h, m)), i.stroke();
    } else this.cfg.candle.Type === X.OHLC ? (i.beginPath(), i.moveTo(v - l, e.o), i.lineTo(v, e.o), i.moveTo(v, e.c), i.lineTo(v + l, e.c), i.stroke()) : (i.strokeStyle = o, i.beginPath(), i.moveTo(v, Math.floor(Math.min(e.o, e.c))), i.lineTo(v, Math.floor(Math.max(e.o, e.c)) + (e.o === e.c ? 1 : 0)), i.stroke());
    i.restore();
  }
  body(e) {}
  area(e) {
    this.areaCoordinates.push(e);
  }
  areaRender() {
    const e = this.areaCoordinates;
    if (!M(e) || e.length == 0) return;
    let i = this.ctx,
      s = this.cfg.candle,
      n;
    Math.max(e[0].w - 1, 1), e[0].x;
    let o = [e[0].x, e[0].h];
    i.save(), i.strokeStyle = s.AreaLineColour || s.UpBodyColour || s.DnBodyColour, i.lineWidth = 1, i.beginPath(), i.moveTo(e[0].x, e[0].h);
    let a = 0;
    for (; a < e.length;) i.lineTo(e[a].x, e[a].h), a++;
    if (s?.Type == "area") {
      if (n = i.createLinearGradient(0, 0, 0, this.scene.height), M(s.AreaFillColour)) for (let [l, h] of s.AreaFillColour.entries()) n.addColorStop(l, h);else E() ? n = s.AreaFillColour : n = s.UpBodyColour || s.DnBodyColour;
      i.stroke(), i.lineTo(e[a - 1].x, this.scene.height), i.lineTo(o[0], this.scene.height), i.fillStyle = n, i.closePath(), i.fill();
    } else i.stroke();
    i.restore(), e.length = 0;
  }
}
class Fr extends W {
  #e;
  constructor(e, i = !1, s = !1, n, o) {
    super(e, i, s, n, o), this.#e = new Wr(e.scene, n);
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  draw(e = this.core.range) {
    if (!super.mustUpdate()) return;
    this.scene.clear();
    let i,
      s = this.theme.candle.Type;
    switch (s) {
      case X.AREA:
      case X.LINE:
        i = g => {
          this.#e.area({
            ...g
          });
        };
        break;
      default:
        i = g => {
          this.#e.draw(g);
        };
        break;
    }
    const o = {
      x: (this.xAxis.smoothScrollOffset || 0) - this.xAxis.candleW,
      w: this.xAxis.candleW
    };
    let a = this.core.rangeScrollOffset,
      l = e.indexStart - a,
      h = e.Length + a * 2,
      m;
    for (this.core.stream && (this.core.stream.lastPriceMax = e.valueMax, this.core.stream.lastPriceMin = e.valueMin); h;) {
      if (l >= 0) {
        if (m = e.value(l), o.x = this.xAxis.xPos(m[0]), m?.[7]) {
          this.core.stream.lastXPos = o.x, this.core.stream.lastYPos = {
            ...o
          };
          break;
        }
        m[4] !== null && (o.o = this.yAxis.yPos(m[1]), o.h = this.yAxis.yPos(m[2]), o.l = this.yAxis.yPos(m[3]), o.c = this.yAxis.yPos(m[4]), o.raw = m, i(o));
      }
      l++, h--;
    }
    (s === X.AREA || s === X.LINE) && this.#e.areaRender(), super.updated();
  }
}
function Gr(r, e, i, s, n, o) {
  r.lineWidth = o?.width || xe.borderWidth, r.strokeStyle = o?.border || xe.stroke, r.beginPath(), r.rect(e, i, s, n), r.stroke();
}
function Hs(r, e, i, s, n, o) {
  r.fillStyle = o?.fill || xe.fill, r.fillRect(e, i, s, n);
}
function gc(r, e, i, s, n, o) {
  E(o.fill) && Hs(r, e, i, s, n, o), T(o.width) && o.width > 0 && Gr(r, e, i, s, n, o);
}
function Yr(r, e, i, s, n, o, a) {
  r.lineWidth = a?.width || xe.borderWidth, r.strokeStyle = a?.border || xe.stroke, Xr(r, e, i, s, n, o), r.stroke();
}
function qr(r, e, i, s, n, o, a) {
  r.fillStyle = a?.fill || xe.fill, Xr(r, e, i, s, n, o), r.fill();
}
function Xr(r, e, i, s, n, o) {
  r.beginPath(), r.moveTo(e + o, i), r.arcTo(e + s, i, e + s, i + n, o), r.arcTo(e + s, i + n, e, i + n, o), r.arcTo(e, i + n, e, i, o), r.arcTo(e, i, e + s, i, o), r.closePath();
}
function fc(r, e, i, s, n, o, a) {
  E(a.fill) && qr(r, e, i, s, n, o, a?.fill), T(a.width) && a.width > 0 && Yr(r, e, i, s, n, o, a?.border, a?.width);
}
function Kr(r, e, i, s, n, o, a) {
  if (!(n < 3)) {
    var l = Math.PI * 2 / n;
    r.beginPath(), r.translate(e, i), r.rotate(o * Math.PI / 180), r.moveTo(s, 0);
    for (var h = 1; h < n; h++) r.lineTo(s * Math.cos(l * h), s * Math.sin(l * h));
    r.closePath(), xt(r, a?.fill, a?.stroke, a?.width);
  }
}
function yc(r, e, i) {
  if (e.length > 0) {
    r.beginPath();
    var s = e[0];
    r.moveTo(s.x, s.y);
    for (var n = 1; n < e.length; ++n) s = e[n], r.lineTo(s.x, s.y);
    r.closePath(), xt(r, i?.fill, i?.stroke, i?.width);
  }
}
function vc(r, e, i, s, n) {
  Kr(r, e, i, s, 3, n?.rotate || 0, n), xt(r, n?.fill, n?.stroke, n?.width);
}
function wc(r, e, i, s, n, o) {
  r.beginPath(), r.moveTo(e - s / 2, i), r.lineTo(e, i - n / 2), r.lineTo(e + s / 2, i), r.lineTo(e, i + n / 2), r.closePath(), xt(r, o?.fill, o?.stroke, o?.width);
}
function xc(r, e, i, s, n) {
  r.beginPath(), r.arc(e, i, s, 0, Math.PI * 2), r.closePath(), fillStroke(r, n?.fill, n?.stroke, n?.width);
}
function bc(r) {
  return r.ownerDocument && r.ownerDocument.defaultView && r.ownerDocument.defaultView.devicePixelRatio || 2;
}
function xt(r, e, i, s) {
  E(e) && (r.fillStyle = e, r.fill()), T(s) && s > 0 && (r.lineWidth = s, r.strokeStyle = i || xe.stroke, r.stroke());
}
function jr(r, e, i, s, n, o, a, l, h, m) {
  r.drawImage(e, i, s, n, o, a, l, h, m);
}
function Zr(r, e) {
  let i = r.naturalWidth || r.width,
    s = r.naturalHeight || r.height;
  return e === void 0 && (e = Jr(i, s)), e.ctx.drawImage(r, 0, 0), e;
}
const Cc = {
  red: "#FF0000FF",
  green: "#00FF00FF",
  blue: "#0000FFFF",
  alpa: "#000000FF"
};
function Ot(r, e) {
  const i = Zr(e),
    s = i.ctx;
  return s.fillStyle = Cc[r], s.globalCompositeOperation = "multiply", s.fillRect(0, 0, s.canvas.width, s.canvas.height), s.globalCompositeOperation = "destination-in", s.drawImage(e, 0, 0), s.globalCompositeOperation = "source-over", i;
}
function Tc(r) {
  return {
    red: Ot("red", r),
    green: Ot("green", r),
    blue: Ot("blue", r),
    alpha: Ot("alpha", r)
  };
}
function Jr(r, e) {
  const i = document.createElement("canvas");
  return i.ctx = i.getContext("2d", {
    willReadFrequently: !0
  }), i.width = r || i.ctx.canvas.width, i.height = e || i.ctx.canvas.height, i;
}
const ne = exports.canvas = {
  createCanvas: Jr,
  imageToCanvs: Zr,
  seperateRGB: Tc,
  getChannel: Ot,
  getPixelRatio: bc,
  fillStroke: xt,
  calcTextWidth: _s,
  createFont: wt,
  getTextRectHeight: _i,
  getTextRectWidth: ki,
  renderImage: jr,
  renderText: Vr,
  renderTextBG: yt,
  renderPath: bt,
  renderPathStroke: Ec,
  renderPathClosed: Sc,
  renderSpline: Pc,
  renderLine: Ac,
  renderLineHorizontal: Gt,
  renderLineVertical: Mc,
  renderCircle: xc,
  renderRect: gc,
  renderRectFill: Hs,
  renderRectStroke: Gr,
  renderRectRound: fc,
  renderRectRoundFill: qr,
  renderRectRoundStroke: Yr,
  renderPolygonRegular: Kr,
  renderPolygonIrregular: yc,
  renderDiamond: wc,
  renderTriangle: vc
};
function bt(r, e, i, s) {
  r.save();
  const n = i.width || 1;
  r.lineWidth = n, n % 2 && r.translate(0.5, 0.5), r.strokeStyle = i.stroke, M(i.dash) && r.setLineDash(i.dash), r.beginPath();
  let o = !0;
  e.forEach(a => {
    a && a.x !== null && (o ? (r.moveTo(a.x, a.y), o = !1) : r.lineTo(a.x, a.y));
  }), s(), r.restore();
}
function Ec(r, e, i) {
  bt(r, e, i, () => {
    r.stroke();
  });
}
function Sc(r, e, i) {
  bt(r, e, i, () => {
    r.closePath();
  }), xt(r, opts?.fill, opts?.stroke, opts?.size);
}
function Pc(r, e, i) {
  r.beginPath(), r.moveTo(e[0].x, e[0].y);
  for (var s = i ?? 1, n = 0; n < e.length - 1; n++) {
    var o = n > 0 ? e[n - 1] : e[0],
      a = e[n],
      l = e[n + 1],
      h = n != e.length - 2 ? e[n + 2] : l,
      m = a.x + (l.x - o.x) / 6 * s,
      g = a.y + (l.y - o.y) / 6 * s,
      v = l.x - (h.x - a.x) / 6 * s,
      S = l.y - (h.y - a.y) / 6 * s;
    r.bezierCurveTo(m, g, v, S, l.x, l.y);
  }
  r.stroke();
}
function Gt(r, e, i, s, n) {
  bt(r, [{
    x: i,
    y: e
  }, {
    x: s,
    y: e
  }], n, () => {
    r.stroke(), r.closePath();
  });
}
function Mc(r, e, i, s, n) {
  coords = [{
    x: e,
    y: i
  }, {
    x: e,
    y,
    bottom: s
  }], bt(r, coords, n, () => {
    r.stroke(), r.closePath();
  });
}
function Ac(r, e, i) {
  bt(r, e, i, () => {
    r.stroke(), r.closePath();
  });
}
class Lc extends W {
  #e;
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a), this.#e = new Wr(e.scene, n), this.theme.priceLineStyle = this.theme?.priceLineStyle || Dh;
  }
  set position(e) {
    this.setPosition(e[0], e[1]);
  }
  setPosition(e, i) {
    this.core.stream !== void 0 && (this.target.setPosition(e, i), this.core.stream.lastScrollPos = this.core.scrollPos);
  }
  draw() {
    if (this.core.stream === void 0 || !M(this.chart.streamCandle)) return;
    this.scene.clear();
    const e = this.core.range,
      i = this.chart.streamCandle,
      s = this.theme.candle.Type === X.AREA || this.theme.candle.Type === X.LINE ? a => {
        this.areaRender(a);
      } : a => {
        this.#e.draw(a);
      };
    this.xAxis.smoothScrollOffset;
    const o = {
      x: this.core.stream.lastXPos,
      w: this.xAxis.candleW
    };
    o.o = this.yAxis.yPos(i[1]), o.h = this.yAxis.yPos(i[2]), o.l = this.yAxis.yPos(i[3]), o.c = this.yAxis.yPos(i[4]), o.raw = i, e.inRenderRange(i[0]) && s(o), i[4] >= i[1] ? this.theme.priceLineStyle.stroke = this.core.theme.candle.UpBodyColour : this.theme.priceLineStyle.stroke = this.core.theme.candle.DnBodyColour, Gt(this.scene.context, o.c, 0, this.target.width, this.theme.priceLineStyle);
  }
  areaRender(e) {
    const i = this.core.range,
      s = i.value(i.data.length - 2);
    if (s === null) return;
    const n = {
        x: this.xAxis.xPos(s[0]),
        o: this.yAxis.yPos(s[1]),
        h: this.yAxis.yPos(s[2]),
        l: this.yAxis.yPos(s[3]),
        c: this.yAxis.yPos(s[4])
      },
      o = this.scene.context,
      a = this.theme,
      l = a.candle.UpBodyColour || a.candle.DnBodyColour;
    Math.max(e.w - 1, 1), e.x;
    let h;
    if (o.save(), o.fillStyle = l, o.strokeStyle = l, o.lineWidth = 1, o.beginPath(), o.moveTo(e.x, e.c), o.lineTo(n.x, n.h), a.candle.Type === X.AREA) {
      if (h = o.createLinearGradient(0, 0, 0, this.scene.height), M(a.candle.AreaFillColour)) for (let [m, g] of a.candle.AreaFillColour.entries()) h.addColorStop(m, g);else isString() ? h = a.candle.AreaFillColour : h = a.candle.UpBodyColour || a.candle.DnBodyColour;
      o.stroke(), o.lineTo(n.x, this.scene.height), o.lineTo(e.x, this.scene.height), o.fillStyle = h, o.closePath(), o.fill();
    } else o.stroke();
    o.restore();
  }
}
const Rt = {
  colour: "#4444cc88",
  wdith: 1,
  dash: [1, 0]
};
class Nc extends W {
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a);
    const l = {
      class: Ic,
      fixed: !0,
      required: !1
    };
    this.core.config?.highLow === !0 && (this.scaleOverly = this.chart.scale.addOverlay("hiLo", l));
  }
  set position(e) {
    this.target.setPosition(0, 0);
  }
  draw(e = this.core.range) {
    if (this.core.config?.highLow !== !0 || !super.mustUpdate()) return;
    this.scene.clear();
    let i,
      s,
      n,
      o = this.scene.width,
      a = 35,
      l = {};
    const h = e.valueHi,
      m = e.valueLo,
      g = {
        ...this.theme.yAxis
      },
      v = this.scene.context;
    g.colourCursorBG = this.theme?.hilo?.colour || Rt.colour, v.save(), v.strokeStyle = this.theme?.highLow?.colour || Rt.colour, v.strokeWidth = this.theme?.highLow?.width || Rt.width, v.setLineDash(this.theme?.highLow?.dash || Rt.dash), n = this.yAxis.yPos(h), Gt(v, n, 0, o, l), i = "High", s = this.theme.yAxis.location == "left" ? 0 : o - (a + 25), Li(v, i, s, n, a, g), n = this.yAxis.yPos(m), Gt(v, n, 0, o, l), i = "Low", Li(v, i, s, n, a, g), v.restore(), super.updated(), "hiLo" in this.chart.scale.overlays && (this.chart.scale.overlays.hiLo.instance.setRefresh(), this.chart.scale.overlays.hiLo.instance.scaleDraw());
  }
}
class Ic extends W {
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a), this.viewport = e.viewport;
  }
  set position(e) {
    this.target.setPosition(0, 0);
  }
  draw() {}
  scaleDraw(e = this.core.range) {
    if (!super.mustUpdate()) return;
    this.scene.clear();
    let i, s, n, o;
    const a = e.valueHi,
      l = e.valueLo,
      h = {
        ...this.theme.yAxis
      },
      m = this.scene.context;
    h.colourCursorBG = this.theme?.hilo?.colour || Rt.colour, i = this.chart.Scale.nicePrice(a), s = 1, n = this.yAxis.yPos(a) + 1, o = this.viewport.width, Li(m, i, s, n, o, h), i = this.chart.Scale.nicePrice(l), n = this.yAxis.yPos(l) + 1, Li(m, i, s, n, o, h), super.updated();
  }
}
function Li(r, e, i, s, n, o) {
  let a = {
      fontSize: o.fontSize * 1.05,
      fontWeight: o.fontWeight,
      fontFamily: o.fontFamily,
      txtCol: o.colourCursor,
      bakCol: o.colourCursorBG,
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 3,
      paddingRight: 3,
      width: n
    },
    l = a.fontSize + a.paddingTop + a.paddingBottom,
    h = s - l * 0.5;
  r.save(), r.fillStyle = a.bakCol, r.fillRect(i, h, n, l), yt(r, `${e}`, i, h, a), r.restore();
}
class Dc {
  data;
  icon;
  constructor(e, i) {
    this.scene = e.scene, this.hit = e.hit, this.ctx = this.scene.context, this.ctxH = this.hit.context, this.width = this.scene.width, this.cfg = i.events, this.dims = {
      w: this.cfg.iconWidth,
      h: this.cfg.iconHeight
    }, this.icon = D.svgToImage(this.cfg.iconEvent, this.cfg.iconColour, this.dims);
  }
  draw(e) {
    this.data = e;
    const i = this.icon,
      s = this.cfg,
      n = this.hit.getIndexValue(e.key),
      o = D.svgToImage(s.iconEvent, n, this.dims),
      a = _(e.w, s.iconMinDim, s.iconHeight),
      l = _(e.w, s.iconMinDim, s.iconWidth),
      h = this.data.x,
      m = this.data.y,
      g = this.ctx,
      v = this.ctxH;
    return g.save(), g.drawImage(i, h, m, l, a), g.restore(), v.save(), v.drawImage(o, h, m, l, a), v.restore(), {
      x: h,
      y: m,
      w: l,
      h: a,
      k: n
    };
  }
}
const Oc = {
  bounded: !0,
  dragBar: !1,
  closeIcon: !1,
  content: "",
  styles: {
    window: {
      width: "15em",
      zindex: "10"
    },
    content: {
      overflow: "hidden",
      padding: "0 1em"
    }
  }
};
class Rc extends W {
  #e;
  #t = [];
  #n;
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a), this.#e = new Dc(e, n), this.emit(), this.core.on("primary_pointerdown", this.onPrimaryPointerDown, this), this.#n = this.core.WidgetsG.insert("Dialogue", Oc), this.#n.start();
  }
  destroy() {
    this.core.off("primary_pointerdown", this.onPrimaryPointerDown, this);
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  get data() {
    return this.overlay.data;
  }
  onPrimaryPointerDown(e) {
    this.core.MainPane.stateMachine.state !== "chart_pan" && ke(this.isNewsEventSelected, Ti, this)(e);
  }
  isNewsEventSelected(e) {
    const i = e[0],
      s = e[1],
      n = this.hit.getIntersection(i, s);
    if (this.core.config?.events?.display === !1 || this.core.config?.events?.displayInfo === !1 || n == -1) return;
    const o = this.theme.events,
      a = _(this.xAxis.candleW, o.iconMinDim, o.iconHeight),
      l = this.xAxis.pixel2T(i),
      h = this.xAxis.scrollOffsetPx,
      m = this.core.dimensions;
    let g = Object.keys(this.data)[n] * 1,
      v = this.xAxis.xPos(l) + h,
      S = s - a * 1.5 - m.height,
      A = "";
    for (let O of this.data[g]) A += this.buildNewsEventHTML(O);
    const L = {
      dimensions: {
        h: void 0,
        w: 150
      },
      position: {
        x: v + a / 2 + 1,
        y: S
      },
      content: A,
      offFocus: Ti + 1
    };
    this.core.emit("event_selected", g), this.#n.open(L);
  }
  buildNewsEventHTML(e) {
    let i = e?.title,
      s = `<style>
    h1, p {display: inline-block; font-size: 0.9em;
    max-width: 98%;
    </style>`;
    return E(e?.url) && (i = `<a href="${e?.url}" target="${e?.target}">${i}</a>`), s += `<h1>${i}</h1>`, s += `<p>${e?.content}</p>`, s;
  }
  draw(e = this.core.range) {
    if (this.core.config?.events?.display === !1 || !super.mustUpdate()) return;
    this.hit.clear(), this.scene.clear(), this.#t.length = 0;
    const s = {
      x: (this.xAxis.smoothScrollOffset || 0) - this.xAxis.candleW,
      w: this.xAxis.candleW
    };
    let n = this.theme.events,
      o = this.core.rangeScrollOffset,
      a = e.indexStart - o,
      l = e.Length + o * 2,
      h,
      m,
      g;
    for (; l;) {
      if (h = e.value(a), m = `${h[0]}`, g = Object.keys(this.data).indexOf(m), g >= 0) for (let v of this.data[m]) s.x = this.xAxis.xPos(h[0]) - this.xAxis.candleW / 2, s.y = this.scene.height - _(this.xAxis.candleW, n.iconMinDim, n.iconHeight) * 1.5, s.key = g, this.#t.push(this.#e.draw(s));
      a++, l--;
    }
    super.updated();
  }
}
class kc {
  data;
  buy;
  sell;
  constructor(e, i) {
    this.scene = e.scene, this.hit = e.hit, this.ctx = this.scene.context, this.ctxH = this.hit.context, this.width = this.scene.width, this.cfg = i.trades, this.dims = {
      w: this.cfg.iconWidth,
      h: this.cfg.iconHeight
    }, this.buy = D.svgToImage(this.cfg.iconBuy, this.cfg.buyColour, this.dims), this.sell = D.svgToImage(this.cfg.iconSell, this.cfg.sellColour, this.dims);
  }
  draw(e) {
    this.data = e;
    const i = this.cfg,
      s = e.side === "buy" ? this.buy : this.sell,
      n = e.side === "buy" ? i.iconBuy : i.iconSell,
      o = this.hit.getIndexValue(e.key),
      a = D.svgToImage(n, o, this.dims),
      l = _(e.w, i.iconMinDim, i.iconHeight),
      h = _(e.w, i.iconMinDim, i.iconWidth),
      m = this.data.x,
      g = this.data.y,
      v = this.ctx,
      S = this.ctxH;
    return v.save(), v.drawImage(s, m, g, h, l), v.restore(), S.save(), S.drawImage(a, m, g, h, l), S.restore(), {
      x: m,
      y: g,
      w: h,
      h: l,
      k: o
    };
  }
}
const _c = {
  bounded: !0,
  dragBar: !1,
  closeIcon: !1,
  content: "",
  styles: {
    window: {
      width: "15em",
      zindex: "10"
    },
    content: {
      overflow: "hidden",
      padding: "0 1em"
    }
  }
};
class Hc extends W {
  #e;
  #t = [];
  #n;
  #r;
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a), this.settings = a.settings, this.#e = new kc(e, n), this.core.on("primary_pointerdown", this.onPrimaryPointerDown, this), this.#r = this.core.WidgetsG.insert("Dialogue", _c), this.#r.start();
  }
  destroy() {
    this.core.off("primary_pointerdown", this.onPrimaryPointerDown, this);
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  get data() {
    return this.overlay.data;
  }
  get settings() {
    return this.params.settings;
  }
  set settings(e) {
    this.doSettings(e);
  }
  doSettings(e) {
    if (!b(e)) return !1;
    let i = this.theme.trades;
    for (let s in e) e[s] !== void 0 && (i[s] = e[s]);
  }
  onPrimaryPointerDown(e) {
    this.core.MainPane.stateMachine.state !== "chart_pan" && ke(this.isTradeSelected, Ti, this)(e);
  }
  isTradeSelected(e) {
    const i = e[0],
      s = e[1],
      n = this.hit.getIntersection(i, s);
    if (this.core.config?.trades?.display === !1 || this.core.config?.trades?.displayInfo === !1 || n == -1) return;
    const o = this.theme.trades,
      a = _(this.xAxis.candleW, o.iconMinDim, o.iconWidth),
      l = this.xAxis.pixel2T(i);
    this.core.range.valueByTS(l);
    const h = this.xAxis.scrollOffsetPx,
      m = this.core.dimensions;
    let g = Object.keys(this.data)[n] * 1,
      v = this.xAxis.xPos(l) + h,
      S = s - a * 1.5 - m.height,
      A = "";
    for (let O of this.data[g]) A += this.buildTradeHTML(O);
    const L = {
      dimensions: {
        h: void 0,
        w: 150
      },
      position: {
        x: v + a / 2 + 1,
        y: S
      },
      content: A,
      offFocus: Ti + 1
    };
    this.core.emit("trade_selected", g), this.#r.open(L);
  }
  buildTradeHTML(e) {
    let i = `<style>
    dt, dd {display: inline-block; font-size: 0.9em;}
    dt {min-width: 40%;}
    dd {min-width: 60%; margin: 0;}
    </style>`;
    i += "<dl>";
    for (let s in e) s != "timestamp" && (i += `<dt>${s}</dt><dd>${e[s]}</dd>`);
    return i += "</dl>", i;
  }
  draw(e = this.core.range) {
    if (!super.mustUpdate() || this.core.config?.trades?.display === !1) return;
    this.hit.clear(), this.scene.clear(), this.#t.length = 0;
    const s = {
      x: (this.xAxis.smoothScrollOffset || 0) - this.xAxis.candleW,
      w: this.xAxis.candleW
    };
    let n = this.theme.trades,
      o = this.core.rangeScrollOffset,
      a = e.indexStart - o,
      l = e.Length + o * 2,
      h,
      m,
      g;
    for (; l;) {
      if (h = e.value(a), m = `${h[0]}`, g = Object.keys(this.data).indexOf(m), g >= 0) for (let v of this.data[m]) s.x = this.xAxis.xPos(h[0]) - this.xAxis.candleW / 2, s.y = this.yAxis.yPos(h[2]) - _(this.xAxis.candleW, n.iconMinDim, n.iconHeight) * 1.5, s.side = v.side, s.key = g, this.#t.push(this.#e.draw(s));
      a++, l--;
    }
    super.updated();
  }
}
const $c = {
    primaryPane: [["grid", {
      class: Ai,
      fixed: !0,
      required: !0,
      params: {
        axes: "y"
      }
    }], ["volume", {
      class: pc,
      fixed: !1,
      required: !0,
      params: {
        maxVolumeH: gi.ONCHART_VOLUME_HEIGHT
      }
    }], ["candles", {
      class: Fr,
      fixed: !1,
      required: !0
    }], ["hiLo", {
      class: Nc,
      fixed: !0,
      required: !1
    }], ["stream", {
      class: Lc,
      fixed: !1,
      required: !0
    }], ["cursor", {
      class: ws,
      fixed: !0,
      required: !0
    }]],
    secondaryPane: [["grid", {
      class: Ai,
      fixed: !0,
      required: !0,
      params: {
        axes: "y"
      }
    }], ["cursor", {
      class: ws,
      fixed: !0,
      required: !0
    }]]
  },
  ir = {
    primaryPane: {
      trades: {
        class: Hc,
        fixed: !1,
        required: !1
      },
      events: {
        class: Rc,
        fixed: !1,
        required: !1
      }
    },
    secondaryPane: {
      candles: {
        class: Fr,
        fixed: !1,
        required: !0
      }
    }
  },
  Te = {
    id: "chart",
    title: "",
    type: "chart",
    source: () => {}
  };
class nt {
  static #e = 0;
  static get cnt() {
    return nt.#e++;
  }
  #t;
  #n;
  #r;
  #i;
  #s;
  #l;
  #o;
  #c;
  #a;
  #h;
  #d = "idle";
  #u = {
    state: !1,
    height: null,
    rowsHeight: null,
    rowsCnt: 1
  };
  #m;
  #y;
  #g;
  #b;
  #w;
  #p;
  #S;
  #C;
  #f;
  #E;
  #x;
  #O;
  #M = new be();
  #L = new be();
  #T = [0, 0];
  #A = !1;
  #P;
  #v;
  #R;
  #k = {
    valueMax: 110,
    valueMin: -10,
    valueDiff: 120
  };
  #N = {};
  constructor(e, i) {
    if (this.#s = e, this.#a = nt.cnt, !b(i)) return;
    this.#l = {
      ...i
    }, this.#n = this.#l.name, this.#r = this.#l.shortName, this.#i = this.#l.title, this.#h = this.#l.type == "primary" ? "primaryPane" : "secondaryPane", this.#x = this.#l.view, this.#y = this.#l.elements.elScale, this.#o = this.#l.parent, this.#m = this.#l.elements.elTarget, this.#m.id = this.id, this.legend = new oc(this.elLegend, this), this.isPrimary ? (Te.type = "chart", Te.title = this.title, Te.parent = this, Te.source = this.legendInputs.bind(this), this.legend.add(Te), this.yAxisType = "default") : (Te.type = "secondary", Te.title = "", Te.parent = this, Te.source = () => ({
      inputs: {},
      colours: [],
      labels: []
    }), this.legend.add(Te), this.yAxisType = this.core.indicatorClasses[i.view[0].type].ind.scale);
    const s = {
      ...i
    };
    s.parent = this, s.chart = this, s.elScale = this.elScale, s.yAxisType = this.yAxisType, this.scale = new dc(this.core, s), this.#d = "init", this.log(`${this.name} instantiated`);
  }
  log(e) {
    this.core.log(e);
  }
  info(e) {
    this.core.info(e);
  }
  warn(e) {
    this.core.warn(e);
  }
  error(e) {
    this.core.error(e);
  }
  set id(e) {
    this.#t = $e(e);
  }
  get id() {
    return this.#t ? `${this.#t}` : `${this.#s.id}-${this.#n}_${this.#a}`.replace(/ |,|;|:|\.|#/g, "_");
  }
  get name() {
    return this.#n;
  }
  get shortName() {
    return this.#r;
  }
  set title(e) {
    this.setTitle(e);
  }
  get title() {
    return this.#i;
  }
  get parent() {
    return this.#o;
  }
  get core() {
    return this.#s;
  }
  get type() {
    return this.#h;
  }
  get status() {
    return this.#d;
  }
  get collapsed() {
    return this.#u;
  }
  get isPrimary() {
    return this.#h === "primaryPane";
  }
  get isPrimary() {
    return this.#l.view.primary || !1;
  }
  get options() {
    return this.#l;
  }
  get element() {
    return this.#m;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return D.elementDimPos(this.#m);
  }
  set width(e) {
    this.setWidth(e);
  }
  get width() {
    return this.#m.getBoundingClientRect().width;
  }
  set height(e) {
    this.setHeight(e);
  }
  get height() {
    return this.#m.getBoundingClientRect().height;
  }
  get data() {}
  get range() {
    return this.#s.range;
  }
  set localRange(e) {
    this.setLocalRange(e);
  }
  get localRange() {
    return this.#k;
  }
  get stream() {
    return this.#C;
  }
  get streamCandle() {
    return this.#E;
  }
  set cursor(e) {
    this.element.style.cursor = e;
  }
  get cursor() {
    return this.element.style.cursor;
  }
  get cursorPos() {
    return this.#T;
  }
  set cursorActive(e) {
    this.#A = e;
  }
  get cursorActive() {
    return this.#A;
  }
  get cursorClick() {
    return this.#P;
  }
  get candleW() {
    return this.#s.Timeline.candleW;
  }
  get theme() {
    return this.#s.theme;
  }
  get config() {
    return this.#s.config;
  }
  get scrollPos() {
    return this.#s.scrollPos;
  }
  get bufferPx() {
    return this.#s.bufferPx;
  }
  get elCanvas() {
    return this.#w.viewport.scene.canvas;
  }
  get elScale() {
    return this.#y;
  }
  get elLegend() {
    return this.#m.legend;
  }
  get elViewport() {
    return this.#m.viewport;
  }
  set layerWidth(e) {
    this.#w.layerWidth = e;
  }
  get layerWidth() {
    return this.#w.layerWidth;
  }
  set legend(e) {
    this.#p = e;
  }
  get legend() {
    return this.#p;
  }
  set time(e) {
    this.#b = e;
  }
  get time() {
    return this.#b;
  }
  set scale(e) {
    this.#g = e;
  }
  get scale() {
    return this.#g;
  }
  set yAxisType(e) {
    this.setYAxisType(e);
  }
  get yAxisType() {
    return this.#R;
  }
  get axes() {
    return "x";
  }
  set graph(e) {
    this.#w = e;
  }
  get graph() {
    return this.#w;
  }
  get view() {
    return this.#x;
  }
  get viewport() {
    return this.#w.viewport;
  }
  get layerGrid() {
    return this.#w.overlays.get("grid").layer;
  }
  get overlays() {
    return Object.fromEntries([...this.#w.overlays.list]);
  }
  get overlayGrid() {
    return this.#w.overlays.get("grid").instance;
  }
  get overlayTools() {
    return this.#L;
  }
  get overlaysDefault() {
    return $c[this.type];
  }
  get indicators() {
    return this.getIndicators();
  }
  get indicatorDeleteList() {
    return this.#N;
  }
  set stateMachine(e) {
    this.#c = new ze(e, this);
  }
  get stateMachine() {
    return this.#c;
  }
  get Divider() {
    return this.#S;
  }
  get siblingPrev() {
    return this.sibling("prev");
  }
  get siblingNext() {
    return this.sibling("next");
  }
  start() {
    this.#b = this.#s.Timeline, this.createGraph(), this.#g.start(), this.draw(this.range), this.cursor = "crosshair", is.id = this.id, is.context = this, this.stateMachine = is, this.stateMachine.start(), this.eventsListen();
    let e = {
      chartPane: this
    };
    this.#S = this.core.WidgetsG.insert("Divider", e), this.#S.start(), e = {
      title: "Chart Config",
      content: "config the chart"
    }, this.#f = this.core.WidgetsG.insert("ConfigDialogue", e), this.#f.start(), this.#d = "running";
  }
  destroy() {
    if (this.#d !== "destroyed") {
      if (!this.core.MainPane.chartDeleteList[this.id]) {
        this.core.warn(`Cannot "destroy()": ${this.id} !!! Use "remove()" or "removeChartPane()" instead.`);
        return;
      }
      this.removeAllIndicators(), this.stateMachine.destroy(), this.Divider.destroy(), this.#g.destroy(), this.#w.destroy(), this.#v.destroy(), this.legend.destroy(), this.off("main_mousemove", this.onMouseMove, this), this.off(Ht, this.onStreamListening, this), this.off(zt, this.onStreamNewValue, this), this.off(_e, this.onStreamUpdate, this), this.off(Vt, this.onStreamNewValue, this), this.off(`${this.id}_removeIndicator`, this.onDeleteIndicator, this), this.isPrimary && this.off("chart_yAxisRedraw", this.onYAxisRedraw), this.element.remove(), this.#d = "destroyed";
    }
  }
  remove() {
    this.core.log(`Deleting chart pane: ${this.id}`), this.emit("destroyChartView", this.id);
  }
  eventsListen() {
    this.#v = new Le(this.#m, {
      disableContextMenu: !1
    }), this.#v.on("pointerdrag", this.onChartDrag.bind(this)), this.#v.on("pointerdragend", this.onChartDragDone.bind(this)), this.#v.on("pointermove", this.onMouseMove.bind(this)), this.#v.on("pointerenter", this.onMouseEnter.bind(this)), this.#v.on("pointerout", this.onMouseOut.bind(this)), this.#v.on("pointerdown", this.onMouseDown.bind(this)), this.#v.on("pointerup", this.onMouseUp.bind(this)), this.on("main_mousemove", this.updateLegends, this), this.on(Ht, this.onStreamListening, this), this.on(zt, this.onStreamNewValue, this), this.on(_e, this.onStreamUpdate, this), this.on(Vt, this.onStreamNewValue, this), this.on(`${this.id}_removeIndicator`, this.onDeleteIndicator, this), this.isPrimary && this.on("chart_yAxisRedraw", this.onYAxisRedraw, this);
  }
  on(e, i, s) {
    this.#s.on(e, i, s);
  }
  off(e, i) {
    this.#s.off(e, i);
  }
  emit(e, i) {
    this.#s.emit(e, i);
  }
  onChartDrag(e) {
    this.cursor = "grab", this.scale.yAxis.mode == "manual" && this.#w.drawAll(), this.core.MainPane.onChartDrag(e), this.scale.onChartDrag(e);
  }
  onChartDragDone(e) {
    this.cursor = "crosshair", this.core.MainPane.onChartDragDone(e);
  }
  onMouseMove(e) {
    this.core.MainPane.onPointerActive(this), this.scale.layerCursor.visible = !0, this.graph.overlays.list.get("cursor").layer.visible = !0, this.#T = [Math.round(e.position.x), Math.round(e.position.y)], this.#g.onMouseMove(this.#T), this.emit(`${this.id}_mousemove`, this.#T);
  }
  onMouseEnter(e) {
    this.core.MainPane.onPointerActive(this), this.#T = [Math.round(e.position.x), Math.round(e.position.y)], this.core.MainPane.onMouseEnter(), this.scale.layerCursor.visible = !0, this.graph.overlays.list.get("cursor").layer.visible = !0, this.emit(`${this.id}_mouseenter`, this.#T);
  }
  onMouseOut(e) {
    this.#A = !1, this.#T = [Math.round(e.position.x), Math.round(e.position.y)], this.scale.layerCursor.visible = !1, this.emit(`${this.id}_mouseout`, this.#T);
  }
  onMouseDown(e) {
    this.#s.pointerButtons[e.domEvent.srcEvent.button] = !0, this.#P = [Math.floor(e.position.x), Math.floor(e.position.y)], this.stateMachine.state === "tool_activated" ? this.emit("tool_targetSelected", {
      target: this,
      position: e
    }) : this.isPrimary && this.emit("primary_pointerdown", this.#P);
  }
  onMouseUp(e) {
    this.#s.pointerButtons[e.domEvent.srcEvent.button] = !1;
  }
  onStreamListening(e) {
    this.#C !== e && (this.#C = e);
  }
  onStreamNewValue(e) {
    this.draw(this.range, !0);
  }
  onStreamUpdate(e) {
    this.isPrimary ? (this.#E = e, this.chartStreamCandle.draw(), this.layerStream.setPosition(this.core.stream.lastScrollPos, 0), this.updateLegends(this.cursorPos, e)) : this.updateLegends(), this.#s.MainPane.draw();
  }
  onYAxisRedraw() {
    this.isPrimary && this.refresh();
  }
  onDeleteIndicator(e) {
    this.removeIndicator(e.id);
  }
  setTitle(e) {
    if (!E(e)) return !1;
    this.#i = e, Te.title = e;
    const i = this.legend.list.chart.el.querySelectorAll(".title");
    for (let s of i) s.innerHTML = e;
    return !0;
  }
  setWatermark(e) {
    E(e.text) || E(e) ? this.core.config.watermark.text = e : "imgURL" in e && (this.core.config.watermark.imgURL = e);
  }
  setHeight(e) {
    T(e) || (e = this.height || this.#o.height), this.#m.style.height = `${e}px`, this.#y.style.height = `${e}px`, this.elViewport.style.height = `${e}px`, this.#g.setDimensions({
      w: null,
      h: e
    }), this.Divider?.setPos(), this.Divider?.setWidth();
  }
  setDimensions(e) {
    const i = this.config.buffer || Oi;
    let {
      w: s,
      h: n
    } = e;
    s = this.width, n = n || this.height, this.setHeight(n), this.graph instanceof vt && (this.layerWidth = Math.round(s * ((100 + i) * 0.01)), this.graph.setSize(s, n, this.layerWidth), this.draw(void 0, !0), this.core.MainPane.draw(void 0, !1), this.Divider.setPos(), this.Divider.setWidth());
  }
  setLocalRange(e, i) {
    if (!T(i) || !T(e)) return !1;
    e > i && ([e, i] = [i, e]), this.#k = {
      valueMax: i,
      valueMin: e,
      valueDiff: i - e
    };
  }
  setYAxisType(e) {
    return !E(e) || !Ke.includes(e) || this.type == "primaryPane" && e == "percent" ? !1 : (this.#R = e, !0);
  }
  addOverlays(e) {
    if (!M(e) || e.length < 1) return !1;
    const i = [];
    for (let s of e) {
      const n = {
        fixed: !1,
        required: !1
      };
      if (s.type in this.core.indicatorClasses) n.cnt = this.core.indicatorClasses[s.type].ind.cnt, n.id = `${this.id}-${s.type}_${n.cnt}`, n.class = this.core.indicatorClasses[s.type].ind;else if (s.type in ir[this.type]) n.cnt = 1, n.id = `${this.id}-${s.type}`, n.class = ir[this.type][s.type].class;else continue;
      n.params = {
        overlay: s
      }, s.id = n.id, s.paneID = this.id, i.push([s.id, n]);
    }
    return this.graph.addOverlays(i), !0;
  }
  addIndicator(e) {
    const i = this.type === "primaryPane",
      s = this.core.indicatorClasses[e.type].ind,
      n = s.constructor.type === "both" ? i : s.prototype.primaryPane;
    if (e?.type in this.core.indicatorClasses && i === n) {
      e.paneID = this.id;
      const o = {
        class: s,
        params: {
          overlay: e
        }
      };
      return this.graph.addOverlay(e.name, o);
    } else return !1;
  }
  getIndicators() {
    const e = Object.keys(this.core.indicatorClasses),
      i = {};
    for (let [s, n] of Object.entries(this.overlays)) if (e.includes(n.params?.overlay?.type)) {
      let o = n.id || n.instance.id;
      i[o] = n;
    }
    return i;
  }
  removeIndicator(e) {
    if (!E(e) || !(e in this.indicators)) return !1;
    this.#N[e] = !0, this.indicators[e].instance.destroy(), this.graph.removeOverlay(e), this.draw(), Object.keys(this.indicators).length === 0 && !this.isPrimary && this.emit("destroyChartView", this.id), delete this.#N[e];
  }
  removeAllIndicators() {
    const e = this.getIndicators();
    for (let i in e) this.removeIndicator(i);
  }
  indicatorVisible(e, i) {
    return !E(e) || !(e in this.indicators) ? !1 : this.indicators[e].instance.visible(i);
  }
  indicatorSettings(e, i) {
    return !E(e) || !(e in this.indicators) ? !1 : this.indicators[e].instance.settings(i);
  }
  addTool(e) {
    let {
        layerConfig: i
      } = this.layerConfig(),
      s = new Ft.Layer(i);
    this.#M.set(e.id, s), this.#O.addLayer(s), e.layerTool = s, this.#L.set(e.id, e);
  }
  addTools(e) {}
  overlayTools() {}
  overlayToolAdd(e) {
    this.#L.set(e.id, e);
  }
  overlayToolDelete(e) {
    this.#L.delete(e);
  }
  drawGrid() {
    this.layerGrid.setPosition(this.#s.scrollPos, 0), this.overlayGrid.setRefresh(), this.overlayGrid.draw("y"), this.#s.MainPane.draw();
  }
  refresh() {
    this.emit("pane_refresh", this), this.scale.draw(), this.draw(void 0, this.isPrimary);
  }
  legendsVisibility(e) {
    this.legend.setCollapse(e);
  }
  updateLegends(e = this.#T, i = !1) {
    if (!(this.#s.isEmpty || !b(this.#p))) for (const s in this.#p.list) this.#p.update(s, {
      pos: e,
      candle: i
    });
  }
  legendInputs() {
    const e = [!0, !0, !0, !0, !0],
      i = this.cursorPos,
      s = this.time.xPos2Index(i[0] - this.core.scrollPos),
      n = _(s, 0, this.range.data.length - 1),
      o = this.range.data[n],
      a = this.theme.candle,
      l = o[4] >= o[1] ? new Array(5).fill(a.UpWickColour) : new Array(5).fill(a.DnWickColour),
      h = {},
      m = ["T", "O", "H", "L", "C", "V"];
    for (let g = 1; g < 6; g++) h[m[g]] = this.scale.nicePrice(o[g]);
    return {
      inputs: h,
      colours: l,
      labels: e
    };
  }
  onLegendAction(e) {
    switch (this.#p.onMouseClick(e.currentTarget).icon) {
      case "up":
        this.reorderUp();
        return;
      case "down":
        this.reorderDown();
        return;
      case "maximize":
        this.#s.MainPane.paneMaximize(this);
        return;
      case "restore":
        this.#s.MainPane.paneMaximize(this);
        return;
      case "collapse":
        this.#s.MainPane.paneCollapse(this);
        return;
      case "expand":
        this.#s.MainPane.paneCollapse(this);
        return;
      case "remove":
        this.remove();
        return;
      case "config":
        this.configDialogue();
        return;
      default:
        return;
    }
  }
  reorderUp() {
    const {
      el: e,
      prevEl: i,
      parentEl: s,
      scaleEl: n,
      prevScaleEl: o,
      parentScaleEl: a,
      prevPane: l
    } = {
      ...this.currPrevNext()
    };
    return !b(i) || !b(o) ? !1 : (s.insertBefore(e, i), a.insertBefore(n, o), this.Divider.setPos(), l !== null && (l.Divider.setPos(), l.Divider.show(), this.core.ChartPanes.swapKeys(this.id, i.id)), e.previousElementSibling === null && this.Divider.hide(), !0);
  }
  reorderDown() {
    const {
      el: e,
      nextEl: i,
      parentEl: s,
      scaleEl: n,
      nextScaleEl: o,
      parentScaleEl: a,
      nextPane: l
    } = {
      ...this.currPrevNext()
    };
    return !b(i) || !b(o) ? !1 : (s.insertBefore(i, e), a.insertBefore(o, n), this.Divider.setPos(), l !== null && (l.Divider.setPos(), this.Divider.show(), this.core.ChartPanes.swapKeys(this.id, i.id)), i.previousElementSibling === null && l.Divider.hide(), !0);
  }
  createGraph() {
    let e = ce(this.overlaysDefault);
    this.graph = new vt(this, this.elViewport, e, !1), this.isPrimary && (this.layerStream = this.graph.overlays.get("stream")?.layer, this.chartStreamCandle = this.graph.overlays.get("stream")?.instance), this.addOverlays(this.view);
  }
  render() {
    this.#w.render(), this.#g.render();
  }
  draw(e = this.range, i = !1) {
    this.#w.draw(e, i);
  }
  drawGrid(e) {
    this.layerGrid.setPosition(this.core.scrollPos, 0), this.overlayGrid.draw("y");
  }
  resize(e) {
    const i = this,
      s = this.sibling();
    if (s === null) return {
      active: null,
      prev: null
    };
    const n = this.core.MainPane.rowMinH,
      o = this.element.clientHeight,
      a = s.element.clientHeight;
    let l, h, m, g;
    return T(e) && e > n || (g = o + a, l = this.core.MainPane.cursorPos[5], h = o - l, m = a + l), h < n || m < n || g !== h + m || (i.setDimensions({
      w: void 0,
      h
    }), s.setDimensions({
      w: void 0,
      h: m
    }), i.Divider.setPos()), i.element.style.userSelect = "none", s.element.style.userSelect = "none", {
      active: i,
      prev: s
    };
  }
  collapse(e) {
    const i = this.graph.viewport.scene.canvas.style,
      s = this.#u,
      n = this.#g.graph.viewport.scene.canvas.style;
    s.state ? (this.setDimensions({
      w: void 0,
      h: e
    }), n.visibility = "visible", i.display = "block", s.state = !1) : (n.visibility = "hidden", i.display = "none", s.state = !0, s.height = this.element.clientHeight, s.rowsHeight = this.core.MainPane.rowsH, s.rowsCnt = this.core.ChartPanes.size, this.setDimensions({
      W: void 0,
      h: cs
    }));
  }
  zoomRange() {
    this.draw(this.range, !0), this.emit("zoomDone");
  }
  time2XPos(e) {
    return this.time.xPos(e);
  }
  price2YPos(e) {
    return this.scale.yPos(e);
  }
  currPrevNext() {
    const e = this.element,
      i = e.previousElementSibling,
      s = e.nextElementSibling,
      n = e.parentNode,
      o = this.scale.element,
      a = o.previousElementSibling,
      l = o.nextElementSibling,
      h = o.parentNode,
      m = i !== null ? this.core.ChartPanes.get(i.id) : null,
      g = s !== null ? this.core.ChartPanes.get(s.id) : null;
    return {
      el: e,
      prevEl: i,
      nextEl: s,
      parentEl: n,
      scaleEl: o,
      prevScaleEl: a,
      nextScaleEl: l,
      parentScaleEl: h,
      prevPane: m,
      nextPane: g
    };
  }
  sibling(e) {
    e = ["prev", "next"].includes(e) ? e : "prev";
    let i = [...this.core.ChartPanes.keys()],
      s = i.indexOf(this.id);
    return e == "prev" ? --s : ++s, this.#s.ChartPanes.get(i[s]) || null;
  }
  configDialogue() {
    const e = this.#f;
    e.state.name === "closed" && e.open();
  }
}
class He extends W {
  static #e = 0;
  static get cnt() {
    return ++He.#e;
  }
  #t;
  #n;
  #r;
  #i;
  #s;
  #l;
  #o;
  #c;
  #a;
  #h;
  #d;
  #u;
  #m;
  #y;
  #g = [0, 0];
  #b;
  #w;
  #p = 2;
  #S = {};
  #C;
  #f;
  #E = !1;
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, void 0, o, a), this.#n = W.cnt, this.#a = a, this.#h = a.overlay, this.#m = this.core.TALib, this.#y = this.xAxis.range, this.eventsListen();
  }
  get id() {
    return this.#t || `${this.core.id}-${this.chartPaneID}-${this.shortName}-${this.#n}`;
  }
  set id(e) {
    this.#t = $e(e);
  }
  get name() {
    return this.#r;
  }
  set name(e) {
    this.#r = e;
  }
  get shortName() {
    return this.#i;
  }
  set shortName(e) {
    this.#i = e;
  }
  get chartPane() {
    return this.core.ChartPanes.get(this.chartPaneID);
  }
  get chartPaneID() {
    return this.#a.overlay.paneID;
  }
  get primaryPane() {
    return this.#s;
  }
  set primaryPane(e) {
    this.#s = e;
  }
  get scaleOverlay() {
    return this.#o;
  }
  set scaleOverlay(e) {
    this.#o = e;
  }
  get plots() {
    return this.#c;
  }
  set plots(e) {
    this.#c = e;
  }
  get params() {
    return this.#a;
  }
  get Timeline() {
    return this.core.Timeline;
  }
  get scale() {
    return this.parent.scale;
  }
  get type() {
    return this.#u;
  }
  get overlay() {
    return this.#h;
  }
  get legendID() {
    return this.#C;
  }
  get indicator() {
    return this.#d;
  }
  get TALib() {
    return this.#m;
  }
  get range() {
    return this.core.range;
  }
  set setNewValue(e) {
    this.#b = e;
  }
  set setUpdateValue(e) {
    this.#w = e;
  }
  set precision(e) {
    this.#p = e;
  }
  get precision() {
    return this.#p;
  }
  set style(e) {
    this.#S = e;
  }
  get style() {
    return this.#S;
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  get isIndicator() {
    return !0;
  }
  get status() {
    return this.#f;
  }
  get drawOnUpdate() {
    return this.#E;
  }
  set value(e) {
    const i = this.core.time.timeFrameMS;
    let s = Math.floor(new Date(e[fe.t]) / i) * i;
    e[fe.t] = s, this.#g[fe.t] !== e[fe.t] ? (this.#g[fe.t] = e[fe.t], this.#b(e)) : this.#w(e);
  }
  get value() {
    return this.#g;
  }
  destroy() {
    if (this.#f !== "destroyed") {
      if (!this.chartPane.indicatorDeleteList[this.id]) {
        this.core.warn(`Cannot "destroy()": ${this.id} !!! Use "indicator.remove()" or "chart.removeIndicator()" instead.`);
        return;
      }
      super.destroy(), this.off(_e, this.onStreamUpdate), this.chartPane.graph.removeOverlay(this.id), this.chart.legend.remove(this.#C), this.core.state.removeIndicator(this.id), this.#f = "destroyed";
    }
  }
  remove() {
    this.core.log(`Deleting indicator: ${this.id} from: ${this.chartPaneID}`), this.emit(`${this.chartPaneID}_removeIndicator`, {
      id: this.id,
      paneID: this.chartPaneID
    });
  }
  visible(e) {
    return K(e) && (this.emit(`${this.chartPaneID}_visibleIndicator`, {
      id: this.id,
      paneID: this.chartPaneID,
      visible: e
    }), this.chartPane.indicators[this.id].layer.visible = e, this.draw()), this.chartPane.indicators[this.id].layer.visible;
  }
  settings(e) {
    return b(e) && (b(e?.config) && (this.params.overlay.settings = {
      ...this.params.overlay.settings,
      ...e.config
    }), b(e?.style) && (this.style = {
      ...this.style,
      ...e.style
    }), this.draw()), {
      config: this.params.overlay.settings,
      style: this.style,
      defaultStyle: this?.defaultStyle,
      plots: this.plots,
      precision: this.precision,
      definition: this.definition
    };
  }
  eventsListen() {
    this.on(_e, this.onStreamUpdate, this);
  }
  on(e, i, s) {
    this.core.on(e, i, s);
  }
  off(e, i) {
    this.core.off(e, i);
  }
  emit(e, i) {
    this.core.emit(e, i);
  }
  onStreamNewValue(e) {}
  onStreamUpdate(e) {
    this.value = e;
  }
  onLegendAction(e) {
    const i = this.chart.legend.onMouseClick(e.currentTarget);
    switch (i.icon) {
      case "up":
        return;
      case "down":
        return;
      case "visible":
        this.onVisibility(i);
        return;
      case "notVisible":
        this.onVisibility(i);
        return;
      case "remove":
        this.remove();
        return;
      case "config":
        this.invokeSettings();
        return;
      default:
        return;
    }
  }
  onVisibility(e) {
    this.visible(!this.visible()), e.parent.classList.toggle("visible"), e.parent.classList.toggle("notvisible");
  }
  invokeSettings(e) {
    if (U(e?.fn)) {
      let i = C.fn(this);
      if (e?.own) return i;
    } else if (U(this.core.config.callbacks?.indicatorSettings?.fn)) {
      let i = this.core.config.callbacks.indicatorSettings.fn(this);
      if (this.core.config.callbacks?.indicatorSettings?.own) return i;
    }
    this.core.log(`invokeSettings: ${this.id}`);
  }
  defineIndicator(e, i) {
    b(e) || (e = {}), this.definition.output = i.outputs;
    const s = {
      ...this.definition.input,
      ...e
    };
    delete s.style;
    for (let n of i.options) if (n.name in s) {
      if (typeof s[n.name] !== n.type) {
        s[n.name] = n.defaultValue;
        continue;
      } else "range" in n && (s[n.name] = _(s[n.name], n.range.min, n.range.max));
    } else n.name == "timePeriod" && (s.timePeriod = n.defaultValue);
    this.definition.input = s;
  }
  addLegend() {
    let e = {
      id: this.id,
      title: this.shortName,
      type: "indicator",
      parent: this,
      source: this.legendInputs.bind(this)
    };
    this.#C = this.chart.legend.add(e);
  }
  legendInputs(e = this.chart.cursorPos) {
    const i = [this.style.stroke];
    let n = this.Timeline.xPos2Index(e[0]) - (this.range.data.length - this.overlay.data.length),
      o = _(this.overlay.data.length - 1, 0, 1 / 0);
    return n = _(n, 0, o), {
      c: n,
      colours: i
    };
  }
  indicatorInput(e, i) {
    let s = {
      inReal: [],
      open: [],
      high: [],
      low: [],
      close: [],
      volume: []
    };
    do s.inReal.push(this.range.value(e)[fe.c]), s.open.push(this.range.value(e)[fe.o]), s.high.push(this.range.value(e)[fe.h]), s.low.push(this.range.value(e)[fe.l]), s.close.push(this.range.value(e)[fe.c]), s.volume.push(this.range.value(e)[fe.v]); while (e++ < i);
    return s;
  }
  regeneratePlots(e) {
    return e.map((i, s) => {
      const n = s + 1;
      return {
        key: `${this.shortName}${n}`,
        title: `${this.shortName}${n}: `,
        type: "line"
      };
    });
  }
  TALibParams() {
    let e = this.range.dataLength,
      i = this.definition.input.timePeriod,
      s = e - i,
      n = this.indicatorInput(s, e);
    return n.inReal.find(a => a === null) ? !1 : {
      timePeriod: i,
      ...n
    };
  }
  calcIndicator(e, i = {}, s = this.range) {
    if (!E(e) || !(e in this.TALib) || !b(s) || !this.core.TALibReady) return !1;
    i.timePeriod = i.timePeriod || this.definition.input.timePeriod;
    let n,
      o,
      a = i.timePeriod,
      l = this.overlay.data;
    if (s instanceof us) n = 0, o = s.dataLength - a + 1;else if ("indexStart" in s || "indexEnd" in s || "tsStart" in s || "tsEnd" in s) n = s.indexStart || this.Timeline.t2Index(s.tsStart || 0) || 0, o = s.indexEnd || this.Timeline.t2Index(s.tsEnd) || this.range.Length - 1;else return !1;
    if (l.length != 0) if (l.length + a !== s.dataLength) {
      if (l[0][0] > s.value(a)[0]) n = 0, o = s.getTimeIndex(l[0][0]) - a, o = _(o, a, s.dataLength - 1);else if (l[l.length - 1][0] < s.value(s.dataLength - 1)[0]) n = l.length - 1 + a, n = _(n, 0, s.dataLength), o = s.dataLength - 1;else return !1;
    } else return !1;
    if (o - n < a) return !1;
    let h = [],
      m,
      g,
      v,
      S;
    for (; n < o;) {
      S = this.indicatorInput(n, n + a), i = {
        ...i,
        ...S
      }, v = this.TALib[e](i), g = [], m = 0;
      for (let A of this.definition.output) g[m++] = v[A.name][0];
      h.push([s.value(n + a - 1)[0], ...g]), n++;
    }
    return h;
  }
  calcIndicatorHistory() {
    const e = () => {
      const i = this.calcIndicator(this.libName, this.definition.input, this.range);
      if (i) {
        const s = this.overlay.data;
        new Set(i), new Set(s);
        let n,
          o,
          a = {};
        if (!M(s) || s.length == 0) {
          this.overlay.data = i;
          return;
        } else i[0][0] < s[0][0] ? (n = i, o = s) : i[i.length - 1][0] > s[s.length - 1][0] && (n = s, o = i);
        for (let l of n) a[l[0]] = l;
        for (let l of o) a[l[0]] = l;
        this.overlay.data = Object.values(a), this.#E = !0;
      }
    };
    this.core.TALibReady ? e() : this.core.talibAwait.push(e.bind(this));
  }
  calcIndicatorStream(e, i, s = this.range) {
    if (!this.core.TALibReady || !E(e) || !(e in this.TALib) || !(s instanceof us) || s.dataLength < this.definition.input.timePeriod) return !1;
    let n = this.TALib[e](i),
      o = s.dataLength,
      a = s.value(o)[0],
      l = [],
      h = 0;
    for (let m of this.definition.output) l[h++] = n[m.name][0];
    return [a, ...l];
  }
  newValue(e) {
    let i = this.TALibParams();
    if (!i) return !1;
    let s = this.calcIndicatorStream(this.libName, i);
    if (!s) return !1;
    this.overlay.data.push(s), this.target.setPosition(this.core.scrollPos, 0), this.doDraw = !0, this.draw(this.range);
  }
  updateValue(e) {
    let i = this.overlay.data.length - 1,
      s = this.TALibParams();
    if (!s) return !1;
    let n = this.calcIndicatorStream(this.libName, s);
    if (!n) return !1;
    this.overlay.data[i] = n, this.target.setPosition(this.core.scrollPos, 0), this.doDraw = !0, this.draw(this.range);
  }
  plot(e, i, s) {
    const n = this.scene.context,
      o = e;
    switch (n.save(), i) {
      case "renderLine":
        ne[i](n, o, s);
        break;
      case "renderLineHorizontal":
        ne[i](n, o[0], o[1], o[2], s);
        break;
      case "renderLineVertical":
        ne[i](n, o[0], o[1], o[2], s);
        break;
      case "renderPathStroke":
        ne[i](n, o, s.style, s);
        break;
      case "renderPathClosed":
        ne[i](n, o, s);
        break;
      case "renderSpline":
        ne[i](n, o, s);
        break;
      case "renderRect":
        ne[i](n, o[0], o[1], o[2], o[3], s);
        break;
      case "renderRectRound":
        ne[i](n, o[0], o[1], o[2], o[3], o[4], s);
        break;
      case "renderPolygonRegular":
        ne[i](n, o[0], o[1], o[2], o[3], o[4], s);
        break;
      case "renderPolygonIrregular":
        ne[i](n, o, s);
        break;
      case "renderTriangle":
        ne[i](n, o[0], o[1], o[2], s);
        break;
      case "renderDiamond":
        ne[i](n, o[0], o[1], o[2], o[3], s);
        break;
      case "renderCircle":
        ne[i](n, o[0], o[1], o[2], s);
        break;
      case "renderImage":
        ne[i](n, s.src, o[0], o[1], o[2], o[3], o[4], o[5], o[6], o[7]);
    }
    n.restore();
  }
  draw() {}
  mustUpdate() {
    return this.#E ? this.#E : super.mustUpdate();
  }
  updated() {
    this.#E = !1, super.updated();
  }
}
exports.Indicator = He;
class Uc extends W {
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a), this.params.content = a?.content || "";
  }
  set position(e) {
    this.target.setPosition(0, 0);
  }
  draw() {
    if (super.mustUpdate().resize) if (this.config?.watermark?.imgURL) D.isImage(this.config?.watermark?.imgURL, this.renderImage.bind(this));else if (E(this.config?.watermark?.text)) {
      this.scene.clear();
      const i = this.scene.context;
      i.save(), this.renderText(), i.restore();
    } else return;
  }
  renderText() {
    const e = this.core.config?.watermark?.fontSize,
      i = this.core.config?.watermark?.fontWeight,
      s = this.core.config?.watermark?.fontFamily,
      n = this.core.config?.watermark?.textColour,
      o = {
        fontSize: e || this.theme.watermark.FONTSIZE,
        fontWeight: i || this.theme.watermark.FONTWEIGHT,
        fontFamily: s || this.theme.watermark.FONTFAMILY,
        txtCol: n || this.theme.watermark.COLOUR
      },
      a = this.config.watermark.text,
      l = this.scene.context;
    l.font = wt(o?.fontSize, o?.fontWeight, o?.fontFamily), l.textBaseline = "top", l.fillStyle = o.txtCol;
    const h = _i(o),
      m = ki(l, a, o),
      g = (this.scene.width - m) / 2,
      v = (this.scene.height - h) / 2;
    l.fillText(a, g, v), super.updated();
  }
  renderImage(e) {
    if (!e) return;
    const i = this.core.config?.watermark?.imgHeight || this.theme.watermark.IMGHEIGHT,
      s = this.core.config?.watermark?.imgWidth || this.theme.watermark.IMGWIDTH,
      n = (this.scene.width - s) / 2,
      o = (this.scene.height - i) / 2;
    this.scene.clear();
    const a = this.scene.context;
    a.save(), jr(a, e, n, o, i, s), a.restore();
  }
}
const ss = {
    id: "main",
    initial: "idle",
    context: {},
    states: {
      idle: {
        onEnter(r) {},
        onExit(r) {},
        on: {
          chart_paneMaximize: {
            target: "chart_paneMaximize",
            action(r) {}
          },
          chart_pan: {
            target: "chart_pan",
            action(r) {}
          },
          chart_scrollTo: {
            target: "chart_scrollTo",
            action(r) {}
          },
          setRange: {
            target: "setRange",
            action(r) {}
          },
          addIndicator: {
            target: "addIndicator",
            action(r) {}
          },
          divider_pointerdrag: {
            target: "divider_pointerdrag",
            action(r) {
              this.context.currCursor = this.context.origin.cursor, this.context.origin.cursor = "row-resize";
            }
          },
          global_resize: {
            target: "global_resize",
            action(r) {}
          }
        }
      },
      chart_paneMaximize: {
        onEnter(r) {},
        onExit(r) {},
        on: {
          always: {
            target: "idle",
            action(r) {
              this.context.maximize = "some pane pointer";
            }
          }
        }
      },
      chart_pan: {
        onEnter(r) {
          this.context.origin.cursor = "grab";
        },
        onExit(r) {},
        on: {
          chart_pan: {
            target: "chart_pan",
            action(r) {
              this.context.origin.updateRange(r), this.context.origin.cursor = "grab";
            }
          },
          chart_panDone: {
            target: "idle",
            action(r) {
              this.context.origin.updateRange(r), this.context.origin.cursor = "default";
            }
          }
        }
      },
      setRange: {
        onEnter(r) {},
        onExit(r) {},
        on: {
          always: {
            target: "idle",
            condition: "zoomDone",
            action(r) {
              this.context.origin.zoomRange(r);
            }
          }
        }
      },
      chart_scrollTo: {
        onEnter(r) {},
        onExit(r) {},
        on: {
          always: {
            target: "idle",
            action(r) {
              this.context.origin.updateRange(r);
            }
          }
        }
      },
      addIndicator: {
        onEnter(r) {
          this.context.origin.addIndicator(r);
        },
        onExit(r) {},
        on: {
          addIndicatorDone: {
            target: "idle",
            action(r) {}
          }
        }
      },
      divider_pointerdrag: {
        onEnter(r) {},
        onExit(r) {},
        on: {
          divider_pointerdrag: {
            target: "divider_pointerdrag",
            action(r) {}
          },
          divider_pointerdragend: {
            target: "idle",
            action(r) {
              this.context.origin.cursor = this.context.currCursor;
            }
          }
        }
      },
      global_resize: {
        onEnter(r) {
          this.context.origin.setDimensions();
        },
        onExit(r) {},
        on: {
          always: {
            target: "idle",
            condition: "resizeDone",
            action(r) {}
          }
        }
      }
    },
    guards: {
      zoomDone() {
        return !0;
      },
      resizeDone() {
        return !0;
      }
    },
    actions: {
      removeProperty() {
        let r = this.context.pair.active,
          e = this.context.pair.prev;
        b(r) && r.element.style.removeProperty("user-select"), b(e) && e.element.style.removeProperty("user-select");
      }
    }
  },
  Bc = [["watermark", {
    class: Uc,
    fixed: !0,
    required: !0,
    params: {
      content: null
    }
  }], ["grid", {
    class: Ai,
    fixed: !1,
    required: !0,
    params: {
      axes: "x"
    }
  }]],
  Vc = ["candles", "trades", "events"];
class Qr {
  #e = "MainPane";
  #t = "Main";
  #n;
  #r;
  #i;
  #s;
  #l = !1;
  #o;
  #c;
  #a;
  #h;
  #d;
  #u;
  #m = {};
  #y;
  #g;
  #b;
  #w;
  #p;
  #S;
  #C;
  #f = new be();
  #E;
  #x;
  #O;
  #M = [];
  #L = {
    instance: null,
    rowsH: 0,
    panes: {}
  };
  #T = bn;
  #A = xn;
  #P = {};
  #v = [0, 0];
  #R = {
    active: !1,
    start: [0, 0],
    prev: [0, 0],
    delta: [0, 0]
  };
  #k;
  #N;
  #V;
  #I;
  constructor(e, i) {
    this.#i = e, this.#n = i, this.#r = e, this.#c = this.#i.elMain, this.#o = this.#i.elYAxis, this.init(i);
  }
  log(e) {
    this.#i.log(e);
  }
  info(e) {
    this.#i.info(e);
  }
  warn(e) {
    this.#i.warn(e);
  }
  error(e) {
    this.#i.error(e);
  }
  get id() {
    return `${this.#i.id}-${this.#e}`;
  }
  get name() {
    return this.#e;
  }
  get shortName() {
    return this.#t;
  }
  get core() {
    return this.#i;
  }
  get chart() {
    return this.#E;
  }
  get chartPanes() {
    return this.#f;
  }
  get chartPaneMaximized() {
    return this.#L;
  }
  get chartDeleteList() {
    return this.#M;
  }
  get time() {
    return this.#x;
  }
  get options() {
    return this.#n;
  }
  get element() {
    return this.#c;
  }
  get elRows() {
    return this.#c.rows;
  }
  get elPrimary() {
    return this.#c.rows.primary;
  }
  get elSecondary() {
    return this.#c.rows.secondary;
  }
  get elPanes() {
    return this.#c.rows.chartPanes;
  }
  get elPaneSlot() {
    return this.#c.rows.chartPaneSlot;
  }
  get width() {
    return this.#c.getBoundingClientRect().width;
  }
  get height() {
    return this.#c.getBoundingClientRect().height;
  }
  get chartW() {
    return this.elPrimary.getBoundingClientRect().width;
  }
  get chartH() {
    return this.elPrimary.getBoundingClientRect().height;
  }
  get rowsW() {
    return this.#a.getBoundingClientRect().width;
  }
  get rowsH() {
    return this.#a.getBoundingClientRect().height;
  }
  get rowMinH() {
    return this.#A;
  }
  set rowMinH(e) {
    T(e) && (this.#A = Math.abs(e));
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return D.elementDimPos(this.#c);
  }
  get range() {
    return this.#i.range;
  }
  set cursor(e) {
    this.element.style.cursor = e;
  }
  get cursor() {
    return this.element.style.cursor;
  }
  get cursorPos() {
    return this.#v;
  }
  get candleW() {
    return this.#x.candleW;
  }
  get theme() {
    return this.#i.theme;
  }
  get config() {
    return this.#i.config;
  }
  get buffer() {
    return this.#k;
  }
  get bufferPx() {
    return this.getBufferPx();
  }
  get scrollPos() {
    return this.#i.scrollPos;
  }
  set stateMachine(e) {
    this.#s = new ze(e, this);
  }
  get stateMachine() {
    return this.#s;
  }
  get renderLoop() {
    return rc;
  }
  get graph() {
    return this.#p;
  }
  get views() {
    return this.#i.state.data.views;
  }
  get indicators() {
    return this.getIndicators();
  }
  get elements() {
    return {
      elRows: this.elRows,
      elPrimary: this.elPrimary,
      elSecondarys: this.elSecondarys,
      elTime: this.#h,
      elScale: this.#u
    };
  }
  init(e) {
    if (this.#i, this.#N = this.#i.indicatorClasses, this.#a = this.#c.rows, this.#h = this.#c.time, this.#y = this.#c.rows.grid, this.#b = this.#c.viewport, this.#u = this.#i.elBody.scale, e.name = "Chart", e.shortName = "Chart", e.parent = this, e.chartData = this.#i.chartData, e.primaryPane = this.#i.primaryPane, e.secondaryPane = this.#i.secondaryPane, e.rangeLimit = this.#i.rangeLimit, e.settings = this.#i.settings, e.elements = {
      ...e.elements,
      ...this.elements
    }, this.#i.theme?.time?.navigation === !1) {
      const i = {
        height: Pi
      };
      this.#i.theme.time = {
        ...this.#i.theme?.time,
        ...i
      }, this.#a.style.height = `calc(100% - ${Pi}px)`;
    }
    this.#x = new sc(this.#i, e), this.registerChartViews(e), this.#k = T(this.config.buffer) ? this.config.buffer : Oi, this.#A = T(this.config.rowMinH) ? this.config.rowMinH : xn, this.#T = T(this.config.secondaryPaneDefaultH) ? this.config.secondaryPaneDefaultH : bn, this.rowsOldH = this.rowsH, this.log(`${this.#e} instantiated`);
  }
  start() {
    let e = 0;
    this.#c.start(this.theme), this.#x.start(), this.#f.forEach((i, s) => {
      i.start(e++), e === 1 && i.Divider.hide();
    }), this.rowsOldH = this.rowsH, this.createGraph(), this.draw(this.range, !0), this.renderLoop.init({
      graphs: [this.#p],
      range: this.range
    }), this.renderLoop.start(), this.renderLoop.queueFrame(this.range, [this.#p], !1), this.eventsListen(), ss.id = this.id, ss.context = this, this.stateMachine = ss, this.stateMachine.start();
  }
  destroy() {
    this.#l = !0, this.stateMachine.destroy(), this.#x.destroy(), this.#f.forEach((e, i) => {
      this.#M[i] = !0, e.destroy(), delete this.#M[i];
    }), this.#p.destroy(), this.#I.destroy(), this.off(Vt, this.onFirstStreamValue), this.off(zt, this.onNewStreamValue), this.off("setRange", this.draw), this.off("scrollUpdate", this.draw), this.off("chart_render", this.draw), this.off("destroyChartView", this.removeChartPane);
  }
  reset() {
    for (let e in this.#i.Indicators) for (let i in this.#i.Indicators[e]) this.#i.Indicators[e][i].instance.remove();
  }
  restart() {
    this.chart.scale.restart(), this.validateIndicators();
    for (let [e, i] of this.views) for (let s of i) e === "primary" && s.type === "candles" || this.addIndicator(s.type, s.name, {
      data: s.data,
      settings: s.settings
    });
    this.draw(this.range, !0);
  }
  eventsListen() {
    this.#a.tabIndex = 0, this.#a.focus(), this.#I = new Le(this.#a, {
      disableContextMenu: !1
    }), this.#I.on("keydown", this.onChartKeyDown.bind(this)), this.#I.on("keyup", this.onChartKeyUp.bind(this)), this.#I.on("wheel", this.onMouseWheel.bind(this)), this.#I.on("pointerenter", this.onMouseEnter.bind(this)), this.#I.on("pointerout", this.onMouseOut.bind(this)), this.#I.on("pointerup", this.onChartDragDone.bind(this)), this.#I.on("pointermove", this.onMouseMove.bind(this)), this.on(Vt, this.onFirstStreamValue, this), this.on(zt, this.onNewStreamValue, this), this.on("setRange", this.draw, this), this.on("scrollUpdate", this.draw, this), this.on("chart_render", this.draw, this), this.on("destroyChartView", this.removeChartPane, this);
  }
  on(e, i, s) {
    this.#i.on(e, i, s);
  }
  off(e, i) {
    this.#i.off(e, i);
  }
  emit(e, i) {
    this.#i.emit(e, i);
  }
  onMouseWheel(e) {
    const i = Math.sign(e.wheeldelta) * -1;
    if (e.domEvent.preventDefault(), this.#i.pointerButtons[0]) {
      e.dragstart.x = this.#v[0], e.dragstart.y = this.#v[1], e.position.x = this.#v[0] + i, e.position.y = this.#v[1], this.onChartDrag(e);
      return;
    }
    const s = this.range,
      n = s.indexStart - Math.floor(i * mn * s.Length),
      o = s.indexEnd + Math.ceil(i * mn * s.Length);
    this.#i.setRange(n, o), this.draw(this.range, !0);
  }
  onMouseMove(e) {
    const i = this.#P;
    i.d2x = i?.d1x || null, i.d2y = i?.d1y || null, i.d1x = e.movement.x, i.d1y = e.movement.y, i.dx = Math.floor((i.d1x + i.d2x) / 2), i.dy = Math.floor((i.d1y + i.d2y) / 2), i.ts2 = i?.ts1 || null, i.ts1 = Date.now(), this.#v = [e.position.x, e.position.y, e.dragstart.x, e.dragstart.y, i.dx, i.dy, i.ts1, i.ts1 - i.ts2], this.core.Timeline.showCursorTime(), this.core.Chart.graph.overlays.list.get("cursor").layer.visible = !0;
    for (let [s, n] of this.chartPanes) n.graph.overlays.list.get("cursor").layer.visible = !0;
    this.emit("main_mousemove", this.#v);
  }
  onMouseEnter(e) {
    this.core.Timeline.showCursorTime(), this.core.Chart.graph.overlays.list.get("cursor").layer.visible = !0, this.core.Chart.graph.render();
    for (let [i, s] of this.chartPanes) s.graph.overlays.list.get("cursor").layer.visible = !0, s.graph.render();
  }
  onMouseOut(e) {
    this.onPointerActive(!1), this.core.Timeline.hideCursorTime(), this.core.Chart.graph.overlays.list.get("cursor").layer.visible = !1, this.core.Chart.graph.render();
    for (let [i, s] of this.chartPanes) s.graph.overlays.list.get("cursor").layer.visible = !1, s.graph.render();
    this.draw();
  }
  onChartDrag(e) {
    const i = this.#R;
    i.active ? (i.delta = [e.position.x - i.prev[0], e.position.y - i.prev[1]], i.prev = [e.position.x, e.position.y]) : (i.active = !0, i.start = [e.dragstart.x, e.dragstart.y], i.prev = i.start, i.delta = [0, 0]), this.#v = [e.position.x, e.position.y, ...i.start, ...i.delta], this.emit("chart_pan", this.#v);
  }
  onChartDragDone(e) {
    const i = this.#R;
    i.active = !1, i.delta = [0, 0], this.#v = [...i.prev, ...i.start, ...i.delta], this.emit("chart_panDone", this.#v);
  }
  onChartKeyDown(e) {
    let i = this.candleW > 1 ? this.candleW : 1;
    switch (e.key) {
      case "ArrowLeft":
        this.emit("chart_pan", [0, null, i, null, i * -1, null]);
        break;
      case "ArrowRight":
        this.emit("chart_pan", [i, null, 0, null, i, null]);
        break;
      case "ArrowUp":
        e.wheeldelta = -1, e.domEvent = e.srcEvent, this.onMouseWheel(e);
        break;
      case "ArrowDown":
        e.wheeldelta = 1, e.domEvent = e.srcEvent, this.onMouseWheel(e);
        break;
    }
  }
  onChartKeyUp(e) {
    let i = this.candleW > 1 ? this.candleW : 1;
    switch (e.key) {
      case "ArrowLeft":
        this.emit("chart_panDone", [0, null, i, null, i * -1, null]);
        break;
      case "ArrowRight":
        this.emit("chart_panDone", [i, null, 0, null, i, null]);
        break;
    }
  }
  onFirstStreamValue(e) {
    this.chart.scale.xAxis.calcXAxisGrads(this.range), this.draw(this.range, !0);
  }
  onNewStreamValue(e) {}
  onPointerActive(e) {
    e && (e.cursorActive = !0, e.scale.layerCursor.visible = !0), e !== this.chart && (this.chart.cursorActive = !1, this.chart.scale.layerCursor.visible = !1, this.chart.scale.layerCursor.erase()), this.#f.forEach((i, s) => {
      e !== i && (i.cursorActive = !1, i.scale.layerCursor.visible = !1, i.scale.layerCursor.erase());
    });
  }
  setDimensions() {
    this.#a.previousDimensions();
    let e = this.#a.heightDeltaR,
      i = Math.round(this.chartH * e),
      s = this.rowsW,
      n = this.rowsH,
      o = Math.round(s * ((100 + this.#k) * 0.01)),
      a = {
        resizeH: e,
        mainH: this.element.height,
        mainW: this.element.width,
        rowsH: this.rowsH,
        rowsW: this.rowsW
      };
    this.#i.scrollPos = -1, this.#x.setDimensions({
      w: s
    }), this.#p.setSize(s, n, o), this.#f.size == 1 && i != this.#a.height ? this.#E.setDimensions({
      w: s,
      h: this.#a.height
    }) : this.#f.forEach((l, h) => {
      i = Math.round(l.viewport.height * e), l.setDimensions({
        w: s,
        h: i
      });
    }), this.rowsOldH = this.rowsH, this.emit("rowsResize", a), this.draw(void 0, !0);
  }
  getBufferPx() {
    let e = Math.round(this.width * this.buffer / 100),
      i = e % this.candleW;
    return e - i;
  }
  registerChartViews(e) {
    this.#a.previousDimensions();
    const i = this.validateIndicators();
    let s = i[0];
    for (let n of i) n?.primary === !0 ? s = n : n.primary = !1;
    s.primary = !0, e.rowY = 0;
    for (let [n, o] of this.views) e.type = n, e.view = o, this.addChartPane(e);
  }
  chartPanesState() {
    const e = {
      list: [...this.#f.values()],
      collapsed: [],
      expanded: [],
      maximized: this.#L.instance
    };
    for (let i of e.list) i.collapsed.state ? e.collapsed.push(i) : e.expanded.push(i);
    return e;
  }
  addChartPane(e) {
    const {
        expanded: i
      } = this.chartPanesState(),
      s = this.calcChartPaneHeights(),
      n = s.new;
    let o;
    for (o in s) if (this.#f.has(o)) {
      let m = this.#f.get(o);
      i.indexOf(m) > -1 && m.setDimensions({
        w: this.rowsW,
        h: s[o]
      });
    }
    let a;
    this.#a.insertAdjacentHTML("beforeend", this.#c.rowNode(e.type, this.#i)), a = this.#a.chartPaneSlot.assignedElements().slice(-1)[0], a.style.height = `${n}px`, a.style.width = "100%";
    let l;
    this.#o.insertAdjacentHTML("beforeend", this.scaleNode(e.type)), l = this.#o.chartPaneSlot.assignedElements().slice(-1)[0], l.style.height = `${n}px`, l.style.width = "100%", e.elements.elTarget = a, e.elements.elScale = l;
    let h;
    return e.type == "primary" ? (h = new nt(this.#i, e), this.#E = h) : (e.name = e.view[0].name || "Secondary", e.shortName = e.view[0].type || "Secondary", h = new nt(this.#i, e)), this.setPaneDividers(), this.#f.set(h.id, h), this.emit("addChartView", h), h;
  }
  removeChartPane(e) {
    if (!E(e) || !this.#f.has(e)) return !1;
    const i = this.#f.get(e);
    if (i.isPrimary) return this.#i.error(`Cannot remove primary chart pane! ${e}`), !1;
    this.#M[e] = !0;
    const {
      expanded: s
    } = this.chartPanesState();
    let n = s.indexOf(i);
    n > -1 && s.splice(n, 1);
    let o = i.viewport.height,
      a = Math.floor(o / s.length),
      l = o % a;
    if (i.status !== "destroyed" && i.destroy(), this.#f.delete(e), delete this.#M[e], this.#f.size === 1) {
      let h = this.#f.values().next().value;
      h.collapsed && (h.collapsed.state = !1), h.setDimensions({
        w: void 0,
        h: this.rowsH
      });
    } else for (let h of s) o = h.viewport.height, h.setDimensions({
      w: void 0,
      h: o + a + l
    }), l = 0;
    return this.setPaneDividers(), this.draw(this.range, !0), !0;
  }
  validateIndicators() {
    const e = [];
    for (let [i, s] of this.views) {
      if (i === "primary" && e.push(s), s.length === 0 && i !== "primary") {
        this.views.delete(i);
        continue;
      }
      for (const [n, o] of s.entries()) b(o) && (o.type in this.core.indicatorClasses || Vc.includes(o.type)) || (this.#i.log(`indicator ${s.type} not added: not supported.`), s.splice(n, 1));
    }
    return e;
  }
  addIndicator(e, i = e, s = {}) {
    if (!E(e) && !(e in this.#N) && !E(i) && !b(s)) return !1;
    this.log(`Adding the ${i} : ${e} indicator`), this.emit("pane_refresh", this), M(s?.data) || (s.data = []), b(s?.settings) || (s.settings = {});
    let n;
    if (this.#N[e].ind.primaryPane) {
      const o = {
        type: e,
        name: i,
        ...s
      };
      n = this.#E.addIndicator(o);
    } else {
      this.core.indicatorClasses[e].ind.primaryPane === "both" && K(e.primaryPane) && e.primaryPane, M(s.view) || (s.view = [{
        name: i,
        type: e,
        ...s
      }]);
      for (let a = 0; a < s.view.length; a++) (!b(s.view[a]) || !Tr(["name", "type"], Object.keys(s.view[a]))) && s.view.splice(a, 1);
      if (s.view.length == 0) return !1;
      s.parent = this, s.title = i, s.elements = {
        ...this.elements
      }, n = this.addChartPane(s), n.start();
    }
    return this.#i.refresh(), this.emit("addIndicatorDone", n), this.#i.log("Added indicator:", n.id), n;
  }
  getIndicators() {
    const e = {};
    return this.#f.forEach((i, s) => {
      e[s] = i.indicators;
    }), e;
  }
  getIndicator(e) {
    if (!E(e)) return !1;
    for (const i of this.#f.values()) if (e in i.indicators) return i.indicators[e].instance;
  }
  removeIndicator(e) {
    if (this.emit("pane_refresh", this), E(e)) {
      for (const i of this.#f.values()) if (e in i.indicators) return i.indicators[e].instance.remove(), !0;
    } else return e instanceof He ? (e.remove(), !0) : !1;
  }
  indicatorSettings(e, i) {
    if (E(e)) {
      for (const s of this.#f.values()) if (e in s.indicators) return s.indicators[e].instance.settings(i);
    } else return e instanceof He ? e.settings(i) : !1;
  }
  calcChartPaneHeights() {
    const {
        collapsed: e,
        expanded: i
      } = this.chartPanesState(),
      s = this.#f.size + 1,
      n = this.#T * (s - 1),
      o = n / Math.log10(n * 2) / 100;
    Math.round(this.rowsH * o);
    const a = {};
    if (s === 1) a.new = this.rowsH;else if (s === 2 || i.length === 1) {
      let l;
      try {
        l = i[0].viewport.height;
      } catch {
        l = this.rowsH;
      }
      const h = Math.round(l * this.#T / 100);
      a[i[0].id] = l - h, a.new = h;
    } else if (i.length === 2) {
      const l = i[0].viewport.height,
        h = i[1].viewport.height,
        m = l + h,
        g = Math.round(m * this.#T / 100),
        v = m / (m + g);
      a[i[0].id] = Math.floor(l * v), a[i[1].id] = Math.floor(h * v), a.new = Math.floor(g * v), a.new += m - (a[i[0].id] + a[i[1].id] + a.new);
    } else if (i.length >= 3) {
      let l = this.rowsH,
        h = 0,
        m;
      for (let g of e) l -= g.viewport.height;
      a.new = Math.floor(l / (i.length + 1)), l / (l + a.new), m = l - a.new;
      for (let g of i) a[g.id] = m * (g.viewport.height / l), h += a[g.id];
      a.new += l - h;
    }
    return a;
  }
  scaleNode(e) {
    const i = Nh + " width: 100%;";
    return `
    <div slot="chartpane" class="viewport scale ${e}" style="$${i}"></div>
  `;
  }
  createGraph() {
    let e = ce(Bc);
    this.#p = new vt(this, this.#b, e);
  }
  draw(e = this.range, i = !1) {
    this.time.xAxis.doCalcXAxisGrads(e);
    const s = [this.#p, this.#x];
    this.#f.forEach((n, o) => {
      s.push(n);
    }), this.renderLoop.queueFrame(this.range, s, i);
  }
  updateRange(e) {
    this.#i.updateRange(e);
  }
  zoomRange() {
    this.draw(this.range, !0);
  }
  paneMaximize(e) {
    if (!(e instanceof nt)) return !1;
    const i = this.#L,
      s = e.legend.list.chart.el.querySelector(".controls");
    let n;
    if (s.classList.toggle("maximized"), s.classList.toggle("restored"), e === i.instance) this.panesRestore(), i.instance = null, i.panes = {}, e.collapsed.state && (e.graph.viewport.scene.canvas.style.display = "none", e.scale.graph.viewport.scene.canvas.style.visibility = "hidden");else {
      this.panesRestore(), i.instance = e, i.rowsH = this.rowsH;
      for (let [o, a] of this.#f.entries()) i.panes[o] = a.element.clientHeight, n = a.element.style, e === a ? (n.display = "block", a.setDimensions({
        w: void 0,
        h: this.rowsH
      }), a.graph.viewport.scene.canvas.style.display = "block", a.scale.graph.viewport.scene.canvas.style.visibility = "visible") : (n.display = "none", a.scale.element.style.display = "none");
      this.hidePaneDividers();
    }
    return this.emit("pane_refresh", this), !0;
  }
  panesRestore() {
    const e = this.#L;
    let i = 0;
    this.emit("pane_refresh", this), this.dimensions.height == e.height;
    for (let [s, n] of this.#f.entries()) n.element.style.display = "block", n.scale.element.style.display = "block", s in e.panes && i++ > 0 && n.Divider.show(), n.setDimensions({
      w: void 0,
      h: e.panes[s]
    });
  }
  paneCollapse(e) {
    if (!(e instanceof nt)) return !1;
    this.emit("pane_refresh", this);
    const i = e.legend.list.chart.el.querySelector(".controls"),
      s = e.collapsed;
    let n = e.element.clientHeight,
      o,
      a,
      l;
    const {
      list: h,
      collapsed: m,
      expanded: g
    } = this.chartPanesState();
    if (o = m.indexOf(e), o > -1 && m.splice(o, 1), o = g.indexOf(e), o > -1 && g.splice(o, 1), e.collapsed.state) {
      i.classList.remove("collapsed"), i.classList.add("expanded"), s.rowsCnt !== h.length ? n = s.height * (s.rowsCnt / h.length) : s.rowsHeight !== this.rowsH ? n = s.height * (s.rowsHeight / this.rowsH) : n = s.height, a = (n - cs) / g.length;
      for (let v of g) l = v.element.clientHeight - a, v.setDimensions({
        w: void 0,
        h: l
      });
      e.collapse(n);
    } else {
      if (i.classList.add("collapsed"), i.classList.remove("expanded"), h.length < 2 || g.length < 1) return !1;
      n = (e.element.clientHeight - cs) / g.length;
      for (let v of g) l = v.element.clientHeight + n, v.setDimensions({
        w: void 0,
        h: l
      });
      e.collapse();
    }
    return this.setPaneDividers(), !0;
  }
  setPaneDividers() {
    const {
      list: e
    } = this.chartPanesState();
    let i = 0;
    for (let s of e) s.Divider instanceof le && i++ > 0 && (s.Divider.setWidth(), s.Divider.setPos(), s.Divider.show());
  }
  hidePaneDividers() {
    const {
      list: e
    } = this.chartPanesState();
    for (let i of e) i.Divider instanceof le && i.Divider.hide();
  }
}
class xi {
  static passive = new xi("passive");
  static hover = new xi("hover");
  static active = new xi("active");
  constructor(e) {
    this.name = e;
  }
}
class Ae extends W {
  static #e = 0;
  static #t = {};
  static create(e, i) {
    const s = ++Ae.#e;
    i.cnt = s, i.modID = `${i.toolID}_${s}`, i.toolID = i.modID, i.target = e;
    const n = new i.tool(i);
    return Ae.#t[s] = n, e.chartToolAdd(n), n;
  }
  static destroy(e) {
    if (e instanceof Ae) {
      const i = e.inCnt;
      delete Ae.#t[i];
    }
  }
  #n;
  #r = null;
  #i = "";
  #s = "";
  #l;
  #o;
  #c;
  #a;
  #h;
  #d;
  #u;
  #m;
  #y;
  #g;
  #b = [0, 0];
  #w = !1;
  #p;
  #S = {
    TL: [0, 0],
    BR: [0, 0]
  };
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a), this.#o = config, this.#r = config.cnt, this.#n = this.#o.ID || Z("TX_Tool_"), this.#i = config.name, this.#c = config.core, this.#d = config.elements.elChart, this.#a = {
      ...config.parent
    }, this.#g = config.target, this.#g.addTool(this), this.#m = this.#y.viewport, this.#u = this.#m.scene.canvas, this.#p = config.pos;
  }
  set id(e) {
    this.#n = $e(e);
  }
  get id() {
    return this.#n ? `${this.#n}` : `${this.#c.id}-${this.#s}_${this.#r}`.replace(/ |,|;|:|\.|#/g, "_");
  }
  get inCnt() {
    return this.#r;
  }
  get name() {
    return this.#i;
  }
  get shortName() {
    return this.#s;
  }
  get core() {
    return this.#c;
  }
  get stateMachine() {
    return this.#c.stateMachine;
  }
  get state() {
    return this.#c.getState();
  }
  get data() {
    return this.#c.chartData;
  }
  get range() {
    return this.#c.range;
  }
  get target() {
    return this.#g;
  }
  set layerTool(e) {
    this.#y = e;
  }
  get layerTool() {
    return this.#y;
  }
  get elViewport() {
    return this.#m;
  }
  get cursorPos() {
    return this.#b;
  }
  get cursorActive() {
    return this.#w;
  }
  get cursorClick() {
    return this.#p;
  }
  get candleW() {
    return this.#c.Timeline.candleW;
  }
  get theme() {
    return this.#c.theme;
  }
  get config() {
    return this.#c.config;
  }
  get scrollPos() {
    return this.#c.scrollPos;
  }
  get bufferPx() {
    return this.#c.bufferPx;
  }
  get visible() {
    return this.isVisible();
  }
  set position(e) {
    this.target.setPosition(e[0], e[1]);
  }
  end() {
    this.stop();
  }
  stop() {
    this.#h.off("mousemove", this.onPointerMove);
  }
  eventsListen() {
    this.#h = new Le(this.#u, {
      disableContextMenu: !1
    }), this.#h.on("pointermove", this.onPointerMove.bind(this));
  }
  on(e, i, s) {
    this.#c.on(e, i, s);
  }
  off(e, i) {
    this.#c.off(e, i);
  }
  emit(e, i) {
    this.#c.emit(e, i);
  }
  onPointerMove(e) {
    this.#b = [Math.round(e.position.x), Math.round(e.position.y)], this.emit("tool_pointermove", this.#b);
  }
  isVisible() {}
  draw() {}
}
class zc extends Ae {
  constructor(e) {
    super(e);
  }
}
class ui extends Ae {
  #e = sr.colour;
  #t = sr.width;
  #n;
  constructor(e) {
    super(e);
  }
  set colour(e = this.#e) {
    this.#e = e;
  }
  get colour() {
    return this.#e;
  }
  set lineWidth(e) {
    this.#t = T(e) ? e : this.#t;
  }
  get lineWidth() {
    return this.#t;
  }
  set stateMachine(e) {
    this.#n = new ze(e, this);
  }
  get stateMachine() {
    return this.#n;
  }
  start() {
    this.eventsListen();
  }
  destroy() {
    this.stateMachine.destroy();
  }
  draw() {
    let [e, i] = this.cursorClick;
    this.layerTool.scene.clear();
    const n = this.layerTool.scene.context;
    n.save(), n.lineWidth = this.lineWidth, n.strokeStyle = this.colour, n.beginPath(), n.moveTo(e, i), n.lineTo(300, 150), n.stroke(), n.closePath(), n.restore(), this.elViewport.render();
  }
}
class Wc extends Ae {
  constructor(e) {
    super(e);
  }
}
class Fc extends Ae {
  constructor(e) {
    super(e);
  }
}
class Gc extends Ae {
  constructor(e) {
    super(e);
  }
}
const Yc = [{
    id: "cursor",
    name: "Cursor",
    icon: jl,
    event: "tool_activated"
  }, {
    id: "line",
    name: "Line",
    icon: et,
    event: "tool_activated",
    class: ui,
    sub: [{
      id: "ray",
      name: "Ray",
      icon: et,
      event: "tool_activated",
      class: ui
    }, {
      id: "hRay",
      name: "Horizontal Ray",
      icon: et,
      event: "tool_activated",
      class: ui
    }, {
      id: "vRay",
      name: "Vertical Ray",
      icon: et,
      event: "tool_activated",
      class: ui
    }]
  }, {
    id: "fibonacci",
    name: "Fibonacci",
    icon: Jl,
    event: "tool_activated",
    class: zc,
    sub: [{
      id: "fib",
      name: "Not Implemented Yet",
      icon: et
    }]
  }, {
    id: "range",
    name: "Range",
    icon: eh,
    event: "tool_activated",
    class: Fc,
    sub: [{
      id: "rng",
      name: "Not Implemented Yet",
      icon: et
    }]
  }, {
    id: "text",
    name: "Text",
    icon: th,
    event: "tool_activated",
    class: Gc,
    sub: [{
      id: "txt",
      name: "Not Implemented Yet",
      icon: et
    }]
  }, {
    id: "measure",
    name: "Measure",
    icon: Ql,
    event: "tool_activated",
    class: Wc
  }, {
    id: "delete",
    name: "Delete",
    icon: Zl,
    event: "tool_activated",
    class: void 0
  }],
  sr = {
    colour: "#8888AACC",
    width: 1
  },
  ns = {
    id: "template",
    initial: "idle",
    context: {},
    states: {
      idle: {
        onEnter(r) {
          console.log("idle: onEnter");
        },
        onExit(r) {
          console.log("idle: onExit");
        },
        on: {
          tool_activated: {
            target: "tool_activated",
            action(r) {
              this.context.origin.onToolActivated(r);
            }
          },
          tool_selected: {
            target: "tool_selected",
            action(r) {
              this.context.origin.onToolSelected(r);
            }
          },
          tool_deselected: {
            target: "tool_deselected",
            action(r) {
              this.context.origin.onToolDeselected(r);
            }
          },
          tool_deleted: {
            target: "tool_deleted",
            action(r) {
              this.context.origin.onToolDeleted(r);
            }
          }
        }
      },
      tool_activated: {
        onEnter(r) {},
        onExit(r) {},
        on: {
          tool_selected: {
            target: "tool_addToTarget",
            action(r) {
              this.context.origin.onToolTargetSelected(r);
            }
          }
        }
      },
      tool_selected: {
        onEnter(r) {},
        onExit(r) {},
        on: {}
      },
      tool_deselected: {
        onEnter(r) {},
        onExit(r) {},
        on: {
          always: {
            target: "idle",
            condition: "toolTarget",
            action(r) {}
          }
        }
      },
      tool_deleted: {
        onEnter(r) {},
        onExit(r) {},
        on: {
          always: {
            target: "idle",
            condition: "toolTarget",
            action(r) {}
          }
        }
      }
    },
    guards: {
      toolTarget() {
        return !0;
      }
    }
  };
class eo {
  #e;
  #t = "Toolbar";
  #n = "tools";
  #r;
  #i;
  #s;
  #l;
  #o;
  #c = Ae;
  #a;
  #h = {};
  #d = void 0;
  #u;
  #m = {
    click: [],
    pointerover: []
  };
  #y = [];
  constructor(e, i) {
    this.#r = e, this.#i = i, this.#l = e.elTools, this.#a = Yc || e.config.tools, this.#o = e.WidgetsG, this.init();
  }
  log(e) {
    this.#r.log(e);
  }
  info(e) {
    this.#r.info(e);
  }
  warn(e) {
    this.#r.warn(e);
  }
  error(e) {
    this.#r.error(e);
  }
  set id(e) {
    this.#e = $e(e);
  }
  get id() {
    return this.#e ? `${this.#e}` : `${this.#r.id}-${this.#n}`.replace(/ |,|;|:|\.|#/g, "_");
  }
  get name() {
    return this.#t;
  }
  get shortName() {
    return this.#n;
  }
  get core() {
    return this.#r;
  }
  get options() {
    return this.#i;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return D.elementDimPos(this.#l);
  }
  set stateMachine(e) {
    this.#s = new ze(e, this);
  }
  get stateMachine() {
    return this.#s;
  }
  init() {
    this.mount(this.#l), this.log(`${this.#t} instantiated`);
  }
  start() {
    this.initAllTools(), this.addAllTools(), this.eventsListen(), ns.id = this.id, ns.context = this, this.stateMachine = ns, this.stateMachine.start();
  }
  destroy() {
    this.stateMachine.destroy();
    const e = this.#l.querySelectorAll(".icon-wrapper");
    for (let i of e) for (let s of this.#a) s.id === id && i.removeEventListener("click", this.#m[id].click), i.removeEventListener("pointerover", this.#m[id].pointerover), i.removeEventListener("pointerout", this.#m[id].pointerout);
    this.off("tool_selected", this.onToolSelect), this.off("tool_deselected", this.onToolDeselect);
  }
  eventsListen() {
    this.on("tool_selected", this.onToolSelect, this), this.on("tool_deselected", this.onToolDeselect, this);
  }
  on(e, i, s) {
    this.#r.on(e, i, s);
  }
  off(e, i) {
    this.#r.off(e, i);
  }
  emit(e, i) {
    this.#r.emit(e, i);
  }
  onResized() {
    for (let e of this.#y) e.position();
  }
  onIconClick(e) {
    e.currentTarget.dataset.event;
    let i = e.currentTarget.dataset.menu || !1,
      s = {
        target: e.currentTarget.id,
        menu: i,
        evt: e.currentTarget.dataset.event,
        tool: e.currentTarget.dataset.tool
      };
    i ? this.emit("menu_open", s) : this.emit("menuItem_selected", s);
  }
  onIconOut(e) {
    const i = e.currentTarget.querySelector("svg");
    i.style.fill = Xe.COLOUR_ICON;
  }
  onIconOver(e) {
    const i = e.currentTarget.querySelector("svg");
    i.style.fill = Xe.COLOUR_ICONHOVER;
  }
  onToolTargetSelected(e) {
    console.log("tool_targetSelected:", e.target), this.#u = e.target;
  }
  onToolActivated(e) {
    console.log("Tool activated:", e), this.#d = e;
  }
  onToolSelect(e) {
    console.log("Tool selected:", e);
  }
  onToolDeselect(e) {
    console.log("Tool deselected:", e);
  }
  mount(e) {
    e.innerHTML = this.#l.defaultNode(this.#a);
  }
  initAllTools() {
    const e = this.#l.querySelectorAll(".icon-wrapper");
    for (let i of e) {
      let s = i.id,
        n = i.querySelector("svg");
      n.style.fill = Xe.COLOUR_ICON, n.style.width = "90%";
      for (let o of this.#a) if (o.id === s) if (this.#m[s] = {}, this.#m[s].click = this.onIconClick.bind(this), this.#m[s].pointerover = this.onIconOver.bind(this), this.#m[s].pointerout = this.onIconOut.bind(this), i.addEventListener("click", this.#m[s].click), i.addEventListener("pointerover", this.#m[s].pointerover), i.addEventListener("pointerout", this.#m[s].pointerout), o?.sub) {
        let a = {
            content: o.sub,
            primary: i
          },
          l = this.#o.insert("Menu", a);
        i.dataset.menu = l.id, l.start(), this.#y.push(l);
        for (let h of o.sub) this.#h[h.id] = h.class;
      } else this.#h[o.id] = o.class;
    }
  }
  addTool(e = this.#d, i = this.#u) {
    let s = {
        name: e,
        tool: this.#h[e],
        pos: i.cursorClick
      },
      n = this.#c.create(i, s);
    return n.start(), console.log(n), n;
  }
  addNewTool(e, i) {
    let s = this.addTool(e, i);
    this.activeTool = s, this.emit("tool_active", s), this.emit(`tool_${s.id}_active`, s);
  }
  addAllTools() {}
}
const nr = 20,
  qc = 20,
  Xc = new _r(H.COLOUR_BORDER),
  xs = document.createElement("template");
xs.innerHTML = `
<style>
  .scrollBarWidget {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    gap: 2px;
  }
  .scrollBar {
    position: relative;
    border: 1px solid var(--txc-time-scrollbar-color, ${H.COLOUR_BORDER});
    height: 20px;
    border-radius: 3px;
    flex-basis: 100%;
    overflow: hidden;
  }
  .scrollBar input {
    pointer-events: none;
    position: absolute;
    overflow: hidden;
    left: 0;
    top: 0;
    width: 100%;
    outline: none;
    height: 100%;
    margin: 0;
    padding: 0;
    background:  var(--txc-time-slider-color, #555);

  }
  .scrollBar input::-moz-range-thumb {
    -moz-appearance: none;
    appearance: none; 
    pointer-events: auto;
    position: relative;
    z-index: 10;
    outline: 0;
    height: 100%;
  }
  .scrollBar input::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    appearance: none; 
    pointer-events: auto;
    position: relative;
    z-index: 1;
    height: 100%;
  }
  .scrollBar input::-moz-range-track {
    position: relative;
    z-index: -1;
    background-color: rgba(0, 0, 0, 1);
    border: 0;
  }
  .scrollBar input:last-of-type::-moz-range-track {
    -moz-appearance: none;
    background: none transparent;
    border: 0;
  }
  .scrollBar input[type="range"]::-webkit-slider-runnable-track {
    -webkit-appearance: none !important;
    appearance: none;
    background: none transparent;
    cursor: default;
    height: 1px; /* Required for Samsung internet based browsers */
    outline: 0;
  }
  .scrollBar input[type=range]::-moz-focus-outer {
    border: 0;
  }
  input[type=range] {
    -webkit-appearance: none;
    background: none;
  }

  input[type=range]::-webkit-slider-runnable-track {
    height: 5px;
    border: none;
    border-radius: 3px;
    background: transparent;
  }

  input[type=range]::-ms-track {
    height: 5px;
    background: transparent;
    border: none;
    border-radius: 3px;
  }

  input[type=range]::-moz-range-track {
    height: 5px;
    background: transparent;
    border: none;
    border-radius: 3px;
  }

  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 20px;
    width: 16px;
    border-radius: 3px;
    background: var(--txc-time-slider-color, #555);
    margin-top: -10px;
    position: relative;
    z-index: 10000;
  }

  input[type=range]::-ms-thumb {
    -webkit-appearance: none;
    border: none;
    height: 20px;
    width: 16px;
    border-radius: 3px;
    background:  var(--txc-time-slider-color, #555);
    margin-top: -5px;
    position: relative;
    z-index: 10000;
  }

  input[type=range]::-moz-range-thumb {
    -webkit-appearance: none;
    border: none;
    height: 100%;
    width: 16px;
    border-radius: 3px;
    background:  var(--txc-time-slider-color, #555);
    margin-top: -5px;
    position: relative;
    z-index: 10000;
  }

  input[type=range]:focus {
    outline: none;
  }

  .handle {
    background-color: var(--txc-time-handle-color, ${Xc.hex}44); 
    width: 2px;
    height: 18px;
    margin: 1px;
    margin-left: 872.968px;
    margin-right: 0px;
    position: absolute;
  }
  .icon {
    flex-basis: ${nr}px;
  }
  .icon svg {
    fill: var(--txc-time-icon-color, ${H.COLOUR_ICON});
    width: ${nr}px;
    height: ${qc}px;
    margin-top: 1px;
  }
  .icon svg:hover {
    fill: var(--txc-time-icon-hover-color, ${H.COLOUR_ICONHOVER});
  }
</style>
<div class="scrollBarWidget">
  <span id="rwdStart" class="icon rwdStart">${ph}</span>
  <span class="scrollBar">
    <div class="viewport"></div>
    <input id="min" class="min" name="min" type="range" step="1" min="0" max="3000" />
    <input id="max" class="max" name="max" type="range" step="1" min="0" max="3000" />
    <div class="handle"></div>
  </span>
  <span id="fwdEnd" class="icon fwdEnd">${mh}</span>
</div>
`;
class Kc extends oe {
  #e;
  #t;
  #n;
  #r;
  #i;
  #s;
  #l;
  #o;
  #c;
  #a;
  #h;
  #d;
  constructor() {
    super(xs), this.#e = xs;
  }
  destroy() {}
  connectedCallback() {
    super.connectedCallback(() => {
      document.getElementById("slider-bar"), this.#t = this.shadowRoot.querySelector(".scrollBarWidget"), this.#n = this.shadowRoot.querySelector(".rwdStart"), this.#r = this.shadowRoot.querySelector(".fwdEnd"), this.#i = this.shadowRoot.querySelector(".scrollBar"), this.#s = this.shadowRoot.querySelector(".viewport"), this.#l = this.shadowRoot.querySelector(".handle"), this.#o = this.shadowRoot.querySelectorAll("svg"), this.#c = this.shadowRoot.querySelector("#max"), this.#a = this.shadowRoot.querySelector("#min"), this.#h = this.shadowRoot.querySelectorAll("input"), this.#d = this.shadowRoot.querySelector("style[title=overview]"), this.max.addEventListener("input", this.onChangeSliderHandler.bind({
        self: this,
        input: this.max
      })), this.min.addEventListener("input", this.onChangeSliderHandler.bind({
        self: this,
        input: this.min
      }));
    });
  }
  get scrollBarWidget() {
    return this.#t;
  }
  get rwdStart() {
    return this.#n;
  }
  get fwdEnd() {
    return this.#r;
  }
  get scrollBar() {
    return this.#i;
  }
  get viewport() {
    return this.#s;
  }
  get handle() {
    return this.#l;
  }
  get icons() {
    return this.#o;
  }
  get max() {
    return this.#c;
  }
  get min() {
    return this.#a;
  }
  get sliders() {
    return this.#h;
  }
  get overviewCSS() {
    return this.#d;
  }
  onChangeSliderHandler() {
    console.log(`${this.input.value}, ${this.input.getAttribute("max")}`);
  }
}
customElements.get("tradex-overview") || window.customElements.define("tradex-overview", Kc);
const to = document.createElement("template");
to.innerHTML = `
<style>
  .viewport {
    width: 100%;
    height: ${Pi}px;
  }
  tradex-overview {
    height: ${Ir}px;
  }
</style>
<div class="viewport"></div>
<tradex-overview></tradex-overview>
`;
class jc extends oe {
  #e;
  #t;
  constructor() {
    super(to);
  }
  destroy() {}
  connectedCallback() {
    super.connectedCallback(() => {
      this.#e = this.shadowRoot.querySelector(".viewport"), this.#t = this.shadowRoot.querySelector("tradex-overview");
    });
  }
  get viewport() {
    return this.#e;
  }
  get overview() {
    return this.#t;
  }
}
customElements.get("tradex-time") || window.customElements.define("tradex-time", jc);
const io = document.createElement("template");
io.innerHTML = `
<style>
.scene-canvas {
  display: block;
}
</style>
<slot name="viewportCanvas"></slot>
<canvas class="scene-canvas"></canvas>
`;
class Zc extends oe {
  #e;
  #t;
  #n = this.onSlotChange.bind(this);
  constructor() {
    super(io);
  }
  destroy() {}
  connectedCallback() {
    super.connectedCallback(() => {
      this.#e = this.shadowRoot.querySelector('slot[name="viewportCanvas"]'), this.#e.addEventListener("slotchange", this.#n);
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.#e.removeEventListener("slotchange", this.#n);
  }
  get hasCanvasSlot() {
    return !0;
  }
  get canvasSlot() {
    return this.#e;
  }
  get canvas() {
    return this.#t;
  }
  onSlotChange() {
    this.#t = Array.from(this.canvasSlot.assignedElements()).find(e => e.localName === "canvas")[0];
  }
}
customElements.get("tradex-viewport") || window.customElements.define("tradex-viewport", Zc);
const so = document.createElement("template");
so.innerHTML = `
<style>
  tradex-viewport {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
  <tradex-viewport></tradex-viewport>
`;
class Jc extends oe {
  #e;
  constructor() {
    super(so);
  }
  destroy() {}
  connectedCallback() {
    super.connectedCallback(() => this.#e = this.shadowRoot.querySelector("tradex-viewport"));
  }
  get viewport() {
    return this.#e;
  }
}
customElements.get("tradex-grid") || window.customElements.define("tradex-grid", Jc);
const no = document.createElement("template");
no.innerHTML = `
<style>

.legends {
  display: flex;
  flex-direction: column;
}
.legends .collapse {
  order: 999;
  padding-left: 0.5em;
}

.legend {
  display: block;
  position: relative;
  width: 100%;
  min-height: 2em;
  margin: 0;
}
.legend * {
  margin: 0;
  padding: 0;
  vertical-align: middle;
}
.legend .upper,
.legend .lower {
  display: block;
  position: absolute;
  top: 0
  width: 100%;
  padding: 0 0.5em;
  white-space: nowrap;
}
.legend .controls {
  opacity: 0;
}
.legend .controls svg {
  vertical-align: text-top;
  margin-bottom: 0.2em;
}
.legend dl {
  display: inline; 
  margin: 0 0 0 -1em;
  overflow: hidden;
}
.legend dl:first-child,
.legend dl dt:first-of-type {
  margin-left: 0;
}
.legend dt {
  display: inline; margin-left: 1em;
}
.legend dd {
  display: inline; margin-left: .25em; color: #F900FE;
}
.legend .upper:hover {
  background: #444444cc;
  border-radius: 5px;
}
.legend .upper:hover .controls {
  opacity: 1;
}
.legend .title {
  margin-right: 1em;
  white-space: nowrap;
}
.legend .lower .title {
  visibility:hidden;
}
.legend .controls,
.legend dl {
  display: inline;
}
.legend .control,
.legend .control.collapse {
  margin-right: 2px;
  padding-left: 0;
}


.legends.hide .legend.indicator {
  display:none;
}


.controls .control:hover {
  background: #889;
  border-radius: 3px;
}

.controls.maximized .up,
.controls.maximized .down,
.controls.maximized .expand,
.controls.maximized .collapse,
.controls.maximized .maximize,
.controls.maximized .remove
{
  display: none;
}

.controls.restored .restore
{
  display: none;
}

.controls.collapsed .collapse {
  display: none;
}

.controls.expanded .expand {
  display: none;
}

.controls.visible .visible {
  display: none;
}
.controls.visible .notvisible {
  display: inline;
}

.controls.notvisible .notvisible {
  display: none;
}
.controls.notvisible .visible {
  display: inline;
}

.chart .upper {
  right: 0;
  z-index:1;
}
.chart .upper .title,
.secondary .upper .title {
  display: none;
}
.chart .lower .title {
  visibility: visible;
}

.secondary .upper {
  right: 0;
  z-index:1;
}
</style>
<div class="legends">
  <slot name="legend"></slot>
  <div class="controls collapse restored">
    <span id="hideLegends" class="control" data-icon="hide" style="display:none">${sh}</span>
    <span id="showLegends" class="control" data-icon="show" style="display:none">${nh}</span>
  </div>
</div>
`;
class Qc extends oe {
  #e;
  #t;
  #n;
  #r;
  #i;
  #s;
  #l = [];
  #o;
  constructor() {
    super(no);
  }
  destroy() {}
  connectedCallback() {
    super.connectedCallback(() => {
      this.#s = this.shadowRoot.querySelector("slot"), this.#t = this.shadowRoot.querySelector(".legends"), this.#n = this.shadowRoot.querySelector(".title"), this.#r = this.shadowRoot.querySelector("dl"), this.#i = this.shadowRoot.querySelector(".controls"), this.#o = this.onSlotChange.bind(this), this.#s.addEventListener("slotchange", this.#o);
    });
  }
  disconnectedCallback() {
    this.#s.removeEventListener("slotchange", this.#o);
  }
  get slot() {
    return this.#s;
  }
  get legends() {
    return this.#t;
  }
  get elTitle() {
    return this.#n;
  }
  get elInputs() {
    return this.#r;
  }
  get elControls() {
    return this.#i;
  }
  get title() {
    return this.#e;
  }
  set title(e) {
    this.setTittle(e);
  }
  onSlotChange(e) {
    this.#l.forEach(i => i.handler.call(i.context, e));
  }
  insert(e) {
    this.legends.insertAdjacentHTML("beforeend", e);
  }
  setTittle(e) {
    E && (this.#e = e, this.elTitle.innerHTML = e);
  }
  buildLegend(e, i) {
    let s = "",
      n = `${i.legend.font}; color: ${i.legend.colour}; text-align: left;`,
      o = "",
      a = e?.type !== "chart" ? "visible" : "notvisible";
    const l = "",
      h = i.legend.controls ? `
      <div class="controls restored expanded ${a}" style="${l}">
        ${this.buildControls(e)}
      </div>
    ` : "";
    switch (e?.type) {
      case "chart":
        o += "font-size: 1.5em;";
        break;
      case "secondary":
        n += " margin-bottom: -1.5em;", o += "", e.title = "";
        break;
      default:
        o += "font-size: 1.2em;";
        break;
    }
    return `
      <div id="legend_${e.id}" class="legend ${e.type}" style="${n}" data-type="${e.type}" data-id="${e.id}" data-parent="${e.parent.id}">
        <div class="lower">
          <span class="title" style="${o}">${e.title}</span>
          <dl style="${s}">${this.buildInputs(e)}</dl>
        </div>
        <div class="upper">
            <span class="title" style="${o}">${e.title}</span>
            ${h}
      </div>
     </div>
    `;
  }
  buildInputs(e) {
    let i = 0,
      s = "",
      n,
      o = "",
      a = "",
      l = "";
    for (n in e.inputs) {
      let h = e?.colours?.[i] ? ` color: ${e.colours[i]};` : "",
        m = e?.inputs?.[n] !== void 0 ? e.inputs[n] : o,
        g = e?.labels?.[i] ? `${n}:` : o;
      a += e?.labels?.[i] ? "1em;" : ".25em", s += `<dt style="${a}">${g}</dt>
      <dd style="${l}${h}">${m}</dd>`, ++i;
    }
    return s;
  }
  buildControls(e) {
    let i = "",
      s = e.id;
    return i += `<span id="${s}_up" class="control up" data-icon="up">${rh}</span>`, i += `<span id="${s}_down" class="control down" data-icon="down">${oh}</span>`, e?.type === "indicator" && (i += `<span id="${s}_visible" class="control visible" data-icon="visible">${uh}</span>`, i += `<span id="${s}_notVisible" class="control notvisible" data-icon="notVisible">${dh}</span>`), e?.type !== "indicator" && (i += `<span id="${s}_collapse" class="control collapse" data-icon="collapse">${hh}</span>`, i += `<span id="${s}_expand" class="control expand" data-icon="expand">${ch}</span>`, i += `<span id="${s}_maximize" class="control maximize" data-icon="maximize">${lh}</span>`, i += `<span id="${s}_restore" class="control restore" data-icon="restore">${ah}</span>`), i += e?.type !== "chart" ? `<span id="${s}_remove" class="control remove" data-icon="remove">${ih}</span>` : "", i += e?.type !== "secondary" ? `<span id="${s}_config" class="control config" data-icon="config">${Lr}</span>` : "", i;
  }
}
customElements.get("tradex-legends") || window.customElements.define("tradex-legends", Qc);
const ro = document.createElement("template");
ro.innerHTML = `
<style>
  :host {
    overflow: hidden;
  }

  .viewport {
    position: relative;
    width: 100%;
    height: inherit;
    background: var(--txc-chartpane-background, none);
  }
  .viewport canvas {
    position: absolute;
    top: 1px;
  }
  tradex-legends {
    position: absolute;
    top: 0;
    left: 0;
    z-index:100;
    width: 100%;
  }
</style>
<div class="viewport"></div>
<tradex-legends></tradex-legends>
`;
class eu extends oe {
  #e;
  #t;
  constructor() {
    super(ro);
  }
  destroy() {}
  connectedCallback() {
    super.connectedCallback(() => {
      this.#e = this.shadowRoot.querySelector(".viewport"), this.#t = this.shadowRoot.querySelector("tradex-legends");
    });
  }
  disconnectedCallback() {}
  get viewport() {
    return this.#e;
  }
  get legend() {
    return this.#t;
  }
}
customElements.get("tradex-chartpane") || window.customElements.define("tradex-chartpane", eu);
const oo = document.createElement("template");
oo.innerHTML = `
<style>
  tradex-grid {
    position: absolute;
    height: inherit;
  }
  tradex-grid {
    display: block;
    width: 100%;
  }
  slot[name="chartpane"] {
    display: flex;
    flex-direction: column;
  }
  ::slotted(tradex-chartpane) {
    display: block;
    position: relative;
    top: 0;
    width: 100%;
  }
  ::slotted(tradex-chartpane:first-of-type) {
    border-top: none !important;
  }
</style>
<tradex-grid></tradex-grid>
<slot name="chartpane" id="chartpane"></slot>
`;
class tu extends oe {
  #e;
  #t;
  #n;
  #r;
  constructor() {
    super(oo);
  }
  destroy() {}
  connectedCallback() {
    super.connectedCallback(), this.previousDimensions();
  }
  disconnectedCallback() {}
  get grid() {
    return this.shadowRoot.querySelector("tradex-grid");
  }
  get primary() {
    return Array.from(this.chartPaneSlot.assignedElements()).find(e => e.classList.contains("primary"));
  }
  get secondary() {
    return Array.from(this.chartPaneSlot.assignedElements()).find(e => e.classList.contains("secondary"));
  }
  get chartPanes() {
    return this.chartPaneSlot.assignedElements();
  }
  get chartPaneSlot() {
    return this.shadowRoot.querySelector('slot[name="chartpane"]');
  }
  get width() {
    return this.#n;
  }
  get height() {
    return this.#r;
  }
  get oWidth() {
    return this.#e;
  }
  get oHeight() {
    return this.#t;
  }
  get widthDeltaR() {
    return this.#n / this.#e;
  }
  get heightDeltaR() {
    return this.#r / this.#t;
  }
  previousDimensions() {
    this.#e = this.#n ? this.#n : this.clientWidth, this.#t = this.#r ? this.#r : this.clientHeight, this.#n = this.clientWidth, this.#r = this.clientHeight;
  }
}
customElements.get("tradex-rows") || window.customElements.define("tradex-rows", tu);
const ao = document.createElement("template");
ao.innerHTML = `
<style>
  #viewport {
    position: absolute;
    width: 100%;
    height: inherit;
    background: var(--txc-chartpane-background, none);
    z-index: 0;
  }
  #viewport canvas {
    position: absolute;
    // top: 1px;
  }
  tradex-rows {
    position:relative;
    overflow: hidden;
    width: calc(100% - ${gt}px);
    height: calc(100% - ${Mi}px);
    border: 1px solid;
    border-color: var(--txc-border-color, ${H.COLOUR_BORDER}); 
  }
  tradex-time {
    position: relative;
    width: calc(100% - ${gt}px);
    height: ${Mi}px;
    overflow: hidden;
    margin-left: 1px;
    z-index: 1;
  }
</style>
<div id="viewport"></div>
<tradex-rows></tradex-rows>
<tradex-time></tradex-time>
`;
class iu extends oe {
  #e;
  #t;
  constructor() {
    super(ao);
  }
  destroy() {}
  disconnectedCallback() {}
  get viewport() {
    return this.shadowRoot.querySelector("#viewport");
  }
  get rows() {
    return this.shadowRoot.querySelector("tradex-rows");
  }
  get time() {
    return this.shadowRoot.querySelector("tradex-time");
  }
  start(e) {
    this.#t = e, this.setMain();
  }
  rowNode(e, i) {
    return `
      <tradex-chartpane slot="chartpane" class="${e}" style="">
      </tradex-chartpane>
    `;
  }
  setMain() {
    let e = T(this.#t?.time?.height) ? this.#t.time.height : Mi,
      i = this.#t.tools.location == "none" ? 60 : 0;
    this.rows.style.height = `calc(100% - ${e}px)`, this.rows.style.left = `${i}px`, this.time.style.left = `${i}px`, this.viewport.style.left = `${i}px`;
  }
}
customElements.get("tradex-main") || window.customElements.define("tradex-main", iu);
const lo = document.createElement("template");
lo.innerHTML = `
  <slot></slot>
`;
class su extends oe {
  constructor() {
    super(lo);
  }
  destroy() {}
  get icons() {
    return this.shadowRoot.querySelector("slot").assignedElements();
  }
  defaultNode(e) {
    let i = `
    <style>
      svg {
        height: ${Xe.ICONSIZE};
        width: ${Xe.ICONSIZE};
        fill: ${Xe.COLOUR_ICON};
      }
      svg:hover {
        fill: ${Xe.COLOUR_ICONHOVER};
      }
      .icon-wrapper {
        width: ${Xe.ICONSIZE};
        margin: 0 auto;
      }
    </style>
    `;
    for (const s of e) i += this.iconNode(s);
    return i;
  }
  iconNode(e) {
    const i = "sub" in e ? 'data-menu="true"' : "";
    return `
      <div id="${e.id}" data-event="${e.event}" ${i} class="icon-wrapper">${e.icon}</div>

    `;
  }
}
customElements.get("tradex-tools") || window.customElements.define("tradex-tools", su);
const ho = document.createElement("template");
ho.innerHTML = `
<style>
  tradex-viewport {
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    z-index: -100;
  }
  slot[name="chartpane"] {
    display: flex;
    flex-direction: column;
  }
  ::slotted(div.scale:first-of-type) {
    border-top: none !important;
  }
</style>
<tradex-viewport></tradex-viewport>
<slot name="chartpane" id="chartPane"></slot>
`;
class nu extends oe {
  #e;
  #t;
  #n;
  constructor() {
    super(ho);
  }
  destroy() {}
  connectedCallback() {
    super.connectedCallback(() => {
      this.#e = this.shadowRoot.querySelector("tradex-viewport"), this.#n = this.shadowRoot.querySelector('slot[name="chartpane"]'), this.#t = this.chartPaneSlot.assignedElements();
    });
  }
  get viewport() {
    return this.#e;
  }
  get chartPanes() {
    return this.#t;
  }
  get chartPaneSlot() {
    return this.#n;
  }
}
customElements.get("tradex-scale") || window.customElements.define("tradex-scale", nu);
const ru = `
<style>
  tradex-tools {
    position: absolute; 
    top: 0; left: 0;
    width: ${qe}px;
    height: 100%; 
    min-height: 100%; 
  }
  tradex-main {
    position: absolute; 
    top: 0;
    right: 0;
    width: calc(100% - ${qe}px);
    height: 100%;
  }
  tradex-scale {
    position: absolute; 
    top: 1px;
    right: 0; 
    width: ${gt}px; 
    height: 100%;
  }
</style>
<tradex-tools></tradex-tools>
<tradex-main></tradex-main>
<tradex-scale></tradex-scale>
`,
  co = document.createElement("template");
co.innerHTML = ru;
class ou extends oe {
  #e;
  #t;
  #n;
  #r;
  constructor() {
    super(co);
  }
  destroy() {}
  connectedCallback() {
    super.connectedCallback(() => {
      this.#t = this.shadowRoot.querySelector("tradex-tools"), this.#n = this.shadowRoot.querySelector("tradex-main"), this.#r = this.shadowRoot.querySelector("tradex-scale");
    });
  }
  get tools() {
    return this.#t;
  }
  get main() {
    return this.#n;
  }
  get scale() {
    return this.#r;
  }
  start(e) {
    this.#e = e, this.setToolsLocation();
  }
  setYAxisLocation(e = this.#e?.yAxis?.location) {
    let i = T(this.#e?.tools?.width) ? this.#e.tools.width : qe,
      s;
    switch (e) {
      case "left":
        s = i == 0 ? 0 : gt, this.scale.style.left = `${i}px`, this.scale.style.right = void 0, this.main.style.left = void 0, this.main.style.right = `-${s}px`, this.main.style.width = `calc(100% - ${i}px)`;
        break;
      case "both":
      case "right":
      default:
        s = i == 0 ? gt : 0, this.scale.style.left = void 0, this.scale.style.right = 0, this.main.style.left = void 0, this.main.style.right = `${s}px`, this.main.style.width = `calc(100% - ${i}px)`;
        break;
    }
  }
  setToolsLocation(e = this.#e?.tools?.location) {
    switch (this.#e.tools = this.#e.tools || {}, e) {
      case "none":
      case !1:
        this.#e.tools.location = "none", this.#e.tools.width = 0, this.tools.style.display = "none", this.tools.style.width = "0px";
        break;
      case "right":
        this.#e.tools.location = "right", this.#e.tools.width = this.#e?.tools?.width || qe, this.tools.style.display = "block", this.tools.style.left = void 0, this.tools.style.right = 0, this.tools.style.width = `${qe}px`;
        break;
      case "left":
      default:
        this.#e.tools.location = "left", this.#e.tools.width = this.#e?.tools?.width || qe, this.tools.style.display = "block", this.tools.style.left = 0, this.tools.style.right = void 0, this.tools.style.width = `${qe}px`;
        break;
    }
    this.setYAxisLocation();
  }
}
customElements.get("tradex-body") || window.customElements.define("tradex-body", ou);
const uo = document.createElement("template");
uo.innerHTML = `
  <style>
    .utilsOptions {
      display: inline-block; float: right;
    }
  </style>
  <slot></slot>
  <div class="utilsOptions">
  </div>
`;
class au extends oe {
  constructor() {
    super(uo);
  }
  destroy() {}
  get icons() {
    return this.shadowRoot.querySelector("slot").assignedElements()[0].children;
  }
  defaultNode(e) {
    let s = `
    <div style="display: inline-block; float: right;">
    <style>
      svg {
        height: ${dt.ICONSIZE};
        fill: ${dt.COLOUR_ICON};
      }
    </style>
    `;
    for (const n of e) s += this.iconNode(n);
    return s + "</div>";
  }
  iconNode(e) {
    const i = `display: inline-block; height: ${dt.ICONSIZE}; padding-top: 2px`,
      s = "sub" in e ? 'data-menu="true"' : "";
    return `
      <div id="TX_${e.id}" data-event="${e.event}" ${s} class="icon-wrapper" style="${i}">${e.icon}</div>

    `;
  }
}
customElements.get("tradex-utils") || window.customElements.define("tradex-utils", au);
const mo = document.createElement("template");
mo.innerHTML = `
  <slot name="widget"></slot>
`;
class lu extends oe {
  constructor() {
    super(mo);
  }
  destroy() {}
}
customElements.get("tradex-widgets") || window.customElements.define("tradex-widgets", lu);
const hu = `
  <style title="core">
    :host {
      position: relative;
      z-index: 0;
    }
    tradex-utils {
      height: ${je}px; 
      width: 100%; 
    }
    tradex-body {
      position: relative;
      height: calc(100% - ${je}px); 
      min-height: ${st - je}px;
      width: 100%;
    }
    tradex-widgets {
      position: relative;
    }
  </style>
  <div style="display: none;">
    <slot></slot>
  </div>
  <tradex-utils></tradex-utils>
  <tradex-body></tradex-body>
  <tradex-widgets></tradex-widgets>
`;
class cu extends oe {
  #e;
  #t;
  #n;
  #r;
  #i = Si;
  #s = st;
  #l;
  #o;
  #c;
  #a;
  #h;
  #d;
  constructor() {
    const e = document.createElement("template");
    e.innerHTML = hu, super(e, "closed"), this.#r = e;
  }
  destroy() {
    this.resizeObserver.disconnect();
  }
  static get observedAttributes() {
    return ["config", "disabled", "height", "stream", "width"];
  }
  connectedCallback() {
    if (this.doInit) {
      this.doInit = !1, this.shadowRoot.appendChild(this.#r.content.cloneNode(!0)), this.style.display = "block", this.style.minHeight = Nr, this.elWidgetsG = this.shadowRoot.querySelector("tradex-widgets"), this.elUtils = this.shadowRoot.querySelector("tradex-utils"), this.elBody = this.shadowRoot.querySelector("tradex-body"), this.elMain = this.elBody.main, this.elTime = this.elBody.main.time, this.elTools = this.elBody.tools, this.elYAxis = this.elBody.scale;
      let e = this.getAttribute("height") || "100%",
        i = this.getAttribute("width") || "100%";
      this.setDimensions(i, e), this.resizeObserver = new ResizeObserver(ke(this.onResized, 100, this)), this.resizeObserver.observe(this);
    }
  }
  disconnectedCallback() {
    this.resizeObserver.disconnect(), this.removeEventListener("click", this.onClick);
  }
  attributeChangedCallback(e, i, s) {
    switch (e) {
      case "config":
        break;
      case "disabled":
        break;
      case "height":
        this.height(s);
        break;
      case "width":
        this.width(s);
        break;
    }
  }
  get id() {
    return this.getAttribute("id");
  }
  set id(e) {
    this.setAttribute("id", $e(e));
  }
  get disabled() {
    return this.hasAttribute("disabled");
  }
  set disabled(e) {
    e ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
  }
  get stream() {}
  set stream(e) {}
  get body() {
    return this.#e;
  }
  get utils() {
    return this.#t;
  }
  get widgets() {
    return this.#n;
  }
  get width() {
    return this.#i;
  }
  get height() {
    return this.#s;
  }
  get resizeEntries() {
    return this.#d;
  }
  elStart(e) {
    this.#h = e, this.setUtilsLocation();
  }
  onResized(e) {
    const {
      width: i,
      height: s
    } = e[0].contentRect;
    this.#i = i, this.#s = s, this.#d = e[0], this.log(`onResize w: ${i}, h: ${s}`), this.emit("global_resize", {
      w: i,
      h: s
    }), this.MainPane instanceof Qr, this.ToolsBar instanceof eo && this.ToolsBar.onResized();
  }
  setWidth(e) {
    T(e) ? (this.#i = e, e += "px") : E(e) || (this.#i = this.parentElement.getBoundingClientRect().width, e = this.#i + "px"), this.style.width = e;
  }
  setHeight(e) {
    T(e) ? (this.#s = e, e += "px") : E(e) || (this.#s = this.parentElement.getBoundingClientRect().height, w = this.#s + "px"), this.style.height = e;
  }
  setWidthMin(e) {
    this.style.minWidth = `var(--txc-min-width, ${e})`;
  }
  setHeightMin(e) {
    this.style.minHeight = `var(--txc-min-height, ${w})`;
  }
  setWidthMax(e) {
    this.style.minWidth = `var(--txc-max-width, ${e})`;
  }
  setHeightMax(e) {
    this.style.minHeight = `var(--txc-max-height, ${w})`;
  }
  setDimensions(e, i) {
    let s,
      n = this.width,
      o = this.height;
    if (!e || !i) {
      const a = this.getBoundingClientRect(),
        l = this.parentElement.getBoundingClientRect();
      i = a.height ? a.height : l.height ? l.height : st, e = a.width ? a.width : l.width ? l.width : Si;
    }
    return s = {
      width: this.width,
      height: this.height,
      resizeW: e / n,
      resizeH: i / o,
      resizeWDiff: e - n,
      resizeHDiff: i - o
    }, this.setWidth(e), this.setHeight(i), s;
  }
  setUtilsLocation(e = this.#h?.utils?.location) {
    switch (this.#h.utils = this.#h.utils || {}, e) {
      case "none":
      case !1:
        this.#h.utils.location = "none", this.#h.utils.height = 0, this.elUtils.style.display = "none", this.elUtils.style.height = "0px", this.elBody.style.height = "100%", this.elBody.style.minHeight = `${st}px`;
        break;
      case "top":
      default:
        this.#h.utils.location = "top", this.#h.utils.height = je, this.elUtils.style.display = "block", this.elUtils.style.height = `${je}px`, this.elBody.style.height = `calc(100% - ${je}px)`, this.elBody.style.minHeight = `${st - je}px`;
    }
  }
}
const uu = [{
    id: "indicators",
    name: "Indicators",
    icon: Xl,
    event: "utils_indicators",
    sub: []
  }, {
    id: "timezone",
    name: "Timezone",
    icon: Kl,
    event: "utils_timezone"
  }, {
    id: "screenshot",
    name: "Screenshot",
    icon: ql,
    event: "utils_screenshot"
  }, {
    id: "settings",
    name: "Settings",
    icon: Lr,
    event: "utils_settings"
  }],
  du = {
    name: "ACCBANDS",
    camelCaseName: "accBands",
    group: "Overlap Studies",
    description: "Acceleration Bands",
    inputs: [{
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 20,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "upperBand",
      type: "number",
      plot: "limit_upper"
    }, {
      name: "middleBand",
      type: "number",
      plot: "line"
    }, {
      name: "lowerBand",
      type: "number",
      plot: "limit_lower"
    }]
  },
  mu = {
    name: "ACOS",
    camelCaseName: "acos",
    group: "Math Transform",
    description: "Vector Trigonometric ACos",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  pu = {
    name: "AD",
    camelCaseName: "ad",
    group: "Volume Indicators",
    description: "Chaikin A/D Line",
    inputs: [{
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }, {
      name: "volume",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  gu = {
    name: "ADD",
    camelCaseName: "add",
    group: "Math Operators",
    description: "Vector Arithmetic Add",
    inputs: [{
      name: "inReal0",
      type: "number"
    }, {
      name: "inReal1",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  fu = {
    name: "ADOSC",
    camelCaseName: "adOsc",
    group: "Volume Indicators",
    description: "Chaikin A/D Oscillator",
    inputs: [{
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }, {
      name: "volume",
      type: "number"
    }],
    options: [{
      name: "fastPeriod",
      displayName: "Fast Period",
      defaultValue: 3,
      hint: "Number of period for the fast MA",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }, {
      name: "slowPeriod",
      displayName: "Slow Period",
      defaultValue: 10,
      hint: "Number of period for the slow MA",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  yu = {
    name: "ADX",
    camelCaseName: "adx",
    group: "Momentum Indicators",
    description: "Average Directional Movement Index",
    inputs: [{
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 14,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  vu = {
    name: "ADXR",
    camelCaseName: "adxr",
    group: "Momentum Indicators",
    description: "Average Directional Movement Index Rating",
    inputs: [{
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 14,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  wu = {
    name: "APO",
    camelCaseName: "apo",
    group: "Momentum Indicators",
    description: "Absolute Price Oscillator",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "fastPeriod",
      displayName: "Fast Period",
      defaultValue: 12,
      hint: "Number of period for the fast MA",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }, {
      name: "slowPeriod",
      displayName: "Slow Period",
      defaultValue: 26,
      hint: "Number of period for the slow MA",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }, {
      name: "MAType",
      displayName: "MA Type",
      defaultValue: 0,
      hint: "Type of Moving Average",
      type: "MAType"
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  po = {
    name: "AROON",
    camelCaseName: "aroon",
    group: "Momentum Indicators",
    description: "Aroon",
    inputs: [{
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 14,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "aroonDown",
      type: "number",
      plot: "line_dash"
    }, {
      name: "aroonUp",
      type: "number",
      plot: "line"
    }]
  },
  xu = {
    name: "AROONOSC",
    camelCaseName: "aroonOsc",
    group: "Momentum Indicators",
    description: "Aroon Oscillator",
    inputs: [{
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 14,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  bu = {
    name: "ASIN",
    camelCaseName: "asin",
    group: "Math Transform",
    description: "Vector Trigonometric ASin",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Cu = {
    name: "ATAN",
    camelCaseName: "atan",
    group: "Math Transform",
    description: "Vector Trigonometric ATan",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Tu = {
    name: "ATR",
    camelCaseName: "atr",
    group: "Volatility Indicators",
    description: "Average True Range",
    inputs: [{
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 14,
      hint: "Number of period",
      type: "number",
      range: {
        min: 1,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Eu = {
    name: "AVGDEV",
    camelCaseName: "avgDev",
    group: "Price Transform",
    description: "Average Deviation",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 14,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Su = {
    name: "AVGPRICE",
    camelCaseName: "avgPrice",
    group: "Price Transform",
    description: "Average Price",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  go = {
    name: "BBANDS",
    camelCaseName: "bbands",
    group: "Overlap Studies",
    description: "Bollinger Bands",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 5,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }, {
      name: "nbDevUp",
      displayName: "Deviations up",
      defaultValue: 2,
      hint: "Deviation multiplier for upper band",
      type: "number",
      range: {
        min: -3e37,
        max: 3e37
      }
    }, {
      name: "nbDevDn",
      displayName: "Deviations down",
      defaultValue: 2,
      hint: "Deviation multiplier for lower band",
      type: "number",
      range: {
        min: -3e37,
        max: 3e37
      }
    }, {
      name: "MAType",
      displayName: "MA Type",
      defaultValue: 0,
      hint: "Type of Moving Average",
      type: "MAType"
    }],
    outputs: [{
      name: "upperBand",
      type: "number",
      plot: "limit_upper"
    }, {
      name: "middleBand",
      type: "number",
      plot: "line"
    }, {
      name: "lowerBand",
      type: "number",
      plot: "limit_lower"
    }]
  },
  Pu = {
    name: "BETA",
    camelCaseName: "beta",
    group: "Statistic Functions",
    description: "Beta",
    inputs: [{
      name: "inReal0",
      type: "number"
    }, {
      name: "inReal1",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 5,
      hint: "Number of period",
      type: "number",
      range: {
        min: 1,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Mu = {
    name: "BOP",
    camelCaseName: "bop",
    group: "Momentum Indicators",
    description: "Balance Of Power",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Au = {
    name: "CCI",
    camelCaseName: "cci",
    group: "Momentum Indicators",
    description: "Commodity Channel Index",
    inputs: [{
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 14,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Lu = {
    name: "CDL2CROWS",
    camelCaseName: "cdl2Crows",
    group: "Pattern Recognition",
    description: "Two Crows",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Nu = {
    name: "CDL3BLACKCROWS",
    camelCaseName: "cdl3BlackCrows",
    group: "Pattern Recognition",
    description: "Three Black Crows",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Iu = {
    name: "CDL3INSIDE",
    camelCaseName: "cdl3Inside",
    group: "Pattern Recognition",
    description: "Three Inside Up/Down",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Du = {
    name: "CDL3LINESTRIKE",
    camelCaseName: "cdl3LineStrike",
    group: "Pattern Recognition",
    description: "Three-Line Strike ",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Ou = {
    name: "CDL3OUTSIDE",
    camelCaseName: "cdl3Outside",
    group: "Pattern Recognition",
    description: "Three Outside Up/Down",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Ru = {
    name: "CDL3STARSINSOUTH",
    camelCaseName: "cdl3StarsInSouth",
    group: "Pattern Recognition",
    description: "Three Stars In The South",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  ku = {
    name: "CDL3WHITESOLDIERS",
    camelCaseName: "cdl3WhiteSoldiers",
    group: "Pattern Recognition",
    description: "Three Advancing White Soldiers",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  _u = {
    name: "CDLABANDONEDBABY",
    camelCaseName: "cdlAbandonedBaby",
    group: "Pattern Recognition",
    description: "Abandoned Baby",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [{
      name: "penetration",
      displayName: "Penetration",
      defaultValue: 0.3,
      hint: "Percentage of penetration of a candle within another candle",
      type: "number",
      range: {
        min: 0,
        max: 3e37
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Hu = {
    name: "CDLADVANCEBLOCK",
    camelCaseName: "cdlAdvanceBlock",
    group: "Pattern Recognition",
    description: "Advance Block",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  $u = {
    name: "CDLBELTHOLD",
    camelCaseName: "cdlBeltHold",
    group: "Pattern Recognition",
    description: "Belt-hold",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Uu = {
    name: "CDLBREAKAWAY",
    camelCaseName: "cdlBreakaway",
    group: "Pattern Recognition",
    description: "Breakaway",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Bu = {
    name: "CDLCLOSINGMARUBOZU",
    camelCaseName: "cdlClosingMarubozu",
    group: "Pattern Recognition",
    description: "Closing Marubozu",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Vu = {
    name: "CDLCONCEALBABYSWALL",
    camelCaseName: "cdlConcealBabysWall",
    group: "Pattern Recognition",
    description: "Concealing Baby Swallow",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  zu = {
    name: "CDLCOUNTERATTACK",
    camelCaseName: "cdlCounterAttack",
    group: "Pattern Recognition",
    description: "Counterattack",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Wu = {
    name: "CDLDARKCLOUDCOVER",
    camelCaseName: "cdlDarkCloudCover",
    group: "Pattern Recognition",
    description: "Dark Cloud Cover",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [{
      name: "penetration",
      displayName: "Penetration",
      defaultValue: 0.5,
      hint: "Percentage of penetration of a candle within another candle",
      type: "number",
      range: {
        min: 0,
        max: 3e37
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Fu = {
    name: "CDLDOJI",
    camelCaseName: "cdlDoji",
    group: "Pattern Recognition",
    description: "Doji",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Gu = {
    name: "CDLDOJISTAR",
    camelCaseName: "cdlDojiStar",
    group: "Pattern Recognition",
    description: "Doji Star",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Yu = {
    name: "CDLDRAGONFLYDOJI",
    camelCaseName: "cdlDragonflyDoji",
    group: "Pattern Recognition",
    description: "Dragonfly Doji",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  qu = {
    name: "CDLENGULFING",
    camelCaseName: "cdlEngulfing",
    group: "Pattern Recognition",
    description: "Engulfing Pattern",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Xu = {
    name: "CDLEVENINGDOJISTAR",
    camelCaseName: "cdlEveningDojiStar",
    group: "Pattern Recognition",
    description: "Evening Doji Star",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [{
      name: "penetration",
      displayName: "Penetration",
      defaultValue: 0.3,
      hint: "Percentage of penetration of a candle within another candle",
      type: "number",
      range: {
        min: 0,
        max: 3e37
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Ku = {
    name: "CDLEVENINGSTAR",
    camelCaseName: "cdlEveningStar",
    group: "Pattern Recognition",
    description: "Evening Star",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [{
      name: "penetration",
      displayName: "Penetration",
      defaultValue: 0.3,
      hint: "Percentage of penetration of a candle within another candle",
      type: "number",
      range: {
        min: 0,
        max: 3e37
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  ju = {
    name: "CDLGAPSIDESIDEWHITE",
    camelCaseName: "cdlGapSideSideWhite",
    group: "Pattern Recognition",
    description: "Up/Down-gap side-by-side white lines",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Zu = {
    name: "CDLGRAVESTONEDOJI",
    camelCaseName: "cdlGravestoneDoji",
    group: "Pattern Recognition",
    description: "Gravestone Doji",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Ju = {
    name: "CDLHAMMER",
    camelCaseName: "cdlHammer",
    group: "Pattern Recognition",
    description: "Hammer",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Qu = {
    name: "CDLHANGINGMAN",
    camelCaseName: "cdlHangingMan",
    group: "Pattern Recognition",
    description: "Hanging Man",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  ed = {
    name: "CDLHARAMI",
    camelCaseName: "cdlHarami",
    group: "Pattern Recognition",
    description: "Harami Pattern",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  td = {
    name: "CDLHARAMICROSS",
    camelCaseName: "cdlHaramiCross",
    group: "Pattern Recognition",
    description: "Harami Cross Pattern",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  sd = {
    name: "CDLHIGHWAVE",
    camelCaseName: "cdlHignWave",
    group: "Pattern Recognition",
    description: "High-Wave Candle",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  nd = {
    name: "CDLHIKKAKE",
    camelCaseName: "cdlHikkake",
    group: "Pattern Recognition",
    description: "Hikkake Pattern",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  rd = {
    name: "CDLHIKKAKEMOD",
    camelCaseName: "cdlHikkakeMod",
    group: "Pattern Recognition",
    description: "Modified Hikkake Pattern",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  od = {
    name: "CDLHOMINGPIGEON",
    camelCaseName: "cdlHomingPigeon",
    group: "Pattern Recognition",
    description: "Homing Pigeon",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  ad = {
    name: "CDLIDENTICAL3CROWS",
    camelCaseName: "cdlIdentical3Crows",
    group: "Pattern Recognition",
    description: "Identical Three Crows",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  ld = {
    name: "CDLINNECK",
    camelCaseName: "cdlInNeck",
    group: "Pattern Recognition",
    description: "In-Neck Pattern",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  hd = {
    name: "CDLINVERTEDHAMMER",
    camelCaseName: "cdlInvertedHammer",
    group: "Pattern Recognition",
    description: "Inverted Hammer",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  cd = {
    name: "CDLKICKING",
    camelCaseName: "cdlKicking",
    group: "Pattern Recognition",
    description: "Kicking",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  ud = {
    name: "CDLKICKINGBYLENGTH",
    camelCaseName: "cdlKickingByLength",
    group: "Pattern Recognition",
    description: "Kicking - bull/bear determined by the longer marubozu",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  dd = {
    name: "CDLLADDERBOTTOM",
    camelCaseName: "cdlLadderBottom",
    group: "Pattern Recognition",
    description: "Ladder Bottom",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  md = {
    name: "CDLLONGLEGGEDDOJI",
    camelCaseName: "cdlLongLeggedDoji",
    group: "Pattern Recognition",
    description: "Long Legged Doji",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  pd = {
    name: "CDLLONGLINE",
    camelCaseName: "cdlLongLine",
    group: "Pattern Recognition",
    description: "Long Line Candle",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  gd = {
    name: "CDLMARUBOZU",
    camelCaseName: "cdlMarubozu",
    group: "Pattern Recognition",
    description: "Marubozu",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  fd = {
    name: "CDLMATCHINGLOW",
    camelCaseName: "cdlMatchingLow",
    group: "Pattern Recognition",
    description: "Matching Low",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  yd = {
    name: "CDLMATHOLD",
    camelCaseName: "cdlMatHold",
    group: "Pattern Recognition",
    description: "Mat Hold",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [{
      name: "penetration",
      displayName: "Penetration",
      defaultValue: 0.5,
      hint: "Percentage of penetration of a candle within another candle",
      type: "number",
      range: {
        min: 0,
        max: 3e37
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  vd = {
    name: "CDLMORNINGDOJISTAR",
    camelCaseName: "cdlMorningDojiStar",
    group: "Pattern Recognition",
    description: "Morning Doji Star",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [{
      name: "penetration",
      displayName: "Penetration",
      defaultValue: 0.3,
      hint: "Percentage of penetration of a candle within another candle",
      type: "number",
      range: {
        min: 0,
        max: 3e37
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  wd = {
    name: "CDLMORNINGSTAR",
    camelCaseName: "cdlMorningStar",
    group: "Pattern Recognition",
    description: "Morning Star",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [{
      name: "penetration",
      displayName: "Penetration",
      defaultValue: 0.3,
      hint: "Percentage of penetration of a candle within another candle",
      type: "number",
      range: {
        min: 0,
        max: 3e37
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  xd = {
    name: "CDLONNECK",
    camelCaseName: "cdlOnNeck",
    group: "Pattern Recognition",
    description: "On-Neck Pattern",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  bd = {
    name: "CDLPIERCING",
    camelCaseName: "cdlPiercing",
    group: "Pattern Recognition",
    description: "Piercing Pattern",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Cd = {
    name: "CDLRICKSHAWMAN",
    camelCaseName: "cdlRickshawMan",
    group: "Pattern Recognition",
    description: "Rickshaw Man",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Td = {
    name: "CDLRISEFALL3METHODS",
    camelCaseName: "cdlRiseFall3Methods",
    group: "Pattern Recognition",
    description: "Rising/Falling Three Methods",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Ed = {
    name: "CDLSEPARATINGLINES",
    camelCaseName: "cdlSeperatingLines",
    group: "Pattern Recognition",
    description: "Separating Lines",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Sd = {
    name: "CDLSHOOTINGSTAR",
    camelCaseName: "cdlShootingStar",
    group: "Pattern Recognition",
    description: "Shooting Star",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Pd = {
    name: "CDLSHORTLINE",
    camelCaseName: "cdlShortLine",
    group: "Pattern Recognition",
    description: "Short Line Candle",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Md = {
    name: "CDLSPINNINGTOP",
    camelCaseName: "cdlSpinningTop",
    group: "Pattern Recognition",
    description: "Spinning Top",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Ad = {
    name: "CDLSTALLEDPATTERN",
    camelCaseName: "cdlStalledPattern",
    group: "Pattern Recognition",
    description: "Stalled Pattern",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Ld = {
    name: "CDLSTICKSANDWICH",
    camelCaseName: "cdlStickSandwhich",
    group: "Pattern Recognition",
    description: "Stick Sandwich",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Nd = {
    name: "CDLTAKURI",
    camelCaseName: "cdlTakuri",
    group: "Pattern Recognition",
    description: "Takuri (Dragonfly Doji with very long lower shadow)",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Id = {
    name: "CDLTASUKIGAP",
    camelCaseName: "cdlTasukiGap",
    group: "Pattern Recognition",
    description: "Tasuki Gap",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Dd = {
    name: "CDLTHRUSTING",
    camelCaseName: "cdlThrusting",
    group: "Pattern Recognition",
    description: "Thrusting Pattern",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Od = {
    name: "CDLTRISTAR",
    camelCaseName: "cdlTristar",
    group: "Pattern Recognition",
    description: "Tristar Pattern",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Rd = {
    name: "CDLUNIQUE3RIVER",
    camelCaseName: "cdlUnique3River",
    group: "Pattern Recognition",
    description: "Unique 3 River",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  kd = {
    name: "CDLUPSIDEGAP2CROWS",
    camelCaseName: "cdlUpsideGap2Crows",
    group: "Pattern Recognition",
    description: "Upside Gap Two Crows",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  _d = {
    name: "CDLXSIDEGAP3METHODS",
    camelCaseName: "cdlXSideGap3Methods",
    group: "Pattern Recognition",
    description: "Upside/Downside Gap Three Methods",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Hd = {
    name: "CEIL",
    camelCaseName: "ceil",
    group: "Math Transform",
    description: "Vector Ceil",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  $d = {
    name: "CMO",
    camelCaseName: "cmo",
    group: "Momentum Indicators",
    description: "Chande Momentum Oscillator",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 14,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Ud = {
    name: "CORREL",
    camelCaseName: "correl",
    group: "Statistic Functions",
    description: "Pearson's Correlation Coefficient (r)",
    inputs: [{
      name: "inReal0",
      type: "number"
    }, {
      name: "inReal1",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 30,
      hint: "Number of period",
      type: "number",
      range: {
        min: 1,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Bd = {
    name: "COS",
    camelCaseName: "cos",
    group: "Math Transform",
    description: "Vector Trigonometric Cos",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Vd = {
    name: "COSH",
    camelCaseName: "cosh",
    group: "Math Transform",
    description: "Vector Trigonometric Cosh",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  zd = {
    name: "DEMA",
    camelCaseName: "dema",
    group: "Overlap Studies",
    description: "number Exponential Moving Average",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 30,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Wd = {
    name: "DIV",
    camelCaseName: "div",
    group: "Math Operators",
    description: "Vector Arithmetic Div",
    inputs: [{
      name: "inReal0",
      type: "number"
    }, {
      name: "inReal1",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Fd = {
    name: "DX",
    camelCaseName: "dx",
    group: "Momentum Indicators",
    description: "Directional Movement Index",
    inputs: [{
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 14,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  fo = {
    name: "EMA",
    camelCaseName: "ema",
    group: "Overlap Studies",
    description: "Exponential Moving Average",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 30,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Gd = {
    name: "EXP",
    camelCaseName: "exp",
    group: "Math Transform",
    description: "Vector Arithmetic Exp",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Yd = {
    name: "FLOOR",
    camelCaseName: "floor",
    group: "Math Transform",
    description: "Vector Floor",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  qd = {
    name: "HT_DCPERIOD",
    camelCaseName: "htDcPeriod",
    group: "Cycle Indicators",
    description: "Hilbert Transform - Dominant Cycle Period",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Xd = {
    name: "HT_DCPHASE",
    camelCaseName: "htDcPhase",
    group: "Cycle Indicators",
    description: "Hilbert Transform - Dominant Cycle Phase",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Kd = {
    name: "HT_PHASOR",
    camelCaseName: "htPhasor",
    group: "Cycle Indicators",
    description: "Hilbert Transform - Phasor Components",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "inPhase",
      type: "number",
      plot: "line"
    }, {
      name: "quadrature",
      type: "number",
      plot: "line_dash"
    }]
  },
  jd = {
    name: "HT_SINE",
    camelCaseName: "htSine",
    group: "Cycle Indicators",
    description: "Hilbert Transform - SineWave",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "sine",
      type: "number",
      plot: "line"
    }, {
      name: "leadSine",
      type: "number",
      plot: "line_dash"
    }]
  },
  Zd = {
    name: "HT_TRENDLINE",
    camelCaseName: "htTrendline",
    group: "Overlap Studies",
    description: "Hilbert Transform - Instantaneous Trendline",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Jd = {
    name: "HT_TRENDMODE",
    camelCaseName: "htTrendMode",
    group: "Cycle Indicators",
    description: "Hilbert Transform - Trend vs Cycle Mode",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Qd = {
    name: "IMI",
    camelCaseName: "imi",
    group: "Momentum Indicators",
    description: "Intraday Momentum Index",
    inputs: [{
      name: "open",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 14,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  e0 = {
    name: "KAMA",
    camelCaseName: "kama",
    group: "Overlap Studies",
    description: "Kaufman Adaptive Moving Average",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 30,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  t0 = {
    name: "LINEARREG",
    camelCaseName: "linearReg",
    group: "Statistic Functions",
    description: "Linear Regression",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 14,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  i0 = {
    name: "LINEARREG_ANGLE",
    camelCaseName: "linearRegAngle",
    group: "Statistic Functions",
    description: "Linear Regression Angle",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 14,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  s0 = {
    name: "LINEARREG_INTERCEPT",
    camelCaseName: "linearRegIntercept",
    group: "Statistic Functions",
    description: "Linear Regression Intercept",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 14,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  n0 = {
    name: "LINEARREG_SLOPE",
    camelCaseName: "linearRegSlope",
    group: "Statistic Functions",
    description: "Linear Regression Slope",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 14,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  r0 = {
    name: "LN",
    camelCaseName: "ln",
    group: "Math Transform",
    description: "Vector Log Natural",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  o0 = {
    name: "LOG10",
    camelCaseName: "log10",
    group: "Math Transform",
    description: "Vector Log10",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  a0 = {
    name: "MA",
    camelCaseName: "movingAverage",
    group: "Overlap Studies",
    description: "Moving average",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 30,
      hint: "Number of period",
      type: "number",
      range: {
        min: 1,
        max: 1e5
      }
    }, {
      name: "MAType",
      displayName: "MA Type",
      defaultValue: 0,
      hint: "Type of Moving Average",
      type: "MAType"
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  l0 = {
    name: "MACD",
    camelCaseName: "macd",
    group: "Momentum Indicators",
    description: "Moving Average Convergence/Divergence",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "fastPeriod",
      displayName: "Fast Period",
      defaultValue: 12,
      hint: "Number of period for the fast MA",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }, {
      name: "slowPeriod",
      displayName: "Slow Period",
      defaultValue: 26,
      hint: "Number of period for the slow MA",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }, {
      name: "signalPeriod",
      displayName: "Signal Period",
      defaultValue: 9,
      hint: "Smoothing for the signal line (nb of period)",
      type: "number",
      range: {
        min: 1,
        max: 1e5
      }
    }],
    outputs: [{
      name: "MACD",
      type: "number",
      plot: "line"
    }, {
      name: "MACDSignal",
      type: "number",
      plot: "line_dash"
    }, {
      name: "MACDHist",
      type: "number",
      plot: "histogram"
    }]
  },
  h0 = {
    name: "MACDEXT",
    camelCaseName: "macdExt",
    group: "Momentum Indicators",
    description: "MACD with controllable MA type",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "fastPeriod",
      displayName: "Fast Period",
      defaultValue: 12,
      hint: "Number of period for the fast MA",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }, {
      name: "fastMAType",
      displayName: "Fast MA",
      defaultValue: 0,
      hint: "Type of Moving Average for fast MA",
      type: "MAType"
    }, {
      name: "slowPeriod",
      displayName: "Slow Period",
      defaultValue: 26,
      hint: "Number of period for the slow MA",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }, {
      name: "slowMAType",
      displayName: "Slow MA",
      defaultValue: 0,
      hint: "Type of Moving Average for slow MA",
      type: "MAType"
    }, {
      name: "signalPeriod",
      displayName: "Signal Period",
      defaultValue: 9,
      hint: "Smoothing for the signal line (nb of period)",
      type: "number",
      range: {
        min: 1,
        max: 1e5
      }
    }, {
      name: "signalMAType",
      displayName: "Signal MA",
      defaultValue: 0,
      hint: "Type of Moving Average for signal line",
      type: "MAType"
    }],
    outputs: [{
      name: "MACD",
      type: "number",
      plot: "line"
    }, {
      name: "MACDSignal",
      type: "number",
      plot: "line_dash"
    }, {
      name: "MACDHist",
      type: "number",
      plot: "histogram"
    }]
  },
  c0 = {
    name: "MACDFIX",
    camelCaseName: "macdFix",
    group: "Momentum Indicators",
    description: "Moving Average Convergence/Divergence Fix 12/26",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "signalPeriod",
      displayName: "Signal Period",
      defaultValue: 9,
      hint: "Smoothing for the signal line (nb of period)",
      type: "number",
      range: {
        min: 1,
        max: 1e5
      }
    }],
    outputs: [{
      name: "MACD",
      type: "number",
      plot: "line"
    }, {
      name: "MACDSignal",
      type: "number",
      plot: "line_dash"
    }, {
      name: "MACDHist",
      type: "number",
      plot: "histogram"
    }]
  },
  u0 = {
    name: "MAMA",
    camelCaseName: "mama",
    group: "Overlap Studies",
    description: "MESA Adaptive Moving Average",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "fastLimit",
      displayName: "Fast Limit",
      defaultValue: 0.5,
      hint: "Upper limit use in the adaptive algorithm",
      type: "number",
      range: {
        min: 0.01,
        max: 0.99
      }
    }, {
      name: "slowLimit",
      displayName: "Slow Limit",
      defaultValue: 0.05,
      hint: "Lower limit use in the adaptive algorithm",
      type: "number",
      range: {
        min: 0.01,
        max: 0.99
      }
    }],
    outputs: [{
      name: "MAMA",
      type: "number",
      plot: "line"
    }, {
      name: "FAMA",
      type: "number",
      plot: "line_dash"
    }]
  },
  d0 = {
    name: "MAVP",
    camelCaseName: "movingAverageVariablePeriod",
    group: "Overlap Studies",
    description: "Moving average with variable period",
    inputs: [{
      name: "inReal",
      type: "number"
    }, {
      name: "inPeriods",
      type: "number"
    }],
    options: [{
      name: "minPeriod",
      displayName: "Minimum Period",
      defaultValue: 2,
      hint: "Value less than minimum will be changed to Minimum period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }, {
      name: "maxPeriod",
      displayName: "Maximum Period",
      defaultValue: 30,
      hint: "Value higher than maximum will be changed to Maximum period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }, {
      name: "MAType",
      displayName: "MA Type",
      defaultValue: 0,
      hint: "Type of Moving Average",
      type: "MAType"
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  m0 = {
    name: "MAX",
    camelCaseName: "max",
    group: "Math Operators",
    description: "Highest value over a specified period",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 30,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  p0 = {
    name: "MAXINDEX",
    camelCaseName: "maxIndex",
    group: "Math Operators",
    description: "Index of highest value over a specified period",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 30,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  g0 = {
    name: "MEDPRICE",
    camelCaseName: "medPrice",
    group: "Price Transform",
    description: "Median Price",
    inputs: [{
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  f0 = {
    name: "MFI",
    camelCaseName: "mfi",
    group: "Momentum Indicators",
    description: "Money Flow Index",
    inputs: [{
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }, {
      name: "volume",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 14,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  y0 = {
    name: "MIDPOINT",
    camelCaseName: "midPoint",
    group: "Overlap Studies",
    description: "MidPoint over period",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 14,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  v0 = {
    name: "MIDPRICE",
    camelCaseName: "midPrice",
    group: "Overlap Studies",
    description: "Midpoint Price over period",
    inputs: [{
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 14,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  w0 = {
    name: "MIN",
    camelCaseName: "min",
    group: "Math Operators",
    description: "Lowest value over a specified period",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 30,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  x0 = {
    name: "MININDEX",
    camelCaseName: "minIndex",
    group: "Math Operators",
    description: "Index of lowest value over a specified period",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 30,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  b0 = {
    name: "MINMAX",
    camelCaseName: "minMax",
    group: "Math Operators",
    description: "Lowest and highest values over a specified period",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 30,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "min",
      type: "number",
      plot: "line"
    }, {
      name: "max",
      type: "number",
      plot: "line"
    }]
  },
  C0 = {
    name: "MINMAXINDEX",
    camelCaseName: "minMaxIndex",
    group: "Math Operators",
    description: "Indexes of lowest and highest values over a specified period",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 30,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "minIdx",
      type: "number",
      plot: "line"
    }, {
      name: "maxIdx",
      type: "number",
      plot: "line"
    }]
  },
  T0 = {
    name: "MINUS_DI",
    camelCaseName: "minusDI",
    group: "Momentum Indicators",
    description: "Minus Directional Indicator",
    inputs: [{
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 14,
      hint: "Number of period",
      type: "number",
      range: {
        min: 1,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  E0 = {
    name: "MINUS_DM",
    camelCaseName: "minusDM",
    group: "Momentum Indicators",
    description: "Minus Directional Movement",
    inputs: [{
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 14,
      hint: "Number of period",
      type: "number",
      range: {
        min: 1,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  S0 = {
    name: "MOM",
    camelCaseName: "mom",
    group: "Momentum Indicators",
    description: "Momentum",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 10,
      hint: "Number of period",
      type: "number",
      range: {
        min: 1,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  P0 = {
    name: "MULT",
    camelCaseName: "mult",
    group: "Math Operators",
    description: "Vector Arithmetic Mult",
    inputs: [{
      name: "inReal0",
      type: "number"
    }, {
      name: "inReal1",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  M0 = {
    name: "NATR",
    camelCaseName: "natr",
    group: "Volatility Indicators",
    description: "Normalized Average True Range",
    inputs: [{
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 14,
      hint: "Number of period",
      type: "number",
      range: {
        min: 1,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  A0 = {
    name: "OBV",
    camelCaseName: "obv",
    group: "Volume Indicators",
    description: "On Balance Volume",
    inputs: [{
      name: "inReal",
      type: "number"
    }, {
      name: "volume",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  L0 = {
    name: "PLUS_DI",
    camelCaseName: "plusDI",
    group: "Momentum Indicators",
    description: "Plus Directional Indicator",
    inputs: [{
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 14,
      hint: "Number of period",
      type: "number",
      range: {
        min: 1,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  N0 = {
    name: "PLUS_DM",
    camelCaseName: "plusDM",
    group: "Momentum Indicators",
    description: "Plus Directional Movement",
    inputs: [{
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 14,
      hint: "Number of period",
      type: "number",
      range: {
        min: 1,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  I0 = {
    name: "PPO",
    camelCaseName: "ppo",
    group: "Momentum Indicators",
    description: "Percentage Price Oscillator",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "fastPeriod",
      displayName: "Fast Period",
      defaultValue: 12,
      hint: "Number of period for the fast MA",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }, {
      name: "slowPeriod",
      displayName: "Slow Period",
      defaultValue: 26,
      hint: "Number of period for the slow MA",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }, {
      name: "MAType",
      displayName: "MA Type",
      defaultValue: 0,
      hint: "Type of Moving Average",
      type: "MAType"
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  D0 = {
    name: "ROC",
    camelCaseName: "roc",
    group: "Momentum Indicators",
    description: "Rate of change : ((price/prevPrice)-1)*100",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 10,
      hint: "Number of period",
      type: "number",
      range: {
        min: 1,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  O0 = {
    name: "ROCP",
    camelCaseName: "rocP",
    group: "Momentum Indicators",
    description: "Rate of change Percentage: (price-prevPrice)/prevPrice",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 10,
      hint: "Number of period",
      type: "number",
      range: {
        min: 1,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  R0 = {
    name: "ROCR",
    camelCaseName: "rocR",
    group: "Momentum Indicators",
    description: "Rate of change ratio: (price/prevPrice)",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 10,
      hint: "Number of period",
      type: "number",
      range: {
        min: 1,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  k0 = {
    name: "ROCR100",
    camelCaseName: "rocR100",
    group: "Momentum Indicators",
    description: "Rate of change ratio 100 scale: (price/prevPrice)*100",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 10,
      hint: "Number of period",
      type: "number",
      range: {
        min: 1,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  yo = {
    name: "RSI",
    camelCaseName: "rsi",
    group: "Momentum Indicators",
    description: "Relative Strength Index",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 14,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  _0 = {
    name: "SAR",
    camelCaseName: "sar",
    group: "Overlap Studies",
    description: "Parabolic SAR",
    inputs: [{
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }],
    options: [{
      name: "acceleration",
      displayName: "Acceleration Factor",
      defaultValue: 0.02,
      hint: "Acceleration Factor used up to the Maximum value",
      type: "number",
      range: {
        min: 0,
        max: 3e37
      }
    }, {
      name: "maximum",
      displayName: "AF Maximum",
      defaultValue: 0.2,
      hint: "Acceleration Factor Maximum value",
      type: "number",
      range: {
        min: 0,
        max: 3e37
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  H0 = {
    name: "SAREXT",
    camelCaseName: "sarExt",
    group: "Overlap Studies",
    description: "Parabolic SAR - Extended",
    inputs: [{
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }],
    options: [{
      name: "startValue",
      displayName: "Start Value",
      defaultValue: 0,
      hint: "Start value and direction. 0 for Auto, >0 for Long, <0 for Short",
      type: "number",
      range: {
        min: -3e37,
        max: 3e37
      }
    }, {
      name: "offsetOnReverse",
      displayName: "Offset on Reverse",
      defaultValue: 0,
      hint: "Percent offset added/removed to initial stop on short/long reversal",
      type: "number",
      range: {
        min: 0,
        max: 3e37
      }
    }, {
      name: "accelerationInitLong",
      displayName: "AF Init Long",
      defaultValue: 0.02,
      hint: "Acceleration Factor initial value for the Long direction",
      type: "number",
      range: {
        min: 0,
        max: 3e37
      }
    }, {
      name: "accelerationLong",
      displayName: "AF Long",
      defaultValue: 0.02,
      hint: "Acceleration Factor for the Long direction",
      type: "number",
      range: {
        min: 0,
        max: 3e37
      }
    }, {
      name: "accelerationMaxLong",
      displayName: "AF Max Long",
      defaultValue: 0.2,
      hint: "Acceleration Factor maximum value for the Long direction",
      type: "number",
      range: {
        min: 0,
        max: 3e37
      }
    }, {
      name: "accelerationInitShort",
      displayName: "AF Init Short",
      defaultValue: 0.02,
      hint: "Acceleration Factor initial value for the Short direction",
      type: "number",
      range: {
        min: 0,
        max: 3e37
      }
    }, {
      name: "accelerationShort",
      displayName: "AF Short",
      defaultValue: 0.02,
      hint: "Acceleration Factor for the Short direction",
      type: "number",
      range: {
        min: 0,
        max: 3e37
      }
    }, {
      name: "accelerationMaxShort",
      displayName: "AF Max Short",
      defaultValue: 0.2,
      hint: "Acceleration Factor maximum value for the Short direction",
      type: "number",
      range: {
        min: 0,
        max: 3e37
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  $0 = {
    name: "SIN",
    camelCaseName: "sin",
    group: "Math Transform",
    description: "Vector Trigonometric Sin",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  U0 = {
    name: "SINH",
    camelCaseName: "sinh",
    group: "Math Transform",
    description: "Vector Trigonometric Sinh",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  vo = {
    name: "SMA",
    camelCaseName: "sma",
    group: "Overlap Studies",
    description: "Simple Moving Average",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 30,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  B0 = {
    name: "SQRT",
    camelCaseName: "sqrt",
    group: "Math Transform",
    description: "Vector Square Root",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  V0 = {
    name: "STDDEV",
    camelCaseName: "stdDev",
    group: "Statistic Functions",
    description: "Standard Deviation",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 5,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }, {
      name: "nbDev",
      displayName: "Deviations",
      defaultValue: 1,
      hint: "Nb of deviations",
      type: "number",
      range: {
        min: -3e37,
        max: 3e37
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  wo = {
    name: "STOCH",
    camelCaseName: "stoch",
    group: "Momentum Indicators",
    description: "Stochastic",
    inputs: [{
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [{
      name: "fastK_Period",
      displayName: "Fast-K Period",
      defaultValue: 5,
      hint: "Time period for building the Fast-K line",
      type: "number",
      range: {
        min: 1,
        max: 1e5
      }
    }, {
      name: "slowK_Period",
      displayName: "Slow-K Period",
      defaultValue: 3,
      hint: "Smoothing for making the Slow-K line. Usually set to 3",
      type: "number",
      range: {
        min: 1,
        max: 1e5
      }
    }, {
      name: "slowK_MAType",
      displayName: "Slow-K MA",
      defaultValue: 0,
      hint: "Type of Moving Average for Slow-K",
      type: "MAType"
    }, {
      name: "slowD_Period",
      displayName: "Slow-D Period",
      defaultValue: 3,
      hint: "Smoothing for making the Slow-D line",
      type: "number",
      range: {
        min: 1,
        max: 1e5
      }
    }, {
      name: "slowD_MAType",
      displayName: "Slow-D MA",
      defaultValue: 0,
      hint: "Type of Moving Average for Slow-D",
      type: "MAType"
    }],
    outputs: [{
      name: "slowK",
      type: "number",
      plot: "line_dash"
    }, {
      name: "slowD",
      type: "number",
      plot: "line_dash"
    }]
  },
  z0 = {
    name: "STOCHF",
    camelCaseName: "stochF",
    group: "Momentum Indicators",
    description: "Stochastic Fast",
    inputs: [{
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [{
      name: "fastK_Period",
      displayName: "Fast-K Period",
      defaultValue: 5,
      hint: "Time period for building the Fast-K line",
      type: "number",
      range: {
        min: 1,
        max: 1e5
      }
    }, {
      name: "fastD_Period",
      displayName: "Fast-D Period",
      defaultValue: 3,
      hint: "Smoothing for making the Fast-D line. Usually set to 3",
      type: "number",
      range: {
        min: 1,
        max: 1e5
      }
    }, {
      name: "fastD_MAType",
      displayName: "Fast-D MA",
      defaultValue: 0,
      hint: "Type of Moving Average for Fast-D",
      type: "MAType"
    }],
    outputs: [{
      name: "fastK",
      type: "number",
      plot: "line"
    }, {
      name: "fastD",
      type: "number",
      plot: "line"
    }]
  },
  W0 = {
    name: "STOCHRSI",
    camelCaseName: "stochRsi",
    group: "Momentum Indicators",
    description: "Stochastic Relative Strength Index",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 14,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }, {
      name: "fastK_Period",
      displayName: "Fast-K Period",
      defaultValue: 5,
      hint: "Time period for building the Fast-K line",
      type: "number",
      range: {
        min: 1,
        max: 1e5
      }
    }, {
      name: "fastD_Period",
      displayName: "Fast-D Period",
      defaultValue: 3,
      hint: "Smoothing for making the Fast-D line. Usually set to 3",
      type: "number",
      range: {
        min: 1,
        max: 1e5
      }
    }, {
      name: "fastD_MAType",
      displayName: "Fast-D MA",
      defaultValue: 0,
      hint: "Type of Moving Average for Fast-D",
      type: "MAType"
    }],
    outputs: [{
      name: "fastK",
      type: "number",
      plot: "line"
    }, {
      name: "fastD",
      type: "number",
      plot: "line"
    }]
  },
  F0 = {
    name: "SUB",
    camelCaseName: "sub",
    group: "Math Operators",
    description: "Vector Arithmetic Substraction",
    inputs: [{
      name: "inReal0",
      type: "number"
    }, {
      name: "inReal1",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  G0 = {
    name: "SUM",
    camelCaseName: "sum",
    group: "Math Operators",
    description: "Summation",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 30,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Y0 = {
    name: "T3",
    camelCaseName: "t3",
    group: "Overlap Studies",
    description: "Triple Exponential Moving Average (T3)",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 5,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }, {
      name: "VFactor",
      displayName: "Volume Factor",
      defaultValue: 0.7,
      hint: "Volume Factor",
      type: "number",
      range: {
        min: 0,
        max: 1
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  q0 = {
    name: "TAN",
    camelCaseName: "tan",
    group: "Math Transform",
    description: "Vector Trigonometric Tan",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  X0 = {
    name: "TANH",
    camelCaseName: "tanh",
    group: "Math Transform",
    description: "Vector Trigonometric Tanh",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  K0 = {
    name: "TEMA",
    camelCaseName: "tema",
    group: "Overlap Studies",
    description: "Triple Exponential Moving Average",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 30,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  j0 = {
    name: "TRANGE",
    camelCaseName: "trueRange",
    group: "Volatility Indicators",
    description: "True Range",
    inputs: [{
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Z0 = {
    name: "TRIMA",
    camelCaseName: "trima",
    group: "Overlap Studies",
    description: "Triangular Moving Average",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 30,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  J0 = {
    name: "TRIX",
    camelCaseName: "trix",
    group: "Momentum Indicators",
    description: "1-day Rate-Of-Change (ROC) of a Triple Smooth EMA",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 30,
      hint: "Number of period",
      type: "number",
      range: {
        min: 1,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  Q0 = {
    name: "TSF",
    camelCaseName: "tsf",
    group: "Statistic Functions",
    description: "Time Series Forecast",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 14,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  em = {
    name: "TYPPRICE",
    camelCaseName: "typPrice",
    group: "Price Transform",
    description: "Typical Price",
    inputs: [{
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  tm = {
    name: "ULTOSC",
    camelCaseName: "ultOsc",
    group: "Momentum Indicators",
    description: "Ultimate Oscillator",
    inputs: [{
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [{
      name: "timePeriod1",
      displayName: "First Period",
      defaultValue: 7,
      hint: "Number of bars for 1st period.",
      type: "number",
      range: {
        min: 1,
        max: 1e5
      }
    }, {
      name: "timePeriod2",
      displayName: "Second Period",
      defaultValue: 14,
      hint: "Number of bars fro 2nd period",
      type: "number",
      range: {
        min: 1,
        max: 1e5
      }
    }, {
      name: "timePeriod3",
      displayName: "Third Period",
      defaultValue: 28,
      hint: "Number of bars for 3rd period",
      type: "number",
      range: {
        min: 1,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  im = {
    name: "VAR",
    camelCaseName: "variance",
    group: "Statistic Functions",
    description: "Variance",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 5,
      hint: "Number of period",
      type: "number",
      range: {
        min: 1,
        max: 1e5
      }
    }, {
      name: "nbDev",
      displayName: "Deviations",
      defaultValue: 1,
      hint: "Nb of deviations",
      type: "number",
      range: {
        min: -3e37,
        max: 3e37
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  sm = {
    name: "WCLPRICE",
    camelCaseName: "wclPrice",
    group: "Price Transform",
    description: "Weighted Close Price",
    inputs: [{
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  nm = {
    name: "WILLR",
    camelCaseName: "willR",
    group: "Momentum Indicators",
    description: "Williams' %R",
    inputs: [{
      name: "high",
      type: "number"
    }, {
      name: "low",
      type: "number"
    }, {
      name: "close",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 14,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  rm = {
    name: "WMA",
    camelCaseName: "wma",
    group: "Overlap Studies",
    description: "Weighted Moving Average",
    inputs: [{
      name: "inReal",
      type: "number"
    }],
    options: [{
      name: "timePeriod",
      displayName: "Time Period",
      defaultValue: 30,
      hint: "Number of period",
      type: "number",
      range: {
        min: 2,
        max: 1e5
      }
    }],
    outputs: [{
      name: "output",
      type: "number",
      plot: "line"
    }]
  },
  mm = exports.talibAPI = {
    ACCBANDS: du,
    ACOS: mu,
    AD: pu,
    ADD: gu,
    ADOSC: fu,
    ADX: yu,
    ADXR: vu,
    APO: wu,
    AROON: po,
    AROONOSC: xu,
    ASIN: bu,
    ATAN: Cu,
    ATR: Tu,
    AVGDEV: Eu,
    AVGPRICE: Su,
    BBANDS: go,
    BETA: Pu,
    BOP: Mu,
    CCI: Au,
    CDL2CROWS: Lu,
    CDL3BLACKCROWS: Nu,
    CDL3INSIDE: Iu,
    CDL3LINESTRIKE: Du,
    CDL3OUTSIDE: Ou,
    CDL3STARSINSOUTH: Ru,
    CDL3WHITESOLDIERS: ku,
    CDLABANDONEDBABY: _u,
    CDLADVANCEBLOCK: Hu,
    CDLBELTHOLD: $u,
    CDLBREAKAWAY: Uu,
    CDLCLOSINGMARUBOZU: Bu,
    CDLCONCEALBABYSWALL: Vu,
    CDLCOUNTERATTACK: zu,
    CDLDARKCLOUDCOVER: Wu,
    CDLDOJI: Fu,
    CDLDOJISTAR: Gu,
    CDLDRAGONFLYDOJI: Yu,
    CDLENGULFING: qu,
    CDLEVENINGDOJISTAR: Xu,
    CDLEVENINGSTAR: Ku,
    CDLGAPSIDESIDEWHITE: ju,
    CDLGRAVESTONEDOJI: Zu,
    CDLHAMMER: Ju,
    CDLHANGINGMAN: Qu,
    CDLHARAMI: ed,
    CDLHARAMICROSS: td,
    CDLHIGHWAVE: sd,
    CDLHIKKAKE: nd,
    CDLHIKKAKEMOD: rd,
    CDLHOMINGPIGEON: od,
    CDLIDENTICAL3CROWS: ad,
    CDLINNECK: ld,
    CDLINVERTEDHAMMER: hd,
    CDLKICKING: cd,
    CDLKICKINGBYLENGTH: ud,
    CDLLADDERBOTTOM: dd,
    CDLLONGLEGGEDDOJI: md,
    CDLLONGLINE: pd,
    CDLMARUBOZU: gd,
    CDLMATCHINGLOW: fd,
    CDLMATHOLD: yd,
    CDLMORNINGDOJISTAR: vd,
    CDLMORNINGSTAR: wd,
    CDLONNECK: xd,
    CDLPIERCING: bd,
    CDLRICKSHAWMAN: Cd,
    CDLRISEFALL3METHODS: Td,
    CDLSEPARATINGLINES: Ed,
    CDLSHOOTINGSTAR: Sd,
    CDLSHORTLINE: Pd,
    CDLSPINNINGTOP: Md,
    CDLSTALLEDPATTERN: Ad,
    CDLSTICKSANDWICH: Ld,
    CDLTAKURI: Nd,
    CDLTASUKIGAP: Id,
    CDLTHRUSTING: Dd,
    CDLTRISTAR: Od,
    CDLUNIQUE3RIVER: Rd,
    CDLUPSIDEGAP2CROWS: kd,
    CDLXSIDEGAP3METHODS: _d,
    CEIL: Hd,
    CMO: $d,
    CORREL: Ud,
    COS: Bd,
    COSH: Vd,
    DEMA: zd,
    DIV: Wd,
    DX: Fd,
    EMA: fo,
    EXP: Gd,
    FLOOR: Yd,
    HT_DCPERIOD: qd,
    HT_DCPHASE: Xd,
    HT_PHASOR: Kd,
    HT_SINE: jd,
    HT_TRENDLINE: Zd,
    HT_TRENDMODE: Jd,
    IMI: Qd,
    KAMA: e0,
    LINEARREG: t0,
    LINEARREG_ANGLE: i0,
    LINEARREG_INTERCEPT: s0,
    LINEARREG_SLOPE: n0,
    LN: r0,
    LOG10: o0,
    MA: a0,
    MACD: l0,
    MACDEXT: h0,
    MACDFIX: c0,
    MAMA: u0,
    MAVP: d0,
    MAX: m0,
    MAXINDEX: p0,
    MEDPRICE: g0,
    MFI: f0,
    MIDPOINT: y0,
    MIDPRICE: v0,
    MIN: w0,
    MININDEX: x0,
    MINMAX: b0,
    MINMAXINDEX: C0,
    MINUS_DI: T0,
    MINUS_DM: E0,
    MOM: S0,
    MULT: P0,
    NATR: M0,
    OBV: A0,
    PLUS_DI: L0,
    PLUS_DM: N0,
    PPO: I0,
    ROC: D0,
    ROCP: O0,
    ROCR: R0,
    ROCR100: k0,
    RSI: yo,
    SAR: _0,
    SAREXT: H0,
    SIN: $0,
    SINH: U0,
    SMA: vo,
    SQRT: B0,
    STDDEV: V0,
    STOCH: wo,
    STOCHF: z0,
    STOCHRSI: W0,
    SUB: F0,
    SUM: G0,
    T3: Y0,
    TAN: q0,
    TANH: X0,
    TEMA: K0,
    TRANGE: j0,
    TRIMA: Z0,
    TRIX: J0,
    TSF: Q0,
    TYPPRICE: em,
    ULTOSC: tm,
    VAR: im,
    WCLPRICE: sm,
    WILLR: nm,
    WMA: rm
  };
class $s extends He {
  name = "Aroon";
  shortName = "AROON";
  libName = "AROON";
  definition = {
    input: {
      high: [],
      low: [],
      timePeriod: 14
    },
    output: {
      aroonDown: [],
      aroonUp: []
    }
  };
  #e = {
    downStroke: "#c80",
    downLineWidth: "1",
    downLineDash: void 0,
    upStroke: "#08c",
    upLineWidth: "1",
    upLineDash: void 0,
    fillStyle: "#0080c044"
  };
  precision = 2;
  scaleOverlay = !0;
  plots = [{
    key: "AROON_1",
    title: "AROON",
    type: "line"
  }];
  static inCnt = 0;
  static primaryPane = !1;
  static scale = Ke[1];
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a);
    const l = a.overlay;
    this.id = a.overlay?.id || Z(this.shortName), this.defineIndicator(l?.settings, po), this.style = l?.settings?.style ? {
      ...this.#e,
      ...l.settings.style
    } : {
      ...this.#e,
      ...n.style
    }, this.calcIndicatorHistory(), this.setNewValue = h => {
      this.newValue(h);
    }, this.setUpdateValue = h => {
      this.updateValue(h);
    }, this.addLegend();
  }
  get primaryPane() {
    return $s.primaryPane;
  }
  get defaultStyle() {
    return this.#e;
  }
  legendInputs(e = this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return !1;
    const i = {};
    let s = [!1, !1],
      {
        c: n,
        colours: o
      } = super.legendInputs(e);
    return i.Dn = this.scale.nicePrice(this.overlay.data[n][1]), i.Up = this.scale.nicePrice(this.overlay.data[n][2]), o = [this.style.downStroke, this.style.upStroke], {
      inputs: i,
      colours: o,
      labels: s
    };
  }
  draw(e = this.range) {
    if (this.overlay.data.length < 2) return;
    if (!super.mustUpdate()) return !1;
    this.scene.clear();
    const i = {
        down: [],
        up: []
      },
      s = this.overlay.data,
      o = {
        w: this.xAxis.candleW
      };
    let a = e.value(e.indexStart)[0],
      l = this.overlay.data[0][0],
      h = (a - l) / e.interval,
      m = this.Timeline.rangeScrollOffset,
      g = e.Length + m + 2,
      v = {};
    for (; g;) h < 0 || h >= this.overlay.data.length ? (i.down.push({
      x: null,
      y: null
    }), i.up.push({
      x: null,
      y: null
    })) : (o.x = this.xAxis.xPos(s[h][0]), o.y = this.yAxis.yPos(s[h][1]), i.down.push({
      ...o
    }), o.x = this.xAxis.xPos(s[h][0]), o.y = this.yAxis.yPos(s[h][2]), i.up.push({
      ...o
    })), h++, g--;
    v = {
      width: this.style.LineWidth,
      stroke: this.style.downStroke,
      dash: this.style.downLineDash
    }, this.plot(i.down, "renderLine", v), v = {
      width: this.style.upLineWidth,
      stroke: this.style.upStroke,
      dash: this.style.upLineDash
    }, this.plot(i.up, "renderLine", v), this.target.viewport.render(), super.updated();
  }
}
class Us extends He {
  name = "Bollinger Bands";
  shortName = "BB";
  libName = "BBANDS";
  definition = {
    input: {
      inReal: [],
      nbDevDn: 2,
      nbDevUp: 2,
      timePeriod: 20
    },
    output: {
      lowerBand: [],
      middleBand: [],
      upperBand: []
    }
  };
  #e = {
    lowerStroke: "#08c",
    lowerLineWidth: "1",
    lowerLineDash: void 0,
    middleStroke: "#0080c088",
    middleLineWidth: "1",
    middleLineDash: void 0,
    upperStroke: "#08c",
    upperLineWidth: "1",
    upperLineDash: void 0,
    fillStyle: "#0080c044"
  };
  precision = 2;
  scaleOverlay = !1;
  plots = [{
    key: "BB_1",
    title: " ",
    type: "line"
  }];
  static inCnt = 0;
  static primaryPane = !0;
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a);
    const l = a.overlay;
    this.id = a.overlay?.id || Z(this.shortName), this.defineIndicator(l?.settings, go), this.style = l?.settings?.style ? {
      ...this.#e,
      ...l.settings.style
    } : {
      ...this.#e,
      ...n.style
    }, this.calcIndicatorHistory(), this.setNewValue = h => {
      this.newValue(h);
    }, this.setUpdateValue = h => {
      this.updateValue(h);
    }, this.addLegend();
  }
  get primaryPane() {
    return Us.primaryPane;
  }
  get defaultStyle() {
    return this.#e;
  }
  legendInputs(e = this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return !1;
    const i = {};
    let s = [!1, !1, !1],
      {
        c: n,
        colours: o
      } = super.legendInputs(e);
    return i.Hi = this.scale.nicePrice(this.overlay.data[n][1]), i.Mid = this.scale.nicePrice(this.overlay.data[n][2]), i.Lo = this.scale.nicePrice(this.overlay.data[n][3]), o = [this.style.upperStroke, this.style.middleStroke, this.style.lowerStroke], {
      inputs: i,
      colours: o,
      labels: s
    };
  }
  draw(e = this.range) {
    if (this.overlay.data.length < 2) return;
    if (!super.mustUpdate()) return !1;
    this.scene.clear();
    const i = {
        lower: [],
        middle: [],
        upper: []
      },
      s = this.overlay.data,
      o = {
        w: this.xAxis.candleW
      };
    let a = e.value(e.indexStart)[0],
      l = this.overlay.data[0][0],
      h = (a - l) / e.interval,
      m = this.Timeline.rangeScrollOffset,
      g = e.Length + m * 2 + 2,
      v = {};
    for (; g;) h < 0 || h >= this.overlay.data.length ? (i.lower.push({
      x: null,
      y: null
    }), i.middle.push({
      x: null,
      y: null
    }), i.upper.push({
      x: null,
      y: null
    })) : (o.x = this.xAxis.xPos(s[h][0]), o.y = this.yAxis.yPos(s[h][1]), i.lower.push({
      ...o
    }), o.x = this.xAxis.xPos(s[h][0]), o.y = this.yAxis.yPos(s[h][2]), i.middle.push({
      ...o
    }), o.x = this.xAxis.xPos(s[h][0]), o.y = this.yAxis.yPos(s[h][3]), i.upper.push({
      ...o
    })), h++, g--;
    v = {
      width: this.style.lowerLineWidth,
      stroke: this.style.lowerStroke,
      dash: this.style.lowerLineDash
    }, this.plot(i.lower, "renderLine", v), v = {
      width: this.style.middleLineWidth,
      stroke: this.style.middleStroke,
      dash: this.style.middleLineDash
    }, this.plot(i.middle, "renderLine", v), v = {
      width: this.style.upperLineWidth,
      stroke: this.style.upperStroke,
      dash: this.style.upperLineDash
    }, this.plot(i.upper, "renderLine", v), this.target.viewport.render(), super.updated();
  }
}
class Ni extends He {
  name = "Exponential Moving Average";
  shortName = "EMA";
  libName = "EMA";
  definition = {
    input: {
      inReal: [],
      timePeriod: 20
    },
    output: {
      output: []
    }
  };
  #e = {
    stroke: "#C80",
    width: "1"
  };
  precision = 2;
  checkParamCount = !1;
  scaleOverlay = !1;
  plots = [{
    key: "EMA_1",
    title: "EMA: ",
    type: "line"
  }];
  static inCnt = 0;
  static primaryPane = !0;
  static colours = ["#9C27B0", "#9C27B0", "#66BB6A", "#66BB6A"];
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a), Ni.inCnt++;
    const l = a.overlay;
    this.id = a.overlay?.id || Z(this.shortName), this.defineIndicator(l?.settings, fo), this.style = l?.settings?.style ? {
      ...this.#e,
      ...l.settings.style
    } : {
      ...this.#e,
      ...n.style
    }, this.calcIndicatorHistory(), this.setNewValue = h => {
      this.newValue(h);
    }, this.setUpdateValue = h => {
      this.updateValue(h);
    }, this.addLegend();
  }
  get primaryPane() {
    return Ni.primaryPane;
  }
  get defaultStyle() {
    return this.#e;
  }
  updateLegend() {
    this.parent.legend.update();
  }
  legendInputs(e = this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return !1;
    const i = {},
      {
        c: s,
        colours: n
      } = super.legendInputs(e);
    return i.EMA_1 = this.scale.nicePrice(this.overlay.data[s][1]), {
      inputs: i,
      colours: n
    };
  }
  draw(e = this.range) {
    if (this.overlay.data.length < 2) return;
    if (!super.mustUpdate()) return !1;
    this.scene.clear();
    const i = this.overlay.data,
      s = this.xAxis.candleW,
      n = [];
    this.xAxis.smoothScrollOffset;
    const o = {
      w: s
    };
    let a = this.Timeline.rangeScrollOffset,
      l = e.data.length - this.overlay.data.length,
      h = e.indexStart - l - 2,
      m = e.Length + a * 2 + 2;
    for (; m;) h < 0 || h >= this.overlay.data.length ? n.push({
      x: null,
      y: null
    }) : (o.x = this.xAxis.xPos(i[h][0]), o.y = this.yAxis.yPos(i[h][1]), n.push({
      ...o
    })), h++, m--;
    this.plot(n, "renderLine", this.style), this.target.viewport.render(), super.updated();
  }
}
class Bs extends He {
  name = "Relative Strength Index";
  shortName = "RSI";
  libName = "RSI";
  definition = {
    input: {
      inReal: [],
      timePeriod: 20
    },
    output: {
      output: []
    }
  };
  #e = {
    stroke: "#C80",
    width: "1",
    defaultHigh: 75,
    defaultLow: 25,
    highLowLineWidth: 1,
    highLowStyle: "dashed",
    highStroke: "#848",
    lowStroke: "#848",
    highLowRangeStyle: "#22002220"
  };
  checkParamCount = !1;
  plots = [{
    key: "RSI_1",
    title: " ",
    type: "line"
  }];
  static inCnt = 0;
  static primaryPane = !1;
  static scale = Ke[1];
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a);
    const l = a.overlay;
    this.id = a.overlay?.id || Z(this.shortName), this.defineIndicator(l?.settings, yo), this.style = l?.settings?.style ? {
      ...this.#e,
      ...l.settings.style
    } : {
      ...this.#e,
      ...n.style
    }, this.calcIndicatorHistory(), this.setNewValue = h => {
      this.newValue(h);
    }, this.setUpdateValue = h => {
      this.updateValue(h);
    }, this.addLegend();
  }
  get primaryPane() {
    return Bs.primaryPane;
  }
  get defaultStyle() {
    return this.#e;
  }
  legendInputs(e = this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return !1;
    const i = {},
      {
        c: s,
        colours: n
      } = super.legendInputs(e);
    return i.RSI_1 = this.scale.nicePrice(this.overlay.data[s][1]), {
      inputs: i,
      colours: n
    };
  }
  draw(e = this.range) {
    if (this.overlay.data.length < 2 || !super.mustUpdate()) return !1;
    this.scene.clear();
    const i = this.scene.width + this.xAxis.bufferPx * 2,
      s = this.yAxis.yPos(this.style?.high || this.style.defaultHigh),
      n = this.yAxis.yPos(this.style?.low || this.style.defaultLow),
      o = [0, s, this.scene.width, n - s];
    let a = {
      fill: this.style.highLowRangeStyle
    };
    if (this.plot(o, "renderRect", a), o.length = 0, o[0] = {
      x: 0,
      y: s
    }, o[1] = {
      x: i,
      y: s
    }, a = {
      width: this.style.highLowLineWidth,
      stroke: this.style.highStroke,
      dash: [1, 1]
    }, this.plot(o, "renderLine", a), o.length = 0, o[0] = {
      x: 0,
      y: n
    }, o[1] = {
      x: i,
      y: n
    }, a = {
      width: this.style.highLowLineWidth,
      stroke: this.style.lowStroke,
      dash: [1, 1]
    }, this.plot(o, "renderLine", a), this.overlay.data.length < 2) return this.target.viewport.render(), !1;
    const l = this.overlay.data,
      h = this.xAxis.candleW;
    o.length = 0, this.Timeline.smoothScrollOffset;
    const m = {
      w: h
    };
    let g = this.Timeline.rangeScrollOffset,
      v = e.data.length - this.overlay.data.length,
      S = e.indexStart - v - 2,
      A = e.Length + g * 2 + 2,
      L = 0;
    for (; A;) S < 0 || S >= this.overlay.data.length || (L > l[S][0] && console.log(S, L, l[S][0]), L = l[S][0], m.x = this.xAxis.xPos(l[S][0]), m.y = this.yAxis.yPos(l[S][1]), o.push({
      ...m
    })), S++, A--;
    this.plot(o, "renderLine", this.style), this.target.viewport.render(), super.updated();
  }
}
class Ii extends He {
  name = "Simple Moving Average";
  shortName = "SMA";
  libName = "SMA";
  definition = {
    input: {
      inReal: [],
      timePeriod: 20
    },
    output: {
      output: []
    }
  };
  #e = {
    stroke: "#C80",
    width: "1"
  };
  #t = 2;
  primaryPane = !0;
  scaleOverlay = !1;
  plots = [{
    key: "SMA_1",
    title: "SMA: ",
    type: "line"
  }];
  static inCnt = 0;
  static primaryPane = !0;
  static colours = ["#9C27B0", "#9C27B0", "#66BB6A", "#66BB6A"];
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a), Ii.inCnt++;
    const l = a.overlay;
    this.id = a.overlay?.id || Z(this.shortName), this.defineIndicator(l?.settings, vo), this.style = l?.settings?.style ? {
      ...this.#e,
      ...l.settings.style
    } : {
      ...this.#e,
      ...n.style
    }, this.calcIndicatorHistory(), this.setNewValue = h => {
      this.newValue(h);
    }, this.setUpdateValue = h => {
      this.updateValue(h);
    }, this.addLegend();
  }
  get primaryPane() {
    return Ii.primaryPane;
  }
  get defaultStyle() {
    return this.#e;
  }
  updateLegend() {
    this.parent.legend.update();
  }
  legendInputs(e = this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return !1;
    const i = {},
      {
        c: s,
        colours: n
      } = super.legendInputs(e);
    return i.SMA_1 = this.scale.nicePrice(this.overlay.data[s][1]), {
      inputs: i,
      colours: n
    };
  }
  draw(e = this.range) {
    if (this.overlay.data.length < 2 || !super.mustUpdate()) return;
    this.scene.clear();
    const i = this.overlay.data,
      s = this.xAxis.candleW,
      n = [];
    this.xAxis.smoothScrollOffset;
    const o = {
      w: s
    };
    let a = this.Timeline.rangeScrollOffset,
      l = e.data.length - this.overlay.data.length,
      h = e.indexStart - l - 2,
      m = e.Length + a * 2 + 2;
    for (; m;) h < 0 || h >= this.overlay.data.length ? n.push({
      x: null,
      y: null
    }) : (o.x = this.xAxis.xPos(i[h][0]), o.y = this.yAxis.yPos(i[h][1]), n.push({
      ...o
    })), h++, m--;
    this.plot(n, "renderLine", this.style), this.target.viewport.render(), super.updated();
  }
}
class Vs extends He {
  name = "Stochastic Oscillator";
  shortName = "STOCH";
  libName = "STOCH";
  definition = {
    input: {
      high: [],
      low: [],
      close: [],
      fastK_Period: 5,
      slowK_Period: 3,
      slowD_Period: 3
    },
    output: {
      slowK: [],
      slowD: []
    }
  };
  #e = {
    slowKStroke: "#8C0",
    slowKLineWidth: "1",
    slowKLineDash: void 0,
    slowDStroke: "#00C",
    slowDLineWidth: "1",
    slowDLineDash: void 0,
    defaultHigh: 75,
    defaultLow: 25,
    highLowLineWidth: 1,
    highLowStyle: "dashed",
    highStroke: "#848",
    lowStroke: "#848",
    highLowRangeStyle: "#22002220"
  };
  checkParamCount = !1;
  plots = [{
    key: "STOCH_1",
    title: " ",
    type: "line"
  }];
  static inCnt = 0;
  static primaryPane = !1;
  static scale = Ke[1];
  constructor(e, i = !1, s = !1, n, o, a) {
    super(e, i, s, n, o, a);
    const l = a.overlay;
    this.id = a.overlay?.id || Z(this.shortName), this.defineIndicator(l?.settings, wo), this.style = l?.settings?.style ? {
      ...this.#e,
      ...l.settings.style
    } : {
      ...this.#e,
      ...n.style
    }, this.calcIndicatorHistory(), this.setNewValue = h => {
      this.newValue(h);
    }, this.setUpdateValue = h => {
      this.updateValue(h);
    }, this.addLegend();
  }
  get primaryPane() {
    return Vs.primaryPane;
  }
  get defaultStyle() {
    return this.#e;
  }
  legendInputs(e = this.chart.cursorPos) {
    if (this.overlay.data.length == 0) return !1;
    const i = {};
    let s = [!1, !1, !1],
      {
        c: n,
        colours: o
      } = super.legendInputs(e);
    return i.SlowK = this.scale.nicePrice(this.overlay.data[n][1]), i.SlowD = this.scale.nicePrice(this.overlay.data[n][1]), o = [this.style.slowD, this.style.slowK], {
      inputs: i,
      colours: o,
      labels: s
    };
  }
  draw(e = this.range) {
    if (this.overlay.data.length < 2 || !super.mustUpdate()) return !1;
    this.scene.clear();
    const i = this.scene.width + this.xAxis.bufferPx * 2,
      s = this.yAxis.yPos(this.style.defaultHigh),
      n = this.yAxis.yPos(this.style.defaultLow);
    let o = [0, s, this.scene.width, n - s],
      a = {
        fill: this.style.highLowRangeStyle
      };
    if (this.plot(o, "renderRect", a), o.length = 0, o[0] = {
      x: 0,
      y: s
    }, o[1] = {
      x: i,
      y: s
    }, a = {
      width: this.style.highLowLineWidth,
      stroke: this.style.highStroke,
      dash: [1, 1]
    }, this.plot(o, "renderLine", a), o.length = 0, o[0] = {
      x: 0,
      y: n
    }, o[1] = {
      x: i,
      y: n
    }, a = {
      width: this.style.highLowLineWidth,
      stroke: this.style.lowStroke,
      dash: [1, 1]
    }, this.plot(o, "renderLine", a), this.overlay.data.length < 2) return this.target.viewport.render(), !1;
    o = {
      slowD: [],
      slowK: []
    };
    const l = this.overlay.data,
      m = {
        w: this.xAxis.candleW
      };
    let g = e.value(e.indexStart)[0],
      v = this.overlay.data[0][0],
      S = (g - v) / e.interval,
      A = this.Timeline.rangeScrollOffset,
      L = e.Length + A * 2 + 2;
    for (; L;) S < 0 || S >= this.overlay.data.length ? (o.slowD.push({
      x: null,
      y: null
    }), o.slowK.push({
      x: null,
      y: null
    })) : (m.x = this.xAxis.xPos(l[S][0]), m.y = this.yAxis.yPos(l[S][1]), o.slowK.push({
      ...m
    }), m.x = this.xAxis.xPos(l[S][0]), m.y = this.yAxis.yPos(l[S][2]), o.slowD.push({
      ...m
    })), S++, L--;
    a = {
      width: this.style.slowKLineWidth,
      stroke: this.style.slowKStroke,
      dash: this.style.slowKLineDash
    }, this.plot(o.slowK, "renderLine", a), a = {
      width: this.style.slowDLineWidth,
      stroke: this.style.slowDStroke,
      dash: this.style.slowDLineDash
    }, this.plot(o.slowD, "renderLine", a), this.target.viewport.render(), super.updated();
  }
}
const xo = {
  AROON: {
    id: "AROON",
    name: "Aroon",
    event: "addIndicator",
    ind: $s
  },
  BB: {
    id: "BB",
    name: "Bollinger Bands",
    event: "addIndicator",
    ind: Us
  },
  EMA: {
    id: "EMA",
    name: "Exponential Moving Average",
    event: "addIndicator",
    ind: Ni
  },
  RSI: {
    id: "RSI",
    name: "Relative Strength Index",
    event: "addIndicator",
    ind: Bs
  },
  SMA: {
    id: "SMA",
    name: "Simple Moving Average",
    event: "addIndicator",
    ind: Ii
  },
  STOCH: {
    id: "STOCH",
    name: "Stochastic Oscillator",
    event: "addIndicator",
    ind: Vs
  }
};
class om {
  #e = "Utilities";
  #t = "utils";
  #n;
  #r;
  #i;
  #s;
  #l;
  #o;
  #c = {};
  #a = {};
  #h;
  #d = {};
  constructor(e, i) {
    this.#n = e, this.#r = i, this.#i = e.elUtils, this.#s = e.config?.utilsBar || uu, this.#l = e.WidgetsG, this.#o = e.indicatorClasses || xo, this.init();
  }
  log(e) {
    this.#n.log(e);
  }
  info(e) {
    this.#n.info(e);
  }
  warn(e) {
    this.#n.warn(e);
  }
  error(e) {
    this.#n.error(e);
  }
  get name() {
    return this.#e;
  }
  get shortName() {
    return this.#t;
  }
  get core() {
    return this.#n;
  }
  get options() {
    return this.#r;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return D.elementDimPos(this.#i);
  }
  get stateMachine() {
    return this.#h;
  }
  init() {
    this.#i.innerHTML = this.#i.defaultNode(this.#s), this.log(`${this.#e} instantiated`);
  }
  start() {
    this.initAllUtils(), this.eventsListen();
  }
  destroy() {
    const e = this.#n,
      i = D.findBySelectorAll(`#${e.id} .${qa} .icon-wrapper`);
    for (let s of i) {
      let n = s.id.replace("TX_", "");
      for (let o of this.#s) o.id === n && s.removeEventListener("click", this.#a[n].click), s.removeEventListener("pointerover", this.#a[n].pointerover), s.removeEventListener("pointerout", this.#a[n].pointerout);
    }
    this.off("utils_indicators", this.onIndicators), this.off("utils_timezone", this.onTimezone), this.off("utils_settings", this.onSettings), this.off("utils_screenshot", this.onScreenshot);
  }
  eventsListen() {
    this.on("utils_indicators", this.onIndicators, this), this.on("utils_timezone", this.onTimezone, this), this.on("utils_settings", this.onSettings, this), this.on("utils_screenshot", this.onScreenshot, this);
  }
  on(e, i, s) {
    this.#n.on(e, i, s);
  }
  off(e, i) {
    this.#n.off(e, i);
  }
  emit(e, i) {
    this.#n.emit(e, i);
  }
  onIconClick(e) {
    const i = D.findTargetParentWithClass(e.target, "icon-wrapper");
    if (!b(i)) return !1;
    const s = Date.now();
    if (s - this.#d[i.id] < 1e3) return !1;
    this.#d[i.id] = s;
    let n = i.dataset.event,
      o = i.dataset.menu || !1,
      a = {
        target: i.id,
        menu: o,
        evt: n
      },
      l = i.dataset.action;
    this.emit(n, a), o ? this.emit("menu_open", a) : this.emit("util_selected", a), l && l(a, this.#n);
  }
  onIconOver(e) {
    const i = e.currentTarget.querySelector("svg");
    i.style.fill = dt.COLOUR_ICONHOVER;
  }
  onIconOut(e) {
    const i = e.currentTarget.querySelector("svg");
    i.style.fill = dt.COLOUR_ICON;
  }
  initAllUtils() {
    const e = this.#i.querySelectorAll(".icon-wrapper");
    for (let i of e) {
      this.#d[i.id] = 0;
      let s = i.id.replace("TX_", ""),
        n = i.querySelector("svg");
      n.style.fill = dt.COLOUR_ICON, n.style.height = "90%";
      for (let o of this.#s) if (o.id === s && (this.#a[s] = {}, this.#a[s].click = this.onIconClick.bind(this), this.#a[s].pointerover = this.onIconOver.bind(this), this.#a[s].pointerout = this.onIconOut.bind(this), i.addEventListener("click", this.#a[s].click), i.addEventListener("pointerover", this.#a[s].pointerover), i.addEventListener("pointerout", this.#a[s].pointerout), s === "indicators" && (o.sub = Object.values(this.#o)), o?.sub)) {
        let a = {
            content: o.sub,
            primary: i
          },
          l = this.#l.insert("Menu", a);
        i.dataset.menu = l.id, l.start();
      }
    }
  }
  onIndicators(e) {}
  onTimezone(e) {
    this.#n.notImplemented();
  }
  onSettings(e) {
    this.#n.notImplemented();
  }
  onScreenshot(e) {
    this.#n.downloadImage();
  }
}
const am = 150;
class ye {
  #e;
  #t;
  #n;
  #r;
  #i;
  #s;
  #l;
  #o;
  #c;
  #a = {};
  static menuList = {};
  static menuCnt = 0;
  static class = Cn;
  static name = "Menus";
  static type = "Menu";
  static currentActive;
  static create(e, i) {
    const s = `menu_${++ye.menuCnt}`;
    return i.id = s, ye.menuList[s] = new ye(e, i), ye.menuList[s];
  }
  static destroy(e) {
    ye.menuList[e].end(), delete ye.menuList[e];
  }
  constructor(e, i) {
    this.#t = e, this.#n = i.core, this.#r = i, this.#e = i.id, this.#s = e.elements.elMenus, this.#i = this.#n.elWidgetsG, this.init();
  }
  get el() {
    return this.#l;
  }
  get id() {
    return this.#e;
  }
  get pos() {
    return this.dimensions;
  }
  get dimensions() {
    return D.elementDimPos(this.#l);
  }
  get type() {
    return ye.type;
  }
  init() {
    this.mount(this.#s);
  }
  start() {
    this.position(), this.eventsListen();
  }
  end() {
    this.#s.querySelectorAll(`#${this.id} li`).forEach(i => {
      i.removeEventListener("click", this.#a[this.id][i.id]);
    }), document.removeEventListener("click", this.#a[this.id].outside), this.off("global_resize", this.onResize);
  }
  eventsListen() {
    const e = this.#s.querySelectorAll(`#${this.id} li`);
    this.#a[this.id] = {}, e.forEach(i => {
      this.#a[this.id][i.id] = this.onMenuSelect.bind(this), i.addEventListener("click", this.#a[this.id][i.id]);
    }), this.on("global_resize", this.onResize, this);
  }
  on(e, i, s) {
    this.#n.on(e, i, s);
  }
  off(e, i) {
    this.#n.off(e, i);
  }
  emit(e, i) {
    this.#n.emit(e, i);
  }
  onMenuSelect(e) {
    let i = e.currentTarget.dataset.event,
      s = {
        target: e.currentTarget.id,
        menu: this.#e,
        evt: i
      };
    this.emit("menuItem_selected", s), this.emit("menu_close", s), this.#n.log(`menu_close: ${this.#e}`);
  }
  onOutsideClickListener(e) {
    if (!this.#l.contains(e.target) && !this.#r.primary.contains(e.target) && D.isVisible(this.#l)) {
      let i = {
        target: e.currentTarget.id,
        menu: this.#e
      };
      this.emit("menu_close", i);
    }
    document.removeEventListener("click", this.#a[this.id].outside);
  }
  onResize() {
    this.position();
  }
  mount(e) {
    e.lastElementChild == null ? e.innerHTML = this.menuNode() : e.lastElementChild.insertAdjacentHTML("afterend", this.menuNode()), this.#l = this.#s.querySelector(`#${this.id}`);
  }
  static defaultNode() {
    return `
      <div slot="widget" class="${Cn}" style=""></div>
    `;
  }
  menuNode() {
    const e = this.#r,
      i = `position: absolute; z-index: 1000; display: none; border: 1px solid ${Zi.COLOUR_BORDER}; background: ${Zi.COLOUR_BG}; color: ${Zi.COLOUR_TXT}; box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;`;
    let s = this.content(e);
    return `
      <div id="${e.id}" class="${Xa}" style="${i}">
        ${s}
      </div>
    `;
  }
  content(e) {
    const i = `list-style: none; text-align: left; margin:1em 1em 1em -2.5em; min-width: ${am}px`,
      s = "padding: .25em 1em .25em 1em; white-space: nowrap;",
      n = "display: inline-block; width: 4em;",
      o = "cursor: pointer;",
      a = `onmouseover="this.style.background ='#222'"`,
      l = `onmouseout="this.style.background ='none'"`;
    let h = `<ul style="${i}">`;
    if (e?.content) for (let m of e.content) h += `<li id="${m.id}" data-event="${m.event}" style="${s} ${o}" ${a} ${l}><a style="${o}"><span style="${n}">${m.id}</span><span>${m.name}</span></li></a>`;
    return h += "</ul>", h;
  }
  position() {
    let e = this.#i.getBoundingClientRect(),
      i = this.#r.primary.getBoundingClientRect(),
      s = Math.round(i.left - e.left),
      n = Math.round(i.bottom - e.top);
    this.#l.style.left = s + "px", this.#l.style.top = n + "px";
    let o = D.elementDimPos(this.#l);
    if (o.right > this.#i.offsetWidth) {
      let l = Math.floor(this.#i.offsetWidth - o.width);
      l = _(l, 0, this.#i.offsetWidth), this.#l.style.left = `${l}px`;
    }
    if (this.#n.MainPane.rowsH + n + o.height > this.#n.MainPane.rowsH) {
      let l = Math.floor(o.height * -1);
      l = _(l, this.#n.MainPane.rowsH * -1, 0), this.#l.style.top = `${l}px`;
    }
  }
  remove() {}
  open() {
    if (ye.currentActive === this) return !0;
    ye.currentActive = this, this.#l.style.display = "block", this.position(), setTimeout(() => {
      this.#a[this.id].outside = this.onOutsideClickListener.bind(this), document.addEventListener("click", this.#a[this.id].outside);
    }, 250);
  }
  close() {
    ye.currentActive = null, this.#l.style.display = "none", this.emit("menuClosed", this.id);
  }
}
class rt {
  static opened = new rt("opened");
  static closed = new rt("closed");
  constructor(e) {
    this.name = e;
  }
}
class re {
  #e;
  #t;
  #n;
  #r;
  #i = rt.closed;
  #s;
  #l;
  #o;
  #c;
  #a;
  #h;
  #d;
  #u;
  #m;
  #y;
  #g;
  #b;
  #w = !1;
  #p = {};
  static windowList = {};
  static windowCnt = 0;
  static class = En;
  static name = "Windows";
  static type = "Window";
  static currentActive = null;
  static create(e, i) {
    const s = `window_${++re.windowCnt}`;
    i.id = s;
    const n = {
      window: {
        "box-shadow": "rgb(0,0,0) 0px 20px 30px -10px"
      },
      content: {
        padding: "1em"
      }
    };
    return i.styles = b(i?.styles) ? {
      ...n,
      ...i.styles
    } : n, i.class = i?.class || "window", re.windowList[s] = new re(e, i), re.windowList[s];
  }
  static destroy(e) {
    re.windowList[e].destroy(), delete re.windowList[e];
  }
  constructor(e, i) {
    this.#t = e, this.#n = i.core, this.#r = i, this.#e = i.id, this.#l = e.elements.elWindows, this.#s = this.#n.elWidgetsG, this.init();
  }
  get id() {
    return this.#e;
  }
  get pos() {
    return this.dimensions;
  }
  get config() {
    return this.#r;
  }
  set config(e) {
    this.#r = e;
  }
  get state() {
    return this.#i;
  }
  get dimensions() {
    return D.elementDimPos(this.#o);
  }
  set dimensions(e) {
    this.setDimensions(e);
  }
  get type() {
    return re.type;
  }
  get el() {
    return this.#o;
  }
  get elDragBar() {
    return this.#c;
  }
  get elTitle() {
    return this.#a;
  }
  get elCloseIcon() {
    return this.#h;
  }
  get elContent() {
    return this.#d;
  }
  init() {
    this.mount(this.#l);
  }
  start() {
    this.eventsListen(), this.close();
  }
  destroy() {
    this.off("closeWindow", this.onCloseWindow, this), this.off("global_resize", this.onGlobalResize, this), this.el.remove();
  }
  eventsListen() {
    this.on("closeWindow", this.onCloseWindow, this), this.on("global_resize", this.onGlobalResize, this);
  }
  on(e, i, s) {
    this.#n.on(e, i, s);
  }
  off(e, i) {
    this.#n.off(e, i);
  }
  emit(e, i) {
    this.#n.emit(e, i);
  }
  onGlobalResize(e) {
    const i = this.dimensions,
      s = {
        position: {
          x: i.left,
          y: i.top
        },
        dimensions: {
          w: i.w,
          h: i.h
        }
      };
    i.w > e.width && (s.position.x = e.width), i.h > e.height && (s.position.y = e.height), i.left + s.dimensions.w, i.bottom + s.dimensions.h, i.x < 0 ? s.position.x = 0 : i.x + s.dimensions.w > e.width && (s.position.x -= e.width), this.setProperties(s);
  }
  onOutsideClickListener(e) {
    if (!this.#o.contains(e.target) && D.isVisible(this.#o) && !this.#w) {
      let i = {
        target: e.currentTarget.id,
        window: this.#e
      };
      this.emit("closeWindow", i), document.removeEventListener("click", this.#p.click), delete this.#p.click;
    }
  }
  onCloseWindow(e) {
    e.window === this.#e && this.close();
  }
  onWindow(e) {
    e.stopPropagation();
  }
  onDragBar(e) {
    this.#w = !0;
    let i = this.#o.offsetLeft + e.movement.x,
      s = this.#o.offsetTop + e.movement.y;
    this.position({
      x: i,
      y: s
    });
  }
  onDragBarEnd(e) {
    setTimeout(() => {
      this.#w = !1;
    }, 250);
  }
  mount(e) {
    e.lastElementChild == null ? e.innerHTML = this.windowNode() : e.lastElementChild.insertAdjacentHTML("afterend", this.windowNode()), this.#o = this.#l.querySelector(`#${this.#r.id}`), this.#c = this.#o.querySelector(".dragBar"), this.#a = this.#o.querySelector(".title"), this.#h = this.#o.querySelector(".closeIcon"), this.#d = this.#o.querySelector(".content"), this.#o.addEventListener("click", this.onWindow.bind(this)), D.isElement(this.#c) && (this.#b = new Le(this.#c, {
      disableContextMenu: !1
    }), this.#b.on("pointerdrag", this.onDragBar.bind(this)), this.#b.on("pointerdragend", this.onDragBarEnd.bind(this)));
    const i = this.dimensions,
      s = this.#r?.w || i.w,
      n = this.#r?.h || i.h;
    this.setDimensions({
      w: s,
      h: n
    }), this.position();
  }
  static defaultNode() {
    return `
      <div slot="widget" class="${En}" style=""></div>
    `;
  }
  windowNode() {
    const e = this.#r;
    let i = `position: absolute; z-index: 100; display: block; border: 1px solid ${Ji.COLOUR_BORDER}; background: ${Ji.COLOUR_BG}; color: ${Ji.COLOUR_TXT}; box-shadow: rgb(0,0,0) 0px 20px 30px -10px;`,
      s = this.config?.styles?.window;
    for (let m in s) i += `${m}: ${s[m]}; `;
    let n = e.dragBar ? this.dragBar(e) : "",
      o = !e.dragBar && e.title ? this.title(e) : "",
      a = this.content(e),
      l = this.closeIcon(e);
    return `
      <div id="${e.id}" class="${Ka} ${this.#r.class}" style="${i}">
          ${n}
          ${o}
          ${l}
          ${a}
        </div>
      </div>
    `;
  }
  content(e) {
    let i = this.config?.styles?.content,
      s = "";
    for (let a in i) s += `${a}: ${i[a]}; `;
    let n = e?.content ? e.content : "";
    return `
      <div class="content" style="${s}">
        ${n}
      </div>
    `;
  }
  dragBar(e) {
    const i = "cursor: grab;",
      s = `onmouseover="this.style.background ='#222'"`,
      n = `onmouseout="this.style.background ='none'"`;
    let o = `${i} `,
      a = this.config?.styles?.dragBar;
    for (let h in a) o += `${h}: ${a[h]}; `;
    let l = "";
    return e.dragBar && (l += `
      <div class="dragBar" style="${o}" ${s} ${n}>
        ${this.title(e)}
      </div>
    `), l;
  }
  title(e) {
    const i = this.config,
      s = i?.styles?.title,
      n = E(i?.title) ? i.title : "";
    let o = "white-space: nowrap; ";
    for (let l in s) o += `${l}: ${s[l]}; `;
    return `
        <div class="title" style="${o}">${n}</div>
    `;
  }
  closeIcon(e) {
    const i = "cursor: pointer;",
      s = `onmouseover="this.style.background ='#222'"`,
      n = `onmouseout="this.style.background ='none'"`;
    let o = `${i} `,
      a = this.config?.styles?.closeIcon,
      l = "";
    for (let m in a) l += `${m}: ${a[m]}; `;
    let h = "";
    return e.closeIcon && (h += `
      <div class="closeIcon" style="${o}" ${s} ${n}>
        <span>X</span>
      </div>
    `), h;
  }
  position(e) {
    let i = this.dimensions,
      s = this.#n.dimensions;
    Math.round(s.left - i.left), Math.round(s.bottom - i.top);
    let n = Math.round((s.width - i.width) / 2),
      o = Math.round((s.height - i.height) / 2) * -1,
      a = D.getStyle(this.#o, "z-index");
    if (b(e)) {
      let {
        x: l,
        y: h,
        z: m
      } = {
        ...e
      };
      T(l) && (n = l), T(h) && (o = h), T(m) && (a = m), this.#u = {
        x: l,
        y: h,
        z: a
      };
    }
    if (this.#o.style.left = `${n}px`, this.#o.style.top = `${o}px`, this.#o.style["z-index"] = `${a}`, this.config?.bounded) {
      const l = this.#o.clientWidth;
      if (n + l > this.#s.offsetWidth) {
        let m = Math.floor(this.#s.offsetWidth - l);
        m = _(m, 0, this.#s.offsetWidth), this.#o.style.left = `${m}px`;
      }
      const h = this.#o.clientHeight;
      if (o + s.height + h > s.height) {
        let m = Math.floor(h * -1);
        m = _(m, s.height * -1, 0), this.#o.style.top = `${m}px`;
      }
    }
  }
  setDimensions(e) {
    if (!b(e)) return !1;
    T(e?.w) && (this.#o.style.width = `${e.w}px`), T(e?.h) && (this.#o.style.height = `${e.h}px`);
  }
  setProperties(e) {
    if (!b(e)) return !1;
    if (E(e?.title) && (this.#a.innerHTML = e.title), E(e?.content) && (this.#d.innerHTML = e.content), this.setDimensions({
      ...e?.dimensions
    }), this.position({
      ...e?.position
    }), b(e?.styles)) {
      const i = (s, n) => {
        if (!b(n)) return !1;
        const o = "el" + s.charAt(0).toUpperCase() + s.slice(1);
        if (b(this[o])) for (let a in n) this[o].style.p = n[a];
      };
      for (let s of Object.keys(e.styles)) i(s, e.styles[s]);
    }
    return e;
  }
  remove() {
    return re.destroy(this.id);
  }
  open(e = {}) {
    if (re.currentActive === this && this.state === rt.opened) return !0;
    re.currentActive = this, this.#i = rt.opened, this.#o.style.display = "block", this.#o.style.zindex = "10", this.setProperties(e), this.emit("window_opened", this.id), setTimeout(() => {
      this.#p.click = this.onOutsideClickListener.bind(this), document.addEventListener("click", this.#p.click);
    }, e?.offFocus || 250);
  }
  close() {
    re.currentActive = null, this.#i = rt.closed, this.#o.style.display = "none", this.emit("window_closed", this.id);
  }
}
class Hi extends re {
  static type = "Window";
  static create(e, i) {
    const s = {
      window: {
        "box-shadow": "rgb(0,0,0) 0px 20px 30px -10px"
      },
      content: {
        padding: "1em"
      },
      title: {
        padding: "0 1em",
        background: "#333"
      }
    };
    return i.dragBar = K(i?.dragBar) ? i.dragBar : !0, i.close = K(i?.close) ? i.close : !0, i.styles = b(i?.styles) ? {
      ...s,
      ...i.styles
    } : s, i.class = "dialogue", super.create(e, i);
  }
  constructor(e, i) {
    super(e, i);
  }
  get type() {
    return Hi.type;
  }
}
class lm extends Hi {
  static type = "Window";
  static create(e, i) {
    return i.dragBar = !0, i.close = !0, i.class = "config", super.create(e, i);
  }
  constructor(e, i) {
    super(e, i);
  }
}
class Ee {
  static progressList = {};
  static progressCnt = 0;
  static class = Sn;
  static type = "progress";
  static name = "Progress";
  static icons = {
    loadingBars: Sh,
    loadingSpin: Ph
  };
  static defaultNode() {
    return `
      <div slot="widget" class="${Sn}" style=""></div>
    `;
  }
  static create(e, i) {
    const s = `progress_${++Ee.progressCnt}`;
    return i.id = s, Ee.progressList[s] = new Ee(e, i), Ee.progressList[s];
  }
  static destroy(e) {
    Ee.progressList[e].destroy(), delete Ee.progressList[e];
  }
  #e;
  #t;
  #n;
  #r;
  #i;
  #s;
  #l;
  #o;
  constructor(e, i) {
    this.#t = e, this.#n = i.core, this.#r = i, this.#e = i.id, this.#s = e.elements.elProgress, this.#i = this.#n.elWidgetsG, this.init();
  }
  get type() {
    return Ee.type;
  }
  init() {
    this.mount(this.#s);
  }
  start() {
    if (!b(this.#n.config?.progress) || !b(this.#n.config.progress?.loading)) return !1;
    this.#l.style.display = "block";
    const e = this.#n.elBody.width / 2 - this.#l.clientWidth / 2,
      i = this.#n.elBody.height / -2 - this.#l.clientHeight / 2;
    this.#l.style.top = `${i}px`, this.#l.style.left = `${e}px`;
  }
  stop() {
    this.#l.style.display = "none";
  }
  progressNode(e) {
    const i = "position: absolute; z-index: 1000; display: none; justify-content: center; align-items: center;",
      n = `<div class="content" style="">${e.icon}</div>`;
    return `
      <div id="${this.#r.id}" class="progress ${e.type}" style="${i}">${n}</div>
    `;
  }
  mount(e) {
    let i = "loadingBars";
    this.#r?.type in Ee.icons && (i = this.#r?.type);
    const s = {
      type: i,
      icon: Ee.icons[i]
    };
    e.lastElementChild == null ? e.innerHTML = this.progressNode(s) : e.lastElementChild.insertAdjacentHTML("afterend", this.progressNode(s)), this.#l = this.#s.querySelector(`#${this.#r.id}`), this.#o = this.#l.querySelector("svg"), this.#o.style.fill = `${Ih.COLOUR_ICONHOVER};`;
  }
}
const rs = {
  id: "widgets",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(r) {},
      onExit(r) {},
      on: {
        menu_open: {
          target: "menu_open",
          action(r) {}
        },
        window_open: {
          target: "window_open",
          action(r) {}
        }
      }
    },
    menu_open: {
      onEnter(r) {},
      onExit(r) {},
      on: {
        menu_close: {
          target: "idle",
          action(r) {}
        }
      }
    },
    window_open: {
      onEnter(r) {},
      onExit(r) {},
      on: {
        window_close: {
          target: "idle",
          action(r) {}
        }
      }
    }
  }
};
class hm {
  #e;
  #t = "Widgets";
  #n = "widgets";
  #r;
  #i;
  #s;
  #l;
  #o = {
    Divider: le,
    Progress: Ee,
    Menu: ye,
    Window: re,
    Dialogue: Hi,
    ConfigDialogue: lm
  };
  #c = {};
  #a = {};
  #h;
  #d;
  #u;
  constructor(e, i) {
    this.#r = e, this.#i = i, this.#l = {
      ...this.#o,
      ...i.widgets
    }, this.#h = e.elWidgetsG, this.init();
  }
  log(e) {
    this.#r.log(e);
  }
  info(e) {
    this.#r.info(e);
  }
  warn(e) {
    this.#r.warn(e);
  }
  error(e) {
    this.#r.error(e);
  }
  set id(e) {
    this.#e = $e(e);
  }
  get id() {
    return this.#e ? `${this.#e}` : `${this.#r.id}-${this.#n}`.replace(/ |,|;|:|\.|#/g, "_");
  }
  get name() {
    return this.#t;
  }
  get shortName() {
    return this.#n;
  }
  get core() {
    return this.#r;
  }
  get options() {
    return this.#i;
  }
  get elements() {
    return this.#a;
  }
  get instances() {
    return this.#c;
  }
  set stateMachine(e) {
    this.#s = new ze(e, this);
  }
  get stateMachine() {
    return this.#s;
  }
  get types() {
    return this.#l;
  }
  init() {
    this.mount(this.#h);
    for (let e in this.#l) {
      let i = this.#l[e],
        s = `el${i.name}`;
      this.#a[s] = this.#h.querySelector(`.${i.class}`);
    }
  }
  start() {
    this.eventsListen(), rs.id = this.id, rs.context = this, this.stateMachine = rs, this.stateMachine.start();
  }
  destroy() {
    this.off("menu_open", this.onOpenMenu), this.off("menu_close", this.onCloseMenu), this.off("menu_off", this.onCloseMenu), this.off("menuItem_selected", this.onMenuItemSelected), this.off("global_resize", this.onResize), this.stateMachine.destroy();
    for (let e in this.#c) this.delete(e);
    for (let e in this.#l) this.#l[e].destroy(id);
  }
  eventsListen() {
    this.on("resize", this.onResize, this), this.on("menu_open", this.onOpenMenu, this), this.on("menu_close", this.onCloseMenu, this), this.on("menu_off", this.onCloseMenu, this), this.on("menuItem_selected", this.onMenuItemSelected, this), this.on("global_resize", this.onResize, this);
  }
  on(e, i, s) {
    this.#r.on(e, i, s);
  }
  off(e, i) {
    this.#r.off(e, i);
  }
  emit(e, i) {
    this.#r.emit(e, i);
  }
  onResize(e) {
    this.setDimensions(e);
  }
  onOpenMenu(e) {
    this.#c[e.menu].open();
  }
  onCloseMenu(e) {
    this.#c[e.menu].close();
  }
  onMenuItemSelected(e) {
    this.emit(e.evt, e.target);
  }
  onResize() {
    this.elements.elDividers.style.width = `${this.core.width}px`;
  }
  mount(e) {
    e.innerHTML = this.defaultNode();
  }
  setWidth(e) {
    this.#d = e;
  }
  setHeight(e) {
    this.#u = e;
  }
  setDimensions(e) {
    this.setWidth(e.mainW), this.setHeight(e.mainH);
  }
  defaultNode() {
    let e = "",
      i = [];
    for (let s in this.#l) {
      let n = this.#l[s];
      i.indexOf(n.type) === -1 && (e += n.defaultNode(), i.push(n.type));
    }
    return e;
  }
  insert(e, i) {
    if (!(e in this.#l) || !b(i)) return !1;
    i.core = this.core;
    const s = this.#l[e].create(this, i);
    return this.#c[s.id] = s, s;
  }
  delete(e) {
    return isString(e) ? (this.#l[type].destroy(e), !0) : !1;
  }
}
function rr(r, e, i, s, n, o) {
  const a = r.theme,
    l = document.createElement("template"),
    h = r.Timeline.graph.viewport.scene,
    m = r.MainPane,
    g = m.graph.viewport.scene,
    v = m.width,
    S = m.height,
    A = new Ft.Viewport({
      width: v,
      height: S,
      container: l
    }),
    L = A.scene.context;
  let O = 0,
    ae = 0,
    B = v - r.Chart.scale.width;
  a?.yAxis?.location == "left" && (ae = r.Chart.scale.width, B = 0);
  let R;
  L.save(), Hs(L, 0, 0, v, S, {
    fill: a.chart.Background
  }), L.drawImage(g.canvas, ae, 0, g.width, g.height);
  for (const [J, ue] of r.ChartPanes) {
    let Q = ue.graph.viewport.scene,
      {
        width: ie,
        height: de
      } = Q,
      me = ue.scale.graph.viewport.scene,
      {
        width: ot,
        height: We
      } = me;
    O > 0 && (R = {
      stroke: a.divider.line
    }, Gt(L, O, 0, m.width, R)), L.drawImage(Q.canvas, ae, O, ie, de), L.drawImage(me.canvas, B, O - 1, ot, We), O += de;
  }
  L.drawImage(h.canvas, 0, O, h.width, h.height), R = {
    text: r.config.title,
    colour: a.chart.TextColour,
    fontSize: a.chart.FontSize * 1.5,
    fontWeight: "normal",
    fontFamily: a.chart.FontFamily,
    textBaseLine: "top"
  }, Vr(L, 6, 6, R);
  const Ne = J => {
    if (J) {
      const Q = o?.x || 0,
        ie = o?.y || 0,
        de = o?.width || v * 0.25,
        me = o?.height || S * 0.25;
      L.drawImage(J, Q, ie, de, me);
    }
    L.restore();
    const ue = () => {
      A.destroy(), l.remove();
    };
    switch (n) {
      case "url":
        if (U(e)) {
          const Q = ie => {
            e(ie), ue();
          };
          A.scene.toImage(i, s, Q);
        } else new Promise(function (Q, ie) {
          const de = A.scene.toImage(i, s);
          de ? Q(de) : ie(!1), ue();
        });
        break;
      case "download":
      default:
        A.scene.export({
          fileName: e
        }, null, i, s), ue();
        break;
    }
  };
  b(o) ? D.isImage(o?.imgURL).then(J => {
    Ne(J);
  }).catch(J => {
    console.error(J);
  }) : Ne();
}
class I extends cu {
  static #e = bs;
  static #t = 0;
  static #n = {};
  static #r = {};
  static #i = null;
  static #s = !1;
  static #l = [];
  static #o = null;
  static #c = null;
  static #a = !1;
  static get version() {
    return I.#e;
  }
  static get talibPromise() {
    return I.#i;
  }
  static get talibReady() {
    return I.#s;
  }
  static get talibAwait() {
    return I.#l;
  }
  static get talibError() {
    return I.#o;
  }
  static get webWorkers() {
    return Me;
  }
  static get TALibWorker() {
    return I.#c;
  }
  static #h = `${It} requires "talib-web" to function properly. Without it, some features maybe missing or broken.`;
  static #d = ["TradeXchart", "Chart", "MainPane", "Secondary", "Primary", "ScaleBar", "Timeline", "ToolsBar", "UtilsBar", "Widgets"];
  #u = It;
  #m = _t;
  #y;
  #g;
  #b;
  #w;
  #p;
  #S;
  #C;
  #f;
  #E;
  #x;
  #O;
  #M;
  #L = !1;
  #T = null;
  #A = k;
  #P;
  #v;
  #R = xo;
  #k;
  #N;
  #V;
  chartWMin = Si;
  chartHMin = st;
  chartW_Reactive = !0;
  chartH_Reactive = !0;
  chartBGColour = H.COLOUR_BG;
  chartTxtColour = H.COLOUR_TXT;
  chartBorderColour = H.COLOUR_BORDER;
  utilsH = je;
  toolsW = qe;
  timeH = Mi;
  scaleW = gt;
  #I;
  #z;
  #D = {
    chart: {},
    time: {}
  };
  #W;
  panes = {
    utils: this.#I,
    tools: this.#z,
    main: this.#D
  };
  #_ = {
    range: {},
    timeFrameMS: 0,
    timeFrame: "undefined",
    timeZone: "",
    indexed: !1
  };
  logs = !1;
  infos = !1;
  warnings = !1;
  errors = !1;
  timer = !1;
  #H = 0;
  #Z = 0;
  #F = {
    x: 0,
    y: 0
  };
  #j = [!1, !1, !1];
  #G;
  #Y;
  #$;
  #q;
  #X;
  #K;
  #U = !1;
  #B = !1;
  static create(e = {}) {
    I.#t == 0 && (I.#n.CPUCores = navigator.hardwareConcurrency, I.#n.api = {
      permittedClassNames: I.#d
    }), (typeof e.talib != "object" || typeof e.talib.init != "function") && (I.#s = !1, I.#o = new Error(`${I.#h}`)), !I.#s && I.#o === null && (I.#i = e.talib.init(e.wasm), I.#i.then(() => {
      I.#s = !0;
      for (let i of I.#l) U(i) && i();
    }, () => {
      I.#s = !1;
    }));
  }
  static destroy(e) {
    if (e instanceof I) {
      e.end();
      const i = e.inCnt;
      delete I.#r[i];
    }
  }
  static cnt() {
    return I.#t++;
  }
  constructor() {
    super(), this.#T = I.cnt(), console.warn(`!WARNING!: ${It} changes to config format, for details please refer to https://github.com/tradex-app/TradeX-chart/blob/master/docs/notices.md`), this.log(`${_t} instance count: ${this.inCnt}`), this.oncontextmenu = window.oncontextmenu, this.#Y = Me;
  }
  log(...e) {
    this.logs && console.log(...e);
  }
  info(...e) {
    this.infos && console.info(...e);
  }
  warn(...e) {
    this.warnings && console.warn(...e);
  }
  error(e) {
    this.errors && console.error(e);
  }
  time(e) {
    this.timer && console.time(e);
  }
  timeLog(e) {
    this.timer && console.timeLog(e);
  }
  timeEnd(e) {
    this.timer && console.timeEnd(e);
  }
  get version() {
    return I.version;
  }
  get name() {
    return this.#u;
  }
  get shortName() {
    return this.#m;
  }
  get options() {
    return this.#b;
  }
  get config() {
    return this.#g;
  }
  get core() {
    return this.#y;
  }
  get inCnt() {
    return this.#T;
  }
  set elUtils(e) {
    this.#p = e;
  }
  get elUtils() {
    return this.#p;
  }
  set elTools(e) {
    this.#C = e;
  }
  get elTools() {
    return this.#C;
  }
  set elBody(e) {
    this.#S = e;
  }
  get elBody() {
    return this.#S;
  }
  set elMain(e) {
    this.#f = e;
  }
  get elMain() {
    return this.#f;
  }
  set elTime(e) {
    this.#x = e;
  }
  get elTime() {
    return this.#x;
  }
  set elYAxis(e) {
    this.#O = e;
  }
  get elYAxis() {
    return this.#O;
  }
  set elWidgetsG(e) {
    this.#M = e;
  }
  get elWidgetsG() {
    return this.#M;
  }
  get UtilsBar() {
    return this.#I;
  }
  get ToolsBar() {
    return this.#z;
  }
  get MainPane() {
    return this.#D;
  }
  get Timeline() {
    return this.#D.time;
  }
  get WidgetsG() {
    return this.#W;
  }
  get Chart() {
    return this.#D.chart;
  }
  get ChartPanes() {
    return this.#D.chartPanes;
  }
  get Indicators() {
    return this.#D.indicators;
  }
  get ready() {
    return this.#L;
  }
  get state() {
    return this.#P;
  }
  get allData() {
    return {
      data: this.state.data.chart.data,
      primaryPane: this.state.data.secondary,
      secondaryPane: this.state.data.secondary,
      datasets: this.state.data.datasets
    };
  }
  get rangeLimit() {
    return T(this.#v.initialCnt) ? this.#v.initialCnt : ja;
  }
  get range() {
    return this.#v;
  }
  get time() {
    return this.#_;
  }
  get TimeUtils() {
    return Ca;
  }
  get theme() {
    return this.#N;
  }
  get settings() {
    return this.state.data.chart.settings;
  }
  get indicatorClasses() {
    return this.#R;
  }
  get TALib() {
    return this.#k;
  }
  get TALibReady() {
    return I.talibReady;
  }
  get TALibError() {
    return I.talibError;
  }
  get talibAwait() {
    return I.talibAwait;
  }
  get TALibPromise() {
    return I.talibPromise;
  }
  get candleW() {
    return this.Timeline.candleW;
  }
  get candlesOnLayer() {
    return this.Timeline.candlesOnLayer;
  }
  get buffer() {
    return this.MainPane.buffer;
  }
  get bufferPx() {
    return this.MainPane.bufferPx;
  }
  set scrollPos(e) {
    this.setScrollPos(e);
  }
  get scrollPos() {
    return this.#H;
  }
  get smoothScrollOffset() {
    return 0;
  }
  get rangeScrollOffset() {
    return Math.floor(this.bufferPx / this.candleW);
  }
  get mousePos() {
    return this.#F;
  }
  get pointerButtons() {
    return this.#j;
  }
  get pricePrecision() {
    return this.#X;
  }
  get volumePrecision() {
    return this.#K;
  }
  set stream(e) {
    return this.setStream(e);
  }
  get stream() {
    return this.#$;
  }
  get worker() {
    return this.#Y;
  }
  get isEmpty() {
    return this.#P.IsEmpty;
  }
  set candles(e) {
    b(e) && (this.#q = e);
  }
  get candles() {
    return this.#q;
  }
  get progress() {
    return this.#G;
  }
  start(e) {
    this.log(`${It} configuring...`), I.create(e);
    const i = {
      ...e
    };
    this.logs = i?.logs ? i.logs : !1, this.infos = i?.infos ? i.infos : !1, this.warnings = i?.warnings ? i.warnings : !1, this.errors = i?.errors ? i.errors : !1, this.timer = i?.timer ? i.timer : !1, this.#g = i, this.#T = i.cnt || this.#T, this.#k = i.talib, this.#w = this, this.#y = this, "theme" in i || (i.theme = Rr);
    const s = E(i?.id) ? i.id : null;
    this.setID(s), this.classList.add(this.id), this.log("processing state...");
    let n = ce(i?.state) || {};
    n.id = this.id, n.core = this;
    let o = i?.deepValidate || !1,
      a = i?.isCrypto || !1;
    this.#P = this.#A.create(n, o, a), delete i.state, this.log(`${this.name} id: ${this.id} : created with a ${this.state.status} state`);
    let l = "1s",
      h = z;
    if (!b(i?.stream) && this.state.data.chart.data.length < 2 ? (this.warn(`${It} has no chart data or streaming provided.`), ({
      tf: l,
      ms: h
    } = di(i?.timeFrame))) : b(i?.stream) && this.state.data.chart.data.length < 2 ? (({
      tf: l,
      ms: h
    } = di(i?.timeFrame)), this.#U = !0) : (l = this.state.data.chart.tf, h = this.state.data.chart.tfms), this.log(`tf: ${l} ms: ${h}`), this.#g.callbacks = this.#g.callbacks || {}, b(i)) for (const g in i) g in this.props() && this.props()[g](i[g]);
    const m = b(i?.range) ? i.range : {};
    if (m.interval = h, m.core = this, this.getRange(null, null, m), this.#v.Length > 1) {
      const g = ps(this.#_, this.#g?.range?.startTS),
        v = T(g) ? g + this.#v.initialCnt : this.allData.data.length - 1,
        S = T(g) ? g : v - this.#v.initialCnt;
      this.#v.initialCnt = v - S, this.setRange(S, v), i.range?.center && this.jumpToIndex(S, !0, !0);
    }
    this.insertAdjacentHTML("beforebegin", `<style title="${this.id}_style"></style>`), this.#W = new hm(this, {
      widgets: i?.widgets
    }), this.#I = new om(this, i), this.#z = new eo(this, i), this.#D = new Qr(this, i), this.setTheme(this.#V.id), this.log(`${this.#u} V${I.version} configured and running...`), this.#H = this.bufferPx * -1, this.eventsListen(), this.elStart(this.theme), this.elBody.start(this.theme), this.UtilsBar.start(), this.ToolsBar.start(), this.MainPane.start(), this.WidgetsG.start(), this.#G = this.WidgetsG.insert("Progress", {}), this.stream = this.#g.stream, this.#U && this.on(_e, this.delayedSetRange, this), this.#L = !0, this.refresh();
  }
  destroy() {
    this.log("...cleanup the mess"), this.removeEventListener("mousemove", this.onMouseMove), this.UtilsBar.destroy(), this.ToolsBar.destroy(), this.MainPane.destroy(), this.WidgetsG.destroy(), this.#Y.end(), this.#A = null;
  }
  eventsListen() {
    this.addEventListener("mousemove", this.onMouseMove.bind(this)), this.on(_e, this.onStreamUpdate, this), this.on("state_mergeComplete", () => this.#G.stop());
  }
  onMouseMove(e) {
    this.#F.x = e.clientX, this.#F.y = e.clientY;
  }
  onStreamUpdate(e) {
    const i = this.range;
    if (i.inRange(e[0])) {
      const s = i.valueMax,
        n = i.valueMin;
      (e[2] > s || e[3] < n) && (this.setRange(i.indexStart, i.indexEnd), this.emit("chart_yAxisRedraw", this.range));
    }
  }
  props() {
    return {
      width: e => this.setWidth(e),
      height: e => this.setHeight(e),
      widthMin: e => this.setWidthMin(e),
      heightMin: e => this.setHeightMin(e),
      widthMax: e => this.setWidthMax(e),
      heightMax: e => this.setHeightMax(e),
      logs: e => this.logs = K(e) ? e : !1,
      infos: e => this.infos = K(e) ? e : !1,
      warnings: e => this.warnings = K(e) ? e : !1,
      errors: e => this.errors = K(e) ? e : !1,
      indicators: e => this.setIndicators(e),
      theme: e => {
        this.#V = this.addTheme(e);
      },
      stream: e => this.#$ = b(e) ? e : {},
      pricePrecision: e => this.setPricePrecision(e),
      volumePrecision: e => this.setVolumePrecision(e)
    };
  }
  getInCnt() {
    return this.#T;
  }
  setID(e) {
    E(e) ? this.id = e : this.id = `${Z(_t)}_${this.#T}`;
  }
  setTitle(e) {
    this.Chart.setTitle(e);
  }
  setWatermark(e) {
    this.Chart.setWatermark(e);
  }
  setDimensions(e, i) {
    const s = super.setDimensions(e, i);
    this.emit("global_resize", s);
  }
  setUtilsH(e) {
    this.utilsH = e, this.#p.style.height = `${e}px`;
  }
  setToolsW(e) {
    this.toolsW = e, this.#C.style.width = `${e}px`;
  }
  setPricePrecision(e) {
    (!T(e) || e < 0) && (e = il), this.#X = e;
  }
  setVolumePrecision(e) {
    (!T(e) || e < 0) && (e = sl), this.#K = e;
  }
  addTheme(e) {
    const i = Se.create(e, this);
    return this.#N instanceof Se || (this.#N = i), i;
  }
  setTheme(e) {
    if (!this.theme.list.has(e)) return !1;
    this.#N.setTheme(e, this);
    const i = this.#N,
      s = document.querySelector(`style[title=${this.id}_style]`),
      n = `var(--txc-border-color, ${i.chart.BorderColour}`;
    let o = `.${this.id} { `;
    o += `--txc-background: ${i.chart.Background}; `, this.style.background = `var(--txc-background, ${i.chart.Background})`, this.style.border = `${i.chart.BorderThickness}px solid`, this.style.borderColor = n, o += `--txc-border-color:  ${i.chart.BorderColour}; `, this.#f.rows.style.borderColor = n, o += `--txc-time-scrollbar-color: ${i.chart.BorderColour}; `, o += `--txc-time-handle-color: ${i.xAxis.handle}; `, o += `--txc-time-slider-color: ${i.xAxis.slider}; `, o += `--txc-time-cursor-fore: ${i.xAxis.colourCursor}; `, o += `--txc-time-cursor-back: ${i.xAxis.colourCursorBG}; `, o += `--txc-time-icon-color: ${i.icon.colour}; `, o += `--txc-time-icon-hover-color: ${i.icon.hover}; `, this.#x.overview.scrollBar.style.borderColor = n, this.#x.overview.handle.style.backgroundColor = `var(--txc-time-handle-color, ${i.xAxis.handle})`, this.#x.overview.style.setProperty("--txc-time-slider-color", i.xAxis.slider), this.#x.overview.style.setProperty("--txc-time-icon-color", i.icon.colour), this.#x.overview.style.setProperty("--txc-time-icon-hover-color", i.icon.hover);
    for (let [a, l] of Object.entries(this.Chart.legend.list)) l.el.style.color = `var(--txc-legend-color, ${i.legend.colour})`, l.el.style.font = `var(--txc-legend-font, ${i.legend.font})`;
    for (let a of this.#p.icons) a.className == "icon-wrapper" && (a.children[0].style.fill = i.icon.colour);
    for (let a of this.#C.icons) a.className == "icon-wrapper" && (a.children[0].style.fill = i.icon.colour);
    return o += " }", s.innerHTML = o, !0;
  }
  setScrollPos(e) {
    e = Math.round(e), T(e) && e <= 0 && e >= this.bufferPx * -1 ? this.#H = e : this.emit("Error", "setScrollPos: not a valid value");
  }
  setState(e) {
    if (!k.has(e)) return this.warn(`${this.name} id: ${this.id} : Specified state does not exist`), !1;
    if (e === this.key) return !0;
    this.stream.stop(), this.MainPane.reset(), this.#P = k.get(e);
    const i = {
      interval: this.#P.data.chart.tfms,
      core: this
    };
    if (this.getRange(null, null, i), this.range.Length > 1) {
      const s = ps(this.time, void 0),
        n = s ? s + this.range.initialCnt : this.#P.data.chart.data.length - 1,
        o = s || n - this.range.initialCnt;
      this.range.initialCnt = n - o, this.setRange(o, n);
    }
    this.MainPane.restart(), this.refresh();
  }
  createState(e, i, s) {
    return this.state.create(e, i, s);
  }
  deleteState(e) {
    return this.state.delete(e);
  }
  exportState(e = this.key, i = {}) {
    return this.state.export(e = this.key, i = {});
  }
  setStream(e) {
    if (this.stream instanceof mt) return this.error("Error: Invoke stopStream() before starting a new one."), !1;
    if (b(e)) return this.allData.data.length == 0 && E(e.timeFrame) && (({
      tf,
      ms
    } = di(e?.timeFrame)), this.range.interval = ms, this.range.intervalStr = tf, this.#_.timeFrameMS = ms, this.#_.timeFrame = tf), this.#$ = new mt(this), this.#g.stream = this.#$.config, this.#$;
  }
  stopStream() {
    this.stream instanceof mt && this.stream.stop();
  }
  delayedSetRange() {
    for (; this.#U;) {
      let e = this.range.Length * 0.5;
      this.setRange(e * -1, e), this.off(_e, this.delayedSetRange), this.#U = !1;
    }
  }
  updateRange(e) {
    if (!M(e) || !T(e[4]) || e[4] == 0) return;
    let i, s;
    i = e[4], s = this.#H + i, s % this.candleW, s < this.bufferPx * -1 ? (s = 0, this.offsetRange(this.rangeScrollOffset * -1)) : s > 0 && (s = this.bufferPx * -1, this.offsetRange(this.rangeScrollOffset)), this.#H = s, this.emit("scrollUpdate", s);
  }
  offsetRange(e) {
    let i = this.range.indexStart - e,
      s = this.range.indexEnd - e;
    this.setRange(i, s);
  }
  getRange(e = 0, i = 0, s = {}) {
    this.#v = new us(e, i, s), this.#_.range = this.#v, this.#_.timeFrameMS = this.#v.interval, this.#_.timeFrame = this.#v.intervalStr;
  }
  setRange(e = 0, i = this.rangeLimit) {
    const s = this.config?.maxCandles ? this.config.maxCandles : this.Chart?.layerWidth ? this.Chart.layerWidth : this.Chart.width;
    this.#v.set(e, i, s), e < 0 && !this.#B ? this.emit("range_limitPast", {
      chart: this,
      start: e,
      end: i
    }) : i > this.range.dataLength && !this.#B && this.emit("range_limitFuture", {
      chart: this,
      start: e,
      end: i
    });
  }
  jumpToIndex(e, i = !0, s = !0) {
    i && (e = _(e, 0, this.range.dataLength));
    let n = this.range.Length,
      o = e + n;
    s && (e -= n / 2, o -= n / 2), this.setRange(e, o);
  }
  jumpToTS(e, i = !0, s = !0) {
    let n = this.Timeline.xAxis.t2Index(e);
    this.jumpToIndex(n, i, s);
  }
  jumpToStart(e = !1) {
    this.jumpToIndex(0, !0, e);
  }
  jumpToEnd(e = !0) {
    let i = this.range.dataLength - this.range.Length;
    e && (i += this.range.Length / 2), this.jumpToIndex(i, !0, !1);
  }
  mergeData(e, i = !1, s = !1) {
    this.#B = !0;
    let n = this.state.mergeData(e, i, s);
    return K(n) && (this.#B = !1), n;
  }
  isIndicator(e) {
    return !!(typeof e == "function" && "primaryPane" in e.prototype && U(e.prototype?.draw));
  }
  setIndicators(e, i = !1) {
    if (!b(e)) return !1;
    i && (console.warn("Expunging all default indicators!"), this.#R = {});
    for (const [s, n] of Object.entries(e)) E(n?.id) && E(n?.name) && E(n?.event) && this.isIndicator(n?.ind) && (this.#R[s] = n);
    return !0;
  }
  addIndicator(e, i = e, s = {}) {
    return this.#D.addIndicator(e, i, s);
  }
  getIndicator(e) {
    return this.#D.getIndicator(e);
  }
  removeIndicator(e) {
    return this.#D.removeIndicator(e);
  }
  indicatorSettings(e, i) {
    return this.#D.indicatorSettings(e, i);
  }
  hasStateIndicator(e, i = "searchAll") {
    if (!E(e) || !E(i)) return !1;
    const s = function (n, o) {
      for (let a of o) return a?.id == n || a?.name == n;
    };
    if (i == "searchAll") {
      for (let n of this.allData) if (s(e, n)) return !0;
      return !1;
    } else if (i in this.allData) return s(e, d);
  }
  async calcAllIndicators(e) {
    const i = [],
      s = n => new Promise(o => setTimeout(() => {
        o(n());
      }, 0));
    for (const [n, o] of Object.entries(this.Indicators)) for (const [a, l] of Object.entries(o)) i.push(l.instance.calcIndicatorHistory.bind(l.instance, e));
    await Promise.all(i.map(async n => {
      s(n);
    })), this.refresh();
  }
  addTrade(e) {
    return this.#A.addTrade(e);
  }
  removeTrade(e) {
    return this.#A.removeTrade(e);
  }
  addEvent(e) {
    return this.#A.addEvent(e);
  }
  removeEvent(e) {
    return this.#A.removeEvent(e);
  }
  resize(e, i) {
    return !T(e) && !T(i) ? !1 : (this.setDimensions(e, i), !0);
  }
  refresh() {
    if (!this.ready) return;
    let e = this.range.indexStart,
      i = this.range.indexEnd;
    this.setRange(e, i), this.#D.draw(void 0, !0);
  }
  toImageURL(e, i, s, n) {
    return rr(this, e, i, s, "url", n);
  }
  downloadImage(e = `${this.id}.png`, i, s, n) {
    rr(this, e, i, s, "download", n);
  }
  notImplemented() {
    if (this.implemented) this.implemented.open();else {
      let i = {
        content: `
        This feature is not implemented yet.
      `,
        styles: {
          content: {
            padding: "1em"
          }
        }
      };
      this.implemented = this.#W.insert("Dialogue", i), this.implemented.start();
    }
  }
}
exports.Chart = I;
window.customElements.get("tradex-chart") || (document.head.insertAdjacentHTML("beforeend", Rh), document.head.insertAdjacentHTML("beforeend", kh), customElements.get("tradex-chart") || customElements.define("tradex-chart", I));
},{"process":"node_modules/process/browser.js"}],"node_modules/path-browserify/index.js":[function(require,module,exports) {
var process = require("process");
// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, A