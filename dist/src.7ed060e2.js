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
})({"../src/core/view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = void 0;

class View {
  setState(state) {
    this.state = { ...this.state,
      ...state
    };
    this.update();
  }

  update() {
    const tmp = this.render();
    const content = tmp.slice(tmp.indexOf('>') + 1, tmp.lastIndexOf('<'));
    document.querySelector('.' + this.selector).innerHTML = content;
    this.registerEventListeners();
  }

  registerComponents() {
    const components = this.components();
    components.forEach(component => {
      component.mount();
    });
  }

  registerEventListeners() {
    this.components().forEach(component => {
      const events = component.events();

      for (let key in events) {
        if (key !== 'window') {
          const el = document.querySelector(key);

          if (el !== null) {
            const params = events[key].split(' ');
            el.addEventListener(params[0], component[params[1]]);
          }
        } else {
          const params = events[key].split(' ');
          window.addEventListener(params[0], component[params[1]]);
        }
      }

      component.eventListeners();
    });
  }

  init(props) {
    this.props = props;
    return this.render();
  } // Public


  mount() {//
  }

  components() {
    return [];
  }

  events() {
    return {};
  }

  eventListeners() {//
  }

}

exports.View = View;
},{}],"../src/core/controller.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Controller = void 0;

class Controller {//
}

exports.Controller = Controller;
},{}],"../src/core/model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Model = void 0;

class Model {//
}

exports.Model = Model;
},{}],"../src/core/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "View", {
  enumerable: true,
  get: function () {
    return _view.View;
  }
});
Object.defineProperty(exports, "Controller", {
  enumerable: true,
  get: function () {
    return _controller.Controller;
  }
});
Object.defineProperty(exports, "Model", {
  enumerable: true,
  get: function () {
    return _model.Model;
  }
});

var _view = require("./view");

var _controller = require("./controller");

var _model = require("./model");
},{"./view":"../src/core/view.js","./controller":"../src/core/controller.js","./model":"../src/core/model.js"}],"../src/services/ls.api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class LsApi {
  constructor() {
    this.name = 'noteses';

    if (localStorage.getItem(this.name) === null) {
      localStorage.setItem(this.name, '{"notes": [], "theme": "light"}');
    }
  }

  getNotes() {
    return JSON.parse(localStorage.getItem(this.name)).notes;
  }

  addNote(note) {
    const noteses = JSON.parse(localStorage.getItem(this.name));
    noteses.notes.push(note);
    localStorage.setItem(this.name, JSON.stringify(noteses));
  }

  clearNotes() {
    const noteses = JSON.parse(localStorage.getItem(this.name));
    noteses.notes = [];
    localStorage.setItem(this.name, JSON.stringify(noteses));
  }

  getTheme() {
    return JSON.parse(localStorage.getItem(this.name)).theme;
  }

  saveTheme(theme) {
    const noteses = JSON.parse(localStorage.getItem(this.name));
    noteses.theme = theme;
    localStorage.setItem(this.name, JSON.stringify(noteses));
  }

}

var _default = new LsApi();

exports.default = _default;
},{}],"../src/models/notes.model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("../core");

var _ls = _interopRequireDefault(require("../services/ls.api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NotesModel extends _core.Model {
  constructor() {
    super();
    this.notes = _ls.default.getNotes();
  }

  async getAll() {
    return this.notes;
  }

  async addNote(note, cb) {
    _ls.default.addNote(note);

    this.notes = _ls.default.getNotes();
    cb();
  }

  async clearNotes(cb) {
    _ls.default.clearNotes();

    this.notes = _ls.default.getNotes();
    cb();
  }

}

var _default = new NotesModel();

exports.default = _default;
},{"../core":"../src/core/index.js","../services/ls.api":"../src/services/ls.api.js"}],"../src/views/navbar.view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("../core");

class NavbarView extends _core.View {
  constructor() {
    super();
    this.selector = 'navbar';
  }

