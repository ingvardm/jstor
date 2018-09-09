import { updateSubscribers, removeElementFromArray } from './utils'

/**
 * @function _combinePoints             combines series of points
 * 
 * @param   { Array[] }   points        array of points to be combined
 * @param   { Number }    groupLength   number of points that will be combined into one point
 * @param   { Number }    limit         number of points to be converted into one point
 * @param   { Function }  getStartTime  a function to get starting timestamp for first group e.g. first day of month
 * 
 * @returns { Array[] }                 returns new series with grouped points
 */
export default class Store {
    /**
     * Create a store
     * @param { Object } initialValues a set of key:value pairs
     */
    constructor(initialValues = {}) {
        this.addMultipleProps(initialValues)
    }

    // stores the values
    _values = {}

    // stores subscribers that will fire on any change
    _subscribers = []

    // stores subscribers that will fire on a specific prop change
    _propSubscribers = {}

    /**
     * @function values get all stored values
     * @returns { Object } returns key:value pairs
     */
    get values() { return { ...this._values } }

    /**
     * @function props get all stored props
     * @returns { Array } returns prop names
     */
    get props() { return Object.keys(this._values) }

    /**
     * @function addProp add a prop that will fire callbacks when changed
     * @param { string } prop prop name
     * @param { any } vlaue prop value
     */
    addProp = (prop, value) => {
        if (this.hasOwnProperty(prop)) throw 'attempted to create duplicate prop'
        this._values[prop] = value
        Object.defineProperty(this, prop, {
            get() {
                return this._values[prop]
            },
            set(value) {
                this._values[prop] = value
                if (this._propSubscribers[prop]) updateSubscribers(this._propSubscribers[prop], value)
                updateSubscribers(this._subscribers, this.values)
            },
            enumerable: true,
            configurable: true
        })
    }

    /**
     * @function addMultipleProps add multiple props that will fire callbacks when changed
     * @param { Object } values a set of key:value pairs to add
     */
    addMultipleProps = values => {
        for (let prop in values) {
            this.addProp(prop, values[prop])
        }
    }

    /**
     * @function removeProp add multiple props that will fire callbacks when changed
     * @param { strng } prop a prop name to remove from store
     */
    removeProp = prop => {
        if (!this.hasOwnProperty(prop)) trow`${prop} doesnt exist in {${this.props.join(', ')}}`
        delete this._values[prop]
        delete this._propSubscribers[prop]
        updateSubscribers(this._propSubscribers[prop], null)
        updateSubscribers(this._subscribers, this.values)
    }

    /**
     * @function updateMultipleProps update multiple props and fire callbacks
     * @param { Object } values a set of key:value pairs to update
     */
    updateMultipleProps = values => {
        for (let prop in values) {
            let newValue = values[prop]
            this._values[prop] = newValue
            if (this._propSubscribers[prop]) updateSubscribers(this._propSubscribers[prop], newValue)
        }
        updateSubscribers(this._subscribers, this.values)
    }

    /**
     * @function subscribe add a callback that will be fired on every change
     * @param { function } subscriber a function that will be called with updated values
     */
    subscribe = subscriber => {
        if (!subscriber) throw 'must suply subscriber'
        let newSubscriber = !this._subscribers.includes(subscriber)
        if (newSubscriber) this._subscribers.push(subscriber)
    }

    /**
     * @function unsubscribe unsubscribe a function from updates
     * @param { function } subscriber a function to remove from subscribers
     */
    unsubscribe = subscriber => {
        removeElementFromArray(subscriber, this._subscribers)
    }

    /**
     * @function on subscribe to specific prop update
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
     * @function off unsubscribe from specific prop update
     * @param { string } prop prop name to unsubscribe from
     * @param { function } subscriber a function to remove from prop subscribers
     */
    off = (prop, subscriber) => {
        if (!prop && !subscriber) throw 'must suply prop name and callback'
        removeElementFromArray(subscriber, this._propSubscribers[prop])
        if (!this._propSubscribers[prop].length) delete this._propSubscribers[prop]
    }

    /**
     * @function one subscribe to specific prop next update
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
}