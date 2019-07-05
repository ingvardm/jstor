import MyLittleStore from './MyLittleStore'

describe('Basic functions', () => {
    const initialValues = {
        initializedValue: true
    }

    const store = new MyLittleStore(initialValues)

    test('store created with initialized value', () => {
        expect(store.initializedValue).toBe(true)
    })
})
