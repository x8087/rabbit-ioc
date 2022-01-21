namespace com
{
    export class JTTextLoader
    {
         private static _dataMap:Object = {};
         private _url:string = null;
         private _class:any = null;
         private _urlLoader:JTURLLoader = null;
         private _dataMap:Object = {};
         private _values:any[] = [];
         private _datas:any = null;

         /**
          * 字符串解析方式
          */
         public static PARSE_STRING:string = "String";
        /**
          * 二进制流解析方式
          */
         public static PARSE_BINARY:string = "Binary";
        /**
          * ZIP包解析方式
          */
         public static PARSE_ZIP:string = "Zip";

        /**
         * 默认加载方法
         */
         public static LOAD_DEFAULT:string = "load"; 
         /**
          * 已加载完成-需要调用解析模式即可
          */
         public static LOADED_PARSE:string = "loaded";
         
         constructor(url?:string, cls?:any)
         {
             if (!url || !cls)return;
             this.load(url, cls);
         }

         public load(url:string, cls:any):void
         {
                this._url = url;
                this._class = cls;
                this._urlLoader = new JTURLLoader();
                this._urlLoader.addEventListener(JTURLLoader.ERROR, this.onloadError, this);
                this._urlLoader.addEventListener(JTURLLoader.COMPLETE, this.onloadComplete, this);
                this._urlLoader.send(url, null, "get", JTURLLoader.BUFFER);
         }

         public parseZip(data:any, cls:any):void
         {
            this._class = cls;
         }
         
         public parseBinary(data:any, cls:any):void
         {
            this._class = cls;
         }

         public parseStr(content:string, cls:any):void
         {
            this._datas = content;
            this._class = cls;
            let list:string[] = content.split('\n');
            let index:number = content.indexOf("\r");
            if (index != -1)  
            {
                list = list.join("").split("\r");
            }
            let head:string = list.shift();
            let propertys:string[] = head.split('\t');
            let keys:string[] = null;
            for (let i:number = 0; i < list.length; i++)//赋值
            {
                let line:string = list[i];
                let values:string[] = line.split("\t");
                if (values.length < propertys.length) continue; //清除尾部空白数据
                let template:JTBaseTemplate = new this._class();
                if (!keys)keys = Object.keys(template);
                for (let j:number = 0; j < keys.length; j++)//验证属性值是否匹配
                {
                    let property:string = propertys[j];
                    if (i == 0)
                    {
                        let index:number = keys.indexOf(property);
                        if (index == -1)
                        {
                            JTLogger.info("[JTTextLoader.parseStr] cls " +  this._class + " template cant find the key:  " + property);
                            continue
                        }
                    }
                    let value:any = values[j];
                    switch(true)
                    {
                        case typeof template[property] == 'number': //支持数值类型
                        {
                            value  = Number(value)
                            break;
                        }
                        case value.indexOf("{") != -1 : //支持JSON类型
                        {
                            value = JSON.parse(value);
                            break;
                        }
                    }
                    template[property] = value;
                    if (property == "id") 
                    {
                        this._dataMap[value] = template;
                        this._values = value;
                    }
                }
                template.endFill();
            }
         }

         private onloadComplete(data:any):void
         {
                let buffer:JTBuffer = new JTBuffer(data);
                buffer.pos = 0;
                let content:string = buffer.readUTFBytes(buffer.bytesAvailable);
                this.parseStr(content, this._class);
         }

         private onloadError(data:any):void
         {
            JTLogger.error("[JTTextLoader.load]  load text data error! the url : " + this._url);
         }

         public toValues<T extends JTBaseTemplate>():T[]
         {
             let list:T[] = [];
             let totalCount:number = this._values.length;
             for (let i:number = 0; i < totalCount; i++)
             {
                 let template:T = this._values[i];
                 list.push(template);
             }
             return list;
         }

         public toValue<T extends JTBaseTemplate>(key:string):T
         {
              return this._dataMap[key];
         }
    }
}
