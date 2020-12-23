import type { Stream } from "stream";
import { createAssertEquals } from "typescript-is";

const assertValidLogStoreEvent = createAssertEquals<LogStoreEvent>();

function initializer(context: unknown, callback: NodeJsCallBack) {
    console.log("initializing");
    callback(null, "");
}

function handler(_evt: Stream, context: LogStoreEventContext, callback: NodeJsCallBack) {
    console.log("hello world", new Date());
    const evt = JSON.parse(_evt.toString()) as LogStoreEvent;
    const event = assertValidLogStoreEvent(evt);
    const source = event.source;
    console.log("source", source);
    callback(null);
}

module.exports.initializer = initializer;
module.exports.handler = handler;
