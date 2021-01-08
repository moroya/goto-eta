(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SuperClusterAdapterLoader"] = factory();
	else
		root["SuperClusterAdapterLoader"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/kdbush/src/index.js":
/*!******************************************!*\
  !*** ./node_modules/kdbush/src/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return KDBush; });
/* harmony import */ var _sort__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sort */ "./node_modules/kdbush/src/sort.js");
/* harmony import */ var _range__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./range */ "./node_modules/kdbush/src/range.js");
/* harmony import */ var _within__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./within */ "./node_modules/kdbush/src/within.js");





const defaultGetX = p => p[0];
const defaultGetY = p => p[1];

class KDBush {
    constructor(points, getX = defaultGetX, getY = defaultGetY, nodeSize = 64, ArrayType = Float64Array) {
        this.nodeSize = nodeSize;
        this.points = points;

        const IndexArrayType = points.length < 65536 ? Uint16Array : Uint32Array;

        const ids = this.ids = new IndexArrayType(points.length);
        const coords = this.coords = new ArrayType(points.length * 2);

        for (let i = 0; i < points.length; i++) {
            ids[i] = i;
            coords[2 * i] = getX(points[i]);
            coords[2 * i + 1] = getY(points[i]);
        }

        Object(_sort__WEBPACK_IMPORTED_MODULE_0__["default"])(ids, coords, nodeSize, 0, ids.length - 1, 0);
    }

    range(minX, minY, maxX, maxY) {
        return Object(_range__WEBPACK_IMPORTED_MODULE_1__["default"])(this.ids, this.coords, minX, minY, maxX, maxY, this.nodeSize);
    }

    within(x, y, r) {
        return Object(_within__WEBPACK_IMPORTED_MODULE_2__["default"])(this.ids, this.coords, x, y, r, this.nodeSize);
    }
}


/***/ }),

/***/ "./node_modules/kdbush/src/range.js":
/*!******************************************!*\
  !*** ./node_modules/kdbush/src/range.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return range; });

function range(ids, coords, minX, minY, maxX, maxY, nodeSize) {
    const stack = [0, ids.length - 1, 0];
    const result = [];
    let x, y;

    while (stack.length) {
        const axis = stack.pop();
        const right = stack.pop();
        const left = stack.pop();

        if (right - left <= nodeSize) {
            for (let i = left; i <= right; i++) {
                x = coords[2 * i];
                y = coords[2 * i + 1];
                if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[i]);
            }
            continue;
        }

        const m = Math.floor((left + right) / 2);

        x = coords[2 * m];
        y = coords[2 * m + 1];

        if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[m]);

        const nextAxis = (axis + 1) % 2;

        if (axis === 0 ? minX <= x : minY <= y) {
            stack.push(left);
            stack.push(m - 1);
            stack.push(nextAxis);
        }
        if (axis === 0 ? maxX >= x : maxY >= y) {
            stack.push(m + 1);
            stack.push(right);
            stack.push(nextAxis);
        }
    }

    return result;
}


/***/ }),

/***/ "./node_modules/kdbush/src/sort.js":
/*!*****************************************!*\
  !*** ./node_modules/kdbush/src/sort.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return sortKD; });

function sortKD(ids, coords, nodeSize, left, right, depth) {
    if (right - left <= nodeSize) return;

    const m = (left + right) >> 1;

    select(ids, coords, m, left, right, depth % 2);

    sortKD(ids, coords, nodeSize, left, m - 1, depth + 1);
    sortKD(ids, coords, nodeSize, m + 1, right, depth + 1);
}

function select(ids, coords, k, left, right, inc) {

    while (right > left) {
        if (right - left > 600) {
            const n = right - left + 1;
            const m = k - left + 1;
            const z = Math.log(n);
            const s = 0.5 * Math.exp(2 * z / 3);
            const sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
            const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
            const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
            select(ids, coords, k, newLeft, newRight, inc);
        }

        const t = coords[2 * k + inc];
        let i = left;
        let j = right;

        swapItem(ids, coords, left, k);
        if (coords[2 * right + inc] > t) swapItem(ids, coords, left, right);

        while (i < j) {
            swapItem(ids, coords, i, j);
            i++;
            j--;
            while (coords[2 * i + inc] < t) i++;
            while (coords[2 * j + inc] > t) j--;
        }

        if (coords[2 * left + inc] === t) swapItem(ids, coords, left, j);
        else {
            j++;
            swapItem(ids, coords, j, right);
        }

        if (j <= k) left = j + 1;
        if (k <= j) right = j - 1;
    }
}

function swapItem(ids, coords, i, j) {
    swap(ids, i, j);
    swap(coords, 2 * i, 2 * j);
    swap(coords, 2 * i + 1, 2 * j + 1);
}

function swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}


/***/ }),

/***/ "./node_modules/kdbush/src/within.js":
/*!*******************************************!*\
  !*** ./node_modules/kdbush/src/within.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return within; });

function within(ids, coords, qx, qy, r, nodeSize) {
    const stack = [0, ids.length - 1, 0];
    const result = [];
    const r2 = r * r;

    while (stack.length) {
        const axis = stack.pop();
        const right = stack.pop();
        const left = stack.pop();

        if (right - left <= nodeSize) {
            for (let i = left; i <= right; i++) {
                if (sqDist(coords[2 * i], coords[2 * i + 1], qx, qy) <= r2) result.push(ids[i]);
            }
            continue;
        }

        const m = Math.floor((left + right) / 2);

        const x = coords[2 * m];
        const y = coords[2 * m + 1];

        if (sqDist(x, y, qx, qy) <= r2) result.push(ids[m]);

        const nextAxis = (axis + 1) % 2;

        if (axis === 0 ? qx - r <= x : qy - r <= y) {
            stack.push(left);
            stack.push(m - 1);
            stack.push(nextAxis);
        }
        if (axis === 0 ? qx + r >= x : qy + r >= y) {
            stack.push(m + 1);
            stack.push(right);
            stack.push(nextAxis);
        }
    }

    return result;
}

function sqDist(ax, ay, bx, by) {
    const dx = ax - bx;
    const dy = ay - by;
    return dx * dx + dy * dy;
}


/***/ }),

/***/ "./node_modules/supercluster/index.js":
/*!********************************************!*\
  !*** ./node_modules/supercluster/index.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Supercluster; });
/* harmony import */ var kdbush__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kdbush */ "./node_modules/kdbush/src/index.js");



const defaultOptions = {
    minZoom: 0,   // min zoom to generate clusters on
    maxZoom: 16,  // max zoom level to cluster the points on
    minPoints: 2, // minimum points to form a cluster
    radius: 40,   // cluster radius in pixels
    extent: 512,  // tile extent (radius is calculated relative to it)
    nodeSize: 64, // size of the KD-tree leaf node, affects performance
    log: false,   // whether to log timing info

    // whether to generate numeric ids for input features (in vector tiles)
    generateId: false,

    // a reduce function for calculating custom cluster properties
    reduce: null, // (accumulated, props) => { accumulated.sum += props.sum; }

    // properties to use for individual points when running the reducer
    map: props => props // props => ({sum: props.my_value})
};

class Supercluster {
    constructor(options) {
        this.options = extend(Object.create(defaultOptions), options);
        this.trees = new Array(this.options.maxZoom + 1);
    }

    load(points) {
        const {log, minZoom, maxZoom, nodeSize} = this.options;

        if (log) console.time('total time');

        const timerId = `prepare ${  points.length  } points`;
        if (log) console.time(timerId);

        this.points = points;

        // generate a cluster object for each point and index input points into a KD-tree
        let clusters = [];
        for (let i = 0; i < points.length; i++) {
            if (!points[i].geometry) continue;
            clusters.push(createPointCluster(points[i], i));
        }
        this.trees[maxZoom + 1] = new kdbush__WEBPACK_IMPORTED_MODULE_0__["default"](clusters, getX, getY, nodeSize, Float32Array);

        if (log) console.timeEnd(timerId);

        // cluster points on max zoom, then cluster the results on previous zoom, etc.;
        // results in a cluster hierarchy across zoom levels
        for (let z = maxZoom; z >= minZoom; z--) {
            const now = +Date.now();

            // create a new set of clusters for the zoom and index them with a KD-tree
            clusters = this._cluster(clusters, z);
            this.trees[z] = new kdbush__WEBPACK_IMPORTED_MODULE_0__["default"](clusters, getX, getY, nodeSize, Float32Array);

            if (log) console.log('z%d: %d clusters in %dms', z, clusters.length, +Date.now() - now);
        }

        if (log) console.timeEnd('total time');

        return this;
    }

    getClusters(bbox, zoom) {
        let minLng = ((bbox[0] + 180) % 360 + 360) % 360 - 180;
        const minLat = Math.max(-90, Math.min(90, bbox[1]));
        let maxLng = bbox[2] === 180 ? 180 : ((bbox[2] + 180) % 360 + 360) % 360 - 180;
        const maxLat = Math.max(-90, Math.min(90, bbox[3]));

        if (bbox[2] - bbox[0] >= 360) {
            minLng = -180;
            maxLng = 180;
        } else if (minLng > maxLng) {
            const easternHem = this.getClusters([minLng, minLat, 180, maxLat], zoom);
            const westernHem = this.getClusters([-180, minLat, maxLng, maxLat], zoom);
            return easternHem.concat(westernHem);
        }

        const tree = this.trees[this._limitZoom(zoom)];
        const ids = tree.range(lngX(minLng), latY(maxLat), lngX(maxLng), latY(minLat));
        const clusters = [];
        for (const id of ids) {
            const c = tree.points[id];
            clusters.push(c.numPoints ? getClusterJSON(c) : this.points[c.index]);
        }
        return clusters;
    }

    getChildren(clusterId) {
        const originId = this._getOriginId(clusterId);
        const originZoom = this._getOriginZoom(clusterId);
        const errorMsg = 'No cluster with the specified id.';

        const index = this.trees[originZoom];
        if (!index) throw new Error(errorMsg);

        const origin = index.points[originId];
        if (!origin) throw new Error(errorMsg);

        const r = this.options.radius / (this.options.extent * Math.pow(2, originZoom - 1));
        const ids = index.within(origin.x, origin.y, r);
        const children = [];
        for (const id of ids) {
            const c = index.points[id];
            if (c.parentId === clusterId) {
                children.push(c.numPoints ? getClusterJSON(c) : this.points[c.index]);
            }
        }

        if (children.length === 0) throw new Error(errorMsg);

        return children;
    }

    getLeaves(clusterId, limit, offset) {
        limit = limit || 10;
        offset = offset || 0;

        const leaves = [];
        this._appendLeaves(leaves, clusterId, limit, offset, 0);

        return leaves;
    }

    getTile(z, x, y) {
        const tree = this.trees[this._limitZoom(z)];
        const z2 = Math.pow(2, z);
        const {extent, radius} = this.options;
        const p = radius / extent;
        const top = (y - p) / z2;
        const bottom = (y + 1 + p) / z2;

        const tile = {
            features: []
        };

        this._addTileFeatures(
            tree.range((x - p) / z2, top, (x + 1 + p) / z2, bottom),
            tree.points, x, y, z2, tile);

        if (x === 0) {
            this._addTileFeatures(
                tree.range(1 - p / z2, top, 1, bottom),
                tree.points, z2, y, z2, tile);
        }
        if (x === z2 - 1) {
            this._addTileFeatures(
                tree.range(0, top, p / z2, bottom),
                tree.points, -1, y, z2, tile);
        }

        return tile.features.length ? tile : null;
    }

    getClusterExpansionZoom(clusterId) {
        let expansionZoom = this._getOriginZoom(clusterId) - 1;
        while (expansionZoom <= this.options.maxZoom) {
            const children = this.getChildren(clusterId);
            expansionZoom++;
            if (children.length !== 1) break;
            clusterId = children[0].properties.cluster_id;
        }
        return expansionZoom;
    }

    _appendLeaves(result, clusterId, limit, offset, skipped) {
        const children = this.getChildren(clusterId);

        for (const child of children) {
            const props = child.properties;

            if (props && props.cluster) {
                if (skipped + props.point_count <= offset) {
                    // skip the whole cluster
                    skipped += props.point_count;
                } else {
                    // enter the cluster
                    skipped = this._appendLeaves(result, props.cluster_id, limit, offset, skipped);
                    // exit the cluster
                }
            } else if (skipped < offset) {
                // skip a single point
                skipped++;
            } else {
                // add a single point
                result.push(child);
            }
            if (result.length === limit) break;
        }

        return skipped;
    }

    _addTileFeatures(ids, points, x, y, z2, tile) {
        for (const i of ids) {
            const c = points[i];
            const isCluster = c.numPoints;
            const f = {
                type: 1,
                geometry: [[
                    Math.round(this.options.extent * (c.x * z2 - x)),
                    Math.round(this.options.extent * (c.y * z2 - y))
                ]],
                tags: isCluster ? getClusterProperties(c) : this.points[c.index].properties
            };

            // assign id
            let id;
            if (isCluster) {
                id = c.id;
            } else if (this.options.generateId) {
                // optionally generate id
                id = c.index;
            } else if (this.points[c.index].id) {
                // keep id if already assigned
                id = this.points[c.index].id;
            }

            if (id !== undefined) f.id = id;

            tile.features.push(f);
        }
    }

    _limitZoom(z) {
        return Math.max(this.options.minZoom, Math.min(+z, this.options.maxZoom + 1));
    }

    _cluster(points, zoom) {
        const clusters = [];
        const {radius, extent, reduce, minPoints} = this.options;
        const r = radius / (extent * Math.pow(2, zoom));

        // loop through each point
        for (let i = 0; i < points.length; i++) {
            const p = points[i];
            // if we've already visited the point at this zoom level, skip it
            if (p.zoom <= zoom) continue;
            p.zoom = zoom;

            // find all nearby points
            const tree = this.trees[zoom + 1];
            const neighborIds = tree.within(p.x, p.y, r);

            const numPointsOrigin = p.numPoints || 1;
            let numPoints = numPointsOrigin;

            // count the number of points in a potential cluster
            for (const neighborId of neighborIds) {
                const b = tree.points[neighborId];
                // filter out neighbors that are already processed
                if (b.zoom > zoom) numPoints += b.numPoints || 1;
            }

            if (numPoints >= minPoints) { // enough points to form a cluster
                let wx = p.x * numPointsOrigin;
                let wy = p.y * numPointsOrigin;

                let clusterProperties = reduce && numPointsOrigin > 1 ? this._map(p, true) : null;

                // encode both zoom and point index on which the cluster originated -- offset by total length of features
                const id = (i << 5) + (zoom + 1) + this.points.length;

                for (const neighborId of neighborIds) {
                    const b = tree.points[neighborId];

                    if (b.zoom <= zoom) continue;
                    b.zoom = zoom; // save the zoom (so it doesn't get processed twice)

                    const numPoints2 = b.numPoints || 1;
                    wx += b.x * numPoints2; // accumulate coordinates for calculating weighted center
                    wy += b.y * numPoints2;

                    b.parentId = id;

                    if (reduce) {
                        if (!clusterProperties) clusterProperties = this._map(p, true);
                        reduce(clusterProperties, this._map(b));
                    }
                }

                p.parentId = id;
                clusters.push(createCluster(wx / numPoints, wy / numPoints, id, numPoints, clusterProperties));

            } else { // left points as unclustered
                clusters.push(p);

                if (numPoints > 1) {
                    for (const neighborId of neighborIds) {
                        const b = tree.points[neighborId];
                        if (b.zoom <= zoom) continue;
                        b.zoom = zoom;
                        clusters.push(b);
                    }
                }
            }
        }

        return clusters;
    }

    // get index of the point from which the cluster originated
    _getOriginId(clusterId) {
        return (clusterId - this.points.length) >> 5;
    }

    // get zoom of the point from which the cluster originated
    _getOriginZoom(clusterId) {
        return (clusterId - this.points.length) % 32;
    }

    _map(point, clone) {
        if (point.numPoints) {
            return clone ? extend({}, point.properties) : point.properties;
        }
        const original = this.points[point.index].properties;
        const result = this.options.map(original);
        return clone && result === original ? extend({}, result) : result;
    }
}

function createCluster(x, y, id, numPoints, properties) {
    return {
        x, // weighted cluster center
        y,
        zoom: Infinity, // the last zoom the cluster was processed at
        id, // encodes index of the first child of the cluster and its zoom level
        parentId: -1, // parent cluster id
        numPoints,
        properties
    };
}

function createPointCluster(p, id) {
    const [x, y] = p.geometry.coordinates;
    return {
        x: lngX(x), // projected point coordinates
        y: latY(y),
        zoom: Infinity, // the last zoom the point was processed at
        index: id, // index of the source feature in the original input array,
        parentId: -1 // parent cluster id
    };
}

function getClusterJSON(cluster) {
    return {
        type: 'Feature',
        id: cluster.id,
        properties: getClusterProperties(cluster),
        geometry: {
            type: 'Point',
            coordinates: [xLng(cluster.x), yLat(cluster.y)]
        }
    };
}

function getClusterProperties(cluster) {
    const count = cluster.numPoints;
    const abbrev =
        count >= 10000 ? `${Math.round(count / 1000)  }k` :
        count >= 1000 ? `${Math.round(count / 100) / 10  }k` : count;
    return extend(extend({}, cluster.properties), {
        cluster: true,
        cluster_id: cluster.id,
        point_count: count,
        point_count_abbreviated: abbrev
    });
}

// longitude/latitude to spherical mercator in [0..1] range
function lngX(lng) {
    return lng / 360 + 0.5;
}
function latY(lat) {
    const sin = Math.sin(lat * Math.PI / 180);
    const y = (0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI);
    return y < 0 ? 0 : y > 1 ? 1 : y;
}

// spherical mercator to longitude/latitude
function xLng(x) {
    return (x - 0.5) * 360;
}
function yLat(y) {
    const y2 = (180 - y * 360) * Math.PI / 180;
    return 360 * Math.atan(Math.exp(y2)) / Math.PI - 90;
}

function extend(dest, src) {
    for (const id in src) dest[id] = src[id];
    return dest;
}

function getX(p) {
    return p.x;
}
function getY(p) {
    return p.y;
}


/***/ }),

/***/ "./src/builder.ts":
/*!************************!*\
  !*** ./src/builder.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Builder = void 0;

var clusterer_1 = __webpack_require__(/*! ./clusterer */ "./src/clusterer.ts");

var constants_1 = __webpack_require__(/*! ./constants */ "./src/constants.ts");

var helper_1 = __webpack_require__(/*! ./helper */ "./src/helper.ts");

