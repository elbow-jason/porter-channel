/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var PorterEvent_1 = __webpack_require__(1);
	var Channel_1 = __webpack_require__(2);
	window.Porter = window.Porter || {};
	window.Porter.PorterEvent = PorterEvent_1.PorterEvent;
	window.Porter.Channel = Channel_1.Channel;


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	var PorterEvent = (function () {
	    function PorterEvent(type, payload) {
	        this.type = type;
	        this.payload = payload;
	    }
	    PorterEvent.fromNativeEvent = function (e) {
	        var eventType = e.type.split("::").pop();
	        return new PorterEvent(eventType, e.detail);
	    };
	    PorterEvent.toNativeEvent = function (e) {
	        var customEvent = document.createEvent("CustomEvent");
	        customEvent.initCustomEvent(e.type, false, true, e.payload);
	        return customEvent;
	    };
	    return PorterEvent;
	}());
	exports.PorterEvent = PorterEvent;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var PorterEvent_1 = __webpack_require__(1);
	var Channel = (function () {
	    /*
	      The Channel class manages the addition and
	      removal of EventListeners with actions and callbacks
	      on the window object.
	      The Channel class's `publish` method turns actions
	      and data into dispatched events namespaced to the channel's
	      name ('theChannelName::theAction')
	    */
	    function Channel(name) {
	        this.name = name;
	    }
	    Channel.prototype.formatAction = function (action) {
	        return [this.name, action].join("::");
	    };
	    Channel.prototype.subscribe = function (action, clientCallback) {
	        var chanAction = this.formatAction(action);
	        var callback = function (e) {
	            var event = PorterEvent_1.PorterEvent.fromNativeEvent(e);
	            clientCallback(event);
	        };
	        window.addEventListener(chanAction, callback);
	        return function () { return window.removeEventListener(chanAction, callback); };
	    };
	    Channel.prototype.publish = function (actionType, data) {
	        var chanAction = this.formatAction(actionType);
	        var e = new PorterEvent_1.PorterEvent(chanAction, data);
	        window.dispatchEvent(PorterEvent_1.PorterEvent.toNativeEvent(e));
	        return e;
	    };
	    return Channel;
	}());
	exports.Channel = Channel;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map