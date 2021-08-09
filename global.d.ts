interface LogStoreEventParameter {}

interface LogStoreEventSource {
    endpoint: string;
    projectName: string;
    logstoreName: string;
    shardId: number;
    beginCursor: string;
    endCursor: string;
}

interface LogStoreEvent {
    parameter: LogStoreEventParameter;
    source: LogStoreEventSource;
    jobName: string;
    taskId: string;
    cursorTime: number;
}
interface FCEventContextCredential {
    accessKeyId: string;
    accessKeySecret: string;
    securityToken: string;
}

interface FCEventContext {
    requestId: string;
    credentials: FCEventContextCredential;
    function: {
        name: string;
        handler: string;
    };
    service: unknown;
    region: string;
    accountId: string;
    logger: unknown;
    retryCount: number;
    tracing: unknown;
}

type NodeJsCallBack = (err: NodeJS.ErrnoException | null, ...data: unknown[]) => void;
