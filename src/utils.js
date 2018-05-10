export function updateSubscribers(subscribers, updates) {
    if (subscribers.length) subscribers.forEach(subscriber => subscriber(updates))
}

export function removeElementFromArray(element, array){
    let elementIndex = array.indexOf(element)
    if (elementIndex > -1) array.splice(elementIndex, 1)
}