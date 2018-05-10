'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('./utils');

class Store {
    constructor(initialValues = {}) {
        this._values = {};
        this._subscribers = [];
        this._propSubscribers = {};

        this.addProp = (prop, value) => {
            if (this.hasOwnProperty(prop)) throw 'attempted to create duplicate prop';
            this._values[prop] = value;
            Object.defineProperty(this, prop, {
                get() {
                    return this._values[prop];
                },
                set(value) {
                    this._values[prop] = value;
                    if (this._propSubscribers[prop]) (0, _utils.updateSubscribers)(this._propSubscribers[prop], value);
                    (0, _utils.updateSubscribers)(this._subscribers, this.values);
                },
                enumerable: true,
                configurable: true
            });
        };

        this.addMultipleProps = values => {
            for (let prop in values) {
                this.addProp(prop, values[prop]);
            }
        };

        this.removeProp = prop => {
            if (!this.hasOwnProperty(prop)) trow`${prop} doesnt exist in {${this.props.join(', ')}}`;
            delete this._values[prop];
            delete this._propSubscribers[prop];
            (0, _utils.updateSubscribers)(this._propSubscribers[prop], null);
            (0, _utils.updateSubscribers)(this._subscribers, this.values);
        };

        this.updateMultiple = values => {
            for (let prop in values) {
                let newValue = values[prop];
                this._values[prop] = newValue;
                if (this._propSubscribers[prop]) (0, _utils.updateSubscribers)(this._propSubscribers[prop], newValue);
            }
            (0, _utils.updateSubscribers)(this._subscribers, this.values);
        };

        this.subscribe = subscriber => {
            if (!subscriber) throw 'must suply subscriber';
            let newSubscriber = !this._subscribers.includes(subscriber);
            if (newSubscriber) this._subscribers.push(subscriber);
        };

        this.unsubscribe = subscriber => {
            (0, _utils.removeElementFromArray)(subscriber, this._subscribers);
        };

        this.on = (prop, subscriber) => {
            if (!prop || !subscriber) throw 'must suply prop name and callback';
            if (!this.hasOwnProperty(prop)) throw `${prop} doesn't exist in {${this.props.join(', ')}}`;
            if (!this._propSubscribers[prop]) this._propSubscribers[prop] = [];

            let newSubscriber = !this._propSubscribers[prop].includes(subscriber);
            if (newSubscriber) this._propSubscribers[prop].push(subscriber);
        };

        this.off = (prop, subscriber) => {
            if (!prop && !subscriber) throw 'must suply prop name and callback';
            (0, _utils.removeElementFromArray)(subscriber, this._propSubscribers[prop]);
            if (!this._propSubscribers[prop].length) delete this._propSubscribers[prop];
        };

        this.one = (prop, subscriber) => {
            let oneTimeSubscriber = value => {
                this.off(prop, oneTimeSubscriber);
                subscriber(value);
            };
            this.on(prop, oneTimeSubscriber);
        };

        this.addMultipleProps(initialValues);
    }

    get values() {
        return _extends({}, this._values);
    }

    get props() {
        return Object.keys(this._values);
    }

}
exports.default = Store;