  components() {
    return [this];
  }

  events() {
    return {
      '.dark-icon': 'click handleDarkIcon'
    };
  }

  handleDarkIcon = () => {
    this.props.switchTheme();
  };

  render() {
    return `
        <div class="${this.selector}">
          <h1 class="logo">notes</h1>
          <div class="icons">
            <i class="nord-icon"></i>
            <i class="material-icons dark-icon icon">opacity</i>
            <a target="_blank" href="https://github.com/dimitriy3" class="info icon" aria-label="GitHub">
              <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M8 0C3.58 0 0 3.582 0 8c0 3.535 2.292 6.533 5.47 7.59.4.075.547-.172.547-.385 0-.19-.007-.693-.01-1.36-2.226.483-2.695-1.073-2.695-1.073-.364-.924-.89-1.17-.89-1.17-.725-.496.056-.486.056-.486.803.056 1.225.824 1.225.824.714 1.223 1.873.87 2.33.665.072-.517.278-.87.507-1.07-1.777-.2-3.644-.888-3.644-3.953 0-.873.31-1.587.823-2.147-.09-.202-.36-1.015.07-2.117 0 0 .67-.215 2.2.82.64-.178 1.32-.266 2-.27.68.004 1.36.092 2 .27 1.52-1.035 2.19-.82 2.19-.82.43 1.102.16 1.915.08 2.117.51.56.82 1.274.82 2.147 0 3.073-1.87 3.75-3.65 3.947.28.24.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.14.46.55.38C13.71 14.53 16 11.53 16 8c0-4.418-3.582-8-8-8"/></svg>
            </a>
          </div>
        </div>
    `;
  }

}

var _default = new NavbarView();

exports.default = _default;
},{"../core":"../src/core/index.js"}],"../src/views/form.view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("../core");

class FormView extends _core.View {
  constructor() {
    super();
    this.selector = 'form';
  }

  components() {
    return [this];
  }

  events() {
    return {
      '.form': 'submit handleForm'
    };
  }

  handleForm = event => {
    event.preventDefault();
    const title = event.target.querySelector('.input').value;
    this.props.addNote({
      title
    }, this.props.setNotes);
    event.target.reset();
  };

  render() {
    return `
        <form class="${this.selector}">
          <input
            placeholder="Enter your note"
            autocomplete="off"
            class="input"
          >
        </form>
    `;
  }

}

var _default = new FormView();

exports.default = _default;
},{"../core":"../src/core/index.js"}],"../src/views/notes.view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("../core");

class NotesView extends _core.View {
  constructor() {
    super();
    this.selector = 'notes';
  }

  components() {
    return [this];
  }

  render() {
    const notesHTML = this.props.notes.map(({
      title
    }) => `
      <div class="note"><p class="note_input">${title}</p></div>
    `).join('');
    return `
        <div class="${this.selector}">
          ${notesHTML}
        </div>
    `;
  }

}

var _default = new NotesView();

exports.default = _default;
},{"../core":"../src/core/index.js"}],"../src/views/content.view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("../core");

var _notes = _interopRequireDefault(require("./notes.view"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ContentView extends _core.View {
  constructor() {
    super();
    this.state = {
      notes: []
    };
    this.selector = 'content';
  }

  components() {
    return [this, _notes.default];
  }

  events() {
    return {
      '.clear': 'click handleClear'
    };
  }

  handleClear = () => {
    this.props.clearNotes(this.setNotes.bind(this));
  };

  mount() {
    this.setNotes();
  }

  setNotes = () => {
    this.props.getAll().then(notes => {
      this.setState({
        notes
      });
    }).catch(e => console.log(e));
  };

  render() {
    const notes = _notes.default.init({
      notes: this.state.notes
    });

    const warn = `
      <div class="warn">
        <i class="material-icons img">note</i>
        <h1 class="no-notes">You haven't any notes yet</h1>
      </div>
    `;
    const clear = `<h3 class="clear">Clear</h3>`;
    return `
        <div class="${this.selector}">
          ${notes}
          <div class="info-area center">
            ${this.state.notes.length ? clear : warn}
          </div>
        </div>
    `;
  }

}

var _default = new ContentView();

exports.default = _default;
},{"../core":"../src/core/index.js","./notes.view":"../src/views/notes.view.js"}],"../src/views/app.view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("../core");

