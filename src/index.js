import { updateSubscribers, removeElementFromArray } from './utils'

export default class Store {
    constructor(initialValues = {}) {
        this.addMultipleProps(initialValues)
    }

    _values = {}
    _subscribers = []
    _propSubscribers = {}

    get values() { return { ...this._values } }

    get props() { return Object.keys(this._values) }

    addProp = (prop, value) => {
        if(this.hasOwnProperty(prop)) throw 'attempted to create duplicate prop'
        this._values[prop] = value
        Object.defineProperty(this, prop, {
            get() {
                return this._values[prop]
            },
            set(value) {
                this._values[prop] = value
                if(this._propSubscribers[prop]) updateSubscribers(this._propSubscribers[prop], value)
                updateSubscribers(this._subscribers, this.values)
            },
            enumerable: true,
            configurable: true
        })
    }

    addMultipleProps = values => {
        for(let prop in values){
            this.addProp(prop, values[prop])
        }
    }

    removeProp = prop => {
        if(!this.hasOwnProperty(prop)) trow `${prop} doesnt exist in {${this.props.join(', ')}}`
        delete this._values[prop]
        delete this._propSubscribers[prop]
        updateSubscribers(this._propSubscribers[prop], null)
        updateSubscribers(this._subscribers, this.values)
    }

    updateMultiple = values => {
        for(let prop in values){
            let newValue = values[prop]
            this._values[prop] = newValue
            if(this._propSubscribers[prop]) updateSubscribers(this._propSubscribers[prop], newValue)
        }
        updateSubscribers(this._subscribers, this.values)
    }

    subscribe = subscriber => {
        if (!subscriber) throw 'must suply subscriber'
        let newSubscriber = !this._subscribers.includes(subscriber)
        if (newSubscriber) this._subscribers.push(subscriber)
    }

    unsubscribe = subscriber => {
        removeElementFromArray(subscriber, this._subscribers)
    }

    on = (prop, subscriber) => {
        if (!prop || !subscriber) throw 'must suply prop name and callback'
        if (!this.hasOwnProperty(prop)) throw `${prop} doesn't exist in {${this.props.join(', ')}}`
        if (!this._propSubscribers[prop]) this._propSubscribers[prop] = []

        let newSubscriber = !this._propSubscribers[prop].includes(subscriber)
        if (newSubscriber) this._propSubscribers[prop].push(subscriber)
    }

    off = (prop, subscriber) => {
        if (!prop && !subscriber) throw 'must suply prop name and callback'
        removeElementFromArray(subscriber, this._propSubscribers[prop])
        if (!this._propSubscribers[prop].length) delete this._propSubscribers[prop]
    }

    one = (prop, subscriber) => {
        let oneTimeSubscriber = value => {
            this.off(prop, oneTimeSubscriber)
            subscriber(value)
        }
        this.on(prop, oneTimeSubscriber)
    }
}