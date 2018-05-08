import { diff, updateSubscribers, updatePropSubscribers } from './utils'

export default class Store {
    static diff = diff
    static updateSubscribers = updateSubscribers
    static updatePropSubscribers = updatePropSubscribers

    constructor(initialState = {}, hydratableProps = {}) {
        this._state = { ...initialState }
        this.hydratableProps = hydratableProps
    }

    _subscribers = []
    _keySubscribers = {}

    set state(newState) {
        let updates = Store.diff(newState, this.state)
        if (updates) {
            let updatedState = { ...this.state, ...updates }
            this._setState(updatedState)
            Store.updateSubscribers(this._subscribers, updatedState)
            Store.updatePropSubscribers(this._keySubscribers, updates)
        }
    }

    get state() {
        return { ...this._state }
    }

    _setState = updatedState => {
        this._state = updatedState
    }

    subscribe = subscriber => {
        if (!subscriber) throw 'must suply subscriber'
        let newSubscriber = !this._subscribers.includes(subscriber)
        if (newSubscriber) this._subscribers.push(subscriber)
        subscriber(this.state)
    }

    unsubscribe = subscriber => {
        let subscriberIndex = this._subscribers.indexOf(subscriber)
        if (subscriberIndex > -1) this._subscribers.splice(subscriberIndex, 1)
        else throw `${subscriber} is not subscribed`
    }

    subscribeToPropUpdate = (key = null, subscriber = null) => {
        if (!key || !subscriber) throw 'must suply prop name and callback'
        if (!this.state.hasOwnProperty(key)) throw `${key} doesnt exist in ${Object.keys(this.state).join(', ')}`
        if (!this._keySubscribers[key]) this._keySubscribers[key] = []

        let newSubscriber = !this._keySubscribers[key].includes(subscriber)
        if (newSubscriber) this._keySubscribers[key].push(subscriber)
        subscriber(this.state[key])
    }

    unsubscribeFromPropUpdate = (key = null, subscriber = null) => {
        if (!key && !subscriber) throw 'must suply prop name and callback'
        let subscriberIndex = this._keySubscribers[key].indexOf(subscriber)
        if (subscriberIndex > -1) this._keySubscribers[key].splice(subscriberIndex, 1)
        else throw `${subscriber} is not subscribed`
        if (!this._keySubscribers[key].length) delete this._keySubscribers[key]
    }

    hydrate = async _ => {
        let hydratedProps = {}
        for (let key in this.hydratableProps)
            hydratedProps[key] = await this.hydratableProps[key]()
        this.state = { ...hydratedProps }
        return this.state
    }
}