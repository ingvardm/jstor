/**
 * @function updateSubscribers update subscribers
 * @param { function[] } subscribers array with subscribers that should be updated
 * @param { any } updates argument that will be passed to all subscribers
 */
export function updateSubscribers(subscribers, updates) {
    if (subscribers.length) subscribers.forEach(subscriber => subscriber(updates))
}

/**
 * @function removeElementFromArray removes an element from array
 * @param { any } element array element that should be removed
 * @param { Array } array array to remove element from
 */
export function removeElementFromArray(element, array){
    let elementIndex = array.indexOf(element)
    if (elementIndex > -1) array.splice(elementIndex, 1)
}