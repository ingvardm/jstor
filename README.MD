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

## Examples
[Simple usage](/docs/example.md)


TODO
===
- [ ] tests

Contibutions
===
Yes, please!

Also [this](https://git-scm.com/book/en/v2/GitHub-Contributing-to-a-Project)

Written with ❤❤❤ by [Wasteland Fluttershy](https://github.com/ingvardm).