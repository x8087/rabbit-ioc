namespace com
{
    export class JTLogger
    {
        private static LOG_INFO:string = "[INFO] :";
        private static LOG_ASSET:string = "[ASSET] :";
        private static LOG_DEBUG:string = "[DEBUG] :";
        private static LOG_ERROR:string = "[ERROR] :";
        public static info(...msgs):void
        {
            let content:string = "";
            for (var i:number = 0; i < msgs.length; i ++)
            {
                content += msgs[i];
            }
            this.print(this.LOG_INFO, content);
        }
    
        public static debug(...msgs):void
        {
            let content:string = "";
            for (var i:number = 0; i < msgs.length; i ++)
            {
                content += JSON.stringify(msgs[i]);
            }
            this.print(this.LOG_DEBUG, content);
        }
    
        public static assert(flag:Boolean, ...msgs):void
        {
            let content:string = "";
            for (var i:number = 0; i < msgs.length; i ++)
            {
                content += msgs[i];
            }
            if (!flag) throw new Error(content);
        }

        public static error(...msgs):void
        {
            let content:string = "";
            for (var i:number = 0; i < msgs.length; i ++)
            {
                content += msgs[i];
            }
            throw new Error(content);
        }
     
        private static print(type:string, info:string):void
        {
            var date:Date = new Date();
            var hour:number = date.getHours();
            var minutes:number = date.getMinutes();
            var seconds:number = date.getSeconds();
            var time:string = hour + ":" + minutes + ":" + seconds + " >>>> "
            console.log(type + time + info);
        }
    }
}