var _ls = _interopRequireDefault(require("../services/ls.api"));

var _navbar = _interopRequireDefault(require("./navbar.view"));

var _form = _interopRequireDefault(require("./form.view"));

var _content = _interopRequireDefault(require("./content.view"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppView extends _core.View {
  constructor() {
    super();
    this.selector = 'container';
  }

  components() {
    return [this, _navbar.default, _form.default, _content.default];
  }

  events() {
    return {
      'window': 'keydown handleDigit'
    };
  }

  handleDigit = e => {
    const focus = document.querySelector('.form .input');

    if (e.code === 'Digit1' && focus !== document.activeElement) {
      this.switchTheme();
    }

    if (e.code === 'Digit3' && focus !== document.activeElement) {
      this.props.clearNotes(_content.default.setNotes.bind(_content.default));
    }
  };
  switchTheme = () => {
    document.body.classList.remove('dark');

    _ls.default.saveTheme(_ls.default.getTheme() === 'dark' ? 'light' : 'dark');

    document.body.classList.add(_ls.default.getTheme());
  };

  render() {
    const {
      switchTheme
    } = this;
    const {
      addNote,
      getAll,
      clearNotes
    } = this.props;
    const {
      setNotes
    } = _content.default;

    const navbar = _navbar.default.init({
      switchTheme
    });

    const form = _form.default.init({
      addNote,
      setNotes
    });

    const content = _content.default.init({
      getAll,
      clearNotes
    });

    return `
      <div class="${this.selector}">
        ${navbar}
        <div class="center">
          ${form}
        </div>
        <hr>
        ${content}
      </div>
    `;
  }

}

var _default = new AppView();

exports.default = _default;
},{"../core":"../src/core/index.js","../services/ls.api":"../src/services/ls.api.js","./navbar.view":"../src/views/navbar.view.js","./form.view":"../src/views/form.view.js","./content.view":"../src/views/content.view.js"}],"../src/controllers/app.controller.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("../core");

var _notes = _interopRequireDefault(require("../models/notes.model"));

var _app = _interopRequireDefault(require("../views/app.view"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppController extends _core.Controller {
  appAction() {
    document.querySelector('#root').innerHTML = _app.default.init({
      getAll: _notes.default.getAll.bind(_notes.default),
      addNote: _notes.default.addNote.bind(_notes.default),
      clearNotes: _notes.default.clearNotes.bind(_notes.default)
    });

    _app.default.registerComponents();

    _app.default.registerEventListeners();
  }

}

var _default = new AppController();

exports.default = _default;
},{"../core":"../src/core/index.js","../models/notes.model":"../src/models/notes.model.js","../views/app.view":"../src/views/app.view.js"}],"../src/router.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _app = _interopRequireDefault(require("./controllers/app.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Router {
  dispatch(url) {
    switch (url) {
      case '/':
        _app.default.appAction();

        break;

      default:
        console.log('404');
    }
  }

}

var _default = new Router();

exports.default = _default;
},{"./controllers/app.controller":"../src/controllers/app.controller.js"}],"../src/index.js":[function(require,module,exports) {
"use strict";

var _router = _interopRequireDefault(require("./router"));

var _ls = _interopRequireDefault(require("./services/ls.api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_router.default.dispatch('/');

document.body.classList.add(_ls.default.getTheme());
},{"./router":"../src/router.js","./services/ls.api":"../src/services/ls.api.js"}],"../../../Users/DEMOH/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64308" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../Users/DEMOH/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/index.js"], null)
//# sourceMappingURL=/src.7ed060e2.js.map