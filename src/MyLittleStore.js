import Subscriber from './Subscriber'
import { updateSubscribers, removeElementFromArray } from './utils'

/**
 * @class Store
 * @classdesc A store that will fire callbacks when its values are changed
 */
export default class Store {
    // stores the values
    _values = {}

    // stores subscribers that will fire on any change
    _subscribers = []

    /**
    * Create a store
    * @param { Object.<string, any> } initialValues - set of key:value pairs
    */
    constructor(initialValues = {}) {
        this._addMultipleValues(initialValues)
    }

    /**
     * Get all stored values
     * @type { Object.<string, any> }
     */
    get values() { return { ...this._values } }

    /**
     * Add props that will fire callbacks when changed
     * @private
     * @function _addMultipleValues
     * @param { Object.<string, any> } values - set of key:value pairs to add
     */
    _addMultipleValues = values => {
        for (const prop in values) this._addProp(prop, values[prop])
    }

    /**
     * Add a prop that will fire callbacks when changed
     * @private
     * @function addProp
     * @param { string } prop - prop name
     * @param { any } vlaue - prop value
     */
    _addProp = (prop, value) => {
        if (this.hasOwnProperty(prop)) throw 'attempted to create duplicate prop'

        this._values[prop] = value

        Object.defineProperty(this, prop, {
            get: _ => this._valueGetter(prop),
            set(value) {
                this._valueSetter(prop, value)
                if (this._subscribers) updateSubscribers(this._subscribers, prop, this.values)
            },
            enumerable: true,
            configurable: true,
        })
    }

    /**
     * Default getter for a prop
     * @private
     * @function _valueGetter
     * @param { string } prop - prop name
     * @returns { any } returns value for the prop
     */
    _valueGetter = prop => this._values[prop]

    /**
     * Default setter for a prop
     * @private
     * @function _valueSetter
     * @param { string } prop - prop name
     * @param { any } vlaue - prop value
     */
    _valueSetter = (prop, value) => this._values[prop] = value

    /**
     * Unsubscribe a function from updates
     * @private
     * @function _unsubscribe
     * @param { function } subscriber - function to remove from subscribers
     */
    _unsubscribe = subscriber => {
        removeElementFromArray(subscriber, this._subscribers)
    }

    /**
     * Update multiple props and fire callbacks
     * @function update
     * @param { Object.<string, any> } values - set of key:value pairs to update
     */
    update = updatedValues => {
        this._values = {
            ...this._values,
            ...updatedValues
        }

        const updatedProps = Object.keys(updatedValues).sort((a, b) => a - b)

        const update = {
            state: this.values,
            updatedProps,
            updateHash: updatedProps.join('')
        }

        if (this._subscribers.length) updateSubscribers(this._subscribers, update)
    }

    /**
     * Create a new Subscriber that will be updated on changes
     * @function subscribe
     * @param { callback } callback - function that will be called with updated values
     * @param { string | Array.<string> } [filter] - set of props that fill trigger update
     * @returns { Subscriber } returns new Subscriber
     */
    subscribe = (callback, filter) => {
        if (!callback || !filter) throw 'must suply callback and filter'

        const subscriber = new Subscriber(callback, filter)

        subscriber.onRemoved(this._unsubscribe)

        this._subscribers.push(subscriber)

        return subscriber
    }
}

