

/*
* name;
*/
module com 
{
    export interface JTIOption extends JTIChildOption, JTIChannelOption
    {
            channel(channel:JTIChannel):JTIChannelOption

            updateConfigs(configs:any[]):void;

            config(host:string, port:number):JTServerConfigTemplate 

            channelGroup(channelGroup:JTIChannelGroup):JTIChannelGroup;

            configServerTemaplete(serverLoader:JTTextLoader, serverId:string):JTServerConfigTemplate

            connect():JTIConnection

            launch():JTIConnection 
    }
}