## Members

<dl>
<dt><a href="#values">values</a> : <code>Object.&lt;string, any&gt;</code></dt>
<dd><p>Get all stored values</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#update">update(values)</a></dt>
<dd><p>Update multiple props and fire callbacks</p>
</dd>
<dt><a href="#subscribe">subscribe(callback, [filter])</a> ⇒ <code>Subscriber</code></dt>
<dd><p>Create a new Subscriber that will be updated on changes</p>
</dd>
</dl>

<a name="values"></a>

## values : <code>Object.&lt;string, any&gt;</code>
Get all stored values

**Kind**: global variable  
<a name="update"></a>

## update(values)
Update multiple props and fire callbacks

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Object.&lt;string, any&gt;</code> | set of key:value pairs to update |

<a name="subscribe"></a>

## subscribe(callback, [filter]) ⇒ <code>Subscriber</code>
Create a new Subscriber that will be updated on changes

**Kind**: global function  
**Returns**: <code>Subscriber</code> - returns a new Subscriber instance  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>callback</code> | function that will be called with updated values |
| [filter] | <code>string</code> \| <code>Array.&lt;string&gt;</code> | set of props that fill trigger update |

