!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.jstor=r():e.jstor=r()}("undefined"!=typeof self?self:this,function(){return function(e){var r={};function t(n){if(r[n])return r[n].exports;var u=r[n]={i:n,l:!1,exports:{}};return e[n].call(u.exports,u,u.exports,t),u.l=!0,u.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var u in e)t.d(n,u,function(r){return e[r]}.bind(null,u));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=0)}([function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},u=function(){function e(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(r,t,n){return t&&e(r.prototype,t),n&&e(r,n),r}}(),s=function(e,r){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(r)}}))}([""," doesnt exist in {","}"],[""," doesnt exist in {","}"]),o=t(1);var i=function(){function e(){var r=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};!function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,e),this._values={},this._subscribers=[],this._propSubscribers={},this.addProp=function(e,t){if(r.hasOwnProperty(e))throw"attempted to create duplicate prop";r._values[e]=t,Object.defineProperty(r,e,{get:function(t){return r._valueGetter(e)},set:function(r){this._valueSetter(e,r),this._propSubscribers[e]&&(0,o.updateSubscribers)(this._propSubscribers[e],r),(0,o.updateSubscribers)(this._subscribers,this.values)},enumerable:!0,configurable:!0})},this._valueGetter=function(e){return r._values[e]},this._valueSetter=function(e,t){return r._values[e]=t},this.addMultipleProps=function(e){for(var t in e)r.addProp(t,e[t])},this.removeProp=function(e){r.hasOwnProperty(e)||trow(s,e,r.props.join(", ")),delete r._values[e],delete r._propSubscribers[e],(0,o.updateSubscribers)(r._propSubscribers[e],null),(0,o.updateSubscribers)(r._subscribers,r.values)},this.updateMultipleProps=function(e){for(var t in e){var n=e[t];r._values[t]=n,r._propSubscribers[t]&&(0,o.updateSubscribers)(r._propSubscribers[t],n)}(0,o.updateSubscribers)(r._subscribers,r.values)},this.subscribe=function(e){if(!e)throw"must suply subscriber";!r._subscribers.includes(e)&&r._subscribers.push(e)},this.unsubscribe=function(e){(0,o.removeElementFromArray)(e,r._subscribers)},this.on=function(e,t){if(!e||!t)throw"must suply prop name and callback";if(!r.hasOwnProperty(e))throw e+" doesn't exist in {"+r.props.join(", ")+"}";r._propSubscribers[e]||(r._propSubscribers[e]=[]),!r._propSubscribers[e].includes(t)&&r._propSubscribers[e].push(t)},this.off=function(e,t){if(!e&&!t)throw"must suply prop name and callback";(0,o.removeElementFromArray)(t,r._propSubscribers[e]),r._propSubscribers[e].length||delete r._propSubscribers[e]},this.one=function(e,t){r.on(e,function n(u){r.off(e,n),t(u)})},this.addMultipleProps(t)}return u(e,[{key:"values",get:function(){return n({},this._values)}},{key:"props",get:function(){return Object.keys(this._values)}}]),e}();r.default=i},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.updateSubscribers=function(e,r){e.length&&e.forEach(function(e){return e(r)})},r.removeElementFromArray=function(e,r){var t=r.indexOf(e);t>-1&&r.splice(t,1)}}])});