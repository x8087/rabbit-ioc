declare namespace com {
    class JTApplication {
        static init(): void;
    }
}
declare namespace com {
    class JTLocalCache implements JTIPoolObject {
        private _dataMap;
        private _name;
        private static localCache;
        constructor(name: string);
        set name(value: string);
        setObject(key: string, data: any): void;
        getObject(key: string): any;
        hasKey(key: string): boolean;
        delete(key: string): void;
        private update;
        clean(): void;
        recycle(): void;
        get dataMap(): Object;
    }
}
declare namespace com {
    class JTLogger {
        private static LOG_INFO;
        private static LOG_ASSET;
        private static LOG_DEBUG;
        static info(...msgs: any[]): void;
        static debug(...msgs: any[]): void;
        static assert(flag: Boolean, ...msgs: any[]): void;
        private static print;
    }
}
declare namespace com {
    class JTSession {
        static socketChannel: JTIChannel;
    }
}
declare namespace com {
    class JTDataInfo implements JTIDataInfo {
        clone(): JTDataInfo;
        update(data: Object): JTDataInfo;
        recycle(): void;
    }
}
declare namespace com {
    class JTUserInfo extends JTDataInfo {
        name: string;
        age: number;
        weight: number;
        constructor();
    }
}
declare namespace com {
    class JTCommand implements JTIPoolObject {
        private _caller;
        private _method;
        private _args;
        private _once;
        recycle(): void;
        setTo(caller: any, method: Function, args?: any, once?: Boolean): JTCommand;
        run(): void;
        runWith(data: any): any;
        clear(): JTCommand;
        recover(): void;
        get caller(): any;
        get method(): Function;
        get once(): Boolean;
        static initialize(): void;
        private static _pool;
        static create(caller: any, method: Function, args?: any, once?: Boolean): JTCommand;
        static put(command: JTCommand): void;
    }
}
declare namespace com {
    class JTEventDispatcher implements JTIPoolObject {
        private _eventMap;
        constructor();
        recycle(): void;
        registerFunction(key: string, method: Function, caller: any, once?: boolean): void;
        execute(key: string, args?: any): void;
        removeFunction(key: string, method: Function, caller: any): void;
        removeFunctions(key: string): void;
        private delete;
        protected removeAll(): void;
    }
}
declare namespace com {
    class JTFunctionManager {
        private static _eventMap;
        static registerFunction(key: string, method: Function, caller: any, once?: boolean): void;
        static execute(key: string, args?: any): void;
        static removeFunction(key: string, method: Function, caller: any): void;
        static removeFunctions(key: string): void;
        private static delete;
    }
}
declare namespace com {
    interface JTIChannel {
        host: string;
        port: number;
        pipeline: JTIChannelPipeline;
        reload(): void;
        bind(channelPipeline: JTIChannelPipeline): void;
        flush(): void;
        send(data: any): void;
        connect(host: string, port: number): void;
    }
}
declare namespace com {
    interface JTIDataInfo extends JTIPoolObject {
        update(data: any): JTIDataInfo;
        clone(): JTIDataInfo;
    }
}
declare namespace com {
    interface JTIChannelPipeline {
        bind(channel: JTIChannel): JTIChannel;
        addAdapter(type: string, channelAdapter: JTChannelAdapter): JTChannelPipeline;
        getAdapter(type: string): JTChannelAdapter;
        luanch(host: string, port: number): void;
    }
}
declare namespace com {
    interface JTIEncoderAdapter {
        encode(data: any): any;
        writeComplete(data: any): void;
    }
}
declare namespace com {
    interface JTIDecoderAdapter {
        decode(data: any): any;
        readComplete(data: any): void;
    }
}
declare namespace com {
    interface JTIPool {
        get(): JTIPoolObject;
        put(item: JTIPoolObject): void;
        totalCount: number;
        size: number;
    }
}
declare namespace com {
    interface JTIPoolObject {
        recycle(): any;
    }
}
declare namespace com {
    class JTPopupManager {
    }
}
declare namespace com {
    class JTSingleManager {
        static instance: JTSingleManager;
        static initialize(): void;
    }
}
declare namespace com {
    class JTBuffer {
        static BIG_ENDIAN: string;
        static LITTLE_ENDIAN: string;
        private static _sysEndian;
        protected _xd_: boolean;
        private _allocated_;
        protected _d_: any;
        protected _u8d_: any;
        protected _pos_: number;
        protected _length: number;
        static getSystemEndian(): string;
        constructor(data?: any);
        get buffer(): ArrayBuffer;
        get endian(): string;
        set endian(value: string);
        set length(value: number);
        get length(): number;
        private _resizeBuffer;
        getString(): string;
        readString(): string;
        getFloat32Array(start: number, len: number): any;
        readFloat32Array(start: number, len: number): any;
        getUint8Array(start: number, len: number): Uint8Array;
        readUint8Array(start: number, len: number): Uint8Array;
        getInt16Array(start: number, len: number): any;
        readInt16Array(start: number, len: number): any;
        getFloat32(): number;
        readFloat32(): number;
        getFloat64(): number;
        readFloat64(): number;
        writeFloat32(value: number): void;
        writeFloat64(value: number): void;
        getInt32(): number;
        readInt32(): number;
        getUint32(): number;
        readUint32(): number;
        writeInt32(value: number): void;
        writeUint32(value: number): void;
        getInt16(): number;
        readInt16(): number;
        getUint16(): number;
        readUint16(): number;
        writeUint16(value: number): void;
        writeInt16(value: number): void;
        getUint8(): number;
        readUint8(): number;
        writeUint8(value: number): void;
        _getUInt8(pos: number): number;
        _readUInt8(pos: number): number;
        _getUint16(pos: number): number;
        _readUint16(pos: number): number;
        _getMatrix(): JTMatrix;
        _readMatrix(): JTMatrix;
        private _rUTF;
        getCustomString(len: number): string;
        readCustomString(len: number): string;
        get pos(): number;
        set pos(value: number);
        get bytesAvailable(): number;
        clear(): void;
        __getBuffer(): ArrayBuffer;
        writeUTFBytes(value: string): void;
        writeUTFString(value: string): void;
        writeUTFString32(value: string): void;
        readUTFString(): string;
        readUTFString32(): string;
        getUTFString(): string;
        readUTFBytes(len?: number): string;
        getUTFBytes(len?: number): string;
        writeByte(value: number): void;
        readByte(): number;
        getByte(): number;
        _ensureWrite(lengthToEnsure: number): void;
        writeArrayBuffer(arraybuffer: any, offset?: number, length?: number): void;
        readArrayBuffer(length: number): ArrayBuffer;
    }
}
declare namespace com {
    abstract class JTChannel extends JTEventDispatcher implements JTIChannel {
        protected _cls: any;
        protected _port: number;
        protected _host: string;
        protected _channel: any;
        protected _pipeline: JTIChannelPipeline;
        protected _encoder: JTIEncoderAdapter;
        protected _decoder: JTIDecoderAdapter;
        protected _idleState: JTChannelAdapter;
        constructor(cls: any);
        abstract flush(): void;
        abstract send(data: any): void;
        connect(host: string, port: number): void;
        reload(): void;
        bind(channelPipeline: JTIChannelPipeline): void;
        get pipeline(): JTIChannelPipeline;
        get host(): string;
        get port(): number;
    }
}
declare namespace com {
    abstract class JTChannelAdapter extends JTEventDispatcher {
        protected _channel: JTIChannel;
        static ENCODE: string;
        static DECODE: string;
        static IDLE: string;
        constructor();
        abstract channelActive(): void;
        get channel(): JTIChannel;
        bind(channel: JTIChannel): void;
    }
}
declare namespace com {
    class JTChannelPipeline extends JTEventDispatcher implements JTIChannelPipeline {
        private _channel;
        private _pipelineMap;
        constructor();
        bind(channel: JTIChannel): JTIChannel;
        addAdapter(type: string, channelAdapter: JTChannelAdapter): JTChannelPipeline;
        getAdapter(type: string): JTChannelAdapter;
        luanch(host: string, port: number): void;
    }
}
declare namespace com {
    class JTHttpChannel extends JTChannel {
        flush(): void;
        send(data: any): void;
    }
}
declare namespace com {
    class JTMatrix implements JTIPoolObject {
        static EMPTY: JTMatrix;
        static TEMP: JTMatrix;
        static _createFun: Function | null;
        a: number;
        b: number;
        c: number;
        d: number;
        tx: number;
        ty: number;
        _bTransform: boolean;
        constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number, nums?: number);
        identity(): JTMatrix;
        _checkTransform(): boolean;
        setTranslate(x: number, y: number): JTMatrix;
        translate(x: number, y: number): JTMatrix;
        scale(x: number, y: number): JTMatrix;
        rotate(angle: number): JTMatrix;
        skew(x: number, y: number): JTMatrix;
        invertTransformPoint(out: JTPoint): JTPoint;
        transformPoint(out: JTPoint): JTPoint;
        transformPointN(out: JTPoint): JTPoint;
        getScaleX(): number;
        getScaleY(): number;
        invert(): JTMatrix;
        setTo(a: number, b: number, c: number, d: number, tx: number, ty: number): JTMatrix;
        concat(matrix: JTMatrix): JTMatrix;
        static mul(m1: JTMatrix, m2: JTMatrix, out: JTMatrix): JTMatrix;
        static mul16(m1: JTMatrix, m2: JTMatrix, out: any[]): any[];
        scaleEx(x: number, y: number): void;
        rotateEx(angle: number): void;
        clone(): JTMatrix;
        copyTo(dec: JTMatrix): JTMatrix;
        toString(): string;
        destroy(): void;
        recycle(): void;
        static initialize(): void;
        private static _pool;
        static create(): JTMatrix;
        static put(point: JTMatrix): void;
    }
}
declare namespace com {
    class JTPoint implements JTIPoolObject {
        static TEMP: JTPoint;
        static EMPTY: JTPoint;
        x: number;
        y: number;
        constructor(x?: number, y?: number);
        recycle(): this;
        static initialize(): void;
        private static _pool;
        static create(): JTPoint;
        static put(point: JTPoint): void;
        setTo(x: number, y: number): JTPoint;
        distance(x: number, y: number): number;
        toString(): string;
        normalize(): void;
        copy(point: JTPoint): JTPoint;
    }
}
declare namespace com {
    class JTSendPackage implements JTIPoolObject {
        private _content;
        private _protocol;
        private _channel;
        writeProtocol(protocol: number): void;
        write(key: string, value: Object): void;
        get content(): Object;
        get protocol(): number;
        send(): void;
        setup(channel: JTIChannel): void;
        recycle(): void;
        static initialize(): void;
        private static _pool;
        static begin(): JTSendPackage;
        static put(sendPackage: JTSendPackage): void;
    }
}
declare namespace com {
    class JTWebSocket extends JTEventDispatcher {
        static LITTLE_ENDIAN: string;
        static BIG_ENDIAN: string;
        _endian: string;
        protected _socket: any;
        private _connected;
        private _addInputPosition;
        private _input;
        private _output;
        static OPEN: string;
        static MESSAGE: string;
        static CLOSE: string;
        static ERROR: string;
        disableInput: boolean;
        private _byteClass;
        protocols: any;
        get input(): any;
        get output(): any;
        get connected(): boolean;
        get endian(): string;
        set endian(value: string);
        constructor(host?: string | null, port?: number, byteClass?: new () => any, protocols?: any[] | null);
        connect(host: string, port: number): void;
        connectByUrl(url: string): void;
        clean(): void;
        close(): void;
        protected _onOpen(e: any): void;
        protected _onMessage(msg: any): void;
        protected _onClose(e: any): void;
        protected _onError(e: any): void;
        send(data: any): void;
        flush(): void;
    }
}
declare namespace com {
    class JTWebSocketChannel extends JTChannel {
        protected _connected: boolean;
        protected _buffers: any[];
        constructor(cls: any);
        flush(): void;
        send(data: any): void;
        connect(host: string, port: number): void;
        protected onConnectSucceed(e: any): void;
        protected onReceiveMessage(data: any): void;
        protected onCloseHandler(e: any): void;
        protected onErrorHandler(e: any): void;
    }
}
declare namespace com {
    abstract class JTAbstractDecoderAdapter extends JTChannelAdapter implements JTIDecoderAdapter {
        constructor();
        channelActive(): void;
        abstract decode(data: any): any;
        abstract readComplete(data: any): void;
    }
}
declare namespace com {
    class JTDecoderToByteAdapter extends JTAbstractDecoderAdapter {
        constructor();
        decode(data: any): any;
        readComplete(data: any): void;
    }
}
declare namespace com {
    class JTDecoderToJSONAdapter extends JTAbstractDecoderAdapter {
        constructor();
        decode(data: any): void;
        readComplete(data: any): void;
    }
}
declare namespace com {
    abstract class JTAbstractEncoderAdapter extends JTChannelAdapter {
        constructor();
        abstract encode(data: any): any;
        abstract writeComplete(data: any): void;
    }
}
declare namespace com {
    class JTEncodeToByteAdapter extends JTAbstractEncoderAdapter {
        constructor();
        channelActive(): void;
        encode(data: any): any;
        writeComplete(data: any): void;
    }
}
declare namespace com {
    class JTEncodeToJSONAdapter extends JTAbstractEncoderAdapter {
        constructor();
        channelActive(): void;
        encode(data: any): any;
        writeComplete(data: any): void;
    }
}
declare namespace com {
    abstract class JTAbstractIdleStateAdapter extends JTChannelAdapter {
        constructor();
    }
}
declare namespace com {
    class JTPool<T extends JTIPoolObject> implements JTIPool {
        private static _poolMap;
        protected _cls: any;
        protected _list: T[];
        protected _totalCount: number;
        protected _size: number;
        constructor(cls: any);
        get(): T;
        put(item: T): void;
        get totalCount(): number;
        get size(): number;
        static instance(cls: any): JTIPool;
    }
}
declare namespace com {
}
declare namespace com {
    class JTFixedPool<T extends JTIPoolObject> extends JTPool<T> {
        private _fixedCount;
        constructor(cls: any, fixedCount?: number);
        set fixedCount(value: number);
        protected create(): void;
        get(): T;
        get fullPool(): boolean;
    }
}
