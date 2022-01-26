

/*
* name;
*/
module com 
{
    export interface JTIOption extends JTIChildOption, JTIChannelOption
    {
            channel(channel:JTIChannel):JTIChannelOption

            updateConfigs(configs:any[]):void;

            conofig(host:string, port:number):JTServerConfigTemplate 

            channelGroup(channelGroup:JTIChannelGroup):JTIChannelGroup;

            configServerTemaplete(serverLoader:JTTextLoader, serverId:string):JTServerConfigTemplate

            connect():JTIConnection

            launch():JTIConnection 
    }
}