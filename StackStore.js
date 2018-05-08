import Store from './Store'

export default class StackStore extends Store {
    constructor(initialState, hydratableProps) {
        super(null, hydratableProps)
        this._states = [{ ...initialState }]
    }

    _setState = (updatedState) => {
        this._states.push(updatedState)
    }

    set state(newState){
        super.state = newState
    }

    get state() {
        return { ...this._states[this._states.length - 1] }
    }

    pop = (amount = 1) => {
        if (this._states.length) {
            if (amount == 1) this._states.pop()
            else this._states.splice(this._states.length - amount, amount)

            Store.updateSubscribers(this._subscribers, this.state)
        } else {
            throw 'This store is empty... Come back later'
        }
    }

    reset = (stateIndex = 1) => {
        if (this._states.length < 2) return
        this._states.splice(stateIndex, this._states.length - stateIndex)
        let newState = this.state
        Store.updateSubscribers(this._subscribers, newState)
        Store.updatePropSubscribers(this._keySubscribers, newState)
    }
}