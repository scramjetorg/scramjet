<a name="WindowStream"></a>

## WindowStream ⇐ <code>DataStream</code>
A stream for moving window calculation with some simple methods.

In essence it's a stream of Array's containing a list of items - a window.
It's best used when created by the `DataStream..window`` method.

**Kind**: global class  
**Extends**: <code>DataStream</code>  

* [WindowStream](#WindowStream) ⇐ <code>DataStream</code>
    * [.sum([valueOf])](#WindowStream+sum) ⇒ <code>Promise.&lt;Number&gt;</code>
    * [.avg([valueOf])](#WindowStream+avg) ⇒ <code>Promise.&lt;Number&gt;</code>

<a name="WindowStream+sum"></a>

### windowStream.sum([valueOf]) ⇒ <code>Promise.&lt;Number&gt;</code>
Calculates moving sum of items, the output stream will contain the moving sum.

**Kind**: instance method of [<code>WindowStream</code>](#WindowStream)  

| Param | Type | Description |
| --- | --- | --- |
| [valueOf] | <code>function</code> | value of method for array items |

<a name="WindowStream+avg"></a>

### windowStream.avg([valueOf]) ⇒ <code>Promise.&lt;Number&gt;</code>
Calculates the moving average of all items in the stream.

**Kind**: instance method of [<code>WindowStream</code>](#WindowStream)  

| Param | Type | Description |
| --- | --- | --- |
| [valueOf] | <code>function</code> | value of method for array items |

