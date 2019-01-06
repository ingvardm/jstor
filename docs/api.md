## Members

<dl>
<dt><a href="#values">values</a> : <code>Object</code></dt>
<dd><p>Get all stored values</p>
</dd>
<dt><a href="#props">props</a> : <code>Object</code></dt>
<dd><p>Get all stored props</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#addProp">addProp(prop, vlaue)</a></dt>
<dd><p>Add a prop that will fire callbacks when changed</p>
</dd>
<dt><a href="#_valueGetter">_valueGetter(prop)</a> ⇒ <code>any</code></dt>
<dd><p>Default getter for a prop</p>
</dd>
<dt><a href="#_valueSetter">_valueSetter(prop, vlaue)</a></dt>
<dd><p>Default setter for a prop</p>
</dd>
<dt><a href="#add">add(values)</a></dt>
<dd><p>Add props that will fire callbacks when changed</p>
</dd>
<dt><a href="#_removeProp">_removeProp(prop)</a></dt>
<dd><p>Remove single prop</p>
</dd>
<dt><a href="#remove">remove(prop)</a></dt>
<dd><p>Remove single prop</p>
</dd>
<dt><a href="#removeMultiple">removeMultiple(props)</a></dt>
<dd><p>Remove multiple props</p>
</dd>
<dt><a href="#updateMultipleProps">updateMultipleProps(values)</a></dt>
<dd><p>Update multiple props and fire callbacks</p>
</dd>
<dt><a href="#subscribe">subscribe(subscriber)</a></dt>
<dd><p>Add a callback that will be fired on every change</p>
</dd>
<dt><a href="#unsubscribe">unsubscribe(subscriber)</a></dt>
<dd><p>Unsubscribe a function from updates</p>
</dd>
<dt><a href="#on">on(prop, subscriber)</a></dt>
<dd><p>Subscribe to specific prop update</p>
</dd>
<dt><a href="#off">off(prop, subscriber)</a></dt>
<dd><p>Unsubscribe from specific prop update</p>
</dd>
<dt><a href="#one">one(prop, subscriber)</a></dt>
<dd><p>Subscribe to specific prop next update</p>
</dd>
<dt><a href="#addMiddleware">addMiddleware(prop, middleware)</a></dt>
<dd><p>Register middleware function for prop</p>
</dd>
<dt><a href="#removeMiddleware">removeMiddleware(prop)</a></dt>
<dd><p>Remove middleware function from prop setter</p>
</dd>
</dl>

<a name="values"></a>

## values : <code>Object</code>
Get all stored values

**Kind**: global variable  

| Param |
| --- |
| values | 

<a name="props"></a>

## props : <code>Object</code>
Get all stored props

**Kind**: global variable  

| Param |
| --- |
| props | 

<a name="addProp"></a>

## addProp(prop, vlaue)
Add a prop that will fire callbacks when changed

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| prop | <code>string</code> | prop name |
| vlaue | <code>any</code> | prop value |

<a name="_valueGetter"></a>

## \_valueGetter(prop) ⇒ <code>any</code>
Default getter for a prop

**Kind**: global function  
**Returns**: <code>any</code> - returns value for the prop  

| Param | Type | Description |
| --- | --- | --- |
| prop | <code>string</code> | prop name |

<a name="_valueSetter"></a>

## \_valueSetter(prop, vlaue)
Default setter for a prop

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| prop | <code>string</code> | prop name |
| vlaue | <code>any</code> | prop value |

<a name="add"></a>

## add(values)
Add props that will fire callbacks when changed

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Object</code> | a set of key:value pairs to add |

<a name="_removeProp"></a>

## \_removeProp(prop)
Remove single prop

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| prop | <code>strng</code> | a prop name to remove from store |

<a name="remove"></a>

## remove(prop)
Remove single prop

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| prop | <code>strng</code> | a prop name to remove from store |

<a name="removeMultiple"></a>

## removeMultiple(props)
Remove multiple props

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Array</code> | an array of prop names to remove |

<a name="updateMultipleProps"></a>

## updateMultipleProps(values)
Update multiple props and fire callbacks

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Object</code> | a set of key:value pairs to update |

<a name="subscribe"></a>

## subscribe(subscriber)
Add a callback that will be fired on every change

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| subscriber | <code>function</code> | a function that will be called with updated values |

<a name="unsubscribe"></a>

## unsubscribe(subscriber)
Unsubscribe a function from updates

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| subscriber | <code>function</code> | a function to remove from subscribers |

<a name="on"></a>

## on(prop, subscriber)
Subscribe to specific prop update

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| prop | <code>string</code> | prop name to subscribe to |
| subscriber | <code>function</code> | a function that will be called when value changes with new and old values as arguments |

<a name="off"></a>

## off(prop, subscriber)
Unsubscribe from specific prop update

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| prop | <code>string</code> | prop name to unsubscribe from |
| subscriber | <code>function</code> | a function to remove from prop subscribers |

<a name="one"></a>

## one(prop, subscriber)
Subscribe to specific prop next update

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| prop | <code>string</code> | prop name to subscribe to |
| subscriber | <code>function</code> | a function that will be called when value changes with new and old values as arguments |

<a name="addMiddleware"></a>

## addMiddleware(prop, middleware)
Register middleware function for prop

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| prop | <code>string</code> | prop name |
| middleware | <code>function</code> | a function that will be called with new value and return modified value |

<a name="removeMiddleware"></a>

## removeMiddleware(prop)
Remove middleware function from prop setter

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| prop | <code>string</code> | prop name |

