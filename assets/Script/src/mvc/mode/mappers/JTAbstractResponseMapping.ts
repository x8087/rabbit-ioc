namespace com 
{
    export abstract class JTAbstractResponseMapping extends JTApplicationContext
    {
        public build(): void 
        {
            
        }

        protected static mappingMap:{[protocol:number]: any} = {};


        public registerToMapping<T extends JTClassMapper>(protocol:number, __mapper:T):void
        {
            JTAbstractResponseMapping.mappingMap[protocol] = __mapper;
        }

        public registerMapper(protocol:number, _class:any, createFromPool:boolean = false):void
        {
            this.registerMapper(protocol, new JTClassMapper(_class, createFromPool))
        }

        public getMapper<T extends JTClassMapper>(protocol:number):T
        {
            return JTAbstractResponseMapping.mappingMap[protocol];
        }

        public create(protocol:number, data:any):any
        {
            let __classMapper:JTClassMapper = JTAbstractResponseMapping.mappingMap[protocol];
            let dataInfo:JTIMapper = __classMapper ? __classMapper.create() : null;
            if (dataInfo)dataInfo.update(data);
            return dataInfo ? dataInfo : data;
        }
    }
}
