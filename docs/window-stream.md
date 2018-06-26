![Scramjet Logo](https://signicode.com/scramjet-logo-light.svg)

<a name="WindowStream"></a>

## WindowStream : DataStream
A stream for moving window calculation with some simple methods.

In essence it's a stream of Array's containing a list of items - a window.
It's best used when created by the `DataStream..window`` method.

**Kind**: global class  
**Extends**: <code>DataStream</code>  

* [WindowStream](#WindowStream)  <code>DataStream</code>
    * [windowStream.sum([valueOf])](#WindowStream+sum) ↺ <code>Promise.&lt;Number&gt;</code>
    * [windowStream.avg([valueOf])](#WindowStream+avg) ↺ <code>Promise.&lt;Number&gt;</code>

<a name="WindowStream+sum"></a>

### windowStream.sum([valueOf]) : Promise.<Number> ↺
Calculates moving sum of items, the output stream will contain the moving sum.

**Kind**: instance method of [<code>WindowStream</code>](#WindowStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| [valueOf] | <code>function</code> | value of method for array items |

<a name="WindowStream+avg"></a>

### windowStream.avg([valueOf]) : Promise.<Number> ↺
Calculates the moving average of all items in the stream.

**Kind**: instance method of [<code>WindowStream</code>](#WindowStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| [valueOf] | <code>function</code> | value of method for array items |

