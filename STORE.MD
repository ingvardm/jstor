Usage
===
<details>
<summary>Store.js</summary>

```js
// Import the module
import Store from './Store'

// Create initial state
initialState = {
    userName: 'Yosi',
    age: 32
    messages: [...]
}

// Add props that need hydration
hydratableProps = {
    messages: () => Rest.get('...')
}

// Create your store
const myStore = new Store(initialState, hydratableProps)

// Create subscriber
function subscriber(newState){
    console.log(newState)
}

// Subscribe for state change
myStore.subscribe(subscriber)
// will call subscriber with curent state
// and will console.log the initial state

// Unsubscribe
myStore.unsubscribe(subscriber)

// Subscribe for a specific key update
function onGotMessages(messages){
    console.log(messages)
}
myStore.subscribeToPropUpdate('messages', onGotMessages)

// Unsubscribe from key updates
myStore.unsubscribeFromPropUpdate('messages', onGotMessages)

// Hydrate the store
myStore.hydrate()
    .then(...)
    .catch(...)

// Get store state
let { userName, age } = myStore.state

// Set state
myStore.state = { age: 23 }
```
</details>
<br>
<details>
<summary>StackStore.js</summary>

```js
// Go back a number of states
// Defaults to 1
myStore.pop(Number?)

// Reset the store to specific state index
// Defaults to 1
myStore.reset(Number?)
```
</details>