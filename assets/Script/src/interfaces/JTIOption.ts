

/*
* name;
*/
namespace com 
{
    export interface JTIOption extends JTIChildOption, JTIChannelOption
    {
            channel(channel:JTIChannel):JTIChannelOption

            updateConfigs(configs:any[]):void;

            connect(host:string, port:number):void;

            config(serverLoader:JTTextLoader, serverId:string):void

            launch():void 
    }
}