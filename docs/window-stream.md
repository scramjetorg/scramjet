![Scramjet Logo](https://signicode.com/scramjet-logo-light.svg)

<a name="module_scramjet.WindowStream"></a>

## :WindowStream : NumberStream
A stream for moving window calculation with some simple methods.

In essence it's a stream of Array's containing a list of items - a window.
It's best used when created by the `DataStream..window`` method.

**Kind**: static class  
**Extends**: [<code>NumberStream</code>](number-stream.md#module_scramjet.NumberStream)  

* [:WindowStream](#module_scramjet.WindowStream)  [<code>NumberStream</code>](number-stream.md#module_scramjet.NumberStream)
    * [windowStream.sum([valueOf])](#module_scramjet.WindowStream+sum) ↺ [<code>NumberStream</code>](number-stream.md#module_scramjet.NumberStream)
    * [windowStream.avg([valueOf])](#module_scramjet.WindowStream+avg) ↺ [<code>NumberStream</code>](number-stream.md#module_scramjet.NumberStream)

<a name="module_scramjet.WindowStream+sum"></a>

### windowStream.sum([valueOf]) : NumberStream ↺
Calculates moving sum of items, the output NumberStream will contain the moving sum.

**Kind**: instance method of [<code>WindowStream</code>](#module_scramjet.WindowStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| [valueOf] | [<code>ValueOfCallback</code>](definitions.md#module_scramjet..ValueOfCallback) | value of method for array items |

<a name="module_scramjet.WindowStream+avg"></a>

### windowStream.avg([valueOf]) : NumberStream ↺
Calculates the moving average of the window and returns the NumberStream

**Kind**: instance method of [<code>WindowStream</code>](#module_scramjet.WindowStream)  
**Chainable**  

| Param | Type | Description |
| --- | --- | --- |
| [valueOf] | [<code>ValueOfCallback</code>](definitions.md#module_scramjet..ValueOfCallback) | value of method for array items |

