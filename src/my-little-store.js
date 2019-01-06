import { updateSubscribers, removeElementFromArray } from './utils'

export default class Store {
    /**
     * Create a store
     * @param { Object } initialValues a set of key:value pairs
     */
    constructor(initialValues = {}) {
        this.add(initialValues)
    }

    // stores the values
    _values = {}

    // stores subscribers that will fire on any change
    _subscribers = []

    // stores subscribers that will fire on a specific prop change
    _propSubscribers = {}

    // middleware
    _middleware = {}

    // store props as constants
    _props = {}

    /**
     * Get all stored values
     * @param values
     * @type { Object } returns key:value pairs
     */
    get values() { return { ...this._values } }

    /**
     * Get all stored props
     * @param props
     * @type { Object } returns prop names
     */
    get props() { return this._props }

    /**
     * Add a prop that will fire callbacks when changed
     * @function addProp
     * @param { string } prop prop name
     * @param { any } vlaue prop value
     */
    _addProp = (prop, value) => {
        if (this.hasOwnProperty(prop)) throw 'attempted to create duplicate prop'
        this._values[prop] = value
        this._props[prop] = prop
        Object.defineProperty(this, prop, {
            get: _=> this._valueGetter(prop),
            set(value) {
                if(!!this._middleware[prop]) value = this._middleware[prop](value)
                this._valueSetter(prop, value)
                if (this._propSubscribers[prop]) updateSubscribers(this._propSubscribers[prop], this[prop])
                if (this._subscribers) updateSubscribers(this._subscribers, this.values)
            },
            enumerable: true,
            configurable: true,
        })
    }

    /**
     * Default getter for a prop
     * @function _valueGetter
     * @param { string } prop prop name
     * @returns { any } returns value for the prop
     */
    _valueGetter = prop => this._values[prop]

    /**
     * Default setter for a prop
     * @function _valueSetter
     * @param { string } prop prop name
     * @param { any } vlaue prop value
     */
    _valueSetter = (prop, value) => this._values[prop] = value

    /**
     * Add props that will fire callbacks when changed
     * @function add
     * @param { Object } values a set of key:value pairs to add
     */
    add = values => {
        for (let prop in values) this._addProp(prop, values[prop])
    }

    /**
     * Remove single prop
     * @function _removeProp
     * @param { strng } prop a prop name to remove from store
     */
    _removeProp = prop => {
        if (!this.hasOwnProperty(prop)) return
        delete this._values[prop]
        delete this._propSubscribers[prop]
    }

    /**
     * Remove single prop
     * @function remove
     * @param { strng } prop a prop name to remove from store
     */
    remove = prop => {
        this._removeProp(prop)
        if (this._propSubscribers[prop]) updateSubscribers(this._propSubscribers[prop], null)
        if (this._subscribers) updateSubscribers(this._subscribers, this.values)
    }

    /**
     * Remove multiple props
     * @function removeMultiple
     * @param { Array: String } props an array of prop names to remove
     */
    removeMultiple = props => {
        for(let prop of props){
            this._removeProp(prop)
            if (this._propSubscribers[prop]) updateSubscribers(this._propSubscribers[prop], null)
        }
        if (this._subscribers) updateSubscribers(this._subscribers, this.values)
    }

    /**
     * Update multiple props and fire callbacks
     * @function updateMultipleProps
     * @param { Object } values a set of key:value pairs to update
     */
    updateMultipleProps = values => {
        for (let prop in values) {
            let newValue = values[prop]
            this._values[prop] = newValue
            if (this._propSubscribers[prop]) updateSubscribers(this._propSubscribers[prop], newValue)
        }
        if (this._subscribers) updateSubscribers(this._subscribers, this.values)
    }

    /**
     * Add a callback that will be fired on every change
     * @function subscribe
     * @param { function } subscriber a function that will be called with updated values
     */
    subscribe = subscriber => {
        if (!subscriber) throw 'must suply subscriber'
        let newSubscriber = !this._subscribers.includes(subscriber)
        if (newSubscriber) this._subscribers.push(subscriber)
    }

    /**
     * Unsubscribe a function from updates
     * @function unsubscribe
     * @param { function } subscriber a function to remove from subscribers
     */
    unsubscribe = subscriber => {
        removeElementFromArray(subscriber, this._subscribers)
    }

    /**
     * Subscribe to specific prop update
     * @function on
     * @param { string } prop prop name to subscribe to
     * @param { function } subscriber a function that will be called when value changes with new and old values as arguments
     */
    on = (prop, subscriber) => {
        if (!prop || !subscriber) throw 'must suply prop name and callback'
        if (!this.hasOwnProperty(prop)) throw `${prop} doesn't exist in {${this.props.join(', ')}}`
        if (!this._propSubscribers[prop]) this._propSubscribers[prop] = []

        let newSubscriber = !this._propSubscribers[prop].includes(subscriber)
        if (newSubscriber) this._propSubscribers[prop].push(subscriber)
    }

    /**
     * Unsubscribe from specific prop update
     * @function off
     * @param { string } prop prop name to unsubscribe from
     * @param { function } subscriber a function to remove from prop subscribers
     */
    off = (prop, subscriber) => {
        if (!prop && !subscriber) throw 'must suply prop name and callback'
        removeElementFromArray(subscriber, this._propSubscribers[prop])
        if (!this._propSubscribers[prop].length) delete this._propSubscribers[prop]
    }

    /**
     * Subscribe to specific prop next update
     * @function one
     * @param { string } prop prop name to subscribe to
     * @param { function } subscriber a function that will be called when value changes with new and old values as arguments
     */
    one = (prop, subscriber) => {
        let oneTimeSubscriber = value => {
            this.off(prop, oneTimeSubscriber)
            subscriber(value)
        }
        this.on(prop, oneTimeSubscriber)
    }

    /**
     * Register middleware function for prop
     * @function addMiddleware
     * @param { string } prop prop name
     * @param { function } middleware a function that will be called with new value and return modified value
     */
    addMiddleware = (prop, middleware) => {
        if (!prop || !middleware) throw 'must suply prop name and middleware'
        if (!this.hasOwnProperty(prop)) throw `${prop} doesn't exist in {${this.props.join(', ')}}`
        this._middleware[prop] = middleware
    }

    /**
     * Remove middleware function from prop setter
     * @function removeMiddleware
     * @param { string } prop prop name
     */
    removeMiddleware = (prop) => {
        if (!prop || !this.hasOwnProperty(prop)) throw `${prop} doesn't exist in {${this.props.join(', ')}}`
        delete this._middleware[prop]
    }
}