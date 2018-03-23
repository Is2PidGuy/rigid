/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__keys__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shape__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__math__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__styles_css__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__styles_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__styles_css__);








const root = document.getElementById('root');
const w = root.clientWidth;
const h = root.clientHeight;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = w;
canvas.height = h;

const drawLine = (a, b, color = 'black', width = 1) => {
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
};

const drawRect = (rect, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    const [a, b, c, d] = rect.points;
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.lineTo(c.x, c.y);
    ctx.lineTo(d.x, d.y);
    ctx.lineTo(a.x, a.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
    ctx.fill();
};

const drawCircle = (c, color) => {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.ellipse(c.center.x, c.center.y, c.radius, c.radius, 0, 0, 2 * Math.PI);
    ctx.fill();
};

class Ball {
    constructor(x, y, r) {
        this.center = Object(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* vec */])(x, y);
        this.r = r;
        this.vel = Object(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* vec */])(0, 0);
    }

    project(axis) {
        const mid = Object(__WEBPACK_IMPORTED_MODULE_2__math__["d" /* dot */])(axis, this.center);
        return {
            min: mid - this.r,
            max: mid + this.r,
        };
    }
}

class Rect {
    constructor(a, b, c, d, fixed) {
        this.points = [a, b, c, d];
        this.vel = Object(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* vec */])(0, 0);
        this.fixed = fixed;
    }

    project(axis) {
        let l = 10000000;
        let r = -10000000;
        this.points.forEach((d) => {
            const p = Object(__WEBPACK_IMPORTED_MODULE_2__math__["d" /* dot */])(axis, d);
            l = Math.min(l, p);
            r = Math.max(r, p);
        });
        return {
            min: l,
            max: r,
        };
    }
}

const getRc = (sx, sy, W, H, fixed = false) => {
    const a = Object(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* vec */])(sx - W / 2, sy - H / 2);
    const b = Object(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* vec */])(sx + W / 2, sy - H / 2);
    const c = Object(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* vec */])(sx + W / 2, sy + H / 2);
    const d = Object(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* vec */])(sx - W / 2, sy + H / 2);
    return new Rect(a, b, c, d, fixed);
};

const fh = 30;
const objects = [
    getRc(w / 2, h - fh / 2, w, fh, true),
];

let down, cur;
document.addEventListener('mousedown', e => {
    cur = down = Object(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* vec */])(e.pageX, e.pageY);
});

document.addEventListener('mouseup', e => {
    const up = Object(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* vec */])(e.pageX, e.pageY);
    const rc = getRc(down.x, down.y, 40, 40);
    const r = () => Math.floor(Math.random() * 255);
    rc.color = `rgba(${r()}, ${r()}, ${r()}, 0.5)`;
    rc.vel = Object(__WEBPACK_IMPORTED_MODULE_2__math__["f" /* scale */])(Object(__WEBPACK_IMPORTED_MODULE_2__math__["g" /* sub */])(down, up), 0.05);
    objects.push(rc);
    down = false;
});

document.addEventListener('mousemove', e => {
    if (down) {
        cur = Object(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* vec */])(e.pageX, e.pageY);
    }
});

const penetration = (axis, bodyA, bodyB) => {
    const a = bodyA.project(axis);
    const b = bodyB.project(axis);
    const l = Math.max(a.min, b.min);
    const r = Math.min(a.max, b.max);
    return l <= r ? r - l : 0;
};

const checkCollision = (bodyA, bodyB, axes) => {
    if (axes.length === 0) return false;
    let minp = 9999999;
    let paxis;
    let coll = true;
    axes.forEach(axis => {
        const p = penetration(axis.axis, bodyA, bodyB);
        if (p === 0) {
            coll = false;
        }
        if (p < minp) {
            minp = p;
            paxis = axis;
        }
    });
    if (!coll) return false;
    return { axis: paxis, penetration: minp };
};

