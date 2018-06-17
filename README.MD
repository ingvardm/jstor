Description
===
A simple and fast store to use as truth source and update your reactive components.

Fertures
===
* Fast
* Minimalistic
* Simple to use
* Can be used to create your own store
* No proxies inside!
* No reducers, dispatchers and other nonsence

Usage
===

## Constructor
| Arguments | Description |
| --------- | ----------- |
| `values`  | object with initial values that will be stored |

## Methods
| Name | arguments | Description |
| :--: | :-------: | :---------- |
| addProp | `prop_name` | adds new prop to store |
| addMultipleProps | `values` | adds multiple new props to store |
| removeProp | `prop_name` | remove a prop from store |
| updateMultiple | `values` | updates multiple props fom provided object |
| subscribe | `callback` | will fire your callback when any prop changes with current values |
| unsubscribe | `callback` | unsubscribe a callback from store updates |
| on | `prop_name, callback` | will fire your callback on prop updates with value |
| off | `prop_name, callback` | unsubscribe from prop updates |
| one | `prop_name, callback` | subscribe for next change |

## Getters
| Name | Returns | Description |
| :--: | :-----: | :---------- |
| props | `array` | Returns an array with available props |
| values | `values` | Returns object containing stored items |

## Example
<details>
<summary>show example</summary>

```js
const Store = require('./dist/index').default

// Create initial state
initialValues = {
    userName: 'Yosi',
    age: 32
}

// Create your store
const myStore = new Store(initialValues)

// See what props you have in store
console.log(myStore.props)
// ["userName", "age"]

// Get all values
console.log(myStore.values)

// Create a subscriber to handle all store events
function subscriber(newState){
    console.log(newState)
}

// Supscribe to all store events
myStore.subscribe(subscriber)
// will call subscriber with curent values

// Unsubscribe
myStore.unsubscribe(subscriber)

// Subscribe for a specific prop update
function onAgeChange(age){
    console.log(`user age changed to: ${age}`)
}
// Subscribe for prop updates
myStore.on('age', onAgeChange)

// Unsubscribe from prop updates
myStore.off('age', onAgeChange)

// Subscribe for one next update
// Will fire only once when the prop changes
myStore.one('age', onAgeChange)

// Get store values
let { userName, age } = myStore

// Set a value
myStore.age = 23

// Set multiple values
myStore.updateMultiple({
    age:24,
    userName: 'Elizabeth'
})
```
</details>

Contibutions
===
Yes, please!

Also [this](https://git-scm.com/book/en/v2/GitHub-Contributing-to-a-Project)

Written with ❤❤❤ by [Wasteland Fluttershy](https://github.com/ingvardm).