var Builder =
/** @class */
function () {
  function Builder(map) {
    var _this = this;

    this.pRadius = constants_1.RADIUS_DEFAULT;
    this.pMaxZoom = constants_1.MAX_ZOOM_DEFAULT;
    this.pMinZoom = constants_1.MIN_ZOOM_DEFAULT;
    this.pStyles = [];
    this.pImagePath = constants_1.MARKER_CLUSTER_IMAGE_PATH_DEFAULT;
    this.pImageExtension = constants_1.MARKER_CLUSTER_IMAGE_EXTENSION;
    this.pZoomOnClick = true;
    this.pOverlapMarkerSpiderfier = null;
    this.pUseServerSideClusterer = false;
    this.pMap = map;

    this.pCustomMarkerIcon = function (pointFeature) {
      if (pointFeature.properties.iconUrl) {
        return pointFeature.properties.iconUrl;
      }

      return constants_1.ICON_URL_DEFAULT;
    }; // eslint-disable-next-line @typescript-eslint/no-unused-vars


    this.pMarkerClick = function (marker, event) {
      return;
    }; // eslint-disable-next-line @typescript-eslint/no-unused-vars


    this.pFeatureClick = function (event) {
      return;
    }; // eslint-disable-next-line @typescript-eslint/no-unused-vars


    this.pFeatureStyle = function (feature) {
      return Object.create(null);
    }; // eslint-disable-next-line @typescript-eslint/no-unused-vars


    this.pServerSideFeatureToSuperCluster = function (feature) {
      var scfeature = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        properties: {}
      };
      return scfeature;
    }; // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await


    this.pGetClustersServerSide = function (bbox, zoom) {
      return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          return [2
          /*return*/
          , []];
        });
      });
    };
  }

  Builder.prototype.withRadius = function (radius) {
    this.pRadius = radius;
    return this;
  };

  Builder.prototype.withMaxZoom = function (maxZoom) {
    this.pMaxZoom = maxZoom;
    return this;
  };

  Builder.prototype.withMinZoom = function (minZoom) {
    this.pMinZoom = minZoom;
    return this;
  };

  Builder.prototype.withStyles = function (styles) {
    this.pStyles = styles;
    return this;
  };

  Builder.prototype.withImagePath = function (imagePath) {
    this.pImagePath = imagePath;
    return this;
  };

  Builder.prototype.withImageExtension = function (imageExtension) {
    this.pImageExtension = imageExtension;
    return this;
  };

  Builder.prototype.withZoomOnClick = function (zoomOnClick) {
    this.pZoomOnClick = zoomOnClick;
    return this;
  };

  Builder.prototype.withCustomMarkerIcon = function (customIcon) {
    this.pCustomMarkerIcon = customIcon;
    return this;
  };

  Builder.prototype.withMarkerClick = function (markerClick) {
    this.pMarkerClick = markerClick;
    return this;
  };

  Builder.prototype.withFeatureClick = function (featureClick) {
    this.pFeatureClick = featureClick;
    return this;
  };

  Builder.prototype.withFeatureStyle = function (featureStyle) {
    this.pFeatureStyle = featureStyle;
    return this;
  };

  Builder.prototype.withServerSideFeatureToSuperCluster = function (transform) {
    this.pServerSideFeatureToSuperCluster = transform;
    return this;
  };

  Builder.prototype.withOverlapMarkerSpiderfier = function (oms) {
    this.pOverlapMarkerSpiderfier = oms;
    return this;
  };

  Builder.prototype.withGetClustersServerSide = function (getClusters) {
    this.pUseServerSideClusterer = true;
    this.pGetClustersServerSide = getClusters;
    return this;
  };

  Builder.prototype.build = function () {
    var clusterer = new clusterer_1.SuperClusterAdapter(this);
    helper_1.ClustererHelper.setClusterer(this.pMap, clusterer);
    return clusterer;
  };

  Object.defineProperty(Builder.prototype, "map", {
    get: function get() {
      return this.pMap;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Builder.prototype, "radius", {
    get: function get() {
      var _a;

      return (_a = this.pRadius) !== null && _a !== void 0 ? _a : constants_1.RADIUS_DEFAULT;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Builder.prototype, "maxZoom", {
    get: function get() {
      var _a;

      return (_a = this.pMaxZoom) !== null && _a !== void 0 ? _a : constants_1.MAX_ZOOM_DEFAULT;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Builder.prototype, "minZoom", {
    get: function get() {
      var _a;

      return (_a = this.pMinZoom) !== null && _a !== void 0 ? _a : constants_1.MIN_ZOOM_DEFAULT;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Builder.prototype, "styles", {
    get: function get() {
      var _a;

      return (_a = this.pStyles) !== null && _a !== void 0 ? _a : [];
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Builder.prototype, "imagePath", {
    get: function get() {
      var _a;

      return (_a = this.pImagePath) !== null && _a !== void 0 ? _a : constants_1.MARKER_CLUSTER_IMAGE_PATH_DEFAULT;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Builder.prototype, "imageExtension", {
    get: function get() {
      var _a;

      return (_a = this.pImageExtension) !== null && _a !== void 0 ? _a : constants_1.MARKER_CLUSTER_IMAGE_EXTENSION;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Builder.prototype, "zoomOnClick", {
    get: function get() {
      var _a;

      return (_a = this.pZoomOnClick) !== null && _a !== void 0 ? _a : true;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Builder.prototype, "customMarkerIcon", {
    get: function get() {
      return this.pCustomMarkerIcon;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Builder.prototype, "markerClick", {
    get: function get() {
      return this.pMarkerClick;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Builder.prototype, "featureClick", {
    get: function get() {
      return this.pFeatureClick;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Builder.prototype, "featureStyle", {
    get: function get() {
      return this.pFeatureStyle;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Builder.prototype, "serverSideFeatureToSuperCluster", {
    get: function get() {
      return this.pServerSideFeatureToSuperCluster;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Builder.prototype, "overlapMarkerSpiderfier", {
    get: function get() {
      return this.pOverlapMarkerSpiderfier;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Builder.prototype, "useServerSideClusterer", {
    get: function get() {
      return this.pUseServerSideClusterer;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Builder.prototype, "getClustersServerSide", {
    get: function get() {
      return this.pGetClustersServerSide;
    },
    enumerable: false,
    configurable: true
  });
  return Builder;
}();

exports.Builder = Builder;

/***/ }),

/***/ "./src/clusterer.ts":
/*!**************************!*\
  !*** ./src/clusterer.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __values = this && this.__values || function (o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function next() {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuperClusterAdapter = void 0;

var builder_1 = __webpack_require__(/*! ./builder */ "./src/builder.ts");

var helper_1 = __webpack_require__(/*! ./helper */ "./src/helper.ts");

var constants_1 = __webpack_require__(/*! ./constants */ "./src/constants.ts");

var supercluster_1 = __importDefault(__webpack_require__(/*! supercluster */ "./node_modules/supercluster/index.js"));

var SuperClusterAdapter =
/** @class */
function () {
  function SuperClusterAdapter(build) {
    var _a, _b;

    this.pIdleListener = null;
    this.pointFeatures = [];
    this.pNonPointFeatures = [];
    this.pUseServerSideClusterer = false;
    this.pMap = build.map;
    this.pRadius = build.radius;
    this.pMaxZoom = build.maxZoom;
    this.pMinZoom = build.minZoom;
    this.pStyles = build.styles;
    this.pImagePath = build.imagePath;
    this.pImageExtension = build.imageExtension;
    this.pZoomOnClick = build.zoomOnClick;
    this.pDataLayerDefault = (_b = (_a = build.map) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : new google.maps.Data();
    this.pMarkers = [];
    this.pIndex = new supercluster_1["default"]({
      minZoom: this.pMinZoom,
      maxZoom: this.pMaxZoom,
      radius: this.pRadius
    });
    this.pCustomMarkerIcon = build.customMarkerIcon;
    this.pMarkerClick = build.markerClick;
    this.pFeatureClick = build.featureClick;
    this.pFeatureStyle = build.featureStyle; // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

    this.pServerSideFeatureToSuperCluster = build.serverSideFeatureToSuperCluster;
    this.pOverlapMarkerSpiderfier = build.overlapMarkerSpiderfier;
    this.pUseServerSideClusterer = build.useServerSideClusterer;
    this.pGetClustersServerSide = build.getClustersServerSide;
    this.init();
  }

  Object.defineProperty(SuperClusterAdapter.prototype, "map", {
    /* ---- Getters ---- */
    get: function get() {
      return this.pMap;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SuperClusterAdapter.prototype, "radius", {
    get: function get() {
      return this.pRadius;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SuperClusterAdapter.prototype, "maxZoom", {
    get: function get() {
      return this.pMaxZoom;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SuperClusterAdapter.prototype, "minZoom", {
    get: function get() {
      return this.pMinZoom;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SuperClusterAdapter.prototype, "styles", {
    get: function get() {
      return this.pStyles;
    },
    set: function set(styles) {
      this.pStyles = styles;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SuperClusterAdapter.prototype, "imagePath", {
    get: function get() {
      return this.pImagePath;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SuperClusterAdapter.prototype, "imageExtension", {
    get: function get() {
      return this.pImageExtension;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SuperClusterAdapter.prototype, "isZoomOnClick", {
    get: function get() {
      return this.pZoomOnClick;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SuperClusterAdapter.prototype, "numFeatures", {
    get: function get() {
      return this.features.length;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SuperClusterAdapter.prototype, "hasFeatures", {
    get: function get() {
      return this.numFeatures > 0;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SuperClusterAdapter.prototype, "features", {
    get: function get() {
      return this.pointFeatures;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SuperClusterAdapter.prototype, "useServerSideClusterer", {
    get: function get() {
      return this.pUseServerSideClusterer;
    },
    enumerable: false,
    configurable: true
  });
  /* ---- Public methods ---- */

  SuperClusterAdapter.prototype.setVisible = function (v) {
    this.setVisibleMarkersAndClusters(v);
    this.setVisibleDataLayerFeatures(v);
  };

  SuperClusterAdapter.prototype.setVisibleMarkersAndClusters = function (v) {
    if (!v) {
      this.removeEventListeners();
      this.hideMarkers();
    } else {
      this.addEventListeners();
      this.showMarkers();
    }
  };

  SuperClusterAdapter.prototype.setVisibleDataLayerFeatures = function (v) {
    if (!v) {
      this.pDataLayerDefault.setMap(null);
    } else {
      this.pDataLayerDefault.setMap(this.pMap);
    }
  };

  SuperClusterAdapter.prototype.getFeaturesBounds = function () {
    var e_1, _a, e_2, _b;

    var featuresBounds = new google.maps.LatLngBounds();

    try {
      for (var _c = __values(this.pNonPointFeatures), _d = _c.next(); !_d.done; _d = _c.next()) {
        var nonPointFeature = _d.value;
        featuresBounds.union(helper_1.ClustererHelper.featureBounds(nonPointFeature));
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
      } finally {
        if (e_1) throw e_1.error;
      }
    }

    try {
      for (var _e = __values(this.features), _f = _e.next(); !_f.done; _f = _e.next()) {
        var pointFeature = _f.value;
        featuresBounds.extend({
          lat: pointFeature.geometry.coordinates[1],
          lng: pointFeature.geometry.coordinates[0]
        });
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (_f && !_f.done && (_b = _e["return"])) _b.call(_e);
      } finally {
        if (e_2) throw e_2.error;
      }
    }

    return featuresBounds;
  };

  SuperClusterAdapter.prototype.destroy = function () {
    this.removeEventListeners();
    this.removeFeaturesFromDataLayers();
    this.removeMarkers();
    this.pStyles = [];
    this.pNonPointFeatures = [];
    this.pointFeatures = [];
  };

  SuperClusterAdapter.prototype.load = function (geoJson) {
    var e_3, _a;

    var _b;

    if (this.pointFeatures.length || this.pNonPointFeatures.length) {
      // eslint-disable-next-line no-console
      console.error('There are loaded data in supercluster adapter already');
    }

    var otherFeaturesCollection = {
      type: 'FeatureCollection',
      features: []
    };

    if (geoJson && geoJson.type === 'FeatureCollection' && geoJson.features && geoJson.features.length) {
      try {
        for (var _c = __values(geoJson.features), _d = _c.next(); !_d.done; _d = _c.next()) {
          var feature = _d.value;

          if (feature.type === 'Feature' && feature.geometry) {
            if (feature.geometry.type === 'Point') {
              if (feature.id && !((_b = feature.properties) === null || _b === void 0 ? void 0 : _b.id)) {
                if (feature.properties) {
                  feature.properties.id = feature.id;
                } else {
                  feature.properties = {
                    id: feature.id
                  };
                }
              }

              this.pointFeatures.push(feature);
            } else {
              otherFeaturesCollection.features.push(feature);
            }
          }
        }
      } catch (e_3_1) {
        e_3 = {
          error: e_3_1
        };
      } finally {
        try {
          if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
        } finally {
          if (e_3) throw e_3.error;
        }
      }
    }

    this.pIndex.load(this.pointFeatures);
    this.pNonPointFeatures = this.pDataLayerDefault.addGeoJson(otherFeaturesCollection);
    void this.getClusters();
    this.addEventListeners();
  };

  SuperClusterAdapter.prototype.drawServerSideCalculatedClusters = function (features) {
    var e_4, _a;

    var scfeatures = [];

    if (features && features.length) {
      try {
        for (var features_1 = __values(features), features_1_1 = features_1.next(); !features_1_1.done; features_1_1 = features_1.next()) {
          var feature = features_1_1.value;
          var scfeature = this.pServerSideFeatureToSuperCluster(feature);
          scfeatures.push(scfeature);
        }
      } catch (e_4_1) {
        e_4 = {
          error: e_4_1
        };
      } finally {
        try {
          if (features_1_1 && !features_1_1.done && (_a = features_1["return"])) _a.call(features_1);
        } finally {
          if (e_4) throw e_4.error;
        }
      }
    }

    this.drawClusters(scfeatures);
  };

  Object.defineProperty(SuperClusterAdapter, "Builder", {
    /* ---- Builder pattern implementation ---- */
    get: function get() {
      return builder_1.Builder;
    },
    enumerable: false,
    configurable: true
  });

  SuperClusterAdapter.prototype.getClusters = function () {
    var _a, _b;

    return __awaiter(this, void 0, void 0, function () {
      var mapBounds, zoom, bbox, clusters, err_1, clusters;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            if (!this.map) {
              return [2
              /*return*/
              ];
            }

            mapBounds = (_a = this.map.getBounds()) !== null && _a !== void 0 ? _a : new google.maps.LatLngBounds();
            zoom = (_b = this.map.getZoom()) !== null && _b !== void 0 ? _b : 0;
            if (!(!mapBounds.isEmpty() && zoom)) return [3
            /*break*/
            , 6];
            bbox = [mapBounds.getSouthWest().lng(), mapBounds.getSouthWest().lat(), mapBounds.getNorthEast().lng(), mapBounds.getNorthEast().lat()];
            if (!this.useServerSideClusterer) return [3
            /*break*/
            , 5];
            clusters = void 0;
            _c.label = 1;

          case 1:
            _c.trys.push([1, 3,, 4]);

            return [4
            /*yield*/
            , this.pGetClustersServerSide(bbox, zoom)];

          case 2:
            clusters = _c.sent();
            return [3
            /*break*/
            , 4];

          case 3:
            err_1 = _c.sent();
            clusters = [];
            return [3
            /*break*/
            , 4];

          case 4:
            this.drawServerSideCalculatedClusters(clusters);
            return [3
            /*break*/
            , 6];

          case 5:
            clusters = this.pIndex.getClusters(bbox, zoom);
            this.drawClusters(clusters);
            _c.label = 6;

          case 6:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  SuperClusterAdapter.prototype.init = function () {
    this.setupStyles();
    this.pDataLayerDefault.addListener('click', this.pFeatureClick);

    if (this.pFeatureStyle) {
      this.pDataLayerDefault.setStyle(this.pFeatureStyle);
    }

    if (this.useServerSideClusterer) {
      void this.getClusters();
      this.addEventListeners();
    }
  };

  SuperClusterAdapter.prototype.setupStyles = function () {
    var _this = this;

    if (this.pStyles.length) {
      return;
    }

    constants_1.SIZES.forEach(function (size, i) {
      _this.pStyles.push({
        height: size,
        url: "" + _this.pImagePath + (i + 1) + "." + _this.pImageExtension,
        width: size
      });
    });
  };

  SuperClusterAdapter.prototype.addEventListeners = function () {
    var _this = this;

    if (!this.map) {
      return;
    }

    if (!this.pIdleListener) {
      this.pIdleListener = google.maps.event.addListener(this.map, 'idle', function () {
        void _this.getClusters();
      });
    }
  };

  SuperClusterAdapter.prototype.removeEventListeners = function () {
    if (this.pIdleListener) {
      this.pIdleListener.remove();
    }
  };

  SuperClusterAdapter.prototype.drawClusters = function (clusters) {
    var e_5, _a;

    var _this = this;

    var mapClusters = this.getClustersMap(this.pMarkers);
    var mapMarkers = this.getMarkersMap(this.pMarkers);
    this.pMarkers.length = 0;

    try {
      for (var clusters_1 = __values(clusters), clusters_1_1 = clusters_1.next(); !clusters_1_1.done; clusters_1_1 = clusters_1.next()) {
        var scfeature = clusters_1_1.value;
        var marker = this.findExistingMarkerInstance(scfeature, mapClusters, mapMarkers);

        if (!marker) {
          marker = this.superclusterFeatureToGmapsMarker(scfeature);
        }

        this.pMarkers.push(marker);
      }
    } catch (e_5_1) {
      e_5 = {
        error: e_5_1
      };
    } finally {
      try {
        if (clusters_1_1 && !clusters_1_1.done && (_a = clusters_1["return"])) _a.call(clusters_1);
      } finally {
        if (e_5) throw e_5.error;
      }
    } // Remove the old clusters.


    window.setTimeout(function () {
      var e_6, _a, e_7, _b;

      try {
        for (var _c = __values(mapClusters.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
          var oCluster = _d.value;
          oCluster.setMap(null);
        }
      } catch (e_6_1) {
        e_6 = {
          error: e_6_1
        };
      } finally {
        try {
          if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
        } finally {
          if (e_6) throw e_6.error;
        }
      }

      try {
        for (var _e = __values(mapMarkers.values()), _f = _e.next(); !_f.done; _f = _e.next()) {
          var oMarker = _f.value;
          oMarker.setMap(null);

          if (_this.pOverlapMarkerSpiderfier) {
            _this.pOverlapMarkerSpiderfier.forgetMarker(oMarker);
          }
        }
      } catch (e_7_1) {
        e_7 = {
          error: e_7_1
        };
      } finally {
        try {
          if (_f && !_f.done && (_b = _e["return"])) _b.call(_e);
        } finally {
          if (e_7) throw e_7.error;
        }
      }
    }, 150);
  };

  SuperClusterAdapter.prototype.getClustersMap = function (collection) {
    var e_8, _a;

    var res = new Map();

    try {
      for (var collection_1 = __values(collection), collection_1_1 = collection_1.next(); !collection_1_1.done; collection_1_1 = collection_1.next()) {
        var marker = collection_1_1.value;

        if (marker.get('cluster') === true) {
          res.set(marker.get('cluster_id'), marker);
        }
      }
    } catch (e_8_1) {
      e_8 = {
        error: e_8_1
      };
    } finally {
      try {
        if (collection_1_1 && !collection_1_1.done && (_a = collection_1["return"])) _a.call(collection_1);
      } finally {
        if (e_8) throw e_8.error;
      }
    }

    return res;
  };

  SuperClusterAdapter.prototype.getMarkersMap = function (collection) {
    var e_9, _a;

    var res = new Map();

    try {
      for (var collection_2 = __values(collection), collection_2_1 = collection_2.next(); !collection_2_1.done; collection_2_1 = collection_2.next()) {
        var marker = collection_2_1.value;

        if (marker.get('cluster') !== true && marker.get('id')) {
          res.set(marker.get('id'), marker);
        }
      }
    } catch (e_9_1) {
      e_9 = {
        error: e_9_1
      };
    } finally {
      try {
        if (collection_2_1 && !collection_2_1.done && (_a = collection_2["return"])) _a.call(collection_2);
      } finally {
        if (e_9) throw e_9.error;
      }
    }

    return res;
  };

  SuperClusterAdapter.prototype.findExistingMarkerInstance = function (scfeature, existingClusters, existingMarkers) {
    var res;

    if (scfeature.properties.cluster === true) {
      if (existingClusters.has(scfeature.properties.cluster_id)) {
        res = existingClusters.get(scfeature.properties.cluster_id);
        existingClusters["delete"](scfeature.properties.cluster_id);
      }
    } else {
      if (scfeature.properties.id && existingMarkers.has(scfeature.properties.id)) {
        res = existingMarkers.get(scfeature.properties.id);
        existingMarkers["delete"](scfeature.properties.id);
      }
    }

    return res;
  };

  SuperClusterAdapter.prototype.clearNonPointFeatures = function () {
    var e_10, _a;

    var _b;

    try {
      for (var _c = __values(this.pNonPointFeatures), _d = _c.next(); !_d.done; _d = _c.next()) {
        var feature = _d.value;

        if ((_b = this.pDataLayerDefault) === null || _b === void 0 ? void 0 : _b.contains(feature)) {
          this.pDataLayerDefault.remove(feature);
        }
      }
    } catch (e_10_1) {
      e_10 = {
        error: e_10_1
      };
    } finally {
      try {
        if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
      } finally {
        if (e_10) throw e_10.error;
      }
    }
  };

  SuperClusterAdapter.prototype.superclusterFeatureToGmapsMarker = function (scfeature) {
    var options = this.getMarkerOptions(scfeature); // const marker = new google.maps.Marker(options);
// if (!scfeature.properties.cluster)debugger;
    var marker = scfeature.properties.cluster ? new google.maps.Marker(options) : new window.MarkerWithLabel(__assign(__assign({}, options), {
      labelContent: scfeature.properties.name,
      labelAnchor: new google.maps.Point(0, 0),
      labelClass: "markerLabels"
    }));
    this.assignAdditionalProperties(marker, scfeature);
    this.assignEventsToMarker(marker);
    return marker;
  };

  SuperClusterAdapter.prototype.getMarkerOptions = function (scfeature) {
    var options;

    if (scfeature.properties.cluster === true) {
      options = this.getMarkerOptionsForCluster(scfeature);
    } else {
      options = this.getMarkerOptionsForPoint(scfeature);
    }

    return options;
  };

  SuperClusterAdapter.prototype.getMarkerOptionsForCluster = function (scfeature) {
    var options = {
      position: new google.maps.LatLng(scfeature.geometry.coordinates[1], scfeature.geometry.coordinates[0]),
      map: this.map,
      clickable: this.pZoomOnClick,
      icon: this.getClusterIcon(scfeature),
      label: this.getClusterLabel(scfeature),
      title: scfeature.properties.point_count_abbreviated + " positions in the cluster",
      visible: true
    };
    return options;
  };

  SuperClusterAdapter.prototype.getClusterIcon = function (scfeature) {
    var _a, _b, _c;

    var index = this.getClusterIconIndex(scfeature);
    var style = this.styles[index];
    var width = (_a = style === null || style === void 0 ? void 0 : style.width) !== null && _a !== void 0 ? _a : constants_1.SIZES[0];
    var height = (_b = style === null || style === void 0 ? void 0 : style.height) !== null && _b !== void 0 ? _b : constants_1.SIZES[0];
    var anchorX = ((_c = style === null || style === void 0 ? void 0 : style.anchor) === null || _c === void 0 ? void 0 : _c.length) ? style.anchor[0] : width / 2;
    var anchorY = (style === null || style === void 0 ? void 0 : style.anchor) && (style === null || style === void 0 ? void 0 : style.anchor.length) > 1 ? style.anchor[1] : height / 2;
    var icon = {
      scaledSize: new google.maps.Size(width, height),
      anchor: new google.maps.Point(anchorX, anchorY),
      url: style.url
    };
    return icon;
  };

  SuperClusterAdapter.prototype.getClusterIconIndex = function (scfeature) {
    var index = 0;
    var dv = scfeature.properties.point_count;

    while (dv !== 0) {
      dv = Math.floor(dv / 10);
      index++;
    }

    return Math.min(index, this.pStyles.length - 1);
  };

  SuperClusterAdapter.prototype.getClusterLabel = function (scfeature) {
    var _a, _b, _c, _d;

    var index = this.getClusterIconIndex(scfeature);
    var style = this.styles[index];
    var label = {
      color: (_a = style === null || style === void 0 ? void 0 : style.textColor) !== null && _a !== void 0 ? _a : 'black',
      fontFamily: (_b = style === null || style === void 0 ? void 0 : style.fontFamily) !== null && _b !== void 0 ? _b : 'Roboto',
      fontSize: ((_c = style === null || style === void 0 ? void 0 : style.textSize) !== null && _c !== void 0 ? _c : 14) + "px",
      fontWeight: (_d = style === null || style === void 0 ? void 0 : style.fontWeight) !== null && _d !== void 0 ? _d : 'normal',
      text: "" + scfeature.properties.point_count_abbreviated
    };
    return label;
  };

  SuperClusterAdapter.prototype.getMarkerOptionsForPoint = function (scfeature) {
    var _a;

    var options = {
      position: new google.maps.LatLng(scfeature.geometry.coordinates[1], scfeature.geometry.coordinates[0]),
      map: this.map,
      clickable: true,
      icon: {
        scaledSize: new google.maps.Size(32, 32),
        url: this.pCustomMarkerIcon(scfeature)
      },
      title: (_a = scfeature.properties.name) !== null && _a !== void 0 ? _a : '',
      visible: true
    };
    return options;
  };

  SuperClusterAdapter.prototype.assignAdditionalProperties = function (marker, scfeature) {
    var _a, _b, _c, _d;

    if (scfeature.properties.cluster === true) {
      marker.set('cluster', true);
      marker.set('cluster_id', (_a = scfeature.properties.cluster_id) !== null && _a !== void 0 ? _a : helper_1.ClustererHelper.getNewId());
    } else {
      marker.set('id', (_d = (_b = scfeature.id) !== null && _b !== void 0 ? _b : (_c = scfeature.properties) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : helper_1.ClustererHelper.getNewId());

      if (this.pOverlapMarkerSpiderfier) {
        this.pOverlapMarkerSpiderfier.trackMarker(marker);
      }
    }
  };

  SuperClusterAdapter.prototype.assignEventsToMarker = function (marker) {
    var _this = this;

    if (marker.getClickable()) {
      var eventName = this.getClickEventName(marker);
      google.maps.event.addListener(marker, eventName, function (event) {
        if (marker.get('cluster') === true) {
          event.stop();
          var evPos = event.latLng;

          if (!_this.useServerSideClusterer && _this.features.length) {
            var clusterId = marker.get('cluster_id');

            var zoom = _this.pIndex.getClusterExpansionZoom(clusterId);

            _this.map.setOptions({
              center: evPos,
              zoom: zoom
            });
          } else {
            var bounds = helper_1.ClustererHelper.getClusterBounds(_this.map, marker, _this.radius);

            if (!bounds.isEmpty()) {
              _this.map.fitBounds(bounds, 5);
            }
          }
        } else {
          _this.pMarkerClick(marker, event);
        }
      });
    }
  };

  SuperClusterAdapter.prototype.getClickEventName = function (marker) {
    var eventName = 'click';

    if (marker.get('cluster') !== true && this.pOverlapMarkerSpiderfier) {
      eventName = 'spider_click';
    }

    return eventName;
  };

  SuperClusterAdapter.prototype.removeFeaturesFromDataLayers = function () {
    this.clearNonPointFeatures();
  };

  SuperClusterAdapter.prototype.hideMarkers = function () {
    var e_11, _a;

    if (this.pMarkers && this.pMarkers.length) {
      try {
        for (var _b = __values(this.pMarkers), _c = _b.next(); !_c.done; _c = _b.next()) {
          var marker = _c.value;
          marker.setMap(null);
        }
      } catch (e_11_1) {
        e_11 = {
          error: e_11_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        } finally {
          if (e_11) throw e_11.error;
        }
      }
    }
  };

  SuperClusterAdapter.prototype.showMarkers = function (markers) {
    var e_12, _a;

    if (markers === void 0) {
      markers = undefined;
    }

    var markerCollection = markers !== null && markers !== void 0 ? markers : this.pMarkers;

    if (markerCollection && markerCollection.length) {
      try {
        for (var markerCollection_1 = __values(markerCollection), markerCollection_1_1 = markerCollection_1.next(); !markerCollection_1_1.done; markerCollection_1_1 = markerCollection_1.next()) {
          var marker = markerCollection_1_1.value;
          marker.setMap(this.map);
        }
      } catch (e_12_1) {
        e_12 = {
          error: e_12_1
        };
      } finally {
        try {
          if (markerCollection_1_1 && !markerCollection_1_1.done && (_a = markerCollection_1["return"])) _a.call(markerCollection_1);
        } finally {
          if (e_12) throw e_12.error;
        }
      }
    }
  };

  SuperClusterAdapter.prototype.removeMarkers = function () {
    this.hideMarkers();
    this.pMarkers = [];
  };

  return SuperClusterAdapter;
}();

exports.SuperClusterAdapter = SuperClusterAdapter;

/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SIZES = exports.ICON_URL_DEFAULT = exports.MARKER_CLUSTER_IMAGE_EXTENSION = exports.MARKER_CLUSTER_IMAGE_PATH_DEFAULT = exports.MIN_CLUSTER_SIZE_DEFAULT = exports.RADIUS_DEFAULT = exports.MAX_ZOOM_DEFAULT = exports.MIN_ZOOM_DEFAULT = exports.CLASS_NAME_DEFAULT = void 0;
exports.CLASS_NAME_DEFAULT = 'cluster';
exports.MIN_ZOOM_DEFAULT = 0;
exports.MAX_ZOOM_DEFAULT = 19;
exports.RADIUS_DEFAULT = 80;
exports.MIN_CLUSTER_SIZE_DEFAULT = 2;
exports.MARKER_CLUSTER_IMAGE_PATH_DEFAULT = 'https://maps-tools-242a6.firebaseapp.com/clusterer/images/m';
exports.MARKER_CLUSTER_IMAGE_EXTENSION = document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1') ? 'svg' : 'png';
exports.ICON_URL_DEFAULT = 'http://maps.google.com/mapfiles/kml/paddle/blu-blank.png';
exports.SIZES = [53, 56, 66, 78, 90];

/***/ }),

/***/ "./src/helper.ts":
/*!***********************!*\
  !*** ./src/helper.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClustererHelper = void 0;
var hashFeatureCenters = new Map();
var hashFeaturesBounds = new Map();
var instances = new WeakMap();

var ClustererHelper =
/** @class */
function () {
  function ClustererHelper() {}

  ClustererHelper.featureCenter = function (feature) {
    if (!hashFeatureCenters.has(feature.getId())) {
      var geom = feature.getGeometry();

      if (geom.getType() === 'Point') {
        hashFeatureCenters.set(feature.getId(), geom.get());
      } else {
        hashFeatureCenters.set(feature.getId(), ClustererHelper.featureBounds(feature).getCenter());
      }
    }

    var res = hashFeatureCenters.get(feature.getId());
    return res ? res : ClustererHelper.featureBounds(feature).getCenter();
  };

  ClustererHelper.featureBounds = function (feature) {
    if (!hashFeaturesBounds.has(feature.getId())) {
      var geom = feature.getGeometry();
      var geomBounds_1 = new google.maps.LatLngBounds();
      geom.forEachLatLng(function (latLng) {
        geomBounds_1.extend(latLng);
      });
      hashFeaturesBounds.set(feature.getId(), geomBounds_1);
    }

    var res = hashFeaturesBounds.get(feature.getId());
    return res ? res : new google.maps.LatLngBounds();
  };

  ClustererHelper.isFeatureInBounds = function (feature, bounds) {
    if (bounds) {
      var geom = feature.getGeometry();

      if (geom.getType() === 'Point') {
        return bounds.contains(geom.get());
      } else {
        return bounds.contains(ClustererHelper.featureCenter(feature));
      }
    } else {
      return false;
    }
  };

  ClustererHelper.getClusterer = function (map) {
    if (instances.has(map)) {
      return instances.get(map);
    }

    return undefined;
  };

  ClustererHelper.setClusterer = function (map, clusterer) {
    if (instances.has(map)) {
      var prevInstance = instances.get(map);

      if (prevInstance) {
        prevInstance.destroy();
      }

      instances["delete"](map);
    }

    instances.set(map, clusterer);
  };

  ClustererHelper.getClusterBounds = function (map, marker, radius) {
    var bounds = new google.maps.LatLngBounds();

    if (map && marker && radius) {
      var position = marker.getPosition();

      if (position) {
        var point = ClustererHelper.fromLatLngToPixel(position, map);

        if (point) {
          var swPoint = new google.maps.Point(point.x - radius, point.y - radius);
          var nePoint = new google.maps.Point(point.x + radius, point.y + radius);
          var sw = ClustererHelper.fromPixelToLatLng(swPoint, map);
          var ne = ClustererHelper.fromPixelToLatLng(nePoint, map);

          if (sw) {
            bounds.extend(sw);
          }

          if (ne) {
            bounds.extend(ne);
          }
        }
      }
    }

    return bounds;
  };

  ClustererHelper.getNewId = function () {
    return ++ClustererHelper.newId;
  };

  ClustererHelper.fromLatLngToPixel = function (position, map) {
    var _a, _b, _c, _d, _e, _f;

    var scale = Math.pow(2, map.getZoom());
    var projection = map.getProjection();
    var bounds = map.getBounds();
    var nw = projection === null || projection === void 0 ? void 0 : projection.fromLatLngToPoint(new google.maps.LatLng((_a = bounds === null || bounds === void 0 ? void 0 : bounds.getNorthEast().lat()) !== null && _a !== void 0 ? _a : 0, (_b = bounds === null || bounds === void 0 ? void 0 : bounds.getSouthWest().lng()) !== null && _b !== void 0 ? _b : 0));
    var point = projection === null || projection === void 0 ? void 0 : projection.fromLatLngToPoint(position);
    return new google.maps.Point(Math.floor((((_c = point === null || point === void 0 ? void 0 : point.x) !== null && _c !== void 0 ? _c : 0) - ((_d = nw === null || nw === void 0 ? void 0 : nw.x) !== null && _d !== void 0 ? _d : 0)) * scale), Math.floor((((_e = point === null || point === void 0 ? void 0 : point.y) !== null && _e !== void 0 ? _e : 0) - ((_f = nw === null || nw === void 0 ? void 0 : nw.y) !== null && _f !== void 0 ? _f : 0)) * scale));
  };

  ClustererHelper.fromPixelToLatLng = function (pixel, map) {
    var _a, _b, _c, _d;

    var scale = Math.pow(2, map.getZoom());
    var projection = map.getProjection();
    var bounds = map.getBounds();
    var nw = projection === null || projection === void 0 ? void 0 : projection.fromLatLngToPoint(new google.maps.LatLng((_a = bounds === null || bounds === void 0 ? void 0 : bounds.getNorthEast().lat()) !== null && _a !== void 0 ? _a : 0, (_b = bounds === null || bounds === void 0 ? void 0 : bounds.getSouthWest().lng()) !== null && _b !== void 0 ? _b : 0));
    var point = new google.maps.Point(pixel.x / scale + ((_c = nw === null || nw === void 0 ? void 0 : nw.x) !== null && _c !== void 0 ? _c : 0), pixel.y / scale + ((_d = nw === null || nw === void 0 ? void 0 : nw.y) !== null && _d !== void 0 ? _d : 0));
    return projection === null || projection === void 0 ? void 0 : projection.fromPointToLatLng(point);
  };

  ClustererHelper.newId = 1;
  return ClustererHelper;
}();

exports.ClustererHelper = ClustererHelper;

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuperClusterAdapterLoader = void 0;

var SuperClusterAdapterLoader =
/** @class */
function () {
  function SuperClusterAdapterLoader() {}

  SuperClusterAdapterLoader.getClusterer = function () {
    return __awaiter(this, void 0, void 0, function () {
      var module_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!(google && google.maps)) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , Promise.resolve().then(function () {
              return __importStar(__webpack_require__(/*! ./clusterer */ "./src/clusterer.ts"));
            })];

          case 1:
            module_1 = _a.sent();
            return [2
            /*return*/
            , module_1.SuperClusterAdapter];

          case 2:
            // eslint-disable-next-line no-console
            console.error('Google Maps JavaScript API v3 is not loaded. Cannot initialize SuperClusterAdapter.');
            return [2
            /*return*/
            , undefined];
        }
      });
    });
  };

  return SuperClusterAdapterLoader;
}();

exports.SuperClusterAdapterLoader = SuperClusterAdapterLoader;

/***/ })

/******/ })["SuperClusterAdapterLoader"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TdXBlckNsdXN0ZXJBZGFwdGVyTG9hZGVyL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9TdXBlckNsdXN0ZXJBZGFwdGVyTG9hZGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1N1cGVyQ2x1c3RlckFkYXB0ZXJMb2FkZXIvLi9ub2RlX21vZHVsZXMva2RidXNoL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9TdXBlckNsdXN0ZXJBZGFwdGVyTG9hZGVyLy4vbm9kZV9tb2R1bGVzL2tkYnVzaC9zcmMvcmFuZ2UuanMiLCJ3ZWJwYWNrOi8vU3VwZXJDbHVzdGVyQWRhcHRlckxvYWRlci8uL25vZGVfbW9kdWxlcy9rZGJ1c2gvc3JjL3NvcnQuanMiLCJ3ZWJwYWNrOi8vU3VwZXJDbHVzdGVyQWRhcHRlckxvYWRlci8uL25vZGVfbW9kdWxlcy9rZGJ1c2gvc3JjL3dpdGhpbi5qcyIsIndlYnBhY2s6Ly9TdXBlckNsdXN0ZXJBZGFwdGVyTG9hZGVyLy4vbm9kZV9tb2R1bGVzL3N1cGVyY2x1c3Rlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9TdXBlckNsdXN0ZXJBZGFwdGVyTG9hZGVyLy4vc3JjL2J1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vU3VwZXJDbHVzdGVyQWRhcHRlckxvYWRlci8uL3NyYy9jbHVzdGVyZXIudHMiLCJ3ZWJwYWNrOi8vU3VwZXJDbHVzdGVyQWRhcHRlckxvYWRlci8uL3NyYy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vU3VwZXJDbHVzdGVyQWRhcHRlckxvYWRlci8uL3NyYy9oZWxwZXIudHMiLCJ3ZWJwYWNrOi8vU3VwZXJDbHVzdGVyQWRhcHRlckxvYWRlci8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pGMEI7QUFDRTtBQUNFOztBQUU5QjtBQUNBOztBQUVlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsdUJBQXVCLG1CQUFtQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLHFEQUFJO0FBQ1o7O0FBRUE7QUFDQSxlQUFlLHNEQUFLO0FBQ3BCOztBQUVBO0FBQ0EsZUFBZSx1REFBTTtBQUNyQjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDakNlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEJBQThCLFlBQVk7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDekNlO0FBQ2Y7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3RGU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBOEIsWUFBWTtBQUMxQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQzdDNEI7O0FBRTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDhDQUE4Qyw4QkFBOEI7O0FBRTVFO0FBQ0Esc0NBQXNDLG9CQUFvQjtBQUMxRDs7QUFFZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxnQ0FBZ0M7O0FBRS9DOztBQUVBLG1DQUFtQyxrQkFBa0I7QUFDckQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixtQkFBbUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLDhDQUFNOztBQUU1Qzs7QUFFQTtBQUNBO0FBQ0EsNkJBQTZCLGNBQWM7QUFDM0M7O0FBRUE7QUFDQTtBQUNBLGdDQUFnQyw4Q0FBTTs7QUFFdEM7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGVBQWU7QUFDOUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsa0NBQWtDO0FBQ2pEOztBQUVBO0FBQ0EsdUJBQXVCLG1CQUFtQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUNBQXlDO0FBQ3pDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7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R0FBTSxFQUFOLEdBQVUsQ0FBNUIsQ0FBdEQsQ0FBZDtBQUNBLFdBQU8sVUFBVSxTQUFWLGNBQVUsV0FBVixHQUFVLE1BQVYsYUFBVSxDQUFFLGlCQUFaLENBQThCLEtBQTlCLENBQVA7QUFDRCxHQVRjOztBQXhHQSwwQkFBUSxDQUFSO0FBa0hqQjtBQUFDLENBbkhEOztBQUFhLDBDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVGI7QUFBQTtBQUFBO0FBQUEsd0NBV0M7O0FBVnFCLDJDQUFwQjs7Ozs7O2dCQUNNLFFBQU0sSUFBSSxNQUFNLENBQUMsSUFBakIsQyxFQUFBO0FBQUE7QUFBQTtBQUNhO0FBQUE7QUFBQTtBQUFBLHNEQUFhLHVDQUFiO0FBQTBCLGFBQTFCOzs7QUFBVCx1QkFBUyxTQUFUO0FBQ047QUFBQTtBQUFBLGNBQU8sUUFBTSxDQUFDLG1CQUFkOzs7QUFFQTtBQUNBLG1CQUFPLENBQUMsS0FBUixDQUFjLHFGQUFkO0FBQ0E7QUFBQTtBQUFBLGNBQU8sU0FBUDs7OztBQUVILEdBVG1COztBQVV0QjtBQUFDLENBWEQ7O0FBQWEsOEQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJTdXBlckNsdXN0ZXJBZGFwdGVyTG9hZGVyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlN1cGVyQ2x1c3RlckFkYXB0ZXJMb2FkZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiXG5pbXBvcnQgc29ydCBmcm9tICcuL3NvcnQnO1xuaW1wb3J0IHJhbmdlIGZyb20gJy4vcmFuZ2UnO1xuaW1wb3J0IHdpdGhpbiBmcm9tICcuL3dpdGhpbic7XG5cbmNvbnN0IGRlZmF1bHRHZXRYID0gcCA9PiBwWzBdO1xuY29uc3QgZGVmYXVsdEdldFkgPSBwID0+IHBbMV07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtEQnVzaCB7XG4gICAgY29uc3RydWN0b3IocG9pbnRzLCBnZXRYID0gZGVmYXVsdEdldFgsIGdldFkgPSBkZWZhdWx0R2V0WSwgbm9kZVNpemUgPSA2NCwgQXJyYXlUeXBlID0gRmxvYXQ2NEFycmF5KSB7XG4gICAgICAgIHRoaXMubm9kZVNpemUgPSBub2RlU2l6ZTtcbiAgICAgICAgdGhpcy5wb2ludHMgPSBwb2ludHM7XG5cbiAgICAgICAgY29uc3QgSW5kZXhBcnJheVR5cGUgPSBwb2ludHMubGVuZ3RoIDwgNjU1MzYgPyBVaW50MTZBcnJheSA6IFVpbnQzMkFycmF5O1xuXG4gICAgICAgIGNvbnN0IGlkcyA9IHRoaXMuaWRzID0gbmV3IEluZGV4QXJyYXlUeXBlKHBvaW50cy5sZW5ndGgpO1xuICAgICAgICBjb25zdCBjb29yZHMgPSB0aGlzLmNvb3JkcyA9IG5ldyBBcnJheVR5cGUocG9pbnRzLmxlbmd0aCAqIDIpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZHNbaV0gPSBpO1xuICAgICAgICAgICAgY29vcmRzWzIgKiBpXSA9IGdldFgocG9pbnRzW2ldKTtcbiAgICAgICAgICAgIGNvb3Jkc1syICogaSArIDFdID0gZ2V0WShwb2ludHNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgc29ydChpZHMsIGNvb3Jkcywgbm9kZVNpemUsIDAsIGlkcy5sZW5ndGggLSAxLCAwKTtcbiAgICB9XG5cbiAgICByYW5nZShtaW5YLCBtaW5ZLCBtYXhYLCBtYXhZKSB7XG4gICAgICAgIHJldHVybiByYW5nZSh0aGlzLmlkcywgdGhpcy5jb29yZHMsIG1pblgsIG1pblksIG1heFgsIG1heFksIHRoaXMubm9kZVNpemUpO1xuICAgIH1cblxuICAgIHdpdGhpbih4LCB5LCByKSB7XG4gICAgICAgIHJldHVybiB3aXRoaW4odGhpcy5pZHMsIHRoaXMuY29vcmRzLCB4LCB5LCByLCB0aGlzLm5vZGVTaXplKTtcbiAgICB9XG59XG4iLCJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJhbmdlKGlkcywgY29vcmRzLCBtaW5YLCBtaW5ZLCBtYXhYLCBtYXhZLCBub2RlU2l6ZSkge1xuICAgIGNvbnN0IHN0YWNrID0gWzAsIGlkcy5sZW5ndGggLSAxLCAwXTtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBsZXQgeCwgeTtcblxuICAgIHdoaWxlIChzdGFjay5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgYXhpcyA9IHN0YWNrLnBvcCgpO1xuICAgICAgICBjb25zdCByaWdodCA9IHN0YWNrLnBvcCgpO1xuICAgICAgICBjb25zdCBsZWZ0ID0gc3RhY2sucG9wKCk7XG5cbiAgICAgICAgaWYgKHJpZ2h0IC0gbGVmdCA8PSBub2RlU2l6ZSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGxlZnQ7IGkgPD0gcmlnaHQ7IGkrKykge1xuICAgICAgICAgICAgICAgIHggPSBjb29yZHNbMiAqIGldO1xuICAgICAgICAgICAgICAgIHkgPSBjb29yZHNbMiAqIGkgKyAxXTtcbiAgICAgICAgICAgICAgICBpZiAoeCA+PSBtaW5YICYmIHggPD0gbWF4WCAmJiB5ID49IG1pblkgJiYgeSA8PSBtYXhZKSByZXN1bHQucHVzaChpZHNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtID0gTWF0aC5mbG9vcigobGVmdCArIHJpZ2h0KSAvIDIpO1xuXG4gICAgICAgIHggPSBjb29yZHNbMiAqIG1dO1xuICAgICAgICB5ID0gY29vcmRzWzIgKiBtICsgMV07XG5cbiAgICAgICAgaWYgKHggPj0gbWluWCAmJiB4IDw9IG1heFggJiYgeSA+PSBtaW5ZICYmIHkgPD0gbWF4WSkgcmVzdWx0LnB1c2goaWRzW21dKTtcblxuICAgICAgICBjb25zdCBuZXh0QXhpcyA9IChheGlzICsgMSkgJSAyO1xuXG4gICAgICAgIGlmIChheGlzID09PSAwID8gbWluWCA8PSB4IDogbWluWSA8PSB5KSB7XG4gICAgICAgICAgICBzdGFjay5wdXNoKGxlZnQpO1xuICAgICAgICAgICAgc3RhY2sucHVzaChtIC0gMSk7XG4gICAgICAgICAgICBzdGFjay5wdXNoKG5leHRBeGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXhpcyA9PT0gMCA/IG1heFggPj0geCA6IG1heFkgPj0geSkge1xuICAgICAgICAgICAgc3RhY2sucHVzaChtICsgMSk7XG4gICAgICAgICAgICBzdGFjay5wdXNoKHJpZ2h0KTtcbiAgICAgICAgICAgIHN0YWNrLnB1c2gobmV4dEF4aXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsIlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc29ydEtEKGlkcywgY29vcmRzLCBub2RlU2l6ZSwgbGVmdCwgcmlnaHQsIGRlcHRoKSB7XG4gICAgaWYgKHJpZ2h0IC0gbGVmdCA8PSBub2RlU2l6ZSkgcmV0dXJuO1xuXG4gICAgY29uc3QgbSA9IChsZWZ0ICsgcmlnaHQpID4+IDE7XG5cbiAgICBzZWxlY3QoaWRzLCBjb29yZHMsIG0sIGxlZnQsIHJpZ2h0LCBkZXB0aCAlIDIpO1xuXG4gICAgc29ydEtEKGlkcywgY29vcmRzLCBub2RlU2l6ZSwgbGVmdCwgbSAtIDEsIGRlcHRoICsgMSk7XG4gICAgc29ydEtEKGlkcywgY29vcmRzLCBub2RlU2l6ZSwgbSArIDEsIHJpZ2h0LCBkZXB0aCArIDEpO1xufVxuXG5mdW5jdGlvbiBzZWxlY3QoaWRzLCBjb29yZHMsIGssIGxlZnQsIHJpZ2h0LCBpbmMpIHtcblxuICAgIHdoaWxlIChyaWdodCA+IGxlZnQpIHtcbiAgICAgICAgaWYgKHJpZ2h0IC0gbGVmdCA+IDYwMCkge1xuICAgICAgICAgICAgY29uc3QgbiA9IHJpZ2h0IC0gbGVmdCArIDE7XG4gICAgICAgICAgICBjb25zdCBtID0gayAtIGxlZnQgKyAxO1xuICAgICAgICAgICAgY29uc3QgeiA9IE1hdGgubG9nKG4pO1xuICAgICAgICAgICAgY29uc3QgcyA9IDAuNSAqIE1hdGguZXhwKDIgKiB6IC8gMyk7XG4gICAgICAgICAgICBjb25zdCBzZCA9IDAuNSAqIE1hdGguc3FydCh6ICogcyAqIChuIC0gcykgLyBuKSAqIChtIC0gbiAvIDIgPCAwID8gLTEgOiAxKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld0xlZnQgPSBNYXRoLm1heChsZWZ0LCBNYXRoLmZsb29yKGsgLSBtICogcyAvIG4gKyBzZCkpO1xuICAgICAgICAgICAgY29uc3QgbmV3UmlnaHQgPSBNYXRoLm1pbihyaWdodCwgTWF0aC5mbG9vcihrICsgKG4gLSBtKSAqIHMgLyBuICsgc2QpKTtcbiAgICAgICAgICAgIHNlbGVjdChpZHMsIGNvb3JkcywgaywgbmV3TGVmdCwgbmV3UmlnaHQsIGluYyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0ID0gY29vcmRzWzIgKiBrICsgaW5jXTtcbiAgICAgICAgbGV0IGkgPSBsZWZ0O1xuICAgICAgICBsZXQgaiA9IHJpZ2h0O1xuXG4gICAgICAgIHN3YXBJdGVtKGlkcywgY29vcmRzLCBsZWZ0LCBrKTtcbiAgICAgICAgaWYgKGNvb3Jkc1syICogcmlnaHQgKyBpbmNdID4gdCkgc3dhcEl0ZW0oaWRzLCBjb29yZHMsIGxlZnQsIHJpZ2h0KTtcblxuICAgICAgICB3aGlsZSAoaSA8IGopIHtcbiAgICAgICAgICAgIHN3YXBJdGVtKGlkcywgY29vcmRzLCBpLCBqKTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIGotLTtcbiAgICAgICAgICAgIHdoaWxlIChjb29yZHNbMiAqIGkgKyBpbmNdIDwgdCkgaSsrO1xuICAgICAgICAgICAgd2hpbGUgKGNvb3Jkc1syICogaiArIGluY10gPiB0KSBqLS07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29vcmRzWzIgKiBsZWZ0ICsgaW5jXSA9PT0gdCkgc3dhcEl0ZW0oaWRzLCBjb29yZHMsIGxlZnQsIGopO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGorKztcbiAgICAgICAgICAgIHN3YXBJdGVtKGlkcywgY29vcmRzLCBqLCByaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaiA8PSBrKSBsZWZ0ID0gaiArIDE7XG4gICAgICAgIGlmIChrIDw9IGopIHJpZ2h0ID0gaiAtIDE7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzd2FwSXRlbShpZHMsIGNvb3JkcywgaSwgaikge1xuICAgIHN3YXAoaWRzLCBpLCBqKTtcbiAgICBzd2FwKGNvb3JkcywgMiAqIGksIDIgKiBqKTtcbiAgICBzd2FwKGNvb3JkcywgMiAqIGkgKyAxLCAyICogaiArIDEpO1xufVxuXG5mdW5jdGlvbiBzd2FwKGFyciwgaSwgaikge1xuICAgIGNvbnN0IHRtcCA9IGFycltpXTtcbiAgICBhcnJbaV0gPSBhcnJbal07XG4gICAgYXJyW2pdID0gdG1wO1xufVxuIiwiXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3aXRoaW4oaWRzLCBjb29yZHMsIHF4LCBxeSwgciwgbm9kZVNpemUpIHtcbiAgICBjb25zdCBzdGFjayA9IFswLCBpZHMubGVuZ3RoIC0gMSwgMF07XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgY29uc3QgcjIgPSByICogcjtcblxuICAgIHdoaWxlIChzdGFjay5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgYXhpcyA9IHN0YWNrLnBvcCgpO1xuICAgICAgICBjb25zdCByaWdodCA9IHN0YWNrLnBvcCgpO1xuICAgICAgICBjb25zdCBsZWZ0ID0gc3RhY2sucG9wKCk7XG5cbiAgICAgICAgaWYgKHJpZ2h0IC0gbGVmdCA8PSBub2RlU2l6ZSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGxlZnQ7IGkgPD0gcmlnaHQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChzcURpc3QoY29vcmRzWzIgKiBpXSwgY29vcmRzWzIgKiBpICsgMV0sIHF4LCBxeSkgPD0gcjIpIHJlc3VsdC5wdXNoKGlkc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG0gPSBNYXRoLmZsb29yKChsZWZ0ICsgcmlnaHQpIC8gMik7XG5cbiAgICAgICAgY29uc3QgeCA9IGNvb3Jkc1syICogbV07XG4gICAgICAgIGNvbnN0IHkgPSBjb29yZHNbMiAqIG0gKyAxXTtcblxuICAgICAgICBpZiAoc3FEaXN0KHgsIHksIHF4LCBxeSkgPD0gcjIpIHJlc3VsdC5wdXNoKGlkc1ttXSk7XG5cbiAgICAgICAgY29uc3QgbmV4dEF4aXMgPSAoYXhpcyArIDEpICUgMjtcblxuICAgICAgICBpZiAoYXhpcyA9PT0gMCA/IHF4IC0gciA8PSB4IDogcXkgLSByIDw9IHkpIHtcbiAgICAgICAgICAgIHN0YWNrLnB1c2gobGVmdCk7XG4gICAgICAgICAgICBzdGFjay5wdXNoKG0gLSAxKTtcbiAgICAgICAgICAgIHN0YWNrLnB1c2gobmV4dEF4aXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChheGlzID09PSAwID8gcXggKyByID49IHggOiBxeSArIHIgPj0geSkge1xuICAgICAgICAgICAgc3RhY2sucHVzaChtICsgMSk7XG4gICAgICAgICAgICBzdGFjay5wdXNoKHJpZ2h0KTtcbiAgICAgICAgICAgIHN0YWNrLnB1c2gobmV4dEF4aXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gc3FEaXN0KGF4LCBheSwgYngsIGJ5KSB7XG4gICAgY29uc3QgZHggPSBheCAtIGJ4O1xuICAgIGNvbnN0IGR5ID0gYXkgLSBieTtcbiAgICByZXR1cm4gZHggKiBkeCArIGR5ICogZHk7XG59XG4iLCJcbmltcG9ydCBLREJ1c2ggZnJvbSAna2RidXNoJztcblxuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgbWluWm9vbTogMCwgICAvLyBtaW4gem9vbSB0byBnZW5lcmF0ZSBjbHVzdGVycyBvblxuICAgIG1heFpvb206IDE2LCAgLy8gbWF4IHpvb20gbGV2ZWwgdG8gY2x1c3RlciB0aGUgcG9pbnRzIG9uXG4gICAgbWluUG9pbnRzOiAyLCAvLyBtaW5pbXVtIHBvaW50cyB0byBmb3JtIGEgY2x1c3RlclxuICAgIHJhZGl1czogNDAsICAgLy8gY2x1c3RlciByYWRpdXMgaW4gcGl4ZWxzXG4gICAgZXh0ZW50OiA1MTIsICAvLyB0aWxlIGV4dGVudCAocmFkaXVzIGlzIGNhbGN1bGF0ZWQgcmVsYXRpdmUgdG8gaXQpXG4gICAgbm9kZVNpemU6IDY0LCAvLyBzaXplIG9mIHRoZSBLRC10cmVlIGxlYWYgbm9kZSwgYWZmZWN0cyBwZXJmb3JtYW5jZVxuICAgIGxvZzogZmFsc2UsICAgLy8gd2hldGhlciB0byBsb2cgdGltaW5nIGluZm9cblxuICAgIC8vIHdoZXRoZXIgdG8gZ2VuZXJhdGUgbnVtZXJpYyBpZHMgZm9yIGlucHV0IGZlYXR1cmVzIChpbiB2ZWN0b3IgdGlsZXMpXG4gICAgZ2VuZXJhdGVJZDogZmFsc2UsXG5cbiAgICAvLyBhIHJlZHVjZSBmdW5jdGlvbiBmb3IgY2FsY3VsYXRpbmcgY3VzdG9tIGNsdXN0ZXIgcHJvcGVydGllc1xuICAgIHJlZHVjZTogbnVsbCwgLy8gKGFjY3VtdWxhdGVkLCBwcm9wcykgPT4geyBhY2N1bXVsYXRlZC5zdW0gKz0gcHJvcHMuc3VtOyB9XG5cbiAgICAvLyBwcm9wZXJ0aWVzIHRvIHVzZSBmb3IgaW5kaXZpZHVhbCBwb2ludHMgd2hlbiBydW5uaW5nIHRoZSByZWR1Y2VyXG4gICAgbWFwOiBwcm9wcyA9PiBwcm9wcyAvLyBwcm9wcyA9PiAoe3N1bTogcHJvcHMubXlfdmFsdWV9KVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3VwZXJjbHVzdGVyIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IGV4dGVuZChPYmplY3QuY3JlYXRlKGRlZmF1bHRPcHRpb25zKSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMudHJlZXMgPSBuZXcgQXJyYXkodGhpcy5vcHRpb25zLm1heFpvb20gKyAxKTtcbiAgICB9XG5cbiAgICBsb2FkKHBvaW50cykge1xuICAgICAgICBjb25zdCB7bG9nLCBtaW5ab29tLCBtYXhab29tLCBub2RlU2l6ZX0gPSB0aGlzLm9wdGlvbnM7XG5cbiAgICAgICAgaWYgKGxvZykgY29uc29sZS50aW1lKCd0b3RhbCB0aW1lJyk7XG5cbiAgICAgICAgY29uc3QgdGltZXJJZCA9IGBwcmVwYXJlICR7ICBwb2ludHMubGVuZ3RoICB9IHBvaW50c2A7XG4gICAgICAgIGlmIChsb2cpIGNvbnNvbGUudGltZSh0aW1lcklkKTtcblxuICAgICAgICB0aGlzLnBvaW50cyA9IHBvaW50cztcblxuICAgICAgICAvLyBnZW5lcmF0ZSBhIGNsdXN0ZXIgb2JqZWN0IGZvciBlYWNoIHBvaW50IGFuZCBpbmRleCBpbnB1dCBwb2ludHMgaW50byBhIEtELXRyZWVcbiAgICAgICAgbGV0IGNsdXN0ZXJzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoIXBvaW50c1tpXS5nZW9tZXRyeSkgY29udGludWU7XG4gICAgICAgICAgICBjbHVzdGVycy5wdXNoKGNyZWF0ZVBvaW50Q2x1c3Rlcihwb2ludHNbaV0sIGkpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRyZWVzW21heFpvb20gKyAxXSA9IG5ldyBLREJ1c2goY2x1c3RlcnMsIGdldFgsIGdldFksIG5vZGVTaXplLCBGbG9hdDMyQXJyYXkpO1xuXG4gICAgICAgIGlmIChsb2cpIGNvbnNvbGUudGltZUVuZCh0aW1lcklkKTtcblxuICAgICAgICAvLyBjbHVzdGVyIHBvaW50cyBvbiBtYXggem9vbSwgdGhlbiBjbHVzdGVyIHRoZSByZXN1bHRzIG9uIHByZXZpb3VzIHpvb20sIGV0Yy47XG4gICAgICAgIC8vIHJlc3VsdHMgaW4gYSBjbHVzdGVyIGhpZXJhcmNoeSBhY3Jvc3Mgem9vbSBsZXZlbHNcbiAgICAgICAgZm9yIChsZXQgeiA9IG1heFpvb207IHogPj0gbWluWm9vbTsgei0tKSB7XG4gICAgICAgICAgICBjb25zdCBub3cgPSArRGF0ZS5ub3coKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgbmV3IHNldCBvZiBjbHVzdGVycyBmb3IgdGhlIHpvb20gYW5kIGluZGV4IHRoZW0gd2l0aCBhIEtELXRyZWVcbiAgICAgICAgICAgIGNsdXN0ZXJzID0gdGhpcy5fY2x1c3RlcihjbHVzdGVycywgeik7XG4gICAgICAgICAgICB0aGlzLnRyZWVzW3pdID0gbmV3IEtEQnVzaChjbHVzdGVycywgZ2V0WCwgZ2V0WSwgbm9kZVNpemUsIEZsb2F0MzJBcnJheSk7XG5cbiAgICAgICAgICAgIGlmIChsb2cpIGNvbnNvbGUubG9nKCd6JWQ6ICVkIGNsdXN0ZXJzIGluICVkbXMnLCB6LCBjbHVzdGVycy5sZW5ndGgsICtEYXRlLm5vdygpIC0gbm93KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsb2cpIGNvbnNvbGUudGltZUVuZCgndG90YWwgdGltZScpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldENsdXN0ZXJzKGJib3gsIHpvb20pIHtcbiAgICAgICAgbGV0IG1pbkxuZyA9ICgoYmJveFswXSArIDE4MCkgJSAzNjAgKyAzNjApICUgMzYwIC0gMTgwO1xuICAgICAgICBjb25zdCBtaW5MYXQgPSBNYXRoLm1heCgtOTAsIE1hdGgubWluKDkwLCBiYm94WzFdKSk7XG4gICAgICAgIGxldCBtYXhMbmcgPSBiYm94WzJdID09PSAxODAgPyAxODAgOiAoKGJib3hbMl0gKyAxODApICUgMzYwICsgMzYwKSAlIDM2MCAtIDE4MDtcbiAgICAgICAgY29uc3QgbWF4TGF0ID0gTWF0aC5tYXgoLTkwLCBNYXRoLm1pbig5MCwgYmJveFszXSkpO1xuXG4gICAgICAgIGlmIChiYm94WzJdIC0gYmJveFswXSA+PSAzNjApIHtcbiAgICAgICAgICAgIG1pbkxuZyA9IC0xODA7XG4gICAgICAgICAgICBtYXhMbmcgPSAxODA7XG4gICAgICAgIH0gZWxzZSBpZiAobWluTG5nID4gbWF4TG5nKSB7XG4gICAgICAgICAgICBjb25zdCBlYXN0ZXJuSGVtID0gdGhpcy5nZXRDbHVzdGVycyhbbWluTG5nLCBtaW5MYXQsIDE4MCwgbWF4TGF0XSwgem9vbSk7XG4gICAgICAgICAgICBjb25zdCB3ZXN0ZXJuSGVtID0gdGhpcy5nZXRDbHVzdGVycyhbLTE4MCwgbWluTGF0LCBtYXhMbmcsIG1heExhdF0sIHpvb20pO1xuICAgICAgICAgICAgcmV0dXJuIGVhc3Rlcm5IZW0uY29uY2F0KHdlc3Rlcm5IZW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdHJlZSA9IHRoaXMudHJlZXNbdGhpcy5fbGltaXRab29tKHpvb20pXTtcbiAgICAgICAgY29uc3QgaWRzID0gdHJlZS5yYW5nZShsbmdYKG1pbkxuZyksIGxhdFkobWF4TGF0KSwgbG5nWChtYXhMbmcpLCBsYXRZKG1pbkxhdCkpO1xuICAgICAgICBjb25zdCBjbHVzdGVycyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGlkIG9mIGlkcykge1xuICAgICAgICAgICAgY29uc3QgYyA9IHRyZWUucG9pbnRzW2lkXTtcbiAgICAgICAgICAgIGNsdXN0ZXJzLnB1c2goYy5udW1Qb2ludHMgPyBnZXRDbHVzdGVySlNPTihjKSA6IHRoaXMucG9pbnRzW2MuaW5kZXhdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2x1c3RlcnM7XG4gICAgfVxuXG4gICAgZ2V0Q2hpbGRyZW4oY2x1c3RlcklkKSB7XG4gICAgICAgIGNvbnN0IG9yaWdpbklkID0gdGhpcy5fZ2V0T3JpZ2luSWQoY2x1c3RlcklkKTtcbiAgICAgICAgY29uc3Qgb3JpZ2luWm9vbSA9IHRoaXMuX2dldE9yaWdpblpvb20oY2x1c3RlcklkKTtcbiAgICAgICAgY29uc3QgZXJyb3JNc2cgPSAnTm8gY2x1c3RlciB3aXRoIHRoZSBzcGVjaWZpZWQgaWQuJztcblxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMudHJlZXNbb3JpZ2luWm9vbV07XG4gICAgICAgIGlmICghaW5kZXgpIHRocm93IG5ldyBFcnJvcihlcnJvck1zZyk7XG5cbiAgICAgICAgY29uc3Qgb3JpZ2luID0gaW5kZXgucG9pbnRzW29yaWdpbklkXTtcbiAgICAgICAgaWYgKCFvcmlnaW4pIHRocm93IG5ldyBFcnJvcihlcnJvck1zZyk7XG5cbiAgICAgICAgY29uc3QgciA9IHRoaXMub3B0aW9ucy5yYWRpdXMgLyAodGhpcy5vcHRpb25zLmV4dGVudCAqIE1hdGgucG93KDIsIG9yaWdpblpvb20gLSAxKSk7XG4gICAgICAgIGNvbnN0IGlkcyA9IGluZGV4LndpdGhpbihvcmlnaW4ueCwgb3JpZ2luLnksIHIpO1xuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGlkIG9mIGlkcykge1xuICAgICAgICAgICAgY29uc3QgYyA9IGluZGV4LnBvaW50c1tpZF07XG4gICAgICAgICAgICBpZiAoYy5wYXJlbnRJZCA9PT0gY2x1c3RlcklkKSB7XG4gICAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaChjLm51bVBvaW50cyA/IGdldENsdXN0ZXJKU09OKGMpIDogdGhpcy5wb2ludHNbYy5pbmRleF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA9PT0gMCkgdGhyb3cgbmV3IEVycm9yKGVycm9yTXNnKTtcblxuICAgICAgICByZXR1cm4gY2hpbGRyZW47XG4gICAgfVxuXG4gICAgZ2V0TGVhdmVzKGNsdXN0ZXJJZCwgbGltaXQsIG9mZnNldCkge1xuICAgICAgICBsaW1pdCA9IGxpbWl0IHx8IDEwO1xuICAgICAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgICAgICBjb25zdCBsZWF2ZXMgPSBbXTtcbiAgICAgICAgdGhpcy5fYXBwZW5kTGVhdmVzKGxlYXZlcywgY2x1c3RlcklkLCBsaW1pdCwgb2Zmc2V0LCAwKTtcblxuICAgICAgICByZXR1cm4gbGVhdmVzO1xuICAgIH1cblxuICAgIGdldFRpbGUoeiwgeCwgeSkge1xuICAgICAgICBjb25zdCB0cmVlID0gdGhpcy50cmVlc1t0aGlzLl9saW1pdFpvb20oeildO1xuICAgICAgICBjb25zdCB6MiA9IE1hdGgucG93KDIsIHopO1xuICAgICAgICBjb25zdCB7ZXh0ZW50LCByYWRpdXN9ID0gdGhpcy5vcHRpb25zO1xuICAgICAgICBjb25zdCBwID0gcmFkaXVzIC8gZXh0ZW50O1xuICAgICAgICBjb25zdCB0b3AgPSAoeSAtIHApIC8gejI7XG4gICAgICAgIGNvbnN0IGJvdHRvbSA9ICh5ICsgMSArIHApIC8gejI7XG5cbiAgICAgICAgY29uc3QgdGlsZSA9IHtcbiAgICAgICAgICAgIGZlYXR1cmVzOiBbXVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX2FkZFRpbGVGZWF0dXJlcyhcbiAgICAgICAgICAgIHRyZWUucmFuZ2UoKHggLSBwKSAvIHoyLCB0b3AsICh4ICsgMSArIHApIC8gejIsIGJvdHRvbSksXG4gICAgICAgICAgICB0cmVlLnBvaW50cywgeCwgeSwgejIsIHRpbGUpO1xuXG4gICAgICAgIGlmICh4ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRUaWxlRmVhdHVyZXMoXG4gICAgICAgICAgICAgICAgdHJlZS5yYW5nZSgxIC0gcCAvIHoyLCB0b3AsIDEsIGJvdHRvbSksXG4gICAgICAgICAgICAgICAgdHJlZS5wb2ludHMsIHoyLCB5LCB6MiwgdGlsZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHggPT09IHoyIC0gMSkge1xuICAgICAgICAgICAgdGhpcy5fYWRkVGlsZUZlYXR1cmVzKFxuICAgICAgICAgICAgICAgIHRyZWUucmFuZ2UoMCwgdG9wLCBwIC8gejIsIGJvdHRvbSksXG4gICAgICAgICAgICAgICAgdHJlZS5wb2ludHMsIC0xLCB5LCB6MiwgdGlsZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGlsZS5mZWF0dXJlcy5sZW5ndGggPyB0aWxlIDogbnVsbDtcbiAgICB9XG5cbiAgICBnZXRDbHVzdGVyRXhwYW5zaW9uWm9vbShjbHVzdGVySWQpIHtcbiAgICAgICAgbGV0IGV4cGFuc2lvblpvb20gPSB0aGlzLl9nZXRPcmlnaW5ab29tKGNsdXN0ZXJJZCkgLSAxO1xuICAgICAgICB3aGlsZSAoZXhwYW5zaW9uWm9vbSA8PSB0aGlzLm9wdGlvbnMubWF4Wm9vbSkge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLmdldENoaWxkcmVuKGNsdXN0ZXJJZCk7XG4gICAgICAgICAgICBleHBhbnNpb25ab29tKys7XG4gICAgICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoICE9PSAxKSBicmVhaztcbiAgICAgICAgICAgIGNsdXN0ZXJJZCA9IGNoaWxkcmVuWzBdLnByb3BlcnRpZXMuY2x1c3Rlcl9pZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXhwYW5zaW9uWm9vbTtcbiAgICB9XG5cbiAgICBfYXBwZW5kTGVhdmVzKHJlc3VsdCwgY2x1c3RlcklkLCBsaW1pdCwgb2Zmc2V0LCBza2lwcGVkKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5nZXRDaGlsZHJlbihjbHVzdGVySWQpO1xuXG4gICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IHByb3BzID0gY2hpbGQucHJvcGVydGllcztcblxuICAgICAgICAgICAgaWYgKHByb3BzICYmIHByb3BzLmNsdXN0ZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2tpcHBlZCArIHByb3BzLnBvaW50X2NvdW50IDw9IG9mZnNldCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBza2lwIHRoZSB3aG9sZSBjbHVzdGVyXG4gICAgICAgICAgICAgICAgICAgIHNraXBwZWQgKz0gcHJvcHMucG9pbnRfY291bnQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZW50ZXIgdGhlIGNsdXN0ZXJcbiAgICAgICAgICAgICAgICAgICAgc2tpcHBlZCA9IHRoaXMuX2FwcGVuZExlYXZlcyhyZXN1bHQsIHByb3BzLmNsdXN0ZXJfaWQsIGxpbWl0LCBvZmZzZXQsIHNraXBwZWQpO1xuICAgICAgICAgICAgICAgICAgICAvLyBleGl0IHRoZSBjbHVzdGVyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChza2lwcGVkIDwgb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgLy8gc2tpcCBhIHNpbmdsZSBwb2ludFxuICAgICAgICAgICAgICAgIHNraXBwZWQrKztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gYWRkIGEgc2luZ2xlIHBvaW50XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPT09IGxpbWl0KSBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBza2lwcGVkO1xuICAgIH1cblxuICAgIF9hZGRUaWxlRmVhdHVyZXMoaWRzLCBwb2ludHMsIHgsIHksIHoyLCB0aWxlKSB7XG4gICAgICAgIGZvciAoY29uc3QgaSBvZiBpZHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGMgPSBwb2ludHNbaV07XG4gICAgICAgICAgICBjb25zdCBpc0NsdXN0ZXIgPSBjLm51bVBvaW50cztcbiAgICAgICAgICAgIGNvbnN0IGYgPSB7XG4gICAgICAgICAgICAgICAgdHlwZTogMSxcbiAgICAgICAgICAgICAgICBnZW9tZXRyeTogW1tcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5yb3VuZCh0aGlzLm9wdGlvbnMuZXh0ZW50ICogKGMueCAqIHoyIC0geCkpLFxuICAgICAgICAgICAgICAgICAgICBNYXRoLnJvdW5kKHRoaXMub3B0aW9ucy5leHRlbnQgKiAoYy55ICogejIgLSB5KSlcbiAgICAgICAgICAgICAgICBdXSxcbiAgICAgICAgICAgICAgICB0YWdzOiBpc0NsdXN0ZXIgPyBnZXRDbHVzdGVyUHJvcGVydGllcyhjKSA6IHRoaXMucG9pbnRzW2MuaW5kZXhdLnByb3BlcnRpZXNcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGFzc2lnbiBpZFxuICAgICAgICAgICAgbGV0IGlkO1xuICAgICAgICAgICAgaWYgKGlzQ2x1c3Rlcikge1xuICAgICAgICAgICAgICAgIGlkID0gYy5pZDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLmdlbmVyYXRlSWQpIHtcbiAgICAgICAgICAgICAgICAvLyBvcHRpb25hbGx5IGdlbmVyYXRlIGlkXG4gICAgICAgICAgICAgICAgaWQgPSBjLmluZGV4O1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBvaW50c1tjLmluZGV4XS5pZCkge1xuICAgICAgICAgICAgICAgIC8vIGtlZXAgaWQgaWYgYWxyZWFkeSBhc3NpZ25lZFxuICAgICAgICAgICAgICAgIGlkID0gdGhpcy5wb2ludHNbYy5pbmRleF0uaWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpZCAhPT0gdW5kZWZpbmVkKSBmLmlkID0gaWQ7XG5cbiAgICAgICAgICAgIHRpbGUuZmVhdHVyZXMucHVzaChmKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9saW1pdFpvb20oeikge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgodGhpcy5vcHRpb25zLm1pblpvb20sIE1hdGgubWluKCt6LCB0aGlzLm9wdGlvbnMubWF4Wm9vbSArIDEpKTtcbiAgICB9XG5cbiAgICBfY2x1c3Rlcihwb2ludHMsIHpvb20pIHtcbiAgICAgICAgY29uc3QgY2x1c3RlcnMgPSBbXTtcbiAgICAgICAgY29uc3Qge3JhZGl1cywgZXh0ZW50LCByZWR1Y2UsIG1pblBvaW50c30gPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgIGNvbnN0IHIgPSByYWRpdXMgLyAoZXh0ZW50ICogTWF0aC5wb3coMiwgem9vbSkpO1xuXG4gICAgICAgIC8vIGxvb3AgdGhyb3VnaCBlYWNoIHBvaW50XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBwID0gcG9pbnRzW2ldO1xuICAgICAgICAgICAgLy8gaWYgd2UndmUgYWxyZWFkeSB2aXNpdGVkIHRoZSBwb2ludCBhdCB0aGlzIHpvb20gbGV2ZWwsIHNraXAgaXRcbiAgICAgICAgICAgIGlmIChwLnpvb20gPD0gem9vbSkgY29udGludWU7XG4gICAgICAgICAgICBwLnpvb20gPSB6b29tO1xuXG4gICAgICAgICAgICAvLyBmaW5kIGFsbCBuZWFyYnkgcG9pbnRzXG4gICAgICAgICAgICBjb25zdCB0cmVlID0gdGhpcy50cmVlc1t6b29tICsgMV07XG4gICAgICAgICAgICBjb25zdCBuZWlnaGJvcklkcyA9IHRyZWUud2l0aGluKHAueCwgcC55LCByKTtcblxuICAgICAgICAgICAgY29uc3QgbnVtUG9pbnRzT3JpZ2luID0gcC5udW1Qb2ludHMgfHwgMTtcbiAgICAgICAgICAgIGxldCBudW1Qb2ludHMgPSBudW1Qb2ludHNPcmlnaW47XG5cbiAgICAgICAgICAgIC8vIGNvdW50IHRoZSBudW1iZXIgb2YgcG9pbnRzIGluIGEgcG90ZW50aWFsIGNsdXN0ZXJcbiAgICAgICAgICAgIGZvciAoY29uc3QgbmVpZ2hib3JJZCBvZiBuZWlnaGJvcklkcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGIgPSB0cmVlLnBvaW50c1tuZWlnaGJvcklkXTtcbiAgICAgICAgICAgICAgICAvLyBmaWx0ZXIgb3V0IG5laWdoYm9ycyB0aGF0IGFyZSBhbHJlYWR5IHByb2Nlc3NlZFxuICAgICAgICAgICAgICAgIGlmIChiLnpvb20gPiB6b29tKSBudW1Qb2ludHMgKz0gYi5udW1Qb2ludHMgfHwgMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG51bVBvaW50cyA+PSBtaW5Qb2ludHMpIHsgLy8gZW5vdWdoIHBvaW50cyB0byBmb3JtIGEgY2x1c3RlclxuICAgICAgICAgICAgICAgIGxldCB3eCA9IHAueCAqIG51bVBvaW50c09yaWdpbjtcbiAgICAgICAgICAgICAgICBsZXQgd3kgPSBwLnkgKiBudW1Qb2ludHNPcmlnaW47XG5cbiAgICAgICAgICAgICAgICBsZXQgY2x1c3RlclByb3BlcnRpZXMgPSByZWR1Y2UgJiYgbnVtUG9pbnRzT3JpZ2luID4gMSA/IHRoaXMuX21hcChwLCB0cnVlKSA6IG51bGw7XG5cbiAgICAgICAgICAgICAgICAvLyBlbmNvZGUgYm90aCB6b29tIGFuZCBwb2ludCBpbmRleCBvbiB3aGljaCB0aGUgY2x1c3RlciBvcmlnaW5hdGVkIC0tIG9mZnNldCBieSB0b3RhbCBsZW5ndGggb2YgZmVhdHVyZXNcbiAgICAgICAgICAgICAgICBjb25zdCBpZCA9IChpIDw8IDUpICsgKHpvb20gKyAxKSArIHRoaXMucG9pbnRzLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbmVpZ2hib3JJZCBvZiBuZWlnaGJvcklkcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBiID0gdHJlZS5wb2ludHNbbmVpZ2hib3JJZF07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGIuem9vbSA8PSB6b29tKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgYi56b29tID0gem9vbTsgLy8gc2F2ZSB0aGUgem9vbSAoc28gaXQgZG9lc24ndCBnZXQgcHJvY2Vzc2VkIHR3aWNlKVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG51bVBvaW50czIgPSBiLm51bVBvaW50cyB8fCAxO1xuICAgICAgICAgICAgICAgICAgICB3eCArPSBiLnggKiBudW1Qb2ludHMyOyAvLyBhY2N1bXVsYXRlIGNvb3JkaW5hdGVzIGZvciBjYWxjdWxhdGluZyB3ZWlnaHRlZCBjZW50ZXJcbiAgICAgICAgICAgICAgICAgICAgd3kgKz0gYi55ICogbnVtUG9pbnRzMjtcblxuICAgICAgICAgICAgICAgICAgICBiLnBhcmVudElkID0gaWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlZHVjZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjbHVzdGVyUHJvcGVydGllcykgY2x1c3RlclByb3BlcnRpZXMgPSB0aGlzLl9tYXAocCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWR1Y2UoY2x1c3RlclByb3BlcnRpZXMsIHRoaXMuX21hcChiKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwLnBhcmVudElkID0gaWQ7XG4gICAgICAgICAgICAgICAgY2x1c3RlcnMucHVzaChjcmVhdGVDbHVzdGVyKHd4IC8gbnVtUG9pbnRzLCB3eSAvIG51bVBvaW50cywgaWQsIG51bVBvaW50cywgY2x1c3RlclByb3BlcnRpZXMpKTtcblxuICAgICAgICAgICAgfSBlbHNlIHsgLy8gbGVmdCBwb2ludHMgYXMgdW5jbHVzdGVyZWRcbiAgICAgICAgICAgICAgICBjbHVzdGVycy5wdXNoKHApO1xuXG4gICAgICAgICAgICAgICAgaWYgKG51bVBvaW50cyA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBuZWlnaGJvcklkIG9mIG5laWdoYm9ySWRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiID0gdHJlZS5wb2ludHNbbmVpZ2hib3JJZF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYi56b29tIDw9IHpvb20pIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYi56b29tID0gem9vbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsdXN0ZXJzLnB1c2goYik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2x1c3RlcnM7XG4gICAgfVxuXG4gICAgLy8gZ2V0IGluZGV4IG9mIHRoZSBwb2ludCBmcm9tIHdoaWNoIHRoZSBjbHVzdGVyIG9yaWdpbmF0ZWRcbiAgICBfZ2V0T3JpZ2luSWQoY2x1c3RlcklkKSB7XG4gICAgICAgIHJldHVybiAoY2x1c3RlcklkIC0gdGhpcy5wb2ludHMubGVuZ3RoKSA+PiA1O1xuICAgIH1cblxuICAgIC8vIGdldCB6b29tIG9mIHRoZSBwb2ludCBmcm9tIHdoaWNoIHRoZSBjbHVzdGVyIG9yaWdpbmF0ZWRcbiAgICBfZ2V0T3JpZ2luWm9vbShjbHVzdGVySWQpIHtcbiAgICAgICAgcmV0dXJuIChjbHVzdGVySWQgLSB0aGlzLnBvaW50cy5sZW5ndGgpICUgMzI7XG4gICAgfVxuXG4gICAgX21hcChwb2ludCwgY2xvbmUpIHtcbiAgICAgICAgaWYgKHBvaW50Lm51bVBvaW50cykge1xuICAgICAgICAgICAgcmV0dXJuIGNsb25lID8gZXh0ZW5kKHt9LCBwb2ludC5wcm9wZXJ0aWVzKSA6IHBvaW50LnByb3BlcnRpZXM7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb3JpZ2luYWwgPSB0aGlzLnBvaW50c1twb2ludC5pbmRleF0ucHJvcGVydGllcztcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5vcHRpb25zLm1hcChvcmlnaW5hbCk7XG4gICAgICAgIHJldHVybiBjbG9uZSAmJiByZXN1bHQgPT09IG9yaWdpbmFsID8gZXh0ZW5kKHt9LCByZXN1bHQpIDogcmVzdWx0O1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlQ2x1c3Rlcih4LCB5LCBpZCwgbnVtUG9pbnRzLCBwcm9wZXJ0aWVzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeCwgLy8gd2VpZ2h0ZWQgY2x1c3RlciBjZW50ZXJcbiAgICAgICAgeSxcbiAgICAgICAgem9vbTogSW5maW5pdHksIC8vIHRoZSBsYXN0IHpvb20gdGhlIGNsdXN0ZXIgd2FzIHByb2Nlc3NlZCBhdFxuICAgICAgICBpZCwgLy8gZW5jb2RlcyBpbmRleCBvZiB0aGUgZmlyc3QgY2hpbGQgb2YgdGhlIGNsdXN0ZXIgYW5kIGl0cyB6b29tIGxldmVsXG4gICAgICAgIHBhcmVudElkOiAtMSwgLy8gcGFyZW50IGNsdXN0ZXIgaWRcbiAgICAgICAgbnVtUG9pbnRzLFxuICAgICAgICBwcm9wZXJ0aWVzXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUG9pbnRDbHVzdGVyKHAsIGlkKSB7XG4gICAgY29uc3QgW3gsIHldID0gcC5nZW9tZXRyeS5jb29yZGluYXRlcztcbiAgICByZXR1cm4ge1xuICAgICAgICB4OiBsbmdYKHgpLCAvLyBwcm9qZWN0ZWQgcG9pbnQgY29vcmRpbmF0ZXNcbiAgICAgICAgeTogbGF0WSh5KSxcbiAgICAgICAgem9vbTogSW5maW5pdHksIC8vIHRoZSBsYXN0IHpvb20gdGhlIHBvaW50IHdhcyBwcm9jZXNzZWQgYXRcbiAgICAgICAgaW5kZXg6IGlkLCAvLyBpbmRleCBvZiB0aGUgc291cmNlIGZlYXR1cmUgaW4gdGhlIG9yaWdpbmFsIGlucHV0IGFycmF5LFxuICAgICAgICBwYXJlbnRJZDogLTEgLy8gcGFyZW50IGNsdXN0ZXIgaWRcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBnZXRDbHVzdGVySlNPTihjbHVzdGVyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogJ0ZlYXR1cmUnLFxuICAgICAgICBpZDogY2x1c3Rlci5pZCxcbiAgICAgICAgcHJvcGVydGllczogZ2V0Q2x1c3RlclByb3BlcnRpZXMoY2x1c3RlciksXG4gICAgICAgIGdlb21ldHJ5OiB7XG4gICAgICAgICAgICB0eXBlOiAnUG9pbnQnLFxuICAgICAgICAgICAgY29vcmRpbmF0ZXM6IFt4TG5nKGNsdXN0ZXIueCksIHlMYXQoY2x1c3Rlci55KV1cbiAgICAgICAgfVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGdldENsdXN0ZXJQcm9wZXJ0aWVzKGNsdXN0ZXIpIHtcbiAgICBjb25zdCBjb3VudCA9IGNsdXN0ZXIubnVtUG9pbnRzO1xuICAgIGNvbnN0IGFiYnJldiA9XG4gICAgICAgIGNvdW50ID49IDEwMDAwID8gYCR7TWF0aC5yb3VuZChjb3VudCAvIDEwMDApICB9a2AgOlxuICAgICAgICBjb3VudCA+PSAxMDAwID8gYCR7TWF0aC5yb3VuZChjb3VudCAvIDEwMCkgLyAxMCAgfWtgIDogY291bnQ7XG4gICAgcmV0dXJuIGV4dGVuZChleHRlbmQoe30sIGNsdXN0ZXIucHJvcGVydGllcyksIHtcbiAgICAgICAgY2x1c3RlcjogdHJ1ZSxcbiAgICAgICAgY2x1c3Rlcl9pZDogY2x1c3Rlci5pZCxcbiAgICAgICAgcG9pbnRfY291bnQ6IGNvdW50LFxuICAgICAgICBwb2ludF9jb3VudF9hYmJyZXZpYXRlZDogYWJicmV2XG4gICAgfSk7XG59XG5cbi8vIGxvbmdpdHVkZS9sYXRpdHVkZSB0byBzcGhlcmljYWwgbWVyY2F0b3IgaW4gWzAuLjFdIHJhbmdlXG5mdW5jdGlvbiBsbmdYKGxuZykge1xuICAgIHJldHVybiBsbmcgLyAzNjAgKyAwLjU7XG59XG5mdW5jdGlvbiBsYXRZKGxhdCkge1xuICAgIGNvbnN0IHNpbiA9IE1hdGguc2luKGxhdCAqIE1hdGguUEkgLyAxODApO1xuICAgIGNvbnN0IHkgPSAoMC41IC0gMC4yNSAqIE1hdGgubG9nKCgxICsgc2luKSAvICgxIC0gc2luKSkgLyBNYXRoLlBJKTtcbiAgICByZXR1cm4geSA8IDAgPyAwIDogeSA+IDEgPyAxIDogeTtcbn1cblxuLy8gc3BoZXJpY2FsIG1lcmNhdG9yIHRvIGxvbmdpdHVkZS9sYXRpdHVkZVxuZnVuY3Rpb24geExuZyh4KSB7XG4gICAgcmV0dXJuICh4IC0gMC41KSAqIDM2MDtcbn1cbmZ1bmN0aW9uIHlMYXQoeSkge1xuICAgIGNvbnN0IHkyID0gKDE4MCAtIHkgKiAzNjApICogTWF0aC5QSSAvIDE4MDtcbiAgICByZXR1cm4gMzYwICogTWF0aC5hdGFuKE1hdGguZXhwKHkyKSkgLyBNYXRoLlBJIC0gOTA7XG59XG5cbmZ1bmN0aW9uIGV4dGVuZChkZXN0LCBzcmMpIHtcbiAgICBmb3IgKGNvbnN0IGlkIGluIHNyYykgZGVzdFtpZF0gPSBzcmNbaWRdO1xuICAgIHJldHVybiBkZXN0O1xufVxuXG5mdW5jdGlvbiBnZXRYKHApIHtcbiAgICByZXR1cm4gcC54O1xufVxuZnVuY3Rpb24gZ2V0WShwKSB7XG4gICAgcmV0dXJuIHAueTtcbn1cbiIsImltcG9ydCB7IFN1cGVyQ2x1c3RlckFkYXB0ZXIgfSBmcm9tICcuL2NsdXN0ZXJlcic7XG5pbXBvcnQge1xuICBSQURJVVNfREVGQVVMVCxcbiAgTUFSS0VSX0NMVVNURVJfSU1BR0VfRVhURU5TSU9OLFxuICBNQVJLRVJfQ0xVU1RFUl9JTUFHRV9QQVRIX0RFRkFVTFQsXG4gIE1BWF9aT09NX0RFRkFVTFQsXG4gIE1JTl9aT09NX0RFRkFVTFQsXG4gIElDT05fVVJMX0RFRkFVTFQsXG59IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IENsdXN0ZXJlckhlbHBlciB9IGZyb20gJy4vaGVscGVyJztcbmltcG9ydCB7IElTdHlsZSwgT3ZlcmxhcHBpbmdNYXJrZXJTcGlkZXJmaWVyIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCBTdXBlcmNsdXN0ZXIgZnJvbSAnc3VwZXJjbHVzdGVyJztcblxuZXhwb3J0IGNsYXNzIEJ1aWxkZXIge1xuICBwcml2YXRlIHBNYXA6IGdvb2dsZS5tYXBzLk1hcDtcbiAgcHJpdmF0ZSBwUmFkaXVzOiBudW1iZXIgPSBSQURJVVNfREVGQVVMVDtcbiAgcHJpdmF0ZSBwTWF4Wm9vbTogbnVtYmVyID0gTUFYX1pPT01fREVGQVVMVDtcbiAgcHJpdmF0ZSBwTWluWm9vbTogbnVtYmVyID0gTUlOX1pPT01fREVGQVVMVDtcbiAgcHJpdmF0ZSBwU3R5bGVzOiBJU3R5bGVbXSA9IFtdO1xuICBwcml2YXRlIHBJbWFnZVBhdGg6IHN0cmluZyA9IE1BUktFUl9DTFVTVEVSX0lNQUdFX1BBVEhfREVGQVVMVDtcbiAgcHJpdmF0ZSBwSW1hZ2VFeHRlbnNpb246IHN0cmluZyA9IE1BUktFUl9DTFVTVEVSX0lNQUdFX0VYVEVOU0lPTjtcbiAgcHJpdmF0ZSBwWm9vbU9uQ2xpY2sgPSB0cnVlO1xuICBwcml2YXRlIHBDdXN0b21NYXJrZXJJY29uOiAocG9pbnRGZWF0dXJlOiBTdXBlcmNsdXN0ZXIuUG9pbnRGZWF0dXJlPFN1cGVyY2x1c3Rlci5BbnlQcm9wcz4pID0+IHN0cmluZztcbiAgcHJpdmF0ZSBwTWFya2VyQ2xpY2s6IChtYXJrZXI6IGdvb2dsZS5tYXBzLk1hcmtlciwgZXZlbnQ6IGdvb2dsZS5tYXBzLk1vdXNlRXZlbnQpID0+IHZvaWQ7XG4gIHByaXZhdGUgcEZlYXR1cmVDbGljazogKGV2ZW50OiBnb29nbGUubWFwcy5EYXRhLk1vdXNlRXZlbnQpID0+IHZvaWQ7XG4gIHByaXZhdGUgcEZlYXR1cmVTdHlsZTogZ29vZ2xlLm1hcHMuRGF0YS5TdHlsaW5nRnVuY3Rpb247XG4gIHByaXZhdGUgcFNlcnZlclNpZGVGZWF0dXJlVG9TdXBlckNsdXN0ZXI6IChcbiAgICBmZWF0dXJlOiBhbnksXG4gICkgPT4gU3VwZXJjbHVzdGVyLkNsdXN0ZXJGZWF0dXJlPFN1cGVyY2x1c3Rlci5BbnlQcm9wcz4gfCBTdXBlcmNsdXN0ZXIuUG9pbnRGZWF0dXJlPFN1cGVyY2x1c3Rlci5BbnlQcm9wcz47XG4gIHByaXZhdGUgcE92ZXJsYXBNYXJrZXJTcGlkZXJmaWVyOiBPdmVybGFwcGluZ01hcmtlclNwaWRlcmZpZXIgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBwVXNlU2VydmVyU2lkZUNsdXN0ZXJlciA9IGZhbHNlO1xuICBwcml2YXRlIHBHZXRDbHVzdGVyc1NlcnZlclNpZGU6IChiYm94OiBHZW9KU09OLkJCb3gsIHpvb206IG51bWJlcikgPT4gUHJvbWlzZTxhbnlbXT47XG5cbiAgY29uc3RydWN0b3IobWFwOiBnb29nbGUubWFwcy5NYXApIHtcbiAgICB0aGlzLnBNYXAgPSBtYXA7XG4gICAgdGhpcy5wQ3VzdG9tTWFya2VySWNvbiA9IChwb2ludEZlYXR1cmU6IFN1cGVyY2x1c3Rlci5Qb2ludEZlYXR1cmU8U3VwZXJjbHVzdGVyLkFueVByb3BzPikgPT4ge1xuICAgICAgaWYgKHBvaW50RmVhdHVyZS5wcm9wZXJ0aWVzLmljb25VcmwpIHtcbiAgICAgICAgcmV0dXJuIHBvaW50RmVhdHVyZS5wcm9wZXJ0aWVzLmljb25VcmwgYXMgc3RyaW5nO1xuICAgICAgfVxuICAgICAgcmV0dXJuIElDT05fVVJMX0RFRkFVTFQ7XG4gICAgfTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgdGhpcy5wTWFya2VyQ2xpY2sgPSAobWFya2VyOiBnb29nbGUubWFwcy5NYXJrZXIsIGV2ZW50OiBnb29nbGUubWFwcy5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgICByZXR1cm47XG4gICAgfTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgdGhpcy5wRmVhdHVyZUNsaWNrID0gKGV2ZW50OiBnb29nbGUubWFwcy5EYXRhLk1vdXNlRXZlbnQpID0+IHtcbiAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICB0aGlzLnBGZWF0dXJlU3R5bGUgPSAoZmVhdHVyZTogZ29vZ2xlLm1hcHMuRGF0YS5GZWF0dXJlKSA9PiB7XG4gICAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShudWxsKSBhcyBnb29nbGUubWFwcy5EYXRhLlN0eWxlT3B0aW9ucztcbiAgICB9O1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICB0aGlzLnBTZXJ2ZXJTaWRlRmVhdHVyZVRvU3VwZXJDbHVzdGVyID0gKGZlYXR1cmU6IGFueSkgPT4ge1xuICAgICAgY29uc3Qgc2NmZWF0dXJlOiBTdXBlcmNsdXN0ZXIuUG9pbnRGZWF0dXJlPFN1cGVyY2x1c3Rlci5BbnlQcm9wcz4gPSB7XG4gICAgICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICAgICAgZ2VvbWV0cnk6IHtcbiAgICAgICAgICB0eXBlOiAnUG9pbnQnLFxuICAgICAgICAgIGNvb3JkaW5hdGVzOiBbMCwgMF0sXG4gICAgICAgIH0sXG4gICAgICAgIHByb3BlcnRpZXM6IHt9LFxuICAgICAgfTtcbiAgICAgIHJldHVybiBzY2ZlYXR1cmU7XG4gICAgfTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzLCBAdHlwZXNjcmlwdC1lc2xpbnQvcmVxdWlyZS1hd2FpdFxuICAgIHRoaXMucEdldENsdXN0ZXJzU2VydmVyU2lkZSA9IGFzeW5jIChiYm94OiBHZW9KU09OLkJCb3gsIHpvb206IG51bWJlcikgPT4ge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH07XG4gIH1cblxuICBwdWJsaWMgd2l0aFJhZGl1cyhyYWRpdXM6IG51bWJlcik6IEJ1aWxkZXIge1xuICAgIHRoaXMucFJhZGl1cyA9IHJhZGl1cztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHB1YmxpYyB3aXRoTWF4Wm9vbShtYXhab29tOiBudW1iZXIpOiBCdWlsZGVyIHtcbiAgICB0aGlzLnBNYXhab29tID0gbWF4Wm9vbTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHB1YmxpYyB3aXRoTWluWm9vbShtaW5ab29tOiBudW1iZXIpOiBCdWlsZGVyIHtcbiAgICB0aGlzLnBNaW5ab29tID0gbWluWm9vbTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHB1YmxpYyB3aXRoU3R5bGVzKHN0eWxlczogSVN0eWxlW10pOiBCdWlsZGVyIHtcbiAgICB0aGlzLnBTdHlsZXMgPSBzdHlsZXM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwdWJsaWMgd2l0aEltYWdlUGF0aChpbWFnZVBhdGg6IHN0cmluZyk6IEJ1aWxkZXIge1xuICAgIHRoaXMucEltYWdlUGF0aCA9IGltYWdlUGF0aDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHB1YmxpYyB3aXRoSW1hZ2VFeHRlbnNpb24oaW1hZ2VFeHRlbnNpb246IHN0cmluZyk6IEJ1aWxkZXIge1xuICAgIHRoaXMucEltYWdlRXh0ZW5zaW9uID0gaW1hZ2VFeHRlbnNpb247XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwdWJsaWMgd2l0aFpvb21PbkNsaWNrKHpvb21PbkNsaWNrOiBib29sZWFuKTogQnVpbGRlciB7XG4gICAgdGhpcy5wWm9vbU9uQ2xpY2sgPSB6b29tT25DbGljaztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHB1YmxpYyB3aXRoQ3VzdG9tTWFya2VySWNvbihcbiAgICBjdXN0b21JY29uOiAocG9pbnRGZWF0dXJlOiBTdXBlcmNsdXN0ZXIuUG9pbnRGZWF0dXJlPFN1cGVyY2x1c3Rlci5BbnlQcm9wcz4pID0+IHN0cmluZyxcbiAgKTogQnVpbGRlciB7XG4gICAgdGhpcy5wQ3VzdG9tTWFya2VySWNvbiA9IGN1c3RvbUljb24gYXMgKHBvaW50RmVhdHVyZTogU3VwZXJjbHVzdGVyLlBvaW50RmVhdHVyZTxTdXBlcmNsdXN0ZXIuQW55UHJvcHM+KSA9PiBzdHJpbmc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwdWJsaWMgd2l0aE1hcmtlckNsaWNrKG1hcmtlckNsaWNrOiAobWFya2VyOiBnb29nbGUubWFwcy5NYXJrZXIsIGV2ZW50OiBnb29nbGUubWFwcy5Nb3VzZUV2ZW50KSA9PiB2b2lkKTogQnVpbGRlciB7XG4gICAgdGhpcy5wTWFya2VyQ2xpY2sgPSBtYXJrZXJDbGljaztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHB1YmxpYyB3aXRoRmVhdHVyZUNsaWNrKGZlYXR1cmVDbGljazogKGV2ZW50OiBnb29nbGUubWFwcy5EYXRhLk1vdXNlRXZlbnQpID0+IHZvaWQpOiBCdWlsZGVyIHtcbiAgICB0aGlzLnBGZWF0dXJlQ2xpY2sgPSBmZWF0dXJlQ2xpY2s7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwdWJsaWMgd2l0aEZlYXR1cmVTdHlsZShmZWF0dXJlU3R5bGU6IGdvb2dsZS5tYXBzLkRhdGEuU3R5bGluZ0Z1bmN0aW9uKTogQnVpbGRlciB7XG4gICAgdGhpcy5wRmVhdHVyZVN0eWxlID0gZmVhdHVyZVN0eWxlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHVibGljIHdpdGhTZXJ2ZXJTaWRlRmVhdHVyZVRvU3VwZXJDbHVzdGVyKFxuICAgIHRyYW5zZm9ybTogKFxuICAgICAgZmVhdHVyZTogYW55LFxuICAgICkgPT4gU3VwZXJjbHVzdGVyLkNsdXN0ZXJGZWF0dXJlPFN1cGVyY2x1c3Rlci5BbnlQcm9wcz4gfCBTdXBlcmNsdXN0ZXIuUG9pbnRGZWF0dXJlPFN1cGVyY2x1c3Rlci5BbnlQcm9wcz4sXG4gICk6IEJ1aWxkZXIge1xuICAgIHRoaXMucFNlcnZlclNpZGVGZWF0dXJlVG9TdXBlckNsdXN0ZXIgPSB0cmFuc2Zvcm07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwdWJsaWMgd2l0aE92ZXJsYXBNYXJrZXJTcGlkZXJmaWVyKG9tczogT3ZlcmxhcHBpbmdNYXJrZXJTcGlkZXJmaWVyKTogQnVpbGRlciB7XG4gICAgdGhpcy5wT3ZlcmxhcE1hcmtlclNwaWRlcmZpZXIgPSBvbXM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwdWJsaWMgd2l0aEdldENsdXN0ZXJzU2VydmVyU2lkZShnZXRDbHVzdGVyczogKGJib3g6IEdlb0pTT04uQkJveCwgem9vbTogbnVtYmVyKSA9PiBQcm9taXNlPGFueVtdPik6IEJ1aWxkZXIge1xuICAgIHRoaXMucFVzZVNlcnZlclNpZGVDbHVzdGVyZXIgPSB0cnVlO1xuICAgIHRoaXMucEdldENsdXN0ZXJzU2VydmVyU2lkZSA9IGdldENsdXN0ZXJzO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHVibGljIGJ1aWxkKCk6IFN1cGVyQ2x1c3RlckFkYXB0ZXIge1xuICAgIGNvbnN0IGNsdXN0ZXJlciA9IG5ldyBTdXBlckNsdXN0ZXJBZGFwdGVyKHRoaXMpO1xuICAgIENsdXN0ZXJlckhlbHBlci5zZXRDbHVzdGVyZXIodGhpcy5wTWFwLCBjbHVzdGVyZXIpO1xuICAgIHJldHVybiBjbHVzdGVyZXI7XG4gIH1cblxuICBnZXQgbWFwKCk6IGdvb2dsZS5tYXBzLk1hcCB7XG4gICAgcmV0dXJuIHRoaXMucE1hcDtcbiAgfVxuXG4gIGdldCByYWRpdXMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wUmFkaXVzID8/IFJBRElVU19ERUZBVUxUO1xuICB9XG5cbiAgZ2V0IG1heFpvb20oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wTWF4Wm9vbSA/PyBNQVhfWk9PTV9ERUZBVUxUO1xuICB9XG5cbiAgZ2V0IG1pblpvb20oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wTWluWm9vbSA/PyBNSU5fWk9PTV9ERUZBVUxUO1xuICB9XG5cbiAgZ2V0IHN0eWxlcygpOiBJU3R5bGVbXSB7XG4gICAgcmV0dXJuIHRoaXMucFN0eWxlcyA/PyBbXTtcbiAgfVxuXG4gIGdldCBpbWFnZVBhdGgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wSW1hZ2VQYXRoID8/IE1BUktFUl9DTFVTVEVSX0lNQUdFX1BBVEhfREVGQVVMVDtcbiAgfVxuXG4gIGdldCBpbWFnZUV4dGVuc2lvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBJbWFnZUV4dGVuc2lvbiA/PyBNQVJLRVJfQ0xVU1RFUl9JTUFHRV9FWFRFTlNJT047XG4gIH1cblxuICBnZXQgem9vbU9uQ2xpY2soKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucFpvb21PbkNsaWNrID8/IHRydWU7XG4gIH1cblxuICBnZXQgY3VzdG9tTWFya2VySWNvbigpOiAocG9pbnRGZWF0dXJlOiBTdXBlcmNsdXN0ZXIuUG9pbnRGZWF0dXJlPFN1cGVyY2x1c3Rlci5BbnlQcm9wcz4pID0+IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucEN1c3RvbU1hcmtlckljb247XG4gIH1cblxuICBnZXQgbWFya2VyQ2xpY2soKTogKG1hcmtlcjogZ29vZ2xlLm1hcHMuTWFya2VyLCBldmVudDogZ29vZ2xlLm1hcHMuTW91c2VFdmVudCkgPT4gdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMucE1hcmtlckNsaWNrO1xuICB9XG5cbiAgZ2V0IGZlYXR1cmVDbGljaygpOiAoZXZlbnQ6IGdvb2dsZS5tYXBzLkRhdGEuTW91c2VFdmVudCkgPT4gdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMucEZlYXR1cmVDbGljaztcbiAgfVxuXG4gIGdldCBmZWF0dXJlU3R5bGUoKTogZ29vZ2xlLm1hcHMuRGF0YS5TdHlsaW5nRnVuY3Rpb24ge1xuICAgIHJldHVybiB0aGlzLnBGZWF0dXJlU3R5bGU7XG4gIH1cblxuICBnZXQgc2VydmVyU2lkZUZlYXR1cmVUb1N1cGVyQ2x1c3RlcigpOiAoXG4gICAgZmVhdHVyZTogYW55LFxuICApID0+IFN1cGVyY2x1c3Rlci5DbHVzdGVyRmVhdHVyZTxTdXBlcmNsdXN0ZXIuQW55UHJvcHM+IHwgU3VwZXJjbHVzdGVyLlBvaW50RmVhdHVyZTxTdXBlcmNsdXN0ZXIuQW55UHJvcHM+IHtcbiAgICByZXR1cm4gdGhpcy5wU2VydmVyU2lkZUZlYXR1cmVUb1N1cGVyQ2x1c3RlcjtcbiAgfVxuXG4gIGdldCBvdmVybGFwTWFya2VyU3BpZGVyZmllcigpOiBPdmVybGFwcGluZ01hcmtlclNwaWRlcmZpZXIgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5wT3ZlcmxhcE1hcmtlclNwaWRlcmZpZXI7XG4gIH1cblxuICBnZXQgdXNlU2VydmVyU2lkZUNsdXN0ZXJlcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wVXNlU2VydmVyU2lkZUNsdXN0ZXJlcjtcbiAgfVxuXG4gIGdldCBnZXRDbHVzdGVyc1NlcnZlclNpZGUoKTogKGJib3g6IEdlb0pTT04uQkJveCwgem9vbTogbnVtYmVyKSA9PiBQcm9taXNlPGFueVtdPiB7XG4gICAgcmV0dXJuIHRoaXMucEdldENsdXN0ZXJzU2VydmVyU2lkZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQnVpbGRlciB9IGZyb20gJy4vYnVpbGRlcic7XG5pbXBvcnQgeyBDbHVzdGVyZXJIZWxwZXIgfSBmcm9tICcuL2hlbHBlcic7XG5pbXBvcnQgeyBJU3R5bGUsIE92ZXJsYXBwaW5nTWFya2VyU3BpZGVyZmllciwgSVN1cGVyQ2x1c3RlckFkYXB0ZXIgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgU0laRVMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgU3VwZXJjbHVzdGVyIGZyb20gJ3N1cGVyY2x1c3Rlcic7XG5pbXBvcnQgKiBhcyBHZW9KU09OIGZyb20gJ2dlb2pzb24nO1xuXG5leHBvcnQgY2xhc3MgU3VwZXJDbHVzdGVyQWRhcHRlciBpbXBsZW1lbnRzIElTdXBlckNsdXN0ZXJBZGFwdGVyIHtcbiAgcHJpdmF0ZSBwTWFwOiBnb29nbGUubWFwcy5NYXA7XG4gIHByaXZhdGUgcFJhZGl1czogbnVtYmVyO1xuICBwcml2YXRlIHBNaW5ab29tOiBudW1iZXI7XG4gIHByaXZhdGUgcE1heFpvb206IG51bWJlcjtcbiAgcHJpdmF0ZSBwU3R5bGVzOiBJU3R5bGVbXTtcbiAgcHJpdmF0ZSBwSW1hZ2VQYXRoOiBzdHJpbmc7XG4gIHByaXZhdGUgcEltYWdlRXh0ZW5zaW9uOiBzdHJpbmc7XG4gIHByaXZhdGUgcFpvb21PbkNsaWNrOiBib29sZWFuO1xuICBwcml2YXRlIHBEYXRhTGF5ZXJEZWZhdWx0OiBnb29nbGUubWFwcy5EYXRhO1xuICBwcml2YXRlIHBNYXJrZXJzOiBnb29nbGUubWFwcy5NYXJrZXJbXTtcbiAgcHJpdmF0ZSBwSWRsZUxpc3RlbmVyOiBnb29nbGUubWFwcy5NYXBzRXZlbnRMaXN0ZW5lciB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHBJbmRleDogU3VwZXJjbHVzdGVyO1xuICBwcml2YXRlIHBvaW50RmVhdHVyZXM6IFN1cGVyY2x1c3Rlci5Qb2ludEZlYXR1cmU8U3VwZXJjbHVzdGVyLkFueVByb3BzPltdID0gW107XG4gIHByaXZhdGUgcE5vblBvaW50RmVhdHVyZXM6IGdvb2dsZS5tYXBzLkRhdGEuRmVhdHVyZVtdID0gW107XG4gIHByaXZhdGUgcEN1c3RvbU1hcmtlckljb246IChwb2ludEZlYXR1cmU6IFN1cGVyY2x1c3Rlci5Qb2ludEZlYXR1cmU8U3VwZXJjbHVzdGVyLkFueVByb3BzPikgPT4gc3RyaW5nO1xuICBwcml2YXRlIHBNYXJrZXJDbGljazogKG1hcmtlcjogZ29vZ2xlLm1hcHMuTWFya2VyLCBldmVudDogZ29vZ2xlLm1hcHMuTW91c2VFdmVudCkgPT4gdm9pZDtcbiAgcHJpdmF0ZSBwRmVhdHVyZUNsaWNrOiAoZXZlbnQ6IGdvb2dsZS5tYXBzLkRhdGEuTW91c2VFdmVudCkgPT4gdm9pZDtcbiAgcHJpdmF0ZSBwRmVhdHVyZVN0eWxlOiBnb29nbGUubWFwcy5EYXRhLlN0eWxpbmdGdW5jdGlvbjtcbiAgcHJpdmF0ZSBwU2VydmVyU2lkZUZlYXR1cmVUb1N1cGVyQ2x1c3RlcjogKFxuICAgIGZlYXR1cmU6IGFueSxcbiAgKSA9PiBTdXBlcmNsdXN0ZXIuQ2x1c3RlckZlYXR1cmU8U3VwZXJjbHVzdGVyLkFueVByb3BzPiB8IFN1cGVyY2x1c3Rlci5Qb2ludEZlYXR1cmU8U3VwZXJjbHVzdGVyLkFueVByb3BzPjtcbiAgcHJpdmF0ZSBwT3ZlcmxhcE1hcmtlclNwaWRlcmZpZXI6IE92ZXJsYXBwaW5nTWFya2VyU3BpZGVyZmllciB8IG51bGw7XG4gIHByaXZhdGUgcFVzZVNlcnZlclNpZGVDbHVzdGVyZXIgPSBmYWxzZTtcbiAgcHJpdmF0ZSBwR2V0Q2x1c3RlcnNTZXJ2ZXJTaWRlOiAoYmJveDogR2VvSlNPTi5CQm94LCB6b29tOiBudW1iZXIpID0+IFByb21pc2U8YW55W10+O1xuXG4gIGNvbnN0cnVjdG9yKGJ1aWxkOiBCdWlsZGVyKSB7XG4gICAgdGhpcy5wTWFwID0gYnVpbGQubWFwO1xuICAgIHRoaXMucFJhZGl1cyA9IGJ1aWxkLnJhZGl1cztcbiAgICB0aGlzLnBNYXhab29tID0gYnVpbGQubWF4Wm9vbTtcbiAgICB0aGlzLnBNaW5ab29tID0gYnVpbGQubWluWm9vbTtcbiAgICB0aGlzLnBTdHlsZXMgPSBidWlsZC5zdHlsZXM7XG4gICAgdGhpcy5wSW1hZ2VQYXRoID0gYnVpbGQuaW1hZ2VQYXRoO1xuICAgIHRoaXMucEltYWdlRXh0ZW5zaW9uID0gYnVpbGQuaW1hZ2VFeHRlbnNpb247XG4gICAgdGhpcy5wWm9vbU9uQ2xpY2sgPSBidWlsZC56b29tT25DbGljaztcbiAgICB0aGlzLnBEYXRhTGF5ZXJEZWZhdWx0ID0gYnVpbGQubWFwPy5kYXRhID8/IG5ldyBnb29nbGUubWFwcy5EYXRhKCk7XG4gICAgdGhpcy5wTWFya2VycyA9IFtdO1xuICAgIHRoaXMucEluZGV4ID0gbmV3IFN1cGVyY2x1c3Rlcih7XG4gICAgICBtaW5ab29tOiB0aGlzLnBNaW5ab29tLFxuICAgICAgbWF4Wm9vbTogdGhpcy5wTWF4Wm9vbSxcbiAgICAgIHJhZGl1czogdGhpcy5wUmFkaXVzLFxuICAgIH0pO1xuICAgIHRoaXMucEN1c3RvbU1hcmtlckljb24gPSBidWlsZC5jdXN0b21NYXJrZXJJY29uO1xuICAgIHRoaXMucE1hcmtlckNsaWNrID0gYnVpbGQubWFya2VyQ2xpY2s7XG4gICAgdGhpcy5wRmVhdHVyZUNsaWNrID0gYnVpbGQuZmVhdHVyZUNsaWNrO1xuICAgIHRoaXMucEZlYXR1cmVTdHlsZSA9IGJ1aWxkLmZlYXR1cmVTdHlsZTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hc3NpZ25tZW50XG4gICAgdGhpcy5wU2VydmVyU2lkZUZlYXR1cmVUb1N1cGVyQ2x1c3RlciA9IGJ1aWxkLnNlcnZlclNpZGVGZWF0dXJlVG9TdXBlckNsdXN0ZXI7XG4gICAgdGhpcy5wT3ZlcmxhcE1hcmtlclNwaWRlcmZpZXIgPSBidWlsZC5vdmVybGFwTWFya2VyU3BpZGVyZmllcjtcbiAgICB0aGlzLnBVc2VTZXJ2ZXJTaWRlQ2x1c3RlcmVyID0gYnVpbGQudXNlU2VydmVyU2lkZUNsdXN0ZXJlcjtcbiAgICB0aGlzLnBHZXRDbHVzdGVyc1NlcnZlclNpZGUgPSBidWlsZC5nZXRDbHVzdGVyc1NlcnZlclNpZGU7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICAvKiAtLS0tIEdldHRlcnMgLS0tLSAqL1xuICBnZXQgbWFwKCk6IGdvb2dsZS5tYXBzLk1hcCB7XG4gICAgcmV0dXJuIHRoaXMucE1hcDtcbiAgfVxuXG4gIGdldCByYWRpdXMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wUmFkaXVzO1xuICB9XG5cbiAgZ2V0IG1heFpvb20oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wTWF4Wm9vbTtcbiAgfVxuXG4gIGdldCBtaW5ab29tKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucE1pblpvb207XG4gIH1cblxuICBnZXQgc3R5bGVzKCk6IElTdHlsZVtdIHtcbiAgICByZXR1cm4gdGhpcy5wU3R5bGVzO1xuICB9XG5cbiAgc2V0IHN0eWxlcyhzdHlsZXM6IElTdHlsZVtdKSB7XG4gICAgdGhpcy5wU3R5bGVzID0gc3R5bGVzO1xuICB9XG5cbiAgZ2V0IGltYWdlUGF0aCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBJbWFnZVBhdGg7XG4gIH1cblxuICBnZXQgaW1hZ2VFeHRlbnNpb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wSW1hZ2VFeHRlbnNpb247XG4gIH1cblxuICBnZXQgaXNab29tT25DbGljaygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wWm9vbU9uQ2xpY2s7XG4gIH1cblxuICBnZXQgbnVtRmVhdHVyZXMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5mZWF0dXJlcy5sZW5ndGg7XG4gIH1cblxuICBnZXQgaGFzRmVhdHVyZXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubnVtRmVhdHVyZXMgPiAwO1xuICB9XG5cbiAgZ2V0IGZlYXR1cmVzKCk6IFN1cGVyY2x1c3Rlci5Qb2ludEZlYXR1cmU8U3VwZXJjbHVzdGVyLkFueVByb3BzPltdIHtcbiAgICByZXR1cm4gdGhpcy5wb2ludEZlYXR1cmVzO1xuICB9XG5cbiAgZ2V0IHVzZVNlcnZlclNpZGVDbHVzdGVyZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucFVzZVNlcnZlclNpZGVDbHVzdGVyZXI7XG4gIH1cblxuICAvKiAtLS0tIFB1YmxpYyBtZXRob2RzIC0tLS0gKi9cbiAgcHVibGljIHNldFZpc2libGUodjogYm9vbGVhbik6IHZvaWQge1xuICB0aGlzLnNldFZpc2libGVNYXJrZXJzQW5kQ2x1c3RlcnModik7XG4gICAgdGhpcy5zZXRWaXNpYmxlRGF0YUxheWVyRmVhdHVyZXModik7XG4gIH1cblxuICBwdWJsaWMgc2V0VmlzaWJsZU1hcmtlcnNBbmRDbHVzdGVycyh2OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKCF2KSB7XG4gICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICB0aGlzLmhpZGVNYXJrZXJzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgIHRoaXMuc2hvd01hcmtlcnMoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0VmlzaWJsZURhdGFMYXllckZlYXR1cmVzKHY6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoIXYpIHtcbiAgICAgIHRoaXMucERhdGFMYXllckRlZmF1bHQuc2V0TWFwKG51bGwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBEYXRhTGF5ZXJEZWZhdWx0LnNldE1hcCh0aGlzLnBNYXApO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRGZWF0dXJlc0JvdW5kcygpOiBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMge1xuICAgIGNvbnN0IGZlYXR1cmVzQm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcygpO1xuICAgIGZvciAoY29uc3Qgbm9uUG9pbnRGZWF0dXJlIG9mIHRoaXMucE5vblBvaW50RmVhdHVyZXMpIHtcbiAgICAgIGZlYXR1cmVzQm91bmRzLnVuaW9uKENsdXN0ZXJlckhlbHBlci5mZWF0dXJlQm91bmRzKG5vblBvaW50RmVhdHVyZSkpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHBvaW50RmVhdHVyZSBvZiB0aGlzLmZlYXR1cmVzKSB7XG4gICAgICBmZWF0dXJlc0JvdW5kcy5leHRlbmQoe1xuICAgICAgICBsYXQ6IHBvaW50RmVhdHVyZS5nZW9tZXRyeS5jb29yZGluYXRlc1sxXSxcbiAgICAgICAgbG5nOiBwb2ludEZlYXR1cmUuZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMF0sXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGZlYXR1cmVzQm91bmRzO1xuICB9XG5cbiAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVycygpO1xuICAgIHRoaXMucmVtb3ZlRmVhdHVyZXNGcm9tRGF0YUxheWVycygpO1xuICAgIHRoaXMucmVtb3ZlTWFya2VycygpO1xuICAgIHRoaXMucFN0eWxlcyA9IFtdO1xuICAgIHRoaXMucE5vblBvaW50RmVhdHVyZXMgPSBbXTtcbiAgICB0aGlzLnBvaW50RmVhdHVyZXMgPSBbXTtcbiAgfVxuXG4gIHB1YmxpYyBsb2FkKGdlb0pzb246IEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb24pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wb2ludEZlYXR1cmVzLmxlbmd0aCB8fCB0aGlzLnBOb25Qb2ludEZlYXR1cmVzLmxlbmd0aCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1RoZXJlIGFyZSBsb2FkZWQgZGF0YSBpbiBzdXBlcmNsdXN0ZXIgYWRhcHRlciBhbHJlYWR5Jyk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3RoZXJGZWF0dXJlc0NvbGxlY3Rpb246IEdlb0pTT04uRmVhdHVyZUNvbGxlY3Rpb24gPSB7XG4gICAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgZmVhdHVyZXM6IFtdLFxuICAgIH07XG4gICAgaWYgKGdlb0pzb24gJiYgZ2VvSnNvbi50eXBlID09PSAnRmVhdHVyZUNvbGxlY3Rpb24nICYmIGdlb0pzb24uZmVhdHVyZXMgJiYgZ2VvSnNvbi5mZWF0dXJlcy5sZW5ndGgpIHtcbiAgICAgIGZvciAoY29uc3QgZmVhdHVyZSBvZiBnZW9Kc29uLmZlYXR1cmVzKSB7XG4gICAgICAgIGlmIChmZWF0dXJlLnR5cGUgPT09ICdGZWF0dXJlJyAmJiBmZWF0dXJlLmdlb21ldHJ5KSB7XG4gICAgICAgICAgaWYgKGZlYXR1cmUuZ2VvbWV0cnkudHlwZSA9PT0gJ1BvaW50Jykge1xuICAgICAgICAgICAgaWYgKGZlYXR1cmUuaWQgJiYgIWZlYXR1cmUucHJvcGVydGllcz8uaWQpIHtcbiAgICAgICAgICAgICAgaWYgKGZlYXR1cmUucHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgIGZlYXR1cmUucHJvcGVydGllcy5pZCA9IGZlYXR1cmUuaWQ7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmVhdHVyZS5wcm9wZXJ0aWVzID0ge1xuICAgICAgICAgICAgICAgICAgaWQ6IGZlYXR1cmUuaWQsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wb2ludEZlYXR1cmVzLnB1c2goZmVhdHVyZSBhcyBTdXBlcmNsdXN0ZXIuUG9pbnRGZWF0dXJlPFN1cGVyY2x1c3Rlci5BbnlQcm9wcz4pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdGhlckZlYXR1cmVzQ29sbGVjdGlvbi5mZWF0dXJlcy5wdXNoKGZlYXR1cmUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucEluZGV4LmxvYWQodGhpcy5wb2ludEZlYXR1cmVzKTtcbiAgICB0aGlzLnBOb25Qb2ludEZlYXR1cmVzID0gdGhpcy5wRGF0YUxheWVyRGVmYXVsdC5hZGRHZW9Kc29uKG90aGVyRmVhdHVyZXNDb2xsZWN0aW9uKTtcbiAgICB2b2lkIHRoaXMuZ2V0Q2x1c3RlcnMoKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cblxuICBwdWJsaWMgZHJhd1NlcnZlclNpZGVDYWxjdWxhdGVkQ2x1c3RlcnMoZmVhdHVyZXM6IGFueVtdKTogdm9pZCB7XG4gICAgY29uc3Qgc2NmZWF0dXJlczogKFxuICAgICAgfCBTdXBlcmNsdXN0ZXIuQ2x1c3RlckZlYXR1cmU8U3VwZXJjbHVzdGVyLkFueVByb3BzPlxuICAgICAgfCBTdXBlcmNsdXN0ZXIuUG9pbnRGZWF0dXJlPFN1cGVyY2x1c3Rlci5BbnlQcm9wcz5cbiAgICApW10gPSBbXTtcbiAgICBpZiAoZmVhdHVyZXMgJiYgZmVhdHVyZXMubGVuZ3RoKSB7XG4gICAgICBmb3IgKGNvbnN0IGZlYXR1cmUgb2YgZmVhdHVyZXMpIHtcbiAgICAgICAgY29uc3Qgc2NmZWF0dXJlID0gdGhpcy5wU2VydmVyU2lkZUZlYXR1cmVUb1N1cGVyQ2x1c3RlcihmZWF0dXJlKTtcbiAgICAgICAgc2NmZWF0dXJlcy5wdXNoKHNjZmVhdHVyZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZHJhd0NsdXN0ZXJzKHNjZmVhdHVyZXMpO1xuICB9XG5cbiAgLyogLS0tLSBCdWlsZGVyIHBhdHRlcm4gaW1wbGVtZW50YXRpb24gLS0tLSAqL1xuICBzdGF0aWMgZ2V0IEJ1aWxkZXIoKTogdHlwZW9mIEJ1aWxkZXIge1xuICAgIHJldHVybiBCdWlsZGVyO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXRDbHVzdGVycygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIXRoaXMubWFwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbWFwQm91bmRzID0gdGhpcy5tYXAuZ2V0Qm91bmRzKCkgPz8gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcygpO1xuICAgIGNvbnN0IHpvb20gPSB0aGlzLm1hcC5nZXRab29tKCkgPz8gMDtcblxuICAgIGlmICghbWFwQm91bmRzLmlzRW1wdHkoKSAmJiB6b29tKSB7XG4gICAgICBjb25zdCBiYm94OiBHZW9KU09OLkJCb3ggPSBbXG4gICAgICAgIG1hcEJvdW5kcy5nZXRTb3V0aFdlc3QoKS5sbmcoKSxcbiAgICAgICAgbWFwQm91bmRzLmdldFNvdXRoV2VzdCgpLmxhdCgpLFxuICAgICAgICBtYXBCb3VuZHMuZ2V0Tm9ydGhFYXN0KCkubG5nKCksXG4gICAgICAgIG1hcEJvdW5kcy5nZXROb3J0aEVhc3QoKS5sYXQoKSxcbiAgICAgIF07XG4gICAgICBpZiAodGhpcy51c2VTZXJ2ZXJTaWRlQ2x1c3RlcmVyKSB7XG4gICAgICAgIGxldCBjbHVzdGVyczogYW55W107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY2x1c3RlcnMgPSBhd2FpdCB0aGlzLnBHZXRDbHVzdGVyc1NlcnZlclNpZGUoYmJveCwgem9vbSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGNsdXN0ZXJzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kcmF3U2VydmVyU2lkZUNhbGN1bGF0ZWRDbHVzdGVycyhjbHVzdGVycyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBjbHVzdGVycyA9IHRoaXMucEluZGV4LmdldENsdXN0ZXJzKGJib3gsIHpvb20pO1xuICAgICAgICB0aGlzLmRyYXdDbHVzdGVycyhjbHVzdGVycyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc2V0dXBTdHlsZXMoKTtcbiAgICB0aGlzLnBEYXRhTGF5ZXJEZWZhdWx0LmFkZExpc3RlbmVyKCdjbGljaycsIHRoaXMucEZlYXR1cmVDbGljayk7XG4gICAgaWYgKHRoaXMucEZlYXR1cmVTdHlsZSkge1xuICAgICAgdGhpcy5wRGF0YUxheWVyRGVmYXVsdC5zZXRTdHlsZSh0aGlzLnBGZWF0dXJlU3R5bGUpO1xuICAgIH1cbiAgICBpZiAodGhpcy51c2VTZXJ2ZXJTaWRlQ2x1c3RlcmVyKSB7XG4gICAgICB2b2lkIHRoaXMuZ2V0Q2x1c3RlcnMoKTtcbiAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldHVwU3R5bGVzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBTdHlsZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIFNJWkVTLmZvckVhY2goKHNpemUsIGkpID0+IHtcbiAgICAgIHRoaXMucFN0eWxlcy5wdXNoKHtcbiAgICAgICAgaGVpZ2h0OiBzaXplLFxuICAgICAgICB1cmw6IGAke3RoaXMucEltYWdlUGF0aH0ke2kgKyAxfS4ke3RoaXMucEltYWdlRXh0ZW5zaW9ufWAsXG4gICAgICAgIHdpZHRoOiBzaXplLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFkZEV2ZW50TGlzdGVuZXJzKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5tYXApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnBJZGxlTGlzdGVuZXIpIHtcbiAgICAgIHRoaXMucElkbGVMaXN0ZW5lciA9IGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHRoaXMubWFwLCAnaWRsZScsICgpID0+IHtcbiAgICAgICAgdm9pZCB0aGlzLmdldENsdXN0ZXJzKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBJZGxlTGlzdGVuZXIpIHtcbiAgICAgIHRoaXMucElkbGVMaXN0ZW5lci5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRyYXdDbHVzdGVycyhcbiAgICBjbHVzdGVyczogKFN1cGVyY2x1c3Rlci5DbHVzdGVyRmVhdHVyZTxTdXBlcmNsdXN0ZXIuQW55UHJvcHM+IHwgU3VwZXJjbHVzdGVyLlBvaW50RmVhdHVyZTxTdXBlcmNsdXN0ZXIuQW55UHJvcHM+KVtdLFxuICApOiB2b2lkIHtcbiAgICBjb25zdCBtYXBDbHVzdGVycyA9IHRoaXMuZ2V0Q2x1c3RlcnNNYXAodGhpcy5wTWFya2Vycyk7XG4gICAgY29uc3QgbWFwTWFya2VycyA9IHRoaXMuZ2V0TWFya2Vyc01hcCh0aGlzLnBNYXJrZXJzKTtcbiAgICB0aGlzLnBNYXJrZXJzLmxlbmd0aCA9IDA7XG5cbiAgICBmb3IgKGNvbnN0IHNjZmVhdHVyZSBvZiBjbHVzdGVycykge1xuICAgICAgbGV0IG1hcmtlciA9IHRoaXMuZmluZEV4aXN0aW5nTWFya2VySW5zdGFuY2Uoc2NmZWF0dXJlLCBtYXBDbHVzdGVycywgbWFwTWFya2Vycyk7XG4gICAgICBpZiAoIW1hcmtlcikge1xuICAgICAgICBtYXJrZXIgPSB0aGlzLnN1cGVyY2x1c3RlckZlYXR1cmVUb0dtYXBzTWFya2VyKHNjZmVhdHVyZSk7XG4gICAgICB9XG4gICAgICB0aGlzLnBNYXJrZXJzLnB1c2gobWFya2VyKTtcbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgdGhlIG9sZCBjbHVzdGVycy5cbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBmb3IgKGNvbnN0IG9DbHVzdGVyIG9mIG1hcENsdXN0ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgIG9DbHVzdGVyLnNldE1hcChudWxsKTtcbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3Qgb01hcmtlciBvZiBtYXBNYXJrZXJzLnZhbHVlcygpKSB7XG4gICAgICAgIG9NYXJrZXIuc2V0TWFwKG51bGwpO1xuICAgICAgICBpZiAodGhpcy5wT3ZlcmxhcE1hcmtlclNwaWRlcmZpZXIpIHtcbiAgICAgICAgICB0aGlzLnBPdmVybGFwTWFya2VyU3BpZGVyZmllci5mb3JnZXRNYXJrZXIob01hcmtlcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCAxNTApO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDbHVzdGVyc01hcChjb2xsZWN0aW9uOiBnb29nbGUubWFwcy5NYXJrZXJbXSkge1xuICAgIGNvbnN0IHJlczogTWFwPG51bWJlciwgZ29vZ2xlLm1hcHMuTWFya2VyPiA9IG5ldyBNYXA8bnVtYmVyLCBnb29nbGUubWFwcy5NYXJrZXI+KCk7XG4gICAgZm9yIChjb25zdCBtYXJrZXIgb2YgY29sbGVjdGlvbikge1xuICAgICAgaWYgKG1hcmtlci5nZXQoJ2NsdXN0ZXInKSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXMuc2V0KG1hcmtlci5nZXQoJ2NsdXN0ZXJfaWQnKSBhcyBudW1iZXIsIG1hcmtlcik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBwcml2YXRlIGdldE1hcmtlcnNNYXAoY29sbGVjdGlvbjogZ29vZ2xlLm1hcHMuTWFya2VyW10pIHtcbiAgICBjb25zdCByZXM6IE1hcDxudW1iZXIgfCBzdHJpbmcsIGdvb2dsZS5tYXBzLk1hcmtlcj4gPSBuZXcgTWFwPG51bWJlciB8IHN0cmluZywgZ29vZ2xlLm1hcHMuTWFya2VyPigpO1xuICAgIGZvciAoY29uc3QgbWFya2VyIG9mIGNvbGxlY3Rpb24pIHtcbiAgICAgIGlmIChtYXJrZXIuZ2V0KCdjbHVzdGVyJykgIT09IHRydWUgJiYgbWFya2VyLmdldCgnaWQnKSkge1xuICAgICAgICByZXMuc2V0KG1hcmtlci5nZXQoJ2lkJyksIG1hcmtlcik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBwcml2YXRlIGZpbmRFeGlzdGluZ01hcmtlckluc3RhbmNlKFxuICAgIHNjZmVhdHVyZTogU3VwZXJjbHVzdGVyLkNsdXN0ZXJGZWF0dXJlPFN1cGVyY2x1c3Rlci5BbnlQcm9wcz4gfCBTdXBlcmNsdXN0ZXIuUG9pbnRGZWF0dXJlPFN1cGVyY2x1c3Rlci5BbnlQcm9wcz4sXG4gICAgZXhpc3RpbmdDbHVzdGVyczogTWFwPG51bWJlciwgZ29vZ2xlLm1hcHMuTWFya2VyPixcbiAgICBleGlzdGluZ01hcmtlcnM6IE1hcDxudW1iZXIgfCBzdHJpbmcsIGdvb2dsZS5tYXBzLk1hcmtlcj4sXG4gICk6IGdvb2dsZS5tYXBzLk1hcmtlciB8IHVuZGVmaW5lZCB7XG4gICAgbGV0IHJlcztcbiAgICBpZiAoc2NmZWF0dXJlLnByb3BlcnRpZXMuY2x1c3RlciA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKGV4aXN0aW5nQ2x1c3RlcnMuaGFzKHNjZmVhdHVyZS5wcm9wZXJ0aWVzLmNsdXN0ZXJfaWQpKSB7XG4gICAgICAgIHJlcyA9IGV4aXN0aW5nQ2x1c3RlcnMuZ2V0KHNjZmVhdHVyZS5wcm9wZXJ0aWVzLmNsdXN0ZXJfaWQpO1xuICAgICAgICBleGlzdGluZ0NsdXN0ZXJzLmRlbGV0ZShzY2ZlYXR1cmUucHJvcGVydGllcy5jbHVzdGVyX2lkKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHNjZmVhdHVyZS5wcm9wZXJ0aWVzLmlkICYmIGV4aXN0aW5nTWFya2Vycy5oYXMoc2NmZWF0dXJlLnByb3BlcnRpZXMuaWQpKSB7XG4gICAgICAgIHJlcyA9IGV4aXN0aW5nTWFya2Vycy5nZXQoc2NmZWF0dXJlLnByb3BlcnRpZXMuaWQpO1xuICAgICAgICBleGlzdGluZ01hcmtlcnMuZGVsZXRlKHNjZmVhdHVyZS5wcm9wZXJ0aWVzLmlkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJOb25Qb2ludEZlYXR1cmVzKCk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgZmVhdHVyZSBvZiB0aGlzLnBOb25Qb2ludEZlYXR1cmVzKSB7XG4gICAgICBpZiAodGhpcy5wRGF0YUxheWVyRGVmYXVsdD8uY29udGFpbnMoZmVhdHVyZSkpIHtcbiAgICAgICAgdGhpcy5wRGF0YUxheWVyRGVmYXVsdC5yZW1vdmUoZmVhdHVyZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdXBlcmNsdXN0ZXJGZWF0dXJlVG9HbWFwc01hcmtlcihcbiAgICBzY2ZlYXR1cmU6IFN1cGVyY2x1c3Rlci5DbHVzdGVyRmVhdHVyZTxTdXBlcmNsdXN0ZXIuQW55UHJvcHM+IHwgU3VwZXJjbHVzdGVyLlBvaW50RmVhdHVyZTxTdXBlcmNsdXN0ZXIuQW55UHJvcHM+LFxuICApOiBnb29nbGUubWFwcy5NYXJrZXIge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmdldE1hcmtlck9wdGlvbnMoc2NmZWF0dXJlKTtcbiAgICAvLyBjb25zdCBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKG9wdGlvbnMpO1xuICAgIGNvbnN0IG1hcmtlciA9IG5ldyAod2luZG93IGFzIGFueSkuTWFya2VyV2l0aExhYmVsKHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBsYWJlbENvbnRlbnQ6IFwiZm9vXCIsIC8vIGNhbiBhbHNvIGJlIEhUTUxFbGVtZW50XG4gICAgICBsYWJlbEFuY2hvcjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KC0yMSwgMylcbiAgICB9KTtcbiAgICB0aGlzLmFzc2lnbkFkZGl0aW9uYWxQcm9wZXJ0aWVzKG1hcmtlciwgc2NmZWF0dXJlKTtcbiAgICB0aGlzLmFzc2lnbkV2ZW50c1RvTWFya2VyKG1hcmtlcik7XG4gICAgcmV0dXJuIG1hcmtlcjtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0TWFya2VyT3B0aW9ucyhcbiAgICBzY2ZlYXR1cmU6IFN1cGVyY2x1c3Rlci5DbHVzdGVyRmVhdHVyZTxTdXBlcmNsdXN0ZXIuQW55UHJvcHM+IHwgU3VwZXJjbHVzdGVyLlBvaW50RmVhdHVyZTxTdXBlcmNsdXN0ZXIuQW55UHJvcHM+LFxuICApOiBnb29nbGUubWFwcy5NYXJrZXJPcHRpb25zIHtcbiAgICBsZXQgb3B0aW9uczogZ29vZ2xlLm1hcHMuTWFya2VyT3B0aW9ucztcbiAgICBpZiAoc2NmZWF0dXJlLnByb3BlcnRpZXMuY2x1c3RlciA9PT0gdHJ1ZSkge1xuICAgICAgb3B0aW9ucyA9IHRoaXMuZ2V0TWFya2VyT3B0aW9uc0ZvckNsdXN0ZXIoc2NmZWF0dXJlIGFzIFN1cGVyY2x1c3Rlci5DbHVzdGVyRmVhdHVyZTxTdXBlcmNsdXN0ZXIuQW55UHJvcHM+KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucyA9IHRoaXMuZ2V0TWFya2VyT3B0aW9uc0ZvclBvaW50KHNjZmVhdHVyZSk7XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRNYXJrZXJPcHRpb25zRm9yQ2x1c3RlcihcbiAgICBzY2ZlYXR1cmU6IFN1cGVyY2x1c3Rlci5DbHVzdGVyRmVhdHVyZTxTdXBlcmNsdXN0ZXIuQW55UHJvcHM+LFxuICApOiBnb29nbGUubWFwcy5NYXJrZXJPcHRpb25zIHtcbiAgICBjb25zdCBvcHRpb25zOiBnb29nbGUubWFwcy5NYXJrZXJPcHRpb25zID0ge1xuICAgICAgcG9zaXRpb246IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoc2NmZWF0dXJlLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzFdLCBzY2ZlYXR1cmUuZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMF0pLFxuICAgICAgbWFwOiB0aGlzLm1hcCxcbiAgICAgIGNsaWNrYWJsZTogdGhpcy5wWm9vbU9uQ2xpY2ssXG4gICAgICBpY29uOiB0aGlzLmdldENsdXN0ZXJJY29uKHNjZmVhdHVyZSksXG4gICAgICBsYWJlbDogdGhpcy5nZXRDbHVzdGVyTGFiZWwoc2NmZWF0dXJlKSxcbiAgICAgIHRpdGxlOiBgJHtzY2ZlYXR1cmUucHJvcGVydGllcy5wb2ludF9jb3VudF9hYmJyZXZpYXRlZH0gcG9zaXRpb25zIGluIHRoZSBjbHVzdGVyYCxcbiAgICAgIHZpc2libGU6IHRydWUsXG4gICAgfTtcbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q2x1c3Rlckljb24oc2NmZWF0dXJlOiBTdXBlcmNsdXN0ZXIuQ2x1c3RlckZlYXR1cmU8U3VwZXJjbHVzdGVyLkFueVByb3BzPik6IGdvb2dsZS5tYXBzLkljb24ge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRDbHVzdGVySWNvbkluZGV4KHNjZmVhdHVyZSk7XG4gICAgY29uc3Qgc3R5bGU6IElTdHlsZSA9IHRoaXMuc3R5bGVzW2luZGV4XTtcbiAgICBjb25zdCB3aWR0aCA9IHN0eWxlPy53aWR0aCA/PyBTSVpFU1swXTtcbiAgICBjb25zdCBoZWlnaHQgPSBzdHlsZT8uaGVpZ2h0ID8/IFNJWkVTWzBdO1xuICAgIGNvbnN0IGFuY2hvclggPSBzdHlsZT8uYW5jaG9yPy5sZW5ndGggPyBzdHlsZS5hbmNob3JbMF0gOiB3aWR0aCAvIDI7XG4gICAgY29uc3QgYW5jaG9yWSA9IHN0eWxlPy5hbmNob3IgJiYgc3R5bGU/LmFuY2hvci5sZW5ndGggPiAxID8gc3R5bGUuYW5jaG9yWzFdIDogaGVpZ2h0IC8gMjtcbiAgICBjb25zdCBpY29uID0ge1xuICAgICAgc2NhbGVkU2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUod2lkdGgsIGhlaWdodCksXG4gICAgICBhbmNob3I6IG5ldyBnb29nbGUubWFwcy5Qb2ludChhbmNob3JYLCBhbmNob3JZKSxcbiAgICAgIHVybDogc3R5bGUudXJsLFxuICAgIH07XG4gICAgcmV0dXJuIGljb247XG4gIH1cblxuICBwcml2YXRlIGdldENsdXN0ZXJJY29uSW5kZXgoc2NmZWF0dXJlOiBTdXBlcmNsdXN0ZXIuQ2x1c3RlckZlYXR1cmU8U3VwZXJjbHVzdGVyLkFueVByb3BzPik6IG51bWJlciB7XG4gICAgbGV0IGluZGV4ID0gMDtcbiAgICBsZXQgZHYgPSBzY2ZlYXR1cmUucHJvcGVydGllcy5wb2ludF9jb3VudDtcbiAgICB3aGlsZSAoZHYgIT09IDApIHtcbiAgICAgIGR2ID0gTWF0aC5mbG9vcihkdiAvIDEwKTtcbiAgICAgIGluZGV4Kys7XG4gICAgfVxuICAgIHJldHVybiBNYXRoLm1pbihpbmRleCwgdGhpcy5wU3R5bGVzLmxlbmd0aCAtIDEpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDbHVzdGVyTGFiZWwoc2NmZWF0dXJlOiBTdXBlcmNsdXN0ZXIuQ2x1c3RlckZlYXR1cmU8U3VwZXJjbHVzdGVyLkFueVByb3BzPik6IGdvb2dsZS5tYXBzLk1hcmtlckxhYmVsIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2V0Q2x1c3Rlckljb25JbmRleChzY2ZlYXR1cmUpO1xuICAgIGNvbnN0IHN0eWxlOiBJU3R5bGUgPSB0aGlzLnN0eWxlc1tpbmRleF07XG4gICAgY29uc3QgbGFiZWwgPSB7XG4gICAgICBjb2xvcjogc3R5bGU/LnRleHRDb2xvciA/PyAnYmxhY2snLFxuICAgICAgZm9udEZhbWlseTogc3R5bGU/LmZvbnRGYW1pbHkgPz8gJ1JvYm90bycsXG4gICAgICBmb250U2l6ZTogYCR7c3R5bGU/LnRleHRTaXplID8/IDE0fXB4YCxcbiAgICAgIGZvbnRXZWlnaHQ6IHN0eWxlPy5mb250V2VpZ2h0ID8/ICdub3JtYWwnLFxuICAgICAgdGV4dDogYCR7c2NmZWF0dXJlLnByb3BlcnRpZXMucG9pbnRfY291bnRfYWJicmV2aWF0ZWR9YCxcbiAgICB9O1xuICAgIHJldHVybiBsYWJlbDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0TWFya2VyT3B0aW9uc0ZvclBvaW50KFxuICAgIHNjZmVhdHVyZTogU3VwZXJjbHVzdGVyLlBvaW50RmVhdHVyZTxTdXBlcmNsdXN0ZXIuQW55UHJvcHM+LFxuICApOiBnb29nbGUubWFwcy5NYXJrZXJPcHRpb25zIHtcbiAgICBjb25zdCBvcHRpb25zOiBnb29nbGUubWFwcy5NYXJrZXJPcHRpb25zID0ge1xuICAgICAgcG9zaXRpb246IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoc2NmZWF0dXJlLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzFdLCBzY2ZlYXR1cmUuZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMF0pLFxuICAgICAgbWFwOiB0aGlzLm1hcCxcbiAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICAgIGljb246IHtcbiAgICAgICAgc2NhbGVkU2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoMzIsIDMyKSxcbiAgICAgICAgdXJsOiB0aGlzLnBDdXN0b21NYXJrZXJJY29uKHNjZmVhdHVyZSksXG4gICAgICB9LFxuICAgICAgdGl0bGU6IChzY2ZlYXR1cmUucHJvcGVydGllcy5uYW1lIGFzIHN0cmluZykgPz8gJycsXG4gICAgICB2aXNpYmxlOiB0cnVlLFxuICAgIH07XG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIGFzc2lnbkFkZGl0aW9uYWxQcm9wZXJ0aWVzKFxuICAgIG1hcmtlcjogZ29vZ2xlLm1hcHMuTWFya2VyLFxuICAgIHNjZmVhdHVyZTogU3VwZXJjbHVzdGVyLkNsdXN0ZXJGZWF0dXJlPFN1cGVyY2x1c3Rlci5BbnlQcm9wcz4gfCBTdXBlcmNsdXN0ZXIuUG9pbnRGZWF0dXJlPFN1cGVyY2x1c3Rlci5BbnlQcm9wcz4sXG4gICk6IHZvaWQge1xuICAgIGlmIChzY2ZlYXR1cmUucHJvcGVydGllcy5jbHVzdGVyID09PSB0cnVlKSB7XG4gICAgICBtYXJrZXIuc2V0KCdjbHVzdGVyJywgdHJ1ZSk7XG4gICAgICBtYXJrZXIuc2V0KCdjbHVzdGVyX2lkJywgc2NmZWF0dXJlLnByb3BlcnRpZXMuY2x1c3Rlcl9pZCA/PyBDbHVzdGVyZXJIZWxwZXIuZ2V0TmV3SWQoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hcmtlci5zZXQoJ2lkJywgc2NmZWF0dXJlLmlkID8/IHNjZmVhdHVyZS5wcm9wZXJ0aWVzPy5pZCA/PyBDbHVzdGVyZXJIZWxwZXIuZ2V0TmV3SWQoKSk7XG4gICAgICBpZiAodGhpcy5wT3ZlcmxhcE1hcmtlclNwaWRlcmZpZXIpIHtcbiAgICAgICAgdGhpcy5wT3ZlcmxhcE1hcmtlclNwaWRlcmZpZXIudHJhY2tNYXJrZXIobWFya2VyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzc2lnbkV2ZW50c1RvTWFya2VyKG1hcmtlcjogZ29vZ2xlLm1hcHMuTWFya2VyKSB7XG4gICAgaWYgKG1hcmtlci5nZXRDbGlja2FibGUoKSkge1xuICAgICAgY29uc3QgZXZlbnROYW1lOiBzdHJpbmcgPSB0aGlzLmdldENsaWNrRXZlbnROYW1lKG1hcmtlcik7XG4gICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsIGV2ZW50TmFtZSwgKGV2ZW50OiBnb29nbGUubWFwcy5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChtYXJrZXIuZ2V0KCdjbHVzdGVyJykgPT09IHRydWUpIHtcbiAgICAgICAgICBldmVudC5zdG9wKCk7XG4gICAgICAgICAgY29uc3QgZXZQb3MgPSBldmVudC5sYXRMbmc7XG4gICAgICAgICAgaWYgKCF0aGlzLnVzZVNlcnZlclNpZGVDbHVzdGVyZXIgJiYgdGhpcy5mZWF0dXJlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGNsdXN0ZXJJZDogbnVtYmVyID0gbWFya2VyLmdldCgnY2x1c3Rlcl9pZCcpIGFzIG51bWJlcjtcbiAgICAgICAgICAgIGNvbnN0IHpvb20gPSB0aGlzLnBJbmRleC5nZXRDbHVzdGVyRXhwYW5zaW9uWm9vbShjbHVzdGVySWQpO1xuICAgICAgICAgICAgdGhpcy5tYXAuc2V0T3B0aW9ucyh7XG4gICAgICAgICAgICAgIGNlbnRlcjogZXZQb3MsXG4gICAgICAgICAgICAgIHpvb20sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgYm91bmRzID0gQ2x1c3RlcmVySGVscGVyLmdldENsdXN0ZXJCb3VuZHModGhpcy5tYXAsIG1hcmtlciwgdGhpcy5yYWRpdXMpO1xuICAgICAgICAgICAgaWYgKCFib3VuZHMuaXNFbXB0eSgpKSB7XG4gICAgICAgICAgICAgIHRoaXMubWFwLmZpdEJvdW5kcyhib3VuZHMsIDUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnBNYXJrZXJDbGljayhtYXJrZXIsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRDbGlja0V2ZW50TmFtZShtYXJrZXI6IGdvb2dsZS5tYXBzLk1hcmtlcik6IHN0cmluZyB7XG4gICAgbGV0IGV2ZW50TmFtZSA9ICdjbGljayc7XG4gICAgaWYgKG1hcmtlci5nZXQoJ2NsdXN0ZXInKSAhPT0gdHJ1ZSAmJiB0aGlzLnBPdmVybGFwTWFya2VyU3BpZGVyZmllcikge1xuICAgICAgZXZlbnROYW1lID0gJ3NwaWRlcl9jbGljayc7XG4gICAgfVxuICAgIHJldHVybiBldmVudE5hbWU7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUZlYXR1cmVzRnJvbURhdGFMYXllcnMoKTogdm9pZCB7XG4gICAgdGhpcy5jbGVhck5vblBvaW50RmVhdHVyZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgaGlkZU1hcmtlcnMoKSB7XG4gICAgaWYgKHRoaXMucE1hcmtlcnMgJiYgdGhpcy5wTWFya2Vycy5sZW5ndGgpIHtcbiAgICAgIGZvciAoY29uc3QgbWFya2VyIG9mIHRoaXMucE1hcmtlcnMpIHtcbiAgICAgICAgbWFya2VyLnNldE1hcChudWxsKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNob3dNYXJrZXJzKG1hcmtlcnM6IGdvb2dsZS5tYXBzLk1hcmtlcltdIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgbWFya2VyQ29sbGVjdGlvbiA9IG1hcmtlcnMgPz8gdGhpcy5wTWFya2VycztcbiAgICBpZiAobWFya2VyQ29sbGVjdGlvbiAmJiBtYXJrZXJDb2xsZWN0aW9uLmxlbmd0aCkge1xuICAgICAgZm9yIChjb25zdCBtYXJrZXIgb2YgbWFya2VyQ29sbGVjdGlvbikge1xuICAgICAgICBtYXJrZXIuc2V0TWFwKHRoaXMubWFwKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZU1hcmtlcnMoKSB7XG4gICAgdGhpcy5oaWRlTWFya2VycygpO1xuICAgIHRoaXMucE1hcmtlcnMgPSBbXTtcbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IENMQVNTX05BTUVfREVGQVVMVCA9ICdjbHVzdGVyJztcbmV4cG9ydCBjb25zdCBNSU5fWk9PTV9ERUZBVUxUID0gMDtcbmV4cG9ydCBjb25zdCBNQVhfWk9PTV9ERUZBVUxUID0gMTk7XG5leHBvcnQgY29uc3QgUkFESVVTX0RFRkFVTFQgPSA4MDtcbmV4cG9ydCBjb25zdCBNSU5fQ0xVU1RFUl9TSVpFX0RFRkFVTFQgPSAyO1xuZXhwb3J0IGNvbnN0IE1BUktFUl9DTFVTVEVSX0lNQUdFX1BBVEhfREVGQVVMVCA9ICdodHRwczovL21hcHMtdG9vbHMtMjQyYTYuZmlyZWJhc2VhcHAuY29tL2NsdXN0ZXJlci9pbWFnZXMvbSc7XG5leHBvcnQgY29uc3QgTUFSS0VSX0NMVVNURVJfSU1BR0VfRVhURU5TSU9OID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uaGFzRmVhdHVyZShcbiAgJ2h0dHA6Ly93d3cudzMub3JnL1RSL1NWRzExL2ZlYXR1cmUjSW1hZ2UnLFxuICAnMS4xJyxcbilcbiAgPyAnc3ZnJ1xuICA6ICdwbmcnO1xuZXhwb3J0IGNvbnN0IElDT05fVVJMX0RFRkFVTFQgPSAnaHR0cDovL21hcHMuZ29vZ2xlLmNvbS9tYXBmaWxlcy9rbWwvcGFkZGxlL2JsdS1ibGFuay5wbmcnO1xuZXhwb3J0IGNvbnN0IFNJWkVTID0gWzUzLCA1NiwgNjYsIDc4LCA5MF07XG4iLCJpbXBvcnQgeyBTdXBlckNsdXN0ZXJBZGFwdGVyIH0gZnJvbSAnLi9jbHVzdGVyZXInO1xuXG5jb25zdCBoYXNoRmVhdHVyZUNlbnRlcnM6IE1hcDxzdHJpbmcgfCBudW1iZXIsIGdvb2dsZS5tYXBzLkxhdExuZz4gPSBuZXcgTWFwPHN0cmluZyB8IG51bWJlciwgZ29vZ2xlLm1hcHMuTGF0TG5nPigpO1xuY29uc3QgaGFzaEZlYXR1cmVzQm91bmRzOiBNYXA8c3RyaW5nIHwgbnVtYmVyLCBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHM+ID0gbmV3IE1hcDxcbiAgc3RyaW5nIHwgbnVtYmVyLFxuICBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHNcbj4oKTtcbmNvbnN0IGluc3RhbmNlczogV2Vha01hcDxnb29nbGUubWFwcy5NYXAsIFN1cGVyQ2x1c3RlckFkYXB0ZXI+ID0gbmV3IFdlYWtNYXAoKTtcblxuZXhwb3J0IGNsYXNzIENsdXN0ZXJlckhlbHBlciB7XG4gIHByaXZhdGUgc3RhdGljIG5ld0lkID0gMTtcblxuICBwdWJsaWMgc3RhdGljIGZlYXR1cmVDZW50ZXIoZmVhdHVyZTogZ29vZ2xlLm1hcHMuRGF0YS5GZWF0dXJlKTogZ29vZ2xlLm1hcHMuTGF0TG5nIHtcbiAgICBpZiAoIWhhc2hGZWF0dXJlQ2VudGVycy5oYXMoZmVhdHVyZS5nZXRJZCgpKSkge1xuICAgICAgY29uc3QgZ2VvbSA9IGZlYXR1cmUuZ2V0R2VvbWV0cnkoKTtcbiAgICAgIGlmIChnZW9tLmdldFR5cGUoKSA9PT0gJ1BvaW50Jykge1xuICAgICAgICBoYXNoRmVhdHVyZUNlbnRlcnMuc2V0KGZlYXR1cmUuZ2V0SWQoKSwgKGdlb20gYXMgZ29vZ2xlLm1hcHMuRGF0YS5Qb2ludCkuZ2V0KCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGFzaEZlYXR1cmVDZW50ZXJzLnNldChmZWF0dXJlLmdldElkKCksIENsdXN0ZXJlckhlbHBlci5mZWF0dXJlQm91bmRzKGZlYXR1cmUpLmdldENlbnRlcigpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcmVzID0gaGFzaEZlYXR1cmVDZW50ZXJzLmdldChmZWF0dXJlLmdldElkKCkpO1xuICAgIHJldHVybiByZXMgPyByZXMgOiBDbHVzdGVyZXJIZWxwZXIuZmVhdHVyZUJvdW5kcyhmZWF0dXJlKS5nZXRDZW50ZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZmVhdHVyZUJvdW5kcyhmZWF0dXJlOiBnb29nbGUubWFwcy5EYXRhLkZlYXR1cmUpOiBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMge1xuICAgIGlmICghaGFzaEZlYXR1cmVzQm91bmRzLmhhcyhmZWF0dXJlLmdldElkKCkpKSB7XG4gICAgICBjb25zdCBnZW9tID0gZmVhdHVyZS5nZXRHZW9tZXRyeSgpO1xuICAgICAgY29uc3QgZ2VvbUJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKTtcbiAgICAgIGdlb20uZm9yRWFjaExhdExuZygobGF0TG5nKSA9PiB7XG4gICAgICAgIGdlb21Cb3VuZHMuZXh0ZW5kKGxhdExuZyk7XG4gICAgICB9KTtcbiAgICAgIGhhc2hGZWF0dXJlc0JvdW5kcy5zZXQoZmVhdHVyZS5nZXRJZCgpLCBnZW9tQm91bmRzKTtcbiAgICB9XG4gICAgY29uc3QgcmVzID0gaGFzaEZlYXR1cmVzQm91bmRzLmdldChmZWF0dXJlLmdldElkKCkpO1xuICAgIHJldHVybiByZXMgPyByZXMgOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGlzRmVhdHVyZUluQm91bmRzKGZlYXR1cmU6IGdvb2dsZS5tYXBzLkRhdGEuRmVhdHVyZSwgYm91bmRzOiBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMpOiBib29sZWFuIHtcbiAgICBpZiAoYm91bmRzKSB7XG4gICAgICBjb25zdCBnZW9tID0gZmVhdHVyZS5nZXRHZW9tZXRyeSgpO1xuICAgICAgaWYgKGdlb20uZ2V0VHlwZSgpID09PSAnUG9pbnQnKSB7XG4gICAgICAgIHJldHVybiBib3VuZHMuY29udGFpbnMoKGdlb20gYXMgZ29vZ2xlLm1hcHMuRGF0YS5Qb2ludCkuZ2V0KCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGJvdW5kcy5jb250YWlucyhDbHVzdGVyZXJIZWxwZXIuZmVhdHVyZUNlbnRlcihmZWF0dXJlKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldENsdXN0ZXJlcihtYXA6IGdvb2dsZS5tYXBzLk1hcCk6IFN1cGVyQ2x1c3RlckFkYXB0ZXIgfCB1bmRlZmluZWQge1xuICAgIGlmIChpbnN0YW5jZXMuaGFzKG1hcCkpIHtcbiAgICAgIHJldHVybiBpbnN0YW5jZXMuZ2V0KG1hcCk7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHNldENsdXN0ZXJlcihtYXA6IGdvb2dsZS5tYXBzLk1hcCwgY2x1c3RlcmVyOiBTdXBlckNsdXN0ZXJBZGFwdGVyKTogdm9pZCB7XG4gICAgaWYgKGluc3RhbmNlcy5oYXMobWFwKSkge1xuICAgICAgY29uc3QgcHJldkluc3RhbmNlID0gaW5zdGFuY2VzLmdldChtYXApO1xuICAgICAgaWYgKHByZXZJbnN0YW5jZSkge1xuICAgICAgICBwcmV2SW5zdGFuY2UuZGVzdHJveSgpO1xuICAgICAgfVxuICAgICAgaW5zdGFuY2VzLmRlbGV0ZShtYXApO1xuICAgIH1cbiAgICBpbnN0YW5jZXMuc2V0KG1hcCwgY2x1c3RlcmVyKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0Q2x1c3RlckJvdW5kcyhcbiAgICBtYXA6IGdvb2dsZS5tYXBzLk1hcCxcbiAgICBtYXJrZXI6IGdvb2dsZS5tYXBzLk1hcmtlcixcbiAgICByYWRpdXM6IG51bWJlcixcbiAgKTogZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzIHtcbiAgICBjb25zdCBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XG4gICAgaWYgKG1hcCAmJiBtYXJrZXIgJiYgcmFkaXVzKSB7XG4gICAgICBjb25zdCBwb3NpdGlvbiA9IG1hcmtlci5nZXRQb3NpdGlvbigpO1xuICAgICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICAgIGNvbnN0IHBvaW50ID0gQ2x1c3RlcmVySGVscGVyLmZyb21MYXRMbmdUb1BpeGVsKHBvc2l0aW9uLCBtYXApO1xuICAgICAgICBpZiAocG9pbnQpIHtcbiAgICAgICAgICBjb25zdCBzd1BvaW50ID0gbmV3IGdvb2dsZS5tYXBzLlBvaW50KHBvaW50LnggLSByYWRpdXMsIHBvaW50LnkgLSByYWRpdXMpO1xuICAgICAgICAgIGNvbnN0IG5lUG9pbnQgPSBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQocG9pbnQueCArIHJhZGl1cywgcG9pbnQueSArIHJhZGl1cyk7XG4gICAgICAgICAgY29uc3Qgc3cgPSBDbHVzdGVyZXJIZWxwZXIuZnJvbVBpeGVsVG9MYXRMbmcoc3dQb2ludCwgbWFwKTtcbiAgICAgICAgICBjb25zdCBuZSA9IENsdXN0ZXJlckhlbHBlci5mcm9tUGl4ZWxUb0xhdExuZyhuZVBvaW50LCBtYXApO1xuICAgICAgICAgIGlmIChzdykge1xuICAgICAgICAgICAgYm91bmRzLmV4dGVuZChzdyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChuZSkge1xuICAgICAgICAgICAgYm91bmRzLmV4dGVuZChuZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBib3VuZHM7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldE5ld0lkKCk6IG51bWJlciB7XG4gICAgcmV0dXJuICsrQ2x1c3RlcmVySGVscGVyLm5ld0lkO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZnJvbUxhdExuZ1RvUGl4ZWwocG9zaXRpb246IGdvb2dsZS5tYXBzLkxhdExuZywgbWFwOiBnb29nbGUubWFwcy5NYXApIHtcbiAgICBjb25zdCBzY2FsZSA9IE1hdGgucG93KDIsIG1hcC5nZXRab29tKCkpO1xuICAgIGNvbnN0IHByb2plY3Rpb24gPSBtYXAuZ2V0UHJvamVjdGlvbigpO1xuICAgIGNvbnN0IGJvdW5kcyA9IG1hcC5nZXRCb3VuZHMoKTtcbiAgICBjb25zdCBudyA9IHByb2plY3Rpb24/LmZyb21MYXRMbmdUb1BvaW50KFxuICAgICAgbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhib3VuZHM/LmdldE5vcnRoRWFzdCgpLmxhdCgpID8/IDAsIGJvdW5kcz8uZ2V0U291dGhXZXN0KCkubG5nKCkgPz8gMCksXG4gICAgKTtcbiAgICBjb25zdCBwb2ludCA9IHByb2plY3Rpb24/LmZyb21MYXRMbmdUb1BvaW50KHBvc2l0aW9uKTtcbiAgICByZXR1cm4gbmV3IGdvb2dsZS5tYXBzLlBvaW50KFxuICAgICAgTWF0aC5mbG9vcigoKHBvaW50Py54ID8/IDApIC0gKG53Py54ID8/IDApKSAqIHNjYWxlKSxcbiAgICAgIE1hdGguZmxvb3IoKChwb2ludD8ueSA/PyAwKSAtIChudz8ueSA/PyAwKSkgKiBzY2FsZSksXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGZyb21QaXhlbFRvTGF0TG5nKHBpeGVsOiBnb29nbGUubWFwcy5Qb2ludCwgbWFwOiBnb29nbGUubWFwcy5NYXApIHtcbiAgICBjb25zdCBzY2FsZSA9IE1hdGgucG93KDIsIG1hcC5nZXRab29tKCkpO1xuICAgIGNvbnN0IHByb2plY3Rpb24gPSBtYXAuZ2V0UHJvamVjdGlvbigpO1xuICAgIGNvbnN0IGJvdW5kcyA9IG1hcC5nZXRCb3VuZHMoKTtcbiAgICBjb25zdCBudyA9IHByb2plY3Rpb24/LmZyb21MYXRMbmdUb1BvaW50KFxuICAgICAgbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhib3VuZHM/LmdldE5vcnRoRWFzdCgpLmxhdCgpID8/IDAsIGJvdW5kcz8uZ2V0U291dGhXZXN0KCkubG5nKCkgPz8gMCksXG4gICAgKTtcbiAgICBjb25zdCBwb2ludCA9IG5ldyBnb29nbGUubWFwcy5Qb2ludChwaXhlbC54IC8gc2NhbGUgKyAobnc/LnggPz8gMCksIHBpeGVsLnkgLyBzY2FsZSArIChudz8ueSA/PyAwKSk7XG4gICAgcmV0dXJuIHByb2plY3Rpb24/LmZyb21Qb2ludFRvTGF0TG5nKHBvaW50KTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFN1cGVyQ2x1c3RlckFkYXB0ZXJMb2FkZXIge1xuICBwdWJsaWMgc3RhdGljIGFzeW5jIGdldENsdXN0ZXJlcigpOiBQcm9taXNlPGFueT4ge1xuICAgIGlmIChnb29nbGUgJiYgZ29vZ2xlLm1hcHMpIHtcbiAgICAgIGNvbnN0IG1vZHVsZSA9IGF3YWl0IGltcG9ydCgnLi9jbHVzdGVyZXInKTtcbiAgICAgIHJldHVybiBtb2R1bGUuU3VwZXJDbHVzdGVyQWRhcHRlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0dvb2dsZSBNYXBzIEphdmFTY3JpcHQgQVBJIHYzIGlzIG5vdCBsb2FkZWQuIENhbm5vdCBpbml0aWFsaXplIFN1cGVyQ2x1c3RlckFkYXB0ZXIuJyk7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==