const collision = (rectA, rectB) => {
    const axes = [];
    const v = Object(__WEBPACK_IMPORTED_MODULE_2__math__["e" /* normalize */])(Object(__WEBPACK_IMPORTED_MODULE_2__math__["g" /* sub */])(Object(__WEBPACK_IMPORTED_MODULE_2__math__["b" /* centroid */])(rectA.points), Object(__WEBPACK_IMPORTED_MODULE_2__math__["b" /* centroid */])(rectB.points)));
    [rectA, rectB].forEach(p => {
        const pts = p.points;
        for (let i = 0; i < pts.length; i += 1) {
            const n = (i + 1) % pts.length;
            const a = Object(__WEBPACK_IMPORTED_MODULE_2__math__["e" /* normalize */])(Object(__WEBPACK_IMPORTED_MODULE_2__math__["g" /* sub */])(pts[i], pts[n]));
            let normal = Object(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* vec */])(a.y, -a.x);
            if (Object(__WEBPACK_IMPORTED_MODULE_2__math__["d" /* dot */])(normal, v) < 0) {
                normal = Object(__WEBPACK_IMPORTED_MODULE_2__math__["f" /* scale */])(normal, -1);
            }
            axes.push({ axis: normal });
        }
    });
    return checkCollision(rectA, rectB, axes);
};

const resolve = (points, axis, penetration) => {
    return points.map(d => {
        return Object(__WEBPACK_IMPORTED_MODULE_2__math__["a" /* add */])(d, Object(__WEBPACK_IMPORTED_MODULE_2__math__["f" /* scale */])(axis, penetration));
    });
};

setInterval(
    () => {
        // if (keys['ArrowLeft']) {
        //     rc.vel.x -= 0.2;
        // }
        // if (keys['ArrowRight']) {
        //     rc.vel.x += 0.2;
        // }
        // if (keys[' ']) {
        //     if (lcoll) {
        //         rc.vel.y -= 8;
        //     }
        // }
        // if (keys['ArrowUp']) {
        //     rc.vel.y -= 0.2;
        // }
        // if (keys['ArrowDown']) {
        //     rc.vel.y += 0.2;
        // }
        // rc.vel.y += 0.1;
        // rc.vel = scale(rc.vel, 0.99);
        objects.forEach(d => {
            if (d.fixed) return;
            d.vel = Object(__WEBPACK_IMPORTED_MODULE_2__math__["a" /* add */])(d.vel, Object(__WEBPACK_IMPORTED_MODULE_2__math__["f" /* scale */])(Object(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* vec */])(0, 1), 0.08));
            d.vel = Object(__WEBPACK_IMPORTED_MODULE_2__math__["f" /* scale */])(d.vel, 0.99);
            d.points = resolve(d.points, d.vel, 1);
        });
        for (let i = 0; i < objects.length; i += 1) {
            for (let j = i + 1; j < objects.length; j += 1) {
                const a = objects[i];
                const b = objects[j];
                const c = collision(a, b);
                if (c) {
                    const { axis, penetration } = c;
                    const s = 1;
                    if (a.fixed || b.fixed) {
                        const sgn = c.id === 0 ? 1 : -1;
                        if (a.fixed) {
                            b.points = resolve(b.points, axis.axis, -sgn * penetration * s);
                            const dt = Object(__WEBPACK_IMPORTED_MODULE_2__math__["d" /* dot */])(b.vel, axis.axis);
                            if (dt < 0) {
                                b.vel = Object(__WEBPACK_IMPORTED_MODULE_2__math__["a" /* add */])(b.vel, Object(__WEBPACK_IMPORTED_MODULE_2__math__["f" /* scale */])(axis.axis, -1.5 * dt));
                            }
                        } else {
                            a.vel = Object(__WEBPACK_IMPORTED_MODULE_2__math__["f" /* scale */])(a.vel, -0.5);
                            a.points = resolve(a.points, axis.axis, -sgn * penetration * s);
                        }
                    } else {
                        let mA = Object(__WEBPACK_IMPORTED_MODULE_2__math__["c" /* distance */])(a.vel, Object(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* vec */])(0, 0));
                        let mB = Object(__WEBPACK_IMPORTED_MODULE_2__math__["c" /* distance */])(b.vel, Object(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* vec */])(0, 0));
                        let tot = mA + mB;
                        if (true) {
                            mA = 0.5;
                            mB = 0.5;
                        } else {
                            mA = mA / tot;
                            mB = mB / tot;
                        }
                        const adt = Object(__WEBPACK_IMPORTED_MODULE_2__math__["d" /* dot */])(a.vel, axis.axis);
                        const bdt = Object(__WEBPACK_IMPORTED_MODULE_2__math__["d" /* dot */])(b.vel, axis.axis);
                        // swap the normal component of the velocities of a and b (since masses are equal)
                        a.vel = Object(__WEBPACK_IMPORTED_MODULE_2__math__["a" /* add */])(a.vel, Object(__WEBPACK_IMPORTED_MODULE_2__math__["f" /* scale */])(axis.axis, -adt + bdt));
                        b.vel = Object(__WEBPACK_IMPORTED_MODULE_2__math__["a" /* add */])(b.vel, Object(__WEBPACK_IMPORTED_MODULE_2__math__["f" /* scale */])(axis.axis, -bdt + adt));
                        a.points = resolve(a.points, axis.axis, -mA * penetration * s);
                        b.points = resolve(b.points, axis.axis, mB * penetration * s);
                    }
                }
            }
        }

        // render
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, w, h);
        objects.forEach(d => {
            drawRect(d, d.color);
        });
        if (down) {
            drawLine(down, cur, 'green', 3);
        }
    },
    20,
);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const keys = {};

