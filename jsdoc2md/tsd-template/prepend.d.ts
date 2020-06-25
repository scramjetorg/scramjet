import {Readable, Writable, Transform, PassThrough, WritableOptions} from "stream";

import {EventEmitter} from "events";

type AsyncGeneratorFunction<T=any> = (...args: any[]) => {[Symbol.asyncIterator]: {next(): Promise<{value: T, done: boolean}>}}
type AsyncFunction = (...args: any[]) => Promise<any>;

function pipelineOverride(...a: never[]): never;
namespace pipelineOverride {
    function __promisify__(...a: never[]): never;
}

class PromiseTransform extends Transform {
    static pipeline: typeof pipelineOverride | never;
}
