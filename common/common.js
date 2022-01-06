var com;
(function (com) {
    class JTApplication {
        static init() {
            com.JTCommand.initialize();
            com.JTSendPackage.initialize();
            com.JTSingleManager.initialize();
        }
    }
    com.JTApplication = JTApplication;
})(com || (com = {}));
var com;
(function (com) {
    class JTLocalCache {
        constructor(name) {
            this._dataMap = null;
            this._name = null;
            JTLocalCache.localCache = window.localStorage;
            this.name = name;
        }
        set name(value) {
            this._name = value;
            if (JTLocalCache.localCache[value]) {
                this._dataMap = JSON.parse(JTLocalCache.localCache[value]);
            }
            else {
                this._dataMap = {};
                this.update();
            }
        }
        setObject(key, data) {
            this._dataMap[key] = data;
            this.update();
        }
        getObject(key) {
            return this._dataMap[key];
        }
        hasKey(key) {
            return key in this._dataMap;
        }
        delete(key) {
            this._dataMap[key] = null;
            delete this._dataMap[key];
            this.update();
        }
        update() {
            JTLocalCache.localCache.setItem(this._name, JSON.stringify(this._dataMap));
        }
        clean() {
            this._dataMap = {};
            this.update();
        }
        recycle() {
            this.clean();
            this._name = null;
        }
        get dataMap() {
            return this._dataMap;
        }
    }
    JTLocalCache.localCache = null;
    com.JTLocalCache = JTLocalCache;
})(com || (com = {}));
var com;
(function (com) {
    class JTLogger {
        static info(...msgs) {
            let content = "";
            for (var i = 0; i < msgs.length; i++) {
                content += msgs[i];
            }
            this.print(this.LOG_INFO, content);
        }
        static debug(...msgs) {
            let content = "";
            for (var i = 0; i < msgs.length; i++) {
                content += JSON.stringify(msgs[i]);
            }
            this.print(this.LOG_DEBUG, content);
        }
        static assert(flag, ...msgs) {
            let content = "";
            for (var i = 0; i < msgs.length; i++) {
                content += msgs[i];
            }
            if (!flag)
                throw new Error(content);
        }
        static print(type, info) {
            var date = new Date();
            var hour = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            var time = hour + ":" + minutes + ":" + seconds + " >>>> ";
            console.log(type + time + info);
        }
    }
    JTLogger.LOG_INFO = "[INFO] :";
    JTLogger.LOG_ASSET = "[ASSET] :";
    JTLogger.LOG_DEBUG = "[DEBUG] :";
    com.JTLogger = JTLogger;
})(com || (com = {}));
var com;
(function (com) {
    class JTSession {
    }
    JTSession.socketChannel = null;
    com.JTSession = JTSession;
})(com || (com = {}));
var com;
(function (com) {
    class JTDataInfo {
        clone() {
            var dataInfo = new JTDataInfo();
            dataInfo.update(this);
            return this;
        }
        update(data) {
            var keys = Object.keys(data);
            var obj = this;
            var l = keys.length;
            for (var i = 0; i < l; i++) {
                var key = keys[i];
                if (obj.hasOwnProperty(key)) {
                    this[key] = data[key];
                }
            }
            return this;
        }
        recycle() { }
        ;
    }
    com.JTDataInfo = JTDataInfo;
})(com || (com = {}));
var com;
(function (com) {
    class JTUserInfo extends com.JTDataInfo {
        constructor() {
            super();
            this.name = null;
            this.age = 0;
            this.weight = 0;
        }
    }
    com.JTUserInfo = JTUserInfo;
})(com || (com = {}));
var com;
(function (com) {
    class JTCommand {
        constructor() {
            this._caller = null;
            this._method = null;
            this._args = null;
            this._once = false;
        }
        recycle() {
            this._caller = this._method = this._args = null;
        }
        setTo(caller, method, args, once = false) {
            this._caller = caller;
            this._method = method;
            this._args = args;
            this._once = once;
            return this;
        }
        run() {
            if (this._method == null)
                return null;
            var result = this._method.apply(this._caller, this._args);
            this._once && this.recover();
            return result;
        }
        runWith(data) {
            if (this._method == null)
                return null;
            if (data == null)
                var result = this._method.apply(this._caller, this._args);
            else if (!this._args && !data.unshift)
                result = this._method.call(this._caller, data);
            else if (this._args)
                result = this._method.apply(this._caller, this._args.concat(data));
            else
                result = this._method.apply(this._caller, data);
            this._once && this.recover();
            return result;
        }
        clear() {
            this._method = this._args = this._caller = null;
            return this;
        }
        recover() {
            this.clear();
        }
        get caller() {
            return this._caller;
        }
        get method() {
            return this._method;
        }
        get once() {
            return this._once;
        }
        static initialize() {
            if (!this._pool) {
                this._pool = this._pool = com.JTPool.instance(JTCommand);
            }
        }
        static create(caller, method, args, once = false) {
            var command = this._pool.get();
            command.setTo(caller, method, args, once);
            return command;
        }
        static put(command) {
            this._pool.put(command);
        }
    }
    JTCommand._pool = null;
    com.JTCommand = JTCommand;
})(com || (com = {}));
var com;
(function (com) {
    class JTEventDispatcher {
        constructor() {
            this._eventMap = new Map();
            this._eventMap = new Map();
        }
        recycle() {
            this.removeAll();
        }
        registerFunction(key, method, caller, once) {
            var list = this._eventMap.get(key);
            if (list) {
                list.forEach(element => {
                    if (element && element.method == method && element.caller == caller) {
                        com.JTLogger.info("[JTFunctionManager.registerFunction] The key" + key + " function already registered ");
                        return;
                    }
                });
            }
            else {
                list = [];
                this._eventMap.set(key, list);
            }
            var command = com.JTCommand.create(caller, method, null, once);
            list.push(command);
        }
        execute(key, args) {
            var list = this._eventMap.get(key);
            if (list) {
                list.forEach(command => {
                    command && command.runWith(args);
                    if (command.once) {
                        this.delete(list, command);
                    }
                });
            }
            else {
                com.JTLogger.info("[JTFunctionManager.execute] Cant find the function by key : " + key);
            }
        }
        removeFunction(key, method, caller) {
            var list = this._eventMap.get(key);
            if (list) {
                list.forEach(element => {
                    if (element && element.method == method && element.caller == caller) {
                        this.delete(list, element);
                    }
                });
            }
        }
        removeFunctions(key) {
            var list = this._eventMap.get(key);
            if (list) {
                list.forEach(element => {
                    if (element) {
                        this.delete(list, element);
                    }
                });
                this._eventMap.delete(key);
            }
        }
        delete(list, command) {
            var index = list.indexOf(command);
            var removes = list.splice(index, 1);
            removes.shift();
            com.JTCommand.put(command);
        }
        removeAll() {
            this._eventMap.forEach((value, key) => {
                this.removeFunctions(key);
                value.length = 0;
            });
            this._eventMap.clear();
        }
    }
    com.JTEventDispatcher = JTEventDispatcher;
})(com || (com = {}));
var com;
(function (com) {
    class JTFunctionManager {
        static registerFunction(key, method, caller, once) {
            var list = this._eventMap.get(key);
            if (list) {
                list.forEach(element => {
                    if (element && element.method == method && element.caller == caller) {
                        com.JTLogger.info("[JTFunctionManager.registerFunction] The key" + key + " function already registered ");
                        return;
                    }
                });
            }
            else {
                list = [];
                this._eventMap.set(key, list);
            }
            var command = com.JTCommand.create(caller, method, null, once);
            list.push(command);
        }
        static execute(key, args) {
            var list = this._eventMap.get(key);
            if (list) {
                list.forEach(command => {
                    command && command.runWith(args);
                    if (command.once) {
                        this.delete(list, command);
                    }
                });
            }
            else {
                com.JTLogger.info("[JTFunctionManager.execute] Cant find the function by key : " + key);
            }
        }
        static removeFunction(key, method, caller) {
            var list = this._eventMap.get(key);
            if (list) {
                list.forEach(element => {
                    if (element && element.method == method && element.caller == caller) {
                        this.delete(list, element);
                    }
                });
            }
        }
        static removeFunctions(key) {
            var list = this._eventMap.get(key);
            if (list) {
                list.forEach(element => {
                    if (element) {
                        this.delete(list, element);
                    }
                });
                this._eventMap.delete(key);
            }
        }
        static delete(list, command) {
            var index = list.indexOf(command);
            var removes = list.splice(index, 1);
            removes.shift();
            com.JTCommand.put(command);
        }
    }
    JTFunctionManager._eventMap = new Map();
    com.JTFunctionManager = JTFunctionManager;
})(com || (com = {}));
var com;
(function (com) {
    class JTPopupManager {
    }
    com.JTPopupManager = JTPopupManager;
})(com || (com = {}));
var com;
(function (com) {
    class JTSingleManager {
        static initialize() {
            if (!this.instance) {
                this.instance = new JTSingleManager();
            }
        }
    }
    JTSingleManager.instance = null;
    com.JTSingleManager = JTSingleManager;
})(com || (com = {}));
var com;
(function (com) {
    class JTBuffer {
        constructor(data = null) {
            this._xd_ = true;
            this._allocated_ = 8;
            this._pos_ = 0;
            this._length = 0;
            if (data) {
                this._u8d_ = new Uint8Array(data);
                this._d_ = new DataView(this._u8d_.buffer);
                this._length = this._d_.byteLength;
            }
            else {
                this._resizeBuffer(this._allocated_);
            }
        }
        static getSystemEndian() {
            if (!JTBuffer._sysEndian) {
                var buffer = new ArrayBuffer(2);
                new DataView(buffer).setInt16(0, 256, true);
                JTBuffer._sysEndian = (new Int16Array(buffer))[0] === 256 ? JTBuffer.LITTLE_ENDIAN : JTBuffer.BIG_ENDIAN;
            }
            return JTBuffer._sysEndian;
        }
        get buffer() {
            var rstBuffer = this._d_.buffer;
            if (rstBuffer.byteLength === this._length)
                return rstBuffer;
            return rstBuffer.slice(0, this._length);
        }
        get endian() {
            return this._xd_ ? JTBuffer.LITTLE_ENDIAN : JTBuffer.BIG_ENDIAN;
        }
        set endian(value) {
            this._xd_ = (value === JTBuffer.LITTLE_ENDIAN);
        }
        set length(value) {
            if (this._allocated_ < value)
                this._resizeBuffer(this._allocated_ = Math.floor(Math.max(value, this._allocated_ * 2)));
            else if (this._allocated_ > value)
                this._resizeBuffer(this._allocated_ = value);
            this._length = value;
        }
        get length() {
            return this._length;
        }
        _resizeBuffer(len) {
            try {
                var newByteView = new Uint8Array(len);
                if (this._u8d_ != null) {
                    if (this._u8d_.length <= len)
                        newByteView.set(this._u8d_);
                    else
                        newByteView.set(this._u8d_.subarray(0, len));
                }
                this._u8d_ = newByteView;
                this._d_ = new DataView(newByteView.buffer);
            }
            catch (err) {
                throw "Invalid typed array length:" + len;
            }
        }
        getString() {
            return this.readString();
        }
        readString() {
            return this._rUTF(this.getUint16());
        }
        getFloat32Array(start, len) {
            return this.readFloat32Array(start, len);
        }
        readFloat32Array(start, len) {
            var end = start + len;
            end = (end > this._length) ? this._length : end;
            var v = new Float32Array(this._d_.buffer.slice(start, end));
            this._pos_ = end;
            return v;
        }
        getUint8Array(start, len) {
            return this.readUint8Array(start, len);
        }
        readUint8Array(start, len) {
            var end = start + len;
            end = (end > this._length) ? this._length : end;
            var v = new Uint8Array(this._d_.buffer.slice(start, end));
            this._pos_ = end;
            return v;
        }
        getInt16Array(start, len) {
            return this.readInt16Array(start, len);
        }
        readInt16Array(start, len) {
            var end = start + len;
            end = (end > this._length) ? this._length : end;
            var v = new Int16Array(this._d_.buffer.slice(start, end));
            this._pos_ = end;
            return v;
        }
        getFloat32() {
            return this.readFloat32();
        }
        readFloat32() {
            if (this._pos_ + 4 > this._length)
                throw "getFloat32 error - Out of bounds";
            var v = this._d_.getFloat32(this._pos_, this._xd_);
            this._pos_ += 4;
            return v;
        }
        getFloat64() {
            return this.readFloat64();
        }
        readFloat64() {
            if (this._pos_ + 8 > this._length)
                throw "getFloat64 error - Out of bounds";
            var v = this._d_.getFloat64(this._pos_, this._xd_);
            this._pos_ += 8;
            return v;
        }
        writeFloat32(value) {
            this._ensureWrite(this._pos_ + 4);
            this._d_.setFloat32(this._pos_, value, this._xd_);
            this._pos_ += 4;
        }
        writeFloat64(value) {
            this._ensureWrite(this._pos_ + 8);
            this._d_.setFloat64(this._pos_, value, this._xd_);
            this._pos_ += 8;
        }
        getInt32() {
            return this.readInt32();
        }
        readInt32() {
            if (this._pos_ + 4 > this._length)
                throw "getInt32 error - Out of bounds";
            var float = this._d_.getInt32(this._pos_, this._xd_);
            this._pos_ += 4;
            return float;
        }
        getUint32() {
            return this.readUint32();
        }
        readUint32() {
            if (this._pos_ + 4 > this._length)
                throw "getUint32 error - Out of bounds";
            var v = this._d_.getUint32(this._pos_, this._xd_);
            this._pos_ += 4;
            return v;
        }
        writeInt32(value) {
            this._ensureWrite(this._pos_ + 4);
            this._d_.setInt32(this._pos_, value, this._xd_);
            this._pos_ += 4;
        }
        writeUint32(value) {
            this._ensureWrite(this._pos_ + 4);
            this._d_.setUint32(this._pos_, value, this._xd_);
            this._pos_ += 4;
        }
        getInt16() {
            return this.readInt16();
        }
        readInt16() {
            if (this._pos_ + 2 > this._length)
                throw "getInt16 error - Out of bounds";
            var us = this._d_.getInt16(this._pos_, this._xd_);
            this._pos_ += 2;
            return us;
        }
        getUint16() {
            return this.readUint16();
        }
        readUint16() {
            if (this._pos_ + 2 > this._length)
                throw "getUint16 error - Out of bounds";
            var us = this._d_.getUint16(this._pos_, this._xd_);
            this._pos_ += 2;
            return us;
        }
        writeUint16(value) {
            this._ensureWrite(this._pos_ + 2);
            this._d_.setUint16(this._pos_, value, this._xd_);
            this._pos_ += 2;
        }
        writeInt16(value) {
            this._ensureWrite(this._pos_ + 2);
            this._d_.setInt16(this._pos_, value, this._xd_);
            this._pos_ += 2;
        }
        getUint8() {
            return this.readUint8();
        }
        readUint8() {
            if (this._pos_ + 1 > this._length)
                throw "getUint8 error - Out of bounds";
            return this._u8d_[this._pos_++];
        }
        writeUint8(value) {
            this._ensureWrite(this._pos_ + 1);
            this._d_.setUint8(this._pos_, value);
            this._pos_++;
        }
        _getUInt8(pos) {
            return this._readUInt8(pos);
        }
        _readUInt8(pos) {
            return this._d_.getUint8(pos);
        }
        _getUint16(pos) {
            return this._readUint16(pos);
        }
        _readUint16(pos) {
            return this._d_.getUint16(pos, this._xd_);
        }
        _getMatrix() {
            return this._readMatrix();
        }
        _readMatrix() {
            var rst = new com.JTMatrix(this.getFloat32(), this.getFloat32(), this.getFloat32(), this.getFloat32(), this.getFloat32(), this.getFloat32());
            return rst;
        }
        _rUTF(len) {
            var v = "", max = this._pos_ + len, c, c2, c3, f = String.fromCharCode;
            var u = this._u8d_, i = 0;
            var strs = [];
            var n = 0;
            strs.length = 1000;
            while (this._pos_ < max) {
                c = u[this._pos_++];
                if (c < 0x80) {
                    if (c != 0)
                        strs[n++] = f(c);
                }
                else if (c < 0xE0) {
                    strs[n++] = f(((c & 0x3F) << 6) | (u[this._pos_++] & 0x7F));
                }
                else if (c < 0xF0) {
                    c2 = u[this._pos_++];
                    strs[n++] = f(((c & 0x1F) << 12) | ((c2 & 0x7F) << 6) | (u[this._pos_++] & 0x7F));
                }
                else {
                    c2 = u[this._pos_++];
                    c3 = u[this._pos_++];
                    const _code = ((c & 0x0F) << 18) | ((c2 & 0x7F) << 12) | ((c3 & 0x7F) << 6) | (u[this._pos_++] & 0x7F);
                    if (_code >= 0x10000) {
                        const _offset = _code - 0x10000;
                        const _lead = 0xd800 | (_offset >> 10);
                        const _trail = 0xdc00 | (_offset & 0x3ff);
                        strs[n++] = f(_lead);
                        strs[n++] = f(_trail);
                    }
                    else {
                        strs[n++] = f(_code);
                    }
                }
                i++;
            }
            strs.length = n;
            return strs.join('');
        }
        getCustomString(len) {
            return this.readCustomString(len);
        }
        readCustomString(len) {
            var v = "", ulen = 0, c, c2, f = String.fromCharCode;
            var u = this._u8d_, i = 0;
            while (len > 0) {
                c = u[this._pos_];
                if (c < 0x80) {
                    v += f(c);
                    this._pos_++;
                    len--;
                }
                else {
                    ulen = c - 0x80;
                    this._pos_++;
                    len -= ulen;
                    while (ulen > 0) {
                        c = u[this._pos_++];
                        c2 = u[this._pos_++];
                        v += f((c2 << 8) | c);
                        ulen--;
                    }
                }
            }
            return v;
        }
        get pos() {
            return this._pos_;
        }
        set pos(value) {
            this._pos_ = value;
        }
        get bytesAvailable() {
            return this._length - this._pos_;
        }
        clear() {
            this._pos_ = 0;
            this.length = 0;
        }
        __getBuffer() {
            return this._d_.buffer;
        }
        writeUTFBytes(value) {
            value = value + "";
            for (var i = 0, sz = value.length; i < sz; i++) {
                var c = value.charCodeAt(i);
                if (c <= 0x7F) {
                    this.writeByte(c);
                }
                else if (c <= 0x7FF) {
                    this._ensureWrite(this._pos_ + 2);
                    this._u8d_.set([0xC0 | (c >> 6), 0x80 | (c & 0x3F)], this._pos_);
                    this._pos_ += 2;
                }
                else if (c >= 0xD800 && c <= 0xDBFF) {
                    i++;
                    const c2 = value.charCodeAt(i);
                    if (!Number.isNaN(c2) && c2 >= 0xDC00 && c2 <= 0xDFFF) {
                        const _p1 = (c & 0x3FF) + 0x40;
                        const _p2 = c2 & 0x3FF;
                        const _b1 = 0xF0 | ((_p1 >> 8) & 0x3F);
                        const _b2 = 0x80 | ((_p1 >> 2) & 0x3F);
                        const _b3 = 0x80 | ((_p1 & 0x3) << 4) | ((_p2 >> 6) & 0xF);
                        const _b4 = 0x80 | (_p2 & 0x3F);
                        this._ensureWrite(this._pos_ + 4);
                        this._u8d_.set([_b1, _b2, _b3, _b4], this._pos_);
                        this._pos_ += 4;
                    }
                }
                else if (c <= 0xFFFF) {
                    this._ensureWrite(this._pos_ + 3);
                    this._u8d_.set([0xE0 | (c >> 12), 0x80 | ((c >> 6) & 0x3F), 0x80 | (c & 0x3F)], this._pos_);
                    this._pos_ += 3;
                }
                else {
                    this._ensureWrite(this._pos_ + 4);
                    this._u8d_.set([0xF0 | (c >> 18), 0x80 | ((c >> 12) & 0x3F), 0x80 | ((c >> 6) & 0x3F), 0x80 | (c & 0x3F)], this._pos_);
                    this._pos_ += 4;
                }
            }
        }
        writeUTFString(value) {
            var tPos = this.pos;
            this.writeUint16(1);
            this.writeUTFBytes(value);
            var dPos = this.pos - tPos - 2;
            this._d_.setUint16(tPos, dPos, this._xd_);
        }
        writeUTFString32(value) {
            var tPos = this.pos;
            this.writeUint32(1);
            this.writeUTFBytes(value);
            var dPos = this.pos - tPos - 4;
            this._d_.setUint32(tPos, dPos, this._xd_);
        }
        readUTFString() {
            return this.readUTFBytes(this.getUint16());
        }
        readUTFString32() {
            return this.readUTFBytes(this.getUint32());
        }
        getUTFString() {
            return this.readUTFString();
        }
        readUTFBytes(len = -1) {
            if (len === 0)
                return "";
            var lastBytes = this.bytesAvailable;
            if (len > lastBytes)
                throw "readUTFBytes error - Out of bounds";
            len = len > 0 ? len : lastBytes;
            return this._rUTF(len);
        }
        getUTFBytes(len = -1) {
            return this.readUTFBytes(len);
        }
        writeByte(value) {
            this._ensureWrite(this._pos_ + 1);
            this._d_.setInt8(this._pos_, value);
            this._pos_ += 1;
        }
        readByte() {
            if (this._pos_ + 1 > this._length)
                throw "readByte error - Out of bounds";
            return this._d_.getInt8(this._pos_++);
        }
        getByte() {
            return this.readByte();
        }
        _ensureWrite(lengthToEnsure) {
            if (this._length < lengthToEnsure)
                this._length = lengthToEnsure;
            if (this._allocated_ < lengthToEnsure)
                this.length = lengthToEnsure;
        }
        writeArrayBuffer(arraybuffer, offset = 0, length = 0) {
            if (offset < 0 || length < 0)
                throw "writeArrayBuffer error - Out of bounds";
            if (length == 0)
                length = arraybuffer.byteLength - offset;
            this._ensureWrite(this._pos_ + length);
            var uint8array = new Uint8Array(arraybuffer);
            this._u8d_.set(uint8array.subarray(offset, offset + length), this._pos_);
            this._pos_ += length;
        }
        readArrayBuffer(length) {
            var rst;
            rst = this._u8d_.buffer.slice(this._pos_, this._pos_ + length);
            this._pos_ = this._pos_ + length;
            return rst;
        }
    }
    JTBuffer.BIG_ENDIAN = "bigEndian";
    JTBuffer.LITTLE_ENDIAN = "littleEndian";
    JTBuffer._sysEndian = null;
    com.JTBuffer = JTBuffer;
})(com || (com = {}));
var com;
(function (com) {
    class JTChannel extends com.JTEventDispatcher {
        constructor(cls) {
            super();
            this._cls = null;
            this._port = 0;
            this._host = null;
            this._channel = null;
            this._pipeline = null;
            this._encoder = null;
            this._decoder = null;
            this._idleState = null;
            this._cls = cls;
        }
        connect(host, port) {
            this._host = host;
            this._port = port;
        }
        reload() {
            this._encoder = this._pipeline.getAdapter(com.JTChannelAdapter.ENCODE);
            this._decoder = this._pipeline.getAdapter(com.JTChannelAdapter.DECODE);
            this._idleState = this._pipeline.getAdapter(com.JTChannelAdapter.IDLE);
        }
        bind(channelPipeline) {
            this._pipeline = channelPipeline;
        }
        get pipeline() {
            return this._pipeline;
        }
        get host() {
            return this._host;
        }
        get port() {
            return this._port;
        }
    }
    com.JTChannel = JTChannel;
})(com || (com = {}));
var com;
(function (com) {
    class JTChannelAdapter extends com.JTEventDispatcher {
        constructor() {
            super();
            this._channel = null;
        }
        get channel() {
            return this._channel;
        }
        bind(channel) {
            this._channel = channel;
        }
    }
    JTChannelAdapter.ENCODE = "encode";
    JTChannelAdapter.DECODE = "decode";
    JTChannelAdapter.IDLE = "idle";
    com.JTChannelAdapter = JTChannelAdapter;
})(com || (com = {}));
var com;
(function (com) {
    class JTChannelPipeline extends com.JTEventDispatcher {
        constructor() {
            super();
            this._channel = null;
            this._pipelineMap = null;
            this._pipelineMap = new Map();
        }
        bind(channel) {
            this._channel = channel;
            this._channel.bind(this);
            return this._channel;
        }
        addAdapter(type, channelAdapter) {
            channelAdapter.bind(this._channel);
            channelAdapter.channelActive();
            this._pipelineMap.set(type, channelAdapter);
            return this;
        }
        getAdapter(type) {
            return this._pipelineMap.get(type);
        }
        luanch(host, port) {
            this._channel.reload();
            this._channel.connect(host, port);
        }
    }
    com.JTChannelPipeline = JTChannelPipeline;
})(com || (com = {}));
var com;
(function (com) {
    class JTHttpChannel extends com.JTChannel {
        flush() {
            throw new Error("Method not implemented.");
        }
        send(data) {
            throw new Error("Method not implemented.");
        }
    }
    com.JTHttpChannel = JTHttpChannel;
})(com || (com = {}));
var com;
(function (com) {
    class JTMatrix {
        constructor(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0, nums = 0) {
            this._bTransform = false;
            if (JTMatrix._createFun != null) {
                return JTMatrix._createFun(a, b, c, d, tx, ty, nums);
            }
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
            this._checkTransform();
        }
        identity() {
            this.a = this.d = 1;
            this.b = this.tx = this.ty = this.c = 0;
            this._bTransform = false;
            return this;
        }
        _checkTransform() {
            return this._bTransform = (this.a !== 1 || this.b !== 0 || this.c !== 0 || this.d !== 1);
        }
        setTranslate(x, y) {
            this.tx = x;
            this.ty = y;
            return this;
        }
        translate(x, y) {
            this.tx += x;
            this.ty += y;
            return this;
        }
        scale(x, y) {
            this.a *= x;
            this.d *= y;
            this.c *= x;
            this.b *= y;
            this.tx *= x;
            this.ty *= y;
            this._bTransform = true;
            return this;
        }
        rotate(angle) {
            var cos = Math.cos(angle);
            var sin = Math.sin(angle);
            var a1 = this.a;
            var c1 = this.c;
            var tx1 = this.tx;
            this.a = a1 * cos - this.b * sin;
            this.b = a1 * sin + this.b * cos;
            this.c = c1 * cos - this.d * sin;
            this.d = c1 * sin + this.d * cos;
            this.tx = tx1 * cos - this.ty * sin;
            this.ty = tx1 * sin + this.ty * cos;
            this._bTransform = true;
            return this;
        }
        skew(x, y) {
            var tanX = Math.tan(x);
            var tanY = Math.tan(y);
            var a1 = this.a;
            var b1 = this.b;
            this.a += tanY * this.c;
            this.b += tanY * this.d;
            this.c += tanX * a1;
            this.d += tanX * b1;
            return this;
        }
        invertTransformPoint(out) {
            var a1 = this.a;
            var b1 = this.b;
            var c1 = this.c;
            var d1 = this.d;
            var tx1 = this.tx;
            var n = a1 * d1 - b1 * c1;
            var a2 = d1 / n;
            var b2 = -b1 / n;
            var c2 = -c1 / n;
            var d2 = a1 / n;
            var tx2 = (c1 * this.ty - d1 * tx1) / n;
            var ty2 = -(a1 * this.ty - b1 * tx1) / n;
            return out.setTo(a2 * out.x + c2 * out.y + tx2, b2 * out.x + d2 * out.y + ty2);
        }
        transformPoint(out) {
            return out.setTo(this.a * out.x + this.c * out.y + this.tx, this.b * out.x + this.d * out.y + this.ty);
        }
        transformPointN(out) {
            return out.setTo(this.a * out.x + this.c * out.y, this.b * out.x + this.d * out.y);
        }
        getScaleX() {
            return this.b === 0 ? this.a : Math.sqrt(this.a * this.a + this.b * this.b);
        }
        getScaleY() {
            return this.c === 0 ? this.d : Math.sqrt(this.c * this.c + this.d * this.d);
        }
        invert() {
            var a1 = this.a;
            var b1 = this.b;
            var c1 = this.c;
            var d1 = this.d;
            var tx1 = this.tx;
            var n = a1 * d1 - b1 * c1;
            this.a = d1 / n;
            this.b = -b1 / n;
            this.c = -c1 / n;
            this.d = a1 / n;
            this.tx = (c1 * this.ty - d1 * tx1) / n;
            this.ty = -(a1 * this.ty - b1 * tx1) / n;
            return this;
        }
        setTo(a, b, c, d, tx, ty) {
            this.a = a, this.b = b, this.c = c, this.d = d, this.tx = tx, this.ty = ty;
            return this;
        }
        concat(matrix) {
            var a = this.a;
            var c = this.c;
            var tx = this.tx;
            this.a = a * matrix.a + this.b * matrix.c;
            this.b = a * matrix.b + this.b * matrix.d;
            this.c = c * matrix.a + this.d * matrix.c;
            this.d = c * matrix.b + this.d * matrix.d;
            this.tx = tx * matrix.a + this.ty * matrix.c + matrix.tx;
            this.ty = tx * matrix.b + this.ty * matrix.d + matrix.ty;
            return this;
        }
        static mul(m1, m2, out) {
            var aa = m1.a, ab = m1.b, ac = m1.c, ad = m1.d, atx = m1.tx, aty = m1.ty;
            var ba = m2.a, bb = m2.b, bc = m2.c, bd = m2.d, btx = m2.tx, bty = m2.ty;
            if (bb !== 0 || bc !== 0) {
                out.a = aa * ba + ab * bc;
                out.b = aa * bb + ab * bd;
                out.c = ac * ba + ad * bc;
                out.d = ac * bb + ad * bd;
                out.tx = ba * atx + bc * aty + btx;
                out.ty = bb * atx + bd * aty + bty;
            }
            else {
                out.a = aa * ba;
                out.b = ab * bd;
                out.c = ac * ba;
                out.d = ad * bd;
                out.tx = ba * atx + btx;
                out.ty = bd * aty + bty;
            }
            return out;
        }
        static mul16(m1, m2, out) {
            var aa = m1.a, ab = m1.b, ac = m1.c, ad = m1.d, atx = m1.tx, aty = m1.ty;
            var ba = m2.a, bb = m2.b, bc = m2.c, bd = m2.d, btx = m2.tx, bty = m2.ty;
            if (bb !== 0 || bc !== 0) {
                out[0] = aa * ba + ab * bc;
                out[1] = aa * bb + ab * bd;
                out[4] = ac * ba + ad * bc;
                out[5] = ac * bb + ad * bd;
                out[12] = ba * atx + bc * aty + btx;
                out[13] = bb * atx + bd * aty + bty;
            }
            else {
                out[0] = aa * ba;
                out[1] = ab * bd;
                out[4] = ac * ba;
                out[5] = ad * bd;
                out[12] = ba * atx + btx;
                out[13] = bd * aty + bty;
            }
            return out;
        }
        scaleEx(x, y) {
            var ba = this.a, bb = this.b, bc = this.c, bd = this.d;
            if (bb !== 0 || bc !== 0) {
                this.a = x * ba;
                this.b = x * bb;
                this.c = y * bc;
                this.d = y * bd;
            }
            else {
                this.a = x * ba;
                this.b = 0 * bd;
                this.c = 0 * ba;
                this.d = y * bd;
            }
            this._bTransform = true;
        }
        rotateEx(angle) {
            var cos = Math.cos(angle);
            var sin = Math.sin(angle);
            var ba = this.a, bb = this.b, bc = this.c, bd = this.d;
            if (bb !== 0 || bc !== 0) {
                this.a = cos * ba + sin * bc;
                this.b = cos * bb + sin * bd;
                this.c = -sin * ba + cos * bc;
                this.d = -sin * bb + cos * bd;
            }
            else {
                this.a = cos * ba;
                this.b = sin * bd;
                this.c = -sin * ba;
                this.d = cos * bd;
            }
            this._bTransform = true;
        }
        clone() {
            var dec = JTMatrix.create();
            dec.a = this.a;
            dec.b = this.b;
            dec.c = this.c;
            dec.d = this.d;
            dec.tx = this.tx;
            dec.ty = this.ty;
            dec._bTransform = this._bTransform;
            return dec;
        }
        copyTo(dec) {
            dec.a = this.a;
            dec.b = this.b;
            dec.c = this.c;
            dec.d = this.d;
            dec.tx = this.tx;
            dec.ty = this.ty;
            dec._bTransform = this._bTransform;
            return dec;
        }
        toString() {
            return this.a + "," + this.b + "," + this.c + "," + this.d + "," + this.tx + "," + this.ty;
        }
        destroy() {
            this.recycle();
        }
        recycle() {
            this.identity();
        }
        static initialize() {
            if (!this._pool)
                this._pool = this._pool = com.JTPool.instance(JTMatrix);
        }
        static create() {
            return this._pool.get();
        }
        static put(point) {
            this._pool.put(point);
        }
    }
    JTMatrix.EMPTY = new JTMatrix();
    JTMatrix.TEMP = new JTMatrix();
    JTMatrix._createFun = null;
    JTMatrix._pool = null;
    com.JTMatrix = JTMatrix;
})(com || (com = {}));
var com;
(function (com) {
    class JTPoint {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }
        recycle() {
            this.x = this.y = 0;
            return this;
        }
        static initialize() {
            if (!this._pool)
                this._pool = this._pool = com.JTPool.instance(JTPoint);
        }
        static create() {
            return this._pool.get();
        }
        static put(point) {
            this._pool.put(point);
        }
        setTo(x, y) {
            this.x = x;
            this.y = y;
            return this;
        }
        distance(x, y) {
            return Math.sqrt((this.x - x) * (this.x - x) + (this.y - y) * (this.y - y));
        }
        toString() {
            return this.x + "," + this.y;
        }
        normalize() {
            var d = Math.sqrt(this.x * this.x + this.y * this.y);
            if (d > 0) {
                var id = 1.0 / d;
                this.x *= id;
                this.y *= id;
            }
        }
        copy(point) {
            return this.setTo(point.x, point.y);
        }
    }
    JTPoint.TEMP = new JTPoint();
    JTPoint.EMPTY = new JTPoint();
    JTPoint._pool = null;
    com.JTPoint = JTPoint;
})(com || (com = {}));
var com;
(function (com) {
    class JTSendPackage {
        constructor() {
            this._content = {};
            this._protocol = 0;
            this._channel = null;
        }
        writeProtocol(protocol) {
            this._protocol = protocol;
        }
        write(key, value) {
            this._content[key] = value;
        }
        get content() {
            return this._content;
        }
        get protocol() {
            return this._protocol;
        }
        send() {
            this._channel && this._channel.send(this._content);
            JTSendPackage.put(this);
        }
        setup(channel) {
            this._channel = channel;
        }
        recycle() {
            this._content = {};
            this._channel = null;
            this._protocol = 0;
        }
        static initialize() {
            if (!this._pool)
                this._pool = this._pool = com.JTPool.instance(JTSendPackage);
        }
        static begin() {
            var sendPackage = this._pool.get();
            sendPackage.setup(com.JTSession.socketChannel);
            return sendPackage;
        }
        static put(sendPackage) {
            this._pool.put(sendPackage);
        }
    }
    JTSendPackage._pool = null;
    com.JTSendPackage = JTSendPackage;
})(com || (com = {}));
var com;
(function (com) {
    class JTWebSocket extends com.JTEventDispatcher {
        constructor(host = null, port = 0, byteClass = null, protocols = null) {
            super();
            this.disableInput = false;
            this.protocols = [];
            this._byteClass = byteClass ? byteClass : com.JTBuffer;
            this.protocols = protocols;
            this.endian = JTWebSocket.BIG_ENDIAN;
            if (host && port > 0 && port < 65535)
                this.connect(host, port);
        }
        get input() {
            return this._input;
        }
        get output() {
            return this._output;
        }
        get connected() {
            return this._connected;
        }
        get endian() {
            return this._endian;
        }
        set endian(value) {
            this._endian = value;
            if (this._input != null)
                this._input.endian = value;
            if (this._output != null)
                this._output.endian = value;
        }
        connect(host, port) {
            var url = "ws://" + host + ":" + port;
            this.connectByUrl(url);
        }
        connectByUrl(url) {
            if (this._socket != null)
                this.close();
            this._socket && this.clean();
            if (!this.protocols || this.protocols.length == 0) {
                this._socket = new WebSocket(url);
            }
            else {
                this._socket = new WebSocket(url, this.protocols);
            }
            this._socket.binaryType = "arraybuffer";
            this._output = new this._byteClass();
            this._output.endian = this.endian;
            this._input = new this._byteClass();
            this._input.endian = this.endian;
            this._addInputPosition = 0;
            this._socket.onopen = (e) => {
                this._onOpen(e);
            };
            this._socket.onmessage = (msg) => {
                this._onMessage(msg);
            };
            this._socket.onclose = (e) => {
                this._onClose(e);
            };
            this._socket.onerror = (e) => {
                this._onError(e);
            };
        }
        clean() {
            this.close();
            this._connected = false;
            this._socket.onopen = null;
            this._socket.onmessage = null;
            this._socket.onclose = null;
            this._socket.onerror = null;
            this._socket = null;
            this.removeAll();
        }
        close() {
            if (this._socket != null) {
                try {
                    this._socket.close();
                }
                catch (e) {
                }
            }
        }
        _onOpen(e) {
            this._connected = true;
            this.execute(JTWebSocket.OPEN, e);
        }
        _onMessage(msg) {
            if (!msg || !msg.data)
                return;
            var data = msg.data;
            if (this.disableInput && data) {
                this.execute(JTWebSocket.MESSAGE, data);
                return;
            }
            if (this._input.length > 0 && this._input.bytesAvailable < 1) {
                this._input.clear();
                this._addInputPosition = 0;
            }
            var pre = this._input.pos;
            !this._addInputPosition && (this._addInputPosition = 0);
            this._input.pos = this._addInputPosition;
            if (data) {
                if (typeof (data) == 'string') {
                    this._input.writeUTFBytes(data);
                }
                else {
                    this._input.writeArrayBuffer(data);
                }
                this._addInputPosition = this._input.pos;
                this._input.pos = pre;
            }
            this.execute(JTWebSocket.MESSAGE, data);
        }
        _onClose(e) {
            this._connected = false;
            this.execute(JTWebSocket.CLOSE, e);
        }
        _onError(e) {
            this.execute(JTWebSocket.ERROR, e);
        }
        send(data) {
            this._socket.send(data);
        }
        flush() {
            if (this._output && this._output.length > 0) {
                var evt;
                try {
                    this._socket && this._socket.send(this._output.__getBuffer().slice(0, this._output.length));
                }
                catch (e) {
                    evt = e;
                }
                this._output.endian = this.endian;
                this._output.clear();
                if (evt)
                    this.execute(JTWebSocket.ERROR, evt);
            }
        }
    }
    JTWebSocket.LITTLE_ENDIAN = "littleEndian";
    JTWebSocket.BIG_ENDIAN = "bigEndian";
    JTWebSocket.OPEN = "open";
    JTWebSocket.MESSAGE = "message";
    JTWebSocket.CLOSE = "close";
    JTWebSocket.ERROR = "error";
    com.JTWebSocket = JTWebSocket;
})(com || (com = {}));
var com;
(function (com) {
    class JTWebSocketChannel extends com.JTChannel {
        constructor(cls) {
            super(cls);
            this._connected = false;
            this._buffers = null;
            this._buffers = [];
        }
        flush() {
            let socket = this._channel;
            while (this._buffers.length) {
                let msg = this._buffers.shift();
                if (socket) {
                    socket.connected && socket.send(msg);
                    this._encoder.writeComplete(msg);
                }
            }
        }
        send(data) {
            let message = this._encoder.encode(data);
            let socket = this._channel;
            if (socket) {
                socket.connected && socket.send(message);
                this._encoder.writeComplete(message);
            }
            else {
                this._buffers.push(message);
                com.JTLogger.info("send error, the websocket cant send msg to server!");
            }
        }
        connect(host, port) {
            super.connect(host, port);
            var channel = this._channel;
            if (channel)
                channel.clean();
            else
                channel = this._channel = new com.JTWebSocket();
            channel.registerFunction(com.JTWebSocket.OPEN, this.onConnectSucceed, this);
            channel.registerFunction(com.JTWebSocket.MESSAGE, this.onReceiveMessage, this);
            channel.registerFunction(com.JTWebSocket.CLOSE, this.onCloseHandler, this);
            channel.registerFunction(com.JTWebSocket.ERROR, this.onErrorHandler, this);
            channel.connect(host, port);
        }
        onConnectSucceed(e) {
            com.JTLogger.info("connect succeed!");
            this.flush();
        }
        onReceiveMessage(data) {
            let message = this._decoder.decode(data);
            this._decoder.readComplete(message);
        }
        onCloseHandler(e) {
            com.JTLogger.info("the server already close");
        }
        onErrorHandler(e) {
            com.JTLogger.info("current connect error");
        }
    }
    com.JTWebSocketChannel = JTWebSocketChannel;
})(com || (com = {}));
var com;
(function (com) {
    class JTAbstractDecoderAdapter extends com.JTChannelAdapter {
        constructor() {
            super();
        }
        channelActive() {
        }
    }
    com.JTAbstractDecoderAdapter = JTAbstractDecoderAdapter;
})(com || (com = {}));
var com;
(function (com) {
    class JTDecoderToByteAdapter extends com.JTAbstractDecoderAdapter {
        constructor() {
            super();
        }
        decode(data) {
            return null;
        }
        readComplete(data) {
        }
    }
    com.JTDecoderToByteAdapter = JTDecoderToByteAdapter;
})(com || (com = {}));
var com;
(function (com) {
    class JTDecoderToJSONAdapter extends com.JTAbstractDecoderAdapter {
        constructor() {
            super();
        }
        decode(data) {
        }
        readComplete(data) {
        }
    }
    com.JTDecoderToJSONAdapter = JTDecoderToJSONAdapter;
})(com || (com = {}));
var com;
(function (com) {
    class JTAbstractEncoderAdapter extends com.JTChannelAdapter {
        constructor() {
            super();
        }
    }
    com.JTAbstractEncoderAdapter = JTAbstractEncoderAdapter;
})(com || (com = {}));
var com;
(function (com) {
    class JTEncodeToByteAdapter extends com.JTAbstractEncoderAdapter {
        constructor() {
            super();
        }
        channelActive() {
        }
        encode(data) {
        }
        writeComplete(data) {
        }
    }
    com.JTEncodeToByteAdapter = JTEncodeToByteAdapter;
})(com || (com = {}));
var com;
(function (com) {
    class JTEncodeToJSONAdapter extends com.JTAbstractEncoderAdapter {
        constructor() {
            super();
        }
        channelActive() {
        }
        encode(data) {
            return JSON.stringify(data);
        }
        writeComplete(data) {
        }
    }
    com.JTEncodeToJSONAdapter = JTEncodeToJSONAdapter;
})(com || (com = {}));
var com;
(function (com) {
    class JTAbstractIdleStateAdapter extends com.JTChannelAdapter {
        constructor() {
            super();
        }
    }
    com.JTAbstractIdleStateAdapter = JTAbstractIdleStateAdapter;
})(com || (com = {}));
var com;
(function (com) {
    class JTPool {
        constructor(cls) {
            this._cls = null;
            this._list = null;
            this._totalCount = 0;
            this._size = 0;
            this._cls = cls;
            this._list = [];
            this._totalCount = 0;
        }
        get() {
            if (this._size > 0) {
                return this._list.shift();
            }
            this._totalCount++;
            return new this._cls();
        }
        put(item) {
            if (item && this._list.indexOf(item) == -1) {
                item.recycle();
                this._list.push(item);
                this._size++;
            }
        }
        get totalCount() {
            return this._totalCount;
        }
        get size() {
            return this._size;
        }
        static instance(cls) {
            var pool = this._poolMap[cls];
            if (!pool) {
                pool = this._poolMap[cls] = new JTPool(cls);
            }
            return pool;
        }
    }
    JTPool._poolMap = {};
    com.JTPool = JTPool;
})(com || (com = {}));
var com;
(function (com) {
    class JTCachePool extends com.JTPool {
        constructor(cls) {
            super(cls);
            this._references = null;
            this._references = [];
        }
        get() {
            if (this._size > 0) {
                return this._list.shift();
            }
            this._totalCount++;
            var item = new this._cls();
            this._references.push(item);
            return item;
        }
    }
})(com || (com = {}));
var com;
(function (com) {
    class JTFixedPool extends com.JTPool {
        constructor(cls, fixedCount = 5) {
            super(cls);
            this._fixedCount = 0;
            this.fixedCount = fixedCount;
        }
        set fixedCount(value) {
            this._fixedCount = value;
            this.create();
        }
        create() {
            var list = this._list;
            var count = 0;
            var lines = [];
            while (list.length) {
                var item = list.shift();
                if (this._fixedCount > count) {
                    lines.push(item);
                    count++;
                }
                else
                    item = null;
            }
            if (this._fixedCount > count) {
                var leng = this._fixedCount - count;
                var cls = this._cls;
                list = list.concat(lines);
                for (var i = 0; i < leng; i++) {
                    var item = new cls();
                    list.push(item);
                }
            }
        }
        get() {
            if (this._size > 0) {
                return this._list.shift();
            }
            return null;
        }
        get fullPool() {
            return this._fixedCount == this._size;
        }
    }
    com.JTFixedPool = JTFixedPool;
})(com || (com = {}));