document.addEventListener('keydown', (e) => {
        keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
        keys[e.key] = false;
});

/* unused harmony default export */ var _unused_webpack_default_export = (keys);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Rect {
    constructor(a, b, c, d) {
        this.points = [a, b, c, d];
        this.vel = { x: 0, y: 0 };
    }
}

/* unused harmony default export */ var _unused_webpack_default_export = (Rect);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by uttam on 3/18/18.
 */

const intersect = (a1, a2, b1, b2) => {
    const pq = sub(a1, b1);
    const r = sub(a1, a2);
    const s = sub(b1, b2);
    const d = r.x * s.y - r.y * s.x;
    if (d === 0) return -1;
    const u =  (pq.x * r.y - pq.y * r.x) / d;
    if (u < 0 || u > 1) return -1;
    const t =  (pq.x * s.y - pq.y * s.x) / d;
    return Math.abs(t) < 1e-4 ? 0 : t;
};
/* unused harmony export intersect */


const distance = (p1, p2) => {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);
};
/* harmony export (immutable) */ __webpack_exports__["c"] = distance;


const add = (p1, p2) => {
    return vec(p1.x + p2.x, p1.y + p2.y);
};
/* harmony export (immutable) */ __webpack_exports__["a"] = add;


const sub = (p1, p2) => {
    return vec(p2.x - p1.x, p2.y - p1.y);
};
/* harmony export (immutable) */ __webpack_exports__["g"] = sub;


const dot = (p1, p2) => {
    return p1.x * p2.x + p1.y * p2.y;
};
/* harmony export (immutable) */ __webpack_exports__["d"] = dot;


const normalize = (p) => {
    let h = Math.hypot(p.x, p.y);
    if (h === 0) h = 1;
    return vec(p.x / h, p.y / h);
};
/* harmony export (immutable) */ __webpack_exports__["e"] = normalize;


const perpendicular = (p1, p2, p) => {
    const dist = distance(p1, p2);
    let v = sub(p1, p2);
    v = vec(v.x / dist, v.y / dist);
    let normal = vec(v.y, -v.x);
    const l = sub(p1, p);
    // if (dot(normal, l) < 0) {
    //     normal = { x: -normal.x, y: -normal.y };
    // }
    const dist2 = Math.abs(dot(l, normal));
    const proj = dot(v, l);
    const point = add(scale(v, proj), p1);
    return {
        distance: dist2,
        point,
        outOfBounds: proj < 0 || proj > dist,
    };
};
/* unused harmony export perpendicular */


const getDistance = (p1, p2, pt) => {
    let mind = distance(p1, pt);
    let np = p1;
    let d = distance(p2, pt);
    if (d < mind) {
        mind = d;
        np = p2;
    }
    d = perpendicular(p1, p2, pt);
    if (!d.outOfBounds && d.distance < mind) {
        mind = d.distance;
        np = d.point;
    }
    return {
        distance: mind,
        line: {
            p1: np,
            p2: pt,
        },
    };
};
/* unused harmony export getDistance */


const centroid = (points) => {
    let x = 0;
    let y = 0;
    points.forEach(d => {
        x += d.x;
        y += d.y;
    });
    return vec(x / points.length, y / points.length);
};
/* harmony export (immutable) */ __webpack_exports__["b"] = centroid;


const scale = (v, f) => {
    return vec(v.x * f, v.y * f);
};
/* harmony export (immutable) */ __webpack_exports__["f"] = scale;


const vec = (x, y) => ({ x, y });
/* harmony export (immutable) */ __webpack_exports__["h"] = vec;




/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(7)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./styles.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./styles.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, "* {\n    margin: 0;\n    padding: 0;\n}\n\n#root {\n    width: 100vw;\n    height: 100vh;\n    overflow: hidden;\n}", ""]);

// exports


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(8);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);