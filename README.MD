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
* No reducers, dispatchers or other nonsence

Usage
===

### Constructor
| Arguments | Description |
| --------- | ----------- |
| `values`  | object with initial values that will be stored |

### Methods
| Name | arguments | Description |
| :--: | :-------: | :---------- |
| add | `{prop1: value1[, prop2:value2[, ...[, propN:valueN]]]}` | adds new prop(s) to store |
| remove | `prop | [prop1[, prop2[, ...[, propN]]]]` | removes single or multiple props from store |
| updateMultipleProps | `values` | updates multiple props fom provided object |
| subscribe | `callback` | will fire your callback when any prop changes with current values |
| unsubscribe | `callback` | unsubscribe a callback from store updates |
| on | `prop, callback` | will fire your callback on prop updates with value |
| off | `prop, callback` | unsubscribe from prop updates |
| one | `prop, callback` | subscribe for next change |
| addMiddleware | `prop, callback` | add a middleware function that will be called before the value setter, must return a value |
| removeMiddleware | `prop` | removes middleware from prop |

### Getters
| Name | Returns | Description |
| :--: | :-----: | :---------- |
| props | `array` | Returns an object with prop:prop pairs |
| values | `values` | Returns object containing stored items |

Examples
===
[Simple usage](/docs/example.md)

Complete API documentation
===
[API](/docs/api.md)

Development
===
### Install requirements

```bash
yarn
npm i
```

### Build

```bash
yarn build
npm run build
```

### Test

```bash
yarn test
npm test
```

### Generate API documentation

```bash
yarn docs
npm run docs
```

### TODO

- [ ] tests

Contibutions
===

Yes, please!

Also [this](https://git-scm.com/book/en/v2/GitHub-Contributing-to-a-Project)

Written with ❤❤❤ by [Wasteland Fluttershy](https://github.com/ingvardm).