const Store = require('./dist/index').default

// import Store from 'my-little-store'

const myLittleStore = new Store({
    counter: 0
})

function onCounterUpdate(count){
    console.log(`counter value updated to: ${count}`)
}

myLittleStore.on(myLittleStore.props.counter, onCounterUpdate)

function increaseCounter(){
    myLittleStore.counter++
}

increaseCounter()

function getDataFromServer(){
    return new Promise(res => {
        setTimeout(res, 1000)
    })
}

class ExtendedStore extends Store{
    constructor(initValues) {
        super({...initValues, hydrated: false})
    }

    async hydrate(){
        await getDataFromServer()
        this.counter++
        this.hydrated = true
    }
}

const ExtStore = new ExtendedStore({
    counter: 0
})

function onHydrated(){
    console.log(ExtStore.values)
}

function middlware(v){
    return v + 1
}

ExtStore.addMiddleware(ExtStore.props.counter, middlware)

ExtStore.on(ExtStore.props.hydrated, onHydrated)

ExtStore.hydrate()