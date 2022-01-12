

/*
* name;
*/
namespace com 
{
    export interface JTIOption extends JTIChildOption, JTIChannelOption
    {
            channel(channel:JTIChannel):JTIChannelOption

            updateConfigs(configs:any[]):void;

            conofig(host:string, port:number):JTServerConfigTemplate 

            configServerTemaplete(serverLoader:JTTextLoader, serverId:string):JTServerConfigTemplate

            connect():JTIChannel

            launch():JTIChannel 
    }
}