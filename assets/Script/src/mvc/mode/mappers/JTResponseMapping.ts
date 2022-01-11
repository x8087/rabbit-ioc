///<reference path="../../../run/JTClassExtension.ts"/>
namespace com 
{
    export class JTResponseMapping extends JTClassExtension
    {
        public build(): void 
        {
            
        }

        protected static mappingMap:{[protocol:number]: any} = {};


        public registerToMapping<T extends JTClassMapper>(protocol:number, __mapper:T):void
        {
            JTResponseMapping.mappingMap[protocol] = __mapper;
        }

        public registerMapper(protocol:number, _class:any, createFromPool:boolean = false):void
        {
            this.registerMapper(protocol, new JTClassMapper(_class, createFromPool))
        }

        public getMapper<T extends JTClassMapper>(protocol:number):T
        {
            return JTResponseMapping.mappingMap[protocol];
        }

        public create(protocol:number, data:any):any
        {
            let __classMapper:JTClassMapper = JTResponseMapping.mappingMap[protocol];
            let dataInfo:JTIMapper = __classMapper ? __classMapper.create() : null;
            dataInfo.update(data);
            return dataInfo;
        }
    }
}
