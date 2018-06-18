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