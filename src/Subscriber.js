import { filterObject } from './utils'

/**
 * @class Subscriber
 * @classdesc Subscriber
 */
export default class Subscriber {
    //stores the keys that trigger updates
    _props = {}

    //stores cached update hashes and whether they should trigger updates
    _cachedKeyCombinations = {}

    // stores last known store satate when the subscriber is paused
    _lastKnownValues = {}

    // paused flag whether the subscriber is paused
    _paused = false

    // stores whether any change should trigger an update
    _updateOnEveryProp = false

    // stores the single key on which to fire updates if this is a single key subscriber
    _singlePropSubscriber = null

    // stores filters
    _filters = {}

    /**
    * Create a subscriber
    * @param { callback } callback - function that will be called with updated values
    * @param { string | Array.<string> } [filter=null] - keys that fill trigger update
    */
    constructor(callback, filter = null) {
        this.setCallback(callback)
        this._applyFilter(filter)
    }

    /**
     * Apply a filter scheme that will trigger updates
     * @private
     * @function _applyFilter
     * @param {(string|string[])} filter - keys that fill trigger updates
     */
    _applyFilter = filter => {
        if (!filter) {
            this._updateOnEveryProp = true
        } else if (typeof filter === 'string') {
            this._singlePropSubscriber = filter
        } else if (Array.isArray(filter)) {
            filter.forEach(this._addFilter)
        } else {
            throw `${typeof filter} is not supported filter type! Must be array or string`
        }
    }

    /**
     * Apply a filter scheme that will trigger updates
     * @private
     * @function _addFilter
     * @param { string } - filter keys that fill trigger updates
     */
    _addFilter = filter => this._filters[filter] = true

    /**
     * Checks wheather the updateHash was cached
     * @private
     * @function _isCached
     * @param { string } updateHash - string of combined keys
     * @returns { boolean } returns wheather the updateHash was cached
     */
    _isCached = updateHash => {
        return this._cachedKeyCombinations.hasOwnProperty(updateHash)
    }

    /**
     * Checks wheather the subscriber should fire update callback
     * @private
     * @function _shouldUpdate
     * @param { string } updateHash - string of combined keys
     * @param { Object.<string, any> } updatedProps - key:value pairs
     * @returns { boolean } returns wheather the subscriber should fire update callback
     */
    _shouldUpdate = (updateHash, updatedProps) => {
        if (this._updateOnEveryProp)
            return true

        if (this._singlePropSubscriber && updatedProps.hasOwnProperty(this._singlePropSubscriber))
            return true

        if (this._isCached(updateHash))
            return this._cachedKeyCombinations[updateHash]

        return Boolean(updatedProps.find(filter => this._filters[filter]))
    }

    /**
     * Sets callback function that will be called with updates
     * @function setCallback
     * @param { callback } callback - that will be called with updates
     */
    setCallback = callback => {
        this._callback = callback
    }

    /**
     * Sets ca llback function that will be called with updates
     * @function setCallback
     * @param {updateRequest} updateRequest - an update request containing state update hash and updated values
     */
    requestUpdate = ({ state, updateHash, updatedProps }) => {

        const shouldUpdate = this._shouldUpdate(updateHash, updatedProps)

        if (shouldUpdate) {
            
            let updates = state
            
            if (!this._updateOnEveryProp) {
                updates = filterObject(this._filters, state)
            }
            
            this._lastKnownValues = updates

            if(!this._paused){
                this._callback(updates)
            }
        }
        
        const isCached = this._cachedKeyCombinations[updateHash]

        if (!isCached) this._cachedKeyCombinations[updateHash] = shouldUpdate
    }

    onRemoved() { }

    /**
     * Removes the subscriber
     * @function remove
     */
    remove = _ => this.onRemoved(this)

    /**
     * Pauses updates for subscriber
     * @function pause
     */
    pause = _ => this._paused = true

    /**
     * Resumes updates for subscriber
     * @function resume
     */
    resume = _ => {
        this._paused = false
        this._callback(this._lastKnownValues)
    }
}

/**
 * updateRequest
 * @typedef {Object} updateRequest
 * @property {Object.<string, any>} state - current state of store
 * @property {Object.<string, any>} updatedProps - updates
 * @property {string} updateHash - string of combined keys
 */
