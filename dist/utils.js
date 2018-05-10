"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateSubscribers = updateSubscribers;
exports.removeElementFromArray = removeElementFromArray;
function updateSubscribers(subscribers, updates) {
    if (subscribers.length) subscribers.forEach(subscriber => subscriber(updates));
}

function removeElementFromArray(element, array) {
    let elementIndex = array.indexOf(element);
    if (elementIndex > -1) array.splice(elementIndex, 1);
}