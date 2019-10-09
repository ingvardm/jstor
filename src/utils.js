/**
 * @function updateSubscribers update subscribers
 * @param { Array.<Subscriber> } subscribers array with subscribers that should be updated
 * @param { any } updates argument that will be passed to all subscribers
 */
export function updateSubscribers(subscribers, updates) {
    if (subscribers.length) subscribers.forEach(subscriber => subscriber.requestUpdate(updates))
}

/**
 * @function removeElementFromArray removes an element from array
 * @param { any } element array element that should be removed
 * @param { Array } array array to remove element from
 */
export function removeElementFromArray(element, array) {
    let elementIndex = array.indexOf(element)
    if (elementIndex > -1) array.splice(elementIndex, 1)
}

/**
 * @function filterObject filters an object by allowed keys
 * @param { Array.<string> } keys array of keys to filter
 * @param { Object.<string, any> } original the object to filter
 * @returns { Object.<string, any> } returns a new object
 */
export function filterObject(filters, original) {
    return Object.keys(filters).reduce((obj, key) => ({ ...obj, [key]: original[key] }), {});
}
