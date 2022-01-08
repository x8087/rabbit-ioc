namespace com
{
    export class JTTextLoader<T extends JTBaseTemplate> implements JTITextLoader<T>
    {
         private static _dataMap:Object = {};
         private _url:string = null;
         private _cls:any = null;
         private _urlLoader:JTURLLoader = null;
         private _dataMap:Object = {};
         private _values:any[] = [];
         private _content:string = null;
         
         constructor(url:string, cls:any, datas?:any)
         {
             this._url = url;
             this._cls = cls;
         
             if (datas)
             {

                 if (typeof datas == 'string')//字符串数据
                 {
                        this.parseStr(datas);
                 }
                 else //二进制数据
                 {

                 }
             }
             else
             {
                 this._urlLoader = new JTURLLoader();
                 this._urlLoader.addEventListener(JTURLLoader.ERROR, this.onloadError, this);
                 this._urlLoader.addEventListener(JTURLLoader.COMPLETE, this.onloadComplete, this);
                 this._urlLoader.send(url, null, "get", JTURLLoader.BUFFER);
             }
         }

         private parseStr(data:string):void
         {
            this._content = this._dataMap[this._url] = data;
            let list:string[] = data.split('\n').join("").split("\r");
            let head:string = list.shift();
            let propertys:string[] = head.split('\t');
            let keys:string[] = null;
            for (let i:number = 0; i < list.length; i++)//赋值
            {
                let line:string = list[i];
                let values:string[] = line.split("\t");
                if (values.length < propertys.length) continue; //清除尾部空白数据
                let template:T = new this._cls();
                if (!keys)keys = Object.keys(template);
                for (let j:number = 0; j < keys.length; j++)//验证属性值是否匹配
                {
                    let property:string = propertys[j];
                    if (i == 0)
                    {
                        let index:number = keys.indexOf(property);
                        if (index == -1)
                        {
                            JTLogger.info("[JTTextLoader.parseStr] cls " +  this._cls + " template cant find the key:  " + property);
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
                this.parseStr(content);
                this._urlLoader.recycle();
                this._urlLoader = null;
         }

         private onloadError(data:any):void
         {
            JTLogger.error("[JTTextLoader.load]  load text data error! the url : " + this._url);
         }

         public toValues():T[]
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

         public toValue(key:string):T
         {
              return this._dataMap[key];
         }

         public toMap():Object
         {
             return this._dataMap;
         }

         public get content():string
         {
             return this._content;
         }
    }
}
