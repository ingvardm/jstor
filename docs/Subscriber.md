## Classes

<dl>
<dt><a href="#Subscriber">Subscriber</a></dt>
<dd><p>Subscriber</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#setCallback">setCallback(callback)</a></dt>
<dd><p>Sets callback function that will be called with updates</p>
</dd>
<dt><a href="#setCallback">setCallback(updateRequest)</a></dt>
<dd><p>Sets ca llback function that will be called with updates</p>
</dd>
<dt><a href="#remove">remove()</a></dt>
<dd><p>Removes the subscriber</p>
</dd>
<dt><a href="#pause">pause()</a></dt>
<dd><p>Pauses updates for subscriber</p>
</dd>
<dt><a href="#resume">resume()</a></dt>
<dd><p>Resumes updates for subscriber</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#updateRequest">updateRequest</a> : <code>Object</code></dt>
<dd><p>updateRequest</p>
</dd>
</dl>

<a name="Subscriber"></a>

## Subscriber
Subscriber

**Kind**: global class  
<a name="setCallback"></a>

## setCallback(callback)
Sets callback function that will be called with updates

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>callback</code> | that will be called with updates |

<a name="setCallback"></a>

## setCallback(updateRequest)
Sets ca llback function that will be called with updates

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| updateRequest | [<code>updateRequest</code>](#updateRequest) | an update request containing state update hash and updated values |

<a name="remove"></a>

## remove()
Removes the subscriber

**Kind**: global function  
<a name="pause"></a>

## pause()
Pauses updates for subscriber

**Kind**: global function  
<a name="resume"></a>

## resume()
Resumes updates for subscriber

**Kind**: global function  
<a name="updateRequest"></a>

## updateRequest : <code>Object</code>
updateRequest

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| state | <code>Object.&lt;string, any&gt;</code> | current state of store |
| updatedProps | <code>Object.&lt;string, any&gt;</code> | updates |
| updateHash | <code>string</code> | string of combined keys |

