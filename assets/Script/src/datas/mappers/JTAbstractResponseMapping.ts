///<reference path="../../context/JTOptionContext.ts"/>
namespace com 
{
    export abstract class JTAbstractResponseMapping extends JTOptionContext
    {
        public build(): void 
        {
            
        }

        protected static mappingMap:any = {};


        public registerToMapping<T extends JTClassMapper>(protocol:number | string, __mapper:T):void
        {
            JTAbstractResponseMapping.mappingMap[protocol] = __mapper;
        }

        public registerMapper(protocol:number | string, _class:any, createFromPool:boolean = false):void
        {
            this.registerMapper(protocol, new JTClassMapper(_class, createFromPool))
        }

        public getMapper<T extends JTClassMapper>(protocol:number | string):T
        {
            return JTAbstractResponseMapping.mappingMap[protocol];
        }

        public create(protocol:number | string, data:any):any
        {
            let __classMapper:JTClassMapper = JTAbstractResponseMapping.mappingMap[protocol];
            let dataInfo:JTIMapper = __classMapper ? __classMapper.create() : null;
            if (dataInfo)dataInfo.update(data);
            return dataInfo ? dataInfo : data;
        }
    }
}
