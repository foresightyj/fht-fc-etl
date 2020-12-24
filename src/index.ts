import type { Stream } from "stream";
import { createAssertEquals } from "typescript-is";
import { SLS } from "aliyun-sdk";
import type { SLS as SLSType, ISlsOpts } from "aliyun-sdk-types";

const assertValidLogStoreEvent = createAssertEquals<LogStoreEvent>();
const assertValidCredential = createAssertEquals<FCEventContextCredential>();

function initializer(context: unknown, callback: NodeJsCallBack) {
    console.log("initializing");
    callback(null, "");
}

function handler(_evt: Stream, context: FCEventContext, callback: NodeJsCallBack) {
    console.log("hello world", new Date());
    const evt = JSON.parse(_evt.toString()) as LogStoreEvent;
    const event = assertValidLogStoreEvent(evt);
    const source = event.source;
    console.log("source", source);
    const creds = assertValidCredential(context.credentials);
    const sls = new SLS({
        accessKeyId: creds.accessKeyId,
        secretAccessKey: creds.accessKeySecret,
        endpoint: source.endpoint,
        apiVersion: "2015-06-01", //SDK版本号，固定值。
    } as ISlsOpts) as SLSType;

    sls.pullLogs(
        {
            logStoreName: source.logstoreName,
            projectName: source.projectName,
            type: "logs",
            shardID: source.shardId,
            cursor: "MTYwMjY5MzAyMzM4MDk0MzQxNg==" || source.beginCursor,
        },
        function () {
            console.log("arguments", arguments);
        },
    );

    callback(null);
}

module.exports.initializer = initializer;
module.exports.handler = handler;
