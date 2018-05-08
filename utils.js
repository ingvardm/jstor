export function diff(newObject, oldObject) {
    let updatedKeys = {}
    let shouldUpdate = false
    for (let key in newObject) {
        if (newObject[key] !== oldObject[key]) {
            shouldUpdate = true
            updatedKeys[key] = newObject[key]
        }
    }
    if (shouldUpdate) return updatedKeys
    return null
}

export function updateSubscribers(subscribers, state) {
    if (subscribers.length) subscribers.forEach(subscriber => subscriber(state))
}

export function updatePropSubscribers(subscribers, updates) {
    for (let key in updates)
        if (key in subscribers)
            subscribers[key].forEach(subscriber => subscriber(updates[key]))
}