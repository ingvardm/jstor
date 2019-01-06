import MyLittleStore from './my-little-store'

describe('Basic functions', () => {
    const initialValues = {
        initializedValue: true
    }
    
    const store = new MyLittleStore(initialValues)
    
    test('store created with initialized value', ()=>{
        expect(store.initializedValue).toBe(true)
    })
    
    test('add props', () => {
        store.add({
            addedPropA: true,
            addedPropB: true
        })
        expect(store.addedPropA).toBe(true)
        expect(store.addedPropB).toBe(true)
    })

    test('fail while adding duplicate prop', () => {
        function addDuplicateProps(){
            store.add({
                addedPropA: true
            })
        }
        expect(addDuplicateProps).toThrow()
    })
    
    test('remove prop', () => {
        store.remove(store.props.initializedValue)
        expect(store.initializedValue).toBeUndefined()
    })

    test('remove multiple props', () => {
        store.remove([store.props.addedPropA, store.props.addedPropB])
        expect(store[store.props.addedPropA]).toBeUndefined()
        expect(store[store.props.addedPropB]).toBeUndefined()
    })
})